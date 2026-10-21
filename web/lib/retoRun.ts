"use client";

// MOTOR DE RETOS — run roguelike de 10 ejercicios por módulo (spec en
// PLAN.md § RETOS). Principios duros:
//   · 100% recuperación (Karpicke): cero pantallas de estudio en la run;
//   · escalada por tramos reconocimiento → recuerdo → producción, el 10
//     SIEMPRE producción escrita (nunca cerrar en MC — regla de la casa);
//   · adaptativo DENTRO del tramo apuntando a ~80-85% de éxito esperado
//     (regla del 85%, Wilson 2019): con 3 vidas sirve lo débil, con 1 lo
//     consolidado — sin rubber-banding a trivial;
//   · speak/shadow EXCLUIDOS (autoevaluados no pueden costar vidas);
//   · sin pistas ni segundo intento (la recuperación a una bala ES el test);
//   · SRS asimétrico: aciertos se reportan (una recuperación es una
//     recuperación), fallos NO tocan el intervalo — solo marcan prioridad ×3
//     en el próximo repaso (lib/retoMiss.ts).
// La run se genera con SEMILLA (reproducible para depurar; useEffect, jamás
// en render — regla #418).

import type { Exercise, Phase, ServerState, VocabItem } from "./types";
import { EXERCISE_KINDS } from "./exerciseKinds";
import { resolveItems } from "./resolveItems";
import { courseOf, langOfPhase } from "@/data/course";
import { resolveLevelId, phasesOf as levelPhases } from "./levels";
import {
  tType, tListen, tMcMeaning, tMcForm, tArticle, tPlural, tCloze, tMatch, tGenderBucket, itemForms,
  tContractionEn, tDoDoesEn, tBeDoBucketEn, tTranslate, levelTemplatesFor, levelBucketsFor,
  isListCard,
} from "./reviewSession";
import { retoId } from "./ids";

/* ── RNG con semilla (mulberry32): dos runs nunca iguales, una run siempre
      reproducible con su semilla ── */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(arr: readonly T[], rng: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ── candidatos con p(éxito) estimada ── */

export interface RetoCandidate {
  ex: Exercise;
  /** p(éxito) estimada del par ítem×formato (heurística de streak del SRS) */
  p: number;
  /** true si es una "visita del pasado" (ítem de un módulo anterior) */
  pastVisit?: boolean;
}

export interface RetoDeck {
  phaseId: string;
  lang: string;
  seed: number;
  /** candidatos por tramo (calentar 1-3 · núcleo 4-7 · cumbre 8-10) */
  tramos: [RetoCandidate[], RetoCandidate[], RetoCandidate[]];
  /** subconjunto de cumbre válido para el ejercicio 10: type/transform */
  final: RetoCandidate[];
}

export const RETO_SIZE = 10;
export const RETO_LIVES = 3;

/** dificultad relativa del formato: resta p(éxito) cuanto más exige producir.
 *  `translate` es el único tipo que cambia de dificultad según su dirección
 *  —traducir HACIA el idioma es producción pura y traducir al español es
 *  comprensión—, así que se mira el ejercicio entero y no solo su tipo. */
function formatPenalty(ex: Exercise): number {
  if (ex.type === "translate") return ex.direction === "toTarget" ? -0.16 : +0.04;
  switch (ex.type) {
    case "mc":
    case "match":
    case "fastmatch":
      return +0.08; // reconocimiento: más fácil que la media del ítem
    case "bucket":
    case "hearreal":
      return 0;
    case "cloze":
    case "listen":
    case "order":
    case "gapbank":
      return -0.06;
    case "errorfix":
      return -0.12; // exige detectar Y producir
    case "paraphrase":
      return -0.2; // el más duro: producir sin las palabras de siempre
    case "build":
      return -0.1;
    case "type":
    case "transform":
      return -0.16;
    default:
      return 0;
  }
}

/** p(éxito) del ítem según su historial SRS (sin stat = recién aprendido) */
function itemP(st: ServerState | null, itemId: string | undefined): number {
  if (!itemId || !st?.items?.[itemId]) return 0.62;
  const s = st.items[itemId];
  const p = 0.4 + 0.11 * Math.min(s.streak, 5) + 0.04 * Math.min(s.correct, 4) - 0.06 * Math.min(s.wrong, 4);
  return Math.min(0.97, Math.max(0.25, p));
}

function candP(st: ServerState | null, ex: Exercise): number {
  const base = ex.itemIds?.length
    ? ex.itemIds.reduce((s, id) => s + itemP(st, id), 0) / ex.itemIds.length
    : 0.68; // ejercicio de gramática sin ítems: dificultad media
  return Math.min(0.97, Math.max(0.2, base + formatPenalty(ex)));
}

/** el reto va a pelo: sin pistas (los tips post-respuesta SÍ quedan) */
function strip(ex: Exercise): Exercise {
  return { ...ex, hints: [] };
}

/** ítems (vocab) trabajados por el módulo */
function moduleItems(phase: Phase, lang: string): VocabItem[] {
  const vocab = courseOf(lang).vocab;
  const ids = new Set<string>();
  for (const l of phase.lessons) {
    for (const sec of l.sections) {
      for (const id of sec.itemIds ?? []) ids.add(id);
      for (const e of sec.exercises ?? []) for (const id of e.itemIds ?? []) ids.add(id);
    }
  }
  const { items, missing } = resolveItems([...ids], vocab);
  if (missing.length > 0) {
    throw new Error(`reto: ids huérfanos en ${phase.id}: ${missing.join(", ")}`);
  }
  return items;
}

/** ítems vencidos de módulos ANTERIORES del mismo idioma (visitas del pasado) */
function pastDueItems(phase: Phase, lang: string, st: ServerState | null): VocabItem[] {
  if (!st) return [];
  const course = courseOf(lang);
  const idx = course.phases.findIndex((p) => p.id === phase.id);
  if (idx <= 0) return [];
  const now = Date.now();
  const out: VocabItem[] = [];
  for (const p of course.phases.slice(0, idx)) {
    for (const l of p.lessons) {
      for (const sec of l.sections) {
        for (const id of sec.itemIds ?? []) {
          const stat = st.items[id];
          if (stat?.nextReview && new Date(stat.nextReview).getTime() <= now) {
            const v = course.vocab[id];
            if (v) out.push(v);
          }
        }
      }
    }
  }
  return out;
}

/**
 * Construye el mazo de una run: candidatos por tramo con p(éxito), mezcla de
 * ejercicios reales del módulo + plantillas generativas restringidas a sus
 * ítems (+ hasta 2 visitas del pasado en el núcleo). Llamar en useEffect.
 */
export function buildRetoDeck(phase: Phase, st: ServerState | null, hasVoice: boolean, seed: number): RetoDeck {
  const lang = retoLangOf(phase.id);
  const rng = mulberry32(seed);
  const items = seededShuffle(moduleItems(phase, lang), rng);
  let n = 0;
  const nextId = () => `rg${seed % 100000}-${++n}`;

  // 1) ejercicios REALES del módulo, por tramo (speak/shadow fuera)
  const warm: Exercise[] = [];
  const core: Exercise[] = [];
  const peak: Exercise[] = [];
  for (const l of phase.lessons) {
    for (const sec of l.sections) {
      for (const e of sec.exercises ?? []) {
        const kind = EXERCISE_KINDS[e.type];
        // sin voz instalada, un ejercicio inaudible no puede costar vidas
        if (!hasVoice && kind.audio) continue;
        // `translate` no entraba en ningún tramo y se quedaba fuera de los
        // retos entero (PLAN-MOTOR-EN §4, P5). Va por dirección: hacia el
        // idioma es producción, al español es comprensión — un dato de la
        // INSTANCIA, no del tipo, así que no lo decide el descriptor.
        if (e.type === "translate") {
          (e.direction === "toTarget" ? peak : warm).push(e);
          continue;
        }
        if (kind.warm) warm.push(e);
        if (kind.core) core.push(e);
        if (kind.peak) peak.push(e);
      }
    }
  }

  // 2) plantillas generativas sobre los ítems del módulo — el multiplicador
  //    de rejugabilidad (dos runs nunca iguales)
  for (const v of items.slice(0, 14)) {
    const others = seededShuffle(items.filter((o) => o.id !== v.id), rng);
    const mcM = tMcMeaning(v, others, nextId());
    if (mcM) warm.push(mcM);
    const mcF = tMcForm(v, others, nextId());
    if (mcF) warm.push(mcF);
    const art = tArticle(v, nextId());
    if (art) warm.push(art);
    const cz = tCloze(v, nextId());
    if (cz) core.push(cz);
    if (hasVoice && itemForms(v).listenable) {
      const li = tListen(v, nextId());
      if (li) core.push(li);
    }
    const pl = tPlural(v, nextId());
    if (pl) core.push(pl);
    if (lang === "en") {
      const dd = tDoDoesEn(v, nextId());
      if (dd) core.push(dd);
      const ct = tContractionEn(v, nextId());
      if (ct) peak.push(ct);
    }
    // traducir sale gratis de la propia ficha y es el ejercicio más exigente
    // que puede dar el vocabulario: hacia el idioma a la cumbre, al español al
    // calentamiento
    const trT = tTranslate(v, nextId(), true);
    if (trT) peak.push(trT);
    const trEs = tTranslate(v, nextId(), false);
    if (trEs) warm.push(trEs);
    // plantillas de NIVEL: los retos no las usaban (PLAN-MOTOR-EN §4, P5). Se
    // sirven SOLO sobre fichas con `gram`, que es lo que garantiza que un
    // módulo A1 —cero `gram` en todo el curso— siga generando lo mismo.
    if (v.gram) {
      for (const lvl of levelTemplatesFor(lang, v, nextId, st?.items?.[v.id]?.streak ?? 0)) {
        if (!lvl) continue;
        const k = EXERCISE_KINDS[lvl.type];
        if (k.warm) warm.push(lvl);
        if (k.core) core.push(lvl);
        if (k.peak) peak.push(lvl);
      }
    }
    // tType devuelve null en las fichas-tabla («sing → sang · drink → drank»):
    // ahí no hay nada que teclear, así que esa ficha no entra en la cumbre
    const ty = tType(v, nextId());
    if (ty) peak.push(ty);
  }
  const match = tMatch(items, nextId());
  if (match) warm.push(match);
  const gb = tGenderBucket(items, nextId());
  if (gb) warm.push(gb);
  if (lang === "en") {
    const bd = tBeDoBucketEn(items, nextId());
    if (bd) warm.push(bd);
  }
  // cubos de NIVEL de sesión (conectores en alemán; say/tell y marcadores de
  // tiempo en inglés). Se construyen con una id de paso y se les sella la suya
  // al entrar, porque pueden salir varios de una tacada y en el mazo no puede
  // haber dos candidatos con la misma id (el dedupe se comería uno).
  for (const b of levelBucketsFor(lang, items, "lvl")) warm.push({ ...b, id: nextId() });
  // fastmatch generado: SOLO pares consolidados (streak ≥2 — DeKeyser: el
  // tempo llega DESPUÉS de la precisión)
  const solid = items.filter((v) => (st?.items?.[v.id]?.streak ?? 0) >= 2 && !isListCard(v));
  if (solid.length >= 4) {
    const pick = seededShuffle(solid, rng).slice(0, Math.min(6, solid.length));
    warm.push({
      id: nextId(),
      type: "fastmatch",
      prompt: "Empareja — con chispa.",
      pairs: pick.map((v) => ({ target: itemForms(v).display, source: v.source })),
      itemIds: pick.map((v) => v.id),
    } as Exercise);
  }

  // 3) visitas del pasado: hasta 2 ítems vencidos de módulos anteriores,
  //    en el núcleo (repaso espaciado camuflado)
  const past = seededShuffle(pastDueItems(phase, lang, st), rng).slice(0, 2);
  const pastCands: RetoCandidate[] = past
    .map((v) => tCloze(v, nextId()) ?? tType(v, nextId()))
    .filter((ex): ex is Exercise => ex !== null)
    .map((ex) => ({ ex: strip(ex), p: candP(st, ex), pastVisit: true }));

  const toCands = (pool: Exercise[]): RetoCandidate[] => {
    // dedupe por id (un mismo ejercicio real puede caer en dos tramos: bucket)
    const seen = new Set<string>();
    return pool
      .filter((e) => (seen.has(e.id) ? false : (seen.add(e.id), true)))
      .map((e) => ({ ex: strip(e), p: candP(st, e) }));
  };

  const deck: RetoDeck = {
    phaseId: phase.id,
    lang,
    seed,
    tramos: [toCands(warm), [...toCands(core), ...pastCands], toCands(peak)],
    final: toCands(peak.filter((e) => e.type === "type" || e.type === "transform")),
  };
  return deck;
}

/** meta de p(éxito) según vidas: con vida llena se sirve lo débil (esfuerzo
    deseable), con la última vida lo consolidado — nunca fuera del tramo */
function targetP(lives: number): number {
  return lives >= 3 ? 0.78 : lives === 2 ? 0.85 : 0.9;
}

export function tramoOf(slot: number): 0 | 1 | 2 {
  return slot < 3 ? 0 : slot < 7 ? 1 : 2;
}

/**
 * Elige el ejercicio del hueco `slot` (0-based) dado el estado de la run.
 * Muestreo sin reemplazo (usedIds) apuntando a targetP(vidas) con jitter.
 * El hueco 10 tira SOLO de type/transform (jamás cerrar en reconocimiento).
 */
export function pickNext(
  deck: RetoDeck,
  slot: number,
  lives: number,
  usedIds: Set<string>,
  rng: () => number,
): Exercise | null {
  const isFinal = slot === RETO_SIZE - 1;
  const tramo = tramoOf(slot);
  let pool = (isFinal ? deck.final : deck.tramos[tramo]).filter((c) => !usedIds.has(c.ex.id));
  if (pool.length === 0) {
    // pool del tramo agotado (módulo chico): presta del tramo vecino más digno
    pool = [...deck.tramos[2], ...deck.tramos[1], ...deck.tramos[0]].filter((c) => !usedIds.has(c.ex.id));
    if (isFinal) {
      const prod = pool.filter((c) => c.ex.type === "type" || c.ex.type === "transform");
      if (prod.length) pool = prod;
    }
  }
  if (pool.length === 0) return null;
  const t = targetP(lives);
  // ordena por cercanía a la meta con jitter (dos runs, dos elecciones)
  const scored = pool
    .map((c) => ({ c, score: Math.abs(c.p - t) + rng() * 0.12 }))
    .sort((a, b) => a.score - b.score);
  // las visitas del pasado se cuelan con prioridad si hay hueco en el núcleo
  const past = scored.find((s) => s.c.pastVisit);
  const chosen = tramo === 1 && past && rng() < 0.6 ? past : scored[0];
  return chosen.c.ex;
}

/** RETO DE NIVEL ("la vuelta al nivel"): fase sintética que agrupa TODOS los
    módulos — misma run, pool gigante, la medalla gorda. Se abre al completar
    el nivel entero. El id "nivel-<levelId>" vive como LessonStat normal. */
export function levelPseudoPhase(levelId: string): Phase | null {
  const lv = resolveLevelId(levelId);
  if (!lv) return null;
  const phases = levelPhases(lv);
  if (!phases.length) return null;
  return {
    id: `nivel-${lv.id}`,
    level: lv.cefr,
    n: 0,
    title: lv.lang === "en" ? "La vuelta a Londres" : `La vuelta al ${lv.name}`,
    goal: `TODO el ${lv.name} en una run: 10 ejercicios de cualquier módulo.`,
    color: "#7c3aed",
    lessons: phases.flatMap((p) => p.lessons),
  };
}

/** idioma de una fase, entendiendo también las sintéticas de nivel */
export function retoLangOf(phaseId: string): string {
  if (phaseId.startsWith("nivel-")) {
    const lv = resolveLevelId(phaseId.slice("nivel-".length));
    if (lv) return lv.lang;
  }
  return langOfPhase(phaseId);
}

/* ── medallas (computadas del bestScore: infalseables) ── */

export type RetoMedal = "oro" | "plata" | "bronce" | null;

/** Bronce = 8 de 10 · Plata = 9 de 10 · Oro = las diez. Solo la nota: las
 *  vidas ya cuentan porque cada fallo cuesta una. */
export function retoMedal(st: ServerState | null, phaseId: string): RetoMedal {
  const best = st?.lessons?.[retoId(phaseId)]?.bestScore;
  if (typeof best !== "number") return null;
  const pct = Math.round(best * 100);
  if (pct >= 100) return "oro";
  if (pct >= 90) return "plata";
  if (pct >= 80) return "bronce";
  return null;
}

/** el nombre de la medalla; el metal lo dibuja <Medal> (components/Art) —
 *  los emojis del sistema los pinta cada plataforma a su manera y rompen la
 *  paleta de la casa */
export const MEDAL_LABEL: Record<Exclude<RetoMedal, null>, string> = {
  oro: "Oro — run perfecta",
  plata: "Plata — 9 de 10",
  bronce: "Bronce — run completada",
};
