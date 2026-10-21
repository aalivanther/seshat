"use client";

// EXAMEN DE COLOCACIÓN — ¿por dónde empiezo?
//
// Preguntas que suben de dificultad —hasta C1, aunque el curso llegue al B2—
// y que, al terminar, no devuelven un porcentaje sino un diagnóstico: en qué
// nivel empezar, qué dominas, qué llevas a medias y qué está flojo, con nombres
// de cosas que puedes buscar en el curso.
//
// Todo el análisis lo hace el código (lib/placement.ts): una nota calculada
// con reglas se puede explicar y repetir.

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { notFound } from "next/navigation";
import { has } from "@/data/features";
import { canDoDe, placementDe } from "@/data/placementDe";
import { canDoEn, placementEn } from "@/data/en/placementEn";
import { MarkCap } from "@/components/Art";
import { getProfile, postLessonResult, postPlacement } from "@/lib/api";
import { checkNewBadges } from "@/lib/badgeTracker";
import type { Badge } from "@/lib/achievements";
import { BadgeUnlocks } from "@/components/BadgeUnlocks";
import { placementResultId } from "@/lib/ids";
import { celebrate, sfxBad, sfxFanfare, sfxOk } from "@/lib/juice";
import { adoptLang, getActiveLang, getLanguage } from "@/lib/languages";
import {
  analyzePlacement,
  isCorrect,
  placementKey,
  skillLabel,
  topicLabel,
  type PlacementItem,
  type PlacementReport,
} from "@/lib/placement";
import { courseCeiling, highestAvailableUpTo } from "@/lib/levels";
import { langConfig } from "@/lib/language";
import { speakLong, targetVoiceCount } from "@/lib/tts";
import { useLeaveGuard } from "@/lib/useLeaveGuard";
import hub from "@/components/hub.module.css";
import s from "./colocacion.module.css";

type Given = Record<string, string | number | null>;

export default function PlacementPage() {
  if (!has("placement")) notFound();
  const [lang, setLang] = useState("de");
  useEffect(() => {
    // Se puede llegar desde la portada SIN haber elegido idioma todavía: por eso
    // se acepta ?lang=de|en, que es lo que mandan las tarjetas de la portada.
    // Quien llega desde el hub ya tiene idioma activo y no trae parámetro.
    const pedido = new URLSearchParams(window.location.search).get("lang");
    const l = pedido && getLanguage(pedido) ? pedido : getActiveLang();
    setLang(l);
    adoptLang(l);
    // las voces cargan tarde en algunos navegadores: se comprueba al montar y
    // otra vez un segundo después
    const mirar = () => setSinVoz(targetVoiceCount() === 0);
    mirar();
    const t = setTimeout(mirar, 1200);
    return () => clearTimeout(t);
  }, []);

  const items: PlacementItem[] = useMemo(
    () => (lang === "en" ? placementEn : placementDe),
    [lang],
  );

  // BORRADOR: 68 preguntas son 25 minutos. Si suena el timbre, cierras la
  // pestaña o el portátil se duerme, lo respondido tiene que seguir ahí — como
  // en el simulacro. Se guarda por perfil y por idioma, y se tira al terminar.
  const draftKey = `seshat-colocacion-borrador-${lang}-${getProfile() || "default"}`;
  const [restaurado, setRestaurado] = useState(false);
  // Si el sistema no tiene voz del idioma, las preguntas de oído no suenan y hay
  // que decirlo ANTES de que el alumno crea que la app está rota.
  const [sinVoz, setSinVoz] = useState(false);
  const draftCargado = useRef(false);

  const [started, setStarted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [given, setGiven] = useState<Given>({});
  const [texto, setTexto] = useState("");
  // ítems de ORDENAR: se montan tocando fichas, no escribiendo. Sin esto, la
  // pantalla pedía teclear una frase cuyas palabras estaban en `options` y no
  // se enseñaban por ningún lado.
  const [fichas, setFichas] = useState<number[]>([]);
  const [report, setReport] = useState<PlacementReport | null>(null);
  const [previo, setPrevio] = useState<PlacementReport | null>(null);
  // La prueba de nivel da XP y puede abrir racha, así que puede desbloquear
  // medalla — y el aviso no se pedía aquí: se ganaba y no se enteraba nadie.
  const [newBadges, setNewBadges] = useState<Badge[]>([]);
  const posted = useRef(false);

  // un test a medias se pierde al recargar: avisar antes de tirarlo
  useLeaveGuard(started && !report);

  // recuperar el borrador (si es de las últimas 24 h)
  useEffect(() => {
    if (draftCargado.current) return;
    draftCargado.current = true;
    try {
      const raw = window.localStorage.getItem(draftKey);
      if (!raw) return;
      const d = JSON.parse(raw) as { idx: number; given: Given; at: number };
      if (!d || Date.now() - d.at > 24 * 3600_000 || !d.idx) {
        window.localStorage.removeItem(draftKey);
        return;
      }
      setIdx(d.idx);
      setGiven(d.given ?? {});
      setStarted(true);
      setRestaurado(true);
    } catch {
      /* borrador ilegible: se empieza de cero */
    }
  }, [draftKey]);

  // guardarlo en cada respuesta
  useEffect(() => {
    if (!started || report) return;
    try {
      window.localStorage.setItem(draftKey, JSON.stringify({ idx, given, at: Date.now() }));
    } catch {
      /* sin espacio: la prueba sigue, solo que sin red */
    }
  }, [draftKey, started, report, idx, given]);

  // ¿ya se hizo alguna vez? Se guarda por perfil y por idioma
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(placementKey(lang, getProfile()));
      if (raw) setPrevio(JSON.parse(raw) as PlacementReport);
    } catch {
      /* informe ilegible: como si no hubiera */
    }
  }, [lang]);

  // el nivel al que de verdad se puede entrar hoy en este idioma
  const destino = useMemo(
    () => (report ? highestAvailableUpTo(lang, report.placed) : undefined),
    [lang, report],
  );

  const item = items[idx];
  const done = idx >= items.length;

  /** Cierra la prueba: calcula el informe, lo guarda y lo enseña.
   *
   *  Esto vivía en un `useEffect` que miraba `idx >= items.length`, y ahí estaba
   *  el fallo que se veía como «el examen se rompe en una pregunta»: al
   *  responder la última, React pintaba UNA vez con `idx` fuera de rango —o sea,
   *  sin pregunta— antes de que el efecto pusiera el informe, y la pantalla
   *  reventaba leyendo `item.prompt` de algo que no existía. Con el pánico se
   *  perdía todo, que es lo de «no guarda el progreso». Ahora el informe se
   *  calcula en el mismo gesto de responder: no hay fotograma intermedio. */
  function terminar(respuestas: Given) {
    if (posted.current) return;
    posted.current = true;
    const r = analyzePlacement(items, respuestas, courseCeiling(lang));
    setReport(r);
    try {
      window.localStorage.setItem(placementKey(lang, getProfile()), JSON.stringify(r));
    } catch {
      /* sin sitio para guardarlo: el informe se ve igual, solo que no se recuerda */
    }
    try { window.localStorage.removeItem(draftKey); } catch { /* da igual */ }
    // y que quede en el PERFIL, no solo en este navegador: el nivel al que te
    // coloca es dato de tu expedición, y así viaja con el respaldo
    void postLessonResult(placementResultId(lang), r.pct / 100, []).then((st) => {
      if (st) setNewBadges(checkNewBadges(st));
    });
    // esto es lo que de verdad guarda EL NIVEL colocado (PLAN 1.9.8 §1.3): lo
    // de arriba solo manda un porcentaje disfrazado de lección, y de ahí no se
    // puede reconstruir el desbloqueo en otro dispositivo.
    void postPlacement(lang, r.placed, r.pct);
    celebrate(r.pct >= 60);
    sfxFanfare();
  }

  /** Volver a la anterior. Sesenta y ocho preguntas dan para muchos clics, y
   *  uno mal dado no puede costar una pregunta: aquí se vuelve y se cambia la
   *  respuesta, que es lo que deja hacer cualquier examen de verdad. */
  function volver() {
    if (idx === 0) return;
    const anterior = items[idx - 1];
    const dado = given[anterior.id];
    setIdx(idx - 1);
    if (anterior.kind === "order") {
      setTexto("");
      // las fichas se guardaron como frase: se vuelven a casar con sus palabras,
      // gastando cada opción una sola vez (hay frases con la misma palabra dos veces)
      const opciones = anterior.options ?? [];
      const usadas = new Set<number>();
      const recompuestas: number[] = [];
      for (const palabra of typeof dado === "string" ? dado.split(" ") : []) {
        const i = opciones.findIndex((o, k) => !usadas.has(k) && o === palabra);
        if (i < 0) continue;
        usadas.add(i);
        recompuestas.push(i);
      }
      setFichas(recompuestas);
    } else {
      setFichas([]);
      setTexto(anterior.kind === "cloze" && typeof dado === "string" ? dado : "");
    }
  }

  function responder(valor: string | number) {
    if (!item) return;
    const acierto = isCorrect(item, valor);
    if (acierto) sfxOk();
    else sfxBad();
    const respuestas = { ...given, [item.id]: valor };
    setGiven(respuestas);
    setTexto("");
    setFichas([]);
    if (idx + 1 >= items.length) terminar(respuestas);
    else setIdx((i) => i + 1);
  }

  /* ── portada ── */
  if (!started && !report) {
    return (
      <main className={hub.wrap}>
        <nav className={hub.crumbs} aria-label="Ruta">
          <Link href={`/idioma/${lang}`}>{getLanguage(lang)?.name ?? "Curso"}</Link> <span>/</span>{" "}
          <span>¿Por dónde empiezo?</span>
        </nav>
        <h1 className={hub.title}>
          <MarkCap size={26} /> ¿Por dónde empiezo?
        </h1>
        <p className={hub.subtitle}>
          {items.length} preguntas, de menos a más y <b>hasta nivel C1</b>: si ya estás por encima
          de lo que este curso enseña, el informe te lo dirá en vez de fingir que aquí hay más. Al
          final sabrás <b>en qué nivel empezar</b>, <b>qué dominas, qué llevas a medias y qué tienes
          flojo</b>, y a qué equivale tu nivel en los exámenes oficiales.
        </p>

        <section className={s.card}>
          <ul className={s.reglas}>
            <li>Si te equivocas de clic, «Anterior» te deja cambiar la respuesta. Saltar cuenta como no saberlo.</li>
            <li>Si no lo sabes, déjalo en blanco — fingir que lo sabes te coloca donde no toca.</li>
            <li>Se tarda unos <b>25 minutos</b>. Sitúa el cuaderno: no sustituye un simulacro; abre tu nivel y deja atrás los anteriores.</li>
            <li>Puedes repetirlo cuando quieras: el informe nuevo se compara con el anterior.</li>
          </ul>
          <button className={s.btn} onClick={() => setStarted(true)}>
            Empezar la prueba de nivel
          </button>
          {previo && (
            <p className={s.linea}>
              La última vez, en {new Date(previo.at).toLocaleDateString("es-ES")}, te situó en{" "}
              <b>{previo.placed.toUpperCase()}</b> con un {previo.pct}%.
            </p>
          )}
        </section>
      </main>
    );
  }

  /* ── informe ── */
  if (report) {
    const mejora = previo ? report.pct - previo.pct : null;
    return (
      <main className={hub.wrap}>
        <h1 className={hub.title}>Tu punto de partida</h1>

        <section className={`${s.card} ${s.veredicto}`}>
          <p className={s.nivelGrande}>
            Empieza por <b>{report.placed.toUpperCase()}</b>
          </p>
          <p className={s.linea}>{report.veredicto}</p>
          <p className={s.linea}>
            {report.hits} de {report.total} ({report.pct}%)
            {mejora !== null && (
              <>
                {" · "}
                <b style={{ color: mejora >= 0 ? "var(--ok)" : "var(--text-3)" }}>
                  {mejora >= 0 ? `+${mejora}` : mejora} puntos desde la última vez
                </b>
              </>
            )}
          </p>
          <div className={s.niveles}>
            {report.byLevel.map((l) => (
              <div key={l.level} className={s.nivelFila}>
                <span className={s.nivelNombre}>{l.level.toUpperCase()}</span>
                <div className={s.barra}>
                  <div className={s.barraFill} style={{ width: `${l.pct}%` }} />
                </div>
                <span className="num">{l.hits}/{l.total}</span>
              </div>
            ))}
          </div>
        </section>

        {/* LO QUE HACE QUE ESTO SE PUEDA DEFENDER: el nivel traducido a
            exámenes oficiales, lo que sabes hacer según el MCER, el desglose por
            destreza —como puntúa una escuela— y, sin letra pequeña, cómo se ha
            calculado y qué NO mide. */}
        <section className={s.card}>
          <h2 className={s.cardTitle}>A qué equivale tu nivel</h2>
          <p className={s.linea}>{report.equivalencia}</p>
          {report.realLevel && (
            <ul className={s.candoLista}>
              {(lang === "en" ? canDoEn : canDoDe)[report.realLevel].map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          )}
          <p className={`${s.linea} ${s.confianza} ${s["conf_" + report.confianza]}`}>
            <b>
              {report.confianza === "alta"
                ? "Lectura firme"
                : report.confianza === "media"
                  ? "Lectura con matices"
                  : "Estás en la frontera"}
              :
            </b>{" "}
            {report.confianzaPorque}
          </p>
        </section>

        <section className={s.card}>
          <h2 className={s.cardTitle}>Por destreza</h2>
          <div className={s.niveles}>
            {report.bySkill.map((sk) => (
              <div key={sk.skill} className={s.nivelFila}>
                <span className={s.destreza}>{skillLabel(sk.skill)}</span>
                <div className={s.barra}>
                  <div className={s.barraFill} style={{ width: `${sk.pct}%` }} />
                </div>
                <span className="num">{sk.hits}/{sk.total}</span>
              </div>
            ))}
          </div>
          <p className={s.lineaMenuda}>
            Flojear de oído y flojear de gramática no se arreglan igual: lo primero se cura
            escuchando a diario, lo segundo con las notas del curso y el repaso.
          </p>
        </section>

        <section className={s.card}>
          <h2 className={s.cardTitle}>Lo que ya dominas</h2>
          {report.dominados.length ? (
            <ul className={s.temas}>
              {report.dominados.map((t) => (
                <li key={t.topic} className={s.temaOk}>
                  {topicLabel(t.topic)} <span className="num">{t.hits}/{t.total}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={s.linea}>Todavía nada del todo — es lo normal al empezar.</p>
          )}

          <h2 className={s.cardTitle}>Lo que llevas a medias</h2>
          {report.aMedias.length ? (
            <ul className={s.temas}>
              {report.aMedias.map((t) => (
                <li key={t.topic} className={s.temaMedio}>
                  {topicLabel(t.topic)} <span className="num">{t.hits}/{t.total}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={s.linea}>Nada a medias: o lo tienes, o no lo has visto.</p>
          )}

          <h2 className={s.cardTitle}>Por aquí hay trabajo</h2>
          {report.flojos.length ? (
            <ul className={s.temas}>
              {report.flojos.map((t) => (
                <li key={t.topic} className={s.temaFlojo}>
                  {topicLabel(t.topic)} <span className="num">{t.hits}/{t.total}</span>
                  <span className={s.temaNivel}>{t.level.toUpperCase()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={s.linea}>Nada flojo. Enhorabuena — eso no se ve todos los días.</p>
          )}
        </section>

        <BadgeUnlocks badges={newBadges} />

        <div className={s.acciones}>
          {/* La prueba mide hasta C1, pero el curso de cada idioma llega hasta
              donde llega: mandar a `/nivel/en-a2` a quien saca A2 en inglés era
              un 404 justo después de aprobar. Se entra por el nivel más alto
              que EXISTE, y se dice por qué. */}
          <Link href={`/nivel/${destino?.id ?? `${lang}-a1`}`} className={s.btn}>
            Ir al {(destino?.cefr ?? "a1").toUpperCase()} y empezar
          </Link>
          <Link href="/perfil" className={s.btnGhost}>
            Guardar y ver mi perfil
          </Link>
        </div>
        {destino && destino.cefr !== report.placed && (
          <p className={s.lineaMenuda} role="note">
            Tu sitio es el <b>{report.placed.toUpperCase()}</b>, pero el curso de{" "}
            {getLanguage(lang)?.name.toLowerCase() ?? "este idioma"} llega de momento al{" "}
            <b>{destino.cefr.toUpperCase()}</b>: empieza ahí y aprovéchalo como repaso rápido —
            el resto llega en próximos drops.
          </p>
        )}
        <section className={s.card}>
          <h2 className={s.cardTitle}>Cómo se ha calculado</h2>
          <p className={s.lineaMenuda}>
            {report.total} preguntas repartidas así:{" "}
            {report.metodo.itemsPorNivel.filter((n) => n.total > 0).map((n) => `${n.level.toUpperCase()} ${n.total}`).join(" · ")}.
            Un nivel se da por superado con el <b>{report.metodo.corte}%</b> de sus preguntas, y no se
            salta un nivel flojo para premiar aciertos sueltos de uno más alto. Cada tema se mide con
            al menos {report.metodo.minItemsPorTema} preguntas: así ningún diagnóstico depende de una
            sola respuesta.
          </p>
          <p className={s.lineaMenuda}>
            <b>Lo que esto NO mide</b>, y una escuela sí:
          </p>
          <ul className={s.limites}>
            {report.metodo.limites.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        </section>

        <p className={s.linea}>
          Este informe queda guardado en tu perfil y se vuelve a mirar cuando repitas la prueba, para
          que veas por dónde has mejorado.
        </p>
      </main>
    );
  }

  /* ── la prueba ── */
  // cinturón por si algún día vuelve a haber un hueco entre estados: mejor un
  // mensaje corto que una pantalla en blanco con un error en la consola
  if (!item) {
    return (
      <main className={hub.wrap}>
        <p className={s.linea}>Preparando tu informe…</p>
      </main>
    );
  }

  return (
    <main className={hub.wrap}>
      {restaurado && (
        <p className={s.linea} role="status">
          Sigues donde lo dejaste: tus respuestas estaban guardadas en este dispositivo.
        </p>
      )}
      <div className={s.progresoFila}>
        <span className="num">{idx + 1}/{items.length}</span>
        <div className={s.barra}>
          <div className={s.barraFill} style={{ width: `${((idx + 1) / items.length) * 100}%` }} />
        </div>
      </div>

      <section className={s.card}>
        <p className={s.consigna}>{item.prompt}</p>

        {item.audio && (
          <div className={s.audioFila}>
            <button className={s.btnEscuchar} onClick={() => speakLong(item.audio!, { dialog: item.audio!.includes("|") })}>
              ▸ Escuchar
            </button>
            <button className={s.btnGhost} onClick={() => speakLong(item.audio!, { rate: 0.7 })}>
              Más despacio
            </button>
            {sinVoz && (
              <span className={s.avisoVoz} role="alert">
                Tu equipo no tiene voz de {getLanguage(lang)?.name.toLowerCase() ?? "este idioma"}{" "}
                instalada, así que estas preguntas no sonarán. Puedes saltarlas sin penalización, o
                instalar la voz en los ajustes de tu sistema.
              </span>
            )}
          </div>
        )}
        {item.text && (
          <p className={s.enunciado} lang={item.audio ? "es" : langConfig().htmlLang}>
            {item.text}
          </p>
        )}

        {item.kind === "order" ? (
          <div>
            <div className={s.fichasMontaje}>
              {fichas.length === 0 ? (
                <span className={s.fichasVacio}>Toca las palabras en el orden correcto</span>
              ) : (
                fichas.map((fi, pos) => (
                  <button
                    key={`${fi}-${pos}`}
                    className={s.ficha}
                    onClick={() => setFichas((f) => f.filter((_, k) => k !== pos))}
                    title="Quitar"
                  >
                    {(item.options ?? [])[fi]}
                  </button>
                ))
              )}
            </div>
            <div className={s.fichasPool}>
              {(item.options ?? []).map((o, i) =>
                fichas.includes(i) ? null : (
                  <button key={i} className={s.ficha} onClick={() => setFichas((f) => [...f, i])}>
                    {o}
                  </button>
                ),
              )}
            </div>
            <button
              className={s.btn}
              disabled={fichas.length === 0}
              onClick={() => responder(fichas.map((i) => (item.options ?? [])[i]).join(" "))}
            >
              Responder
            </button>
          </div>
        ) : item.kind === "mc" ? (
          <div className={s.opciones}>
            {(item.options ?? []).map((o, i) => (
              <button key={i} className={s.opcion} onClick={() => responder(i)}>
                {o}
              </button>
            ))}
          </div>
        ) : (
          <div>
            <input
              className={s.input}
              value={texto}
              autoFocus
              autoComplete="off"
              spellCheck={false}
              placeholder="Escribe tu respuesta…"
              onChange={(e) => setTexto(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && responder(texto)}
            />
            <button className={s.btn} onClick={() => responder(texto)}>
              Responder
            </button>
          </div>
        )}

        <div className={s.acciones}>
          <button className={s.btnGhost} onClick={volver} disabled={idx === 0}>
            ◂ Anterior
          </button>
          <button
          className={s.saltar}
          onClick={() => {
            const respuestas = { ...given, [item.id]: null };
            setGiven(respuestas);
            setTexto("");
            setFichas([]);
            if (idx + 1 >= items.length) terminar(respuestas);
            else setIdx((i) => i + 1);
          }}
        >
          No lo sé — saltar
        </button>
        </div>
        <p className={s.lineaMenuda}>
          Puedes dejarlo a medias y seguir en las próximas 24 horas:{" "}
          <Link href={`/idioma/${lang}`}>volver al curso</Link>. Lo respondido se queda guardado en
          este dispositivo.
        </p>
      </section>
    </main>
  );
}
