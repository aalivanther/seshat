import type { ExamSet, RubricCriterion } from "@/lib/examTypes";

// ─────────────────────────────────────────────────────────────────────────────
// Modellsatz B1 — simulacro completo del GOETHE-ZERTIFIKAT B1 (= ÖSD B1).
// Formato fiel al oficial (PLAN-B1 §2), Teil por Teil:
//   LESEN   65′ · 5 Teile · 30 ítems  → 6 R/F · 3+3 MC3 · 7↔10 Zuordnung (con
//                                        la trampa del «0») · 7 Ja/Nein · 4 MC3
//   HÖREN   40′ · 4 Teile · 30 ítems  → escuchas 2-1-1-2 (T2 y T3 de UNA pasada)
//   SCHREIBEN 60′ · 3 tareas · 100 pts → 40 + 40 + 20, rúbrica en bandas A-E
//   SPRECHEN     · 3 Teile · 100 pts  → 28 + 40 + 16 + 16 (Aussprache)
// El examen es MODULAR: cada módulo vale 100 puntos, se aprueba con 60 y NO hay
// compensación entre módulos. En Lesen y Hören, 18 de 30 aciertos = 60 puntos.
//
// Temas: los de opinión social del examen real, y DISTINTOS de los que trabajan
// los módulos del curso — voluntariado, compra de segunda mano, animales en la
// ciudad y trabajo de fin de semana de los estudiantes.
// Plurizéntrico como el oficial: texto de prensa austriaco (Lesen Teil 2, con
// nota al pie de austriacismos) y reglamento suizo (Lesen Teil 5, helvetismos).
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

export const examB1A: ExamSet = {
  id: "b1-sim-a",
  level: "b1",
  title: "Modellsatz B1",
  description:
    "Simulacro completo y fiel del Goethe-Zertifikat B1 (= ÖSD B1): Lesen 65′, Hören 40′ con escuchas 2-1-1-2, Schreiben 60′ y Sprechen. Examen MODULAR — cada módulo vale 100 puntos y se aprueba por separado con 60, sin compensación. Temas de opinión social: voluntariado, segunda mano, animales en la ciudad y el trabajo de los estudiantes.",
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
            "Beispiel (Aufgabe 0): „Anna arbeitet seit ungefähr einem Jahr ehrenamtlich.“ — Lösung: Richtig. Das steht schon im ersten Satz des Textes.",
          instructionEs:
            "Lee el texto y las preguntas 1 a 6. Marca: Richtig (verdadero) o Falsch (falso). Tienes 10 minutos. Ojo: el texto es largo y la afirmación casi nunca repite sus palabras — hay que entender la idea, no cazar la palabra.\n\n" +
            "Como en el examen real, el Teil empieza con un ejemplo ya resuelto (el 0) que no puntúa: «Anna lleva alrededor de un año haciendo voluntariado» → Richtig, porque lo dice la primera frase. Los ítems que cuentan son del 1 al 6.",
          items: [
            {
              kind: "lesen-text",
              id: "b1a-l1",
              title: "Aus Annas Blog: Ein Jahr im Ehrenamt",
              text:
                "Seit einem Jahr arbeite ich ehrenamtlich, und ich hätte am Anfang nie gedacht, dass mir das so viel zurückgeben würde.\n\n" +
                "Angefangen hat alles im letzten Herbst. Eine Kollegin hat mir in der Mittagspause von der Freiwilligenagentur in unserem Stadtteil erzählt. Ehrlich gesagt war ich skeptisch: Ich arbeite Vollzeit, und mein Kalender war schon voll genug. Ich bin trotzdem hingegangen, einfach um mir das Ganze einmal anzuschauen. Es hat keine halbe Stunde gedauert, bis mich die Beraterin überzeugt hatte. Sie hat mir nämlich nicht sofort eine Aufgabe gegeben, sondern zuerst gefragt, wie viel Zeit ich realistisch habe. Zwei Stunden pro Woche, habe ich gesagt. Genau damit haben wir dann geplant, und das war die richtige Entscheidung.\n\n" +
                "Heute bin ich jeden Dienstagnachmittag in der Lernwerkstatt einer Grundschule und helfe drei Kindern bei den Hausaufgaben. Ich hatte großen Respekt davor, weil ich keine Lehrerin bin und auch nie Pädagogik studiert habe. Aber man muss gar keine Ausbildung mitbringen: Ein Einführungskurs an einem Samstagvormittag hat gereicht, und danach war immer jemand da, den ich fragen konnte.\n\n" +
                "Ganz einfach war es nicht. Im Januar wollte ich aufhören. Ein Kind kam dreimal hintereinander nicht, ein anderes hatte überhaupt keine Lust, und ich hatte das Gefühl, ich mache etwas falsch. In dieser Zeit haben mir die anderen Freiwilligen sehr geholfen. Wir treffen uns einmal im Monat, reden über schwierige Situationen und lachen auch viel. Ohne diese Gruppe wäre ich heute nicht mehr dabei.\n\n" +
                "Die Arbeit wird natürlich nicht bezahlt. Die Fahrkarte bekomme ich zurück, mehr nicht, und das ist für mich völlig in Ordnung. Was ich bekomme, ist etwas anderes: Ich kenne meinen Stadtteil jetzt wirklich, ich habe Menschen kennengelernt, die ich sonst nie getroffen hätte, und ich gehe nach zwei Stunden mit Kindern besser gelaunt nach Hause als nach einem freien Nachmittag auf dem Sofa.\n\n" +
                "Meine Freundin Sofía will jetzt auch anfangen, allerdings lieber im Tierheim. Mein Rat an alle, die überlegen: Fangt klein an. Zwei Stunden in der Woche, die man wirklich hat, sind mehr wert als fünf, die man sich nur vornimmt.",
              statements: [
                {
                  id: "b1a-l1-1",
                  statement:
                    "Anna war sofort begeistert, als sie zum ersten Mal vom Ehrenamt hörte.",
                  statementEs:
                    "Anna se entusiasmó de inmediato cuando oyó hablar por primera vez del voluntariado.",
                  richtig: false,
                },
                {
                  id: "b1a-l1-2",
                  statement:
                    "In der Beratung ging es zuerst darum, wie viel Zeit Anna wirklich hat.",
                  statementEs:
                    "En la asesoría se trató primero de cuánto tiempo tiene Anna realmente.",
                  richtig: true,
                },
                {
                  id: "b1a-l1-3",
                  statement:
                    "Für ihre Aufgabe in der Grundschule brauchte Anna eine pädagogische Ausbildung.",
                  statementEs:
                    "Para su tarea en la escuela primaria Anna necesitaba una formación pedagógica.",
                  richtig: false,
                },
                {
                  id: "b1a-l1-4",
                  statement:
                    "Im Winter hat Anna daran gedacht, mit dem Ehrenamt aufzuhören.",
                  statementEs:
                    "En invierno Anna pensó en dejar el voluntariado.",
                  richtig: true,
                },
                {
                  id: "b1a-l1-5",
                  statement: "Anna bekommt für ihre Arbeit ein kleines Gehalt.",
                  statementEs: "Anna cobra un pequeño sueldo por su trabajo.",
                  richtig: false,
                },
                {
                  id: "b1a-l1-6",
                  statement:
                    "Anna empfiehlt, mit wenigen Stunden pro Woche anzufangen.",
                  statementEs:
                    "Anna recomienda empezar con pocas horas por semana.",
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
            "Beispiel (Aufgabe 0): Worum geht es in Text 1? a) um die Preise für neue Kleidung · b) um den Kauf gebrauchter Dinge · c) um die Flohmärkte der Stadt Bremen — Lösung: b.",
          instructionEs:
            "Lee los dos textos de prensa y las preguntas 7 a 12. Elige en cada una la opción correcta a, b o c. Tienes 20 minutos: el primer texto vale las preguntas 7-9 y el segundo las 10-12.\n\n" +
            "Ejemplo resuelto (0): «¿De qué trata el texto 1?» → b) de la compra de cosas de segunda mano. Fíjate en la mecánica: la opción c) repite palabras del texto (Flohmarkt, Bremen) y aun así es falsa. Ese es el distractor típico del Teil.\n\n" +
            "Aviso de fidelidad: este 0 lo ponemos nosotros. En el examen real el Teil 2 arranca directamente en la 7 — solo los Teile 1, 3 y 4 del Lesen traen un ejemplo resuelto impreso.",
          items: [
            // ---- Texto A (prensa alemana): Secondhand ----
            {
              kind: "lesen-mc",
              id: "b1a-l2-7",
              title: "Text 1 — Gebraucht ist das neue Neu",
              text:
                "Wer heute ein Kleidungsstück, ein Möbelstück oder ein Handy kauft, kauft es immer öfter aus zweiter Hand. Eine Untersuchung der Hochschule Bremen zeigt: Fast jede zweite Person unter 35 Jahren hat im vergangenen Jahr mindestens einmal etwas Gebrauchtes gekauft. Vor zehn Jahren war es noch jede fünfte.\n\n" +
                "Interessant ist vor allem, warum. Lange galt Secondhand als Lösung für Menschen mit wenig Geld. Das stimmt so nicht mehr. Zwar nennen 61 Prozent der Befragten den Preis als wichtigsten Grund, doch direkt danach kommt ein ganz anderes Argument: Man findet Dinge, die es sonst nirgends gibt. „Der Umweltgedanke wird in Umfragen zwar oft genannt, entscheidet aber selten allein“, sagt die Konsumforscherin Marlene Bruhn. „Gekauft wird, was gefällt und was günstig ist. Dass dabei nebenbei Material gespart wird, ist ein willkommener Zusatz, kein Motiv.“\n\n" +
                "Verändert hat sich auch der Ort des Einkaufs. Der klassische Flohmarkt am Sonntagmorgen verliert Kundschaft, die Apps gewinnen sie. Das hat Folgen, über die selten gesprochen wird: Ein T-Shirt, das dreimal quer durch das Land geschickt wird, ist am Ende nicht unbedingt umweltfreundlicher als ein neues.\n\n" +
                "Der Handel hat längst reagiert. Mehrere große Ketten nehmen inzwischen getragene Kleidung zurück, reinigen sie und verkaufen sie im selben Geschäft weiter. Kritiker halten das für reine Werbung. Bruhn sieht es nüchterner: Solange die Menge an neu produzierter Ware nicht sinkt, ändert der Gebrauchtmarkt wenig. Wirklich etwas bringe Secondhand erst dann, wenn deshalb weniger Neues gekauft werde — und genau das lasse sich bisher nicht nachweisen.",
              question: "Was hat die Untersuchung der Hochschule Bremen ergeben?",
              questionEs: "¿Qué ha revelado el estudio de la Universidad de Bremen?",
              options: [
                "Junge Menschen kaufen heute seltener gebraucht als vor zehn Jahren.",
                "Der Kauf gebrauchter Dinge ist bei jungen Menschen deutlich häufiger geworden.",
                "Nur jede fünfte Person unter 35 Jahren kauft heute etwas Gebrauchtes.",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "b1a-l2-8",
              question: "Wie erklärt die Konsumforscherin Marlene Bruhn den Erfolg von Secondhand?",
              questionEs:
                "¿Cómo explica la investigadora de consumo Marlene Bruhn el éxito de la segunda mano?",
              options: [
                "Die meisten Menschen kaufen gebraucht, um die Umwelt zu schützen.",
                "Der Umweltschutz ist für die Käufer meistens nur ein angenehmer Nebeneffekt.",
                "Der Preis spielt für die Käufer inzwischen kaum noch eine Rolle.",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "b1a-l2-9",
              question: "Was sagt der Text über den Handel mit gebrauchter Ware?",
              questionEs: "¿Qué dice el texto sobre el comercio de artículos usados?",
              options: [
                "Er nützt der Umwelt erst dann, wenn deswegen weniger Neues gekauft wird.",
                "Große Ketten lehnen den Verkauf von getragener Kleidung bisher ab.",
                "Der Versand über Apps macht den Gebrauchtkauf immer umweltfreundlicher.",
              ],
              answer: 0,
            },
            // ---- Texto B (prensa austriaca, con nota al pie) ----
            {
              kind: "lesen-mc",
              id: "b1a-l2-10",
              title: "Text 2 — Zwischen Schulbank und Kassa (aus einer Wiener Tageszeitung)",
              text:
                "Rund ein Drittel der österreichischen Schülerinnen und Schüler ab sechzehn arbeitet regelmäßig neben der Schule. Das zeigt eine Erhebung der Arbeiterkammer, für die im Frühjahr 1.200 Jugendliche befragt wurden. Am häufigsten wird in der Gastronomie und im Handel gejobbt, meistens am Samstag. Im Durchschnitt kommen die Jugendlichen auf sieben Stunden pro Woche.\n\n" +
                "Warum sie arbeiten, überrascht viele Eltern: Nur eine Minderheit gibt an, das Geld zu Hause abgeben zu müssen. Die große Mehrheit spart für Reisen, für den Führerschein oder für Technik. „Viele wollen einfach nicht mehr für jede Kleinigkeit fragen müssen“, sagt Studienleiterin Karin Prohaska.\n\n" +
                "Der Wiener Berufsschuldirektor Walter Semmler hält solche Jobs für eine gute Schule: „Wer mit siebzehn an der Kassa* steht, lernt Pünktlichkeit und den Umgang mit schwierigen Kunden. Das steht in keinem Schulbuch.“ Auch bei Bewerbungen nach der Matura* mache sich ein Nebenjob gut.\n\n" +
                "Die Schulpsychologin Eva Lindtner widerspricht ihm nicht grundsätzlich, warnt aber vor der Menge. Ihre Zahlen sind deutlich: Bis etwa acht Stunden pro Woche ändern sich die Noten kaum, ab zwölf Stunden werden sie messbar schlechter. „Das Problem ist selten die Arbeit selbst, sondern der Schlaf, der ihr geopfert wird. Wer bis Mitternacht in der Küche steht, sitzt am Montag ohne Kraft in der Klasse.“\n\n" +
                "Rechtlich ist vieles klar geregelt: Unter fünfzehn ist bezahlte Arbeit nur in Ausnahmen erlaubt, Nachtarbeit für Jugendliche fast nie. Trotzdem berichten viele Befragte von Diensten, die deutlich länger dauern als vereinbart. Die Arbeiterkammer rät deshalb allen Jugendlichen dasselbe: vor dem ersten Arbeitstag einen schriftlichen Vertrag verlangen — auch wegen der Jause*, die es angeblich gratis dazu gibt.",
              footnote:
                "* Kassa = österreichischer Standard für „Kasse“ · Matura = österreichischer Standard für „Abitur“ · Jause = österreichisch für „Zwischenmahlzeit, Imbiss“.",
              question: "Wofür verwenden die befragten Jugendlichen ihr Geld meistens?",
              questionEs: "¿En qué gastan su dinero la mayoría de los jóvenes encuestados?",
              options: [
                "Sie geben es zu Hause für die Familie ab.",
                "Sie sparen es für eigene Wünsche wie Reisen oder den Führerschein.",
                "Sie bezahlen damit ihre Schulbücher und Kurse.",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "b1a-l2-11",
              question: "Was ist die Position der Schulpsychologin Eva Lindtner?",
              questionEs: "¿Cuál es la postura de la psicóloga escolar Eva Lindtner?",
              options: [
                "Jugendliche sollten neben der Schule überhaupt nicht arbeiten.",
                "Ab einem bestimmten Umfang leiden die Schulnoten unter dem Job.",
                "Die Arbeit in der Gastronomie macht Jugendliche krank.",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "b1a-l2-12",
              question: "Was empfiehlt die Arbeiterkammer den Jugendlichen?",
              questionEs: "¿Qué recomienda la Cámara de Trabajo a los jóvenes?",
              options: [
                "vor dem ersten Arbeitstag auf einem schriftlichen Vertrag zu bestehen",
                "höchstens am Samstag und nie am Abend zu arbeiten",
                "einen Job nur über die Schule und nicht privat zu suchen",
              ],
              answer: 0,
            },
          ],
        },

        // ── Teil 3 · 10 min · 7 ítems · Zuordnung 7 ↔ 10 (con el «0») ────
        {
          title: "Lesen · Teil 3",
          instruction:
            "Lesen Sie die Situationen 13 bis 19 und die Anzeigen A bis J vom schwarzen Brett im Nachbarschaftszentrum. Welche Anzeige passt zu welcher Situation? Sie können jede Anzeige nur einmal verwenden. Für eine Situation gibt es keine passende Anzeige. In diesem Fall schreiben Sie 0.\n\n" +
            "Beispiel (Situation 0): Herr Vogel ist über siebzig und möchte endlich verstehen, wie sein neues Tablet funktioniert. — Lösung: Anzeige H. Diese Anzeige ist damit verbraucht und kommt für die Aufgaben 13 bis 19 nicht mehr infrage.",
          instructionEs:
            "Lee las situaciones 13 a 19 y los diez anuncios A-J del tablón del centro vecinal. ¿Qué anuncio va con cada situación? Cada anuncio se usa UNA sola vez, y para una de las situaciones no hay ningún anuncio válido: ahí se responde 0. Es el Teil que más se falla — un solo detalle (horario, precio, requisito) decide.\n\n" +
            "El ejemplo resuelto (situación 0) es Herr Vogel, que pasa de setenta y quiere aprender a manejar su tableta: le va el anuncio H. Y ojo a la consecuencia, que es media estrategia del Teil: el anuncio del ejemplo QUEDA GASTADO y ya no puede ser la respuesta de ninguna de las siete situaciones que puntúan.",
          items: [
            {
              kind: "lesen-match",
              id: "b1a-l3",
              ads: [
                {
                  key: "a",
                  text:
                    "REPARATUR-CAFÉ. Jeden ersten Samstag im Monat von 10 bis 14 Uhr reparieren wir gemeinsam mit Ihnen Toaster, Lampen, Kaffeemaschinen und Fahrräder. Ersatzteile bezahlen Sie selbst. Handys und Kleidung können wir leider nicht reparieren. Ohne Anmeldung, Eintritt frei.",
                },
                {
                  key: "b",
                  text:
                    "KLEIDERTAUSCHBÖRSE. Bringen Sie bis zu zehn saubere Kleidungsstücke mit und nehmen Sie dafür mit, was Ihnen gefällt. Kein Geld, kein Verkauf. Für Kinderkleidung gibt es einen eigenen Tisch. Nächster Termin: Sonntag, 15. März, 11 bis 16 Uhr, großer Saal.",
                },
                {
                  key: "c",
                  text:
                    "GASSI-DIENST. Sie sind krank oder kommen nach einer Operation noch nicht weit? Unsere Ehrenamtlichen gehen mit Ihrem Hund spazieren — kostenlos, aber nur für Menschen über 70 oder nach einem Krankenhausaufenthalt. Anmeldung telefonisch, mindestens zwei Tage vorher.",
                },
                {
                  key: "d",
                  text:
                    "SPRACHCAFÉ. Jeden Mittwoch von 18 bis 20 Uhr reden wir auf Deutsch über alles Mögliche. Kein Unterricht, keine Hausaufgaben, keine Anmeldung. Ab Niveau A2. Getränke gegen eine kleine Spende.",
                },
                {
                  key: "e",
                  text:
                    "LERNWERKSTATT SUCHT FREIWILLIGE. Wir suchen Menschen, die einmal pro Woche zwei Stunden Zeit haben und Grundschulkindern bei den Hausaufgaben helfen. Vorkenntnisse sind nicht nötig, ein Einführungskurs am Samstag ist Pflicht. Die Fahrkosten werden erstattet.",
                },
                {
                  key: "f",
                  text:
                    "FLOHMARKT IM HOF. Am 22. April verkaufen Nachbarinnen und Nachbarn, was sie nicht mehr brauchen. Ein Tisch kostet 8 Euro, Anmeldung bis zum 10. April im Büro. Verkauft werden darf alles außer Lebensmitteln und Tieren.",
                },
                {
                  key: "g",
                  text:
                    "TIERHEIM SUCHT PATEN. Sie haben keinen Platz für ein eigenes Tier? Werden Sie Pate: Mit 15 Euro im Monat unterstützen Sie eine Katze im Tierheim und dürfen sie besuchen, so oft Sie wollen. Mit nach Hause nehmen dürfen Sie das Tier nicht.",
                },
                {
                  key: "h",
                  text:
                    "HANDY-SPRECHSTUNDE. Jeden Donnerstag von 15 bis 17 Uhr erklären Schülerinnen und Schüler Menschen ab 60 ihr Handy, das Tablet und die wichtigsten Apps. Bringen Sie Ihr eigenes Gerät mit. Kostenlos, keine Anmeldung nötig.",
                },
                {
                  key: "i",
                  text:
                    "NACHBARSCHAFTSGARTEN. Wir suchen Leute, die im Frühjahr mitpflanzen. Jede Familie bekommt ein kleines Beet, Werkzeug ist vorhanden. Der Beitrag beträgt 20 Euro im Jahr. Hunde müssen leider draußen bleiben.",
                },
                {
                  key: "j",
                  text:
                    "MÖBELBÖRSE. Gut erhaltene Möbel geben wir kostenlos an Familien weiter, die wenig Geld haben. Abholung nur mit eigenem Transport, wir liefern nicht. Spenden nehmen wir dienstags und freitags von 9 bis 12 Uhr an.",
                },
              ],
              situations: [
                {
                  id: "b1a-l3-13",
                  situation:
                    "Lucía möchte ihren alten Toaster nicht wegwerfen, sondern ihn mit Hilfe reparieren.",
                  situationEs:
                    "Lucía no quiere tirar su tostadora vieja, sino repararla con ayuda.",
                  answer: "a",
                },
                {
                  id: "b1a-l3-14",
                  situation:
                    "Nico hat viele Kindersachen, die zu klein geworden sind, und möchte dafür andere Kleidung bekommen, ohne Geld auszugeben.",
                  situationEs:
                    "Nico tiene mucha ropa infantil que se ha quedado pequeña y quiere conseguir otra a cambio, sin gastar dinero.",
                  answer: "b",
                },
                {
                  id: "b1a-l3-15",
                  situation:
                    "Oma Ilse ist nach einer Operation noch unsicher auf den Beinen und sucht jemanden, der mit ihrem Hund spazieren geht.",
                  situationEs:
                    "La abuela Ilse aún camina insegura tras una operación y busca a alguien que saque a pasear a su perro.",
                  answer: "c",
                },
                {
                  id: "b1a-l3-16",
                  situation:
                    "Leo möchte einmal pro Woche etwas Sinnvolles tun und Kindern beim Lernen helfen. Eine Ausbildung dafür hat er nicht.",
                  situationEs:
                    "Leo quiere hacer algo útil una vez por semana y ayudar a niños a estudiar. No tiene formación para ello.",
                  answer: "e",
                },
                {
                  id: "b1a-l3-17",
                  situation:
                    "Sofía möchte ihre alten Bücher und ihr altes Geschirr verkaufen und sucht dafür einen Tisch.",
                  situationEs:
                    "Sofía quiere vender sus libros y su vajilla viejos y busca una mesa para ello.",
                  answer: "f",
                },
                {
                  id: "b1a-l3-18",
                  situation:
                    "Anna hätte gern eine Katze, darf in ihrer Mietwohnung aber keine Tiere halten. Trotzdem möchte sie regelmäßig ein Tier besuchen.",
                  situationEs:
                    "A Anna le gustaría tener un gato, pero en su piso de alquiler no puede tener animales. Aun así quiere visitar a un animal con regularidad.",
                  answer: "g",
                },
                {
                  id: "b1a-l3-19",
                  situation:
                    "Lucías Bruder hat ein kaputtes Handy und möchte es günstig reparieren lassen.",
                  situationEs:
                    "El hermano de Lucía tiene el móvil roto y quiere que se lo reparen barato.",
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
            "Sie lesen in einer Zeitung sieben Meinungen zum Thema „Immer mehr Hunde in der Großstadt“. Lesen Sie die Aufgaben 20 bis 26 und die Texte. Kreuzen Sie an: Ja oder Nein.\n\n" +
            "Beispiel (Aufgabe 0) — Tomas B., 40, Koch: „Ich habe jahrelang in einem Viertel ohne Hunde gewohnt und fand es leer. Dass heute in fast jedem zweiten Haus einer lebt, finde ich für eine Großstadt genau richtig.“ — Lösung: Ja.",
          instructionEs:
            "Lees en un periódico siete opiniones sobre el tema «cada vez más perros en la gran ciudad». Lee las preguntas 20 a 26 y los textos. Marca: Ja o Nein. Tienes 15 minutos. Nadie escribe «estoy a favor»: la postura hay que deducirla.\n\n" +
            "Ejemplo resuelto (0): Tomas B. cuenta que un barrio sin perros le parecía vacío y que hoy le parece «genau richtig» que haya uno en casi cada dos casas → Ja. Fíjate en cómo se decide: no hay ninguna frase del tipo «estoy a favor», la postura vive en la valoración final.",
          items: [
            {
              kind: "lesen-janein",
              id: "b1a-l4",
              question:
                "Findet die Person es gut, dass in der Großstadt immer mehr Hunde gehalten werden?",
              questionEs:
                "¿A esta persona le parece bien que en la gran ciudad se tengan cada vez más perros?",
              opinions: [
                {
                  id: "b1a-l4-20",
                  author: "Katrin M., 34, Grafikerin",
                  text:
                    "Mein Hund ist der Grund, warum ich nach acht Jahren endlich meine Nachbarn kenne. Vorher habe ich im Treppenhaus gegrüßt und das war es. Wer sich über die vielen Hunde ärgert, sollte einmal morgens um sieben in den Park kommen: Da wird geredet, geholfen und über alles Mögliche gelacht. Eine Stadt ohne Hunde wäre vielleicht sauberer — sie wäre aber auch deutlich kälter.",
                  ja: true,
                },
                {
                  id: "b1a-l4-21",
                  author: "Bernd K., 61, Busfahrer",
                  text:
                    "Ich habe nichts gegen Tiere, wirklich nicht, ich bin mit Hunden groß geworden. Aber unser Hof ist kein Bauernhof. In unserem Haus wohnen sechzehn Parteien, und inzwischen sind es fünf Hunde. Nachts bellt einer, morgens der nächste, und der Spielplatz ist längst kein Spielplatz mehr. Es geht hier nicht um Liebe zum Tier, es geht um Platz. Und den haben wir schlicht nicht.",
                  ja: false,
                },
                {
                  id: "b1a-l4-22",
                  author: "Yasemin T., 28, Krankenpflegerin",
                  text:
                    "Nicht das Tier ist das Problem, sondern der Mensch am anderen Ende der Leine. In meinem alten Viertel gab es zwei Hundeschulen und genug Wiesen, und das Zusammenleben hat wunderbar funktioniert. Ich freue mich über jeden, der einen Hund aus dem Tierheim holt statt aus dem Internet. Die Stadt muss dafür allerdings endlich mehr Flächen schaffen, sonst wird sie ihrem eigenen Erfolg nicht gerecht.",
                  ja: true,
                },
                {
                  id: "b1a-l4-23",
                  author: "Georg P., 45, Lehrer",
                  text:
                    "In meiner Klasse hatten im letzten Jahr zwei Kinder solche Angst, dass sie den Weg zur Schule geändert haben. Das nimmt kaum jemand ernst. Und ehrlich gesagt tun mir die Tiere selbst am meisten leid: acht Stunden allein in einer Wohnung, danach zwanzig Minuten auf Beton. Ein Tier, das für die Wiese gemacht ist, gehört nicht in den dritten Stock, so gut es der Besitzer auch meint.",
                  ja: false,
                },
                {
                  id: "b1a-l4-24",
                  author: "Miriam L., 52, Ärztin",
                  text:
                    "Aus medizinischer Sicht spricht sehr viel dafür. Menschen mit Hund bewegen sich jeden Tag, ob sie wollen oder nicht, und sie sind seltener einsam — bei meinen älteren Patientinnen und Patienten sehe ich diesen Unterschied deutlich. Dass in der Stadt mehr Hunde leben als früher, halte ich deshalb für eine gute Entwicklung. Über die Gehwege ärgere ich mich trotzdem, aber das ist ein Problem der Besitzer.",
                  ja: true,
                },
                {
                  id: "b1a-l4-25",
                  author: "Hakan D., 39, Ladenbesitzer",
                  text:
                    "Vor meinem Geschäft warten jeden Vormittag drei, vier Hunde an der Stange, und man sieht ihnen an, wie lange sie da schon stehen. Ich hatte selbst einen und habe ihn nach drei Jahren schweren Herzens zu meiner Schwester aufs Land gegeben. Wer hier arbeitet, weiß, dass zehn Stunden Warten kein Hundeleben sind. Dass es jedes Jahr mehr werden, macht mich eher traurig als froh.",
                  ja: false,
                },
                {
                  id: "b1a-l4-26",
                  author: "Elena S., 23, Studentin",
                  text:
                    "Ich bin mit dem Satz groß geworden, dass Hunde in die Stadt nicht gehören. Seit ich für eine Nachbarin regelmäßig Gassi gehe, sehe ich das komplett anders: Der Hund kommt aus dem Tierheim, hat hier ein Zuhause gefunden, und uns beiden geht es besser. Verbote lösen gar nichts, mehr Hundewiesen und günstige Kurse schon. Von mir aus dürfen es in unserem Viertel gern noch ein paar mehr werden.",
                  ja: true,
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
            "Beispiel (Aufgabe 0): Sie möchten am Sonntagnachmittag in den Quartiertreff kommen. Was gilt? a) Sie müssen vorher anrufen · b) Der Quartiertreff ist an Sonntagen geschlossen · c) Am Sonntag zahlen alle 60 Franken — Lösung: b.",
          instructionEs:
            "Lee el reglamento y las preguntas 27 a 30. Elige la opción correcta a, b o c. Tienes 10 minutos. En un texto normativo la respuesta está en la excepción, no en la regla general: lee las frases con «nur», «nicht» y «außer».\n\n" +
            "Ejemplo resuelto (0): «Quieres ir el domingo por la tarde» → b) el centro cierra domingos y festivos. Está en el punto 1 del reglamento, en una frase que parece de relleno: en este Teil el dato que decide casi nunca está donde lo buscarías. En el examen real este Teil no trae ejemplo impreso: el 0 es nuestro, para que veas la mecánica antes de jugarte los cuatro ítems.",
          items: [
            {
              kind: "lesen-mc",
              id: "b1a-l5-27",
              title: "Benutzungsordnung des Quartiertreffs Rosengarten (Zürich)",
              text:
                "1. Öffnungszeiten. Der Quartiertreff ist von Dienstag bis Samstag von 9 bis 21 Uhr geöffnet. An Sonn- und Feiertagen bleibt das Haus geschlossen. Die Räume müssen bis 21 Uhr geräumt und aufgeräumt sein; das Licht löscht die letzte Person.\n\n" +
                "2. Räume. Räume werden online reserviert, spätestens drei Tage im Voraus. Für Vereine und Nachbarschaftsgruppen ist die Benutzung gratis, für private Feste werden 60 Franken pro Abend verlangt. Wird eine Reservation weniger als 24 Stunden vorher abgesagt, wird die Hälfte des Betrags in Rechnung gestellt.\n\n" +
                "3. Velos*. Velos sind im Innenhof zu parkieren*, nicht im Treppenhaus. Velos, die länger als vier Wochen im Hof stehen, werden ohne weitere Ankündigung entfernt.\n\n" +
                "4. Tauschladen. Im Erdgeschoss dürfen Gegenstände abgegeben und mitgenommen werden. Angenommen wird nur, was sauber und funktionstüchtig ist. Nicht angenommen werden Elektrogeräte, Matratzen und Lebensmittel. Verkauft wird im Tauschladen nichts.\n\n" +
                "5. Küche. Die Küche darf benutzen, wer vorher die kurze Einführung besucht hat. Das Geschirr ist sofort zu spülen, der Kehricht* wird von den Benutzenden selbst entsorgt.\n\n" +
                "6. Tiere. Hunde sind im Erdgeschoss und im Innenhof willkommen, sofern sie an der Leine geführt werden. In der Küche und im Kinderzimmer sind Tiere nicht erlaubt.\n\n" +
                "7. Schäden. Schäden sind sofort dem Hauswart zu melden. Wer einen Schaden verursacht, haftet dafür; für Kinder haften die Eltern.",
              footnote:
                "* Velo = schweizerischer Standard für „Fahrrad“ · parkieren = schweizerisch für „parken“ · Kehricht = schweizerisch für „Müll, Abfall“.",
              question:
                "Sie möchten am Samstagabend ein privates Geburtstagsfest im Quartiertreff feiern. Was gilt?",
              questionEs:
                "Quieres celebrar una fiesta de cumpleaños privada un sábado por la tarde en el centro. ¿Qué se aplica?",
              options: [
                "Das ist nicht möglich, weil private Feste dort verboten sind.",
                "Sie müssen spätestens drei Tage vorher reservieren und 60 Franken zahlen.",
                "Sie zahlen nichts, dürfen aber erst ab 21 Uhr aufräumen.",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "b1a-l5-28",
              question:
                "Sie sagen Ihre Reservation zwei Stunden vor dem Fest ab. Was bedeutet das?",
              questionEs:
                "Cancelas tu reserva dos horas antes de la fiesta. ¿Qué significa eso?",
              options: [
                "Sie zahlen nichts, weil Sie den Raum nicht benutzt haben.",
                "Sie müssen die Hälfte des Betrags bezahlen.",
                "Sie dürfen ein Jahr lang keinen Raum mehr reservieren.",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "b1a-l5-29",
              question: "Was dürfen Sie im Tauschladen abgeben?",
              questionEs: "¿Qué puedes dejar en la tienda de intercambio?",
              options: [
                "einen sauberen Wintermantel",
                "einen alten Wasserkocher",
                "selbst gebackenen Kuchen",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "b1a-l5-30",
              question:
                "Sie kommen mit Ihrem Hund und möchten in der Küche Kaffee kochen. Was ist richtig?",
              questionEs:
                "Llegas con tu perro y quieres hacer café en la cocina. ¿Qué es correcto?",
              options: [
                "Der Hund darf mit in die Küche, wenn er an der Leine bleibt.",
                "Der Hund muss im Erdgeschoss oder im Hof bleiben, und für die Küche brauchen Sie die Einführung.",
                "Hunde sind im ganzen Haus verboten, die Küche darf jeder benutzen.",
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
            "Beispiel: Sie hören auf der Mailbox: „Guten Tag, hier ist die Praxis Doktor Weber. Ihr Termin am Montag um neun Uhr muss leider verschoben werden.“ Aufgabe 0: „Der Termin bleibt wie geplant.“ — Lösung: Falsch.",
          instructionEs:
            "Ahora escuchas cinco textos cortos. Cada texto se escucha DOS veces. De cada uno resuelves dos tareas: la primera es Richtig/Falsch y la segunda de tres opciones. Antes de cada texto tienes 10 segundos para leer las tareas.\n\n" +
            "El examen abre con un ejemplo ya resuelto (0) que no puntúa: en el mensaje de la consulta de la doctora Weber la cita del lunes «muss verschoben werden», así que «la cita se mantiene» es Falsch. Sirve para calibrar el oído y el ritmo antes de que empiece lo que cuenta.",
          items: [
            {
              kind: "hoeren-group",
              id: "b1a-h1-g1",
              twice: true,
              readSeconds: 10,
              dialog: false,
              audio:
                "Hallo Lucía, hier ist Nico. Du, ich habe uns für den Flohmarkt am Sonntag einen Tisch reserviert, allerdings erst für elf Uhr und nicht für neun — früher war leider alles weg. Schaffst du das trotzdem? Und noch etwas: Bring bitte keine Kleidung mit, davon haben wir schon zwei Kisten. Bücher und Geschirr wären viel besser. Ich hole dich um halb elf mit dem Auto ab. Melde dich kurz, ja? Tschüss!",
              items: [
                {
                  kind: "hoeren-rf",
                  id: "b1a-h1-1",
                  audio: "",
                  statement: "Nico hat einen Tisch für neun Uhr bekommen.",
                  statementEs: "Nico ha conseguido una mesa para las nueve.",
                  richtig: false,
                },
                {
                  kind: "hoeren-mc",
                  id: "b1a-h1-2",
                  twice: true,
                  audio: "",
                  question: "Was soll Lucía mitbringen?",
                  questionEs: "¿Qué debe llevar Lucía?",
                  options: ["Kleidung", "Bücher und Geschirr", "gar nichts"],
                  answer: 1,
                },
              ],
            },
            {
              kind: "hoeren-group",
              id: "b1a-h1-g2",
              twice: true,
              readSeconds: 10,
              dialog: false,
              audio:
                "Und jetzt die Verkehrsmeldungen. Auf der A9 zwischen Bayreuth und Nürnberg ist nach einem Unfall die rechte Spur gesperrt, rechnen Sie dort mit etwa dreißig Minuten Wartezeit. In der Innenstadt bleibt die Königstraße wegen des Straßenfestes noch bis Montagmorgen für Autos gesperrt. Die Straßenbahnlinien vier und sieben fahren in dieser Zeit einen Umweg über den Hauptbahnhof. Radfahrerinnen und Radfahrer kommen wie gewohnt durch.",
              items: [
                {
                  kind: "hoeren-rf",
                  id: "b1a-h1-3",
                  audio: "",
                  statement: "Autos dürfen am Sonntag nicht durch die Königstraße fahren.",
                  statementEs:
                    "El domingo los coches no pueden circular por la Königstraße.",
                  richtig: true,
                },
                {
                  kind: "hoeren-mc",
                  id: "b1a-h1-4",
                  twice: true,
                  audio: "",
                  question: "Was gilt für die Straßenbahnlinien 4 und 7?",
                  questionEs: "¿Qué ocurre con las líneas de tranvía 4 y 7?",
                  options: [
                    "Sie fallen ganz aus.",
                    "Sie fahren eine andere Strecke.",
                    "Sie fahren nur bis zur Königstraße.",
                  ],
                  answer: 1,
                },
              ],
            },
            {
              kind: "hoeren-group",
              id: "b1a-h1-g3",
              twice: true,
              readSeconds: 10,
              dialog: false,
              audio:
                "Sehr geehrte Fahrgäste am Gleis sieben: Der Intercity nach Hamburg, planmäßige Abfahrt sechzehn Uhr zwölf, fährt heute ausnahmsweise von Gleis elf ab. Grund dafür ist eine Störung an einer Weiche. Der Zug hat außerdem etwa zwanzig Minuten Verspätung. Bitte beachten Sie: Die Wagen der ersten Klasse befinden sich heute am Ende des Zuges. Wir bitten um Ihr Verständnis.",
              items: [
                {
                  kind: "hoeren-rf",
                  id: "b1a-h1-5",
                  audio: "",
                  statement: "Der Zug nach Hamburg fährt heute pünktlich ab.",
                  statementEs: "El tren a Hamburgo sale hoy puntual.",
                  richtig: false,
                },
                {
                  kind: "hoeren-mc",
                  id: "b1a-h1-6",
                  twice: true,
                  audio: "",
                  question: "Wo stehen heute die Wagen der ersten Klasse?",
                  questionEs: "¿Dónde están hoy los vagones de primera clase?",
                  options: [
                    "am Anfang des Zuges",
                    "in der Mitte des Zuges",
                    "am Ende des Zuges",
                  ],
                  answer: 2,
                },
              ],
            },
            {
              kind: "hoeren-group",
              id: "b1a-h1-g4",
              twice: true,
              readSeconds: 10,
              dialog: false,
              audio:
                "Das Wetter für morgen, Donnerstag: Am Vormittag bleibt es im ganzen Land trocken, die Sonne zeigt sich vor allem im Süden. Am Nachmittag ziehen von Westen dichte Wolken auf, und ab dem frühen Abend regnet es kräftig; im Bergland kann es sogar schneien. Die Temperaturen erreichen sieben bis elf Grad. In der Nacht wird es mit nur zwei Grad deutlich kühler, dazu frischt der Wind stark auf.",
              items: [
                {
                  kind: "hoeren-rf",
                  id: "b1a-h1-7",
                  audio: "",
                  statement: "Am Vormittag regnet es überall.",
                  statementEs: "Por la mañana llueve en todas partes.",
                  richtig: false,
                },
                {
                  kind: "hoeren-mc",
                  id: "b1a-h1-8",
                  twice: true,
                  audio: "",
                  question: "Wie wird die Nacht?",
                  questionEs: "¿Cómo será la noche?",
                  options: [
                    "mild und windstill",
                    "kühl und windig",
                    "warm und trocken",
                  ],
                  answer: 1,
                },
              ],
            },
            {
              kind: "hoeren-group",
              id: "b1a-h1-g5",
              twice: true,
              readSeconds: 10,
              dialog: false,
              audio:
                "Herzlich willkommen in Salzburg! Ganz kurz zum Ablauf: Wir starten die Führung gleich hier vor dem Bus, sie dauert ungefähr neunzig Minuten. Danach haben Sie Zeit zur freien Verfügung. Bitte seien Sie um fünfzehn Uhr dreißig wieder hier am Bus, wir fahren dann ohne Verspätung weiter zum Hotel. Das Mittagessen ist heute nicht im Preis enthalten, das Abendessen dagegen schon. Wer schlecht zu Fuß ist, meldet sich bitte kurz bei mir.",
              items: [
                {
                  kind: "hoeren-rf",
                  id: "b1a-h1-9",
                  audio: "",
                  statement: "Das Abendessen muss extra bezahlt werden.",
                  statementEs: "La cena hay que pagarla aparte.",
                  richtig: false,
                },
                {
                  kind: "hoeren-mc",
                  id: "b1a-h1-10",
                  twice: true,
                  audio: "",
                  question: "Wann müssen alle wieder am Bus sein?",
                  questionEs: "¿Cuándo tienen que estar todos de vuelta en el autobús?",
                  options: ["um 13.30 Uhr", "um 15.30 Uhr", "um 16.30 Uhr"],
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
            "Beispiel (Aufgabe 0): Wer spricht? a) eine Tierärztin · b) die Leiterin der ehrenamtlichen Arbeit · c) ein neuer Freiwilliger — Lösung: b.",
          instructionEs:
            "Ahora escuchas un texto. Se escucha UNA sola vez. Resuelves cinco tareas de tres opciones. Primero tienes 60 segundos para leer las preguntas 11 a 15: úsalos, son parte del examen. Si pierdes un ítem, déjalo ir y sigue con el siguiente.\n\n" +
            "Ejemplo resuelto (0): «¿quién habla?» → b) la responsable del voluntariado. Lo dice en la segunda frase, y en este Teil ese dato inicial es el que ordena todo lo demás: quién habla y a quién le habla. El 0 es nuestro: del Hören, solo los Teile 1 y 4 traen ejemplo impreso en el examen real.",
          items: [
            {
              kind: "hoeren-group",
              id: "b1a-h2",
              twice: false,
              readSeconds: 60,
              dialog: false,
              audio:
                "Schön, dass Sie alle gekommen sind. Mein Name ist Katja Wernicke, ich leite hier im Tierheim Sonnenhof die ehrenamtliche Arbeit, und ich freue mich sehr, dass Sie sich für uns entschieden haben. Ich erkläre Ihnen in den nächsten zehn Minuten, wie es weitergeht. " +
                "Zuerst das Wichtigste: Sie fangen heute noch nicht an. Jede und jeder von Ihnen macht zunächst eine Einführung an drei Nachmittagen. Erst danach dürfen Sie allein mit einem Hund vor die Tür. Das klingt streng, hat aber einen guten Grund: Die meisten Tiere hier haben Schlimmes erlebt, und ein falscher Moment am Anfang kostet uns Monate Arbeit. " +
                "Zweitens die Zeit. Viele fragen mich, ob zwei Stunden pro Woche überhaupt reichen. Die Antwort ist ja — aber sie müssen regelmäßig sein. Eine Helferin, die jeden Mittwoch kommt, ist uns lieber als jemand, der einmal im Monat einen ganzen Samstag opfert. Die Tiere brauchen keinen Rekord, sie brauchen Verlässlichkeit. " +
                "Drittens: Was Sie hier tun, ist viel mehr als Gassi gehen. Wir suchen auch Menschen für das Telefon, für die Internetseite, für Fahrten zur Tierärztin und für die Küche. Wenn Sie also Angst vor großen Hunden haben, sagen Sie das ruhig offen. Es gibt bei uns genug Aufgaben ohne Leine. " +
                "Und dann etwas, das oft falsch verstanden wird: Sie dürfen sich nicht einfach Ihr Lieblingstier mit nach Hause nehmen. Wer ein Tier adoptieren möchte, geht genau denselben Weg wie alle anderen — Gespräch, Besuch zu Hause, Wartezeit. Diese Regel hat uns schon viel Ärger erspart. " +
                "Zum Schluss das Praktische: feste Schuhe, alte Kleidung, und bitte kein Futter aus der eigenen Tasche. Fragen sammeln wir am Ende — jetzt gehen wir erst einmal gemeinsam durch das Haus.",
              items: [
                {
                  kind: "hoeren-mc",
                  id: "b1a-h2-11",
                  twice: false,
                  audio: "",
                  question: "Was passiert am Anfang mit den neuen Freiwilligen?",
                  questionEs: "¿Qué ocurre al principio con los nuevos voluntarios?",
                  options: [
                    "Sie gehen sofort allein mit einem Hund spazieren.",
                    "Sie machen zuerst eine Einführung an drei Nachmittagen.",
                    "Sie arbeiten in den ersten Wochen nur in der Küche.",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "b1a-h2-12",
                  twice: false,
                  audio: "",
                  question: "Was ist Frau Wernicke bei der Zeit am wichtigsten?",
                  questionEs:
                    "¿Qué es lo más importante para la señora Wernicke en cuanto al tiempo?",
                  options: [
                    "möglichst viele Stunden pro Woche",
                    "regelmäßige Termine, auch wenn es wenige Stunden sind",
                    "Einsätze vor allem am Wochenende",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "b1a-h2-13",
                  twice: false,
                  audio: "",
                  question: "Was sagt sie Menschen, die Angst vor großen Hunden haben?",
                  questionEs: "¿Qué les dice a quienes tienen miedo de los perros grandes?",
                  options: [
                    "Für sie gibt es im Tierheim andere Aufgaben.",
                    "Sie sind im Tierheim leider falsch.",
                    "Sie sollen die Einführung zweimal machen.",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "b1a-h2-14",
                  twice: false,
                  audio: "",
                  question: "Was gilt für Freiwillige, die ein Tier adoptieren möchten?",
                  questionEs:
                    "¿Qué se aplica a los voluntarios que quieren adoptar un animal?",
                  options: [
                    "Sie bekommen ihr Lieblingstier bevorzugt.",
                    "Sie dürfen als Freiwillige überhaupt kein Tier adoptieren.",
                    "Für sie gelten dieselben Regeln wie für alle anderen.",
                  ],
                  answer: 2,
                },
                {
                  kind: "hoeren-mc",
                  id: "b1a-h2-15",
                  twice: false,
                  audio: "",
                  question: "Was sollen die Freiwilligen mitbringen?",
                  questionEs: "¿Qué deben traer los voluntarios?",
                  options: [
                    "feste Schuhe und alte Kleidung",
                    "Futter für die Tiere",
                    "einen Ausweis mit Foto",
                  ],
                  answer: 0,
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
            "Beispiel (Aufgabe 0): „Leo räumt gerade seine Wohnung auf.“ — Lösung: Richtig.",
          instructionEs:
            "Ahora escuchas una conversación entre dos amigos. Se escucha UNA sola vez. Resuelves siete tareas Richtig/Falsch. Primero, 60 segundos para leer las preguntas 16 a 22.\n\n" +
            "Ejemplo resuelto (0): «Leo está ordenando su casa» → Richtig; él lo dice con una palabra que quizá no conoces, «Ich miste aus». Esa es la lección del ejemplo: la afirmación nunca repite las palabras del audio, y una sola pasada no da para traducir. También aquí el 0 lo añadimos nosotros; el examen real empieza en la 16.",
          items: [
            {
              kind: "hoeren-group",
              id: "b1a-h3",
              twice: false,
              readSeconds: 60,
              dialog: true,
              audio:
                "Leo, was machst du denn da mit den ganzen Kartons? | " +
                "Ich miste aus. Ich habe letzte Woche angefangen, alles zu verkaufen, was ich seit zwei Jahren nicht mehr benutzt habe. | " +
                "Und? Klappt das überhaupt? | " +
                "Besser, als ich gedacht habe. Die Kamera war nach zwanzig Minuten weg. Für die Bücher interessiert sich dagegen kein Mensch. | " +
                "Über welche App machst du das? | " +
                "Über die mit dem grünen Logo, meine Schwester hat sie mir gezeigt. Am Anfang fand ich das Fotografieren nervig, aber inzwischen geht das schnell. | " +
                "Ich hätte immer Angst, dass mich jemand betrügt. | " +
                "Das ist mir tatsächlich einmal fast passiert. Ein Mann hat bezahlt und dann behauptet, das Paket sei leer angekommen. Mein Geld habe ich trotzdem bekommen, weil ich alles fotografiert hatte, bevor ich den Karton zugeklebt habe. | " +
                "Also machst du jetzt von jedem Paket Fotos? | " +
                "Von jedem einzelnen. Das dauert zwei Minuten und spart einem viel Ärger. | " +
                "Und der Versand? Ich stelle mir das anstrengend vor. | " +
                "Der Versand ist ehrlich gesagt das Schlimmste. Ich stehe jeden zweiten Tag in der Post und warte. Deshalb schreibe ich inzwischen immer dazu, dass man die Sachen auch abholen kann. Die Hälfte holt tatsächlich ab. | " +
                "Und was machst du mit den Sachen, die keiner haben will? | " +
                "Die Bücher bringe ich am Samstag ins Nachbarschaftszentrum, da gibt es ein Regal zum Mitnehmen. Wegwerfen kommt für mich nicht infrage. | " +
                "Ich hätte auch einiges. Vielleicht sollte ich das mal probieren. | " +
                "Mach das. Aber fang mit fünf Sachen an, nicht mit fünfzig. Ich habe am ersten Abend zwanzig Anzeigen geschrieben und danach drei Tage lang nur noch Nachrichten beantwortet. | " +
                "Das klingt nach Arbeit. | " +
                "Ist es auch. Reich wird man dabei nicht — in zwei Wochen waren es ungefähr hundertzwanzig Euro. Aber die Wohnung ist leer, und ich weiß, wo meine Sachen gelandet sind.",
              items: [
                {
                  kind: "hoeren-rf",
                  id: "b1a-h3-16",
                  audio: "",
                  statement: "Leo verkauft Dinge, die er lange nicht mehr benutzt hat.",
                  statementEs: "Leo vende cosas que hace mucho que no usa.",
                  richtig: true,
                },
                {
                  kind: "hoeren-rf",
                  id: "b1a-h3-17",
                  audio: "",
                  statement: "Die Bücher waren am schnellsten verkauft.",
                  statementEs: "Los libros fueron lo que se vendió más rápido.",
                  richtig: false,
                },
                {
                  kind: "hoeren-rf",
                  id: "b1a-h3-18",
                  audio: "",
                  statement: "Leo hat sein Geld verloren, als es Probleme mit einem Paket gab.",
                  statementEs:
                    "Leo perdió su dinero cuando hubo problemas con un paquete.",
                  richtig: false,
                },
                {
                  kind: "hoeren-rf",
                  id: "b1a-h3-19",
                  audio: "",
                  statement: "Leo fotografiert inzwischen jedes Paket, bevor er es verschickt.",
                  statementEs:
                    "Ahora Leo fotografía cada paquete antes de enviarlo.",
                  richtig: true,
                },
                {
                  kind: "hoeren-rf",
                  id: "b1a-h3-20",
                  audio: "",
                  statement: "Leo findet den Versand angenehm.",
                  statementEs: "A Leo el envío le resulta agradable.",
                  richtig: false,
                },
                {
                  kind: "hoeren-rf",
                  id: "b1a-h3-21",
                  audio: "",
                  statement: "Die Bücher, die niemand kaufen will, wirft Leo weg.",
                  statementEs: "Los libros que nadie quiere comprar, Leo los tira.",
                  richtig: false,
                },
                {
                  kind: "hoeren-rf",
                  id: "b1a-h3-22",
                  audio: "",
                  statement: "Leo rät, mit wenigen Anzeigen anzufangen.",
                  statementEs: "Leo aconseja empezar con pocos anuncios.",
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
            "Beispiel (Aussage 0): „Ich begrüße die Gäste und nenne das Thema der Sendung.“ — Lösung: a) die Moderatorin Ella Sander.",
          instructionEs:
            "Ahora escuchas un debate de radio con tres voces (moderadora e invitados). Se escucha DOS veces. Asigna cada afirmación a quien la dice: a, b o c. Primero, 60 segundos para leer las tareas 23 a 30.\n\n" +
            "Ejemplo resuelto (0): «saludo a los invitados y digo el tema del programa» → a) la moderadora. Aquí no vale «esta afirmación no la dice nadie»: cada una es de alguno de los tres, y la moderadora también opina, no solo pregunta — dos ítems del Teil son suyos.",
          items: [
            {
              kind: "hoeren-group",
              id: "b1a-h4",
              twice: true,
              readSeconds: 60,
              dialog: true,
              audio:
                "Moderatorin Ella Sander: Guten Abend und willkommen bei Stadtgespräch. Unser Thema heute: Sollen Schülerinnen und Schüler neben der Schule arbeiten? Bei mir sind der Berufsberater Jonas Kaltenbach und die Schulleiterin Fatma Özdemir. Herr Kaltenbach, Sie sagen: ja, unbedingt. | " +
                "Jonas Kaltenbach: Ja, und zwar aus einem einfachen Grund. In einem Nebenjob lernt eine Sechzehnjährige Dinge, die ihr keine Schulstunde beibringen kann: pünktlich sein, bei unfreundlichen Kunden ruhig bleiben, im Team funktionieren. Das lässt sich im Unterricht nicht simulieren, das muss man erleben. | " +
                "Fatma Özdemir: Da widerspreche ich gar nicht. Nur sehe ich montags die andere Seite. Ich habe Klassen, in denen die Hälfte übermüdet sitzt, weil sie bis Mitternacht in einer Küche gestanden hat. Diese Stunden hole ich pädagogisch nicht mehr herein. | " +
                "Ella Sander: Aber ist das nicht vor allem eine Frage des Umfangs? Zwischen vier Stunden am Samstag und drei Abenden pro Woche liegen Welten. Ich glaube, entscheidend ist genau die Stundenzahl, sonst reden wir aneinander vorbei. | " +
                "Jonas Kaltenbach: Da haben Sie einen Punkt, aber mit einer Zahl allein ist es nicht getan. Ich rate jedem Jugendlichen etwas anderes: In den Wochen vor den Prüfungen wird pausiert. Ein guter Betrieb akzeptiert das, wenn man es früh genug anspricht. | " +
                "Fatma Özdemir: Mein Vorschlag geht weiter. Wenn Erfahrung das Ziel ist, dann bringt ein gutes Praktikum mehr als ein Nebenjob. Zwei Wochen in einem Betrieb, der zu den Interessen des Jugendlichen passt, sagen über die Berufswahl deutlich mehr aus als ein Jahr an der Kasse. | " +
                "Ella Sander: Ich muss gestehen, ich habe als Schülerin selbst gearbeitet, jeden Samstag in einer Bäckerei, und ich möchte diese Zeit nicht missen. | " +
                "Jonas Kaltenbach: Sehen Sie. Einen Punkt gebe ich allerdings zu: Wer nur wegen des Geldes anfängt, hört meistens nach kurzer Zeit wieder auf. Dabei bleiben die, denen die Arbeit selbst etwas gibt. | " +
                "Fatma Özdemir: Und genau deshalb sollten wir die Jugendlichen nicht allein suchen lassen. Wir Schulen kennen die Betriebe im Viertel. Eine Schule, die vermittelt, verhindert die schlechten Stellen von vornherein. | " +
                "Ella Sander: Ein schöner Schlusssatz. Vielen Dank Ihnen beiden.",
              items: [
                {
                  kind: "hoeren-wersagt",
                  id: "b1a-h4-23",
                  speakers: [
                    { key: "a", name: "die Moderatorin Ella Sander" },
                    { key: "b", name: "der Berufsberater Jonas Kaltenbach" },
                    { key: "c", name: "die Schulleiterin Fatma Özdemir" },
                  ],
                  statement:
                    "In einem Nebenjob lernt man Dinge, die die Schule nicht vermitteln kann.",
                  statementEs:
                    "En un trabajo a tiempo parcial se aprenden cosas que la escuela no puede enseñar.",
                  answer: "b",
                },
                {
                  kind: "hoeren-wersagt",
                  id: "b1a-h4-24",
                  speakers: [
                    { key: "a", name: "die Moderatorin Ella Sander" },
                    { key: "b", name: "der Berufsberater Jonas Kaltenbach" },
                    { key: "c", name: "die Schulleiterin Fatma Özdemir" },
                  ],
                  statement: "Entscheidend ist vor allem, wie viele Stunden gearbeitet wird.",
                  statementEs: "Lo decisivo es sobre todo cuántas horas se trabaja.",
                  answer: "a",
                },
                {
                  kind: "hoeren-wersagt",
                  id: "b1a-h4-25",
                  speakers: [
                    { key: "a", name: "die Moderatorin Ella Sander" },
                    { key: "b", name: "der Berufsberater Jonas Kaltenbach" },
                    { key: "c", name: "die Schulleiterin Fatma Özdemir" },
                  ],
                  statement: "Viele Jugendliche sitzen am Montag zu müde im Unterricht.",
                  statementEs:
                    "Muchos jóvenes están el lunes demasiado cansados en clase.",
                  answer: "c",
                },
                {
                  kind: "hoeren-wersagt",
                  id: "b1a-h4-26",
                  speakers: [
                    { key: "a", name: "die Moderatorin Ella Sander" },
                    { key: "b", name: "der Berufsberater Jonas Kaltenbach" },
                    { key: "c", name: "die Schulleiterin Fatma Özdemir" },
                  ],
                  statement:
                    "In den Wochen vor wichtigen Prüfungen sollten Jugendliche mit dem Job pausieren.",
                  statementEs:
                    "En las semanas previas a exámenes importantes los jóvenes deberían hacer una pausa en el trabajo.",
                  answer: "b",
                },
                {
                  kind: "hoeren-wersagt",
                  id: "b1a-h4-27",
                  speakers: [
                    { key: "a", name: "die Moderatorin Ella Sander" },
                    { key: "b", name: "der Berufsberater Jonas Kaltenbach" },
                    { key: "c", name: "die Schulleiterin Fatma Özdemir" },
                  ],
                  statement:
                    "Ein Praktikum ist für die Berufswahl hilfreicher als ein Nebenjob.",
                  statementEs:
                    "Unas prácticas son más útiles para elegir profesión que un trabajo a tiempo parcial.",
                  answer: "c",
                },
                {
                  kind: "hoeren-wersagt",
                  id: "b1a-h4-28",
                  speakers: [
                    { key: "a", name: "die Moderatorin Ella Sander" },
                    { key: "b", name: "der Berufsberater Jonas Kaltenbach" },
                    { key: "c", name: "die Schulleiterin Fatma Özdemir" },
                  ],
                  statement: "Ich habe als Schülerin selbst neben der Schule gearbeitet.",
                  statementEs:
                    "Yo misma trabajé de estudiante además de ir a la escuela.",
                  answer: "a",
                },
                {
                  kind: "hoeren-wersagt",
                  id: "b1a-h4-29",
                  speakers: [
                    { key: "a", name: "die Moderatorin Ella Sander" },
                    { key: "b", name: "der Berufsberater Jonas Kaltenbach" },
                    { key: "c", name: "die Schulleiterin Fatma Özdemir" },
                  ],
                  statement: "Wer nur wegen des Geldes arbeitet, hört bald wieder auf.",
                  statementEs:
                    "Quien trabaja solo por el dinero lo deja pronto.",
                  answer: "b",
                },
                {
                  kind: "hoeren-wersagt",
                  id: "b1a-h4-30",
                  speakers: [
                    { key: "a", name: "die Moderatorin Ella Sander" },
                    { key: "b", name: "der Berufsberater Jonas Kaltenbach" },
                    { key: "c", name: "die Schulleiterin Fatma Özdemir" },
                  ],
                  statement:
                    "Die Schule sollte den Jugendlichen bei der Suche nach einer Stelle helfen.",
                  statementEs:
                    "La escuela debería ayudar a los jóvenes a buscar un puesto.",
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
              id: "b1a-s1",
              task:
                "Sie waren am Sonntag zum ersten Mal auf einer Kleidertauschbörse im Nachbarschaftszentrum. Schreiben Sie Ihrer Freundin Sofía eine E-Mail.",
              taskEs:
                "El domingo estuviste por primera vez en un intercambio de ropa del centro vecinal. Escríbele un email a tu amiga Sofía.",
              points: [
                "Cuenta cómo fue la tarde y qué te llevaste",
                "Explica por qué fuiste allí en vez de comprar ropa nueva",
                "Proponle ir juntas la próxima vez y di cuándo es",
              ],
              words: 80,
              points_max: 40,
              model:
                "Liebe Sofía,\n\n" +
                "stell dir vor, ich war am Sonntag zum ersten Mal auf einer Kleidertauschbörse im Nachbarschaftszentrum. Es waren viel mehr Leute da, als ich gedacht hatte, und ich habe eine fast neue Jacke und zwei Pullover mitgenommen, ohne etwas zu bezahlen.\n\n" +
                "Ich bin hingegangen, weil ich es unsinnig finde, ständig Neues zu kaufen, obwohl mein Schrank voll ist.\n\n" +
                "Der nächste Termin ist am 15. März um elf Uhr. Hättest du Lust, mitzukommen? Dann bringen wir zusammen mit, was wir nicht mehr tragen.\n\n" +
                "Viele Grüße\nAnna",
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
              id: "b1a-s2",
              task:
                "Schreiben Sie Ihren Kommentar zum Beitrag von Wolfgang57. Sagen Sie klar, was Sie davon halten, und begründen Sie Ihre Meinung mit Beispielen.",
              taskEs:
                "Escribe tu comentario al mensaje de Wolfgang57. Di con claridad qué te parece y justifica tu opinión con ejemplos.",
              stimulus: {
                source: "Leserforum der Stadtzeitung · Beitrag von Wolfgang57",
                text:
                  "Überall lese ich, wie schwer Vereine, Tierheime und Nachbarschaftszentren neue Helferinnen und Helfer finden. Für mich ist die Lösung völlig klar: Jede Schülerin und jeder Schüler sollte im Jahr vierzig Stunden ehrenamtlich arbeiten — verpflichtend, so wie ein Schulfach mit Note. Wer jung damit anfängt, hört später nicht mehr auf. Und nebenbei lernen die Jugendlichen endlich einmal etwas über das echte Leben.",
              },
              points: [
                "Di claramente si estás de acuerdo con Wolfgang57 o no",
                "Da al menos dos razones y un ejemplo concreto",
                "Cierra con una conclusión o una propuesta propia",
              ],
              words: 80,
              points_max: 40,
              model:
                "Wolfgangs Vorschlag verstehe ich gut, halte ihn aber für falsch. Ein Ehrenamt lebt davon, dass man es freiwillig macht. Wer vierzig Stunden ableisten muss wie eine Strafe, zählt nur die Minuten und hilft niemandem.\n\n" +
                "Außerdem sind viele Jugendliche schon jetzt belastet: Schule, Hausaufgaben und oft noch ein Nebenjob. Eine Freundin von mir hat freiwillig in einem Tierheim mitgeholfen und ist dabei geblieben, gerade weil niemand sie gezwungen hat.\n\n" +
                "Meiner Meinung nach sollten die Schulen die Vereine vorstellen und Zeit dafür geben. Überzeugen wirkt besser als eine Pflicht mit Note.",
              rubric: RUBRIC_SCHREIBEN_40,
            },
          ],
        },
        {
          title: "Schreiben · Aufgabe 3 (15 Minuten · 20 Punkte)",
          instruction:
            "Schreiben Sie eine formelle E-Mail (circa 40 Wörter). Entschuldigen Sie sich höflich und schreiben Sie etwas zu beiden Punkten. Vergessen Sie die Anrede und den Gruß am Schluss nicht.",
          instructionEs:
            "Escribe un email FORMAL de unas 40 palabras. Discúlpate con cortesía y trata los dos puntos. Registro: Sie (con mayúscula siempre), Anrede y Gruß obligatorios. Veinte minutos antes escribías con du: ese cambio de registro es lo que se evalúa aquí.",
          items: [
            {
              kind: "schreiben-message",
              id: "b1a-s3",
              task:
                "Sie haben sich für den Einführungskurs für neue Freiwillige am Samstag im Tierheim Sonnenhof angemeldet, können aber nicht kommen. Schreiben Sie eine E-Mail an Frau Wernicke.",
              taskEs:
                "Te habías apuntado al curso de introducción para nuevos voluntarios del sábado en la protectora Sonnenhof, pero no puedes ir. Escribe un email a la señora Wernicke.",
              points: [
                "Discúlpate por no poder asistir y explica brevemente por qué",
                "Pregunta cortésmente por otra fecha posible",
              ],
              words: 40,
              points_max: 20,
              model:
                "Sehr geehrte Frau Wernicke,\n\n" +
                "leider kann ich am Samstag nicht am Einführungskurs teilnehmen, da ich an diesem Wochenende arbeiten muss. Das tut mir sehr leid.\n\n" +
                "Könnten Sie mir bitte mitteilen, wann der nächste Kurs stattfindet? Ich würde gern im Mai dabei sein.\n\n" +
                "Vielen Dank im Voraus.\n\n" +
                "Mit freundlichen Grüßen\nLucía Ortega",
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
              id: "b1a-sp1",
              teil: 1,
              weight: 32, // 28 oficiales + los 4 de Aussprache que le tocan
              prepSeconds: 300, // 5 de los 15 minutos oficiales de preparación
              speakSeconds: 180,
              prompt:
                "Situation: Ihr Nachbarschaftszentrum feiert am Samstag ein Sommerfest. Sie und Ihre Partnerin / Ihr Partner organisieren dort einen Stand mit gebrauchten Sachen für einen guten Zweck.\n\n" +
                "• Was soll am Stand angeboten werden?\n" +
                "• Wann treffen Sie sich zum Aufbauen?\n" +
                "• Wie transportieren Sie die Sachen zum Zentrum?\n" +
                "• Wer fragt die Nachbarn nach Spenden?\n" +
                "• Und was noch? (eigener Punkt)",
              promptEs:
                "Situación: el centro vecinal celebra el sábado una fiesta de verano. Tu compañero y tú organizáis allí un puesto de cosas de segunda mano con fines benéficos. Puntos: qué se ofrece, cuándo quedáis para montarlo, cómo transportáis las cosas, quién pide donaciones a los vecinos, y un punto libre vuestro.",
              model:
                "Sollen wir mit den Sachen anfangen? Ich würde Bücher, Geschirr und Kinderkleidung anbieten — Möbel sind zu schwer. — Gute Idee, aber Kleidung haben wir schon vom Kleidertausch. Wie wäre es, wenn wir stattdessen Spielzeug nehmen? — Einverstanden, Spielzeug geht immer. Wann treffen wir uns zum Aufbauen? Ich schlage neun Uhr vor, das Fest beginnt ja um elf. — Neun ist mir ehrlich gesagt zu früh, ich muss die Tische erst holen. Passt halb zehn auch? — Ja, das reicht. Und den Transport? — Mein Nachbar hat einen kleinen Bus und würde uns helfen, wenn wir ihn rechtzeitig fragen. Dann könntest du die Nachbarn nach Spenden fragen, du kennst mehr Leute im Haus als ich. — Mache ich, ich hänge auch einen Zettel ins Treppenhaus. Und als eigenen Punkt schlage ich vor, dass wir eine Kasse mit Wechselgeld vorbereiten. — Sehr gut. Dann steht der Plan: Spielzeug, Bücher und Geschirr, halb zehn, der Bus deines Nachbarn, du fragst im Haus und ich bringe die Kasse mit.",
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
              id: "b1a-sp2",
              topic:
                "Wählen Sie ein Thema:\n" +
                "Thema 1 — Ein Haustier in der Stadt: sinnvoll oder nicht?\n" +
                "Thema 2 — Im Internet einkaufen oder im Geschäft um die Ecke?",
              topicEs:
                "Elige UN tema, como en el examen real. Tema 1: tener un animal de compañía en la ciudad, ¿tiene sentido o no? · Tema 2: comprar por internet o en la tienda del barrio. Las cinco diapositivas son las mismas para los dos; los modelos de abajo desarrollan el Tema 1, y cada diapositiva trae además la pista para el Tema 2.",
              prepSeconds: 600, // 10 de los 15 minutos oficiales de preparación
              speakSeconds: 210,
              weight: 48, // 40 oficiales + los 8 de Aussprache que le tocan
              slides: [
                {
                  title:
                    "Folie 1 — Nennen Sie das Thema Ihrer Präsentation und stellen Sie den Inhalt vor.",
                  hint:
                    "Di el tema y anuncia la estructura: qué vas a contar en las cinco diapositivas. Treinta segundos bastan, pero no te las saltes: es la banda más barata del examen. · Tema 2: «In meiner Präsentation geht es um die Frage, ob man heute noch im Geschäft um die Ecke einkauft oder alles im Internet bestellt.»",
                  model:
                    "In meiner Präsentation geht es um die Frage, ob ein Haustier in eine Großstadt gehört. Ich habe dieses Thema gewählt, weil in meinem Viertel immer mehr Hunde und Katzen leben. Zuerst erzähle ich von meiner eigenen Erfahrung, danach berichte ich über die Situation in meinem Heimatland. Anschließend nenne ich Vor- und Nachteile und sage meine Meinung dazu. Am Ende fasse ich alles kurz zusammen.",
                },
                {
                  title:
                    "Folie 2 — Berichten Sie von Ihrer Situation oder einem Erlebnis im Zusammenhang mit dem Thema.",
                  hint:
                    "Una experiencia propia, contada en pasado (Perfekt hablado). Concreta: una escena, no una teoría. · Tema 2: la última compra que hiciste por internet o en una tienda del barrio, con lo que salió bien o mal.",
                  model:
                    "Ich selbst habe kein Haustier, weil ich den ganzen Tag arbeite. Vor zwei Jahren habe ich aber für eine Nachbarin drei Wochen lang auf ihren Hund aufgepasst. Am Anfang war ich unsicher, weil ich noch nie einen Hund hatte. Nach einer Woche habe ich gemerkt, wie sehr sich mein Tag verändert hat: Ich bin jeden Morgen um sechs aufgestanden und habe im Park Leute kennengelernt, mit denen ich heute noch rede. Trotzdem war ich am Ende froh, dass ich abends wieder frei war.",
                },
                {
                  title:
                    "Folie 3 — Berichten Sie über die Situation in Ihrem Heimatland und geben Sie Beispiele.",
                  hint:
                    "Cómo es en tu país: normas, costumbres, diferencias con DACH. Da al menos un ejemplo concreto. · Tema 2: qué se compra por internet en tu país, qué tiendas de barrio siguen vivas y cómo funcionan los envíos.",
                  model:
                    "In meinem Heimatland leben sehr viele Familien mit Hund, auch in kleinen Wohnungen. In den Städten gibt es allerdings wenige Hundewiesen, und in den Bus darf man ein größeres Tier meistens nicht mitnehmen. Auf dem Land ist es ganz anders: Dort leben die Hunde oft im Hof und laufen frei herum. In den letzten Jahren sind außerdem die Tierheime voll geworden, weil viele Leute sich in einer schwierigen Zeit ein Tier geholt und es später wieder abgegeben haben.",
                },
                {
                  title:
                    "Folie 4 — Nennen Sie Vor- und Nachteile und sagen Sie dazu Ihre Meinung. Geben Sie Beispiele.",
                  hint:
                    "Aquí vive la nota: einerseits… andererseits, ein Vorteil ist, dass… / ein Nachteil ist, dass…, y después meiner Meinung nach + una razón + un ejemplo. · Tema 2: precio y comodidad frente a los comercios del barrio, los envíos y las devoluciones.",
                  model:
                    "Einerseits hat ein Haustier klare Vorteile: Man bewegt sich jeden Tag, man ist weniger allein, und gerade ältere Menschen bekommen eine feste Struktur im Tag. Andererseits gibt es auch Nachteile. Eine Wohnung im dritten Stock ist kein guter Ort für einen großen Hund, der acht Stunden allein bleibt, und ein Tier kostet Geld und Zeit. Meiner Meinung nach kommt es nicht auf die Stadt an, sondern auf die Lebensweise: Wer jeden Tag zwei Stunden Zeit hat, kann auch in der Stadt ein Tier glücklich machen. Wer das nicht hat, sollte lieber im Tierheim helfen.",
                },
                {
                  title:
                    "Folie 5 — Beenden Sie Ihre Präsentation und bedanken Sie sich bei den Zuhörerinnen und Zuhörern.",
                  hint:
                    "Cierre corto: resumen en una frase + agradecimiento. Es la diapositiva que más gente olvida por quedarse sin tiempo. · Tema 2: «Zusammenfassend würde ich sagen: Beides hat seinen Platz — aber wer sein Viertel behalten will, muss dort auch einkaufen. Vielen Dank für Ihre Aufmerksamkeit.»",
                  model:
                    "Zusammenfassend würde ich sagen: Ein Haustier in der Stadt ist möglich, aber nur mit genug Zeit und Platz. Deshalb finde ich es wichtig, vorher ehrlich zu überlegen, ob der eigene Alltag dazu passt. Vielen Dank für Ihre Aufmerksamkeit — wenn Sie Fragen haben, beantworte ich sie gern.",
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
              id: "b1a-sp3",
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
                "c) Antworten: Beantworten Sie die Frage der zweiten Prüferin: „Was würden Sie einer Familie raten, die in einer kleinen Stadtwohnung ein Tier möchte?“",
              promptEs:
                "a) Da tu valoración de la presentación del compañero. b) Hazle una pregunta sobre el contenido. c) Responde a la pregunta de la segunda examinadora: «¿qué le aconsejarías a una familia que quiere un animal en un piso pequeño de ciudad?».",
              model:
                "Deine Präsentation hat mir sehr gut gefallen, besonders der Teil über die Tierheime — davon wusste ich vorher nichts. Du hast die Vor- und Nachteile auch sehr klar getrennt. Eine Frage hätte ich noch: Würdest du dir selbst später einmal ein Tier holen, wenn du mehr Zeit hättest? — Zur Frage der Prüferin: Ich würde einer Familie in einer kleinen Wohnung raten, zuerst ein paar Wochen für Nachbarn oder für ein Tierheim auf ein Tier aufzupassen. So merkt man, ob der Alltag wirklich passt, ohne dass ein Tier darunter leidet. Und wenn es dann klappt, würde ich ein ruhigeres, älteres Tier aus dem Tierheim nehmen statt eines jungen Hundes.",
              rubric: RUBRIC_SPRECHEN_T3,
            },
          ],
        },
      ],
    },
  ],
};
