// El curso REAL de este build vive en course.gen.ts (generado por
// scripts/gen-course.mjs según el drop — así el contenido no liberado ni se
// importa ni viaja en el bundle). Aquí solo helpers estables.
//
// MULTI-IDIOMA: courses es el registry idioma→curso. `course` (compat) es el
// curso ALEMÁN — el código específico de alemán (logros A1, herramientas de
// entrevista) lo sigue usando a propósito; el código genérico usa courseOf().
import type { Course } from "@/lib/types";
export { courses, BUILT_DROP, missionsByLang } from "./course.gen";
import { courses, missionsByLang } from "./course.gen";

const EMPTY: Course = { phases: [], vocab: {} };

/** curso de un idioma — vacío si este build no trae ese idioma */
export function courseOf(lang: string): Course {
  return courses[lang] ?? EMPTY;
}

/** compat: el curso alemán (el histórico `course` singleton) */
export const course: Course = courseOf("de");

/** busca una lección en TODOS los idiomas (los ids son únicos globalmente:
    los de inglés van prefijados "en…") y dice de qué idioma es */
export function findLesson(id: string) {
  for (const [lang, c] of Object.entries(courses)) {
    for (const p of c.phases) {
      const l = p.lessons.find((l) => l.id === id);
      if (l) return { lang, phase: p, lesson: l };
    }
  }
  return null;
}

/** idioma dueño de una fase (módulo) — para adoptar su config al entrar */
export function langOfPhase(phaseId: string): string {
  for (const [lang, c] of Object.entries(courses)) {
    if (c.phases.some((p) => p.id === phaseId)) return lang;
  }
  return "de";
}

/** misión de práctica real de un módulo (undefined si su drop no la trae) */
export function missionOf(phaseId: string) {
  return missionsByLang[langOfPhase(phaseId)]?.[phaseId];
}
