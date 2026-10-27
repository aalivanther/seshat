// ⚠️ GENERADO por scripts/gen-derived.mjs — NO editar a mano.
// Derivado de course.gen.ts (drop 8). Regenerar: node scripts/gen-derived.mjs
import type { VocabItem } from "@/lib/types";

/** el vocabulario de cada idioma, en un trozo aparte que se pide al usarlo */
export const vocabLoaders: Record<string, () => Promise<{ vocab: Record<string, VocabItem> }>> = {
  "de": () => import("./vocab.de.gen"),
  "en": () => import("./vocab.en.gen"),
};
