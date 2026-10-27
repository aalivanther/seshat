"use client";

// EL DIAGNÓSTICO — qué se te da bien y qué se te atraganta, por idioma.
//
// Antes esto era una lista de barras del idioma activo, y decía poco: una barra
// contesta «cuánto» pero no «en qué». Aquí manda la forma. El radar dibuja tu
// perfil de un vistazo —un pico hacia el oído y un valle hacia la gramática se
// reconocen sin leer una cifra— y los símbolos (cumbre, cuesta, grieta) ponen
// nombre a cada tema.
//
// Nada de esto se te pregunta: sale de tu progreso y del informe de la prueba de
// nivel del idioma que toque. Por eso hay una pestaña por idioma: quien estudia
// alemán e inglés tiene dos diagnósticos, no una media que no es de nadie.

import { useMemo } from "react";
import Link from "next/link";
import { MarkStrength, RadarChart, type RadarEje } from "@/components/Art";
import { courseOf } from "@/data/courseIndex";
import { MASTERY_LABEL, moduleMastery, type ModuleMastery } from "@/lib/mastery";
import { colorDe, idiomasConCurso } from "@/components/LangTabs";
import { usePlacementReports } from "@/lib/usePlacement";
import {
  skillLabel, topicLabel,
  type PlacementReport, type TopicResult,
} from "@/lib/placement";
import type { ServerState } from "@/lib/types";
import s from "@/app/perfil/diagnostico.module.css";

/** Un tema del que hablar: viene de la prueba de nivel o de un módulo del curso. */
interface Punto {
  key: string;
  label: string;
  pct: number;
  fuerza: "fuerte" | "medio" | "flojo";
  /** de dónde sale, para que el alumno sepa si es la prueba o su propio avance */
  origen: "prueba" | "curso";
  href?: string;
}

function fuerzaDeTema(t: TopicResult): Punto["fuerza"] {
  return t.state === "dominado" ? "fuerte" : t.state === "flojo" ? "flojo" : "medio";
}

export function puntosDe(rep: PlacementReport | null, mastery: ModuleMastery[]): Punto[] {
  const out: Punto[] = [];
  for (const t of rep?.topics ?? []) {
    out.push({
      key: `t-${t.topic}`,
      label: topicLabel(t.topic),
      pct: t.total ? Math.round((t.hits / t.total) * 100) : 0,
      fuerza: fuerzaDeTema(t),
      origen: "prueba",
    });
  }
  for (const m of mastery) {
    if (m.lessonsDone === 0) continue; // un módulo sin tocar no es una debilidad
    out.push({
      key: `m-${m.phase.id}`,
      label: m.phase.title,
      pct: m.pct,
      fuerza: m.pct >= 80 ? "fuerte" : m.pct >= 45 ? "medio" : "flojo",
      origen: "curso",
      href: `/modulo/${m.phase.id}`,
    });
  }
  return out.sort((a, b) => b.pct - a.pct);
}

/** Los ejes del radar: las cuatro destrezas de la prueba, más lo que solo sabe
 *  el curso (si te dura la palabra y si apruebas sus pruebas). */
export function ejesDe(rep: PlacementReport | null, mastery: ModuleMastery[]): RadarEje[] {
  const ejes: RadarEje[] = (rep?.bySkill ?? []).map((sk) => ({
    label: skillLabel(sk.skill, true),
    value: sk.pct,
  }));
  const words = mastery.reduce((n, m) => n + m.words, 0);
  const strong = mastery.reduce((n, m) => n + m.strongWords, 0);
  const conNota = mastery.filter((m) => m.testPct !== null);
  const tocados = mastery.filter((m) => m.lessonsDone > 0);
  if (tocados.length) {
    ejes.push({ label: "Memoria", value: words ? Math.round((strong / words) * 100) : 0 });
    ejes.push({
      label: "Pruebas",
      value: conNota.length
        ? Math.round(conNota.reduce((n, m) => n + (m.testPct ?? 0), 0) / conNota.length)
        : 0,
    });
  }
  return ejes;
}

function Grupo({ titulo, fuerza, puntos, pie }: {
  titulo: string; fuerza: Punto["fuerza"]; puntos: Punto[]; pie: string;
}) {
  if (!puntos.length) return null;
  return (
    <section className={`${s.grupo} ${s["f_" + fuerza]}`}>
      <h4 className={s.grupoTitulo}>
        <MarkStrength state={fuerza} />
        {titulo}
        <span className={s.grupoCuenta}>{puntos.length}</span>
      </h4>
      <ul className={s.chips}>
        {puntos.map((p) => {
          const dentro = (
            <>
              <span className={s.chipTexto}>{p.label}</span>
              <span className={`num ${s.chipPct}`}>{p.pct}%</span>
            </>
          );
          return (
            <li key={p.key} className={s.chip} title={p.origen === "prueba" ? "de la prueba de nivel" : "de tu avance en el curso"}>
              {p.href ? <Link href={p.href} className={s.chipLink}>{dentro}</Link> : dentro}
            </li>
          );
        })}
      </ul>
      <p className={s.grupoPie}>{pie}</p>
    </section>
  );
}

export function Diagnostico({ st, lang: langId }: { st: ServerState | null; lang: string }) {
  // El idioma lo manda la carpeta entera (las pestañas de arriba), no esta
  // vista: así medallas, certificados y diagnóstico hablan siempre del mismo.
  const idiomas = useMemo(() => idiomasConCurso(), []);
  const lang = idiomas.find((l) => l.id === langId) ?? idiomas[0];
  const reports = usePlacementReports(idiomas.map((l) => l.id), st);

  const mastery = useMemo(
    () => (lang ? courseOf(lang.id).phases.map((p) => moduleMastery(p, st)) : []),
    [lang, st],
  );

  const niveles = useMemo(() => {
    const porNivel = new Map<string, ModuleMastery[]>();
    for (const m of mastery) {
      const nv = m.phase.level ?? "a1";
      const lista = porNivel.get(nv) ?? [];
      lista.push(m);
      porNivel.set(nv, lista);
    }
    const grupos = [...porNivel.entries()].map(([level, mods]) => {
      const hechos = mods.filter((m) => m.state === "asentado" || m.state === "dominado").length;
      const pct = Math.round(mods.reduce((n, m) => n + m.pct, 0) / Math.max(1, mods.length));
      return { level, mods, hechos, pct, abierto: false };
    });
    // se abre el nivel donde hay algo empezado y todavía sin cerrar; si no hay
    // nada empezado, el primero — que es por donde se entra
    const enMarcha = grupos.find((g) => g.mods.some((m) => m.lessonsDone > 0 && m.state !== "dominado"));
    const abrir = enMarcha ?? grupos.find((g) => g.mods.some((m) => m.lessonsDone > 0)) ?? grupos[0];
    if (abrir) abrir.abierto = true;
    return grupos;
  }, [mastery]);

  const rep = reports[lang?.id ?? ""] ?? null;
  const puntos = useMemo(() => puntosDe(rep, mastery), [rep, mastery]);
  const ejes = useMemo(() => ejesDe(rep, mastery), [rep, mastery]);

  if (!lang) return null;

  const fuertes = puntos.filter((p) => p.fuerza === "fuerte");
  const medios = puntos.filter((p) => p.fuerza === "medio");
  const flojos = puntos.filter((p) => p.fuerza === "flojo");
  const empezado = mastery.some((m) => m.lessonsDone > 0);

  return (
    <div className={s.wrap}>
      <div className={s.panel}>
        <div className={s.radarCol}>
          {ejes.length >= 3 ? (
            <>
              <RadarChart ejes={ejes} color={colorDe(lang.id)} />
              <p className={s.radarPie}>
                Cuanto más lejos del centro, mejor. La forma es lo que importa: un lado corto es
                por donde conviene empezar.
              </p>
            </>
          ) : (
            <div className={s.radarVacio}>
              <p>
                Todavía no hay con qué dibujar tu perfil de {lang.name.toLowerCase()}. Haz la prueba
                de nivel o termina una lección y esto se llena solo.
              </p>
            </div>
          )}
        </div>

        <div className={s.resumenCol}>
          {rep ? (
            <div className={s.pruebaCaja}>
              <span className={s.pruebaEtiqueta}>Prueba de nivel</span>
              <p className={s.pruebaNivel}>
                <b>{(rep.detalleAusente ? rep.placed : (rep.realLevel ?? rep.placed)).toUpperCase()}</b>
                {!rep.detalleAusente && <span className="num"> · {rep.pct}%</span>}
                {!rep.detalleAusente && <span className={s.pruebaConf}>confianza {rep.confianza}</span>}
              </p>
              <p className={s.pruebaVeredicto}>{rep.veredicto}</p>
              <p className={s.pruebaFecha}>
                {rep.detalleAusente || !rep.at
                  ? "Informe en el otro aparato"
                  : new Date(rep.at).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
                {" · "}
                <Link href={`/colocacion?lang=${lang.id}`} className={s.enlace}>repetir y comparar</Link>
              </p>
            </div>
          ) : (
            <div className={s.pruebaCaja}>
              <span className={s.pruebaEtiqueta}>Prueba de nivel</span>
              <p className={s.pruebaVeredicto}>
                No has hecho la de {lang.name.toLowerCase()}. Son unos 15 minutos y sale de ahí la
                mitad de este diagnóstico: sin ella solo se mide lo que ya has estudiado aquí.
              </p>
              <Link href={`/colocacion?lang=${lang.id}`} className={s.btnPrueba}>
                Hacer la prueba de {lang.name.toLowerCase()}
              </Link>
            </div>
          )}

          <div className={s.marcadores}>
            <div className={s.marcador}>
              <MarkStrength state="fuerte" size={26} />
              <b className="num">{fuertes.length}</b>
              <span>de sobra</span>
            </div>
            <div className={s.marcador}>
              <MarkStrength state="medio" size={26} />
              <b className="num">{medios.length}</b>
              <span>a medias</span>
            </div>
            <div className={s.marcador}>
              <MarkStrength state="flojo" size={26} />
              <b className="num">{flojos.length}</b>
              <span>por reforzar</span>
            </div>
          </div>
        </div>
      </div>

      <Grupo
        titulo="Tus fuertes" fuerza="fuerte" puntos={fuertes}
        pie="Esto ya lo tienes: en el repaso te aguanta y en la prueba no falla."
      />
      <Grupo
        titulo="A medias" fuerza="medio" puntos={medios}
        pie="Lo reconoces, pero se te cae al producirlo. Es donde más rinde una sesión de repaso."
      />
      <Grupo
        titulo="Por reforzar" fuerza="flojo" puntos={flojos}
        pie="Por aquí se escapa el progreso. Empieza por el de arriba: los temas se sostienen unos a otros."
      />

      <h3 className={s.subtitulo}>Módulo a módulo</h3>
      <p className={s.subtituloPie}>
        Cada módulo suma por lo recorrido (40%), por la nota de su prueba (30%) y por cuántas de sus
        palabras te aguantan ya tres semanas en el repaso (30%).
      </p>
      {/* Plegado por nivel: el alemán son cuarenta y ocho módulos, y de corrido
          eran cuarenta y ocho renglones que no dicen nada. Se abre el nivel en
          el que se está y los demás esperan a que los abras. */}
      {niveles.map((nv) => (
        <details key={nv.level} className={s.nivel} open={nv.abierto}>
          <summary className={s.nivelResumen}>
            <span className={s.nivelNombre}>{nv.level.toUpperCase()}</span>
            <span className={s.nivelTrack}>
              <span className={s.nivelFill} style={{ width: `${Math.max(2, nv.pct)}%` }} />
            </span>
            <span className={`num ${s.nivelCifras}`}>
              {nv.hechos}/{nv.mods.length} módulos · {nv.pct}%
            </span>
          </summary>
          <div className={s.modulos}>
            {nv.mods.map((m) => (
              <Link key={m.phase.id} href={`/modulo/${m.phase.id}`} className={s.modulo}>
                <span className={s.moduloNombre}>{m.phase.title}</span>
                <span className={s.moduloTrack}>
                  <span
                    className={s.moduloFill}
                    style={{ width: `${Math.max(2, m.pct)}%`, background: m.phase.color }}
                  />
                </span>
                <span className={`${s.moduloEstado} ${s["st_" + m.state]}`}>{MASTERY_LABEL[m.state]}</span>
                <span className={`num ${s.moduloCifras}`}>
                  {m.lessonsDone}/{m.lessonsTotal}
                  {m.testPct !== null ? ` · ${m.testPct}%` : ""}
                </span>
              </Link>
            ))}
          </div>
        </details>
      ))}
      {!empezado && (
        <p className={s.subtituloPie}>
          Aún no has terminado ninguna lección de {lang.name.toLowerCase()}: estas barras se mueven
          en cuanto empieces.
        </p>
      )}
    </div>
  );
}
