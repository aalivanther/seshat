"use client";

import { useEffect, useState } from "react";
import type { MonologueExercise } from "@/lib/types";
import { speak } from "@/lib/tts";
import { langConfig } from "@/lib/language";
import { Speaker } from "../Speaker";
import type { KindProps } from "./shared";
import shared from "../ex.module.css";
import s from "./monologue.module.css";

/* ---------- MONOLOGUE: hablar 2-3 minutos ---------- */
// Ellis: la planificación previa mejora complejidad y fluidez, y la repetición
// de tarea mejora la segunda pasada. Autoevaluación por HECHOS CONTABLES.
export function Monologue({ ex, locked, onSubmit }: KindProps<MonologueExercise>) {
  const planFor = ex.planSeconds ?? 120;
  const speakFor = ex.speakSeconds ?? 150;
  const reps = ex.reps ?? 2;
  const [stage, setStage] = useState<"intro" | "plan" | "speak" | "rate">("intro");
  const [left, setLeft] = useState(planFor);
  const [rep, setRep] = useState(1);
  const [checked, setChecked] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (stage !== "plan" && stage !== "speak") return;
    if (left <= 0) {
      setStage(stage === "plan" ? "speak" : "rate");
      setLeft(speakFor);
      return;
    }
    const t = setTimeout(() => setLeft((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [stage, left, speakFor]);

  const mmss = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`;

  return (
    <div>
      <p className={shared.question}>{ex.topic}</p>
      <ol className={s.slideList}>
        {ex.slides.map((sl) => (
          <li key={sl.title}>
            <b lang={langConfig().htmlLang}>{sl.title}</b> — <span className={s.slideHint}>{sl.hint}</span>
          </li>
        ))}
      </ol>

      {stage === "intro" && (
        <div className={shared.footer} style={{ justifyContent: "flex-start" }}>
          <button className={shared.btnPrimary} onClick={() => { setStage("plan"); setLeft(planFor); }}>
            Preparar ({planFor}s) — apunta ideas, no frases
          </button>
        </div>
      )}

      {/* el reloj NO va en role="status": un lector de pantalla lo leería en voz
          alta cada segundo y taparía justo lo que el alumno intenta decir.
          Se narra la fase (que cambia dos veces), no el tictac. */}
      {(stage === "plan" || stage === "speak") && (
        <div className={s.monoTimer}>
          <span className={s.monoClock} role="timer" aria-live="off">{mmss}</span>
          <span role="status">
            {stage === "plan"
              ? "Preparando: una idea por punto, en palabras sueltas."
              : `Hablando — pasada ${rep} de ${reps}. En voz alta, sin leer.`}
          </span>
          <button
            className={shared.btnGhost}
            onClick={() => { setStage(stage === "plan" ? "speak" : "rate"); setLeft(speakFor); }}
          >
            {stage === "plan" ? "Ya estoy" : "Terminé"}
          </button>
        </div>
      )}

      {stage === "rate" && (
        <div>
          {rep < reps ? (
            <div className={shared.footer} style={{ justifyContent: "flex-start" }}>
              <p className={shared.prompt}>
                Otra vez, del tirón. La segunda pasada sale mejor: por eso existe.
              </p>
              <button className={shared.btnPrimary} onClick={() => { setRep(rep + 1); setStage("speak"); setLeft(speakFor); }}>
                Pasada {rep + 1}
              </button>
            </div>
          ) : (
            <>
              <p className={shared.prompt}>¿Qué hiciste de verdad? Marca solo lo que puedas contar:</p>
              <div className={s.checkList}>
                {ex.checklist.map((c, i) => (
                  <button
                    key={c}
                    className={`${s.checkItem} ${checked.has(i) ? s.checkItemOn : ""}`}
                    aria-pressed={checked.has(i)}
                    onClick={() => {
                      const n = new Set(checked);
                      n.has(i) ? n.delete(i) : n.add(i);
                      setChecked(n);
                    }}
                  >
                    {checked.has(i) ? "✓" : "○"} {c}
                  </button>
                ))}
              </div>
              {ex.model && locked && (
                <div className={shared.hearrealReveal}>
                  <p className={shared.prompt} style={{ marginBottom: 4 }}>Un modelo posible:</p>
                  <p lang={langConfig().htmlLang} style={{ whiteSpace: "pre-line" }}>{ex.model}</p>
                  <Speaker text={ex.model} />
                </div>
              )}
              <div className={shared.footer} style={{ justifyContent: "flex-start" }}>
                <button
                  className={shared.btnPrimary}
                  disabled={locked}
                  onClick={() => {
                    const hit = checked.size;
                    const total = ex.checklist.length;
                    onSubmit({
                      correct: hit >= Math.ceil(total * 0.6),
                      almost: hit > 0 && hit < total,
                      feedback: `${hit}/${total} de la lista. Lo que no marcaste es tu tarea para la próxima.`,
                      expected: ex.model ?? "",
                    });
                  }}
                >
                  Registrar
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
