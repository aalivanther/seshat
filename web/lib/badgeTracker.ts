"use client";

// Otorgamiento de medallas: se COMPUTAN del estado real del backend (imposible
// falsearlas desde el cliente) y aquí se trackea cuáles ya se anunciaron, por
// perfil, para celebrar cada una exactamente una vez — en el momento de ganarla.

import type { ServerState } from "./types";
import { computeBadges, type Badge } from "./achievements";
import { getProfile } from "./api";

function storageKey(): string {
  return `badges-seen-${getProfile() || "default"}`;
}

/**
 * Línea base silenciosa: al CARGAR la app (no al completar algo) registra las
 * medallas ya ganadas de un perfil que este navegador no conocía (import,
 * dispositivo nuevo) sin celebrarlas. Así checkNewBadges puede celebrar la
 * PRIMERA medalla real: cuando llega el momento, la línea base ya existe.
 */
export function baselineBadges(state: ServerState | null): void {
  if (typeof window === "undefined" || !state) return;
  if (window.localStorage.getItem(storageKey()) !== null) return;
  const earnedIds = computeBadges(state).filter((b) => b.earned).map((b) => b.id);
  window.localStorage.setItem(storageKey(), JSON.stringify(earnedIds));
}

/**
 * Compara las medallas ganadas según el estado NUEVO contra las ya anunciadas.
 * Devuelve las recién desbloqueadas y las marca como vistas. Sin registro
 * previo (no pasó por baselineBadges) se celebra lo ganado ahora mismo —
 * antes se silenciaba y la primera medalla moría sin anuncio.
 */
export function checkNewBadges(state: ServerState | null): Badge[] {
  if (typeof window === "undefined" || !state) return [];
  const earned = computeBadges(state).filter((b) => b.earned);
  const earnedIds = earned.map((b) => b.id);
  const raw = window.localStorage.getItem(storageKey());
  window.localStorage.setItem(storageKey(), JSON.stringify(earnedIds));
  if (raw === null) return earned;
  let seen: string[] = [];
  try {
    seen = JSON.parse(raw) as string[];
  } catch {
    return [];
  }
  return earned.filter((b) => !seen.includes(b.id));
}
