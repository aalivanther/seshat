import type { Cefr } from "@/lib/cefr";

// El ítem y la config los usan el player, el baremo y cada partitura. Si
// vivieran en uno de esos, el import sería un ciclo.

export interface InterviewItem {
  part: number;
  question: string;
  questionEs: string;
  model: string;
  weight: number; // puntos oficiales que representa este ítem
  prep?: number; // segundos de preparación VISIBLES antes de responder (mini-tema EN)
  /** casillas del Vortrag / plan: se cobran con regex */
  schemaChecks?: { re: string; label: string }[];
}

/** config por idioma Y NIVEL: pools, pesos y textos propios de cada examen */
export interface InterviewConfig {
  cefr: Cefr; // el nivel que ESTA entrevista reproduce (no el del alumno)
  levelLabel: string; // "A1" — se le enseña al candidato tal cual
  resultId: string; // clave LessonStat del resultado
  homeHref: string; // adónde vuelve el candidato
  langTag: string; // lang= del texto del examinador y las respuestas
  chip: (part: number) => string; // "Sprechen · Teil 1" / "Spoken · Part 1"
  intro: string; // párrafo de portada
  placeholder: string;
  totalPts: number;
  passPct: number; // corte del examen real
  passTitle: string;
  failTitle: string;
  doneTail: string; // texto tras "N/M puntos ponderados (pct%) — "
  build: () => InterviewItem[];
}
