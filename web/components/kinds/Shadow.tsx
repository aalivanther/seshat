"use client";

import { useState } from "react";
import type { ShadowExercise } from "@/lib/types";
import { speakLong } from "@/lib/tts";
import { langConfig } from "@/lib/language";
import { ok, type KindProps } from "./shared";
import s from "../ex.module.css";

/* ---------- Sombreado (shadow): repite pegándote al audio ---------- */
// Hamada: el sombreado afina la decodificación bottom-up del habla conectada.
// Pasada 1 despacio (0.75×), luego a velocidad real; autoevaluado como speak —
// por eso JAMÁS aparece en retos (no puede costar vidas con justicia).
export function Shadow({ ex, locked, onSubmit }: KindProps<ShadowExercise>) {
  const reps = ex.reps ?? 2;
  const [pass, setPass] = useState(0); // pasadas hechas
  const [phase, setPhase] = useState<"shadowing" | "rate">("shadowing");

  function playPass() {
    // Primera pasada despacio; las siguientes a velocidad real. Va por
    // `speakLong` y no por `speak`/`speakSlow` porque este es el ÚNICO tipo en
    // el que el alumno tiene que ir pegado al audio de principio a fin: si
    // Chrome enmudece a los ~15 segundos —su bug de siempre con las colas
    // largas—, el alumno se queda hablando solo y encima cree que falló él.
    // `speakLong` trocea por frases y mantiene vivo al sintetizador con su
    // pause/resume. Los `rate` son los de antes (0.65 y 0.9), para que el
    // ejercicio suene exactamente igual que hasta hoy.
    speakLong(ex.text, { rate: pass === 0 ? 0.65 : 0.9 });
    setPass((p) => p + 1);
  }

  return (
    <div>
      <p className={s.question} lang={langConfig().htmlLang}>{ex.text}</p>
      {ex.phonetic && <p className={s.phonetic}>suena como: {ex.phonetic}</p>}
      {ex.translation && <p className={s.translation}>{ex.translation}</p>}
      {phase === "shadowing" ? (
        <div style={{ marginTop: 16 }}>
          <p className={s.prompt}>
            En voz alta, pegado al audio, sin esperar a que termine —{" "}
            {pass === 0 ? "esta primera va despacio" : `pasada ${Math.min(pass + 1, reps)} de ${reps}, a velocidad real`}.
          </p>
          <div className={s.footer} style={{ justifyContent: "flex-start" }}>
            <button className={s.btnPrimary} onClick={playPass}>
              {pass === 0 ? "Sombrear (despacio)" : "Otra pasada (1×)"}
            </button>
            {pass >= reps && (
              <button className={s.btnPrimary} onClick={() => setPhase("rate")}>
                Ya lo sombreé
              </button>
            )}
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 16 }}>
          <p className={s.prompt}>¿Conseguiste ir pegado al audio, sin quedarte atrás?</p>
          <div className={s.footer} style={{ justifyContent: "flex-start" }}>
            <button className={s.btnPrimary} disabled={locked} onClick={() => onSubmit(ok(ex.text))}>
              Sí, fui a su ritmo
            </button>
            <button
              className={s.btnGhost}
              disabled={locked}
              onClick={() =>
                onSubmit({ correct: false, almost: true, feedback: "Normal: el oído va por delante de la boca. Volverás a verla.", expected: ex.text })
              }
            >
              Me perdí a mitad
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
