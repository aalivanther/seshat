"use client";

/**
 * SESIÓN DE REPASO EXPRÉS — el nuevo sistema de repaso de Seshat.
 *
 * Filosofía (spec del producto):
 * - El repaso NO es una cola-deuda que crece y agobia: es una INVITACIÓN
 *   ("¿Quieres repasar?") de unos 5 minutos, siempre disponible.
 * - Se aleatoriza sobre TODO lo visto hasta el momento, no solo lo vencido:
 *   práctica de memoria e intuición, no contabilidad de intervalos.
 *   Excepción única: si hay dos géneros con al menos dos sustantivos vistos
 *   cada uno, dos huecos seguidos preguntan el artículo. Lo marca la ficha
 *   (`article`); sin esa marca no se inventa un contraste de temas.
 * - Los ejercicios son PROPIOS y GENERATIVOS: de cada ítem visto pueden salir
 *   siete formas distintas de preguntarlo (plantillas abajo). Dos sesiones
 *   nunca son iguales.
 * - El SRS sigue trabajando POR DEBAJO: los ítems vencidos pesan más al
 *   muestrear, y el resultado de la sesión se reporta al backend igual que
 *   siempre (applyReview avanza/retrasa los intervalos). Lo que desaparece
 *   es la deuda visible, no la ciencia.
 *
 * PLANTILLAS GENERATIVAS (por ítem, según lo que el ítem permite):
 *   T1 type     — producción ES→objetivo ("Di en …"). La reina: siempre aplicable.
 *   T2 listen   — dictado (solo con voz del idioma disponible y forma única sin dígitos).
 *   T3 mc→ES    — reconocer el significado entre distractores de OTROS ítems vistos.
 *   T4 mc ES→   — reconocer la forma del idioma que estudias entre distractores vistos.
 *   T5 mc-art   — ¿der, die o das? (solo sustantivos con artículo).
 *   T6 plural   — producir el plural (solo ítems con plural).
 *   T7 cloze    — hueco de UNA palabra de contenido dentro de la frase del ítem.
 * Además, por SESIÓN (variedad estructural):
 *   T8 match    — un emparejado de 4 ítems vistos.
 *   T9 bucket   — ¿der o die? en ráfaga (si hay sustantivos suficientes).
 *
 * REGLAS DEL MOTOR (las mismas que valida el build para el contenido fijo):
 * mc ≤4 opciones · cloze con un solo ___ · match con pares únicos · la sesión
 * CIERRA en un ejercicio productivo (lo que modeOfExercise llama producir) ·
 * ~40% producción mínimo · tope de 10, no 12 · contraste de artículo en dos
 * huecos seguidos cuando hay fichas bastantes.
 */

import { useEffect, useState } from "react";
import { vocabIdSet } from "@/data/vocabIdSet";
import { retoMissSet, consumeRetoMisses } from "./retoMiss";
import { glueOf, stripArticle } from "./langUtils";
import { langConfig } from "./language";
import { getActiveLang } from "./languages";
import { shuffle, pickOne as pick } from "./shuffle";
import { getProfile } from "./api";
import { modeOfExercise, type Exercise, type MCExercise, type ServerState, type VocabItem } from "./types";

/** tamaño de sesión: ~10 ejercicios ≈ 5 minutos reales */
const SESSION_SIZE = 10;
/** mínimo de ítems vistos para que ofrecer repaso tenga sentido */
export const MIN_SEEN_FOR_REVIEW = 8;

// GLUE viene de langUtils (la lista grande, compartida con newWords): tCloze
// exige huecos de ≥4 letras, así que el pegamento extra solo filtra mejor —
// jamás deja hueco en "haben"/"meine" y sí en las palabras de contenido.

/* ── formas aceptadas de un ítem (alternativas "Lehrer / Lehrerin", parens…) ── */
export function itemForms(v: VocabItem): { display: string; accepted: string[]; listenable: boolean } {
  const base = v.target.replace(/\(.*?\)/g, "").trim();
  const alternatives = base.split("/").map((s) => s.trim()).filter(Boolean);
  const display = alternatives[0] ?? base;
  const accepted = [...new Set([base, ...alternatives])].filter(Boolean);
  const listenable = alternatives.length === 1 && !/\d/.test(display) && display.length > 0;
  return { display, accepted, listenable };
}

/* ── FORMA de la tarjeta: qué clase de ejercicio admite ─────────────────────
 *
 * `target` no siempre es un enunciado. El contenido usa tarjetas-TABLA para
 * enseñar grupos («sing → sang · drink → drank · swim → swam») y tarjetas de
 * LISTA para enseñar montones («explain · say · describe · suggest»). Son
 * material de LECTURA: no se dictan, no se traducen y no se teclean, porque no
 * hay una respuesta que el alumno pueda escribir. Tratarlas como frases era lo
 * que producía dictados de tablas de verbos irregulares.
 *
 * Mientras la ficha no lo declare por sí misma —lo suyo sería un campo en
 * lib/types.ts, ver INFORME— se detecta por la marca tipográfica que el
 * contenido ya usa sin una sola excepción: la flecha de transformación y el
 * punto medio de enumeración. Ninguna frase de verdad los lleva.
 */
const LIST_MARKS = /[→⇒·]/;

/** marca de GLOSA: «=», «·» o « / » dentro de un calco significan que la ficha
 *  guarda ahí una nota de falso amigo, no una frase que alguien escribió mal */
const GLOSS_TRAP = /[=·]|\s\/\s/;

/** clase de letra del motor: sirve para alemán, inglés y español sin depender
 *  de \p{L}, que exige un target de compilación más alto que el de la app */
const NOT_LETTER = "[^a-zA-Z\\u00C0-\\u024F']";

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** ¿la ficha es una TABLA o una LISTA, y no un enunciado? */
export function isListCard(v: VocabItem): boolean {
  return LIST_MARKS.test(itemForms(v).display);
}

/** los miembros de una lista, por si alguno SÍ es una frase entera
    («You must rest. · You have to rest.» → dos frases utilizables) */
function listParts(text: string): string[] {
  return text.split(/\s*·\s*/).map((t) => t.trim()).filter((t) => t && !LIST_MARKS.test(t));
}

function wordCount(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

/** palabras en minúscula y sin puntuación, para comparar dos frases */
function tokensOf(s: string): string[] {
  return s.toLowerCase().replace(/[^a-z\u00C0-\u024F'\s]/g, " ").split(/\s+/).filter(Boolean);
}

/** ¿el enunciado ya lleva escrita su propia respuesta? Pasa con los préstamos
 *  («¿Cómo se dice “email / correo electrónico”?» → email) y con las fichas de
 *  pronunciación, donde la glosa española cita la palabra del idioma. */
function givesAway(question: string, answer: string): boolean {
  if (answer.length < 2) return false;
  return new RegExp(`(^|${NOT_LETTER})${escapeRe(answer)}(${NOT_LETTER}|$)`, "i").test(question);
}

/** Las traducciones que se pueden TECLEAR de una ficha. `source` es un campo de
 *  GLOSA, no una respuesta: lleva la aclaración tras la raya («bien — es el
 *  adverbio de good, y no lleva -ly») y a veces varias glosas separadas por «·»
 *  o «/». Corregir contra la cadena entera era dar por malo al que traducía
 *  bien. Se queda con las glosas y tira la explicación. */
function esForms(source: string): string[] {
  // fuera la explicación tras la raya y las pistas entre paréntesis: «Me duelen
  // las piernas (plural → tun)» se traduce «Me duelen las piernas»
  const head = source.split(/\s+[—–]\s+/)[0].replace(/\([^)]*\)/g, " ").replace(/\s+/g, " ").trim();
  const parts = head.split(/\s*·\s*|\s+\/\s+/).map((t) => t.trim()).filter(Boolean);
  const all = parts.length > 1 ? [head, ...parts] : [head];
  return [...new Set(all)].filter((t) => t.length > 0 && !LIST_MARKS.test(t));
}

/* ── muestreo ponderado sin reemplazo ── */
function weightedSample<T>(pool: { item: T; w: number }[], n: number): T[] {
  const out: T[] = [];
  const rest = [...pool];
  while (out.length < n && rest.length > 0) {
    const total = rest.reduce((s, p) => s + p.w, 0);
    let r = Math.random() * total;
    let idx = 0;
    for (; idx < rest.length; idx++) {
      r -= rest[idx].w;
      if (r <= 0) break;
    }
    const [picked] = rest.splice(Math.min(idx, rest.length - 1), 1);
    out.push(picked.item);
  }
  return out;
}

/** ítems VISTOS por el alumno (están en su SRS y existen en el curso).
 *  `vocab` es el del idioma (data/vocab.ts): el repaso lo pide al entrar. */
export function seenItems(st: ServerState | null, vocab: Record<string, VocabItem>): VocabItem[] {
  if (!st) return [];
  return Object.keys(st.items)
    .map((id) => vocab[id])
    .filter((v): v is VocabItem => Boolean(v));
}

/** cuántos de esos hay: para decidir si se invita al repaso basta con los ids,
 *  sin traer las tarjetas a la lección ni a los hubs */
export function seenCount(st: ServerState | null, lang = "de"): number {
  if (!st) return 0;
  const ids = vocabIdSet(lang);
  return Object.keys(st.items).filter((id) => ids.has(id)).length;
}

/** cooldown real del aviso «¿Repasamos?»: una vez mostrado, no vuelve a
 *  ofrecerse hasta pasada una hora. Sin esto el banner de /nivel y /idioma
 *  reaparecía en cada navegación aunque el alumno acabara de terminar el
 *  módulo — invitar a repasar algo hecho hace un minuto no es invitar, es
 *  ruido. Mismo criterio y misma clave que ya usaba LessonPlayer. */
const REVIEW_OFFER_COOLDOWN_MS = 60 * 60 * 1000;

export function useReviewBannerDue(st: ServerState | null, lang: string): boolean {
  const [due, setDue] = useState(false);
  useEffect(() => {
    if (!st || seenCount(st, lang) < MIN_SEEN_FOR_REVIEW) {
      setDue(false);
      return;
    }
    const key = `review-offer-${getProfile() || "default"}`;
    const last = Number(window.localStorage.getItem(key) ?? 0);
    if (Date.now() - last >= REVIEW_OFFER_COOLDOWN_MS) {
      window.localStorage.setItem(key, String(Date.now()));
      setDue(true);
    } else {
      setDue(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [st, lang]);
  return due;
}

/* ── plantillas ── */

export function tType(v: VocabItem, id: string): Exercise | null {
  if (isListCard(v)) return null; // «Di en inglés: cantó · bebió · nadó…» no se teclea
  // el enunciado tiene que ser una PISTA, no una regla: de «se lee «ts»: zehn →
  // tseen» nadie deduce que la respuesta es la letra «z»
  if (!esForms(v.source).length) return null;
  const f = itemForms(v);
  return {
    id, type: "type",
    prompt: "Repaso — de memoria, sin red",
    question: `Di en ${langConfig().spanishName}: ${v.source}`,
    answers: f.accepted,
    hints: v.sound ? [`Suena: ${v.sound}`] : undefined,
    itemIds: [v.id],
  };
}

export function tListen(v: VocabItem, id: string): Exercise | null {
  if (isListCard(v)) return null; // no se dicta una tabla de verbos irregulares
  const f = itemForms(v);
  return {
    id, type: "listen",
    prompt: "Repaso — dictado sorpresa",
    text: f.display,
    translation: v.source,
    itemIds: [v.id],
  };
}

/** `askForm`: la pregunta va ES→idioma que se aprende (antes se pasaba un
    literal "de" y el enunciado decía «forma alemana» aunque estuvieras
    repasando inglés — el leak de idioma nº1 de cara al alumno). */
function mcOf(id: string, question: string, correct: string, distractors: string[], itemId: string, askForm = false): MCExercise {
  // las 3 primeras son las de mejor silueta; un poco de azar entre las 6 mejores
  const top = shuffle(distractors.slice(0, 6)).slice(0, 3);
  const options = shuffle([correct, ...top]);
  return {
    id, type: "mc",
    prompt: askForm ? `Repaso — ¿cuál es la forma en ${langConfig().spanishName}?` : "Repaso — ¿qué significa?",
    question,
    options,
    answer: options.indexOf(correct),
    itemIds: [itemId],
  };
}

/** distractores con la MISMA silueta que la respuesta: una pregunta se camufla
    entre preguntas y una palabra entre palabras — jamás una letra suelta o un
    número donde no pinta nada (los ítems de pronunciación quedan fuera) */
function shapedDistractors(correct: string, candidates: string[]): string[] {
  const clean = [...new Set(candidates)].filter((c) => c !== correct && c.length >= 3);
  const wantsQuestion = correct.includes("?");
  const wantsMulti = correct.includes(" ");
  const rank = (c: string) =>
    (c.includes("?") === wantsQuestion ? 2 : 0) + (c.includes(" ") === wantsMulti ? 1 : 0);
  return clean.sort((a, b) => rank(b) - rank(a));
}

export function tMcMeaning(v: VocabItem, others: VocabItem[], id: string): Exercise | null {
  const display = itemForms(v).display;
  if (display.length < 3) return null; // letras/sonidos no juegan al mc
  if (isListCard(v) || LIST_MARKS.test(v.source)) return null;
  const question = `¿Qué significa «${display}»?`;
  if (givesAway(question, v.source)) return null;
  const distractors = shapedDistractors(v.source, others.map((o) => o.source))
    .filter((d) => !LIST_MARKS.test(d) && !givesAway(question, d));
  if (distractors.length < 3) return null;
  return mcOf(id, question, v.source, distractors, v.id);
}

export function tMcForm(v: VocabItem, others: VocabItem[], id: string): Exercise | null {
  const mine = itemForms(v).display;
  if (mine.length < 3) return null;
  if (isListCard(v) || LIST_MARKS.test(v.source)) return null;
  const question = `¿Cómo se dice «${v.source}»?`;
  // la glosa española cita a veces la palabra inglesa entera («email / correo
  // electrónico»): ahí la pregunta ES la respuesta
  if (givesAway(question, mine)) return null;
  const distractors = shapedDistractors(mine, others.map((o) => itemForms(o).display))
    .filter((d) => !LIST_MARKS.test(d) && !givesAway(question, d));
  if (distractors.length < 3) return null;
  return mcOf(id, question, mine, distractors, v.id, true);
}

export function tArticle(v: VocabItem, id: string): Exercise | null {
  if (!v.article || !["der", "die", "das"].includes(v.article)) return null;
  const noun = stripArticle(itemForms(v).display);
  const options = ["der", "die", "das"];
  return {
    id, type: "mc",
    prompt: "Repaso — el género es parte de la palabra",
    question: `¿der, die o das? — ${noun}`,
    options,
    answer: options.indexOf(v.article),
    itemIds: [v.id],
  };
}

/** T-TRADUCE: del español al idioma y al revés, a partir de la propia ficha.
 *  Es el ejercicio más exigente que puede salir del vocabulario que ya tienes:
 *  no hay opciones donde reconocer la respuesta ni fichas que ordenar. Y sale
 *  gratis, porque cada tarjeta ya trae las dos caras. */
export function tTranslate(v: VocabItem, id: string, toTarget: boolean): Exercise | null {
  const f = itemForms(v);
  if (!v.source?.trim() || !f.display.trim()) return null;
  if (isListCard(v)) return null; // una tabla no tiene UNA traducción
  // las fichas con paréntesis explicativos («el ruido (molesto)») no valen para
  // traducir a ciegas: la respuesta esperada sería ambigua
  if (/[()]/.test(v.source) || /[()]/.test(f.display)) return null;
  // al español la respuesta se teclea, así que hay que corregir contra las
  // GLOSAS de la ficha, no contra el campo entero con su explicación
  const es = esForms(v.source);
  if (!es.length) return null;
  return {
    id,
    type: "translate",
    direction: toTarget ? "toTarget" : "toEs",
    prompt: toTarget ? "Repaso — tradúcelo de memoria" : "Repaso — ¿qué significa?",
    source: toTarget ? v.source : f.display,
    answers: toTarget ? f.accepted : es,
    itemIds: [v.id],
    mode: toTarget ? "produce" : "recognize",
  };
}

export function tPlural(v: VocabItem, id: string): Exercise | null {
  if (!v.plural) return null;
  // 21 tarjetas guardan el plural CON artículo («die Traditionen») y otras sin
  // él («Traditionen»). Aceptar solo la cadena literal significaba dar por malo
  // un plural perfectamente escrito por culpa de cómo lo tecleó quien redactó
  // la ficha: el alumno perdía la racha por acertar.
  const bare = v.plural.replace(/^(die|der|das)\s+/i, "").trim();
  const article = v.article === "der" || v.article === "das" ? "die" : "die"; // el plural siempre lleva «die»
  const accepted = Array.from(new Set([v.plural, bare, `${article} ${bare}`]));
  return {
    id, type: "type",
    prompt: "Repaso — plural de memoria",
    question: `Escribe el plural de «${itemForms(v).display}»`,
    answers: accepted,
    itemIds: [v.id],
  };
}

export function tCloze(v: VocabItem, id: string): Exercise | null {
  if (isListCard(v)) return null;
  const f = itemForms(v);
  const words = f.display.split(/\s+/);
  if (words.length < 3) return null;
  const candidates = words.filter((w) => {
    const clean = w.replace(/[^\wäöüßÄÖÜ]/g, "");
    return clean.length >= 4 && !glueOf(getActiveLang()).has(clean.toLowerCase());
  });
  if (!candidates.length) return null;
  const target = pick(candidates);
  const clean = target.replace(/[^\wäöüßÄÖÜ]/g, "");
  // un solo hueco: si la palabra aparece dos veces, mejor otra plantilla
  if (f.display.split(clean).length !== 2) return null;
  return {
    id, type: "cloze",
    prompt: "Repaso — completa la frase que ya conoces",
    text: f.display.replace(clean, "___"),
    answers: [clean],
    translation: v.source,
    itemIds: [v.id],
  };
}

export function tMatch(items: VocabItem[], id: string): Exercise | null {
  const pairs: { target: string; source: string }[] = [];
  const used: VocabItem[] = []; // crédito SRS SOLO a los ítems que sí entraron
  const seenT = new Set<string>(), seenS = new Set<string>();
  for (const v of items) {
    const t = itemForms(v).display;
    if (t.length < 3) continue; // sonidos/letras fuera del emparejado
    if (isListCard(v) || LIST_MARKS.test(v.source)) continue; // ni tablas ni listas
    if (seenT.has(t) || seenS.has(v.source)) continue;
    seenT.add(t);
    seenS.add(v.source);
    pairs.push({ target: t, source: v.source });
    used.push(v);
    if (pairs.length === 4) break;
  }
  if (pairs.length < 3) return null;
  return {
    id, type: "match",
    prompt: "Repaso — empareja lo que ya viste",
    pairs,
    itemIds: used.map((v) => v.id),
  };
}

export function tGenderBucket(pool: VocabItem[], id: string): Exercise | null {
  const byArt = new Map<string, VocabItem[]>();
  for (const v of pool) {
    if (!v.article) continue;
    const list = byArt.get(v.article) ?? [];
    list.push(v);
    byArt.set(v.article, list);
  }
  const arts = [...byArt.entries()].filter(([, l]) => l.length >= 3).map(([a]) => a);
  if (arts.length < 2) return null;
  const [a, b] = shuffle(arts);
  // dos fichas distintas pueden mostrar la MISMA palabra (un helvetismo que se
  // enseña dos veces): en el cubo salía dos veces la misma ficha
  const seenText = new Set<string>();
  const uniq = (list: VocabItem[], bucket: 0 | 1) =>
    shuffle(list)
      .filter((v) => {
        const t = stripArticle(itemForms(v).display);
        if (seenText.has(t)) return false;
        seenText.add(t);
        return true;
      })
      .slice(0, 4)
      .map((v) => ({ v, bucket }));
  const items = shuffle([...uniq(byArt.get(a)!, 0), ...uniq(byArt.get(b)!, 1)]);
  if (items.length < 4) return null;
  return {
    id, type: "bucket",
    prompt: "Repaso — género en ráfaga",
    categories: [a, b],
    items: items.map(({ v, bucket }) => ({
      text: stripArticle(itemForms(v).display),
      bucket,
    })),
    itemIds: items.map(({ v }) => v.id),
  };
}

/* ── plantillas INGLESAS (el alemán tiene artículo/género; el inglés tiene
      contracciones y el baile be/do — cada idioma repasa SUS batallas) ── */

/** contrae como un nativo: "I am from Bogotá" → "I'm from Bogotá" */
const CONTRACTIONS: [RegExp, string][] = [
  [/\bI am\b/, "I'm"], [/\byou are\b/i, "you're"], [/\bhe is\b/i, "he's"],
  [/\bshe is\b/i, "she's"], [/\bit is\b/i, "it's"], [/\bthey are\b/i, "they're"],
  [/\bwe are\b/i, "we're"], [/\bwhat is\b/i, "what's"], [/\bthere is\b/i, "there's"],
  [/\bdo not\b/i, "don't"], [/\bdoes not\b/i, "doesn't"], [/\bcannot\b/i, "can't"],
];

export function tContractionEn(v: VocabItem, id: string): Exercise | null {
  if (isListCard(v)) return null;
  const hit = CONTRACTIONS.find(([re]) => re.test(v.target));
  if (!hit) return null;
  const answer = v.target.replace(hit[0], hit[1]);
  if (answer === v.target) return null;
  return {
    id,
    type: "type",
    prompt: "Contrae como un nativo — así lo dice todo el mundo:",
    question: `«${v.target}»`,
    answers: [answer],
    itemIds: [v.id],
    tip: "La forma larga es del libro; la contraída es la que vas a OÍR siempre.",
  } as Exercise;
}

/** el baile do/does: la primera palabra de la pregunta se esfuma */
export function tDoDoesEn(v: VocabItem, id: string): Exercise | null {
  if (isListCard(v)) return null;
  const m = /^(Do|Does|Don't|Doesn't)\s(.+)$/i.exec(v.target.trim());
  if (!m) return null;
  return {
    id,
    type: "cloze",
    prompt: "Completa la pregunta:",
    text: `___ ${m[2]}`,
    answers: [m[1]],
    translation: v.source,
    itemIds: [v.id],
    tip: "does para he/she/it — y el verbo se queda SIN la -s (does she work?).",
  } as Exercise;
}

/** bucket sesión: ¿la pregunta empieza con be o con do? (la confusión reina) */
export function tBeDoBucketEn(pool: VocabItem[], id: string): Exercise | null {
  const be: string[] = [];
  const doo: string[] = [];
  const seenText = new Set<string>();
  for (const v of shuffle(pool)) {
    if (isListCard(v)) continue;
    const t = v.target.trim();
    if (seenText.has(t)) continue;
    if (/^(Is|Are|Am)\b/i.test(t) && be.length < 4) { be.push(t); seenText.add(t); }
    if (/^(Do|Does)\b/i.test(t) && doo.length < 4) { doo.push(t); seenText.add(t); }
  }
  if (be.length < 2 || doo.length < 2) return null;
  const items = [
    ...be.map((t) => ({ text: t, bucket: 0 as const })),
    ...doo.map((t) => ({ text: t, bucket: 1 as const })),
  ];
  return {
    id,
    type: "bucket",
    prompt: "¿Con qué arranca cada pregunta?",
    categories: ["be (is/are)", "do/does"],
    items: shuffle(items).slice(0, 8),
    itemIds: [],
    tip: "be pregunta por SER/ESTAR; do/does pregunta por lo que HACES.",
  } as Exercise;
}

/* ── plantillas de NIVEL (B1): se activan con VocabItem.gram y devuelven null
      sin él, así que A1/A2 no cambian ni una coma (PLAN.md §6.2) ── */

/** T10 — preposición regida: el hueco es SIEMPRE la preposición, nunca el verbo.
 *  Sirve a los dos idiomas: `warten auf` + Akkusativ y `depend on` son el mismo
 *  ejercicio con distinta etiqueta. Cuando la ficha no declara caso —el inglés
 *  no lo tiene— el consejo habla de la preposición pegada al verbo y no
 *  menciona acusativo ni dativo, que allí no significan nada. */
export function tRektion(v: VocabItem, id: string): Exercise | null {
  const r = v.gram?.rektion;
  if (!r) return null;
  // OJO: \b de JavaScript es ASCII, así que \büber\b NUNCA casa y la
  // plantilla se quedaba muda en 8 de los 68 verbos con rección. Delimitamos
  // a mano con "no-letra" incluyendo los caracteres alemanes.
  const NL = "[^a-zA-ZäöüÄÖÜß]";
  // Hay huecos donde dos preposiciones son igual de correctas («She told me
  // about/of the flat», «I filled in/out the form»). La ficha puede escribirlas
  // separadas por barra y aquí se acepta cualquiera: el hueco se abre sobre la
  // primera —la que trae el ejemplo— y se dan por buenas todas. Hoy ninguna
  // ficha lo usa, así que esto no cambia un solo ejercicio; está para que
  // arreglarlo sea editar contenido y no tocar el motor (ver INFORME).
  const preps = r.prep.split("/").map((x) => x.trim()).filter(Boolean);
  const esc = escapeRe(preps[0]);
  const hole = (flags: string) => new RegExp(`(^|${NL})${esc}(?=${NL}|$)`, flags);
  // Media rección viene con su ejemplo entre paréntesis —«sich freuen über
  // (Ich freue mich über dein Geschenk)»— y ahí la preposición sale DOS veces:
  // se tapaba una y la otra la cantaba desde el paréntesis. Se prueba primero
  // la ficha entera (comportamiento de siempre cuando solo hay una), luego el
  // EJEMPLO solo —que es el que enseña— y por último la colocación pelada.
  const example = /\(([^)]+)\)/.exec(v.target)?.[1]?.trim();
  const bare = v.target.replace(/\([^)]*\)/g, " ").replace(/\s+/g, " ").trim();
  const source = [v.target, example, bare].find(
    (t): t is string => Boolean(t) && (t!.match(hole("gi")) ?? []).length === 1,
  );
  if (!source) return null; // la preposición no aparece, o aparece de más
  const text = source.replace(hole("i"), (m, a: string) => `${a}___`);
  return {
    id,
    type: "cloze",
    prompt: "Repaso — la preposición va pegada al verbo",
    text,
    answers: preps,
    translation: v.source,
    itemIds: [v.id],
    tip: r.case
      ? `${r.stem} + ${r.prep} + ${r.case === "akk" ? "Akkusativ" : "Dativ"} — se aprende en bloque, como una palabra.`
      : `${r.stem} + ${r.prep} — el verbo y su preposición van juntos: se aprenden en bloque, como una sola palabra.`,
  } as Exercise;
}

/** da-/wo-Komposita por tabla, con la -r eufónica ante vocal (worauf, darauf) */
function daWo(p: string): { wo: string; da: string } {
  // la -r eufónica va ante CUALQUIER vocal, incluidas ö y ü: über → worüber,
  // darüber (sin ellas salía "woüber", que no existe y se corregía como fallo
  // al alumno que escribía bien)
  const r = /^[aeiouäöü]/i.test(p) ? "r" : "";
  return { wo: `wo${r}${p}`, da: `da${r}${p}` };
}

/** T11 — worauf/darauf: el español no tiene equivalente y el alemán lo exige */
export function tDaWo(v: VocabItem, id: string): Exercise | null {
  const r = v.gram?.rektion;
  if (!r) return null;
  const { wo, da } = daWo(r.prep.split("/")[0].trim());
  return Math.random() < 0.5
    ? ({
        id,
        type: "type",
        prompt: "Repaso — pregunta por una COSA, no por una persona",
        question: `«¿En qué / de qué…?» con «${r.stem} ${r.prep}»`,
        answers: [wo, wo.toLowerCase()],
        itemIds: [v.id],
        tip: `Personas: ${r.prep} + wen/wem. Cosas: ${wo}.`,
      } as Exercise)
    : ({
        id,
        type: "type",
        prompt: "Repaso — «de ello / en ello» en UNA sola palabra",
        question: `«${r.stem} ${r.prep} …» → dilo con «ello»`,
        answers: [da, da.toLowerCase()],
        itemIds: [v.id],
        tip: `Ich freue mich ${da}, dass… — el español no tiene esta palabra; el alemán la exige.`,
      } as Exercise);
}

/** Konjunktiv II sintético: grupo cerrado (cero contenido que escribir) */
const K2: Record<string, string> = {
  kann: "könnte", kannst: "könntest", können: "könnten", könnt: "könntet",
  hat: "hätte", habe: "hätte", hast: "hättest", haben: "hätten",
  ist: "wäre", bist: "wärst", sind: "wären",
  muss: "müsste", musst: "müsstest", soll: "sollte", sollst: "solltest",
  darf: "dürfte", darfst: "dürftest", weiß: "wüsste", weißt: "wüsstest",
  wird: "würde", wirst: "würdest", geht: "ginge", kommt: "käme",
};

/** T12 — Konjunktiv II de cortesía: Kannst du… → Könntest du… */
export function tK2Hoeflich(v: VocabItem, id: string): Exercise | null {
  // la tabla está en minúsculas, pero el verbo puede abrir la frase ("Kannst
  // du…"): se busca en minúscula y se devuelve la capitalización original
  if (isListCard(v)) return null;
  const bare = (w: string) => w.replace(/[^\wäöüßÄÖÜ]/gi, "");
  // sobre la forma LIMPIA: en «könnte (können → könnte)» la tabla casaba con el
  // «können» del paréntesis y la respuesta salía «könnte (könnten → könnte)»
  const display = itemForms(v).display;
  const words = display.split(/\s+/);
  const i = words.findIndex((w) => K2[bare(w).toLowerCase()]);
  if (i < 0) return null;
  const raw = bare(words[i]);
  let k2 = K2[raw.toLowerCase()];
  if (raw[0] === raw[0]?.toUpperCase()) k2 = k2[0].toUpperCase() + k2.slice(1);
  const out = [...words];
  out[i] = words[i].replace(raw, k2);
  return {
    id,
    type: "transform",
    prompt: "Repaso — cortesía",
    source: display,
    instruction: "Hazlo cortés / hipotético (Konjunktiv II)",
    answers: [out.join(" ")],
    translation: v.source,
    itemIds: [v.id],
    tip: "Este verbo NO admite würde: tiene forma propia (hätte, wäre, könnte, müsste, sollte, dürfte, wüsste).",
  } as Exercise;
}

/** T13 — la trampa nº1 del B1 escrito: ¿verbo al final o inversión? */
export function tKonnektorBucket(pool: VocabItem[], id: string): Exercise | null {
  const sub = pool.filter((v) => v.gram?.konn === "sub" && !isListCard(v)).slice(0, 4);
  const adv = pool.filter((v) => v.gram?.konn === "adv" && !isListCard(v)).slice(0, 4);
  if (sub.length < 2 || adv.length < 2) return null;
  return {
    id,
    type: "bucket",
    prompt: "Repaso — ¿qué le hace este conector al verbo?",
    categories: ["verbo AL FINAL (…, weil ich müde bin)", "INVERSIÓN (deshalb bin ich müde)"],
    items: shuffle([
      ...sub.map((v) => ({ text: v.target, bucket: 0 as const })),
      ...adv.map((v) => ({ text: v.target, bucket: 1 as const })),
    ]),
    itemIds: [...sub, ...adv].map((v) => v.id),
    tip: "En español «por eso» y «aunque» no le hacen nada al verbo. En alemán deciden toda la frase.",
  } as Exercise;
}

const PASSIV_ORDER = ["sich-lassen", "sein-zu", "bar", "man"] as const;
const PASSIV_LABEL: Record<(typeof PASSIV_ORDER)[number], string> = {
  "sich-lassen": "sich lassen",
  "sein-zu": "sein + zu",
  bar: "-bar",
  man: "man",
};

/** B2 — clasificar el traje del «se»: sich lassen / sein+zu / -bar / man.
 *  Sin gram.passiv, o con menos de dos categorías con ≥2 fichas, calla. */
export function tPassivErsatz(pool: VocabItem[], id: string): Exercise | null {
  const byCat = new Map<(typeof PASSIV_ORDER)[number], VocabItem[]>();
  const seen = new Set<string>();
  for (const v of pool) {
    const p = v.gram?.passiv;
    if (!p || isListCard(v)) continue;
    const text = itemForms(v).display;
    if (seen.has(text.toLowerCase())) continue;
    seen.add(text.toLowerCase());
    const list = byCat.get(p) ?? [];
    list.push(v);
    byCat.set(p, list);
  }
  const cats = PASSIV_ORDER.filter((c) => (byCat.get(c)?.length ?? 0) >= 2);
  if (cats.length < 2) return null;
  const used: { v: VocabItem; bucket: number }[] = [];
  cats.forEach((c, bucket) => {
    for (const v of shuffle(byCat.get(c)!).slice(0, 4)) used.push({ v, bucket });
  });
  if (used.length < 4) return null;
  return {
    id,
    type: "bucket",
    prompt: "Repaso — ¿con qué traje va este «se»?",
    categories: cats.map((c) => PASSIV_LABEL[c]),
    items: shuffle(used.map((x) => ({ text: itemForms(x.v).display, bucket: x.bucket }))),
    itemIds: used.map((x) => x.v.id),
    tip: "man es de conversación; sich lassen y sein + zu, de escrito; -bar es el adjetivo.",
  } as Exercise;
}

/** T14 — corregir el calco propio. SOLO sobre material ya consolidado
 *  (streak ≥2): exponer formas incorrectas puede hacerlas familiares, así que
 *  va con salvaguardas — un solo error, y al corregir solo queda la buena. */
/** ¿`good` es de verdad la corrección de `wrong`? Corregir arregla algo DENTRO
 *  de una frase: la arreglada mide casi lo mismo y comparte casi todas las
 *  palabras. Sin esta comprobación, una ficha cuyo `target` es un lema
 *  («money», «well»), una colocación («warten auf») o una lista («explain ·
 *  say · describe») daba como respuesta correcta de «I don't have many
 *  money.» la palabra «money», y de «Ich warte für den Bus» la colocación
 *  «warten auf» — que no es una frase que nadie pueda escribir.
 *
 *  `mismoArranque` se exige solo a `gram.same`, que es un campo de PARÁFRASIS
 *  y no de corrección: ahí «I arrived to London on Friday.» tiene guardado
 *  «got to London on Friday», que dice lo mismo pero no corrige nada. El
 *  `target` sí puede empezar distinto, porque a menudo el calco está justo al
 *  principio («In meiner Meinung …» → «Meiner Meinung nach …»). */
function isCorrectionOf(wrong: string, good: string, mismoArranque: boolean): boolean {
  if (!good || LIST_MARKS.test(good)) return false;
  const w = tokensOf(wrong);
  const g = tokensOf(good);
  if (!w.length || !g.length) return false;
  // Corregir no es reescribir: la frase arreglada mide casi lo mismo, ni dos
  // palabras más ni la mitad. Ahí es donde caen «I don't have many money.» →
  // «money» y «Ich warte für den Bus» → «warten auf», que son un lema puesto
  // en el sitio de una frase. Y ojo: el parecido literal NO sirve de criterio
  // —«He has thirty years.» → «He's in his thirties.» no comparte ni una
  // palabra y es un ejercicio perfecto—, así que aquí solo se mide el tamaño.
  if (Math.abs(w.length - g.length) > 2) return false;
  if (g.length * 2 < w.length || w.length * 2 < g.length) return false;
  return !mismoArranque || new Set(g).has(w[0]);
}

export function tErrorFix(v: VocabItem, id: string, streak: number, lang = "de"): Exercise | null {
  if (!v.gram?.trap || streak < 2) return null;
  // La buena puede estar en el propio `target`, en un miembro de la lista que
  // la ficha enseña («You must rest. · You have to rest.») o en `gram.same`,
  // que en las fichas-montón es justo la frase arreglada.
  // Nueve fichas del B1 alemán guardan en `trap` una nota de FALSO AMIGO
  // («aktuell = en realidad», «eventualmente / finalmente») en vez de un calco
  // escrito. Servirlas como «esto lo escribió un hispanohablante, arréglalo»
  // era pedirle al alumno que corrigiera una entrada de diccionario.
  if (GLOSS_TRAP.test(v.gram.trap)) return null;
  const forms = itemForms(v);
  const trap = v.gram.trap;
  const good =
    [...forms.accepted, ...listParts(forms.display)].find((c) => isCorrectionOf(trap, c, false))
    ?? (v.gram.same ?? []).find((c) => isCorrectionOf(trap, c, true));
  if (!good) return null; // sin corrección escribible no hay ejercicio, hay trampa
  // tipo `errorfix`, no `type`: así se aplican sus salvaguardas — al corregir,
  // la forma incorrecta DESAPARECE de pantalla y solo queda la buena
  return {
    id,
    type: "errorfix",
    prompt: "Repaso — esto lo escribió un hispanohablante. Arréglalo.",
    wrong: v.gram.trap,
    answers: [good],
    // el «porqué» alemán habla de orden de palabras porque allí el calco es
    // casi siempre posicional; en inglés lo típico es léxico o de tiempo
    // verbal («I have 25 years», «since three years»), así que no se le puede
    // decir al alumno que las palabras estaban bien
    why: lang === "en"
      ? "Es un calco: en español suena lógico y en inglés no se dice así."
      : "Es un calco: las palabras estaban bien, el orden no.",
    translation: v.source,
    itemIds: [v.id],
  } as Exercise;
}

/** T15 — decirlo de otra manera: el rango léxico es la causa 3 del plateau */
export function tParaphrase(v: VocabItem, id: string): Exercise | null {
  const same = v.gram?.same;
  if (!same?.length) return null;
  if (isListCard(v)) return null;
  // «Dilo de otra manera» solo es contestable si lo otro es del mismo tamaño:
  // de «arrived» nadie adivina «got to London on Friday» —esa equivalencia
  // trae dentro un Londres y un viernes que la pregunta no enseña—, y de una
  // lista de seis verbos, menos todavía. Basta con que UNA equivalencia esté a
  // tiro para ofrecer el ejercicio, y se aceptan todas: cambiar de registro no
  // puede costarle la racha a quien lo hace bien.
  const alts = same.filter((alt) => !LIST_MARKS.test(alt));
  const n = wordCount(itemForms(v).display);
  const aTiro = (m: number) => Math.abs(m - n) <= 4 && Math.min(m, n) * 3 >= Math.max(m, n);
  if (!alts.some((alt) => aTiro(wordCount(alt)))) return null;
  return {
    id,
    type: "type",
    prompt: "Repaso — dilo de OTRA manera (mismo significado)",
    question: `«${v.target}» — otra forma de decirlo`,
    answers: alts,
    itemIds: [v.id],
    tip: "Tener dos formas para lo mismo es lo que separa el A2 del B1.",
  } as Exercise;
}

/* ── plantillas de NIVEL B2: aditivas. Sin el campo nuevo, null, y A1/A2/B1
      no cambian ni un ejercicio (PLAN-DE-B2.md §7.4). ── */

function firstToken(s: string): string {
  return s.trim().split(/\s+/)[0] ?? "";
}

/** B2 — subordinada verbal ↔ sintagma nominal. */
export function tNominalisierung(v: VocabItem, id: string): Exercise | null {
  const n = v.gram?.nomen;
  if (!n || isListCard(v)) return null;
  if (!n.verbal.trim() || !n.nominal.trim()) return null;
  if (n.verbal.trim() === n.nominal.trim()) return null;
  if (LIST_MARKS.test(n.verbal) || LIST_MARKS.test(n.nominal)) return null;
  const toNominal = Math.random() < 0.5;
  const from = toNominal ? n.verbal : n.nominal;
  const to = toNominal ? n.nominal : n.verbal;
  const forbid = firstToken(from);
  if (!forbid) return null;
  return {
    id,
    type: "paraphrase",
    prompt: "Repaso — la misma idea, otro traje",
    source: from,
    forbid: [forbid],
    answers: [to],
    translation: v.source,
    itemIds: [v.id],
    tip: "En el examen, dos weil seguidos suenan a B1; un aufgrund, a B2.",
  } as Exercise;
}

const K1_IND: Record<string, { ich: string; er: string }> = {
  sei: { ich: "bin", er: "ist" },
  habe: { ich: "habe", er: "hat" },
  komme: { ich: "komme", er: "kommt" },
  könne: { ich: "kann", er: "kann" },
  müsse: { ich: "muss", er: "muss" },
  wolle: { ich: "will", er: "will" },
  solle: { ich: "soll", er: "soll" },
  wisse: { ich: "weiß", er: "weiß" },
  gehe: { ich: "gehe", er: "geht" },
  gebe: { ich: "gebe", er: "gibt" },
  werde: { ich: "werde", er: "wird" },
};

function replaceOnce(text: string, phrase: string, repl: string): string | null {
  const NL = "[^a-zA-ZäöüÄÖÜß']";
  const esc = escapeRe(phrase);
  const re = new RegExp(`(^|${NL})(${esc})(?=${NL}|$)`, "i");
  const all = new RegExp(`(^|${NL})${esc}(?=${NL}|$)`, "gi");
  if ((text.match(all) ?? []).length !== 1) return null;
  const m = re.exec(text);
  if (!m) return null;
  const at = m.index + m[1].length;
  let out = repl;
  if (m[2][0] === m[2][0]?.toUpperCase()) out = out[0].toUpperCase() + out.slice(1);
  return `${text.slice(0, at)}${out}${text.slice(at + m[2].length)}`;
}

/** B2 — estilo directo → indirecto de prensa (Konjunktiv I). */
export function tKonjunktiv1(v: VocabItem, id: string): Exercise | null {
  const k1 = v.gram?.k1?.trim();
  if (!k1 || isListCard(v)) return null;
  const display = itemForms(v).display.trim();
  const forms = K1_IND[k1.toLowerCase() as keyof typeof K1_IND];
  const parsed = new RegExp(`^(er|sie|es)\\s+${escapeRe(k1)}(?:\\s+(.*))?$`, "i").exec(display.replace(/[.,!?]+$/, ""));
  let source: string;
  let answers: string[];
  if (parsed) {
    const subject = parsed[1].toLowerCase();
    const rest = (parsed[2] ?? "").trim();
    const ich = forms?.ich ?? k1;
    const ichClause = rest ? `Ich ${ich} ${rest}` : `Ich ${ich}`;
    source = `Er sagte: „${ichClause}."`;
    const indir = rest ? `${subject} ${k1} ${rest}` : `${subject} ${k1}`;
    answers = [`Er sagte, ${indir}.`, `Er sagte, ${indir}`];
  } else {
    const swapped = forms ? replaceOnce(display, k1, forms.er) : null;
    if (swapped && swapped !== display) {
      source = swapped;
      answers = [display];
    } else {
      const ich = forms?.ich ?? k1;
      source = `Er sagte: „Ich ${ich}."`;
      answers = [`Er sagte, er ${k1}.`, `Er sagte, er ${k1}`];
    }
  }
  return {
    id,
    type: "transform",
    prompt: "Repaso — estilo indirecto de prensa",
    source,
    instruction: "Pásalo a Konjunktiv I (la cita es suya, no tuya)",
    answers,
    translation: v.source,
    itemIds: [v.id],
    tip: "El Konjunktiv I no afirma: atribuye. «er sei» no es «él es»; es «dice que es».",
  } as Exercise;
}

/** B2 — relativa ↔ atributo participial. */
export function tPartizipAttribut(v: VocabItem, id: string): Exercise | null {
  const p = v.gram?.partizip;
  if (!p || isListCard(v)) return null;
  if (!p.relative.trim() || !p.attr.trim()) return null;
  if (p.relative.trim() === p.attr.trim()) return null;
  if (LIST_MARKS.test(p.relative) || LIST_MARKS.test(p.attr)) return null;
  const toAttr = Math.random() < 0.5;
  return {
    id,
    type: "transform",
    prompt: "Repaso — comprime o deshaz",
    source: toAttr ? p.relative : p.attr,
    instruction: toAttr
      ? "Pliega la relativa a un atributo participial"
      : "Deshaz el atributo: dilo con una relativa",
    answers: [toAttr ? p.attr : p.relative],
    translation: v.source,
    itemIds: [v.id],
    tip: "Si no puedes deshacerlo, no lo has entendido. Si no puedes rehacerlo, el Schreiben se queda en relativas de B1.",
  } as Exercise;
}

function phraseHit(text: string, phrase: string): { at: number; len: number; matched: string } | null {
  const NL = "[^a-zA-ZäöüÄÖÜß']";
  const esc = escapeRe(phrase);
  const re = new RegExp(`(^|${NL})(${esc})(?=${NL}|$)`, "i");
  const m = re.exec(text);
  if (!m) return null;
  return { at: m.index + m[1].length, len: m[2].length, matched: m[2] };
}

function blankTwo(text: string, a: string, b: string): { text: string; answers: [string, string] } | null {
  const ma = phraseHit(text, a);
  const mb = phraseHit(text, b);
  if (!ma || !mb) return null;
  if (ma.at < mb.at + mb.len && mb.at < ma.at + ma.len) return null;
  const first = ma.at < mb.at ? ma : mb;
  const second = ma.at < mb.at ? mb : ma;
  let out = text;
  out = `${out.slice(0, second.at)}___${out.slice(second.at + second.len)}`;
  out = `${out.slice(0, first.at)}___${out.slice(first.at + first.len)}`;
  const answers: [string, string] = ma.at < mb.at ? [ma.matched, mb.matched] : [mb.matched, ma.matched];
  const NL = "[^a-zA-ZäöüÄÖÜß']";
  for (const ans of answers) {
    if (new RegExp(`(^|${NL})${escapeRe(ans)}(?=${NL}|$)`, "i").test(out)) return null;
  }
  return { text: out, answers };
}

const ZWEI_DISTRACTORS = ["aber", "und", "weil", "deshalb", "oder", "dass", "obwohl", "trotzdem"];

/** B2 — completar las dos piezas de je…desto / weder…noch / nicht nur…sondern auch. */
export function tZweiteiligerKonnektor(v: VocabItem, id: string): Exercise | null {
  if (isListCard(v)) return null;
  let left = v.gram?.zweiteilig?.left.trim() ?? "";
  let right = v.gram?.zweiteilig?.right.trim() ?? "";
  let example = v.gram?.zweiteilig?.example.trim() ?? "";
  if (!left || !right) {
    if (v.gram?.konn !== "zweiteilig") return null;
    const bits = itemForms(v).display.split(/\s*(?:…|\.\.\.)\s*/);
    if (bits.length !== 2 || !bits[0]?.trim() || !bits[1]?.trim()) return null;
    left = bits[0].trim();
    right = bits[1].trim();
  }
  if (!left || !right || left.toLowerCase() === right.toLowerCase()) return null;
  const holes =
    (example ? blankTwo(example, left, right) : null)
    ?? blankTwo(`${left} A, ${right} B`, left, right);
  if (!holes) return null;
  const taken = new Set([left.toLowerCase(), right.toLowerCase()]);
  const extra = ZWEI_DISTRACTORS.filter((d) => !taken.has(d.toLowerCase())).slice(0, 4);
  if (extra.length < 2) return null;
  return {
    id,
    type: "gapbank",
    prompt: "Repaso — el conector va en dos piezas",
    text: holes.text,
    answers: [...holes.answers],
    bank: [...holes.answers, ...extra],
    translation: v.source,
    itemIds: [v.id],
    tip: "Si pones la primera, debes la segunda. nicht nur pide sondern auch, no aber.",
  } as Exercise;
}

/* ── plantillas de NIVEL en INGLÉS: gemelas de las alemanas ──────────────────
 *
 * Se activan por IDIOMA (buildReviewSession y el reto ya saben cuál es) y no
 * adivinando del contenido, y además exigen `gram` en la tarjeta. Como el
 * inglés A1 no tiene ni un `gram`, eso garantiza por construcción que el A1
 * no cambia ni un ejercicio.
 *
 * Qué atacan, que no es lo que parece a primera vista:
 *  · Estilo indirecto. El BACKSHIFT no es interferencia del español: el
 *    español también concuerda tiempos («dijo que estaba cansado»). Lo que sí
 *    falla, y mucho, es `say`/`tell` («He said me that…») y la inversión que
 *    se queda dentro de la pregunta indirecta («I don't know where is the
 *    station»). Son esos dos los que tienen plantilla.
 *  · Condicionales 1.º y 2.º: el error vive siempre en la mitad del `if`.
 *  · Present perfect vs pasado simple mandados por el adverbio: LA trampa del
 *    hispanohablante.
 *  · Preposiciones dependientes y phrasal verbs: salen gratis de tRektion sin
 *    caso, arriba.
 */

/** materia de nivel: sin `gram` no se activa ninguna plantilla inglesa de B1 */
const levelReady = (v: VocabItem) => Boolean(v.gram);

/** reemplaza la primera aparición suelta de `word` por un hueco */
function blankWord(text: string, word: string, from = 0): string | null {
  const esc = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(^|[^a-zA-Z'])(${esc})(?=[^a-zA-Z']|$)`, "i");
  const m = re.exec(text.slice(from));
  if (!m) return null;
  const at = from + m.index + m[1].length;
  const hueco = `${text.slice(0, at)}___${text.slice(at + m[2].length)}`;
  // La palabra no puede seguir a la vista en otro sitio de la frase, o el hueco
  // se rellena copiando. Lo destapó una coletilla: «They didn't say anything,
  // did they?» → «___ didn't say anything, did they?» se resuelve sin saber
  // nada. Vale para cualquier plantilla que abra hueco: mejor no generar el
  // ejercicio que generarlo regalado.
  const resto = new RegExp(`(^|[^a-zA-Z'])(${esc})(?=[^a-zA-Z']|$)`, "i");
  return resto.test(hueco) ? null : hueco;
}

// las de dos palabras van DELANTE: si «what» gana la carrera, «what time is
// it?» se queda sin plantilla
const WH = "what time|how (?:much|many|long|often|old)|who|what|where|when|why|which|whose|how";
const AUX = "is|are|am|was|were|can|could|will|would|should|must|might|have|has|had";
const PRON = "I|you|he|she|it|we|they";

/** TE1 — la pregunta indirecta: dentro de otra frase se DESHACE la inversión.
 *  «Where is she?» → «I wonder where she is.» Es el error nº 1 del
 *  hispanohablante en indirectas, porque en español la inversión sobrevive
 *  («no sé dónde está la estación»).
 *
 *  Solo se generan las formas que son puro movimiento —be, modales y have/has
 *  con sujeto pronombre—: las de `do/does/did` exigirían rehacer la morfología
 *  del verbo (does she live → she lives) y una plantilla que se equivoca al
 *  conjugar enseña algo falso. El portador es «I wonder» a propósito: «I don't
 *  know» arrastraría el problema de las contracciones del corrector. */
export function tIndirectQuestionEn(v: VocabItem, id: string): Exercise | null {
  if (!levelReady(v) || isListCard(v)) return null;
  const t = v.target.trim();
  if (!t.endsWith("?")) return null;
  const body = t.slice(0, -1).trim();
  const wh = new RegExp(`^(${WH})\\s+(${AUX})\\s+(${PRON})\\b\\s*(.*)$`, "i").exec(body);
  const yn = new RegExp(`^(${AUX})\\s+(${PRON})\\b\\s*(.*)$`, "i").exec(body);
  let clause: string;
  if (wh) {
    const [, w, aux, pron, rest] = wh;
    clause = `${w.toLowerCase()} ${pron} ${aux.toLowerCase()}${rest ? ` ${rest}` : ""}`;
  } else if (yn) {
    const [, aux, pron, rest] = yn;
    clause = `if ${pron} ${aux.toLowerCase()}${rest ? ` ${rest}` : ""}`;
  } else return null;
  return {
    id,
    type: "transform",
    prompt: "Repaso — mete la pregunta DENTRO de otra frase",
    source: t,
    instruction: "Empieza por «I wonder …»",
    answers: [`I wonder ${clause}.`],
    translation: v.source,
    itemIds: [v.id],
    tip: "Dentro de otra frase la pregunta pierde la inversión: «Where is the station?» → «I wonder where the station IS». En español la inversión sobrevive; en inglés no.",
  } as Exercise;
}

/** verbos que sirven de hueco en la mitad del `if`: grupo cerrado, para no
 *  tener que adivinar cuál es el verbo de la subordinada */
const IF_VERB = /(^|[^a-zA-Z'])(had|were|was|have|has|am|is|are|could|did)(?=[^a-zA-Z']|$)/i;
const MAIN_MODAL = /(^|[^a-zA-Z'])(would|will|won't|wouldn't)(?=[^a-zA-Z']|$)/i;

/** TE2 — condicionales 1.º y 2.º: el hueco cae en la mitad del `if` cuando su
 *  verbo es reconocible, y si no, en el modal de la otra mitad. En los dos
 *  casos la mitad que se ve es la que decide la respuesta, así que el ejercicio
 *  es resoluble y no la regala.
 *
 *  Ataca de frente el «If I would have…»: el `would` vive en la mitad SIN if.
 *  El condicional cero se queda fuera a propósito —no tiene modal que sirva de
 *  ancla— y se trabaja con `gapbank`/`cloze` de contenido. */
export function tConditionalEn(v: VocabItem, id: string): Exercise | null {
  if (!levelReady(v) || isListCard(v)) return null;
  const t = v.target.trim();
  const ifAt = t.search(/(^|[^a-zA-Z'])if(?=[^a-zA-Z']|$)/i);
  if (ifAt < 0) return null;
  const startsWithIf = /^if\b/i.test(t);
  const comma = t.indexOf(",");
  // «If …, main» o «main if …»: son las dos únicas formas que hay
  const ifStart = startsWithIf ? 0 : ifAt;
  const ifEnd = startsWithIf ? comma : t.length;
  if (startsWithIf && comma < 0) return null;
  const ifClause = t.slice(ifStart, ifEnd);
  const mainClause = startsWithIf ? t.slice(comma + 1) : t.slice(0, ifAt);
  const mainStart = startsWithIf ? comma + 1 : 0;
  const modal = MAIN_MODAL.exec(mainClause);
  if (!modal) return null; // sin will/would no se distingue el tipo: fuera

  const inIf = IF_VERB.exec(ifClause);
  let text: string | null;
  let answers: string[];
  if (inIf) {
    text = blankWord(t, inIf[2], ifStart);
    // «If I was you» se oye tanto como «If I were you»: dar por malo el que
    // dice todo el mundo sería castigar por hablar como se habla
    const w = inIf[2].toLowerCase();
    answers = w === "were" ? ["were", "was"] : w === "was" ? ["was", "were"] : [inIf[2]];
  } else {
    text = blankWord(t, modal[2], mainStart);
    answers = [modal[2]];
  }
  if (!text) return null;
  return {
    id,
    type: "cloze",
    prompt: "Repaso — condicional: cada mitad lleva lo suyo",
    text,
    answers,
    translation: v.source,
    itemIds: [v.id],
    tip: "El will/would vive SIEMPRE en la mitad sin «if». Dentro del «if» va presente (If it rains…) o pasado (If I had…), nunca «If I would have».",
  } as Exercise;
}

/* marcadores que MANDAN sobre el tiempo verbal. Lista cerrada y en código: la
   plantilla los reconoce, no los adivina. */
const PAST_MARK: RegExp[] = [
  /\b((?:\w+\s+){0,2}ago)\b/i,
  /\b(yesterday)\b/i,
  /\b(last\s+(?:night|week|month|year|summer|winter|monday|tuesday|wednesday|thursday|friday|saturday|sunday|time))\b/i,
  /\b(in\s+(?:19|20)\d{2})\b/i,
  // el artículo cuenta: sin él «When I was a student» dejaba «When I was a» de
  // marcador, y en el cubo el alumno leía media frase que no significa nada
  /\b(when\s+I\s+was\s+(?:a|an|at|in)\s+[a-z]+|when\s+I\s+was\s+[a-z]+)\b/i,
];
const PERFECT_MARK: RegExp[] = [
  /\b(just)\b/i, /\b(already)\b/i, /\b(yet)\b/i, /\b(ever)\b/i, /\b(never)\b/i,
  /\b(so\s+far)\b/i, /\b(up\s+to\s+now)\b/i, /\b(recently)\b/i, /\b(lately)\b/i,
  /\b(since\s+[^,.?!]{1,20})/i,
  /\b(for\s+(?:\d+|a|two|three|four|five|six|seven|eight|nine|ten|many|several)\s+(?:years?|months?|weeks?|days?|hours?|minutes?))\b/i,
  /\b(for\s+ages)\b/i, /\b(for\s+a\s+long\s+time)\b/i,
];

function firstMark(list: RegExp[], s: string): string | null {
  for (const re of list) {
    const m = re.exec(s);
    if (m) return m[1].trim();
  }
  return null;
}

/** TE3 — present perfect vs pasado simple, mandado por el adverbio: LA trampa
 *  del hispanohablante. El cubo clasifica los MARCADORES, no las frases: si se
 *  enseñara la frase entera el tiempo verbal se vería y bastaría con copiarlo.
 *  Así hay que saber qué pide cada marcador, que es la decisión de verdad. */
export function tPerfectPastBucketEn(pool: VocabItem[], id: string): Exercise | null {
  const past: { text: string; v: VocabItem }[] = [];
  const perf: { text: string; v: VocabItem }[] = [];
  const seenMark = new Set<string>();
  for (const v of pool) {
    if (!levelReady(v) || isListCard(v)) continue;
    const p = firstMark(PAST_MARK, v.target);
    const q = firstMark(PERFECT_MARK, v.target);
    if (p && q) continue; // dos señales opuestas en la misma frase: no enseña
    const text = p ?? q;
    if (!text || seenMark.has(text.toLowerCase())) continue;
    seenMark.add(text.toLowerCase());
    (p ? past : perf).push({ text, v });
  }
  if (past.length < 2 || perf.length < 2) return null;
  // el sorteo es de la plantilla, no de quien la llama: con 26 marcadores en el
  // curso, coger «los cuatro primeros» dejaba al alumno viendo siempre los
  // mismos ocho por muy barajado que llegara el pool
  const used = [...shuffle(past).slice(0, 4), ...shuffle(perf).slice(0, 4)];
  return {
    id,
    type: "bucket",
    prompt: "Repaso — ¿qué tiempo verbal pide cada marcador?",
    categories: ["PASADO SIMPLE — I did (ya cerrado)", "PRESENT PERFECT — I have done (sigue abierto)"],
    items: shuffle(
      used.map((x) => ({ text: x.text, bucket: (past.includes(x) ? 0 : 1) as 0 | 1 })),
    ),
    itemIds: used.map((x) => x.v.id),
    tip: "Si el periodo está cerrado (yesterday, last week, two years ago) → pasado simple. Si sigue abierto o toca el ahora (just, already, yet, ever, never, for, since) → present perfect.",
  } as Exercise;
}

const SAY_TELL = /(^|[^a-zA-Z'])(say|says|said|saying|tell|tells|told|telling)(?=[^a-zA-Z']|$)/i;
const OBJ_PRON = /^(me|him|her|us|them|you)\b/i;

/** una frase apta para el cubo say/tell: la estructura debe DECIDIR sola —
 *  `tell` con persona detrás, `say` sin ella. Si la tarjeta trae el calco
 *  («He said me…») no se sirve como modelo: eso es trabajo de tErrorFix, que
 *  lo tacha, no de un cubo, que lo daría por bueno. */
function sayTellSlot(target: string): { text: string; bucket: 0 | 1 } | null {
  const m = SAY_TELL.exec(target);
  if (!m) return null;
  const at = m.index + m[1].length;
  const verb = m[2];
  const isTell = /^t/i.test(verb);
  const after = target.slice(at + verb.length).trimStart();
  if (isTell !== OBJ_PRON.test(after)) return null;
  return {
    text: `${target.slice(0, at)}___${target.slice(at + verb.length)}`,
    bucket: isTell ? 0 : 1,
  };
}

/** TE4 — say vs tell: lista cerrada y decisión binaria, o sea, cubo (PLAN.md
 *  §6.1). El verbo va tapado para que se clasifique por lo que viene DETRÁS,
 *  que es la regla entera: tell lleva persona, say no. */
export function tSayTellBucketEn(pool: VocabItem[], id: string): Exercise | null {
  const tell: { text: string; v: VocabItem }[] = [];
  const say: { text: string; v: VocabItem }[] = [];
  for (const v of pool) {
    if (!levelReady(v) || isListCard(v)) continue;
    const slot = sayTellSlot(v.target);
    if (!slot) continue;
    (slot.bucket === 0 ? tell : say).push({ text: slot.text, v });
  }
  if (tell.length < 2 || say.length < 2) return null;
  const used = [...shuffle(tell).slice(0, 4), ...shuffle(say).slice(0, 4)];
  return {
    id,
    type: "bucket",
    prompt: "Repaso — ¿qué verbo falta en cada frase?",
    categories: ["tell — lleva PERSONA detrás (tell me…)", "say — sin persona (say that… / say to me)"],
    items: shuffle(
      used.map((x) => ({ text: x.text, bucket: (tell.includes(x) ? 0 : 1) as 0 | 1 })),
    ),
    itemIds: used.map((x) => x.v.id),
    tip: "tell + persona (tell me, tell her). say + lo dicho (say that…), y si quieres la persona, say TO me. «He said me» no existe.",
  } as Exercise;
}

/** B2 inglés — cloze del marcador discursivo. Sin gram.discourse, null. */
export function tDiscourseEn(v: VocabItem, id: string): Exercise | null {
  const marker = v.gram?.discourse?.trim();
  if (!marker || isListCard(v)) return null;
  const display = itemForms(v).display;
  const text = blankWord(display, marker) ?? blankWord(v.target, marker);
  if (!text) return null;
  const hit = phraseHit(display, marker) ?? phraseHit(v.target, marker);
  const answers = [...new Set([hit?.matched ?? marker, marker].filter(Boolean))];
  return {
    id,
    type: "cloze",
    prompt: "Repaso — el marcador que cose el texto",
    text,
    answers,
    translation: v.source,
    itemIds: [v.id],
    tip: "El marcador no es adorno: abre, cierra o gira el argumento. Sin él el párrafo se descoser.",
  } as Exercise;
}

/** B2 inglés — ¿formal o informal? Sin gram.register, null. */
export function tRegisterEn(v: VocabItem, id: string): Exercise | null {
  const r = v.gram?.register;
  if (!r || isListCard(v)) return null;
  const display = itemForms(v).display;
  return {
    id,
    type: "type",
    prompt: "Repaso — ¿formal o informal?",
    question: `«${display}» — ¿qué registro es?`,
    answers: [r],
    itemIds: [v.id],
    tip: "En B2 el mismo contenido cambia de traje: lo que puntúa en un informe suena a disfraz en la cocina.",
  } as Exercise;
}

/** Las plantillas de NIVEL por ítem que le tocan a cada idioma. Las cinco de
 *  B1 conservan orden; B2 se añade detrás y muere sin flags, así que A1/A2/B1
 *  no cambian ni un ejercicio. El inglés recibe las suyas y NINGUNA alemana —
 *  tK2Hoeflich buscaba «hat» en la tabla del Konjunktiv II y convertía «I have
 *  a hat» en «I have a hätte», y tDaWo fabricaba «worauf» para colocaciones
 *  inglesas. */
export interface LevelTemplate {
  /** nombre estable de la plantilla; se usa para repartir el cupo de nivel */
  kind: string;
  build: (v: VocabItem, id: string, streak: number) => Exercise | null;
}

/** Las plantillas de nivel de cada idioma, CON NOMBRE. Tenerlas nombradas es lo
 *  que permite repartir el cupo por plantilla en vez de por ficha: sorteando
 *  fichas, `tErrorFix` y `tParaphrase` —que valen para 452 y 325 tarjetas
 *  inglesas— se llevaban el 85% de los huecos de nivel, y las condicionales
 *  (7 tarjetas en todo el curso) no salían jamás. */
export function levelTemplatesOf(lang: string): LevelTemplate[] {
  if (lang === "en") {
    return [
      { kind: "rektion", build: (v, id) => tRektion(v, id) },
      { kind: "indirecta", build: (v, id) => tIndirectQuestionEn(v, id) },
      { kind: "condicional", build: (v, id) => tConditionalEn(v, id) },
      { kind: "errorfix", build: (v, id, streak) => tErrorFix(v, id, streak, "en") },
      { kind: "parafrasis", build: (v, id) => tParaphrase(v, id) },
      { kind: "discourse", build: (v, id) => tDiscourseEn(v, id) },
      { kind: "register", build: (v, id) => tRegisterEn(v, id) },
    ];
  }
  return [
    { kind: "rektion", build: (v, id) => tRektion(v, id) },
    { kind: "dawo", build: (v, id) => tDaWo(v, id) },
    { kind: "k2", build: (v, id) => tK2Hoeflich(v, id) },
    { kind: "errorfix", build: (v, id, streak) => tErrorFix(v, id, streak) },
    { kind: "parafrasis", build: (v, id) => tParaphrase(v, id) },
    { kind: "nomen", build: (v, id) => tNominalisierung(v, id) },
    { kind: "k1", build: (v, id) => tKonjunktiv1(v, id) },
    { kind: "partizip", build: (v, id) => tPartizipAttribut(v, id) },
    { kind: "zweiteilig", build: (v, id) => tZweiteiligerKonnektor(v, id) },
  ];
}

/** las de B2 no gastan `nextId` (Math.random): si lo hicieran, el azar de las
 *  cinco de B1 se desplazaría y A1/A2/B1 cambiarían de sesión. */
const B2_KIND = new Set(["nomen", "k1", "partizip", "zweiteilig", "discourse", "register"]);

export function levelTemplatesFor(
  lang: string,
  v: VocabItem,
  nextId: () => string,
  streak: number,
): (Exercise | null)[] {
  return levelTemplatesOf(lang).map((t) =>
    t.build(v, B2_KIND.has(t.kind) ? `b2-${t.kind}-${v.id}` : nextId(), streak),
  );
}

/** qué plantillas de nivel admite una ficha. Se cachea porque no depende del
 *  alumno —solo del contenido, que en un build es fijo— y recorrer 672 fichas
 *  por 5 plantillas en cada tanda sí se nota. El `streak` se comprueba aparte:
 *  es lo único que cambia con el progreso. */
const levelKindCache = new Map<string, string[]>();
function levelKindsOf(lang: string, v: VocabItem): string[] {
  const key = `${lang}|${v.id}`;
  const hit = levelKindCache.get(key);
  if (hit) return hit;
  const out = levelTemplatesOf(lang)
    .filter((t) => t.build(v, "sonda", 99) !== null)
    .map((t) => t.kind);
  levelKindCache.set(key, out);
  return out;
}

/** Las plantillas de NIVEL de SESIÓN (cubos sobre el pool entero) por idioma. */
export function levelBucketsFor(lang: string, pool: VocabItem[], id: string): Exercise[] {
  if (lang === "en") {
    return [tSayTellBucketEn(pool, id), tPerfectPastBucketEn(pool, id)]
      .filter((e): e is Exercise => e !== null);
  }
  const konn = tKonnektorBucket(pool, id);
  const passiv = tPassivErsatz(pool, id);
  return [konn, passiv].filter((e): e is Exercise => e !== null);
}

/* ── contraste de artículo (P17) ───────────────────────────────────────────
 * Intercalar ayuda cuando dos formas se confunden (der / die / das), no
 * cuando se barajan temas que no compiten. El contenido ya marca el género
 * en `article` y T5 ya sabe preguntarlo: no hace falta otra heurística.
 * Hacen falta dos géneros y dos sustantivos vistos en cada uno. Con una
 * ficha suelta no hay par.
 */

const DE_ARTICLES = ["der", "die", "das"] as const;
type DeArticle = (typeof DE_ARTICLES)[number];

function isDeArticle(a: string | undefined): a is DeArticle {
  return a !== undefined && DE_ARTICLES.some((x) => x === a);
}

/** Plantilla de una sola ficha que se puede prestar. El cupo de nivel, el
 *  emparejado y los cubos no se deshacen para meter el contraste. */
function isBorrowablePrompt(prompt: string): boolean {
  return prompt === "Repaso — de memoria, sin red"
    || prompt === "Repaso — dictado sorpresa"
    || prompt === "Repaso — ¿qué significa?"
    || prompt.startsWith("Repaso — ¿cuál es la forma en ")
    || prompt === "Repaso — el género es parte de la palabra"
    || prompt === "Repaso — plural de memoria"
    || prompt === "Repaso — completa la frase que ya conoces"
    || prompt === "Repaso — tradúcelo de memoria";
}

/** Géneros con al menos dos sustantivos vistos. Una ficha-lista no cuenta:
 *  no es un sustantivo que se pueda preguntar suelto. */
function articleSides(seen: readonly VocabItem[]): VocabItem[][] {
  const groups = new Map<DeArticle, VocabItem[]>();
  for (const v of seen) {
    if (!isDeArticle(v.article) || isListCard(v)) continue;
    const list = groups.get(v.article) ?? [];
    list.push(v);
    groups.set(v.article, list);
  }
  return [...groups.values()].filter((list) => list.length >= 2);
}

/** El par que ocupa dos huecos, o null si el contenido no da el contraste. */
export function articleContrastPair(seen: readonly VocabItem[]): [VocabItem, VocabItem] | null {
  const sides = articleSides(seen);
  if (sides.length < 2) return null;
  const [left, right] = shuffle(sides).slice(0, 2);
  if (!left?.length || !right?.length) return null;
  return [pick(left), pick(right)];
}

/**
 * Sienta el par DESPUÉS del sorteo: si se metiera antes, el barajado final
 * lo separaría. No vuelve a construir la tanda. No toca el cierre (tiene
 * que seguir siendo productivo) ni baja del 40 %. Si un sustantivo ya
 * ocupaba un hueco de una sola ficha, ese hueco se recicla: preguntarlo
 * otra vez en cinco minutos no es contraste, es repetición.
 */
function placeArticleContrast(exercises: Exercise[], seen: readonly VocabItem[], nextId: () => string): void {
  if (exercises.length < 3) return;
  const isProd = (e: Exercise) => modeOfExercise(e) === "produce";
  const last = exercises.length - 1;
  const byId = new Map(seen.map((v) => [v.id, v]));

  const singlesOf = (id: string): number[] => {
    const hits: number[] = [];
    for (let i = 0; i < exercises.length; i++) {
      const ids = exercises[i].itemIds;
      if (ids?.length === 1 && ids[0] === id) hits.push(i);
    }
    return hits;
  };

  // El cierre y un ejercicio de nivel no se pueden reciclar. Dejarlos y
  // abrir otro hueco del mismo sustantivo sería preguntarlo dos veces.
  const blocked = (id: string): boolean => {
    const hits = singlesOf(id);
    if (hits.filter((i) => i !== last).length > 1) return true;
    return hits.some((i) => i === last || !isBorrowablePrompt(exercises[i].prompt));
  };

  const sides = articleSides(seen)
    .map((list) => list.filter((v) => !blocked(v.id)))
    .filter((list) => list.length > 0);
  if (sides.length < 2) return;

  // 0 suelto, 1 ya era reconocimiento, 2 ya era producción (cuesta cupo).
  // Dentro del mismo coste el orden es el del sorteo, para que no salga
  // siempre el mismo sustantivo.
  const rank = (v: VocabItem): number => {
    const own = singlesOf(v.id).find((i) => i !== last);
    if (own === undefined) return 0;
    return isProd(exercises[own]) ? 2 : 1;
  };
  const cap = (list: VocabItem[]) =>
    shuffle(list).sort((a, b) => rank(a) - rank(b)).slice(0, 6);

  const ordered = shuffle(sides);
  for (let s = 0; s < ordered.length; s++) {
    for (let t = s + 1; t < ordered.length; t++) {
      const left = ordered[s];
      const right = ordered[t];
      if (!left || !right) continue;
      for (const a of cap(left)) {
        for (const b of cap(right)) {
          if (seatArticlePair(a, b)) return;
        }
      }
    }
  }

  /** Muta solo si el par cabe. Si desalojar producción dejaría el cupo
   *  corto, convierte otro reconocimiento en `type` —el mismo arreglo que
   *  ya usa la cuota— en vez de rendirse o bajar del 40 %. */
  function seatArticlePair(a: VocabItem, b: VocabItem): boolean {
    const ea = tArticle(a, "sonda");
    const eb = tArticle(b, "sonda");
    if (!ea || !eb) return false;

    const quota = Math.ceil(exercises.length * 0.4);
    const initial = exercises.filter(isProd).length;
    // No dejar la tanda peor de lo que ya cumplía. Si ya iba corta, no se
    // aprovecha este paso para rehacerle el cupo entero.
    const floor = Math.min(initial, quota);
    let prod = initial;
    const used = new Set<number>();
    const slots: number[] = [];

    const ownIndex = (id: string): number | undefined =>
      singlesOf(id).find((i) => i !== last);

    for (const noun of [a, b]) {
      const own = ownIndex(noun.id);
      if (own !== undefined) {
        if (used.has(own) || !isBorrowablePrompt(exercises[own].prompt)) return false;
        if (isProd(exercises[own])) prod -= 1;
        used.add(own);
        slots.push(own);
        continue;
      }
      let found: number | undefined;
      const hunt = (wantProd: boolean) => {
        for (let i = 0; i < last; i++) {
          if (used.has(i)) continue;
          const e = exercises[i];
          const cur = e.itemIds;
          if (cur?.length !== 1 || !isBorrowablePrompt(e.prompt)) continue;
          if (isProd(e) !== wantProd) continue;
          if (cur[0] === a.id || cur[0] === b.id) continue;
          found = i;
          return;
        }
      };
      hunt(false);
      if (found === undefined) hunt(true);
      if (found === undefined) return false;
      if (isProd(exercises[found])) prod -= 1;
      used.add(found);
      slots.push(found);
    }
    if (slots.length < 2) return false;

    const upgrades: { i: number; ex: Exercise }[] = [];
    for (let i = 0; i < last && prod < floor; i++) {
      if (used.has(i)) continue;
      const e = exercises[i];
      const cur = e.itemIds;
      if (isProd(e) || cur?.length !== 1 || !isBorrowablePrompt(e.prompt)) continue;
      const v = byId.get(cur[0]);
      const typed = v ? tType(v, "sonda") : null;
      if (!typed) continue;
      upgrades.push({ i, ex: typed });
      prod += 1;
    }
    if (prod < floor) return false;

    const i0 = slots[0];
    const i1 = slots[1];
    if (i0 === undefined || i1 === undefined) return false;
    ea.id = nextId();
    eb.id = nextId();
    exercises[i0] = ea;
    exercises[i1] = eb;
    for (const up of upgrades) {
      up.ex.id = nextId();
      exercises[up.i] = up.ex;
    }
    const first = Math.min(i0, i1);
    const second = Math.max(i0, i1);
    // Juntarlos no mueve el cierre: ningún hueco prestado es el último.
    if (second !== first + 1) {
      const moved = exercises[second];
      exercises.splice(second, 1);
      exercises.splice(first + 1, 0, moved);
    }
    return true;
  }
}

/* ── constructor de sesión ── */

export interface ReviewSession {
  exercises: Exercise[];
}

/**
 * Construye una sesión exprés (~5 min) sobre lo VISTO:
 * - ponderación: vencido en SRS ×3, resto ×1 (la ciencia sin la deuda);
 * - por ítem, plantilla al azar entre las aplicables;
 * - garantiza ≥40% de producción (modeOfExercise, no una lista de tipos) y
 *   cierre en un ejercicio productivo;
 * - añade variedad estructural (match, bucket de género) cuando el pool da;
 * - si el artículo da contraste (dos géneros × dos sustantivos), dos huecos
 *   seguidos lo preguntan. El resto de la tanda sigue sorteado.
 * Llamar SOLO en cliente (usa Math.random — jamás en render de servidor).
 */
export function buildReviewSession(
  st: ServerState | null,
  hasVoice: boolean,
  lang: string,
  vocab: Record<string, VocabItem>,
): ReviewSession {
  const seen = seenItems(st, vocab);
  if (seen.length < 4) return { exercises: [] };

  const now = Date.now();
  // fallos de reto recientes: misma prioridad que un vencido (×3), una vez
  const missed = retoMissSet();
  const pool = seen.map((v) => {
    const stat = st!.items[v.id];
    const due = stat?.nextReview ? new Date(stat.nextReview).getTime() <= now : false;
    return { item: v, w: due || missed.has(v.id) ? 3 : 1 };
  });

  const slots = Math.min(SESSION_SIZE, Math.max(4, seen.length));
  // se muestrean unos cuantos de más: los huecos que se lleve el cupo de nivel
  // no pueden dejar la tanda corta, y tampoco se quiere repetir palabra
  const singles = weightedSample(pool, Math.min(pool.length, slots + 4));
  const exercises: Exercise[] = [];
  let n = 0;
  const nextId = () => `rs${++n}-${Math.random().toString(36).slice(2, 7)}`;

  // variedad estructural primero (usa ítems extra del pool, no roba huecos únicos)
  const extra = shuffle(seen);
  const match = tMatch(extra, nextId());
  if (match && slots >= 6) exercises.push(match);
  const bucket = tGenderBucket(extra, nextId());
  if (bucket && slots >= 8) exercises.push(bucket);
  if (lang === "en") {
    // el cubo de NIVEL manda sobre el de A1: a un B1 ya no le aporta nada que
    // le pregunten con qué arranca la pregunta
    const beDo = tBeDoBucketEn(extra, nextId());
    const lvl = levelBucketsFor(lang, extra, nextId());
    const chosen = lvl.length ? pick(lvl) : beDo;
    if (chosen && slots >= 8) exercises.push(chosen);
  } else {
    // cubos de NIVEL: conectores (B1) y Passiversatz (B2). Con 0 o 1 cubo no
    // se gasta azar — si pick() corriera con un solo ítem, A1/A2/B1
    // cambiarían de sesión. Con dos (solo B2 con flags) se sortea.
    const lvl = levelBucketsFor(lang, extra, nextId());
    const chosen = lvl.length <= 1 ? (lvl[0] ?? null) : pick(lvl);
    if (chosen && slots >= 8) exercises.push(chosen);
  }

  const perItemTemplates = (v: VocabItem, others: VocabItem[]): Exercise[] => {
    const id = nextId();
    const opts: (Exercise | null)[] = [
      tType(v, id),
      hasVoice && itemForms(v).listenable ? tListen(v, nextId()) : null,
      tMcMeaning(v, others, nextId()),
      tMcForm(v, others, nextId()),
      tArticle(v, nextId()),
      tPlural(v, nextId()),
      // traducir en los dos sentidos sale de la propia ficha: producir hacia el
      // idioma y comprobar la comprensión al volver al español
      tTranslate(v, nextId(), true),
      tTranslate(v, nextId(), false),
      tCloze(v, nextId()),
      ...(lang === "en" ? [tContractionEn(v, nextId()), tDoDoesEn(v, nextId())] : []),
      // ── plantillas de NIVEL: null sin gram, así que A1/A2 no cambian ──
      ...levelTemplatesFor(lang, v, nextId, st?.items?.[v.id]?.streak ?? 0),
    ];
    return opts.filter((e): e is Exercise => e !== null);
  };

  // CUPO DE NIVEL: con ≥3 ítems con metadato gramatical, dos huecos se
  // reservan a plantillas de nivel. Sin esto el muestreo aleatorio devuelve
  // sesiones léxicas y el B1 repasaría como un A1 (PLAN.md §6.2).
  const gramPool = seen.filter((v) => v.gram);
  let levelQuota = gramPool.length >= 3 ? 2 : 0;

  /** firma de un ejercicio: dos plantillas distintas pueden acabar preguntando
   *  lo mismo, y reconvertir un mc en `type` clonaba a veces el `type` que ya
   *  estaba en la tanda. Preguntar dos veces lo mismo en cinco minutos no es
   *  repaso, es un fallo. */
  const sigOf = (e: Exercise): string => {
    const x = e as unknown as Record<string, unknown>;
    return [e.type, x.question ?? x.text ?? x.source ?? "", JSON.stringify(x.answers ?? x.pairs ?? x.items ?? "")].join("|");
  };
  const vistas = new Set<string>(exercises.map(sigOf));
  /** mete el ejercicio si no es un calco de otro que ya está en la tanda */
  const push = (e: Exercise | null): boolean => {
    if (!e || vistas.has(sigOf(e))) return false;
    vistas.add(sigOf(e));
    exercises.push(e);
    return true;
  };

  const srsWeight = (x: VocabItem) => {
    const stat = st!.items[x.id];
    const due = stat?.nextReview ? new Date(stat.nextReview).getTime() <= now : false;
    return due || missed.has(x.id) ? 3 : 1;
  };

  /** Un ejercicio de nivel: primero se sortea la PLANTILLA y solo después la
   *  ficha. El peso de cada plantilla es la RAÍZ de su oferta: una que sirve
   *  para 7 tarjetas no puede pesar lo mismo que una que sirve para 452, pero
   *  tampoco desaparecer del curso. Dentro de la plantilla elegida manda el
   *  SRS de siempre (vencidos y fallos de reto, ×3). */
  const levelExercise = (usedIds: Set<string>): Exercise | null => {
    const fresh = gramPool.filter((x) => !usedIds.has(x.id));
    const candidates = fresh.length ? fresh : gramPool;
    const byKind = new Map<string, VocabItem[]>();
    for (const x of candidates) {
      const streak = st?.items?.[x.id]?.streak ?? 0;
      for (const k of levelKindsOf(lang, x)) {
        if (k === "errorfix" && streak < 2) continue; // su salvaguarda propia
        const list = byKind.get(k) ?? [];
        list.push(x);
        byKind.set(k, list);
      }
    }
    const kinds = [...byKind.entries()].map(([k, list]) => ({ item: k, w: Math.sqrt(list.length) }));
    if (!kinds.length) return null;
    for (const kind of weightedSample(kinds, kinds.length)) {
      const list = byKind.get(kind)!;
      const build = levelTemplatesOf(lang).find((t) => t.kind === kind)!.build;
      for (const g of weightedSample(list.map((x) => ({ item: x, w: srsWeight(x) })), Math.min(list.length, 8))) {
        const ex = build(g, nextId(), st?.items?.[g.id]?.streak ?? 0);
        if (ex) return ex;
      }
    }
    return null;
  };

  // El cupo de nivel se sirve PRIMERO y sus fichas quedan marcadas: así los
  // huecos sueltos no vuelven a preguntar por la misma palabra. Preguntar dos
  // veces por «achten auf» en cinco minutos es gastar medio repaso.
  const preguntadas = new Set<string>();
  while (levelQuota > 0 && exercises.length < slots) {
    const lvl = levelExercise(preguntadas);
    if (!lvl) break;
    for (const id of lvl.itemIds ?? []) preguntadas.add(id);
    levelQuota--; // gastado aunque saliera repetido: el bucle tiene que acabar
    push(lvl);
  }

  for (const v of singles) {
    if (exercises.length >= slots) break;
    if (preguntadas.has(v.id)) continue;
    const others = shuffle(seen.filter((o) => o.id !== v.id));
    const candidates = perItemTemplates(v, others);
    // una ficha-tabla no genera NADA (ver isListCard): su hueco pasa al
    // siguiente ítem en vez de fabricar un ejercicio incontestable
    if (!candidates.length) continue;
    // si el sorteo cae en un ejercicio que ya está, se prueba otro del mismo
    // ítem antes de gastar el hueco
    if (!shuffle(candidates).some((e) => push(e))) continue;
    preguntadas.add(v.id);
  }

  // La cuota mira lo que el motor llama producir, no una lista de tipos.
  // Traducir hacia el idioma ya trae mode: "produce" y cuenta; traducir al
  // español es reconocer y no. La lista vieja (type, cloze, listen, transform)
  // no veía esa traducción y rellenaba el cupo con type de más.
  const isProd = (e: Exercise) => modeOfExercise(e) === "produce";
  let prod = exercises.filter(isProd).length;
  const quota = Math.ceil(exercises.length * 0.4);
  const toType = (id: string): Exercise | null => {
    const v = vocab[id];
    if (!v) return null;
    const t = tType(v, nextId());
    if (!t || vistas.has(sigOf(t))) return null;
    vistas.add(sigOf(t));
    return t;
  };
  for (let i = 0; i < exercises.length && prod < quota; i++) {
    const e = exercises[i];
    if (e.type === "mc" && e.itemIds?.length === 1) {
      const t = toType(e.itemIds[0]);
      if (t) {
        vistas.delete(sigOf(exercises[i]));
        exercises[i] = t;
        prod++;
      }
    }
  }
  // segunda pasada: si el cupo SIGUE sin salir es porque la sesión no trajo ni
  // un mc que reconvertir — pasa cuando se llena de traducciones al español,
  // que son reconocimiento. Sin esto la sesión cerraba con un 30% de
  // producción, saltándose su propia regla. Solo toca las sesiones que ya
  // estaban rotas: si el cupo se cumplió arriba, este bucle no se ejecuta.
  for (let i = 0; i < exercises.length && prod < quota; i++) {
    const e = exercises[i];
    if (e.type === "translate" && e.direction === "toEs" && e.itemIds?.length === 1) {
      const t = toType(e.itemIds[0]);
      if (t) {
        vistas.delete(sigOf(exercises[i]));
        exercises[i] = t;
        prod++;
      }
    }
  }

  // cierre SIEMPRE en un ejercicio productivo (la misma vara que el cupo)
  const shuffled = shuffle(exercises);
  // ~10 ejercicios son los cinco minutos de la invitación. El corte anterior
  // (SESSION_SIZE + 2) dejaba pasar 12: el relleno no pasa de 10, y el único
  // extra era un cierre fabricado cuando no había ninguno productivo. Si hay
  // que fabricarlo y la tanda ya está llena, ocupa el último hueco.
  if (shuffled.length > SESSION_SIZE) shuffled.splice(SESSION_SIZE);
  const lastProdIdx = shuffled.map(isProd).lastIndexOf(true);
  if (lastProdIdx >= 0 && lastProdIdx !== shuffled.length - 1) {
    const [p] = shuffled.splice(lastProdIdx, 1);
    shuffled.push(p);
  } else if (lastProdIdx < 0) {
    // el cierre en producción es innegociable: se busca hacia atrás la primera
    // ficha del muestreo que SÍ pueda pedirse de memoria
    for (let i = singles.length - 1; i >= 0; i--) {
      const t = tType(singles[i], nextId());
      if (t) {
        if (shuffled.length >= SESSION_SIZE) shuffled.pop();
        shuffled.push(t);
        break;
      }
    }
  }

  const finalSet = shuffled;
  // Después del sorteo: si fuera antes, el barajado separaría el par.
  placeArticleContrast(finalSet, seen, nextId);
  // la prioridad ×3 se gasta SOLO por lo que de verdad se preguntó: antes se
  // consumía sobre el muestreo inicial y hasta la mitad de los fallos de reto
  // perdían su turno sin haber aparecido nunca
  const asked = new Set(finalSet.flatMap((e) => e.itemIds ?? []));
  consumeRetoMisses([...asked].filter((id) => missed.has(id)));
  return { exercises: finalSet };
}
