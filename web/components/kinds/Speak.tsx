"use client";

import { useState } from "react";
import type { SpeakExercise } from "@/lib/types";
import { speak, speakSlow } from "@/lib/tts";
import { langConfig } from "@/lib/language";
import { ok, type KindProps } from "./shared";
import s from "../ex.module.css";

/* ---------- Leer en voz alta (auto-evaluado) ---------- */
export function Speak({ ex, locked, onSubmit }: KindProps<SpeakExercise>) {
  const [phase, setPhase] = useState<"read" | "rate">("read");

  return (
    <div>
      <p className={s.question} lang={langConfig().htmlLang}>{ex.text}</p>
      <p className={s.phonetic}>suena como: {ex.phonetic}</p>
      {ex.translation && <p className={s.translation}>{ex.translation}</p>}
      <div style={{ marginTop: 16 }}>
        {phase === "read" ? (
          <div className={s.footer} style={{ justifyContent: "flex-start" }}>
            <button className={s.btnGhost} onClick={() => speak(ex.text)}>Escuchar modelo</button>
            <button className={s.btnGhost} onClick={() => speakSlow(ex.text)}>Despacio</button>
            <button className={s.btnPrimary} onClick={() => { speak(ex.text); setPhase("rate"); }}>
              Ya lo leí en voz alta
            </button>
          </div>
        ) : (
          <div>
            <p className={s.prompt}>¿Se parecía a lo que acabas de oír?</p>
            <div className={s.footer} style={{ justifyContent: "flex-start" }}>
              <button className={s.btnPrimary} disabled={locked} onClick={() => onSubmit(ok(ex.text))}>
                Bien, casi igual
              </button>
              <button
                className={s.btnGhost}
                disabled={locked}
                onClick={() =>
                  onSubmit({ correct: false, almost: true, feedback: "Sin problema: te la traemos de vuelta en el próximo repaso.", expected: ex.text })
                }
              >
                Aún me cuesta
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
