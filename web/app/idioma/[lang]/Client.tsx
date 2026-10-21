"use client";

// Casa de un idioma: sus niveles y herramientas. Generalizada del hub alemán:
// el idioma sale de la ruta, se ADOPTA al montar (config lingüística en juego)
// y las herramientas declaran para qué idiomas existen.

import { levelAnnounced } from "@/lib/drop";
import Link from "next/link";
import { useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import { ArrowsClockwise } from "@phosphor-icons/react";
// Los accesos del hub llevan arte propio (components/Art.tsx): es la primera
// pantalla del idioma y la que más se mira — un set de catálogo aquí es lo que
// hace que una app parezca montada con piezas de nadie.
import { MarkCap, ToolNotebook, ToolTalk, ToolPen, ToolMic, ToolExam, ToolMedal, ToolPhone } from "@/components/Art";
import { courseOf } from "@/data/course";
import { examsOf } from "@/data/exams";
import { has, type Capability } from "@/data/features";
import { getLanguage, adoptLang } from "@/lib/languages";
import { levelsOf, ready } from "@/lib/levels";
import { useProgress, levelPct, nextLessonId, phasesOf } from "@/lib/useProgress";
import { useReviewBannerDue } from "@/lib/reviewSession";
import { ErrorBanner } from "@/components/ErrorBanner";

import { ORAL_CONTRACT_SHORT } from "@/lib/oralCopy";
import { Reveal, JuicyBar } from "@/components/Reveal";
import { LangFlag } from "@/components/Art";
import s from "@/components/hub.module.css";

// langs: dónde existe la herramienta hoy. Conversación, escritura y examen
// son por idioma; las neutrales valen para todos.
// cap: la funcionalidad de la que depende (PLAN-COMPOSICION.md §7.3) — un
// build que la apague no debe ni escribir la tarjeta, no solo ocultarla.
// langs/cap: dónde y con qué existe la herramienta · descByLang: matiz por idioma
const TOOLS: {
  href: string; icon: (p: { size?: number }) => React.ReactElement; title: string; desc: string;
  langs: string[] | null; cap?: Capability; descByLang?: Record<string, string>;
}[] = [
  {
    href: "/referencia", icon: ToolNotebook, title: "La libreta",
    desc: "Verbos conjugados, preguntas, pronunciación y números — todo el detalle, siempre a mano.",
    langs: ["de", "en"], cap: "reference",
    descByLang: { en: "Verbos, preguntas, sonidos que deciden, números, plurales irregulares y tu colección Nativo del inglés." },
  },
  {
    href: "/conversacion", icon: ToolTalk, title: "Conversación",
    desc: "Mia te da la frase. Tú respondes en voz alta, al nivel que llevas, y escribes lo que has dicho.",
    langs: ["de", "en"], cap: "ai",
    descByLang: { en: "Holly te da la frase. Tú respondes en voz alta, al nivel que llevas, y escribes lo que has dicho." },
  },
  {
    href: "/escritura", icon: ToolPen, title: "Escritura libre",
    desc: "Escribe sin red como en el Schreiben del examen, con la meta de palabras de tu nivel, y repasa la hoja tú mismo.",
    langs: ["de", "en"], cap: "ai",
    descByLang: { en: "Escribe sin red como en el Writing del examen, con la meta de palabras de tu nivel, y repasa la hoja tú mismo." },
  },
  {
    href: "/entrevista", icon: ToolMic, title: "Entrevista oral",
    desc: `Oral del nivel que llevas (Goethe / LanguageCert). ${ORAL_CONTRACT_SHORT}`,
    langs: ["de", "en"], cap: "interview",
    descByLang: { en: `Oral del nivel que llevas (LanguageCert). ${ORAL_CONTRACT_SHORT}` },
  },
  {
    href: "/examen", icon: ToolExam, title: "Simulacros",
    desc: "Start Deutsch 1, Goethe-Zertifikat A2, B1 y B2 — Modellsätze completos con el reloj y el baremo oficiales.",
    langs: ["de"], cap: "exams", // la visibilidad real la decide examsOf() más abajo, no `langs`
    descByLang: { en: "LanguageCert ESOL A1 Preliminary, A2 Access, B1 Achiever y B2 Communicator, con doble escucha y nota oficial (Pass/High Pass)." },
  },
  {
    href: "/colocacion", icon: MarkCap, title: "¿Por dónde empiezo?",
    desc: "Prueba de nivel de A1 a C1: te dice en qué nivel empezar y, sobre todo, qué dominas, qué llevas a medias y qué tienes flojo.",
    langs: null, cap: "placement",
  },
  { href: "/perfil", icon: ToolMedal, title: "Mi expedición", desc: "Tu avatar, tu rango de explorador, medallas y certificados de módulo.", langs: null },
  { href: "/telefono", icon: ToolPhone, title: "En tu teléfono", desc: "Escanea un QR y estudia desde el móvil o la tablet — misma red, cada quien su perfil.", langs: null },
];

const HEADLINE: Record<string, { h1: string; sub: string; footer?: { text: string; url: string; label: string } }> = {
  de: {
    h1: "Deutsch lernen",
    sub: "Frase usable primero, gramática después — con corrección en tiempo real y repaso espaciado. Del primer «Hallo» al B2.",
    footer: {
      text: "Basado en el currículo oficial Goethe (Start Deutsch 1, Goethe-Zertifikat A2, B1 y B2) y evidencia pedagógica.",
      url: "https://www.goethe.de/es/spr/ueb.html",
      label: "Ejercicios oficiales Goethe ↗",
    },
  },
  en: {
    h1: "Learn English",
    sub: "Frase usable primero, gramática después — con corrección en tiempo real y repaso espaciado. Del primer «Hello» al B2.",
    footer: {
      text: "Basado en los exámenes oficiales LanguageCert International ESOL —A1 Preliminary, A2 Access, B1 Achiever y B2 Communicator— y evidencia pedagógica.",
      url: "https://www.languagecert.org/en/language-exams/english/languagecert-international-esol/listening-reading-writing",
      label: "Exámenes oficiales LanguageCert ↗",
    },
  },
};

export default function LanguageHome() {
  const params = useParams<{ lang: string }>();
  const def = getLanguage(params.lang);
  const hasContent = def && courseOf(def.id).phases.length > 0;
  useEffect(() => {
    if (hasContent) adoptLang(def!.id);
  }, [hasContent, def]);
  if (!hasContent) notFound();

  const { state, recovered } = useProgress({ due: false }); // dueCount no se muestra aquí
  const loading = state === "loading";
  const st = loading ? null : state;
  const recoveredHere = recovered.find((r) => r.lang === def.id);
  const next = nextLessonId(st, def.id);
  const reviewDue = useReviewBannerDue(st, def.id);
  const levels = levelsOf(def.id);
  const head = HEADLINE[def.id] ?? HEADLINE.de;
  const tools = TOOLS
    .filter((t) => !t.cap || has(t.cap))
    // A.3 de PLAN-1.9.9.5.md: antes el `||` cortaba en cuanto `langs.includes`
    // daba verdadero, así que `examsOf(...).length > 0` nunca llegaba a
    // ejecutarse para alemán — la tarjeta de Simulacros ignoraba si había
    // simulacros de verdad. Para "/examen" la visibilidad es SOLO examsOf().
    .filter((t) => (t.href === "/examen" ? examsOf(def.id).length > 0 : !t.langs || t.langs.includes(def.id)))
    .map((t) => ({ ...t, desc: t.descByLang?.[def.id] ?? t.desc }));

  return (
    <main className={s.wrap}>
      <nav className={s.crumbs} aria-label="Ruta">
        <Link href="/">Idiomas</Link> <span>/</span> <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><LangFlag lang={def.id} size={18} /> {def.name}</span>
      </nav>
      <header className={s.header}>
        <div>
          <h1 className={s.title}>{head.h1}</h1>
          <p className={s.subtitle}>{head.sub}</p>
        </div>
      </header>

      {state === null && <ErrorBanner kind="motor" detail="Mientras tanto puedes mirar, pero el progreso no se guardará." />}

      {recoveredHere && (
        <div className={s.reviewBanner}>
          <span className={s.reviewText}>
            Hemos vuelto a enlazar tu prueba de nivel ({recoveredHere.placed.toUpperCase()}) con este perfil.
            Los módulos de ese nivel están abiertos; los de debajo quedan saltados — no tienes que rehacerlos.
          </span>
        </div>
      )}

      {reviewDue && has("review") && (
        <div className={s.reviewBanner}>
          <span className={s.reviewText}>
            <ArrowsClockwise size={18} weight="bold" style={{ verticalAlign: "-3px" }} aria-hidden />{" "}
            ¿Repasamos? Cinco minutos con todo lo que ya sabes, y preguntas nuevas cada vez.
          </span>
          <Link href="/review" className={s.reviewBtn}>Repaso exprés</Link>
        </div>
      )}

      {loading ? (
        <div className={s.levelGrid}>
          <div className={s.skeleton} style={{ height: 140 }} />
          <div className={s.skeleton} style={{ height: 100 }} />
        </div>
      ) : (
        <div className={s.levelGrid}>
          {levels.filter((lv) => ready(lv.id, lv.lang, lv.cefr)).map((lv, i) => {
            const phases = phasesOf(lv.id);
            const nLessons = phases.reduce((n, p) => n + p.lessons.length, 0);
            const lvPct = levelPct(st, lv.id);
            const hasNext = next !== null && phases.some((p) => p.lessons.some((l) => l.id === next));
            return (
              <div key={lv.id}>
                <Reveal i={i}>
                  <Link href={`/nivel/${lv.id}`} className={s.levelCard}>
                    <div className={s.levelTop}>
                      <span className={s.levelName} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><LangFlag lang={def.id} size={20} /> {lv.title}</span>
                      <span className={s.levelTag}>
                        {phases.length} módulos · {nLessons} lecciones
                      </span>
                    </div>
                    <p className={s.levelDesc}>{lv.desc}</p>
                    <div className={s.barRow}>
                      <JuicyBar pct={lvPct} trackClass={s.bar} fillClass={s.barFill} />
                      <span className={s.barPct}>{lvPct}%</span>
                    </div>
                  </Link>
                </Reveal>
                {hasNext && (() => {
                  const lesson = phases.flatMap((p) => p.lessons).find((l) => l.id === next)!;
                  return (
                    <Link
                      href={`/lesson/${next}`}
                      className={s.reviewBtn}
                      style={{ display: "inline-flex", alignItems: "center", marginTop: 10 }}
                    >
                      {lvPct > 0 ? `Continuar: ${lesson.title} →` : `Empezar: ${lesson.title} →`}
                    </Link>
                  );
                })()}
              </div>
            );
          })}

          {levels.filter((lv) => !ready(lv.id, lv.lang, lv.cefr) && levelAnnounced(lv.id)).map((lv) => (
            <div key={lv.id} className={`${s.levelCard} ${s.levelCardLocked}`} aria-disabled>
              <div className={s.levelTop}>
                <span className={s.levelName}>{lv.title}</span>
                <span className={s.levelTag}>Todavía no está en esta versión — llega en un drop próximo</span>
              </div>
              <p className={s.levelDesc}>{lv.desc}</p>
            </div>
          ))}
        </div>
      )}

      <h2 style={{ marginTop: 40, fontSize: "1.25rem", fontWeight: 800 }}>Herramientas</h2>
      <div className={`${s.moduleGrid} ${s.toolsGrid}`} style={{ marginTop: 12 }}>
        {tools.map(({ href, icon: Icon, title, desc }, i) => (
          <Reveal key={href} i={i + 2}>
            <Link href={href} className={`${s.moduleCard} ${s.toolCard}`}>
              <Icon size={30} />
              <span className={s.moduleName}>{title}</span>
              <span className={`${s.moduleGoal} ${s.toolDesc}`}>{desc}</span>
            </Link>
          </Reveal>
        ))}
      </div>

      {head.footer && (
        <footer className={s.footer}>
          <span>{head.footer.text}</span>
          <a href={head.footer.url} target="_blank" rel="noreferrer">{head.footer.label}</a>
        </footer>
      )}
    </main>
  );
}
