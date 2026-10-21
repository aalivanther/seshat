import type { Cefr } from "./cefr";
import type { ServerState } from "./types";
import {
  coerceAnswers,
  EXAM_DRAFT_MAX_BODY,
  EXAM_DRAFT_MAX_IDX,
  isExamSetId,
} from "./examDraft";
import { esFalloDeMotor } from "./esperaModelo";

// El backend corre en la misma máquina que sirve la app: usar el hostname
// actual permite que otros dispositivos de tu red local (perfiles) funcionen.
function apiBase(): string {
  if (typeof window === "undefined") return "http://localhost:8787/api";
  // dev (next en :3000) habla con el backend en :8787; la app empaquetada la
  // sirve el propio binario Go → mismo origen, cero CORS, un solo puerto
  // next dev usa 3000 (o 3001+ si estaba ocupado): cualquier puerto 30xx es dev
  if (/^30\d\d$/.test(window.location.port)) {
    const port = process.env.NEXT_PUBLIC_API_PORT ?? "8787";
    return `http://${window.location.hostname}:${port}/api`;
  }
  return "/api";
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

/** último FALLO HTTP visto, con marca de tiempo — un éxito paralelo (p. ej.
    /due resolviendo bien entre el fallo y el render del aviso) NO lo borra */
export let lastApiError: { path: string; status: number; text: string; at: number } | null = null;

/** texto humano para los avisos de guardado: detalle del servidor si es
    reciente (15 s) — ni carrera con éxitos paralelos ni detalles rancios */
export function saveFailureDetail(fallback: string): string {
  if (lastApiError && lastApiError.status >= 400 && lastApiError.text && Date.now() - lastApiError.at < 15_000) {
    return lastApiError.text;
  }
  return fallback;
}

/** ¿el último fallo fue un 401 reciente? Lo usa el aviso de «no se pudo hablar
 *  con el motor» para distinguir un móvil desemparejado de la app apagada. */
export function lastErrorWasUnpaired(withinMs = 15_000): boolean {
  return !!lastApiError && lastApiError.status === 401 && Date.now() - lastApiError.at < withinMs;
}

async function safeFetch<T>(path: string, init?: RequestInit, timeoutMs = 8000): Promise<T | null> {
  try {
    const headers = new Headers(init?.headers);
    const profile = getProfile();
    if (profile) headers.set("X-Profile", profile);
    // timeout: un backend colgado no puede dejar la UI esperando para siempre
    const signal = init?.signal ?? AbortSignal.timeout(timeoutMs);
    const r = await fetch(apiBase() + path, { ...init, headers, signal });
    if (!r.ok) {
      // error HTTP ≠ backend caído: el detalle se conserva para que los avisos
      // de "no quedó guardado" puedan decir el PORQUÉ real (503 solo-lectura ≠
      // motor apagado) en vez de un MOTOR_OFF engañoso
      const text = (await r.text().catch(() => "")).slice(0, 300);
      lastApiError = { path, status: r.status, text, at: Date.now() };
      console.warn(`API ${path}: HTTP ${r.status}`, text);
      return null;
    }

    // éxito: se retira el error viejo de ESTA ruta, para que nadie decida con
    // información caducada (el reintento del guardado miraba aquí)
    if (lastApiError?.path === path) lastApiError = null;
    return (await r.json()) as T;
  } catch {
    // Cancelar la corrección aborta el fetch a propósito. Anotarlo como
    // «sin respuesta» haría que el siguiente guardado enseñara un fallo.
    if (!esFalloDeMotor(init?.signal ?? undefined)) return null;
    // Timeout o motor caído: TAMBIÉN es un fallo de esta ruta y hay que
    // anotarlo. Antes se devolvía null sin tocar `lastApiError`, así que el
    // reintento leía un 401 rancio de otra petición y se rendía al primer
    // intento — justo en el escenario que el reintento venía a resolver.
    lastApiError = { path, status: 0, text: "sin respuesta del motor", at: Date.now() };
    return null; // backend apagado → la app sigue funcionando sin progreso
  }
}

/** ¿el último fallo de ESTA ruta es reciente y definitivo (4xx)?
 *  Se filtra por ruta y por tiempo: `lastApiError` es global, y sin filtro un
 *  404 suelto de otra pantalla cancelaba para siempre los reintentos de todos
 *  los guardados posteriores. */
function lastErrorFor(path: string, withinMs = 20_000): { status: number } | null {
  if (!lastApiError || lastApiError.path !== path) return null;
  if (Date.now() - lastApiError.at > withinMs) return null;
  return lastApiError;
}

export function getState(): Promise<ServerState | null> {
  return safeFetch<ServerState>("/state");
}

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

/** Envía el resultado de una lección, prueba o simulacro CON REINTENTOS.
 *
 *  Antes era un solo intento de 8 segundos: si el motor tardaba —el portátil
 *  acababa de despertar, el antivirus estaba escaneando—, se perdía la lección
 *  entera, y con ella un simulacro de tres horas. El backend lleva desde la
 *  v1.2 preparado para esto (guarda los últimos requestId de cada perfil y no
 *  aplica dos veces el mismo), pero el frontend NUNCA mandaba el identificador,
 *  así que reintentar era arriesgarse a contar el XP dos veces. Ahora sí:
 *  mismo requestId en los tres intentos, con esperas crecientes.
 */
export async function postLessonResult(
  lessonId: string,
  score: number,
  /** mode: reconocer/producir — el backend espacia distinto (PLAN.md §6.1) */
  items: { itemId: string; correct: boolean; mode?: string }[],
): Promise<ServerState | null> {
  const requestId = newRequestId();
  const body = JSON.stringify({ lessonId, score, items, requestId });
  for (const wait of [0, 700, 2500]) {
    if (wait) await new Promise((r) => setTimeout(r, wait));
    const r = await safeFetch<ServerState>("/lesson-result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    if (r) return r;
    // 4xx = el servidor entendió y dijo que no: reintentar no arregla nada.
    // Se mira SOLO el error de esta misma ruta y reciente (ver lastErrorFor).
    const e = lastErrorFor("/lesson-result");
    if (e && e.status >= 400 && e.status < 500) break;
  }
  return null;
}

/** Envía dónde colocó la prueba de nivel al alumno, con el mismo patrón de
 *  reintentos que postLessonResult: es el dato que hace que el desbloqueo
 *  viaje entre dispositivos (PLAN 1.9.8 §1.3), y perderlo por un timeout
 *  sería el mismo fallo que perder una lección. */
export async function postPlacement(lang: string, placed: Cefr, pct: number): Promise<ServerState | null> {
  const requestId = newRequestId();
  const body = JSON.stringify({ lang, placed, pct, requestId });
  for (const wait of [0, 700, 2500]) {
    if (wait) await new Promise((r) => setTimeout(r, wait));
    const r = await safeFetch<ServerState>("/placement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    if (r) return r;
    const e = lastErrorFor("/placement");
    if (e && e.status >= 400 && e.status < 500) break;
  }
  return null;
}

/** identificador de envío: aleatorio y de una sola vez, para que el backend
 *  reconozca el reintento y no sume el XP dos veces */
function newRequestId(): string {
  const c = typeof crypto !== "undefined" ? crypto : undefined;
  if (c?.randomUUID) return c.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Borra el progreso del perfil activo. El backend deja una copia de seguridad
 *  antes de tocar nada (.reset.bak), así que esto es reversible a mano si el
 *  alumno se arrepiente. Lo usa el botón de «Borrar el progreso» del perfil. */
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

/** Descarga el respaldo del perfil activo como archivo JSON */
export async function exportProfile(): Promise<boolean> {
  try {
    const headers = new Headers();
    const profile = getProfile();
    if (profile) headers.set("X-Profile", profile);
    const r = await fetch(apiBase() + "/export", { headers });
    if (!r.ok) return false;
    const blob = await r.blob();
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

/** Importa un respaldo: el backend valida el esquema y respalda lo actual antes de pisar */
export async function importProfile(json: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const headers = new Headers({ "Content-Type": "application/json" });
    const profile = getProfile();
    if (profile) headers.set("X-Profile", profile);
    const r = await fetch(apiBase() + "/import", { method: "POST", headers, body: json });
    if (r.ok) return { ok: true };
    return { ok: false, error: await r.text() };
  } catch {
    return { ok: false, error: "backend apagado" };
  }
}

/** `key` es la llave de la red local: va dentro del QR, no se enseña en pantalla
 *  (un número largo que nadie va a teclear a mano sobra en la interfaz). */
export interface LanAddr {
  ip: string;
  /** nombre de la interfaz (en0, docker0, utun3…): sirve para decir cuál es el wifi */
  iface: string;
  /** true si es una red física normal; false para puentes de Docker, VM o VPN */
  likely: boolean;
}

export function getLanInfo(): Promise<{ ips: string[]; addrs?: LanAddr[]; port: string; key?: string } | null> {
  return safeFetch("/lan-info");
}

export function getVersion(): Promise<{
  /** la versión que el usuario está VIENDO: la del paquete si hay uno instalado */
  app: string;
  /** la del binario, que solo cambia reinstalando la aplicación */
  engine?: string;
  content: string;
  pack?: string;
  packTitle?: string;
  packAppliedAt?: string;
} | null> {
  return safeFetch("/version");
}

/** Cierra la aplicación (el "Salir" de una app de escritorio).
 *  En Windows el proceso corre sin consola: esta es la única forma digna de
 *  apagarlo. Devuelve true si el servidor confirmó el apagado. */
export async function quitApp(): Promise<boolean> {
  const r = await safeFetch<{ ok: boolean }>("/quit", { method: "POST" }, 4000);
  return !!r?.ok;
}

/** Señal de vida: el motor se apaga solo tras una hora de silencio total.
 *  La manda `components/Heartbeat.tsx` cada 30 s con la pestaña visible, para
 *  que leer una lección larga no cuente como haberse ido. Devuelve si el motor
 *  contestó: dos silencios seguidos son el aviso de que la app ya no está. */
export type PingResult = "ok" | "unpaired" | "down";

export async function pingApp(): Promise<PingResult> {
  // Aquí NO vale safeFetch: devuelve null tanto si el motor está apagado como
  // si respondió 401, y son dos cosas distintas que el alumno vive distinto.
  // 401 = este dispositivo de la red perdió su emparejamiento (o nunca lo tuvo)
  // y le basta con volver a escanear el QR; la app está encendida.
  try {
    const headers = new Headers();
    const profile = getProfile();
    if (profile) headers.set("X-Profile", profile);
    const r = await fetch(apiBase() + "/ping", {
      method: "POST",
      headers,
      signal: AbortSignal.timeout(3000),
    });
    if (r.status === 401) return "unpaired";
    return r.ok ? "ok" : "down";
  } catch {
    return "down";
  }
}


// ---- Actualizaciones (paquetes .seshatpack) ----

export interface UpdateManifest {
  version: string;
  drop?: number;
  title?: string;
  notes?: string[];
  requiresApp?: string;
  appliedAt?: string;
}

export function getUpdateState(): Promise<{ app: string; content: string; active: UpdateManifest | null } | null> {
  return safeFetch("/update/state");
}

/** Sube el paquete e informa del progreso REAL de la subida.
 *  Va con XMLHttpRequest a propósito: `fetch` no publica el progreso de subida,
 *  y una barra que salta de 0 a 100 al final no es una barra, es un adorno. */
export function uploadUpdate(
  file: File,
  onProgress: (pct: number) => void,
): Promise<{ ok: boolean; manifest?: UpdateManifest; error?: string }> {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", apiBase() + "/update/apply");
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const body = JSON.parse(xhr.responseText) as { manifest?: UpdateManifest };
          resolve({ ok: true, manifest: body.manifest });
        } catch {
          resolve({ ok: true });
        }
      } else {
        resolve({ ok: false, error: (xhr.responseText || "").trim() || `Error ${xhr.status}` });
      }
    };
    xhr.onerror = () => resolve({ ok: false, error: "Se cortó la conexión con el motor de la aplicación." });
    xhr.ontimeout = () => resolve({ ok: false, error: "La instalación tardó demasiado." });
    xhr.send(file);
  });
}

export async function rollbackUpdate(): Promise<boolean> {
  const r = await safeFetch<{ ok: boolean }>("/update/rollback", { method: "POST" }, 20_000);
  return !!r?.ok;
}
