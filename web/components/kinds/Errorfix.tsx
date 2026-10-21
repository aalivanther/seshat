"use client";

import { useEffect, useRef, useState } from "react";
import type { ErrorfixExercise } from "@/lib/types";
import { gradeText } from "@/lib/grade";
import { langConfig } from "@/lib/language";
import { CheckMark, CrossMark } from "../Art";
import type { KindProps } from "./shared";
import shared from "../ex.module.css";
import s from "./errorfix.module.css";

/* ---------- ERRORFIX: corregir el calco ---------- */
// Salvaguardas (la exposición a formas erróneas puede hacerlas familiares): un
// solo error, y al corregir la forma MALA desaparece de pantalla — el último
// fotograma del ejercicio es siempre la forma buena.
export function Errorfix({ ex, locked, attempt, onSubmit }: KindProps<ErrorfixExercise>) {
  // El segundo intento CONSERVA lo escrito: el fallo típico es una palabra, y
  // borrar la frase entera castiga a quien casi la tenía (y a quien escribe
  // despacio). Solo se limpia al cambiar de ejercicio.
  const [text, setText] = useState("");
  useEffect(() => setText(""), [ex.id]);

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
    if (!guardSend(text)) return;
    // El errorfix corrige UN error concreto, y a veces ese error ES la forma
    // escrita: «Yes, I'm» → «Yes, I am». Cuando el ejercicio lo declara, la
    // contracción y la forma plena dejan de valer lo mismo o el ejercicio se
    // regala solo. Por defecto sigue siendo permisivo: la mayoría corrige
    // gramática, no ortografía.
    const r = gradeText(text, ex.answers, { strictContractions: ex.strictContractions });
    onSubmit({ ...r, feedback: r.correct ? ex.why : (r.feedback ?? ex.why) });
  }

  return (
    <div>
      {!locked ? (
        <p className={s.errorWrong} lang={langConfig().htmlLang}>
          <CrossMark size={18} /> {ex.wrong}
        </p>
      ) : (
        <p className={s.errorFixed} lang={langConfig().htmlLang}>
          <CheckMark size={18} /> {ex.answers[0]}
        </p>
      )}
      {ex.translation && <p className={shared.translation}>{ex.translation}</p>}
      {!locked && (
        <input
          className={shared.input}
          lang={langConfig().htmlLang}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && text.trim() && check()}
          placeholder="Escríbela bien…"
          aria-label="Frase corregida"
          autoFocus
        />
      )}
      {locked && <p className={s.errorWhy}>{ex.why}</p>}
      <div className={shared.footer} style={{ justifyContent: "flex-start" }}>
        <button className={shared.btnPrimary} disabled={locked || !text.trim()} onClick={check}>
          Comprobar
        </button>
      </div>
    </div>
  );
}
