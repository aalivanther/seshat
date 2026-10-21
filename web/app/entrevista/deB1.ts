// Pools y textos del examinador de esta partitura. Apartados del
// player y del baremo: si vuelven a page.tsx, el archivo deja de poder abrirse.

import { interviewResultId } from "@/lib/ids";
import { pickOne } from "@/lib/shuffle";
import type { InterviewConfig, InterviewItem } from "./tipos";

/* ══════════════ ALEMÁN B1 — Goethe-Zertifikat B1 Sprechen ══════════════
   Tres Teile oficiales (~15 min, 100 pts, corte 60%). No es el A1 (datos
   personales) ni el A2 (ins Café / ins Kino) ni el Vortrag B2. */

/** Teil 1: Gemeinsam etwas planen — propuesta, alternativa, acuerdo. */
const DE_B1_T1: {
  vorschlag: { q: string; qEs: string; model: string };
  einigung: { q: string; qEs: string; model: string };
}[] = [
  {
    vorschlag: {
      q: "Karte: Flohmarkt. Ihr wollt am Wochenende auf einen Flohmarkt gehen. Machen Sie einen Vorschlag: welcher Markt, wann, wie kommt ihr hin? Nennen Sie eine Alternative, falls das Wetter schlecht ist.",
      qEs: "Rastro: cuál, cuándo, cómo llegáis, y un plan B si llueve. No vale quedar «ins Café».",
      model:
        "Ich würde vorschlagen, am Samstag auf den Flohmarkt am Boxhagener Platz zu gehen. Wir könnten uns um neun Uhr an der Station Samariterstraße treffen und zu Fuß gehen. Falls es regnet, gäbe es den Indoor-Flohmarkt in der Arena — da bleiben wir trocken.",
    },
    einigung: {
      q: "Euer Partner sagt: «Samstag um neun ist mir zu früh. Ich arbeite bis vierzehn Uhr.» Einigt euch auf Uhrzeit, Treffpunkt und was ihr mitnehmt (Bargeld, Tasche, etwas zu essen).",
      qEs: "El otro no puede a las nueve. Acordad hora, punto de encuentro y qué lleváis.",
      model:
        "Gut, dann treffen wir uns um fünfzehn Uhr vor dem Eingang. Ich nehme eine große Tasche und Bargeld mit, du bringst Wasser und zwei belegte Brote. Wenn einer zu spät kommt, wartet der andere zehn Minuten. Abgemacht?",
    },
  },
  {
    vorschlag: {
      q: "Karte: Abendkurs. Ihr möchtet zusammen einen Kurs an der Volkshochschule belegen. Schlagt Fach, Wochentag und ungefähren Preis vor und nennt eine Alternative, falls der Kurs voll ist.",
      qEs: "Curso de tarde: materia, día, precio aproximado, y un plan B si no hay plaza.",
      model:
        "Wie wäre es mit einem Fotokurs dienstags von 18 bis 20 Uhr? Der kostet ungefähr achtzig Euro für acht Wochen. Anna hat den letzten gemacht und war zufrieden. Falls der voll ist, könnten wir den Schreibworkshop am Mittwoch nehmen — der ist billiger.",
    },
    einigung: {
      q: "Euer Partner sagt: «Dienstag kann ich nicht, da habe ich Spätschicht.» Einigt euch auf Tag, Uhrzeit, wer die Anmeldung macht und was ihr zum ersten Termin mitbringt.",
      qEs: "El otro trabaja el martes. Acordad día, hora, quién se apunta y qué lleváis al primer día.",
      model:
        "Dann also Mittwoch um achtzehn Uhr, der Schreibworkshop. Ich mache die Anmeldung online heute Abend, du bringst zum ersten Termin ein Notizbuch und einen Stift mit. Die Kosten teilen wir nicht: jeder zahlt seinen Platz. Passt das so?",
    },
  },
  {
    vorschlag: {
      q: "Karte: Tagesausflug. Ihr plant einen Ausflug aus Berlin für einen Tag. Wohin, mit welchem Zug, wann zurück? Nennt eine Alternative, falls euer erster Ort schon bekannt ist.",
      qEs: "Excursión de un día: destino, tren, hora de vuelta, y una alternativa si el otro ya conoce el sitio.",
      model:
        "Ich schlage Potsdam vor. Wir könnten mit dem RE1 um neun Uhr fahren und gegen siebzehn Uhr zurück sein. Das Tagesticket für Berlin-Brandenburg reicht. Falls du Potsdam schon kennst, wäre auch der Wannsee gut — Baden, spazieren, und der Zug ist kürzer.",
    },
    einigung: {
      q: "Euer Partner sagt: «Potsdam kenne ich schon. Wie wäre es mit dem Wannsee?» Einigt euch auf Ziel, Abfahrt, Rückfahrt und was ihr einpackt (Essen, Ticket, Regenjacke).",
      qEs: "El otro prefiere el Wannsee. Cerrad destino, ida, vuelta y qué metéis en la mochila.",
      model:
        "Einverstanden, Wannsee. Treffpunkt um neun Uhr am Bahnhof Zoo, Rückfahrt gegen sechzehn Uhr. Ich kaufe zwei Tickets, du packst Brote und Wasser ein. Eine Regenjacke nimmt jeder selbst mit, der See ist windig. Leo kommt nur, wenn er pünktlich ist — wir warten nicht länger als zehn Minuten.",
    },
  },
  {
    vorschlag: {
      q: "Karte: Ehrenamt. Ihr wollt euch gemeinsam ehrenamtlich engagieren — Tafel, Kiezverein oder Nachhilfe. Schlagt vor: wo, welcher Wochentag, was ihr konkret macht. Nennt eine Alternative.",
      qEs: "Voluntariado: dónde, qué día, qué haríais, y un plan B si el primero no encaja.",
      model:
        "Könnten wir samstagsvormittag bei der Tafel im Kiez helfen? Sortieren und ausgeben, ungefähr drei Stunden. Herr Vogel hat das mal gemacht und sagt, sie brauchen Leute. Falls Samstag nicht geht, gäbe es Nachhilfe für Kinder mittwochnachmittags in der Stadtteilbibliothek.",
    },
    einigung: {
      q: "Euer Partner sagt: «Samstagmorgen habe ich keine Zeit. Geht es auch nachmittags?» Einigt euch auf Ort, Uhrzeit, Dauer und was ihr mitbringt (feste Schuhe, Wasser, Ausweis).",
      qEs: "El otro no puede por la mañana. Acordad sitio, hora, duración y qué lleváis.",
      model:
        "Dann die Nachhilfe am Mittwoch, von sechzehn bis achtzehn Uhr in der Stadtteilbibliothek. Ich schreibe der Koordinatorin heute, du bringst deinen Ausweis zur Anmeldung mit. Feste Schuhe brauchen wir nicht, aber Wasser und etwas Geduld ja. Zwei Stunden, nicht mehr — Nico fängt um halb sieben in der Küche an.",
    },
  },
];

/** Teil 2: Präsentation ~2 min. Estructura fija: qué es, por qué, ejemplo, cierre. */
const DE_B1_T2: { q: string; qEs: string; model: string }[] = [
  {
    q: "Halten Sie einen kurzen Vortrag (ca. 2 Minuten) zum Thema: «Ein Kurs, der mir wichtig ist». Struktur: was der Kurs ist — warum er Ihnen wichtig ist — ein konkretes Beispiel — Schluss. Sie haben 60 Sekunden Vorbereitung.",
    qEs: "Presenta un curso que te importe: qué es, por qué, un ejemplo, cierre. Un minuto de preparación.",
    model:
      "Ich möchte über meinen Deutschkurs an der Volkshochschule sprechen. Es ist ein Abendkurs, zweimal die Woche, mit Frau Schuster. Er ist mir wichtig, weil ich im Job E-Mails auf Deutsch schreiben muss und lange nur einzelne Sätze konnte. Ein Beispiel: letzte Woche habe ich zum ersten Mal eine Beschwerde an Frau Kaltenbach selbst formuliert, ohne Nico zu fragen — das hätte ich vor dem Kurs nicht geschafft. Zum Schluss: ich will die B1-Prüfung machen, aber der Kurs zählt für mich schon jetzt, nicht erst am Prüfungstag. Vielen Dank für Ihre Aufmerksamkeit.",
  },
  {
    q: "Halten Sie einen kurzen Vortrag (ca. 2 Minuten) zum Thema: «Ein Hobby, das ich ernst nehme». Struktur: was es ist — warum es Ihnen wichtig ist — ein konkretes Beispiel — Schluss. Sie haben 60 Sekunden Vorbereitung.",
    qEs: "Un hobby en serio, no «me gusta nadar»: qué es, por qué te importa, un ejemplo, cierre.",
    model:
      "Ich spreche über Fotografie. Das ist mehr als Freizeit: fast jedes Wochenende gehe ich raus, oft mit Leo, und ich lerne, mit wenig Licht zu arbeiten. Warum mir das wichtig ist: in der Woche sitze ich vor dem Rechner, und die Kamera zwingt mich, die Stadt wirklich zu sehen. Ein Beispiel: letzten Monat habe ich am Landwehrkanal eine Reihe gemacht, als es schon dunkel war, und zum ersten Mal fand ich die Bilder selbst gut. Ich will keinen Wettbewerb gewinnen, aber ich will dabei bleiben. Danke fürs Zuhören.",
  },
  {
    q: "Halten Sie einen kurzen Vortrag (ca. 2 Minuten) zum Thema: «Eine Reise, die mich verändert hat». Struktur: wohin und wann — was sich dadurch geändert hat — ein konkretes Beispiel — Schluss. Sie haben 60 Sekunden Vorbereitung.",
    qEs: "Un viaje que te cambió algo, no el recuento de un fin de semana: estructura de presentación B1.",
    model:
      "Ich möchte über eine Reise nach Wien sprechen, die ich vor zwei Jahren gemacht habe. Ich war drei Tage dort, allein, mit dem Nachtzug. Verändert hat mich nicht die Stadt, sondern dass ich zum ersten Mal ohne Freunde unterwegs war: Fahrkarten, Unterkunft, den nächsten Tag. Ein Beispiel: am zweiten Morgen habe ich den Anschlusszug verpasst und trotzdem ruhig einen Kaffee getrunken, statt in Panik zu geraten. Seitdem plane ich weniger und lasse mehr offen. Das war meine Präsentation. Vielen Dank.",
  },
  {
    q: "Halten Sie einen kurzen Vortrag (ca. 2 Minuten) zum Thema: «Ein Problem in meinem Kiez». Struktur: was das Problem ist — warum es Sie betrifft — ein Beispiel — ein möglicher nächster Schritt — Schluss. Sie haben 60 Sekunden Vorbereitung.",
    qEs: "Un problema del barrio: qué es, por qué te toca, un ejemplo, un paso posible, cierre.",
    model:
      "Ich spreche über den Lärm am Abend in meinem Kiez. Ich wohne neben einer Kneipe, und oft schlafe ich schlecht. Das betrifft mich direkt: letzten Freitag hat eine Gruppe bis halb drei vor der Tür diskutiert, und am Samstag hatte ich einen frühen Termin bei Doktor Weber. Ich bin nicht gegen Kneipen — Nico arbeitet selbst in einer Küche hier. Aber nach dreiundzwanzig Uhr könnte draußen leiser gesprochen werden. Ein nächster Schritt wäre, mit dem Wirt und mit Herrn Vogel, der uns gegenüber wohnt, eine einfache Regel zu vereinbaren. Danke für Ihre Aufmerksamkeit.",
  },
];

/** Teil 3: comentar la presentación del otro — pregunta, opinión, punto en común. */
const DE_B1_T3: { q: string; qEs: string; model: string }[] = [
  {
    q: "Ihr Partner hat gerade über «Lärm im Kiez» gesprochen. Stellen Sie eine Frage, sagen Sie Ihre Meinung und nennen Sie einen Punkt, den Sie gemeinsam haben.",
    qEs: "Una pregunta, una opinión y un punto en común — no basta con «sehr interessant».",
    model:
      "Danke für die Präsentation. Eine Frage: haben Sie schon mit dem Wirt gesprochen, oder bisher nur mit Nachbarn? Meiner Meinung nach bringt eine Regel nur etwas, wenn die Kneipe mitmacht. Gemeinsam haben wir, dass uns der Kiez wichtig ist — wir wollen ihn nicht still, sondern erträglich.",
  },
  {
    q: "Ihr Partner hat gerade über «einen Kurs an der Volkshochschule» gesprochen. Stellen Sie eine Frage, sagen Sie Ihre Meinung und nennen Sie einen Punkt, den Sie gemeinsam haben.",
    qEs: "Pregunta + opinión + algo que compartís. El Teil 3 no es aplaudir.",
    model:
      "Interessant. Eine Frage: wie viel Zeit brauchen Sie pro Woche außer dem Unterricht? Ich finde Abendkurse gut, aber nur wenn die Hausaufgaben realistisch bleiben — sonst gibt man nach einem Monat auf. Gemeinsam haben wir, dass uns die Prüfung nicht als einziges Ziel reicht: der Kurs muss im Alltag nützen.",
  },
  {
    q: "Ihr Partner hat gerade über «ein Hobby, das er ernst nimmt» gesprochen. Stellen Sie eine Frage, sagen Sie Ihre Meinung und nennen Sie einen Punkt, den Sie gemeinsam haben.",
    qEs: "Una pregunta concreta, tu postura y dónde coincidís.",
    model:
      "Eine Frage: machen Sie das Hobby allein oder mit anderen? Ich finde, ein ernstes Hobby braucht einen Termin im Kalender, sonst gewinnt immer die Arbeit. Gemeinsam haben wir, dass uns etwas außerhalb des Jobs den Kopf frei macht — bei mir ist das Schwimmen, bei Ihnen die Fotografie.",
  },
];

// Teil 1 = 40 (2×20) · Teil 2 = 40 · Teil 3 = 20 → 100.
export function buildInterviewDeB1(): InterviewItem[] {
  const karte = pickOne(DE_B1_T1);
  const thema = pickOne(DE_B1_T2);
  const nachfrage = pickOne(DE_B1_T3);
  return [
    { part: 1, question: karte.vorschlag.q, questionEs: karte.vorschlag.qEs, model: karte.vorschlag.model, weight: 20 },
    { part: 1, question: karte.einigung.q, questionEs: karte.einigung.qEs, model: karte.einigung.model, weight: 20 },
    { part: 2, question: thema.q, questionEs: thema.qEs, model: thema.model, weight: 40, prep: 60 },
    { part: 3, question: nachfrage.q, questionEs: nachfrage.qEs, model: nachfrage.model, weight: 20 },
  ];
}

export const entrevistaDeB1: InterviewConfig = {
    cefr: "b1",
    levelLabel: "B1",
    resultId: interviewResultId("de", "b1"),
    homeHref: "/idioma/de",
    langTag: "de",
    chip: (p) => `Sprechen · Teil ${p}`,
    intro:
      "El Sprechen del Goethe-Zertifikat B1: unos 15 minutos, 100 puntos, corte 60%. Teil 1 planificáis juntos (propuesta, alternativa, acuerdo: hora, lugar, qué llevar). Teil 2 presentas un tema unos dos minutos con estructura. Teil 3 comentas la presentación del otro: una pregunta, una opinión, un punto en común. Cada sesión cambia las tarjetas.",
    placeholder: "Escribe tu respuesta en alemán...",
    totalPts: 100,
    passPct: 60,
    passTitle: "Bestanden — aprobarías el oral B1",
    failTitle: "Todavía no — el corte es 60%",
    doneTail: "con los pesos del Goethe B1 (corte 60%). Repítela: las tarjetas de planificación y el tema cambian.",
    build: buildInterviewDeB1,
};
