"use client";

import { useEffect, useState } from "react";
import type { ListenExercise } from "@/lib/types";
import { speak } from "@/lib/tts";
import { langConfig } from "@/lib/language";
import { Speaker } from "../Speaker";
import { TextAnswer, type KindProps } from "./shared";
import s from "../ex.module.css";

/* ---------- Dictado (escucha y escribe) ---------- */
export function Listen({ ex, locked, attempt, onSubmit }: KindProps<ListenExercise>) {
  const [revealed, setRevealed] = useState(false);

  // El aviso de «no hay voz» ya no vive aquí: lo pinta ExercisePlayer arriba de
  // la tarjeta, uno solo para todos los tipos de oído. Tenerlo por duplicado
  // era decirle lo mismo dos veces en la misma pantalla.
  useEffect(() => {
    const t = setTimeout(() => speak(ex.text), 400);
    return () => clearTimeout(t);
  }, [ex]);

  return (
    <div>
      <Speaker text={ex.text} label="Repetir audio" ariaLabel="Repetir audio" />
      {revealed && (
        <p className={s.question} lang={langConfig().htmlLang} style={{ marginTop: 12 }}>{ex.text}</p>
      )}
      {ex.translation && revealed && <p className={s.translation}>{ex.translation}</p>}
      <div style={{ marginTop: 8 }}>
        <TextAnswer
          locked={locked}
          attempt={attempt}
          accepted={[ex.text]}
          placeholder={revealed ? "Copia la frase con cuidado" : "Escribe exactamente lo que oyes"}
          // Un dictado se corrige por LO QUE SONÓ: si el audio dijo «I do not
          // know», «I don’t know» no es lo mismo aunque signifique igual.
          // Va cableado y no por contenido porque vale para los 29 dictados a la
          // vez, y porque un dictado permisivo con la forma escrita deja de ser
          // un dictado. El Umlaut, en cambio, sí lo decide cada ejercicio.
          gradeOpts={{ strictUmlaut: ex.strictUmlaut, strictContractions: true }}
          onSubmit={(r) =>
            onSubmit(
              revealed && r.correct
                ? { ...r, almost: true, feedback: r.feedback ?? "Bien copiado. Con la frase delante cuenta como acierto parcial." }
                : r,
            )
          }
        />
      </div>
      {!revealed && !locked && (
        <button
          className={s.btnGhost}
          style={{ marginTop: 8 }}
          onClick={() => setRevealed(true)}
        >
          Mostrar la frase (cuenta como pista)
        </button>
      )}
    </div>
  );
}
