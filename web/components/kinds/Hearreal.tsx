"use client";

// hearrealReveal, la fila y la etiqueta las reutilizan write, audiomc, paraphrase y monologue. La hoja sigue compartida.

import { useEffect, useMemo, useState } from "react";
import type { HearrealExercise } from "@/lib/types";
import { speak } from "@/lib/tts";
import { langConfig } from "@/lib/language";
import { shuffle } from "@/lib/shuffle";
import { Speaker } from "../Speaker";
import type { KindProps } from "./shared";
import s from "../ex.module.css";

/* ---------- Hearreal: ¿libro o calle? ---------- */
// No es oído fonético: la misma voz lee una grafía u otra, a la misma
// velocidad, y lo que se distingue es el registro escrito. El azar va en el
// efecto (regla #418), no al pintar. Al responder, las dos quedan visibles
// con su bocina para comparar esas lecturas.
export function Hearreal({ ex, locked, onSubmit }: KindProps<HearrealExercise>) {
  const ask = ex.ask ?? "which";
  const [played, setPlayed] = useState<"book" | "real" | null>(null);
  const [chosen, setChosen] = useState<number | null>(null);

  useEffect(() => {
    const pick = Math.random() < 0.5 ? "book" : "real";
    setPlayed(pick);
    const t = setTimeout(() => speak(pick === "book" ? ex.book : ex.real), 400);
    return () => clearTimeout(t);
  }, [ex]);

  // ask:"meaning": la primera opción es la correcta; se barajan al montar
  const meanings = useMemo(
    () => (ex.meaningOptions?.length ? shuffle(ex.meaningOptions) : []),
    [ex],
  );

  if (!played) return null;
  const playedText = played === "book" ? ex.book : ex.real;

  function answerWhich(guess: "book" | "real", idx: number) {
    setChosen(idx);
    onSubmit({
      correct: guess === played,
      almost: false,
      feedback:
        guess === played
          ? played === "real"
            ? "Sí — eso fue la calle. Ya la reconoces: no necesitas decirla."
            : "Sí — esa fue la versión del libro, clarita."
          : `Sonó ${played === "real" ? "la de la calle" : "la del libro"} — escucha las dos abajo y compáralas.`,
      expected: playedText,
    });
  }

  function answerMeaning(opt: string, idx: number) {
    setChosen(idx);
    const right = ex.meaningOptions?.[0] === opt;
    onSubmit({
      correct: right,
      almost: false,
      feedback: right ? "Eso es — el significado manda, venga del libro o de la calle." : null,
      expected: ex.meaningOptions?.[0] ?? "",
    });
  }

  return (
    <div>
      <div className={s.footer} style={{ justifyContent: "flex-start", marginBottom: 12 }}>
        <button className={s.btnGhost} onClick={() => speak(playedText)} disabled={locked}>
          Escuchar otra vez
        </button>
      </div>
      {ask === "which" ? (
        <div className={s.options} role="group" aria-label="¿Cuál oíste?">
          {([["book", "Como el libro"], ["real", "Como se dice en la calle"]] as const).map(([k, label], i) => (
            <button
              key={k}
              className={`${s.option} ${locked && chosen === i ? (k === played ? s.optionRight : s.optionWrong) : ""} ${locked && k === played ? s.optionRight : ""}`}
              disabled={locked}
              onClick={() => answerWhich(k, i)}
            >
              {label}
            </button>
          ))}
        </div>
      ) : (
        <div className={s.options} role="group" aria-label="¿Qué significa?">
          {meanings.map((m, i) => (
            <button
              key={m}
              className={`${s.option} ${locked ? (m === ex.meaningOptions?.[0] ? s.optionRight : chosen === i ? s.optionWrong : "") : ""}`}
              disabled={locked}
              onClick={() => answerMeaning(m, i)}
            >
              {m}
            </button>
          ))}
        </div>
      )}
      {locked && (
        <div className={s.hearrealReveal}>
          <div className={s.hearrealRow}>
            <span className={s.hearrealTag}>libro</span>
            <span lang={langConfig().htmlLang}>{ex.book}</span>
            <Speaker text={ex.book} />
          </div>
          <div className={s.hearrealRow}>
            <span className={s.hearrealTag}>calle</span>
            <span lang={langConfig().htmlLang}>{ex.real}</span>
            <Speaker text={ex.real} />
          </div>
          <p className={s.translation}>{ex.translation}</p>
        </div>
      )}
    </div>
  );
}
