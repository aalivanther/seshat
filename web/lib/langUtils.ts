// Utilidades de idioma COMPARTIDAS — una sola fuente para las palabras-pegamento,
// asciiFold y stripArticle (antes había copias divergentes en newWords y reviewSession).
// OJO: grade.ts tiene su propio plegado (ä→ae de teclado, LANG.asciiFold);
// esa semántica es distinta a propósito y no vive aquí.

import { langConfig } from "./language";
import { getLanguage } from "./languages";

/** palabras-pegamento del idioma pedido — la fuente vive en el registry */
export function glueOf(lang: string): Set<string> {
  return getLanguage(lang)?.glue ?? new Set();
}

/** plegado a ASCII con UNA semántica: NFD + strip de diacríticos + ß→ss */
export function asciiFold(t: string): string {
  return t
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss");
}

/** quita el artículo inicial según el idioma activo ("der Hund" → "Hund") */
export function stripArticle(s: string): string {
  return s.replace(langConfig().articleRegex, "");
}
