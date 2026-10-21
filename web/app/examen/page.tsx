"use client";

// Hub de simulacros del idioma ACTIVO (alemán: Start Deutsch 1 / Goethe A2–B2 ·
// inglés: LanguageCert ESOL A1 Preliminary / A2 Access / B1 Achiever / B2 Communicator).

import Link from "next/link";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { GraduationCap, ExamIcon } from "@phosphor-icons/react";
import { examsOf } from "@/data/exams";
import type { ExamSet } from "@/lib/examTypes";
import { examClockPaper, examPaperDurationSeconds } from "@/lib/examClock";
import { has } from "@/data/features";
import { cefrRank, isCefr, type Cefr } from "@/lib/cefr";
import { examLevelOf } from "@/lib/examLevel";
import { examResultId } from "@/lib/ids";
import { useProgress } from "@/lib/useProgress";
import { getActiveLang, getLanguage, adoptLang } from "@/lib/languages";
import s from "@/components/hub.module.css";

// La cabecera del hub NO puede ser una constante por idioma: en alemán conviven
// el Start Deutsch 1 (A1) y el Modellsatz B1, que duran 80 y 180 minutos, se
// puntúan distinto (el B1 es modular) y no son el mismo examen ni de lejos.
// Antes esta pantalla ponía «Simulacros Start Deutsch 1 · ~80 min · A1» encima
// de TODOS, así que un alumno de B1 entraba a tres horas de examen creyendo que
// eran ochenta minutos, bajo un cartel de A1.
const HEAD: Record<string, { title: string; sub: string }> = {
  de: {
    title: "Simulacros oficiales",
    sub: "Los exámenes completos con su estructura exacta y en modo real: cronómetro orientativo, audios que se escuchan las veces oficiales y ninguna corrección hasta el final. Cada simulacro dice arriba a qué examen corresponde y cuánto dura.",
  },
  en: {
    title: "Simulacros oficiales",
    sub: "El examen LanguageCert ESOL completo para tu nivel, con su estructura exacta: Listening (4 partes, TODO se escucha 2 veces), Reading (4 partes), Writing (2 textos) y Spoken (4 partes). Sin corrección hasta el final. Cada simulacro dice arriba a qué examen y nivel corresponde — Preliminary (A1), Access (A2), Achiever (B1) o Communicator (B2).",
  },
};

function fmtMin(total: number): string {
  if (total <= 0) return "duración por confirmar";
  if (total < 60) return `~${total} min`;
  const h = Math.floor(total / 60);
  const m = total % 60;
  return m ? `~${h} h ${m} min` : `~${h} h`;
}

/** Duración por PAPEL (el mismo recorte que el cronómetro), no la suma cruda
 *  de secciones: en LanguageCert B1/B2, 80+50 son UN papel de 130′, no dos. */
function minutesOfExam(ex: ExamSet): string {
  const papers = new Set(
    ex.sections.map((s) => examClockPaper(ex, s.skill)).filter((p) => p !== "sprechen"),
  );
  if (papers.has("rw") && papers.has("listening")) {
    const L = Math.round(examPaperDurationSeconds(ex, "listening") / 60);
    const R = Math.round(examPaperDurationSeconds(ex, "rw") / 60);
    return `Listening ~${L} min · RW ${fmtMin(R).replace(/^~/, "")}`;
  }
  const total = [...papers].reduce((n, p) => n + examPaperDurationSeconds(ex, p) / 60, 0);
  return fmtMin(Math.round(total));
}

const EXAM_NAME: Record<string, Record<string, string>> = {
  de: {
    a1: "Start Deutsch 1 (A1)",
    a2: "Goethe-Zertifikat A2",
    b1: "Goethe-Zertifikat B1 (= ÖSD B1)",
    b2: "Goethe-Zertifikat B2",
  },
  en: {
    a1: "LanguageCert ESOL A1 Preliminary",
    a2: "LanguageCert ESOL A2 Access",
    b1: "LanguageCert ESOL B1 Achiever",
    b2: "LanguageCert ESOL B2 Communicator",
  },
};

function levelOfExam(ex: { id: string; level?: string }): Cefr {
  if (ex.level && isCefr(ex.level)) return ex.level;
  return examLevelOf(ex.id);
}

function officialName(lang: string, level: string): string {
  return (EXAM_NAME[lang] ?? EXAM_NAME.de)[level] ?? `Nivel ${level.toUpperCase()}`;
}

export default function ExamHub() {
  if (!has("exams")) notFound();
  const { state } = useProgress({ due: false }); // dueCount no se muestra aquí
  const st = state === "loading" ? null : state;
  // idioma activo tras montar (localStorage): evita divergencia de hidratación
  const [lang, setLang] = useState("de");
  useEffect(() => {
    const l = getActiveLang();
    setLang(l);
    adoptLang(l);
  }, []);
  const def = getLanguage(lang)!;
  const exams = examsOf(lang);
  const head = HEAD[lang] ?? HEAD.de;
  // la miga apunta al nivel más alto que tiene simulacro en este idioma: con el
  // B1 dentro, mandar a todo el mundo a /nivel/de-a1 era mentir de camino
  const topLevel = exams.reduce<Cefr>(
    (top, ex) => (cefrRank(levelOfExam(ex)) > cefrRank(top) ? levelOfExam(ex) : top),
    "a1",
  );

  return (
    <main className={s.wrap}>
      <nav className={s.crumbs} aria-label="Ruta">
        <Link href={`/idioma/${lang}`}>{def.name}</Link> <span>/</span>
        {/* sin nivel en la miga: aquí conviven simulacros de A1 y de B1, y
            mandar a todo el mundo al más alto confundía al alumno de A1 */}
        <span>Simulacros</span>
      </nav>

      <header className={s.header}>
        <div>
          <h1 className={s.title}><GraduationCap size={30} weight="duotone" style={{ verticalAlign: "-5px" }} aria-hidden /> {head.title}</h1>
          <p className={s.subtitle}>{head.sub}</p>
        </div>
      </header>

      <div className={s.levelGrid}>
        {exams.map((ex) => {
          const stat = st?.lessons?.[examResultId(ex.id)];
          const best = typeof stat?.bestScore === "number" ? Math.round(stat.bestScore * 100) : null;
          return (
            <Link key={ex.id} href={`/examen/${ex.id}`} className={s.levelCard}>
              <div className={s.levelTop}>
                <span className={s.levelName}><ExamIcon size={22} weight="duotone" style={{ verticalAlign: "-4px" }} aria-hidden /> {ex.title}</span>
                <span className={s.levelTag}>
                  {best !== null
                    ? `${ex.scoring?.modular ? "mejor módulo flojo" : "mejor nota"}: ${best}% ${best >= (ex.scoring?.passPct ?? 60) ? "· aprobado" : ""} · ${stat!.attempts} ${stat!.attempts === 1 ? "intento" : "intentos"}`
                    : "sin intentos aún"}
                </span>
              </div>
              <p style={{ fontSize: "0.8125rem", color: "var(--text-3)", fontWeight: 700, marginBottom: 4 }}>
                {officialName(lang, levelOfExam(ex))}
                {ex.scoring?.modular ? " · modular: cada módulo se aprueba por separado" : ""}
              </p>
              <p className={s.levelDesc}>{ex.description}</p>
              <p style={{ fontSize: "0.875rem", color: "var(--accent-text)", fontWeight: 700 }}>
                Empezar simulacro ({minutesOfExam(ex)}) →
              </p>
            </Link>
          );
        })}
      </div>

      {/* El plan de cuatro semanas hablaba de «Modellsatz B/C» (que en B1 no
          existen), del módulo «Rumbo al examen» del A1 y de un entrenador de
          Start Deutsch 1: puesto debajo de la tarjeta del B1 era un consejo
          equivocado. Ahora cada nivel ve el suyo. */}
      {lang === "de" && topLevel === "a1" && <section className={s.levelCard} style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: 8 }}>
          El plan de las últimas 4 semanas
        </h2>
        <p className={s.levelDesc}>
          Respaldado por la investigación del curso: los simulacros espaciados rinden más que
          amontonados (Cepeda), y cada fallo debe volver como práctica de recuperación, no como
          relectura (Karpicke).
        </p>
        <ol style={{ margin: "10px 0 0 20px", display: "grid", gap: 10, color: "var(--text-2)" }}>
          <li>
            <b>Semana 1 — línea base:</b> Modellsatz A completo, de una sentada y con cronómetro.
            Anota tu destreza más floja; el resto de la semana: módulo «Rumbo al examen» + repaso diario.
          </li>
          <li>
            <b>Semana 2 — reparar:</b> ataca la destreza floja con su herramienta (Hören → dictados
            del repaso · Schreiben → Escritura libre · Sprechen → Entrevista oral · Lesen → cuentos
            de Nico). El viernes: Modellsatz B.
          </li>
          <li>
            <b>Semana 3 — consolidar:</b> Entrevista oral dos veces (días separados), pruebas de los
            módulos donde tu nota media baje de 80%, y el trainer oficial del Goethe para oír voces
            humanas. El viernes: Modellsatz C.
          </li>
          <li>
            <b>Semana 4 — afinar:</b> repite entero el Modellsatz con peor nota (es el mismo examen: lo que mide es tu avance), repaso espaciado a diario, y la víspera solo la Entrevista y dormir bien.
          </li>
        </ol>
      </section>}

      {lang === "de" && topLevel === "a2" && <section className={s.levelCard} style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: 8 }}>El plan de las últimas 4 semanas (A2)</h2>
        <p className={s.levelDesc}>Dos simulacros A2, no tres. Semana 1: set A. Semana 2: destreza floja + Schreiben 20–40 palabras. Semana 3: entrevista A2 dos veces. Semana 4: el set con peor nota.</p>
      </section>}
      {lang === "de" && topLevel === "b1" && <section className={s.levelCard} style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: 8 }}>El plan de las últimas 4 semanas (B1)</h2>
        <p className={s.levelDesc}>El B1 es modular: cada destreza se aprueba sola. Hay dos Modellsätze (A y B). Semana 1: Lesen+Hören. Semana 2: Schreiben (foro y mail). Semana 3: oral T1–T3. Semana 4: el set y el módulo más flojos otra vez.</p>
      </section>}
      {lang === "de" && topLevel === "b2" && <section className={s.levelCard} style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: 8 }}>El plan de las últimas 4 semanas (B2)</h2>
        <p className={s.levelDesc}>Modular otra vez, 65′ de Lesen y 75′ de Schreiben. Semana 1: T5 reglamento y T2 insert. Semana 2: foro 150 + Nachricht 100. Semana 3: Vortrag con 15 min de prep. Semana 4: el set B si el A ya está visto.</p>
      </section>}
      {lang === "en" && <section className={s.levelCard} style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: 8 }}>Cómo usar estos simulacros</h2>
        <p className={s.levelDesc}>LanguageCert: Listening aparte (~30′) y Reading+Writing en un solo papel (A2 80 min; B1/B2 2 h 10). El Spoken es cita aparte. Off-topic en Writing vale cero.</p>
      </section>}
      {lang === "de" && (<footer className={s.footer}>
        <span>
          Los audios reales del examen son voces humanas: úsalos como contraste final.
        </span>
        <a
          href={
            topLevel === "b2" ? "https://www.goethe.de/de/spr/kup/prf/prf/gb2/ueb.html"
            : topLevel === "b1" ? "https://www.goethe.de/de/spr/kup/prf/prf/gzb1/ueb.html"
            : topLevel === "a2" ? "https://www.goethe.de/de/spr/kup/prf/prf/gzsd2/ueb.html"
            : "https://bfu.goethe.de/a1_sd1/"
          }
          target="_blank"
          rel="noreferrer"
        >
          Material oficial Goethe {topLevel.toUpperCase()} ↗
        </a>
      </footer>)}
      {lang === "en" && (<footer className={s.footer}>
        <span>LanguageCert no tiene un trainer tipo Goethe. La ficha y el handbook son el contraste oficial.</span>
        <a href="https://www.languagecert.org/en/language-exams/english/languagecert-international-esol" target="_blank" rel="noreferrer">
          Exámenes LanguageCert ESOL ↗
        </a>
      </footer>)}
    </main>
  );
}
