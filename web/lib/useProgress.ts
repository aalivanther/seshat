"use client";

import { useEffect, useState } from "react";
import type { PhaseIndexEntry, PhaseMeta, ServerState } from "./types";
import { getDue, getState } from "./api";
import { baselineBadges } from "./badgeTracker";
import { course, courseOf } from "@/data/courseIndex";
import { resolveLevelId, phasesOf as levelPhases, highestAvailableUpTo } from "./levels";
import { placedLevel } from "./placement";
import { inferPlacedFromProgress, phaseHasProgress, phaseSkippedByPlacement } from "./unlock";
import { cefrRank, isCefr, type Cefr } from "./cefr";
import { reconcileProfilePlacement } from "./profileReconcile";

export interface Progress {
  /** null = backend apagado; "loading" = aún cargando */
  state: ServerState | null | "loading";
  dueCount: number;
  /** colocaciones recuperadas al cargar un perfil viejo (aviso de una vez) */
  recovered: { lang: string; placed: string }[];
}

/**
 * Progreso del perfil. `due: false` ahorra el fetch de la cola de repaso en
 * páginas que no muestran dueCount (default true para no romper consumidores).
 */
export function useProgress(opts?: { due?: boolean }): Progress {
  const due = opts?.due ?? true;
  const [state, setState] = useState<ServerState | null | "loading">("loading");
  const [dueCount, setDueCount] = useState(0);
  const [recovered, setRecovered] = useState<{ lang: string; placed: string }[]>([]);

  useEffect(() => {
    getState().then(async (st) => {
      if (st) {
        const rec = await reconcileProfilePlacement(st);
        st = rec.state;
        if (rec.recovered.length) setRecovered(rec.recovered);
      }
      setState(st);
      baselineBadges(st); // perfil recién visto en este navegador: base silenciosa
    });
    if (due) getDue().then((d) => setDueCount(d?.length ?? 0));
  }, [due]);

  return { state, dueCount, recovered };
}

export function modulePct(phase: PhaseMeta, state: ServerState | null): number {
  if (!state || phase.lessons.length === 0) return 0;
  if (phaseSkippedByPlacement(phase, state)) return 100;
  const done = phase.lessons.filter((l) => state.lessons[l.id]?.completed).length;
  return Math.round((done / phase.lessons.length) * 100);
}

export function moduleAvgScore(phase: PhaseMeta, state: ServerState | null): number | null {
  if (!state) return null;
  const scores = phase.lessons
    .map((l) => state.lessons[l.id]?.bestScore)
    .filter((s): s is number => typeof s === "number");
  if (!scores.length) return null;
  return Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 100);
}

/** fases de un nivel (id compuesto "de-a1"; acepta el legado "a1" = alemán) */
export function phasesOf(level: string): PhaseIndexEntry[] {
  const lv = resolveLevelId(level);
  return lv ? levelPhases(lv) : [];
}

/** % de un idioma completo (todas sus fases) — para las cards de la landing */
export function langPct(state: ServerState | null, lang: string): number {
  if (!state) return 0;
  const phases = courseOf(lang).phases;
  const all = phases.flatMap((p) => p.lessons);
  if (!all.length) return 0;
  let done = 0;
  for (const p of phases) {
    if (phaseSkippedByPlacement(p, state)) {
      done += p.lessons.length;
      continue;
    }
    done += p.lessons.filter((l) => state.lessons[l.id]?.completed).length;
  }
  return Math.round((done / all.length) * 100);
}

export function levelPct(state: ServerState | null, level?: string): number {
  if (!state) return 0;
  const phases = level ? phasesOf(level) : course.phases;
  const all = phases.flatMap((p) => p.lessons);
  if (!all.length) return 0;
  let done = 0;
  for (const p of phases) {
    if (phaseSkippedByPlacement(p, state)) {
      done += p.lessons.length;
      continue;
    }
    done += p.lessons.filter((l) => state.lessons[l.id]?.completed).length;
  }
  return Math.round((done / all.length) * 100);
}

/** primera lección no completada del curso de UN idioma (en orden), salvo
 *  que la prueba de nivel haya colocado al alumno más arriba y todavía no
 *  haya tocado nada: entonces empieza por su nivel colocado, no por la
 *  lección 1 del A1 (PLAN 1.9.8 §1.1). En cuanto completa algo, esta regla
 *  deja de aplicar: se le manda a lo que ya tenía a medias. */
export function nextLessonId(state: ServerState | null, lang = "de"): string | null {
  const phases = courseOf(lang).phases;
  // La colocación manda: quien se situó en B1 (aunque picara A1 porque
  // antes no se desbloqueaba nada más) entra en B1, no se le devuelve al
  // principio. Los módulos de debajo quedan saltados.
  const placed = placedLevel(state, lang);
  if (placed) {
    const destino = highestAvailableUpTo(lang, placed);
    const minR = cefrRank(destino?.cefr ?? placed);
    for (const p of phases) {
      const lv = (p.level ?? "a1") as Cefr;
      const r = isCefr(lv) ? cefrRank(lv) : 0;
      if (r < minR) continue;
      for (const l of p.lessons) {
        if (!state?.lessons?.[l.id]?.completed) return l.id;
      }
    }
    return null;
  }

  const touched = new Set<Cefr>();
  for (const p of phases) {
    if (!phaseHasProgress(p, state)) continue;
    const lv = p.level ?? "a1";
    if (isCefr(lv)) touched.add(lv);
  }

  if (touched.size === 0) {
    const inferred = inferPlacedFromProgress(state, lang);
    const destino = inferred ? highestAvailableUpTo(lang, inferred) : undefined;
    if (destino) {
      for (const p of phases) {
        if ((p.level ?? "a1") !== destino.cefr) continue;
        for (const l of p.lessons) {
          if (!state?.lessons?.[l.id]?.completed) return l.id;
        }
      }
    }
  } else {
    const minR = Math.min(...[...touched].map(cefrRank));
    const maxR = Math.max(...[...touched].map(cefrRank));
    for (const p of phases) {
      const lv = (p.level ?? "a1") as Cefr;
      const r = isCefr(lv) ? cefrRank(lv) : 0;
      if (r < minR) continue;
      if (r < maxR && !touched.has(lv)) continue;
      for (const l of p.lessons) {
        if (!state?.lessons?.[l.id]?.completed) return l.id;
      }
    }
  }

  for (const p of phases) {
    for (const l of p.lessons) {
      if (!state?.lessons?.[l.id]?.completed) return l.id;
    }
  }
  return null;
}
