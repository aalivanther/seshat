"use client";

// Vive aparte porque su CSS no lo usa ningún otro tipo. Match no: Fastmatch
// pinta con las mismas clases, y sacarlo solo dejaría el reloj sin estilo.

import { useEffect, useMemo, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { OrderExercise } from "@/lib/types";
import type { GradeResult } from "@/lib/grade";
import type { KindProps } from "../ExerciseKinds";
import { langConfig } from "@/lib/language";
import { sfxPop } from "@/lib/juice";
import shared from "../ex.module.css";
import s from "./order.module.css";

/** Mismo LCG que `seededOrder`. Si la historia sale ya en orden, se cruzan
 *  las dos primeras: un ejercicio de ordenar no puede empezar resuelto. */
export function barajaOrden(id: string, n: number): number[] {
  const idxs = Array.from({ length: n }, (_, i) => i);
  let seed = 0;
  for (const c of id) seed = (seed * 31 + c.charCodeAt(0)) >>> 0;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 2 ** 32;
  };
  for (let i = idxs.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [idxs[i], idxs[j]] = [idxs[j], idxs[i]];
  }
  if (idxs.every((v, i) => v === i)) [idxs[0], idxs[1]] = [idxs[1], idxs[0]];
  return idxs;
}

/** La posición i tiene que ser la oración i. No hay «casi»: o es ese orden o no. */
export function notaOrden(placed: number[], sentences: string[]): GradeResult {
  const correct = placed.every((orig, pos) => orig === pos);
  return {
    correct,
    almost: false,
    feedback: correct ? null : "El orden correcto está abajo — léelo en voz alta una vez.",
    expected: sentences.join(" → "),
  };
}

/* ---------- Ordenar la historia (secuenciación narrativa) ---------- */
export function Order({ ex, locked, attempt, onSubmit }: KindProps<OrderExercise>) {
  const shuffled = useMemo(() => barajaOrden(ex.id, ex.sentences.length), [ex]);
  const [placed, setPlaced] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  // El botón vuelve a estar vivo en cada intento, pero las fichas colocadas se
  // quedan: en un ejercicio de orden, corregir una pieza es el ejercicio —
  // devolverlas todas al montón obliga a repetir lo que ya estaba bien.
  useEffect(() => { setSubmitted(false); }, [attempt]);
  useEffect(() => { setPlaced([]); }, [ex.id]);
  const [trayRef] = useAutoAnimate<HTMLDivElement>({ duration: 150 });
  const [poolRef] = useAutoAnimate<HTMLDivElement>({ duration: 150 });

  function submit() {
    if (locked || submitted) return;
    setSubmitted(true);
    onSubmit(notaOrden(placed, ex.sentences));
  }

  return (
    <div>
      {ex.translation && <p className={shared.translation}>{ex.translation}</p>}
      <div ref={trayRef} className={s.orderTray}>
        {placed.length === 0 && <span className={s.tokenAreaEmpty}>Toca las oraciones en el orden en que pasaron</span>}
        {placed.map((orig, pos) => (
          <button
            key={orig}
            className={s.orderLine}
            lang={langConfig().htmlLang}
            disabled={locked || submitted}
            onClick={() => setPlaced(placed.filter((p) => p !== orig))}
          >
            <span className={`${s.orderNum} num`}>{pos + 1}</span> {ex.sentences[orig]}
          </button>
        ))}
      </div>
      <div ref={poolRef} className={s.orderPool}>
        {shuffled.filter((i) => !placed.includes(i)).map((i) => (
          <button
            key={i}
            className={s.orderCard}
            lang={langConfig().htmlLang}
            disabled={locked || submitted}
            onClick={() => { sfxPop(); setPlaced([...placed, i]); }}
          >
            {ex.sentences[i]}
          </button>
        ))}
      </div>
      <div className={shared.footer}>
        <button className={shared.btnGhost} onClick={() => setPlaced([])} disabled={locked || submitted || placed.length === 0}>
          Reiniciar
        </button>
        <button className={shared.btnPrimary} onClick={submit} disabled={locked || submitted || placed.length !== ex.sentences.length}>
          Comprobar
        </button>
      </div>
    </div>
  );
}
