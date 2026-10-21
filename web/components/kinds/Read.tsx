"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReadExercise } from "@/lib/types";
import { gradeText } from "@/lib/grade";
import { speak } from "@/lib/tts";
import { langConfig } from "@/lib/language";
import { glossify, sanitizeNoteHtml } from "@/lib/sanitize";
import { seededOrder, useVoiceMissing, type KindProps } from "./shared";
import shared from "../ex.module.css";
import s from "./read.module.css";

/* ---------- READ: lectura larga con glosas tocables ---------- */
// El B1 exige leer 300-500 palabras y INFERIR. Las glosas al vuelo [[wort|glosa]]
// evitan el diccionario sin pre-enseñar (que mataría la inferencia). Todas las
// preguntas se responden con el texto delante: es comprensión, no memoria.
export function Read({ ex, locked, onSubmit }: KindProps<ReadExercise>) {
  // Las de opción guardan el índice; las de respuesta escrita, el texto. El
  // Reading Part 4 del B1 inglés dejó de ser test y hay que sostener las dos.
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [gloss, setGloss] = useState<{ w: string; g: string } | null>(null);
  // El texto se puede plegar: en un móvil, ocho preguntas debajo de un texto
  // pegado arriba dejan poco sitio, y a veces uno ya sabe la respuesta.
  const [textOpen, setTextOpen] = useState(true);
  const voiceMissing = useVoiceMissing();
  const html = useMemo(() => sanitizeNoteHtml(glossify(ex.text)), [ex.text]);

  useEffect(() => {
    if (!gloss) return;
    const t = setTimeout(() => setGloss(null), 3500);
    return () => clearTimeout(t);
  }, [gloss]);

  function showGloss(u: Element) {
    const w = u.textContent ?? "";
    setGloss({ w, g: u.getAttribute("data-g") ?? "" });
    speak(w);
  }

  function tapGloss(e: React.MouseEvent) {
    const u = (e.target as Element).closest?.("u[data-g]");
    if (u) showGloss(u);
  }

  // Las glosas se pintan como HTML, así que no hay JSX donde colgarles el foco:
  // sin esto solo existen para quien usa ratón o dedo. Se las hacemos tabulables
  // desde el DOM ya montado —y con etiqueta, para que el lector de pantalla diga
  // la palabra Y su significado sin tener que activarla a ciegas.
  const textRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = textRef.current;
    if (!host) return;
    host.querySelectorAll("u[data-g]").forEach((u) => {
      u.setAttribute("tabindex", "0");
      u.setAttribute("role", "button");
      u.setAttribute("aria-label", `${u.textContent ?? ""}: ${u.getAttribute("data-g") ?? ""}`);
    });
  }, [html, textOpen]);

  function keyGloss(e: React.KeyboardEvent) {
    if (e.key !== "Enter" && e.key !== " ") return;
    const u = (e.target as Element).closest?.("u[data-g]");
    if (!u) return;
    e.preventDefault(); // el espacio no debe hacer scroll de la lectura
    showGloss(u);
  }

  /** ¿Está bien contestada? Cada pregunta sabe cómo se corrige la suya.
   *  `numeralsEitherWay` es el mismo baremo que el simulacro (examScore.ts):
   *  en una respuesta corta de comprensión lectora, «16» y «sixteen» son la
   *  misma respuesta y el examen las da las dos por buenas. Aquí faltaba, así
   *  que el mismo alumno con la misma respuesta aprobaba en el simulacro y
   *  fallaba en la lección. */
  const acierta = (q: ReadExercise["questions"][number]): boolean => {
    const dada = answers[q.id];
    if (q.accepted?.length) {
      return typeof dada === "string" && gradeText(dada, q.accepted, { numeralsEitherWay: true }).correct;
    }
    return dada === q.answer;
  };
  const contestada = (q: ReadExercise["questions"][number]): boolean => {
    const dada = answers[q.id];
    return q.accepted?.length ? typeof dada === "string" && dada.trim() !== "" : dada !== undefined;
  };
  const allAnswered = ex.questions.every(contestada);

  function check() {
    const right = ex.questions.filter(acierta).length;
    const total = ex.questions.length;
    const missed = ex.questions.filter((q) => !acierta(q));
    onSubmit({
      correct: right >= Math.ceil(total * 0.6), // 60%: es comprensión, no puntería
      almost: right > 0 && right < total,
      feedback:
        right === total
          ? "Todas, incluidas las que no estaban escritas en el texto."
          : `${right}/${total}. Se te escaparon: ${missed.map((q) => q.q).join(" · ")}`,
      expected: ex.questions
        .map((q) => (q.accepted?.length ? q.accepted[0] : q.options?.[q.answer ?? 0] ?? ""))
        .join(" · "),
    });
  }

  return (
    <div>
      {/* El texto y su plegador. La idea es que viaje PEGADO a las preguntas
          —a partir de la cuarta, el texto queda mil píxeles más arriba y el
          alumno acaba contestando de memoria—, y el CSS ya lo pide con
          `position: sticky`. Hoy no llega a pegarse: `body` lleva
          `overflow-x: hidden` en globals.css y eso convierte al body en
          contenedor de scroll, así que el sticky se ancla a una caja que no se
          mueve (medido: top −1336 px con él, +6 px sin él). Mientras esa línea
          siga ahí, lo que se puede ofrecer es plegar el texto para llegar antes
          a las preguntas y volver a abrirlo para releer — y no prometer en el
          texto de ayuda algo que no pasa. El arreglo va en el informe. */}
      <div className={s.readStick}>
        <div className={s.readHead}>
          <h3 className={s.readTitle} lang={langConfig().htmlLang}>{ex.title}</h3>
          {ex.source && <span className={s.readSource}>{ex.source}</span>}
          <button
            type="button"
            className={s.readToggle}
            aria-expanded={textOpen}
            onClick={() => setTextOpen(!textOpen)}
          >
            {textOpen ? "Plegar el texto" : "Ver el texto"}
          </button>
        </div>
        {textOpen && (
          <div
            ref={textRef}
            className={s.readText}
            lang={langConfig().htmlLang}
            onClick={tapGloss}
            onKeyDown={keyGloss}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
        {gloss && (
          <p className={s.readGloss} role="status">
            <b lang={langConfig().htmlLang}>{gloss.w}</b> = {gloss.g}
          </p>
        )}
      </div>
      <p className={s.readHint}>
        {voiceMissing
          ? "Toca las palabras subrayadas para ver qué significan (sonar no van a sonar: no hay voz del idioma instalada)."
          : "Toca las palabras subrayadas para oírlas y ver qué significan."}{" "}
        El texto no se va a ninguna parte: pliégalo si te estorba y vuelve a abrirlo
        cuando quieras releer. Aquí no hay nada que memorizar.
      </p>

      {ex.questions.map((q, qi) => (
        <div key={q.id} className={s.readQuestion}>
          <p className={shared.question}>
            <span className="num">{qi + 1}.</span> {q.q}
            {q.inference && <span className={s.readInferChip}>entre líneas</span>}
          </p>
          {q.accepted?.length ? (
            // respuesta escrita: el examen pide escribirla, no reconocerla
            <div>
              <input
                className={shared.input}
                value={typeof answers[q.id] === "string" ? (answers[q.id] as string) : ""}
                disabled={locked}
                autoComplete="off"
                spellCheck={false}
                lang={langConfig().htmlLang}
                placeholder="Tu respuesta…"
                aria-label={q.q}
                onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
              />
              {locked && !acierta(q) && (
                <p className={s.readWhy}>
                  La respuesta era: <b lang={langConfig().htmlLang}>{q.accepted[0]}</b>
                  {/* Las otras formas aceptadas no son adorno: enseñan hasta dónde
                      llega el margen del examen, que es media pregunta. */}
                  {q.accepted.length > 1 && (
                    <>
                      {" "}— también valía{" "}
                      <span lang={langConfig().htmlLang}>
                        {q.accepted.slice(1, 4).map((a) => `«${a}»`).join(", ")}
                      </span>
                      {q.accepted.length > 4 ? "…" : ""}
                    </>
                  )}
                </p>
              )}
            </div>
          ) : (
          <div className={shared.options} role="group" aria-label={q.q}>
            {seededOrder(q.id, (q.options ?? []).length).map((i) => {
              const o = (q.options ?? [])[i];
              let cls = shared.option;
              if (locked) {
                if (i === q.answer) cls += " " + shared.optionRight;
                else if (answers[q.id] === i) cls += " " + shared.optionWrong;
              } else if (answers[q.id] === i) {
                cls += " " + shared.optionPicked;
              }
              return (
                <button
                  key={i}
                  className={cls}
                  disabled={locked}
                  onClick={() => setAnswers({ ...answers, [q.id]: i })}
                >
                  {o}
                </button>
              );
            })}
          </div>
          )}
          {locked && q.why && <p className={s.readWhy}>{q.why}</p>}
        </div>
      ))}

      <div className={shared.footer} style={{ justifyContent: "flex-start" }}>
        <button className={shared.btnPrimary} disabled={locked || !allAnswered} onClick={check}>
          {allAnswered ? "Comprobar" : `Faltan ${ex.questions.filter((q) => !contestada(q)).length}`}
        </button>
      </div>
    </div>
  );
}
