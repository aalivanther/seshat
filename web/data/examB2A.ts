import type { ExamSet, RubricCriterion } from "@/lib/examTypes";

// ─────────────────────────────────────────────────────────────────────────────
// Modellsatz B2 — Goethe-Zertifikat B2, formato 2019 (NO el handbook 2007).
// PLAN-DE-B2.md §1.1. Temas DISTINTOS del Modellsatz oficial (minimalismo,
// Reisefieber, Doktor Google, nómadas, Wohnformen) y del B1 (Ehrenamt,
// Secondhand, Hunde, Schülerjobs): Pflege von Angehörigen, Recht auf
// Reparatur, Vier-Tage-Woche, Überwachung, Lichtverschmutzung.
// Plurizéntrico: Lesen T3 prensa austriaca; Lesen T5 Studienordnung suiza.
//
//   LESEN   65′ · 5 Teile · 30  → 9 Zuordnung foro (persona PUEDE repetir,
//                                  sin «0») · insert 6/8 · 6 MC artículo ·
//                                  6 match titulares · 3 match Studienordnung
//   HÖREN   ~40′ · 4 Teile · 30 → 1-2-1-2 invertido respecto al B1: T1 UNA
//                                  vez 5×(RF+MC) · T2 DOS entrevista 6 MC ·
//                                  T3 UNA tertulia wersagt 6 · T4 DOS Vortrag 8
//   SCHREIBEN 75′ · 2 tareas · 100 pts → Forumsbeitrag 60 + Nachricht 40,
//                                  Erfüllung = E ⇒ 0, modular
//   SPRECHEN  ~15′ · Vortrag + Diskussion + Aussprache 16 (repartida)
// Modular: 100 pts/módulo, corte 60, sin compensación. 30 ítems × 3,333 = 100.
// ─────────────────────────────────────────────────────────────────────────────

const RUBRIC_SCHREIBEN_60: RubricCriterion[] = [
  {
    id: "erfuellung",
    label: "Erfüllung — cumplimiento de la tarea",
    help: "¿Introducción y cierre explícitos, argumentar, proponer, ventajas e inconvenientes, ~150 palabras? Menos del 50 % de las palabras o tema equivocado = E, y E aquí son 0 puntos en toda la tarea.",
    bands: [14, 10.5, 7, 3.5, 0],
    fatalE: true,
  },
  {
    id: "kohaerenz",
    label: "Kohärenz — estructura y conexión",
    help: "Apertura, desarrollo y cierre reconocibles. Conectores de B2 de verdad (dennoch, infolgedessen, einerseits… andererseits), no solo und/aber.",
    bands: [14, 10.5, 7, 3.5, 0],
  },
  {
    id: "wortschatz",
    label: "Wortschatz — vocabulario",
    help: "Rango y precisión: ¿variedad, o las mismas cinco palabras? ¿Registro de foro argumentativo, no de chat?",
    bands: [16, 12, 8, 4, 0],
  },
  {
    id: "strukturen",
    label: "Strukturen — morfología, sintaxis y ortografía",
    help: "Subordinadas encadenadas, concesivas, pasiva o man donde toque, Konjunktiv I si citas. Cuenta si los errores estorban, no cuántos hay.",
    bands: [16, 12, 8, 4, 0],
  },
];

const RUBRIC_SCHREIBEN_40: RubricCriterion[] = [
  {
    id: "erfuellung",
    label: "Erfüllung — cumplimiento de la tarea",
    help: "¿Anrede y Gruß, los puntos de contenido en orden, ~100 palabras, registro Sie al superior? E = 0 en toda la tarea.",
    bands: [10, 7.5, 5, 2.5, 0],
    fatalE: true,
  },
  {
    id: "kohaerenz",
    label: "Kohärenz — estructura y conexión",
    help: "Saludo, motivo, petición y cierre. Que se lea como un escrito profesional, no como una lista.",
    bands: [10, 7.5, 5, 2.5, 0],
  },
  {
    id: "wortschatz",
    label: "Wortschatz — vocabulario",
    help: "Fórmulas de cortesía al superior (leider, Könnten Sie…, Ich würde vorschlagen) y precisión al nombrar el motivo.",
    bands: [10, 7.5, 5, 2.5, 0],
  },
  {
    id: "strukturen",
    label: "Strukturen — gramática",
    help: "Konjunktiv II de cortesía, Sie con mayúscula, subordinada en su sitio.",
    bands: [10, 7.5, 5, 2.5, 0],
  },
];

const AUSSPRACHE = (points: number): RubricCriterion => ({
  id: "aussprache",
  label: "Aussprache — melodía, acento y sonidos",
  help: "Se puntúa sobre todo lo que hablas, no en una tarea aparte. Satzmelodie, Wortakzent, ü/ö, ich-Laut frente a ach-Laut. Una E aquí no anula la tarea.",
  bands: [points, points * 0.75, points * 0.5, points * 0.25, 0],
});

/** Vortrag: 44 oficiales + 8 de Aussprache = 52. */
const RUBRIC_SPRECHEN_T1: RubricCriterion[] = [
  {
    id: "erfuellung",
    label: "Erfüllung — el Vortrag",
    help: "Introducción, cuerpo con postura y ejemplos, cierre. A = estructura propia reconocible y contenido suficiente en ~4 minutos.",
    bands: [8, 6, 4, 2, 0],
    fatalE: true,
  },
  {
    id: "kohaerenz",
    label: "Kohärenz — hilo del monólogo",
    help: "¿Se oye el paso (Zuerst… / Darüber hinaus… / Zusammenfassend…)? ¿Aguantaste los cuatro minutos sin quedarte en blanco?",
    bands: [8, 6, 4, 2, 0],
  },
  {
    id: "wortschatz",
    label: "Wortschatz — vocabulario",
    help: "Léxico del tema y de la argumentación: meines Erachtens, ein oft übersehener Punkt, das spricht dafür/dagegen.",
    bands: [8, 6, 4, 2, 0],
  },
  {
    id: "strukturen",
    label: "Strukturen — gramática",
    help: "Frases largas que se sostienen: concesivas, relativas, pasiva. Hablado se perdona más, pero el verbo tiene que caer donde debe.",
    bands: [8, 6, 4, 2, 0],
  },
  {
    id: "fragen",
    label: "Fragen und Antworten",
    help: "Después del Vortrag preguntan el compañero y un examinador. ¿Respondes con contenido, o con una frase hecha?",
    bands: [12, 9, 6, 3, 0],
  },
  AUSSPRACHE(8),
];

/** Diskussion: 40 oficiales + 8 de Aussprache = 48. */
const RUBRIC_SPRECHEN_T2: RubricCriterion[] = [
  {
    id: "erfuellung",
    label: "Erfüllung — defender la postura",
    help: "Te asignan una posición. A = la defiendes con razones, concedes sin rendirte y llegas a un intercambio de verdad, no a dos monólogos.",
    bands: [10, 7.5, 5, 2.5, 0],
    fatalE: true,
  },
  {
    id: "interaktion",
    label: "Interaktion — el turno",
    help: "Reaccionar (Da haben Sie einen Punkt, allerdings…), interrumpir con cortesía, devolver la pregunta. Soltar tu texto memorizado hunde este criterio.",
    bands: [10, 7.5, 5, 2.5, 0],
  },
  {
    id: "wortschatz",
    label: "Wortschatz — vocabulario",
    help: "Conceder, rebatir y matizar: grundsätzlich ja, aber… / das überzeugt mich nicht ganz / unter der Voraussetzung, dass…",
    bands: [10, 7.5, 5, 2.5, 0],
  },
  {
    id: "strukturen",
    label: "Strukturen — gramática",
    help: "Konjunktiv II, concesivas, hipotéticas. Que un error puntual no te frene.",
    bands: [10, 7.5, 5, 2.5, 0],
  },
  AUSSPRACHE(8),
];

/** Forum T1: las cuatro voces van en los ads a–d del lesen-match (reuso, sin «0»). */
const FORUM_ADS: { key: string; text: string }[] = [
  {
    key: "a",
    text:
      "Timo Bruns, 41, Buchhalter: Ich pflege meinen Vater seit zwei Jahren selbst und habe dafür die Stunden in der Firma reduziert. Für mich ist das keine Heldentat, sondern eine Pflicht, die man nicht an eine Agentur delegiert. Die Abende sind hart, ja. Aber ein Pflegedienst, der dreimal die Woche für zwanzig Minuten kommt, ersetzt kein Gespräch. Wer das an Profis abgibt, spart Zeit und verliert etwas, das sich nicht in einem Stundensatz ausdrücken lässt.",
  },
  {
    key: "b",
    text:
      "Aylin Demir, 38, Technikerin: Ich arbeite Vollzeit und habe zwei Kinder. Einen Pflegedienst habe ich nach drei Monaten Zusammenbruch geholt, und das war die richtige Entscheidung. Abends schaue ich trotzdem vorbei, oft erst nach neun. Der Dienst kostet uns rund 600 Euro im Monat — das ist viel, aber weniger als mein Gehalt, wenn ich kündigen würde. Wer Pflege als reine Familien Sache verkauft, redet an den Leuten vorbei, die morgens um fünf aufstehen.",
  },
  {
    key: "c",
    text:
      "Selma Duric, 52, Sozialarbeiterin: Beides, Familie und Dienst, füllt ein Loch, das der Staat gelassen hat. In meinem Bezirk warten Angehörige Monate auf einen Platz. Höhere Beiträge fände ich zumutbar, wenn dafür die Dienste aufgestockt würden. Pflege ist keine Privatsache, auch wenn sie hinter der Wohnungstür stattfindet. Solange die Politik das so behandelt, werden Familien weiter ausgebrannt.",
  },
  {
    key: "d",
    text:
      "Markus Feichtner, 47, Architekt: Meine Mutter lebt seit einem Jahr in einem Wohnstift. Ich habe lange damit gehadert. Das Personal dort ist ausgebildet, ich bin es nicht, und nach dem dritten Sturz war die Entscheidung klar. Ich fahre jedes Wochenende hin. Schuldgefühle habe ich trotzdem — aber ein schlechtes Gewissen ist kein Pflegekonzept.",
  },
];

export const examB2A: ExamSet = {
  id: "b2-sim-a",
  level: "b2",
  title: "Modellsatz B2",
  description:
    "Simulacro fiel del Goethe-Zertifikat B2 (formato 2019): Lesen 65′, Hören ~40′ con escuchas 1-2-1-2, Schreiben 75′ y Sprechen (Vortrag + Diskussion). Examen MODULAR — cada módulo vale 100 puntos y se aprueba por separado con 60, sin compensación. Temas: cuidado de familiares, derecho a reparar, semana de cuatro días, videovigilancia.",
  scoring: {
    passPct: 60,
    modular: true,
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
    // ══════════════════════════ LESEN · 65 min · 30 ══════════════════════
    {
      skill: "lesen",
      label: "Lesen",
      minutes: 65,
      teile: [
        {
          title: "Lesen · Teil 1",
          instruction:
            "Lesen Sie die vier Beiträge im Forum „Pflege zu Hause — Familie oder Profis?“ (a–d) und die Aussagen 1 bis 9. Welche Person passt zu welcher Aussage? Ordnen Sie zu. Eine Person kann mehrmals gewählt werden. Eine Aussage kann auf niemanden zutreffen (0).",
          instructionEs:
            "Cuatro voces de un foro sobre el cuidado de familiares. Nueve afirmaciones: asigna cada una a la persona (a–d) que encaja. Una persona PUEDE repetirse. Una afirmación puede no encajar con nadie (0). Tienes unos 18 minutos.",
          items: [
            {
              kind: "lesen-match",
              id: "b2a-l1",
              allowReuse: true,
              requireNone: false,
              ads: FORUM_ADS,
              situations: [
                {
                  id: "b2a-l1-1",
                  situation: "Wer hat die eigene Arbeitszeit verkürzt, um selbst zu pflegen?",
                  situationEs: "¿Quién ha reducido su jornada para cuidar en persona?",
                  answer: "a",
                },
                {
                  id: "b2a-l1-2",
                  situation: "Wer nutzt einen professionellen Pflegedienst?",
                  situationEs: "¿Quién usa un servicio profesional de cuidados?",
                  answer: "b",
                },
                {
                  id: "b2a-l1-3",
                  situation: "Wer fordert, dass der Staat die Dienste ausbaut?",
                  situationEs: "¿Quién pide que el Estado refuerce los servicios?",
                  answer: "c",
                },
                {
                  id: "b2a-l1-4",
                  situation: "Wer hat eine Angehörige in ein Wohnstift gegeben?",
                  situationEs: "¿Quién ha llevado a un familiar a una residencia?",
                  answer: "d",
                },
                {
                  id: "b2a-l1-5",
                  situation: "Wer schaut oft erst spätabends noch vorbei?",
                  situationEs: "¿Quién pasa a menudo a ver al familiar ya de noche?",
                  answer: "b",
                },
                {
                  id: "b2a-l1-6",
                  situation: "Wer hält Schuldgefühle für kein brauchbares Konzept?",
                  situationEs: "¿Quién considera que la culpa no es un plan de cuidados?",
                  answer: "d",
                },
                {
                  id: "b2a-l1-7",
                  situation: "Wer sieht die Pflege vor allem als familiäre Pflicht, nicht als Job?",
                  situationEs: "¿Quién ve el cuidado sobre todo como deber familiar, no como un trabajo?",
                  answer: "a",
                },
                {
                  id: "b2a-l1-8",
                  situation: "Wer nennt einen konkreten monatlichen Betrag für den Dienst?",
                  situationEs: "¿Quién da una cifra mensual concreta del servicio?",
                  answer: "b",
                },
                {
                  id: "b2a-l1-9",
                  situation: "Wer hat die Pflege an eine Agentur im Ausland ausgelagert?",
                  situationEs: "¿Quién ha encargado el cuidado a una agencia en el extranjero?",
                  answer: "0",
                },
              ],
            },
          ],
        },
        {
          title: "Lesen · Teil 2",
          instruction:
            "Lesen Sie den Text. Sechs Sätze fehlen. Wählen Sie für jede Lücke den passenden Satz. Zwei Sätze bleiben übrig.",
          instructionEs:
            "Artículo con seis huecos y un banco de ocho frases: dos sobran. La frase correcta encaja por cohesión — un pronombre, un conector, una idea que el hueco siguiente retoma. No por «suena parecido».",
          items: [
            {
              kind: "lesen-insert",
              id: "b2a-l2",
              title: "Kaputt ist das neue Wegwerfen",
              text:
                "Ein Toaster, der nach zwei Jahren den Geist aufgibt, landet bei den meisten Menschen in der Tonne. ___(1)___ Genau dagegen haben sich in den letzten Jahren Repair-Cafés gestellt: einmal im Monat öffnet ein Verein die Türen, und wer Zeit hat, kommt mit dem kaputten Gerät.\n\n" +
                "Die Arbeit der Freiwilligen ist umsonst, Ersatzteile bezahlt, wer sie braucht. ___(2)___ Angemeldet werden muss man nicht; wer kommt, kommt.\n\n" +
                "Kritiker halten das für eine nette Geste ohne Wirkung. ___(3)___ Eine Untersuchung der TU Dresden kommt zu einem anderen Schluss: Geräte, die einmal repariert wurden, halten im Schnitt drei Jahre länger.\n\n" +
                "Der Gesetzgeber hat das Problem inzwischen erkannt. ___(4)___ Hersteller sollen Ersatzteile sieben Jahre lang anbieten und Geräte so bauen, dass sie sich öffnen lassen.\n\n" +
                "Ob das Gesetz so kommt, ist offen. ___(5)___ In Frankreich gilt eine ähnliche Regel bereits, und der Elektroschrott ist dort messbar zurückgegangen.\n\n" +
                "Für die Cafés selbst wäre das Gesetz eine Entlastung. ___(6)___ Bis dahin bleiben sie das, was sie sind: ein Abend in der Woche, an dem ein Toaster eine zweite Chance bekommt.",
              sentences: [
                {
                  key: "a",
                  text: "Oft ist die Reparatur teurer als ein Neukauf, und genau das soll sich ändern.",
                },
                {
                  key: "b",
                  text: "Ohne diese Regel könnten viele Cafés die Kosten für Material nicht tragen.",
                },
                {
                  key: "c",
                  text: "Sie übersehen, dass jedes Jahr Millionen Tonnen Elektroschrott entstehen.",
                },
                {
                  key: "d",
                  text: "Ein Entwurf zum Recht auf Reparatur liegt seit dem Frühjahr auf dem Tisch.",
                },
                {
                  key: "e",
                  text: "Das gilt vor allem für Smartphones, deren Akkus fest verklebt sind.",
                },
                {
                  key: "f",
                  text: "Industrieverbände warnen vor höheren Preisen und längeren Lieferzeiten.",
                },
                {
                  key: "g",
                  text: "Dann müssten sie nicht mehr um jedes Ersatzteil kämpfen, das der Hersteller nicht liefern will.",
                },
                {
                  key: "h",
                  text: "Viele Geräte werden heute absichtlich so gebaut, dass sie sich nicht öffnen lassen.",
                },
              ],
              gaps: [
                { id: "b2a-l2-1", answer: "a" },
                { id: "b2a-l2-2", answer: "b" },
                { id: "b2a-l2-3", answer: "c" },
                { id: "b2a-l2-4", answer: "d" },
                { id: "b2a-l2-5", answer: "f" },
                { id: "b2a-l2-6", answer: "g" },
              ],
            },
          ],
        },
        {
          title: "Lesen · Teil 3",
          instruction:
            "Lesen Sie den Text und die Aufgaben 16 bis 21. Wählen Sie die richtige Lösung a, b oder c.",
          instructionEs:
            "Artículo de prensa austriaca sobre la semana de cuatro días. Seis preguntas. La opción que copia una palabra del texto suele ser el distractor.",
          items: [
            {
              kind: "lesen-mc",
              id: "b2a-l3-16",
              title: "Vier Tage, derselbe Lohn (aus einer Wiener Tageszeitung)",
              text:
                "Seit Jänner* erproben zwölf Wiener Betriebe die Vier-Tage-Woche: 32 Stunden, voller Lohn, der Freitag bleibt frei. Die Arbeiterkammer hat die Pilotprojekte begleitet. Das erste Ergebnis überrascht selbst die Befürworter: Die Produktivität ist nicht gesunken. In acht der zwölf Häuser ist sie leicht gestiegen, in den anderen gleich geblieben.\n\n" +
                "Die zwölf Häuser sind keine Zufallsauswahl. Es sind Pflegedienste, ein Spital*, zwei Handelsketten, eine Bäckereikette, ein Callcenter und mehrere Bürobetriebe mit Kernzeit. Wer nur Schreibtische misst, misst das Falsche: gerade dort, wo bisher samstags und sonntags durchgeschichtet wurde, ändert sich der Alltag messbar. Die Arbeiterkammer hat Krankenstände, kurzfristige Absagen und die Zahl der Überstunden neben der Produktivität gelegt — nicht statt ihrer.\n\n" +
                "„Die Leute sind ausgeschlafener, und die Krankenstände gehen zurück“, sagt Projektleiterin Ingrid Haslauer. Besonders deutlich sei der Effekt in der Pflege und an der Kassa* im Handel. Ein Spital im 10. Bezirk berichtet, dass die Zahl der kurzfristigen Absagen um ein Drittel gefallen ist. Eine Stationsleitung dort beschreibt den Freitag nicht als verlängertes Wochenende, sondern als den Tag, an dem Übergaben schriftlich liegen, statt mündlich in der Tür.\n\n" +
                "Nicht alle sind überzeugt. Der Wirtschaftsbund warnt vor höheren Kosten und fordert, der freie Freitag müsse in Branchen mit Publikumsverkehr eine Ausnahme bleiben. Haslauer hält dagegen: Gerade der Handel habe in der Pilotphase keine Umsätze verloren. Die Kundschaft sei auf vier längere Tage ausgewichen, nicht zum Mitbewerber. Längere Öffnungszeiten von Dienstag bis Freitag hätten den Samstag nicht gerettet, weil der Samstag schon vorher der teuerste Tag war — und teuer bleibt er, nur mit ausgeschlafenerem Personal.\n\n" +
                "Wer die Modelle von innen gesehen hat, erzählt weniger von Ideologie als von Dienstplänen. In der Bäckerei beginnt die Frühschicht um vier; der freie Freitag verschiebt die Last auf den Donnerstag, nicht ins Nichts. Im Büro fällt der Freitag leichter, weil Mails warten können. Genau diese Ungleichheit nutzt der Wirtschaftsbund als Argument gegen eine Pflicht. Haslauer kehrt sie um: Wenn der Effekt in der Pflege und an der Kassa sichtbar ist, sei das kein Grund, das Modell auf Schreibtische zu beschränken, sondern eines, es dort zu lassen, wo es wirkt.\n\n" +
                "Offen bleibt, was nach dem Sommer passiert. Die Betriebe dürfen das Modell behalten, müssen es aber nicht. Haslauer rät, die Entscheidung nicht der Chefetage allein zu überlassen: „Wer die Vier-Tage-Woche will, sollte das heuer* noch in der Belegschaft zur Abstimmung bringen. Nach der Matura* der Azubis im Juni wird der Alltag wieder dichter — dann ist das Fenster zu.“ Eine Abstimmung ersetze kein Gesetz, sagt sie. Sie ersetze die Ausrede, niemand habe gefragt.\n\n" +
                "Ob Wien daraus eine Regel macht, ist eine Frage für den Herbst. Die Zahlen der Arbeiterkammer liegen auf dem Tisch: Produktivität nirgends gesunken, in den meisten Häusern leicht gestiegen, Absagen im Spital um ein Drittel zurück, Umsätze im Handel gehalten. Wer daraus eine Pflicht für ganz Österreich macht, überzieht. Wer sie als Betriebsunfall abtut, hat die Tabelle nicht gelesen.",
              footnote:
                "* Jänner = österreichischer Standard für „Januar“ · Kassa = „Kasse“ · Spital = „Krankenhaus“ · heuer = „in diesem Jahr“ · Matura = „Abitur“.",
              question: "Was hat die Arbeiterkammer in den Pilotbetrieben gemessen?",
              questionEs: "¿Qué ha medido la Cámara de Trabajo en las empresas piloto?",
              options: [
                "Die Produktivität ist in keinem Betrieb gestiegen.",
                "Die Produktivität ist nirgends gesunken, in den meisten sogar leicht gestiegen.",
                "Nur der Handel hat Produktivität verloren.",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "b2a-l3-17",
              question: "Wo zeigt sich der Effekt laut Haslauer besonders deutlich?",
              questionEs: "¿Dónde se nota especialmente el efecto, según Haslauer?",
              options: [
                "in Büros mit Kernarbeitszeit",
                "in der Pflege und an der Kasse im Handel",
                "nur bei den Azubis vor der Matura",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "b2a-l3-18",
              question: "Was berichtet das Spital im 10. Bezirk?",
              questionEs: "¿Qué cuenta el hospital del distrito 10?",
              options: [
                "Kurzfristige Absagen sind um ein Drittel zurückgegangen.",
                "Die Umsätze sind um ein Drittel gestiegen.",
                "Die Krankenstände haben sich verdoppelt.",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "b2a-l3-19",
              question: "Welche Position vertritt der Wirtschaftsbund?",
              questionEs: "¿Qué postura defiende la patronal?",
              options: [
                "Die Vier-Tage-Woche sollte sofort Pflicht werden.",
                "Der freie Freitag sollte in Branchen mit Publikum eine Ausnahme bleiben.",
                "Der Handel hat in der Pilotphase Umsätze verloren.",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "b2a-l3-20",
              question: "Was sagt Haslauer über den Handel in der Pilotphase?",
              questionEs: "¿Qué dice Haslauer del comercio en la fase piloto?",
              options: [
                "Die Kundschaft ist zum Mitbewerber gewechselt.",
                "Die Umsätze sind nicht verloren gegangen.",
                "Samstags wurde mehr verkauft als an den anderen Tagen.",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "b2a-l3-21",
              question: "Was empfiehlt Haslauer den Belegschaften?",
              questionEs: "¿Qué recomienda Haslauer a las plantillas?",
              options: [
                "die Entscheidung der Chefetage zu überlassen",
                "noch in diesem Jahr abzustimmen, bevor der Alltag nach den Prüfungen dichter wird",
                "bis nach dem Sommer zu warten",
              ],
              answer: 1,
            },
          ],
        },
        {
          title: "Lesen · Teil 4",
          instruction:
            "Lesen Sie die Überschriften 22 bis 27 und die Meinungen a bis h. Welche Meinung passt zu welcher Überschrift? Zwei Meinungen bleiben übrig.",
          instructionEs:
            "Seis titulares, ocho opiniones sobre videovigilancia en el espacio público. Empareja. Cada opinión se usa una vez; sobran dos. La postura hay que inferirla: nadie escribe «estoy a favor» en el titular.",
          items: [
            {
              kind: "lesen-match",
              id: "b2a-l4",
              ads: [
                {
                  key: "a",
                  text:
                    "Lars Holm, 34, Fahrradkurier: In meinem Viertel gibt es seit einem Jahr Kameras an jeder Kreuzung, und die Unfälle sind nicht weniger geworden. Was weniger geworden ist: die Leute, die abends noch auf der Bank sitzen. Überwachung macht den Platz leer, nicht sicher.",
                },
                {
                  key: "b",
                  text:
                    "Roberto Silva, 61, kiosk: Dreimal bin ich in fünf Jahren überfallen worden, immer nach Mitternacht. Seit die Kamera über der Tür hängt, ist es ruhig. Wer mir erzählt, das sei übertrieben, hat nie um drei Uhr früh allein im Laden gestanden.",
                },
                {
                  key: "c",
                  text:
                    "Dr. Helene Auer, 45, Juristin: Mich stört nicht die Kamera an sich, sondern dass niemand sagt, wie lange die Bilder gespeichert werden und wer sie sieht. Eine Anlage ohne klare Löschfrist ist für mich keine Sicherheit, sondern ein Archiv ohne Aufsicht.",
                },
                {
                  key: "d",
                  text:
                    "Pia Kellermann, 29, Studentin: Ich fände Kameras an Bahnhöfen und in Parks in Ordnung, in Wohnstraßen nicht. Es gibt Orte, an denen man anonym bleiben können muss — vor der eigenen Haustür zum Beispiel.",
                },
                {
                  key: "e",
                  text:
                    "Kai Bergmann, 50, Koch: Bei uns in der Küche hängt eine Kamera „zum Schutz der Ware“. In Wahrheit zählt sie, wie lange wir Pause machen. Wer Sicherheit sagt und Kontrolle meint, sollte das wenigstens offen tun.",
                },
                {
                  key: "f",
                  text:
                    "Ingrid Haslauer, 57, Projektleiterin: Die Zahlen aus Städten mit flächendeckender Videoüberwachung sind eindeutig: Die Kriminalität wandert um die Ecke, sie verschwindet nicht. Teure Kameras sind eine Scheinlösung, solange abends keine Menschen mehr auf der Straße sind.",
                },
                {
                  key: "g",
                  text:
                    "Omar Haddad, 22, Auszubildender: Ich habe nichts zu verbergen. Wenn eine Kamera einen Unfall klärt oder einen Übergriff stoppt, soll sie laufen. Die Debatte kommt mir vor wie ein Luxus von Leuten, die nachts nie den Bus nehmen.",
                },
                {
                  key: "h",
                  text:
                    "Greta Palme, 68, Rentnerin: Nach dem dritten Einbruch in unserem Haus wollte die Hausverwaltung Kameras im Treppenhaus. Ich habe dagegen gestimmt. Ein Haus, in dem man sich nicht mehr begrüßt, weil alles aufgezeichnet wird, ist für mich kein Zuhause mehr.",
                },
              ],
              situations: [
                {
                  id: "b2a-l4-22",
                  situation: "Kameras leeren den Platz, statt ihn zu schützen.",
                  situationEs: "Las cámaras vacían el espacio en vez de protegerlo.",
                  answer: "a",
                },
                {
                  id: "b2a-l4-23",
                  situation: "Wer nachts allein im Laden steht, redet anders über Kameras.",
                  situationEs: "Quien está solo de noche en el negocio habla distinto de las cámaras.",
                  answer: "b",
                },
                {
                  id: "b2a-l4-24",
                  situation: "Ohne Löschfrist ist Überwachung ein Archiv ohne Aufsicht.",
                  situationEs: "Sin plazo de borrado, la vigilancia es un archivo sin control.",
                  answer: "c",
                },
                {
                  id: "b2a-l4-25",
                  situation: "An manchen Orten ja — vor der eigenen Haustür nein.",
                  situationEs: "En algunos sitios sí; delante de casa, no.",
                  answer: "d",
                },
                {
                  id: "b2a-l4-26",
                  situation: "Die Kriminalität zieht um, sie verschwindet nicht.",
                  situationEs: "La delincuencia se muda de esquina, no desaparece.",
                  answer: "f",
                },
                {
                  id: "b2a-l4-27",
                  situation: "Ein Treppenhaus unter Kameras ist kein Zuhause mehr.",
                  situationEs: "Un rellano bajo cámaras ya no es un hogar.",
                  answer: "h",
                },
              ],
            },
          ],
        },
        {
          title: "Lesen · Teil 5",
          instruction:
            "Lesen Sie die drei Abschnitte der Studienordnung und die Überschriften a bis g. Welche Überschrift passt zu welchem Abschnitt? Vier Überschriften bleiben übrig.",
          instructionEs:
            "Un reglamento de estudios suizo continuo y siete títulos de índice: tres encajan, cuatro sobran. La respuesta está en la excepción (nur, nicht, ausser), no en la regla general.\n\nHelvetismos (como en el examen real): Velo = bicicleta · parkieren = aparcar · Kehricht = basura · innert = dentro de. En suizo no hay ß: Aussenflächen, Strasse, grosse, Ermässigung.",
          items: [
            {
              kind: "lesen-match",
              id: "b2a-l5",
              text:
                "Studienordnung der Hochschule für Angewandte Wissenschaften (Auszug, gültig ab Herbstsemester)\n\n§1 Einschreibung. Die Einschreibung erfolgt online, spätestens vier Wochen vor Semesterbeginn. Wer den Termin versäumt, rückt auf eine Warteliste; ein mündlicher Anruf beim Sekretariat ersetzt die Frist nicht. Der Ausweis der Hochschule wird erst nach Eingang der ersten Rate ausgestellt, nicht nach der blossen Anmeldung. Eine nachträgliche Einschreibung ist nur mit schriftlicher Begründung an das Rektorat möglich, und nur innert zehn Tagen nach Semesterbeginn. Wer ohne Ausweis in eine Lehrveranstaltung geht, gilt als nicht eingeschrieben, auch wenn der Name auf einer Anwesenheitsliste steht. Gaststudierende aus Partnerhochschulen füllen dasselbe Formular aus, zahlen aber keine erste Rate: ihr Ausweis gilt nach Eingang der Bestätigung der Heimatuniversität. Eine Doppelimmatrikulation an einer zweiten Schweizer Hochschule ist unzulässig, ausser das Rektorat hat sie für ein gemeinsames Programm schriftlich genehmigt. Änderungen der Adresse oder der Bankverbindung sind innert vierzehn Tagen zu melden; sonst gelten Zustellungen an die letzte bekannte Anschrift als zugegangen. Die Einschreibung für ein Frühjahrssemester schliesst das vorangehende Herbstsemester nicht automatisch ab: wer das Studium unterbricht, muss sich schriftlich abmelden, sonst bleibt die Gebührenpflicht bestehen.\n\n§2 Prüfungen. Für jede Prüfung ist eine Anmeldung bis zehn Tage vorher nötig, elektronisch, nicht per E-Mail an die Dozentin. Eine nicht angetretene Prüfung ohne Attest gilt als nicht bestanden; das Attest muss innert drei Arbeitstagen nach dem Prüfungstermin vorliegen. Jede Prüfung darf einmal wiederholt werden; ein zweiter Versuch braucht die Zustimmung der Prüfungskommission und ist nur zulässig, wenn der erste Versuch mindestens angetreten wurde. Die Einsicht in die Arbeit ist innert vierzehn Tagen nach der Notenbekanntgabe zu beantragen, nicht innert vierzehn Tagen nach der Prüfung selbst. Mündliche Nachprüfungen finden nur statt, wenn die schriftliche Note zwischen zwei ganzen Noten liegt und die Kandidatin oder der Kandidat die Einsicht genommen hat. Hilfsmittel, die nicht auf dem Deckblatt stehen, führen zum Abbruch der Prüfung; das Mobiltelefon gilt auch dann als Hilfsmittel, wenn es ausgeschaltet in der Tasche liegt. Wer die Wiederholung besteht, erhält die neue Note; die erste bleibt in der Akte, zählt aber nicht für den Schnitt. Eine Prüfung, die wegen Krankheit verschoben wurde, muss im nächsten regulären Termin geschrieben werden: ein dritter Termin wird nicht angesetzt, ausser die Kommission stellt eine längere Arbeitsunfähigkeit fest.\n\n§3 Bibliothek und Aussenflächen. Die Bibliothek ist von Montag bis Samstag 8 bis 21 Uhr geöffnet; an Sonn- und Feiertagen bleibt sie geschlossen. Velos sind im Innenhof zu parkieren, nicht an der Rampe und nicht in den Lesesälen. Velos, die länger als vier Wochen stehen, werden ohne Ankündigung entfernt und innert dreissig Tagen entsorgt, wenn niemand sie abholt. Der Kehricht in den Gruppenräumen ist von den Nutzenden selbst zu entsorgen; die Reinigung räumt Tische, nicht Abfallsäcke. Gruppenräume können für höchstens drei Stunden reserviert werden; eine Verlängerung ist nur zulässig, wenn niemand nachfolgt. Essen ist in den Lesesälen untersagt, Wasser in geschlossenen Flaschen nicht. Wer wiederholt Speisereste hinterlässt, verliert die Reservierungsberechtigung für den Rest des Semesters. Die Aussenflächen vor dem Ostflügel dürfen für Lehrveranstaltungen genutzt werden, nicht für private Feste; Grillen ist auf dem gesamten Campusgelände verboten. Wer nach 21 Uhr noch im Gebäude ist, muss sich an der Pforte abmelden. Die Notausgänge sind keine Abkürzung zum Velo-Keller.",
              ads: [
                {
                  key: "a",
                  text: "Anmeldung und Einschreibung",
                },
                {
                  key: "b",
                  text: "Prüfungen und Wiederholung",
                },
                {
                  key: "c",
                  text: "Nutzung von Bibliothek und Aussenflächen",
                },
                {
                  key: "d",
                  text: "Studiengebühren und Ermässigung",
                },
                {
                  key: "e",
                  text: "Auslandssemester und Partnerschaften",
                },
                {
                  key: "f",
                  text: "Mentoring und Studienberatung",
                },
                {
                  key: "g",
                  text: "Wohnheim und Verpflegung",
                },
              ],
              situations: [
                {
                  id: "b2a-l5-28",
                  situation: "Welcher Titel passt zum Abschnitt über Einschreibung und Ausweis?",
                  situationEs: "¿Qué título encaja con el apartado de matrícula y carné?",
                  answer: "a",
                },
                {
                  id: "b2a-l5-29",
                  situation: "Welcher Titel passt zum Abschnitt über Prüfungen und Wiederholung?",
                  situationEs: "¿Qué título encaja con el apartado de exámenes y repetición?",
                  answer: "b",
                },
                {
                  id: "b2a-l5-30",
                  situation: "Welcher Titel passt zum Abschnitt über Bibliothek und Aussenflächen?",
                  situationEs: "¿Qué título encaja con el apartado de biblioteca y exteriores?",
                  answer: "c",
                },
              ],
            },
          ],
        },
      ],
    },

    // ══════════════════════════ HÖREN · ~40 min · 30 ═════════════════════
    {
      skill: "hoeren",
      label: "Hören",
      minutes: 40,
      teile: [
        {
          title: "Hören · Teil 1",
          instruction:
            "Sie hören fünf kurze Texte. Sie hören jeden Text einmal. Zu jedem Text lösen Sie zwei Aufgaben.",
          instructionEs:
            "Cinco textos cortos, cada uno UNA sola vez — al revés que en el B1. De cada uno, un Richtig/Falsch y un a/b/c. Diez segundos para leer antes de cada texto. 16 de los 30 ítems del módulo son de una pasada: este Teil es la mitad.",
          items: [
            {
              kind: "hoeren-group",
              id: "b2a-h1-g1",
              twice: false,
              readSeconds: 10,
              dialog: false,
              audio:
                "Hallo Sofía, hier ist Kai vom Betriebsrat. Die Überstunden vom letzten Monat werden nicht ausgezahlt, sondern als Freizeit ausgeglichen — so steht es im neuen Tarif. Du hast Anspruch auf zwei ganze Tage. Trag sie bitte bis Freitag ins System ein, sonst verfallen sie. Fragen beantworte ich nach der Schicht, nicht per Nachricht. Tschüss!",
              items: [
                {
                  kind: "hoeren-rf",
                  id: "b2a-h1-1",
                  audio: "",
                  statement: "Die Überstunden werden dieses Mal ausgezahlt.",
                  statementEs: "Las horas extra se pagan esta vez en dinero.",
                  richtig: false,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2a-h1-2",
                  twice: false,
                  audio: "",
                  question: "Bis wann müssen die freien Tage eingetragen werden?",
                  questionEs: "¿Hasta cuándo hay que anotar los días libres?",
                  options: ["bis Montag", "bis Freitag", "nach der Schicht"],
                  answer: 1,
                },
              ],
            },
            {
              kind: "hoeren-group",
              id: "b2a-h1-g2",
              twice: false,
              readSeconds: 10,
              dialog: false,
              audio:
                "Verkehrsmeldung: Auf der A100 zwischen Tempelhofer Damm und Innsbrucker Platz ist nach einem Unfall die rechte Spur gesperrt. Rechnen Sie mit dreißig Minuten. Die Stadtautobahn Richtung Norden bleibt frei. Die S-Bahn-Linie 41 fährt einen Umweg über Südkreuz; Radfahrer kommen wie gewohnt durch.",
              items: [
                {
                  kind: "hoeren-rf",
                  id: "b2a-h1-3",
                  audio: "",
                  statement: "Die Stadtautobahn nach Norden ist gesperrt.",
                  statementEs: "La autovía urbana hacia el norte está cortada.",
                  richtig: false,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2a-h1-4",
                  twice: false,
                  audio: "",
                  question: "Was gilt für die S-Bahn-Linie 41?",
                  questionEs: "¿Qué ocurre con la línea 41 de S-Bahn?",
                  options: [
                    "Sie fällt ganz aus.",
                    "Sie fährt eine andere Strecke.",
                    "Sie fährt nur bis Tempelhofer Damm.",
                  ],
                  answer: 1,
                },
              ],
            },
            {
              kind: "hoeren-group",
              id: "b2a-h1-g3",
              twice: false,
              readSeconds: 10,
              dialog: false,
              audio:
                "Sehr geehrte Studierende, die Klausur Einführung in die Medienwissenschaft, planmäßig nächsten Dienstag um neun, wird auf den 3. Juni um vierzehn Uhr verschoben. Grund ist eine Überschneidung mit der Statistik-Klausur. Der Raum bleibt H 105. Wer den neuen Termin nicht wahrnehmen kann, schreibt bis Freitag an das Prüfungsamt, nicht an das Sekretariat.",
              items: [
                {
                  kind: "hoeren-rf",
                  id: "b2a-h1-5",
                  audio: "",
                  statement: "Die Klausur findet wie geplant am Dienstag um neun statt.",
                  statementEs: "El examen es como estaba previsto el martes a las nueve.",
                  richtig: false,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2a-h1-6",
                  twice: false,
                  audio: "",
                  question: "Wohin schreibt, wer den neuen Termin nicht kann?",
                  questionEs: "¿A quién escribe quien no puede en la nueva fecha?",
                  options: ["an das Sekretariat", "an das Prüfungsamt", "an den Dozenten"],
                  answer: 1,
                },
              ],
            },
            {
              kind: "hoeren-group",
              id: "b2a-h1-g4",
              twice: false,
              readSeconds: 10,
              dialog: false,
              audio:
                "Wetter für Samstag, Tag der Demonstration am Brandenburger Tor: Am Vormittag bleibt es trocken, nachmittags ziehen von Westen Schauer auf, am Abend ist mit kräftigem Regen zu rechnen. Die Temperaturen erreichen 12 bis 15 Grad. Wer lange stehen will, sollte eine Jacke mitbringen; der Wind frischt auf.",
              items: [
                {
                  kind: "hoeren-rf",
                  id: "b2a-h1-7",
                  audio: "",
                  statement: "Am Vormittag bleibt es trocken.",
                  statementEs: "Por la mañana sigue seco.",
                  richtig: true,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2a-h1-8",
                  twice: false,
                  audio: "",
                  question: "Wie wird der Abend?",
                  questionEs: "¿Cómo será la noche?",
                  options: ["trocken und mild", "mit kräftigem Regen", "mit Schnee"],
                  answer: 1,
                },
              ],
            },
            {
              kind: "hoeren-group",
              id: "b2a-h1-g5",
              twice: false,
              readSeconds: 10,
              dialog: false,
              audio:
                "Willkommen zur Langen Nacht der Museen. Das Haus öffnet um 18 Uhr und schließt um 2 Uhr. Die letzte Führung startet um Mitternacht, nicht um 22 Uhr wie in den Vorjahren. Tickets gibt es nur online, an der Kasse werden keine mehr verkauft. Die Garderobe ist heute kostenlos; Rucksäcke größer als DIN-A4 bleiben draußen.",
              items: [
                {
                  kind: "hoeren-rf",
                  id: "b2a-h1-9",
                  audio: "",
                  statement: "An der Kasse kann man noch Tickets kaufen.",
                  statementEs: "En taquilla aún se pueden comprar entradas.",
                  richtig: false,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2a-h1-10",
                  twice: false,
                  audio: "",
                  question: "Wann startet die letzte Führung?",
                  questionEs: "¿Cuándo empieza la última visita guiada?",
                  options: ["um 22 Uhr", "um Mitternacht", "um 2 Uhr"],
                  answer: 1,
                },
              ],
            },
          ],
        },
        {
          title: "Hören · Teil 2",
          instruction:
            "Sie hören ein Interview. Sie hören das Interview zweimal. Wählen Sie bei jeder Aufgabe die richtige Lösung. Lesen Sie jetzt die Aufgaben. Dazu haben Sie 60 Sekunden Zeit.",
          instructionEs:
            "Entrevista de radio, DOS veces. Seis preguntas a/b/c. Sesenta segundos para leerlas antes: úsalos. Quien habla es una restauradora de cine, no una científica de laboratorio.",
          items: [
            {
              kind: "hoeren-group",
              id: "b2a-h2",
              twice: true,
              readSeconds: 60,
              dialog: true,
              audio:
                "Im Studio ist Dr. Helene Auer, Filmrestauratorin am Bundesarchiv. Frau Auer, Sie retten Filme, die kaum noch kopierbar sind. Wo fängt die Arbeit an? | " +
                "Nicht im Labor, sondern in der Liste. Viele Archive wissen gar nicht genau, was sie haben. Wir fangen damit an, Meter für Meter zu sichten und zu entscheiden: Was ist in Gefahr, was kann warten. Ein Nitratfilm aus den zwanziger Jahren wartet nicht. Ein Positiv der siebziger Jahre oft schon. | " +
                "Und dann? | " +
                "Dann kommt das Unromantische: Temperatur, Luftfeuchtigkeit, Handschuhe. Wer mit bloßen Fingern an ein Nitrat geht, beschleunigt den Zerfall. Deshalb darf bei uns niemand in den Kühlraum, der nicht die Einführung gemacht hat — auch nicht die Direktion. | " +
                "Digitalisieren Sie alles? | " +
                "Nein, und das ist eine Entscheidung, keine Sparmaßnahme. Digitalisieren ohne das Original zu halten ist so, als würde man ein Gemälde fotografieren und die Leinwand wegwerfen. Das Digitalisat ist die Benutzungskopie. Das Original bleibt das Original. | " +
                "Was ärgert Sie am meisten? | " +
                "Dass Sender alte Beiträge löschen, weil der Speicher teuer ist. Wir kriegen Anrufe: Haben Sie die Sendung von 1987 noch? Manchmal ja. Oft nein. Ein gelöschtes Band kommt nicht wieder, auch nicht mit künstlicher Intelligenz. | " +
                "Was wünschen Sie sich von der Politik? | " +
                "Keine Sonntagsreden über Kulturerbe, sondern eine Stelle, die fünf Jahre finanziert ist, nicht fünf Monate. Restaurieren ist langsam. Wer uns in Projektfetzen denkt, hat das Medium nicht verstanden. | " +
                "Frau Auer, danke.",
              items: [
                {
                  kind: "hoeren-mc",
                  id: "b2a-h2-11",
                  twice: true,
                  audio: "",
                  question: "Womit beginnt die Arbeit im Archiv laut Frau Auer?",
                  questionEs: "¿Por dónde empieza el trabajo en el archivo, según la señora Auer?",
                  options: [
                    "im Labor mit der ersten Kopie",
                    "mit einer Bestandsaufnahme: was in Gefahr ist",
                    "mit der Digitalisierung aller Rollen",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2a-h2-12",
                  twice: true,
                  audio: "",
                  question: "Wer darf in den Kühlraum?",
                  questionEs: "¿Quién puede entrar en la cámara frigorífica?",
                  options: [
                    "jeder aus der Direktion",
                    "nur wer die Einführung gemacht hat",
                    "niemand, der Handschuhe trägt",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2a-h2-13",
                  twice: true,
                  audio: "",
                  question: "Wie steht Frau Auer zur Digitalisierung?",
                  questionEs: "¿Qué opina la señora Auer de digitalizar?",
                  options: [
                    "Alles muss digitalisiert und das Original darf weg.",
                    "Das Digitalisat ist die Nutzkopie, das Original bleibt.",
                    "Digitalisieren sei reine Sparmaßnahme.",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2a-h2-14",
                  twice: true,
                  audio: "",
                  question: "Was ärgert sie an den Sendern?",
                  questionEs: "¿Qué le molesta de las emisoras?",
                  options: [
                    "dass sie zu viele Kopien lagern",
                    "dass sie alte Beiträge löschen, weil Speicher teuer ist",
                    "dass sie zu oft anrufen",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2a-h2-15",
                  twice: true,
                  audio: "",
                  question: "Was wünscht sie sich von der Politik?",
                  questionEs: "¿Qué le pide a la política?",
                  options: [
                    "mehr Sonntagsreden über Kulturerbe",
                    "Stellen, die über Jahre finanziert sind, nicht über Monate",
                    "künstliche Intelligenz statt Personal",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2a-h2-16",
                  twice: true,
                  audio: "",
                  question: "Welches Beispiel nennt sie für Material, das nicht warten kann?",
                  questionEs: "¿Qué ejemplo da de material que no puede esperar?",
                  options: [
                    "ein Positiv aus den siebziger Jahren",
                    "ein Nitratfilm aus den zwanziger Jahren",
                    "eine Sendung von 1987",
                  ],
                  answer: 1,
                },
              ],
            },
          ],
        },
        {
          title: "Hören · Teil 3",
          instruction:
            "Sie hören eine Diskussion. Sie hören die Diskussion einmal. Ordnen Sie zu: Wer sagt was?",
          instructionEs:
            "Tertulia de radio con tres voces, UNA sola vez. Asigna cada afirmación. La moderadora también opina, no solo pregunta. Sesenta segundos para leer las seis frases.",
          items: [
            {
              kind: "hoeren-group",
              id: "b2a-h3",
              twice: false,
              readSeconds: 60,
              dialog: true,
              audio:
                "Carolin Steg: Willkommen bei Stadtgespräch. Unser Thema: Soll Bargeld abgeschafft werden? Bei mir sind der Einzelhändler Ralf Meunier und die Ökonomin Dr. Inge Solberg. Herr Meunier, Sie sagen klar nein. | " +
                "Ralf Meunier: Ja. In meinem Laden zahlen noch vierzig Prozent bar, vor allem ältere Kundschaft und Leute, die kein Konto haben. Wer das Bargeld abschafft, schließt die aus. Eine Karte kann ausfallen, ein Schein nicht. | " +
                "Inge Solberg: Das Argument kenne ich, und es ist ernst. Aber der Anteil derer ohne Konto sinkt seit Jahren. Was steigt, sind Überfälle und Schwarzarbeit, die das Bargeld unsichtbar macht. Eine Gesellschaft, die alles nachvollziehen kann, ist nicht automatisch eine Überwachungsgesellschaft. | " +
                "Carolin Steg: Ich muss sagen, mich überzeugt die Mitte: Bargeld als Option behalten, aber die Obergrenzen für große Beträge senken. Zwischen einem Brötchen und einem Gebrauchtwagen liegen Welten. | " +
                "Ralf Meunier: Obergrenzen klingen harmlos, bis die Grenze bei fünfzig Euro liegt. Dann ist das Bargeld faktisch tot, nur der Name bleibt. | " +
                "Inge Solberg: Fünfzig Euro fordert niemand ernsthaft. Es geht um Beträge, bei denen heute schon jede Bank eine Herkunft fragen würde. Transparenz bei großen Summen und Freiheit bei kleinen — das ist kein Widerspruch. | " +
                "Carolin Steg: Ein Punkt, den beide unterschätzen: die Gebühren. Kleine Läden zahlen an den Kartendienst mehr, als sie an manchem Artikel verdienen. Wer bargeldlos will, muss diese Kosten deckeln. | " +
                "Ralf Meunier: Genau. Sonst zahlen am Ende die denselben Preis, die bar zahlen wollten. | " +
                "Inge Solberg: Da gebe ich Ihnen recht. Die Gebühren sind das ungelöste Stück, nicht die Scheine selbst. | " +
                "Carolin Steg: Ein schöner Schlusssatz. Danke Ihnen beiden.",
              items: [
                {
                  kind: "hoeren-wersagt",
                  id: "b2a-h3-17",
                  speakers: [
                    { key: "a", name: "die Moderatorin Carolin Steg" },
                    { key: "b", name: "der Einzelhändler Ralf Meunier" },
                    { key: "c", name: "die Ökonomin Dr. Inge Solberg" },
                  ],
                  statement:
                    "Wer Bargeld abschafft, schließt Menschen ohne Konto aus.",
                  statementEs:
                    "Quien suprime el efectivo deja fuera a quien no tiene cuenta.",
                  answer: "b",
                },
                {
                  kind: "hoeren-wersagt",
                  id: "b2a-h3-18",
                  speakers: [
                    { key: "a", name: "die Moderatorin Carolin Steg" },
                    { key: "b", name: "der Einzelhändler Ralf Meunier" },
                    { key: "c", name: "die Ökonomin Dr. Inge Solberg" },
                  ],
                  statement:
                    "Bargeld macht Überfälle und Schwarzarbeit unsichtbarer.",
                  statementEs:
                    "El efectivo hace menos visibles los atracos y el trabajo en negro.",
                  answer: "c",
                },
                {
                  kind: "hoeren-wersagt",
                  id: "b2a-h3-19",
                  speakers: [
                    { key: "a", name: "die Moderatorin Carolin Steg" },
                    { key: "b", name: "der Einzelhändler Ralf Meunier" },
                    { key: "c", name: "die Ökonomin Dr. Inge Solberg" },
                  ],
                  statement:
                    "Man sollte Bargeld behalten, aber Obergrenzen für große Beträge senken.",
                  statementEs:
                    "Habría que conservar el efectivo, pero bajar los topes para las sumas grandes.",
                  answer: "a",
                },
                {
                  kind: "hoeren-wersagt",
                  id: "b2a-h3-20",
                  speakers: [
                    { key: "a", name: "die Moderatorin Carolin Steg" },
                    { key: "b", name: "der Einzelhändler Ralf Meunier" },
                    { key: "c", name: "die Ökonomin Dr. Inge Solberg" },
                  ],
                  statement:
                    "Obergrenzen können das Bargeld faktisch abschaffen, auch wenn der Name bleibt.",
                  statementEs:
                    "Los topes pueden matar el efectivo de hecho, aunque el nombre quede.",
                  answer: "b",
                },
                {
                  kind: "hoeren-wersagt",
                  id: "b2a-h3-21",
                  speakers: [
                    { key: "a", name: "die Moderatorin Carolin Steg" },
                    { key: "b", name: "der Einzelhändler Ralf Meunier" },
                    { key: "c", name: "die Ökonomin Dr. Inge Solberg" },
                  ],
                  statement:
                    "Kleine Läden zahlen an Kartendienste oft mehr, als sie an manchem Artikel verdienen.",
                  statementEs:
                    "Las tiendas pequeñas pagan a las tarjetas a menudo más de lo que ganan en un artículo.",
                  answer: "a",
                },
                {
                  kind: "hoeren-wersagt",
                  id: "b2a-h3-22",
                  speakers: [
                    { key: "a", name: "die Moderatorin Carolin Steg" },
                    { key: "b", name: "der Einzelhändler Ralf Meunier" },
                    { key: "c", name: "die Ökonomin Dr. Inge Solberg" },
                  ],
                  statement:
                    "Das ungelöste Stück sind die Gebühren, nicht die Scheine selbst.",
                  statementEs:
                    "Lo que no está resuelto son las comisiones, no los billetes en sí.",
                  answer: "c",
                },
              ],
            },
          ],
        },
        {
          title: "Hören · Teil 4",
          instruction:
            "Sie hören einen Vortrag. Sie hören den Vortrag zweimal. Wählen Sie die richtige Lösung.",
          instructionEs:
            "Una conferencia breve, DOS veces. Ocho preguntas. Sesenta segundos para leer. El dato que decide rara vez está en la primera frase.",
          items: [
            {
              kind: "hoeren-group",
              id: "b2a-h4",
              twice: true,
              readSeconds: 60,
              dialog: false,
              audio:
                "Guten Abend. Mein Name ist Beat Keller, ich leite die Fachstelle Licht am Umweltamt Zürich, und ich spreche heute über Lichtverschmutzung — nicht als romantisches Thema für Sternengucker, sondern als Regelungsfrage. " +
                "Erstens die Zahl: In Mitteleuropa nimmt das künstliche Licht im Nachthimmel um rund zwei Prozent pro Jahr zu. Das klingt wenig. Über ein Jahrzehnt ist es ein Viertel mehr. Wer heute am Stadtrand wohnt, sieht den Milchstraße-Streifen oft nicht mehr. " +
                "Zweitens die Tiere. Es geht nicht nur um Zugvögel, die um Hochhäuser kreisen. Insekten, die das Licht für den Mond halten, sterben an Laternen in Mengen, die wir erst seit ein paar Jahren messen. Eine Studie aus Niederösterreich hat an einer einzigen Straßenlampe in einer Sommernacht über dreihundert Insekten gezählt. " +
                "Drittens der Mensch. Schlafstörungen durch kaltweißes LED-Licht vor dem Fenster sind keine Einbildung. Die Stadt Lyon hat in einem Viertel die Farbtemperatur nach 23 Uhr abgesenkt, und die Beschwerden über Schlaf sind dort zurückgegangen — nicht verschwunden, aber messbar weniger. " +
                "Was tun? Abschalten ist der billigste Hebel, und der unbeliebteste. Sinnvoller ist: Licht nur dorthin, wo es gebraucht wird, nach unten, und nach Mitternacht dimmen. In Zürich gilt das für städtische Anlagen bereits; private Fassadenwerbung darf nach 22 Uhr nicht mehr in den Himmel strahlen. " +
                "Was wir nicht tun sollten: das Thema den Vereinen überlassen. Licht ist Infrastruktur. Wer Straßen plant, plant auch Nacht. Und wer Nacht plant, entscheidet, ob eine Stadt noch dunkle Stunden hat oder nur noch verschiedene Helligkeiten. " +
                "Ich danke Ihnen. Fragen am Ende, nicht zwischendurch — das Licht hier im Saal bleibt an, versprochen.",
              items: [
                {
                  kind: "hoeren-mc",
                  id: "b2a-h4-23",
                  twice: true,
                  audio: "",
                  question: "Wie schnell nimmt das künstliche Licht laut Keller zu?",
                  questionEs: "¿A qué ritmo aumenta la luz artificial, según Keller?",
                  options: [
                    "um etwa zwei Prozent pro Jahr",
                    "um ein Viertel pro Jahr",
                    "es nimmt ab",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2a-h4-24",
                  twice: true,
                  audio: "",
                  question: "Was hat die Studie aus Niederösterreich gezählt?",
                  questionEs: "¿Qué ha contado el estudio de Baja Austria?",
                  options: [
                    "Zugvögel an Hochhäusern",
                    "über dreihundert Insekten an einer Laterne in einer Nacht",
                    "Beschwerden über Schlaf in Lyon",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2a-h4-25",
                  twice: true,
                  audio: "",
                  question: "Was hat Lyon in einem Viertel gemacht?",
                  questionEs: "¿Qué ha hecho Lyon en un barrio?",
                  options: [
                    "alle Laternen nach 23 Uhr abgeschaltet",
                    "die Farbtemperatur nach 23 Uhr abgesenkt",
                    "private Werbung verboten",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2a-h4-26",
                  twice: true,
                  audio: "",
                  question: "Wie bewertet Keller das Abschalten als Maßnahme?",
                  questionEs: "¿Cómo valora Keller apagar las luces como medida?",
                  options: [
                    "als billigsten Hebel, aber unbeliebt",
                    "als einzige seriöse Lösung",
                    "als unwirksam",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2a-h4-27",
                  twice: true,
                  audio: "",
                  question: "Was gilt in Zürich für private Fassadenwerbung?",
                  questionEs: "¿Qué rige en Zúrich para la publicidad en fachadas?",
                  options: [
                    "Sie darf nach 22 Uhr nicht mehr in den Himmel strahlen.",
                    "Sie ist ganztägig verboten.",
                    "Sie muss kaltweiß sein.",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2a-h4-28",
                  twice: true,
                  audio: "",
                  question: "Wem sollte das Thema laut Keller nicht überlassen werden?",
                  questionEs: "¿A quién no debería dejársele el tema, según Keller?",
                  options: [
                    "den Umweltämtern",
                    "den Vereinen",
                    "den Stadtplanern",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2a-h4-29",
                  twice: true,
                  audio: "",
                  question: "Wie versteht Keller Licht in der Stadtplanung?",
                  questionEs: "¿Cómo entiende Keller la luz en el urbanismo?",
                  options: [
                    "als dekoratives Extra",
                    "als Infrastruktur, die mitgeplant werden muss",
                    "als Aufgabe der Sternwarten",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2a-h4-30",
                  twice: true,
                  audio: "",
                  question: "Wann sollen die Zuhörer Fragen stellen?",
                  questionEs: "¿Cuándo deben preguntar los oyentes?",
                  options: [
                    "zwischendurch, sobald etwas unklar ist",
                    "am Ende des Vortrags",
                    "schriftlich nach der Veranstaltung",
                  ],
                  answer: 1,
                },
              ],
            },
          ],
        },
      ],
    },

    // ═════════════════════ SCHREIBEN · 75 min · 100 pts ══════════════════
    {
      skill: "schreiben",
      label: "Schreiben",
      minutes: 75,
      teile: [
        {
          title: "Schreiben · Aufgabe 1 (50 Minuten · 60 Punkte)",
          instruction:
            "Schreiben Sie einen Forumsbeitrag (circa 150 Wörter). Nehmen Sie Stellung, nennen Sie Vor- und Nachteile und machen Sie einen Vorschlag. Achten Sie auf Einleitung und Schluss.",
          instructionEs:
            "Foro argumentativo, ~150 palabras, 50 minutos. Introducción y cierre explícitos, ventajas e inconvenientes, una propuesta. Menos de 75 palabras = Erfüllung E = 0 en toda la tarea. No es un email: nada de Liebe… ni de despedida personal.",
          items: [
            {
              kind: "schreiben-message",
              id: "b2a-s1",
              task:
                "Schreiben Sie Ihren Beitrag zum Forumsthema. Sagen Sie klar, was Sie von der Idee halten, und begründen Sie.",
              taskEs:
                "Escribe tu mensaje al foro. Di con claridad qué te parece la idea y justifícala.",
              stimulus: {
                source: "Stadtforum · Beitrag von Nachtwache88",
                text:
                  "Supermärkte sollten nach 20 Uhr schließen. Wer um elf noch Milch braucht, hat den Tag falsch geplant. Die Nachtarbeit der Kassiererinnen und Lageristen ist ungesund, die Straßen sind nach 20 Uhr voller Lieferverkehr, und die kleinen Läden in der Nebenstraße sterben, weil die Kette bis Mitternacht aufhat. Ein Abend ohne Konsum wäre für die Stadt ein Gewinn, nicht ein Verlust.",
              },
              points: [
                "Di claramente si estás de acuerdo con Nachtwache88 o no",
                "Nombra al menos una ventaja y un inconveniente de cerrar a las 20 h",
                "Haz una propuesta concreta (horario, excepciones, quién decide)",
                "Cierra con una conclusión",
              ],
              words: 150,
              points_max: 60,
              rubric: RUBRIC_SCHREIBEN_60,
              model:
                "Nachtwache88 spricht ein echtes Problem an, die Lösung halte ich aber für zu grob.\n\n" +
                "Einerseits ist unbestritten, dass Spätschichten belasten und der Lieferverkehr nach 20 Uhr Wohnstraßen laut macht. Kleine Läden können mit Ketten, die bis Mitternacht öffnen, kaum mithalten.\n\n" +
                "Andererseits leben in einer Großstadt Menschen, deren Arbeit erst um 19 Uhr endet: Pflege, Gastronomie, Reinigung. Wer denen den Einkauf streicht, verlagert das Problem, löst es nicht. Ein pauschales Verbot trifft genau die, die am wenigsten Wahl haben.\n\n" +
                "Mein Vorschlag: Kernöffnungszeiten bis 20 Uhr, und danach nur noch wenige Standorte mit klaren Lärmauflagen und Zuschlägen, die die Nachtarbeit teurer machen. So bleibt ein Abend ohne Konsum die Regel, ohne dass Schichtarbeiterinnen vor verschlossenen Türen stehen.\n\n" +
                "Kurz: weniger Nacht, nicht keine Nacht.",
            },
          ],
        },
        {
          title: "Schreiben · Aufgabe 2 (25 Minuten · 40 Punkte)",
          instruction:
            "Schreiben Sie eine Nachricht an Ihren Vorgesetzten (circa 100 Wörter). Beachten Sie Anrede und Gruß. Bearbeiten Sie alle inhaltlichen Punkte.",
          instructionEs:
            "Mensaje a un superior jerárquico, ~100 palabras, registro Sie, Anrede y Gruß obligatorios. Los puntos de contenido en un orden lógico. E en Erfüllung = 0.",
          items: [
            {
              kind: "schreiben-message",
              id: "b2a-s2",
              task:
                "Sie können an der internen Weiterbildung „Recht auf Reparatur — was ändert sich für den Einkauf?“ am 12. Juni nicht teilnehmen. Schreiben Sie an Ihren Vorgesetzten, Herrn Ebert.",
              taskEs:
                "No puedes ir a la formación interna del 12 de junio. Escribe a tu superior, el señor Ebert.",
              points: [
                "Discúlpate y explica por qué no puedes (un motivo profesional serio)",
                "Propón una alternativa (otra fecha, un colega, un informe escrito)",
                "Pregunta qué Unterlagen puedes ya leer y ofrece un kurzes Gespräch",
              ],
              words: 100,
              points_max: 40,
              rubric: RUBRIC_SCHREIBEN_40,
              model:
                "Sehr geehrter Herr Ebert,\n\n" +
                "leider kann ich an der Weiterbildung am 12. Juni nicht teilnehmen. An diesem Tag habe ich die Inventur im Lager zu begleiten; ein Ersatz ist kurzfristig nicht zu organisieren.\n\n" +
                "Könnte Frau Demir den Platz übernehmen und mir die Unterlagen danach zukommen lassen? Alternativ würde ich den nächsten Termin im September wahrnehmen. Die Folien könnte ich bereits diese Woche lesen.\n\n" +
                "Falls Sie ein kurzes Gespräch für sinnvoll halten, stehe ich am Donnerstag nach 16 Uhr gern zur Verfügung.\n\n" +
                "Mit freundlichen Grüßen\nSofía Marín",
            },
          ],
        },
      ],
    },

    // ═════════════════════ SPRECHEN · ~15 min · 100 pts ══════════════════
    {
      skill: "sprechen",
      label: "Sprechen",
      minutes: 15,
      teile: [
        {
          title: "Sprechen · Teil 1 — Vortrag halten (52 Punkte)",
          instruction:
            "Wählen Sie EINES der beiden Themen. Halten Sie einen Vortrag von etwa vier Minuten mit Einleitung, Hauptteil und Schluss. Anschließend beantworten Sie Fragen.",
          instructionEs:
            "El examen te da DOS temas; eliges uno y no vuelves atrás. Ponencia de ~4 minutos con estructura propia (no hay cinco diapositivas como en el B1). Después preguntan el compañero y un examinador: esas respuestas son 12 de los 52 puntos de este Teil. Los 15 minutos de preparación son para los dos Teile, en solitario, con papel sellado.",
          items: [
            {
              kind: "sprechen",
              id: "b2a-sp1",
              teil: 1,
              weight: 52,
              prepSeconds: 480,
              speakSeconds: 240,
              prompt:
                "Thema 1 — Sollte Homeoffice in Berufen, in denen es möglich ist, ein Recht sein und kein Entgegenkommen?\n" +
                "Thema 2 — Braucht eine wachsende Stadt zuerst mehr Parks oder zuerst mehr Wohnungen?\n\n" +
                "Strukturieren Sie selbst: Einleitung, zwei bis drei Argumente mit Beispiel, Gegenargument, Schluss. Danach: eine Frage des Partners und eine Frage der Prüferin beantworten.",
              promptEs:
                "Tema 1: ¿debería ser el teletrabajo un derecho donde sea posible, no un favor? Tema 2: ¿una ciudad que crece necesita primero más parques o más viviendas? Estructura tuya. Luego respondes a una pregunta del compañero y a una de la examinadora.",
              model:
                "In meinem Vortrag geht es um die Frage, ob Homeoffice in geeigneten Berufen ein Recht sein sollte. Ich habe dieses Thema gewählt, weil in meinem Umfeld die Praxis sehr ungleich ist: Manche Teams sitzen drei Tage zu Hause, andere brauchen für denselben Job eine Genehmigung.\n\n" +
                "Ein erstes Argument ist die Autonomie. Wer den Arbeitsweg spart, gewinnt Zeit, die nicht der Firma gehört — und genau das macht den Widerstand mancher Vorgesetzter aus. Ein zweites Argument ist die Fairness: Wenn die Tätigkeit es zulässt, sollte nicht das Bauchgefühl der Führungskraft entscheiden.\n\n" +
                "Ein Gegenargument ernst nehmen: Nicht jedes Team funktioniert ohne gemeinsame Zeit, und Isolation ist ein echtes Risiko. Deshalb würde ich kein Recht auf fünf Tage zu Hause formulieren, sondern auf einen planbaren Anteil, etwa zwei oder drei Tage, mit Anwesenheit, die einen Zweck hat, nicht eine Kontrolle.\n\n" +
                "Zusammenfassend: Homeoffice als Recht auf einen Anteil, nicht als Pflicht zur Ferne. Vielen Dank. Fragen beantworte ich gern — etwa, wie kleine Betriebe das ohne große Personalabteilung umsetzen.",
              rubric: RUBRIC_SPRECHEN_T1,
            },
          ],
        },
        {
          title: "Sprechen · Teil 2 — Diskussion führen (48 Punkte)",
          instruction:
            "Diskutieren Sie die Streitfrage. Jede Person vertritt eine Position. Reagieren Sie aufeinander und bleiben Sie bei Ihrer Linie, ohne den anderen totzureden.",
          instructionEs:
            "Discusión de ~5 minutos. Te asignan una postura. Lo que puntúa es la interacción: conceder sin rendirte, rebatir, devolver el turno. Un monólogo memorizado, aunque esté bien, hunde Interaktion.",
          items: [
            {
              kind: "sprechen",
              id: "b2a-sp2",
              teil: 2,
              weight: 48,
              prepSeconds: 420,
              speakSeconds: 300,
              prompt:
                "Streitfrage: Ein bedingungsloses Grundeinkommen — Chance oder Irrweg?\n\n" +
                "Person A ist dafür: weniger Angst vor Jobverlust, mehr Gründungen, weniger Bürokratie bei Sozialleistungen.\n" +
                "Person B ist dagegen: zu teuer, Fehlanreize, der Sozialstaat gezielter hilft.\n\n" +
                "Verteidigen Sie Ihre Position, gehen Sie auf die Argumente der anderen Person ein und suchen Sie, ob es eine gemeinsame Grenze gibt (Höhe, Finanzierung, Pilotprojekt).",
              promptEs:
                "¿Renta básica incondicional, oportunidad o error? A a favor, B en contra. Defiende tu lado, recoge lo del otro y mira si hay un límite común (cuantía, cómo se paga, un piloto).",
              model:
                "A: Grundsätzlich halte ich ein Grundeinkommen für den ehrlicheren Weg. Wer den Job verliert, sollte nicht erst Formulare ausfüllen, bevor die Miete sicher ist. — B: Da haben Sie einen Punkt bei der Bürokratie. Allerdings überzeugt mich nicht, dass man deshalb an alle zahlt, auch an die, die es nicht brauchen. Gezielte Leistungen sind billiger. — A: Billiger auf dem Papier. In der Praxis beantragen genau die das Geld nicht, die es am nötigsten haben. Ein Pilot mit einer Stadt, fünf Jahre, transparent finanziert über höhere Abgaben auf Vermögen — das wäre für mich die gemeinsame Grenze. — B: Einen Pilot kann ich mittragen, ein Versprechen an alle nicht. Unter der Voraussetzung, dass man nach fünf Jahren wirklich aussteigen kann, wenn die Zahlen nicht stimmen. — A: Einverstanden. Dann reden wir über ein Experiment, nicht über eine Religion.",
              rubric: RUBRIC_SPRECHEN_T2,
            },
          ],
        },
      ],
    },
  ],
};
