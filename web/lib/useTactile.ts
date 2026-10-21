"use client";

/* Capa táctil global: que pulsar CUALQUIER cosa de la app se sienta.
 *
 * Antes cada componente tenía que acordarse de llamar al sonido a mano, así
 * que casi ninguno lo hacía: los botones más pulsados de todos —las opciones
 * de un ejercicio, las fichas, los botones de examen— estaban además en una
 * lista de exclusión pensada para los botones de voz y se los llevaba por
 * delante. Aquí se escucha el documento una sola vez, en fase de captura, y se
 * deduce del propio elemento QUÉ gesto es: no es lo mismo pasar de página que
 * elegir una opción, colocar una ficha o enviar la respuesta.
 *
 * Se suena en `pointerdown`, no en `click`: entre uno y otro hay entre 50 y
 * 150 ms y el oído los separa perfectamente. Un sonido que llega después del
 * dedo se percibe como pereza de la app.
 */

import { useEffect } from "react";
import {
  buzz,
  markGestureVoiced,
  sfxBack,
  sfxLift,
  sfxNav,
  sfxPlace,
  sfxSelect,
  sfxSubmit,
  sfxSwitch,
  sfxTick,
  unlockAudio,
} from "./juice";

/** Los gestos que la app sabe sonar. `off` es «aquí no suena nada». */
export type Gesture = "off" | "nav" | "back" | "tick" | "select" | "place" | "lift" | "submit" | "switch";

/* Vibración por gesto, en milisegundos. Todas por debajo de 16 ms: en un
   móvil eso es un golpecito, no un zumbido. Colocar una ficha vibra un pelín
   más porque es el único gesto con «peso» físico. */
const BUZZ: Record<Gesture, number> = {
  off: 0,
  nav: 7,
  back: 7,
  tick: 9,
  select: 11,
  place: 15,
  lift: 7,
  submit: 12,
  switch: 10,
};

/* Botones cuyo TRABAJO es reproducir audio: el sfx pisaría la voz. */
const MUDOS = [
  "speakerBtn", "playBtn", "sayBtn", "sayInline", "phraseSound", "verbSound",
  "phraseAudio", "btnEscuchar", "phraseCard", "toolBtn", "lineSpeak", "escapedRow",
];

/* El interruptor de sonido se suena a sí mismo (necesita saber el estado
   NUEVO, que aquí todavía no existe). */
const PROPIOS = ["sfxToggle"];

/* Elegir entre alternativas: opciones, tarjetas de emparejar, teclas de
   caracteres, autoevaluación del examen, pestañas... Todo esto estaba mudo. */
const ELEGIR = [
  "option", "opcion", "opt", "matchBtn", "matchAd", "rfBtn", "charBtn", "bucketBtn",
  "keyBtn", "bandBtn", "adCard", "variantBtn", "gapSlot", "colorOpt", "avatarOpt",
  "folderTab", "langTab", "typeChip",
];

/* Cerrar la respuesta: el botón que la manda a corregir. */
const ENVIAR = ["btnPrimary", "sendBtn"];

/* Salir o cerrar. */
const VOLVER = ["closeBtn", "dialogClose"];

/* Bandeja (lo ya colocado: al tocar se RETIRA) y mazo (al tocar se COLOCA).
   Se mira el contenedor y no la ficha porque en varias pantallas la ficha
   lleva la misma clase en los dos sitios. */
const BANDEJAS = ["tokenArea", "orderTray", "fichasMontaje"];
const MAZOS = ["tokenPool", "orderPool", "fichasPool"];

const TEXTO_VOLVER = /^(volver|atr[aá]s|cerrar|cancelar|salir|no,)/i;

/* Hay botones de voz con clase genérica («Escuchar modelo» es un btnGhost como
   cualquier otro). Por el texto se les reconoce igual, y así no hace falta
   marcarlos uno a uno en cada pantalla. */
const TEXTO_VOZ = /^(escuchar|o[ií]r|despacio|m[aá]s despacio|reproducir|volver a o[ií]r|▸)/i;

/* Los nombres de CSS Modules llegan como `ex-module__H4SH__option`: interesa
   el último tramo, que es el nombre que se escribió en el .module.css. */
function nombresLocales(el: Element): string[] {
  const raw = typeof el.className === "string" ? el.className : "";
  return raw
    .split(/\s+/)
    .filter(Boolean)
    .map((c) => {
      const i = c.lastIndexOf("__");
      return i >= 0 ? c.slice(i + 2) : c;
    });
}

/* `optionRight` y `optionPicked` son la misma familia que `option`: basta con
   que el nombre empiece igual y no continúe en minúscula. */
function pertenece(nombres: string[], familia: string[]): boolean {
  return nombres.some((n) =>
    familia.some((f) => n === f || (n.startsWith(f) && n[f.length] === n[f.length]?.toUpperCase())),
  );
}

function esGesto(v: string): v is Gesture {
  return ["off", "nav", "back", "tick", "select", "place", "lift", "submit", "switch"].includes(v);
}

/** Qué gesto es pulsar este elemento. Exportada para poder probarla sola. */
export function gestureFor(el: Element): Gesture {
  // 1. lo que diga el marcado gana siempre
  const marcado = el.closest("[data-sfx]");
  if (marcado) {
    const v = marcado.getAttribute("data-sfx") ?? "";
    if (esGesto(v)) return v;
  }

  const nombres = nombresLocales(el);
  if (pertenece(nombres, MUDOS) || pertenece(nombres, PROPIOS)) return "off";

  // 2. fichas: el contenedor dice si se coloca o si se retira
  if (el.closest(BANDEJAS.map((c) => `[class*="${c}"]`).join(","))) return "lift";
  if (el.closest(MAZOS.map((c) => `[class*="${c}"]`).join(","))) return "place";

  // 3. familias de control. Las opciones van ANTES que el texto: una opción de
  // ejercicio puede empezar por «Escuchar...» y no por eso es un altavoz.
  if (pertenece(nombres, ELEGIR)) return "select";

  const etiqueta = `${el.getAttribute("aria-label") ?? ""} ${(el.textContent ?? "").trim().slice(0, 24)}`.trim();
  if (TEXTO_VOZ.test(etiqueta)) return "off";

  if (pertenece(nombres, ENVIAR)) return "submit";
  if (pertenece(nombres, VOLVER)) return "back";

  // 4. semántica del propio elemento
  if (TEXTO_VOLVER.test(etiqueta)) return "back";
  if (el.getAttribute("role") === "switch" || el.hasAttribute("aria-pressed")) return "switch";
  if (el.tagName === "A") return "nav";
  if (el.getAttribute("type") === "submit") return "submit";
  return "tick";
}

function suena(g: Gesture, el: Element): void {
  switch (g) {
    case "nav": return sfxNav();
    case "back": return sfxBack();
    case "select": return sfxSelect();
    case "place": return sfxPlace();
    case "lift": return sfxLift();
    case "submit": return sfxSubmit();
    // en pointerdown el estado todavía es el viejo: se anuncia el que viene
    case "switch": return sfxSwitch(el.getAttribute("aria-pressed") !== "true");
    default: return sfxTick();
  }
}

/* Dos pulsaciones a menos de 55 ms son un rebote o un doble toque: sonarlas
   las dos produce el efecto metralleta que se quería evitar. */
const REBOTE_MS = 55;

let instalado = false;

/** Engancha la capa táctil al documento. Idempotente: la llama `preloadSfx`. */
export function installTactile(): void {
  if (instalado || typeof document === "undefined") return;
  instalado = true;

  let ultimo = 0;
  let ultimoPuntero = -Infinity;

  function responde(e: Event): void {
    const destino = e.target;
    if (!(destino instanceof Element)) return;
    const el = destino.closest("button, a, [role=button], [role=switch], [role=option], summary");
    if (!el) return;

    const inerte = (el instanceof HTMLButtonElement && el.disabled) || el.getAttribute("aria-disabled") === "true";
    const g = inerte ? "off" : gestureFor(el);
    if (g === "off") {
      // se marca IGUAL: es la forma de decirle a cualquier otro oyente de este
      // mismo gesto que aquí se ha decidido callar, y que no ponga un tic
      markGestureVoiced(g);
      return;
    }

    const ahora = performance.now();
    if (ahora - ultimo < REBOTE_MS) return;
    ultimo = ahora;

    suena(g, el);
    // que los oyentes de este mismo gesto no repitan el sonido
    markGestureVoiced(g);
    vibra(g);
  }

  function alPulsar(e: PointerEvent): void {
    unlockAudio(); // el resume solo vale dentro del gesto: primero esto
    ultimoPuntero = performance.now();
    responde(e);
  }

  /* Enter y barra espaciadora sobre un botón no generan pointerdown: sin esto
     quien navega con el teclado no oía absolutamente nada. `detail === 0`
     distingue esa activación de un clic de ratón, que ya sonó en pointerdown.
     Y si acaba de haber un puntero es que ese click viene del mismo dedo (o de
     un `.click()` disparado por el propio componente): ese ya sonó. */
  function alActivar(e: MouseEvent): void {
    unlockAudio();
    if (e.detail !== 0 || performance.now() - ultimoPuntero < 700) return;
    responde(e);
  }

  document.addEventListener("pointerdown", alPulsar, { capture: true, passive: true });
  document.addEventListener("click", alActivar, { capture: true, passive: true });
  // teclado y toques: cualquier gesto sirve para despertar el audio
  document.addEventListener("keydown", unlockAudio, { capture: true, passive: true });
  document.addEventListener("touchend", unlockAudio, { capture: true, passive: true });
}

/* La vibración es la mitad de la sensación en móvil, donde no hay recorrido de
   tecla que la sustituya. Calla con el interruptor de sonido y con
   reduced-motion, que en un teléfono también quiere decir «no me sacudas». */
function vibra(g: Gesture): void {
  const ms = BUZZ[g];
  // `buzz` es quien mira el interruptor y reduced-motion: una sola puerta
  if (ms) buzz(ms);
}

/** Versión hook, por si algún día se prefiere montarla desde un componente. */
export function useTactile(): void {
  useEffect(() => installTactile(), []);
}
