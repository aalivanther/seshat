"use client";

// Perfiles de ANTES de `placement` en el servidor: la prueba de nivel quedó
// en localStorage (o el progreso en las lecciones) y el candado escondía
// módulos ya hechos. Al cargar el perfil se reconcilia: si el servidor ya
// tiene colocación, no se toca; si no, se recupera y se escribe en el perfil.

import { courses } from "@/data/courseIndex";
import { isCefr, type Cefr } from "./cefr";
import { getProfile, postPlacement } from "./api";
import { placementResultId } from "./ids";
import { parsePlacementReport, placedFromColocacionScore, placementKey } from "./placement";
import { inferPlacedFromProgress } from "./unlock";
import type { ServerState } from "./types";

export type RecoveredPlacement = {
  lang: string;
  placed: Cefr;
  source: "local" | "progress" | "lesson";
};

function localPlacementKeys(lang: string): string[] {
  const prof = getProfile();
  const keys = [
    placementKey(lang, prof),
    placementKey(lang, "default"),
    placementKey(lang, ""),
    `seshat-colocacion-${lang}`,
  ];
  return [...new Set(keys)];
}

/** Informe de colocación que aún vive en este dispositivo. */
export function readLocalPlacement(lang: string): { placed: Cefr; pct: number } | null {
  if (typeof window === "undefined") return null;
  for (const key of localPlacementKeys(lang)) {
    let raw: string | null = null;
    try {
      raw = window.localStorage.getItem(key);
    } catch {
      continue;
    }
    if (!raw) continue;
    try {
      const parsed = parsePlacementReport(JSON.parse(raw));
      if (parsed?.placed) return { placed: parsed.placed, pct: parsed.pct };
    } catch {
      continue;
    }
  }
  return null;
}

/** Qué hay que volver a escribir en el perfil: colocación local o, si no,
 *  el nivel más alto donde ya hay lecciones hechas (no A1: eso ya lo abre
 *  la cadena). */
export function pendingPlacementRecoveries(st: ServerState): RecoveredPlacement[] {
  const out: RecoveredPlacement[] = [];
  for (const lang of Object.keys(courses)) {
    const already = st.placement?.[lang]?.placed;
    if (already && isCefr(already)) continue;
    const local = readLocalPlacement(lang);
    if (local) {
      out.push({ lang, placed: local.placed, source: "local" });
      continue;
    }
    const inferred = inferPlacedFromProgress(st, lang);
    if (inferred && inferred !== "a1") {
      out.push({ lang, placed: inferred, source: "progress" });
      continue;
    }
    // Perfiles de antes de `placement` en el servidor: la prueba quedó como
    // lección `colocacion-xx` con un % global. Sin el informe no hay corte
    // por nivel; se infiere a la baja (66 % → B1).
    const lec = st.lessons?.[placementResultId(lang)];
    if (lec && (lec.attempts > 0 || lec.lastScore > 0 || lec.bestScore > 0)) {
      const score = lec.bestScore > 0 ? lec.bestScore : lec.lastScore;
      out.push({ lang, placed: placedFromColocacionScore(score), source: "lesson" });
    }
  }
  return out;
}

const NOTICE_KEY = "seshat-colocacion-recuperada";

/** Escribe en el servidor las colocaciones que faltan. Devuelve el estado
 *  más reciente y, si recuperó algo, un aviso para mostrar una vez. */
export async function reconcileProfilePlacement(st: ServerState): Promise<{
  state: ServerState;
  recovered: RecoveredPlacement[];
}> {
  const pending = pendingPlacementRecoveries(st);
  let current = st;
  const recovered: RecoveredPlacement[] = [];
  for (const rec of pending) {
    const local = rec.source === "local" ? readLocalPlacement(rec.lang) : null;
    const lec = rec.source === "lesson" ? st.lessons?.[placementResultId(rec.lang)] : undefined;
    const raw = lec ? (lec.bestScore > 0 ? lec.bestScore : lec.lastScore) : 0;
    const fromLesson = raw <= 1 ? raw * 100 : raw;
    const saved = await postPlacement(rec.lang, rec.placed, local?.pct ?? Math.round(fromLesson));
    if (saved) {
      current = saved;
      recovered.push(rec);
    }
  }
  if (recovered.length && typeof window !== "undefined") {
    try {
      sessionStorage.setItem(NOTICE_KEY, JSON.stringify(recovered));
    } catch {
      /* aviso opcional */
    }
  }
  return { state: current, recovered };
}

export function consumeRecoveredNotice(): RecoveredPlacement[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(NOTICE_KEY);
    if (!raw) return [];
    sessionStorage.removeItem(NOTICE_KEY);
    const parsed = JSON.parse(raw) as RecoveredPlacement[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
