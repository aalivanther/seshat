"use client";

import type { TypeExercise } from "@/lib/types";
import { TextAnswer, type KindProps } from "./shared";
import s from "../ex.module.css";

/* ---------- Traducción / respuesta escrita ---------- */
export function TypeEx({ ex, locked, attempt, onSubmit }: KindProps<TypeExercise>) {
  return (
    <div>
      <p className={s.question}>{ex.question}</p>
      <TextAnswer
        locked={locked}
        attempt={attempt}
        accepted={ex.answers}
        gradeOpts={{ strictUmlaut: ex.strictUmlaut, strictContractions: ex.strictContractions }}
        onSubmit={onSubmit}
      />
    </div>
  );
}
