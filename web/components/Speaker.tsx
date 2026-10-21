"use client";

import { SpeakerHigh, Timer } from "@phosphor-icons/react";
import { speak, speakSlow } from "@/lib/tts";
import s from "./ex.module.css";

export function Speaker({ text, label, ariaLabel }: { text: string; label?: string; ariaLabel?: string }) {
  return (
    <span className={s.audioRow}>
      <button type="button" data-sfx="off" className={s.speakerBtn} onClick={() => speak(text)} aria-label={ariaLabel ?? `Escuchar: ${text}`}>
        <SpeakerIcon /> {label ?? "Escuchar"}
      </button>
      <button type="button" data-sfx="off" className={s.speakerBtn} onClick={() => speakSlow(text)} aria-label="Escuchar despacio">
        <Timer size={17} weight="duotone" aria-hidden /> Despacio
      </button>
    </span>
  );
}

export function SpeakerIcon() {
  return <SpeakerHigh size={17} weight="duotone" aria-hidden />;
}
