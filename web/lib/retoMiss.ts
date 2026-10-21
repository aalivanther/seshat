"use client";

// Ledger de fallos de RETO — la mitad "positiva" de la asimetría SRS:
// fallar en el reto JAMÁS retrasa el intervalo (señal ruidosa bajo presión,
// Tse & Pu), pero deja huella: prioridad ×3 en el muestreo del siguiente
// repaso exprés (recuperación fallida + feedback prepara el reaprendizaje —
// Kornell 2009). Vive en localStorage por perfil; módulo propio para no crear
// ciclo reviewSession ↔ retoRun.

import { getProfile } from "./api";

const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // señal caducada a la semana

function key(): string {
  return `seshat-reto-miss-${getProfile() || "default"}`;
}

function read(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(key()) ?? "{}") as Record<string, number>;
  } catch {
    return {};
  }
}

/** registra los ítems fallados en una run (llamar al terminar la run) */
export function recordRetoMisses(itemIds: string[]): void {
  if (typeof window === "undefined" || itemIds.length === 0) return;
  const ledger = read();
  const now = Date.now();
  for (const id of itemIds) ledger[id] = now;
  window.localStorage.setItem(key(), JSON.stringify(ledger));
}

/** ids con prioridad viva (fallo de reto reciente, aún no repasado) */
export function retoMissSet(): Set<string> {
  const ledger = read();
  const now = Date.now();
  return new Set(Object.keys(ledger).filter((id) => now - ledger[id] <= MAX_AGE_MS));
}

/** consume la prioridad de los ids que el repaso acaba de servir:
    la señal es "sírvemelo pronto UNA vez", no un boost eterno */
export function consumeRetoMisses(itemIds: string[]): void {
  if (typeof window === "undefined" || itemIds.length === 0) return;
  const ledger = read();
  let dirty = false;
  for (const id of itemIds) {
    if (id in ledger) {
      delete ledger[id];
      dirty = true;
    }
  }
  if (dirty) window.localStorage.setItem(key(), JSON.stringify(ledger));
}
