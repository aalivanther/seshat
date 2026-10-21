// Modelo de datos de los simulacros oficiales. Cubre el Start Deutsch 1 (A1),
// el Goethe A2, el LanguageCert ESOL A1 inglés y — desde el drop 5 — el
// Goethe-Zertifikat B1 (= ÖSD B1: mismo examen, desarrollado en común), cuyo
// formato exige tipos propios: ver PLAN-B1.md §3.

import type { Cefr } from "./cefr";

/** Hören Teil 1 (6×) y Teil 3 (5×): audio + pregunta con 3 opciones */
export interface HoerenMC {
  kind: "hoeren-mc";
  id: string;
  /** guion que lee el TTS (diálogo corto o mensaje telefónico) */
  audio: string;
  /** se escucha dos veces (Teil 1 y 3 oficial: sí) */
  twice: boolean;
  question: string; // en alemán, como el examen real
  questionEs: string; // ayuda en español
  options: [string, string, string];
  answer: 0 | 1 | 2;
}

/** Hören Teil 2 (4×): anuncio público + afirmación richtig/falsch (una escucha) */
export interface HoerenRF {
  kind: "hoeren-rf";
  id: string;
  audio: string;
  /** ¿se escucha dos veces? (B1 Teil 1: sí; A1 Teil 2: no) */
  twice?: boolean;
  statement: string;
  statementEs: string;
  richtig: boolean;
}

/** Lesen Teil 1: texto (email/nota) + afirmaciones richtig/falsch */
export interface LesenText {
  kind: "lesen-text";
  id: string;
  title: string; // p.ej. "E-Mail von Anna"
  text: string; // el texto completo en alemán
  statements: { id: string; statement: string; statementEs: string; richtig: boolean }[];
}

/** Lesen Teil 2: situación + 2 anuncios, elegir a o b */
export interface LesenAds {
  kind: "lesen-ads";
  id: string;
  situation: string; // en alemán
  situationEs: string;
  adA: string;
  adB: string;
  answer: "a" | "b";
}

/** Lesen Teil 3: cartel/aviso + afirmación richtig/falsch */
export interface LesenSchild {
  kind: "lesen-schild";
  id: string;
  /** dónde está el cartel, p.ej. "An der Tür der Bäckerei" */
  where: string;
  sign: string; // el texto del cartel
  statement: string;
  statementEs: string;
  richtig: boolean;
}

/** Schreiben Teil 1: rellenar formulario sobre una tercera persona */
export interface SchreibenForm {
  kind: "schreiben-form";
  id: string;
  /** el escenario con TODOS los datos, en alemán sencillo */
  scenario: string;
  scenarioEs: string;
  fields: { label: string; answers: string[] }[]; // 5 campos, corrección tolerante
}

/** Schreiben: mensaje con N puntos de contenido; autoevaluación guiada.
 *  A1 = ~30 palabras y 3 puntos · B1 A1 = ~80 y 3 puntos · B1 A3 = ~40 y 2. */
export interface SchreibenMessage {
  kind: "schreiben-message";
  id: string;
  task: string; // consigna en alemán
  taskEs: string;
  /** los puntos que debe cubrir (español) — 1 a 4 según la tarea */
  points: string[];
  model: string; // respuesta modelo alemana
  /** palabras objetivo de la tarea (B1: 80 / 80 / 40) */
  words?: number;
  /** B1 Schreiben Aufgabe 2: el texto publicado al que se REACCIONA */
  stimulus?: { source: string; text: string };
  /** peso en puntos de la tarea dentro del módulo (B1: 40/40/20) */
  points_max?: number;
  /** rúbrica por criterios en bandas (B1); sin ella, el baremo A1/A2 */
  rubric?: RubricCriterion[];
}

/** Criterio de rúbrica en bandas A-E (Goethe B1 productivo).
 *  Regla dura del examen: Erfüllung = E ⇒ la tarea entera vale 0. */
export interface RubricCriterion {
  /** clave estable: "erfuellung" | "kohaerenz" | "wortschatz" | "strukturen" | "aussprache" */
  id: string;
  label: string; // "Cumplimiento de la tarea"
  help: string; // qué mirar, en español
  /** puntos de cada banda A→E (el examen usa A=max … E=0) */
  bands: number[];
  /** si esta banda E anula la tarea entera (solo Erfüllung) */
  fatalE?: boolean;
}

/** Sprechen: consigna que el alumno responde en voz alta y se autoevalúa */
export interface SprechenTask {
  kind: "sprechen";
  id: string;
  teil: 1 | 2 | 3 | 4;
  /** puntos que representa (por defecto: Teil 2 = 1.5, resto = 3) */
  weight?: number;
  prompt: string; // en alemán (p.ej. la palabra de la tarjeta o la petición)
  promptEs: string;
  /** respuesta(s) modelo para comparar tras hablar */
  model: string;
  /** segundos de preparación antes de hablar (B1: 15 min para todo el oral;
      por tarea damos el tramo que le toca) */
  prepSeconds?: number;
  /** segundos objetivo hablando (B1 presentación: 180) */
  speakSeconds?: number;
  /** rúbrica por criterios; sin ella, autoevaluación binaria (A1/A2) */
  rubric?: RubricCriterion[];
}

/** B1 Sprechen Teil 2: presentación de 5 diapositivas encadenadas.
 *  Es el 40% del módulo oral: merece su propia estructura. */
export interface SprechenPraesentation {
  kind: "sprechen-praesentation";
  id: string;
  /** el tema de la presentación ("Mein Lieblingsfest") */
  topic: string;
  topicEs: string;
  /** las 5 diapositivas fijas del examen, con su guía y su modelo */
  slides: { title: string; hint: string; model: string }[];
  prepSeconds?: number; // default 180
  speakSeconds?: number; // default 180
  weight?: number;
  rubric?: RubricCriterion[];
}

/** Lesen con opción múltiple sobre un texto (B1 T2 y T5): el texto lo comparte
 *  el Teil entero, las preguntas son MC de 3 opciones. */
export interface LesenMC {
  kind: "lesen-mc";
  id: string;
  /** el texto va UNA vez en el primer ítem del grupo (los demás lo omiten) */
  title?: string;
  text?: string;
  /** nota al pie de austriacismos/helvetismos, como el examen real */
  footnote?: string;
  question: string;
  questionEs: string;
  options: [string, string, string];
  answer: 0 | 1 | 2;
}

/** Lesen Teil 3 del B1: 7 situaciones ↔ 10 anuncios. Reglas duras del examen:
 *  cada anuncio se usa UNA vez y una situación NO tiene pareja (respuesta 0).
 *  LanguageCert Access R3 reutiliza textos (`allowReuse`) y no exige el 0. */
export interface LesenMatch {
  kind: "lesen-match";
  id: string;
  /** reglamento continuo (T5 B2): el alumno lee ESTE texto, no tres viñetas */
  text?: string;
  /** los anuncios, con su letra visible (a..j) */
  ads: { key: string; text: string }[];
  /** las situaciones a emparejar; answer = key del anuncio o "0" si ninguna */
  situations: { id: string; situation: string; situationEs: string; answer: string }[];
  /** LanguageCert Access R3: un mismo texto PUEDE responder a más de una pregunta */
  allowReuse?: boolean;
  /** default true: exactamente una situación con answer "0". false = no se exige el 0 */
  requireNone?: boolean;
}

/** Lesen Teil 4 del B1: N opiniones de lectores y UNA pregunta transversal
 *  en la cabecera ("¿está a favor?"). Exige inferir postura, no verificar dato. */
export interface LesenJaNein {
  kind: "lesen-janein";
  id: string;
  /** la pregunta que se aplica a TODAS las opiniones */
  question: string;
  questionEs: string;
  opinions: { id: string; author: string; text: string; ja: boolean }[];
}

/** Hören con audio COMPARTIDO por varios ítems (B1 T2/T3/T4).
 *  Es un contenedor: sus ítems son hoeren-mc/rf/wersagt sin audio propio. */
export interface HoerenGroup {
  kind: "hoeren-group";
  id: string;
  audio: string;
  /** ¿dos voces? (el TTS alterna hablantes por " | ") */
  dialog?: boolean;
  twice: boolean;
  /** segundos para leer las preguntas ANTES del audio (el examen da 60) */
  readSeconds?: number;
  items: (HoerenMC | HoerenRF | HoerenWerSagt)[];
}

/** Hören Teil 4 del B1: ¿quién dice qué? — asignar afirmaciones a hablantes */
export interface HoerenWerSagt {
  kind: "hoeren-wersagt";
  id: string;
  /** los hablantes de la discusión (el examen usa 3: moderador + 2 invitados) */
  speakers: { key: string; name: string }[];
  statement: string;
  statementEs: string;
  /** key del hablante que lo dice */
  answer: string;
}

/** LanguageCert Reading Part 4 (B2: 1–5 palabras): texto + preguntas wh- escritas. */
export interface LesenNotes {
  kind: "lesen-notes";
  id: string;
  title: string;
  text: string;
  gaps: {
    id: string;
    prompt: string;
    promptEs: string;
    answers: string[];
    /** default 5 en B2, 3 en niveles más bajos */
    maxWords?: number;
  }[];
}

/** LanguageCert Access Listening Part 4: un monólogo ×2; el alumno ESCRIBE
 *  1–3 palabras por hueco (no elige a/b/c). */
export interface HoerenNotes {
  kind: "hoeren-notes";
  id: string;
  audio: string;
  twice: boolean;
  dialog?: boolean;
  title?: string;
  titleEs?: string;
  gaps: {
    id: string;
    prompt: string;
    promptEs: string;
    /** formas aceptadas */
    answers: string[];
    /** default 3 */
    maxWords?: number;
  }[];
}

/** Goethe A2 Hören Teil 2: conversación ×1; emparejar días/ítems con FOTOS a–i
 *  (sobran fotos). `scene` es un id estable para dibujar (library, kitchen…). */
export interface HoerenPhotoMatch {
  kind: "hoeren-photo-match";
  id: string;
  audio: string;
  twice?: boolean;
  dialog?: boolean;
  readSeconds?: number;
  photos: { key: string; scene: string; sceneEs: string }[];
  items: { id: string; prompt: string; promptEs: string; answer: string }[];
}

/** Lesen Teil 2 del Goethe B2 / Reading Part 2 de LanguageCert B2:
 *  un texto con huecos y un banco de frases; sobran 1-2. */
export interface LesenInsert {
  kind: "lesen-insert";
  id: string;
  title: string;
  text: string;
  /** las frases candidatas (incluye las que sobran) */
  sentences: { key: string; text: string }[];
  /** un hueco por sitio del texto; answer = key de la frase correcta */
  gaps: { id: string; answer: string }[];
}

export type ExamItem =
  | HoerenMC
  | HoerenRF
  | LesenText
  | LesenAds
  | LesenSchild
  | SchreibenForm
  | SchreibenMessage
  | SprechenTask
  | LesenMC
  | LesenMatch
  | LesenJaNein
  | HoerenGroup
  | HoerenWerSagt
  | SprechenPraesentation
  | LesenInsert
  | HoerenNotes
  | HoerenPhotoMatch
  | LesenNotes;

export interface ExamTeil {
  /** p.ej. "Hören · Teil 1" */
  title: string;
  /** instrucción oficial en alemán */
  instruction: string;
  /** traducción de la instrucción */
  instructionEs: string;
  items: ExamItem[];
}

export interface ExamSection {
  skill: "hoeren" | "lesen" | "schreiben" | "sprechen";
  label: string; // "Hören"
  minutes: number; // tiempo oficial orientativo
  teile: ExamTeil[];
}

export interface ExamSet {
  id: string; // "sim-a" (alemán) · "en-sim-a" (inglés)
  /** nivel real del simulacro — PLAN 1.9.9 F2.1: antes se adivinaba con un
   *  regex sobre `id` en `examen/page.tsx`/`nivel/[id]/Client.tsx`, fuera del
   *  validador, y 5 de los 12 simulacros acertaban por el `?? "a1"` de
   *  emergencia, no porque el regex casara. Campo nuevo: no toca ningún id. */
  level: Cefr;
  title: string; // "Modellsatz A"
  description: string;
  sections: ExamSection[]; // siempre en orden hoeren, lesen, schreiben, sprechen
  /** baremo del examen; sin él aplica el Goethe (aprobado ≥60%, bandas DE).
      LanguageCert: passPct 50, highPassPct ~67, bandas propias. */
  scoring?: {
    passPct: number;
    highPassPct?: number;
    bands: { min: number; label: string }[];
    /** B1: el examen es MODULAR — cada módulo se aprueba (o no) por separado
        con su propio corte sobre 100 puntos, sin compensación entre módulos. */
    modular?: boolean;
    /** factor de conversión aciertos→puntos por destreza (B1 Lesen/Hören: 30
        ítems × 3,333 = 100). Sin entrada, se usa el porcentaje directo. */
    pointsPerItem?: Partial<Record<ExamSection["skill"], number>>;
  };
}

/** Bandas de la rúbrica productiva del Goethe B1 (A mejor → E peor) */
export const RUBRIC_BANDS = ["A", "B", "C", "D", "E"] as const;
