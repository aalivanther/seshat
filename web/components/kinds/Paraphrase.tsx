"use client";

import { useEffect, useRef, useState } from "react";
import type { ParaphraseExercise } from "@/lib/types";
import { gradeText } from "@/lib/grade";
import { langConfig } from "@/lib/language";
import { Speaker } from "../Speaker";
import type { KindProps } from "./shared";
import shared from "../ex.module.css";
import s from "./paraphrase.module.css";

/* ---------- PARAPHRASE: dilo de otra manera ---------- */
// Lo define `forbid`: sin palabras prohibidas no hay reformulación, hay copia.
export function Paraphrase({ ex, locked, attempt, onSubmit }: KindProps<ParaphraseExercise>) {
  // El segundo intento CONSERVA lo escrito: el fallo típico es una palabra, y
  // borrar la frase entera castiga a quien casi la tenía (y a quien escribe
  // despacio). Solo se limpia al cambiar de ejercicio.
  const [text, setText] = useState("");
  useEffect(() => setText(""), [ex.id]);

  // \b es ASCII: con «überhaupt» nunca casaba y la palabra prohibida colaba.
  // Delimitamos con "no-letra" contando los caracteres alemanes.
  //
  // Y el apóstrofo NO significa lo mismo en los dos idiomas, así que esto no
  // puede ser una constante — quien lo simplifique arregla un idioma y rompe
  // el otro:
  //  · alemán → el apóstrofo es un clítico pegado a una palabra que sigue
  //    siendo ella misma: «geht's» es «geht» + «es», y quien lo escribe ha
  //    usado «geht». Con el apóstrofo como frontera ya casa.
  //  · inglés → la contracción se come letras y se funde con el verbo:
  //    «don't» es «do» + «not», «isn't» es «is» + «not». Con la frontera a
  //    secas, prohibir «do» dejaba pasar «don't»: prohibir una palabra no
  //    impedía su contracción, que es justo lo que el forbid quiere impedir.
  //    Por eso en inglés la frontera admite además la cola de la contracción.
  const NL = "[^a-zA-ZäöüÄÖÜß]";
  // La cola vive en LanguageConfig, junto al resto de la identidad del idioma:
  // aquí solo se consume, para que añadir un tercer idioma no obligue a volver
  // a este archivo a añadir otro `htmlLang === "…"`.
  const tail = langConfig().contractionTail ?? "";
  const usedForbidden = ex.forbid.filter((f) => {
    const esc = f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(^|${NL})${esc}${tail}(${NL}|$)`, "i").test(text);
  });

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
    if (usedForbidden.length) {
      onSubmit({
        correct: false,
        almost: true,
        feedback: `Usaste ${usedForbidden.join(", ")} — justo lo que había que esquivar. De eso va el ejercicio.`,
        expected: ex.answers[0],
      });
      return;
    }
    // Reformular es decir la misma idea con otras palabras: contraer o no
    // contraer no cambia la idea, así que aquí se queda permisivo salvo que el
    // propio ejercicio pida lo contrario.
    onSubmit(gradeText(text, ex.answers, { strictContractions: ex.strictContractions }));
  }

  return (
    <div>
      <p className={shared.question} lang={langConfig().htmlLang}>{ex.source}</p>
      {ex.translation && <p className={shared.translation}>{ex.translation}</p>}
      <p className={s.forbidRow}>
        Sin usar:{" "}
        {ex.forbid.map((f) => (
          <span key={f} className={`${s.forbidWord} ${usedForbidden.includes(f) ? s.forbidHit : ""}`} lang={langConfig().htmlLang}>
            {f}
          </span>
        ))}
      </p>
      <input
        className={shared.input}
        lang={langConfig().htmlLang}
        value={text}
        disabled={locked}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && text.trim() && check()}
        placeholder="La misma idea, otras palabras…"
        aria-label="Tu reformulación"
      />
      {locked && (
        <div className={shared.hearrealReveal}>
          <p className={shared.prompt} style={{ marginBottom: 4 }}>Otras formas válidas:</p>
          {ex.answers.map((a) => (
            <div key={a} className={shared.hearrealRow}>
              <span lang={langConfig().htmlLang}>{a}</span>
              <Speaker text={a} />
            </div>
          ))}
        </div>
      )}
      <div className={shared.footer} style={{ justifyContent: "flex-start" }}>
        <button className={shared.btnPrimary} disabled={locked || !text.trim()} onClick={check}>
          Comprobar
        </button>
      </div>
    </div>
  );
}
