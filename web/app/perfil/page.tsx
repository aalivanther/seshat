"use client";

// Mi expedición: personalización del perfil, rango, medallas y certificados.

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Certificate, Seal, ArrowClockwise, DownloadSimple, UploadSimple, SpeakerHigh, SpeakerSlash, GraduationCap } from "@phosphor-icons/react";
import { MarkDuel } from "@/components/Art";
import { Diagnostico } from "@/components/Diagnostico";
import { idiomasConCurso, LangTabs } from "@/components/LangTabs";
import { usePlacementReports } from "@/lib/usePlacement";
import { exportProfile, getProfile, getState, getVersion, importProfile, setAvatar, resetProgress } from "@/lib/api";
import type { ServerState } from "@/lib/types";
import { courseOf } from "@/data/courseIndex";
import { useConfirm } from "@/lib/useConfirm";
import { activeLanguage, LANGUAGES, type LanguageDef } from "@/lib/languages";
import { asCefr } from "@/lib/cefr";
import { highestStartedCefr } from "@/lib/levels";
import {
  AVATARS, AVATAR_COLORS, AvatarIcon, computeBadges, examReadiness, officialExamName, moduleCert, rankOf,
} from "@/lib/achievements";
import { retoMedal, MEDAL_LABEL } from "@/lib/retoRun";
import { JuicyBar, Reveal } from "@/components/Reveal";
import { celebrate, sfxEnabled, setSfxEnabled, sfxOk } from "@/lib/juice";
import { motorOffText } from "@/components/ErrorBanner";
import hub from "@/components/hub.module.css";
import s from "./perfil.module.css";

function fmtDate(d: Date | null): string {
  return d ? d.toLocaleDateString("es", { day: "numeric", month: "short", year: "numeric" }) : "—";
}

type TabId = "expedicion" | "diagnostico" | "certificados" | "perfil" | "respaldo" | "app";

const TABS: { id: TabId; label: string }[] = [
  { id: "expedicion", label: "Expedición" },
  { id: "diagnostico", label: "Diagnóstico" },
  { id: "certificados", label: "Certificados" },
  { id: "perfil", label: "Perfil" },
  { id: "respaldo", label: "Respaldo" },
  { id: "app", label: "La app" },
];

export default function ProfilePage() {
  const { confirm, dialog } = useConfirm();
  const [tab, setTab] = useState<TabId>("expedicion");
  const [st, setSt] = useState<ServerState | null>(null);
  const [backupMsg, setBackupMsg] = useState("");
  const [sfx, setSfx] = useState(true);
  const [ver, setVer] = useState<Awaited<ReturnType<typeof getVersion>>>(null);
  // el nombre vive en localStorage: leerlo en efecto evita el mismatch de hidratación
  const [name, setName] = useState("default");
  // ídem el idioma activo: la miga vuelve al idioma que estás estudiando
  const [lang, setLang] = useState<LanguageDef>(LANGUAGES[0]);
  // EL IDIOMA MANDA EN TODA LA CARPETA. Antes esta pantalla mezclaba las dos
  // expediciones: treinta medallas alemanas seguidas de cuatro inglesas, los
  // certificados de los dos cursos en la misma lista y una cuenta de medallas
  // que no era de ningún curso. Se elige arriba una vez y todo lo de abajo
  // habla de ese idioma.
  const [pLang, setPLang] = useState<string>(LANGUAGES[0].id);

  useEffect(() => {
    getState().then(setSt);
    setSfx(sfxEnabled());
    setName(getProfile() || "default");
    setLang(activeLanguage());
    setPLang(activeLanguage().id);
    getVersion().then(setVer);
  }, []);

  const reports = usePlacementReports(useMemo(() => idiomasConCurso().map((l) => l.id), []), st);

  const rank = rankOf(st?.xp ?? 0);
  const RankIcon = rank.current.icon;
  const badges = computeBadges(st).filter((b) => b.lang === pLang);
  const earned = badges.filter((b) => b.earned).length;
  const fasesDelIdioma = courseOf(pLang).phases;
  const nombreIdioma = (LANGUAGES.find((l) => l.id === pLang)?.name ?? "este idioma").toLowerCase();
  // la bandera del grupo sale del registro (antes era un 🇬🇧 literal para
  // "todo lo que no sea alemán": el tercer idioma habría llegado con bandera
  // inglesa)
  // los certificados del idioma elegido: la lista completa mezclaba los dos
  // cursos y obligaba a leer la bandera de cada fila para saber de cuál era
  const certs = useMemo(
    () =>
      courseOf(pLang).phases.map((p) => ({
        ...moduleCert(p, st),
        level: (p.level ?? "a1").toUpperCase(),
        langKey: `${pLang}-${p.level ?? "a1"}`,
      })),
    [pLang, st],
  );
  const color = st?.color || "#b45309";
  // El aval del nivel más alto que este idioma ha empezado de verdad. Sin
  // progreso, A1 de ese idioma. Antes solo se pintaba en alemán A1.
  const readyLevel = asCefr(highestStartedCefr(pLang, st), pLang);
  const readiness = examReadiness(st, { lang: pLang, level: readyLevel });
  const examName = officialExamName(pLang, readyLevel);
  const showReadiness = fasesDelIdioma.length > 0;

  async function pick(avatar: string, c: string) {
    const updated = await setAvatar(avatar, c);
    if (updated) setSt(updated);
  }

  return (
    <main className={s.wrap}>
      {dialog}
      <nav className={hub.crumbs} aria-label="Ruta">
        <Link href={`/idioma/${lang.id}`}>{lang.name}</Link> <span>/</span> <span>Perfil de {name}</span>
      </nav>

      {/* Quién es el dueño de esto, arriba del todo: la pantalla mezcla lo que
          has conseguido con lo que se guarda de ti, y con varios perfiles en la
          misma casa conviene no dudar de a quién pertenece lo que estás viendo. */}
      <h1 className={s.pageTitle}>
        Perfil de <b>{name}</b>
      </h1>

      {/* CARPETA CON PESTAÑAS.
          Esta pantalla se había convertido en un rollo de siete secciones
          seguidas —avatar, medallas, retos, certificados, respaldo, actualizar,
          acerca— que había que recorrer entera para llegar a lo de abajo. Y
          mezclaba dos cosas distintas: TU EXPEDICIÓN (lo que has conseguido) y
          EL PERFIL (quién estudia y qué se guarda de cada uno). Separadas por
          pestañas, cada una cabe en una pantalla. */}
      <div className={s.tabs} role="tablist" aria-label="Secciones de tu perfil">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            className={`${s.tab} ${tab === t.id ? s.tabActive : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {(tab === "expedicion" || tab === "diagnostico" || tab === "certificados") && (
        <LangTabs
          value={pLang}
          onChange={setPLang}
          nota={(id) => reports[id]?.placed.toUpperCase()}
        />
      )}

      {tab === "expedicion" && (
        <div role="tabpanel">
      <Reveal>
        <div className={s.hero}>
          <span className={s.avatarBig} style={{ background: color }}>
            <AvatarIcon id={st?.avatar} size={46} />
          </span>
          <div className={s.heroInfo}>
            <div className={s.profileName}>{name}</div>
            <div className={s.rankRow}>
              <RankIcon size={20} weight="duotone" aria-hidden /> {rank.current.title}
              <span className={s.rankXp}>· {st?.xp ?? 0} XP</span>
            </div>
            {rank.next && (
              <div className={s.rankBar}>
                <div className={s.rankGrow}>
                  <JuicyBar pct={rank.progress * 100} trackClass={hub.bar} fillClass={hub.barFill} />
                </div>
                <span className="num">
                  {rank.next.minXP - (st?.xp ?? 0)} XP para {rank.next.title}
                </span>
              </div>
            )}
          </div>
          <div className={hub.statChips}>
            <span className={hub.chip}><span className={hub.chipVal}>{st?.streakDays ?? 0}</span> {(st?.streakDays ?? 0) === 1 ? "día" : "días"} de racha</span>
            <span className={hub.chip}><span className={hub.chipVal}>{earned}/{badges.length}</span> medallas de {nombreIdioma}</span>
          </div>
        </div>
      </Reveal>


      <h2 className={s.sectionTitle}>Medallas de expedición</h2>
      <p className={s.sectionSub}>
        Cada una se gana estudiando de verdad — y las barras te dicen cuánto te falta. Cada
        expedición lleva las suyas: la racha y el XP son de todo lo que estudias, pero las medallas
        y los certificados son de cada idioma.
      </p>
      <div className={s.medalGrid}>
        {badges.map((b, i) => {
          const BadgeIcon = b.icon;
          return (
            <Reveal key={b.id} i={i}>
              <div className={`${s.medal} ${b.earned ? s.medalEarned : s.medalLocked}`}>
                <div className={s.medalIcon}>
                  <BadgeIcon size={28} weight={b.earned ? "fill" : "duotone"} />
                </div>
                <div className={s.medalTitle} lang={b.lang}>{b.title}</div>
                <div className={s.medalDesc}>{b.desc}</div>
                {!b.earned && b.progress > 0 && (
                  <div className={s.medalBar}>
                    <div className={s.medalFill} style={{ width: `${b.progress * 100}%` }} />
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>


      <h2 className={s.sectionTitle}>Medallas de reto</h2>
      <p className={s.sectionSub}>
        Tu mejor run por módulo — bronce ≥8, plata ≥9, oro 10/10.
        Se ganan jugando: el reto de cada módulo se abre al completarlo.
      </p>
      <div className={s.medalGrid}>
        {fasesDelIdioma.map((p, i) => {
          const m = retoMedal(st, p.id);
          return (
            <Reveal key={p.id} i={i}>
              <div className={`${s.medal} ${m ? s.medalEarned : s.medalLocked}`}>
                <div className={s.medalIcon} style={m ? { color: p.color } : undefined}>
                  <MarkDuel size={28} color="currentColor" dim={!m} />
                </div>
                <div className={s.medalTitle}>{p.title}</div>
                <div className={s.medalDesc}>{m ? MEDAL_LABEL[m] : "Sin marca todavía"}</div>
              </div>
            </Reveal>
          );
        })}
      </div>

        </div>
      )}

      {tab === "diagnostico" && (
        <div role="tabpanel">
          <h2 className={s.sectionTitle}>Cómo vas, tema por tema</h2>
          <p className={s.sectionSub}>
            Esto no es la foto del día que hiciste la prueba de nivel: se recalcula con lo que
            estudias. Cada idioma va por su lado —quien lleva dos cursos tiene dos diagnósticos,
            no una media que no es de nadie.
          </p>
          <Diagnostico st={st} lang={pLang} />
        </div>
      )}

      {tab === "certificados" && <div role="tabpanel">
      <h2 className={s.sectionTitle}>Certificados de módulo</h2>
      <p className={s.sectionSub}>
        Se ganan con todas las lecciones completas + prueba del módulo ≥80%. <b>Caducan a los 30
        días</b>: renovarlos repitiendo la prueba es repaso espaciado disfrazado de trámite — así lo
        que certificas sigue siendo verdad.
      </p>
      <div className={s.certGrid}>
        {certs.map((c, i) => (
          <div key={`grp-${c.phase.id}`} className={s.certGroup}>
          {(i === 0 || certs[i - 1].langKey !== c.langKey) && (
            <p className={s.certLevel}>
              Nivel {c.level}
            </p>
          )}
          <div
            key={c.phase.id}
            className={`${s.certRow} ${c.valid ? s.certValid : c.earned ? s.certExpired : ""}`}
          >
            <Seal size={26} weight="duotone" color={c.valid ? "var(--ok)" : c.earned ? "var(--warn)" : "var(--text-3)"} aria-hidden />
            <div className={s.certInfo}>
              <div className={s.certName}>Módulo {c.phase.n} · {c.phase.title}</div>
              <div className={s.certMeta}>
                {c.valid
                  ? `Vigente hasta ${fmtDate(c.validUntil)} · nota ${c.score}%`
                  : c.earned
                    ? `Caducado — repite la prueba para renovarlo`
                    : c.score !== null
                      ? `Mejor nota ${c.score}% — necesitas ≥80% y todas las lecciones`
                      : "Aún sin intentar"}
              </div>
            </div>
            {c.valid ? (
              <Link href={`/certificado/${c.phase.id}`} className={s.certBtn}>
                <Certificate size={17} /> Ver certificado
              </Link>
            ) : (
              <Link href={`/prueba/${c.phase.id}`} className={s.certGhost}>
                <ArrowClockwise size={16} /> {c.earned ? "Renovar" : "Intentar"}
              </Link>
            )}
          </div>
          </div>
        ))}
      </div>

      {showReadiness && (
      <div className={s.grand}>
        <div className={s.grandTitle}><GraduationCap size={22} weight="duotone" style={{ verticalAlign: "-4px" }} aria-hidden /> {pLang === "en" ? "Ready for exam" : "Prüfungsreife"} — el aval para el {examName}</div>
        <p className={s.grandBody}>
          Se emite con los <b>{readiness.certsTotal} certificados de módulo vigentes</b> del {readyLevel.toUpperCase()} a la vez
          ({readiness.certsValid}/{readiness.certsTotal}) y <b>{readiness.examsNeeded} simulacro{readiness.examsNeeded === 1 ? "" : "s"} aprobado{readiness.examsNeeded === 1 ? "" : "s"} en los
          últimos 30 días</b> ({Math.min(readiness.examsPassed30d, readiness.examsNeeded)}/{readiness.examsNeeded}). Si lo logras, estás
          objetivamente en condiciones de presentar el {examName}.
        </p>
        <div className={s.grandActions}>
          {readiness.ready ? (
            <Link href={`/certificado/nivel-${pLang}-${readyLevel}`} className={s.certBtn} onClick={() => celebrate(true)}>
              <Certificate size={17} /> {pLang === "en" ? "Ver el certificado" : "Ver mi Prüfungsreife"}
            </Link>
          ) : (
            <Link href="/examen" className={s.certGhost}>Ir a por ello</Link>
          )}
        </div>
      </div>
      )}

      </div>}

      {tab === "perfil" && (
        <div role="tabpanel">
          <h2 className={s.sectionTitle}>Quién estudia</h2>
          <p className={s.sectionSub}>
            Cada perfil guarda <b>lo suyo y solo lo suyo</b>: sus lecciones, su repaso, su racha,
            su XP, sus medallas y sus certificados. Cambiar de perfil no mezcla nada — y si estudias
            sin elegir ninguno, tu avance se guarda en el perfil «default».
          </p>
          <p className={s.sectionSub}>
            Estás en <b>{name}</b>. Para cambiar de persona, usa el selector de la barra de arriba.
          </p>

      <h2 className={s.sectionTitle}>Tu explorador</h2>
      <p className={s.sectionSub}>Elige tu insignia y color — te acompañan en toda la expedición.</p>
      <div className={s.pickerRow}>
        {AVATARS.map((a) => {
          const IconCmp = a.icon;
          return (
            <button
              key={a.id}
              className={`${s.avatarOpt} ${st?.avatar === a.id ? s.avatarOptActive : ""}`}
              onClick={() => pick(a.id, color)}
              aria-label={`Avatar ${a.id}`}
              aria-pressed={st?.avatar === a.id}
            >
              <IconCmp size={26} weight="duotone" />
            </button>
          );
        })}
      </div>
      <div className={s.pickerRow}>
        {AVATAR_COLORS.map((c) => (
          <button
            key={c}
            className={`${s.colorOpt} ${color === c ? s.colorOptActive : ""}`}
            style={{ background: c }}
            onClick={() => pick(st?.avatar || "compass", c)}
            aria-label={`Color ${c}`}
            aria-pressed={color === c}
          />
        ))}
      </div>

      <div className={s.soundRow}>
        <button
          className={s.certGhost}
          onClick={() => {
            const v = !sfx;
            setSfxEnabled(v);
            setSfx(v);
            if (v) sfxOk();
          }}
          aria-pressed={sfx}
        >
          {sfx ? <SpeakerHigh size={17} weight="duotone" /> : <SpeakerSlash size={17} weight="duotone" />}
          {sfx ? "Sonidos de la app: activados" : "Sonidos de la app: en silencio"}
        </button>
      </div>

        </div>
      )}

      {tab === "respaldo" && <div role="tabpanel">
      <h2 className={s.sectionTitle}>Respaldo del progreso</h2>
      <p className={s.sectionSub}>
        Tu expedición vive en esta máquina. Exporta un archivo de respaldo cuando quieras
        (backup, cambio de ordenador). <b>Importar sustituye por completo el progreso de este
        perfil</b> por el del archivo — no se suman: antes de tocar nada, la app valida el archivo
        y deja una copia del estado actual en tu carpeta de datos (un archivo que acaba en
        <code>.preimport.bak</code>), así que un clic equivocado se puede deshacer. ¿Perdiste
        progreso sin respaldo? La <b>prueba de cada módulo</b> y los <b>simulacros</b> te
        recolocan honestamente donde estás de verdad.
      </p>
      <div className={s.backupRow}>
        <button
          className={s.certBtn}
          onClick={async () => {
            setBackupMsg((await exportProfile()) ? "Respaldo descargado ✓" : `El respaldo no se pudo exportar. ${motorOffText()}`);
          }}
        >
          <DownloadSimple size={17} /> Exportar respaldo
        </button>
        <label className={`${s.certGhost} ${s.fileLabel}`}>
          <UploadSimple size={17} /> Importar respaldo
          <input
            type="file"
            accept="application/json"
            className={s.fileInput}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              // Importar PISA el perfil entero. Un clic de más en el selector de
              // archivos se llevaba meses sin preguntar nada.
              const ok = await confirm({
                title: "¿Sustituir todo tu progreso?",
                body: (
                  <>
                    Vas a reemplazar el progreso de <b>{name}</b> por el del archivo — no se suman,
                    se sustituye. Antes de tocar nada se guarda una copia de lo que tienes ahora
                    (un archivo que acaba en <code>.preimport.bak</code>) en tu carpeta de datos.
                  </>
                ),
                confirmLabel: "Importar y sustituir",
                danger: true,
              });
              if (!ok) {
                e.target.value = "";
                return;
              }
              const res = await importProfile(await file.text());
              if (res.ok) {
                setBackupMsg("Respaldo importado ✓ — recargando...");
                setTimeout(() => window.location.reload(), 800);
              } else {
                setBackupMsg(`No importado: ${res.error ?? "archivo inválido"}`);
              }
              e.target.value = "";
            }}
          />
        </label>
      </div>
      {backupMsg && <p className={s.backupStatus} role="status">{backupMsg}</p>}

      {/* El motor sabe borrar el progreso desde el principio (con su copia de
          seguridad), pero no había forma de pedírselo sin abrir una terminal:
          quien empezaba un perfil por error se quedaba con él para siempre. */}
      <div className={s.resetBlock}>
        <button
          className={s.certGhost}
          onClick={async () => {
            const seguro = await confirm({
              title: `¿Borrar el progreso de ${name}?`,
              body: (
                <>
                  Se borran las lecciones, las palabras del repaso, el XP, la racha, las medallas y
                  los certificados de este perfil. Antes se guarda una copia de seguridad en tu
                  carpeta de datos, así que se puede recuperar a mano — pero en pantalla no vuelve.
                </>
              ),
              confirmLabel: "Borrar el progreso",
              danger: true,
            });
            if (!seguro) return;
            const ok = await resetProgress();
            if (ok) {
              setBackupMsg("Progreso borrado — recargando...");
              setTimeout(() => window.location.reload(), 800);
            } else {
              setBackupMsg(`No se pudo borrar. ${motorOffText()}`);
            }
          }}
        >
          Borrar el progreso de este perfil
        </button>
        <p className={`${s.sectionSub} ${s.resetNote}`}>
          Empieza de cero sin perder el archivo de respaldo: el borrado deja una copia en tu
          carpeta de datos por si te arrepientes.
        </p>
      </div>

      </div>}

      {tab === "app" && (
        <div role="tabpanel">
      <h2 className={s.sectionTitle}>Actualizar</h2>
      <p className={s.sectionSub}>
        Los drops llegan como un archivo que se carga desde aquí: la aplicación se actualiza sola,
        sin reinstalar nada y sin tocar tu progreso.
      </p>
      <Link href="/actualizar" className={s.certBtn}>
        Instalar una actualización
      </Link>


      <h2 className={s.sectionTitle}>Acerca de Seshat</h2>
      <p className={s.sectionSub}>
        Si algún día necesitas ayuda, esta es la información que resuelve la mitad de las
        preguntas por adelantado.
      </p>
      <div className={s.aboutBlock}>
        {/* Dos versiones, porque son dos cosas: el MOTOR solo cambia
            reinstalando la app, y el CONTENIDO cambia con cada paquete. Decir
            solo la del motor hacía que tras actualizar todo siguiera anunciando
            la versión vieja y pareciera que la instalación no había hecho nada. */}
        <div>Versión: <b className="num">{ver?.app ?? "…"}</b>{ver?.pack ? " (paquete instalado)" : ""}</div>
        {ver?.pack && ver?.engine && ver.engine !== ver.pack && (
          <div>Motor de la aplicación: <b className="num">{ver.engine}</b></div>
        )}
        {ver?.packTitle && <div>Último parche: <b>{ver.packTitle}</b></div>}
        <div>Drop de contenido: <b className="num">{ver?.content ?? "…"}</b></div>

      </div>
      <button
        className={`${s.certGhost} ${s.copyGap}`}
        onClick={() => {
          const txt = `Seshat ${ver?.app ?? "?"} · contenido ${ver?.content ?? "?"} · ${navigator.userAgent}`;
          navigator.clipboard?.writeText(txt).then(() => setBackupMsg("Diagnóstico copiado ✓"));
        }}
      >
        Copiar diagnóstico
      </button>
        </div>
      )}

    </main>
  );
}
