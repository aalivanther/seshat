import type { ExamSet, RubricCriterion } from "@/lib/examTypes";

// ─────────────────────────────────────────────────────────────────────────────
// Modellsatz B1 B — segundo simulacro del GOETHE-ZERTIFIKAT B1 (= ÖSD B1).
// Formato fiel al oficial (PLAN-B1 §2), Teil por Teil:
//   LESEN   65′ · 5 Teile · 30 ítems  → 6 R/F · 3+3 MC3 · 7↔10 Zuordnung (con
//                                        la trampa del «0») · 7 Ja/Nein · 4 MC3
//   HÖREN   40′ · 4 Teile · 30 ítems  → escuchas 2-1-1-2 (T2 y T3 de UNA pasada)
//   SCHREIBEN 60′ · 3 tareas · 100 pts → 40 + 40 + 20, rúbrica en bandas A-E
//   SPRECHEN     · 3 Teile · 100 pts  → 28 + 40 + 16 + 16 (Aussprache)
// El examen es MODULAR: cada módulo vale 100 puntos, se aprueba con 60 y NO hay
// compensación entre módulos. En Lesen y Hören, 18 de 30 aciertos = 60 puntos.
//
// Temas: DISTINTOS del Modellsatz A. Este B: Nachbarschaftshilfe (compra a
// vecinos), huertos urbanos, prácticas no pagadas y la Stadtbibliothek de
// barrio. Plurizéntrico: prensa austriaca (Lesen Teil 2) y reglamento suizo
// (Lesen Teil 5). Elenco en Berlín; el personaje de A1·A2 no entra aquí.
// ─────────────────────────────────────────────────────────────────────────────

/** Rúbrica de las tareas de 40 puntos (Schreiben Aufgabe 1 y 2).
 *  Bandas A-E sin valores intermedios; Erfüllung = E ⇒ toda la tarea vale 0. */
const RUBRIC_SCHREIBEN_40: RubricCriterion[] = [
  {
    id: "erfuellung",
    label: "Erfüllung — cumplimiento de la tarea",
    help: "¿Trataste TODOS los puntos de contenido con una o dos frases cada uno? ¿Llegaste a las ~80 palabras y elegiste el tipo de texto y el registro correctos? Menos del 50 % de las palabras o tema equivocado = E, y E aquí son 0 puntos en toda la tarea.",
    bands: [10, 7.5, 5, 2.5, 0],
    fatalE: true,
  },
  {
    id: "kohaerenz",
    label: "Kohärenz — estructura y conexión",
    help: "Anrede, introducción, los puntos en un orden lógico y despedida. ¿Hay conectores de verdad (deshalb, außerdem, obwohl, trotzdem) y no solo frases sueltas pegadas con und?",
    bands: [10, 7.5, 5, 2.5, 0],
  },
  {
    id: "wortschatz",
    label: "Wortschatz — vocabulario",
    help: "Espectro (¿variedad, o repites las mismas cinco palabras?) y dominio (¿las usas bien?). Un fallo puntual que no impide entender no baja de banda.",
    bands: [10, 7.5, 5, 2.5, 0],
  },
  {
    id: "strukturen",
    label: "Strukturen — morfología, sintaxis y ortografía",
    help: "Verbo en posición 2, verbo al final en la subordinada, inversión tras deshalb/trotzdem, casos, mayúsculas en los sustantivos. Cuenta si los errores estorban a la comprensión, no cuántos hay.",
    bands: [10, 7.5, 5, 2.5, 0],
  },
];

/** Rúbrica de la tarea de 20 puntos (Schreiben Aufgabe 3: mail formal).
 *  Reparto oficial: 4 + 4 + 6 + 6. */
const RUBRIC_SCHREIBEN_20: RubricCriterion[] = [
  {
    id: "erfuellung",
    label: "Erfüllung — cumplimiento de la tarea",
    help: "¿Están los dos puntos de contenido, las ~40 palabras y el registro formal (Sie, Anrede y Gruß obligatorios)? Un mail formal escrito con du pierde la banda aquí. E = 0 puntos en toda la tarea.",
    bands: [4, 3, 2, 1, 0],
    fatalE: true,
  },
  {
    id: "kohaerenz",
    label: "Kohärenz — estructura y conexión",
    help: "Saludo, motivo, petición y despedida en ese orden, con frases enlazadas. En 40 palabras basta con que se lea como una carta, no como una lista.",
    bands: [4, 3, 2, 1, 0],
  },
  {
    id: "wortschatz",
    label: "Wortschatz — vocabulario",
    help: "Fórmulas de cortesía correctas (leider, Entschuldigung, Könnten Sie…?, Ich hätte gern…) y precisión al nombrar el motivo.",
    bands: [6, 4.5, 3, 1.5, 0],
  },
  {
    id: "strukturen",
    label: "Strukturen — morfología, sintaxis y ortografía",
    help: "Konjunktiv II de cortesía bien formado, orden de la subordinada, Sie con mayúscula siempre.",
    bands: [6, 4.5, 3, 1.5, 0],
  },
];

/** LA AUSSPRACHE NO ES UNA TAREA. En el examen real vale 16 de los 100 puntos
 *  del oral, pero no se examina aparte: los dos examinadores la puntúan sobre
 *  TODO lo que el candidato ha dicho en los tres Teile. Aquí va, por tanto,
 *  como un criterio más dentro de cada rúbrica, con su peso repartido en
 *  proporción al tiempo que se habla en cada Teil: 4 (T1) + 8 (T2) + 4 (T3) =
 *  16. Por eso los Teile suman 32 + 48 + 20 = 100 en vez de 28 + 40 + 16: son
 *  los mismos puntos oficiales, con la Aussprache dentro y no al lado. */
const AUSSPRACHE_CRITERION = (points: number): RubricCriterion => ({
  id: "aussprache",
  label: "Aussprache — melodía, acento y sonidos",
  help: "Se puntúa sobre todo lo que hablas, no en una tarea aparte. Satzmelodie (la pregunta sube, la afirmación baja) · Wortakzent (la sílaba fuerte de la palabra y el prefijo de los separables: MITgebracht) · einzelne Laute: ü/ö, la ch de ich frente a la de ach, sp-/st- iniciales como «schp-/scht-», la h muda. Una E aquí no anula la tarea: no es «Erfüllung».",
  bands: [points, points * 0.75, points * 0.5, points * 0.25, 0],
});

/** Sprechen Teil 1 (28 + 4 de Aussprache = 32 pts): 8 + 4 + 8 + 8 + 4. El
 *  criterio propio es «Interaktion»: hablar solo, sin reaccionar al compañero,
 *  hunde la nota. */
const RUBRIC_SPRECHEN_T1: RubricCriterion[] = [
  {
    id: "erfuellung",
    label: "Erfüllung — cumplimiento de la tarea",
    help: "¿Tratasteis los cuatro Leitpunkte y el punto abierto, y llegasteis a una decisión común? Quedarse en dos puntos baja la banda; no planificar nada es E, y E son 0 puntos en la tarea.",
    bands: [8, 6, 4, 2, 0],
    fatalE: true,
  },
  {
    id: "interaktion",
    label: "Interaktion — negociación",
    help: "Proponer, REACCIONAR a lo que propone el otro (Gute Idee, aber…), contraproponer y cerrar el acuerdo. Soltar tu plan sin escuchar es el error más caro de este Teil.",
    bands: [4, 3, 2, 1, 0],
  },
  {
    id: "wortschatz",
    label: "Wortschatz — vocabulario",
    help: "Fórmulas de propuesta y de acuerdo (Wie wäre es, wenn…? / Sollen wir…? / Einverstanden), y léxico concreto del plan.",
    bands: [8, 6, 4, 2, 0],
  },
  {
    id: "strukturen",
    label: "Strukturen — gramática",
    help: "Konjunktiv II de propuesta, subordinadas con weil/damit, orden de la frase. Que un error puntual no te frene: aquí se premia seguir hablando.",
    bands: [8, 6, 4, 2, 0],
  },
  AUSSPRACHE_CRITERION(4),
];

/** Sprechen Teil 2 (40 + 8 de Aussprache = 48 pts): 12 + 4 + 12 + 12 + 8.
 *  «Erfüllung» se mide por cuántas de las 5 diapositivas tratas con contenido
 *  suficiente (las 5 = A, 1 = D). */
const RUBRIC_SPRECHEN_T2: RubricCriterion[] = [
  {
    id: "erfuellung",
    label: "Erfüllung — las 5 diapositivas",
    help: "A = las cinco tratadas con contenido y extensión suficientes · B = cuatro · C = tres · D = una o dos · E = presentación no evaluable (y E son 0 puntos de los 40).",
    bands: [12, 9, 6, 3, 0],
    fatalE: true,
  },
  {
    id: "kohaerenz",
    label: "Kohärenz — hilo del monólogo",
    help: "¿Se nota el paso de una diapositiva a la siguiente (Zuerst… / Dann möchte ich… / Zum Schluss…)? ¿Hablaste unos 3 minutos sin quedarte en blanco?",
    bands: [4, 3, 2, 1, 0],
  },
  {
    id: "wortschatz",
    label: "Wortschatz — vocabulario",
    help: "Léxico del tema y, sobre todo, el de la opinión: meiner Meinung nach, einerseits… andererseits, ein Vorteil/Nachteil ist, dass…",
    bands: [12, 9, 6, 3, 0],
  },
  {
    id: "strukturen",
    label: "Strukturen — gramática",
    help: "Subordinadas encadenadas, comparativo, pasiva si toca. Hablado se perdona más que escrito, pero el verbo tiene que caer donde debe.",
    bands: [12, 9, 6, 3, 0],
  },
  AUSSPRACHE_CRITERION(8),
];

/** Sprechen Teil 3 (16 + 4 de Aussprache = 20 pts): «Erfüllung» — dar
 *  feedback, PREGUNTAR (es obligatorio y puntúa) y responder a lo que te
 *  preguntan — más el tramo de Aussprache que le toca. */
const RUBRIC_SPRECHEN_T3: RubricCriterion[] = [
  {
    id: "erfuellung",
    label: "Erfüllung — feedback, pregunta y respuesta",
    help: "A = valoras la presentación del compañero, le haces una pregunta pertinente y respondes con contenido a su pregunta y a la del examinador · D = solo un elogio corto y ninguna pregunta · E = no evaluable (0 puntos).",
    bands: [16, 12, 8, 4, 0],
    fatalE: true,
  },
  AUSSPRACHE_CRITERION(4),
];

export const examB1B: ExamSet = {
  id: "b1-sim-b",
  level: "b1",
  title: "Modellsatz B1 B",
  description:
    "Simulacro completo y fiel del Goethe-Zertifikat B1 (= ÖSD B1): Lesen 65′, Hören 40′ con escuchas 2-1-1-2, Schreiben 60′ y Sprechen. Examen MODULAR — cada módulo vale 100 puntos y se aprueba por separado con 60, sin compensación. Segundo simulacro, mismos baremos. Temas: ayuda vecinal, huertos urbanos, prácticas no pagadas y la biblioteca de barrio. Textos distintos del Modellsatz A: no se recicla ni un párrafo.",
  scoring: {
    passPct: 60,
    modular: true,
    // 30 ítems × 3,333 = 100 puntos. 18 aciertos = 60 = aprobado.
    pointsPerItem: { lesen: 100 / 30, hoeren: 100 / 30 },
    bands: [
      { min: 90, label: "sehr gut" },
      { min: 80, label: "gut" },
      { min: 70, label: "befriedigend" },
      { min: 60, label: "ausreichend" },
      { min: 0, label: "nicht bestanden" },
    ],
  },
  sections: [
    // ══════════════════════════ LESEN · 65 min ══════════════════════════
    {
      skill: "lesen",
      label: "Lesen",
      minutes: 65,
      teile: [
        // ── Teil 1 · 10 min · 6 ítems · Korrespondenz lesen ──────────────
        {
          title: "Lesen · Teil 1",
          instruction:
            "Lesen Sie den Text und die Aufgaben 1 bis 6. Kreuzen Sie an: Richtig oder Falsch.\n\n" +
            "Beispiel (Aufgabe 0): „Sofía kauft donnerstags für Nachbarn ein.“ — Lösung: Richtig. Das steht schon im dritten Absatz des Textes.",
          instructionEs:
            "Lee el texto y las preguntas 1 a 6. Marca: Richtig (verdadero) o Falsch (falso). Tienes 10 minutos. Ojo: el texto es largo y la afirmación casi nunca repite sus palabras — hay que entender la idea, no cazar la palabra.\n\n" +
            "Como en el examen real, el Teil empieza con un ejemplo ya resuelto (el 0) que no puntúa: «Sofía compra los jueves para vecinos» → Richtig, porque lo dice el tercer párrafo. Los ítems que cuentan son del 1 al 6.",
          items: [
            {
              kind: "lesen-text",
              id: "b1b-l1",
              title: "Aus Sofías Blog: Mit zwei Taschen durch den Kiez",
              text:
                "Seit acht Monaten gehe ich für Nachbarn einkaufen, und ich hätte am Anfang nie gedacht, dass mich das so verändern würde.\n\n" +
                "Angefangen hat alles im letzten Frühjahr. Mein Nachbar Herr Vogel war nach einem Krankenhausaufenthalt wieder zu Hause, kam aber mit der Treppe noch nicht klar. Anna, die unten wohnt und Krankenschwester ist, hat mir vom Kieztreff erzählt. Dort organisiert man Nachbarschaftshilfe: Einkaufen, Gesellschaft, kleine Besorgungen. Ehrlich gesagt war ich skeptisch. Ich arbeite Vollzeit als Programmiererin, oft bis in den Abend, und mein Kalender sah schon voll genug aus. Ich bin trotzdem einmal hingegangen, nur um zu hören, worum es geht. Die Koordinatorin hat mir nicht sofort eine Liste in die Hand gedrückt. Sie hat zuerst gefragt, welchen Wochentag ich wirklich frei habe. Donnerstagabend nach der Arbeit, habe ich gesagt. Genau damit haben wir dann geplant.\n\n" +
                "Heute kaufe ich jeden Donnerstag für zwei ältere Nachbarn ein: für Herrn Vogel und für Frau Krüger eine Etage höher. Die Listen liegen ab achtzehn Uhr in einem Umschlag an ihrer Tür. Ich gehe zum Markt um die Ecke, zur Bäckerei und manchmal zur Drogerie. Medikamente hole ich nicht — das macht Anna, weil sie weiß, worauf man achten muss. Inzwischen bleibe ich oft noch ein paar Minuten auf dem Flur stehen. Herr Vogel erzählt von früher, und ich merke, dass ich den Kiez zum ersten Mal wirklich kenne.\n\n" +
                "Ganz glatt ist es nicht gelaufen. Im Juni habe ich auf der Liste von Frau Krüger „Butter“ gelesen und die teure Marke gekauft, die sie nie nimmt. Sie war nicht unfreundlich, aber sehr deutlich: Bitte genau das kaufen, was da steht, sonst wird die Rente knapp. Ich war so verlegen, dass ich die Butter selbst bezahlt habe. Seitdem fotografiere ich jede Liste, bevor ich in den Laden gehe. Dieser Fehler hat mich beinahe dazu gebracht, aufzuhören. Die anderen Helferinnen im Treffpunkt haben mich gehalten. Wir trinken einmal im Monat einen Kaffee und erzählen uns genau solche Geschichten. Ohne diese Runde wäre ich heute nicht mehr dabei.\n\n" +
                "Bezahlt wird die Hilfe nicht, und das ist für mich in Ordnung. Manchmal stellt Herr Vogel eine Tasse Kaffee hin, mehr nicht. Was ich bekomme, ist etwas anderes: Ich kenne die Verkäuferin in der Bäckerei mit Namen, ich weiß, wann der Markt ruhig ist, und ich gehe nach dem Einkauf besser gelaunt nach Hause als nach einem Abend vor dem Bildschirm.\n\n" +
                "Leo, der bei uns im Haus studiert, will jetzt auch mitmachen, allerdings lieber im Garten hinter dem Treffpunkt. Mein Rat an alle, die überlegen: Fangt klein an. Ein Abend in der Woche, den man wirklich hat, ist mehr wert als große Pläne, die man nie einhält. Die Nachbarn brauchen keine Heldin. Sie brauchen jemanden, der kommt.",
              statements: [
                {
                  id: "b1b-l1-1",
                  statement:
                    "Sofía war sofort begeistert, als Anna ihr von der Nachbarschaftshilfe erzählte.",
                  statementEs:
                    "Sofía se entusiasmó de inmediato cuando Anna le habló de la ayuda vecinal.",
                  richtig: false,
                },
                {
                  id: "b1b-l1-2",
                  statement:
                    "Sofía kauft donnerstags für zwei ältere Nachbarn ein.",
                  statementEs:
                    "Sofía hace la compra los jueves para dos vecinos mayores.",
                  richtig: true,
                },
                {
                  id: "b1b-l1-3",
                  statement:
                    "Sofía holt für die Nachbarn auch die Medikamente aus der Apotheke.",
                  statementEs:
                    "Sofía también recoge los medicamentos de los vecinos en la farmacia.",
                  richtig: false,
                },
                {
                  id: "b1b-l1-4",
                  statement:
                    "Sofía hat einmal die falsche Butter gekauft und danach fast aufgehört.",
                  statementEs:
                    "Sofía compró una vez la mantequilla equivocada y después estuvo a punto de dejarlo.",
                  richtig: true,
                },
                {
                  id: "b1b-l1-5",
                  statement: "Sofía bekommt für das Einkaufen ein kleines Gehalt.",
                  statementEs: "Sofía cobra un pequeño sueldo por hacer la compra.",
                  richtig: false,
                },
                {
                  id: "b1b-l1-6",
                  statement:
                    "Sofía rät, mit einem Abend in der Woche anzufangen, den man wirklich hat.",
                  statementEs:
                    "Sofía aconseja empezar con una tarde a la semana que uno tenga de verdad.",
                  richtig: true,
                },
              ],
            },
          ],
        },

        // ── Teil 2 · 20 min · 6 ítems · dos textos de prensa ×3 MC3 ──────
        {
          title: "Lesen · Teil 2",
          instruction:
            "Lesen Sie die beiden Texte aus der Presse und die Aufgaben 7 bis 12. Wählen Sie bei jeder Aufgabe die richtige Lösung a, b oder c.\n\n" +
            "Beispiel (Aufgabe 0): Worum geht es in Text 1? a) um den Bau neuer Parks · b) um Gärten, die Nachbarn in der Stadt gemeinsam nutzen · c) um den Gemüsepreis auf dem Wochenmarkt — Lösung: b.",
          instructionEs:
            "Lee los dos textos de prensa y las preguntas 7 a 12. Elige en cada una la opción correcta a, b o c. Tienes 20 minutos: el primer texto vale las preguntas 7-9 y el segundo las 10-12.\n\n" +
            "Ejemplo resuelto (0): «¿De qué trata el texto 1?» → b) de huertos que los vecinos comparten en la ciudad. Fíjate en la mecánica: la opción c) suena cotidiana (el mercado) y aun así es falsa. Ese es el distractor típico del Teil.\n\n" +
            "Aviso de fidelidad: este 0 lo ponemos nosotros. En el examen real el Teil 2 arranca directamente en la 7 — solo los Teile 1, 3 y 4 del Lesen traen un ejemplo resuelto impreso.",
          items: [
            // ---- Texto A (prensa alemana): huertos urbanos ----
            {
              kind: "lesen-mc",
              id: "b1b-l2-7",
              title: "Text 1 — Die Stadt als Beet",
              text:
                "Immer mehr Menschen in deutschen Großstädten gärtnern nicht auf dem Balkon, sondern gemeinsam auf einer Fläche im Quartier. Eine Untersuchung der Hochschule für Technik Stuttgart zeigt: Die Zahl der Nachbarschaftsgärten hat sich in zehn Jahren ungefähr verdoppelt. In München, Leipzig und Köln stehen Interessierte oft zwei Jahre auf der Warteliste, bevor sie ein Beet bekommen.\n\n" +
                "Interessant ist vor allem, warum die Leute kommen. Lange galt das gemeinsame Gärtnern als Weg, billig Gemüse zu ernten. Das stimmt so nicht mehr. Zwar nennen 54 Prozent der Befragten die Ernte als einen Grund, doch direkt danach kommen zwei andere Argumente: man ist an der frischen Luft, und man redet mit Nachbarn, die man sonst nur im Treppenhaus grüßt. „Der Spargedanke wird in Umfragen oft genannt, entscheidet aber selten allein“, sagt die Landschaftsplanerin Dr. Sigrid Donath. „Gegärtnert wird, weil es gut tut und weil man Leute trifft. Dass dabei Tomaten wachsen, ist ein willkommener Zusatz, kein Motiv.“\n\n" +
                "Verändert hat sich auch die Rolle der Städte. Wo ungenutzte Flächen und ein Wasseranschluss bereitstehen, entstehen Gärten. Wo nur ein Pressefoto gemacht wird, bleibt das Beet eine Idee. Das hat Folgen, über die selten gesprochen wird: Ein Garten ohne Wasser in einem heißen Sommer gibt nach zwei Monaten auf.\n\n" +
                "Donath sieht es nüchtern: Solange die Städte keine Flächen und keinen Hahn zur Verfügung stellen, ändert der Trend wenig. Wirklich etwas bringe der Nachbarschaftsgarten erst dann, wenn er verlässlich da ist — und genau das lasse sich bisher nur in wenigen Bezirken nachweisen.",
              question: "Was hat die Untersuchung der Hochschule Stuttgart ergeben?",
              questionEs: "¿Qué ha revelado el estudio de la universidad de Stuttgart?",
              options: [
                "Nachbarschaftsgärten gibt es heute seltener als vor zehn Jahren.",
                "Die Zahl der Nachbarschaftsgärten in Großstädten ist deutlich gestiegen.",
                "Die meisten Gärten entstehen auf dem Land, nicht in der Stadt.",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "b1b-l2-8",
              question: "Wie erklärt Dr. Sigrid Donath, warum Menschen im Quartier gärtnern?",
              questionEs:
                "¿Cómo explica la doctora Sigrid Donath por qué la gente cultiva en el barrio?",
              options: [
                "Die meisten kommen vor allem, um Geld beim Gemüse zu sparen.",
                "Frische Luft und der Kontakt zu Nachbarn wiegen für viele schwerer als die Ernte.",
                "Die Städte zahlen den Gärtnerinnen und Gärtnern eine kleine Prämie.",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "b1b-l2-9",
              question: "Was sagt der Text über die Rolle der Städte?",
              questionEs: "¿Qué dice el texto sobre el papel de las ciudades?",
              options: [
                "Ein Garten ohne Wasseranschluss hält einen heißen Sommer oft nicht durch.",
                "Pressefotos reichen aus, damit ein Beet im Quartier entsteht.",
                "München, Leipzig und Köln haben keine Wartelisten mehr.",
              ],
              answer: 0,
            },
            // ---- Texto B (prensa austriaca, con nota al pie) ----
            {
              kind: "lesen-mc",
              id: "b1b-l2-10",
              title: "Text 2 — Unbezahlt nach der Matura (aus der Wiener Zeitung)",
              text:
                "Rund vier von zehn Maturantinnen und Maturanten* in Wien beginnen im Jänner* nach der Prüfung ein Praktikum. Das zeigt eine Erhebung der Arbeiterkammer, für die im Frühjahr 900 junge Menschen befragt wurden. Zwei Drittel dieser Praktika sind unbezahlt. Wer eine Lehre* beginnt, verdient vom ersten Tag an; wer ein Praktikum sucht, oft nicht.\n\n" +
                "Warum sie es trotzdem machen, überrascht viele Eltern: Die große Mehrheit hofft auf eine feste Stelle danach, nicht auf das Geld im Umschlag. „Ein unbezahltes Praktikum ist für Betriebe billig und für Jugendliche ohne Familienrückhalt oft unmöglich“, sagt Studienleiter Mag. Lorenz Haberl. Wer im Jänner Miete zahlen muss, nimmt die Lehre oder einen Job an der Kassa*, nicht das spannende Praktikum in einer Agentur.\n\n" +
                "Die Betriebsrätin Helene Kogler hält unbezahlte Praktika nur in den ersten zwei Wochen für vertretbar, etwa als Schnuppern in den Ferien. Alles, was länger dauert und echte Arbeit ist, müsse bezahlt werden — mindestens so viel wie in der Lehre im ersten Jahr. „Wer acht Stunden Mails schreibt, ist kein Gast. Der oder die arbeitet.“\n\n" +
                "Rechtlich ist in Österreich vieles geregelt, Lücken bleiben aber. Haberl rät allen denselben Satz: vor dem ersten Tag einen schriftlichen Vertrag verlangen, mit Dauer, Aufgaben und einer Aufwandsentschädigung, wenn es sich ausgeht. Auch wegen der Jause*, die angeblich gratis dazu gibt, die Miete aber nicht zahlt.",
              footnote:
                "* Matura = österreichischer Standard für „Abitur“ · Jänner = österreichischer Standard für „Januar“ · Lehre = duale Berufsausbildung · Kassa = österreichischer Standard für „Kasse“ · Jause = österreichisch für „Zwischenmahlzeit, Imbiss“ · sich ausgehen = österreichisch für „sich rechnen, möglich sein“.",
              question: "Wofür entscheiden sich viele Jugendliche statt für ein unbezahltes Praktikum?",
              questionEs:
                "¿Qué eligen muchos jóvenes en lugar de unas prácticas no pagadas?",
              options: [
                "eine Lehre oder einen Job, weil sie Geld brauchen",
                "ein Studium ohne Matura",
                "ein längeres Praktikum im Ausland",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "b1b-l2-11",
              question: "Was ist die Position der Betriebsrätin Helene Kogler?",
              questionEs: "¿Cuál es la postura de la delegada sindical Helene Kogler?",
              options: [
                "Praktika dürfen in Österreich nie bezahlt werden.",
                "Nur die ersten zwei Wochen unbezahlt sind vertretbar; längere Arbeit muss bezahlt werden.",
                "Eine Lehre ist immer schlechter als ein Praktikum in einer Agentur.",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "b1b-l2-12",
              question: "Was empfiehlt Mag. Lorenz Haberl den Jugendlichen?",
              questionEs: "¿Qué recomienda Mag. Lorenz Haberl a los jóvenes?",
              options: [
                "einfach mündlich anzufangen und später nach dem Geld zu fragen",
                "vor dem ersten Arbeitstag auf einem schriftlichen Vertrag zu bestehen",
                "nur im Jänner und nur an der Kassa zu arbeiten",
              ],
              answer: 1,
            },
          ],
        },

        // ── Teil 3 · 10 min · 7 ítems · Zuordnung 7 ↔ 10 (con el «0») ────
        {
          title: "Lesen · Teil 3",
          instruction:
            "Lesen Sie die Situationen 13 bis 19 und die Anzeigen A bis J vom schwarzen Brett im Nachbarschaftszentrum. Welche Anzeige passt zu welcher Situation? Sie können jede Anzeige nur einmal verwenden. Für eine Situation gibt es keine passende Anzeige. In diesem Fall schreiben Sie 0.\n\n" +
            "Beispiel (Situation 0): Doktor Weber möchte in einem Chor mitsingen, ohne vorsingen zu müssen. — Lösung: Anzeige C. Diese Anzeige ist damit verbraucht und kommt für die Aufgaben 13 bis 19 nicht mehr infrage.",
          instructionEs:
            "Lee las situaciones 13 a 19 y los diez anuncios A-J del tablón del centro vecinal. ¿Qué anuncio va con cada situación? Cada anuncio se usa UNA sola vez, y para una de las situaciones no hay ningún anuncio válido: ahí se responde 0. Es el Teil que más se falla — un solo detalle (horario, precio, requisito) decide.\n\n" +
            "El ejemplo resuelto (situación 0) es Doktor Weber, que quiere cantar en un coro sin tener que hacer prueba: le va el anuncio C. Y ojo a la consecuencia, que es media estrategia del Teil: el anuncio del ejemplo QUEDA GASTADO y ya no puede ser la respuesta de ninguna de las siete situaciones que puntúan.",
          items: [
            {
              kind: "lesen-match",
              id: "b1b-l3",
              ads: [
                {
                  key: "a",
                  text:
                    "NACHBARSCHAFTSGARTEN. Wir suchen Leute, die im Frühjahr mitpflanzen. Jeder Haushalt bekommt ein kleines Beet, Werkzeug ist vorhanden. Der Beitrag beträgt 25 Euro im Jahr. Hunde müssen draußen bleiben. Anmeldung im Büro bis zum 1. März.",
                },
                {
                  key: "b",
                  text:
                    "FOODSHARING. Gerettete Lebensmittel von Bäckereien und Märkten. Abholung dienstags und freitags von 17 bis 18 Uhr. Eigene Boxen mitbringen. Verkauft wird nichts. Ohne Anmeldung.",
                },
                {
                  key: "c",
                  text:
                    "KIEZCHOR. Jeden Mittwoch von 19 bis 21 Uhr singen wir im großen Saal. Kein Vorsingen, alle Stimmen willkommen. Beitrag 10 Euro im Semester. Noten stellt der Chor.",
                },
                {
                  key: "d",
                  text:
                    "NACHHILFE GESUCHT. Wir suchen Menschen, die zweimal in der Woche je eine Stunde Schülerinnen und Schüler der 5. bis 10. Klasse in Mathe oder Deutsch unterstützen. Eine Ausbildung ist nicht nötig, ein Einführungsabend am Dienstag ist Pflicht. Das Zentrum zahlt 8 Euro pro Stunde.",
                },
                {
                  key: "e",
                  text:
                    "SPEISEKAMMER. Haltbare Lebensmittel können montags von 10 bis 12 Uhr abgegeben werden. Abholen darf, wer sie braucht, mittwochs von 16 bis 18 Uhr — ohne Fragen. Frisches Obst, Fleisch und Medikamente nehmen wir nicht an.",
                },
                {
                  key: "f",
                  text:
                    "FAHRRADWERKSTATT. Am ersten Sonntag im Monat von 11 bis 15 Uhr reparieren wir gemeinsam Ihr Rad. Ersatzteile bezahlen Sie selbst. E-Bikes können wir leider nicht reparieren. Ohne Anmeldung, Eintritt frei.",
                },
                {
                  key: "g",
                  text:
                    "SPRACHCAFÉ TANDEM. Samstags von 10 bis 12 Uhr: Deutsch und Spanisch im Wechsel, kein Unterricht. Ab Niveau A2. Getränke sind gratis, Anmeldung bis Donnerstag nötig — die Plätze sind begrenzt.",
                },
                {
                  key: "h",
                  text:
                    "MÖBELBÖRSE. Gut erhaltene Möbel geben wir kostenlos an Haushalte weiter, die wenig Geld haben. Abholung nur mit eigenem Transport, wir liefern nicht. Spenden nehmen wir donnerstags von 9 bis 13 Uhr an.",
                },
                {
                  key: "i",
                  text:
                    "PATENSCHAFT IM KIEZ. Werden Sie Pate oder Patin für neu zugezogene Nachbarinnen und Nachbarn: drei Stunden im Monat, Spaziergänge, Behördengänge, ein Kaffee. Einführungsabend Pflicht. Ab 21 Jahren.",
                },
                {
                  key: "j",
                  text:
                    "DIGITALE SPRECHSTUNDE. Jeden Dienstag von 16 bis 18 Uhr erklären Schülerinnen und Schüler Menschen ab 60 die Online-Formulare vom Amt. Bringen Sie Ihr eigenes Laptop mit. Kostenlos, Terminvereinbarung nötig.",
                },
              ],
              situations: [
                {
                  id: "b1b-l3-13",
                  situation:
                    "Sofía möchte im Frühjahr ein eigenes Beet im Kiez bepflanzen und hat kein eigenes Werkzeug.",
                  situationEs:
                    "Sofía quiere plantar un bancal propio en el barrio en primavera y no tiene herramientas.",
                  answer: "a",
                },
                {
                  id: "b1b-l3-14",
                  situation:
                    "Nico kommt dienstags nach der Küche vorbei und möchte übrig gebliebenes Brot mitnehmen. Eigene Boxen hat er.",
                  situationEs:
                    "Nico pasa los martes al salir de la cocina y quiere llevarse pan que haya sobrado. Tiene cajas propias.",
                  answer: "b",
                },
                {
                  id: "b1b-l3-15",
                  situation:
                    "Leo möchte zweimal in der Woche Schüler in Mathe unterstützen. Eine Lehrerausbildung hat er nicht, ein kleines Honorar wäre ihm recht.",
                  situationEs:
                    "Leo quiere apoyar a alumnos de mates dos veces por semana. No tiene formación de maestro; un pequeño honorario le vendría bien.",
                  answer: "d",
                },
                {
                  id: "b1b-l3-16",
                  situation:
                    "Anna hat Dosen und Reis übrig und möchte sie montags vormittags abgeben, ohne dass jemand nachfragt, warum.",
                  situationEs:
                    "A Anna le sobran latas y arroz y quiere dejarlos el lunes por la mañana, sin que nadie pregunte por qué.",
                  answer: "e",
                },
                {
                  id: "b1b-l3-17",
                  situation:
                    "Herr Vogel möchte sein altes Fahrrad ohne Motor reparieren lassen und kann am ersten Sonntag im Monat kommen.",
                  situationEs:
                    "Herr Vogel quiere que le reparen su bicicleta vieja sin motor y puede ir el primer domingo de mes.",
                  answer: "f",
                },
                {
                  id: "b1b-l3-18",
                  situation:
                    "Lucía möchte samstagmorgens Deutsch und Spanisch abwechselnd üben, nicht in einem Kurs mit Hausaufgaben.",
                  situationEs:
                    "Lucía quiere practicar el sábado por la mañana alemán y español por turnos, no en un curso con deberes.",
                  answer: "g",
                },
                {
                  id: "b1b-l3-19",
                  situation:
                    "Leos Cousin hat ein kaputtes E-Bike und möchte es günstig reparieren lassen.",
                  situationEs:
                    "El primo de Leo tiene un E-Bike estropeado y quiere que se lo reparen barato.",
                  answer: "0",
                },
              ],
            },
          ],
        },

        // ── Teil 4 · 15 min · 7 ítems · Ja/Nein (inferir postura) ────────
        {
          title: "Lesen · Teil 4",
          instruction:
            "Sie lesen in einer Zeitung sieben Meinungen zum Thema „Sollen Praktika bezahlt werden?“. Lesen Sie die Aufgaben 20 bis 26 und die Texte. Kreuzen Sie an: Ja oder Nein.\n\n" +
            "Beispiel (Aufgabe 0) — Tomas B., 40, Koch: „In meiner Küche arbeitet niemand umsonst. Wer acht Stunden steht, bekommt Geld — auch in den ersten Wochen. Alles andere ist für mich unanständig.“ — Lösung: Ja.",
          instructionEs:
            "Lees en un periódico siete opiniones sobre el tema «¿deben pagarse las prácticas?». Lee las preguntas 20 a 26 y los textos. Marca: Ja o Nein. Tienes 15 minutos. Nadie escribe «estoy a favor»: la postura hay que deducirla.\n\n" +
            "Ejemplo resuelto (0): Tomas B. cuenta que en su cocina nadie trabaja gratis y que ocho horas se pagan desde la primera semana → Ja. Fíjate en cómo se decide: no hay ninguna frase del tipo «estoy a favor», la postura vive en la valoración final.",
          items: [
            {
              kind: "lesen-janein",
              id: "b1b-l4",
              question:
                "Findet die Person, dass Praktika bezahlt werden sollten?",
              questionEs:
                "¿Esta persona opina que las prácticas deberían pagarse?",
              opinions: [
                {
                  id: "b1b-l4-20",
                  author: "Lena F., 26, Grafikdesignerin",
                  text:
                    "Ich habe nach dem Studium vier Monate unbezahlt in einer Agentur gesessen und Mails geschrieben wie alle anderen. Miete und Bahnkarte haben meine Eltern gezahlt — ohne sie hätte ich absagen müssen. Dass ein Betrieb echte Arbeit umsonst nimmt, halte ich für überfällig, dass sich das ändert. Wer die Arbeit braucht, soll sie auch bezahlen.",
                  ja: true,
                },
                {
                  id: "b1b-l4-21",
                  author: "Markus W., 54, Schreinermeister",
                  text:
                    "In meiner Werkstatt zeige ich jungen Leuten drei Wochen lang, wie der Beruf wirklich aussieht. Dafür brauche ich Zeit, Material und Nerven. Wenn ich vom ersten Tag an Lohn zahlen müsste, gäbe es bei uns kein Praktikum mehr — dann nimmt niemand mehr Schnuppernde. Lernen ist der Lohn, nicht der Umschlag.",
                  ja: false,
                },
                {
                  id: "b1b-l4-22",
                  author: "Aylin K., 31, Betriebsrätin",
                  text:
                    "Ein Praktikum von zwei Ferientagen ist etwas anderes als drei Monate Vollzeit. Sobald jemand in der Schicht steht oder Kundentermine macht, ist das Arbeit. Arbeit wird bezahlt, Punkt. Betriebe, die das nicht können, sollen kürzer nehmen — nicht Hoffnung auf eine Stelle als Währung benutzen.",
                  ja: true,
                },
                {
                  id: "b1b-l4-23",
                  author: "Tobias R., 22, Student",
                  text:
                    "Mir hat eine Redaktion sechs Wochen ohne Geld angeboten, und die Aufgaben klangen genau nach dem, was ich später machen will. Ich habe abgesagt, weil ich neben dem Studium jobben muss. Ein Kommilitone mit Eltern im Hintergrund hat den Platz genommen. Solange Praktika unbezahlt bleiben, entscheidet das Konto der Familie, nicht die Leistung.",
                  ja: true,
                },
                {
                  id: "b1b-l4-24",
                  author: "Ingrid H., 47, Lehrerin",
                  text:
                    "Meine Klasse macht jedes Jahr ein einwöchiges Betriebspraktikum. Der Bäcker um die Ecke kann fünfzehn-Jährige nicht wie Aushilfen bezahlen, und trotzdem ist diese Woche für viele der wichtigste Blick in die Arbeitswelt. Eine allgemeine Pflicht zum Lohn würde genau diese kurzen Schulpraktika streichen. Das wäre ein Verlust.",
                  ja: false,
                },
                {
                  id: "b1b-l4-25",
                  author: "Pavel S., 38, Koch",
                  text:
                    "In meiner Küche bekommt jede Person, die mitarbeitet, Geld — auch in der ersten Woche. Essen allein reicht nicht, die Miete wartet nicht. Wer unbezahlt bleibt, bleibt abhängig, und das will ich an meinem Herd nicht sehen. Deshalb zahle ich, auch wenn die Woche anstrengend ist.",
                  ja: true,
                },
                {
                  id: "b1b-l4-26",
                  author: "Heike M., 61, Pensionistin",
                  text:
                    "Zu meiner Zeit hat niemand für ein Praktikum Geld erwartet. Man hat zugeschaut, mitgemacht und hinterher gewusst, ob der Beruf passt. Heute wird jede Stunde zur Rechnung. Ich finde, junge Leute verlernen dabei, dass nicht jeder Anfang bezahlt sein muss. Ein Praktikum ist Schule, keine Stelle.",
                  ja: false,
                },
              ],
            },
          ],
        },

        // ── Teil 5 · 10 min · 4 ítems · texto normativo (suizo) ──────────
        {
          title: "Lesen · Teil 5",
          instruction:
            "Lesen Sie die Benutzungsordnung und die Aufgaben 27 bis 30. Wählen Sie bei jeder Aufgabe die richtige Lösung a, b oder c.\n\n" +
            "Beispiel (Aufgabe 0): Sie möchten am Sonntagnachmittag im Garten arbeiten. Was gilt? a) Sie müssen vorher anrufen · b) Das Gelände ist an Sonntagen geschlossen · c) Am Sonntag zahlen alle 80 Franken extra — Lösung: b.",
          instructionEs:
            "Lee el reglamento y las preguntas 27 a 30. Elige la opción correcta a, b o c. Tienes 10 minutos. En un texto normativo la respuesta está en la excepción, no en la regla general: lee las frases con «nur», «nicht» y «ausser».\n\n" +
            "Ejemplo resuelto (0): «Quieres trabajar el domingo por la tarde» → b) el recinto cierra domingos y festivos. Está en el punto 1 del reglamento, en una frase que parece de relleno: en este Teil el dato que decide casi nunca está donde lo buscarías. En el examen real este Teil no trae ejemplo impreso: el 0 es nuestro, para que veas la mecánica antes de jugarte los cuatro ítems.",
          items: [
            {
              kind: "lesen-mc",
              id: "b1b-l5-27",
              title: "Benutzungsordnung des Nachbarschaftsgartens Wiedikon (Zürich)",
              text:
                "1. Öffnungszeiten. Der Garten ist von Dienstag bis Samstag von 8 bis 19 Uhr geöffnet. An Sonn- und Feiertagen bleibt das Gelände geschlossen. Werkzeug muss bis 19 Uhr zurück ins Häuschen; das Schloss schliesst die letzte Person.\n\n" +
                "2. Beete. Jede Partei bekommt ein Beet nach der Warteliste. Der Beitrag beträgt 80 Franken im Jahr, zahlbar im Voraus. Vereine aus dem Quartier zahlen nichts. Wer weniger als 14 Tage vor Saisonbeginn absagt, bekommt die Hälfte des Beitrags nicht zurück.\n\n" +
                "3. Velos*. Velos sind am Eingang zu parkieren*, nicht auf den Wegen, nicht an den Beeten und nicht auf dem Trottoir* vor dem Tor. Velos, die über Nacht stehen bleiben, werden ohne Ankündigung entfernt.\n\n" +
                "4. Wasser. Giessen ist nur vor 10 Uhr und nach 18 Uhr erlaubt. Sprinkler und Schläuche ohne Brause sind verboten. Bei Trockenheit entscheidet die Gartengruppe über weitere Regeln.\n\n" +
                "5. Ernte. Gemüse aus dem eigenen Beet darf mitgenommen werden. Aus den Gemeinschaftsbeeten nimmt man nur, was für den eigenen Haushalt reicht; verkauft wird nichts.\n\n" +
                "6. Tiere. Hunde sind auf dem ganzen Gelände nicht erlaubt, auch nicht an der Leine. Katzen aus der Nachbarschaft werden geduldet.\n\n" +
                "7. Kehricht*. Pflanzenreste kommen auf den Kompost. Plastik, Glas und Speisereste gehören in den Kehricht der Stadt, nicht in den Garten.",
              footnote:
                "* Velo = schweizerischer Standard für „Fahrrad“ · parkieren = schweizerisch für „parken“ · Trottoir = schweizerisch für „Gehweg“ · Kehricht = schweizerisch für „Müll, Abfall“.",
              question:
                "Sie möchten am Samstagabend um 20 Uhr im Garten mit Freunden sitzen. Was gilt?",
              questionEs:
                "Quieres quedarte el sábado a las 20 h en el huerto con amigos. ¿Qué se aplica?",
              options: [
                "Das ist möglich, wenn Sie vorher im Büro anrufen.",
                "Das ist nicht möglich: das Gelände muss um 19 Uhr geräumt sein.",
                "Sie zahlen 80 Franken extra und dürfen bis 21 Uhr bleiben.",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "b1b-l5-28",
              question:
                "Sie sagen Ihr Beet drei Tage vor Saisonbeginn ab. Was bedeutet das?",
              questionEs:
                "Cancelas tu bancal tres días antes del inicio de temporada. ¿Qué significa eso?",
              options: [
                "Sie bekommen den ganzen Beitrag zurück, weil Sie nicht gegärtnert haben.",
                "Sie bekommen die Hälfte des Beitrags nicht zurück.",
                "Sie dürfen drei Jahre lang kein Beet mehr bekommen.",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "b1b-l5-29",
              question: "Wo dürfen Sie Ihr Velo lassen, während Sie im Garten sind?",
              questionEs: "¿Dónde puedes dejar la bici mientras estás en el huerto?",
              options: [
                "am Eingang",
                "direkt an Ihrem Beet, damit niemand sie nimmt",
                "über Nacht auf dem Trottoir vor dem Tor",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "b1b-l5-30",
              question:
                "Sie möchten um 13 Uhr mit einem Sprinkler giessen. Was ist richtig?",
              questionEs:
                "Quieres regar a las 13 h con un aspersor. ¿Qué es correcto?",
              options: [
                "Das ist erlaubt, weil der Garten bis 19 Uhr offen ist.",
                "Giessen ist um 13 Uhr nicht erlaubt, und Sprinkler sind verboten.",
                "Sprinkler sind erlaubt, Schläuche ohne Brause nicht.",
              ],
              answer: 1,
            },
          ],
        },
      ],
    },

    // ══════════════════════════ HÖREN · ~40 min ═════════════════════════
    {
      skill: "hoeren",
      label: "Hören",
      minutes: 40,
      teile: [
        // ── Teil 1 · 10 ítems · 5 textos cortos ×2 · DOS escuchas ────────
        {
          title: "Hören · Teil 1",
          instruction:
            "Sie hören nun fünf kurze Texte. Sie hören jeden Text zweimal. Zu jedem Text lösen Sie zwei Aufgaben. Wählen Sie bei jeder Aufgabe die richtige Lösung.\n\n" +
            "Beispiel: Sie hören auf der Mailbox: „Guten Tag, hier ist die Stadtbibliothek am Marktplatz. Die Lesung am Mittwoch fällt aus.“ Aufgabe 0: „Die Lesung findet wie geplant statt.“ — Lösung: Falsch.",
          instructionEs:
            "Ahora escuchas cinco textos cortos. Cada texto se escucha DOS veces. De cada uno resuelves dos tareas: la primera es Richtig/Falsch y la segunda de tres opciones. Antes de cada texto tienes 10 segundos para leer las tareas.\n\n" +
            "El examen abre con un ejemplo ya resuelto (0) que no puntúa: en el mensaje de la biblioteca del barrio la lectura del miércoles «fällt aus», así que «la lectura se celebra como estaba previsto» es Falsch. Sirve para calibrar el oído y el ritmo antes de que empiece lo que cuenta.",
          items: [
            {
              kind: "hoeren-group",
              id: "b1b-h1-g1",
              twice: true,
              readSeconds: 10,
              dialog: false,
              audio:
                "Hallo Sofía, hier ist Nico. Du, Herr Vogel hat mich gefragt, ob du am Donnerstag für ihn einkaufen kannst. Die Liste liegt ab achtzehn Uhr an der Tür, nicht schon um siebzehn — da ist er noch beim Arzt. Milch, Brot und Äpfel, schreibt er. Die Apotheke musst du nicht, das macht Anna schon. Ich selbst koche am Donnerstag und kann nicht. Melde dich kurz, ja? Tschüss!",
              items: [
                {
                  kind: "hoeren-rf",
                  id: "b1b-h1-1",
                  audio: "",
                  statement: "Die Einkaufsliste liegt schon um siebzehn Uhr bereit.",
                  statementEs: "La lista de la compra está lista ya a las diecisiete.",
                  richtig: false,
                },
                {
                  kind: "hoeren-mc",
                  id: "b1b-h1-2",
                  twice: true,
                  audio: "",
                  question: "Was muss Sofía nicht erledigen?",
                  questionEs: "¿Qué no tiene que hacer Sofía?",
                  options: ["Milch und Brot kaufen", "zur Apotheke gehen", "Herrn Vogel Bescheid sagen"],
                  answer: 1,
                },
              ],
            },
            {
              kind: "hoeren-group",
              id: "b1b-h1-g2",
              twice: true,
              readSeconds: 10,
              dialog: false,
              audio:
                "Liebe Besucherinnen und Besucher der Stadtbibliothek am Marktplatz. Bitte beachten Sie: Am Montag bleibt die Bibliothek wegen einer Inventur geschlossen. Von Dienstag bis Freitag öffnen wir wie gewohnt von zehn bis neunzehn Uhr. Am Samstag sind wir nur von zehn bis vierzehn Uhr da, nicht bis achtzehn. Medien können Sie rund um die Uhr in den Rückgabekasten werfen. Die Lesung am Mittwochabend fällt diese Woche aus.",
              items: [
                {
                  kind: "hoeren-rf",
                  id: "b1b-h1-3",
                  audio: "",
                  statement: "Am Samstag schließt die Bibliothek schon um vierzehn Uhr.",
                  statementEs: "El sábado la biblioteca cierra ya a las catorce.",
                  richtig: true,
                },
                {
                  kind: "hoeren-mc",
                  id: "b1b-h1-4",
                  twice: true,
                  audio: "",
                  question: "Warum bleibt die Bibliothek am Montag zu?",
                  questionEs: "¿Por qué permanece cerrada la biblioteca el lunes?",
                  options: [
                    "wegen eines Feiertags",
                    "wegen einer Inventur",
                    "wegen einer Baustelle",
                  ],
                  answer: 1,
                },
              ],
            },
            {
              kind: "hoeren-group",
              id: "b1b-h1-g3",
              twice: true,
              readSeconds: 10,
              dialog: false,
              audio:
                "Hier ist die Gartengruppe vom Kieztreff. Unser nächster Arbeitstag ist am Samstag von neun bis dreizehn Uhr. Bitte bringen Sie feste Schuhe und Handschuhe mit, Werkzeug ist vor Ort. Bei Regen verschieben wir auf Sonntag, dieselbe Uhrzeit. Für Kinder gibt es ein kleines Beet, Hunde müssen leider draußen bleiben. Kaffee und Kuchen stellt Nico.",
              items: [
                {
                  kind: "hoeren-rf",
                  id: "b1b-h1-5",
                  audio: "",
                  statement: "Jede Person muss ihr eigenes Werkzeug mitbringen.",
                  statementEs: "Cada persona tiene que traer sus propias herramientas.",
                  richtig: false,
                },
                {
                  kind: "hoeren-mc",
                  id: "b1b-h1-6",
                  twice: true,
                  audio: "",
                  question: "Was passiert, wenn es am Samstag regnet?",
                  questionEs: "¿Qué ocurre si el sábado llueve?",
                  options: [
                    "Der Arbeitstag fällt ganz aus.",
                    "Er findet am Sonntag zur gleichen Zeit statt.",
                    "Es wird nur im Saal des Kieztreffs gearbeitet.",
                  ],
                  answer: 1,
                },
              ],
            },
            {
              kind: "hoeren-group",
              id: "b1b-h1-g4",
              twice: true,
              readSeconds: 10,
              dialog: false,
              audio:
                "Am kommenden Samstag feiert unser Kiez von zwölf bis achtzehn Uhr im Park an der Mühlenstraße das Sommerfest. Die Bühne beginnt um fünfzehn Uhr, vorher gibt es Spiele für Kinder. Essen und Getränke gibt es an den Ständen, bitte bringen Sie kein eigenes Grillgut mit. Die Seitenstraße bleibt für Autos den ganzen Tag gesperrt, Fahrräder dürfen durch. Bei schlechtem Wetter weichen wir in die Turnhalle aus.",
              items: [
                {
                  kind: "hoeren-rf",
                  id: "b1b-h1-7",
                  audio: "",
                  statement: "Autos dürfen am Festtag nicht durch die Seitenstraße fahren.",
                  statementEs:
                    "El día de la fiesta los coches no pueden circular por la calle lateral.",
                  richtig: true,
                },
                {
                  kind: "hoeren-mc",
                  id: "b1b-h1-8",
                  twice: true,
                  audio: "",
                  question: "Wann beginnt das Programm auf der Bühne?",
                  questionEs: "¿Cuándo empieza el programa en el escenario?",
                  options: ["um 12 Uhr", "um 15 Uhr", "um 18 Uhr"],
                  answer: 1,
                },
              ],
            },
            {
              kind: "hoeren-group",
              id: "b1b-h1-g5",
              twice: true,
              readSeconds: 10,
              dialog: false,
              audio:
                "Guten Tag, hier ist die Praxis Doktor Weber. Ihr Termin am Donnerstag um vierzehn Uhr muss leider auf Freitag um neun Uhr verlegt werden. Bitte bringen Sie Ihren Impfausweis mit, nicht nur die Versichertenkarte. Wenn Freitag nicht geht, rufen Sie uns bis Mittwoch an. Wir sind von acht bis zwölf Uhr telefonisch erreichbar.",
              items: [
                {
                  kind: "hoeren-rf",
                  id: "b1b-h1-9",
                  audio: "",
                  statement: "Der Termin bleibt am Donnerstag um vierzehn Uhr.",
                  statementEs: "La cita se mantiene el jueves a las catorce.",
                  richtig: false,
                },
                {
                  kind: "hoeren-mc",
                  id: "b1b-h1-10",
                  twice: true,
                  audio: "",
                  question: "Was sollen die Patientinnen und Patienten mitbringen?",
                  questionEs: "¿Qué deben traer las y los pacientes?",
                  options: [
                    "nur die Versichertenkarte",
                    "den Impfausweis",
                    "eine Überweisung vom Krankenhaus",
                  ],
                  answer: 1,
                },
              ],
            },
          ],
        },

        // ── Teil 2 · 5 ítems · monólogo · UNA escucha · 60 s de lectura ──
        {
          title: "Hören · Teil 2",
          instruction:
            "Sie hören nun einen Text. Sie hören den Text einmal. Dazu lösen Sie fünf Aufgaben. Wählen Sie bei jeder Aufgabe die richtige Lösung. Lesen Sie jetzt die Aufgaben 11 bis 15. Dazu haben Sie 60 Sekunden Zeit.\n\n" +
            "Beispiel (Aufgabe 0): Wer spricht? a) eine Ärztin · b) die Leiterin der Nachbarschaftshilfe · c) ein neuer Helfer — Lösung: b.",
          instructionEs:
            "Ahora escuchas un texto. Se escucha UNA sola vez. Resuelves cinco tareas de tres opciones. Primero tienes 60 segundos para leer las preguntas 11 a 15: úsalos, son parte del examen. Si pierdes un ítem, déjalo ir y sigue con el siguiente.\n\n" +
            "Ejemplo resuelto (0): «¿quién habla?» → b) la responsable de la ayuda vecinal. Lo dice en la segunda frase, y en este Teil ese dato inicial es el que ordena todo lo demás: quién habla y a quién le habla. El 0 es nuestro: del Hören, solo los Teile 1 y 4 traen ejemplo impreso en el examen real.",
          items: [
            {
              kind: "hoeren-group",
              id: "b1b-h2",
              twice: false,
              readSeconds: 60,
              dialog: false,
              audio:
                "Schön, dass Sie alle gekommen sind. Mein Name ist Helga Senft, ich leite hier im Kieztreff die Nachbarschaftshilfe, und ich erkläre Ihnen in den nächsten Minuten, wie es weitergeht. " +
                "Zuerst das Wichtigste: Sie fangen heute noch nicht an. Jede und jeder von Ihnen macht zuerst eine Einführung an zwei Abenden. Erst danach gehen Sie allein zu einem Nachbarn. Das klingt streng, hat aber einen guten Grund: Sie kommen in Wohnungen, und die Leute müssen Ihnen vertrauen. " +
                "Zweitens die Zeit. Viele fragen mich, ob zwei Stunden pro Woche überhaupt reichen. Die Antwort ist ja — aber sie müssen regelmäßig sein. Eine Helferin, die jeden Donnerstag kommt, ist uns lieber als jemand, der einmal im Monat einen ganzen Samstag opfert. Die Nachbarn brauchen keinen Rekord, sie brauchen Verlässlichkeit. " +
                "Drittens: Was Sie hier tun, ist Einkaufen, Gesellschaft und kleine Besorgungen. Medizinische Pflege machen wir nicht. Das ist Annas Arbeit in der Klinik, nicht unsere. Wenn Sie unsicher sind, sagen Sie das ruhig offen. " +
                "Und dann etwas, das oft falsch verstanden wird: Haustürschlüssel nehmen Sie nicht mit nach Hause. Wer einen Schlüssel braucht, holt ihn am Einsatztag im Büro und bringt ihn am selben Abend zurück. Diese Regel hat uns schon viel Ärger erspart. " +
                "Zum Schluss das Praktische: bequeme Schuhe, und bitte kein eigenes Geld für die Einkäufe ausgeben. Die Nachbarn geben Ihnen den Betrag mit, oder Sie rechnen hinterher mit dem Umschlag ab. Fragen sammeln wir am Ende — jetzt zeige ich Ihnen zuerst das Büro.",
              items: [
                {
                  kind: "hoeren-mc",
                  id: "b1b-h2-11",
                  twice: false,
                  audio: "",
                  question: "Was passiert am Anfang mit den neuen Helferinnen und Helfern?",
                  questionEs: "¿Qué ocurre al principio con las nuevas personas voluntarias?",
                  options: [
                    "Sie gehen noch am selben Tag allein zu einem Nachbarn.",
                    "Sie machen zuerst eine Einführung an zwei Abenden.",
                    "Sie arbeiten in den ersten Wochen nur in der Küche des Treffs.",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "b1b-h2-12",
                  twice: false,
                  audio: "",
                  question: "Was ist Frau Senft bei der Zeit am wichtigsten?",
                  questionEs:
                    "¿Qué es lo más importante para la señora Senft en cuanto al tiempo?",
                  options: [
                    "möglichst lange Einsätze am Stück",
                    "feste Wochentage, auch wenn es nur wenige Stunden sind",
                    "vor allem Einsätze am Wochenende",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "b1b-h2-13",
                  twice: false,
                  audio: "",
                  question: "Welche Aufgaben übernimmt die Nachbarschaftshilfe nicht?",
                  questionEs: "¿Qué tareas no asume la ayuda vecinal?",
                  options: [
                    "Einkaufen und kleine Besorgungen",
                    "medizinische Pflege",
                    "Gesellschaft leisten",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "b1b-h2-14",
                  twice: false,
                  audio: "",
                  question: "Was gilt für Haustürschlüssel?",
                  questionEs: "¿Qué se aplica a las llaves de casa?",
                  options: [
                    "Helferinnen dürfen sie mit nach Hause nehmen.",
                    "Sie bleiben immer beim Nachbarn und werden nie ausgegeben.",
                    "Wer einen braucht, holt ihn im Büro und bringt ihn am selben Abend zurück.",
                  ],
                  answer: 2,
                },
                {
                  kind: "hoeren-mc",
                  id: "b1b-h2-15",
                  twice: false,
                  audio: "",
                  question: "Was sollen die Helferinnen und Helfer nicht tun?",
                  questionEs: "¿Qué no deben hacer las personas voluntarias?",
                  options: [
                    "bequeme Schuhe anziehen",
                    "Einkäufe mit dem eigenen Geld bezahlen",
                    "Fragen am Ende der Einführung stellen",
                  ],
                  answer: 1,
                },
              ],
            },
          ],
        },

        // ── Teil 3 · 7 ítems · diálogo · UNA escucha · 60 s de lectura ───
        {
          title: "Hören · Teil 3",
          instruction:
            "Sie hören nun ein Gespräch. Sie hören das Gespräch einmal. Dazu lösen Sie sieben Aufgaben. Kreuzen Sie an: Richtig oder Falsch. Lesen Sie jetzt die Aufgaben 16 bis 22. Dazu haben Sie 60 Sekunden Zeit.\n\n" +
            "Beispiel (Aufgabe 0): „Lucía hat ein Praktikum angeboten bekommen.“ — Lösung: Richtig.",
          instructionEs:
            "Ahora escuchas una conversación entre dos amigas. Se escucha UNA sola vez. Resuelves siete tareas Richtig/Falsch. Primero, 60 segundos para leer las preguntas 16 a 22.\n\n" +
            "Ejemplo resuelto (0): «A Lucía le han ofrecido unas prácticas» → Richtig; ella lo dice al principio. Esa es la lección del ejemplo: la afirmación nunca repite las palabras del audio, y una sola pasada no da para traducir. También aquí el 0 lo añadimos nosotros; el examen real empieza en la 16.",
          items: [
            {
              kind: "hoeren-group",
              id: "b1b-h3",
              twice: false,
              readSeconds: 60,
              dialog: true,
              audio:
                "Lucía, du klingst so müde. Alles okay? | " +
                "Ich habe ein Praktikum angeboten bekommen, acht Wochen in einem Büro hier in Berlin. Unbezahlt. | " +
                "Acht Wochen ohne Geld? Das ist lang. | " +
                "Die Arbeit klingt gut, und sie haben gesagt, danach könnte eine Stelle kommen. Aber ich muss ja essen. | " +
                "Hat Anna nicht erzählt, dass ihr Praktikum im Krankenhaus bezahlt war? | " +
                "Ja, aber das war in der Pflege, da gelten andere Regeln. Hier soll ich Mails schreiben und Termine machen — das ist normale Arbeit. | " +
                "Dann frag wenigstens nach der Fahrkarte. Viele Betriebe zahlen die, auch wenn das Praktikum unbezahlt bleibt. | " +
                "Das mache ich. Den Spanischkurs sage ich nicht ab, der läuft samstags. | " +
                "Gut. Soll ich mir den Vertrag mit dir anschauen? Samstag nach dem Kurs, bei mir. | " +
                "Ja bitte. Wegwerfen tue ich die Zusage nicht, bevor ich nachgefragt habe. | " +
                "Und wenn sie nichts zahlen wollen? | " +
                "Dann sage ich ab. Acht Wochen umsonst schaffe ich nicht, auch wenn die Stelle hinterher lockt.",
              items: [
                {
                  kind: "hoeren-rf",
                  id: "b1b-h3-16",
                  audio: "",
                  statement: "Lucía soll acht Wochen unbezahlt in einem Büro arbeiten.",
                  statementEs:
                    "Lucía tendría que trabajar ocho semanas sin sueldo en una oficina.",
                  richtig: true,
                },
                {
                  kind: "hoeren-rf",
                  id: "b1b-h3-17",
                  audio: "",
                  statement: "Das Praktikum, das Lucía angeboten wurde, ist im Krankenhaus.",
                  statementEs: "Las prácticas que le han ofrecido a Lucía son en el hospital.",
                  richtig: false,
                },
                {
                  kind: "hoeren-rf",
                  id: "b1b-h3-18",
                  audio: "",
                  statement: "Annas Praktikum in der Pflege war bezahlt.",
                  statementEs: "Las prácticas de Anna en enfermería estaban pagadas.",
                  richtig: true,
                },
                {
                  kind: "hoeren-rf",
                  id: "b1b-h3-19",
                  audio: "",
                  statement: "Lucía will ihren Spanischkurs wegen des Praktikums absagen.",
                  statementEs:
                    "Lucía quiere cancelar su curso de español por las prácticas.",
                  richtig: false,
                },
                {
                  kind: "hoeren-rf",
                  id: "b1b-h3-20",
                  audio: "",
                  statement: "Sofía rät Lucía, wenigstens nach der Fahrkarte zu fragen.",
                  statementEs:
                    "Sofía aconseja a Lucía que al menos pregunte por el abono de transporte.",
                  richtig: true,
                },
                {
                  kind: "hoeren-rf",
                  id: "b1b-h3-21",
                  audio: "",
                  statement: "Lucía hat die Zusage schon weggeworfen.",
                  statementEs: "Lucía ya ha tirado la aceptación.",
                  richtig: false,
                },
                {
                  kind: "hoeren-rf",
                  id: "b1b-h3-22",
                  audio: "",
                  statement:
                    "Lucía will absagen, wenn der Betrieb gar nichts zahlt.",
                  statementEs:
                    "Lucía va a rechazar la oferta si la empresa no paga nada.",
                  richtig: true,
                },
              ],
            },
          ],
        },

        // ── Teil 4 · 8 ítems · discusión a 3 voces · DOS escuchas ────────
        {
          title: "Hören · Teil 4",
          instruction:
            "Sie hören nun eine Diskussion. Sie hören die Diskussion zweimal. Dazu lösen Sie acht Aufgaben. Ordnen Sie die Aussagen zu: Wer sagt was? Lesen Sie jetzt die Aufgaben 23 bis 30. Dazu haben Sie 60 Sekunden Zeit.\n\n" +
            "Beispiel (Aussage 0): „Ich begrüße die Gäste und nenne das Thema der Sendung.“ — Lösung: a) die Moderatorin Nele Voss.",
          instructionEs:
            "Ahora escuchas un debate de radio con tres voces (moderadora e invitados). Se escucha DOS veces. Asigna cada afirmación a quien la dice: a, b o c. Primero, 60 segundos para leer las tareas 23 a 30.\n\n" +
            "Ejemplo resuelto (0): «saludo a los invitados y digo el tema del programa» → a) la moderadora. Aquí no vale «esta afirmación no la dice nadie»: cada una es de alguno de los tres, y la moderadora también opina, no solo pregunta — dos ítems del Teil son suyos.",
          items: [
            {
              kind: "hoeren-group",
              id: "b1b-h4",
              twice: true,
              readSeconds: 60,
              dialog: true,
              audio:
                "Moderatorin Nele Voss: Guten Abend und willkommen bei Stadtgespräch. Unser Thema heute: Müssen Praktika bezahlt werden? Bei mir sind die Personalleiterin Claudia Steffen und der Gewerkschafter Cem Yildiz. Frau Steffen, Sie sagen: nicht in jedem Fall. | " +
                "Claudia Steffen: Richtig. Ein Praktikum von zwei oder drei Wochen, in dem jemand den Beruf kennenlernt, muss nicht wie eine Stelle bezahlt werden. Die Lernzeit ist dann der Lohn. | " +
                "Cem Yildiz: Da widerspreche ich klar. Wer acht Stunden Mails schreibt oder in der Küche steht, arbeitet. Arbeit wird bezahlt, sonst schließen wir Menschen ohne Geld der Familie aus. | " +
                "Nele Voss: Aber ist das nicht vor allem eine Frage der Dauer? Zwischen zwei Wochen Schnuppern und drei Monaten Vollzeit liegen Welten. Ich glaube, entscheidend ist genau die Länge, sonst reden wir aneinander vorbei. | " +
                "Claudia Steffen: Da haben Sie einen Punkt. Nach drei Monaten ist es für mich kein Praktikum mehr, dann muss ein Vertrag mit Lohn her. Ein Betrieb, der nichts zahlen kann, soll ehrlich sagen, dass es nur zwei Wochen sind — nicht drei Monate Hoffnung verkaufen. | " +
                "Cem Yildiz: Kleine Betriebe ja — aber dann kürzer, nicht drei Monate unbezahlt. Und von Tag eins an einen schriftlichen Vertrag, mit Aufgaben und Zeiten. | " +
                "Nele Voss: Ich muss gestehen, ich selbst habe nach der Schule ein unbezahltes Praktikum gemacht, sechs Wochen in einer Redaktion, und ich möchte diese Zeit nicht missen. Aber ich habe damals noch zu Hause gewohnt. | " +
                "Claudia Steffen: Sehen Sie. Wer die Aufgabe selbst spannend findet, bleibt. Wer nur eine bezahlte Woche sucht, geht oft nach drei Tagen. | " +
                "Cem Yildiz: Genau deshalb brauchen wir eine Untergrenze. Ohne Geld im Umschlag bleibt das Praktikum ein Privileg. | " +
                "Nele Voss: Ein klarer Schlusssatz. Vielen Dank Ihnen beiden.",
              items: [
                {
                  kind: "hoeren-wersagt",
                  id: "b1b-h4-23",
                  speakers: [
                    { key: "a", name: "die Moderatorin Nele Voss" },
                    { key: "b", name: "die Personalleiterin Claudia Steffen" },
                    { key: "c", name: "der Gewerkschafter Cem Yildiz" },
                  ],
                  statement:
                    "Ein kurzes Praktikum von zwei oder drei Wochen muss nicht wie eine Stelle bezahlt werden.",
                  statementEs:
                    "Unas prácticas cortas de dos o tres semanas no tienen que pagarse como un puesto de trabajo.",
                  answer: "b",
                },
                {
                  kind: "hoeren-wersagt",
                  id: "b1b-h4-24",
                  speakers: [
                    { key: "a", name: "die Moderatorin Nele Voss" },
                    { key: "b", name: "die Personalleiterin Claudia Steffen" },
                    { key: "c", name: "der Gewerkschafter Cem Yildiz" },
                  ],
                  statement: "Entscheidend ist vor allem, wie lange das Praktikum dauert.",
                  statementEs: "Lo decisivo es sobre todo cuánto duran las prácticas.",
                  answer: "a",
                },
                {
                  kind: "hoeren-wersagt",
                  id: "b1b-h4-25",
                  speakers: [
                    { key: "a", name: "die Moderatorin Nele Voss" },
                    { key: "b", name: "die Personalleiterin Claudia Steffen" },
                    { key: "c", name: "der Gewerkschafter Cem Yildiz" },
                  ],
                  statement:
                    "Unbezahlte Praktika schließen Menschen ohne Geld der Familie aus.",
                  statementEs:
                    "Las prácticas no pagadas dejan fuera a quien no tiene dinero en la familia.",
                  answer: "c",
                },
                {
                  kind: "hoeren-wersagt",
                  id: "b1b-h4-26",
                  speakers: [
                    { key: "a", name: "die Moderatorin Nele Voss" },
                    { key: "b", name: "die Personalleiterin Claudia Steffen" },
                    { key: "c", name: "der Gewerkschafter Cem Yildiz" },
                  ],
                  statement:
                    "Nach drei Monaten muss es einen Vertrag mit Lohn geben.",
                  statementEs:
                    "A los tres meses tiene que haber un contrato con sueldo.",
                  answer: "b",
                },
                {
                  kind: "hoeren-wersagt",
                  id: "b1b-h4-27",
                  speakers: [
                    { key: "a", name: "die Moderatorin Nele Voss" },
                    { key: "b", name: "die Personalleiterin Claudia Steffen" },
                    { key: "c", name: "der Gewerkschafter Cem Yildiz" },
                  ],
                  statement:
                    "Von Tag eins an sollte es einen schriftlichen Vertrag geben.",
                  statementEs:
                    "Desde el primer día debería haber un contrato por escrito.",
                  answer: "c",
                },
                {
                  kind: "hoeren-wersagt",
                  id: "b1b-h4-28",
                  speakers: [
                    { key: "a", name: "die Moderatorin Nele Voss" },
                    { key: "b", name: "die Personalleiterin Claudia Steffen" },
                    { key: "c", name: "der Gewerkschafter Cem Yildiz" },
                  ],
                  statement: "Ich selbst habe nach der Schule ein unbezahltes Praktikum gemacht.",
                  statementEs:
                    "Yo misma hice unas prácticas no pagadas después del colegio.",
                  answer: "a",
                },
                {
                  kind: "hoeren-wersagt",
                  id: "b1b-h4-29",
                  speakers: [
                    { key: "a", name: "die Moderatorin Nele Voss" },
                    { key: "b", name: "die Personalleiterin Claudia Steffen" },
                    { key: "c", name: "der Gewerkschafter Cem Yildiz" },
                  ],
                  statement:
                    "Ein Betrieb, der nichts zahlen kann, soll nur zwei Wochen anbieten, nicht drei Monate Hoffnung.",
                  statementEs:
                    "Una empresa que no puede pagar debería ofrecer solo dos semanas, no tres meses de esperanza.",
                  answer: "b",
                },
                {
                  kind: "hoeren-wersagt",
                  id: "b1b-h4-30",
                  speakers: [
                    { key: "a", name: "die Moderatorin Nele Voss" },
                    { key: "b", name: "die Personalleiterin Claudia Steffen" },
                    { key: "c", name: "der Gewerkschafter Cem Yildiz" },
                  ],
                  statement:
                    "Ohne Geld im Umschlag bleibt das Praktikum ein Privileg.",
                  statementEs:
                    "Sin dinero en el sobre, las prácticas siguen siendo un privilegio.",
                  answer: "c",
                },
              ],
            },
          ],
        },
      ],
    },

    // ═════════════════════ SCHREIBEN · 60 min · 100 pts ═════════════════
    {
      skill: "schreiben",
      label: "Schreiben",
      minutes: 60,
      teile: [
        {
          title: "Schreiben · Aufgabe 1 (20 Minuten · 40 Punkte)",
          instruction:
            "Schreiben Sie eine E-Mail (circa 80 Wörter). Schreiben Sie etwas zu jedem der drei Punkte. Achten Sie auf den Textaufbau: Anrede, Einleitung, die Punkte in einer sinnvollen Reihenfolge und ein Schluss.",
          instructionEs:
            "Escribe un email informal de unas 80 palabras. Trata los TRES puntos —olvidar uno baja «Erfüllung» a la banda D— y cuida la estructura: saludo, introducción, los puntos en orden y cierre. Registro: du. Menos de 40 palabras = banda E = 0 puntos en toda la tarea.",
          items: [
            {
              kind: "schreiben-message",
              id: "b1b-s1",
              task:
                "Ihr Kieztreff plant am Samstag ein Fest im Park. Schreiben Sie Ihrem Freund Nico eine E-Mail und organisieren Sie mit ihm das Kiezfest.",
              taskEs:
                "El centro vecinal organiza el sábado una fiesta en el parque. Escríbele un email a tu amigo Nico y organizad juntos el Kiezfest.",
              points: [
                "Propón un horario y di dónde os encontráis para montar",
                "Explica de qué te ocupas tú (escenario, carteles o bebida)",
                "Pídele que se encargue de la comida y di por qué él",
              ],
              words: 80,
              points_max: 40,
              model:
                "Lieber Nico,\n\n" +
                "am Samstag ist das Kiezfest im Park an der Mühlenstraße, und ich wollte mit dir den Ablauf klären. Ich würde uns um zehn Uhr am Eingang treffen — das Fest beginnt um zwölf, da haben wir Zeit zum Aufbauen.\n\n" +
                "Ich kümmere mich um die Bühne und hänge die Plakate im Haus auf. Mikrofon und Kabel hole ich am Freitag im Treff.\n\n" +
                "Könntest du das Essen übernehmen? Du kochst sowieso beruflich, und die Nachbarn fragen schon nach deinen Empanadas. Wenn dir das zu viel ist, teilen wir uns die Stände.\n\n" +
                "Schreib kurz, ob zehn Uhr passt.\n\n" +
                "Viele Grüße\nSofía",
              rubric: RUBRIC_SCHREIBEN_40,
            },
          ],
        },
        {
          title: "Schreiben · Aufgabe 2 (25 Minuten · 40 Punkte)",
          instruction:
            "Sie haben im Leserforum einer Zeitung den folgenden Beitrag gelesen. Schreiben Sie einen Kommentar (circa 80 Wörter): Nehmen Sie Stellung zu dieser Meinung und begründen Sie Ihre eigene Meinung.",
          instructionEs:
            "Has leído este mensaje en el foro de lectores de un periódico. Escribe un COMENTARIO de foro (~80 palabras) reaccionando a esa opinión y argumentando la tuya. Ojo al género: aquí no se escribe un email — nada de «Liebe…» ni de despedida personal. Es la tarea que más se falla del módulo.",
          items: [
            {
              kind: "schreiben-message",
              id: "b1b-s2",
              task:
                "Schreiben Sie Ihren Kommentar zum Beitrag von Rainer42. Sagen Sie klar, was Sie davon halten, und begründen Sie Ihre Meinung mit Beispielen.",
              taskEs:
                "Escribe tu comentario al mensaje de Rainer42. Di con claridad qué te parece y justifica tu opinión con ejemplos.",
              stimulus: {
                source: "Leserforum der Stadtzeitung · Beitrag von Rainer42",
                text:
                  "Überall lese ich Klagen über unbezahlte Praktika. Für mich ist die Sache klar: Wer lernt, muss nicht verdienen. Ein Praktikum ist Schule im Betrieb, keine Stelle. Wer vom ersten Tag an Lohn verlangt, nimmt den kleinen Firmen die Möglichkeit, junge Leute überhaupt reinzulassen. Meine Generation hat unbezahlt angefangen und trotzdem einen Beruf gelernt. Das können die Jungen auch.",
              },
              points: [
                "Di claramente si estás de acuerdo con Rainer42 o no",
                "Da al menos dos razones y un ejemplo concreto",
                "Cierra con una conclusión o una propuesta propia",
              ],
              words: 80,
              points_max: 40,
              model:
                "Rainers Argument verstehe ich, halte es aber für falsch. Lernen und arbeiten schließen sich nicht aus: Wer acht Stunden Mails schreibt, leistet etwas, und das gehört bezahlt.\n\n" +
                "Außerdem schließen unbezahlte Praktika genau die aus, die kein Geld von zu Hause haben. Eine Freundin von mir hat eine gute Redaktion abgesagt, weil sie neben dem Studium jobben muss.\n\n" +
                "Meiner Meinung nach sind zwei Wochen Schnuppern ohne Lohn in Ordnung. Alles, was länger dauert, braucht mindestens eine Fahrkarte und ein kleines Entgelt. Sonst bleibt das Praktikum ein Privileg.",
              rubric: RUBRIC_SCHREIBEN_40,
            },
          ],
        },
        {
          title: "Schreiben · Aufgabe 3 (15 Minuten · 20 Punkte)",
          instruction:
            "Schreiben Sie eine formelle E-Mail (circa 40 Wörter). Schreiben Sie etwas zu beiden Punkten. Vergessen Sie die Anrede und den Gruß am Schluss nicht.",
          instructionEs:
            "Escribe un email FORMAL de unas 40 palabras. Trata los dos puntos. Registro: Sie (con mayúscula siempre), Anrede y Gruß obligatorios. Veinte minutos antes escribías con du: ese cambio de registro es lo que se evalúa aquí.",
          items: [
            {
              kind: "schreiben-message",
              id: "b1b-s3",
              task:
                "Im Park an der Mühlenstraße ist eine Bank kaputt. Schreiben Sie eine E-Mail an Frau Reuter vom Bezirksamt, Abteilung Grünflächen.",
              taskEs:
                "En el parque de la Mühlenstraße hay un banco roto. Escribe un email a la señora Reuter del Bezirksamt, departamento de zonas verdes.",
              points: [
                "Describe dónde está el banco y qué le pasa",
                "Pregunta cortésmente cuándo se puede reparar o sustituir",
              ],
              words: 40,
              points_max: 20,
              model:
                "Sehr geehrte Frau Reuter,\n\n" +
                "im Park an der Mühlenstraße, direkt am Spielplatz, ist eine Holzbank zerbrochen. Eine Lehne fehlt, und Kinder könnten sich verletzen.\n\n" +
                "Könnten Sie mir bitte mitteilen, wann die Bank repariert oder ersetzt wird?\n\n" +
                "Vielen Dank im Voraus.\n\n" +
                "Mit freundlichen Grüßen\nSofía Marín",
              rubric: RUBRIC_SCHREIBEN_20,
            },
          ],
        },
      ],
    },

    // ═════════════════════ SPRECHEN · ~15 min · 100 pts ═════════════════
    {
      skill: "sprechen",
      label: "Sprechen",
      minutes: 15,
      teile: [
        {
          title: "Sprechen · Teil 1 — Gemeinsam etwas planen (32 Punkte)",
          instruction:
            "Gemeinsam etwas planen. Sie und Ihre Partnerin / Ihr Partner sollen zusammen etwas organisieren. Sprechen Sie über die vier Punkte, machen Sie Vorschläge, reagieren Sie auf die Vorschläge der anderen Person und entscheiden Sie gemeinsam.\n\n" +
            "Vor der Prüfung haben Sie 15 Minuten Vorbereitungszeit für Teil 1 und Teil 2 zusammen. Sie dürfen sich Notizen machen und diese in der Prüfung benutzen, ablesen sollen Sie nicht.",
          instructionEs:
            "Planificar algo juntos (2-3 min). Hay cuatro puntos guía y uno abierto. Lo que puntúa no es tu plan: es que propongas, REACCIONES a lo que propone el otro y lleguéis a una decisión común. Soltar tu plan de corrido hunde el criterio «Interaktion» aunque tu alemán sea bueno.\n\n" +
            "Los 15 minutos oficiales de preparación son PARA TODO EL ORAL y se hacen de una sentada antes de entrar: aquí van repartidos en 5 minutos para este Teil y 10 para la presentación del Teil 2. El Teil 3 no se prepara — se reacciona en el momento. Y una advertencia del baremo: la Aussprache no es una tarea aparte, se puntúa sobre todo lo que digas en los tres Teile, y aquí vale 4 de los 32 puntos.",
          items: [
            {
              kind: "sprechen",
              id: "b1b-sp1",
              teil: 1,
              weight: 32, // 28 oficiales + los 4 de Aussprache que le tocan
              prepSeconds: 300, // 5 de los 15 minutos oficiales de preparación
              speakSeconds: 180,
              prompt:
                "Situation: Ihr Kieztreff feiert am Samstag ein Fest im Park. Sie und Ihre Partnerin / Ihr Partner organisieren das Programm.\n\n" +
                "• Was gibt es zu essen und zu trinken?\n" +
                "• Wann treffen Sie sich zum Aufbauen?\n" +
                "• Wer kümmert sich um Musik und Bühne?\n" +
                "• Wer hängt die Plakate im Viertel auf?\n" +
                "• Und was noch? (eigener Punkt)",
              promptEs:
                "Situación: el centro vecinal celebra el sábado una fiesta en el parque. Tu compañero y tú organizáis el programa. Puntos: qué se come y se bebe, cuándo quedáis para montar, quién se ocupa de la música y el escenario, quién cuelga los carteles en el barrio, y un punto libre vuestro.",
              model:
                "Sollen wir mit dem Essen anfangen? Ich würde Empanadas und einen Salat vorschlagen, und zu trinken Schorle und Wasser. — Gute Idee, aber Grillgut bringt niemand selbst mit, das hat der Treff verboten. Wie wäre es, wenn Nico kocht und wir nur das Trinken holen? — Einverstanden. Wann treffen wir uns zum Aufbauen? Ich schlage zehn Uhr vor, das Fest beginnt um zwölf. — Zehn ist mir ehrlich gesagt zu früh, ich hole erst die Kabel. Passt halb elf auch? — Ja, das reicht. Die Bühne übernehme ich, ich kenne die Anlage. Dann könntest du die Plakate aufhängen, du gehst sowieso durchs Viertel. — Mache ich, ich hänge auch einen Zettel ins Treppenhaus. Und als eigenen Punkt schlage ich eine Kasse mit Wechselgeld vor, falls jemand spenden will. — Sehr gut. Dann steht der Plan: Nico kocht, wir holen das Trinken, halb elf, ich Bühne, du Plakate, und die Kasse bringe ich mit.",
              rubric: RUBRIC_SPRECHEN_T1,
            },
          ],
        },
        {
          title: "Sprechen · Teil 2 — Ein Thema präsentieren (48 Punkte)",
          instruction:
            "Wählen Sie EIN Thema aus: Thema 1 oder Thema 2. Präsentieren Sie es in etwa drei bis vier Minuten. Folgen Sie dabei den fünf Folien. Sprechen Sie frei; Ihre Notizen dürfen Sie benutzen, ablesen sollen Sie nicht.",
          instructionEs:
            "El examen te da DOS temas y eliges uno — decídelo en los primeros treinta segundos de la preparación y no vuelvas atrás: cambiar de tema a mitad es la forma más cara de perder los 10 minutos. Presenta el elegido en 3-4 minutos siguiendo las CINCO diapositivas fijas del examen (son siempre las mismas: es una plantilla memorizable). «Erfüllung» se mide por cuántas tratas con contenido suficiente: las cinco = banda A; una o dos = banda D. Con su parte de Aussprache, este Teil vale 48 de los 100 puntos del oral: es el que decide el módulo.",
          items: [
            {
              kind: "sprechen-praesentation",
              id: "b1b-sp2",
              topic:
                "Wählen Sie ein Thema:\n" +
                "Thema 1 — Nachbarschaftshilfe: sinnvoll oder nicht?\n" +
                "Thema 2 — Gemeinsam gärtnern in der Stadt: Mode oder Notwendigkeit?",
              topicEs:
                "Elige UN tema, como en el examen real. Tema 1: la ayuda vecinal, ¿tiene sentido o no? · Tema 2: cultivar juntos en la ciudad, ¿moda o necesidad? Las cinco diapositivas son las mismas para los dos; los modelos de abajo desarrollan el Tema 1, y cada diapositiva trae además la pista para el Tema 2.",
              prepSeconds: 600, // 10 de los 15 minutos oficiales de preparación
              speakSeconds: 210,
              weight: 48, // 40 oficiales + los 8 de Aussprache que le tocan
              slides: [
                {
                  title:
                    "Folie 1 — Nennen Sie das Thema Ihrer Präsentation und stellen Sie den Inhalt vor.",
                  hint:
                    "Di el tema y anuncia la estructura: qué vas a contar en las cinco diapositivas. Treinta segundos bastan, pero no te las saltes: es la banda más barata del examen. · Tema 2: «In meiner Präsentation geht es um die Frage, ob gemeinsame Gärten in der Stadt nur eine Mode sind oder ob die Stadt sie wirklich braucht.»",
                  model:
                    "In meiner Präsentation geht es um die Frage, ob Nachbarschaftshilfe in einer Großstadt sinnvoll ist. Ich habe dieses Thema gewählt, weil in meinem Kiez immer mehr Leute füreinander einkaufen. Zuerst erzähle ich von meiner eigenen Erfahrung, danach berichte ich über die Situation in meinem Heimatland. Anschließend nenne ich Vor- und Nachteile und sage meine Meinung dazu. Am Ende fasse ich alles kurz zusammen.",
                },
                {
                  title:
                    "Folie 2 — Berichten Sie von Ihrer Situation oder einem Erlebnis im Zusammenhang mit dem Thema.",
                  hint:
                    "Una experiencia propia, contada en pasado (Perfekt hablado). Concreta: una escena, no una teoría. · Tema 2: la primera vez que plantaste algo en un huerto de barrio, o por qué aún no lo has hecho.",
                  model:
                    "Ich selbst kaufe seit einigen Monaten donnerstags für zwei ältere Nachbarn ein. Am Anfang war ich unsicher, weil ich nach der Arbeit müde bin und Angst hatte, die falschen Sachen zu kaufen. Einmal habe ich wirklich die teure Butter genommen, und die Nachbarin hat mich sehr deutlich korrigiert. Trotzdem gehe ich weiter: Nach zwei Taschen und einem kurzen Gespräch auf dem Flur bin ich besser gelaunt als nach einem Abend vor dem Bildschirm.",
                },
                {
                  title:
                    "Folie 3 — Berichten Sie über die Situation in Ihrem Heimatland und geben Sie Beispiele.",
                  hint:
                    "Cómo es en tu país: normas, costumbres, diferencias con DACH. Da al menos un ejemplo concreto. · Tema 2: si en tu ciudad hay huertos urbanos, listas de espera, o si la gente planta solo en el balcón.",
                  model:
                    "In meinem Heimatland hilft man in der Familie oft selbstverständlich, aber organisierte Nachbarschaftshilfe wie im Kieztreff gibt es seltener. In kleinen Orten kennt man sich, in der Stadt grüßt man kaum. Seit ein paar Jahren entstehen allerdings Treffs und Gruppen im Internet, in denen Leute anbieten, für Ältere einzukaufen. Das ist neu, und viele trauen sich noch nicht, fremde Menschen in die Wohnung zu lassen.",
                },
                {
                  title:
                    "Folie 4 — Nennen Sie Vor- und Nachteile und sagen Sie dazu Ihre Meinung. Geben Sie Beispiele.",
                  hint:
                    "Aquí vive la nota: einerseits… andererseits, ein Vorteil ist, dass… / ein Nachteil ist, dass…, y después meiner Meinung nach + una razón + un ejemplo. · Tema 2: contacto y tomates frente a listas de espera, agua y vandalismo.",
                  model:
                    "Einerseits hat Nachbarschaftshilfe klare Vorteile: Man kennt den Kiez, ältere Menschen bleiben länger zu Hause, und zwei Stunden in der Woche ändern den Tag. Andererseits gibt es auch Nachteile. Man kommt in Wohnungen, es kann Missverständnisse geben, und wer Vollzeit arbeitet, hat nicht immer Kraft. Meiner Meinung nach kommt es nicht auf große Vereine an, sondern auf Verlässlichkeit: Ein Abend, den man wirklich hat, ist mehr wert als fünf, die man sich nur vornimmt.",
                },
                {
                  title:
                    "Folie 5 — Beenden Sie Ihre Präsentation und bedanken Sie sich bei den Zuhörerinnen und Zuhörern.",
                  hint:
                    "Cierre corto: resumen en una frase + agradecimiento. Es la diapositiva que más gente olvida por quedarse sin tiempo. · Tema 2: «Zusammenfassend würde ich sagen: Ein Garten in der Stadt ist keine Mode, wenn die Stadt Fläche und Wasser gibt. Vielen Dank für Ihre Aufmerksamkeit.»",
                  model:
                    "Zusammenfassend würde ich sagen: Nachbarschaftshilfe in der Stadt ist sinnvoll, aber nur wenn man klein anfängt und ehrlich sagt, wie viel Zeit man hat. Deshalb finde ich es wichtig, zuerst zuzuhören und dann eine Liste in die Hand zu nehmen. Vielen Dank für Ihre Aufmerksamkeit — wenn Sie Fragen haben, beantworte ich sie gern.",
                },
              ],
              rubric: RUBRIC_SPRECHEN_T2,
            },
          ],
        },
        {
          title: "Sprechen · Teil 3 — Über ein Thema sprechen (20 Punkte)",
          instruction:
            "Geben Sie Ihrer Partnerin / Ihrem Partner eine Rückmeldung zu ihrer oder seiner Präsentation und stellen Sie eine Frage dazu. Beantworten Sie danach die Fragen Ihrer Partnerin / Ihres Partners und die Frage der zweiten Prüferin oder des zweiten Prüfers.",
          instructionEs:
            "Feedback + pregunta (1-2 min). La pregunta al compañero es OBLIGATORIA y puntúa: quien solo elogia y no pregunta se queda en la banda D. Después responde con contenido a lo que te preguntan a ti.",
          items: [
            {
              kind: "sprechen",
              id: "b1b-sp3",
              teil: 3,
              weight: 20, // 16 oficiales + los 4 de Aussprache que le tocan
              // 0 a propósito: los 15 minutos oficiales de preparación son para
              // los Teile 1 y 2. El Teil 3 se reacciona en el momento, y darle
              // un minuto extra contradiría lo que dice el propio enunciado.
              prepSeconds: 0,
              speakSeconds: 90,
              prompt:
                "a) Rückmeldung geben: Wie hat Ihnen die Präsentation gefallen? Was war besonders interessant?\n" +
                "b) Eine Frage stellen: Stellen Sie eine Frage zum Inhalt der Präsentation.\n" +
                "c) Antworten: Beantworten Sie die Frage der zweiten Prüferin: „Was würden Sie einer Person raten, die nach der Arbeit müde ist, aber im Kiez helfen möchte?“",
              promptEs:
                "a) Da tu valoración de la presentación del compañero. b) Hazle una pregunta sobre el contenido. c) Responde a la pregunta de la segunda examinadora: «¿qué le aconsejarías a alguien que sale cansado del trabajo pero quiere ayudar en el barrio?».",
              model:
                "Deine Präsentation hat mir sehr gut gefallen, besonders der Teil über die falsche Butter — das war konkret, nicht nur Theorie. Du hast die Vor- und Nachteile auch sehr klar getrennt. Eine Frage hätte ich noch: Würdest du selbst später einmal die Koordination im Treff übernehmen, nicht nur das Einkaufen? — Zur Frage der Prüferin: Ich würde raten, klein anzufangen. Ein fester Abend, den man wirklich hat, reicht. Und keine Medikamente, keine Schlüssel mit nach Hause. Die Nachbarn brauchen keine Heldin, sie brauchen jemanden, der kommt.",
              rubric: RUBRIC_SPRECHEN_T3,
            },
          ],
        },
      ],
    },
  ],
};
