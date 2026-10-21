import type { ExamSet } from "@/lib/examTypes";

// MODELLSATZ B — Simulacro Start Deutsch 1 (Goethe-Zertifikat A1).
// Tema del set: trabajo, salud y familia (cita médica, oficina, abuela,
// farmacia). Léxico estrictamente A1 (Wortliste Goethe). Los distractores
// de las preguntas MC se mencionan siempre en el audio.

export const examB: ExamSet = {
  id: "sim-b",
  level: "a1",
  title: "Modellsatz B",
  description:
    "Simulacro completo del examen Start Deutsch 1 con el formato oficial: Hören, Lesen, Schreiben y Sprechen. Tema del set: trabajo, salud y familia.",
  sections: [
    // ────────────────────────────────────────────────────────────────
    // HÖREN (≈20 min)
    // ────────────────────────────────────────────────────────────────
    {
      skill: "hoeren",
      label: "Hören",
      minutes: 20,
      teile: [
        {
          title: "Hören · Teil 1",
          instruction:
            "Was ist richtig? Kreuzen Sie an: a, b oder c. Sie hören jeden Text zweimal.",
          instructionEs:
            "¿Qué es correcto? Marca a, b o c. Escuchas cada texto dos veces.",
          items: [
            {
              kind: "hoeren-mc",
              id: "b-h1-1",
              audio:
                "Praxis Doktor Weber, guten Tag. | Guten Tag, hier ist Thomas Klein. Ich bin krank und brauche einen Termin. | Können Sie heute um neun Uhr kommen? | Nein, um neun kann ich leider nicht. | Und um zehn Uhr? | Nein, da arbeite ich noch. | Dann kommen Sie bitte um elf Uhr. | Ja, elf Uhr ist gut. Danke, bis später.",
              twice: true,
              question: "Wann ist der Termin?",
              questionEs: "¿A qué hora es la cita?",
              options: ["Um 9 Uhr", "Um 10 Uhr", "Um 11 Uhr"],
              answer: 2,
            },
            {
              kind: "hoeren-mc",
              id: "b-h1-2",
              audio:
                "Guten Tag, Herr Fischer. Was fehlt Ihnen? | Ich habe Kopfschmerzen und Fieber. | Haben Sie auch Bauchschmerzen? | Nein, der Bauch tut nicht weh. | Gut, dann bleiben Sie zwei Tage im Bett und trinken Sie viel Wasser.",
              twice: true,
              question: "Was hat Herr Fischer?",
              questionEs: "¿Qué tiene el señor Fischer?",
              options: [
                "Kopfschmerzen und Fieber",
                "Bauchschmerzen",
                "Nur Fieber",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "b-h1-3",
              audio:
                "Julia, wann kommt deine Oma? Kommt sie am Samstag? | Nein, sie kommt am Sonntag um drei Uhr mit dem Zug. | Und dein Bruder Thomas? | Er kommt erst am Montag. | Schade, dann ist erst am Montag die ganze Familie zusammen.",
              twice: true,
              question: "Wann kommt die Oma?",
              questionEs: "¿Cuándo viene la abuela?",
              options: ["Am Samstag", "Am Sonntag", "Am Montag"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "b-h1-4",
              audio:
                "Entschuldigung, wo ist das Büro von Frau Braun? Ist es im ersten Stock? | Nein, im ersten Stock ist die Kantine. Frau Braun ist im zweiten Stock, Zimmer zwölf. | Ah, danke schön. | Bitte, gern.",
              twice: true,
              question: "Wo ist das Büro von Frau Braun?",
              questionEs: "¿Dónde está la oficina de la señora Braun?",
              options: [
                "Im ersten Stock",
                "Im zweiten Stock",
                "In der Kantine",
              ],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "b-h1-5",
              audio:
                "Guten Tag, was brauchen Sie? | Ich brauche Tabletten, mein Mann hat Halsschmerzen. | Diese Tabletten hier kosten fünf Euro und diese acht Euro. | Und der Saft da? | Der Saft kostet drei Euro. | Ich nehme die Tabletten für fünf Euro, bitte. | Gern, das macht fünf Euro.",
              twice: true,
              question: "Was bezahlt die Frau?",
              questionEs: "¿Cuánto paga la mujer?",
              options: ["5 Euro", "8 Euro", "3 Euro"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "b-h1-6",
              audio:
                "Thomas, gehen wir heute Abend zusammen essen? | Ja, gern. Wann hast du Feierabend? | Normalerweise um fünf Uhr, aber heute arbeite ich bis sechs. | Kein Problem. Dann treffen wir uns um sieben Uhr im Restaurant. | Super, bis dann!",
              twice: true,
              question: "Wann treffen sie sich im Restaurant?",
              questionEs: "¿A qué hora se encuentran en el restaurante?",
              options: ["Um 5 Uhr", "Um 6 Uhr", "Um 7 Uhr"],
              answer: 2,
            },
          ],
        },
        {
          title: "Hören · Teil 2",
          instruction:
            "Kreuzen Sie an: Richtig oder Falsch. Sie hören jeden Text einmal.",
          instructionEs:
            "Marca: verdadero o falso. Escuchas cada texto solo una vez.",
          items: [
            {
              kind: "hoeren-rf",
              id: "b-h2-1",
              audio:
                "Achtung, eine Information: Die Buslinie zwölf fährt heute nicht. Bitte nehmen Sie die Linie vierzehn. Danke.",
              statement: "Die Buslinie zwölf fährt heute normal.",
              statementEs: "La línea de bus 12 circula hoy con normalidad.",
              richtig: false,
            },
            {
              kind: "hoeren-rf",
              id: "b-h2-2",
              audio:
                "Liebe Kundinnen und Kunden, unsere Apotheke schließt heute schon um sechzehn Uhr. Ab morgen sind wir wieder normal für Sie da.",
              statement: "Die Apotheke schließt heute um sechzehn Uhr.",
              statementEs: "La farmacia cierra hoy a las dieciséis horas.",
              richtig: true,
            },
            {
              kind: "hoeren-rf",
              id: "b-h2-3",
              audio:
                "Herr Klein, bitte kommen Sie zu Zimmer vier. Doktor Weber wartet auf Sie in Zimmer vier.",
              statement: "Herr Klein soll zu Zimmer vier gehen.",
              statementEs: "El señor Klein debe ir a la sala cuatro.",
              richtig: true,
            },
            {
              kind: "hoeren-rf",
              id: "b-h2-4",
              audio:
                "Liebe Mitarbeiterinnen und Mitarbeiter, die Kantine bleibt heute geschlossen. Morgen ist sie wieder von zwölf bis vierzehn Uhr geöffnet.",
              statement: "Die Kantine ist heute geöffnet.",
              statementEs: "La cantina está abierta hoy.",
              richtig: false,
            },
          ],
        },
        {
          title: "Hören · Teil 3",
          instruction:
            "Was ist richtig? Kreuzen Sie an: a, b oder c. Sie hören jeden Text zweimal.",
          instructionEs:
            "¿Qué es correcto? Marca a, b o c. Escuchas cada mensaje dos veces.",
          items: [
            {
              kind: "hoeren-mc",
              id: "b-h3-1",
              audio:
                "Guten Tag, Frau Klein, hier ist die Praxis Doktor Weber. Ihr Termin am Donnerstag geht leider nicht. Kommen Sie bitte am Freitag um zehn Uhr. Am Montag ist die Praxis geschlossen. Auf Wiederhören.",
              twice: true,
              question: "Wann soll Frau Klein in die Praxis kommen?",
              questionEs:
                "¿Cuándo debe ir la señora Klein a la consulta?",
              options: ["Am Freitag", "Am Donnerstag", "Am Montag"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "b-h3-2",
              audio:
                "Hallo Julia, hier ist Sabine aus dem Büro. Die Besprechung morgen ist nicht um neun Uhr und auch nicht um zehn Uhr. Sie ist um halb elf. Bring bitte die Papiere für Frau Braun mit. Danke, bis morgen.",
              twice: true,
              question: "Wann ist die Besprechung?",
              questionEs: "¿A qué hora es la reunión?",
              options: ["Um 9 Uhr", "Um 10 Uhr", "Um 10.30 Uhr"],
              answer: 2,
            },
            {
              kind: "hoeren-mc",
              id: "b-h3-3",
              audio:
                "Hallo Thomas, hier ist Mama. Oma ist wieder gesund und kommt am Sonntag zum Mittagessen. Kaufst du bitte einen Kuchen? Brot und Obst haben wir schon. Danke, mein Junge. Bis Sonntag!",
              twice: true,
              question: "Was soll Thomas kaufen?",
              questionEs: "¿Qué debe comprar Thomas?",
              options: ["Brot", "Einen Kuchen", "Obst"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "b-h3-4",
              audio:
                "Guten Tag, hier spricht die Apotheke am Markt. Ihr Medikament ist jetzt da. Wir öffnen morgens um acht Uhr und sind heute bis achtzehn Uhr geöffnet, am Samstag nur bis dreizehn Uhr. Auf Wiederhören.",
              twice: true,
              question: "Bis wann ist die Apotheke heute geöffnet?",
              questionEs: "¿Hasta qué hora está abierta hoy la farmacia?",
              options: ["Bis 13 Uhr", "Bis 18 Uhr", "Bis 8 Uhr"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "b-h3-5",
              audio:
                "Guten Tag, Herr Fischer, hier ist Frau Wolf von der Firma Bergmann. Sie können am Montag bei uns anfangen. Kommen Sie bitte um acht Uhr ins Büro, nicht um neun. Bringen Sie Ihren Pass mit, ein Foto brauchen wir nicht. Auf Wiederhören.",
              twice: true,
              question: "Was soll Herr Fischer mitbringen?",
              questionEs: "¿Qué debe llevar el señor Fischer?",
              options: ["Seinen Pass", "Ein Foto", "Ein Foto und den Pass"],
              answer: 0,
            },
          ],
        },
      ],
    },
    // ────────────────────────────────────────────────────────────────
    // LESEN (≈25 min)
    // ────────────────────────────────────────────────────────────────
    {
      skill: "lesen",
      label: "Lesen",
      minutes: 25,
      teile: [
        {
          title: "Lesen · Teil 1",
          instruction:
            "Lesen Sie die Texte und die Aufgaben. Kreuzen Sie an: Richtig oder Falsch.",
          instructionEs:
            "Lee los textos y las tareas. Marca: verdadero o falso.",
          items: [
            {
              kind: "lesen-text",
              id: "b-l1-1",
              title: "E-Mail von Julia",
              text: "Liebe Sabine,\n\nich kann am Freitag leider nicht ins Büro kommen. Ich bin krank und habe Fieber. Der Arzt sagt, ich muss drei Tage im Bett bleiben. Mein Mann kauft die Medikamente in der Apotheke. Nächste Woche arbeite ich wieder.\n\nViele Grüße\nJulia",
              statements: [
                {
                  id: "b-l1-1-1",
                  statement: "Julia ist krank.",
                  statementEs: "Julia está enferma.",
                  richtig: true,
                },
                {
                  id: "b-l1-1-2",
                  statement: "Julia geht selbst in die Apotheke.",
                  statementEs: "Julia va ella misma a la farmacia.",
                  richtig: false,
                },
                {
                  id: "b-l1-1-3",
                  statement: "Nächste Woche arbeitet Julia wieder.",
                  statementEs: "La próxima semana Julia vuelve a trabajar.",
                  richtig: true,
                },
              ],
            },
            {
              kind: "lesen-text",
              id: "b-l1-2",
              title: "Notiz von Thomas",
              text: "Hallo Julia,\n\nich bin heute erst um zwanzig Uhr zu Hause. Wir haben in der Firma sehr viel Arbeit. Kannst du bitte Oma vom Bahnhof abholen? Ihr Zug kommt um siebzehn Uhr an.\n\nBis heute Abend\nThomas",
              statements: [
                {
                  id: "b-l1-2-1",
                  statement: "Thomas kommt heute früh nach Hause.",
                  statementEs: "Thomas llega hoy temprano a casa.",
                  richtig: false,
                },
                {
                  id: "b-l1-2-2",
                  statement: "Julia soll die Oma vom Bahnhof abholen.",
                  statementEs:
                    "Julia debe recoger a la abuela en la estación.",
                  richtig: true,
                },
              ],
            },
          ],
        },
        {
          title: "Lesen · Teil 2",
          instruction:
            "Lesen Sie die Texte und die Aufgaben. Wo finden Sie die Information? Kreuzen Sie an: a oder b.",
          instructionEs:
            "Lee los textos y las tareas. ¿Dónde encuentras la información? Marca: a o b.",
          items: [
            {
              kind: "lesen-ads",
              id: "b-l2-1",
              situation:
                "Sie haben Zahnschmerzen und brauchen schnell einen Termin.",
              situationEs:
                "Te duelen las muelas y necesitas una cita rápido.",
              adA: "Zahnarztpraxis Dr. Klein — Termine auch für heute! Montag bis Freitag von 8 bis 18 Uhr. Telefon: 0231 445566",
              adB: "Zahnarztpraxis Dr. Weber — Wir sind im Urlaub. Ab 1. September sind wir wieder für Sie da.",
              answer: "a",
            },
            {
              kind: "lesen-ads",
              id: "b-l2-2",
              situation: "Sie suchen Arbeit für den Vormittag.",
              situationEs: "Buscas trabajo para la mañana.",
              adA: "Restaurant Adler sucht Kellner. Arbeitszeit: abends von 18 bis 23 Uhr. Kommen Sie einfach vorbei!",
              adB: "Bäckerei Fischer sucht Verkäuferin oder Verkäufer. Montag bis Freitag von 7 bis 12 Uhr. Telefon: 0231 998877",
              answer: "b",
            },
            {
              kind: "lesen-ads",
              id: "b-l2-3",
              situation:
                "Sie arbeiten am Nachmittag. Ihr Sohn ist fünf Jahre alt und braucht einen Platz im Kindergarten.",
              situationEs:
                "Trabajas por la tarde. Tu hijo tiene cinco años y necesita plaza en una guardería.",
              adA: "Kindergarten Sonne — Wir betreuen Kinder von 3 bis 6 Jahren. Montag bis Freitag von 12 bis 18 Uhr. Wir haben freie Plätze!",
              adB: "Sprachschule Lingua — Englischkurse für Kinder ab 10 Jahren. Immer samstags von 9 bis 11 Uhr.",
              answer: "a",
            },
            {
              kind: "lesen-ads",
              id: "b-l2-4",
              situation:
                "Sie möchten am Sonntag mit Ihrer Familie essen gehen.",
              situationEs:
                "Quieres ir a comer con tu familia el domingo.",
              adA: "Restaurant Zur Post — Gutes Essen, gute Preise. Montag bis Samstag von 11 bis 22 Uhr geöffnet. Sonntag Ruhetag.",
              adB: "Gasthaus Am See — Familienessen am Sonntag: Kinder essen gratis! Jeden Tag von 11 bis 21 Uhr geöffnet.",
              answer: "b",
            },
            {
              kind: "lesen-ads",
              id: "b-l2-5",
              situation: "Sie brauchen am Sonntag Medikamente.",
              situationEs: "Necesitas medicamentos el domingo.",
              adA: "Apotheke am Markt — Montag bis Freitag von 8 bis 18.30 Uhr, Samstag von 8 bis 13 Uhr. Sonntag geschlossen.",
              adB: "Bahnhof-Apotheke — Jeden Tag geöffnet, auch am Sonntag von 9 bis 20 Uhr. Direkt am Hauptbahnhof.",
              answer: "b",
            },
          ],
        },
        {
          title: "Lesen · Teil 3",
          instruction:
            "Lesen Sie die Texte und die Aufgaben. Kreuzen Sie an: Richtig oder Falsch.",
          instructionEs:
            "Lee los carteles y las tareas. Marca: verdadero o falso.",
          items: [
            {
              kind: "lesen-schild",
              id: "b-l3-1",
              where: "An der Tür der Arztpraxis",
              sign: "Praxis Dr. Weber\nSprechzeiten: Montag bis Freitag von 8 bis 12 Uhr, vormittags ohne Termin.\nAm Nachmittag nur mit Termin.",
              statement: "Am Vormittag kann man ohne Termin kommen.",
              statementEs: "Por la mañana se puede ir sin cita.",
              richtig: true,
            },
            {
              kind: "lesen-schild",
              id: "b-l3-2",
              where: "In der Firma, an der Tür der Kantine",
              sign: "Die Kantine ist heute geschlossen.\nEs gibt Essen im Café am Markt.",
              statement: "Man kann heute in der Kantine essen.",
              statementEs: "Hoy se puede comer en la cantina.",
              richtig: false,
            },
            {
              kind: "lesen-schild",
              id: "b-l3-3",
              where: "An der Tür der Apotheke",
              sign: "Wir machen Mittagspause.\nVon 13 bis 14 Uhr geschlossen.",
              statement: "Die Apotheke ist um 13.30 Uhr geöffnet.",
              statementEs: "La farmacia está abierta a las 13.30.",
              richtig: false,
            },
            {
              kind: "lesen-schild",
              id: "b-l3-4",
              where: "Im Krankenhaus, am Eingang",
              sign: "Besuchszeiten: jeden Tag von 15 bis 18 Uhr.\nBitte seien Sie leise.",
              statement:
                "Man kann am Nachmittag ins Krankenhaus zu Besuch kommen.",
              statementEs:
                "Se puede visitar el hospital por la tarde.",
              richtig: true,
            },
            {
              kind: "lesen-schild",
              id: "b-l3-5",
              where: "In der Firma, an der Kantine",
              sign: "Kantine\nMittagessen von 12 bis 14 Uhr.\nNur für Mitarbeiterinnen und Mitarbeiter.",
              statement: "Hier können alle Leute essen.",
              statementEs: "Aquí puede comer todo el mundo.",
              richtig: false,
            },
          ],
        },
      ],
    },
    // ────────────────────────────────────────────────────────────────
    // SCHREIBEN (≈20 min)
    // ────────────────────────────────────────────────────────────────
    {
      skill: "schreiben",
      label: "Schreiben",
      minutes: 20,
      teile: [
        {
          title: "Schreiben · Teil 1",
          instruction:
            "Im Formular fehlen fünf Informationen. Helfen Sie Ihrer Freundin und schreiben Sie die fünf Informationen in das Formular.",
          instructionEs:
            "En el formulario faltan cinco datos. Ayuda a tu amiga y escribe los cinco datos en el formulario.",
          items: [
            {
              kind: "schreiben-form",
              id: "b-s1-1",
              scenario:
                "Ihre Freundin Julia Weber ist krank und braucht einen Termin in der Praxis von Doktor Klein. Sie füllen das Formular für sie aus. Julia Weber ist am 12.03.1990 in Köln geboren. Sie wohnt in der Gartenstraße 8 in Köln. Sie ist Verkäuferin von Beruf. Ihre Telefonnummer ist 0221 456789.",
              scenarioEs:
                "Tu amiga Julia Weber está enferma y necesita una cita en la consulta del doctor Klein. Rellenas el formulario por ella. Julia Weber nació el 12.03.1990 en Colonia. Vive en la Gartenstraße 8, en Colonia. Es vendedora de profesión. Su número de teléfono es el 0221 456789.",
              fields: [
                {
                  label: "Familienname",
                  answers: ["Weber"],
                },
                {
                  label: "Vorname",
                  answers: ["Julia"],
                },
                {
                  label: "Geburtsdatum",
                  answers: [
                    "12.03.1990",
                    "12.3.1990",
                    "12. März 1990",
                    "12. Maerz 1990",
                  ],
                },
                {
                  label: "Straße und Hausnummer",
                  answers: ["Gartenstraße 8", "Gartenstrasse 8"],
                },
                {
                  label: "Beruf",
                  answers: ["Verkäuferin", "Verkaeuferin", "Verkauferin"],
                },
              ],
            },
          ],
        },
        {
          title: "Schreiben · Teil 2",
          instruction:
            "Schreiben Sie zu jedem Punkt ein bis zwei Sätze (circa 30 Wörter). Vergessen Sie nicht die Anrede und den Gruß am Schluss.",
          instructionEs:
            "Escribe una o dos frases por cada punto (unas 30 palabras). No olvides el saludo inicial y la despedida.",
          items: [
            {
              kind: "schreiben-message",
              id: "b-s2-1",
              task: "Sie sind krank und können nicht zur Arbeit kommen. Schreiben Sie eine E-Mail an Ihre Chefin, Frau Braun.",
              taskEs:
                "Estás enfermo/a y no puedes ir a trabajar. Escribe un email a tu jefa, la señora Braun.",
              points: [
                "¿Por qué escribes? (estás enfermo/a)",
                "¿Cuántos días te quedas en casa?",
                "¿Cuándo vuelves a la oficina?",
              ],
              model:
                "Sehr geehrte Frau Braun,\n\nich bin leider krank und habe Fieber. Ich kann heute nicht ins Büro kommen. Der Arzt sagt, ich muss zwei Tage im Bett bleiben. Am Donnerstag arbeite ich wieder.\n\nMit freundlichen Grüßen\nThomas Fischer",
            },
          ],
        },
      ],
    },
    // ────────────────────────────────────────────────────────────────
    // SPRECHEN (≈15 min)
    // ────────────────────────────────────────────────────────────────
    {
      skill: "sprechen",
      label: "Sprechen",
      minutes: 15,
      teile: [
        {
          title: "Sprechen · Teil 1",
          instruction:
            "Sich vorstellen: Name, Alter, Land, Wohnort, Sprachen, Beruf, Hobby. Buchstabieren Sie danach Ihren Familiennamen und sagen Sie Ihre Telefonnummer.",
          instructionEs:
            "Preséntate: nombre, edad, país, ciudad, idiomas, profesión, hobby. Después deletrea tu apellido y di tu número de teléfono.",
          items: [
            {
              kind: "sprechen",
              id: "b-sp1-1",
              teil: 1,
              prompt:
                "Stellen Sie sich vor: Name? Alter? Land? Wohnort? Sprachen? Beruf? Hobby? Buchstabieren Sie Ihren Familiennamen und sagen Sie Ihre Telefonnummer.",
              promptEs:
                "Preséntate con los siete puntos, deletrea tu apellido y di tu número de teléfono.",
              model:
                "Ich heiße Thomas Fischer. Ich bin vierunddreißig Jahre alt. Ich komme aus Deutschland. Ich wohne in Dortmund. Ich spreche Deutsch und ein bisschen Englisch. Ich bin Krankenpfleger von Beruf. Mein Hobby ist Kochen. Ich buchstabiere meinen Familiennamen: F, I, S, C, H, E, R. Meine Telefonnummer ist null, zwei, drei, eins, sechs, sieben, acht, neun.",
            },
          ],
        },
        {
          title: "Sprechen · Teil 2",
          instruction:
            "Um Informationen bitten und Informationen geben. Sie sehen eine Karte mit einem Thema und einem Wort. Stellen Sie eine Frage und antworten Sie.",
          instructionEs:
            "Pedir y dar información. Ves una tarjeta con un tema y una palabra. Formula una pregunta y respóndela.",
          items: [
            {
              kind: "sprechen",
              id: "b-sp2-1",
              teil: 2,
              prompt: "Thema: Familie · Wort: Geschwister",
              promptEs:
                "Tema: familia · palabra: hermanos. Formula una pregunta y respóndela.",
              model:
                "Hast du Geschwister? Ja, ich habe einen Bruder und eine Schwester. Mein Bruder wohnt in Berlin.",
            },
            {
              kind: "sprechen",
              id: "b-sp2-2",
              teil: 2,
              prompt: "Thema: Arbeit · Wort: Beruf",
              promptEs:
                "Tema: trabajo · palabra: profesión. Formula una pregunta y respóndela.",
              model:
                "Was bist du von Beruf? Ich bin Verkäufer. Ich arbeite in einem Supermarkt.",
            },
            {
              kind: "sprechen",
              id: "b-sp2-3",
              teil: 2,
              prompt: "Thema: Gesundheit · Wort: Arzt",
              promptEs:
                "Tema: salud · palabra: médico. Formula una pregunta y respóndela.",
              model:
                "Wie oft gehst du zum Arzt? Ich gehe einmal im Jahr zum Arzt. Ich bin fast nie krank.",
            },
            {
              kind: "sprechen",
              id: "b-sp2-4",
              teil: 2,
              prompt: "Thema: Gesundheit · Wort: Sport",
              promptEs:
                "Tema: salud · palabra: deporte. Formula una pregunta y respóndela.",
              model:
                "Machst du Sport? Ja, ich schwimme zweimal pro Woche. Das ist gesund.",
            },
          ],
        },
        {
          title: "Sprechen · Teil 3",
          instruction:
            "Bitten formulieren und darauf reagieren. Sie sehen eine Karte mit einem Bild. Formulieren Sie eine Bitte.",
          instructionEs:
            "Formular peticiones y reaccionar. Ves una tarjeta con una imagen. Formula una petición con el imperativo formal.",
          items: [
            {
              kind: "sprechen",
              id: "b-sp3-1",
              teil: 3,
              prompt: "Karte: die Tabletten",
              promptEs:
                "Tarjeta: las pastillas. Formula una petición con «Sie».",
              model:
                "Nehmen Sie bitte die Tabletten! Ja, natürlich, ich nehme sie gleich.",
            },
            {
              kind: "sprechen",
              id: "b-sp3-2",
              teil: 3,
              prompt: "Karte: die Tür",
              promptEs:
                "Tarjeta: la puerta. Formula una petición con «Sie».",
              model:
                "Schließen Sie bitte die Tür! Ja, gern, kein Problem.",
            },
          ],
        },
      ],
    },
  ],
};
