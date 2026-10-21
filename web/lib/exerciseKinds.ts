import type { ExerciseType } from "./types";

/** Lo que el motor necesita saber de un tipo de ejercicio. Seis preguntas que
 *  hasta la 1.9.9 se contestaban en tres ficheros distintos (`retoRun.ts` ×4,
 *  `moduleTest.ts`, `ExercisePlayer.tsx`), cada una con su propia lista de
 *  tipos — PLAN 1.9.9 FASE 3 (Type Object, no fusión: las preguntas siguen
 *  siendo cinco/seis preguntas distintas, lo que desaparece es que vivieran
 *  repartidas). La ganancia: hoy, añadir un tipo y olvidarte de una columna
 *  ya no pasa en silencio — `Record<ExerciseType, ...>` exige las seis. */
export interface ExerciseKindTraits {
  /** ¿sirve para calentar en un Reto? (antes `WARM_TYPES`, retoRun.ts) */
  warm: boolean;
  /** ¿es núcleo de una run de Reto? (antes `CORE_TYPES`, retoRun.ts) */
  core: boolean;
  /** ¿es el tramo de cierre —producción— de un Reto? (antes `PEAK_TYPES`,
   *  retoRun.ts: no citado en el censo del plan, pero es el mismo eje) */
  peak: boolean;
  /** ¿necesita voz de verdad para poder contestarse? (antes `AUDIO_TYPES`,
   *  retoRun.ts: sin voz instalada, un ejercicio así no puede costar vidas) */
  audio: boolean;
  /** dónde cuenta en la prueba de módulo (antes `RECALL_TYPES` de
   *  moduleTest.ts MÁS su propio filtro de producción, que vivía repartido en
   *  un `if` aparte): "production" cuenta para el ~60% de producción,
   *  "recall" para el resto, "excluded" no entra en la prueba en absoluto. */
  moduleTest: "production" | "recall" | "excluded";
  /** ¿merece segundo intento con pista automática? (antes `RETRYABLE`,
   *  ExercisePlayer.tsx) */
  retryable: boolean;
}

/**
 * `translate` es la única excepción real: su tramo (warm/peak) y su papel en
 * la prueba de módulo dependen de la DIRECCIÓN de la traducción —hacia el
 * idioma es producción desde cero; al español, reconocimiento— que es un dato
 * de la INSTANCIA del ejercicio (`exercise.direction`), no de su tipo. Por
 * eso `retoRun.ts` y `moduleTest.ts` siguen mirando esa propiedad para este
 * tipo en concreto; los valores de aquí son los que aplican en cualquier otro
 * caso (y son los correctos para `retryable`, que SÍ es fijo: siempre true).
 */
export const EXERCISE_KINDS: Record<ExerciseType, ExerciseKindTraits> = {
  mc: { warm: true, core: false, peak: false, audio: false, moduleTest: "excluded", retryable: false },
  cloze: { warm: false, core: true, peak: false, audio: false, moduleTest: "recall", retryable: true },
  build: { warm: false, core: false, peak: true, audio: false, moduleTest: "recall", retryable: true },
  match: { warm: true, core: false, peak: false, audio: false, moduleTest: "excluded", retryable: false },
  type: { warm: false, core: false, peak: true, audio: false, moduleTest: "production", retryable: true },
  listen: { warm: false, core: true, peak: false, audio: true, moduleTest: "recall", retryable: true },
  speak: { warm: false, core: false, peak: false, audio: false, moduleTest: "excluded", retryable: false },
  order: { warm: false, core: true, peak: false, audio: false, moduleTest: "recall", retryable: false },
  transform: { warm: false, core: false, peak: true, audio: false, moduleTest: "production", retryable: true },
  // ver la nota de arriba: warm/peak/moduleTest no se usan para este tipo.
  translate: { warm: false, core: false, peak: false, audio: false, moduleTest: "recall", retryable: true },
  bucket: { warm: true, core: true, peak: false, audio: false, moduleTest: "recall", retryable: false },
  shadow: { warm: false, core: false, peak: false, audio: false, moduleTest: "excluded", retryable: false },
  fastmatch: { warm: true, core: false, peak: false, audio: false, moduleTest: "excluded", retryable: false },
  // dos opciones = 50% azar: vale para lección y Reto, no para una PRUEBA que
  // certifica módulo (la razón por la que queda excluida, no solo "recall").
  hearreal: { warm: false, core: true, peak: false, audio: true, moduleTest: "excluded", retryable: false },
  write: { warm: false, core: false, peak: false, audio: false, moduleTest: "production", retryable: true },
  audiomc: { warm: false, core: true, peak: false, audio: true, moduleTest: "excluded", retryable: false },
  read: { warm: false, core: false, peak: false, audio: false, moduleTest: "excluded", retryable: false },
  gapbank: { warm: false, core: true, peak: false, audio: false, moduleTest: "recall", retryable: true },
  errorfix: { warm: false, core: true, peak: false, audio: false, moduleTest: "recall", retryable: true },
  paraphrase: { warm: false, core: false, peak: true, audio: false, moduleTest: "production", retryable: true },
  monologue: { warm: false, core: false, peak: false, audio: false, moduleTest: "excluded", retryable: false },
};
