"use client";

// Juice global: todo botón/enlace responde con un tic de lápiz al pulsarlo.
// Delegado en document — cero wiring por componente, throttle anti-metralleta.

import { useEffect } from "react";
import { preloadSfx, sfxNav, sfxTick, unlockAudio } from "@/lib/juice";

/* Sin tic de UI en dos familias:
   1) botones cuyo TRABAJO es reproducir audio (el sfx pisaría la voz),
   2) botones de RESPUESTA de ejercicio (su feedback sonoro ya es
      acierto/fallo/pop — un tic encima ensucia el momento) */
const AUDIO_CLASSES = /speakerBtn|playBtn|sayBtn|sayInline|sfxToggle|phraseCard|toolBtn|option|matchBtn|token|rfBtn|charBtn/;

export function JuiceListener() {
  useEffect(() => {
    preloadSfx(); // el contexto nace suspendido; el primer gesto lo despierta
    let last = 0;
    const onDown = (e: PointerEvent) => {
      unlockAudio(); // iOS: resume() solo vale dentro del gesto
      const el = (e.target as Element | null)?.closest?.("button, a, [role=button]");
      if (!el || (el as HTMLButtonElement).disabled) return;
      // exclusiones: botones de audio (por clase o data-sfx="off")
      if (el.closest('[data-sfx="off"]')) return;
      if (AUDIO_CLASSES.test((el as HTMLElement).className ?? "")) return;
      const now = performance.now();
      if (now - last < 70) return;
      last = now;
      // semántica: enlaces/tarjetas navegan (hoja que pasa); botones actúan (tic)
      if (el.tagName === "A") sfxNav();
      else sfxTick();
    };
    document.addEventListener("pointerdown", onDown, { passive: true });
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);
  return null;
}
