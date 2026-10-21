import type { ExamSet } from "@/lib/examTypes";

// ─────────────────────────────────────────────────────────────────────────────
// Modellsatz A2 A — Goethe-Zertifikat A2 (formato vigente, no el Fit in
// Deutsch 2 derogado). Tema: vida de barrio — biblioteca, club de senderismo,
// curso de cocina de la VHS, fiesta vecinal y mercado de trueque. DISTINTO
// de los módulos A2 (casa, compras, trabajo, salud, trámites) y del
// Modellsatz B1 (voluntariado, segunda mano, perros, jobs de estudiante).
//
//   HÖREN   ~30′ · 4 Teile · 20 ítems  → T1 cinco textos ×2 · T2 un Gespräch
//                                         ×1 (emparejar) · T3 cinco diálogos
//                                         ×1 · T4 entrevista ×2 R/F
//   LESEN   30′ · 4 Teile · 20 ítems   → revista · programa · correo · Anzeigen
//   SCHREIBEN 30′ · 2 tareas            → SMS 20-30 / correo Sie 30-40, 3 Punkte,
//                                         schreiben-message SIN rúbrica B1
//   SPRECHEN  ~15′ en pareja · 3 Teile
// Baremo Goethe: aprobado ≥60 %, NO modular, las cuatro destrezas se compensan.
// ─────────────────────────────────────────────────────────────────────────────

export const examA2A: ExamSet = {
  id: "a2-sim-a",
  level: "a2",
  title: "Modellsatz A2 A",
  description:
    "Simulacro completo del Goethe-Zertifikat A2: la vida de barrio — biblioteca, senderismo, curso de cocina y fiesta vecinal. Hören ~30′, Lesen 30′, Schreiben 30′ y Sprechen en pareja. Se aprueba con el 60 % del total.",
  scoring: {
    passPct: 60,
    bands: [
      { min: 90, label: "sehr gut" },
      { min: 80, label: "gut" },
      { min: 70, label: "befriedigend" },
      { min: 60, label: "ausreichend" },
      { min: 0, label: "nicht bestanden" },
    ],
  },
  sections: [
    // ══════════════════════════ HÖREN · ~30 min · 20 ═════════════════════
    {
      skill: "hoeren",
      label: "Hören",
      minutes: 30,
      teile: [
        {
          title: "Hören · Teil 1",
          instruction:
            "Sie hören fünf kurze Texte. Sie hören jeden Text zweimal. Wählen Sie die richtige Lösung a, b oder c.",
          instructionEs:
            "Escuchas cinco textos cortos. Cada uno suena DOS veces. Elige a, b o c. Antes de cada audio, lee la pregunta y decide qué dato vas a cazar: una hora, un precio, un lugar.",
          items: [
            {
              kind: "hoeren-mc",
              id: "a2a-h1-1",
              audio:
                "Liebe Leserinnen und Leser, die Stadtteilbibliothek ist am Donnerstag wegen Inventur geschlossen. Am Freitag sind wir wieder von zehn bis achtzehn Uhr für Sie da. Medien können Sie bis Mittwochabend zurückgeben.",
              twice: true,
              question: "Wann ist die Bibliothek geschlossen?",
              questionEs: "¿Cuándo está cerrada la biblioteca?",
              options: ["Am Mittwoch", "Am Donnerstag", "Am Freitag"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "a2a-h1-2",
              audio:
                "Hallo Wanderfreunde, hier ist der Verein Bergblick. Am Samstag starten wir nicht um neun, sondern schon um acht Uhr am Bahnhof. Bitte feste Schuhe mitbringen. Die Tour dauert ungefähr vier Stunden.",
              twice: true,
              question: "Wann beginnt die Wanderung?",
              questionEs: "¿A qué hora empieza la ruta?",
              options: ["Um 8 Uhr", "Um 9 Uhr", "Um 4 Uhr"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "a2a-h1-3",
              audio:
                "Guten Tag, hier ist die Volkshochschule. Für den Kochkurs am Mittwoch bringen Sie bitte Gemüse mit. Töpfe und Messer haben wir hier. Der Kurs kostet acht Euro, Getränke gibt es gratis.",
              twice: true,
              question: "Was sollen die Teilnehmer mitbringen?",
              questionEs: "¿Qué deben traer los participantes?",
              options: ["Töpfe", "Gemüse", "Getränke"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "a2a-h1-4",
              audio:
                "Achtung Fahrgäste: Wegen des Straßenfestes fährt die Linie vier am Sonntag nicht. Bitte nehmen Sie die Buslinie zwölf. Die Haltestelle ist vor der Post.",
              twice: true,
              question: "Welche Linie fährt am Sonntag zum Fest?",
              questionEs: "¿Qué línea circula el domingo hacia la fiesta?",
              options: ["Linie 4", "Linie 12", "keine Linie"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "a2a-h1-5",
              audio:
                "Hallo, hier ist das Nachbarschaftszentrum. Für den Tauschmarkt am Samstag kostet ein Tisch fünf Euro. Bitte bis Freitag im Büro anmelden. Essen und Getränke dürfen Sie nicht verkaufen.",
              twice: true,
              question: "Was kostet ein Tisch am Tauschmarkt?",
              questionEs: "¿Cuánto cuesta una mesa en el mercado de trueque?",
              options: ["nichts", "5 Euro", "bis Freitag"],
              answer: 1,
            },
          ],
        },
        {
          title: "Hören · Teil 2",
          instruction:
            "Sie hören ein Gespräch. Sie hören das Gespräch einmal. Ordnen Sie die Fotos a–i zu. Vier Fotos bleiben übrig.",
          instructionEs:
            "Escuchas UNA conversación, UNA sola vez. Empareja cada pregunta con una foto (a–i). Sobran cuatro fotos. Lee las cinco preguntas antes: no hay segunda pasada.",
          items: [
            {
              kind: "hoeren-photo-match",
              id: "a2a-h2",
              audio:
                "Ibrahim, wie sieht deine Woche aus? | " +
                "Am Montag habe ich Deutschkurs, von sechs bis acht. | " +
                "Und Dienstag? | " +
                "Dienstag arbeite ich bis fünf. Du, Maren, gehst doch in die Bibliothek, oder? | " +
                "Ja, Dienstag Nachmittag. Am Mittwoch machen wir zusammen den Kochkurs, um achtzehn Uhr. | " +
                "Super. Donnerstag kann ich nicht zum Sport, ich muss zum Bürgeramt. | " +
                "Dann gehen wir Freitag zum Nachbarschaftsfest. Ich backe den Kuchen. | " +
                "Gut. Ich bringe die Getränke. Wandern gehen wir dieses Wochenende nicht. Bis Freitag!",
              twice: false,
              dialog: true,
              readSeconds: 30,
              photos: [
                { key: "a", scene: "library", sceneEs: "Una biblioteca" },
                { key: "b", scene: "kitchen", sceneEs: "Una cocina" },
                { key: "c", scene: "office", sceneEs: "Un aula o despacho" },
                { key: "d", scene: "park", sceneEs: "Un parque" },
                { key: "e", scene: "festival", sceneEs: "Una fiesta en la calle" },
                { key: "f", scene: "bakery", sceneEs: "Una panadería" },
                { key: "g", scene: "sport", sceneEs: "Un polideportivo" },
                { key: "h", scene: "amt", sceneEs: "Una oficina pública" },
                { key: "i", scene: "market", sceneEs: "Un mercado" },
              ],
              items: [
                {
                  id: "a2a-h2-1",
                  prompt: "Was macht Ibrahim am Montag?",
                  promptEs: "¿Qué hace Ibrahim el lunes?",
                  answer: "c",
                },
                {
                  id: "a2a-h2-2",
                  prompt: "Was macht Maren am Dienstag?",
                  promptEs: "¿Qué hace Maren el martes?",
                  answer: "a",
                },
                {
                  id: "a2a-h2-3",
                  prompt: "Wohin gehen sie am Mittwochabend?",
                  promptEs: "¿Adónde van el miércoles por la tarde-noche?",
                  answer: "b",
                },
                {
                  id: "a2a-h2-4",
                  prompt: "Wohin muss Ibrahim am Donnerstag?",
                  promptEs: "¿Adónde tiene que ir Ibrahim el jueves?",
                  answer: "h",
                },
                {
                  id: "a2a-h2-5",
                  prompt: "Wohin gehen sie am Freitag?",
                  promptEs: "¿Adónde van el viernes?",
                  answer: "e",
                },
              ],
            },
          ],
        },
        {
          title: "Hören · Teil 3",
          instruction:
            "Sie hören fünf kurze Gespräche. Sie hören jedes Gespräch einmal. Wählen Sie die richtige Lösung a, b oder c.",
          instructionEs:
            "Cinco diálogos cortos del día a día. Cada uno suena UNA vez. Caza el dato: qué compra, a qué hora, dónde.",
          items: [
            {
              kind: "hoeren-mc",
              id: "a2a-h3-1",
              audio:
                "Die Lampe kostet zwölf Euro. Ist das okay? | Ja, die nehme ich. Haben Sie auch Kabel? | Nein, nur die Lampe. | Gut, dann nur die Lampe.",
              twice: false,
              question: "Was kauft die Frau?",
              questionEs: "¿Qué compra la mujer?",
              options: ["Nur die Lampe", "Lampe und Kabel", "nur Kabel"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "a2a-h3-2",
              audio:
                "Haben Sie Wanderstiefel in Größe 42? | Ja, hier. Die kosten 49 Euro. | Haben Sie auch Größe 43? | Leider nicht, nur 42 und 44.",
              twice: false,
              question: "Welche Größe gibt es nicht?",
              questionEs: "¿Qué talla no hay?",
              options: ["42", "43", "44"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "a2a-h3-3",
              audio:
                "Guten Tag, ich möchte Raum drei reservieren, für Samstag um zehn. | Samstag ist Raum drei schon weg. Raum zwei ist frei, um elf. | Um elf ist gut. Dann Raum zwei.",
              twice: false,
              question: "Welchen Raum nimmt die Frau?",
              questionEs: "¿Qué sala coge la mujer?",
              options: ["Raum 3 um 10 Uhr", "Raum 2 um 11 Uhr", "Raum 2 um 10 Uhr"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "a2a-h3-4",
              audio:
                "Backst du den Kuchen für Freitag? | Ja. Wie viele Leute kommen? | Ungefähr dreißig. | Dann backe ich zwei Kuchen, nicht einen.",
              twice: false,
              question: "Wie viele Kuchen backt die Frau?",
              questionEs: "¿Cuántos pasteles hornea la mujer?",
              options: ["einen", "zwei", "dreißig"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "a2a-h3-5",
              audio:
                "Fährst du mit dem Bus zur Volkshochschule? | Nein, der Bus braucht zu lange. Ich fahre mit dem Fahrrad, das dauert zehn Minuten. | Und bei Regen? | Dann nehme ich die Straßenbahn.",
              twice: false,
              question: "Wie fährt der Mann normalerweise zur VHS?",
              questionEs: "¿Cómo va normalmente el hombre a la escuela de adultos?",
              options: ["mit dem Bus", "mit dem Fahrrad", "mit der Straßenbahn"],
              answer: 1,
            },
          ],
        },
        {
          title: "Hören · Teil 4",
          instruction:
            "Sie hören ein Interview. Sie hören das Interview zweimal. Kreuzen Sie an: Richtig oder Falsch.",
          instructionEs:
            "Una entrevista. Suena DOS veces. Marca Richtig o Falsch. La afirmación casi nunca copia las palabras del audio: caza la idea.",
          items: [
            {
              kind: "hoeren-group",
              id: "a2a-h4",
              twice: true,
              readSeconds: 30,
              dialog: true,
              audio:
                "Frau Kellermann, Sie leiten den Nachbarschaftsgarten Sonnenhof. Seit wann gibt es den Garten? | " +
                "Seit drei Jahren. Am Anfang waren wir acht Leute, heute sind wir ungefähr vierzig. | " +
                "Arbeiten Sie jeden Tag dort? | " +
                "Nein. Der Garten ist von Dienstag bis Samstag geöffnet, sonntags und montags bleibt er zu. Ich selbst komme dreimal pro Woche. | " +
                "Was kostet ein Beet? | " +
                "Zwanzig Euro im Jahr. Werkzeug ist da, man muss nichts kaufen. Hunde dürfen leider nicht mit. | " +
                "Und wer kann mitmachen? | " +
                "Alle aus dem Viertel. Eine Ausbildung braucht man nicht. Wir erklären alles am ersten Samstag im Monat.",
              items: [
                {
                  kind: "hoeren-rf",
                  id: "a2a-h4-1",
                  audio: "",
                  statement: "Im Garten arbeiten heute ungefähr vierzig Menschen.",
                  statementEs: "En el huerto trabajan hoy unas cuarenta personas.",
                  richtig: true,
                },
                {
                  kind: "hoeren-rf",
                  id: "a2a-h4-2",
                  audio: "",
                  statement: "Der Garten ist auch sonntags geöffnet.",
                  statementEs: "El huerto también abre los domingos.",
                  richtig: false,
                },
                {
                  kind: "hoeren-rf",
                  id: "a2a-h4-3",
                  audio: "",
                  statement: "Frau Kellermann kommt dreimal pro Woche in den Garten.",
                  statementEs: "La señora Kellermann va tres veces por semana al huerto.",
                  richtig: true,
                },
                {
                  kind: "hoeren-rf",
                  id: "a2a-h4-4",
                  audio: "",
                  statement: "Ein Beet kostet zwanzig Euro im Monat.",
                  statementEs: "Un bancal cuesta veinte euros al mes.",
                  richtig: false,
                },
                {
                  kind: "hoeren-rf",
                  id: "a2a-h4-5",
                  audio: "",
                  statement: "Man braucht eine Ausbildung, um mitzuarbeiten.",
                  statementEs: "Hace falta formación para colaborar.",
                  richtig: false,
                },
              ],
            },
          ],
        },
      ],
    },

    // ══════════════════════════ LESEN · 30 min · 20 ══════════════════════
    {
      skill: "lesen",
      label: "Lesen",
      minutes: 30,
      teile: [
        {
          title: "Lesen · Teil 1",
          instruction:
            "Lesen Sie den Text und die Aufgaben. Wählen Sie die richtige Lösung a, b oder c.",
          instructionEs:
            "Lee el texto de revista y las cinco preguntas. Elige a, b o c. Primero la pregunta, luego sobrevuela el texto buscando el dato.",
          items: [
            {
              kind: "lesen-mc",
              id: "a2a-l1-1",
              title: "Neue Stadtteilbibliothek im Sonnenhof",
              text:
                "Seit März hat unser Viertel eine neue Stadtteilbibliothek. Sie liegt neben der Post, im alten Schulgebäude. Es gibt nicht nur Bücher: Man kann auch CDs, Zeitschriften und Tablets ausleihen.\n\n" +
                "Geöffnet ist dienstags bis samstags von 10 bis 18 Uhr, montags bleibt die Bibliothek geschlossen. Kinder unter zwölf dürfen nur mit einem Erwachsenen kommen. Die Mitgliedschaft kostet nichts, man braucht nur einen Ausweis.\n\n" +
                "Jeden Donnerstag um 16 Uhr gibt es eine Vorlesestunde für Kinder. Anmeldung ist nicht nötig, aber die Plätze sind begrenzt — wer zu spät kommt, sitzt oft auf dem Boden. Am ersten Samstag im Monat erklärt ein Team das Internet für Menschen über sechzig. Dafür muss man sich bis Freitag anmelden.\n\n" +
                "Die Leiterin, Frau Quintana, sagt: „Wir wollen ein Ort zum Treffen sein, nicht nur zum Ausleihen.“ Deshalb gibt es im Erdgeschoss ein kleines Café. Getränke darf man in den Lesesaal mitnehmen, Essen nicht.",
              question: "Wo liegt die neue Bibliothek?",
              questionEs: "¿Dónde está la biblioteca nueva?",
              options: ["neben der Post", "im Nachbarschaftszentrum", "am Bahnhof"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "a2a-l1-2",
              question: "Wann ist die Bibliothek geschlossen?",
              questionEs: "¿Cuándo está cerrada la biblioteca?",
              options: ["am Dienstag", "am Montag", "am Samstag"],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "a2a-l1-3",
              question: "Was kostet die Mitgliedschaft?",
              questionEs: "¿Cuánto cuesta hacerse socio?",
              options: ["nichts", "einen Ausweis", "12 Euro"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "a2a-l1-4",
              question: "Was muss man für den Internetkurs am Samstag tun?",
              questionEs: "¿Qué hay que hacer para el curso de internet del sábado?",
              options: ["nichts, man kommt einfach", "sich bis Freitag anmelden", "über sechzig sein und anrufen"],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "a2a-l1-5",
              question: "Was darf man in den Lesesaal mitnehmen?",
              questionEs: "¿Qué se puede llevar a la sala de lectura?",
              options: ["Essen und Getränke", "nur Getränke", "nichts"],
              answer: 1,
            },
          ],
        },
        {
          title: "Lesen · Teil 2",
          instruction:
            "Lesen Sie das Programm und die Aufgaben. Wählen Sie die richtige Lösung a, b oder c.",
          instructionEs:
            "Lee el programa de la semana y busca EL dato: un día, un precio, un lugar. No leas el cartel entero dos veces.",
          items: [
            {
              kind: "lesen-mc",
              id: "a2a-l2-1",
              title: "Nachbarschaftszentrum Sonnenhof — Woche 12. bis 18. Mai",
              text:
                "Montag 10–12 Uhr: Nähcafé in Raum 2. Anmeldung nötig, Material ist da.\n" +
                "Dienstag 16–18 Uhr: Hausaufgabenhilfe. Kostenlos, ohne Anmeldung. Für Kinder von 6 bis 12 Jahren.\n" +
                "Mittwoch 18–20 Uhr: Kochkurs. 8 Euro, maximal 12 Personen. Bitte Gemüse mitbringen.\n" +
                "Donnerstag: geschlossen (Feiertag).\n" +
                "Freitag 19 Uhr: Nachbarschaftsfest im Hof. Eintritt frei. Bei Regen in der Halle.\n" +
                "Samstag 9–13 Uhr: Tauschmarkt. Ein Tisch kostet 5 Euro, Anmeldung bis Freitag im Büro.\n" +
                "Sonntag: geschlossen.",
              question: "Wann ist das Nähcafé?",
              questionEs: "¿Cuándo es el café de costura?",
              options: ["Montag 10–12 Uhr", "Dienstag 16–18 Uhr", "Mittwoch 18–20 Uhr"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "a2a-l2-2",
              question: "Was kostet die Hausaufgabenhilfe?",
              questionEs: "¿Cuánto cuesta la ayuda con los deberes?",
              options: ["8 Euro", "5 Euro", "nichts"],
              answer: 2,
            },
            {
              kind: "lesen-mc",
              id: "a2a-l2-3",
              question: "Warum ist das Zentrum am Donnerstag geschlossen?",
              questionEs: "¿Por qué cierra el centro el jueves?",
              options: ["wegen eines Feiertags", "wegen Umbau", "wegen des Festes"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "a2a-l2-4",
              question: "Wo ist das Fest, wenn es regnet?",
              questionEs: "¿Dónde es la fiesta si llueve?",
              options: ["im Hof", "in der Halle", "es fällt aus"],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "a2a-l2-5",
              question: "Was kostet ein Tisch am Tauschmarkt?",
              questionEs: "¿Cuánto cuesta una mesa en el mercado de trueque?",
              options: ["nichts", "5 Euro", "8 Euro"],
              answer: 1,
            },
          ],
        },
        {
          title: "Lesen · Teil 3",
          instruction:
            "Lesen Sie die E-Mail und die Aufgaben. Wählen Sie die richtige Lösung a, b oder c.",
          instructionEs:
            "Lee el correo y las cinco preguntas. La respuesta suele vivir en una frase concreta, no en el saludo.",
          items: [
            {
              kind: "lesen-mc",
              id: "a2a-l3-1",
              title: "E-Mail von Tanja Berg",
              text:
                "Liebe Maren,\n\n" +
                "danke für deine Nachricht. Der Kochkurs am Mittwoch fällt leider aus: Die Küche im Zentrum wird repariert. Der Kurs ist nächste Woche, am Mittwoch um dieselbe Zeit, also um 18 Uhr.\n\n" +
                "Bitte bring diesmal nicht nur Gemüse mit, sondern auch Brot. Öl und Gewürze hat die Lehrerin, Frau Quast.\n\n" +
                "Danach können wir noch einen Tee im Café der Bibliothek trinken. Die Bibliothek hat mittwochs bis 18 Uhr auf — wir müssen also schnell sein, oder wir gehen ins Café Sonne an der Ecke, das hat bis 21 Uhr auf.\n\n" +
                "Kannst du Ibrahim Bescheid sagen? Ich habe seine Nummer nicht.\n\n" +
                "Liebe Grüße\nTanja",
              question: "Warum fällt der Kochkurs diese Woche aus?",
              questionEs: "¿Por qué se suspende el curso de cocina esta semana?",
              options: [
                "Frau Quast ist krank",
                "Die Küche wird repariert",
                "Maren hat keine Zeit",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "a2a-l3-2",
              question: "Wann ist der Kurs jetzt?",
              questionEs: "¿Cuándo es el curso ahora?",
              options: [
                "diese Woche um 18 Uhr",
                "nächste Woche Mittwoch um 18 Uhr",
                "nächste Woche um 21 Uhr",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "a2a-l3-3",
              question: "Was soll Maren mitbringen?",
              questionEs: "¿Qué debe traer Maren?",
              options: ["nur Gemüse", "Gemüse und Brot", "Öl und Gewürze"],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "a2a-l3-4",
              question: "Bis wann hat das Café Sonne auf?",
              questionEs: "¿Hasta qué hora abre el Café Sonne?",
              options: ["bis 18 Uhr", "bis 21 Uhr", "es steht nicht im Text"],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "a2a-l3-5",
              question: "Was soll Maren tun?",
              questionEs: "¿Qué debe hacer Maren?",
              options: [
                "Ibrahim anrufen und Bescheid sagen",
                "Frau Quast anrufen",
                "einen Tisch in der Bibliothek reservieren",
              ],
              answer: 0,
            },
          ],
        },
        {
          title: "Lesen · Teil 4",
          instruction:
            "Lesen Sie die Situationen und die Anzeigen. Welche Anzeige passt? Sie können jede Anzeige nur einmal verwenden.",
          instructionEs:
            "Cinco personas, ocho anuncios. Welche Anzeige passt? Cada anuncio se usa una sola vez; sobran tres. Primero las palabras clave de la persona (precio, día, lugar), luego el anuncio que cumple TODAS, no solo una.",
          items: [
            {
              kind: "lesen-match",
              id: "a2a-l4",
              ads: [
                {
                  key: "a",
                  text:
                    "WANDERVEREIN BERGBLICK. Jeden Samstag Touren ab 8 Uhr am Bahnhof. Feste Schuhe nötig. Mitgliedschaft 30 Euro im Jahr, die erste Tour ist zum Kennenlernen gratis.",
                },
                {
                  key: "b",
                  text:
                    "NÄHCAFÉ. Montags 10–12 Uhr, Raum 2. Maschinen sind da. Bitte Stoff mitbringen. Ohne Anmeldung, Eintritt frei.",
                },
                {
                  key: "c",
                  text:
                    "KOCHKURS VHS. Mittwoch 18–20 Uhr. 8 Euro, max. 12 Personen. Vegetarisch. Anmeldung bis Dienstag unter kochkurs@vhs-sonnenhof.de.",
                },
                {
                  key: "d",
                  text:
                    "TAUSCHMARKT IM HOF. Samstag 9–13 Uhr. Tisch 5 Euro, Anmeldung bis Freitag. Keine Lebensmittel, keine Tiere.",
                },
                {
                  key: "e",
                  text:
                    "INTERNET FÜR SENIOREN. Erster Samstag im Monat, 11–13 Uhr, Stadtteilbibliothek. Ab 60 Jahre. Anmeldung bis Freitag. Kostenlos.",
                },
                {
                  key: "f",
                  text:
                    "RAUMVERMIETUNG. Räume 2 und 3 am Wochenende, 15 Euro pro Vormittag. Küche extra. Anmeldung im Büro, Mo–Fr 9–12 Uhr.",
                },
                {
                  key: "g",
                  text:
                    "HAUSAUFGABENHILFE. Dienstag 16–18 Uhr. Kostenlos, ohne Anmeldung. Nur für Kinder von 6 bis 12 Jahren.",
                },
                {
                  key: "h",
                  text:
                    "FAHRRADWERKSTATT BLITZ. Reparatur oft am selben Tag. Mo–Sa 9–18 Uhr. Keine neuen Räder, nur Reparatur.",
                },
              ],
              situations: [
                {
                  id: "a2a-l4-1",
                  situation:
                    "Ibrahim möchte am Wochenende wandern gehen. Er war noch nie in einem Verein.",
                  situationEs:
                    "Ibrahim quiere ir de ruta el fin de semana. Nunca ha estado en un club.",
                  answer: "a",
                },
                {
                  id: "a2a-l4-2",
                  situation:
                    "Maren kocht gern vegetarisch und sucht einen Kurs unter zehn Euro am Abend.",
                  situationEs:
                    "A Maren le gusta cocinar vegetariano y busca un curso por menos de diez euros por la tarde-noche.",
                  answer: "c",
                },
                {
                  id: "a2a-l4-3",
                  situation:
                    "Oma Ilse ist 74 und möchte das Internet besser verstehen. Sie hat donnerstags keine Zeit.",
                  situationEs:
                    "La abuela Ilse tiene 74 años y quiere entender mejor internet. Los jueves no puede.",
                  answer: "e",
                },
                {
                  id: "a2a-l4-4",
                  situation:
                    "Lucía hat alte Bücher und Geschirr und möchte sie am Samstag verkaufen.",
                  situationEs:
                    "Lucía tiene libros y vajilla viejos y quiere venderlos el sábado.",
                  answer: "d",
                },
                {
                  id: "a2a-l4-5",
                  situation:
                    "Leos Fahrrad ist kaputt. Er braucht es morgen wieder und will kein neues kaufen.",
                  situationEs:
                    "La bici de Leo está rota. La necesita mañana y no quiere comprar una nueva.",
                  answer: "h",
                },
              ],
            },
          ],
        },
      ],
    },

    // ════════════════════════ SCHREIBEN · 30 min ═════════════════════════
    {
      skill: "schreiben",
      label: "Schreiben",
      minutes: 30,
      teile: [
        {
          title: "Schreiben · Teil 1 (SMS, circa 20–30 Wörter)",
          instruction:
            "Schreiben Sie eine SMS (20 bis 30 Wörter). Schreiben Sie zu jedem Punkt ein bis zwei Sätze. Vergessen Sie Anrede und Gruß nicht.",
          instructionEs:
            "SMS a un amigo, registro du, unas 20-30 palabras. Los tres Punkte son obligatorios: uno olvidado cuesta más que tres fallos de gramática. Saludo + una frase por punto + despedida.",
          items: [
            {
              kind: "schreiben-message",
              id: "a2a-s1",
              task:
                "Sie können am Freitag nicht zum Nachbarschaftsfest kommen. Schreiben Sie eine SMS an Ibrahim.",
              taskEs:
                "El viernes no puedes ir a la fiesta vecinal. Escríbele un SMS a Ibrahim.",
              points: [
                "Di que no puedes ir el viernes",
                "Explica por qué (una razón concreta)",
                "Propón otro día para veros",
              ],
              words: 25,
              model:
                "Hallo Ibrahim,\nich kann am Freitag leider nicht zum Fest kommen. Ich muss arbeiten. Haben wir am Samstag Zeit für einen Kaffee?\nBis bald\nSofía",
            },
          ],
        },
        {
          title: "Schreiben · Teil 2 (E-Mail, circa 30–40 Wörter)",
          instruction:
            "Schreiben Sie eine E-Mail (30 bis 40 Wörter). Schreiben Sie zu jedem Punkt ein bis zwei Sätze. Vergessen Sie Anrede und Gruß nicht. Schreiben Sie in der Sie-Form.",
          instructionEs:
            "Correo a alguien de Sie: Frau/Herr + apellido, Mit freundlichen Grüßen sin coma detrás. Unas 30-40 palabras, tres Punkte. El termómetro: ¿le dirías du en la calle? Si no, es Teil 2.",
          items: [
            {
              kind: "schreiben-message",
              id: "a2a-s2",
              task:
                "Sie möchten am Kochkurs der Volkshochschule teilnehmen. Schreiben Sie eine E-Mail an Frau Quast.",
              taskEs:
                "Quieres apuntarte al curso de cocina de la escuela de adultos. Escribe un correo a la señora Quast.",
              points: [
                "Di que quieres participar en el curso",
                "Pregunta cuánto cuesta y cuándo empieza",
                "Pide que te confirmen la plaza",
              ],
              words: 35,
              model:
                "Liebe Frau Quast,\nich möchte gern am Kochkurs am Mittwoch teilnehmen. Können Sie mir bitte sagen, was der Kurs kostet und wann er beginnt? Bitte bestätigen Sie mir einen Platz.\nMit freundlichen Grüßen\nSofía Marín",
            },
          ],
        },
      ],
    },

    // ════════════════════════ SPRECHEN · ~15 min ═════════════════════════
    {
      skill: "sprechen",
      label: "Sprechen",
      minutes: 15,
      teile: [
        {
          title: "Sprechen · Teil 1 — Fragen stellen",
          instruction:
            "Stellen Sie Ihrem Partner / Ihrer Partnerin Fragen zu den Themen auf den Karten und antworten Sie auf seine / ihre Fragen.",
          instructionEs:
            "En pareja: con la palabra de la tarjeta formulas una pregunta sobre la vida del otro y respondes a las suyas. Frases completas, no una palabra.",
          items: [
            {
              kind: "sprechen",
              id: "a2a-sp1",
              teil: 1,
              weight: 3,
              prompt: "Thema: Freizeit — Wort: Wochenende",
              promptEs: "Tema: tiempo libre — palabra: fin de semana",
              model:
                "Was machst du am Wochenende gern? — Am Wochenende gehe ich oft in die Bibliothek oder wandern. Und du?",
            },
            {
              kind: "sprechen",
              id: "a2a-sp2",
              teil: 1,
              weight: 3,
              prompt: "Thema: Stadt — Wort: Bibliothek",
              promptEs: "Tema: ciudad — palabra: biblioteca",
              model:
                "Gehst du oft in die Bibliothek? — Ja, ich gehe jeden Dienstag dorthin. Dort ist es ruhig, und die Mitgliedschaft kostet nichts.",
            },
            {
              kind: "sprechen",
              id: "a2a-sp3",
              teil: 1,
              weight: 3,
              prompt: "Thema: Lernen — Wort: Kurs",
              promptEs: "Tema: aprender — palabra: curso",
              model:
                "Machst du zurzeit einen Kurs? — Ja, ich mache einen Kochkurs an der Volkshochschule. Der ist am Mittwochabend.",
            },
          ],
        },
        {
          title: "Sprechen · Teil 2 — Von sich erzählen",
          instruction:
            "Erzählen Sie von sich. Sprechen Sie zu den Punkten auf der Karte. Sprechen Sie in ganzen Sätzen.",
          instructionEs:
            "La tarjeta «Von sich erzählen»: tu día a día en frases hiladas, con pasado donde toque. No es la presentación del A1 recitada: es un pequeño relato.",
          items: [
            {
              kind: "sprechen",
              id: "a2a-sp4",
              teil: 2,
              weight: 5,
              speakSeconds: 90,
              prompt:
                "Erzählen Sie von Ihrem Wochenende.\n• Was haben Sie am Samstag gemacht?\n• Mit wem waren Sie zusammen?\n• Was machen Sie am nächsten Wochenende?",
              promptEs:
                "Cuenta tu fin de semana: qué hiciste el sábado, con quién estuviste y qué harás el próximo.",
              model:
                "Am Samstag bin ich mit meiner Freundin Anna in die Stadtteilbibliothek gegangen. Wir haben dort zwei Stunden gelesen und danach im Café einen Tee getrunken. Am Abend war ich zu Hause und habe für den Kochkurs Gemüse gekauft. Nächstes Wochenende möchte ich mit dem Verein Bergblick wandern gehen, wenn das Wetter gut ist.",
            },
          ],
        },
        {
          title: "Sprechen · Teil 3 — Gemeinsam planen",
          instruction:
            "Planen Sie zusammen. Machen Sie Vorschläge, reagieren Sie und einigen Sie sich.",
          instructionEs:
            "Planear juntos. La partitura: proponer (Wollen wir…?) → rechazar con motivo (Das passt mir nicht, ich muss…) → alternativa → cerrar (Einverstanden!). Un nein seco mata la nota.",
          items: [
            {
              kind: "sprechen",
              id: "a2a-sp5",
              teil: 3,
              weight: 6,
              speakSeconds: 180,
              prompt:
                "Situation: Ihr Nachbarschaftszentrum macht am Samstag ein Fest. Sie organisieren einen Stand.\n\n" +
                "• Was verkaufen oder tauschen Sie?\n" +
                "• Wann treffen Sie sich zum Aufbauen?\n" +
                "• Wer bringt was mit?\n" +
                "• Und was noch?",
              promptEs:
                "El sábado hay fiesta vecinal y montáis un puesto. Decidid: qué ofrecéis, cuándo quedáis para montar, quién lleva qué, y un punto libre.",
              model:
                "Wollen wir am Stand Kuchen und Limonade anbieten? — Gute Idee, aber ich kann nicht backen. Lieber Bücher und Spiele zum Tauschen? — Einverstanden. Wann treffen wir uns? Ich schlage neun Uhr vor. — Das passt mir nicht, ich arbeite bis zehn. Lieber um halb elf? — Ja, das geht. Ich bringe den Tisch, du die Kasse. — Super. Einverstanden — bis Samstag!",
            },
          ],
        },
      ],
    },
  ],
};
