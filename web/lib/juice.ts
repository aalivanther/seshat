"use client";

// El "juice" de la app: celebración, háptica y respeto por reduced-motion.
// Librerías especializadas: canvas-confetti (celebraciones) + motion (springs).

import confetti from "canvas-confetti";

/* matchMedia crea un objeto nuevo en cada llamada y `buzz` se dispara docenas
   de veces por sesión: se consulta una vez y se escucha el cambio. */
let reducedMq: MediaQueryList | null = null;
export function reducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  if (!reducedMq) reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
  return reducedMq.matches;
}

/** Scroll que dispara la propia pantalla (un mensaje que llega), no un clic.
 *  `smooth` no es una transición de CSS: el global no lo apaga. */
export function scrollBehavior(menosMovimiento = reducedMotion()): "auto" | "smooth" {
  return menosMovimiento ? "auto" : "smooth";
}

/** ¿Está el cuaderno en modo noche? Lo decide el atributo que escribe ThemeToggle. */
function darkTheme(): boolean {
  if (typeof document === "undefined") return false;
  const t = document.documentElement.dataset.theme;
  if (t === "dark") return true;
  if (t === "auto") return window.matchMedia("(prefers-color-scheme: dark)").matches;
  return false;
}

/* El confeti de la paleta clara son tonos oscuros: sobre papel de noche
   desaparecían. De noche se tira de la versión luminosa de los mismos colores. */
const CONFETTI_LIGHT = ["#b45309", "#1b7a43", "#7c3aed", "#1d4ed8", "#ffd54f"];
const CONFETTI_DARK = ["#e0913c", "#56c98c", "#c4a4f7", "#7ea8ff", "#ffe08a"];

/** Confeti de logro — grande para hitos, discreto para aprobados */
export function celebrate(big = false): void {
  if (reducedMotion()) return;
  const base = { spread: big ? 100 : 70, ticks: big ? 200 : 120, disableForReducedMotion: true };
  const colors = darkTheme() ? CONFETTI_DARK : CONFETTI_LIGHT;
  confetti({
    ...base,
    particleCount: big ? 140 : 60,
    origin: { y: 0.6 },
    colors,
  });
  if (big) {
    setTimeout(() => confetti({ ...base, particleCount: 60, angle: 60, origin: { x: 0, y: 0.7 }, colors }), 250);
    setTimeout(() => confetti({ ...base, particleCount: 60, angle: 120, origin: { x: 1, y: 0.7 }, colors }), 400);
  }
}

/** Vibración corta en móvil: confirmación táctil del acierto/fallo.
 *  Calla con el interruptor de sonido (es el mismo interruptor de «respuesta
 *  de la app») y con reduced-motion, que en móvil también significa «quieto». */
export function buzz(pattern: number | number[] = 12): void {
  if (reducedMotion() || !sfxEnabled()) return;
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
}

/** Spring estándar de la app (motion) — una sola física en todas partes */
export const SPRING = { type: "spring" as const, stiffness: 300, damping: 28 };

/* ── Sonidos UI con ZzFX ───────────────────────────────────────────────────
   Cero archivos: ZzFX sintetiza en el momento.

   Cómo suenan y por qué. Esto lo va a oír alguien doscientas veces en una
   tarde, así que la norma es la contraria a la de un juego: nada de sierra,
   nada de bitcrush, nada de ataques a cero (el clic seco de un ataque
   instantáneo es lo que hace que un sonido «cante» a consola). Todos los
   efectos son ondas senoidales o triangulares, con ataque de entre 5 y 30 ms,
   un filtro paso bajo que se lleva el brillo áspero, y una envolvente de
   campana —golpe, caída, cola— como la de un instrumento de madera o metal.
   Las notas salen de una pentatónica de do: cualquier combinación suena bien
   y ninguna resulta chirriante al repetirse.

   El volumen maestro de ZzFX (0.3) no se toca: cada efecto se queda por
   debajo de 0.2, y los acordes reparten ese margen entre sus voces. */

/* Lo que de verdad usamos de ZzFX. El .d.ts del paquete declara menos de lo
   que el módulo trae; aquí se nombra lo que hace falta para poder cachear. */
type ZzfxApi = {
  volume: number;
  sampleRate: number;
  audioContext: AudioContext;
  buildSamples: (...args: (number | undefined)[]) => number[];
};

let api: ZzfxApi | null = null;
let loadingSfx: Promise<ZzfxApi | null> | null = null;
let master: GainNode | null = null;

/* Una onda sintetizada = un AudioBuffer reutilizable. Ver `emit`. */
const buffers = new Map<string, AudioBuffer>();

function loadSfx(): Promise<ZzfxApi | null> {
  if (api) return Promise.resolve(api);
  if (!loadingSfx) {
    loadingSfx = import("zzfx")
      .then((mod) => {
        api = mod.ZZFX as ZzfxApi;
        // el contexto nació suspendido; si ya hubo gesto, se despierta ahora
        if (wantsUnlock) resumeCtx();
        watchState(api.audioContext);
        warmUp();
        return api;
      })
      .catch(() => null);
  }
  return loadingSfx;
}

/** Engancha la capa táctil global y deja el audio para cuando haga falta.
 *  Crear el AudioContext y sintetizar las ondas costaba ~100 ms en plena
 *  carga en un móvil modesto, para un sonido que nadie ha pedido aún: ahora
 *  el módulo se carga con el primer gesto o en el primer rato ocioso de
 *  verdad (sin plazo que lo fuerce a meterse en la carga), lo que llegue
 *  antes. El primer gesto sigue sonando: unlockAudio lo pide igual. */
export function preloadSfx(): void {
  if (typeof window === "undefined") return;
  // import diferido a propósito: useTactile importa de aquí y no queremos ciclo
  void import("./useTactile").then((m) => m.installTactile());
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    window.removeEventListener("pointerdown", start, true);
    window.removeEventListener("keydown", start, true);
    void loadSfx();
  };
  window.addEventListener("pointerdown", start, { capture: true, passive: true });
  window.addEventListener("keydown", start, true);
  whenIdle(start);
}

/** cuando el navegador esté ocioso de verdad: sin `timeout`, que lo forzaba
 *  en plena carga si la página no paraba */
function whenIdle(fn: (deadline?: IdleDeadline) => void): void {
  const idle = window.requestIdleCallback;
  if (typeof idle === "function") idle(fn);
  else window.setTimeout(fn, 300);
}

/* ── Desbloqueo del audio ──────────────────────────────────────────────────
   El AudioContext de ZzFX se crea al evaluar el módulo, que es fuera de
   cualquier gesto: nace `suspended` y ahí se queda para siempre si nadie lo
   despierta. Peor: `resume()` solo cuenta si sale de dentro del gesto, y el
   módulo puede no haber terminado de cargar cuando llega el primer dedo.
   Por eso `unlockAudio` deja constancia de la intención (`wantsUnlock`) y el
   reintento vive en tres sitios: al cargar el módulo, en cada gesto, y en el
   `statechange` de iOS —que vuelve a suspender el contexto al irse a otra app. */
let wantsUnlock = false;
let watching: AudioContext | null = null;

function resumeCtx(): void {
  const ctx = api?.audioContext;
  if (!ctx || ctx.state === "running") return;
  void ctx.resume().catch(() => {
    /* aún sin gesto válido: se reintenta en el siguiente */
  });
}

function watchState(ctx: AudioContext): void {
  if (watching === ctx) return;
  watching = ctx;
  ctx.addEventListener("statechange", () => {
    if (wantsUnlock && ctx.state === "suspended") resumeCtx();
  });
}

/** iOS: el contexto SOLO arranca dentro de un gesto — llamar en pointerdown */
export function unlockAudio(): void {
  wantsUnlock = true;
  if (!api) {
    void loadSfx(); // el resume lo hará el propio load al terminar
    return;
  }
  resumeCtx();
}

/** ¿Suena la app ahora mismo? (para pruebas y para el interruptor) */
export function audioReady(): boolean {
  return api?.audioContext.state === "running";
}

/* ── Interruptor de sonido ─────────────────────────────────────────────────
   localStorage es síncrono y se consultaba una vez por VOZ: un acorde de seis
   notas eran seis lecturas en mitad del gesto. Se cachea y se invalida a mano. */
const SFX_KEY = "sfx";
const SFX_EVENT = "seshat:sfx";
let sfxCache: boolean | null = null;

export function sfxEnabled(): boolean {
  if (typeof window === "undefined") return false;
  if (sfxCache === null) sfxCache = window.localStorage.getItem(SFX_KEY) !== "off";
  return sfxCache;
}

export function setSfxEnabled(on: boolean): void {
  sfxCache = on;
  window.localStorage.setItem(SFX_KEY, on ? "on" : "off");
  // hay dos interruptores (la barra de lección y /perfil): que no se contradigan
  window.dispatchEvent(new CustomEvent<boolean>(SFX_EVENT, { detail: on }));
}

/** Avisa cuando cambia el interruptor, lo mueva quien lo mueva. Devuelve el
 *  desenganche, listo para el `return` de un `useEffect`. */
export function onSfxChange(cb: (on: boolean) => void): () => void {
  if (typeof window === "undefined") return () => {};
  const local = (e: Event) => cb((e as CustomEvent<boolean>).detail);
  const other = (e: StorageEvent) => {
    if (e.key !== SFX_KEY) return;
    sfxCache = e.newValue !== "off";
    cb(sfxCache);
  };
  window.addEventListener(SFX_EVENT, local);
  window.addEventListener("storage", other);
  return () => {
    window.removeEventListener(SFX_EVENT, local);
    window.removeEventListener("storage", other);
  };
}

/* Una voz del sintetizador, con nombres en vez de veintiún números seguidos.
   La lista cruda de ZzFX es imposible de revisar de un vistazo y era donde se
   colaban los sonidos estridentes. */
type Voice = {
  /** Hz. Notas de la pentatónica de do, más abajo. */
  freq: number;
  /** 0..1, antes del volumen maestro. Nada por encima de 0.2. */
  vol?: number;
  /** Segundos hasta el golpe. Nunca 0: el ataque instantáneo chasca. */
  attack?: number;
  /** Segundos de caída desde el golpe hasta el cuerpo de la nota. */
  decay?: number;
  /** Segundos de cuerpo sostenido. */
  sustain?: number;
  /** Segundos de cola. */
  release?: number;
  /** 0 seno (lo más suave), 1 triángulo (con algo de cuerpo). */
  shape?: 0 | 1;
  /** Curva de la onda: por encima de 1 la redondea todavía más. */
  curve?: number;
  /** Deriva de tono; negativa = cae. */
  slide?: number;
  /** Suciedad del tono: solo para el roce del papel. */
  noise?: number;
  /** Corte del paso bajo en Hz: lo que quita el filo. */
  filter?: number;
  /** Volumen del cuerpo respecto al golpe (0..1). */
  body?: number;
  /** Retraso de esta voz dentro del acorde, en milisegundos. */
  at?: number;
};

/* Pentatónica de do: sin semitonos que rocen, todo combina con todo. */
const C4 = 261.63;
const E4 = 329.63;
const G4 = 392.0;
const A4 = 440.0;
const C5 = 523.25;
const D5 = 587.33;
const E5 = 659.25;
const G5 = 783.99;
const A5 = 880.0;
const C6 = 1046.5;

function params(v: Voice): (number | undefined)[] {
  return [
    v.vol ?? 0.16,        // volume
    0,                    // randomness: cero AQUÍ porque la onda se cachea; la
    v.freq,               //   variación de afinación se pone al reproducir
    v.attack ?? 0.015,    // attack
    v.sustain ?? 0,       // sustain
    v.release ?? 0.2,     // release
    v.shape ?? 0,         // shape
    v.curve ?? 1,         // shapeCurve
    v.slide ?? 0,         // slide
    0,                    // deltaSlide
    0,                    // pitchJump
    0,                    // pitchJumpTime
    0,                    // repeatTime
    v.noise ?? 0,         // noise
    0,                    // modulation
    0,                    // bitCrush: a cero SIEMPRE, es el sonido a 8 bits
    0,                    // delay
    v.body ?? 0.3,        // sustainVolume
    v.decay ?? 0.08,      // decay
    0,                    // tremolo
    v.filter ?? 0,        // filter (paso bajo)
  ];
}

/* ── Reproducción ──────────────────────────────────────────────────────────
   ZzFX sintetiza la onda muestra a muestra en JavaScript. Hacerlo en cada
   pulsación es gastar el hilo principal justo en el fotograma en el que el
   dedo baja, que es donde se nota. Aquí cada voz se sintetiza UNA vez, se
   guarda como AudioBuffer y a partir de ahí un toque cuesta lo que cuesta
   crear un BufferSource: nada. El «no suenan todos igual» que daba la
   aleatoriedad de ZzFX se recupera moviendo playbackRate un 2%.

   Y los acordes se programan en el reloj del AudioContext, no con setTimeout:
   un temporizador de JS llega tarde si el hilo está pintando, y una campana
   que entra 40 ms tarde suena a error, no a acorde. */
const MASTER_BUS_GAIN = 1;
const PITCH_JITTER = 0.02;

function bus(ctx: AudioContext): GainNode {
  if (!master || master.context !== ctx) {
    master = ctx.createGain();
    master.gain.value = MASTER_BUS_GAIN;
    master.connect(ctx.destination);
  }
  return master;
}

function bufferOf(z: ZzfxApi, v: Voice): AudioBuffer | null {
  const p = params(v);
  const key = p.join(",");
  const hit = buffers.get(key);
  if (hit) return hit;
  const samples = z.buildSamples(...p);
  if (!samples.length) return null;
  const buf = z.audioContext.createBuffer(1, samples.length, z.sampleRate);
  buf.getChannelData(0).set(Float32Array.from(samples));
  buffers.set(key, buf);
  return buf;
}

function emit(z: ZzfxApi, voices: Voice[]): void {
  const ctx = z.audioContext;
  if (ctx.state !== "running") resumeCtx();
  const out = bus(ctx);
  const now = ctx.currentTime;
  for (const v of voices) {
    const buf = bufferOf(z, v);
    if (!buf) continue;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.playbackRate.value = 1 + (Math.random() * 2 - 1) * PITCH_JITTER;
    src.connect(out);
    src.start(now + (v.at ?? 0) / 1000);
  }
}

/** Toca un grupo de voces; cada una entra cuando le toca (campo `at`). */
function play(voices: Voice[]): void {
  if (typeof window === "undefined" || !sfxEnabled()) return;
  // camino rápido: con el módulo ya cargado esto suena en el mismo fotograma
  if (api) {
    try {
      emit(api, voices);
    } catch {
      /* contexto cerrado o sin salida de audio: silencio elegante */
    }
    return;
  }
  void loadSfx().then((z) => {
    if (!z || !sfxEnabled()) return;
    try {
      emit(z, voices);
    } catch {
      /* ídem */
    }
  });
}

/* La primera pulsación no debe pagar la síntesis: en cuanto el navegador está
   ocioso se precalientan las ondas que se oyen en cada pantalla. */
function warmUp(): void {
  const z = api;
  if (!z) return;
  const pending = [TICK, SELECT, NAV, POP, LIFT, ...SUBMIT];
  // una onda por hueco ocioso mientras quede tiempo en él: cocinarlas todas
  // de golpe era una tarea larga justo cuando la página aún arrancaba
  const cook = (deadline?: IdleDeadline) => {
    while (pending.length > 0 && (!deadline || deadline.timeRemaining() > 4)) {
      try {
        bufferOf(z, pending.shift()!);
      } catch {
        /* si falla, se sintetizará al vuelo */
      }
    }
    if (pending.length > 0) whenIdle(cook);
  };
  whenIdle(cook);
}

/* ── Gesto ya sonado ───────────────────────────────────────────────────────
   La capa táctil global suena en `pointerdown` (fase de captura). Cualquier
   otro oyente de ese MISMO pointerdown que pida un tic estaría pidiendo un
   eco, así que se marca el evento y `sfxTick`/`sfxNav` lo respetan. Es lo que
   permite mejorar el sonido global sin tocar los componentes que ya lo pedían. */
let voicedEvent: Event | null = null;
let voicedAt = 0;
let voicedKind = "";

/** La llama la capa táctil justo después de sonar por un gesto. */
export function markGestureVoiced(kind: string): void {
  voicedEvent = (typeof window !== "undefined" ? window.event : null) ?? null;
  voicedAt = performance.now();
  voicedKind = kind;
}

function gestureAlreadyVoiced(): boolean {
  if (typeof window === "undefined") return false;
  const current = window.event ?? null;
  if (current && voicedEvent && current === voicedEvent) return true;
  // red de seguridad donde window.event no existe: dentro del mismo despacho
  // no pasan ni dos milisegundos, y el click posterior llega mucho más tarde
  return !current && performance.now() - voicedAt < 8;
}

/* Colocar una ficha ya suena en `pointerdown`; el `sfxPop()` que el propio
   ejercicio pide en su `onClick` llegaría 80 ms después y sonaría a rebote. */
const ECO_POP_MS = 400;
function popAlreadyVoiced(): boolean {
  return voicedKind === "place" && performance.now() - voicedAt < ECO_POP_MS;
}

/* Campana de madera: el timbre de la casa. Golpe corto, caída larga y cola
   suave; el filtro deja fuera los armónicos que pican. */
function chime(freq: number, at = 0, vol = 0.15): Voice {
  return { freq, at, vol, attack: 0.012, decay: 0.12, release: 0.28, body: 0.22, filter: 2600 };
}

/* Las voces de gesto van en constantes porque el precalentado necesita
   nombrarlas antes de que nadie las toque. */
const TICK: Voice = { freq: E4, vol: 0.12, attack: 0.006, decay: 0.03, release: 0.05, body: 0.15, filter: 1200 };
const NAV: Voice = { freq: 470, vol: 0.075, attack: 0.03, decay: 0.06, release: 0.11, body: 0.35, slide: -3, noise: 1.6, filter: 700 };
const BACK: Voice = { freq: 360, vol: 0.07, attack: 0.028, decay: 0.05, release: 0.1, body: 0.3, slide: -6, noise: 1.6, filter: 560 };
const SELECT: Voice = { freq: A4, vol: 0.125, attack: 0.008, decay: 0.045, release: 0.09, body: 0.18, filter: 1900 };
const POP: Voice = { freq: 320, vol: 0.17, attack: 0.004, decay: 0.035, release: 0.07, body: 0.12, shape: 1, curve: 1.6, slide: -4, filter: 1500 };
const LIFT: Voice = { freq: 250, vol: 0.11, attack: 0.005, decay: 0.028, release: 0.055, body: 0.1, shape: 1, curve: 1.6, slide: 5, filter: 1000 };
const SUBMIT: Voice[] = [
  { freq: G4, vol: 0.13, attack: 0.01, decay: 0.06, release: 0.14, body: 0.2, filter: 1600 },
  { freq: C4, vol: 0.075, attack: 0.014, decay: 0.09, release: 0.18, body: 0.18, filter: 900 },
];

/** Clic suave: una acción que HACE algo. Golpecito de rotulador sobre papel. */
export function sfxTick(): void {
  if (gestureAlreadyVoiced()) return;
  play([TICK]);
}

/** Navegación: el roce de una hoja al pasar. Ruido filtrado que cae, sin tono. */
export function sfxNav(): void {
  if (gestureAlreadyVoiced()) return;
  play([NAV]);
}

/** Volver o cerrar: la misma hoja, pero pasada hacia atrás — más grave y más
 *  corta. Distingue «entro» de «salgo» sin pensarlo. */
export function sfxBack(): void {
  play([BACK]);
}

/** Elegir una opción: un toque limpio de tono medio. No confirma nada todavía
 *  —el acierto o el fallo llegan después—, solo dice «te he oído». */
export function sfxSelect(): void {
  play([SELECT]);
}

/** La ficha que encaja en su hueco: golpe de madera, mate y corto. */
export function sfxPop(): void {
  if (popAlreadyVoiced()) return;
  play([POP]);
}

/** El mismo golpe sin la guarda de eco: lo usa la capa táctil, que es quien
 *  pone la marca y por tanto no debe tropezar con ella. */
export function sfxPlace(): void {
  play([POP]);
}

/** La ficha que se retira: el mismo golpe al revés, más grave y más flojo. */
export function sfxLift(): void {
  play([LIFT]);
}

/** Enviar la respuesta: el tic con peso. Tónica y quinta grave a la vez, cola
 *  algo más larga — se nota que ese botón cierra algo. */
export function sfxSubmit(): void {
  play(SUBMIT);
}

/** Interruptor: dos notas seguidas, sube al encender y baja al apagar. */
export function sfxSwitch(on: boolean): void {
  play(
    on
      ? [{ freq: E5, vol: 0.12, attack: 0.008, decay: 0.04, release: 0.09, body: 0.18, filter: 2200 }, { freq: G5, at: 60, vol: 0.11, attack: 0.008, decay: 0.05, release: 0.12, body: 0.18, filter: 2400 }]
      : [{ freq: G4, vol: 0.11, attack: 0.008, decay: 0.04, release: 0.09, body: 0.18, filter: 1500 }, { freq: E4, at: 60, vol: 0.1, attack: 0.008, decay: 0.05, release: 0.12, body: 0.18, filter: 1300 }],
  );
}

/** Acierto: dos campanas que suben una quinta, con un brillo encima.
 *  Es un «bien» dicho en voz baja, no una tragaperras. */
export function sfxOk(): void {
  play([chime(C5, 0, 0.16), chime(G5, 70, 0.13), { ...chime(C6, 95, 0.05), release: 0.4 }]);
}

/** Casi: la misma campana, pero el segundo golpe BAJA un tono. Se oye el
 *  «por poco» sin que suene a error. */
export function sfxNear(): void {
  play([
    { ...chime(E5, 0, 0.14), filter: 2000 },
    { ...chime(D5, 80, 0.12), filter: 1800, release: 0.22 },
  ]);
}

/** Fallo: dos notas graves de madera, sordas y sin cola. Ni zumbido ni drama:
 *  el error ya está en pantalla, el sonido solo dice «esa no». */
export function sfxBad(): void {
  play([
    { freq: 196, vol: 0.16, attack: 0.02, decay: 0.12, release: 0.2, body: 0.25, shape: 1, curve: 1.4, filter: 520 },
    { freq: 165, at: 110, vol: 0.14, attack: 0.02, decay: 0.14, release: 0.26, body: 0.2, shape: 1, curve: 1.4, filter: 460 },
  ]);
}

/** Aviso: dos toques iguales, de tono medio. Llama la atención y se calla;
 *  a propósito no sube ni baja, para que no se lea como acierto ni como fallo. */
export function sfxAlert(): void {
  play([
    { freq: A4, vol: 0.13, attack: 0.012, decay: 0.05, release: 0.12, body: 0.2, shape: 1, filter: 1400 },
    { freq: A4, at: 150, vol: 0.11, attack: 0.012, decay: 0.05, release: 0.14, body: 0.2, shape: 1, filter: 1400 },
  ]);
}

/** Subida de nivel: tres campanas que suben, con la tónica grave debajo
 *  sosteniendo el acorde. Corto —medio segundo— pero se nota que sube. */
export function sfxLevelUp(): void {
  play([
    { freq: C4, vol: 0.08, attack: 0.03, decay: 0.3, release: 0.5, body: 0.18, filter: 900 },
    chime(G4, 0, 0.14),
    chime(C5, 85, 0.14),
    chime(E5, 170, 0.13),
  ]);
}

/** Fin de lección: figura ascendente que RESUELVE en la octava. La cola es
 *  larga a propósito: es el punto final de la sesión, no un aplauso. */
export function sfxFanfare(): void {
  play([
    { freq: C4, vol: 0.07, attack: 0.04, decay: 0.4, release: 0.7, body: 0.16, filter: 800 },
    chime(C5, 0, 0.15),
    chime(E5, 105, 0.14),
    chime(G5, 210, 0.13),
    { ...chime(C6, 315, 0.12), decay: 0.2, release: 0.6 },
  ]);
}

/** Medalla: como el fin de lección pero con un brillo que se queda flotando
 *  detrás. Es el único sonido de la app que se permite durar un segundo. */
export function sfxMedal(): void {
  play([
    { freq: C4, vol: 0.07, attack: 0.04, decay: 0.45, release: 0.8, body: 0.16, filter: 800 },
    chime(C5, 0, 0.15),
    chime(G5, 95, 0.14),
    chime(C6, 190, 0.12),
    { ...chime(E5, 300, 0.07), decay: 0.3, release: 0.9, filter: 3000 },
    { ...chime(A5, 380, 0.06), decay: 0.3, release: 1.0, filter: 3200 },
  ]);
}
