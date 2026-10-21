// Borrador de simulacro: lo que llega del perfil o de localStorage no se
// aplica a ciegas. Un idx fuera de rango, un startedAt del futuro o un
// answers que no es un objeto dejarían el examen en un estado del que no
// se sale. Los techos coinciden con examDraftMax* de backend/main.go
// (handleExamDraftPost). Están escritos otra vez aquí porque el cliente
// acota antes de enviar; no se generan desde Go.

import { examSecondsLeft } from "./examClock";

export interface ExamDraftSnapshot {
  idx: number;
  answers: Record<string, unknown>;
  startedAt: number;
}

export const EXAM_DRAFT_MAX_AGE_SEC = 48 * 3600;
export const EXAM_DRAFT_CLOCK_SKEW_SEC = 120;
export const EXAM_DRAFT_MAX_ANSWER_KEYS = 400;
export const EXAM_DRAFT_MAX_KEY = 64;
export const EXAM_DRAFT_MAX_VAL_BYTES = 8 * 1024;
export const EXAM_DRAFT_MAX_BODY = 256 * 1024;
export const EXAM_DRAFT_MAX_IDX = 500;

const SET_ID_RE = /^[a-z][a-z0-9-]{0,62}$/;

export function isExamSetId(id: unknown): id is string {
  return typeof id === "string" && SET_ID_RE.test(id);
}

function asRecord(v: unknown): Record<string, unknown> | null {
  if (!v || typeof v !== "object" || Array.isArray(v)) return null;
  return v as Record<string, unknown>;
}

function valueFits(val: unknown): boolean {
  if (val === undefined) return false;
  if (typeof val === "number" && !Number.isFinite(val)) return false;
  if (typeof val === "function" || typeof val === "symbol" || typeof val === "bigint") return false;
  try {
    const s = JSON.stringify(val);
    return typeof s === "string" && s.length <= EXAM_DRAFT_MAX_VAL_BYTES;
  } catch {
    return false;
  }
}

function cloneValue(val: unknown): unknown {
  if (val === null || typeof val !== "object") return val;
  try {
    return JSON.parse(JSON.stringify(val)) as unknown;
  } catch {
    return null;
  }
}

/** Copia acotada de las respuestas: claves cortas, valores JSON y de tamaño
 *  que el motor acepta. Lo que no cabe se salta, no tumba el resto. */
export function coerceAnswers(raw: unknown): Record<string, unknown> {
  const o = asRecord(raw);
  if (!o) return {};
  const out: Record<string, unknown> = {};
  let n = 0;
  for (const [k, val] of Object.entries(o)) {
    if (!k || k.length > EXAM_DRAFT_MAX_KEY) continue;
    if (val === undefined) continue;
    if (!valueFits(val)) continue;
    out[k] = cloneValue(val);
    n += 1;
    if (n >= EXAM_DRAFT_MAX_ANSWER_KEYS) break;
  }
  return out;
}

function coerceStartedAt(o: Record<string, unknown>, now: number, durationSec: number): number | null {
  let started = Number(o.startedAt);
  if (!Number.isFinite(started) || started <= 0) {
    const left = Number(o.secondsLeft);
    if (!Number.isFinite(left) || left < 0 || durationSec <= 0) return null;
    // Un secondsLeft por encima de la duración es borrador corrupto o
    // manipulado: no se regala un examen entero.
    if (left > durationSec + EXAM_DRAFT_CLOCK_SKEW_SEC) return null;
    const remaining = Math.min(left, durationSec);
    started = now - (durationSec - remaining);
  }
  if (now - started > EXAM_DRAFT_MAX_AGE_SEC) return null;
  // Un reloj atrasado no regala minutos: si startedAt está en el futuro, es ahora.
  if (started > now) started = now;
  return started;
}

/** Convierte un JSON suelto (perfil o localStorage) en un borrador usable, o null. */
export function coerceExamDraft(
  raw: unknown,
  opts: { now: number; durationSec: number; maxIdx: number },
): ExamDraftSnapshot | null {
  if (!Number.isFinite(opts.now) || !Number.isFinite(opts.durationSec) || !Number.isFinite(opts.maxIdx)) {
    return null;
  }
  const o = asRecord(raw);
  if (!o) return null;
  const durationSec = Math.max(0, opts.durationSec);
  const startedAt = coerceStartedAt(o, opts.now, durationSec);
  if (startedAt === null) return null;
  const maxIdx = opts.maxIdx >= 0 ? Math.min(Math.floor(opts.maxIdx), EXAM_DRAFT_MAX_IDX) : 0;
  let idx = Number(o.idx);
  if (!Number.isFinite(idx) || idx < 0) idx = 0;
  idx = Math.min(Math.floor(idx), maxIdx);
  const answers = coerceAnswers(o.answers);
  const at = Number(o.at);
  if (Number.isFinite(at) && at > 0 && opts.now * 1000 - at > EXAM_DRAFT_MAX_AGE_SEC * 1000) return null;
  return { idx, answers, startedAt };
}

/** Relee el reloj a partir del snapshot. Nunca negativo, nunca por encima de la duración. */
export function remainingOf(draft: ExamDraftSnapshot | null | undefined, durationSec: number, now: number): number {
  if (!draft || !Number.isFinite(durationSec) || durationSec <= 0 || !Number.isFinite(now)) return 0;
  const left = examSecondsLeft(draft.startedAt, durationSec, now);
  return Math.min(left, durationSec);
}
