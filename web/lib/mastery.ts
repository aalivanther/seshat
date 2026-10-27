// DOMINIO POR MÓDULO — el diagnóstico que se mueve solo.
//
// El examen de colocación es una foto del día que se hizo. Lo que el alumno
// quiere ver después es la película: cómo eso que salía flojo va subiendo a
// medida que estudia. Este archivo calcula ese dominio a partir de lo que ya
// hay en el perfil, sin pedirle nada nuevo:
//
//   · las lecciones terminadas del módulo (¿lo ha visto entero?)
//   · la nota de su prueba (¿lo sabe producir mezclado?)
//   · la fuerza en el repaso de SUS palabras (¿le dura, o se le cae?)
//
// Los tres pesan distinto a propósito: haber pasado por las lecciones es lo
// más barato de conseguir, y la memoria a largo plazo es lo que de verdad dice
// que algo está aprendido.

import type { PhaseMeta, ServerState } from "./types";
import { testId, missionId } from "./ids";
import { phaseWords } from "@/data/phaseWords.gen";

export type MasteryState = "sin-empezar" | "en-marcha" | "asentado" | "dominado";

export interface ModuleMastery {
  phase: PhaseMeta;
  /** 0-100: lo que se pinta en la barra */
  pct: number;
  state: MasteryState;
  lessonsDone: number;
  lessonsTotal: number;
  /** nota de la prueba del módulo (0-100) o null si aún no la ha hecho */
  testPct: number | null;
  /** cuántas de sus palabras aguantan ya un intervalo largo */
  strongWords: number;
  words: number;
}

/** Una palabra «aguanta» cuando el SRS la ha empujado a 21 días o más: eso ya
 *  no es memoria de ayer, es memoria de verdad. */
const DIAS_FUERTE = 21;

export function moduleMastery(phase: PhaseMeta, st: ServerState | null): ModuleMastery {
  const lessons = phase.lessons ?? [];
  const lessonsDone = lessons.filter((l) => st?.lessons?.[l.id]?.completed).length;
  const lessonsTotal = lessons.length;

  const test = st?.lessons?.[testId(phase.id)];
  const testPct = typeof test?.bestScore === "number" ? Math.round(test.bestScore * 100) : null;

  // las palabras del módulo: las que aparecen en sus lecciones (frases y
  // ejercicios). Las junta gen-derived.mjs en el build: recorrerlas aquí
  // obligaba a traer el contenido de todas las lecciones al perfil.
  const ids = new Set<string>(phaseWords[phase.id] ?? []);
  const words = ids.size;
  let strongWords = 0;
  for (const id of ids) {
    const it = st?.items?.[id];
    if (it && it.intervalDays >= DIAS_FUERTE) strongWords += 1;
  }

  // 30% recorrido · 25% prueba · 25% memoria · 20% misión (can-do). Sin
  // prueba hecha, su parte no se regala. Sin misión en el módulo, ese 20%
  // se reparte entre prueba y memoria para no penalizar A1 sin TBLT.
  const recorrido = lessonsTotal ? lessonsDone / lessonsTotal : 0;
  const prueba = testPct !== null ? testPct / 100 : 0;
  const memoria = words ? strongWords / words : 0;
  const misionHecha = st?.lessons?.[missionId(phase.id)]?.completed ? 1 : 0;
  const pct = Math.round((recorrido * 0.3 + prueba * 0.25 + memoria * 0.25 + misionHecha * 0.2) * 100);

  const state: MasteryState =
    lessonsDone === 0 ? "sin-empezar" : pct >= 85 ? "dominado" : pct >= 60 ? "asentado" : "en-marcha";

  return { phase, pct, state, lessonsDone, lessonsTotal, testPct, strongWords, words };
}

export const MASTERY_LABEL: Record<MasteryState, string> = {
  "sin-empezar": "sin empezar",
  "en-marcha": "en marcha",
  asentado: "asentado",
  dominado: "dominado",
};

/** Resumen para la cabecera del diagnóstico: cuántos módulos hay en cada estado. */
export function masterySummary(all: ModuleMastery[]): Record<MasteryState, number> {
  const out: Record<MasteryState, number> = {
    "sin-empezar": 0, "en-marcha": 0, asentado: 0, dominado: 0,
  };
  for (const m of all) out[m.state] += 1;
  return out;
}
