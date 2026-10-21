"use client";

// Sin reloj y sin audio: partir esto no mueve escuchas ni el cronómetro.
// El css de los anuncios no lo usa ningún otro ítem, así que se va con él.

import type { LesenAds } from "@/lib/examTypes";
import { langConfig } from "@/lib/language";
import { NextBtn } from "./shared";
import s from "../exam.module.css";
import a from "./lesenads.module.css";

export function LesenAdsItem({
  item,
  answer,
  setAnswer,
  onNext,
}: {
  item: LesenAds;
  answer: Record<string, unknown>;
  setAnswer: (id: string, v: unknown) => void;
  onNext: () => void;
}) {
  const picked = answer[item.id] as "a" | "b" | undefined;
  return (
    <div>
      <p className={s.question} lang={langConfig().htmlLang}>{item.situation}</p>
      <p className={s.questionEs}>{item.situationEs}</p>
      <div className={a.adGrid}>
        {(["a", "b"] as const).map((letter) => (
          <button
            key={letter}
            lang={langConfig().htmlLang}
            className={`${a.adCard} ${picked === letter ? a.adPicked : ""}`}
            onClick={() => setAnswer(item.id, letter)}
          >
            <span className={a.adLetter}>{letter})</span>
            {"\n"}
            {letter === "a" ? item.adA : item.adB}
          </button>
        ))}
      </div>
      <NextBtn ready={picked !== undefined} onNext={onNext} onBlank={onNext} />
    </div>
  );
}
