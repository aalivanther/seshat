// Pools y textos del examinador de esta partitura. Apartados del
// player y del baremo: si vuelven a page.tsx, el archivo deja de poder abrirse.

import { interviewResultId } from "@/lib/ids";
import { pickOne } from "@/lib/shuffle";
import type { InterviewConfig, InterviewItem } from "./tipos";

export function buildInterviewDeB2(): InterviewItem[] {
  const vortrag = pickOne([
    {
      q: "Vortrag, ca. 4 Minuten. Thema: „Sollte der öffentliche Nahverkehr in Großstädten kostenlos sein?“ Gliederung (auf den Notizzettel, nicht vorlesen): 1. Einleitung mit These. 2. Zwei Argumente mit Beispiel. 3. Eine Gegenposition ernst nehmen. 4. Schluss mit Vorschlag. Danach eine Frage.",
      qEs: "15 minutos de preparación. Esquema del Vortrag: tesis · dos razones con ejemplo · una objeción · cierre. Luego una pregunta. Escribe lo que hayas dicho; no hay micrófono.",
      model: "In meinem Vortrag geht es um die Frage, ob der Nahverkehr in Großstädten kostenlos sein sollte. Ich habe das Thema gewählt, weil der Preis oft entscheidet, ob jemand den Bus nimmt oder das Auto. Erstens sinken Stau und Abgase, wenn die Fahrt nichts kostet. Zweitens gewinnen Schichtarbeiter, die vor fünf Uhr fahren müssen. Allerdings fehlen der BVG dann Einnahmen, und ohne Ersatz wird der Takt dünner, nicht dichter. Deshalb plädiere ich nicht für umsonst ohne Gegenfinanzierung, sondern für ein Sozialticket plus einen städtischen Ausgleich, der den Takt hält. Vielen Dank. Fragen beantworte ich gern.",
      follow: "Nachfrage zum Vortrag: Wer soll das kostenlose Ticket bezahlen, wenn nicht der Fahrgast — und warum gerade der?",
      followEs: "Pregunta de seguimiento: ¿quién paga, si no el viajero?",
      followModel: "Die Stadt, aus dem Parkraumerlös und einem Zuschlag auf Dienstwagen. Der Fahrgast zahlt schon mit Zeit und Umsteigen. Wer das Auto in der zweiten Reihe abstellt, verursacht die Kosten, die der Bus dann tragen muss.",
    },
    {
      q: "Vortrag, ca. 4 Minuten. Thema: „Sollte Homeoffice in Büroberufen zwei Tage die Woche Pflicht sein?“ Gliederung: These, zwei Argumente mit Beispiel, Gegenposition, Schluss. Danach eine Frage.",
      qEs: "15 minutos de preparación. Otro tema: Homeoffice obligatorio dos días. Mismo esquema. Escribe lo que hayas dicho; no hay micrófono.",
      model: "In meinem Vortrag geht es um die Pflicht zu zwei Homeoffice-Tagen. Ich habe das Thema gewählt, weil Wahl und Zwang nicht dasselbe sind. Erstens entlastet der freie Tag den Nahverkehr. Zweitens hilft er, wenn das Kind krank ist. Allerdings spaltet die Pflicht die Küche und die Pflege, wo kein Schreibtisch existiert. Deshalb plädiere ich für Wahl im Büro und Ausnahme im Betrieb, nicht für eine Regel für alle. Vielen Dank.",
      follow: "Nachfrage: Was sagen Sie der Krankenschwester, die nicht von zu Hause pflegen kann?",
      followEs: "Pregunta de la examinadora: ¿y quien no tiene escritorio?",
      followModel: "Für sie gilt die Pflicht nicht. Wer pflegt, braucht den Saal, nicht den Laptop. Die Ausnahme muss in der Grafik sichtbar sein, sonst wird ihr Beruf zur Fußnote.",
    },
  ]);
  return [
    {
      part: 1,
      question: vortrag.q,
      questionEs: vortrag.qEs,
      model: vortrag.model,
      weight: 36,
      prep: 900,
      schemaChecks: [
        { re: "(These|In meinem Vortrag|Ich habe das Thema)", label: "Einleitung mit These" },
        { re: "(Erstens|Zweitens|erstens|zweitens)", label: "zwei Argumente" },
        { re: "(Allerdings|andererseits|Gegenposition)", label: "Gegenposition" },
        { re: "(Deshalb|plädiere|Zum Schluss)", label: "Schluss mit Vorschlag" },
      ],
    },
    {
      part: 1,
      question: vortrag.follow,
      questionEs: vortrag.followEs,
      model: vortrag.followModel,
      weight: 16,
    },
    {
      part: 2,
      question:
        "Diskussion: „Sonntags sollten alle Geschäfte öffnen dürfen.“ Sie sind DAGEGEN. Hören Sie zu, räumen Sie einen Punkt ein, bleiben Sie bei Ihrer Linie und schlagen Sie einen Kompromiss vor.",
      questionEs: "Diskussion: te toca estar en contra. Concedes un punto, no te rindes, propones un compromiso.",
      model:
        "Einen Punkt räume ich ein: Schichtpersonal braucht sonntags Brot. Aber die ganze Innenstadt zu öffnen zerstört den einen freien Tag der Verkäuferinnen. Kompromiss: Bäckereien und Apotheken ja, der Rest bleibt zu. Das ist Versorgung, nicht Shopping.",
      weight: 24,
    },
    {
      part: 2,
      question: "Ihr Gegenüber sagt: «Dann gehen die Leute ins Internet, und die Läden sterben sowieso.» Reagieren Sie, ohne den Sonntag aufzugeben.",
      questionEs: "Te contraatacan con el comercio online. Responde sin ceder el domingo.",
      model:
        "Das Internet ist schon da, sonntags und nachts. Wer den Laden sonntags aufmacht, rettet ihn nicht: er verlängert denselben Umsatz auf sieben Tage mit denselben Leuten. Ich bleibe dabei: ein Ruhetag, und Werktags länger, wenn es sein muss.",
      weight: 12,
    },
    {
      part: 2,
      question: "Einigt euch auf EINEN konkreten Kompromiss in einem Satz: wer öffnet, wer nicht, und was ihr nächste Woche prüft.",
      questionEs: "Cerrad un compromiso en una frase: quién abre, quién no, qué se revisa.",
      model:
        "Also gut: Bäckerei und Apotheke sonntags von zehn bis dreizehn, der Rest bleibt zu, und in vier Wochen zählen wir, ob das Schichtpersonal damit klarkommt. Abgemacht?",
      weight: 12,
    },
  ];
}

export const entrevistaDeB2: InterviewConfig = {
    cefr: "b2",
    levelLabel: "B2",
    resultId: interviewResultId("de", "b2"),
    homeHref: "/idioma/de",
    langTag: "de",
    chip: (p) => `Sprechen · Teil ${p}`,
    intro:
      "El Sprechen del Goethe-Zertifikat B2: un Vortrag de cuatro minutos con estructura propia y una Diskussion hasta el compromiso. 100 puntos, corte 60%, 15 minutos de preparación. No es el A1 ni el A2: aquí hay que argumentar y llegar a un acuerdo.",
    placeholder: "Escribe tu respuesta en alemán...",
    totalPts: 100,
    passPct: 60,
    passTitle: "Bestanden — aprobarías el oral B2",
    failTitle: "Todavía no — el corte es 60%",
    doneTail: "con el baremo modular del Goethe B2. El Vortrag y la Diskussion se aprueban hablando, no leyendo.",
    build: buildInterviewDeB2,
};
