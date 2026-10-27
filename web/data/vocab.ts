// El vocabulario entero de un idioma, para las pocas pantallas que lo
// recorren (el repaso, el reto, la misión). Viaja en un trozo aparte que se
// pide al entrar en ellas y se queda en memoria para la siguiente; el resto
// de la app cuenta tarjetas con vocabIds.gen.ts, que pesa una fracción.
import type { VocabItem } from "@/lib/types";
import { vocabLoaders } from "./vocabLoaders.gen";

export type Vocab = Record<string, VocabItem>;

const EMPTY: Vocab = {};
const loaded = new Map<string, Vocab>();
const pending = new Map<string, Promise<Vocab>>();

/** el vocabulario del idioma si ya llegó (para no esperar un tick en vano) */
export function loadedVocab(lang: string): Vocab | undefined {
  return loaded.get(lang);
}

/** pide el vocabulario del idioma; vacío si este build no trae ese idioma */
export function loadVocab(lang: string): Promise<Vocab> {
  const hit = loaded.get(lang);
  if (hit) return Promise.resolve(hit);
  let p = pending.get(lang);
  if (!p) {
    const load = vocabLoaders[lang];
    p = (load ? load().then((m) => m.vocab) : Promise.resolve(EMPTY)).then(
      (v) => {
        loaded.set(lang, v);
        return v;
      },
      (err: unknown) => {
        // un fallo de red no puede quedarse cacheado: el siguiente intento vuelve a pedirlo
        pending.delete(lang);
        throw err;
      },
    );
    pending.set(lang, p);
  }
  return p;
}
