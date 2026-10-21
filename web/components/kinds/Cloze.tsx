"use client";

import type { ClozeExercise } from "@/lib/types";
import { langConfig } from "@/lib/language";
import { useTargetVoice } from "@/lib/useTargetVoice";
import { Speaker } from "../Speaker";
import { TextAnswer, type KindProps } from "./shared";
import s from "../ex.module.css";

/* ---------- Cloze ---------- */
export function Cloze({ ex, locked, attempt, onSubmit }: KindProps<ClozeExercise>) {
  const voiceReady = useTargetVoice();
  const hasGap = ex.text.includes("___");
  const [before, after] = hasGap ? ex.text.split("___") : [ex.text + " ", ""];
  return (
    <div>
      <p className={s.question} lang={langConfig().htmlLang}>
        {before}
        <span style={{ borderBottom: "2px solid var(--accent)", padding: "0 24px" }}>
          <span className="srOnly">(hueco)</span>
        </span>
        {after}
      </p>
      {ex.translation && <p className={s.translation}>{ex.translation}</p>}
      {locked && hasGap && voiceReady && (
        <Speaker
          text={ex.text.replace("___", ex.answers[0])}
          label="Escuchar la frase"
          ariaLabel="Escuchar la frase completa"
        />
      )}
      <div style={{ marginTop: 16 }}>
        <TextAnswer
          locked={locked}
          attempt={attempt}
          accepted={ex.answers}
          placeholder="Lo que va en el hueco"
          gradeOpts={{ strictUmlaut: ex.strictUmlaut, strictContractions: ex.strictContractions }}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}
