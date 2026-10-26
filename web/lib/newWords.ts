
// Detección de "palabra nueva": si un ejercicio usa una palabra alemana que el
// curso aún no ha presentado en ninguna sección de frases hasta esa lección,
// se le dice al estudiante que es NUEVA — no es que se la haya perdido, es que
// se hila aquí por primera vez (i+1 explícito, no un hueco).

import { courseOf, findLesson } from "@/data/course";
import { glueOf, asciiFold } from "./langUtils";
import type { Exercise } from "./types";

const MIN_LEN = 3;

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-zäöüß]+/)
    .filter((t) => t.length >= MIN_LEN);
}


/** Lo que el curso ha presentado hasta cada lección, POR idioma. En vez de una
 *  copia de lo conocido por lección (crecía con el curso: cientos de lecciones
 *  × miles de tokens, decenas de MB), cada token y cada raíz guardan el
 *  ordinal de la PRIMERA lección que los presenta, y una lección los conoce si
 *  ese ordinal no es posterior al suyo. Mismas respuestas, memoria lineal. */
interface KnownIndex {
  /** ordinal de cada lección en el orden del curso */
  lessonOrd: Map<string, number>;
  /** token → ordinal de la primera lección que lo presenta */
  tokenOrd: Map<string, number>;
  /** raíz → ordinal de la primera lección que la aporta */
  stemOrd: Map<string, number>;
}

const knownByLang = new Map<string, KnownIndex>();

function addStemsOf(t: string, ord: number, stems: Map<string, number>): void {
  const add = (stem: string) => {
    if (!stems.has(stem)) stems.set(stem, ord);
  };
  add(stemOf(t));
  // separables: aufstehen también aporta la raíz "steh" — así "stehe"
  // cuenta como conocida sin heurísticas laxas de substring
  const m = /^(auf|aus|an|ab|ein|mit|nach|vor|zu|um|weg|zurück|fern)(.{4,})$/.exec(t);
  if (m) add(stemOf(m[2]));
}

function build(lang: string): KnownIndex {
  const cached = knownByLang.get(lang);
  if (cached) return cached;
  const course = courseOf(lang);
  const index: KnownIndex = { lessonOrd: new Map(), tokenOrd: new Map(), stemOrd: new Map() };
  knownByLang.set(lang, index);
  const { lessonOrd, tokenOrd, stemOrd } = index;
  // `stemOf` es puro y determinista: la raíz de un token se calcula la
  // primera vez que el token aparece y ya no cambia (PLAN 1.9.9 FASE 5).
  const learn = (text: string, ord: number) => {
    for (const t of tokenize(text)) {
      if (tokenOrd.has(t)) continue;
      tokenOrd.set(t, ord);
      addStemsOf(t, ord, stemOrd);
    }
  };
  let ord = 0;
  for (const p of course.phases) {
    for (const l of p.lessons) {
      for (const sec of l.sections) {
        for (const id of sec.itemIds ?? []) {
          const v = course.vocab[id];
          if (!v) continue;
          learn(v.target, ord);
          if (v.plural) learn(v.plural, ord);
        }
      }
      // un id repetido se queda con su ÚLTIMA aparición, como el mapa de antes
      lessonOrd.set(l.id, ord);
      ord++;
    }
  }
  return index;
}

/** ¿el token se conoce, contando flexiones? (wohnst ~ wohnen: prefijo común ≥4;
    para raíces cortas como mag → magst: raíz exacta + terminación breve) */
/** raíz aproximada: fuera terminaciones verbales/plurales y puntos del Umlaut */
function stemOf(t: string): string {
  const noUmlaut = t.replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u");
  const s = noUmlaut.replace(/(?:est|en|st|er|et|e|t|n)$/, "");
  return s.length >= 3 ? s : noUmlaut;
}

function isKnown(token: string, index: KnownIndex, ord: number, glue: Set<string>): boolean {
  const seenAt = index.tokenOrd.get(token);
  if (seenAt !== undefined && seenAt <= ord) return true;
  if (glue.has(token)) return true;
  const stemAt = index.stemOrd.get(stemOf(token));
  return stemAt !== undefined && stemAt <= ord;
}

/** textos en ESPAÑOL del ejercicio: si una palabra "alemana" también vive ahí
    (Ana, Mexiko~México, Siemens), es nombre propio/marca — no una palabra nueva */
function spanishTexts(ex: Exercise): string {
  const parts: string[] = [ex.prompt ?? ""];
  if ("translation" in ex && ex.translation) parts.push(ex.translation);
  if ("question" in ex && ex.question) parts.push(ex.question);
  if (ex.type === "match") parts.push(...ex.pairs.map((p) => p.source));
  return parts.join(" ").toLowerCase();
}

function looksLikeProperNoun(raw: string, spanish: string): boolean {
  if (!/^[A-ZÄÖÜ]/.test(raw)) return false;
  const folded = asciiFold(raw.toLowerCase());
  for (const sTok of spanish.split(/[^a-záéíóúüñäöß]+/i)) {
    if (sTok.length < 3) continue;
    const sf = asciiFold(sTok);
    if (sf === folded) return true;
    // tolerancia 1-2 letras: Mexiko ~ méxico, Italien ~ italia
    if (Math.abs(sf.length - folded.length) <= 2 && (sf.startsWith(folded.slice(0, 4)) || folded.startsWith(sf.slice(0, 4)))) {
      return true;
    }
  }
  return false;
}

function stripParens(t: string): string {
  return t.replace(/\([^)]*\)/g, " ");
}

function germanTexts(ex: Exercise): string[] {
  switch (ex.type) {
    case "cloze":
      return [stripParens(ex.text.replace("___", ex.answers[0] ?? ""))];
    case "build":
      return [stripParens(ex.target)];
    case "type":
      return [stripParens(ex.answers[0] ?? "")];
    case "listen":
      return [stripParens(ex.text)];
    case "match":
      return ex.pairs.map((p) => stripParens(p.target));
    case "order":
      return ex.sentences.map(stripParens);
    case "transform":
      return [stripParens(ex.source), stripParens(ex.answers[0] ?? "")];
    case "bucket":
      return ex.items.map((it) => stripParens(it.text));
    default:
      return [];
  }
}

/**
 * Palabras alemanas del ejercicio que el curso no ha presentado todavía
 * (hasta la lección dada). Máximo 3 — si hay más, la lección tiene un
 * problema de diseño que el validador debería cazar, no este aviso.
 */
export function newWordsIn(ex: Exercise, lessonId: string): string[] {
  // en un texto largo habría docenas de palabras nuevas: el aviso pierde
  // sentido y su sitio lo ocupan las glosas tocables (PLAN.md §2.2)
  if (ex.type === "read") return [];
  const lang = findLesson(lessonId)?.lang ?? "de";
  const index = build(lang);
  const ord = index.lessonOrd.get(lessonId);
  if (ord === undefined) return [];
  const glue = glueOf(lang);
  const seen = new Set<string>();
  const fresh: string[] = [];
  const spanish = spanishTexts(ex);
  for (const text of germanTexts(ex)) {
    for (const raw of text.split(/[^A-Za-zÄÖÜäöüß]+/)) {
      if (raw.length < MIN_LEN) continue;
      const token = raw.toLowerCase();
      if (seen.has(token) || isKnown(token, index, ord, glue)) continue;
      if (looksLikeProperNoun(raw, spanish)) continue;
      seen.add(token);
      fresh.push(raw);
      if (fresh.length >= 3) return fresh;
    }
  }
  return fresh;
}
