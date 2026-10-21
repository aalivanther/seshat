import type { ExamSet } from "@/lib/examTypes";

// MODELLSATZ C — Simulacro Start Deutsch 1 (Goethe-Zertifikat A1).
// Tema del set: viajes y tiempo libre — estación de tren, hotel, restaurante,
// cine, deporte y el fin de semana en Perfekt (distinto de A = ciudad
// y B = trabajo/salud/familia). Personajes: Hoffmann, Wagner, Lena, Max, Frau Braun.
// Estructura oficial: Hören 6+4+5 · Lesen 5+5+5 · Schreiben 1+1 · Sprechen 1+4+2.

export const examC: ExamSet = {
  id: "sim-c",
  level: "a1",
  title: "Modellsatz C",
  description:
    "Simulacro completo estilo Start Deutsch 1 sobre viajes y tiempo libre: la estación, el hotel, el restaurante, el cine y el fin de semana en Perfekt.",
  sections: [
    // ────────────────────────────── HÖREN ──────────────────────────────
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
              id: "c-h1-1",
              audio:
                "Entschuldigung, wann fährt der nächste Zug nach München? | Der Zug um zehn Uhr fährt heute leider nicht. Der nächste Zug fährt um elf Uhr von Gleis fünf. | Um elf Uhr, danke schön!",
              twice: true,
              question: "Wann fährt der Zug nach München?",
              questionEs: "¿Cuándo sale el tren a Múnich?",
              options: ["Um zehn Uhr.", "Um elf Uhr.", "Um fünf Uhr."],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "c-h1-2",
              audio:
                "Guten Tag, ich habe ein Zimmer reserviert. Mein Name ist Hoffmann. | Einen Moment, bitte. Ja, Herr Hoffmann, ein Einzelzimmer für drei Nächte. Sie haben Zimmer zwölf im ersten Stock. | Danke. Gibt es Frühstück? | Ja, von sieben bis zehn Uhr.",
              twice: true,
              question: "Welches Zimmer hat Herr Hoffmann?",
              questionEs: "¿Qué habitación tiene el señor Hoffmann?",
              options: ["Zimmer zwölf.", "Zimmer drei.", "Zimmer sieben."],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "c-h1-3",
              audio:
                "Guten Abend, was möchten Sie essen? | Ich nehme die Pizza. | Und für mich bitte den Fisch. | Oh, tut mir leid, der Fisch ist heute leider aus. | Dann nehme ich die Suppe. | Gern, kommt sofort.",
              twice: true,
              question: "Was gibt es heute nicht?",
              questionEs: "¿Qué no hay hoy?",
              options: ["Die Pizza.", "Die Suppe.", "Den Fisch."],
              answer: 2,
            },
            {
              kind: "hoeren-mc",
              id: "c-h1-4",
              audio:
                "Hallo Max, gehen wir am Freitag oder am Sonntag ins Kino? | Hallo Lena. Am Freitag mache ich Sport, und am Sonntag komme ich erst spät aus Hamburg zurück. Geht auch Samstag? | Ja, Samstag ist super. Dann bis Samstag!",
              twice: true,
              question: "Wann gehen Lena und Max ins Kino?",
              questionEs: "¿Cuándo van Lena y Max al cine?",
              options: ["Am Freitag.", "Am Samstag.", "Am Sonntag."],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "c-h1-5",
              audio:
                "Guten Tag, zwei Karten für das Schwimmbad, bitte. | Gern. Eine Karte kostet vier Euro, zwei Karten kosten acht Euro. | Hier sind zehn Euro. | Danke, und zwei Euro zurück.",
              twice: true,
              question: "Was kosten zwei Karten?",
              questionEs: "¿Cuánto cuestan dos entradas?",
              options: ["Vier Euro.", "Zehn Euro.", "Acht Euro."],
              answer: 2,
            },
            {
              kind: "hoeren-mc",
              id: "c-h1-6",
              audio:
                "Hallo Lena, was hast du am Wochenende gemacht? | Hallo Max. Ich bin ans Meer gefahren und habe am Strand Fußball gespielt. Und du? | Ich war zu Hause und habe ein Buch gelesen.",
              twice: true,
              question: "Was hat Lena am Wochenende gemacht?",
              questionEs: "¿Qué hizo Lena el fin de semana?",
              options: [
                "Sie ist ans Meer gefahren.",
                "Sie war zu Hause.",
                "Sie hat ein Buch gelesen.",
              ],
              answer: 0,
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
              id: "c-h2-1",
              audio:
                "Achtung, eine Information: Der Zug nach Berlin fährt heute von Gleis acht ab, nicht von Gleis drei. Ich wiederhole: Gleis acht.",
              statement: "Der Zug nach Berlin fährt von Gleis drei ab.",
              statementEs: "El tren a Berlín sale de la vía 3.",
              richtig: false,
            },
            {
              kind: "hoeren-rf",
              id: "c-h2-2",
              audio:
                "Liebe Gäste, das Schwimmbad schließt heute schon um achtzehn Uhr. Morgen öffnen wir wieder um neun Uhr. Wir wünschen einen schönen Tag.",
              statement: "Das Schwimmbad öffnet morgen um acht Uhr.",
              statementEs: "La piscina abre mañana a las ocho.",
              richtig: false,
            },
            {
              kind: "hoeren-rf",
              id: "c-h2-3",
              audio:
                "Meine Damen und Herren, willkommen im Zug nach Hamburg. Nächster Halt ist Hannover. Das Restaurant finden Sie in Wagen fünf.",
              statement: "Das Restaurant ist in Wagen vier.",
              statementEs: "El restaurante está en el vagón cuatro.",
              richtig: false,
            },
            {
              kind: "hoeren-rf",
              id: "c-h2-4",
              audio:
                "Liebe Kinogäste, der Film beginnt in zehn Minuten in Saal zwei. Bitte machen Sie jetzt Ihr Handy aus. Wir wünschen viel Spaß.",
              statement: "Der Film beginnt in Saal zwei.",
              statementEs: "La película empieza en la sala dos.",
              richtig: true,
            },
          ],
        },
        {
          title: "Hören · Teil 3",
          instruction:
            "Was ist richtig? Kreuzen Sie an: a, b oder c. Sie hören jeden Text zweimal.",
          instructionEs:
            "¿Qué es correcto? Marca a, b o c. Escuchas cada texto dos veces.",
          items: [
            {
              kind: "hoeren-mc",
              id: "c-h3-1",
              audio:
                "Hallo Max, hier ist Lena. Mein Zug kommt morgen um halb vier an. Wir treffen uns dann um vier Uhr am Bahnhof, nicht um drei. Bis morgen!",
              twice: true,
              question: "Wann treffen sich Lena und Max?",
              questionEs: "¿A qué hora se encuentran Lena y Max?",
              options: ["Um drei Uhr.", "Um halb vier.", "Um vier Uhr."],
              answer: 2,
            },
            {
              kind: "hoeren-mc",
              id: "c-h3-2",
              audio:
                "Guten Tag, Frau Wagner, hier ist das Hotel Sonne. Ihr Zimmer ist erst ab Freitag frei, nicht ab Donnerstag. Sie können dann bis Sonntag bleiben. Bitte rufen Sie uns kurz zurück.",
              twice: true,
              question: "Ab wann ist das Zimmer frei?",
              questionEs: "¿A partir de cuándo está libre la habitación?",
              options: ["Ab Donnerstag.", "Ab Freitag.", "Ab Sonntag."],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "c-h3-3",
              audio:
                "Guten Tag, Herr Hoffmann, hier ist das Reisebüro am Markt. Ihre Fahrkarten nach Wien sind da. Heute schließen wir gleich, aber morgen können Sie die Karten bis achtzehn Uhr abholen. Am Samstag ist das Büro geschlossen.",
              twice: true,
              question: "Wann kann Herr Hoffmann die Fahrkarten abholen?",
              questionEs: "¿Cuándo puede recoger los billetes el señor Hoffmann?",
              options: ["Heute.", "Morgen bis achtzehn Uhr.", "Am Samstag."],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "c-h3-4",
              audio:
                "Hallo Lena, hier ist Max. Das Kino am Marktplatz ist heute leider zu. Wir gehen ins Kino am Bahnhof. Der Film beginnt um zwanzig Uhr fünfzehn. Wir treffen uns um zwanzig Uhr vor dem Eingang. Bis dann!",
              twice: true,
              question: "Wann treffen sich Max und Lena?",
              questionEs: "¿A qué hora se encuentran Max y Lena?",
              options: [
                "Um zwanzig Uhr.",
                "Um zwanzig Uhr fünfzehn.",
                "Um fünfzehn Uhr.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "c-h3-5",
              audio:
                "Guten Tag, hier ist die Schwimmschule Braun. Ihr Kurs am Montag fällt leider aus. Sie können am Mittwoch oder am Donnerstag kommen. Der Kurs beginnt immer um siebzehn Uhr. Auf Wiederhören.",
              twice: true,
              question: "An welchem Tag ist kein Kurs?",
              questionEs: "¿Qué día no hay curso?",
              options: ["Am Mittwoch.", "Am Donnerstag.", "Am Montag."],
              answer: 2,
            },
          ],
        },
      ],
    },
    // ────────────────────────────── LESEN ──────────────────────────────
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
              id: "c-l1-1",
              title: "E-Mail von Lena",
              text: "Liebe Anna,\nwie geht es dir? Am Samstag bin ich nach Salzburg gefahren. Ich habe im Hotel Sonne gewohnt. Das Hotel war klein, aber sehr schön. Am Sonntag bin ich durch die Stadt gelaufen und habe viele Fotos gemacht.\nNächstes Wochenende komme ich nach Berlin. Hast du am Samstag Zeit? Wir können zusammen ins Kino gehen.\nViele Grüße\nLena",
              statements: [
                {
                  id: "c-l1-1-s1",
                  statement: "Lena war am Wochenende in Salzburg.",
                  statementEs: "Lena estuvo el fin de semana en Salzburgo.",
                  richtig: true,
                },
                {
                  id: "c-l1-1-s2",
                  statement: "Das Hotel war groß.",
                  statementEs: "El hotel era grande.",
                  richtig: false,
                },
                {
                  id: "c-l1-1-s3",
                  statement: "Lena möchte mit Anna ins Kino gehen.",
                  statementEs: "Lena quiere ir al cine con Anna.",
                  richtig: true,
                },
              ],
            },
            {
              kind: "lesen-text",
              id: "c-l1-2",
              title: "Notiz von Max",
              text: "Hallo Lena,\nich bin beim Sport und komme um sechs Uhr zurück. Wichtig: Der Zug nach Köln fährt morgen schon um sieben Uhr dreißig, nicht um neun Uhr! Ich habe die Fahrkarten schon gekauft. Kaufst du bitte noch Brot und Käse für die Reise?\nBis später\nMax",
              statements: [
                {
                  id: "c-l1-2-s1",
                  statement: "Der Zug nach Köln fährt morgen um neun Uhr.",
                  statementEs: "El tren a Colonia sale mañana a las nueve.",
                  richtig: false,
                },
                {
                  id: "c-l1-2-s2",
                  statement: "Max hat die Fahrkarten schon gekauft.",
                  statementEs: "Max ya ha comprado los billetes.",
                  richtig: true,
                },
              ],
            },
          ],
        },
        {
          title: "Lesen · Teil 2",
          instruction:
            "Lesen Sie die Aufgaben und die Anzeigen. Wo finden Sie die Information? Kreuzen Sie an: a oder b.",
          instructionEs:
            "Lee las tareas y los anuncios. ¿Qué anuncio encaja? Marca: a o b.",
          items: [
            {
              kind: "lesen-ads",
              id: "c-l2-1",
              situation:
                "Sie sind in Hamburg und möchten am Wochenende nach Berlin fahren. Sie haben nicht viel Geld.",
              situationEs:
                "Estás en Hamburgo y quieres viajar a Berlín el fin de semana. No tienes mucho dinero.",
              adA: "Bahn-Wochenende! Am Samstag und Sonntag nach Berlin schon ab 19 Euro. Jetzt Ticket kaufen: www.bahn-spar.de",
              adB: "Schnell nach Berlin fliegen! Flüge ab Hamburg, ab 129 Euro. Jeden Tag. www.airfix.de",
              answer: "a",
            },
            {
              kind: "lesen-ads",
              id: "c-l2-2",
              situation:
                "Sie möchten am Samstagabend mit Freunden essen gehen.",
              situationEs:
                "Quieres salir a cenar con amigos el sábado por la noche.",
              adA: "Café am Park. Frühstück und Kuchen. Montag bis Freitag von 8 bis 14 Uhr.",
              adB: "Restaurant Adria. Pizza und Pasta. Täglich von 18 bis 23 Uhr geöffnet.",
              answer: "b",
            },
            {
              kind: "lesen-ads",
              id: "c-l2-3",
              situation:
                "Sie machen mit Ihrer Frau Urlaub am See. Sie suchen ein Zimmer für zwei Personen mit Frühstück.",
              situationEs:
                "Estás de vacaciones en el lago con tu mujer. Buscáis una habitación para dos personas con desayuno.",
              adA: "Hotel Bergblick. Einzelzimmer mit Bad, 40 Euro pro Nacht, ohne Frühstück.",
              adB: "Pension Wagner am See. Doppelzimmer mit Frühstück, 60 Euro pro Nacht.",
              answer: "b",
            },
            {
              kind: "lesen-ads",
              id: "c-l2-4",
              situation: "Sie möchten am Sonntag schwimmen gehen.",
              situationEs: "Quieres ir a nadar el domingo.",
              adA: "Schwimmbad Wellenberg. Samstag und Sonntag von 9 bis 20 Uhr geöffnet.",
              adB: "Sportstudio Aktiv. Kurse von Montag bis Freitag. Am Wochenende geschlossen.",
              answer: "a",
            },
            {
              kind: "lesen-ads",
              id: "c-l2-5",
              situation:
                "Sie möchten am Nachmittag mit Ihren Kindern einen Film sehen.",
              situationEs:
                "Quieres ver una película por la tarde con tus hijos.",
              adA: "Kino Central. Filme für Erwachsene, jeden Abend um 20 Uhr und um 22 Uhr.",
              adB: "Kino im Park. Filme für Kinder und Familien, täglich um 15 Uhr.",
              answer: "b",
            },
          ],
        },
        {
          title: "Lesen · Teil 3",
          instruction:
            "Lesen Sie die Texte. Kreuzen Sie an: Richtig oder Falsch.",
          instructionEs: "Lee los carteles. Marca: verdadero o falso.",
          items: [
            {
              kind: "lesen-schild",
              id: "c-l3-1",
              where: "Am Bahnhof, am Schalter",
              sign: "Der Schalter ist heute geschlossen. Fahrkarten bekommen Sie am Automaten.",
              statement: "Sie können heute keine Fahrkarten kaufen.",
              statementEs: "Hoy no puedes comprar billetes.",
              richtig: false,
            },
            {
              kind: "lesen-schild",
              id: "c-l3-2",
              where: "An der Tür vom Restaurant Adria",
              sign: "Montag Ruhetag. Dienstag bis Sonntag ab 12 Uhr geöffnet.",
              statement: "Am Montag ist das Restaurant zu.",
              statementEs: "El lunes el restaurante está cerrado.",
              richtig: true,
            },
            {
              kind: "lesen-schild",
              id: "c-l3-3",
              where: "Im Hotel, an der Rezeption",
              sign: "Frühstück von 7 bis 10 Uhr im ersten Stock.",
              statement: "Um 11 Uhr gibt es noch Frühstück.",
              statementEs: "A las once todavía hay desayuno.",
              richtig: false,
            },
            {
              kind: "lesen-schild",
              id: "c-l3-4",
              where: "Am Eingang vom Schwimmbad",
              sign: "Kinder unter 8 Jahren nur mit Eltern.",
              statement:
                "Kinder unter acht Jahren dürfen nicht allein ins Schwimmbad.",
              statementEs:
                "Los niños menores de ocho años no pueden entrar solos a la piscina.",
              richtig: true,
            },
            {
              kind: "lesen-schild",
              id: "c-l3-5",
              where: "Im Zug, im Wagen 3",
              sign: "Ruhewagen. Bitte hier nicht telefonieren.",
              statement: "Hier darf man telefonieren.",
              statementEs: "Aquí se puede hablar por teléfono.",
              richtig: false,
            },
          ],
        },
      ],
    },
    // ──────────────────────────── SCHREIBEN ────────────────────────────
    {
      skill: "schreiben",
      label: "Schreiben",
      minutes: 20,
      teile: [
        {
          title: "Schreiben · Teil 1",
          instruction:
            "Ihre Freundin möchte ein Hotelzimmer buchen. Schreiben Sie die fünf fehlenden Informationen in das Formular.",
          instructionEs:
            "Tu amiga quiere reservar una habitación de hotel. Escribe las cinco informaciones que faltan en el formulario.",
          items: [
            {
              kind: "schreiben-form",
              id: "c-s1-1",
              scenario:
                "Ihre Freundin Lena Hoffmann möchte ein Hotelzimmer in Berlin buchen. Sie kommt aus Spanien und wohnt in Madrid. Sie ist am 12. Mai 1996 geboren. Sie kommt am 3. Oktober an und bleibt drei Nächte. Sie möchte ein Einzelzimmer mit Frühstück. Ihre E-Mail-Adresse ist lena.hoffmann@mail.es.",
              scenarioEs:
                "Tu amiga Lena Hoffmann quiere reservar una habitación de hotel en Berlín. Viene de España y vive en Madrid. Nació el 12 de mayo de 1996. Llega el 3 de octubre y se queda tres noches. Quiere una habitación individual con desayuno. Su email es lena.hoffmann@mail.es.",
              fields: [
                { label: "Familienname", answers: ["Hoffmann"] },
                { label: "Vorname", answers: ["Lena"] },
                {
                  label: "Wohnort",
                  answers: ["Madrid", "Madrid, Spanien", "Madrid (Spanien)"],
                },
                {
                  label: "Ankunft",
                  answers: [
                    "3. Oktober",
                    "am 3. Oktober",
                    "3 Oktober",
                    "03.10.",
                    "3.10.",
                    "03.10",
                    "3.10",
                  ],
                },
                {
                  label: "Zimmer",
                  answers: [
                    "Einzelzimmer",
                    "ein Einzelzimmer",
                    "Einzelzimmer mit Frühstück",
                    "ein Einzelzimmer mit Frühstück",
                  ],
                },
              ],
            },
          ],
        },
        {
          title: "Schreiben · Teil 2",
          instruction:
            "Schreiben Sie eine E-Mail (circa 30 Wörter). Schreiben Sie zu allen drei Punkten. Vergessen Sie nicht die Anrede und den Gruß am Schluss.",
          instructionEs:
            "Escribe un email (unas 30 palabras). Cubre los tres puntos. No olvides el saludo inicial y la despedida.",
          items: [
            {
              kind: "schreiben-message",
              id: "c-s2-1",
              task: "Sie möchten am Samstag mit Ihrem Freund Max ins Kino gehen. Schreiben Sie Max eine E-Mail.",
              taskEs:
                "Quieres ir al cine el sábado con tu amigo Max. Escríbele un email a Max.",
              points: [
                "¿Por qué escribes? Quieres ir al cine el sábado.",
                "¿Cuándo y dónde os encontráis?",
                "Pregúntale si compra él las entradas.",
              ],
              model:
                "Lieber Max,\nich möchte am Samstag mit dir ins Kino gehen. Der Film beginnt um acht Uhr. Wir treffen uns um halb acht vor dem Kino am Bahnhof. Kaufst du die Karten?\nViele Grüße\nLena",
            },
          ],
        },
      ],
    },
    // ──────────────────────────── SPRECHEN ─────────────────────────────
    {
      skill: "sprechen",
      label: "Sprechen",
      minutes: 15,
      teile: [
        {
          title: "Sprechen · Teil 1",
          instruction:
            "Stellen Sie sich vor. Buchstabieren Sie dann Ihren Namen und sagen Sie Ihre Telefonnummer.",
          instructionEs:
            "Preséntate. Después deletrea tu nombre y di tu número de teléfono.",
          items: [
            {
              kind: "sprechen",
              id: "c-sp1-1",
              teil: 1,
              prompt:
                "Stellen Sie sich vor: Name? Alter? Land? Wohnort? Sprachen? Beruf? Hobby? Buchstabieren Sie Ihren Namen und sagen Sie Ihre Telefonnummer.",
              promptEs:
                "Preséntate: nombre, edad, país, ciudad, idiomas, profesión y hobby. Luego deletrea tu nombre y di tu número de teléfono.",
              model:
                "Ich heiße Lena Hoffmann. Ich bin dreißig Jahre alt und komme aus Spanien. Ich wohne in Madrid. Ich spreche Spanisch, Englisch und ein bisschen Deutsch. Ich bin Programmiererin von Beruf. Mein Hobby ist Schwimmen. Ich buchstabiere: H, O, F, F, M, A, N, N. Meine Telefonnummer ist null sechs eins fünf, drei vier acht neun.",
            },
          ],
        },
        {
          title: "Sprechen · Teil 2",
          instruction:
            "Um Informationen bitten und Informationen geben. Formulieren Sie zu jeder Karte eine Frage und eine Antwort.",
          instructionEs:
            "Pedir y dar información. Formula para cada tarjeta una pregunta y una respuesta.",
          items: [
            {
              kind: "sprechen",
              id: "c-sp2-1",
              teil: 2,
              prompt: "Thema: Reisen. Wort: Zug",
              promptEs: "Tema: viajes. Palabra: tren",
              model:
                "Frage: Fährst du oft mit dem Zug? Antwort: Ja, ich fahre oft mit dem Zug. Nächste Woche fahre ich nach Berlin.",
            },
            {
              kind: "sprechen",
              id: "c-sp2-2",
              teil: 2,
              prompt: "Thema: Reisen. Wort: Hotel",
              promptEs: "Tema: viajes. Palabra: hotel",
              model:
                "Frage: Wohnst du im Urlaub im Hotel? Antwort: Ja, ich wohne oft im Hotel. Ich möchte ein Zimmer mit Frühstück.",
            },
            {
              kind: "sprechen",
              id: "c-sp2-3",
              teil: 2,
              prompt: "Thema: Freizeit. Wort: Kino",
              promptEs: "Tema: tiempo libre. Palabra: cine",
              model:
                "Frage: Gehst du gern ins Kino? Antwort: Ja, sehr gern. Am Samstag gehe ich mit Freunden ins Kino.",
            },
            {
              kind: "sprechen",
              id: "c-sp2-4",
              teil: 2,
              prompt: "Thema: Freizeit. Wort: Wochenende",
              promptEs: "Tema: tiempo libre. Palabra: fin de semana",
              model:
                "Frage: Was hast du am Wochenende gemacht? Antwort: Ich habe Fußball gespielt und bin ins Kino gegangen.",
            },
          ],
        },
        {
          title: "Sprechen · Teil 3",
          instruction:
            "Bitten formulieren und darauf reagieren. Formulieren Sie zu jeder Karte eine Bitte.",
          instructionEs:
            "Formular peticiones y reaccionar. Formula una petición para cada tarjeta.",
          items: [
            {
              kind: "sprechen",
              id: "c-sp3-1",
              teil: 3,
              prompt: "Karte: das Foto. Formulieren Sie eine Bitte.",
              promptEs: "Tarjeta: la foto. Formula una petición.",
              model:
                "Können Sie bitte ein Foto von uns machen? Reaktion: Ja, gern.",
            },
            {
              kind: "sprechen",
              id: "c-sp3-2",
              teil: 3,
              prompt: "Karte: das Wasser. Formulieren Sie eine Bitte.",
              promptEs: "Tarjeta: el agua. Formula una petición.",
              model:
                "Können Sie mir bitte ein Wasser bringen? Reaktion: Ja, natürlich, sofort.",
            },
          ],
        },
      ],
    },
  ],
};
