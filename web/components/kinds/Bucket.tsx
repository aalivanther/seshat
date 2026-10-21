"use client";

import { useState } from "react";
import type { BucketExercise } from "@/lib/types";
import { langConfig } from "@/lib/language";
import { sfxPop } from "@/lib/juice";
import type { KindProps } from "./shared";
import s from "./bucket.module.css";

/* ---------- Clasificar en dos cubetas (instrucción por procesamiento) ---------- */
export function Bucket({ ex, locked, onSubmit }: KindProps<BucketExercise>) {
  const [idx, setIdx] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [flash, setFlash] = useState<"ok" | "bad" | null>(null);
  const done = idx >= ex.items.length;

  function pick(b: number) {
    if (locked || done || flash) return;
    const item = ex.items[idx];
    const right = item.bucket === b;
    setFlash(right ? "ok" : "bad");
    if (right) sfxPop(); else setWrong((w) => w + 1);
    setTimeout(() => {
      setFlash(null);
      const next = idx + 1;
      setIdx(next);
      if (next >= ex.items.length) {
        const misses = wrong + (right ? 0 : 1);
        const allowed = Math.floor(ex.items.length / 4); // 1 desliz cada 4 no anula
        onSubmit({
          correct: misses <= allowed,
          almost: false,
          feedback: misses === 0 ? null : `${misses} ${misses === 1 ? "fallo" : "fallos"} de ${ex.items.length}.`,
          expected: ex.items.map((it) => `${it.text} → ${ex.categories[it.bucket]}`).join(" · "),
        });
      }
    }, right ? 260 : 650);
  }

  return (
    <div>
      <div className={s.bucketStage}>
        {!done && (
          <div
            key={idx}
            className={`${s.bucketItem} ${flash === "ok" ? s.bucketOk : ""} ${flash === "bad" ? s.bucketBad : ""}`}
            lang={langConfig().htmlLang}
          >
            {ex.items[idx].text}
            {flash === "bad" && (
              <span className={s.bucketFix}>→ {ex.categories[ex.items[idx].bucket]}</span>
            )}
          </div>
        )}
        {done && <div className={s.bucketItem}>Ronda completa</div>}
      </div>
      <p className={s.bucketCount} aria-live="polite">
        {Math.min(idx + 1, ex.items.length)}/{ex.items.length}
      </p>
      <div className={s.bucketRow} role="group" aria-label="Categorías">
        {ex.categories.map((c, i) => (
          <button
            key={c}
            className={s.bucketBtn}
            lang={langConfig().htmlLang}
            disabled={locked || done || flash !== null}
            onClick={() => pick(i)}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
