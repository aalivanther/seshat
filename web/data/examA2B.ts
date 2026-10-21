import type { ExamSet } from "@/lib/examTypes";

// ─────────────────────────────────────────────────────────────────────────────
// Modellsatz A2 B — segundo Goethe-Zertifikat A2. Misma estructura que A2 A,
// otros temas: trabajo, salud y trámites (Bürgeramt, Krankenkasse, Schicht).
// Nombres nuevos: Svenja Roth, Kilian Pohl, Yara Mendes, Herr Uhlmann,
// Frau Jankovic, Dr. Lembke. No se reasigna a Doktor Weber.
// ─────────────────────────────────────────────────────────────────────────────

export const examA2B: ExamSet = {
  id: "a2-sim-b",
  level: "a2",
  title: "Modellsatz A2 B",
  description:
    "Segundo simulacro del Goethe-Zertifikat A2: trabajo, salud y trámites — una semana de turnos, una cita en el Bürgeramt y una visita al médico. Misma estructura que el Modellsatz A, otros textos. Se aprueba con el 60 % del total.",
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
            "Cinco textos cortos, cada uno DOS veces. Caza el dato: hora de la cita, qué llevar, qué línea.",
          items: [
            {
              kind: "hoeren-mc",
              id: "a2b-h1-1",
              audio:
                "Praxis Doktor Lembke, guten Tag. Frau Roth, Ihr Termin am Dienstag um neun Uhr geht leider nicht. Können Sie am Mittwoch um vierzehn Uhr kommen? Bitte rufen Sie uns an. Auf Wiederhören.",
              twice: true,
              question: "Wann soll Frau Roth in die Praxis kommen?",
              questionEs: "¿Cuándo debe ir la señora Roth a la consulta?",
              options: [
                "Am Dienstag um 9 Uhr",
                "Am Mittwoch um 14 Uhr",
                "Am Mittwoch um 9 Uhr",
              ],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "a2b-h1-2",
              audio:
                "Liebe Kolleginnen und Kollegen, die Frühschicht beginnt ab nächster Woche nicht um sechs, sondern um halb sieben. Die Spätschicht bleibt um vierzehn Uhr. Bitte kommt pünktlich.",
              twice: true,
              question: "Wann beginnt die Frühschicht nächste Woche?",
              questionEs: "¿A qué hora empieza el turno de mañana la semana que viene?",
              options: ["Um 6 Uhr", "Um 6.30 Uhr", "Um 14 Uhr"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "a2b-h1-3",
              audio:
                "Bürgeramt Mitte. Ihr neuer Ausweis ist fertig. Sie können ihn Montag bis Freitag zwischen acht und zwölf Uhr abholen. Samstags ist das Amt geschlossen. Bitte bringen Sie Ihren alten Ausweis mit.",
              twice: true,
              question: "Wann kann man den Ausweis abholen?",
              questionEs: "¿Cuándo se puede recoger el documento?",
              options: ["Nur am Samstag", "Montag bis Freitag vormittags", "Jeden Nachmittag"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "a2b-h1-4",
              audio:
                "Apotheke am Park, guten Tag. Das Medikament von Herrn Pohl ist da. Er kann es heute bis neunzehn Uhr abholen. Morgen sind wir erst ab acht Uhr wieder da. Bitte den Ausweis mitbringen.",
              twice: true,
              question: "Bis wann kann Herr Pohl das Medikament heute holen?",
              questionEs: "¿Hasta qué hora puede recoger hoy el medicamento el señor Pohl?",
              options: ["Bis 8 Uhr", "Bis 19 Uhr", "Bis 12 Uhr"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "a2b-h1-5",
              audio:
                "Achtung an der Haltestelle Krankenhaus: Der Bus Linie 7 hat heute zwanzig Minuten Verspätung. Der nächste Bus kommt um elf Uhr zehn. Wer zum Termin muss, nimmt bitte ein Taxi.",
              twice: true,
              question: "Wann kommt der nächste Bus?",
              questionEs: "¿Cuándo llega el siguiente autobús?",
              options: ["Um 10.50 Uhr", "Um 11.10 Uhr", "Um 7 Uhr"],
              answer: 1,
            },
          ],
        },
        {
          title: "Hören · Teil 2",
          instruction:
            "Sie hören ein Gespräch. Sie hören das Gespräch einmal. Ordnen Sie die Fotos a–i zu. Vier Fotos bleiben übrig.",
          instructionEs:
            "Escuchas UNA conversación en el trabajo, UNA sola vez. Empareja cada pregunta con una foto (a–i). Sobran cuatro fotos. Lee las cinco preguntas antes: no hay segunda pasada.",
          items: [
            {
              kind: "hoeren-photo-match",
              id: "a2b-h2",
              audio:
                "Svenja, kannst du morgen die Frühschicht machen? Kilian ist krank. | " +
                "Morgen früh nicht, Yara, ich habe um neun einen Termin bei Doktor Lembke. Die Spätschicht geht, ab vierzehn Uhr. | " +
                "Gut. Dann mache ich morgen früh an der Kasse. Und Mittwoch? | " +
                "Mittwoch muss ich um elf zum Bürgeramt, der Ausweis ist fertig. | " +
                "Okay. Ich arbeite Mittwoch im Lager. Du kommst nach dem Amt dorthin. | " +
                "Und Freitag? | " +
                "Freitag ist Betriebssport um siebzehn Uhr in der Halle. Ins Kino gehen wir nicht, das ist samstags. | " +
                "Wenn ich pünktlich Schluss mache, ja. Bis morgen!",
              twice: false,
              dialog: true,
              readSeconds: 30,
              photos: [
                { key: "a", scene: "hospital", sceneEs: "Una consulta médica" },
                { key: "b", scene: "kitchen", sceneEs: "Una cocina" },
                { key: "c", scene: "office", sceneEs: "Un almacén o despacho" },
                { key: "d", scene: "park", sceneEs: "Un parque" },
                { key: "e", scene: "cinema", sceneEs: "Un cine" },
                { key: "f", scene: "home", sceneEs: "Una casa" },
                { key: "g", scene: "sport", sceneEs: "Un polideportivo" },
                { key: "h", scene: "amt", sceneEs: "Una oficina pública" },
                { key: "i", scene: "market", sceneEs: "Un mercado, con caja" },
              ],
              items: [
                {
                  id: "a2b-h2-1",
                  prompt: "Wohin geht Svenja morgen früh?",
                  promptEs: "¿Adónde va Svenja mañana por la mañana?",
                  answer: "a",
                },
                {
                  id: "a2b-h2-2",
                  prompt: "Wo arbeitet Yara morgen früh?",
                  promptEs: "¿Dónde trabaja Yara mañana por la mañana?",
                  answer: "i",
                },
                {
                  id: "a2b-h2-3",
                  prompt: "Wohin muss Svenja am Mittwoch um elf?",
                  promptEs: "¿Adónde tiene que ir Svenja el miércoles a las once?",
                  answer: "h",
                },
                {
                  id: "a2b-h2-4",
                  prompt: "Wo arbeitet Yara am Mittwoch?",
                  promptEs: "¿Dónde trabaja Yara el miércoles?",
                  answer: "c",
                },
                {
                  id: "a2b-h2-5",
                  prompt: "Was machen sie am Freitag nach der Schicht?",
                  promptEs: "¿Qué hacen el viernes después del turno?",
                  answer: "g",
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
            "Cinco diálogos: médico, farmacia, jefe, ventanilla, seguro. Una sola escucha.",
          items: [
            {
              kind: "hoeren-mc",
              id: "a2b-h3-1",
              audio:
                "Guten Tag, ich habe Halsschmerzen und Fieber. | Seit wann? | Seit gestern Abend. | Gut. Ich gebe Ihnen eine Krankschreibung für drei Tage und ein Rezept. Arbeiten gehen Sie bitte erst am Freitag wieder.",
              twice: false,
              question: "Wie lange soll die Frau nicht arbeiten?",
              questionEs: "¿Cuánto tiempo no debe trabajar la mujer?",
              options: ["einen Tag", "drei Tage", "bis gestern"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "a2b-h3-2",
              audio:
                "Ich hätte gern dieses Medikament, dreimal am Tag. | Einmal am Tag reicht, sagt das Rezept. Morgens, nach dem Essen. | Ach so. Und wie lange? | Sieben Tage.",
              twice: false,
              question: "Wie oft soll der Mann das Medikament nehmen?",
              questionEs: "¿Cada cuánto debe tomar el medicamento el hombre?",
              options: ["dreimal am Tag", "einmal am Tag", "siebenmal am Tag"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "a2b-h3-3",
              audio:
                "Herr Uhlmann, kann ich nächsten Montag frei haben? Ich muss zum Amt. | Montag ist schwierig, wir haben Inventur. Geht Dienstag? | Dienstag arbeite ich nachmittags schon. Vormittags ginge. | Gut, dann Dienstag bis zwölf Uhr frei.",
              twice: false,
              question: "Wann hat die Frau frei?",
              questionEs: "¿Cuándo tiene libre la mujer?",
              options: [
                "Montag den ganzen Tag",
                "Dienstag den ganzen Tag",
                "Dienstag bis 12 Uhr",
              ],
              answer: 2,
            },
            {
              kind: "hoeren-mc",
              id: "a2b-h3-4",
              audio:
                "Guten Tag, ich möchte meinen Ausweis abholen. | Name? | Yara Mendes. | Der Ausweis ist da, aber Sie brauchen noch ein Passfoto. Das Fotoautomaten ist im Flur, zwei Euro.",
              twice: false,
              question: "Was fehlt noch?",
              questionEs: "¿Qué falta todavía?",
              options: ["der Ausweis", "ein Passfoto", "zwei Euro für den Ausweis"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "a2b-h3-5",
              audio:
                "Krankenkasse Berlin, mein Name ist Jankovic. Wie kann ich helfen? | Ich habe eine Rechnung vom Zahnarzt, 80 Euro. Zahlen Sie das? | Bitte schicken Sie uns die Rechnung. Ohne Rechnung können wir nichts zahlen. | Gut, ich schicke sie heute per Post.",
              twice: false,
              question: "Was soll der Mann tun?",
              questionEs: "¿Qué debe hacer el hombre?",
              options: [
                "80 Euro selbst zahlen",
                "die Rechnung schicken",
                "zum Zahnarzt gehen",
              ],
              answer: 1,
            },
          ],
        },
        {
          title: "Hören · Teil 4",
          instruction:
            "Sie hören ein Interview. Sie hören das Interview zweimal. Kreuzen Sie an: Richtig oder Falsch.",
          instructionEs:
            "Entrevista con alguien que cambió de trabajo tras una baja. Dos escuchas. Richtig o Falsch.",
          items: [
            {
              kind: "hoeren-group",
              id: "a2b-h4",
              twice: true,
              readSeconds: 30,
              dialog: true,
              audio:
                "Herr Pohl, Sie arbeiten jetzt im Lager und nicht mehr an der Kasse. Warum? | " +
                "Im Winter war ich drei Wochen krank, Rücken. An der Kasse stehen den ganzen Tag ging nicht mehr. Im Lager kann ich sitzen und die Listen machen. | " +
                "War das einfach, den Job zu wechseln? | " +
                "Nein. Zuerst hat die Chefin gesagt: Entweder Kasse oder Schluss. Dann hat der Betriebsrat geholfen. Jetzt habe ich denselben Lohn, aber andere Arbeit. | " +
                "Arbeiten Sie Vollzeit? | " +
                "Nein, sechs Stunden am Tag, Montag bis Freitag. Am Wochenende bin ich frei, das ist neu. Früher hatte ich oft Samstagsschicht. | " +
                "Was raten Sie anderen? | " +
                "Früh zum Arzt gehen und mit der Chefin reden, nicht warten. Und den Betriebsrat anrufen, das hat bei mir den Unterschied gemacht.",
              items: [
                {
                  kind: "hoeren-rf",
                  id: "a2b-h4-1",
                  audio: "",
                  statement: "Herr Pohl arbeitet heute an der Kasse.",
                  statementEs: "El señor Pohl trabaja hoy en caja.",
                  richtig: false,
                },
                {
                  kind: "hoeren-rf",
                  id: "a2b-h4-2",
                  audio: "",
                  statement: "Er war im Winter drei Wochen krank.",
                  statementEs: "En invierno estuvo tres semanas enfermo.",
                  richtig: true,
                },
                {
                  kind: "hoeren-rf",
                  id: "a2b-h4-3",
                  audio: "",
                  statement: "Er verdient im Lager weniger als an der Kasse.",
                  statementEs: "En el almacén gana menos que en caja.",
                  richtig: false,
                },
                {
                  kind: "hoeren-rf",
                  id: "a2b-h4-4",
                  audio: "",
                  statement: "Am Wochenende muss Herr Pohl nicht arbeiten.",
                  statementEs: "El fin de semana el señor Pohl no tiene que trabajar.",
                  richtig: true,
                },
                {
                  kind: "hoeren-rf",
                  id: "a2b-h4-5",
                  audio: "",
                  statement: "Er rät, mit dem Problem zu warten.",
                  statementEs: "Aconseja esperar con el problema.",
                  richtig: false,
                },
              ],
            },
          ],
        },
      ],
    },

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
            "Artículo sobre el deporte de empresa. Cinco preguntas a/b/c. Pregunta primero, texto después.",
          items: [
            {
              kind: "lesen-mc",
              id: "a2b-l1-1",
              title: "Betriebssport bei Märker & Söhne",
              text:
                "Die Firma Märker & Söhne in Lichtenberg hat seit Januar einen Betriebssport. Jeden Dienstag und Freitag um 17 Uhr gibt es in der Halle nebenan eine Stunde Sport: Volleyball, Rückengymnastik oder einfach Laufen im Park.\n\n" +
                "Mitmachen darf, wer in der Firma arbeitet — Vollzeit oder Teilzeit, das ist egal. Die Stunde ist nach der Schicht, nicht in der Arbeitszeit. Wer Spätschicht hat, kann donnerstags um 10 Uhr zur Gymnastik kommen; das ist der einzige Termin am Vormittag.\n\n" +
                "Kostenlos ist der Sport nicht ganz: Die Firma zahlt die Halle, die Mitarbeiter zahlen fünf Euro im Monat. Schuhe muss jeder selbst mitbringen. Eine Dusche gibt es in der Halle.\n\n" +
                "Die Personalchefin Frau Jankovic sagt: „Wir wollen nicht, dass die Leute nach der Arbeit nur müde nach Hause gehen. Wer sich bewegt, fehlt seltener.“ Eine Pflicht ist der Sport nicht. Wer nicht will, muss nicht kommen.",
              question: "Wann ist der Betriebssport normalerweise?",
              questionEs: "¿Cuándo es normalmente el deporte de empresa?",
              options: [
                "dienstags und freitags um 17 Uhr",
                "jeden Morgen um 10 Uhr",
                "in der Arbeitszeit",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "a2b-l1-2",
              question: "Wer darf mitmachen?",
              questionEs: "¿Quién puede participar?",
              options: [
                "nur Vollzeit-Mitarbeiter",
                "alle, die in der Firma arbeiten",
                "nur Leute mit Rückenschmerzen",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "a2b-l1-3",
              question: "Wann können Leute mit Spätschicht Sport machen?",
              questionEs: "¿Cuándo pueden hacer deporte quienes tienen turno de tarde?",
              options: ["dienstags um 17 Uhr", "donnerstags um 10 Uhr", "gar nicht"],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "a2b-l1-4",
              question: "Was zahlen die Mitarbeiter?",
              questionEs: "¿Qué pagan los empleados?",
              options: [
                "nichts, die Firma zahlt alles",
                "5 Euro im Monat, Schuhe selbst",
                "die Halle und die Schuhe",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "a2b-l1-5",
              question: "Ist der Sport Pflicht?",
              questionEs: "¿El deporte es obligatorio?",
              options: [
                "Ja, alle müssen kommen",
                "Nein, wer nicht will, muss nicht",
                "Nur für Leute mit Spätschicht",
              ],
              answer: 1,
            },
          ],
        },
        {
          title: "Lesen · Teil 2",
          instruction:
            "Lesen Sie die Informationen und die Aufgaben. Wählen Sie die richtige Lösung a, b oder c.",
          instructionEs:
            "Tablón con horarios del Amt, la consulta y la farmacia. Busca EL dato.",
          items: [
            {
              kind: "lesen-mc",
              id: "a2b-l2-1",
              title: "Öffnungszeiten — Amt, Praxis, Apotheke",
              text:
                "BÜRGERAMT MITTE\nMo–Fr 8–12 Uhr. Donnerstag zusätzlich 14–18 Uhr. Samstag geschlossen.\nAusweise abholen: nur mit altem Ausweis. Nummern ziehen ab 7.45 Uhr.\n\n" +
                "PRAXIS DR. LEMBKE\nMo, Di, Do 8–12 und 15–18 Uhr. Mi nur 8–12 Uhr. Fr 8–12 Uhr. Am Wochenende geschlossen.\nTermine telefonisch, ohne Termin nur Notfälle.\n\n" +
                "APOTHEKE AM PARK\nMo–Fr 8.30–19 Uhr, Sa 9–13 Uhr. So geschlossen.\nRezepte bitte 20 Minuten vor Schluss bringen.\n\n" +
                "KRANKENKASSE BERLIN, FILIALE LICHTENBERG\nMo–Mi 9–15 Uhr, Do 9–18 Uhr, Fr 9–12 Uhr.",
              question: "Wann hat das Bürgeramt nachmittags auf?",
              questionEs: "¿Cuándo abre el Bürgeramt por la tarde?",
              options: ["jeden Nachmittag", "nur donnerstags", "samstags"],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "a2b-l2-2",
              question: "Kann man am Mittwochnachmittag zu Doktor Lembke?",
              questionEs: "¿Se puede ir el miércoles por la tarde al doctor Lembke?",
              options: ["Ja, bis 18 Uhr", "Nein, mittwochs nur vormittags", "Nur mit Notfall"],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "a2b-l2-3",
              question: "Wann hat die Apotheke samstags auf?",
              questionEs: "¿Cuándo abre la farmacia los sábados?",
              options: ["9–13 Uhr", "8.30–19 Uhr", "sie ist samstags zu"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "a2b-l2-4",
              question: "Bis wann muss man Rezepte in der Apotheke bringen?",
              questionEs: "¿Hasta cuándo hay que llevar las recetas a la farmacia?",
              options: [
                "bis zum Ende der Öffnungszeit",
                "20 Minuten vor Schluss",
                "nur morgens",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "a2b-l2-5",
              question: "Wann hat die Krankenkasse am Freitag auf?",
              questionEs: "¿Cuándo abre el seguro el viernes?",
              options: ["9–15 Uhr", "9–18 Uhr", "9–12 Uhr"],
              answer: 2,
            },
          ],
        },
        {
          title: "Lesen · Teil 3",
          instruction:
            "Lesen Sie die E-Mail und die Aufgaben. Wählen Sie die richtige Lösung a, b oder c.",
          instructionEs:
            "Correo del jefe sobre un curso de seguridad laboral. Cinco preguntas.",
          items: [
            {
              kind: "lesen-mc",
              id: "a2b-l3-1",
              title: "E-Mail von Herrn Uhlmann",
              text:
                "Liebe Frau Mendes,\n\n" +
                "am Donnerstag, den 22. Mai, findet von 9 bis 12 Uhr ein Kurs zur Arbeitssicherheit statt. Der Kurs ist Pflicht für alle im Lager. Er ist in Raum 4, im ersten Stock, nicht in der Halle.\n\n" +
                "Bitte kommen Sie pünktlich. Wer zu spät kommt, muss den Kurs im Juni wiederholen — und der Juni-Termin ist an einem Samstag.\n\n" +
                "Ihre Schicht an diesem Donnerstag fällt aus; Sie bekommen den Lohn trotzdem. Essen gibt es nicht, bringen Sie bitte selbst etwas mit. Getränke stehen im Raum.\n\n" +
                "Wenn Sie krank sind, schreiben Sie mir bis Mittwoch. Eine SMS reicht nicht, ich brauche eine E-Mail.\n\n" +
                "Mit freundlichen Grüßen\nG. Uhlmann",
              question: "Für wen ist der Kurs Pflicht?",
              questionEs: "¿Para quién es obligatorio el curso?",
              options: [
                "für alle in der Firma",
                "für alle im Lager",
                "nur für neue Mitarbeiter",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "a2b-l3-2",
              question: "Wo ist der Kurs?",
              questionEs: "¿Dónde es el curso?",
              options: ["in der Halle", "in Raum 4 im ersten Stock", "im Bürgeramt"],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "a2b-l3-3",
              question: "Was passiert, wenn man zu spät kommt?",
              questionEs: "¿Qué pasa si se llega tarde?",
              options: [
                "man bekommt keinen Lohn",
                "man muss den Kurs an einem Samstag im Juni wiederholen",
                "nichts, der Kurs ist kurz",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "a2b-l3-4",
              question: "Bekommt Frau Mendes am Donnerstag Lohn?",
              questionEs: "¿Cobra la señora Mendes el jueves?",
              options: [
                "Nein, die Schicht fällt aus",
                "Ja, obwohl sie nicht im Lager arbeitet",
                "Nur wenn sie Essen mitbringt",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "a2b-l3-5",
              question: "Wie muss Frau Mendes Bescheid sagen, wenn sie krank ist?",
              questionEs: "¿Cómo debe avisar la señora Mendes si está enferma?",
              options: ["per SMS", "per E-Mail bis Mittwoch", "telefonisch am Donnerstag"],
              answer: 1,
            },
          ],
        },
        {
          title: "Lesen · Teil 4",
          instruction:
            "Lesen Sie die Situationen und die Anzeigen. Welche Anzeige passt? Sie können jede Anzeige nur einmal verwenden.",
          instructionEs:
            "Cinco personas, ocho anuncios de trabajo, salud y trámites. Cada anuncio una vez; sobran tres. Verifica el dato duro: horario, precio, requisito.",
          items: [
            {
              kind: "lesen-match",
              id: "a2b-l4",
              ads: [
                {
                  key: "a",
                  text:
                    "LAGERHILFE GESUCHT. Mo–Fr 6–14 Uhr. Keine Schicht am Wochenende. Bewerbung an uhlmann@maerker.de. Deutsch A2, Erfahrung nicht nötig.",
                },
                {
                  key: "b",
                  text:
                    "PRAXIS DR. LEMBKE sucht Sprechstundenhilfe, Di und Do 15–18 Uhr. Ausbildung Pflicht. Keine Wochenendarbeit.",
                },
                {
                  key: "c",
                  text:
                    "APOTHEKE AM PARK. Medikamente bestellen und abholen, Mo–Fr 8.30–19 Uhr, Sa 9–13. Beratung ohne Termin.",
                },
                {
                  key: "d",
                  text:
                    "BÜRGERAMT MITTE — AUSWEISE. Abholen nur Mo–Fr 8–12, Do auch 14–18. Alten Ausweis mitbringen. Nummern ab 7.45 Uhr.",
                },
                {
                  key: "e",
                  text:
                    "RÜCKENKURS in der Halle Lichtenberg. Donnerstag 10 Uhr, 6 Wochen, 40 Euro. Auch für Schichtarbeiter. Anmeldung in der Praxis.",
                },
                {
                  key: "f",
                  text:
                    "KRANKENKASSE BERLIN. Beratung zu Rechnungen und Arztbesuchen. Do 9–18 Uhr ohne Termin. Andere Tage nur mit Termin.",
                },
                {
                  key: "g",
                  text:
                    "NACHTSCHICHT im Supermarkt, 22–6 Uhr, auch Samstag. 14 Euro die Stunde. Nur mit Führerschein.",
                },
                {
                  key: "h",
                  text:
                    "BETRIEBSSPORT Märker. Di und Fr 17 Uhr, Halle nebenan. 5 Euro im Monat. Für Mitarbeiter, keine Pflicht.",
                },
              ],
              situations: [
                {
                  id: "a2b-l4-1",
                  situation:
                    "Kilian sucht Arbeit am Morgen, ohne Wochenende, und hat noch nicht viel Erfahrung.",
                  situationEs:
                    "Kilian busca trabajo por la mañana, sin fines de semana, y aún no tiene mucha experiencia.",
                  answer: "a",
                },
                {
                  id: "a2b-l4-2",
                  situation:
                    "Svenja hat Rückenschmerzen und Spätschicht. Sie kann nur vormittags zu einem Kurs.",
                  situationEs:
                    "Svenja tiene dolor de espalda y turno de tarde. Solo puede ir a un curso por la mañana.",
                  answer: "e",
                },
                {
                  id: "a2b-l4-3",
                  situation:
                    "Yara muss ihren Ausweis abholen und kann nur nach der Arbeit, nach 14 Uhr.",
                  situationEs:
                    "Yara tiene que recoger el documento y solo puede después del trabajo, después de las 14.",
                  answer: "d",
                },
                {
                  id: "a2b-l4-4",
                  situation:
                    "Anna hat eine Rechnung vom Zahnarzt und möchte ohne Termin mit der Kasse sprechen.",
                  situationEs:
                    "Anna tiene una factura del dentista y quiere hablar con el seguro sin cita.",
                  answer: "f",
                },
                {
                  id: "a2b-l4-5",
                  situation:
                    "Nico arbeitet bei Märker und möchte nach der Schicht Sport machen, ohne Pflicht.",
                  situationEs:
                    "Nico trabaja en Märker y quiere hacer deporte después del turno, sin que sea obligatorio.",
                  answer: "h",
                },
              ],
            },
          ],
        },
      ],
    },

    {
      skill: "schreiben",
      label: "Schreiben",
      minutes: 30,
      teile: [
        {
          title: "Schreiben · Teil 1 (SMS, circa 20–30 Wörter)",
          instruction:
            "Schreiben Sie eine SMS (20 bis 30 Wörter). Schreiben Sie zu jedem Punkt ein bis zwei Sätze.",
          instructionEs:
            "SMS a un compañero, registro du. Tres Punkte, 20-30 palabras.",
          items: [
            {
              kind: "schreiben-message",
              id: "a2b-s1",
              task:
                "Sie sind krank und können morgen nicht zur Frühschicht kommen. Schreiben Sie eine SMS an Kilian.",
              taskEs:
                "Estás enfermo y mañana no puedes ir al turno de mañana. Escríbele un SMS a Kilian.",
              points: [
                "Di que estás enfermo y no vas mañana",
                "Pide que se lo diga al jefe",
                "Di cuándo crees que vuelves",
              ],
              words: 25,
              model:
                "Hallo Kilian,\nich bin krank und kann morgen nicht zur Frühschicht kommen. Sag bitte Herrn Uhlmann Bescheid. Ich denke, ich bin am Freitag wieder da.\nDanke\nSvenja",
            },
          ],
        },
        {
          title: "Schreiben · Teil 2 (E-Mail, circa 30–40 Wörter)",
          instruction:
            "Schreiben Sie eine E-Mail (30 bis 40 Wörter) in der Sie-Form. Schreiben Sie zu jedem Punkt ein bis zwei Sätze.",
          instructionEs:
            "Correo formal al Bürgeramt, Sie de principio a fin. Tres Punkte, 30-40 palabras.",
          items: [
            {
              kind: "schreiben-message",
              id: "a2b-s2",
              task:
                "Ihr Ausweis ist fertig, aber Sie können vormittags nicht zum Amt. Schreiben Sie eine E-Mail an das Bürgeramt Mitte.",
              taskEs:
                "Tu documento está listo, pero no puedes ir por la mañana al Amt. Escribe un correo al Bürgeramt Mitte.",
              points: [
                "Di que tu documento está listo y cómo te llamas",
                "Explica que por la mañana trabajas",
                "Pregunta si puedes ir el jueves por la tarde",
              ],
              words: 35,
              model:
                "Sehr geehrte Damen und Herren,\nmein Name ist Yara Mendes. Mein neuer Ausweis ist fertig, aber vormittags muss ich arbeiten. Kann ich ihn bitte am Donnerstagnachmittag abholen?\nMit freundlichen Grüßen\nYara Mendes",
            },
          ],
        },
      ],
    },

    {
      skill: "sprechen",
      label: "Sprechen",
      minutes: 15,
      teile: [
        {
          title: "Sprechen · Teil 1 — Fragen stellen",
          instruction:
            "Stellen Sie Ihrem Partner / Ihrer Partnerin Fragen zu den Karten und antworten Sie.",
          instructionEs:
            "Preguntas de tarjeta sobre trabajo, salud y citas. Frases completas.",
          items: [
            {
              kind: "sprechen",
              id: "a2b-sp1",
              teil: 1,
              weight: 3,
              prompt: "Thema: Arbeit — Wort: Schicht",
              promptEs: "Tema: trabajo — palabra: turno",
              model:
                "Arbeitest du in Schichten? — Ja, ich habe oft Frühschicht ab halb sieben. Am Wochenende bin ich frei.",
            },
            {
              kind: "sprechen",
              id: "a2b-sp2",
              teil: 1,
              weight: 3,
              prompt: "Thema: Gesundheit — Wort: Arzt",
              promptEs: "Tema: salud — palabra: médico",
              model:
                "Wann gehst du zum Arzt? — Ich gehe zum Arzt, wenn ich Fieber habe. Nächste Woche habe ich einen Termin um vierzehn Uhr.",
            },
            {
              kind: "sprechen",
              id: "a2b-sp3",
              teil: 1,
              weight: 3,
              prompt: "Thema: Stadt — Wort: Amt",
              promptEs: "Tema: ciudad — palabra: oficina municipal",
              model:
                "Wann ist das Bürgeramt auf? — Vormittags von acht bis zwölf, und donnerstags auch nachmittags. Samstags ist es zu.",
            },
          ],
        },
        {
          title: "Sprechen · Teil 2 — Von sich erzählen",
          instruction:
            "Erzählen Sie von sich. Sprechen Sie zu den Punkten auf der Karte.",
          instructionEs:
            "Habla de un día de trabajo o de una visita al médico, con pasado.",
          items: [
            {
              kind: "sprechen",
              id: "a2b-sp4",
              teil: 2,
              weight: 5,
              speakSeconds: 90,
              prompt:
                "Erzählen Sie von einem Tag bei der Arbeit oder beim Arzt.\n• Wann sind Sie gegangen?\n• Was ist passiert?\n• Wie war der Tag?",
              promptEs:
                "Cuenta un día de trabajo o en el médico: a qué hora fuiste, qué pasó y cómo fue.",
              model:
                "Gestern hatte ich Frühschicht. Ich bin um sechs aufgestanden und um halb sieben an der Arbeit gewesen. Am Vormittag war viel zu tun im Lager. Nach der Schicht bin ich zur Apotheke gegangen, weil ich Halsschmerzen hatte. Der Tag war anstrengend, aber am Abend ging es mir besser.",
            },
          ],
        },
        {
          title: "Sprechen · Teil 3 — Gemeinsam planen",
          instruction:
            "Planen Sie zusammen. Machen Sie Vorschläge, reagieren Sie und einigen Sie sich.",
          instructionEs:
            "Planear juntos una visita al Amt y al médico en la misma mañana. Proponer, rechazar con motivo, alternativa, acuerdo.",
          items: [
            {
              kind: "sprechen",
              id: "a2b-sp5",
              teil: 3,
              weight: 6,
              speakSeconds: 180,
              prompt:
                "Situation: Sie haben beide am Donnerstag frei. Sie müssen zum Bürgeramt und zum Arzt.\n\n" +
                "• Wann gehen Sie zum Amt?\n" +
                "• Wann zum Arzt?\n" +
                "• Wie fahren Sie (Bus, Bahn, Fahrrad)?\n" +
                "• Wo essen Sie danach?",
              promptEs:
                "Los dos tenéis libre el jueves. Hay que ir al Amt y al médico: a qué hora cada cosa, cómo vais y dónde coméis después.",
              model:
                "Wollen wir um acht zum Amt? Da sind weniger Leute. — Gute Idee. Und der Arzt? Um zehn habe ich den Termin. — Das passt mir nicht, mein Termin ist um elf. Lieber nach dem Amt einen Kaffee, und um elf gehen wir zusammen zur Praxis. — Einverstanden. Fahren wir mit dem Bus? — Der Bus hat oft Verspätung. Lieber mit dem Fahrrad, das dauert zehn Minuten. Danach essen wir in der Kantine neben der Praxis. — Super. Einverstanden!",
            },
          ],
        },
      ],
    },
  ],
};
