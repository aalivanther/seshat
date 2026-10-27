import type { ExamMeta } from "@/lib/examTypes";
import { examIndex } from "./courseIndex.gen";

// Los simulacros tal como los ve el CLIENTE: sin sus Teile. Mismas funciones
// que data/exams.ts; el set entero solo lo recibe la página del simulacro.
export const examsByLang: Record<string, ExamMeta[]> = examIndex;

/** compat: los simulacros alemanes (el histórico) */
export const exams: ExamMeta[] = examsByLang.de ?? [];

export function examsOf(lang: string): ExamMeta[] {
  return examsByLang[lang] ?? [];
}

/** idioma dueño de un set (para adoptar su config al entrar) */
export function examLangOf(setId: string): string {
  for (const [lang, sets] of Object.entries(examsByLang)) {
    if (sets.some((s) => s.id === setId)) return lang;
  }
  return "de";
}
