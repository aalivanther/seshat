// Recortes del curso para las páginas de SERVIDOR (lección y reto).
// El curso entero no viaja al navegador: cada página recibe de aquí, ya
// hecho, lo único que su pantalla lee. Solo pueden importarlo los page.tsx
// de servidor y los tests (lib/__tests__/clientBundle.test.ts lo vigila).

import { courses } from "@/data/course";
import type { Lesson, VocabItem } from "./types";
import type { RetoSource } from "./retoRun";
import { retoLangOf } from "./retoLevel";
import { newWordsIn } from "./newWords";

/** Las tarjetas que presentan las secciones de frases de la lección: las
 *  mismas que LessonPlayer busca con resolveItems (mismo recorte de ids). */
export function lessonVocab(lesson: Lesson, vocab: Record<string, VocabItem>): Record<string, VocabItem> {
  const out: Record<string, VocabItem> = {};
  for (const sec of lesson.sections) {
    if (sec.kind !== "phrases" || !Array.isArray(sec.itemIds)) continue;
    for (const raw of sec.itemIds.slice(0, 500)) {
      const id = typeof raw === "string" ? raw.trim() : "";
      if (id && Object.hasOwn(vocab, id)) out[id] = vocab[id];
    }
  }
  return out;
}

/** Las palabras nuevas de cada ejercicio, en el orden en que la lección los
 *  pone en pantalla. Calcularlas pide recorrer el curso entero hasta esta
 *  lección: aquí se hace una vez, en el build, y no en cada render. */
export function lessonFreshWords(lesson: Lesson): string[][] {
  return lesson.sections
    .filter((sec) => sec.kind === "exercises" && sec.exercises)
    .flatMap((sec) => sec.exercises!.map((ex) => newWordsIn(ex, lesson.id)));
}

/** Los ids de frase de los módulos ANTERIORES del mismo idioma, en orden
 *  (con repeticiones, como los recorría el motor): de ahí salen las visitas
 *  del pasado. Ninguno para el primer módulo ni para el reto de nivel. */
export function retoPastPhraseIds(phaseId: string): string[] {
  const course = courses[retoLangOf(phaseId)];
  if (!course) return [];
  const idx = course.phases.findIndex((p) => p.id === phaseId);
  if (idx <= 0) return [];
  return course.phases
    .slice(0, idx)
    .flatMap((p) => p.lessons.flatMap((l) => l.sections.flatMap((sec) => sec.itemIds ?? [])));
}

/** todo lo que buildRetoDeck necesita, con el vocabulario entero (tests) */
export function retoSourceFor(phaseId: string): RetoSource {
  return { vocab: courses[retoLangOf(phaseId)]?.vocab ?? {}, pastPhraseIds: retoPastPhraseIds(phaseId) };
}
