"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { WriteExercise } from "@/lib/types";
import {
  gradeWrite,
  NOTA_SIN_REGISTRO,
  writePassFeedback,
  writeWordCount,
} from "@/lib/writeGrade";
import { langConfig } from "@/lib/language";
import type { KindProps } from "./shared";
import shared from "../ex.module.css";
import s from "./write.module.css";

/* ---------- Write: micro-escritura por funciones (formato examen) ---------- */
// Se puntúan las funciones y el rango de palabras. El registro no entra en esa
// nota —en el examen sí— y se dice junto a la rúbrica, sin restar. La respuesta
// de ejemplo se enseña DESPUÉS (antes sería copiable).
//
// El estímulo y el andamio van ANTES, los conectores MIENTRAS se escribe, y la
// rúbrica DESPUÉS de la respuesta de ejemplo. La rúbrica no toca la nota: el
// regex sigue siendo el único baremo.

/** El género decide la plantilla y el tono; se dice en una etiqueta, no en un
 *  párrafo, porque el alumno viene a escribir. */
const WRITE_GENRE: Record<string, string> = {
  "mail-informal": "Mail personal",
  forum: "Comentario en un foro",
  "mail-formal": "Mail formal",
};

// El registro no se juega igual en los dos idiomas: en alemán ES un pronombre
// (du / Sie) y en inglés es la FORMA de la petición. Por eso cada valor trae su
// explicación, en vez de una etiqueta genérica que no enseñaría nada.
const WRITE_REGISTER: Record<string, string> = {
  du: "Tuteo (du) — ni Sie ni Ihnen",
  Sie: "Usted (Sie) — ni du, ni dich, ni dir, ni dein",
  direct: "Directo — se pide sin envolver: «Give me a coffee»",
  polite: "Cortés — la petición va envuelta: «Could I have a coffee, please?»",
};

/** Los cuatro criterios de la hoja de corrección, en español y SIN puntos:
 *  aquí la rúbrica es un espejo tras ver el modelo, no un segundo baremo.
 *
 *  Van POR IDIOMA porque son NOMBRES PROPIOS de cada examen, no etiquetas
 *  nuestras: el alumno de alemán se va a encontrar «Erfüllung» y «Kohärenz»
 *  escritos tal cual en el Goethe, y el de inglés no se va a encontrar ninguna
 *  de esas palabras en ninguna parte. La clave (`erfuellung`, `kohaerenz`…) se
 *  queda en alemán a propósito: es lo que el contenido ya declara en
 *  `rubric`, y renombrarla obligaría a tocar los 41 ejercicios publicados sin
 *  que el alumno viera ninguna diferencia.
 *
 *  `short` es el nombre a secas, para citarlo dentro de una frase.
 *
 *  Sitio natural de esta tabla: `LanguageConfig` (lib/language.ts), donde vive
 *  TODO lo específico del idioma. Está aquí porque es lo único que se pinta y
 *  no puedo tocar aquel archivo; la forma exacta para mudarla va en el informe. */
type WriteCrit = { label: string; short: string; help: string };

const WRITE_RUBRIC_BY_LANG: Record<string, Record<string, WriteCrit>> = {
  de: {
    erfuellung: {
      label: "Erfüllung · cumplimiento",
      short: "Erfüllung",
      help: "¿Trataste todos los puntos, y cada uno con algo de desarrollo? Un punto tocado de pasada cuenta a medias; uno que falta te baja de banda entera.",
    },
    kohaerenz: {
      label: "Kohärenz · hilo del texto",
      short: "Kohärenz",
      help: "¿Se lee de corrido? ¿Los conectores unen ideas de verdad o están de adorno? ¿Hay saludo y despedida donde tocan?",
    },
    wortschatz: {
      label: "Wortschatz · vocabulario",
      short: "Wortschatz",
      help: "¿Variedad y precisión, o las mismas cuatro palabras una y otra vez? Una palabra difícil bien usada sube; diez mal usadas bajan.",
    },
    strukturen: {
      label: "Strukturen · gramática",
      short: "Strukturen",
      help: "Subordinadas, orden de la frase, casos y terminaciones. Se mira si el error estorba para entenderte, no si es feo.",
    },
  },
  en: {
    erfuellung: {
      label: "Task fulfilment · cumplimiento",
      short: "Task fulfilment",
      help: "¿Trataste todos los puntos, y cada uno con algo de desarrollo? Un punto tocado de pasada cuenta a medias; uno que falta te baja de banda entera.",
    },
    kohaerenz: {
      label: "Coherence & cohesion · hilo del texto",
      short: "Coherence & cohesion",
      help: "¿Se lee de corrido? ¿Los conectores unen ideas de verdad o están de adorno? ¿Hay saludo y despedida donde tocan?",
    },
    wortschatz: {
      label: "Vocabulary · vocabulario",
      short: "Vocabulary",
      help: "¿Variedad y precisión, o las mismas cuatro palabras una y otra vez? Una palabra difícil bien usada sube; diez mal usadas bajan.",
    },
    strukturen: {
      label: "Grammar · gramática",
      short: "Grammar",
      // En inglés no hay casos ni terminaciones que declinar: lo que se cae
      // aquí son los tiempos, la concordancia y el orden.
      help: "Subordinadas, tiempos verbales, concordancia y orden de la frase. Se mira si el error estorba para entenderte, no si es feo.",
    },
  },
};

/** La rúbrica del idioma EN JUEGO. El alemán hace de suelo: un idioma nuevo sin
 *  tabla propia enseñará nombres de más, nunca una pantalla rota. */
function writeRubric(): Record<string, WriteCrit> {
  return WRITE_RUBRIC_BY_LANG[langConfig().htmlLang] ?? WRITE_RUBRIC_BY_LANG.de;
}

/** El nombre de un criterio, para citarlo dentro de una frase. */
function critName(key: string): string {
  return writeRubric()[key]?.short ?? key;
}

const WRITE_BANDS = ["A", "B", "C", "D", "E"];
const WRITE_BAND_MEANING = ["redondo", "bien", "justo", "flojo", "no cumple"];

/** ¿aparece `w` como palabra suelta en el texto? `\b` no vale: ä/ö/ü/ß no son
 *  `\w` y «außerdem» se escaparía. Es la misma regla con la que el validador
 *  exige los conectores al texto modelo — al alumno hay que contárselos igual
 *  que al modelo, o el contador miente. Sin lookbehind a propósito: ahí fuera
 *  hay WebViews viejos y un regex que no compila deja la pantalla en blanco. */
function hasLooseWord(text: string, w: string): boolean {
  const esc = w.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (!esc) return false;
  return new RegExp(`(^|[^\\p{L}\\p{N}])${esc}(?![\\p{L}\\p{N}])`, "iu").test(text);
}

export function Write({ ex, locked, attempt, onSubmit }: KindProps<WriteExercise>) {
  // Igual que en Errorfix/Paraphrase: el reintento no puede borrar un texto de
  // 60 palabras que casi cumplía el rango.
  const [text, setText] = useState("");
  useEffect(() => setText(""), [ex.id]);
  const words = writeWordCount(text);
  const inRange = words >= ex.minWords && words <= ex.maxWords;

  // Conectores distintos del banco que ya lleva escritos. Se recalcula al
  // teclear porque el alumno tiene que VERLO subir: es la única forma de que
  // «usa tres conectores» deje de ser una frase decorativa del enunciado.
  const conn = ex.requireConnectors;
  const usedConn = useMemo(
    () => (conn?.bank ?? []).filter((c) => hasLooseWord(text, c)),
    [text, conn],
  );
  const connOk = !conn || usedConn.length >= conn.min;

  // La autoevaluación por bandas vive AQUÍ y no viaja en el resultado: es
  // formativa por diseño (PLAN §3.3) y jamás toca la nota.
  const [bands, setBands] = useState<Record<string, number>>({});
  useEffect(() => setBands({}), [ex.id]);

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
    // apóstrofo tipográfico de iOS/macOS → recto (los checks usan ')
    const g = gradeWrite(ex, text);
    const plain = text.replace(/[\u2018\u2019\u02BC]/g, "'");
    const results = ex.checks.map((c) => ({ ...c, ok: new RegExp(c.re, "i").test(plain) }));
    const okCount = g.okCount;
    const allOk = g.correct;
    const missing = results.filter((r) => !r.ok).map((r) => r.label);
    // Los conectores NO tocan la nota: el regex es el baremo y el ejercicio ya
    // está publicado con él, así que empezar a descontar hoy bajaría la nota de
    // ejercicios que alguien ya tiene hechos. Pero tampoco son un adorno: si el
    // texto pide tres y llevas uno, se dice en el comentario. Kohärenz se mide,
    // se cuenta a la vista y se comenta — no se cobra por sorpresa. El registro
    // igual: no se resta, y la nota no se llama como si ya hubiera entrado.
    const connMiss = !!conn && !connOk;
    onSubmit({
      correct: allOk,
      almost: g.almost,
      feedback: allOk
        ? writePassFeedback({
            puntos: ex.checks.length,
            palabras: words,
            pideRegistro: !!ex.register,
            hayRubrica: !!ex.rubric?.length,
            conectores: connMiss && conn
              ? { min: conn.min, usados: usedConn.length, criterio: critName("kohaerenz") }
              : null,
          })
        : [
            g.offTopic ? "Tema equivocado: 0. El texto no cubre ningún punto de la tarea." : null,
            !g.offTopic && !inRange ? `Llevas ${words} palabras y el examen pide ${ex.minWords}-${ex.maxWords}.` : null,
            !g.offTopic && missing.length ? `Te faltó: ${missing.join(" · ")}.` : null,
            connMiss ? `Y ${usedConn.length} de los ${conn?.min} conectores que pide.` : null,
          ].filter(Boolean).join(" "),
      expected: ex.model,
    });
  }

  const genre = ex.genre ? WRITE_GENRE[ex.genre] : null;
  const register = ex.register ? WRITE_REGISTER[ex.register] : null;

  return (
    <div>
      <p className={shared.question}>{ex.scenario}</p>

      {/* Género y registro: dicen el tono, y el tono se decide antes de la
          primera palabra, no al corregir. */}
      {(genre || register) && (
        <div className={s.writeTags}>
          {genre && <span className={s.writeTag}>{genre}</span>}
          {register && <span className={s.writeTag}>{register}</span>}
        </div>
      )}

      {/* El texto publicado al que hay que REACCIONAR. Va antes de escribir y
          se queda a la vista: sin él, «responde a Lukas» no significa nada. */}
      {ex.stimulus && (
        <blockquote className={s.writeStimulus}>
          <div className={s.writeStimulusWho} lang={langConfig().htmlLang}>{ex.stimulus.author}</div>
          <span lang={langConfig().htmlLang}>{ex.stimulus.text}</span>
        </blockquote>
      )}

      <ul className={s.writeBullets}>
        {ex.bullets.map((b) => <li key={b}>{b}</li>)}
      </ul>

      {/* El esqueleto de funciones: andamio, no solución. Da los arranques de
          frase; lo que se dice con ellos sigue siendo cosa del alumno. */}
      {ex.frame && ex.frame.length > 0 && (
        <div className={s.writeFrame}>
          <div className={s.writeFrameHead}>Esqueleto · por dónde empezar cada parte</div>
          <ul>
            {ex.frame.map((f) => <li key={f} lang={langConfig().htmlLang}>{f}</li>)}
          </ul>
        </div>
      )}

      <textarea
        className={s.writeArea}
        rows={5}
        lang={langConfig().htmlLang}
        value={text}
        disabled={locked}
        onChange={(e) => setText(e.target.value)}
        placeholder={`Escribe en ${langConfig().spanishName}... (${ex.minWords}-${ex.maxWords} palabras)`}
      />
      {/* La otra mitad del baremo. El banco de conectores se ponía verde al
          llegar al mínimo y el contador de palabras —que sí puntúa— no decía
          nada: había que restar de cabeza para saber si estabas dentro. */}
      <p className={`${s.writeCount} ${inRange ? s.writeCountOk : ""}`} aria-live="polite">
        <span className="num">{words}</span> {words === 1 ? "palabra" : "palabras"} · meta {ex.minWords}-{ex.maxWords}
        {inRange ? " — dentro" : words > ex.maxWords ? ` — te pasas por ${words - ex.maxWords}` : words > 0 ? ` — te faltan ${ex.minWords - words}` : ""}
      </p>

      {/* Banco de conectores con la cuenta en vivo: se marcan los que ya has
          usado. Que se vea subir es media enseñanza. */}
      {conn && (
        <div className={`${s.writeConn} ${connOk ? s.writeConnOk : ""}`}>
          <div className={s.writeConnHead} aria-live="polite">
            Conectores distintos: <b className="num">{usedConn.length}</b> de {conn.min}
            {connOk ? " — hecho" : ""}
          </div>
          <div className={s.writeConnBank}>
            {conn.bank.map((c) => (
              <span
                key={c}
                lang={langConfig().htmlLang}
                className={`${s.writeConnWord} ${usedConn.includes(c) ? s.writeConnUsed : ""}`}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      )}

      {locked && (
        <div className={shared.hearrealReveal}>
          <p className={shared.prompt} style={{ marginBottom: 4 }}>Un modelo posible:</p>
          <p lang={langConfig().htmlLang} style={{ fontWeight: 600, whiteSpace: "pre-line" }}>{ex.model}</p>
        </div>
      )}

      {/* Autoevaluación: DESPUÉS del modelo, porque sin él no hay con qué
          compararse, y sin nota, porque compararse no es puntuarse. */}
      {locked && ex.rubric && ex.rubric.length > 0 && (
        <div className={s.writeRubric}>
          <div className={s.writeRubricHead}>Rúbrica del examen · autoevaluación</div>
          <p className={s.writeRubricIntro}>
            Compara tu texto con el modelo y ponte banda en cada criterio, como los dos
            correctores del examen real. <b>A</b> es lo mejor y <b>E</b> es no cumplir.
            Esto <b>no cambia tu resultado</b>: es para saber por dónde aprietas la próxima vez.
          </p>
          <p className={s.writeRubricIntro}>{NOTA_SIN_REGISTRO}</p>
          {ex.rubric.map((k) => {
            const c = writeRubric()[k];
            if (!c) return null;
            return (
              <div key={k} className={s.writeCrit}>
                <div className={s.writeCritLabel}>{c.label}</div>
                <p className={s.writeCritHelp}>{c.help}</p>
                <div className={s.bandRow} role="group" aria-label={c.label}>
                  {WRITE_BANDS.map((b, i) => (
                    <button
                      key={b}
                      className={`${s.bandBtn} ${bands[k] === i ? s.bandOn : ""}`}
                      aria-pressed={bands[k] === i}
                      onClick={() => setBands({ ...bands, [k]: i })}
                    >
                      <b>{b}</b>
                      <span className={s.bandWhat}>{WRITE_BAND_MEANING[i]}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
          {/* La trampa que más suspensos causa, y por eso se dice aquí y no en
              una nota al pie: la E de Erfüllung anula la tarea entera. */}
          {ex.rubric.includes("erfuellung") && bands.erfuellung === 4 && (
            <p className={s.writeFatal} role="status">
              Te has puesto <b>E</b> en {critName("erfuellung")}: en el examen real eso son <b>0 puntos en toda
              la tarea</b>, por bien escrita que esté. Aquí no te quita nada — pero es la banda
              que hay que evitar a toda costa.
            </p>
          )}
        </div>
      )}

      <div className={shared.footer} style={{ justifyContent: "flex-start" }}>
        <button className={shared.btnPrimary} disabled={locked || words === 0} onClick={check}>
          Comprobar
        </button>
      </div>
    </div>
  );
}
