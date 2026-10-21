import type { ExamSet } from "@/lib/examTypes";
import { genExamsByLang } from "./course.gen";

// Simulacros POR idioma — la fuente vive en course.gen (drop-gated: la fuga
// en-sim-* del build drop 2 enseñó que TODO contenido pasa por el generador).
export const examsByLang: Record<string, ExamSet[]> = genExamsByLang;

/** compat: los simulacros alemanes (el histórico) */
export const exams: ExamSet[] = examsByLang.de ?? [];

export function examsOf(lang: string): ExamSet[] {
  return examsByLang[lang] ?? [];
}

/** idioma dueño de un set (para adoptar su config al entrar) */
export function examLangOf(setId: string): string {
  for (const [lang, sets] of Object.entries(examsByLang)) {
    if (sets.some((s) => s.id === setId)) return lang;
  }
  return "de";
}
