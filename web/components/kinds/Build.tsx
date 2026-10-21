"use client";

import { useEffect, useMemo, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { BuildExercise } from "@/lib/types";
import { gradeText } from "@/lib/grade";
import { langConfig } from "@/lib/language";
import { sfxPop } from "@/lib/juice";
import type { KindProps } from "./shared";
import shared from "../ex.module.css";
import s from "./build.module.css";

/** Mismo LCG que `seededOrder`. Si las fichas salen en el orden de la frase,
 *  se cruzan las dos primeras: construir no puede empezar ya resuelto.
 *  Con una sola ficha no hay par que cruzar. */
export function barajaConstruccion(id: string, n: number): number[] {
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
  if (n >= 2 && idxs.every((v, i) => v === i)) [idxs[0], idxs[1]] = [idxs[1], idxs[0]];
  return idxs;
}

/* ---------- Construir frase ---------- */
export function Build({ ex, locked, attempt, onSubmit }: KindProps<BuildExercise>) {
  const tokens = useMemo(() => {
    const words = [...ex.target.replace(/[?.!,]/g, "").split(/\s+/), ...(ex.distractors ?? [])];
    // La clave es el índice de origen: al devolver una ficha, vuelve a su sitio
    // del montón aunque el alumno haya colocado las demás.
    return barajaConstruccion(ex.id, words.length).map((i) => ({ w: words[i], key: i }));
  }, [ex]);

  const [placed, setPlaced] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  // las fichas se reordenan con física propia (AutoAnimate) al colocarse
  const [trayRef] = useAutoAnimate<HTMLDivElement>({ duration: 150 });
  const [poolRef] = useAutoAnimate<HTMLDivElement>({ duration: 150 });

  // El botón vuelve a estar vivo en cada intento, pero las fichas colocadas se
  // quedan: en un ejercicio de orden, corregir una pieza es el ejercicio —
  // devolverlas todas al montón obliga a repetir lo que ya estaba bien.
  useEffect(() => { setSubmitted(false); }, [attempt]);
  useEffect(() => { setPlaced([]); }, [ex.id]);

  function submit() {
    if (locked || submitted) return;
    const attemptStr = placed.map((k) => tokens.find((t) => t.key === k)!.w).join(" ");
    const targetClean = ex.target.replace(/[?.!,]/g, "");
    // órdenes alternativos igual de correctos con las mismas fichas (inversión)
    const alts = (ex.altTargets ?? []).flatMap((t) => [t.replace(/[?.!,]/g, ""), t]);
    const r = gradeText(attemptStr, [targetClean, ex.target, ...alts]);
    r.expected = ex.target;
    setSubmitted(true);
    onSubmit(r);
  }

  return (
    <div>
      <p className={shared.question}>{ex.translation}</p>
      <div ref={trayRef} className={s.tokenArea}>
        {placed.length === 0 && <span className={s.tokenAreaEmpty}>Toca las fichas en orden para construir la frase</span>}
        {placed.map((k) => (
          <button
            key={k}
            lang={langConfig().htmlLang}
            className={`${s.token} ${s.tokenPlaced}`}
            disabled={locked || submitted}
            onClick={() => setPlaced(placed.filter((p) => p !== k))}
          >
            {tokens.find((t) => t.key === k)!.w}
          </button>
        ))}
      </div>
      <div ref={poolRef} className={s.tokenPool}>
        {tokens.map((t) => (
          <button
            key={t.key}
            lang={langConfig().htmlLang}
            className={`${s.token} ${placed.includes(t.key) ? s.tokenUsed : ""}`}
            disabled={locked || submitted || placed.includes(t.key)}
            onClick={() => { sfxPop(); setPlaced([...placed, t.key]); }}
          >
            {t.w}
          </button>
        ))}
      </div>
      <div className={shared.footer}>
        <button className={shared.btnGhost} onClick={() => setPlaced([])} disabled={locked || submitted || placed.length === 0}>
          Vaciar
        </button>
        <button className={shared.btnPrimary} onClick={submit} disabled={locked || submitted || placed.length === 0}>
          Comprobar
        </button>
      </div>
    </div>
  );
}
