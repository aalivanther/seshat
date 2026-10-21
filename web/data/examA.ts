import type { ExamSet } from "@/lib/examTypes";

// Modellsatz A — Simulacro 1 del Start Deutsch 1 (Goethe-Zertifikat A1).
// Tema general: vida cotidiana en la ciudad (compras, citas, transporte).
// Estructura oficial: Hören 6+4+5 · Lesen 5+5+5 · Schreiben 1+1 · Sprechen 1+4+2.

export const examA: ExamSet = {
  id: "sim-a",
  level: "a1",
  title: "Modellsatz A",
  description:
    "Simulacro completo del examen oficial A1: vida cotidiana en la ciudad — compras, citas y transporte.",
  sections: [
    // ────────────────────────── HÖREN ──────────────────────────
    {
      skill: "hoeren",
      label: "Hören",
      minutes: 20,
      teile: [
        {
          title: "Hören · Teil 1",
          instruction:
            "Was ist richtig? Kreuzen Sie an. Sie hören jeden Text zweimal.",
          instructionEs:
            "¿Qué es correcto? Marca la opción. Escuchas cada texto dos veces.",
          items: [
            {
              kind: "hoeren-mc",
              id: "a-h1-1",
              audio:
                "Guten Tag, Frau Schmidt. Wohnen Sie noch in Berlin? | Nein, nicht mehr. Ich habe früher in Berlin gewohnt, aber jetzt wohne ich in Hamburg. | Ach, Hamburg ist schön! | Ja, sehr. Meine Schwester wohnt in München, sie besucht mich oft.",
              twice: true,
              question: "Wo wohnt Frau Schmidt jetzt?",
              questionEs: "¿Dónde vive ahora la señora Schmidt?",
              options: ["In Berlin", "In Hamburg", "In München"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "a-h1-2",
              audio:
                "Guten Morgen, ich möchte ein Brot, bitte. | Gern. Das Brot kostet zwei Euro vierzig. | Und was kostet ein Brötchen? | Ein Brötchen kostet fünfunddreißig Cent. | Dann nehme ich nur das Brot. | Das macht zwei Euro vierzig. | Hier sind drei Euro. | Und sechzig Cent zurück. | Danke, auf Wiedersehen!",
              twice: true,
              question: "Was kostet das Brot?",
              questionEs: "¿Cuánto cuesta el pan?",
              options: ["2,40 Euro", "35 Cent", "3,60 Euro"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "a-h1-3",
              audio:
                "Entschuldigung, ist der Zug um dreizehn Uhr fünfzehn nach Köln schon weg? | Ja, leider. Der nächste Zug fährt um vierzehn Uhr dreißig, danach kommt einer um sechzehn Uhr. | Dann nehme ich den Zug um vierzehn Uhr dreißig. | Gut, der fährt von Gleis neun. Gute Reise!",
              twice: true,
              question: "Wann fährt der Mann nach Köln?",
              questionEs: "¿A qué hora viaja el hombre a Colonia?",
              options: ["Um 13.15 Uhr", "Um 14.30 Uhr", "Um 16.00 Uhr"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "a-h1-4",
              audio:
                "Guten Tag, ich suche eine Jacke. | Die Jacken sind hier. Diese blaue Jacke ist sehr schön. | Hmm, die ist mir zu teuer. Wie finden Sie diesen Pullover? | Der ist auch schön und kostet nur zwanzig Euro. | Gut, den nehme ich. | Möchten Sie auch ein Hemd? | Nein, danke, nur den Pullover.",
              twice: true,
              question: "Was kauft der Mann?",
              questionEs: "¿Qué compra el hombre?",
              options: ["Eine Jacke", "Einen Pullover", "Ein Hemd"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "a-h1-5",
              audio:
                "Sag mal, Anna, fährst du mit dem Auto zur Arbeit? | Nein, mein Auto ist kaputt. | Fährst du dann mit dem Bus? | Nein, der Bus braucht zu lange. Ich fahre mit dem Fahrrad, das dauert nur zehn Minuten. | Das ist ja super!",
              twice: true,
              question: "Wie fährt Anna zur Arbeit?",
              questionEs: "¿Cómo va Anna al trabajo?",
              options: ["Mit dem Auto", "Mit dem Bus", "Mit dem Fahrrad"],
              answer: 2,
            },
            {
              kind: "hoeren-mc",
              id: "a-h1-6",
              audio:
                "Praxis Doktor Weber, guten Tag. | Guten Tag, hier ist Maria Krause. Ich brauche einen Termin. | Können Sie am Montag um neun Uhr kommen? | Nein, am Montag arbeite ich. | Und am Freitag um zehn Uhr? | Da kann ich auch nicht. | Geht es am Mittwoch um sechzehn Uhr? | Ja, das passt gut. | Also am Mittwoch um sechzehn Uhr. | Danke, auf Wiederhören!",
              twice: true,
              question: "Wann hat Frau Krause einen Termin?",
              questionEs: "¿Cuándo tiene cita la señora Krause?",
              options: [
                "Am Montag um 9 Uhr",
                "Am Freitag um 10 Uhr",
                "Am Mittwoch um 16 Uhr",
              ],
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
              id: "a-h2-1",
              audio:
                "Liebe Kundinnen und Kunden, herzlich willkommen! Heute im Angebot: ein Kilo Tomaten für nur einen Euro neunundneunzig. Sie finden die Tomaten in der Obst- und Gemüseabteilung. Wir wünschen Ihnen einen schönen Einkauf.",
              statement: "Ein Kilo Tomaten kostet heute 1,99 Euro.",
              statementEs: "Un kilo de tomates cuesta hoy 1,99 euros.",
              richtig: true,
            },
            {
              kind: "hoeren-rf",
              id: "a-h2-2",
              audio:
                "Achtung an Gleis fünf. Der Zug nach München, Abfahrt vierzehn Uhr zehn, hat heute circa zwanzig Minuten Verspätung. Wir bitten um Entschuldigung.",
              statement: "Der Zug nach München kommt pünktlich.",
              statementEs: "El tren a Múnich llega puntual.",
              richtig: false,
            },
            {
              kind: "hoeren-rf",
              id: "a-h2-3",
              audio:
                "Passagiere des Fluges L H drei vier zwei nach Wien, bitte kommen Sie sofort zum Ausgang B zwölf. Ihr Flug ist zum Einsteigen bereit.",
              statement:
                "Die Passagiere nach Wien sollen zum Ausgang B 12 kommen.",
              statementEs:
                "Los pasajeros con destino a Viena deben ir a la puerta B 12.",
              richtig: true,
            },
            {
              kind: "hoeren-rf",
              id: "a-h2-4",
              audio:
                "Liebe Kundinnen und Kunden, unser Kaufhaus schließt in fünfzehn Minuten. Bitte gehen Sie zu den Kassen im Erdgeschoss. Morgen sind wir wieder ab neun Uhr für Sie da.",
              statement: "Das Kaufhaus öffnet morgen um zehn Uhr.",
              statementEs: "Los grandes almacenes abren mañana a las diez.",
              richtig: false,
            },
          ],
        },
        {
          title: "Hören · Teil 3",
          instruction:
            "Was ist richtig? Kreuzen Sie an. Sie hören jeden Text zweimal.",
          instructionEs:
            "¿Qué es correcto? Marca la opción. Escuchas cada texto dos veces.",
          items: [
            {
              kind: "hoeren-mc",
              id: "a-h3-1",
              audio:
                "Guten Tag, Herr Lang, hier ist die Praxis von Doktor Braun. Ihr Termin am Donnerstag um fünfzehn Uhr geht leider nicht, der Doktor ist krank. Können Sie am Freitag um elf Uhr kommen? Bitte rufen Sie uns an. Auf Wiederhören.",
              twice: true,
              question: "Wann soll Herr Lang in die Praxis kommen?",
              questionEs: "¿Cuándo debe ir el señor Lang a la consulta?",
              options: [
                "Am Donnerstag um 15 Uhr",
                "Am Freitag um 11 Uhr",
                "Am Freitag um 15 Uhr",
              ],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "a-h3-2",
              audio:
                "Hallo Tomas, hier ist Markus. Wir möchten heute Abend ins Kino gehen, aber ich muss leider arbeiten. Können wir morgen gehen? Der Film läuft um zwanzig Uhr. Wir treffen uns um neunzehn Uhr dreißig vor dem Kino. Ruf mich an, tschüss!",
              twice: true,
              question: "Wann treffen sich die Freunde?",
              questionEs: "¿Cuándo se encuentran los amigos?",
              options: [
                "Heute Abend",
                "Morgen um 19.30 Uhr",
                "Morgen um 20.00 Uhr",
              ],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "a-h3-3",
              audio:
                "Guten Tag, hier ist das Bürgerbüro der Stadt. Ihr neuer Pass ist fertig. Sie können ihn von Montag bis Freitag zwischen acht und zwölf Uhr abholen. Am Samstag und Sonntag ist das Büro geschlossen. Bitte bringen Sie Ihren alten Pass mit. Auf Wiederhören.",
              twice: true,
              question: "Wann kann man den Pass abholen?",
              questionEs: "¿Cuándo se puede recoger el pasaporte?",
              options: ["Von Montag bis Freitag", "Am Samstag", "Am Sonntag"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "a-h3-4",
              audio:
                "Hallo Julia, hier ist Sofie. Wir kochen doch heute Abend zusammen. Kannst du bitte Brot und Käse kaufen? Tomaten habe ich schon, und Wein haben wir auch zu Hause. Bis später!",
              twice: true,
              question: "Was soll Julia kaufen?",
              questionEs: "¿Qué debe comprar Julia?",
              options: ["Brot und Käse", "Tomaten", "Wein"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "a-h3-5",
              audio:
                "Guten Tag, Frau Weber, hier ist die Autowerkstatt Schneider. Ihr Auto ist fertig. Sie können es heute bis achtzehn Uhr abholen. Morgen sind wir erst ab acht Uhr wieder da. Die Reparatur kostet einhundertzwanzig Euro. Auf Wiederhören.",
              twice: true,
              question: "Wann kann Frau Weber das Auto heute abholen?",
              questionEs: "¿Hasta qué hora puede recoger hoy el coche la señora Weber?",
              options: ["Bis 18 Uhr", "Ab 8 Uhr", "Um 8 Uhr"],
              answer: 0,
            },
          ],
        },
      ],
    },
    // ────────────────────────── LESEN ──────────────────────────
    {
      skill: "lesen",
      label: "Lesen",
      minutes: 25,
      teile: [
        {
          title: "Lesen · Teil 1",
          instruction:
            "Lesen Sie die beiden Texte und die Aufgaben. Kreuzen Sie an: Richtig oder Falsch.",
          instructionEs:
            "Lee los dos textos y las tareas. Marca: verdadero o falso.",
          items: [
            {
              kind: "lesen-text",
              id: "a-l1-1",
              title: "E-Mail von Sonja",
              text: "Lieber Tomas,\n\nwie geht es dir? Ich bin jetzt in Leipzig! Ich habe hier eine neue Arbeit und eine kleine Wohnung im Zentrum gefunden. Die Wohnung hat zwei Zimmer und einen Balkon, und sie ist nicht teuer. Am Samstag gehe ich mit meinen Kollegen auf den Markt. Wir kaufen Obst und Gemüse und trinken danach einen Kaffee.\n\nMöchtest du mich im Oktober besuchen? Dann zeige ich dir die Stadt.\n\nViele Grüße\nSonja",
              statements: [
                {
                  id: "a-l1-1-s1",
                  statement: "Sonja wohnt jetzt in Leipzig.",
                  statementEs: "Sonja vive ahora en Leipzig.",
                  richtig: true,
                },
                {
                  id: "a-l1-1-s2",
                  statement: "Die Wohnung ist sehr teuer.",
                  statementEs: "El piso es muy caro.",
                  richtig: false,
                },
                {
                  id: "a-l1-1-s3",
                  statement: "Tomas kann Sonja im Oktober besuchen.",
                  statementEs: "Tomas puede visitar a Sonja en octubre.",
                  richtig: true,
                },
              ],
            },
            {
              kind: "lesen-text",
              id: "a-l1-2",
              title: "Notiz vom Hausmeister",
              text: "Liebe Nachbarinnen und Nachbarn,\n\nam Dienstag, den 12. Mai, gibt es von 9 bis 14 Uhr kein Wasser im Haus. Wir reparieren die Wasserleitung. Bitte kaufen Sie Wasser für diesen Tag.\n\nHaben Sie Fragen? Rufen Sie mich an: 0176 5566778.\n\nIhr Hausmeister\nHerr Bauer",
              statements: [
                {
                  id: "a-l1-2-s1",
                  statement: "Es gibt am Dienstag den ganzen Tag kein Wasser.",
                  statementEs: "El martes no hay agua durante todo el día.",
                  richtig: false,
                },
                {
                  id: "a-l1-2-s2",
                  statement: "Man kann Herrn Bauer anrufen.",
                  statementEs: "Se puede llamar por teléfono al señor Bauer.",
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
            "Lee las tareas y los anuncios. ¿Dónde encuentras la información? Marca: a o b.",
          items: [
            {
              kind: "lesen-ads",
              id: "a-l2-1",
              situation:
                "Sie möchten am Sonntag frisches Brot kaufen. Wo bekommen Sie Brot?",
              situationEs:
                "Quieres comprar pan fresco el domingo. ¿Dónde consigues pan?",
              adA: "Bäckerei Krüger — frisches Brot und Kuchen. Öffnungszeiten: Montag bis Samstag 6–18 Uhr. Sonntag geschlossen.",
              adB: "Café Sonne — sonntags geöffnet von 8 bis 17 Uhr. Frühstück, Brot und Brötchen auch zum Mitnehmen.",
              answer: "b",
            },
            {
              kind: "lesen-ads",
              id: "a-l2-2",
              situation:
                "Sie sind neu in der Stadt und möchten Deutsch lernen. Sie arbeiten jeden Tag bis 17 Uhr.",
              situationEs:
                "Eres nuevo en la ciudad y quieres aprender alemán. Trabajas cada día hasta las 17 h.",
              adA: "Volkshochschule — Deutsch am Abend: Kurse A1 und A2, Montag und Mittwoch von 18 bis 20 Uhr. Jetzt anmelden!",
              adB: "Sprachschule Aktiv — Deutschkurse A1 bis B1, jeden Vormittag von 9 bis 12 Uhr. Kleine Gruppen.",
              answer: "a",
            },
            {
              kind: "lesen-ads",
              id: "a-l2-3",
              situation:
                "Ihr Fahrrad ist kaputt. Sie möchten es schnell reparieren lassen.",
              situationEs:
                "Tu bicicleta está rota. Quieres que te la reparen rápido.",
              adA: "Fahrrad-Shop Meier — neue Fahrräder und E-Bikes. Große Auswahl, gute Preise!",
              adB: "Radwerkstatt Blitz — wir reparieren Ihr Fahrrad schnell, oft am gleichen Tag. Montag bis Samstag geöffnet.",
              answer: "b",
            },
            {
              kind: "lesen-ads",
              id: "a-l2-4",
              situation:
                "Sie möchten am Samstag mit Ihren Kindern schwimmen gehen.",
              situationEs:
                "Quieres ir a nadar el sábado con tus hijos.",
              adA: "Familienbad Wellenspaß — Samstag und Sonntag von 9 bis 18 Uhr geöffnet. Kinderbecken und große Rutsche!",
              adB: "Hallenbad Mitte — geöffnet Montag bis Freitag von 7 bis 21 Uhr. Am Wochenende geschlossen.",
              answer: "a",
            },
            {
              kind: "lesen-ads",
              id: "a-l2-5",
              situation:
                "Sie möchten billig nach Berlin fahren. Sie haben viel Zeit.",
              situationEs:
                "Quieres viajar barato a Berlín. Tienes mucho tiempo.",
              adA: "Fernbus-Reisen — nach Berlin schon ab 9 Euro. Fahrzeit circa 6 Stunden. Jeden Tag drei Busse.",
              adB: "ICE-Sprinter — in nur 3 Stunden nach Berlin. Tickets ab 89 Euro. Jetzt online buchen!",
              answer: "a",
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
              id: "a-l3-1",
              where: "An der Tür der Arztpraxis",
              sign: "Praxis Dr. Braun\nSprechzeiten: Mo–Fr 8–12 Uhr, Di und Do auch 15–18 Uhr.\nIm Notfall: 112",
              statement: "Am Mittwochnachmittag kann man in die Praxis gehen.",
              statementEs:
                "El miércoles por la tarde se puede ir a la consulta.",
              richtig: false,
            },
            {
              kind: "lesen-schild",
              id: "a-l3-2",
              where: "Im Kaufhaus, am Aufzug",
              sign: "Der Aufzug ist leider kaputt. Bitte benutzen Sie die Treppe oder die Rolltreppe.",
              statement: "Man kann mit dem Aufzug fahren.",
              statementEs: "Se puede usar el ascensor.",
              richtig: false,
            },
            {
              kind: "lesen-schild",
              id: "a-l3-3",
              where: "An der Tür des Supermarkts",
              sign: "Neue Öffnungszeiten!\nMontag bis Samstag 8–22 Uhr.\nSonn- und Feiertage geschlossen.",
              statement: "Der Supermarkt ist am Samstagabend geöffnet.",
              statementEs: "El supermercado está abierto el sábado por la noche.",
              richtig: true,
            },
            {
              kind: "lesen-schild",
              id: "a-l3-4",
              where: "Am Bahnhof, an einem Automaten",
              sign: "Fahrkarten bitte hier am Automaten kaufen. Im Zug kosten die Tickets 2 Euro mehr.",
              statement: "Im Zug sind die Tickets teurer.",
              statementEs: "En el tren los billetes son más caros.",
              richtig: true,
            },
            {
              kind: "lesen-schild",
              id: "a-l3-5",
              where: "An der Bushaltestelle",
              sign: "Achtung! Vom 3. bis 7. Juni fährt hier kein Bus (Baustelle). Die Haltestelle ist 200 Meter weiter, an der Post.",
              statement:
                "Vom 3. bis 7. Juni fahren die Busse von der Haltestelle an der Post ab.",
              statementEs:
                "Del 3 al 7 de junio los buses salen de la parada junto a Correos.",
              richtig: true,
            },
          ],
        },
      ],
    },
    // ──────────────────────── SCHREIBEN ────────────────────────
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
              id: "a-s1",
              scenario:
                "Ihre Freundin Carmen López kommt aus Spanien. Sie wohnt jetzt in Frankfurt, in der Goethestraße 12, 60313 Frankfurt. Sie ist am 14.03.1992 in Sevilla geboren. Ihre Telefonnummer ist 0176 4455889. Carmen möchte einen Deutschkurs an der Volkshochschule machen und meldet sich an.",
              scenarioEs:
                "Tu amiga Carmen López es de España. Ahora vive en Fráncfort, en Goethestraße 12, 60313 Frankfurt. Nació el 14.03.1992 en Sevilla. Su teléfono es 0176 4455889. Carmen quiere hacer un curso de alemán en la escuela de adultos y se inscribe.",
              fields: [
                {
                  label: "Familienname",
                  answers: ["López", "Lopez"],
                },
                {
                  label: "Straße und Hausnummer",
                  answers: [
                    "Goethestraße 12",
                    "Goethestrasse 12",
                    "Goethestr. 12",
                  ],
                },
                {
                  label: "Postleitzahl",
                  answers: ["60313"],
                },
                {
                  label: "Heimatland",
                  answers: ["Spanien"],
                },
                {
                  label: "Telefonnummer",
                  answers: ["0176 4455889", "01764455889"],
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
            "Escribe una o dos frases por cada punto (unas 30 palabras). No olvides el saludo inicial ni la despedida.",
          items: [
            {
              kind: "schreiben-message",
              id: "a-s2",
              task: "Sie besuchen am Samstag Ihre Freundin Lena in Köln. Schreiben Sie eine E-Mail an Lena.",
              taskEs:
                "El sábado visitas a tu amiga Lena en Colonia. Escríbele un email.",
              points: [
                "Di que la visitas el sábado",
                "Escribe a qué hora llega tu tren",
                "Pídele que te recoja en la estación",
              ],
              model:
                "Liebe Lena,\nich komme am Samstag nach Köln und möchte dich besuchen. Mein Zug kommt um 14.30 Uhr an. Kannst du mich bitte vom Bahnhof abholen? Ich freue mich!\nViele Grüße\nLucía",
            },
          ],
        },
      ],
    },
    // ──────────────────────── SPRECHEN ─────────────────────────
    {
      skill: "sprechen",
      label: "Sprechen",
      minutes: 15,
      teile: [
        {
          title: "Sprechen · Teil 1",
          instruction: "Sich vorstellen.",
          instructionEs: "Presentarse.",
          items: [
            {
              kind: "sprechen",
              id: "a-sp1",
              teil: 1,
              prompt:
                "Stellen Sie sich vor: Name, Alter, Land, Wohnort, Sprachen, Beruf, Hobby. Buchstabieren Sie dann Ihren Familiennamen und sagen Sie Ihre Telefonnummer.",
              promptEs:
                "Preséntate: nombre, edad, país, ciudad, idiomas, profesión, hobby. Después deletrea tu apellido y di tu número de teléfono. Ojo: los acentos españoles no se deletrean en alemán — Lucía se deletrea L-U-C-I-A, sin acento.",
              model:
                "Ich heiße Lucía Ortega. Ich bin dreißig Jahre alt. Ich komme aus Spanien und wohne in Valencia. Ich spreche Spanisch, Englisch und ein bisschen Deutsch. Ich bin Büroangestellte von Beruf. Mein Hobby ist Fußball. Ich buchstabiere: O-R-T-E-G-A. Meine Telefonnummer ist null eins sieben sechs, drei drei vier fünf acht neun.",
            },
          ],
        },
        {
          title: "Sprechen · Teil 2",
          instruction: "Um Informationen bitten und Informationen geben.",
          instructionEs: "Pedir y dar información: formula una pregunta con la palabra de la tarjeta y da una respuesta.",
          items: [
            {
              kind: "sprechen",
              id: "a-sp2",
              teil: 2,
              prompt: "Thema: Essen und Trinken — Wort: Frühstück",
              promptEs: "Tema: comer y beber — palabra: desayuno",
              model:
                "Was isst du zum Frühstück? — Zum Frühstück esse ich Brot mit Käse und trinke einen Kaffee.",
            },
            {
              kind: "sprechen",
              id: "a-sp3",
              teil: 2,
              prompt: "Thema: Einkaufen — Wort: Supermarkt",
              promptEs: "Tema: compras — palabra: supermercado",
              model:
                "Wo ist hier ein Supermarkt? — Der Supermarkt ist in der Bahnhofstraße, neben der Post.",
            },
            {
              kind: "sprechen",
              id: "a-sp4",
              teil: 2,
              prompt: "Thema: Freizeit — Wort: Kino",
              promptEs: "Tema: tiempo libre — palabra: cine",
              model:
                "Gehst du oft ins Kino? — Ja, ich gehe am Wochenende gern ins Kino.",
            },
            {
              kind: "sprechen",
              id: "a-sp5",
              teil: 2,
              prompt: "Thema: Stadt — Wort: Bus",
              promptEs: "Tema: ciudad — palabra: autobús",
              model:
                "Fährst du mit dem Bus zur Arbeit? — Ja, ich fahre jeden Tag mit dem Bus zur Arbeit.",
            },
          ],
        },
        {
          title: "Sprechen · Teil 3",
          instruction: "Bitten formulieren und darauf reagieren.",
          instructionEs: "Formular una petición a partir de la imagen de la tarjeta.",
          items: [
            {
              kind: "sprechen",
              id: "a-sp6",
              teil: 3,
              prompt: "Bild: eine offene Tür",
              promptEs: "Imagen: una puerta abierta",
              model: "Machen Sie bitte die Tür zu! Ja, natürlich, ich mache sie gleich zu.",
            },
            {
              kind: "sprechen",
              id: "a-sp7",
              teil: 3,
              prompt: "Bild: ein Handy, durchgestrichen",
              promptEs: "Imagen: un móvil tachado",
              model: "Machen Sie bitte das Handy aus! Ja, gern, ich mache es sofort aus.",
            },
          ],
        },
      ],
    },
  ],
};
