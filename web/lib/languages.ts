// REGISTRO DE IDIOMAS — el corazón multi-idioma de Seshat (la deuda declarada
// "requiere registry idioma→curso", saldada aquí; nada de parches).
// Un idioma = LanguageConfig (lingüística) + niveles + curso (en course.gen).
// El idioma ACTIVO vive por dispositivo (localStorage) y se fija al entrar a
// /idioma/[lang] o a una lección suya; todo el motor (TTS, corrección,
// repaso, palabras nuevas) consulta el config del idioma en juego.

import { GERMAN, ENGLISH, setLangConfig, type LanguageConfig } from "./language";

export interface LanguageDef {
  id: string; // "de" | "en" — clave de rutas y del registro
  /** @deprecated Emoji de bandera. NO se pinta en la interfaz: Windows no trae
   *  fuente para los indicadores regionales y ahí salían dos letras sueltas
   *  («DE», «GB») mientras en el móvil se veían perfectas. La bandera de verdad
   *  la dibuja <LangFlag> en components/Art.tsx. Se conserva el campo porque
   *  identifica el idioma en notas y textos de una línea. */
  flag: string;
  name: string; // "Alemán" (nombre en español, la voz de la app)
  ownName: string; // "Deutsch" / "English"
  config: LanguageConfig;
  /** palabras-pegamento del idioma (aviso de palabra nueva) */
  glue: Set<string>;
  desc: string; // card de la landing
}

const GLUE_DE = new Set([
  "und", "oder", "aber", "auch", "nicht", "sehr", "mal", "doch", "denn", "dann",
  "ist", "sind", "bin", "bist", "seid", "war", "hat", "habe", "hast", "haben",
  "ein", "eine", "einen", "einem", "einer", "eines", "kein", "keine", "keinen",
  "der", "die", "das", "den", "dem", "des", "ich", "wir", "ihr", "sie", "es",
  "mein", "meine", "dein", "deine", "sein", "seine", "ihre", "euer", "unser",
  "mich", "dich", "uns", "euch", "mir", "dir", "ihm", "ihn", "ihnen", "ja", "nein",
  "für", "fur", "nur", "fast", "genug", "beim", "vom", "jeden", "jede", "jedem", "jeder", "jedes",
  "meinem", "meiner", "meinen", "deinem", "deiner", "deinen",
  "seinem", "seiner", "seinen", "ihrem", "ihrer", "ihren", "unserem", "unserer", "eurem", "super",
]);

const GLUE_EN = new Set([
  "the", "and", "but", "not", "very", "too", "also", "yes", "you", "she", "his",
  "her", "its", "our", "their", "this", "that", "these", "those", "there", "here",
  "have", "has", "had", "was", "were", "are", "does", "did", "can", "cant",
  "with", "for", "from", "into", "your", "them", "they", "him", "who", "what",
  "when", "where", "why", "how", "some", "any", "much", "many",
]);

export const LANGUAGES: LanguageDef[] = [
  {
    id: "de",
    flag: "🇩🇪",
    name: "Alemán",
    ownName: "Deutsch",
    config: GERMAN,
    glue: GLUE_DE,
    desc: "Del primer «Hallo» al Goethe-Zertifikat B2: A1 a B2 completos, con simulacros oficiales, entrevistas orales y práctica de conversación.",
  },
  {
    id: "en",
    flag: "🇬🇧",
    name: "Inglés",
    ownName: "English",
    config: ENGLISH,
    glue: GLUE_EN,
    desc: "Del primer «Hello» al LanguageCert ESOL B2 Communicator: A1 a B2 completos, con el mismo método de frase usable primero, simulacros, entrevista oral y práctica de conversación.",
  },
];

export function getLanguage(id: string): LanguageDef | undefined {
  return LANGUAGES.find((l) => l.id === id);
}

/* ── idioma activo por dispositivo ── */

const ACTIVE_KEY = "seshat-lang";

export function getActiveLang(): string {
  if (typeof window === "undefined") return "de";
  const v = window.localStorage.getItem(ACTIVE_KEY);
  return v && getLanguage(v) ? v : "de";
}

function setActiveLang(id: string): void {
  if (typeof window === "undefined") return;
  if (getLanguage(id)) window.localStorage.setItem(ACTIVE_KEY, id);
}

/** Punto de entrada de un contexto de idioma (página de idioma, nivel,
    lección): lo marca activo Y pone su config lingüística en juego.
    Llamar en un useEffect al montar. */
export function adoptLang(id: string): void {
  const def = getLanguage(id);
  if (!def) return;
  setActiveLang(id); // no-op sin window (SSR) — el config sí se fija siempre
  setLangConfig(def.config);
}


export function activeLanguage(): LanguageDef {
  return getLanguage(getActiveLang()) ?? LANGUAGES[0];
}
