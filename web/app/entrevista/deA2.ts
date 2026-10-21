// Pools y textos del examinador de esta partitura. Apartados del
// player y del baremo: si vuelven a page.tsx, el archivo deja de poder abrirse.

import { interviewResultId } from "@/lib/ids";
import { sample } from "@/lib/shuffle";
import type { InterviewConfig, InterviewItem } from "./tipos";

export function buildInterviewDeA2(): InterviewItem[] {
  const t1 = sample([
    { q: "Erzählen Sie: Was machen Sie beruflich?", qEs: "Cuenta a qué te dedicas.", model: "Ich arbeite als Programmiererin in Berlin. Ich arbeite gern im Team." },
    { q: "Was haben Sie am Wochenende gemacht?", qEs: "¿Qué hiciste el fin de semana? (Perfekt)", model: "Am Wochenende bin ich mit Freunden ins Kino gegangen und wir haben Pizza gegessen." },
    { q: "Wie wohnen Sie?", qEs: "¿Cómo vives?", model: "Ich wohne in einer Wohnung mit zwei Zimmern. Sie ist nicht groß, aber hell." },
  ], 3).map((t) => ({ part: 1, question: t.q, questionEs: t.qEs, model: t.model, weight: 1 }));
  const t2 = sample([
    { q: "Thema: Freizeit. Sprechen Sie etwa eine Minute: Was machen Sie gern in Ihrer Freizeit?", qEs: "Habla un minuto de tu tiempo libre.", model: "In meiner Freizeit lese ich gern und gehe schwimmen. Am Wochenende treffe ich Freunde." },
    { q: "Thema: Reisen. Sprechen Sie über eine Reise, die Sie gemacht haben.", qEs: "Cuenta un viaje que hayas hecho.", model: "Letztes Jahr bin ich nach Wien gefahren. Ich habe Museen besucht und sehr gutes Essen gegessen." },
  ], 2).map((t) => ({ part: 2, question: t.q, questionEs: t.qEs, model: t.model, weight: 3 }));
  const t3 = [{
    part: 3,
    question: "Sie möchten am Samstag etwas zusammen unternehmen. Machen Sie einen Vorschlag, nennen Sie Zeit und Ort und reagieren Sie auf eine Alternative.",
    questionEs: "Planead algo juntos: propuesta, hora, lugar, y reacciona si el otro sugiere otra cosa.",
    model: "Wollen wir am Samstag um 16 Uhr ins Café gehen? Wenn das nicht passt, können wir auch am Sonntag ins Kino.",
    weight: 6,
  }];
  return [...t1, ...t2, ...t3];
}

export const entrevistaDeA2: InterviewConfig = {
    cefr: "a2",
    levelLabel: "A2",
    resultId: interviewResultId("de", "a2"),
    homeHref: "/idioma/de",
    langTag: "de",
    chip: (p) => `Sprechen · Teil ${p}`,
    intro:
      "El Sprechen del Goethe-Zertifikat A2: presentarte con Perfekt, hablar un minuto de un tema y planear algo en pareja. Corte 60%. Cada sesión cambia las tarjetas.",
    placeholder: "Escribe tu respuesta en alemán...",
    totalPts: 15,
    passPct: 60,
    passTitle: "Bestanden — aprobarías el oral A2",
    failTitle: "Todavía no — el corte es 60%",
    doneTail: "con los pesos del Goethe A2. Repítela: las tarjetas cambian.",
    build: buildInterviewDeA2,
};
