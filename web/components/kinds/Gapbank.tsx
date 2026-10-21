"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { GapbankExercise } from "@/lib/types";
import { langConfig } from "@/lib/language";
import { shuffle } from "@/lib/shuffle";
import type { KindProps } from "./shared";
import shared from "../ex.module.css";
import s from "./gapbank.module.css";

/* ---------- GAPBANK: párrafo con huecos y banco compartido ---------- */
// Un tipo, cuatro batallas (conectores, Konjunktiv II, rección, relativos). El
// banco tiene distractores de sobra: elegir bien exige entender la frase, no
// descartar por eliminación.
export function Gapbank({ ex, locked, attempt, onSubmit }: KindProps<GapbankExercise>) {
  const parts = useMemo(() => ex.text.split("___"), [ex.text]);
  const gaps = parts.length - 1;
  const [filled, setFilled] = useState<(string | null)[]>(() => Array(gaps).fill(null));
  const [active, setActive] = useState(0);
  // Se vacía al cambiar de ejercicio o si cambia el número de huecos, NO en el
  // segundo intento: de seis huecos suele fallar uno, y vaciar los seis obliga
  // a rehacer el trabajo bien hecho.
  useEffect(() => {
    setFilled(Array(gaps).fill(null));
    setActive(0);
  }, [ex.id, gaps]);

  const bank = useMemo(() => shuffle([...new Set(ex.bank)]), [ex]);
  // CUÁNTAS VECES se puede usar cada palabra: un párrafo real repite piezas
  // ("wird … wird … werden"). Sin esto, esos ejercicios son irresolubles: la
  // palabra se marca gastada al primer uso y el segundo hueco no tiene con qué
  // llenarse. La capacidad sale del propio ejercicio.
  const capacity = useMemo(() => {
    const count = (arr: string[]) =>
      arr.reduce<Record<string, number>>((m, w) => ({ ...m, [w]: (m[w] ?? 0) + 1 }), {});
    const inBank = count(ex.bank);
    const inAnswers = count(ex.answers);
    const cap: Record<string, number> = { ...inBank };
    for (const [w, n] of Object.entries(inAnswers)) cap[w] = Math.max(cap[w] ?? 0, n);
    return cap;
  }, [ex]);
  const usedCount = useMemo(() => {
    const m: Record<string, number> = {};
    for (const f of filled) if (f) m[f] = (m[f] ?? 0) + 1;
    return m;
  }, [filled]);
  const isSpent = (w: string) => (usedCount[w] ?? 0) >= (capacity[w] ?? 1);
  const complete = filled.every((f) => f !== null);

  function place(word: string) {
    if (locked || isSpent(word)) return;
    const next = [...filled];
    next[active] = word;
    setFilled(next);
    const nextEmpty = next.findIndex((f) => f === null);
    setActive(nextEmpty === -1 ? active : nextEmpty);
  }

  // GUARDA DE DOBLE ENVÍO: sin esto, un Enter mantenido (auto-repeat del
  // teclado) o un doble clic disparaban check() dos veces en milisegundos y la
  // segunda quemaba el segundo intento con la MISMA respuesta, sin que el alumno
  // llegara a ver la pista. `TextAnswer` ya se protegía; estos cuatro no.
  const [sent, setSent] = useState(false);
  const lastSent = useRef<string | null>(null);
  useEffect(() => { setSent(false); }, [attempt]);
  function guardSend(sig: string): boolean {
    if (locked || sent) return false;
    // en el reintento hay que cambiar algo: repetir lo mismo no gasta la bala
    if (attempt > 0 && sig === lastSent.current) return false;
    lastSent.current = sig;
    setSent(true);
    return true;
  }

  function check() {
    if (!guardSend(filled.join("|"))) return;
    const right = filled.filter((f, i) => f === ex.answers[i]).length;
    onSubmit({
      correct: right === gaps,
      almost: right > 0 && right < gaps,
      feedback: right === gaps ? null : `${right} de ${gaps} huecos bien.`,
      expected: ex.text.split("___").reduce((acc, p, i) => acc + p + (ex.answers[i] ?? ""), ""),
    });
  }

  return (
    <div>
      <p className={s.gapText} lang={langConfig().htmlLang}>
        {parts.map((p, i) => (
          <span key={i}>
            {p}
            {i < gaps && (
              <button
                className={`${s.gapSlot} ${active === i ? s.gapSlotActive : ""} ${
                  locked ? (filled[i] === ex.answers[i] ? s.gapOk : s.gapBad) : ""
                }`}
                disabled={locked}
                onClick={() => setActive(i)}
                aria-label={`Hueco ${i + 1}`}
              >
                {filled[i] ?? "␣"}
              </button>
            )}
          </span>
        ))}
      </p>
      {ex.translation && <p className={shared.translation}>{ex.translation}</p>}
      <div className={s.bankRow} role="group" aria-label="Banco de palabras">
        {bank.map((w) => (
          <button
            key={w}
            className={`${s.bankWord} ${isSpent(w) ? s.bankUsed : ""}`}
            disabled={locked || isSpent(w)}
            lang={langConfig().htmlLang}
            onClick={() => place(w)}
            title={
              (capacity[w] ?? 1) > 1
                ? `Se usa ${capacity[w]} veces (llevas ${usedCount[w] ?? 0})`
                : undefined
            }
          >
            {w}
            {(capacity[w] ?? 1) > 1 && (
              <span className={s.bankTimes}> ×{(capacity[w] ?? 1) - (usedCount[w] ?? 0)}</span>
            )}
          </button>
        ))}
      </div>
      <div className={shared.footer} style={{ justifyContent: "flex-start" }}>
        {filled.some(Boolean) && !locked && (
          <button className={shared.btnGhost} onClick={() => { setFilled(Array(gaps).fill(null)); setActive(0); }}>
            Vaciar
          </button>
        )}
        <button className={shared.btnPrimary} disabled={locked || !complete} onClick={check}>
          Comprobar
        </button>
      </div>
    </div>
  );
}
