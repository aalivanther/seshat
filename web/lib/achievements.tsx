"use client";

// La expedición: rangos, medallas y certificados computados del progreso REAL.
// Psicología aplicada: metas próximas visibles (Locke & Latham), progreso
// parcial (efecto Zeigarnik), y caducidad de certificados = recuperación
// espaciada disfrazada de renovación (Cepeda).

import type { Icon } from "@phosphor-icons/react";
import {
  Footprints, PersonSimpleHike, Compass, MapTrifold, Mountains, Fire,
  Backpack, Medal, Trophy, Microphone, GraduationCap, Binoculars,
} from "@phosphor-icons/react";
import type { PhaseMeta, ServerState } from "./types";
import { CEFR_SCALE, type Cefr } from "./cefr";
import { testId, isExamSimResult, examResultId, INTERVIEW_ID, INTERVIEW_EN_ID } from "./ids";
import { course, courseOf } from "@/data/courseIndex";
import { examsOf } from "@/data/examsIndex";
import { vocabIdSet } from "@/data/vocabIdSet";

/* ---------- Rangos de explorador (por XP) ---------- */

export interface Rank {
  title: string;
  icon: Icon;
  minXP: number;
}

export const RANKS: Rank[] = [
  { title: "Neuling", icon: Footprints, minXP: 0 },
  { title: "Wanderer", icon: PersonSimpleHike, minXP: 250 },
  { title: "Entdecker", icon: Compass, minXP: 750 },
  { title: "Pfadfinder", icon: MapTrifold, minXP: 1500 },
  { title: "Bergführer", icon: Mountains, minXP: 3000 },
  { title: "Weltreisender", icon: Binoculars, minXP: 6000 },
];

export function rankOf(xp: number): { current: Rank; next: Rank | null; progress: number } {
  let current = RANKS[0];
  for (const r of RANKS) if (xp >= r.minXP) current = r;
  const idx = RANKS.indexOf(current);
  const next = RANKS[idx + 1] ?? null;
  const progress = next ? (xp - current.minXP) / (next.minXP - current.minXP) : 1;
  return { current, next, progress: Math.min(1, Math.max(0, progress)) };
}

/* ---------- Medallas ---------- */

export interface Badge {
  id: string;
  icon: Icon;
  title: string; // nombre de expedición, en el idioma que se aprende
  desc: string; // qué la gana
  earned: boolean;
  /** progreso 0..1 hacia ganarla (para la psicología del "casi") */
  progress: number;
  /** idioma del TÍTULO ("de" | "en") — el atributo lang del HTML, para que el
      lector de pantalla y el TTS no lean "First Steps" en alemán */
  lang: string;
}

/** ítems del SRS que pertenecen al curso de UN idioma (la "mochila" de ese
    idioma): st.items es una bolsa común, y contarla entera mezclaba expediciones */
function srsItemsOf(st: ServerState | null, lang: string): number {
  const ids = vocabIdSet(lang);
  return Object.keys(st?.items ?? {}).filter((id) => ids.has(id)).length;
}

/** fábrica de medallas de UNA expedición: fija el idioma del título */
type BadgeFn = (id: string, icon: Icon, title: string, desc: string, value: number, goal: number) => Badge;
const mkBadge = (lang: string): BadgeFn => (id, icon, title, desc, value, goal) => ({
  id, icon, title, desc, lang,
  // meta 0 = nivel registrado sin contenido: ni se regala la medalla ni se
  // divide por cero (0/0 pintaba una barra NaN)
  earned: goal > 0 && value >= goal,
  progress: goal > 0 ? Math.min(1, value / goal) : 0,
});

export function computeBadges(st: ServerState | null): Badge[] {
  const lessons = st?.lessons ?? {};
  // las medallas de expedición actuales son del A1 — el A2 tendrá las suyas;
  // así "Gipfelstürmer" no se convierte en una meta móvil al crecer el curso
  const a1LessonIds = new Set(
    course.phases.filter((p) => (p.level ?? "a1") === "a1").flatMap((p) => p.lessons.map((l) => l.id)),
  );
  const done = Object.entries(lessons).filter(([id, s]) => a1LessonIds.has(id) && s.completed).length;
  const total = a1LessonIds.size;
  const streak = st?.streakDays ?? 0;
  // Sammler es una medalla de la expedición ALEMANA: cuenta la mochila alemana.
  // Antes contaba Object.keys(items) a secas y se ganaba con palabras inglesas
  // (el inglés tiene la suya, "Word Hoard", en englishBadges).
  const srsItems = srsItemsOf(st, "de");
  const a1Phases = course.phases.filter((p) => (p.level ?? "a1") === "a1");
  const certs = a1Phases.filter((p) => moduleCert(p, st).earned).length;
  // Prüfling y Redner son medallas de la EXPEDICIÓN ALEMANA: se ganaban con un
  // simulacro o una entrevista de inglés, que ya tienen sus propias medallas en
  // englishBadges. El id de un simulacro inglés lleva su idioma («exam-en-sim-a»),
  // así que se puede distinguir sin adivinar.
  const examPassed = Object.entries(lessons).some(
    ([id, s]) => isExamSimResult(id) && !id.includes("-en-") && s.bestScore >= 0.6,
  );
  const interviewPassed = (lessons[INTERVIEW_ID]?.bestScore ?? 0) >= 0.6;

  const b = mkBadge("de");

  return [
    b("erste-schritte", Footprints, "Erste Schritte", "Completa tu primera lección", done, 1),
    b("wanderweg", PersonSimpleHike, "Wanderweg", "Completa 10 lecciones", done, 10),
    b("entdeckung", Compass, "Entdeckung", "Completa 25 lecciones", done, 25),
    b("expedition", MapTrifold, "Expedition", "Completa 50 lecciones", done, 50),
    b("gipfel", Mountains, "Gipfelstürmer", `Completa las ${total} lecciones del A1`, done, total),
    b("funke", Fire, "Funke", "3 días seguidos estudiando", streak, 3),
    b("flamme", Fire, "Flamme", "7 días seguidos", streak, 7),
    b("feuerwerk", Fire, "Feuerwerk", "30 días seguidos", streak, 30),
    b("sammler", Backpack, "Sammler", "200 palabras alemanas en tu mochila de repaso", srsItems, 200),
    b("meister", Medal, "Modul-Meister", "Certifica tu primer módulo (prueba ≥80%)", certs, 1),
    b("redner", Microphone, "Redner", "Aprueba la entrevista oral (≥60%)", interviewPassed ? 1 : 0, 1),
    b("pruefling", GraduationCap, "Prüfling", "Aprueba un simulacro completo (≥60%)", examPassed ? 1 : 0, 1),
    b("weltklasse", Trophy, "Weltklasse", "Certifica todos los módulos del A1", certs, a1Phases.length),
    // ── expediciones de los DEMÁS niveles del alemán (A2, B1…): cada nivel
    //    tiene las suyas y solo aparecen si el drop lo trae — así el A2 deja
    //    de estar huérfano y añadir B1 no toca este archivo ──
    ...levelBadges("de", st),
    // ── expedición INGLESA (solo si este build trae el idioma — drop-gated) ──
    ...englishBadges(st),
    ...levelBadges("en", st),
  ];
}

/** Los cuatro hitos que tiene TODO nivel que no sea el fundacional, en la
 *  lengua de su expedición. `id` es la mitad final de una clave de progreso del
 *  alumno: se escribe una vez y no se renombra nunca. */
interface Hito {
  id: string;
  title: string;
  icon: Icon;
}

interface Expedition {
  /** prefijo de los ids de nivel. El alemán lo lleva VACÍO por historia
      (`a2-gipfel` ya vive en el fichero de progreso de la gente y renombrarlo
      sería borrarle la medalla); los idiomas nuevos llevan el suyo. */
  prefix: string;
  /** coletilla que sitúa la medalla cuando el nombre del nivel no basta —
      el alemán no la necesita: es la expedición de la casa */
  qualifier: string;
  /** en orden: primera lección · mitad del nivel · nivel entero · certificados */
  hitos: [Hito, Hito, Hito, Hito];
}

const EXPEDITIONS: Record<string, Expedition> = {
  de: {
    prefix: "",
    qualifier: "",
    hitos: [
      { id: "start", title: "Aufbruch", icon: Footprints },
      { id: "halbzeit", title: "Halbzeit", icon: PersonSimpleHike },
      { id: "gipfel", title: "Gipfel", icon: Mountains },
      { id: "meister", title: "Meisterschaft", icon: Trophy },
    ],
  },
  en: {
    prefix: "en-",
    qualifier: " de inglés",
    hitos: [
      { id: "start", title: "Kick-off", icon: Footprints },
      { id: "halfway", title: "Halfway", icon: PersonSimpleHike },
      { id: "summit", title: "Summit", icon: Mountains },
      { id: "mastery", title: "Mastery", icon: Trophy },
    ],
  },
};

/** Qué niveles dan medalla propia: todos menos el fundacional (A1, que tiene
 *  sus propios hitos aparte) y el c2 (todavía no hay curso que llegue tan
 *  lejos). No es LA escalera CEFR — es un subconjunto suyo con un criterio de
 *  producto propio — pero se deriva de ella igual, en vez de escribir los
 *  cuatro peldaños a mano dos veces. Orden fijo de recorrido: la lista de
 *  medallas no baila según el orden en que el generador de cursos haya
 *  metido las fases. */
const CEFR_LADDER = CEFR_SCALE.filter((c) => c !== "a1" && c !== "c2");

/** Medallas de los niveles de UN idioma que no son el fundacional (A1): mismas
 *  mecánicas, su propia meta y sus propios ids. Que sean por nivel es justo lo
 *  que impide que una medalla ya ganada —«Certifica todos los módulos del
 *  A1»— se convierta en meta móvil el día que aparece el A2. */
function levelBadges(lang: string, st: ServerState | null): Badge[] {
  const exp = EXPEDITIONS[lang];
  if (!exp) return [];
  const b = mkBadge(lang);
  const lessons = st?.lessons ?? {};
  const out: Badge[] = [];
  for (const cefr of CEFR_LADDER) {
    const phases = courseOf(lang).phases.filter((p) => (p.level ?? "a1") === cefr);
    if (phases.length === 0) continue; // nivel no incluido en este drop (o aún sin escribir)
    const name = cefr.toUpperCase();
    const ids = new Set(phases.flatMap((p) => p.lessons.map((l) => l.id)));
    const done = Object.entries(lessons).filter(([id, s]) => ids.has(id) && s.completed).length;
    const certs = phases.filter((p) => moduleCert(p, st).earned).length;
    const half = Math.max(1, Math.round(ids.size / 2));
    const [h1, h2, h3, h4] = exp.hitos;
    out.push(
      b(`${exp.prefix}${cefr}-${h1.id}`, h1.icon, `${name} · ${h1.title}`,
        `Completa tu primera lección del ${name}${exp.qualifier}`, done, 1),
      b(`${exp.prefix}${cefr}-${h2.id}`, h2.icon, `${name} · ${h2.title}`,
        `Completa la mitad del ${name}${exp.qualifier} (${half} lecciones)`, done, half),
      b(`${exp.prefix}${cefr}-${h3.id}`, h3.icon, `${name} · ${h3.title}`,
        `Completa las ${ids.size} lecciones del ${name}${exp.qualifier}`, done, ids.size),
      b(`${exp.prefix}${cefr}-${h4.id}`, h4.icon, `${name} · ${h4.title}`,
        `Certifica todos los módulos del ${name}${exp.qualifier}`, certs, phases.length),
    );
  }
  return out;
}

/** Medallas del inglés A1: mismas mecánicas, su propia expedición (títulos EN,
    como las alemanas van en alemán). Un build sin inglés no las enseña.
    Cuentan SOLO las fases del A1: contaban todas las del idioma, así que el día
    que aparezca el A2 «World Class» habría pasado a exigir A1+A2 y una medalla
    ya ganada se habría desganado sola. Los niveles nuevos traen las suyas
    (levelBadges), con ids nuevos. */
function englishBadges(st: ServerState | null): Badge[] {
  const b = mkBadge("en"); // sus títulos van en inglés: también su atributo lang
  const en = courseOf("en");
  if (en.phases.length === 0) return [];
  const a1Phases = en.phases.filter((p) => (p.level ?? "a1") === "a1");
  const lessons = st?.lessons ?? {};
  const enLessonIds = new Set(a1Phases.flatMap((p) => p.lessons.map((l) => l.id)));
  const done = Object.entries(lessons).filter(([id, s]) => enLessonIds.has(id) && s.completed).length;
  const total = enLessonIds.size;
  const certs = a1Phases.filter((p) => moduleCert(p, st).earned).length;
  return [
    b("en-first-steps", Footprints, "First Steps", "Completa tu primera lección de inglés", done, 1),
    b("en-on-the-road", PersonSimpleHike, "On the Road", "Completa 10 lecciones de inglés", done, 10),
    b("en-explorer", Compass, "Explorer", "Completa 25 lecciones de inglés", done, 25),
    b("en-summit", Mountains, "Summit", `Completa las ${total} lecciones del inglés A1`, done, total),
    b("en-module-master", Medal, "Module Master", "Certifica tu primer módulo de inglés (prueba ≥80%)", certs, 1),
    // la gemela de Sammler: cada idioma cuenta SU mochila de repaso
    b("en-word-hoard", Backpack, "Word Hoard", "200 palabras inglesas en tu mochila de repaso", srsItemsOf(st, "en"), 200),
    b("en-world-class", Trophy, "World Class", "Certifica todos los módulos del inglés A1", certs, a1Phases.length),
    // Las gemelas de Redner y Prüfling: antes esas dos medallas eran alemanas y
    // se ganaban con el examen y la entrevista de INGLÉS, así que el alumno de
    // inglés desbloqueaba un título en alemán y no tenía ninguno propio. Los
    // cortes son los del LanguageCert (50%), no los del Goethe.
    b(
      "en-speaker",
      Microphone,
      "Speaker",
      "Aprueba la entrevista oral de inglés (≥50%)",
      (lessons[INTERVIEW_EN_ID]?.bestScore ?? 0) >= 0.5 ? 1 : 0,
      1,
    ),
    b(
      "en-mock-exam",
      GraduationCap,
      "Mock Exam",
      "Aprueba un simulacro completo de inglés (≥50%)",
      Object.entries(lessons).some(([id, sc]) => isExamSimResult(id) && id.includes("-en-") && sc.bestScore >= 0.5)
        ? 1
        : 0,
      1,
    ),
  ];
}

/* ---------- Certificados por módulo (validez 1 mes) ---------- */

export const CERT_DAYS = 30;

export interface ModuleCert {
  phase: PhaseMeta;
  earned: boolean; // alguna vez logrado (prueba ≥80% con lecciones completas)
  valid: boolean; // vigente (renovado hace <30 días)
  since: Date | null;
  validUntil: Date | null;
  /** la MEJOR nota histórica (la que presume el certificado) */
  score: number | null;
  /** la nota del ÚLTIMO intento: es la que decide si sigue vigente */
  lastScore: number | null;
}

export function moduleCert(phase: PhaseMeta, st: ServerState | null): ModuleCert {
  const test = st?.lessons?.[testId(phase.id)];
  const allLessons = phase.lessons.every((l) => st?.lessons?.[l.id]?.completed);
  const earned = !!test && test.bestScore >= 0.8 && allLessons;
  // la vigencia se renueva con cada intento aprobado: lastAt + 30 días
  const renewedAt = earned && test!.lastScore >= 0.8 ? new Date(test!.lastAt) : null;
  const validUntil = renewedAt ? new Date(renewedAt.getTime() + CERT_DAYS * 86400_000) : null;
  return {
    phase,
    earned,
    valid: !!validUntil && validUntil.getTime() > Date.now(),
    since: renewedAt,
    validUntil,
    score: test ? Math.round(test.bestScore * 100) : null,
    // La nota que MANTIENE vivo el certificado es la del último intento, no la
    // mejor de la historia: el papel decía «superó su prueba con 95 %» cuando el
    // intento que lo renovó fue un 82 %.
    lastScore: test ? Math.round(test.lastScore * 100) : null,
  };
}

/** Certificado mayor: aval para presentarse al examen oficial de un idioma y nivel */
export interface ExamReadiness {
  ready: boolean;
  certsValid: number;
  certsTotal: number;
  examsPassed30d: number; // simulacros aprobados (corte del set) en los últimos 30 días
  /** cuántos sims distintos hace falta: 2, o 1 si el nivel solo tiene un Modellsatz */
  examsNeeded: number;
  /** rellenados solo cuando se llama con opts: el diploma pinta el título bueno */
  lang?: string;
  level?: Cefr;
}

/** Nombre del examen oficial que avala este diploma (el que ve el alumno). */
const EXAM_OFFICIAL: Record<string, Partial<Record<Cefr, string>>> = {
  de: {
    a1: "Start Deutsch 1",
    a2: "Goethe-Zertifikat A2",
    b1: "Goethe-Zertifikat B1",
    b2: "Goethe-Zertifikat B2",
  },
  en: {
    a1: "LanguageCert A1 Preliminary",
    a2: "LanguageCert A2 Access",
    b1: "LanguageCert B1 Achiever",
    b2: "LanguageCert B2 Communicator",
  },
};

export function officialExamName(lang: string, level: Cefr): string {
  return (
    EXAM_OFFICIAL[lang]?.[level] ??
    (lang === "en" ? `LanguageCert ${level.toUpperCase()}` : `Goethe-Zertifikat ${level.toUpperCase()}`)
  );
}

/** Título del diploma de nivel: Prüfungsreife / Ready for exam + el examen. */
export function examReadinessTitle(lang: string, level: Cefr): string {
  const exam = officialExamName(lang, level);
  return lang === "en" ? `Ready for exam · ${exam}` : `Prüfungsreife · ${exam}`;
}

export function examReadiness(
  st: ServerState | null,
  opts?: { lang?: string; level?: Cefr },
): ExamReadiness {
  const lang = opts?.lang;
  const level = opts?.level;
  if (lang && level) {
    const phases = courseOf(lang).phases.filter((p) => (p.level ?? "a1") === level);
    const certs = phases.map((p) => moduleCert(p, st));
    const certsValid = certs.filter((c) => c.valid).length;
    const certsTotal = certs.length;
    const now = Date.now();
    const windowMs = CERT_DAYS * 86400_000;
    // Corte POR set: Goethe 60, LanguageCert 50. Un 55 % inglés cuenta; el
    // mismo 55 % de un Goethe no. lastScore vive en 0..1.
    const sets = examsOf(lang).filter((e) => e.level === level);
    // Tope 2: si el nivel solo tiene un Modellsatz, uno basta; si tiene dos
    // o tres (B1 alemán, LanguageCert), el aval pide dos, no todos.
    const examsNeeded = Math.min(2, sets.length);
    const examsPassed30d = sets.filter((e) => {
      const id = examResultId(e.id);
      const s = st?.lessons?.[id];
      if (!s || !isExamSimResult(id)) return false;
      const passPct = e.scoring?.passPct ?? 60;
      return s.lastScore * 100 >= passPct && now - new Date(s.lastAt).getTime() < windowMs;
    }).length;
    return {
      ready: certsTotal > 0 && certsValid === certsTotal && examsNeeded > 0 && examsPassed30d >= examsNeeded,
      certsValid,
      certsTotal,
      examsPassed30d,
      examsNeeded,
      lang,
      level,
    };
  }

  const certs = course.phases.filter((p) => (p.level ?? "a1") === "a1").map((p) => moduleCert(p, st));
  const certsValid = certs.filter((c) => c.valid).length;
  const now = Date.now();
  // Default histórico: alemán A1 + TODOS los sims DE (corte Goethe 60 %).
  // Sin opts no se toca, para no romper examReadiness(st).
  const deSimIds = new Set(examsOf("de").map((e) => examResultId(e.id)));
  const examsPassed30d = Object.entries(st?.lessons ?? {}).filter(
    ([id, s]) =>
      isExamSimResult(id) &&
      deSimIds.has(id) &&
      s.lastScore >= 0.6 &&
      now - new Date(s.lastAt).getTime() < CERT_DAYS * 86400_000,
  ).length;
  return {
    ready: certsValid === certs.length && examsPassed30d >= 2,
    certsValid,
    certsTotal: certs.length,
    examsPassed30d,
    examsNeeded: 2,
  };
}

/* ---------- Avatares de explorador ---------- */

export const AVATARS: { id: string; icon: Icon }[] = [
  { id: "compass", icon: Compass },
  { id: "mountains", icon: Mountains },
  { id: "backpack", icon: Backpack },
  { id: "map", icon: MapTrifold },
  { id: "binoculars", icon: Binoculars },
  { id: "hike", icon: PersonSimpleHike },
  { id: "fire", icon: Fire },
  { id: "trophy", icon: Trophy },
];

export const AVATAR_COLORS = ["#b45309", "#7c3aed", "#0f766e", "#1d4ed8", "#a21caf", "#166534", "#b91c1c", "#78350f"];

export function AvatarIcon({ id, size = 24 }: { id?: string; size?: number }) {
  const found = AVATARS.find((a) => a.id === id) ?? AVATARS[0];
  const IconCmp = found.icon;
  return <IconCmp size={size} weight="duotone" aria-hidden />;
}
