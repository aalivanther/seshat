// API DE LA DEMO WEB — sustituye a lib/api.ts en el export del portafolio.
//
// Misma superficie y mismas reglas que lib/api.ts (perfil activo, último
// fallo, reintentos con requestId), pero en vez de hablar por HTTP con el
// binario Go habla con `DemoEngine`, el motor que corre en el navegador y
// guarda en localStorage. Las pantallas no notan la diferencia: reciben el
// mismo JSON y los mismos errores que con la app de escritorio.
//
// Faltan a propósito getLanInfo, quitApp y las funciones de actualización:
// sin binario no hay red local que enseñar, proceso que cerrar ni paquete que
// instalar, y sus pantallas de la demo lo explican en vez de llamarlas.

import type { Cefr } from "@/lib/cefr";
import type { ServerState } from "@/lib/types";
import {
  coerceAnswers,
  EXAM_DRAFT_MAX_BODY,
  EXAM_DRAFT_MAX_IDX,
  isExamSetId,
} from "@/lib/examDraft";
import { esFalloDeMotor } from "@/lib/esperaModelo";
import { DROP } from "@/lib/drop";
import { browserStore, DemoEngine, type KeyValueStore } from "./demoEngine";

// ---- El motor del navegador ----

/** Versión que enseña «Acerca de»: la fija scripts/build-demo.mjs al compilar. */
const DEMO_VERSION = process.env.NEXT_PUBLIC_SESHAT_DEMO_VERSION ?? "demo web";

/** Un almacenamiento que el navegador no deja abrir (modo privado estricto,
 *  cookies bloqueadas): cada operación devuelve el error original y el motor
 *  responde como el de escritorio ante un disco ilegible. */
function unavailableStore(error: unknown): KeyValueStore {
  const fail = (): never => {
    throw error instanceof Error ? error : new Error(String(error));
  };
  return { getItem: fail, setItem: fail, removeItem: fail, keys: fail };
}

function openStore(pick: () => Storage): KeyValueStore {
  try {
    return browserStore(pick());
  } catch (e) {
    return unavailableStore(e);
  }
}

let engine: DemoEngine | null = null;

function demoEngine(): DemoEngine {
  if (!engine) {
    engine = new DemoEngine({
      store: openStore(() => window.localStorage),
      session: openStore(() => window.sessionStorage),
      version: { app: DEMO_VERSION, content: String(DROP) },
    });
  }
  return engine;
}

/** Hace con el motor del navegador lo que `fetch(apiBase() + path)` hace con
 *  el binario: devuelve una Response de verdad para que el resto del módulo
 *  sea el mismo que en la app de escritorio. */
async function engineFetch(path: string, init?: RequestInit): Promise<Response> {
  if (typeof window === "undefined") throw new Error("el motor de la demo solo corre en el navegador");
  const headers = new Headers(init?.headers);
  const body = typeof init?.body === "string" ? init.body : "";
  const res = await demoEngine().handle({
    method: (init?.method ?? "GET").toUpperCase(),
    path,
    profile: getProfile(),
    contentType: headers.get("Content-Type") ?? "",
    body,
  });
  return new Response(res.body, { status: res.status, headers: res.headers });
}

// ---- Perfil activo (localStorage, por dispositivo) ----

const PROFILE_KEY = "deutsch-profile";

export function getProfile(): string {
  if (typeof window === "undefined") return "default";
  return window.localStorage.getItem(PROFILE_KEY) ?? "";
}

export function setProfile(name: string): void {
  window.localStorage.setItem(PROFILE_KEY, name);
}

/** último FALLO visto, con marca de tiempo (mismo contrato que lib/api.ts) */
export let lastApiError: { path: string; status: number; text: string; at: number } | null = null;

/** texto humano para los avisos de guardado: detalle del motor si es reciente */
export function saveFailureDetail(fallback: string): string {
  if (lastApiError && lastApiError.status >= 400 && lastApiError.text && Date.now() - lastApiError.at < 15_000) {
    return lastApiError.text;
  }
  return fallback;
}

/** En la demo nadie se empareja por QR, así que un 401 no llega nunca; se
 *  conserva la función porque ErrorBanner la consulta. */
export function lastErrorWasUnpaired(withinMs = 15_000): boolean {
  return !!lastApiError && lastApiError.status === 401 && Date.now() - lastApiError.at < withinMs;
}

async function safeFetch<T>(path: string, init?: RequestInit): Promise<T | null> {
  try {
    const r = await engineFetch(path, init);
    if (!r.ok) {
      const text = (await r.text()).slice(0, 300);
      lastApiError = { path, status: r.status, text, at: Date.now() };
      console.warn(`API ${path}: HTTP ${r.status}`, text);
      return null;
    }
    if (lastApiError?.path === path) lastApiError = null;
    return (await r.json()) as T;
  } catch (e) {
    // Mismo criterio que lib/api.ts: una cancelación del alumno no es un fallo
    // del motor; cualquier otra excepción sí, y se anota para los avisos.
    if (!esFalloDeMotor(init?.signal ?? undefined)) return null;
    const text = e instanceof Error ? e.message : "sin respuesta del motor";
    lastApiError = { path, status: 0, text: `sin respuesta del motor (${text})`, at: Date.now() };
    return null;
  }
}

function lastErrorFor(path: string, withinMs = 20_000): { status: number } | null {
  if (!lastApiError || lastApiError.path !== path) return null;
  if (Date.now() - lastApiError.at > withinMs) return null;
  return lastApiError;
}

export function getState(): Promise<ServerState | null> {
  return safeFetch<ServerState>("/state");
}

/** Los mismos tres intentos que la app de escritorio: aquí un 503 es el
 *  almacenamiento lleno, y un reintento puede encontrar hueco si otra pestaña
 *  ha liberado espacio entretanto. */
async function withRetries<T>(path: string, init: RequestInit): Promise<T | null> {
  for (const wait of [0, 700, 2500]) {
    if (wait) await new Promise((r) => setTimeout(r, wait));
    const r = await safeFetch<T>(path, init);
    if (r) return r;
    const e = lastErrorFor(path);
    if (e && e.status >= 400 && e.status < 500) break;
  }
  return null;
}

export function postExamDraft(
  setId: string,
  startedAt: number,
  idx: number,
  answers: Record<string, unknown>,
): Promise<ServerState | null> {
  if (!isExamSetId(setId)) return Promise.resolve(null);
  if (!Number.isFinite(startedAt) || startedAt <= 0 || !Number.isFinite(idx) || idx < 0 || idx > EXAM_DRAFT_MAX_IDX) {
    return Promise.resolve(null);
  }
  let body: string;
  try {
    body = JSON.stringify({
      setId,
      startedAt: Math.floor(startedAt),
      idx: Math.floor(idx),
      answers: coerceAnswers(answers),
    });
  } catch {
    return Promise.resolve(null);
  }
  if (body.length > EXAM_DRAFT_MAX_BODY) return Promise.resolve(null);
  return withRetries<ServerState>("/exam-draft", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
}

export function clearExamDraft(setId: string): Promise<ServerState | null> {
  if (!isExamSetId(setId)) return Promise.resolve(null);
  return withRetries<ServerState>(`/exam-draft?setId=${encodeURIComponent(setId)}`, { method: "DELETE" });
}

/** Resultado de una lección, prueba o simulacro, con el mismo requestId en los
 *  tres intentos para que el motor no sume el XP dos veces. */
export async function postLessonResult(
  lessonId: string,
  score: number,
  items: { itemId: string; correct: boolean; mode?: string }[],
): Promise<ServerState | null> {
  const requestId = newRequestId();
  const body = JSON.stringify({ lessonId, score, items, requestId });
  return withRetries<ServerState>("/lesson-result", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
}

/** Dónde colocó la prueba de nivel al alumno, con reintentos y requestId. */
export async function postPlacement(lang: string, placed: Cefr, pct: number): Promise<ServerState | null> {
  const requestId = newRequestId();
  const body = JSON.stringify({ lang, placed, pct, requestId });
  return withRetries<ServerState>("/placement", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
}

function newRequestId(): string {
  const c = typeof crypto !== "undefined" ? crypto : undefined;
  if (c?.randomUUID) return c.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Borra el progreso del perfil activo; el motor deja antes una copia. */
export async function resetProgress(): Promise<boolean> {
  const r = await safeFetch<ServerState>("/reset", { method: "DELETE" });
  return r !== null;
}

export function getDue(): Promise<{ itemId: string; streak: number; overdueDays: number }[] | null> {
  return safeFetch("/due");
}

// ---- Perfiles ----

export function getProfiles(): Promise<string[] | null> {
  return safeFetch<string[]>("/profiles");
}

export function createProfile(name: string): Promise<string[] | null> {
  return safeFetch<string[]>("/profiles", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
}

export function setAvatar(avatar: string, color: string): Promise<ServerState | null> {
  return safeFetch<ServerState>("/avatar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ avatar, color }),
  });
}

/** Descarga el respaldo del perfil activo como archivo JSON, el mismo formato
 *  que exporta la app de escritorio (se puede importar allí tal cual). */
export async function exportProfile(): Promise<boolean> {
  try {
    const r = await engineFetch("/export");
    if (!r.ok) return false;
    const blob = await r.blob();
    const profile = getProfile();
    const name = r.headers.get("Content-Disposition")?.match(/filename="([^"]+)"/)?.[1]
      ?? `perfil-${profile || "default"}.json`;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
    return true;
  } catch {
    return false;
  }
}

/** Importa un respaldo: el motor valida el esquema y aparta lo actual antes de pisar. */
export async function importProfile(json: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const r = await engineFetch("/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json,
    });
    if (r.ok) return { ok: true };
    return { ok: false, error: await r.text() };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "el motor de la demo no respondió" };
  }
}

export function getVersion(): Promise<{
  app: string;
  engine?: string;
  content: string;
  pack?: string;
  packTitle?: string;
  packAppliedAt?: string;
} | null> {
  return safeFetch("/version");
}

/** Señal de vida para components/Heartbeat.tsx. El motor de la demo vive en
 *  la propia pestaña: mientras ella esté abierta, contesta. */
export type PingResult = "ok" | "unpaired" | "down";

export async function pingApp(): Promise<PingResult> {
  try {
    const r = await engineFetch("/ping", { method: "POST" });
    if (r.status === 401) return "unpaired";
    return r.ok ? "ok" : "down";
  } catch {
    return "down";
  }
}
