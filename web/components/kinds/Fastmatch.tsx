"use client";

// Mismas clases que Match. El reloj no tiene hoja: el tempo solo premia, no suspende.

import { useEffect, useMemo, useRef, useState } from "react";
import type { FastmatchExercise } from "@/lib/types";
import { speak } from "@/lib/tts";
import { langConfig } from "@/lib/language";
import { sfxPop } from "@/lib/juice";
import type { KindProps } from "./shared";
import s from "../ex.module.css";

/* ---------- Fastmatch: emparejado con tempo suave ---------- */
// DeKeyser/Segalowitz: la automatización pide práctica con tempo DESPUÉS de la
// precisión. El cronómetro SOLO premia (bonus al bajar de la meta); pasarse no
// falla nada — la única condición de fallo son 2+ emparejes fallidos.
export function Fastmatch({ ex, locked, onSubmit }: KindProps<FastmatchExercise>) {
  const target = ex.targetSeconds ?? 25;
  const pairs = useMemo(() => {
    const seen = new Set<string>();
    return ex.pairs.filter((p) => {
      const kt = "t:" + p.target, ks = "s:" + p.source;
      if (seen.has(kt) || seen.has(ks)) return false;
      seen.add(kt);
      seen.add(ks);
      return true;
    });
  }, [ex]);
  const left = useMemo(() => [...pairs].sort((a, b) => a.target.localeCompare(b.target, langConfig().htmlLang)), [ex]);
  const right = useMemo(() => [...pairs].sort((a, b) => a.source.localeCompare(b.source, "es")), [ex]);
  const [selDe, setSelDe] = useState<string | null>(null);
  const [selEs, setSelEs] = useState<string | null>(null);
  const [done, setDone] = useState<Set<string>>(new Set());
  const [mistakes, setMistakes] = useState(0);
  const [shake, setShake] = useState(false);
  const startRef = useRef<number | null>(null);
  const [elapsed, setElapsed] = useState(0);

  // el reloj arranca con el PRIMER toque (leer las columnas no penaliza)
  useEffect(() => {
    if (startRef.current === null && (selDe || selEs)) startRef.current = Date.now();
  }, [selDe, selEs]);
  useEffect(() => {
    const t = setInterval(() => {
      if (startRef.current !== null) setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
    }, 500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!selDe || !selEs) return;
    const pair = pairs.find((p) => p.target === selDe)!;
    if (pair.source === selEs) {
      const next = new Set(done).add(selDe);
      const t = setTimeout(() => {
        setDone(next);
        setSelDe(null);
        setSelEs(null);
        sfxPop();
        speak(selDe);
        if (next.size === pairs.length) {
          const secs = startRef.current ? Math.round((Date.now() - startRef.current) / 1000) : 0;
          const fast = secs <= target;
          const correct = mistakes < 2; // 2+ fallos = fallo (ítems ya consolidados)
          onSubmit({
            correct,
            almost: mistakes === 1,
            feedback: !correct
              ? `${mistakes} emparejes fallidos: estos pares todavía te hacen pensar.`
              : fast && mistakes === 0
                ? `Bonus de velocidad: ${secs}s frente a los ${target}s de meta. Ya no los traduces, los reconoces.`
                : `${secs}s${mistakes ? ", con un desliz" : ""}. La meta del bonus estaba en ${target}s, pero pasarse no quita nada.`,
            expected: "",
          });
        }
      }, 150);
      return () => clearTimeout(t);
    }
    setMistakes((m) => m + 1);
    setShake(true);
    const t = setTimeout(() => {
      setShake(false);
      setSelDe(null);
      setSelEs(null);
    }, 650);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selDe, selEs]);

  const doneEs = (es: string) => done.has(pairs.find((q) => q.source === es)!.target);
  const remaining = pairs.length - done.size;

  return (
    <div>
      <p className={s.matchHowTo}>
        Emparejar de siempre, con reloj: por debajo de <span className="num">{target}s</span> hay bonus.
        Arranca con tu primer toque, y pasarse no quita nada.
      </p>
      <p className={s.liveHint + " " + (shake ? s.liveOff : s.liveNeutral)} role="status">
        {shake
          ? "Esas dos no van juntas"
          : startRef.current
            ? `⏱ ${elapsed}s · ${remaining} ${remaining === 1 ? "pareja" : "parejas"}`
            : "Toca una tarjeta cuando quieras empezar."}
      </p>
      <div className={s.matchGrid}>
        <div className={s.matchCol}>
          {left.map((p) => (
            <button
              key={p.target}
              lang={langConfig().htmlLang}
              className={`${s.matchBtn} ${
                done.has(p.target) ? s.matchDone : selDe === p.target ? (shake ? s.matchShake : s.matchSelected) : ""
              }`}
              disabled={locked || done.has(p.target)}
              onClick={() => setSelDe(selDe === p.target ? null : p.target)}
            >
              {done.has(p.target) ? "✓ " : ""}{p.target}
            </button>
          ))}
        </div>
        <div className={s.matchCol}>
          {right.map((p) => (
            <button
              key={p.source}
              className={`${s.matchBtn} ${
                doneEs(p.source) ? s.matchDone : selEs === p.source ? (shake ? s.matchShake : s.matchSelected) : ""
              }`}
              disabled={locked || doneEs(p.source)}
              onClick={() => setSelEs(selEs === p.source ? null : p.source)}
            >
              {doneEs(p.source) ? "✓ " : ""}{p.source}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
