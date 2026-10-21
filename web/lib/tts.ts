// TTS del idioma objetivo vía Web Speech API — configurado por LanguageConfig.

import { langConfig } from "./language";

let cachedVoice: SpeechSynthesisVoice | null = null;
let cachedSecond: SpeechSynthesisVoice | null = null;
// el caché pertenece a UN config: si el idioma en juego cambia (adoptLang),
// la voz alemana cacheada NO puede leer inglés (u.voice pisa a u.lang)
let cachedFor: unknown = null;

function ensureCacheLang(): void {
  const cfg = langConfig();
  if (cachedFor !== cfg) {
    cachedFor = cfg;
    cachedVoice = null;
    cachedSecond = null;
  }
}

function targetVoices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !window.speechSynthesis) return [];
  try {
    const prefix = langConfig().htmlLang.toLowerCase();
    const all = window.speechSynthesis.getVoices();
    if (!Array.isArray(all)) return [];
    return all.filter((v) => v && typeof v.lang === "string" && v.lang.toLowerCase().startsWith(prefix));
  } catch {
    return [];
  }
}

function pickVoice(): SpeechSynthesisVoice | null {
  ensureCacheLang();
  if (cachedVoice) return cachedVoice;
  const voices = targetVoices();
  if (!voices.length) return null;
  // prioridad ABSOLUTA a voces locales: la promesa "privada y sin internet"
  // no puede depender de la voz online de Google que Chrome/Windows enumera
  const local = voices.filter((v) => v.localService);
  // Sin voz local no se elige Google: la promesa es privada y sin red.
  if (!local.length) return null;
  const pool = local;
  cachedVoice =
    pool.find((v) => langConfig().preferredVoices.test(v.name) && /premium|enhanced|natural/i.test(v.name)) ||
    pool.find((v) => langConfig().preferredVoices.test(v.name)) ||
    pool.find((v) => v.lang === langConfig().code) ||
    pool[0];
  return cachedVoice;
}

/** Segunda voz DISTINTA para diálogos de dos hablantes (Hören del examen).
 *  Misma prioridad absoluta a localService que pickVoice: si no, Chrome/Windows
 *  coge la voz online de Google y el simulacro sale a la red. Si no hay una
 *  segunda local, se reutiliza la primera (el alumno oye un solo hablante). */
function pickSecondVoice(): SpeechSynthesisVoice | null {
  ensureCacheLang();
  if (cachedSecond) return cachedSecond;
  const first = pickVoice();
  const voices = targetVoices().filter((v) => v !== first);
  const local = voices.filter((v) => v.localService);
  const pool = local.length ? local : [];
  if (!pool.length) {
    cachedSecond = first;
    return cachedSecond;
  }
  cachedSecond =
    pool.find((v) => langConfig().preferredVoices.test(v.name)) ||
    pool.find((v) => v.lang === langConfig().code) ||
    pool[0];
  return cachedSecond;
}

/** ¿Hay alguna voz del idioma objetivo? (cargan async; re-consultar tras voiceschanged) */
export function hasTargetVoice(): boolean {
  if (typeof window === "undefined" || !window.speechSynthesis) return false;
  return pickVoice() !== null;
}

/** Corta cualquier lectura en curso o encolada (al navegar, al cambiar de paso) */
export function stopSpeech(): void {
  if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
  if (keepAliveTimer) {
    clearInterval(keepAliveTimer);
    keepAliveTimer = null;
  }
}

/** ¿Cuántas voces del idioma en juego hay instaladas? La pantalla que va a
 *  poner un audio necesita saberlo ANTES de prometerlo: sin voz del idioma, el
 *  sistema lee alemán con acento español o directamente no dice nada, y el
 *  alumno cree que la app está rota. */
export function targetVoiceCount(): number {
  return targetVoices().length;
}

/** Encolar después de un `cancel()` es la trampa clásica de la Web Speech API:
 *  Chrome y Safari se quedan mudos si el `speak()` llega en el mismo tick que
 *  el `cancel()` —la cola aún se está vaciando y la nueva locución se pierde—.
 *  Esto es justo lo de «los diálogos del examen no suenan»: el botón cancelaba
 *  lo anterior y hablaba de inmediato. Con un respiro, suena siempre. */
function encolar(hacer: () => void): void {
  const syn = window.speechSynthesis;
  const ocupado = syn.speaking || syn.pending;
  syn.cancel();
  if (ocupado) setTimeout(hacer, 140);
  else hacer();
}

export function speak(text: string, rate = 0.9): void {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  if (typeof text !== "string" || !text.trim()) return;
  const rateSafe = Number.isFinite(rate) && rate > 0 ? Math.min(rate, 2) : 0.9;
  // El «|» separa turnos de hablante en los audios de diálogo. Cuando ese texto
  // llega por aquí (dictados, «libro o calle»), algunos motores se atragantan
  // con el carácter y se quedan mudos: se cambia por una pausa de verdad.
  encolar(() => {
    const limpio = cleanForSpeech(text);
    if (!limpio) return;
    const u = new SpeechSynthesisUtterance(limpio);
    u.lang = langConfig().code;
    u.rate = rateSafe;
    const v = pickVoice();
    if (v) u.voice = v;
    // una voz online caída o un motor roto no debe pasar en silencio
    u.onerror = (e) => console.warn("TTS error:", e.error ?? e);
    window.speechSynthesis.speak(u);
  });
}

export function speakSlow(text: string): void {
  speak(text, 0.65);
}

/**
 * Audios largos de examen: trocea por frases y ALTERNA DOS VOCES por frase —
 * los diálogos de dos hablantes suenan a dos personas, como el examen real.
 * (Con una sola voz instalada, degrada a una voz con pausas entre frases.)
 */
export function speakLong(text: string, opts?: { dialog?: boolean; rate?: number }): void {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  if (typeof text !== "string" || !text.trim()) return;
  const rate = Number.isFinite(opts?.rate) && (opts?.rate ?? 0) > 0
    ? Math.min(opts!.rate!, 2)
    : 0.88;
  const v1 = pickVoice();
  const v2 = opts?.dialog ? pickSecondVoice() : null;
  // Los guiones de diálogo separan TURNOS de hablante con " | " — cada turno
  // conserva su voz aunque tenga varias frases. Sin marcador: cada frase es
  // un turno (aproximación). Monólogos: una voz con pausas por frase.
  const clipped = text.length > 20_000 ? text.slice(0, 20_000) : text;
  const turns = (clipped.includes("|")
    ? clipped.split(/\s*\|\s*/).filter(Boolean)
    : (clipped.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [clipped])).slice(0, 80);
  encolar(() => {
    turns.forEach((turn, t) => {
      const voice = opts?.dialog && t % 2 === 1 ? (v2 ?? v1) : v1;
      const sentences = turn.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [turn];
      for (const sentence of sentences) {
        const limpio = cleanForSpeech(sentence);
        if (!limpio) continue;
        const u = new SpeechSynthesisUtterance(limpio);
        u.lang = langConfig().code;
        u.rate = rate;
        if (voice) u.voice = voice;
        u.onerror = (e) => console.warn("TTS error:", e.error ?? e);
        window.speechSynthesis.speak(u);
      }
    });
    keepAlive();
  });
}

/** Quita del texto lo que es marcado nuestro y no lengua: el «|» de los turnos,
 *  los espacios de más. Sin esto, un audio de diálogo podía sonar cortado o no
 *  sonar en absoluto según el motor de voz del sistema. */
function cleanForSpeech(text: string): string {
  return text.replace(/\s*\|\s*/g, ". ").replace(/\s+/g, " ").trim();
}

/** Chrome deja de hablar solo a los ~15 segundos si la cola es larga: es un bug
 *  suyo de toda la vida, y los audios de examen duran tres minutos. Un pause +
 *  resume cada diez segundos lo mantiene despierto hasta que termina. */
let keepAliveTimer: ReturnType<typeof setInterval> | null = null;
function keepAlive(): void {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  if (keepAliveTimer) clearInterval(keepAliveTimer);
  keepAliveTimer = setInterval(() => {
    const syn = window.speechSynthesis;
    if (!syn.speaking && !syn.pending) {
      if (keepAliveTimer) clearInterval(keepAliveTimer);
      keepAliveTimer = null;
      return;
    }
    syn.pause();
    syn.resume();
  }, 10_000);
}

// Las voces cargan async en algunos navegadores — sin pisar listeners ajenos
if (typeof window !== "undefined" && window.speechSynthesis) {
  window.speechSynthesis.addEventListener("voiceschanged", () => {
    cachedVoice = null;
    cachedSecond = null;
    pickVoice();
  });
}

/** ¿Hay dos voces locales distintas? Si no, el diálogo se oye con un solo hablante. */
export function hasDistinctSecondVoice(): boolean {
  const a = pickVoice();
  const b = pickSecondVoice();
  return Boolean(a && b && a !== b);
}

/** Solo para tests: no usar en la UI. */
export const __ttsTest = { pickSecondVoice, pickVoice };
