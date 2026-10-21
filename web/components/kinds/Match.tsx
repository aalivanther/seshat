"use client";

// El CSS se queda en ex.module.css: Fastmatch pinta con las mismas clases, y una hoja propia dejaría el reloj sin estilo.

import { useEffect, useMemo, useState } from "react";
import type { MatchExercise } from "@/lib/types";
import { speak } from "@/lib/tts";
import { langConfig } from "@/lib/language";
import { sfxPop } from "@/lib/juice";
import type { KindProps } from "./shared";
import s from "../ex.module.css";

/* ---------- Emparejar (toca una tarjeta de cada columna, en el orden que quieras) ---------- */
export function Match({ ex, locked, onSubmit }: KindProps<MatchExercise>) {
  // guard: un par duplicado (misma palabra o misma traducción) rompería el
  // emparejado por texto — se filtra en runtime aunque el validador ya lo impida
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

  // cuando hay una tarjeta de cada lado, se comprueba la pareja sola
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
          // umbral proporcional: 1 desliz en 4-5 parejas no anula el ejercicio
          const allowed = Math.floor(pairs.length / 3);
          const correct = mistakes <= allowed;
          onSubmit({
            correct,
            almost: mistakes > 0,
            feedback:
              mistakes === 0
                ? null
                : `Todas emparejadas, con ${mistakes} ${mistakes === 1 ? "tropiezo" : "tropiezos"} por el camino.`,
            expected: "",
          });
        }
      }, 150);
      return () => clearTimeout(t);
    }
    // no son pareja: sacúdelas y suéltalas
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
        Una de cada columna, si crees que van juntas. {remaining === 1 ? "Queda" : "Quedan"}{" "}
        <span className="num">{remaining}</span> {remaining === 1 ? "pareja" : "parejas"}.
      </p>
      <p className={s.liveHint + " " + (shake ? s.liveOff : s.liveNeutral)} role="status">
        {shake ? "Esas dos no van juntas" : selDe || selEs ? "Ahora su pareja, en la otra columna" : ""}
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
