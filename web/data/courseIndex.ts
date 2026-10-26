// El curso tal como lo ve el CLIENTE: módulos y lecciones sin su contenido.
// Mismas funciones que data/course.ts, sobre el índice que deriva
// scripts/gen-derived.mjs. data/course.ts (el curso entero) queda para las
// páginas de servidor, que recortan lo que cada pantalla necesita, y para los
// tests: importarlo desde un componente cliente volvía a meter ~9 MB de
// JavaScript en cada página (lib/__tests__/clientBundle.test.ts lo vigila).
import type { CourseIndex, MissionMeta } from "@/lib/types";
import { courseIndex, missionIndex } from "./courseIndex.gen";
export { BUILT_DROP } from "./drop.gen";

/** registry idioma → índice: SOLO los idiomas con contenido en este drop */
export const courses: Record<string, CourseIndex> = courseIndex;

/** misiones de cada idioma, sin su cuerpo (la página de la misión lo recibe entero) */
export const missionsByLang: Record<string, Record<string, MissionMeta>> = missionIndex;

const EMPTY: CourseIndex = { phases: [], vocabCount: 0 };

/** índice de un idioma — vacío si este build no trae ese idioma */
export function courseOf(lang: string): CourseIndex {
  return courses[lang] ?? EMPTY;
}

/** compat: el curso alemán (el histórico `course` singleton) */
export const course: CourseIndex = courseOf("de");

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
export function missionOf(phaseId: string): MissionMeta | undefined {
  return missionsByLang[langOfPhase(phaseId)]?.[phaseId];
}
