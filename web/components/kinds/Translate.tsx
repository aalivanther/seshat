"use client";

import { useEffect, useRef, useState } from "react";
import type { TranslateExercise } from "@/lib/types";
import { gradeText } from "@/lib/grade";
import { langConfig } from "@/lib/language";
import { Speaker } from "../Speaker";
import type { KindProps } from "./shared";
import s from "../ex.module.css";

/* ---------- TRANSLATE: traducir en los dos sentidos ---------- */
// Hacia el idioma es producción pura —nada que reconocer, todo que recordar— y
// desde el idioma comprueba que se ha entendido, no que se ha adivinado por el
// contexto. La corrección hacia el ESPAÑOL es a propósito más tolerante: lo que
// se mide es la comprensión, no la puntería con las tildes.
export function Translate({ ex, locked, attempt, onSubmit }: KindProps<TranslateExercise>) {
  const toTarget = ex.direction === "toTarget";
  const [text, setText] = useState("");
  useEffect(() => setText(""), [ex.id]);

  const [sent, setSent] = useState(false);
  const lastSent = useRef<string | null>(null);
  useEffect(() => { setSent(false); }, [attempt]);

  function check() {
    // misma guarda que el resto: un Enter mantenido no quema el 2º intento
    if (locked || sent) return;
    if (attempt > 0 && text === lastSent.current) return;
    lastSent.current = text;
    setSent(true);
    // Hacia el ESPAÑOL no se exige el Umlaut de nada (no hay), y el corrector
    // ya perdona tildes y puntuación: lo que se mide es si ha entendido.
    // La contracción tampoco se exige por defecto —«I don't know» y «I do not
    // know» son la misma traducción— pero el ejercicio que enseñe justo esa
    // diferencia puede pedirlo con strictContractions.
    const r = gradeText(text, ex.answers, { strictContractions: ex.strictContractions });
    onSubmit({ ...r, expected: ex.answers[0] });
  }

  return (
    <div>
      <p className={s.question}>
        {toTarget ? "Tradúcelo al idioma que estudias" : "Tradúcelo al español"}
      </p>
      <p
        className={s.transformSource}
        lang={toTarget ? "es" : langConfig().htmlLang}
      >
        {ex.source}
        {!toTarget && <Speaker text={ex.source} />}
      </p>
      {ex.hint && <p className={s.tip}>Pista: {ex.hint}</p>}
      <input
        className={s.input}
        value={text}
        lang={toTarget ? langConfig().htmlLang : "es"}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        placeholder={toTarget ? "Escríbelo en el idioma…" : "Escríbelo en español…"}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && check()}
        disabled={locked}
      />
      <div className={s.footer}>
        <button className={s.btnPrimary} onClick={check} disabled={locked || !text.trim()}>
          Comprobar
        </button>
      </div>
    </div>
  );
}
