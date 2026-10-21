import type { ExamSet, RubricCriterion } from "@/lib/examTypes";

// ─────────────────────────────────────────────────────────────────────────────
// Modellsatz B2 B — Goethe-Zertifikat B2, formato 2019. Segundo simulacro
// propio: temas DISTINTOS de examB2A (Pflege, Reparatur, Vier-Tage-Woche,
// Überwachung, Lichtverschmutzung, Homeoffice, Grundeinkommen) y del
// Modellsatz oficial (minimalismo, Reisefieber, Doktor Google, nómadas).
// Mundo joven/formación: Ausbildung dual, Schule digital, Klimastreik,
// redes, club deportivo, vivienda de estudiantes. Elenco CANON en Berlín;
// Oma Ilse no aparece. Plurizéntrico: Lesen T3 prensa austriaca (un Teil).
//
//   LESEN   65′ · 5 Teile · 30  → T1 match 4 personas a–d, reuse · insert
//                                  6/8 · 6 MC artículo · 6 match + un 0 ·
//                                  3 match Wohnheimordnung
//   HÖREN   ~40′ · 4 Teile · 30 → 1-2-1-2: T1 UNA 5×(RF+MC) · T2 DOS
//                                  entrevista 6 MC · T3 UNA tertulia
//                                  wersagt 6 · T4 DOS Vortrag 8
//   SCHREIBEN 75′ · Forumsbeitrag 60 + Nachricht 40
//   SPRECHEN  Vortrag 52 + Diskussion 48
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

export const examB2B: ExamSet = {
  id: "b2-sim-b",
  level: "b2",
  title: "Modellsatz B2 B",
  description:
    "Segundo simulacro fiel del Goethe-Zertifikat B2 (formato 2019): Lesen 65′, Hören ~40′ con escuchas 1-2-1-2, Schreiben 75′ y Sprechen (Vortrag + Diskussion). Examen MODULAR — cada módulo vale 100 puntos y se aprueba por separado con 60, sin compensación. Temas: formación dual, escuela digital, huelga climática, redes, club deportivo, vivienda de estudiantes.",
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
            "Lesen Sie die vier Beiträge im Forum und die Aussagen 1 bis 9. Welche Person passt zu welcher Aussage? Eine Person kann mehrmals gewählt werden. Eine Aussage kann auf niemanden zutreffen (0).",
          instructionEs:
            "Cuatro voces de un foro sobre la formación dual. Nueve afirmaciones: asigna cada una a una persona (a–d). Una persona PUEDE repetirse. Una afirmación puede no encajar con nadie (0). Tienes unos 18 minutos.",
          items: [
            {
              kind: "lesen-match",
              id: "b2b-l1",
              allowReuse: true,
              requireNone: false,
              ads: [
                {
                  key: "a",
                  text:
                    "Naima El-Khatib, 21, Auszubildende zur Industriemechanikerin: Ich lerne im dritten Jahr in einem Maschinenbaubetrieb in Wedding. Dass am Ende des Monats eigenes Geld auf dem Konto liegt, ist für mich kein Nebensatz: Ich will keinen Kredit und kein Bafög, das man zehn Jahre abbezahlt. Die Berufsschule einen Tag die Woche reicht. Wer drei Jahre nur Folien liest, merkt erst im Job, dass eine Zeichnung und ein Werkstück zwei Paar Schuhe sind — das Studium kommt mir zu abgehoben vor, zu weit weg vom Material. Wenn die Prüfung sitzt, bleibe ich im Betrieb. Die haben mich ausgebildet, ich kenne die Halle, und ein Wechsel nur weil der Bachelor schicker klingt, wäre unredlich.",
                },
                {
                  key: "b",
                  text:
                    "Jonas Pell, 24, BWL-Student: Ich habe nach dem Abitur kein Handwerk gewählt, obwohl zwei Onkel in der Lehre waren. Mit sechzehn eine Branche fürs Leben festzulegen, das hielt ich für zu früh — und ich halte es immer noch dafür. An der TU kann ich Schwerpunkte schieben, ein Semester in Lyon, ein Praktikum im Öffentlichen Dienst. Geld ist knapp, ja: ich jobbe als Werkstudent in einer Verwaltung und teile mir in Neukölln ein WG-Zimmer. Respekt vor der Ausbildung habe ich. Aber drei Jahre in einer Werkstatt, bevor ich weiß, ob mich das Feld überhaupt trägt, das wäre für mich eine Wette mit zu hohem Einsatz.",
                },
                {
                  key: "c",
                  text:
                    "Sören Habicht, 47, Ausbilder: Ich betreue acht Azubis. Im letzten Jahr sind zwei gegangen, beide im zweiten Lehrjahr. Nicht weil die Halle zu hart war — weil niemand die Berufsschule ernst genommen hat. Montags Klausur, und freitags vorher noch eine Nachtschicht. Das duale System kippt, wenn der Ausbilder selbst in der Produktion steht und die Schule zur Restgröße wird. Die Hochschulen fischen uns außerdem die besten Realschüler ab, mit Versprechen, die nach zwei Semestern verblassen. Ich brauche keine Kampagne. Ich brauche Stunden im Arbeitsvertrag, die Ausbildung heißen und nicht Produktion.",
                },
                {
                  key: "d",
                  text:
                    "Iva Novak, 29, duale Studentin: Ich habe ein Bachelorstudium angefangen und nach drei Semestern abgebrochen: zu viel Theorie, zu wenig Halt. Jetzt mache ich ein duales Studium — drei Tage Betrieb, zwei Hochschule — und zum ersten Mal geht beides zusammen. Ich bekomme Gehalt und am Ende einen Abschluss, den man nicht erklären muss. Was mich ärgert: dual wird immer noch als zweiter Weg verkauft, als Trostpreis für Leute, die an der Uni nicht mitkommen. Im ersten Anlauf habe ich im Wohnheim gewohnt, sechs Quadratmeter und eine Küche für vierzehn. Jetzt stellt der Betrieb eine Werkswohnung. Das ist kein Luxus. Das ist die Bedingung, unter der Lernen und Schicht sich nicht gegenseitig auffressen.",
                },
              ],
              situations: [
                {
                  id: "b2b-l1-1",
                  situation: "Verdient in der Ausbildung eigenes Geld und will keine Schulden machen.",
                  situationEs: "Gana su propio dinero durante la formación y no quiere endeudarse.",
                  answer: "a",
                },
                {
                  id: "b2b-l1-2",
                  situation: "Hat ein Bachelorstudium abgebrochen und studiert jetzt dual.",
                  situationEs: "Dejó una carrera y ahora hace un grado dual.",
                  answer: "d",
                },
                {
                  id: "b2b-l1-3",
                  situation: "Hält die Berufswahl mit sechzehn für zu früh.",
                  situationEs: "Considera demasiado pronto elegir oficio a los dieciséis.",
                  answer: "b",
                },
                {
                  id: "b2b-l1-4",
                  situation: "Hat im letzten Jahr zwei Azubis verloren, weil die Berufsschule zu kurz kam.",
                  situationEs: "El año pasado perdió a dos aprendices porque la escuela profesional quedó en segundo plano.",
                  answer: "c",
                },
                {
                  id: "b2b-l1-5",
                  situation: "Will nach der Prüfung im selben Betrieb bleiben.",
                  situationEs: "Quiere quedarse en la misma empresa después del examen.",
                  answer: "a",
                },
                {
                  id: "b2b-l1-6",
                  situation: "Jobbt als Werkstudent und hat knapp Geld.",
                  situationEs: "Trabaja como estudiante en prácticas remuneradas y anda justo de dinero.",
                  answer: "b",
                },
                {
                  id: "b2b-l1-7",
                  situation: "Sagt, das duale System kippt, wenn Ausbilder selbst in der Produktion stehen.",
                  situationEs: "Dice que el sistema dual se viene abajo si los formadores están ellos mismos en producción.",
                  answer: "c",
                },
                {
                  id: "b2b-l1-8",
                  situation: "Wohnt inzwischen in einer Werkswohnung des Betriebs.",
                  situationEs: "Vive ahora en un piso de empresa.",
                  answer: "d",
                },
                {
                  id: "b2b-l1-9",
                  situation: "Hat nach der Gesellenprüfung den Betrieb gewechselt, weil der Bachelor schicker klingt.",
                  situationEs: "Tras el examen de oficio se cambió de empresa porque el grado quedaba mejor.",
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
              id: "b2b-l2",
              title: "Tablets statt Hefte — und dann?",
              text:
                "Die Gesamtschule am Humboldthain hat zum Schuljahresbeginn alle gedruckten Schulbücher abgeschafft. ___(1)___ Die Geräte gehören der Schule; wer eines beschädigt, zahlt den Ersatz.\n\n" +
                "Entlastung der Kollegien war das Versprechen. ___(2)___ Manche bereiten zwei Versionen vor, digital und analog, falls das Netz wieder hängt.\n\n" +
                "Kritiker halten das Projekt für ein teures Symbol ohne Wirkung. ___(3)___ Eine Evaluation der Humboldt-Universität kommt zu einem anderen Schluss: Die Lesekompetenz ist nicht gesunken, die Quote abgegebener Hausaufgaben leicht gestiegen.\n\n" +
                "Der Senat hat das Modell auf zwölf weitere Schulen ausgeweitet. ___(4)___ Ohne diese Mittel müssten die Kollegien wieder zum Kopierer greifen.\n\n" +
                "Ob das so bleibt, ist offen. ___(5)___ In Estland gilt eine ähnliche Ausstattung seit Jahren, und der Papierverbrauch ist dort messbar zurückgegangen.\n\n" +
                "Für die Schülervertretung wäre ein Zurück ein Rückschritt. ___(6)___ Bis dahin bleibt der Humboldthain das, was er ist: ein Versuch, bei dem ein defektes Netz den ganzen Vormittag kippen kann.",
              sentences: [
                {
                  key: "a",
                  text: "Jede Schülerin und jeder Schüler erhielt ein leihweise überlassenes Tablet mit den Materialien der Fächer.",
                },
                {
                  key: "b",
                  text: "In der Praxis ist der Aufwand gestiegen, nicht gesunken.",
                },
                {
                  key: "c",
                  text: "Sie übersehen, dass Papier, Kopierer und Ersatzbeschaffung denselben Etat jedes Jahr aufgefressen haben.",
                },
                {
                  key: "d",
                  text: "Dafür fließen Mittel aus dem Digitalpakt, gebunden an eine IT-Stelle vor Ort.",
                },
                {
                  key: "e",
                  text: "Das gilt vor allem für die Oberstufe, deren Klausuren weiter auf Papier geschrieben werden.",
                },
                {
                  key: "f",
                  text: "Elternvertretungen fordern die Rückkehr zum Buch, sobald die Garantie der ersten Geräte ausläuft.",
                },
                {
                  key: "g",
                  text: "Wer die Geräte privat kaufen müsste, würde viele Haushalte überfordern.",
                },
                {
                  key: "h",
                  text: "Sie fordert deshalb Reserve-Geräte pro Klasse, nicht die Rückkehr zum Heft.",
                },
              ],
              gaps: [
                { id: "b2b-l2-1", answer: "a" },
                { id: "b2b-l2-2", answer: "b" },
                { id: "b2b-l2-3", answer: "c" },
                { id: "b2b-l2-4", answer: "d" },
                { id: "b2b-l2-5", answer: "f" },
                { id: "b2b-l2-6", answer: "h" },
              ],
            },
          ],
        },
        {
          title: "Lesen · Teil 3",
          instruction:
            "Lesen Sie den Text und die Aufgaben. Wählen Sie die richtige Lösung a, b oder c.",
          instructionEs:
            "Artículo de prensa austriaca sobre el Klimastreik escolar. Seis preguntas. La opción que copia una palabra del texto suele ser el distractor.",
          items: [
            {
              kind: "lesen-mc",
              id: "b2b-l3-1",
              title: "Freitage ohne Tafel (aus einer Wiener Tageszeitung)",
              text:
                "Seit Jänner* verlassen Wiener Schülerinnen und Schüler an ausgewählten Freitagen den Unterricht und ziehen zum Parlament — nicht als Ausflug, sondern mit der Forderung, die Fehlstunden als politische Bildung zu werten. Die Bildungsdirektion hat heuer* zum ersten Mal Zahlen vorgelegt: An 41 Bundesschulen blieb an mindestens einem Freitag im Frühjahr mehr als ein Drittel der Oberstufe der Klasse fern.\n\n" +
                "Die Zahlen sind unbequem, weil sie zwei Dinge zugleich zeigen. Erstens ist der Streik kein Einzelfall mehr. Zweitens trifft er Schulen ungleich: Gymnasien mit Eltern, die den Freitag als Bildung verteidigen, neben Berufsschulen, deren Lehrlinge* an diesem Tag oft ihren einzigen Unterricht der Woche haben. Wer das weglässt, redet über „die Jugend“ und meint eine Klasse im 8. Bezirk.\n\n" +
                "„Wer das als Schwänzen abtut, hat den Lehrplan nicht gelesen“, sagt die Bildungsforscherin Dr. Beate Loos. Politische Bildung sei Pflichtgegenstand, und der Klimastreik sei Unterricht am anderen Ort, sofern danach ein Protokoll geschrieben werde. Besonders hoch sei die Beteiligung an Berufsschulen. Wer an diesem Tag streikt, fehlt nicht „auch“, sondern den ganzen Unterricht der Woche. Ein Protokoll ersetze den Stoff nicht, sagt Loos. Es mache sichtbar, dass der Freitag ein politischer Ort war und kein verlängertes Wochenende.\n\n" +
                "Die Wirtschaftskammer warnt vor Ausfällen in der Lehre und verlangt, Streiks müssten außerhalb der Berufsschulzeit liegen. Loos hält dagegen: Die Wiener Stadtwerke haben in einer Pilotphase Lehrlinge freigestellt, und die versäumten Stunden wurden an anderen Tagen nachgeholt. Ein Metallbetrieb in Favoriten habe das verweigert — dort sei die Streikquote danach nicht gesunken, sondern die Konflikte in der Werkstatt gestiegen. Nachholen heiße nicht, den Freitag zu streichen. Es heiße, die Woche zu strecken, statt die Lehre gegen die Straße auszuspielen.\n\n" +
                "In den Abschlussklassen vor der Matura* ist die Sorge eine andere: Ob eine Fehlstunde die Note drückt. Die Schulen dürfen Streikfreitage als Exkursion werten, müssen es aber nicht. Manche Direktionen verlangen das Protokoll und lassen die Note in Ruhe. Andere zählen jede Stunde als unentschuldigt und hoffen, dass die Oberstufe den Freitag bleiben lässt. Genau diese Spreizung, sagt Loos, erzeuge den Eindruck von Willkür — und Willkür sei das Gegenteil von politischer Bildung.\n\n" +
                "Loos rät zu einer städtischen Regel statt zwölf Interpretationen: Wer den Streik als Bildung begreifen will, solle das Protokoll zur Pflicht machen und die Note davon trennen. Nach dem Juni, sagt sie, sei das Fenster zu — dann sitzen andere in den Bänken. Eine städtische Regel ersetze kein Bundesgesetz. Sie ersetze die Ausrede, jede Schule müsse das Rad allein erfinden, während vor dem Parlament dieselben Schilder stehen.\n\n" +
                "Ob Wien das Protokoll zur Pflicht macht, entscheidet sich nicht in der Werkstatt. Die Tabelle der Bildungsdirektion liegt da: 41 Bundesschulen, ein Freitag, mehr als ein Drittel der Oberstufe. Wer daraus ein generelles Streikrecht ohne Protokoll macht, überzieht. Wer es als Schwänzen verbucht, hat Loos nicht zugehört.",
              footnote:
                "* Jänner = österreichischer Standard für „Januar“ · heuer = „in diesem Jahr“ · Lehrlinge = „Auszubildende“ · Matura = „Abitur“.",
              question: "Was hat die Bildungsdirektion heuer zum ersten Mal vorgelegt?",
              questionEs: "¿Qué ha presentado este año por primera vez la dirección educativa?",
              options: [
                "eine Liste der Betriebe, die Streiks verbieten",
                "Zahlen: an 41 Bundesschulen fehlte an mindestens einem Freitag mehr als ein Drittel der Oberstufe",
                "eine städtische Regel, die Streiks automatisch als Exkursion zählt",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "b2b-l3-2",
              question: "Wie bewertet Loos den Vorwurf, die Schüler schwänzten nur?",
              questionEs: "¿Cómo valora Loos la acusación de que el alumnado solo hace novillos?",
              options: [
                "Sie hält den Vorwurf für berechtigt, weil kein Protokoll verlangt wird.",
                "Sie hält ihn für falsch: politische Bildung sei Pflicht, der Streik Unterricht an anderem Ort — wenn ein Protokoll folgt.",
                "Sie sagt, nur Lehrlinge dürften den Freitag verlassen.",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "b2b-l3-3",
              question: "Warum wiegt der Freitag an Berufsschulen besonders schwer?",
              questionEs: "¿Por qué el viernes pesa especialmente en las escuelas de formación?",
              options: [
                "Weil Lehrlinge an diesem Tag oft ihren einzigen Unterricht der Woche haben.",
                "Weil die Matura immer freitags geschrieben wird.",
                "Weil die Stadtwerke nur freitags ausbilden.",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "b2b-l3-4",
              question: "Welche Forderung stellt die Wirtschaftskammer?",
              questionEs: "¿Qué exige la cámara de comercio?",
              options: [
                "Streiks sollen als Exkursion in die Note eingehen.",
                "Streiks sollen außerhalb der Berufsschulzeit liegen.",
                "Lehrlinge sollen grundsätzlich nicht streiken dürfen.",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "b2b-l3-5",
              question: "Was berichtet der Text über die Wiener Stadtwerke?",
              questionEs: "¿Qué cuenta el texto de las empresas municipales de Viena?",
              options: [
                "Sie haben Lehrlinge freigestellt; die Stunden wurden an anderen Tagen nachgeholt.",
                "Sie haben den Streik verweigert, und die Konflikte in der Werkstatt stiegen.",
                "Sie haben die Berufsschule auf den Montag verlegt.",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "b2b-l3-6",
              question: "Was empfiehlt Loos statt vieler schulischer Einzelentscheidungen?",
              questionEs: "¿Qué recomienda Loos en lugar de que cada colegio decida por su cuenta?",
              options: [
                "die Fehlstunden nach der Matura nachschreiben zu lassen",
                "eine städtische Regel: Protokoll zur Pflicht, Note vom Streik trennen",
                "den Streik nur in Abschlussklassen zu erlauben",
              ],
              answer: 1,
            },
          ],
        },
        {
          title: "Lesen · Teil 4",
          instruction:
            "Lesen Sie die Überschriften und die Meinungen a bis h. Welche Meinung passt zu welcher Überschrift? Mehrere Meinungen bleiben übrig. Eine Überschrift hat keine passende Meinung — wählen Sie dann 0.",
          instructionEs:
            "Seis titulares, ocho opiniones sobre el móvil en el club deportivo. Empareja. Cada opinión se usa una vez; sobran opiniones. Y ojo: para UN titular no hay pareja — ahí la respuesta es 0.",
          items: [
            {
              kind: "lesen-match",
              id: "b2b-l4",
              ads: [
                {
                  key: "a",
                  text:
                    "Ronja Fels, 31, Lehrerin: Nach der siebten Stunde kommt die Sport-AG, und die Hälfte tippt auf der Bank, statt sich umzuziehen. Das Handy macht den Verein zur Wartehalle. Wer Konzentration will, muss das Gerät in die Tasche verbannen — nicht nur in der Klasse, auch in der Halle.",
                },
                {
                  key: "b",
                  text:
                    "Karim Benali, 28, Trainer: Ohne die WhatsApp-Gruppe erfährt die C-Jugend nicht, dass das Training ausfällt. Ein Verbot würde mehr unentschuldigte Fehlzeiten bringen, nicht mehr Gespräch. Organisation ist kein Luxus, wenn die Halle nur 75 Minuten frei ist.",
                },
                {
                  key: "c",
                  text:
                    "Lotte Rabe, 17, Schülerin: Auf dem Platz will ich das Ding nicht sehen. Auf dem Heimweg nach 21 Uhr schon: ohne Verbindung lasse ich mich nach dem Training nicht durch den Park schicken. Verbot während des Sports, ja. Verbot bis zur Haustür, nein.",
                },
                {
                  key: "d",
                  text:
                    "Hana Vuković, 42, Mutter: Der Verein postet Spielbilder mit den Gesichtern meiner Tochter, ohne uns gefragt zu haben. Das ist keine Öffentlichkeitsarbeit, das ist ein Archiv von Minderjährigen im Netz. Ein Account ohne Einwilligung gehört abgeschaltet, nicht gepflegt.",
                },
                {
                  key: "e",
                  text:
                    "Emil Grau, 55, Schulleiter: Bei uns gilt Handyverbot von 8 bis 14 Uhr, und das reicht. Was der Verein abends macht, ist nicht Sache der Schule. Wer beides in einen Topf wirft, sucht einen Schuldigen, wo zwei getrennte Regeln gelten.",
                },
                {
                  key: "f",
                  text:
                    "Yara Mensah, 23, Content-Creatorin: Vereine, die nicht posten, verlieren Mitglieder an die, die es tun. Sichtbarkeit ist heute Mitgliedswerbung. Wer das Handy verteufelt und gleichzeitig über leere Jugendmannschaften klagt, hat den Zusammenhang nicht verstanden.",
                },
                {
                  key: "g",
                  text:
                    "Tomke Asmus, 19, Azubi: Nach acht Stunden Werkstatt muss ich für den Meister erreichbar bleiben, auch auf dem Sportplatz. Ein Totalverbot trifft genau die, deren Betrieb keine festen Schichten kennt. Der Verein ist nicht meine Schule.",
                },
                {
                  key: "h",
                  text:
                    "Friederike Lanz, 64, Nachbarin: Mich stört nicht das Tippen. Mich stört, dass nach den Spielen der Parkplatz voller Hupen ist. Wer über Handys redet und den Lärm vor der Halle ignoriert, diskutiert am eigentlichen Ärgernis vorbei.",
                },
              ],
              situations: [
                {
                  id: "b2b-l4-1",
                  situation: "Ohne den Gruppenchat bricht das Jugendtraining organisatorisch zusammen.",
                  situationEs: "Sin el chat del grupo, el entrenamiento juvenil se desorganiza.",
                  answer: "b",
                },
                {
                  id: "b2b-l4-2",
                  situation: "Fotos von Minderjährigen auf dem Vereinsaccount ohne Einwilligung.",
                  situationEs: "Fotos de menores en la cuenta del club sin consentimiento.",
                  answer: "d",
                },
                {
                  id: "b2b-l4-3",
                  situation: "Nach spätem Training ist das Handy für den Heimweg da, nicht für den Platz.",
                  situationEs: "Después de entrenar tarde, el móvil es para volver a casa, no para el campo.",
                  answer: "c",
                },
                {
                  id: "b2b-l4-4",
                  situation: "Wer nicht im Netz vorkommt, verliert Mitglieder an die, die es tun.",
                  situationEs: "Quien no aparece en la red pierde socios frente a quien sí aparece.",
                  answer: "f",
                },
                {
                  id: "b2b-l4-5",
                  situation: "Die Schule hat schon ein Verbot — der Verein ist eine andere Baustelle.",
                  situationEs: "El colegio ya tiene una prohibición; el club es otro asunto.",
                  answer: "e",
                },
                {
                  id: "b2b-l4-6",
                  situation: "Die Stadt soll jedem Trainer ein Diensthandy zahlen.",
                  situationEs: "El ayuntamiento debería pagar un móvil de empresa a cada entrenador.",
                  answer: "0",
                },
              ],
            },
          ],
        },
        {
          title: "Lesen · Teil 5",
          instruction:
            "Lesen Sie die drei Abschnitte der Wohnheimordnung und die Überschriften a bis g. Welche Überschrift passt zu welchem Abschnitt? Vier Überschriften bleiben übrig.",
          instructionEs:
            "Un reglamento de colegio mayor continuo y siete títulos de índice: tres encajan, cuatro sobran. La respuesta está en la excepción (nur, nicht, ausser), no en la regla general.",
          items: [
            {
              kind: "lesen-match",
              id: "b2b-l5",
              requireNone: false,
              text:
                "Wohnheimordnung des Studierendenwohnheims Winsstraße (gültig ab Wintersemester)\n\n§1 Vertrag und Kaution. Der Mietvertrag gilt semesterweise und verlängert sich nicht stillschweigend. Die Kaution beträgt zwei Monatsmieten und wird spätestens acht Wochen nach Auszug zurückgezahlt, sofern keine Schäden vorliegen und die Schlüssel vollständig abgegeben wurden. Eine Untervermietung ist nur mit schriftlicher Zustimmung der Hausleitung zulässig; Zwischenmiete ohne diese Zustimmung gilt als Vertragsbruch und führt zur fristlosen Kündigung. Die Kündigung muss acht Wochen zum Monatsende eingehen, nicht acht Wochen zu einem beliebigen Tag. Wer das Zimmer vor Semesterende räumt, bleibt bis zum Vertragsende zahlungspflichtig, ausser die Hausleitung benennt eine Nachmieterin, die den Rest übernimmt. Möbel der Stiftung dürfen nicht ausgebaut oder überstrichen werden; Löcher über sechs Millimeter sind Schäden, keine Abnutzung. Haustiere sind unzulässig, ausser Blindenführhunde mit Bescheinigung. Eine zweite Person darf nicht dauerhaft einziehen: der Vertrag gilt für eine Bewohnerin oder einen Bewohner. Bei Zahlungsverzug von mehr als vierzehn Tagen ruht der Zugang zur Waschküche, nicht der zum Zimmer; nach dreissig Tagen ohne Ausgleich kündigt die Hausleitung schriftlich.\n\n§2 Ruhezeiten. Zwischen 22 und 6 Uhr gilt Nachtruhe auf allen Fluren, in den Gemeinschaftsküchen und auf den Balkonen. Besucher nach 23 Uhr sind an der Rezeption anzumelden; unangemeldete Gäste nach Mitternacht werden nicht eingelassen. Übernachtungsgäste sind auf drei Nächte im Monat begrenzt; eine vierte Nacht braucht die Zustimmung der Hausleitung und wird nur erteilt, wenn die Mitbewohnerinnen der Etage nicht schriftlich widersprochen haben. Feiern im Gemeinschaftsraum sind nur nach Anmeldung sieben Tage im Voraus erlaubt, nicht in den Zimmern und nicht auf dem Dach. Musik nach 22 Uhr, auch über Kopfhörer, die den Flur erreicht, gilt als Verstoss. Die Hausleitung kann bei wiederholter Störung das Hausverbot für Gäste der betreffenden Person verhängen, ohne den Mietvertrag selbst zu kündigen. Rauchmelder dürfen nicht abgeklebt werden; ein abgeklebter Melder ist ein Sicherheitsverstoss, kein Kavalierdelikt, und kostet die Kaution anteilig. Wer nach 6 Uhr den Flur putzt, darf das; wer um 5.45 den Staubsauger anwirft, nicht. Die Nachtruhe endet um 6, nicht mit dem ersten Wecker der Etage.\n\n§3 Fahrräder, Küche und Abfall. Fahrräder gehören in den Keller, nicht ins Treppenhaus und nicht an das Geländer der Eingangstür. Räder, die länger als vier Wochen im Hof stehen, werden ohne Ankündigung entfernt; die Abholung ist innert vierzehn Tagen an der Rezeption möglich, danach gilt das Rad als aufgegeben. Die Gemeinschaftsküche wird nach Schichtplan genutzt; wer kocht, spült, und lässt den Herd nicht auf einer fremden Schicht stehen. Müll ist nach Gelb und Blau zu trennen; Restmüll in der Biotonne führt zu einer Umlage auf die Etage, nicht auf die einzelne Person, wenn niemand sich zuordnet. Grillen auf den Balkonen ist untersagt, auch mit Elektrogrill. Der Hofgrill der Stiftung darf nach Anmeldung samstags von 12 bis 20 Uhr genutzt werden, nicht sonntags. Lebensmittel mit Namen im Kühlschrank dürfen drei Tage stehen; unbeschriftetes gilt nach 48 Stunden als preisgegeben. Wer den Kellerraum als Abstellkammer für Umzugskartons nutzt, räumt innert einer Woche. Kartons ohne Datum werden entsorgt. Die Waschküche schliesst um 22 Uhr. Ein Lauf nach 22 Uhr, auch «nur noch schleudern», ist Nachtruhebruch.",
              ads: [
                {
                  key: "a",
                  text: "Vertrag, Kaution und Untervermietung",
                },
                {
                  key: "b",
                  text: "Prüfungen und Anwesenheitspflicht",
                },
                {
                  key: "c",
                  text: "Ruhezeiten und Übernachtungsgäste",
                },
                {
                  key: "d",
                  text: "Fahrräder, Küche und Abfall",
                },
                {
                  key: "e",
                  text: "Mensapreise und Ermässigung",
                },
                {
                  key: "f",
                  text: "Auslandssemester und Partnerschaften",
                },
                {
                  key: "g",
                  text: "Sportanlagen der Hochschule",
                },
              ],
              situations: [
                {
                  id: "b2b-l5-1",
                  situation: "Welcher Titel passt zum Abschnitt über Vertrag, Kaution und Untervermietung?",
                  situationEs: "¿Qué título encaja con el apartado de contrato, fianza y subarriendo?",
                  answer: "a",
                },
                {
                  id: "b2b-l5-2",
                  situation: "Welcher Titel passt zum Abschnitt über Ruhezeiten und Übernachtungsgäste?",
                  situationEs: "¿Qué título encaja con el apartado de silencio y huéspedes?",
                  answer: "c",
                },
                {
                  id: "b2b-l5-3",
                  situation: "Welcher Titel passt zum Abschnitt über Fahrräder, Küche und Abfall?",
                  situationEs: "¿Qué título encaja con el apartado de bicis, cocina y basura?",
                  answer: "d",
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
              id: "b2b-h1-g1",
              twice: false,
              readSeconds: 10,
              dialog: false,
              audio:
                "Hallo Leo, hier ist Sofía. Das Probetraining beim Sportverein ist nicht in der Halle an der Turmstraße, sondern in Wedding, Halle 2. Donnerstag um halb sieben, nicht Freitag. Bring Hallenschuhe mit, die Straßenschuhe bleiben draußen. Nico kommt auch, er hat frei. Wenn du dich anmelden willst, mach das nach dem Training an der Theke, nicht online — die Seite ist seit Montag tot. Bis dann!",
              items: [
                {
                  kind: "hoeren-rf",
                  id: "b2b-h1-1",
                  audio: "",
                  statement: "Das Probetraining findet an der Turmstraße statt.",
                  statementEs: "La prueba de entrenamiento es en Turmstraße.",
                  richtig: false,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2b-h1-2",
                  twice: false,
                  audio: "",
                  question: "Wann und wo soll man sich anmelden?",
                  questionEs: "¿Cuándo y dónde hay que inscribirse?",
                  options: [
                    "online, vor dem Training",
                    "nach dem Training an der Theke",
                    "freitags in der Halle an der Turmstraße",
                  ],
                  answer: 1,
                },
              ],
            },
            {
              kind: "hoeren-group",
              id: "b2b-h1-g2",
              twice: false,
              readSeconds: 10,
              dialog: false,
              audio:
                "Verkehrsmeldung: Wegen der Klimademonstration am Alexanderplatz ist die U8 zwischen Weinmeisterstraße und Alexanderplatz von elf bis fünfzehn Uhr unterbrochen. Es fährt Schienenersatzverkehr. Die S-Bahn-Linien bleiben im Takt. Wer zur Demonstration will, steige bitte an Weinmeisterstraße aus; die Absperrung beginnt am Fernsehturm, nicht am Bahnhof.",
              items: [
                {
                  kind: "hoeren-rf",
                  id: "b2b-h1-3",
                  audio: "",
                  statement: "Die S-Bahn fällt wegen der Demonstration aus.",
                  statementEs: "La S-Bahn se suspende por la manifestación.",
                  richtig: false,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2b-h1-4",
                  twice: false,
                  audio: "",
                  question: "Was gilt für die U8?",
                  questionEs: "¿Qué ocurre con la U8?",
                  options: [
                    "Sie fährt wie immer.",
                    "Ein Abschnitt ist unterbrochen, es gibt Ersatzverkehr.",
                    "Sie endet am Fernsehturm.",
                  ],
                  answer: 1,
                },
              ],
            },
            {
              kind: "hoeren-group",
              id: "b2b-h1-g3",
              twice: false,
              readSeconds: 10,
              dialog: false,
              audio:
                "Sofía, hier ist Anna. Der Verein braucht am Samstag eine Ersthelferin beim Spiel. Ich kann von zehn bis zwölf, nachmittags habe ich Schicht im Krankenhaus. Das Material liegt in der Kabine, nicht im Trainerraum. Wenn Karim noch jemanden für den Nachmittag sucht, soll er nicht mich anrufen, sondern die Bereitschaft der Praxis — Doktor Weber hat Dienst, aber nur bis vierzehn Uhr.",
              items: [
                {
                  kind: "hoeren-rf",
                  id: "b2b-h1-5",
                  audio: "",
                  statement: "Anna kann den ganzen Samstag als Ersthelferin bleiben.",
                  statementEs: "Anna puede quedarse todo el sábado de socorrista.",
                  richtig: false,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2b-h1-6",
                  twice: false,
                  audio: "",
                  question: "Wohin soll Karim sich wenden, wenn er jemanden für den Nachmittag braucht?",
                  questionEs: "¿A quién debe dirigirse Karim si necesita a alguien por la tarde?",
                  options: [
                    "an Anna nach der Schicht",
                    "an die Bereitschaft der Praxis",
                    "an den Trainerraum",
                  ],
                  answer: 1,
                },
              ],
            },
            {
              kind: "hoeren-group",
              id: "b2b-h1-g4",
              twice: false,
              readSeconds: 10,
              dialog: false,
              audio:
                "Hier ist Vogel, Ihr Nachbar. Die Fahrräder aus dem Studentenwohnheim stehen wieder im Hof und versperren den Keller. Der Hausmeister kommt erst Dienstag. Bitte stellen Sie die Räder bis Montagabend in den Fahrradkeller, nicht an die Rampe. Ich habe nichts gegen die Studierenden. Ich habe etwas dagegen, dass ich meinen Rollator nicht durchbekomme.",
              items: [
                {
                  kind: "hoeren-rf",
                  id: "b2b-h1-7",
                  audio: "",
                  statement: "Der Hausmeister kommt bereits am Montag.",
                  statementEs: "El conserje viene ya el lunes.",
                  richtig: false,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2b-h1-8",
                  twice: false,
                  audio: "",
                  question: "Wohin sollen die Fahrräder bis Montagabend?",
                  questionEs: "¿Adónde tienen que ir las bicis antes del lunes por la noche?",
                  options: [
                    "an die Rampe",
                    "in den Fahrradkeller",
                    "vor die Wohnungstür von Herrn Vogel",
                  ],
                  answer: 1,
                },
              ],
            },
            {
              kind: "hoeren-group",
              id: "b2b-h1-g5",
              twice: false,
              readSeconds: 10,
              dialog: false,
              audio:
                "Sofía, Lucía hier. Die Besichtigung des WG-Zimmers ist Donnerstag um siebzehn Uhr, nicht um achtzehn. Bring die Schufa und die Immatrikulationsbescheinigung mit; ohne die beiden Papiere schauen sie dich nicht an. Die Miete ist 420 Euro plus 80 Nebenkosten. Haustiere sind nicht erlaubt. Die Bescheinigung von Doktor Weber fürs Wohnheim — Plan B, falls die WG platzt — kannst du nach sechzehn Uhr in der Praxis abholen, nicht am Empfang der Hochschule.",
              items: [
                {
                  kind: "hoeren-rf",
                  id: "b2b-h1-9",
                  audio: "",
                  statement: "In der WG sind Haustiere erlaubt.",
                  statementEs: "En el piso compartido se permiten animales.",
                  richtig: false,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2b-h1-10",
                  twice: false,
                  audio: "",
                  question: "Was muss Lucía zur Besichtigung mitbringen?",
                  questionEs: "¿Qué tiene que llevar Lucía a la visita?",
                  options: [
                    "nur die Immatrikulation",
                    "Schufa und Immatrikulationsbescheinigung",
                    "die Bescheinigung von Doktor Weber",
                  ],
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
            "Entrevista de radio, DOS veces. Seis preguntas a/b/c. Sesenta segundos para leerlas antes: úsalos. Quien habla dirige un consorcio de formación dual, no un instituto.",
          items: [
            {
              kind: "hoeren-group",
              id: "b2b-h2",
              twice: true,
              readSeconds: 60,
              dialog: true,
              audio:
                "Im Studio ist Dunja Kovač, sie leitet einen Ausbildungsverbund in Berlin. Frau Kovač, warum brauchen kleine Betriebe einen Verbund? | " +
                "Weil ein Café allein keine Mechatronikerin ausbilden kann. Im Verbund teilen sich acht Häuser eine Azubi-Stelle: die Praxis rotiert, die Berufsschule bleibt. Ohne das Modell gäbe es in Prenzlauer Berg keine dualen Plätze außerhalb der großen Ketten. | " +
                "Und die Abbrecher? | " +
                "Letztes Jahr sind von vierundzwanzig zwei gegangen, beide im ersten Halbjahr. Nicht wegen der Arbeit — weil niemand ihnen die Berufsschulhefte erklärt hat. Deshalb sitzt bei uns mittwochs eine Lernbegleitung im Verbundbüro, Pflicht, nicht Kür. Wer da nicht auftaucht, hat ein Gespräch, nicht gleich die Kündigung. | " +
                "Digitalisieren Sie die Schule? | " +
                "Die Plattform ja, den Unterricht nicht. Ein Tablet ersetzt keine Meisterin, die sagt, warum die Naht reißt. Wir haben Tablets ausgegeben und nach einem Semester die Hälfte wieder eingesammelt: die Geräte lagen in der Tasche, die Hefte waren voller. | " +
                "Was ärgert Sie an der Politik? | " +
                "Broschüren. Jede Kampagne verspricht „mehr Azubis“, und niemand finanziert die Stunden der Ausbilder. Ich brauche keine Plakate in der U-Bahn. Ich brauche, dass ein Bäckermeister nicht gleichzeitig den Ofen und die Lehre schmeißt. | " +
                "Auslandspraktika? | " +
                "Ja, aber erst im zweiten Jahr, und nur wenn die Berufsschule den Block verschieben kann. Ein Monat in Lyon nützt nichts, wenn danach drei Klausuren in einer Woche liegen. | " +
                "Frau Kovač, danke.",
              items: [
                {
                  kind: "hoeren-mc",
                  id: "b2b-h2-1",
                  twice: true,
                  audio: "",
                  question: "Wozu dient der Ausbildungsverbund laut Frau Kovač?",
                  questionEs: "¿Para qué sirve el consorcio de formación, según la señora Kovač?",
                  options: [
                    "große Ketten ersetzen die Berufsschule",
                    "kleine Betriebe teilen sich Ausbildungsplätze, die Schule bleibt",
                    "Azubis wechseln jede Woche die Stadt",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2b-h2-2",
                  twice: true,
                  audio: "",
                  question: "Warum sind die zwei Abbrecher gegangen?",
                  questionEs: "¿Por qué se fueron los dos que abandonaron?",
                  options: [
                    "weil die Arbeit zu hart war",
                    "weil ihnen niemand die Berufsschulhefte erklärt hat",
                    "weil der Verbund gekündigt hat",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2b-h2-3",
                  twice: true,
                  audio: "",
                  question: "Was gilt mittwochs im Verbundbüro?",
                  questionEs: "¿Qué rige los miércoles en la oficina del consorcio?",
                  options: [
                    "freiwillige Nachhilfe",
                    "Lernbegleitung, Pflicht",
                    "sofortige Kündigung bei Fehlen",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2b-h2-4",
                  twice: true,
                  audio: "",
                  question: "Wie steht Frau Kovač zu Tablets in der Ausbildung?",
                  questionEs: "¿Qué opina la señora Kovač de las tabletas en la formación?",
                  options: [
                    "Der Unterricht soll vollständig digital laufen.",
                    "Die Plattform ja — den Unterricht ersetzt kein Tablet; die Hälfte der Geräte kam zurück.",
                    "Tablets seien die Bedingung für Auslandspraktika.",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2b-h2-5",
                  twice: true,
                  audio: "",
                  question: "Was wünscht sie sich von der Politik statt Kampagnen?",
                  questionEs: "¿Qué le pide a la política en lugar de campañas?",
                  options: [
                    "mehr Plakate in der U-Bahn",
                    "finanzierte Stunden für die Ausbilder",
                    "weniger Berufsschule",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2b-h2-6",
                  twice: true,
                  audio: "",
                  question: "Wann kommen Auslandspraktika für sie infrage?",
                  questionEs: "¿Cuándo contempla ella las prácticas en el extranjero?",
                  options: [
                    "im ersten Monat der Lehre",
                    "im zweiten Jahr, und nur wenn die Berufsschule den Block verschieben kann",
                    "nach drei Klausuren in einer Woche",
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
              id: "b2b-h3",
              twice: false,
              readSeconds: 60,
              dialog: true,
              audio:
                "Elke Bruns: Willkommen bei Stadtgespräch. Unser Thema: Sollen Schülerinnen und Schüler fürs Klima den Unterricht verlassen dürfen? Bei mir sind Leo, Student in Berlin, und Wiebke Harms, Lehrerin an einem Gymnasium. Leo, Sie waren selbst auf der Straße. | " +
                "Leo: Ja, dreimal. Das war kein Schwänzen. Wer den Streik als Ungehorsam rahmt, hat nicht kapiert, dass politische Bildung im Lehrplan steht. Meine Noten sind nicht gefallen. Was fällt, ist die Glaubwürdigkeit der Schule, wenn sie das Thema in der Stunde behandelt und den Freitag bestraft. | " +
                "Wiebke Harms: Die Sache verstehe ich. Zwei Freitage hintereinander treffen aber genau die, die den Stoff schon jetzt nur knapp halten. Ich biete eine Projektwoche an, mit Messungen, mit Texten — das ist Unterricht. Rauslaufen ohne Auftrag ist für mich kein Unterricht, auch wenn die Sache stimmt. | " +
                "Elke Bruns: Ich muss sagen, der blinde Fleck ist die Berufsschule. Für viele Azubis ist der Freitag der einzige Schultag. Wer den streicht, streicht die Woche, nicht eine Doppelstunde. Darüber redet das Gymnasium zu wenig. | " +
                "Leo: Dann legt die Berufsschule den Block um. Das ist Organisation, kein Argument gegen den Streik. | " +
                "Wiebke Harms: Umlegen heißt: jemand arbeitet samstags nach. Das ist leicht gesagt, wenn man selbst keine Schicht hat. | " +
                "Elke Bruns: Ein Vorschlag, den beide unterschätzen: Streik als Exkursion zählen, aber nur mit Protokoll. Ohne Text keine Anerkennung — sonst wird aus Bildung ein freier Vormittag. | " +
                "Leo: Ein Protokoll kann ich mittragen. Eine Note fürs Fernbleiben nicht. | " +
                "Wiebke Harms: Da gebe ich Ihnen recht. Die Note gehört an die Arbeit, nicht an die Abwesenheit. | " +
                "Elke Bruns: Ein Satz, mit dem man enden kann. Danke Ihnen beiden.",
              items: [
                {
                  kind: "hoeren-wersagt",
                  id: "b2b-h3-1",
                  speakers: [
                    { key: "a", name: "die Moderatorin Elke Bruns" },
                    { key: "b", name: "der Student Leo" },
                    { key: "c", name: "die Lehrerin Wiebke Harms" },
                  ],
                  statement:
                    "Politische Bildung steht im Lehrplan; den Streik als Ungehorsam zu rahmen, trifft die Sache nicht.",
                  statementEs:
                    "La educación política está en el temario; llamar desobediencia a la huelga no da en el clavo.",
                  answer: "b",
                },
                {
                  kind: "hoeren-wersagt",
                  id: "b2b-h3-2",
                  speakers: [
                    { key: "a", name: "die Moderatorin Elke Bruns" },
                    { key: "b", name: "der Student Leo" },
                    { key: "c", name: "die Lehrerin Wiebke Harms" },
                  ],
                  statement:
                    "Zwei Freitage hintereinander treffen vor allem die, die den Stoff schon knapp halten.",
                  statementEs:
                    "Dos viernes seguidos golpean sobre todo a quien ya va justo de materia.",
                  answer: "c",
                },
                {
                  kind: "hoeren-wersagt",
                  id: "b2b-h3-3",
                  speakers: [
                    { key: "a", name: "die Moderatorin Elke Bruns" },
                    { key: "b", name: "der Student Leo" },
                    { key: "c", name: "die Lehrerin Wiebke Harms" },
                  ],
                  statement:
                    "Für viele Azubis ist der Freitag der einzige Schultag — wer den streicht, streicht die Woche.",
                  statementEs:
                    "Para muchos aprendices el viernes es el único día de clase: quien lo tacha, tacha la semana.",
                  answer: "a",
                },
                {
                  kind: "hoeren-wersagt",
                  id: "b2b-h3-4",
                  speakers: [
                    { key: "a", name: "die Moderatorin Elke Bruns" },
                    { key: "b", name: "der Student Leo" },
                    { key: "c", name: "die Lehrerin Wiebke Harms" },
                  ],
                  statement:
                    "Den Block umzulegen ist Organisation, kein Argument gegen den Streik.",
                  statementEs:
                    "Mover el bloque es organización, no un argumento contra la huelga.",
                  answer: "b",
                },
                {
                  kind: "hoeren-wersagt",
                  id: "b2b-h3-5",
                  speakers: [
                    { key: "a", name: "die Moderatorin Elke Bruns" },
                    { key: "b", name: "der Student Leo" },
                    { key: "c", name: "die Lehrerin Wiebke Harms" },
                  ],
                  statement:
                    "Streik als Exkursion zählen, aber nur mit Protokoll — sonst wird daraus ein freier Vormittag.",
                  statementEs:
                    "Contar la huelga como excursión, pero solo con acta: si no, se convierte en una mañana libre.",
                  answer: "a",
                },
                {
                  kind: "hoeren-wersagt",
                  id: "b2b-h3-6",
                  speakers: [
                    { key: "a", name: "die Moderatorin Elke Bruns" },
                    { key: "b", name: "der Student Leo" },
                    { key: "c", name: "die Lehrerin Wiebke Harms" },
                  ],
                  statement:
                    "Die Note gehört an die Arbeit, nicht an die Abwesenheit.",
                  statementEs:
                    "La nota va al trabajo, no a la ausencia.",
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
              id: "b2b-h4",
              twice: true,
              readSeconds: 60,
              dialog: false,
              audio:
                "Guten Abend. Mein Name ist Malte Quirin, ich forsche am Institut für Stadtentwicklung zu studentischem Wohnen in Berlin, und ich spreche heute nicht über Lifestyle, sondern über Zahlen, die eine Stadtpolitik sind. " +
                "Erstens die Lücke: Berlin hat rund 190.000 Studierende und etwa 18.000 Wohnheimplätze. Das ist weniger als jeder Zehnte. Der Rest sucht WG-Zimmer, Zwischenmiete, das Sofa einer Tante. Wer das als Jugendabenteuer verkauft, hat die Mietspiegel nicht gelesen. " +
                "Zweitens der Preis. Ein WG-Zimmer in den Innenbezirken liegt im Schnitt bei 550 Euro kalt. Vor zehn Jahren waren es 380. Das ist kein Markt, der sich selbst reguliert; das ist ein Markt, der Studierende an den Rand schiebt oder in befristete Zwischenmieten, die nach sechs Monaten wieder bei null anfangen. " +
                "Drittens die Zweckentfremdung. Wohnungen, die als Ferienunterkunft laufen, fehlen im Bestand. Eine Kontrolle, die nur auf Anzeige wartet, ist keine Kontrolle. In einem Kiez haben wir in einem Jahr 40 Fälle gefunden, die niemand gemeldet hatte. " +
                "Was nicht hilft: Mikroapartments für 900 Euro, vermarktet als „urbanes Wohnen“. Das ist kein Wohnheim mit anderem Namen. Das ist ein Produkt für Eltern, die zahlen können. " +
                "Was hilft: städtische Wohnheime, die nicht an Semesterticket-Romantik hängen, sondern an Bindung — zehn Jahre Zweckbindung mindestens. Und eine Kappung der Zweckentfremdung, die ohne Anzeige auskommt. " +
                "Was wir nicht tun sollten: das Thema den Hochschulen allein überlassen. Wohnen ist Infrastruktur, wie die Bahn. Wer nur Seminare plant und keine Betten, plant halbe Biografien. " +
                "Ich danke Ihnen. Fragen am Ende, nicht zwischendurch — und ja, auch ich habe sechs Jahre in einer WG gewohnt, 18 Quadratmeter, kein Märchen.",
              items: [
                {
                  kind: "hoeren-mc",
                  id: "b2b-h4-1",
                  twice: true,
                  audio: "",
                  question: "Wie groß ist die Lücke zwischen Studierenden und Wohnheimplätzen?",
                  questionEs: "¿Cuál es el desfase entre estudiantes y plazas de residencia?",
                  options: [
                    "190.000 Plätze für 18.000 Studierende",
                    "etwa 18.000 Plätze bei rund 190.000 Studierenden — weniger als jeder Zehnte",
                    "jeder zweite Studierende hat einen Platz",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2b-h4-2",
                  twice: true,
                  audio: "",
                  question: "Wo liegt der Schnitt für ein WG-Zimmer in den Innenbezirken?",
                  questionEs: "¿En cuánto está de media una habitación en piso compartido en los barrios céntricos?",
                  options: [
                    "bei 380 Euro kalt",
                    "bei 550 Euro kalt",
                    "bei 900 Euro warm",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2b-h4-3",
                  twice: true,
                  audio: "",
                  question: "Was sagt Quirin zur Zweckentfremdung?",
                  questionEs: "¿Qué dice Quirin sobre el cambio de uso de viviendas?",
                  options: [
                    "Eine Kontrolle, die nur auf Anzeige wartet, ist keine Kontrolle.",
                    "Ferienunterkünfte füllen die Lücke der Wohnheime.",
                    "In einem Jahr gab es keine ungemeldeten Fälle.",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2b-h4-4",
                  twice: true,
                  audio: "",
                  question: "Wie bewertet er Mikroapartments für 900 Euro?",
                  questionEs: "¿Cómo valora los microapartamentos a 900 euros?",
                  options: [
                    "als Wohnheime mit anderem Namen",
                    "als Produkt für Eltern, die zahlen können, nicht als Lösung",
                    "als städtische Bindung über zehn Jahre",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2b-h4-5",
                  twice: true,
                  audio: "",
                  question: "Welche Bindung fordert er für städtische Wohnheime?",
                  questionEs: "¿Qué vinculación exige para las residencias municipales?",
                  options: [
                    "Bindung an das Semesterticket",
                    "mindestens zehn Jahre Zweckbindung",
                    "Bindung an die Hochschule allein",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2b-h4-6",
                  twice: true,
                  audio: "",
                  question: "Wem sollte das Thema laut Quirin nicht allein überlassen werden?",
                  questionEs: "¿A quién no debería dejársele el tema en exclusiva, según Quirin?",
                  options: [
                    "den Hochschulen allein",
                    "der Stadtplanung",
                    "den Vermietern",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2b-h4-7",
                  twice: true,
                  audio: "",
                  question: "Womit vergleicht er das Wohnen?",
                  questionEs: "¿Con qué compara la vivienda?",
                  options: [
                    "mit einem Jugendabenteuer",
                    "mit Infrastruktur, wie der Bahn",
                    "mit einem Seminarplan",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "b2b-h4-8",
                  twice: true,
                  audio: "",
                  question: "Wann sollen die Zuhörer Fragen stellen?",
                  questionEs: "¿Cuándo deben preguntar los oyentes?",
                  options: [
                    "zwischendurch, sobald eine Zahl unklar ist",
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
              id: "b2b-s1",
              task:
                "Verfassen Sie einen Forumsbeitrag. Machen Sie Ihre Position kenntlich und stützen Sie sie mit Gründen.",
              taskEs:
                "Redacta un mensaje al foro. Deja clara tu postura y apóyala con razones.",
              stimulus: {
                source: "Ausbildungsforum · Beitrag von Pflichtjahr22",
                text:
                  "Jeder Schulabgänger sollte ein Pflichtjahr in der dualen Ausbildung machen, bevor er studieren darf. Wer nie eine Werkstatt, eine Küche oder ein Lager von innen gesehen hat, wählt das Studium aus dem Bauch und bricht nach zwei Semestern ab. Die Betriebe hätten Nachwuchs, die Hochschulen weniger Abbrecher, und niemand müsste sich für eine Lehre schämen. Ein Jahr ist zumutbar. Ein Leben ohne Handwerk nicht.",
              },
              points: [
                "Di claramente si estás de acuerdo con Pflichtjahr22 o no",
                "Nombra al menos una ventaja y un inconveniente de un año obligatorio en formación dual",
                "Haz una propuesta concreta (quién, cuánto tiempo, excepciones)",
                "Cierra con una conclusión",
              ],
              words: 150,
              points_max: 60,
              rubric: RUBRIC_SCHREIBEN_60,
              model:
                "Pflichtjahr22 benennt ein echtes Problem, die Pflicht halte ich trotzdem für die falsche Schraube.\n\n" +
                "Einerseits ist unbestritten, dass viele ein Studium beginnen, ohne je einen Betrieb von innen gesehen zu haben, und dass Abbrecherquoten teuer sind — für die Person und für die Hochschule.\n\n" +
                "Andererseits zwingt ein Pflichtjahr genau die in die Halle, die dort nicht bleiben werden, und blockiert Plätze, die Azubis brauchen, die wirklich bleiben wollen. Ein Jahr unter Zwang ist keine Orientierung, es ist Warteschleife.\n\n" +
                "Mein Vorschlag: ein freiwilliges Orientierungssemester im Verbund, anerkannt als Praktikum, mit Rückkehrrecht an die Schule, und gezielte Plätze für Realschüler, nicht eine Pflicht für alle Abiturienten.\n\n" +
                "Kurz: mehr Berührung mit dem Betrieb, nicht mehr Zwang.",
            },
          ],
        },
        {
          title: "Schreiben · Aufgabe 2 (25 Minuten · 40 Punkte)",
          instruction:
            "Schreiben Sie eine Nachricht an Ihre Vorgesetzte (circa 100 Wörter). Beachten Sie Anrede und Gruß. Bearbeiten Sie alle inhaltlichen Punkte.",
          instructionEs:
            "Mensaje a una superior jerárquica, ~100 palabras, registro Sie, Anrede y Gruß obligatorios. Los puntos de contenido en un orden lógico. E en Erfüllung = 0.",
          items: [
            {
              kind: "schreiben-message",
              id: "b2b-s2",
              task:
                "Sie können den Stand Ihrer Firma auf der Azubi-Messe am 14. Juni nicht betreuen. Schreiben Sie an Ihre Vorgesetzte, Frau Lembke.",
              taskEs:
                "No puedes atender el stand de la empresa en la feria de formación del 14 de junio. Escribe a tu jefa, la señora Lembke.",
              points: [
                "Discúlpate y explica por qué no puedes (un motivo profesional serio)",
                "Propón una alternativa (otra persona, otro tramo horario, material ya preparado)",
                "Pregunta qué Unterlagen puedes dejar listas y ofrece un kurzes Gespräch",
              ],
              words: 100,
              points_max: 40,
              rubric: RUBRIC_SCHREIBEN_40,
              model:
                "Sehr geehrte Frau Lembke,\n\n" +
                "leider kann ich den Stand auf der Azubi-Messe am 14. Juni nicht betreuen. An diesem Tag geht unser Release raus; ein Ersatz in der Entwicklung ist kurzfristig nicht zu organisieren.\n\n" +
                "Könnte eine Kollegin aus dem Team den Vormittag übernehmen? Die Flyer und das Anmeldeformular hätte ich bis Mittwoch fertig. Alternativ würde ich den Stand am Freitagnachmittag ablösen, sobald das Release steht.\n\n" +
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
              id: "b2b-sp1",
              teil: 1,
              weight: 52,
              prepSeconds: 480,
              speakSeconds: 240,
              prompt:
                "Thema 1 — Sollten Sportvereine für Schülerinnen und Schüler kostenlos sein?\n" +
                "Thema 2 — Braucht Berlin zuerst mehr studentische Wohnheime oder zuerst einen Preisdeckel für WG-Zimmer?\n\n" +
                "Gliedern Sie selbst: Einstieg, zwei oder drei Punkte mit Beispiel, ein Einwand, Schluss. Anschließend beantworten Sie eine Frage der Partnerin oder des Partners und eine der Prüferin.",
              promptEs:
                "Tema 1: ¿deberían ser gratis los clubes deportivos para el alumnado? Tema 2: ¿Berlín necesita primero más residencias de estudiantes o un tope al precio de las habitaciones en pisos compartidos? Estructura tuya. Luego respondes a una pregunta del compañero y a una de la examinadora.",
              model:
                "In meinem Vortrag geht es um die Frage, ob Sportvereine für Schülerinnen und Schüler kostenlos sein sollten. Ich habe dieses Thema gewählt, weil in meinem Umfeld die Mitgliedschaft oft genau dann endet, wenn die Familie das Geld braucht — nicht wenn die Lust aufhört.\n\n" +
                "Ein erstes Argument ist die Teilhabe. Wer mit zwölf aufhört, weil der Beitrag steigt, kommt mit sechzehn selten zurück. Ein zweites Argument ist die Stadt: Hallenzeiten, die leer bleiben, weil nur zahlende Mitglieder zählen, sind verschwendete Infrastruktur.\n\n" +
                "Ein Gegenargument ernst nehmen: Trainer, Bälle, Versicherung — das kostet. Kostenlos ohne Ersatz ist kein Recht, sondern ein Verein, der in zwei Jahren schließt. Deshalb würde ich nicht „umsonst für alle“ sagen, sondern einen städtischen Zuschuss für unter 18, gebunden an Anwesenheit, nicht an das Konto der Eltern.\n\n" +
                "Zusammenfassend: Zugang ohne Beitrag für die, die zur Schule gehen, finanziert von der Stadt, nicht vom Trainer, der schon unbezahlt da steht. Vielen Dank. Fragen beantworte ich gern — etwa, wie kleine Vereine ohne Geschäftsstelle den Zuschuss beantragen.",
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
              id: "b2b-sp2",
              teil: 2,
              weight: 48,
              prepSeconds: 420,
              speakSeconds: 300,
              prompt:
                "Streitfrage: Schulstreiks für das Klima — legitimes politisches Mittel oder Verletzung der Schulpflicht?\n\n" +
                "Person A ist dafür: politische Bildung, öffentliche Aufmerksamkeit, die Schule darf das Thema nicht nur in der Stunde behandeln.\n" +
                "Person B ist dagegen: Stoff bleibt liegen, Azubis verlieren ihren einzigen Schultag, Protest gehört auf den Nachmittag.\n\n" +
                "Verteidigen Sie Ihre Position, gehen Sie auf die Argumente der anderen Person ein und suchen Sie, ob es eine gemeinsame Grenze gibt (Protokoll, Exkursion, Nachmittag, Berufsschule).",
              promptEs:
                "¿Huelgas escolares por el clima: medio político legítimo o incumplimiento de la escolarización? A a favor, B en contra. Defiende tu lado, recoge lo del otro y mira si hay un límite común (acta, excursión, tarde, escuela de formación).",
              model:
                "A: Grundsätzlich halte ich den Streik für den ehrlicheren Unterricht. Wer Klima nur in der Stunde thematisiert und den Freitag bestraft, unterrichtet das Gegenteil von politischer Bildung. — B: Da haben Sie einen Punkt bei der Glaubwürdigkeit. Allerdings überzeugt mich nicht, dass man deshalb zwei Freitage hintereinander den Stoff liegen lässt. Genau die, die knapp sind, verlieren den Anschluss. — A: Dann machen wir ein Protokoll zur Pflicht und zählen den Tag als Exkursion, nicht als Freistunde. — B: Ein Protokoll kann ich mittragen, ein Freitag ohne Auftrag nicht. Und die Berufsschule muss den Block umlegen können, sonst streichen wir Azubis die Woche. — A: Unter der Voraussetzung, dass der Nachmittag für Berufsschulen tabu bleibt und das Gymnasium ein Protokoll verlangt, ja. Dann reden wir über Regeln, nicht über Moral.",
              rubric: RUBRIC_SPRECHEN_T2,
            },
          ],
        },
      ],
    },
  ],
};
