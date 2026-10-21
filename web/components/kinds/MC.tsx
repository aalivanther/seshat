"use client";

import { useState } from "react";
import type { MCExercise } from "@/lib/types";
import { speak } from "@/lib/tts";
import { langConfig } from "@/lib/language";
import { useTargetVoice } from "@/lib/useTargetVoice";
import { Speaker, SpeakerIcon } from "../Speaker";
import { seededOrder, ok, fail, isVocabTarget, type KindProps } from "./shared";
import s from "../ex.module.css";

/* ---------- Opción múltiple ---------- */
export function MC({ ex, locked, onSubmit }: KindProps<MCExercise>) {
  const [picked, setPicked] = useState<number | null>(null);
  // voz como estado (no en render): el HTML del servidor y el cliente coinciden
  const voiceReady = useTargetVoice();
  // TODAS las palabras del idioma citadas en «» se pueden escuchar — una pregunta
  // que compara dos («isst» o «ist») necesita bocina para cada una
  const quoted = voiceReady
    ? [...ex.question.matchAll(/«([^»]+)»/g)].map((m) => m[1]).filter(isVocabTarget).slice(0, 3)
    : [];

  function choose(i: number) {
    if (locked || picked !== null) return;
    setPicked(i);
    const right = i === ex.answer;
    onSubmit(
      right
        ? ok(ex.options[ex.answer])
        : fail(ex.options[ex.answer], ex.whyWrong?.[i] ?? null),
    );
  }

  return (
    <div>
      <p className={s.question}>{ex.question}</p>
      {quoted.length === 1 && <Speaker text={quoted[0]} ariaLabel={`Escuchar: ${quoted[0]}`} />}
      {quoted.length > 1 && (
        <span className={s.audioRow}>
          {quoted.map((q) => (
            <button key={q} type="button" className={s.speakerBtn} onClick={() => speak(q)} aria-label={`Escuchar: ${q}`}>
              <SpeakerIcon /> <span lang={langConfig().htmlLang}>{q}</span>
            </button>
          ))}
        </span>
      )}
      <div className={s.options} role="group" aria-label="Opciones de respuesta">
        {seededOrder(ex.id, ex.options.length).map((i) => {
          const o = ex.options[i];
          let cls = s.option;
          if (picked !== null) {
            if (i === ex.answer) cls += " " + s.optionRight;
            else if (i === picked) cls += " " + s.optionWrong;
          }
          return (
            <button
              key={i}
              className={cls}
              disabled={locked || picked !== null}
              aria-pressed={picked === i}
              onClick={() => choose(i)}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}
