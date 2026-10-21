"use client";

// Desbloqueo por progreso: la manera lógica de avanzar. Cada módulo se abre al
// completar el anterior (cadena POR idioma: …A1 → examen A1 → A2…).
// El taller de pruebas (todo abierto) ya NO es el perfil «default» — que es
// justo donde estudia el comprador que no crea perfil — sino un flag de dev:
// localStorage.setItem("seshat-dev", "1") en la consola lo activa.

import { courseOf, langOfPhase } from "@/data/course";
import { levelOfPhase, highestAvailableUpTo } from "./levels";
import { placedLevel } from "./placement";
import { cefrAtOrBelow, cefrRank, isCefr, type Cefr } from "./cefr";
import { testId } from "./ids";
import type { Phase, ServerState } from "./types";

export function isSandboxProfile(): boolean {
  // En el servidor (export estático) NO hay taller: devolver true pintaba el
  // HTML pregenerado con TODO abierto y luego la hidratación lo cerraba de
  // golpe — un parpadeo que además enseñaba de reojo lo que aún no toca.
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem("seshat-dev") === "1";
}

export function phaseCompleted(phase: Phase, st: ServerState | null): boolean {
  if (phaseSkippedByPlacement(phase, st)) return true;
  return phase.lessons.length > 0 && phase.lessons.every((l) => st?.lessons?.[l.id]?.completed);
}

/** La prueba te colocó POR ENCIMA de este módulo: no hay que rehacerlo.
 *  Cuenta como hecho en el cuaderno (candado, barra, «siguiente lección»),
 *  no escribe lecciones ni tarjetas SRS — eso sí sería fingir el certificado. */
export function phaseSkippedByPlacement(phase: Phase, st: ServerState | null): boolean {
  if (!st) return false;
  const lang = langOfPhase(phase.id);
  const own = levelOfPhase(phase.id);
  if (!own) return false;
  const placed = placedLevel(st, lang);
  if (!placed) return false;
  return cefrRank(own.cefr) < cefrRank(placed);
}

/** ¿Este módulo ya tiene trabajo guardado? Un perfil que hizo lecciones (o la
 *  prueba) no puede quedar candado solo porque la colocación no viajó. */
export function phaseHasProgress(phase: Phase, st: ServerState | null): boolean {
  if (!st) return false;
  if (st.lessons?.[testId(phase.id)]?.completed) return true;
  return phase.lessons.some((l) => st.lessons?.[l.id]?.completed);
}

/** Nivel más alto de un idioma donde hay lecciones o prueba hechas. */
export function inferPlacedFromProgress(st: ServerState | null, lang: string): Cefr | null {
  if (!st) return null;
  let best: Cefr | null = null;
  for (const p of courseOf(lang).phases) {
    if (!phaseHasProgress(p, st)) continue;
    const lv = p.level ?? "a1";
    if (!isCefr(lv)) continue;
    if (!best || cefrRank(lv) > cefrRank(best)) best = lv;
  }
  return best;
}

/** módulo anterior en la cadena de SU idioma (null si es el primero).
    Cada idioma tiene su propia cadena: empezar inglés no exige alemán. */
export function prevPhaseOf(phase: Phase): Phase | null {
  const phases = courseOf(langOfPhase(phase.id)).phases;
  const idx = phases.findIndex((p) => p.id === phase.id);
  return idx > 0 ? phases[idx - 1] : null;
}

/**
 * ¿La prueba de nivel («¿Por dónde empiezo?») ya colocó a este perfil en el
 * nivel de esta fase o por encima? La prueba mide hasta C1 y su propia
 * pantalla invita con «Ir al B1 y empezar» — pero sin esto esa invitación era
 * mentira: `phaseUnlocked` solo miraba la cadena secuencial de lecciones
 * completadas, así que quien se coloca en B1 sin haber hecho A1/A2 encontraba
 * TODO bloqueado nada más llegar. Los módulos de debajo quedan saltados
 * en el cuaderno (barra al 100 %, candado abierto); el SRS y los
 * certificados no se fingen.
 *
 * La colocación se lee por `placedLevel` (PLAN 1.9.8 §3.2): primero
 * `ServerState`, que viaja con el perfil, y solo si no hay dato ahí cae al
 * informe en `localStorage` del dispositivo donde se hizo la prueba.
 */
function placementUnlocks(phase: Phase, st: ServerState | null): boolean {
  const lang = langOfPhase(phase.id);
  const own = levelOfPhase(phase.id);
  if (!own) return false;
  const placed = placedLevel(st, lang);
  if (!placed) return false;
  const destino = highestAvailableUpTo(lang, placed);
  if (!destino) return false;
  return cefrAtOrBelow(own.cefr, destino.cefr);
}

/**
 * ¿Este módulo está desbloqueado para el perfil activo?
 * - sandbox de dev (localStorage seshat-dev=1): siempre.
 * - sin estado (backend caído): permisivo — no se puede juzgar y tampoco guardar.
 * - el módulo anterior completado desbloquea, como siempre.
 * - si no, la prueba de nivel puede desbloquearlo (ver placementUnlocks).
 * - si el módulo YA tiene lecciones o prueba hechas, se abre: un update no
 *   puede esconder el progreso de quien se colocó en un nivel y empezó.
 */
export function phaseUnlocked(phase: Phase, st: ServerState | null): boolean {
  if (isSandboxProfile()) return true;
  if (!st) return true;
  const prev = prevPhaseOf(phase);
  if (prev === null || phaseCompleted(prev, st)) return true;
  if (progressUnlocks(phase, st) || placementUnlocks(phase, st)) return true;
  return false;
}

/** El progreso YA hecho en un nivel equivale a haberse colocado ahí: abre
 *  ese CEFR y los de debajo, para que un perfil viejo sin `placement` no
 *  esconda módulos que el alumno ya tocó. */
function progressUnlocks(phase: Phase, st: ServerState | null): boolean {
  if (phaseHasProgress(phase, st)) return true;
  const lang = langOfPhase(phase.id);
  const own = levelOfPhase(phase.id);
  if (!own) return false;
  const inferred = inferPlacedFromProgress(st, lang);
  // A1 se abre en cadena: un módulo a medias no debe abrir los otros 11.
  // A2/B1/B2 sí: quien ya estudió ahí se había colocado (o saltado) ese nivel.
  if (!inferred || inferred === "a1") return false;
  const destino = highestAvailableUpTo(lang, inferred);
  if (!destino) return false;
  return cefrAtOrBelow(own.cefr, destino.cefr);
}
