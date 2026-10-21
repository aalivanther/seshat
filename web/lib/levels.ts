// Registro de niveles — el cimiento modular del curso completo, ahora
// MULTI-IDIOMA: un nivel pertenece a un idioma (id compuesto "de-a1") y sus
// fases salen del curso de ESE idioma filtradas por su CEFR.
// Añadir un nivel = crear sus data/*.ts, registrarlos en gen-course.mjs,
// y activarlo aquí. Todas las páginas leen de este registro.

export interface Level {
  id: string; // "de-a1" — usado en rutas /nivel/[id]
  lang: string; // idioma dueño ("de" | "en")
  cefr: Cefr; // lo que declaran las fases en .level
  /** posición en la escala CEFR — DERIVADA de `cefr`, nunca escrita a mano
   *  (PLAN 1.9.9 F1.2): un nivel no puede discrepar de su propio cefr. */
  rank: number;
  name: string; // "A1"
  title: string; // "Nivel A1 · Principiante"
  desc: string;
  /** subtítulo del hub del nivel: a dónde lleva */
  goal: string;
  available: boolean;
}

import { levelInDrop } from "./drop";
import { placedLevel } from "./placement";
import { cefrAtOrBelow, cefrRank, type Cefr } from "./cefr";
import { examResultId, testId } from "./ids";
import { courseOf } from "@/data/course";
import { examsOf } from "@/data/exams";
import type { Phase, ServerState } from "./types";

/** PLAN 1.9.9.5 §B.4: una sola lección del nivel siguiente no cuenta como
 *  haber empezado ese nivel — decisión del dueño, 2026-09-02.
 *  Umbral declarado, no un número a ojo: el 20% del nivel, o el simulacro /
 *  la prueba de un módulo aprobados (ver `levelCredit`, más abajo). */
/** Decisión 16-09-2026 (cierre previo al B2 §2.12): el plan 1.9.9.5 decía 30 %;
 *  el código lleva 20 % desde esa versión. Se declara aquí, con tests de
 *  frontera, y no se reabre. Una lección de 108 no basta; 22 de 108 sí. */
export const LEVEL_STARTED_THRESHOLD = 0.2;

/** Fracción del nivel que cuenta como "hecha" para saber en qué nivel estás
 *  de verdad (PLAN 1.9.9.5 §B.2/§B.4). Cuenta:
 *  - cada lección completada, 1 unidad;
 *  - aprobar la prueba de un módulo (`testId`) certifica el módulo ENTERO,
 *    aunque el alumno se saltara alguna lección suelta — pasar la prueba es
 *    evidencia más fuerte que una lección individual, no más débil;
 *  - misiones y retos NO cuentan: son práctica, no acreditación (decisión
 *    del dueño) — por eso ni se miran aquí.
 *  El examen del nivel se trata aparte (`levelExamPassed`): aprobarlo basta
 *  por sí solo, sin pasar por este cociente. */
function levelCredit(lv: Level, phases: Phase[], st: ServerState | null): number {
  const myPhases = phases.filter((p) => (p.level ?? "a1") === lv.cefr);
  const total = myPhases.reduce((n, p) => n + p.lessons.length, 0);
  if (total === 0) return 0;
  let done = 0;
  for (const p of myPhases) {
    if (st?.lessons?.[testId(p.id)]?.completed) {
      done += p.lessons.length;
      continue;
    }
    done += p.lessons.filter((l) => st?.lessons?.[l.id]?.completed).length;
  }
  return done / total;
}

/** Aprobar el simulacro oficial del nivel certifica el nivel entero, aunque
 *  no haya ni una lección marcada (PLAN 1.9.9.5 §B.2). */
function levelExamPassed(lang: string, lv: Level, st: ServerState | null): boolean {
  return examsOf(lang).some((ex) => ex.level === lv.cefr && st?.lessons?.[examResultId(ex.id)]?.completed);
}

/** Por qué módulo vas de este nivel — PLAN 1.9.9.5 §B.3. `null` si no hay
 *  ninguno empezado o el nivel no tiene módulos reales en este build.
 *  Un resumen de POSICIÓN, no de vocabulario: cabe en una frase y no exige
 *  tocar `seenItems`. */
export function modulePosition(
  lang: string,
  cefr: Cefr,
  st: ServerState | null,
): { done: number; total: number } | null {
  const phases = courseOf(lang).phases.filter((p) => (p.level ?? "a1") === cefr);
  if (phases.length === 0) return null;
  let done = 0;
  for (const p of phases) {
    const started = Boolean(st?.lessons?.[testId(p.id)]?.completed) || p.lessons.some((l) => st?.lessons?.[l.id]?.completed);
    if (started) done = Math.max(done, p.n);
  }
  return done > 0 ? { done, total: phases.length } : null;
}

/** ¿Se le puede enseñar este nivel al alumno HOY? Dos condiciones, no una:
 *  que su drop esté horneado en este build Y que su contenido viaje dentro.
 *  Un nivel puede estar registrado mucho antes de tener módulos —el inglés A2
 *  y B1 lo están desde que la tutora y el corrector necesitaron saber que
 *  existen—, y pintarlo entonces sería una tarjeta de cero módulos. */
/** Drop horneado Y al menos una fase de ese CEFR. El flag `available` se
 *  estampa al importar; el techo y el desbloqueo miran ESTO en vivo, para
 *  que un `available: true` a pelo no abra un B2 fantasma. */
export function ready(id: string, lang: string, cefr: Level["cefr"]): boolean {
  return levelInDrop(id) && courseOf(lang).phases.some((p) => (p.level ?? "a1") === cefr);
}

/** literal sin `rank`: se deriva abajo en un solo sitio, nunca a mano. */
const RAW_LEVELS: Omit<Level, "rank">[] = [
  {
    id: "de-a1",
    lang: "de",
    cefr: "a1",
    name: "A1",
    title: "Nivel A1 · Principiante",
    desc: "Del primer «Hallo» al examen Goethe-Zertifikat A1 (Start Deutsch 1): presentarte, tu gente, tu día, comer y comprar, tu casa, tu tiempo libre.",
    goal: "Hazlos en orden: cada módulo recicla el vocabulario del anterior, hasta el Start Deutsch 1.",
    available: ready("de-a1", "de", "a1"),
  },
  {
    id: "de-a2",
    lang: "de",
    cefr: "a2",
    name: "A2",
    title: "Nivel A2 · Básico",
    desc: "Contar tu pasado (Perfekt y Präteritum), dativo completo, subordinadas con weil/dass/wenn y comparaciones — rumbo al Goethe-Zertifikat A2.",
    goal: "Todo tu A1 sigue en juego: cada módulo nuevo lo recicla mientras añade lo suyo.",
    available: ready("de-a2", "de", "a2"),
  },
  {
    id: "de-b1",
    lang: "de",
    cefr: "b1",
    name: "B1",
    title: "Nivel B1 · Intermedio",
    desc: "El nivel que te vuelve autónomo: Konjunktiv II, Passiv, relativas y subordinadas encadenadas, textos largos, opinar y argumentar — rumbo al Goethe-Zertifikat B1 (que es también el ÖSD B1).",
    goal: "Aquí el idioma deja de ser frases sueltas: se lee de corrido, se escribe con estructura y se habla tres minutos seguidos.",
    available: ready("de-b1", "de", "b1"),
  },
  {
    id: "de-b2",
    lang: "de",
    cefr: "b2",
    name: "B2",
    title: "Nivel B2 · Intermedio alto",
    desc: "Dejar de defenderte en alemán y empezar a discutir: citar sin firmarlo, despersonalizar, nominalizar, argumentar y sintetizar dos fuentes — rumbo al Goethe-Zertifikat B2.",
    goal: "Aquí el alemán se vuelve escrito y propio: del Konjunktiv I al Vortrag de cuatro minutos, sin reenseñar el B1.",
    available: ready("de-b2", "de", "b2"),
  },
  {
    id: "en-a1",
    lang: "en",
    cefr: "a1",
    name: "A1",
    title: "Nivel A1 · Principiante",
    desc: "Del primer «Hello» al examen oficial LanguageCert ESOL A1: presentarte, tu gente, tu día, comprar, tu casa y tu tiempo libre — en inglés real.",
    goal: "Hazlos en orden: cada módulo recicla el vocabulario del anterior, hasta el examen A1.",
    available: ready("en-a1", "en", "a1"),
  },
  // ── El inglés A2 y B1 están REGISTRADOS antes de existir a propósito: sin
  //    ellos `highestStartedCefr("en")` devolvía "a1" pasara lo que pasara, y
  //    la tutora conversaba en A1 con quien ya iba por B1. Mientras no tengan
  //    módulos, `ready()` los deja no disponibles y el hub los pinta como lo
  //    que son: un nivel que llega en un drop próximo. ──
  {
    id: "en-a2",
    lang: "en",
    cefr: "a2",
    name: "A2",
    title: "Nivel A2 · Básico",
    desc: "Contar lo que pasó (past simple y there was/were), describir con adverbios, comparar, planear con going to y moverte entre permisos y obligaciones — rumbo al LanguageCert ESOL A2 Access.",
    goal: "Aquí el inglés deja el presente: cada módulo recicla tu A1 y le añade su tiempo verbal.",
    available: ready("en-a2", "en", "a2"),
  },
  {
    id: "en-b1",
    lang: "en",
    cefr: "b1",
    name: "B1",
    title: "Nivel B1 · Intermedio",
    desc: "El nivel que te vuelve autónomo en inglés: present perfect frente a past simple, used to, condicionales, relativas y conectores para argumentar, textos largos y escritura de examen — rumbo al LanguageCert ESOL B1 Achiever.",
    goal: "Aquí el inglés deja de ser frases sueltas: se lee de corrido, se escribe con estructura y se sostienen doce minutos de oral.",
    available: ready("en-b1", "en", "b1"),
  },
  {
    id: "en-b2",
    lang: "en",
    cefr: "b2",
    name: "B2",
    title: "Nivel B2 · Intermedio alto",
    desc: "Pericia discursiva, no más gramática rara: el párrafo, el registro a voluntad, sintetizar dos fuentes y negociar hasta el plan — rumbo al LanguageCert ESOL B2 Communicator.",
    goal: "Aquí el inglés deja de ser B1 con palabras más largas: se enlaza, se matiza el compromiso y se cambia de registro sin avisar.",
    available: ready("en-b2", "en", "b2"),
  },
];

export const levels: Level[] = RAW_LEVELS.map((lv) => ({ ...lv, rank: cefrRank(lv.cefr) }));

export function getLevel(id: string): Level | undefined {
  return levels.find((l) => l.id === id);
}

/** compat con rutas viejas: /nivel/a1 (pre-multi-idioma) era el alemán */
export function resolveLevelId(id: string): Level | undefined {
  return getLevel(id) ?? getLevel(`de-${id}`);
}

/** niveles de un idioma (para el hub /idioma/[lang]) */
export function levelsOf(lang: string): Level[] {
  return levels.filter((l) => l.lang === lang);
}

/** Techo enseñado en ESTE build: drop + fases, no el flag estampado al importar. */
export function courseCeiling(lang: string): Cefr {
  const own = levelsOf(lang);
  let last: Cefr = "a1";
  for (const lv of own) {
    if (ready(lv.id, lv.lang, lv.cefr)) last = lv.cefr;
  }
  return last;
}

/** fases (módulos) de un nivel: las de SU idioma con SU cefr */
export function phasesOf(level: Level): Phase[] {
  return courseOf(level.lang).phases.filter((p) => (p.level ?? "a1") === level.cefr);
}

/** Nivel más alto de un idioma en el que el alumno YA arrancó de verdad
    (el primero disponible si todavía no ha empezado). `levels` va de menor a
    mayor, así que el último que casa es el más alto.
    Lo usa el compañero de conversación: hablarle A1 a quien va por B1 era
    vender un curso hasta B1 y practicarlo como un A1.

    PLAN 1.9.9.5 §B.2/§B.4: "arrancado" ya no es "una lección cualquiera".
    Cuenta aprobar el simulacro del nivel (certifica el nivel entero) o
    llegar al `LEVEL_STARTED_THRESHOLD` de créditos del nivel (lecciones +
    pruebas de módulo aprobadas — ver `levelCredit`/`levelExamPassed`).
    Misiones y retos no cuentan: son práctica, no acreditación. */
export function highestStartedCefr(lang: string, st: ServerState | null): Level["cefr"] {
  const own = levelsOf(lang);
  const phases = courseOf(lang).phases;
  // el suelo es el primer nivel que este build enseña de verdad
  let best: Level["cefr"] = own.find((lv) => lv.available)?.cefr ?? own[0]?.cefr ?? "a1";
  // manda el CONTENIDO, no la disponibilidad: si el alumno ha completado
  // lecciones de un nivel es que sus módulos están en el build, y hablarle por
  // debajo de ahí es el error que esto arregla. Un nivel registrado y vacío no
  // tiene lecciones que completar, así que nunca sube el listón solo.
  for (const lv of own) {
    const started = levelExamPassed(lang, lv, st) || levelCredit(lv, phases, st) >= LEVEL_STARTED_THRESHOLD;
    if (started) best = lv.cefr;
  }
  // la prueba de nivel puede haber colocado más arriba de lo que el alumno ha
  // empezado de verdad: gana el mayor de los dos (PLAN 1.9.8 §3.2), nunca el
  // menor — hablarle por debajo de su nivel colocado es el error que se arregla.
  const placed = placedLevel(st, lang);
  if (placed && cefrRank(placed) > cefrRank(best)) best = placed;
  return best;
}

/** El nivel MÁS ALTO de un idioma que existe de verdad en este build, sin pasar
 *  del que se pide. La prueba de nivel puede colocar a alguien en A2 o B1 de
 *  inglés —mide hasta C1— cuando el curso de inglés todavía es solo A1: mandarlo
 *  a `/nivel/en-a2` era un 404 en la cara justo después de aprobar.
 *
 *  PLAN 1.9.9 §1.1: antes comparaba contra un array propio de solo tres
 *  peldaños (a1, a2, b1) que no llegaba a b2/c1 — `indexOf` daba -1 para un
 *  nivel fuera de ahí, y
 *  -1 <= CUALQUIER techo, así que un nivel por encima del máximo real (el B2,
 *  el día que exista) se colaba para cualquier colocación. `cefrAtOrBelow`
 *  usa la escala real de 6 peldaños: no hay valor de `lv.cefr` que dé -1. */
export function highestAvailableUpTo(lang: string, cefr: Cefr): Level | undefined {
  const posibles = levelsOf(lang).filter((lv) => ready(lv.id, lv.lang, lv.cefr) && cefrAtOrBelow(lv.cefr, cefr));
  return posibles[posibles.length - 1];
}

/** nivel dueño de una fase — para migas y desbloqueo */
export function levelOfPhase(phaseId: string): Level | undefined {
  return levels.find((lv) => phasesOf(lv).some((p) => p.id === phaseId));
}
