"use client";

// Silencio a mano en pantallas inmersivas: la top bar (con el toggle de /perfil)
// se oculta ahí, y nadie debería abandonar una lección para callar la app.

import { useEffect, useState } from "react";
import { SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import { buzz, onSfxChange, setSfxEnabled, sfxEnabled, sfxSwitch, unlockAudio } from "@/lib/juice";
import s from "./ex.module.css";

export function SfxToggle() {
  const [on, setOn] = useState(true);

  useEffect(() => {
    setOn(sfxEnabled());
    // hay otro interruptor en /perfil: si se mueve allí, este se entera
    return onSfxChange(setOn);
  }, []);

  return (
    <button
      type="button"
      className={s.sfxToggle}
      /* la capa táctil no lo toca: el sonido correcto depende del estado NUEVO,
         que en pointerdown todavía no existe */
      data-sfx="off"
      aria-pressed={on}
      aria-label={on ? "Silenciar sonidos de la app" : "Activar sonidos de la app"}
      title={on ? "Silenciar sonidos" : "Activar sonidos"}
      onClick={() => {
        const v = !on;
        // este clic es el gesto que despierta el audio: si es el primero de la
        // sesión, sin esto el «sonidos activados» se lo tragaría el navegador
        unlockAudio();
        // al apagar, la despedida va ANTES de guardar: después ya no suena ni
        // vibra nada, que es justo lo que se acaba de pedir
        if (!v) {
          sfxSwitch(false);
          buzz(10);
        }
        setSfxEnabled(v);
        setOn(v);
        if (v) sfxSwitch(true);
      }}
    >
      {on ? <SpeakerHigh size={18} weight="duotone" aria-hidden /> : <SpeakerSlash size={18} weight="duotone" aria-hidden />}
    </button>
  );
}
