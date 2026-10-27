// ¿Esta tarjeta es del curso de este idioma? Para contar la mochila (medallas,
// aviso de repaso) basta con los ids: las tarjetas enteras viajan aparte
// (data/vocab.ts) y solo a las pantallas que las enseñan.
import { vocabIds } from "./vocabIds.gen";

const sets = new Map<string, ReadonlySet<string>>();
const EMPTY: ReadonlySet<string> = new Set();

export function vocabIdSet(lang: string): ReadonlySet<string> {
  let s = sets.get(lang);
  if (!s) {
    const ids = vocabIds[lang];
    if (!ids) return EMPTY;
    s = new Set(ids);
    sets.set(lang, s);
  }
  return s;
}
