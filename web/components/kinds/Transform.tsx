"use client";

// transformSource lo usa también Translate. La etiqueta de la instrucción es solo de este tipo.

import type { TransformExercise } from "@/lib/types";
import { speak } from "@/lib/tts";
import { langConfig } from "@/lib/language";
import { useTargetVoice } from "@/lib/useTargetVoice";
import { SpeakerIcon } from "../Speaker";
import { TextAnswer, type KindProps } from "./shared";
import shared from "../ex.module.css";
import s from "./transform.module.css";

/* ---------- Transformar la frase (output forzado: Präsens→Perfekt, etc.) ---------- */
export function Transform({ ex, locked, attempt, onSubmit }: KindProps<TransformExercise>) {
  const voiceReady = useTargetVoice();
  return (
    <div>
      <div className={shared.transformSource}>
        <span className={s.transformLabel}>{ex.instruction}</span>
        <p className={shared.question} lang={langConfig().htmlLang} style={{ marginBottom: 0 }}>
          {ex.source}
          {voiceReady && (
            <button type="button" data-sfx="off" className={shared.speakerBtn} style={{ marginLeft: 10 }} onClick={() => speak(ex.source)} aria-label={`Escuchar: ${ex.source}`}>
              <SpeakerIcon />
            </button>
          )}
        </p>
      </div>
      {ex.translation && <p className={shared.translation}>{ex.translation}</p>}
      <div style={{ marginTop: 16 }}>
        <TextAnswer
          locked={locked}
          attempt={attempt}
          accepted={ex.answers}
          placeholder="Escríbela transformada..."
          gradeOpts={{ strictUmlaut: ex.strictUmlaut, strictContractions: ex.strictContractions }}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}
