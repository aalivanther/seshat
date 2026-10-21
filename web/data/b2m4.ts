import type { Phase, VocabItem } from "@/lib/types";

// B2 · MÓDULO 4 — Der eine lange Satz: comprimir. El atributo participial es
// una relativa plegada, y por eso va DESPUÉS de tener la relativa completa
// (B1) y de saber nominalizar (m3). Cierra el bloque escrito: citar,
// despersonalizar, nominalizar, comprimir. A partir de aquí las lecturas
// pueden traer frases de verdad.
// Gramática ancla: Partizip I/II extendidos · Gerundivum · relativa con
// preposición · dessen/deren · was/wo(r)-. Clínica L5: la declinación del
// adjetivo DENTRO del atributo largo (b1m9 se cobra, no se reenseña).
// Recicla: a2m10ausbildung, b1m6abschluss, b1m11zkstipendium, b1m7festeigend,
// b1m7fekommend, b1m1steigendemieten. Elenco: Leo (estudiante), Prof. Dr. Holm
// (tutor). Ids: prefijo b2m4.

const RADIO_SEMINAR =
  "So, herzlich willkommen im Seminar «Wissenschaftliches Arbeiten». Mein Name ist Holm, ich betreue Sie in diesem Semester. Heute: der eine lange Satz, den Sie in jeder Hausarbeit werden lesen müssen. Zuerst Leo, Sie haben das Referat. | Also, ich fang mit dem zu lösenden Problem an. Die ständig steigenden Studiengebühren, äh, Gebühren gibt’s bei uns kaum, ich meine die steigenden Lebenshaltungskosten. Die vom Senat im März beschlossene Erhöhung des Semestertickets trifft vor allem die, deren Stipendium nicht reicht. | Holm. | Gut. Sie haben das Partizip II schon im Attribut. «Die vom Senat beschlossene Erhöhung» — das ist die Reform, die der Senat beschlossen hat, nur gefaltet. Einmal noch, langsamer. | Leo. | Die gestern vom Prüfungsausschuss veröffentlichte Ordnung gilt ab April. Das zu lesende Kapitel ist das zur Zulassung. Alles, was nach der Immatrikulation kommt, steht in §4. | Holm. | Achten Sie auf die Endung. Die veröffentlichte Ordnung, nicht *die veröffentlicht Ordnung. Das Adjektiv im Attribut wird dekliniert wie jedes andere. Wer die Endung vergisst, versenkt einen Satz von zwanzig Wörtern. | Eine Frage aus dem Seminar, Mara, äh, Anna ist nicht da, eine Stimme: Wofür braucht man das Gerundivum? | Holm. | Für Pflichten. Das zu schreibende Referat. Die zu beantragende Verlängerung. Es ist zu plus Partizip I, und es bedeutet: das muss gemacht werden. Spanisch hat dafür nichts Vergleichbares. Deshalb schreibt es niemand von allein. | Leo. | Der Kollege, mit dem ich die Hausarbeit schreibe, hat dessen Literaturverzeichnis benutzt. Dessen, weil der Kollege maskulin ist. | Holm. | Genau. Und was Sie stört, das, was Sie stört, kommt mit was, nicht mit das, wenn das Bezugswort ein Pronomen oder ein Satz ist. Alles, was in der Prüfungsordnung steht, gilt. Nicht: alles, das. | Letzte Runde. Das Stipendium, um das Sie sich bewerben, hat eine Frist. Der Antrag, auf den Sie warten, liegt beim Prüfungsamt. Die Anerkennung der im Ausland erbrachten Leistungen ist das zu klärende Thema der Sprechstunde am Donnerstag. Notieren Sie das. Eine Hausarbeit, die nächste Woche abgegeben werden muss, ist eine nächste Woche abzugebende Hausarbeit. Falten Sie den Satz, und falten Sie ihn wieder auf, wenn Sie ihn nicht verstehen. Das ist das ganze Modul.";

export const vocabB2m4: Record<string, VocabItem> = {
  b2m4steigendepreise: {
    id: "b2m4steigendepreise", target: "die ständig steigenden Preise", source: "los precios que no dejan de subir (Partizip I extendido)",
    sound: "dii SHTE-ndij SHTAI-guen-den PRAI-ze",
    gram: { partizip: { relative: "die Preise, die ständig steigen", attr: "die ständig steigenden Preise" } },
  },
  b2m4studiengang: { id: "b2m4studiengang", target: "der Studiengang", source: "el grado / la carrera (el itinerario oficial)", article: "der", plural: "Studiengänge", sound: "SHTUU-di-en-gang" },
  b2m4zulassung: { id: "b2m4zulassung", target: "die Zulassung", source: "la admisión (a un grado, a un examen)", article: "die", plural: "Zulassungen", sound: "TSU-la-sung" },
  b2m4hausarbeit: { id: "b2m4hausarbeit", target: "die Hausarbeit", source: "el trabajo escrito (de asignatura, no los deberes del cole)", article: "die", plural: "Hausarbeiten", sound: "HAUS-ar-bait" },
  b2m4referat: { id: "b2m4referat", target: "das Referat", source: "la exposición oral en un seminario", article: "das", plural: "Referate", sound: "re-fe-RAAT" },

  b2m4beschlossenereform: {
    id: "b2m4beschlossenereform", target: "die gestern beschlossene Reform", source: "la reforma que se aprobó ayer (Partizip II extendido)",
    sound: "dii GES-tan be-SHLO-se-ne re-FORM",
    gram: { partizip: { relative: "die Reform, die gestern beschlossen wurde", attr: "die gestern beschlossene Reform" } },
  },
  b2m4vomparlament: {
    id: "b2m4vomparlament", target: "die vom Parlament beschlossene Reform", source: "la reforma aprobada por el parlamento",
    sound: "dii fom par-la-MENT be-SHLO-se-ne re-FORM",
  },
  b2m4semester: { id: "b2m4semester", target: "das Semester", source: "el semestre", article: "das", plural: "Semester", sound: "ze-MES-ta" },
  b2m4pruefungsordnung: { id: "b2m4pruefungsordnung", target: "die Prüfungsordnung", source: "el reglamento de exámenes (el de verdad, no la Hausordnung)", article: "die", plural: "Prüfungsordnungen", sound: "PRÜ-fungs-ord-nung" },
  b2m4immatrikulation: { id: "b2m4immatrikulation", target: "die Immatrikulation", source: "la matrícula universitaria", article: "die", sound: "i-ma-tri-ku-la-TSIOON" },

  b2m4zuloesende: {
    id: "b2m4zuloesende", target: "das zu lösende Problem", source: "el problema que hay que resolver (Gerundivum: zu + Partizip I, pasivo y obligatorio)",
    sound: "das tsu LÖ-zen-de pro-BLEEM",
    gram: {
      same: ["das Problem, das gelöst werden muss"],
      partizip: { relative: "das Problem, das gelöst werden muss", attr: "das zu lösende Problem" },
    },
  },
  b2m4zulesende: {
    id: "b2m4zulesende", target: "die zu lesende Literatur", source: "la bibliografía que hay que leer",
    sound: "dii tsu LEE-zen-de li-te-ra-TUUR",
  },
  b2m4nc: { id: "b2m4nc", target: "der Numerus clausus", source: "la nota de corte (plazas limitadas)", article: "der", sound: "NUU-me-rus KLAU-zus" },
  b2m4fachhochschule: { id: "b2m4fachhochschule", target: "die Fachhochschule", source: "la universidad de ciencias aplicadas (más práctica que la Universität)", article: "die", plural: "Fachhochschulen", sound: "FAJ-hooj-shuu-le" },
  b2m4wibetreuung: {
    id: "b2m4wibetreuung", target: "die wissenschaftliche Betreuung", source: "la tutoría académica (no el cuidado de niños)",
    article: "die", sound: "VI-sen-shaft-li-je be-TROI-ung",
  },

  b2m4mitdem: {
    id: "b2m4mitdem", target: "der Kollege, mit dem ich zusammenarbeite", source: "el compañero con el que trabajo",
    sound: "dea ko-LEE-gue, mit deem ij tsu-ZA-men-ar-bai-te",
    gram: { trap: "der Kollege, mit dem ich arbeite mit" },
  },
  b2m4dessen: {
    id: "b2m4dessen", target: "der Student, dessen Hausarbeit ich lese", source: "el estudiante cuyo trabajo escrito leo (dessen = masculino/neutro)",
    sound: "dea SHTOO-dent, DES-en HAUS-ar-bait ij LEE-ze",
    gram: { trap: "der Student, dass Hausarbeit ich lese" },
  },
  b2m4deren: {
    id: "b2m4deren", target: "die Studentin, deren Referat überzeugt", source: "la estudiante cuyo trabajo convence (deren = femenino/plural)",
    sound: "dii SHTOO-den-tin, DEE-ren re-fe-RAAT ü-ba-TSOiKT",
  },
  b2m4anerkennung: { id: "b2m4anerkennung", target: "die Anerkennung von Abschlüssen", source: "el reconocimiento de titulaciones", article: "die", sound: "AN-ea-ke-nung fon AP-shlü-sen" },
  b2m4wofuer: {
    id: "b2m4wofuer", target: "sich interessieren für / wofür", source: "interesarse por / por lo que me intereso (wo(r)- + preposición)",
    sound: "vo-FÜA ij mij in-te-re-SII-re",
    gram: { rektion: { prep: "für", case: "akk", stem: "sich interessieren" }, trap: "wofür ich mich interessiere für" },
  },
  b2m4daswas: {
    id: "b2m4daswas", target: "das, was mich stört", source: "lo que me molesta (was, no das, tras pronombre/indefinido)",
    sound: "das, vas mij SHTOAT",
    gram: { trap: "das, das mich stört" },
  },
  b2m4alleswas: {
    id: "b2m4alleswas", target: "alles, was in der Ordnung steht", source: "todo lo que figura en el reglamento",
    sound: "A-les, vas in dea ORD-nung shteet",
  },

  b2m4langenattribut: {
    id: "b2m4langenattribut", target: "die gestern vom Parlament beschlossene Reform", source: "la reforma que el parlamento aprobó ayer (atributo de dos modificadores)",
    sound: "dii GES-tan fom par-la-MENT be-SHLO-se-ne re-FORM",
    gram: { partizip: { relative: "die Reform, die das Parlament gestern beschlossen hat", attr: "die gestern vom Parlament beschlossene Reform" } },
  },
  b2m4neueingerichtete: {
    id: "b2m4neueingerichtete", target: "der neu eingerichtete Studiengang", source: "el grado de nueva creación",
    sound: "dea noi AIN-gue-rij-te-te SHTUU-di-en-gang",
  },
  b2m4zutreffende: {
    id: "b2m4zutreffende", target: "die dringend zu treffende Entscheidung", source: "la decisión que hay que tomar ya (Gerundivum + adverbio)",
    sound: "dii DRIN-gent tsu TRE-fen-de ent-SHAI-dung",
  },

  b2m4studienordnung: { id: "b2m4studienordnung", target: "die Studienordnung", source: "el plan de estudios oficial (el de Lesen Teil 5)", article: "die", plural: "Studienordnungen", sound: "SHTUU-di-en-ord-nung" },
  b2m4einschreibung: { id: "b2m4einschreibung", target: "die Einschreibung", source: "la inscripción (en una asignatura, en un examen)", article: "die", plural: "Einschreibungen", sound: "AIN-shrai-bung" },
  b2m4modulhandbuch: { id: "b2m4modulhandbuch", target: "das Modulhandbuch", source: "la guía docente / el catálogo de módulos", article: "das", plural: "Modulhandbücher", sound: "mo-DUUL-hant-buuj" },
  b2m4leistungspunkte: { id: "b2m4leistungspunkte", target: "die Leistungspunkte (ECTS)", source: "los créditos ECTS", article: "die", sound: "LAIS-tungs-punk-te" },
  b2m4inskription: { id: "b2m4inskription", target: "die Inskription (österr. für Immatrikulation)", source: "la matrícula — palabra austriaca; en Alemania: die Immatrikulation", article: "die", sound: "in-skrip-TSIOON" },

  b2m4kolloquium: { id: "b2m4kolloquium", target: "das Kolloquium", source: "el coloquio / la defensa breve ante el profesor", article: "das", plural: "Kolloquien", sound: "ko-LO-kvi-um" },
  b2m4sprechstunde: { id: "b2m4sprechstunde", target: "die Sprechstunde", source: "la hora de tutoría", article: "die", plural: "Sprechstunden", sound: "SHPREJ-shtun-de" },
  b2m4pruefungsamt: { id: "b2m4pruefungsamt", target: "das Prüfungsamt", source: "la secretaría de exámenes", article: "das", sound: "PRÜ-fungs-amt" },
  b2m4semesterticket: { id: "b2m4semesterticket", target: "das Semesterticket", source: "el abono de transporte del semestre", article: "das", plural: "Semestertickets", sound: "ze-MES-ta-ti-ket" },

  b2m4hiermitbeantrage: {
    id: "b2m4hiermitbeantrage", target: "Hiermit beantrage ich die Verlängerung", source: "Por la presente solicito la prórroga",
    sound: "HIIA-mit be-AN-traa-gue ij dii fea-LEN-ge-rung",
  },
  b2m4verlaengerung: { id: "b2m4verlaengerung", target: "die Verlängerung", source: "la prórroga (de un plazo, de un visado de estudios)", article: "die", plural: "Verlängerungen", sound: "fea-LEN-ge-rung" },
  b2m4antrag: { id: "b2m4antrag", target: "der Antrag", source: "la solicitud (el escrito, no la Bewerbung de empleo)", article: "der", plural: "Anträge", sound: "AN-traak" },
  b2m4abgabefrist: { id: "b2m4abgabefrist", target: "die Abgabefrist", source: "el plazo de entrega", article: "die", plural: "Abgabefristen", sound: "AP-gaa-be-frist" },

  b2m4partizipialattribut: { id: "b2m4partizipialattribut", target: "das Partizipialattribut", source: "el atributo participial (la relativa plegada)", article: "das", plural: "Partizipialattribute", sound: "par-tsi-PII-al-a-tri-buut" },
  b2m4gerundivum: { id: "b2m4gerundivum", target: "das Gerundivum", source: "el gerundivo: zu + Partizip I con valor de obligación", article: "das", sound: "gue-run-DII-vum" },
  b2m4kompression: { id: "b2m4kompression", target: "die Kompression", source: "la compresión (de una relativa a un atributo)", article: "die", sound: "kom-pre-SIOON" },
  b2m4literaturverzeichnis: { id: "b2m4literaturverzeichnis", target: "das Literaturverzeichnis", source: "la bibliografía (la lista del final)", article: "das", plural: "Literaturverzeichnisse", sound: "li-te-ra-TUUR-fea-tsaij-nis" },
  b2m4pruefungsausschuss: { id: "b2m4pruefungsausschuss", target: "der Prüfungsausschuss", source: "la comisión de evaluación", article: "der", plural: "Prüfungsausschüsse", sound: "PRÜ-fungs-aus-shus" },
  b2m4sprechstunden: { id: "b2m4sprechstunden", target: "in die Sprechstunde kommen", source: "acudir a tutoría", sound: "in dii SHPREJ-shtun-de KO-men" },
  b2m4vorlesungszeit: { id: "b2m4vorlesungszeit", target: "die Vorlesungszeit", source: "el periodo lectivo (cuando hay clase)", article: "die", sound: "FOA-lee-zungs-tsait" },
  b2m4kommilitonin: { id: "b2m4kommilitonin", target: "die Kommilitonin / der Kommilitone", source: "la compañera / el compañero de estudios", article: "die", plural: "Kommilitoninnen", sound: "ko-mi-li-TOO-nin" },
  b2m4erstsemester: { id: "b2m4erstsemester", target: "das Erstsemester", source: "el estudiante de primer semestre", article: "das", plural: "Erstsemester", sound: "ERST-ze-mes-ta" },
  b2m4modulbeschreibung: { id: "b2m4modulbeschreibung", target: "die Modulbeschreibung", source: "la ficha de la asignatura", article: "die", plural: "Modulbeschreibungen", sound: "mo-DUUL-be-shrai-bung" },
  b2m4transcript: { id: "b2m4transcript", target: "das Transcript", source: "el certificado de notas (el que se pide para convalidar)", article: "das", plural: "Transcripts", sound: "TRANS-kript" },
  b2m4werktag: { id: "b2m4werktag", target: "der Werktag", source: "el día laborable", article: "der", plural: "Werktage", sound: "VERK-taak" },

  b2m4natansteht: { id: "b2m4natansteht", target: "Das Problem, das noch ansteht", source: "el problema que aún está pendiente (calle)", sound: "das pro-BLEEM, das noj AN-shteet" },
  b2m4natreformgestern: { id: "b2m4natreformgestern", target: "Die neue Reform von gestern", source: "la reforma nueva de ayer (calle: sin participio)", sound: "dii NOI-e re-FORM fon GES-tan" },
  b2m4natkollegehalt: { id: "b2m4natkollegehalt", target: "Mein Kollege halt", source: "mi compañero, ya me entiendes (calle: halt en vez de relativa)", sound: "main ko-LEE-gue halt" },
  b2m4natwasmichstort: { id: "b2m4natwasmichstort", target: "Was mich stört: …", source: "Lo que me molesta: … (calle: dos puntos, sin das)", sound: "vas mij SHTOAT" },
};

export const b2m4: Phase = {
  id: "b2m4",
  level: "b2",
  n: 4,
  title: "Der eine lange Satz",
  goal: "Comprimir y deshacer: atributo participial, Gerundivum, relativa con preposición y cuyo, y leer un reglamento universitario sin perder el hilo.",
  color: "#1d4ed8",
  lessons: [
    {
      id: "b2m4l1",
      phaseId: "b2m4",
      title: "Die ständig steigenden Preise",
      subtitle: "Partizip I extendido: la relativa de «que está ocurriendo»",
      minutes: 12,
      sections: [
        {
          kind: "phrases",
          title: "Lo que sube, plegado",
          itemIds: ["b2m4steigendepreise", "b2m4studiengang", "b2m4zulassung", "b2m4hausarbeit", "b2m4referat"],
        },
        {
          kind: "note",
          note: {
            title: "La regla detrás: el participio come la relativa, y luego se declina",
            body: "El B1 ya te dio <i>die steigenden Mieten</i> (b1m7): Partizip I = infinitivo + d, y luego terminación de adjetivo. El B2 añade <b>modificadores delante</b>:<br/><br/><i>die Preise, die ständig steigen</i> → <b>die ständig steigenden Preise</b><br/><br/>El adverbio (ständig) se cuela entre el artículo y el participio. El participio se queda pegado al sustantivo y <b>se declina</b>: die steigend<b>en</b> Preise, ein steigend<b>er</b> Preis, steigend<b>e</b> Preise.<br/><br/>La operación es bidireccional: <b>deshacer</b> para leer, <b>rehacer</b> para escribir. Si no puedes deshacerlo, no lo has entendido. Si no puedes rehacerlo, el Schreiben se queda en relativas de B1.<br/><br/>Campo de este módulo: la universidad de Leo. [[Studiengang|carrera]], [[Zulassung|admisión]], [[Hausarbeit|trabajo escrito]], [[Referat|exposición]].",
            table: [
              ["relativa (B1)", "atributo (B2)"],
              ["die Preise, die steigen", "die steigenden Preise"],
              ["die Preise, die ständig steigen", "die ständig steigenden Preise"],
              ["ein Studiengang, der überzeugt", "ein überzeugender Studiengang"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m4l1e1", type: "fastmatch", prompt: "Calentamiento: participios y títulos que ya tienes",
              pairs: [
                { target: "steigend (die steigenden Preise)", source: "que sube / creciente" },
                { target: "kommend (das kommende Fest)", source: "próximo" },
                { target: "die Ausbildung", source: "la formación profesional" },
                { target: "der Abschluss", source: "el título" },
                { target: "das Stipendium", source: "la beca" },
              ],
              targetSeconds: 22,
              itemIds: ["b1m7festeigend", "b1m7fekommend", "a2m10ausbildung", "b1m6abschluss", "b1m11zkstipendium"],
            },
            {
              id: "b2m4l1e2", type: "transform", prompt: "Pliega la relativa",
              source: "die Preise, die ständig steigen",
              instruction: "Dilo con Partizip I extendido",
              answers: ["die ständig steigenden Preise"],
              itemIds: ["b2m4steigendepreise", "b1m7festeigend"],
            },
            {
              id: "b2m4l1e3", type: "transform", prompt: "Deshaz el atributo",
              source: "die ständig steigenden Preise",
              instruction: "Dilo con una relativa",
              answers: ["die Preise, die ständig steigen"],
              itemIds: ["b2m4steigendepreise"],
              tip: "Las dos direcciones. Leer es deshacer; escribir es rehacer.",
            },
            {
              id: "b2m4l1e4", type: "cloze", prompt: "La terminación del participio",
              text: "Leo sucht einen überzeugend___ Studiengang.",
              answers: ["en"],
              translation: "Leo busca un grado que convenza.",
              hints: ["ein + masculino acusativo → -e-n", "überzeugenden"],
              itemIds: ["b2m4studiengang"],
              strictUmlaut: true,
            },
            {
              id: "b2m4l1e5", type: "match", prompt: "Empareja el léxico de la carrera",
              pairs: [
                { target: "der Studiengang", source: "el grado / la carrera" },
                { target: "die Zulassung", source: "la admisión" },
                { target: "die Hausarbeit", source: "el trabajo escrito" },
                { target: "das Referat", source: "la exposición del seminario" },
              ],
              itemIds: ["b2m4studiengang", "b2m4zulassung", "b2m4hausarbeit", "b2m4referat"],
            },
            {
              id: "b2m4l1e6", type: "mc", prompt: "¿El sustantivo hace o recibe?",
              question: "„die steigenden Lebenshaltungskosten“ — las costas…",
              options: ["suben (Partizip I, activo)", "han sido subidas (Partizip II, pasivo)", "hay que subirlas (Gerundivum)"],
              answer: 0,
              whyWrong: [null, "Eso sería die gestiegenen / die angehobenen Kosten", "Eso sería die zu senkenden Kosten"],
              itemIds: ["b2m4steigendepreise"],
            },
            {
              id: "b2m4l1e7", type: "gapbank", prompt: "Pliega dos relativas",
              text: "Die ständig steigend___ Kosten treffen die, die eine Zulassung suchen. Ein überzeugend___ Referat hilft. Die kommende___ Hausarbeit ist länger.",
              answers: ["en", "es", "e"],
              bank: ["en", "es", "e", "er", "em", "s"],
              translation: "Los costes que no dejan de subir afectan a quienes buscan plaza. Una exposición convincente ayuda. El trabajo que viene es más largo.",
              itemIds: ["b2m4steigendepreise", "b2m4zulassung", "b2m4referat", "b2m4hausarbeit"],
              tip: "die …en Kosten · ein …es Referat (neutro) · die …e Hausarbeit. La clínica de la L5 cobra esto en frases de veinte palabras.",
            },
            {
              id: "b2m4l1e8", type: "type", prompt: "Cierre de producción",
              question: "los precios que no dejan de subir; un grado que convence",
              answers: [
                "die ständig steigenden Preise; ein überzeugender Studiengang",
                "die ständig steigenden Preise, ein überzeugender Studiengang",
              ],
              itemIds: ["b2m4steigendepreise", "b2m4studiengang"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-b2m4-1",
            book: "Das Problem, das wir lösen müssen.",
            real: "Das Problem, das noch ansteht.",
            meaning: "El problema que hay que resolver / que aún está pendiente",
            when: "En el pasillo del seminario. anstehen es «estar pendiente». En el Schreiben y en una Hausarbeit, el Gerundivum es el traje: das zu lösende Problem. La relativa de obligación también vale; el Gerundivum sube Strukturen.",
            register: "neutral",
            exam: "Das zu lösende Problem.",
            note: "anstehen no es anstehen de cola: es el asunto que aún no se ha ido.",
            sound: "das pro-BLEEM, das noj AN-shteet",
            level: "b2",
            produce: true,
            itemId: "b2m4natansteht",
          },
        },
      ],
    },

    {
      id: "b2m4l2",
      phaseId: "b2m4",
      title: "Die gestern beschlossene Reform",
      subtitle: "Partizip II extendido: lo que ya está hecho, delante del nombre",
      minutes: 13,
      sections: [
        {
          kind: "phrases",
          title: "La reforma, plegada",
          itemIds: ["b2m4beschlossenereform", "b2m4vomparlament", "b2m4semester", "b2m4pruefungsordnung", "b2m4immatrikulation"],
        },
        {
          kind: "note",
          note: {
            title: "La regla detrás: el sustantivo RECIBE, y von se cuela en medio",
            body: "<i>Die Reform, die das Parlament gestern beschlossen hat</i> → <b>die gestern vom Parlament beschlossene Reform</b>.<br/><br/>Tres piezas, de izquierda a derecha:<br/>1. el artículo del sustantivo (die Reform)<br/>2. los modificadores (gestern, vom Parlament)<br/>3. el Partizip II <b>con terminación</b> (beschlossen<b>e</b>)<br/>4. el sustantivo<br/><br/>El agente entra con <b>von</b> (o durch), igual que en la pasiva. El tiempo (gestern) va delante del von. El orden no es gusto: es te-ka… dentro del atributo.<br/><br/>Si no puedes deshacerlo, léelo al revés: sustantivo → ¿qué le han hecho? → ¿quién? → ¿cuándo?",
            table: [
              ["relativa", "atributo"],
              ["die Reform, die gestern beschlossen wurde", "die gestern beschlossene Reform"],
              ["die Reform, die das Parlament beschlossen hat", "die vom Parlament beschlossene Reform"],
              ["die Ordnung, die der Ausschuss veröffentlicht hat", "die vom Ausschuss veröffentlichte Ordnung"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m4l2e1", type: "transform", prompt: "Pliega",
              source: "die Reform, die gestern beschlossen wurde",
              instruction: "Atributo con Partizip II",
              answers: ["die gestern beschlossene Reform"],
              itemIds: ["b2m4beschlossenereform"],
            },
            {
              id: "b2m4l2e2", type: "transform", prompt: "Pliega con agente",
              source: "die Reform, die das Parlament beschlossen hat",
              instruction: "Atributo con von",
              answers: ["die vom Parlament beschlossene Reform"],
              itemIds: ["b2m4vomparlament"],
            },
            {
              id: "b2m4l2e3", type: "transform", prompt: "Deshaz",
              source: "die gestern vom Parlament beschlossene Reform",
              instruction: "Relativa completa",
              answers: [
                "die Reform, die das Parlament gestern beschlossen hat",
                "die Reform, die gestern vom Parlament beschlossen wurde",
              ],
              itemIds: ["b2m4langenattribut"],
            },
            {
              id: "b2m4l2e4", type: "cloze", prompt: "Completa von o el participio",
              text: "Die ___ Prüfungsausschuss veröffentlichte Ordnung gilt ab April.",
              answers: ["vom"],
              translation: "El reglamento publicado por la comisión vale a partir de abril.",
              itemIds: ["b2m4pruefungsordnung", "b2m4pruefungsausschuss"],
            },
            {
              id: "b2m4l2e5", type: "errorfix", prompt: "Un hispanohablante escribió esto. Arréglalo.",
              wrong: "die gestern beschlossen Reform",
              answers: ["die gestern beschlossene Reform"],
              why: "Delante del sustantivo el participio es un adjetivo y se declina: beschlossenE. Sin terminación solo vale en el Perfekt (hat beschlossen), no como atributo.",
              itemIds: ["b2m4beschlossenereform"],
            },
            {
              id: "b2m4l2e6", type: "gapbank", prompt: "Orden dentro del atributo",
              text: "Die gestern ___ Parlament beschlossen___ Reform gilt. Die ___ Ausschuss veröffentlichte Ordnung steht online. Das ___ Semester beginnt im April.",
              answers: ["vom", "e", "vom", "kommende"],
              bank: ["vom", "e", "kommende", "von", "en", "durch", "im"],
              translation: "La reforma que el parlamento aprobó ayer vale. El reglamento publicado por la comisión está en línea. El semestre que viene empieza en abril.",
              itemIds: ["b2m4langenattribut", "b2m4pruefungsordnung", "b2m4semester", "b1m7fekommend"],
            },
            {
              id: "b2m4l2e7", type: "mc", prompt: "Immatrikulation",
              question: "„Nach der Immatrikulation kommt die Einschreibung in die Kurse.“",
              options: [
                "Después de matricularse en la universidad, uno se apunta a las asignaturas",
                "Después del examen final",
                "Después de la fiesta de bienvenida",
              ],
              answer: 0,
              whyWrong: [null, "Eso sería nach dem Abschluss", "La fiesta no está en la Ordnung"],
              itemIds: ["b2m4immatrikulation", "b2m4einschreibung"],
            },
            {
              id: "b2m4l2e8", type: "type", prompt: "Cierre de producción",
              question: "la reforma que el parlamento aprobó ayer",
              answers: ["die gestern vom Parlament beschlossene Reform"],
              itemIds: ["b2m4langenattribut", "b2m4vomparlament"],
            },
          ],
        },
      ],
    },

    {
      id: "b2m4l3",
      phaseId: "b2m4",
      title: "Das zu lösende Problem",
      subtitle: "Gerundivum: lo que hay que hacer, plegado",
      minutes: 13,
      sections: [
        {
          kind: "phrases",
          title: "La obligación dentro del sintagma",
          itemIds: ["b2m4zuloesende", "b2m4zulesende", "b2m4nc", "b2m4fachhochschule", "b2m4wibetreuung"],
        },
        {
          kind: "note",
          note: {
            title: "La regla detrás: zu + Partizip I = hay que, y es pasivo",
            body: "<i>das Problem, das gelöst werden muss</i> → <b>das zu lösende Problem</b>.<br/><br/>Fórmula: <b>zu + Partizip I (infinitivo + d) + terminación</b>. Valor: pasivo y obligativo a la vez. El español no tiene nada parecido («el problema a resolver» se acerca y suena a traducción).<br/><br/>· das zu lesende Kapitel<br/>· die zu beantragende Verlängerung<br/>· die dringend zu treffende Entscheidung<br/><br/>Se declina igual que cualquier adjetivo: ein zu lösend<b>es</b> Problem, die zu lösend<b>en</b> Probleme.<br/><br/>No lo confundas con <i>sein + zu</i> del m2 (<i>Das Problem ist zu lösen</i>): eso es predicado. El Gerundivum va <b>delante del nombre</b>.",
            table: [
              ["relativa de obligación", "Gerundivum"],
              ["das Problem, das gelöst werden muss", "das zu lösende Problem"],
              ["die Literatur, die gelesen werden muss", "die zu lesende Literatur"],
              ["die Entscheidung, die getroffen werden muss", "die zu treffende Entscheidung"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m4l3e1", type: "transform", prompt: "Al Gerundivum",
              source: "das Problem, das gelöst werden muss",
              instruction: "Pliega con zu + Partizip I",
              answers: ["das zu lösende Problem"],
              itemIds: ["b2m4zuloesende"],
            },
            {
              id: "b2m4l3e2", type: "transform", prompt: "Deshaz el Gerundivum",
              source: "die zu lesende Literatur",
              instruction: "Relativa de obligación",
              answers: [
                "die Literatur, die gelesen werden muss",
                "die Literatur, die man lesen muss",
              ],
              itemIds: ["b2m4zulesende"],
            },
            {
              id: "b2m4l3e3", type: "cloze", prompt: "Completa zu o la terminación",
              text: "Das ___ lösende Problem ist der Numerus clausus.",
              answers: ["zu"],
              translation: "El problema que hay que resolver es la nota de corte.",
              itemIds: ["b2m4zuloesende", "b2m4nc"],
            },
            {
              id: "b2m4l3e4", type: "mc", prompt: "Fachhochschule no es instituto",
              question: "„Leo schwankt zwischen Universität und Fachhochschule.“",
              options: [
                "Duda entre universidad y universidad de ciencias aplicadas",
                "Duda entre universidad e instituto de secundaria",
                "Duda entre universidad y academia de idiomas",
              ],
              answer: 0,
              whyWrong: [null, "El instituto es das Gymnasium / die Schule", "Eso sería Sprachschule"],
              itemIds: ["b2m4fachhochschule"],
            },
            {
              id: "b2m4l3e5", type: "errorfix", prompt: "Un hispanohablante escribió esto. Arréglalo.",
              wrong: "das zu lösen Problem",
              answers: ["das zu lösende Problem"],
              why: "El Gerundivum es zu + Partizip I (lösen + d) + terminación: zu lösende. Sin la -d no hay participio; sin la -e no hay adjetivo.",
              itemIds: ["b2m4zuloesende"],
            },
            {
              id: "b2m4l3e6", type: "gapbank", prompt: "Tres Gerundiva",
              text: "Das zu lösend___ Problem ist die Zulassung. Die zu lesend___ Literatur steht im Handbuch. Die dringend zu treffend___ Entscheidung betrifft die Betreuung.",
              answers: ["e", "e", "e"],
              bank: ["e", "en", "es", "er", "em"],
              translation: "El problema a resolver es la admisión. La bibliografía a leer está en la guía. La decisión que hay que tomar ya afecta a la tutoría.",
              itemIds: ["b2m4zuloesende", "b2m4zulesende", "b2m4zutreffende", "b2m4zulassung", "b2m4wibetreuung"],
              tip: "Tras die, el adjetivo lleva -e en nominativo. Los tres huecos son la misma terminación a propósito: el ojo tiene que ver el artículo, no inventar.",
            },
            {
              id: "b2m4l3e7", type: "build", prompt: "Construye el Gerundivum",
              target: "das zu lösende Problem",
              translation: "el problema que hay que resolver",
              distractors: ["lösen", "gelöste"],
              itemIds: ["b2m4zuloesende"],
            },
            {
              id: "b2m4l3e8", type: "type", prompt: "Cierre de producción",
              question: "la bibliografía que hay que leer; el problema que hay que resolver",
              answers: ["die zu lesende Literatur; das zu lösende Problem"],
              itemIds: ["b2m4zulesende", "b2m4zuloesende"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-b2m4-2",
            book: "Die Reform, die das Parlament gestern beschlossen hat.",
            real: "Die neue Reform von gestern.",
            meaning: "La reforma que el parlamento aprobó ayer",
            when: "En el café, nadie despliega el atributo. von gestern basta. En la Hausarbeit y en el examen, el atributo es el criterio Strukturen: die gestern vom Parlament beschlossene Reform.",
            register: "amigos",
            exam: "Die gestern vom Parlament beschlossene Reform.",
            note: "von gestern en la calle es el tiempo. En el atributo, gestern va delante y von marca al agente.",
            sound: "dii NOI-e re-FORM fon GES-tan",
            level: "b2",
            produce: true,
            itemId: "b2m4natreformgestern",
          },
        },
      ],
    },

    {
      id: "b2m4l4",
      phaseId: "b2m4",
      title: "Der Kollege, mit dem ich …",
      subtitle: "Relativa con preposición, cuyo, y was/wo(r)-",
      minutes: 13,
      sections: [
        {
          kind: "phrases",
          title: "La relativa que el B1 no cerró",
          itemIds: ["b2m4mitdem", "b2m4dessen", "b2m4deren", "b2m4anerkennung", "b2m4wofuer", "b2m4daswas", "b2m4alleswas"],
        },
        {
          kind: "note",
          note: {
            title: "La regla detrás: el caso lo manda la preposición de DENTRO, y cuyo no es dass",
            body: "El B1 te dio der/die/das en nominativo y acusativo. El B2 cierra:<br/><br/>1. <b>Preposición + relativo.</b> La preposición va <u>delante</u> del relativo, nunca al final: <i>der Kollege, <b>mit dem</b> ich zusammenarbeite</i> — no *mit dem ich arbeite mit. El caso lo manda la preposición interna (mit → dativo → dem).<br/><br/>2. <b>dessen / deren</b> = cuyo. dessen para masculino y neutro, deren para femenino y plural. <i>der Student, <b>dessen</b> Hausarbeit ich lese</i>. El calco *dass Hausarbeit es el «que» universal del español.<br/><br/>3. <b>was</b> tras pronombre, indefinido o una frase entera: <i>das, <b>was</b> mich stört</i> · <i>alles, <b>was</b> …</i>. No das.<br/>4. <b>wo(r)- + preposición</b> cuando el antecedente es una cosa o una frase: <i>wofür ich mich interessiere</i>. Con persona, preposición + dem/der.",
            table: [
              ["antecedente", "relativo"],
              ["der Kollege + mit", "mit dem"],
              ["der Student (m) + cuyo", "dessen"],
              ["die Studentin / plural + cuyo", "deren"],
              ["das / alles / algo dicho + que", "was"],
              ["cosa + für", "wofür"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m4l4e1", type: "cloze", prompt: "Preposición + relativo",
              text: "Das ist der Kollege, mit ___ ich die Hausarbeit schreibe.",
              answers: ["dem"],
              translation: "Ese es el compañero con el que escribo el trabajo.",
              itemIds: ["b2m4mitdem", "b2m4hausarbeit", "a2m10kollege"],
            },
            {
              id: "b2m4l4e2", type: "bucket", prompt: "dessen o deren",
              categories: ["dessen (m / nt)", "deren (f / pl)"],
              items: [
                { text: "der Student, ___ Hausarbeit ich lese", bucket: 0 },
                { text: "die Studentin, ___ Referat überzeugt", bucket: 1 },
                { text: "das Seminar, ___ Teilnehmer fehlen", bucket: 0 },
                { text: "die Kollegen, ___ Fristen enden", bucket: 1 },
                { text: "der Professor, ___ Sprechstunde voll ist", bucket: 0 },
                { text: "die Ordnung, ___ Regeln gelten", bucket: 1 },
              ],
              itemIds: ["b2m4dessen", "b2m4deren"],
            },
            {
              id: "b2m4l4e3", type: "errorfix", prompt: "Un hispanohablante escribió esto. Arréglalo.",
              wrong: "das Problem, das was mich stört",
              answers: ["das Problem, das mich stört", "das, was mich stört"],
              why: "O bien hay un sustantivo (das Problem, das …) o bien un pronombre (das, was …). Las dos juntas son el calco de «lo que que».",
              itemIds: ["b2m4daswas"],
            },
            {
              id: "b2m4l4e4", type: "errorfix", prompt: "Un hispanohablante escribió esto. Arréglalo.",
              wrong: "der Student, dass Hausarbeit ich lese",
              answers: ["der Student, dessen Hausarbeit ich lese"],
              why: "«cuyo» no es dass. dass introduce frases enteras. cuyo masculino/neutro es dessen.",
              itemIds: ["b2m4dessen", "b2m4hausarbeit"],
            },
            {
              id: "b2m4l4e5", type: "cloze", prompt: "wo(r)- o preposición + dem",
              text: "Das ist das Thema, ___ ich mich interessiere.",
              answers: ["wofür", "für das"],
              translation: "Ese es el tema por el que me intereso.",
              itemIds: ["b2m4wofuer"],
            },
            {
              id: "b2m4l4e6", type: "gapbank", prompt: "Cierra las relativas del módulo",
              text: "Alles, ___ in der Ordnung steht, gilt. Der Kollege, mit ___ ich schreibe, teilt die Literatur. Die Studentin, ___ Antrag vorliegt, wartet.",
              answers: ["was", "dem", "deren"],
              bank: ["was", "dem", "deren", "das", "dessen", "den", "dass"],
              translation: "Todo lo que figura en el reglamento vale. El compañero con el que escribo comparte la bibliografía. La estudiante cuya solicitud está presentada espera.",
              itemIds: ["b2m4alleswas", "b2m4mitdem", "b2m4deren", "b2m4antrag"],
            },
            {
              id: "b2m4l4e7", type: "mc", prompt: "Anerkennung",
              question: "„die Anerkennung von Abschlüssen“",
              options: ["el reconocimiento de titulaciones extranjeras o de otro centro", "el diploma de fin de fiesta", "la matrícula"],
              answer: 0,
              whyWrong: [null, "Abschluss es el título, Anerkennung es que te lo acepten", "Eso es Immatrikulation"],
              itemIds: ["b2m4anerkennung", "b1m6abschluss"],
            },
            {
              id: "b2m4l4e8", type: "type", prompt: "Cierre de producción",
              question: "el compañero con el que trabajo; lo que me molesta",
              answers: [
                "der Kollege, mit dem ich zusammenarbeite; das, was mich stört",
                "der Kollege, mit dem ich arbeite; das, was mich stört",
              ],
              itemIds: ["b2m4mitdem", "b2m4daswas"],
            },
          ],
        },
      ],
    },

    {
      id: "b2m4l5",
      phaseId: "b2m4",
      title: "Die Endung im langen Attribut",
      subtitle: "Clínica: una terminación mal puesta hunde veinte palabras",
      minutes: 14,
      sections: [
        {
          kind: "phrases",
          title: "Tres atributos que se declinan o se caen",
          itemIds: ["b2m4langenattribut", "b2m4neueingerichtete", "b2m4zutreffende"],
        },
        {
          kind: "note",
          note: {
            title: "La regla detrás: el adjetivo del atributo no es especial — y por eso engaña",
            body: "b1m9 te dio la declinación entera. Aquí no se reenseña: se <b>cobra</b>. En <i>die gestern vom Parlament beschlossen<b>e</b> Reform</i> la -e es la misma -e de <i>die neu<b>e</b> Reform</i>. El modificador largo (gestern vom Parlament) no cambia la terminación. Quien piensa «ya hay mucho en medio, la -e sobra» produce <i>*die gestern vom Parlament beschlossen Reform</i>, y el examinador ve un agujero de veinte palabras.<br/><br/>La pregunta es la de siempre: <b>¿qué marca el artículo?</b><br/>· die / das / der (definido) → el adjetivo se relaja: -e / -en<br/>· ein / una nada (indefinido o sin artículo) → el adjetivo carga: -er / -es / -e / -en<br/><br/>En el Gerundivum igual: <i>ein zu treffend<b>es</b> Urteil</i>, <i>die zu treffend<b>e</b> Entscheidung</i>.",
            table: [
              ["artículo", "atributo", "terminación"],
              ["die (f)", "die … beschlossene Reform", "-e"],
              ["der (m)", "der neu eingerichtete Studiengang", "-e (nom.) / -en (akk.)"],
              ["ein (nt)", "ein zu lösendes Problem", "-es"],
              ["plural", "die zu lesenden Kapitel", "-en"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m4l5e1", type: "errorfix", prompt: "Un hispanohablante escribió esto. Arréglalo.",
              wrong: "die gestern vom Parlament beschlossen Reform",
              answers: ["die gestern vom Parlament beschlossene Reform"],
              why: "beschlossene lleva -e porque die ya marcó el género y el adjetivo, en definido, se relaja a -e/-en. Sin terminación el atributo se rompe.",
              itemIds: ["b2m4langenattribut"],
            },
            {
              id: "b2m4l5e2", type: "errorfix", prompt: "Un hispanohablante escribió esto. Arréglalo.",
              wrong: "ein zu lösend Problem",
              answers: ["ein zu lösendes Problem"],
              why: "ein no marca el neutro (ein vale para m y nt). Lo marca el adjetivo: -es. Es la regla de b1m9, cobrada en un Gerundivum.",
              itemIds: ["b2m4zuloesende"],
            },
            {
              id: "b2m4l5e3", type: "cloze", prompt: "ein + masculino",
              text: "Leo hat sich für einen neu eingerichtet___ Studiengang beworben.",
              answers: ["en"],
              translation: "Leo ha solicitado plaza en un grado de nueva creación.",
              itemIds: ["b2m4neueingerichtete", "b2m4studiengang"],
            },
            {
              id: "b2m4l5e4", type: "bucket", prompt: "¿Quién marca, el artículo o el adjetivo?",
              categories: ["artículo definido → adjetivo relajado (-e/-en)", "ein / nada → adjetivo carga (-er/-es/-e)"],
              items: [
                { text: "die beschlossene Reform", bucket: 0 },
                { text: "ein zu lösendes Problem", bucket: 1 },
                { text: "der eingerichtete Studiengang", bucket: 0 },
                { text: "eine zu treffende Entscheidung", bucket: 0 },
                { text: "zu lesende Kapitel (sin artículo, plural)", bucket: 1 },
                { text: "das zu schreibende Referat", bucket: 0 },
              ],
              itemIds: ["b2m4langenattribut", "b2m4zuloesende", "b2m4neueingerichtete", "b2m4zutreffende"],
            },
            {
              id: "b2m4l5e5", type: "gapbank", prompt: "Tres terminaciones, un reglamento",
              text: "Die gestern veröffentlicht___ Ordnung gilt. Ein neu eingerichtet___ Studiengang startet. Die dringend zu treffend___ Entscheidung betrifft die Frist.",
              answers: ["e", "er", "e"],
              bank: ["e", "er", "es", "en", "em"],
              translation: "El reglamento publicado ayer vale. Arranca un grado de nueva creación. La decisión que hay que tomar ya afecta al plazo.",
              itemIds: ["b2m4pruefungsordnung", "b2m4neueingerichtete", "b2m4zutreffende"],
            },
            {
              id: "b2m4l5e6", type: "paraphrase", prompt: "Sin Relativsatz",
              source: "Die Entscheidung, die dringend getroffen werden muss, betrifft die Frist.",
              forbid: ["muss", "werden", "getroffen"],
              answers: [
                "Die dringend zu treffende Entscheidung betrifft die Frist",
                "Die dringend zu treffende Entscheidung betrifft die Abgabefrist",
              ],
              itemIds: ["b2m4zutreffende", "b2m4abgabefrist"],
            },
            {
              id: "b2m4l5e7", type: "hearreal", prompt: "¿Calle o libro?",
              book: "Der Kollege, mit dem ich arbeite.",
              real: "Mein Kollege halt.",
              translation: "El compañero con el que trabajo.",
              itemIds: ["b2m4natkollegehalt", "b2m4mitdem"],
            },
            {
              id: "b2m4l5e8", type: "type", prompt: "Cierre de producción",
              question: "el grado de nueva creación; la decisión que hay que tomar ya",
              answers: [
                "der neu eingerichtete Studiengang; die dringend zu treffende Entscheidung",
                "ein neu eingerichteter Studiengang; eine dringend zu treffende Entscheidung",
              ],
              itemIds: ["b2m4neueingerichtete", "b2m4zutreffende"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-b2m4-3",
            book: "Der Kollege, mit dem ich arbeite.",
            real: "Mein Kollege halt.",
            meaning: "El compañero con el que trabajo / mi compañero, ya me entiendes",
            when: "En el pasillo, halt sustituye a toda la relativa. En la Hausarbeit y en el Sprechen del examen, la relativa con preposición es de banda alta: der Kollege, mit dem ich zusammenarbeite.",
            register: "amigos",
            exam: "Der Kollege, mit dem ich zusammenarbeite.",
            note: "halt otra vez: no se traduce, se encoge de hombros. Junto al nombre, apunta a alguien que el otro ya conoce.",
            sound: "main ko-LEE-gue halt",
            level: "b2",
            produce: true,
            itemId: "b2m4natkollegehalt",
          },
        },
      ],
    },

    {
      id: "b2m4l6",
      phaseId: "b2m4",
      title: "§4 der Studienordnung",
      subtitle: "Lectura larga: un reglamento y un foro que lo contradice",
      minutes: 16,
      sections: [
        {
          kind: "phrases",
          title: "Las palabras del Teil 5",
          itemIds: ["b2m4studienordnung", "b2m4einschreibung", "b2m4modulhandbuch", "b2m4leistungspunkte", "b2m4inskription", "b2m4vorlesungszeit", "b2m4kommilitonin", "b2m4erstsemester", "b2m4modulbeschreibung", "b2m4transcript", "b2m4werktag"],
        },
        {
          kind: "note",
          note: {
            title: "Antes de leer: títulos de índice, no la novela",
            body: "El Lesen Teil 5 del Goethe B2 es una [[Studienordnung|plan de estudios]] : asignar títulos de un índice a párrafos, y cuatro sobran. Aquí hay un reglamento y, debajo, un hilo de foro. No se ponen de acuerdo en los plazos. Lee los atributos largos deshaciéndolos.<br/><br/>Nota plurizéntrica: el foro cita a una estudiante de Viena. Verás <b>[[Inskription|matrícula — en Austria; en Alemania: Immatrikulation]]</b>. Reconocer, no producir.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m4l6e1", type: "read", prompt: "Lee el reglamento y el foro. Deshaz los atributos si te bloquean.",
              title: "§4 Abgabe und Verlängerung",
              source: "Studienordnung, Seminar Holm (bearbeitet); Forum «Studieren in DACH»",
              text: "§4 Abgabe von Hausarbeiten. Die in der Studienordnung festgelegte Abgabefrist endet am letzten Werktag der Vorlesungszeit. Eine nach diesem Tag eingereichte Arbeit gilt als nicht abgegeben. Die vom Prüfungsausschuss beschlossene Regelung lässt eine einmalige Verlängerung zu. Der zu stellende Antrag ist spätestens sieben Tage vor der Frist im Prüfungsamt einzureichen. Alles, was nach diesem Tag eingeht, wird nicht berücksichtigt. Die wissenschaftliche Betreuung, auf die sich der Antrag stützt, muss die Verlängerung befürworten. Die im Modulhandbuch genannten Leistungspunkte werden erst nach der Bewertung gutgeschrieben.\n\n§4a Anerkennung. Die im Ausland erbrachten Leistungen können auf Antrag anerkannt werden. Der vom Prüfungsamt zu prüfende Nachweis umfasst Transcript und Modulbeschreibungen. Eine ohne diese Unterlagen eingereichte Bitte wird zurückgewiesen. Der Studiengang, dessen Module anerkannt werden sollen, muss mit dem hiesigen vergleichbar sein.\n\nIm Forum schreibt Mira aus Wien: «Die gestern veröffentlichte Ordnung gilt bei uns auch, nur heisst die Immatrikulation hier [[Inskription|matrícula — Austria; en Alemania: Immatrikulation]]. Die zu lesende Literatur steht, und die Frist auch. Was mich stört: die vom Ausschuss beschlossene Sieben-Tage-Regel. In der Sprechstunde hat Holm gesagt, sieben Tage seien Praxis. Im Forum sagt eine Kommilitonin, deren Antrag abgelehnt wurde, sieben Tage seien sieben Tage. Das zu lösende Problem ist nicht die Endung. Das zu lösende Problem ist, dass die Ordnung und die Sprechstunde zwei verschiedene Fristen haben.»\n\nLeo liest beides in der Bibliothek. Die ständig steigende Zahl der Anträge, schreibt das Amt in einer Fussnote, habe die Härte erklärt. Die vom Amt genannte Härte erklärt nicht, warum Holm in der Sprechstunde etwas anderes sagt als §4. Leo faltet den Satz auf: «eine nach diesem Tag eingereichte Arbeit» = eine Arbeit, die nach diesem Tag eingereicht wird. Dann schreibt er an Holm. Nicht: «Das ist doch Quatsch.» Sondern: «Die in §4 genannte Frist weicht von der in der Sprechstunde genannten Praxis ab. Hiermit bitte ich um Klärung.»\n\nSofía, die das über die Schulter liest, nickt. Der eine lange Satz ist kein Schmuck. Er ist ein Werkzeug. Wer ihn falten kann, kann ihn auch anfechten.\n\nAnna schreibt unter Miras Beitrag: «In der Pflege gibt es die zu versorgenden Patienten, nicht die zu lesende Literatur. Trotzdem gilt dieselbe Endung.» Herr Vogel, der das Forum nicht kennt, sagt im Treppenhaus nur: «Was mich stört: die Jugend und ihre Fristen.» Leo antwortet nicht. Er hat einen Antrag zu schreiben, und die in der Ordnung genannte Vorlesungszeit endet in zwölf Werktagen. Die Kommilitonin, deren Antrag abgelehnt wurde, hat ihm ihr Transcript gezeigt. Ohne Modulbeschreibung, sagt §4a, wird nichts anerkannt. Ein Erstsemester verstünde den Satz vielleicht nicht. Leo versteht ihn. Deshalb faltet er. Nico ruft an und fragt, ob Leo am Samstag kochen kommt. Leo sagt: «Nach der in der Ordnung genannten Vorlesungszeit. Vorher nicht.» Nico versteht das Gerundivum nicht, aber den Samstag schon.",
              questions: [
                {
                  id: "b2m4l6e1q1",
                  q: "Wann muss der Antrag auf Verlängerung eingehen?",
                  options: [
                    "Como muy tarde siete días antes de la Abgabefrist, en el Prüfungsamt",
                    "El último día de clase",
                    "Después de entregar el trabajo",
                  ],
                  answer: 0,
                  why: "«spätestens sieben Tage vor der Frist im Prüfungsamt».",
                },
                {
                  id: "b2m4l6e1q2",
                  q: "Was meint Mira mit «zwei verschiedene Fristen»?",
                  options: [
                    "Que en Viena hay otra fecha",
                    "Que Holm en tutoría habla de práctica y el §4 habla de siete días estrictos: reglamento y pasillo no coinciden",
                    "Que el Stipendium tiene otra fecha",
                  ],
                  answer: 1,
                  inference: true,
                  why: "Holm: sieben Tage seien Praxis. La compañera rechazada: sieben Tage seien sieben Tage. El foro contra el reglamento.",
                },
                {
                  id: "b2m4l6e1q3",
                  q: "Welche Unterlagen verlangt §4a?",
                  options: [
                    "Solo una carta",
                    "Transcript y descripciones de módulos; sin eso se rechaza la petición",
                    "El DNI",
                  ],
                  answer: 1,
                  why: "«Der … Nachweis umfasst Transcript und Modulbeschreibungen. Eine ohne diese Unterlagen eingereichte Bitte wird zurückgewiesen.»",
                },
                {
                  id: "b2m4l6e1q4",
                  q: "Wie schreibt Leo an Holm — und warum so?",
                  options: [
                    "«Das ist doch Quatsch»",
                    "Con un atributo y Hiermit: describe la contradicción sin acusar, el traje de B2",
                    "No escribe",
                  ],
                  answer: 1,
                  inference: true,
                  why: "«Die in §4 genannte Frist weicht von der in der Sprechstunde genannten Praxis ab. Hiermit bitte ich um Klärung.»",
                },
                {
                  id: "b2m4l6e1q5",
                  q: "Was ist «Inskription» im Wiener Beitrag?",
                  options: [
                    "Una inscripción a un club",
                    "La matrícula universitaria austriaca; en Alemania se dice Immatrikulation",
                    "Un examen",
                  ],
                  answer: 1,
                  why: "Glosa del propio texto. Reconocer, no producir.",
                },
              ],
              itemIds: ["b2m4studienordnung", "b2m4abgabefrist", "b2m4antrag", "b2m4pruefungsamt", "b2m4wibetreuung", "b2m4anerkennung", "b2m4inskription", "b2m4sprechstunde", "b2m4modulhandbuch", "b2m4leistungspunkte", "b2m4vorlesungszeit", "b2m4kommilitonin", "b2m4erstsemester", "b2m4modulbeschreibung", "b2m4transcript", "b2m4werktag"],
            },
            {
              id: "b2m4l6e2", type: "transform", prompt: "Deshaz el atributo de §4",
              source: "eine nach diesem Tag eingereichte Arbeit",
              instruction: "Relativa",
              answers: [
                "eine Arbeit, die nach diesem Tag eingereicht wird",
                "eine Arbeit, die nach diesem Tag eingereicht wurde",
              ],
              itemIds: ["b2m4hausarbeit"],
            },
            {
              id: "b2m4l6e3", type: "cloze", prompt: "El austriacismo",
              text: "In Wien sagt man ___ , in Berlin Immatrikulation.",
              answers: ["Inskription"],
              itemIds: ["b2m4inskription", "b2m4immatrikulation"],
            },
            {
              id: "b2m4l6e4", type: "gapbank", prompt: "Relativos del reglamento",
              text: "Alles, ___ nach diesem Tag eingeht, wird nicht berücksichtigt. Der Studiengang, ___ Module anerkannt werden sollen, muss vergleichbar sein. Die Betreuung, auf ___ sich der Antrag stützt, muss befürworten.",
              answers: ["was", "dessen", "die"],
              bank: ["was", "dessen", "die", "das", "deren", "dem", "dass"],
              itemIds: ["b2m4alleswas", "b2m4dessen", "b2m4antrag", "b2m4wibetreuung"],
            },
            {
              id: "b2m4l6e5", type: "mc", prompt: "Leistungspunkte",
              question: "„Die Leistungspunkte werden erst nach der Bewertung gutgeschrieben.“",
              options: [
                "Los créditos se apuntan cuando el trabajo ya está calificado, no al entregarlo",
                "Los puntos del examen oral",
                "La nota de corte",
              ],
              answer: 0,
              whyWrong: [null, "Eso no son ECTS", "Eso es Numerus clausus"],
              itemIds: ["b2m4leistungspunkte"],
            },
            {
              id: "b2m4l6e6", type: "errorfix", prompt: "Un hispanohablante escribió esto. Arréglalo.",
              wrong: "Alles, das in der Ordnung steht, gilt.",
              answers: ["Alles, was in der Ordnung steht, gilt."],
              why: "Tras alles, etwas, nichts, das (pronombre) el relativo es was, no das.",
              itemIds: ["b2m4alleswas"],
            },
            {
              id: "b2m4l6e7", type: "type", prompt: "Cierre de producción",
              question: "el trabajo entregado después de ese día; todo lo que llega tarde",
              answers: [
                "die nach diesem Tag eingereichte Arbeit; alles, was zu spät eingeht",
                "eine nach diesem Tag eingereichte Arbeit; alles, was nach der Frist eingeht",
              ],
              itemIds: ["b2m4hausarbeit", "b2m4alleswas", "b2m4abgabefrist"],
            },
          ],
        },
      ],
      resources: [
        { label: "Beispiel einer Studienordnung", url: "https://www.fu-berlin.de/", note: "Abre cualquier Studienordnung de una uni alemana y busca un párrafo con Partizip II delante del sustantivo. Es el texto del Teil 5." },
      ],
    },

    {
      id: "b2m4l7",
      phaseId: "b2m4",
      title: "Seminarsitzung Holm",
      subtitle: "Escucha larga: el seminario, una pasada, cuaderno",
      minutes: 16,
      sections: [
        {
          kind: "phrases",
          title: "Lo que oirás plegar",
          itemIds: ["b2m4kolloquium", "b2m4sprechstunde", "b2m4pruefungsamt", "b2m4semesterticket"],
        },
        {
          kind: "note",
          note: {
            title: "La regla detrás: oye la endung y el relativo",
            body: "El audio es el seminario de Holm. Una pasada. Apunta: un Gerundivum, un dessen/deren, un was, una endung. El TTS nombra a Holm y a Leo. En el examen, no.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m4l7e1", type: "audiomc", prompt: "Seminario · pregunta 1 de 5. UNA pasada. Cuaderno.",
              audio: RADIO_SEMINAR,
              question: "Womit steigt Leo ins Referat ein?",
              options: [
                "Con un Gerundivum (das zu lösende Problem) y un Partizip I extendido (die ständig steigenden … Kosten), y luego un Partizip II (die vom Senat beschlossene Erhöhung)",
                "Con una receta de Nico",
                "Con una queja contra Holm",
              ],
              answer: 0,
              plays: 1,
              notepad: true,
              itemIds: ["b2m4zuloesende", "b2m4steigendepreise", "b2m4vomparlament", "b2m4semesterticket"],
            },
            {
              id: "b2m4l7e2", type: "audiomc", prompt: "Seminario · pregunta 2 de 5. Holm y la endung.",
              audio: RADIO_SEMINAR,
              question: "Was warnt Holm zur Endung?",
              options: [
                "Que el adjetivo del atributo se declina como cualquier otro; quien se come la terminación hunde una frase de veinte palabras",
                "Que no hace falta terminación",
                "Que solo cuenta el Umlaut",
              ],
              answer: 0,
              plays: 1,
              notepad: true,
              itemIds: ["b2m4pruefungsordnung", "b2m4langenattribut"],
            },
            {
              id: "b2m4l7e3", type: "audiomc", prompt: "Seminario · pregunta 3 de 5. Gerundivum.",
              audio: RADIO_SEMINAR,
              question: "Wofür braucht man laut Holm das Gerundivum?",
              options: [
                "Para obligaciones: das zu schreibende Referat, die zu beantragende Verlängerung. zu + Partizip I, pasivo y «hay que». El español no tiene equivalente, por eso no sale solo",
                "Para decorar",
                "Solo en Austria",
              ],
              answer: 0,
              plays: 1,
              notepad: true,
              itemIds: ["b2m4gerundivum", "b2m4referat", "b2m4verlaengerung"],
            },
            {
              id: "b2m4l7e4", type: "audiomc", prompt: "Seminario · pregunta 4 de 5. dessen y was.",
              audio: RADIO_SEMINAR,
              question: "Was gilt für dessen und für was?",
              options: [
                "dessen porque el compañero es masculino; was (no das) cuando el antecedente es un pronombre o una frase: alles, was in der Ordnung steht",
                "dessen y deren son iguales",
                "was se usa con personas",
              ],
              answer: 0,
              plays: 1,
              notepad: true,
              itemIds: ["b2m4dessen", "b2m4alleswas", "b2m4literaturverzeichnis"],
            },
            {
              id: "b2m4l7e5", type: "audiomc", prompt: "Seminario · pregunta 5 de 5. El cierre.",
              audio: RADIO_SEMINAR,
              question: "Welche Operation empfiehlt Holm am Ende?",
              options: [
                "Plegar el Satz y volver a desplegarlo si no se entiende: una Hausarbeit que hay que entregar la semana que viene es una nächste Woche abzugebende Hausarbeit",
                "Memorizar la Ordnung",
                "No escribir atributos",
              ],
              answer: 0,
              plays: 1,
              notepad: true,
              itemIds: ["b2m4kompression", "b2m4hausarbeit", "b2m4anerkennung", "b2m4sprechstunde"],
            },
            {
              id: "b2m4l7e6", type: "shadow", prompt: "Sombrea el Gerundivum",
              text: "Das zu lösende Problem ist die Frist.",
              phonetic: "das tsu LÖ-zen-de pro-BLEEM ist dii frist",
              translation: "El problema que hay que resolver es el plazo.",
              reps: 2,
              itemIds: ["b2m4zuloesende"],
            },
            {
              id: "b2m4l7e7", type: "cloze", prompt: "Kolloquium o Sprechstunde",
              text: "Die Anerkennung klären wir in der ___ am Donnerstag.",
              answers: ["Sprechstunde"],
              itemIds: ["b2m4sprechstunde", "b2m4anerkennung"],
            },
            {
              id: "b2m4l7e8", type: "type", prompt: "Cierre",
              question: "el trabajo que hay que entregar; todo lo que figura en el reglamento",
              answers: [
                "die abzugebende Hausarbeit; alles, was in der Ordnung steht",
                "die zu schreibende Hausarbeit; alles, was in der Ordnung steht",
              ],
              itemIds: ["b2m4hausarbeit", "b2m4alleswas"],
            },
          ],
        },
      ],
    },

    {
      id: "b2m4l8",
      phaseId: "b2m4",
      title: "Der Antrag und das Forum",
      subtitle: "Dos textos: solicitud a Holm (~100) y foro sobre el NC (~150)",
      minutes: 20,
      sections: [
        {
          kind: "phrases",
          title: "Solicitar sin perder el hilo",
          itemIds: ["b2m4hiermitbeantrage", "b2m4verlaengerung", "b2m4antrag", "b2m4abgabefrist"],
        },
        {
          kind: "note",
          note: {
            title: "La regla detrás: el atributo en el Antrag no es lujo",
            body: "Un Antrag de B2 lleva al menos un atributo o un Gerundivum. <i>Hiermit beantrage ich die Verlängerung der in §4 genannten Frist.</i> Aufgabe 2: Sie, Anrede, Gruß, puntos en orden. Aufgabe 1: foro sobre el Numerus clausus, intro, pros/contras, propuesta.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m4l8e1", type: "errorfix", prompt: "Un hispanohablante escribió esto. Arréglalo.",
              wrong: "Hiermit beantrage ich dir die Verlängerung.",
              answers: ["Hiermit beantrage ich die Verlängerung.", "Hiermit beantrage ich bei Ihnen die Verlängerung."],
              why: "beantragen no rige dativo de persona como «pedirte». El objeto es la Verlängerung. dir es además fuga de Sie.",
              itemIds: ["b2m4hiermitbeantrage", "b2m4verlaengerung"],
            },
            {
              id: "b2m4l8e2", type: "gapbank", prompt: "Borrador del Antrag",
              text: "Hiermit beantrage ich die Verlängerung der in §4 genannt___ Frist. Die zu schreibend___ Hausarbeit umfasst eine im Ausland erbracht___ Leistung.",
              answers: ["en", "e", "e"],
              bank: ["en", "e", "es", "er", "em"],
              itemIds: ["b2m4hiermitbeantrage", "b2m4abgabefrist", "b2m4hausarbeit", "b2m4anerkennung"],
            },
            {
              id: "b2m4l8e3", type: "write", prompt: "Aufgabe 2 · Antrag an Prof. Dr. Holm. Sie.",
              scenario: "Eres Leo. La Abgabefrist de la Hausarbeit te pilla con una prestación extranjera por reconocer. Escribe a tu tutor, Prof. Dr. Holm. Sie. Tres puntos.",
              genre: "mail-formal",
              register: "Sie",
              bullets: [
                "Solicita la prórroga con Hiermit y nombra la en §4 genannte Frist (un atributo).",
                "Explica la prestación a reconocer y pide tutoría (Sprechstunde).",
                "Propón una fecha y cierra con Grußformel.",
              ],
              checks: [
                { re: "(Hiermit|beantrage)", label: "abres con Hiermit / beantragen" },
                { re: "(genannt|zu |eingericht|beschlossen|Partizip|Frist)", label: "hay un atributo o Gerundivum" },
                { re: "(Sprechstunde|Donnerstag|Termin)", label: "pides tutoría o propones fecha" },
              ],
              frame: [
                "Sehr geehrter Herr Professor Holm,",
                "Hiermit beantrage ich die Verlängerung der in §4 genannten Frist.",
                "Die im Ausland erbrachte Leistung …",
                "Könnte ich in Ihre Sprechstunde kommen?",
                "Mit freundlichen Grüßen + Leo",
              ],
              requireConnectors: { min: 2, bank: ["deshalb", "außerdem", "weil", "da"] },
              rubric: ["erfuellung", "kohaerenz", "wortschatz", "strukturen"],
              minWords: 90,
              maxWords: 125,
              model: "Sehr geehrter Herr Professor Holm,\nhiermit beantrage ich die Verlängerung der in §4 genannten Abgabefrist. Die im Ausland erbrachte Leistung muss noch anerkannt werden, und die zu lesende Literatur ist umfangreicher als im Modulhandbuch angegeben. Deshalb bitte ich um einen Termin in Ihrer Sprechstunde am Donnerstag. Außerdem läge mir viel an einer kurzen Rückmeldung des Prüfungsamts zur Anerkennung. Das Transcript und die Modulbeschreibungen lege ich bei. Die wissenschaftliche Betreuung haben Sie bereits übernommen; dafür danke ich Ihnen. Ich bitte um eine kurze schriftliche Bestätigung des Eingangs.\nMit freundlichen Grüßen\nLeo",
              itemIds: ["b2m4hiermitbeantrage", "b2m4verlaengerung", "b2m4abgabefrist", "b2m4anerkennung", "b2m4zulesende", "b2m4sprechstunde", "b2m4pruefungsamt", "b2m4transcript", "b2m4modulbeschreibung", "b2m4wibetreuung"],
            },
            {
              id: "b2m4l8e4", type: "write", prompt: "Aufgabe 1 · Foro: Numerus clausus.",
              scenario: "En un foro universitario alguien afirma que el NC es la única forma justa de repartir plazas. Escribe un comentario: concede, ventaja e inconveniente, propuesta (Fachhochschule, Betreuung, Anerkennung) y cierra. Un atributo o un Gerundivum.",
              genre: "forum",
              stimulus: {
                author: "Paula H.",
                text: "Ohne Numerus clausus bricht das System zusammen. Wer bessere Noten hat, bekommt den Platz. Das zu lösende Problem ist nicht der NC, sondern die faulen Bewerber.",
              },
              bullets: [
                "Concede que las plazas son limitadas y marca dónde no estás de acuerdo.",
                "Ventaja e inconveniente del NC, con un atributo.",
                "Propón una vía (FH, tutoría, reconocimiento) y cierra.",
              ],
              checks: [
                { re: "(zwar|allerdings|stimme)", label: "concedas" },
                { re: "(Vorteil|Nachteil)", label: "ventaja e inconveniente" },
                { re: "(sollte|müsste|Fachhochschule|Betreuung|Anerkennung)", label: "propuesta" },
              ],
              frame: [
                "Zu dem Beitrag von Paula H. …",
                "Zwar … Allerdings …",
                "Die vom Senat beschlossene Regelung …",
                "Ein zu prüfender Weg ist die Fachhochschule.",
                "Deshalb …",
              ],
              requireConnectors: { min: 3, bank: ["zwar", "allerdings", "deshalb", "weil", "außerdem"] },
              rubric: ["erfuellung", "kohaerenz", "wortschatz", "strukturen"],
              minWords: 140,
              maxWords: 185,
              model: "Zu dem Beitrag von Paula H. möchte ich Folgendes sagen: Zwar sind die Plätze knapp, das bestreitet niemand. Allerdings ist «faule Bewerber» keine Analyse. Ein Vorteil des Numerus clausus ist die klare Zulassung. Ein Nachteil sind die ständig steigenden Hürden für alle, deren Noten knapp darunter liegen. Die vom Senat beschlossene Regelung löst das zu lösende Problem nicht, sie verschiebt es. Deshalb sollte die wissenschaftliche Betreuung früher ansetzen, und die Anerkennung von Abschlüssen der Fachhochschule erleichtert werden. Außerdem gehört in jede Studienordnung ein Satz zu den Leistungspunkten, den auch ein Erstsemester versteht. Die zu prüfenden Nachweise — Transcript und Modulbeschreibung — müssen klar sein, bevor jemand einen Antrag stellt. Was mich daran stört, ist vor allem die Lücke zwischen Sprechstunde und Paragraph. Deshalb plädiere ich für eine Ordnung, die auch ohne Sprechstunde verständlich ist, und für eine Betreuung, auf die man sich stützen kann.",
              itemIds: ["b2m4nc", "b2m4zulassung", "b2m4steigendepreise", "b2m4langenattribut", "b2m4zuloesende", "b2m4wibetreuung", "b2m4anerkennung", "b2m4fachhochschule", "b2m4studienordnung", "b2m4leistungspunkte"],
            },

            {
              id: "b2m4l8extra1", type: "write", prompt: "Aufgabe 2 · Nachricht Sie. Off-topic = 0.",
              scenario: "Eres Leo. La noch nicht anerkannte Leistung extranjera te bloquea la Abgabefrist. Escribes a tu tutora, Frau Schuster, Sie: pide prórroga y nombra la prestación con atributo participial.",
              genre: "mail-formal",
              register: "Sie",
              bullets: [
                "Nombra el motivo en la primera frase, con Sie.",
                "Pide una acción concreta y un plazo.",
                "Cierra con Grußformel.",
              ],
              checks: [
                { re: "(Sehr geehrte|Guten Tag)", label: "hay Anrede" },
                { re: "(bitte|könnten|würde ich)", label: "hay una petición" },
                { re: "(Mit freundlichen Grüßen|Freundliche Grüße)", label: "hay Gruß" },
              ],
              frame: ["Anrede Sie", "motivo", "petición + plazo", "Gruß + nombre"],
              requireConnectors: { min: 2, bank: ["deshalb", "außerdem", "weil", "allerdings"] },
              rubric: ["erfuellung", "kohaerenz", "wortschatz", "strukturen"],
              minWords: 90,
              maxWords: 120,
              model: "Sehr geehrte Frau Schuster,\ndie noch nicht anerkannte ausländische Leistung blockiert meine Abgabefrist, weil das Amt den Bescheid erst in drei Wochen schickt. Die zu schreibende Hausarbeit kann ich ohne diese Anerkennung nicht abschließen. Deshalb bitte ich Sie, die Frist um vierzehn Tage zu verlängern. Außerdem könnte ich den bereits fertigen Teil am Montag abgeben, damit Sie sehen, dass ich nicht warte. Allerdings ändert eine mündliche Zusage nichts, solange nichts Schriftliches vorliegt. Ich stehe für Rückfragen gern zur Verfügung. Eine kurze schriftliche Bestätigung reicht. Eine kurze schriftliche Bestätigung reicht.\nMit freundlichen Grüßen\nLeo",
              itemIds: [],
              tip: "Menos de 50 palabras o tema equivocado: 0. Ni un du.",
            },
            {
              id: "b2m4l8extra2", type: "write", prompt: "Aufgabe 1 · Forumsbeitrag. Off-topic = 0.",
              scenario: "Foro universitario: alguien dice que el NC es la única forma justa. Tú reaccionas con die zu vergebenden Plätze y un criterio que no sea solo nota. Off-topic = 0.",
              genre: "forum",
              stimulus: { author: "Jonas R.", text: "Der NC ist ungerecht, aber jede andere Regel ist willkürlich. Die zu vergebenden Plätze gehören den Besten, sonst nicht." },
              bullets: [
                "Concede un punto a Jonas R. y marca el desacuerdo.",
                "Una ventaja y un inconveniente, con ejemplo.",
                "Una propuesta concreta y un cierre.",
              ],
              checks: [
                { re: "(zwar|allerdings|jedoch)", label: "concedes antes de rebatir" },
                { re: "(Vorteil|Nachteil|einerseits|andererseits)", label: "ventaja e inconveniente" },
                { re: "(sollte|müsste|schlage vor|Vorschlag)", label: "hay propuesta" },
              ],
              frame: ["Apertura", "concesión", "pro/contra", "propuesta", "cierre"],
              requireConnectors: { min: 3, bank: ["zwar", "allerdings", "deshalb", "weil", "außerdem", "dennoch"] },
              rubric: ["erfuellung", "kohaerenz", "wortschatz", "strukturen"],
              minWords: 140,
              maxWords: 180,
              model: "Zu dem Beitrag von Jonas R. möchte ich Folgendes sagen: Zwar stimmt, dass eine Zahl leichter zu verteidigen ist als ein Gespräch. Allerdings misst der NC nicht die noch nicht anerkannte Leistung aus dem Ausland und nicht die zu pflegende Schicht. Ein Vorteil klarer Noten ist die Nachvollziehbarkeit. Ein Nachteil ist, dass die gestern angekommene Bewerbung mit anderer Skala still ausscheidet. Deshalb sollte neben der Note ein kurzes Verfahren stehen, das die anzuerkennende Leistung sichtbar macht. Außerdem müsste die Frist die Postlaufzeit einrechnen. Ich plädiere dafür, die zu vergebenden Plätze nicht nur über eine Kommastelle zu verteilen, weil sonst Gerechtigkeit wie ein Partizip klingt: lang, und ohne Täter. Nur so bleibt die Sache nachvollziehbar. Das ist die Mindestanforderung an ein Protokoll, das jemand in drei Monaten noch verstehen soll. Das ist die Mindestanforderung an ein Protokoll, das jemand in drei Monaten noch verstehen soll.",
              itemIds: [],
              tip: "150 palabras: intro, concesión, dos argumentos, propuesta, cierre. Off-topic = 0.",
            },
            {
              id: "b2m4l8exd1", type: "errorfix", prompt: "Partizip II, no I: ya llegó.",
              wrong: "Die gestern ankommende Post liegt noch.",
              answers: ["Die gestern angekommene Post liegt noch."],
              why: "Ankommend es en curso; lo de ayer ya llegó: angekommen.",
              translation: "El correo que llegó ayer sigue ahí.",
              itemIds: []
            },
            {
              id: "b2m4l8exd2", type: "transform", prompt: "Atributo participial.",
              source: "die Leistung, die anerkannt werden muss",
              instruction: "Un solo sintagma con zu.",
              answers: ["die anzuerkennende Leistung"],
              translation: "la prestación que hay que reconocer",
              itemIds: []
            },
            {
              id: "b2m4l8exd3", type: "cloze", prompt: "Partizip I: lo que está ocurriendo.",
              text: "die noch nicht ___ Frist",
              answers: ["laufende", "endende"],
              translation: "el plazo que aún no corre / no acaba",
              itemIds: []
            },
            {
              id: "b2m4l8exd4", type: "errorfix", prompt: "zu + Partizip I: lo que hay que hacer.",
              wrong: "die schreibende Hausarbeit",
              answers: ["die zu schreibende Hausarbeit"],
              why: "Sin zu es «la que escribe»; con zu es la que hay que escribir.",
              translation: "el trabajo que hay que escribir",
              itemIds: []
            },
            {
              id: "b2m4l8exd5", type: "transform", prompt: "Relativa → atributo.",
              source: "die Bewerbung, die gestern angekommen ist",
              instruction: "Partizip II antepuesto.",
              answers: ["die gestern angekommene Bewerbung"],
              translation: "la solicitud que llegó ayer",
              itemIds: []
            },
            {
              id: "b2m4l8exd6", type: "cloze", prompt: "Gerundivum.",
              text: "die zu ___ Plätze",
              answers: ["vergebenden", "vergebende"],
              translation: "las plazas que hay que adjudicar",
              itemIds: []
            },
            {
              id: "b2m4l8exd7", type: "transform", prompt: "Haz la relativa.",
              source: "die noch nicht anerkannte Leistung",
              instruction: "Con que.",
              answers: ["die Leistung, die noch nicht anerkannt ist"],
              translation: "la prestación que aún no está reconocida",
              itemIds: []
            },
            {
              id: "b2m4l8exd8", type: "errorfix", prompt: "Concordancia del participio.",
              wrong: "die noch nicht anerkannt Leistung",
              answers: ["die noch nicht anerkannte Leistung"],
              why: "Ante el nombre, el participio se declina: anerkannte.",
              translation: "la prestación aún no reconocida",
              itemIds: []
            },
            {
              id: "b2m4l8ex91", type: "errorfix", prompt: "Gerundivum sin -d",
              wrong: "das zu lösen Problem",
              answers: ["das zu lösende Problem"],
              why: "zu + Partizip I + terminación",
              translation: "",
              itemIds: [],
            },
            {
              id: "b2m4l8ex92", type: "transform", prompt: "Al Gerundivum",
              source: "das Problem, das gelöst werden muss",
              instruction: "Reescríbelo en registro de examen.",
              answers: ["das zu lösende Problem"],
              translation: "el problema a resolver",
              itemIds: [],
            },
            {
              id: "b2m4l8ex93", type: "errorfix", prompt: "dessen/deren",
              wrong: "die Frau, dessen Antrag",
              answers: ["die Frau, deren Antrag"],
              why: "Frau → deren",
              translation: "",
              itemIds: [],
            },
            {
              id: "b2m4l8ex94", type: "transform", prompt: "Relativa con preposición",
              source: "Der Kurs, in dem ich bin",
              instruction: "Reescríbelo en registro de examen.",
              answers: ["der Kurs, in dem ich bin"],
              translation: "el curso en el que estoy",
              itemIds: [],
            },
            {
              id: "b2m4l8ex95", type: "errorfix", prompt: "Partizip II sin -e",
              wrong: "die beschlossen Reform",
              answers: ["die beschlossene Reform"],
              why: "falta la -e",
              translation: "",
              itemIds: [],
            },
            {
              id: "b2m4l8ex96", type: "transform", prompt: "Atributo extendido",
              source: "Die Reform, die der Senat beschlossen hat",
              instruction: "Reescríbelo en registro de examen.",
              answers: ["die vom Senat beschlossene Reform"],
              translation: "la reforma aprobada por el Senado",
              itemIds: [],
            },
            {
              id: "b2m4l8ex97", type: "cloze", prompt: "Completa.",
              text: "Das ist die Form, die im ___ steht.",
              answers: ["Schreiben", "Text", "Register"],
              translation: "Esa es la forma que va en el escrito.",
              itemIds: [],
            },
            {
              id: "b2m4l8ex98", type: "transform", prompt: "was",
              source: "Alles, das nach der Frist kommt",
              instruction: "Reescríbelo en registro de examen.",
              answers: ["Alles, was nach der Frist kommt"],
              translation: "was, no das",
              itemIds: [],
            },          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-b2m4-4",
            book: "Das, was mich stört, ist …",
            real: "Was mich stört: …",
            meaning: "Lo que me molesta es …",
            when: "Al empezar una queja entre amigos: dos puntos, sin das. En el examen, la frase entera y, si puedes, el foco: Was mich daran stört, ist vor allem … Ahí puntúa Kohärenz.",
            register: "amigos",
            exam: "Was mich daran stört, ist vor allem …",
            note: "El das de «das, was» se come en el habla. Por escrito, o lo dejas o cambias el foco a daran.",
            sound: "vas mij SHTOAT",
            level: "b2",
            produce: true,
            itemId: "b2m4natwasmichstort",
          },
        },
      ],
    },

    {
      id: "b2m4l9",
      phaseId: "b2m4",
      title: "Leo faltet den Satz",
      subtitle: "La historia del módulo y un Vortrag de cuatro minutos",
      minutes: 18,
      sections: [
        {
          kind: "phrases",
          title: "Las últimas piezas",
          itemIds: ["b2m4partizipialattribut", "b2m4gerundivum", "b2m4kompression", "b2m4literaturverzeichnis", "b2m4pruefungsausschuss", "b2m4sprechstunden"],
        },
        {
          kind: "note",
          note: {
            title: "Leo faltet: von der Relativen zum Attribut",
            body: "<i>Lee en voz alta.</i><br/><br/>1. Leo saß im Seminar von Prof. Dr. Holm. Das zu lösende Problem war ein Satz von zwanzig Wörtern.<br/>2. Holm sagte: falten, und wieder auffalten. Die gestern vom Ausschuss veröffentlichte Ordnung. Die ständig steigenden Hürden.<br/>3. Nico verstand kein Wort und sagte: «Mein Kollege halt.» Leo übersetzte: der Kollege, mit dem ich die Hausarbeit schreibe.<br/>4. Anna las §4 und schüttelte den Kopf. In der Station gibt es keine Gerundiva. Es gibt Patienten, die versorgt werden müssen.<br/>5. Sofía half beim Antrag. Hiermit beantrage ich. Die in §4 genannte Frist. Sie lächelte: «Du klingst wie eine Studienordnung. Das ist das Ziel.»<br/>6. Lucía aus Valencia: «¿Cuyo?» Leo: «dessen, deren. Nicht dass.»<br/>7. Herr Vogel: «Was mich stört: die Jugend studiert zu lange.» Leo: «Was mich daran stört, ist vor allem die fehlende Betreuung.» Holm hätte genickt.<br/>8. Die Hausarbeit ging pünktlich ein. Die im Ausland erbrachte Leistung wurde anerkannt. Das Kolloquium, auf das Leo sich vorbereitet hatte, dauerte zwanzig Minuten.<br/>9. Holm zum Schluss: «Sie haben den Satz gefaltet. Sie dürfen ihn jetzt auch schreiben.»",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m4l9e1", type: "mc", prompt: "Inferencia (frase 5)",
              question: "Warum lächelt Sofía: «Du klingst wie eine Studienordnung»?",
              options: [
                "Porque Leo se ha vuelto burocrático de más",
                "Porque el traje del Antrag ES el de la Ordnung: atributo, Hiermit, Sie — y ese era el objetivo del módulo",
                "Porque Holm lo ha obligado",
              ],
              answer: 1,
              itemIds: ["b2m4studienordnung", "b2m4hiermitbeantrage"],
            },
            {
              id: "b2m4l9e2", type: "order", prompt: "Ordena",
              sentences: [
                "Leo lernte im Seminar, Sätze zu falten.",
                "Er schrieb einen Antrag mit Hiermit und einem Attribut.",
                "Die im Ausland erbrachte Leistung wurde anerkannt.",
                "Das Kolloquium dauerte zwanzig Minuten.",
                "Holm sagte, er dürfe den Satz jetzt auch schreiben.",
              ],
              itemIds: ["b2m4antrag", "b2m4anerkennung", "b2m4kolloquium"],
            },
            {
              id: "b2m4l9e3", type: "fastmatch", prompt: "Velocidad del módulo",
              pairs: [
                { target: "das zu lösende Problem", source: "el problema a resolver" },
                { target: "die Zulassung", source: "la admisión" },
                { target: "der Numerus clausus", source: "la nota de corte" },
                { target: "die Sprechstunde", source: "la hora de tutoría" },
                { target: "die Hausarbeit", source: "el trabajo escrito" },
              ],
              targetSeconds: 20,
              itemIds: ["b2m4zuloesende", "b2m4zulassung", "b2m4nc", "b2m4sprechstunde", "b2m4hausarbeit"],
            },
            {
              id: "b2m4l9e4", type: "paraphrase", prompt: "Sin Relativsatz y sin müssen",
              source: "Das Problem, das gelöst werden muss, ist die Frist.",
              forbid: ["muss", "werden", "gelöst"],
              answers: [
                "Das zu lösende Problem ist die Frist",
                "Das zu lösende Problem ist die Abgabefrist",
              ],
              itemIds: ["b2m4zuloesende", "b2m4abgabefrist"],
            },
            {
              id: "b2m4l9e5", type: "gapbank", prompt: "dessen, was, mit dem",
              text: "Der Student, ___ Hausarbeit pünktlich war, ging ins Kolloquium. Alles, ___ Holm gesagt hatte, stimmte. Der Kollege, mit ___ Leo geschrieben hatte, fehlte.",
              answers: ["dessen", "was", "dem"],
              bank: ["dessen", "was", "dem", "deren", "das", "den", "dass"],
              itemIds: ["b2m4dessen", "b2m4alleswas", "b2m4mitdem", "b2m4kolloquium"],
            },
            {
              id: "b2m4l9e6", type: "monologue", prompt: "Vortrag: universidad y admisión, cuatro minutos.",
              topic: "Wie gerecht ist der Numerus clausus — und was sollte eine gute Studienordnung leisten?",
              slides: [
                { title: "1. Einstieg", hint: "La pregunta y el plan. Un atributo en el primer minuto." },
                { title: "2. Ein Fall", hint: "Leo, un NC, una FH, una Anerkennung. Relativa o Gerundivum." },
                { title: "3. Vorteil / Nachteil", hint: "NC claro vs barreras crecientes. Zwar …, allerdings …" },
                { title: "4. Position", hint: "Qué debe hacer una Studienordnung: plazos unívocos, tutoría, créditos entendibles." },
                { title: "5. Schluss", hint: "Cierra. «Damit bin ich am Ende.»" },
              ],
              planSeconds: 180,
              speakSeconds: 240,
              reps: 2,
              checklist: [
                "Traté las 5 partes",
                "Hablé al menos 3:30",
                "Usé al menos un atributo participial o un Gerundivum",
                "Usé dessen/deren o was o una relativa con preposición",
                "Concedí algo",
                "En la 2.ª pasada no leí las pistas",
              ],
              model: "Diapositiva 2: „Ein Freund von mir hat sich für einen neu eingerichteten Studiengang beworben. Das zu lösende Problem war nicht die Motivation, sondern die in der Ordnung genannte Frist, die von der in der Sprechstunde genannten Praxis abwich.“",
              itemIds: ["b2m4nc", "b2m4neueingerichtete", "b2m4zuloesende", "b2m4studienordnung", "b2m4sprechstunde"],
            },
            {
              id: "b2m4l9e7", type: "type", prompt: "Cierre del módulo — y del bloque escrito",
              question: "el problema que hay que resolver; la reforma que el parlamento aprobó ayer; lo que me molesta",
              answers: [
                "das zu lösende Problem; die gestern vom Parlament beschlossene Reform; das, was mich stört",
                "das zu lösende Problem, die gestern vom Parlament beschlossene Reform, das, was mich stört",
              ],
              itemIds: ["b2m4zuloesende", "b2m4langenattribut", "b2m4daswas"],
              tip: "Gerundivum + atributo extendido + was. Las tres máquinas. El bloque escrito (m1–m4) está cerrado: citar, despersonalizar, nominalizar, comprimir.",
            },
            {
              id: "b2m4l9e8", type: "hearreal", prompt: "Última discriminación",
              book: "Das, was mich stört, ist die Frist.",
              real: "Was mich stört: die Frist.",
              translation: "Lo que me molesta es el plazo.",
              itemIds: ["b2m4natwasmichstort", "b2m4daswas"],
            },
          ],
        },
      ],
    },
  ],
};
