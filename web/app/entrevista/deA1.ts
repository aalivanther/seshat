// Pools y textos del examinador de esta partitura. Apartados del
// player y del baremo: si vuelven a page.tsx, el archivo deja de poder abrirse.

import { INTERVIEW_ID } from "@/lib/ids";
import { pickOne, sample } from "@/lib/shuffle";
import type { InterviewConfig, InterviewItem } from "./tipos";

/* ══════════════════════ ALEMÁN — Sprechen · Start Deutsch 1 ══════════════════════ */

/** Teil 1: los 9 puntos oficiales, cada uno con variantes reales de examinador */
const T1_POOL: { variants: [string, string][]; qEs: string; model: string }[] = [
  { variants: [["Guten Tag! Wie heißen Sie?", ""], ["Guten Tag! Wie ist Ihr Name?", ""]], qEs: "¿Cómo se llama?", model: "Ich heiße {NAME}." },
  { variants: [["Woher kommen Sie?", ""], ["Aus welchem Land kommen Sie?", ""]], qEs: "¿De dónde viene?", model: "Ich komme aus {LAND}." },
  { variants: [["Wo wohnen Sie?", ""], ["Wo wohnen Sie jetzt?", ""]], qEs: "¿Dónde vive?", model: "Ich wohne in {STADT}." },
  { variants: [["Wie alt sind Sie?", ""]], qEs: "¿Cuántos años tiene?", model: "Ich bin dreißig Jahre alt." },
  { variants: [["Welche Sprachen sprechen Sie?", ""], ["Sprechen Sie Englisch?", ""]], qEs: "¿Qué idiomas habla?", model: "Ich spreche Spanisch, Englisch und ein bisschen Deutsch." },
  { variants: [["Was sind Sie von Beruf?", ""], ["Wo arbeiten Sie?", ""], ["Was machen Sie beruflich?", ""]], qEs: "¿A qué se dedica / dónde trabaja?", model: "Ich bin {BERUF} von Beruf. Ich arbeite bei einer Firma." },
  { variants: [["Was ist Ihr Hobby?", ""], ["Haben Sie Hobbys?", ""], ["Was machen Sie in Ihrer Freizeit?", ""]], qEs: "¿Cuál es su hobby / qué hace en su tiempo libre?", model: "Mein Hobby ist Schwimmen. Ich schwimme gern." },
  { variants: [["Buchstabieren Sie bitte Ihren Nachnamen.", ""]], qEs: "Deletree su apellido (los acentos españoles no se deletrean).", model: "{SPELL}." },
  { variants: [["Wie ist Ihre Telefonnummer?", ""], ["Wie ist Ihre Postleitzahl?", ""]], qEs: "Diga su teléfono o código postal, cifra a cifra.", model: "Null - eins - sieben - sechs - vier - vier - fünf - fünf." },
];

/** Teil 2: tarjetas Thema+Wort — formular pregunta Y respuesta */
const T2_POOL: { card: string; model: string }[] = [
  { card: "Thema: Essen und Trinken. Wort: Frühstück.", model: "Was isst du zum Frühstück? — Zum Frühstück esse ich Brot mit Käse und trinke Kaffee." },
  { card: "Thema: Freizeit. Wort: Wochenende.", model: "Was machst du am Wochenende? — Am Wochenende spiele ich Fußball und lese." },
  { card: "Thema: Familie. Wort: Geschwister.", model: "Hast du Geschwister? — Ja, ich habe einen Bruder und eine Schwester." },
  { card: "Thema: Arbeit. Wort: Beruf.", model: "Was bist du von Beruf? — Ich bin Lehrerin von Beruf." },
  { card: "Thema: Wohnen. Wort: Wohnung.", model: "Wie ist deine Wohnung? — Meine Wohnung ist klein, aber schön. Sie hat zwei Zimmer." },
  { card: "Thema: Reisen. Wort: Urlaub.", model: "Wohin fährst du im Urlaub? — Im Urlaub fahre ich nach Spanien." },
  { card: "Thema: Gesundheit. Wort: Sport.", model: "Machst du Sport? — Ja, ich schwimme zweimal pro Woche." },
  { card: "Thema: Einkaufen. Wort: Supermarkt.", model: "Was kaufst du im Supermarkt? — Ich kaufe Brot, Obst und Milch im Supermarkt." },
];

/** Teil 3: peticiones desde imagen + reaccionar a la petición de otro */
const T3_POOL: { q: string; qEs: string; model: string }[] = [
  { q: "Bild: ein Fenster. Formulieren Sie eine Bitte.", qEs: "Formula una petición (imperativo formal o Können Sie...).", model: "Öffnen Sie bitte das Fenster!" },
  { q: "Bild: eine Tür. Formulieren Sie eine Bitte.", qEs: "Formula una petición.", model: "Machen Sie bitte die Tür zu!" },
  { q: "Bild: ein Glas Wasser. Formulieren Sie eine Bitte.", qEs: "Formula una petición.", model: "Können Sie mir bitte ein Glas Wasser bringen?" },
  { q: "Bild: ein Handy. Formulieren Sie eine Bitte.", qEs: "Formula una petición.", model: "Schalten Sie bitte das Handy aus!" },
];

const REACT_POOL: { q: string; qEs: string; model: string }[] = [
  { q: "Ein Kandidat sagt zu Ihnen: „Öffnen Sie bitte das Fenster!“ Reagieren Sie.", qEs: "En el examen real también REACCIONAS a peticiones — responde con naturalidad.", model: "Ja, natürlich! Kein Problem." },
  { q: "Eine Kandidatin sagt zu Ihnen: „Können Sie mir bitte helfen?“ Reagieren Sie.", qEs: "Reacciona a la petición.", model: "Ja, gern! Was brauchen Sie?" },
];

/* Personas ficticias para las respuestas modelo — una distinta por sesión,
   apellidos sin acentos ni eñes (se deletrean tal cual). Cada una con su
   país/ciudad/profesión (género concordado). Sofía y Lucía coinciden con sus
   apariciones en el contenido (curso y Modellsatz A) — misma biografía. */
const PERSONAS: { name: string; spell: string; land: string; stadt: string; beruf: string }[] = [
  { name: "Sofía Marín", spell: "M-A-R-I-N", land: "Mexiko", stadt: "Berlin", beruf: "Programmiererin" },
  { name: "Diego Ramos", spell: "R-A-M-O-S", land: "Mexiko", stadt: "Hamburg", beruf: "Kellner" },
  { name: "Lucía Ortega", spell: "O-R-T-E-G-A", land: "Spanien", stadt: "Valencia", beruf: "Programmiererin" },
  { name: "Carmen Vidal", spell: "V-I-D-A-L", land: "Spanien", stadt: "München", beruf: "Lehrerin" },
  { name: "Pablo Serrano", spell: "S-E-R-R-A-N-O", land: "Kolumbien", stadt: "Wien", beruf: "Student" },
];

export function buildInterviewDe(): InterviewItem[] {
  const persona = pickOne(PERSONAS);
  const fill = (m: string) =>
    m
      .replace("{NAME}", persona.name)
      .replace("{SPELL}", persona.spell)
      .replace("{LAND}", persona.land)
      .replace("{STADT}", persona.stadt)
      .replace("{BERUF}", persona.beruf);
  const t1: InterviewItem[] = T1_POOL.map((t) => ({
    part: 1,
    question: t.variants[Math.floor(Math.random() * t.variants.length)][0],
    questionEs: t.qEs,
    model: fill(t.model),
    weight: 3 / T1_POOL.length, // Teil 1 vale 3 pts en el examen real
  }));
  const t2: InterviewItem[] = sample(T2_POOL, 4).map((t) => ({
    part: 2,
    question: `${t.card} Stellen Sie eine Frage und antworten Sie.`,
    questionEs: "Formula una pregunta con la palabra y respóndela tú también.",
    model: t.model,
    weight: 1.5, // 4 × 1.5 = 6 pts
  }));
  const t3: InterviewItem[] = [
    ...sample(T3_POOL, 2).map((t) => ({ part: 3, question: t.q, questionEs: t.qEs, model: t.model, weight: 2 })),
    ...sample(REACT_POOL, 1).map((t) => ({ part: 3, question: t.q, questionEs: t.qEs, model: t.model, weight: 2 })),
  ]; // 3 × 2 = 6 pts
  return [...t1, ...t2, ...t3];
}

// Esta entrevista reproduce el ORAL DEL A1 (Start Deutsch 1) de principio a fin:
// sus tareas, su baremo de 0-2 y su generosidad. No es un oral de B1 y no debe
// venderse como tal — el Sprechen del B1 se practica en los módulos, con sus
// tres Teile.

export const entrevistaDeA1: InterviewConfig = {
    cefr: "a1",
    levelLabel: "A1",
    resultId: INTERVIEW_ID,
    homeHref: "/idioma/de",
    langTag: "de",
    chip: (p) => `Sprechen · Teil ${p}`,
    intro:
      "El Sprechen del Start Deutsch 1 con sus pesos reales: presentación (3 pts), tarjetas de tema (6 pts) y peticiones con reacción (6 pts). Cada sesión cambia las preguntas y las tarjetas. Responde EN VOZ ALTA primero — hablar es el examen — y escribe lo que dijiste",
    placeholder: "Escribe tu respuesta en alemán...",
    totalPts: 15,
    passPct: 60,
    passTitle: "Bestanden — aprobarías el oral",
    failTitle: "Todavía no — el corte es 60%",
    doneTail: "con los pesos del examen real. Repítela: cada sesión trae preguntas y tarjetas distintas.",
    build: buildInterviewDe,
};
