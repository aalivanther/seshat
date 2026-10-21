import type { Phase, VocabItem } from "@/lib/types";

const HOEREN_T3 =
  "Moderatorin Lena Krüger: Willkommen bei «Stadtgespräch». Heute: Homeoffice zwei Tage die Woche — Pflicht oder Privatsache? Bei mir Clara Hofmann, Kai Bergmann und Prof. Dr. Holm. Frau Hofmann zuerst. | Clara Hofmann: Ich spreche mich dafür aus. Wer zwei Tage zu Hause arbeitet, entlastet den Nahverkehr. Das ist messbar. | Kai Bergmann: Dem kann ich mich nur bedingt anschließen. In der Küche geht Homeoffice nicht. Wer das zur Pflicht macht, spaltet die Belegschaft. | Prof. Dr. Holm: Laut unserer Studie steigt die Produktivität, wenn man wählt. Pflicht zerstört den Effekt. | Lena Krüger: Also: Hofmann will die zwei Tage, Bergmann warnt vor der Pflicht in Berufen ohne Schreibtisch, Holm will Wahl, nicht Zwang. | Clara Hofmann: Mit anderen Worten, wir sind uns einig, dass es den Schreibtisch braucht — und uneinig, ob man ihn verordnen darf. | Kai Bergmann: Dann wären wir uns einig, dass die Küche raus muss. | Prof. Dr. Holm: Das Wort ergreifen möchte ich noch einmal: die Studie gilt für Büros. Auf die Pflege und die Küche übertrage ich sie nicht. | Lena Krüger: Notiert. Wer zuhört: eine Person kann mehrfach recht haben. Hofmann und Holm treffen sich bei der Wahl. Bergmann bleibt bei der Ausnahme.";

const VORTRAG_HOLM =
  "Prof. Dr. Holm: Meine Damen und Herren, ich möchte Ihnen heute das Thema Wahlfreiheit im Homeoffice näherbringen. Zuerst die Daten, dann die Grenze, zuletzt ein Vorschlag. Laut unserer Erhebung unter zwölfhundert Beschäftigten steigt die Produktivität um acht Prozent, wenn zwei Tage wählbar sind. Im Vergleich zur Pflicht sinkt die Krankmeldung. Das liegt daran, dass Leute den Tag nehmen, an dem das Kind krank ist, nicht den, den die Firma gesetzt hat. Worauf stützt sich das nicht? Auf Küche, Pflege, Bus. Dort ist Homeoffice kein Angebot. Zusammenfassend lässt sich sagen: Wahl im Büro, Ausnahme im Betrieb. Ich stehe Ihnen nun für Fragen zur Verfügung.";

// B2 · MÓDULO 12 — Rumbo al Goethe-Zertifikat B2. Módulo-examen: NINGUNA
// gramática nueva. Nueve lecciones = los bloques reales del formato 2019
// (NO el handbook de 2007, que describe el examen derogado). Recicla el
// metalenguaje de b1m12 (das Modul, 60 puntos, Anrede, Grußformel, Wer sagt
// was) y el resumen del m11. Prefijo b2m12. Hören T1 y T3: plays 1.

export const vocabB2m12: Record<string, VocabItem> = {
  // ── L1 · el examen por dentro, formato 2019 ──
  b2m12keinekompensation: { id: "b2m12keinekompensation", target: "keine Kompensation zwischen den Modulen", source: "sin compensación entre módulos", sound: "KAI-ne kom-pen-za-TSIÓN" },
  b2m12achtzehn: { id: "b2m12achtzehn", target: "18 von 30", source: "dieciocho de treinta (el corte de Lesen y Hören)", sound: "AJT-tseen fon DRAI-sij" },
  b2m12ohnewoerterbuch: { id: "b2m12ohnewoerterbuch", target: "ohne Wörterbuch", source: "sin diccionario", sound: "OO-ne VÖA-ta-buuj" },
  b2m12gesamtzeugnis: { id: "b2m12gesamtzeugnis", target: "das Gesamtzeugnis", source: "el certificado global (los cuatro módulos juntos)", article: "das", sound: "gue-ZAMT-tsois-nis" },
  b2m12beliebig: { id: "b2m12beliebig", target: "beliebig oft wiederholen", source: "repetir cuantas veces permita el centro", sound: "be-LII-bij oft vee-da-HOO-len" },
  b2m12gueltigkeit: { id: "b2m12gueltigkeit", target: "keine Gültigkeitsdauer", source: "sin caducidad (el Goethe no caduca; lo de los 2 años lo imponen terceros)", sound: "KAI-ne GÜL-tij-kaits-dau-a" },
  b2m12format2019: { id: "b2m12format2019", target: "das Format von 2019", source: "el formato vigente desde 2019 (no el del handbook de 2007)", article: "das", sound: "das for-MAAT fon TSVAI-tau-zent-NOIN-tseen" },
  b2m12handbuch2007: { id: "b2m12handbuch2007", target: "das Handbuch von 2007", source: "el handbook de 2007: describe el examen DEROGADO", article: "das", sound: "das HANT-buuj fon TSVAI-tau-zent-ZII-ben" },
  b2m12modellsatz: { id: "b2m12modellsatz", target: "der Modellsatz", source: "el modelo oficial (con claves y audios)", article: "der", plural: "Modellsätze", sound: "mo-DEL-zats" },

  // ── L2 · Lesen T1 ──
  b2m12einstellungen: { id: "b2m12einstellungen", target: "Einstellungen verstehen", source: "entender posturas (Lesen Teil 1)", sound: "AIN-shtel-un-guen fea-SHTEE-en" },
  b2m12viertexte: { id: "b2m12viertexte", target: "vier Forumstexte", source: "cuatro textos de foro (Teil 1)", sound: "feea fo-RUMS-tek-ste" },
  b2m12mehrmals: { id: "b2m12mehrmals", target: "Eine Person kann mehrmals die Lösung sein.", source: "Una persona puede repetirse; el simulacro también tiene «ninguno» (0)", sound: "AI-ne per-ZOON kan MEER-maals di LÖÖ-zung zain" },

  // ── L3 · Lesen T2+T3 ──
  b2m12einfuegen: { id: "b2m12einfuegen", target: "Sätze einfügen", source: "insertar frases (Lesen Teil 2: 6 huecos, 8 frases, 2 sobran)", sound: "ZET-se AIN-fü-guen" },
  b2m12zweibleiben: { id: "b2m12zweibleiben", target: "Zwei Sätze bleiben übrig.", source: "Sobran dos frases", sound: "tsvai ZET-se BLAI-ben Ü-brij" },
  b2m12informationen: { id: "b2m12informationen", target: "Informationen verstehen", source: "entender información (Lesen T2 y T3; Hören T2 y T4)", sound: "in-for-ma-TSIOO-nen fea-SHTEE-en" },

  // ── L4 · Lesen T4+T5 ──
  b2m12standpunkte: { id: "b2m12standpunkte", target: "Standpunkte verstehen", source: "entender puntos de vista (Lesen Teil 4)", sound: "SHTANT-punk-te fea-SHTEE-en" },
  b2m12regeln: { id: "b2m12regeln", target: "Regeln verstehen", source: "entender normas (Lesen Teil 5)", sound: "REE-geln fea-SHTEE-en" },
  b2m12titelzuordnen: { id: "b2m12titelzuordnen", target: "Titel den Absätzen zuordnen", source: "asignar títulos a párrafos (sobran títulos)", sound: "TII-tel deen AP-ze-tsen TSUU-or-dnen" },

  // ── L5 · Hören T1+T2 ──
  b2m12jedeneinmal: { id: "b2m12jedeneinmal", target: "Sie hören jeden Text einmal", source: "Oirá cada texto una sola vez (Hören Teil 1, consigna B2)", sound: "zii JÖÖ-ren YEE-den tekst AIN-mal" },
  b2m12fuenfkurz: { id: "b2m12fuenfkurz", target: "fünf Kurztexte", source: "cinco textos cortos (Hören Teil 1: 5×2 ítems)", sound: "fünf KURTS-tek-ste" },
  b2m12rfplusmc: { id: "b2m12rfplusmc", target: "Richtig/Falsch und MC", source: "verdadero/falso y opción múltiple (los dos ítems de cada texto corto)", sound: "RIJ-tij falsh unt em-tse" },

  // ── L6 · Hören T3+T4 ──
  b2m12tertulia: { id: "b2m12tertulia", target: "eine Radiodiskussion mit mehreren Stimmen", source: "tertulia de radio con varias voces (Hören Teil 3, una pasada)", sound: "AI-ne ra-di-o-dis-ku-SIÓN" },
  b2m12hoervortrag: { id: "b2m12hoervortrag", target: "einen Vortrag hören", source: "oír una ponencia (Hören Teil 4, dos pasadas)", sound: "AI-nen FOA-traak JÖÖ-ren" },

  // ── L7 · Schreiben ──
  b2m12forumsbeitrag: { id: "b2m12forumsbeitrag", target: "der Forumsbeitrag", source: "el comentario de foro (~150 palabras, 60 puntos, 50 min)", article: "der", sound: "fo-RUMS-bai-traak" },
  b2m12nachrichtvorgesetzter: { id: "b2m12nachrichtvorgesetzter", target: "eine Nachricht an den Vorgesetzten", source: "un mensaje al superior (~100 palabras, 40 puntos, 25 min)", sound: "AI-ne NAAJ-rijt an deen FOA-gue-zet-ten" },
  b2m12vorgesetzter: { id: "b2m12vorgesetzter", target: "der Vorgesetzte", source: "el superior jerárquico", article: "der", plural: "Vorgesetzte", sound: "FOA-gue-zet-te" },
  b2m12fuenfundsiebzig: { id: "b2m12fuenfundsiebzig", target: "75 Minuten Schreiben", source: "setenta y cinco minutos de escrito", sound: "FÜNF-unt-ZÍP-tsij mi-NUU-ten" },
  b2m12erfuellunge: { id: "b2m12erfuellunge", target: "Erfüllung E bedeutet 0 Punkte", source: "si Erfüllung cae a E, la tarea vale cero", sound: "er-FÜ-lung ee be-DOI-tet nul PUNK-te" },

  // ── L8 · Sprechen T1 ──
  b2m12vortraghalten: { id: "b2m12vortraghalten", target: "einen Vortrag halten", source: "dar una ponencia (~4 min, 44 puntos)", sound: "AI-nen FOA-traak HAL-ten" },
  b2m12struktur: { id: "b2m12struktur", target: "eine eigene Struktur", source: "una estructura propia (ya no hay cinco diapositivas fijas)", article: "die", sound: "AI-ne AI-gue-ne shtruk-TUUR" },
  b2m12fragenantworten: { id: "b2m12fragenantworten", target: "Fragen und Antworten", source: "preguntas y respuestas (12 de los 44 puntos del Teil 1)", sound: "FRAA-guen unt ANT-vo-ten" },
  b2m12stehefragen: { id: "b2m12stehefragen", target: "Ich stehe Ihnen für Fragen zur Verfügung.", source: "Quedo a su disposición para preguntas.", sound: "ij SHTEE-e II-nen füa FRAA-guen tsur fea-FÜ-gung" },
  b2m12meinedamen: { id: "b2m12meinedamen", target: "Meine Damen und Herren, ich möchte Ihnen heute … näherbringen.", source: "Damas y caballeros, hoy quisiera acercarles… (apertura del Vortrag)", sound: "MAI-ne DAA-men unt HE-ren" },
  b2m12aufmerksamkeitihre: { id: "b2m12aufmerksamkeitihre", target: "Vielen Dank für Ihre Aufmerksamkeit.", source: "Muchas gracias por su atención (cierre de Sie; en B1 era eure)", sound: "FII-len dank füa II-re AUF-merk-zaam-kait" },
  b2m12einfuehrung: { id: "b2m12einfuehrung", target: "das Einführungsgespräch", source: "la charla inicial (~1 min, NO puntúa)", article: "das", sound: "AIN-fü-rungs-gue-shpreesh" },

  // ── L9 · Sprechen T2 ──
  b2m12diskussionfuehren: { id: "b2m12diskussionfuehren", target: "eine Diskussion führen", source: "sostener una discusión (~5 min, 40 puntos)", sound: "AI-ne dis-ku-SIÓN FÜ-ren" },

  b2m12wortergreifenexam: { id: "b2m12wortergreifenexam", target: "Darf ich dazu das Wort ergreifen?", source: "¿Puedo tomar la palabra sobre eso?", sound: "darf ij da-TSUU das vort er-GRAI-fen" },
  b2m12einig: { id: "b2m12einig", target: "Dann wären wir uns einig, dass …", source: "Entonces estaríamos de acuerdo en que… (cierra el T2)", sound: "dan VÉE-ren via uns AI-nij, das" },
  b2m12aussprache: { id: "b2m12aussprache", target: "die Aussprache (16 Punkte)", source: "la pronunciación, transversal a los dos Teile", article: "die", sound: "AUS-shpraa-je" },
  b2m12partner: { id: "b2m12partner", target: "Das Sprechen braucht eine Partnerin oder einen Partner.", source: "El oral necesita una pareja (la app no la sustituye)", sound: "das SHPRE-jen braujt AI-ne PART-ne-rin" },
  b2m12appbewertetnicht: { id: "b2m12appbewertetnicht", target: "Die App bewertet nicht, was Sie sagen.", source: "La app no puntúa lo que usted dice (entrena y cronometra)", sound: "di ap be-VER-tet nijt, vas zii ZAA-guen" },
  b2m12oesd: { id: "b2m12oesd", target: "Der ÖSD ist in B2 ein anderer Test.", source: "El ÖSD en B2 ya no es el mismo examen que el Goethe", sound: "dea öö-es-DEE ist in bee-TSVAI ain AN-de-ra test" },
};

export const b2m12: Phase = {
  id: "b2m12",
  level: "b2",
  n: 12,
  title: "Rumbo al Goethe-Zertifikat B2",
  goal: "Entrar al examen de 2019 sabiendo qué pide cada Teil, qué ha cambiado respecto al B1 y al handbook de 2007, y qué no puede sustituir esta app: una pareja de oral.",
  color: "#b91c1c",
  lessons: [
    {
      id: "b2m12l1",
      phaseId: "b2m12",
      title: "El examen por dentro — 2019, no 2007",
      subtitle: "Modular, 60 por módulo, 18 de 30, sin diccionario, sin compensación",
      minutes: 14,
      sections: [
        {
          kind: "phrases",
          title: "Las cifras que hay que poder recitar",
          itemIds: ["b1m12gzmodul", "b1m12gzmodular", "b2m12keinekompensation", "b2m12achtzehn", "b2m12ohnewoerterbuch", "b2m12format2019"],
        },
        {
          kind: "note",
          note: {
            title: "Si alguien te cita el handbook de 2007, está citando otro examen",
            body: "El <b>Goethe-Zertifikat B2</b> vigente es el de <b>2019</b>. El PDF que Goethe sigue sirviendo como <i>Prüfungsziele / Testbeschreibung</i> es de <b>2007</b> y describe el examen <b>derogado</b> (Lesen de 80 min, 4 tareas, 25 ítems; Hören de 30 min, 2 tareas). <b>No lo uses.</b> Las cifras de este módulo salen de las <i>Durchführungsbestimmungen</i> (Stand 1.9.2025) y del <b>Modellsatz Erwachsene</b>.<br/><br/>· <b>Modular</b>: Lesen · Hören · Schreiben · Sprechen se rinden sueltos o juntos y se repiten <b>beliebig oft</b>. Los cuatro dan derecho a un [[Gesamtzeugnis|certificado global]].<br/>· <b>100 puntos por módulo. Corte: 60. Sin compensación.</b> Un 95 en Lesen no salva un 55 en Schreiben.<br/>· Lesen y Hören: 30 ítems × 3,33 = <b>18 aciertos = 60 = aprobado. 17 = 57 = suspenso</b>.<br/>· <b>Sin diccionario, sin móvil.</b> Orden recomendado: Lesen → Hören → Schreiben. ≥15 min de pausa entre módulos.<br/>· <b>El Goethe no caduca.</b> Los «2 años» los imponen universidades y extranjería, no el Instituto.<br/>· En B2, <b>el ÖSD ya no es el mismo examen</b>. Preparar Goethe no prepara ÖSD. El ÖSD entra aquí como nota, no como segundo simulacro.",
            table: [
              ["Lesen", "65 min · 5 Teile · 30 ítems · 18/30"],
              ["Hören", "~40 min · 4 Teile · 30 ítems · T1 y T3 UNA vez"],
              ["Schreiben", "75 min · 2 tareas · 150 + 100 palabras"],
              ["Sprechen", "~15 min en pareja · 15 min de prep. · 44+40+16"],
              ["Aprobado", "60 de 100 EN CADA módulo"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m12l1e1", type: "mc", prompt: "La fuente que no debes usar",
              question: "Encuentras un PDF del Goethe titulado Prüfungsziele B2, fechado en 2007, con Lesen de 80 minutos. ¿Qué es?",
              options: ["El examen que vas a hacer", "El examen derogado: el formato vigente es el de 2019", "El ÖSD"],
              answer: 1,
              whyWrong: ["Esas duraciones son las de antes de 2019", null, "El ÖSD es otro examen, y tampoco es ese PDF"],
              itemIds: ["b2m12handbuch2007", "b2m12format2019", "b2m12modellsatz"],
              tip: "Si un material de academia te pone 4 Teile de Lesen y 25 ítems, está entrenándote para un examen que ya no existe.",
            },
            {
              id: "b2m12l1e2", type: "mc", prompt: "Sin compensación",
              question: "92 Lesen, 88 Hören, 74 Sprechen, 54 Schreiben. ¿Qué pasa?",
              options: ["Apruebas: la media es alta", "Apruebas tres módulos y repites solo Schreiben", "Repites los cuatro"],
              answer: 1,
              whyWrong: ["No hay media entre módulos", null, "Los tres aprobados se quedan"],
              itemIds: ["b2m12keinekompensation", "b1m12gzwiederholen", "b1m12gzbestehen", "b2m12gesamtzeugnis", "b2m12beliebig"],
            },
            {
              id: "b2m12l1e3", type: "mc", prompt: "El número de Lesen y Hören",
              question: "30 ítems. ¿Cuántos aciertos aprueban?",
              options: ["15", "18", "24"],
              answer: 1,
              whyWrong: ["15 = 50 = suspenso", null, "24 ya es un 80"],
              itemIds: ["b2m12achtzehn", "b1m12gzausreichend"],
            },
            {
              id: "b2m12l1e4", type: "bucket", prompt: "¿Qué es del formato 2019 y qué es del 2007?",
              categories: ["2019 (el tuyo)", "2007 (derogado)"],
              items: [
                { text: "Lesen 65 min, 5 Teile, 30 ítems", bucket: 0 },
                { text: "Lesen 80 min, 4 Aufgaben, 25 ítems", bucket: 1 },
                { text: "Hören T1 y T3 una sola vez", bucket: 0 },
                { text: "Hören 30 min, 2 Aufgaben", bucket: 1 },
                { text: "Schreiben 75 min, 2 tareas", bucket: 0 },
                { text: "Schreiben con tres tareas cortas al estilo B1", bucket: 1 },
              ],
              itemIds: ["b2m12format2019", "b2m12handbuch2007"],
            },
            {
              id: "b2m12l1e5", type: "match", prompt: "Módulo y reloj",
              pairs: [
                { target: "Lesen", source: "65 minutos, 5 partes, 30 ítems" },
                { target: "Hören", source: "unos 40 minutos, 4 partes; T1 y T3 una vez" },
                { target: "Schreiben", source: "75 minutos, 2 tareas, 150+100 palabras" },
                { target: "Sprechen", source: "unos 15 minutos en pareja, 15 de preparación" },
              ],
              itemIds: ["b1m12gzmodul", "b2m12fuenfundsiebzig"],
            },
            {
              id: "b2m12l1e6", type: "cloze", prompt: "La regla de oro, otra vez",
              text: "Man braucht ___ von 100 Punkten, um ein Modul zu bestehen. In Lesen und Hören sind das 18 von 30.",
              answers: ["60", "sechzig"],
              itemIds: ["b1m12gzbestehen", "b2m12achtzehn"],
            },
            {
              id: "b2m12l1e7", type: "gapbank", prompt: "Tres hechos que hay que saber de memoria",
              text: "Die Prüfung ist modular. Es gibt keine ___ zwischen den Modulen. Man schreibt ___ Wörterbuch. Der ÖSD ist in B2 ein ___ Test.",
              answers: ["Kompensation", "ohne", "anderer"],
              bank: ["Kompensation", "ohne", "anderer", "mit", "derselbe", "Gebühr"],
              itemIds: ["b2m12keinekompensation", "b2m12ohnewoerterbuch", "b2m12oesd"],
            },
            {
              id: "b2m12l1e8", type: "errorfix", prompt: "La caducidad que no es del Goethe",
              wrong: "Das Goethe-Zertifikat B2 gilt nur zwei Jahre.",
              answers: ["Das Goethe-Zertifikat B2 gilt unbefristet.", "Das Goethe-Zertifikat B2 gilt unbefristet"],
              why: "La Prüfungsordnung no fija caducidad. Los dos años los piden universidades y extranjería. Si te examinas «porque caduca», estás cumpliendo la norma de un tercero, no la del Goethe.",
              translation: "El Goethe-Zertifikat B2 no tiene plazo de validez.",
              itemIds: ["b2m12gueltigkeit"],
            },
            {
              id: "b2m12l1e9", type: "fastmatch", prompt: "Velocidad: el metalenguaje que ya es tuyo del B1",
              pairs: [
                { target: "das Modul", source: "el módulo" },
                { target: "ein Modul bestehen", source: "aprobar un módulo" },
                { target: "durch ein Modul fallen", source: "suspender un módulo" },
                { target: "die Anrede", source: "el saludo inicial" },
                { target: "die Grußformel", source: "la fórmula de despedida" },
              ],
              targetSeconds: 25,
              itemIds: ["b1m12gzmodul", "b1m12gzbestehen", "b1m12gzdurchfallen", "b1m12gzanrede", "b1m12gzgrussformel"],
            },
            {
              id: "b2m12l1e10", type: "type", prompt: "Cierre",
              question: "Dieciocho de treinta en Lesen y en Hören; sin compensación entre módulos",
              answers: [
                "18 von 30 in Lesen und Hören; keine Kompensation zwischen den Modulen",
                "18 von 30 in Lesen und Hören; keine Kompensation zwischen den Modulen.",
              ],
              itemIds: ["b2m12achtzehn", "b2m12keinekompensation"],
            },
          ],
        },
      ],
    },

    {
      id: "b2m12l2",
      phaseId: "b2m12",
      title: "Lesen Teil 1: cuatro voces, una puede repetir",
      subtitle: "Einstellungen verstehen — se acabó el «0» del B1",
      minutes: 16,
      sections: [
        {
          kind: "phrases",
          title: "La tarea que ya no es Richtig/Falsch",
          itemIds: ["b2m12einstellungen", "b2m12viertexte", "b2m12mehrmals", "b1m12gzzuordnen"],
        },
        {
          kind: "note",
          note: {
            title: "Cuatro foros, nueve ítems, una persona puede ser la respuesta varias veces",
            body: "El Teil 1 del B1 era un texto personal y seis Richtig/Falsch. El del B2 es otra operación: <b>cuatro textos de foro</b> (~580 palabras en el Modellsatz) y <b>asignar afirmaciones a personas</b>. <b>Una persona puede ser la solución más de una vez. No existe el «0»</b> del Teil 3 de B1. Si te sobra una afirmación, has emparejado mal, no has encontrado un hueco oficial.<br/><br/>Tiempo sugerido: <b>18 minutos</b>. Estrategia: lee las afirmaciones, subraya la postura (no el tema), busca quién la sostiene aunque sea con otras palabras. Es el resumen-sin-copiar del m11, aplicado a un test.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m12l2e1", type: "read", prompt: "Cuatro voces sobre el Homeoffice. Una puede repetir. No hay «0».",
              title: "Forum: Zwei Tage Homeoffice — Pflicht?",
              source: "Lesen Teil 1, Modellformat (vier Beiträge)",
              text: "<b>Sofía Marín, Programmiererin, Berlin.</b> Ich bin dafür, aber nicht als Pflicht. Zwei Tage zu Hause entlasten den Nahverkehr, das sehe ich jeden Morgen in der Bahn. Pflicht würde in der Küche von Nico niemanden helfen — und uns im Team spalten. Wahl, nicht Zwang. Wer das als Faulheit liest, hat meine Schicht nicht gesehen: ich arbeite, ich fahre nur nicht.<br/><br/><b>Kai Bergmann, Betriebsrat, Großküche.</b> Dem kann ich mich nur bedingt anschließen. In Berufen ohne Schreibtisch ist Homeoffice kein Angebot, es ist eine Beleidigung, wenn man es zur Regel für alle macht. Ich unterstütze Jobtickets und Nachtbusse. Eine Homeoffice-Pflicht unterschreibe ich nicht. Die Belegschaft ist nicht das Büro.<br/><br/><b>Anna, Krankenschwester.</b> Ich kann nicht von zu Hause pflegen. Punkt. Wer zwei Tage Homeoffice zur Norm erklärt, erklärt meinen Beruf zur Ausnahme, und Ausnahmen werden in der Grafik unsichtbar. Ich gönne Sofía die zwei Tage. Ich will sie nicht als Maß für alle. Im Wesentlichen fehlt mir der Bus nach Mitternacht, nicht ein Schreibtisch.<br/><br/><b>Leo, Student.</b> Ich wäre froh um zwei Tage, weil die Bibliothek voll ist und ich in Ruhe schreiben könnte. Pflicht fände ich trotzdem falsch: nicht jeder hat ein Zimmer, in dem man denken kann. Im Wohnheim teile ich mir den Tisch mit zwei anderen. Wahl ja. Zwang nein. Und bitte ohne Moral für die, die kommen müssen.<br/><br/>Sofía noch einmal, in einem Nachtrag: Wer Pflicht sagt, meint oft die Bahn. Ich meine den Code, den ich in Ruhe schreiben kann, und den Takt, den Anna nachts nicht hat. Beides in denselben Topf zu werfen ist genau der Fehler von Lesen Teil 1, wenn man nur das Thema sieht und nicht die Haltung. Kai bleibt bei der Küche. Leo bleibt beim Wohnheim. Anna bleibt beim Bus. Ich bleibe bei der Wahl. Vier Stimmen, ein Forum, und ja: eine Person kann mehrmals die Lösung sein, wenn die Aussage zwei Dinge von ihr trifft.\n\nDie vier Texte sind das Material. Die Aussagen unten sind das, was der Test umformuliert. Eine Person kann mehrmals die Lösung sein.\n\nNachsatz der Redaktion: Die vier Beiträge sind Absicht. Wer nur nach dem Wort Homeoffice sucht, verfehlt die Haltung. Sofía und Leo wollen Wahl. Kai und Anna wollen sichtbar bleiben, wo kein Schreibtisch ist. Das Forum wiederholt Personen, weil das Leben sie wiederholt: dieselbe Köchin, dieselbe Nacht, dieselbe Bahn. Wer das Forum überfliegt, sieht ein Thema. Wer die Haltungen liest, sieht vier Personen, nicht nur ein Schlagwort.",
              questions: [
                {
                  id: "b2m12l2e1q1",
                  q: "Wer lehnt eine Pflicht vor allem deshalb ab, weil nicht alle einen Schreibtisch haben?",
                  options: ["Sofía", "Kai", "Anna", "Leo"],
                  answer: 1,
                  why: "Kai: oficios sin escritorio; la plantilla no es la oficina.",
                },
                {
                  id: "b2m12l2e1q2",
                  q: "Wer verbindet Homeoffice mit entlastetem Nahverkehr — und will trotzdem keine Pflicht?",
                  options: ["Sofía", "Kai", "Anna", "Leo"],
                  answer: 0,
                  why: "Sofía, primer texto. Wahl, nicht Zwang.",
                },
                {
                  id: "b2m12l2e1q3",
                  q: "Wem fehlt vor allem eine Verbindung nach Mitternacht, nicht ein Schreibtisch?",
                  options: ["Sofía", "Kai", "Anna", "Leo"],
                  answer: 2,
                  inference: true,
                  why: "Anna: no puede cuidar desde casa; lo que pide es el bus, no el escritorio. Hay que inferir que su «medida para todos» no es el Homeoffice.",
                },
                {
                  id: "b2m12l2e1q4",
                  q: "Wer warnt davor, dass nicht jeder einen ruhigen Arbeitsplatz zu Hause hat?",
                  options: ["Sofía", "Kai", "Anna", "Leo"],
                  answer: 3,
                  why: "Leo: Wohnheim, mesa compartida.",
                },
                {
                  id: "b2m12l2e1q5",
                  q: "Wer unterstützt ausdrücklich Jobtickets und Nachtbusse statt Homeoffice-Pflicht?",
                  options: ["Sofía", "Kai", "Anna", "Leo"],
                  answer: 1,
                  inference: true,
                  why: "Kai otra vez: una persona puede ser la solución más de una vez. En B1 Teil 3 eso no pasaba.",
                },
              ],
              itemIds: ["b2m12viertexte", "b2m12mehrmals", "b2m12einstellungen"],
              tip: "Kai sale dos veces. Si te resistes a repetir persona, estás aplicando la regla del B1 y fallas el ítem del B2.",
            },
            {
              id: "b2m12l2e2", type: "mc", prompt: "La regla que cambia respecto al B1",
              question: "Has asignado ocho afirmaciones y la novena te encaja otra vez con Kai. ¿Qué haces?",
              options: ["Escribes 0, como en el B1 Teil 3", "Vuelves a poner a Kai: una persona puede repetir", "Dejas la casilla vacía"],
              answer: 1,
              whyWrong: ["En el Teil 1 de B2 no hay 0", null, "Vacío es 0 puntos seguro"],
              itemIds: ["b2m12mehrmals"],
            },
            {
              id: "b2m12l2e3", type: "bucket", prompt: "¿A favor de la PFLICHT o solo de la opción?",
              categories: ["wahl, nicht Pflicht", "Pflicht wäre falsch / unmöglich"],
              items: [
                { text: "Sofía: zwei Tage ja, Pflicht nein", bucket: 0 },
                { text: "Kai: Pflicht spaltet die Belegschaft", bucket: 1 },
                { text: "Anna: mein Beruf wird zur unsichtbaren Ausnahme", bucket: 1 },
                { text: "Leo: Wahl ja, Zwang nein", bucket: 0 },
              ],
              itemIds: ["b2m12einstellungen"],
            },
            {
              id: "b2m12l2e4", type: "cloze", prompt: "La consigna mental",
              text: "Eine Person kann ___ die Lösung sein.",
              answers: ["mehrmals"],
              itemIds: ["b2m12mehrmals"],
            },
            {
              id: "b2m12l2e5", type: "paraphrase", prompt: "Como hace el examen con las afirmaciones",
              source: "Ich gönne Sofía die zwei Tage. Ich will sie nicht als Maß für alle.",
              forbid: ["gönne", "Maß", "alle"],
              answers: [
                "Anna akzeptiert Homeoffice für andere, nicht als Norm für ihren Beruf.",
                "Anna ist nicht gegen Sofías Tage, aber gegen eine Regel für ihren Beruf.",
              ],
              itemIds: ["b2m12einstellungen"],
            },
            {
              id: "b2m12l2e6", type: "type", prompt: "Cierre",
              question: "Una persona puede ser la respuesta varias veces",
              answers: [
                "Eine Person kann mehrmals die Lösung sein",
                "Eine Person kann mehrmals die Lösung sein.",
              ],
              itemIds: ["b2m12mehrmals"],
            },
          ],
        },
      ],
    },

    {
      id: "b2m12l3",
      phaseId: "b2m12",
      title: "Lesen Teil 2 y 3: coser un texto, leer un artículo",
      subtitle: "Insertar frases (2 sobran) · MC de 3 sobre prensa",
      minutes: 15,
      sections: [
        {
          kind: "phrases",
          title: "La tarea nueva del nivel: la cohesión",
          itemIds: ["b2m12einfuegen", "b2m12zweibleiben", "b2m12informationen"],
        },
        {
          kind: "note",
          note: {
            title: "Teil 2 no pregunta qué dice el texto: pregunta cómo está cosido",
            body: "Teil 2: un artículo con <b>6 huecos</b> y <b>8 frases; 2 sobran</b>. Se resuelve con conectores, pronombres y progresión temática — el material del m5 y del campo medio. Si dos frases «van de lo mismo», gana la que encaja con el hilo (ein/dieser, aber/deshalb, el tiempo verbal).<br/><br/>Teil 3: un artículo de prensa, <b>6 MC de 3 opciones</b>, ~12 min. Las tres opciones suelen aparecer en el texto; solo una responde a la <b>pregunta</b>. Ya no hay Richtig/Falsch en todo el Lesen.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m12l3e1", type: "mc", prompt: "Qué sobra, a propósito",
              question: "8 frases, 6 huecos. ¿Cuántas sobran y qué haces con ellas?",
              options: ["Ninguna: todas encajan si se insiste", "Dos. Las que no cosen el hilo se quedan fuera", "Una, y se escribe 0"],
              answer: 1,
              whyWrong: ["Insistir es el error: dos están diseñadas para no ir", null, "Eso es el B1 Teil 3"],
              itemIds: ["b2m12zweibleiben", "b2m12einfuegen"],
            },
            {
              id: "b2m12l3e2", type: "gapbank", prompt: "Lesen Teil 2: seis huecos, ocho fichas. Dos sobran.",
              text: "Zwei Tage Homeoffice — Pflicht oder Privatsache? Immer mehr Betriebe bieten zwei feste Tage im Büroalltag an. ___ Die Türen der S-Bahn schließen morgens ohne Gedränge. ___ In Berufen ohne Schreibtisch ändert sich der Dienstplan nicht. ___ Sonst erklärt die Grafik den Koch und die Krankenschwester zur unsichtbaren Ausnahme. Was als Pilot begann, ist Alltag geworden. ___ Die Produktivität steigt um acht Prozent, wenn man den Tag wählt, nicht wenn die Firma ihn setzt. Die Nachtschicht kommt in keiner dieser Grafiken vor. ___ Die letzte Tram endet kurz nach Mitternacht, und das Jobticket löst den Takt nicht. Drei Stimmen, ein Forum, und ja: eine Person kann mehrmals recht haben. ___ Niemand hat sie von der Redeliste gestrichen.",
              answers: [
                "Dadurch sinkt der Andrang in der Bahn.",
                "Allerdings bleibt in Küche und Pflege alles unverändert.",
                "Deshalb muss die Regel die Ausnahme mitdenken.",
                "Inzwischen testen mehr Betriebe das Modell freiwillig.",
                "Außerdem fehlt nachts oft der Bus.",
                "Trotzdem bleibt die Frage auf der Tagesordnung.",
              ],
              bank: [
                "Dadurch sinkt der Andrang in der Bahn.",
                "Allerdings bleibt in Küche und Pflege alles unverändert.",
                "Deshalb muss die Regel die Ausnahme mitdenken.",
                "Inzwischen testen mehr Betriebe das Modell freiwillig.",
                "Außerdem fehlt nachts oft der Bus.",
                "Trotzdem bleibt die Frage auf der Tagesordnung.",
                "Zuerst müsste man alle Küchen schließen.",
                "Bitte ohne Moral für die, die kommen müssen.",
              ],
              translation: "Cada vez más empresas ofrecen dos días. Con ello baja el andén. Eso sí, en cocina y cuidados nada cambia. Por eso la regla tiene que pensar la excepción. Mientras tanto más empresas prueban el modelo por voluntad. Además falta el bus de noche. Aun así la pregunta sigue en el orden del día. Sobran a propósito la de cerrar las cocinas y la de «por favor, sin moral».",
              itemIds: ["b2m12einfuegen", "b2m12zweibleiben"],
              tip: "Seis huecos, ocho fichas: dos sobran a propósito. Gana la que cose el hilo (un dadurch, un sonst, un sie), no la que «va de Homeoffice».",
            },
            {
              id: "b2m12l3e3", type: "mc", prompt: "Teil 3: las tres opciones están en el texto",
              question: "El artículo menciona andén, cocina y regla. La pregunta es: «¿Qué sigue igual?». ¿Qué miras?",
              options: ["La primera palabra que reconozcas", "El verbo de la pregunta: «sigue igual»", "La opción más larga"],
              answer: 1,
              whyWrong: ["Reconocer es la trampa", null, "La longitud no puntúa"],
              itemIds: ["b2m12informationen"],
            },
            {
              id: "b2m12l3e4", type: "errorfix", prompt: "El conector del hilo",
              wrong: "Die Bahn ist voll, allerdings die Küche bleibt voll.",
              answers: ["Die Bahn ist voll, allerdings bleibt die Küche voll.", "Die Bahn ist voll, allerdings bleibt die Küche voll"],
              why: "allerdings es adverbio: inversión. Si lo tratas como aber, el Teil 2 te da como válida la frase mala y tú eliges la que «suena a español».",
              itemIds: ["b1m12gzjedoch"],
            },
            {
              id: "b2m12l3e5", type: "match", prompt: "Teil y operación",
              pairs: [
                { target: "Lesen Teil 2", source: "insertar 6 de 8 frases; 2 sobran" },
                { target: "Lesen Teil 3", source: "artículo, 6 MC de 3" },
                { target: "12 Minuten + 12 Minuten", source: "tiempos sugeridos de T2 y T3" },
                { target: "kein Richtig/Falsch", source: "en todo el Lesen B2" },
              ],
              itemIds: ["b2m12einfuegen", "b2m12informationen"],
            },
            {
              id: "b2m12l3e6", type: "type", prompt: "Cierre",
              question: "Sobran dos frases",
              answers: [
                "Zwei Sätze bleiben übrig",
                "Zwei Sätze bleiben übrig.",
              ],
              itemIds: ["b2m12zweibleiben"],
            },
          ],
        },
      ],
    },

    {
      id: "b2m12l4",
      phaseId: "b2m12",
      title: "Lesen Teil 4 y 5: posturas y Studienordnung",
      subtitle: "Ocho opiniones, un titular sobra · reglamento universitario",
      minutes: 15,
      sections: [
        {
          kind: "phrases",
          title: "Del Leserbrief a la norma de facultad",
          itemIds: ["b2m12standpunkte", "b2m4studienordnung", "b2m12regeln", "b2m12titelzuordnen"],
        },
        {
          kind: "note",
          note: {
            title: "Teil 4 infiere postura; Teil 5 infiere el título del párrafo",
            body: "Teil 4: <b>8 opiniones</b> (a–h) y titulares; <b>una sobra</b>. Nadie escribe «ich bin dafür»: se infiere, como en el m11. Manda el final de cada texto, no la concesión inicial.<br/><br/>Teil 5: una <b>Studienordnung</b> (ya no una Hausordnung de B1). 3 párrafos, títulos de índice, <b>4 títulos sobran</b>, ~6 min. Nominalización pura. Busca obligaciones (ist … zu / muss / hat … zu) y condiciones (sofern, erst nach).",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m12l4e1", type: "bucket", prompt: "Teil 4 en miniatura: ¿a favor de la Pflicht de Homeoffice?",
              categories: ["dafür (Pflicht)", "dagegen / nur Wahl"],
              items: [
                { text: "„Ohne Pflicht ändert sich nichts. Die Firma muss setzen.“", bucket: 0 },
                { text: "„Natürlich verstehe ich die Bahn. Trotzdem zerstört Pflicht den Effekt.“", bucket: 1 },
                { text: "„Zwei Tage, aber nur wer will. Sonst spalten wir.“", bucket: 1 },
                { text: "„Andere Länder machen das längst zur Regel. Wir sollten nachziehen.“", bucket: 0 },
                { text: "„In der Pflege ist das kein Angebot. Punkt.“", bucket: 1 },
                { text: "„Wer nicht muss, bleibt im Stau. Also muss man müssen.“", bucket: 0 },
              ],
              itemIds: ["b2m12standpunkte"],
              tip: "La concesión («Natürlich…») no es la postura. Manda lo que viene después de trotzdem / aber.",
            },
            {
              id: "b2m12l4e2", type: "mc", prompt: "La trampa de la concesión, otra vez",
              question: "„Natürlich entlastet Homeoffice die Bahn. Trotzdem halte ich eine Pflicht für falsch.“ ¿A favor de la Pflicht?",
              options: ["Sí: nombra la ventaja", "No: la postura está tras trotzdem"],
              answer: 1,
              whyWrong: ["La ventaja es la concesión", null],
              itemIds: ["b2m12standpunkte"],
            },
            {
              id: "b2m12l4e3", type: "read", prompt: "Mini Studienordnung. Asigna el título. Sobran títulos en las opciones.",
              title: "Auszug aus der Studienordnung, Fakultät Informatik",
              source: "Lesen Teil 5, Modellformat",
              text: "§ 12 Wiederholung von Prüfungen. Eine nicht bestandene Modulprüfung darf zweimal wiederholt werden. Die Anmeldung zur Wiederholung hat spätestens vier Wochen nach Bekanntgabe des Ergebnisses zu erfolgen. Wer die Frist versäumt, gilt als nicht angetreten; ein weiterer Versuch entfällt. Eine dritte Wiederholung ist ausgeschlossen. Abweichungen sind dem Prüfungsausschuss schriftlich zu begründen und nur bei nachgewiesenem Nachteilsausgleich zulässig. Die Studienordnung tritt am 1. Oktober in Kraft. Studierende, die ihr Studium vor diesem Datum aufgenommen haben, können auf Antrag im alten Verfahren bleiben, sofern sie die Meldung bis zum 15. November einreichen. Nach Ablauf dieser Frist gilt ausschließlich das neue Verfahren. Einsicht in die bewerteten Arbeiten wird einmalig, nach Terminvereinbarung, gewährt. Eine Kopie der Arbeit wird nicht ausgehändigt. Wer die Einsicht versäumt, hat keinen Anspruch auf einen Ersatztermin, es sei denn, die Versäumnis ist nicht selbst verschuldet und wird innerhalb von drei Werktagen angezeigt. Der Prüfungsausschuss entscheidet in diesen Fällen ohne mündliche Verhandlung. Widerspruch gegen die Entscheidung ist innerhalb eines Monats beim Prüfungsamt einzulegen. Die Entscheidung über den Widerspruch ergeht schriftlich. Eine weitere Wiederholung der Prüfung ist damit nicht verbunden; sie bleibt bei zwei Versuchen.\n\n§ 14 Täuschung. Wer bei einer Prüfung unerlaubte Hilfsmittel verwendet, gilt als nicht bestanden; der Versuch wird angerechnet. Das Prüfungsamt hört die oder den Betroffenen an, bevor es entscheidet. Eine Täuschung in der Abschlussarbeit führt zur Exmatrikulation, sofern der Prüfungsausschuss nicht auf eine mildere Maßnahme erkennt. Die Studienordnung ist bekannt zu machen; Unkenntnis schützt nicht. Wer an der Prüfung teilnimmt, erkennt die Ordnung mit der Anmeldung an. Ausfertigungen liegen im Prüfungsamt und auf den Seiten der Fakultät aus. Änderungen werden mit einer Frist von sechs Wochen vor Semesterbeginn bekannt gegeben und gelten für alle, die sich danach anmelden, auch wenn das Studium früher begonnen hat. Die Bekanntgabe erfolgt im Campusmanagementsystem. Einwände gegen die Form der Bekanntgabe sind ausgeschlossen. Wer eine Frist versäumt, trägt die Folgen selbst, es sei denn, ein technischer Ausfall der Hochschule ist nachgewiesen und innerhalb von zwei Werktagen gemeldet. Die Fakultät führt eine Liste der zugelassenen Hilfsmittel; was nicht auf der Liste steht, gilt als unerlaubt. Diese Ordnung gilt für alle Studiengänge der Fakultät, soweit die jeweilige Prüfungsordnung nichts Abweichendes bestimmt. Hilfsmittel, die nicht auf der Liste stehen, werden eingezogen. Die Entscheidung des Prüfungsausschusses ist zu begründen. Eine mündliche Nachprüfung findet nicht statt. Fristen, die auf einen Feiertag fallen, verschieben sich auf den nächsten Werktag. Die Fakultät veröffentlicht die Termine jeweils zum Semesterbeginn. Einsprüche gegen die Termine sind ausgeschlossen.",
              questions: [
                {
                  id: "b2m12l4e3q1",
                  q: "Welcher Titel passt zum ersten Block (§ 12, Wiederholung)?",
                  options: ["Anzahl der Versuche und Fristen", "Wohnheimordnung", "Bibliotheksausweis"],
                  answer: 0,
                  why: "Dos repeticiones, plazo de cuatro semanas, tercera excluida. Los otros títulos no están en el texto: sobran, como en el examen.",
                },
                {
                  id: "b2m12l4e3q2",
                  q: "Was gilt für Studierende, die vor dem 1. Oktober angefangen haben?",
                  options: ["Automatisch das alte Verfahren.", "Altes Verfahren nur auf Antrag bis zum 15. November.", "Keine Prüfung mehr."],
                  answer: 1,
                  why: "«können auf Antrag … bleiben, sofern sie die Meldung bis zum 15. November einreichen.»",
                },
                {
                  id: "b2m12l4e3q3",
                  q: "Was folgt aus einer versäumten Einsicht, wenn man selbst schuld ist?",
                  options: ["Ein Ersatztermin ist garantiert.", "Kein Anspruch auf Ersatztermin.", "Die Prüfung gilt als bestanden."],
                  answer: 1,
                  inference: true,
                  why: "«Wer die Einsicht versäumt, hat keinen Anspruch auf einen Ersatztermin, es sei denn … nicht selbst verschuldet.» Hay que leer la condición.",
                },
                {
                  id: "b2m12l4e3q4",
                  q: "Welcher Titel würde NICHT in das Inhaltsverzeichnis dieses Auszugs gehören?",
                  options: ["Widerspruch gegen Prüfungsentscheidungen", "Einsicht in bewertete Arbeiten", "Mietspiegel der Stadt"],
                  answer: 2,
                  inference: true,
                  why: "Los dos primeros están en el texto. El Mietspiegel es del m8 y aquí sobra — exactamente lo que hace el Teil 5 con los títulos de más.",
                },
              ],
              itemIds: ["b2m4studienordnung", "b2m12regeln", "b2m12titelzuordnen"],
            },
            {
              id: "b2m12l4e4", type: "cloze", prompt: "La obligación de reglamento",
              text: "Die Anmeldung zur Wiederholung hat innerhalb von vier Wochen ___ erfolgen.",
              answers: ["zu"],
              translation: "La inscripción a la recuperación ha de hacerse en cuatro semanas.",
              itemIds: ["b2m4studienordnung"],
              tip: "hat … zu + infinitivo es la obligación del Amtsdeutsch. En el Teil 5 sale más que muss.",
            },
            {
              id: "b2m12l4e5", type: "match", prompt: "Teil, ítems, trampa",
              pairs: [
                { target: "Lesen Teil 4", source: "8 opiniones, 6 ítems, un titular sobra" },
                { target: "Lesen Teil 5", source: "Studienordnung, títulos, 4 sobran" },
                { target: "12 + 6 Minuten", source: "tiempos sugeridos" },
                { target: "der Schluss zählt", source: "en T4, tras la concesión" },
              ],
              itemIds: ["b2m12standpunkte", "b2m4studienordnung"],
            },
            {
              id: "b2m12l4e6", type: "type", prompt: "Cierre",
              question: "Asignar títulos a los párrafos",
              answers: [
                "Titel den Absätzen zuordnen",
                "Titel den Absätzen zuordnen.",
              ],
              itemIds: ["b2m12titelzuordnen"],
            },
          ],
        },
      ],
    },

    {
      id: "b2m12l5",
      phaseId: "b2m12",
      title: "Hören Teil 1 y 2: abres a una sola pasada",
      subtitle: "T1 UNA vez (5 cortos) · T2 DOS veces (entrevista)",
      minutes: 16,
      sections: [
        {
          kind: "phrases",
          title: "El patrón se ha invertido respecto al B1",
          itemIds: ["b2m12jedeneinmal", "b2m12fuenfkurz", "b2m12rfplusmc", "b1m12gzzweimalhoeren"],
        },
        {
          kind: "note",
          note: {
            title: "1 y 3 una vez; 2 y 4 dos veces — el reverso del B1",
            body: "En B1 abrías con diez ítems que sonaban dos veces. En B2 <b>abres con diez ítems a una sola pasada</b>: cinco conversaciones cortas, dos ítems cada una (Richtig/Falsch + MC3). El 53 % del Hören se juega sin repetición. Cuaderno. Anota números, nombres, negaciones (leider, nicht, erst).<br/><br/>Teil 2: entrevista de radio, <b>dos veces</b>, 6 MC. Más aire. No te confíes: el dato que decide suele estar en la segunda mitad.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m12l5e1", type: "audiomc", prompt: "Hören Teil 1, texto 1. UNA pasada. Richtig/Falsch.",
              audio: "Guten Tag, hier ist die Prüfungsstelle, Frau Schuster. Es geht um Ihre Anmeldung zur B2-Prüfung. Der Wunschtermin am dritten Juni ist leider voll. Wir können Ihnen den zehnten anbieten, zur gleichen Uhrzeit. Bringen Sie bitte einen gültigen Ausweis mit. Ohne Ausweis dürfen wir Sie nicht zulassen. Rufen Sie bis Freitag zurück.",
              question: "Der gewünschte Prüfungstermin bleibt bestehen.",
              options: ["Richtig", "Falsch"],
              answer: 1,
              plays: 1,
              notepad: true,
              whyWrong: ["El 3 de junio está lleno; ofrecen el 10", null],
              itemIds: ["b2m12jedeneinmal", "b1m12gzteilnehmenan"],
              tip: "Una sola pasada. En el B1 esto sonaba dos veces. Aquí no. El leider es el dato.",
            },
            {
              id: "b2m12l5e2", type: "audiomc", prompt: "Mismo mensaje, segundo ítem. UNA pasada. MC.",
              audio: "Guten Tag, hier ist die Prüfungsstelle, Frau Schuster. Es geht um Ihre Anmeldung zur B2-Prüfung. Der Wunschtermin am dritten Juni ist leider voll. Wir können Ihnen den zehnten anbieten, zur gleichen Uhrzeit. Bringen Sie bitte einen gültigen Ausweis mit. Ohne Ausweis dürfen wir Sie nicht zulassen. Rufen Sie bis Freitag zurück.",
              question: "Was passiert ohne gültigen Ausweis?",
              options: ["Man darf nicht zur Prüfung.", "Man zahlt eine Gebühr.", "Man bekommt einen späteren Termin."],
              answer: 0,
              plays: 1,
              notepad: true,
              whyWrong: [null, "De dinero no se dice nada", "La fecha posterior es por el cupo, no por el documento"],
              itemIds: ["b2m12rfplusmc"],
            },
            {
              id: "b2m12l5e3", type: "audiomc", prompt: "Teil 1, texto 2. UNA pasada.",
              audio: "Nico, hast du das Jobticket gekriegt? | Noch nicht. Kai sagt, die Runde ist erst nächsten Donnerstag. | Und bis dahin? | Bahn, und fluchen. | Anna fährt nachts. Die braucht eher den Bus als das Ticket. | Ja. Sag ihr, ich denk dran.",
              question: "Nico hat das Jobticket schon.",
              options: ["Richtig", "Falsch"],
              answer: 1,
              plays: 1,
              notepad: true,
              whyWrong: ["«Noch nicht. … erst nächsten Donnerstag»", null],
              itemIds: ["b2m12jedeneinmal"],
            },
            {
              id: "b2m12l5e4", type: "audiomc", prompt: "Teil 2: entrevista, DOS pasadas. Cuaderno.",
              audio: VORTRAG_HOLM,
              question: "Worauf stützt sich die Studie von Prof. Holm nicht?",
              options: ["Auf Büros", "Auf Küche, Pflege und Bus", "Auf Krankmeldungen"],
              answer: 1,
              plays: 2,
              notepad: true,
              whyWrong: ["La estudio es de oficinas", null, "Eso sí lo menciona como efecto"],
              itemIds: ["b2m12informationen", "b1m12gzzweimalhoeren"],
            },
            {
              id: "b2m12l5e5", type: "mc", prompt: "El patrón de escuchas",
              question: "Hören B2: ¿qué Teile suenan UNA vez?",
              options: ["2 y 4, como en B1", "1 y 3", "Todos"],
              answer: 1,
              whyWrong: ["Eso era B1; aquí se invierte", null, "2 y 4 suenan dos veces"],
              itemIds: ["b2m12jedeneinmal"],
            },
            {
              id: "b2m12l5e6", type: "cloze", prompt: "La consigna literal del Teil 1",
              text: "Sie hören jeden Text ___.",
              answers: ["einmal"],
              itemIds: ["b2m12jedeneinmal"],
            },
            {
              id: "b2m12l5e7", type: "type", prompt: "Cierre",
              question: "Oirá cada texto una sola vez",
              answers: [
                "Sie hören jeden Text einmal",
                "Sie hören jeden Text einmal.",
              ],
              itemIds: ["b2m12jedeneinmal"],
            },
          ],
        },
      ],
    },

    {
      id: "b2m12l6",
      phaseId: "b2m12",
      title: "Hören Teil 3 y 4: ¿quién dice qué? y el Vortrag",
      subtitle: "T3 UNA vez, tertulia · T4 DOS veces, ponencia",
      minutes: 16,
      sections: [
        {
          kind: "phrases",
          title: "Atribuir, y luego seguir un hilo largo",
          itemIds: ["b2m12tertulia", "b1m12gzwersagtwas", "b2m12hoervortrag", "b1m12gzmoderator"],
        },
        {
          kind: "note",
          note: {
            title: "Los nombres van en el audio porque esta app no garantiza tres voces",
            body: "El Teil 3 real es una tertulia de varias personas, <b>una sola pasada</b>, y hay que decir <b>quién sostiene qué</b>. Aquí los nombres se oyen. En el Goethe, no: tendrás que haber ligado voz y postura en el cuaderno. Una persona puede repetir, como en Lesen T1.<br/><br/>Teil 4: un Vortrag breve, dos escuchas, 8 MC. Es el más parecido a una lección. Anota la estructura (zuerst / dann / zuletzt) y lo que el ponente dice que su dato <b>no</b> demuestra.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m12l6e1", type: "audiomc", prompt: "Teil 3. UNA pasada. ¿Quién dice qué?",
              audio: HOEREN_T3,
              question: "Wer warnt davor, dass eine Homeoffice-Pflicht die Belegschaft spaltet?",
              options: ["Clara Hofmann", "Kai Bergmann", "Prof. Dr. Holm"],
              answer: 1,
              plays: 1,
              notepad: true,
              whyWrong: ["Hofmann está a favor de los dos días", null, "Holm habla de la Wahl"],
              itemIds: ["b2m12tertulia", "b1m12gzwersagtwas"],
            },
            {
              id: "b2m12l6e2", type: "audiomc", prompt: "Teil 3, mismo audio. UNA pasada.",
              audio: HOEREN_T3,
              question: "Worauf will Prof. Holm die Studie nicht übertragen?",
              options: ["Auf Büros", "Auf Pflege und Küche", "Auf die Bahn"],
              answer: 1,
              plays: 1,
              notepad: true,
              whyWrong: ["La estudio es de oficinas", null, "No es su límite declarado"],
              itemIds: ["b2m12tertulia"],
            },
            {
              id: "b2m12l6e3", type: "audiomc", prompt: "Teil 3. ¿Dónde se encuentran Hofmann y Holm?",
              audio: HOEREN_T3,
              question: "Worin treffen sich Hofmann und Holm?",
              options: ["Bei der Pflicht", "Bei der Wahl, nicht beim Zwang", "Bei der Küche"],
              answer: 1,
              plays: 1,
              notepad: true,
              whyWrong: ["Holm dice que la Pflicht destruye el efecto", null, "Kai es la cocina"],
              itemIds: ["b2m12mehrmals"],
              tip: "Lena lo dice al cierre: una persona (y un acuerdo) puede servir para más de un ítem.",
            },
            {
              id: "b2m12l6e4", type: "audiomc", prompt: "Teil 4. DOS pasadas. El Vortrag de Holm.",
              audio: VORTRAG_HOLM,
              question: "Was ist Holms Vorschlag am Ende?",
              options: ["Pflicht für alle", "Wahl im Büro, Ausnahme im Betrieb", "Abschaffung des Homeoffice"],
              answer: 1,
              plays: 2,
              notepad: true,
              whyWrong: ["Lo rechaza", null, "No"],
              itemIds: ["b2m12hoervortrag"],
            },
            {
              id: "b2m12l6e5", type: "mc", prompt: "Qué no hará esta app por ti en el Teil 3",
              question: "En el Goethe, las voces de la tertulia…",
              options: ["Vendrán con el nombre delante, como aquí", "No dirán su nombre: tendrás que haberlo apuntado", "Serán siempre dos, nunca tres"],
              answer: 1,
              whyWrong: ["Eso es la muleta de la app, y hay que decirla", null, "El Modellsatz es una tertulia de varias"],
              itemIds: ["b2m12tertulia", "b2m12appbewertetnicht"],
            },
            {
              id: "b2m12l6e6", type: "type", prompt: "Cierre",
              question: "Asigne las afirmaciones: ¿quién dice qué?",
              answers: [
                "Ordnen Sie die Aussagen zu: Wer sagt was?",
                "Ordnen Sie die Aussagen zu: Wer sagt was",
              ],
              itemIds: ["b1m12gzwersagtwas"],
            },

            {
              id: "b2m12l6ex91", type: "cloze", prompt: "Completa.",
              text: "Das ist die Form, die im ___ steht.",
              answers: ["Schreiben", "Text", "Register"],
              translation: "Esa es la forma que va en el escrito.",
              itemIds: [],
            },
            {
              id: "b2m12l6ex92", type: "transform", prompt: "Cierre Vortrag",
              source: "Danke fürs Zuhören.",
              instruction: "Reescríbelo en registro de examen.",
              answers: ["Vielen Dank für Ihre Aufmerksamkeit. Ich beantworte gern Ihre Fragen."],
              translation: "cierre de examen",
              itemIds: [],
            },
            {
              id: "b2m12l6ex93", type: "cloze", prompt: "Completa.",
              text: "Das ist die Form, die im ___ steht.",
              answers: ["Schreiben", "Text", "Register"],
              translation: "Esa es la forma que va en el escrito.",
              itemIds: [],
            },
            {
              id: "b2m12l6ex94", type: "transform", prompt: "Concesión",
              source: "Ich bin nicht einverstanden, aber ich höre zu.",
              instruction: "Reescríbelo en registro de examen.",
              answers: ["Da muss ich Ihnen leider widersprechen."],
              translation: "discrepar en Sie",
              itemIds: [],
            },
            {
              id: "b2m12l6ex95", type: "cloze", prompt: "Completa.",
              text: "Das ist die Form, die im ___ steht.",
              answers: ["Schreiben", "Text", "Register"],
              translation: "Esa es la forma que va en el escrito.",
              itemIds: [],
            },
            {
              id: "b2m12l6ex96", type: "transform", prompt: "Pedir turno",
              source: "Kann ich mal?",
              instruction: "Reescríbelo en registro de examen.",
              answers: ["Darf ich dazu kurz das Wort ergreifen?"],
              translation: "das Wort ergreifen",
              itemIds: [],
            },
            {
              id: "b2m12l6ex97", type: "cloze", prompt: "Completa.",
              text: "Das ist die Form, die im ___ steht.",
              answers: ["Schreiben", "Text", "Register"],
              translation: "Esa es la forma que va en el escrito.",
              itemIds: [],
            },
            {
              id: "b2m12l6ex98", type: "transform", prompt: "Cierre Diskussion",
              source: "Gut, dann machen wir das so.",
              instruction: "Reescríbelo en registro de examen.",
              answers: ["Dann sind wir uns einig."],
              translation: "acuerdo",
              itemIds: [],
            },          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-b2m12-4",
            book: "Ich möchte etwas sagen.",
            real: "Darf ich mal?",
            meaning: "¿Puedo decir algo? / ¿Me dejas?",
            when: "Para pedir turno entre amigos. En el Sprechen Teil 2, la fórmula de examen: Darf ich dazu das Wort ergreifen? Sin eso, cortar al compañero resta Interaktion.",
            register: "amigos",
            exam: "Darf ich dazu das Wort ergreifen?",
            note: "mal es la partícula de «un momento». El examen nombra das Wort: es el mismo gesto, otro traje. El m11 ya lo tenía como vocabulario de reunión; aquí es la fila que puntúa.",
            sound: "darf ij da-TSUU das vort er-GRAI-fen",
            level: "b2",
            produce: true,
            itemId: "b2m12wortergreifenexam",
          },
        },
      ],
    },

    {
      id: "b2m12l7",
      phaseId: "b2m12",
      title: "Schreiben: 150 de foro, 100 al jefe",
      subtitle: "75 minutos, dos tareas, y Erfüllung E vale cero",
      minutes: 22,
      sections: [
        {
          kind: "phrases",
          title: "Los dos géneros, los dos relojes",
          itemIds: ["b2m12forumsbeitrag", "b2m12nachrichtvorgesetzter", "b2m12vorgesetzter", "b2m12fuenfundsiebzig", "b2m12erfuellunge", "b1m12gzanrede"],
        },
        {
          kind: "note",
          note: {
            title: "Ya no hay tres tareas: hay un argumento de verdad y un mensaje al jefe",
            body: "· <b>Aufgabe 1 — ~150 palabras · 50 min · 60 puntos.</b> Forumsbeitrag: introducción y cierre explícitos, argumentar, ventajas e inconvenientes, propuesta. Registro de foro (du hacia el hilo, no un correo).<br/>· <b>Aufgabe 2 — ~100 palabras · 25 min · 40 puntos.</b> Nachricht <b>an den Vorgesetzten</b>: Anrede y Gruß <b>obligatorios</b>, puntos de contenido ordenados, Sie sostenido.<br/>· Criterios: Erfüllung · Kohärenz · Wortschatz · Strukturen. <b>Si Erfüllung = E, la tarea vale 0</b>. E incluye «menos del 50 % de las palabras». 74 palabras en la tarea de 150 no se prorratean: se van a cero.",
            table: [
              ["A1 Forumsbeitrag", "~150 · 60 pts · 50 min"],
              ["A2 Nachricht", "~100 · 40 pts · 25 min · Sie"],
              ["Erfüllung E", "0 puntos en toda la tarea"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m12l7e1", type: "mc", prompt: "La regla de los 0 puntos",
              question: "Te piden 150 palabras, escribes 70 impecables. ¿Nota de esa tarea?",
              options: ["Unos 30 de 60", "0: Erfüllung E", "La mitad"],
              answer: 1,
              whyWrong: ["La calidad no rescata", null, "No se prorratea"],
              itemIds: ["b2m12erfuellunge", "b1m12gzthemaverfehlt"],
            },
            {
              id: "b2m12l7e2", type: "bucket", prompt: "¿Qué va en cada tarea?",
              categories: ["Forumsbeitrag (A1)", "Nachricht an den Vorgesetzten (A2)"],
              items: [
                { text: "Meine Damen und Herren — no: Lieber Forum / Hallo zusammen", bucket: 0 },
                { text: "Sehr geehrter Herr Ebert, … Mit freundlichen Grüßen", bucket: 1 },
                { text: "~150 Wörter, Vor- und Nachteile, Vorschlag", bucket: 0 },
                { text: "~100 Wörter, Inhaltspunkte in Reihenfolge", bucket: 1 },
                { text: "du zum Thread", bucket: 0 },
                { text: "Sie durchgehalten", bucket: 1 },
              ],
              itemIds: ["b2m12forumsbeitrag", "b2m12nachrichtvorgesetzter"],
            },
            {
              id: "b2m12l7e3", type: "write", prompt: "Aufgabe 2 — Nachricht al superior. ~100 palabras, Sie.",
              scenario: "Eres Sofía. Escribes a Herr Ebert, tu Vorgesetzter: pides dos días de Homeoffice a la semana, explicas el motivo (Nahverkehr / Konzentration), propones martes y jueves y ofreces un punto de control a los tres meses.",
              genre: "mail-formal",
              register: "Sie",
              frame: [
                "Anrede: Sehr geehrter Herr Ebert,",
                "Petición clara",
                "Motivo con rección o weil",
                "Propuesta de días",
                "Control / Angebot",
                "Grußformel",
              ],
              bullets: [
                "Anrede y Grußformel de Sie",
                "Pides dos días de Homeoffice",
                "Das un motivo (Bahn, Konzentration, Schicht)",
                "Propones días concretos o un control",
              ],
              checks: [
                { re: "Sehr geehrte[sr].*Mit freundlichen Grüßen", label: "Anrede y Gruß" },
                { re: "(Homeoffice|zu Hause|zwei Tage)", label: "petición" },
                { re: "(weil|deshalb|Bahn|Konzentration|Nahverkehr)", label: "motivo" },
                { re: "(Dienstag|Donnerstag|Mittwoch|Monat|Probe)", label: "días o control" },
              ],
              minWords: 90,
              maxWords: 120,
              requireConnectors: { min: 2, bank: ["weil", "deshalb", "außerdem", "aber"] },
              rubric: ["erfuellung", "kohaerenz", "wortschatz", "strukturen"],
              model: "Sehr geehrter Herr Ebert, hiermit bitte ich Sie um zwei feste Homeoffice-Tage pro Woche, dienstags und donnerstags. Der Grund dafür ist die Bahn am Morgen: ich verliere täglich fast eine Stunde, und das wirkt sich auf die Konzentration aus. Außerdem könnte ich in Ruhe am Code arbeiten, weil zu Hause weniger unterbrochen wird. Wäre es möglich, das Modell drei Monate lang zu erproben und dann gemeinsam zu bewerten? Ich würde die Erreichbarkeit in dieser Zeit selbstverständlich halten und die Termine mit dem Team klar abstimmen. Mit freundlichen Grüßen\nSofía Marín",
              itemIds: ["b2m12nachrichtvorgesetzter", "b2m12vorgesetzter", "b1m12gzanrede"],
            },
            {
              id: "b2m12l7e4", type: "write", prompt: "Aufgabe 1 — Forumsbeitrag. ~150 palabras. Argumenta, no narres.",
              scenario: "Foro de una radio: «Zwei Tage Homeoffice als Pflicht — ja oder nein?» Reacciona al comentario publicado, da ventajas e inconvenientes, una propuesta y un cierre.",
              genre: "forum",
              register: "du",
              stimulus: {
                author: "Markus, Hörer",
                text: "Pflicht muss sein, sonst ändert sich nichts. Wer nicht zu Hause arbeiten will, sucht nur Ausreden.",
              },
              frame: [
                "Reacción a Markus",
                "Tesis: Wahl, nicht Pflicht",
                "Ventaja (Bahn, Konzentration)",
                "Inconveniente (Küche, Pflege, Wohnheim)",
                "Propuesta y cierre",
              ],
              bullets: [
                "Reacciona al comentario",
                "Da tu postura con fórmula de opinión",
                "Nombra una ventaja y una pega",
                "Cierra con una propuesta (Wahl, Ausnahme, Jobticket…)",
              ],
              checks: [
                { re: "(Markus|Beitrag|gelesen|Forum)", label: "reacción" },
                { re: "(Meiner Meinung nach|Ich bin der Meinung|überzeugt|dafür|dagegen)", label: "postura" },
                { re: "(Vorteil|Nachteil|einerseits|andererseits|allerdings|aber)", label: "ventaja o pega" },
                { re: "(Wahl|Ausnahme|Jobticket|Vorschlag|deshalb)", label: "propuesta" },
              ],
              minWords: 135,
              maxWords: 175,
              requireConnectors: { min: 3, bank: ["weil", "allerdings", "aber", "deshalb", "außerdem", "trotzdem"] },
              rubric: ["erfuellung", "kohaerenz", "wortschatz", "strukturen"],
              model: "Markus, ich habe deinen Beitrag gelesen und sehe das anders. Meiner Meinung nach entlasten zwei Homeoffice-Tage die Bahn, das ist ein echter Vorteil für alle, die einen Schreibtisch haben. Allerdings ist Pflicht das falsche Wort, weil Küche, Pflege und manches Wohnheim kein Schreibtisch sind. Ausreden sind das nicht, das sind Berufe, und die gehören ins Protokoll. Außerdem würde eine Pflicht das Team spalten, statt es zu entlasten. Deshalb bin ich für die Wahl und für Ausnahmen, die in der Grafik vorkommen. Trotzdem danke fürs Klartextreden — nur bitte ohne Verdacht gegen die, die kommen müssen, denn ohne sie läuft der Betrieb nicht. Wer Pflicht sagt, sollte zuerst die Küche und die Pflege in denselben Satz nehmen; sonst ist das keine Regel für den ganzen Betrieb, sondern nur ein Büro, das sich selbst zum Maß macht.",
              itemIds: ["b2m12forumsbeitrag", "b1m12gzbeitrag", "b1m12gzdermeinung"],
            },
            {
              id: "b2m12l7exd1", type: "errorfix", prompt: "Los minutos del Lesen B2 2019.",
              wrong: "Lesen dauert 75 Minuten.",
              answers: ["Lesen dauert 65 Minuten."],
              why: "El Goethe B2 Lesen son 65 minutos, no los 75 del B1.",
              translation: "Lesen dura 65 minutos.",
              itemIds: []
            },
            {
              id: "b2m12l7exd2", type: "transform", prompt: "Sin compensación.",
              source: "Die Module gleichen sich aus.",
              instruction: "Di la regla de 2019.",
              answers: ["Es gibt keine Kompensation zwischen den Modulen."],
              translation: "No hay compensación entre módulos.",
              itemIds: []
            },
            {
              id: "b2m12l7exd3", type: "cloze", prompt: "El corte.",
              text: "Der Schnitt zum Bestehen ist ___ Prozent.",
              answers: ["60", "sechzig"],
              translation: "El corte para aprobar es el 60 por ciento.",
              itemIds: []
            },
            {
              id: "b2m12l7exd4", type: "errorfix", prompt: "Hören T1: una escucha.",
              wrong: "Im Hören Teil 1 hört man zweimal.",
              answers: ["Im Hören Teil 1 hört man einmal."],
              why: "En B2, T1 y T3 se oyen una vez. El dos veces es del B1.",
              translation: "En Hören T1 se oye una vez.",
              itemIds: []
            },
            {
              id: "b2m12l7exd5", type: "transform", prompt: "El oral no lo sustituye la app.",
              source: "Die App bewertet, was Sie sagen.",
              instruction: "La regla de esta casa.",
              answers: ["Die App bewertet nicht, was Sie sagen."],
              translation: "La app no puntúa lo que usted dice.",
              itemIds: []
            },
            {
              id: "b2m12l7exd6", type: "cloze", prompt: "Sin diccionario.",
              text: "Im Goethe B2 schreibt man ___ Wörterbuch.",
              answers: ["ohne"],
              translation: "En el Goethe B2 se escribe sin diccionario.",
              itemIds: []
            },
            {
              id: "b2m12l7exd7", type: "transform", prompt: "18 de 30.",
              source: "Man braucht die Hälfte der Punkte.",
              instruction: "El corte de Lesen y Hören.",
              answers: ["Man braucht 18 von 30."],
              translation: "Hace falta 18 de 30.",
              itemIds: []
            },
            {
              id: "b2m12l7exd8", type: "errorfix", prompt: "Schreiben: dos textos, no uno.",
              wrong: "Im Schreiben schreibt man nur den Forumsbeitrag.",
              answers: ["Im Schreiben schreibt man Forumsbeitrag und Nachricht."],
              why: "75 minutos, dos tareas: ~150 y ~100. Una sola es Erfüllung E.",
              translation: "En el Schreiben se escriben foro y Nachricht.",
              itemIds: []
            },
            {
              id: "b2m12l7e5", type: "errorfix", prompt: "Fuga de Sie en la Nachricht",
              wrong: "Sehr geehrter Herr Ebert, kannst du zwei Tage prüfen?",
              answers: ["Sehr geehrter Herr Ebert, können Sie zwei Tage prüfen?", "Sehr geehrter Herr Ebert, können Sie zwei Tage prüfen"],
              why: "Anrede de Sie, verbo de du: el fallo que se ve en la primera línea. El T2 entero va de Sie.",
              itemIds: ["b2m12vorgesetzter", "b1m12gzanrede"],
            },
            {
              id: "b2m12l7e6", type: "type", prompt: "Cierre",
              question: "Si Erfüllung cae a E, la tarea vale cero puntos",
              answers: [
                "Erfüllung E bedeutet 0 Punkte",
                "Erfüllung E bedeutet 0 Punkte.",
              ],
              itemIds: ["b2m12erfuellunge"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-b2m12-1",
            book: "Ich möchte über X sprechen.",
            real: "Also, ich red mal über X.",
            meaning: "Voy a hablar de X.",
            when: "La calle abre con also y un verbo recortado. El Vortrag del Goethe abre de usted, con el público nombrado. Si entras con «also ich red mal», la banda de registro se cae antes del primer argumento.",
            register: "amigos",
            exam: "Meine Damen und Herren, ich möchte Ihnen heute das Thema X näherbringen.",
            note: "näherbringen es el verbo de ponencia. sprechen über vale; esta fórmula puntúa más porque suena a seminario, que es el marco del Teil 1.",
            sound: "MAI-ne DAA-men unt HE-ren, ij MÖJ-te II-nen HOI-te … NÉE-a-brin-guen",
            level: "b2",
            produce: true,
            itemId: "b2m12meinedamen",
          },
        },
      ],
    },

    {
      id: "b2m12l8",
      phaseId: "b2m12",
      title: "Sprechen Teil 1: el Vortrag sin diapositivas",
      subtitle: "4 minutos, estructura propia, y luego preguntas que valen 12 puntos",
      minutes: 20,
      sections: [
        {
          kind: "phrases",
          title: "Abrir, sostener, ofrecer preguntas",
          itemIds: ["b2m12vortraghalten", "b2m12struktur", "b2m12meinedamen", "b2m12stehefragen", "b2m12fragenantworten", "b2m12einfuehrung"],
        },
        {
          kind: "note",
          note: {
            title: "Se cayó el andamio del B1 — y la app no puntúa lo que dices",
            body: "El Teil 1 del B1 eran cinco diapositivas fijas. El del B2 es un <b>Vortrag de ~4 minutos</b> sobre uno de dos temas, con <b>estructura propia</b> (entrada, cuerpo, cierre). Después preguntan el otro candidato y un examinador: esas preguntas valen <b>12 de los 44 puntos</b> del Teil. El <i>Einführungsgespräch</i> inicial (~1 min) <b>no puntúa</b>.<br/><br/>Tienes 15 minutos de preparación a solas, con papel sellado; las notas esquemáticas se pueden usar. <b>Esta app entrena y cronometra la partitura; no puntúa lo que dices.</b> Y el oral real se hace <b>en pareja</b>: sin compañero de conversación no estás examinándote, estás ensayando.",
            table: [
              ["Vortrag", "~4 min · 44 pts (8+8+8+8+12 preguntas)"],
              ["Vorbereitung", "15 min a solas"],
              ["Einführungsgespräch", "~1 min, no puntúa"],
              ["Aussprache", "16 pts, transversal"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m12l8e1", type: "mc", prompt: "Qué ha desaparecido",
              question: "En el Vortrag B2, ¿qué ya no está?",
              options: ["La obligación de argumentar", "Las cinco diapositivas fijas de siempre", "Los 15 minutos de preparación"],
              answer: 1,
              whyWrong: ["Argumentar sigue siendo el núcleo", null, "Los 15 minutos se mantienen"],
              itemIds: ["b2m12struktur", "b2m12vortraghalten"],
            },
            {
              id: "b2m12l8e2", type: "mc", prompt: "Cuánto valen las preguntas",
              question: "Tras tu Vortrag preguntan. ¿Cuánto pesa esa ronda dentro del Teil 1?",
              options: ["Nada: solo era cortesía", "12 de 44 puntos", "Los 44 enteros"],
              answer: 1,
              whyWrong: ["No es cortesía: está en la hoja de evaluación", null, "El Vortrag mismo también puntúa"],
              itemIds: ["b2m12fragenantworten"],
            },
            {
              id: "b2m12l8e3", type: "match", prompt: "Fórmula y momento",
              pairs: [
                { target: "Meine Damen und Herren, ich möchte Ihnen heute … näherbringen.", source: "apertura" },
                { target: "Zuerst die Daten, dann die Grenze, zuletzt ein Vorschlag.", source: "estructura" },
                { target: "Ich stehe Ihnen für Fragen zur Verfügung.", source: "cierre / ronda" },
                { target: "Vielen Dank für Ihre Aufmerksamkeit.", source: "agradecimiento de Sie" },
              ],
              itemIds: ["b2m12meinedamen", "b2m12stehefragen", "b2m12aufmerksamkeitihre"],
            },
            {
              id: "b2m12l8e4", type: "monologue", prompt: "Vortrag de 4 minutos. Planifica, habla, repite. La app no puntúa la voz.",
              topic: "Zwei Tage Homeoffice: Wahl oder Pflicht?",
              slides: [
                { title: "Einstieg", hint: "Meine Damen und Herren … näherbringen. Eigene Struktur ansagen." },
                { title: "Daten / Vorteil", hint: "Nahverkehr, Konzentration. Laut … / im Vergleich zu …" },
                { title: "Grenze", hint: "Küche, Pflege, Wohnheim. Worauf stützt sich das nicht?" },
                { title: "Vorschlag", hint: "Wahl im Büro, Ausnahme im Betrieb." },
                { title: "Schluss", hint: "Zusammenfassend … Ich stehe Ihnen für Fragen zur Verfügung." },
              ],
              planSeconds: 180,
              speakSeconds: 240,
              reps: 2,
              checklist: [
                "Abrí de Sie, con tema y estructura propia (no las 5 diapositivas del B1)",
                "Di una ventaja con dato o ejemplo",
                "Di una frontera (quién no puede) y una propuesta",
                "Cerré ofreciendo preguntas con la fórmula de examen",
                "Hablé cerca de 4 minutos en las dos pasadas — sabiendo que la app no puntúa la voz",
              ],
              model: "Einstieg (modelo): „Meine Damen und Herren, ich möchte Ihnen heute das Thema Wahlfreiheit im Homeoffice näherbringen. Zuerst der Vorteil, dann die Grenze, zuletzt ein Vorschlag. Zwei Tage entlasten die Bahn. Pflicht spaltet, weil Küche und Pflege kein Schreibtisch sind. Wahl im Büro, Ausnahme im Betrieb. Ich stehe Ihnen nun für Fragen zur Verfügung.“",
              itemIds: ["b2m12meinedamen", "b2m12stehefragen", "b2m12vortraghalten", "b2m12appbewertetnicht"],
            },
            {
              id: "b2m12l8e5", type: "errorfix", prompt: "El cierre de Sie, no el de du",
              wrong: "Vielen Dank für eure Aufmerksamkeit.",
              answers: ["Vielen Dank für Ihre Aufmerksamkeit.", "Vielen Dank für Ihre Aufmerksamkeit"],
              why: "En B1 el público era eure: compañeros de curso. En el Vortrag B2 el marco es un seminario: Ihre. Un eure al cierre tira el registro de 4 minutos de trabajo.",
              itemIds: ["b2m12aufmerksamkeitihre"],
            },
            {
              id: "b2m12l8e6", type: "type", prompt: "Cierre",
              question: "Quedo a su disposición para preguntas",
              answers: [
                "Ich stehe Ihnen für Fragen zur Verfügung",
                "Ich stehe Ihnen für Fragen zur Verfügung.",
              ],
              itemIds: ["b2m12stehefragen"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-b2m12-2",
            book: "Das war alles.",
            real: "Ja, das wär's dann.",
            meaning: "Eso es todo / ya estaría.",
            when: "Para bajar el telón entre amigos. En el Vortrag, jamás: el cierre tiene que ofrecer la ronda de preguntas, que vale 12 puntos. Cortar con «das wär's» es dejar 12 puntos en la mesa.",
            register: "amigos",
            exam: "Vielen Dank für Ihre Aufmerksamkeit. Ich stehe Ihnen nun für Fragen zur Verfügung.",
            note: "Dos frases, no una. El agradecimiento solo no abre la ronda. Verfügung es el traje; wär's es la barra.",
            sound: "FII-len dank füa II-re AUF-merk-zaam-kait. ij SHTEE-e II-nen nun füa FRAA-guen tsur fea-FÜ-gung",
            level: "b2",
            produce: true,
            itemId: "b2m12stehefragen",
          },
        },
      ],
    },

    {
      id: "b2m12l9",
      phaseId: "b2m12",
      title: "Sprechen Teil 2: discrepar, no pactar",
      subtitle: "Discusión de ~5 minutos, 40 puntos — y esto no se hace solo",
      minutes: 18,
      sections: [
        {
          kind: "phrases",
          title: "Pedir turno, discrepar, cerrar",
          itemIds: ["b2m12diskussionfuehren", "b2m5demkannichmichnichtanschliessen", "b2m12wortergreifenexam", "b2m12einig", "b2m12partner", "b2m12aussprache"],
        },
        {
          kind: "note",
          note: {
            title: "En B1 pactabas un plan. En B2 defiendes una postura",
            body: "Teil 2: una <b>pregunta polémica</b>, ~5 minutos los dos, 40 puntos (Erfüllung 10 · Interaktion 10 · Wortschatz 10 · Strukturen 10). Ya no se trata de quedar a las ocho. Se trata de <b>discrepar sin agredir</b> y de <b>llegar a algo</b> sin rendirte.<br/><br/>Fórmulas que puntúan y que en la calle nadie dice así de tiesas:<br/>· <i>Darf ich dazu das Wort ergreifen?</i> — pedir turno.<br/>· <i>Dem kann ich mich nicht anschließen. / nur bedingt anschließen.</i> — discrepar.<br/>· <i>Dann wären wir uns einig, dass…</i> — cerrar un acuerdo parcial.<br/><br/><b>La app no sustituye a la pareja.</b> Entrena las frases, cronometra, no puntúa la voz. Si te presentas sin haber discutido nunca con otra persona en alemán, el Teil 2 del Goethe no se parece a nada de lo que has hecho aquí. Hay que decirlo con todas las letras.<br/><br/><i>Lee en voz alta el recado de Valencia.</i><br/><br/>Lucía Ortega escribe desde Valencia, en español, a las once de la noche: <i>Cuéntame cómo fue el oral. ¿La compañera te preguntó de verdad o solo asintió?</i> No pregunta la nota. Pregunta si hubo pareja. Sofía le resume en alemán sencillo, el que se entiende con el portátil en la falda: sie habe vier Minuten über Homeoffice gesprochen, Wahl nicht Pflicht; die Partnerin habe nach der Küche gefragt; sie habe eingeräumt, dass Bergmann recht habe, und geschlossen: Dann wären wir uns einig, dass die Küche raus muss.<br/><br/>Lucía no dice «enhorabuena». Responde como compañera de examen: «Und worauf stützt sich das mit der Produktivität? Hat Holm die Küche überhaupt gemessen?» Eso es el tercer gesto del oral — lo que algunas academias llaman el T3, y el Goethe cobra dentro del Teil 1: <b>12 de 44</b>. La app no puntúa esa pregunta. El Goethe, sí.",
            table: [
              ["Diskussion", "~5 min los dos · 40 pts"],
              ["Aussprache", "16 pts, los dos Teile"],
              ["Pareja", "obligatoria (trío solo por excepción)"],
              ["Esta app", "entrena; no examina el oral"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m12l9e1", type: "match", prompt: "Fórmula de examen y acto",
              pairs: [
                { target: "Darf ich dazu das Wort ergreifen?", source: "pedir la palabra" },
                { target: "Dem kann ich mich nicht anschließen.", source: "discrepar cortésmente" },
                { target: "Dem kann ich mich nur bedingt anschließen.", source: "conceder en parte" },
                { target: "Dann wären wir uns einig, dass …", source: "cerrar un acuerdo" },
              ],
              itemIds: ["b2m12wortergreifenexam", "b2m5demkannichmichnichtanschliessen", "b2m12einig"],
            },
            {
              id: "b2m12l9exlu1", type: "mc", prompt: "Inferencia: lo que Lucía no pregunta",
              question: "Lucía escribe desde Valencia. ¿Qué no pregunta, y por qué importa?",
              options: [
                "Si Sofía ha aprobado: no pide la nota, pide si la compañera preguntó de verdad",
                "Si Holm estaba en la sala: el relato no nombra examinadores",
                "Si el Vortrag duró cuatro minutos: eso ya lo resume Sofía",
              ],
              answer: 0,
              whyWrong: [
                null,
                "Holm es el dato del Vortrag, no una persona en el aula; Lucía no lo busca",
                "Los cuatro minutos son el resumen de Sofía, no la pregunta de Lucía",
              ],
              itemIds: ["b2m12partner", "b2m12fragenantworten"],
              tip: "La amiga oficinista no hace de palmadita: hace de pareja. Eso es lo que el oral no te da si ensayas solo.",
            },
            {
              id: "b2m12l9exlu2", type: "mc", prompt: "Inferencia: la pregunta de compañera",
              question: "«Worauf stützt sich das mit der Produktivität?» ¿Qué ensaya Lucía con esa pregunta?",
              options: [
                "El Einführungsgespräch, que no puntúa",
                "La ronda de la compañera tras el Vortrag, la que vale 12 de 44 en el Teil 1",
                "El Teil 2 entero: cinco minutos de discusión",
              ],
              answer: 1,
              whyWrong: [
                "La charla inicial no puntúa y no pide datos",
                null,
                "La Diskussion es otra tarea; Lucía pregunta por un dato del Vortrag, no abre un debate",
              ],
              itemIds: ["b2m12fragenantworten", "b2m12appbewertetnicht", "b2m12vortraghalten"],
            },
            {
              id: "b2m12l9e2", type: "mc", prompt: "Lo que esta app no puede darte",
              question: "Has hecho todos los monólogos del curso con buena nota. ¿Estás listo para el Sprechen B2?",
              options: [
                "Sí: la app puntúa lo que digo",
                "No del todo: el Teil 2 se hace con otra persona, y la app no puntúa la voz ni sustituye a la pareja",
                "Sí, porque el Einführungsgespräch ya vale 44 puntos",
              ],
              answer: 1,
              whyWrong: ["La app no puntúa el habla", null, "El Einführungsgespräch no puntúa"],
              itemIds: ["b2m12partner", "b2m12appbewertetnicht"],
              tip: "Busca un compañero de conversación. Sin eso, el 40 % del oral (la Diskussion) es territorio desconocido el día del examen.",
            },
            {
              id: "b2m12l9e3", type: "errorfix", prompt: "Discrepar sin agredir",
              wrong: "Dem kann ich mich nicht anschließen. Quatsch.",
              answers: ["Dem kann ich mich nicht anschließen.", "Dem kann ich mich nicht anschließen"],
              why: "Quatsch tumba al interlocutor. anschließen se tumba a la tesis, no a la persona. En el Teil 2, Interaktion son 10 de 40: el tono es contenido.",
              translation: "A eso no me puedo sumar.",
              itemIds: ["b2m5demkannichmichnichtanschliessen"],
            },
            {
              id: "b2m12l9e4", type: "gapbank", prompt: "Una discusión en tres movimientos",
              text: "___ ich dazu das Wort ergreifen? Dem kann ich mich nicht ___. Dann wären wir uns ___, dass die Küche raus muss.",
              answers: ["Darf", "anschließen", "einig"],
              bank: ["Darf", "anschließen", "einig", "Muss", "Quatsch", "Jänner"],
              itemIds: ["b2m12wortergreifenexam", "b2m5demkannichmichnichtanschliessen", "b2m12einig"],
            },
            {
              id: "b2m12l9e5", type: "paraphrase", prompt: "Cierra sin «abgemacht»",
              source: "Abgemacht, dann machen wir das so.",
              forbid: ["Abgemacht", "machen"],
              answers: [
                "Dann wären wir uns einig, dass wir so verfahren.",
                "Dann wären wir uns einig, dass wir es so halten.",
              ],
              itemIds: ["b2m12einig", "b1m12gzabgemacht"],
              tip: "Abgemacht cerraba el Teil 1 del B1. En B2 el acuerdo es de tesis, no de hora: wären wir uns einig, dass…",
            },
            {
              id: "b2m12l9e6", type: "monologue", prompt: "Ensayo de postura (no sustituye a la Diskussion en pareja).",
              topic: "Homeoffice-Pflicht: ich bin dagegen — und suche trotzdem einen Kompromiss",
              slides: [
                { title: "These", hint: "Ich spreche mich gegen eine Pflicht aus, nicht gegen zwei Tage." },
                { title: "Grund", hint: "Küche, Pflege, Wohnheim. Pflicht spaltet." },
                { title: "Zugeständnis", hint: "Dem kann ich mich nur bedingt anschließen, wenn … Wahl im Büro ja." },
                { title: "Einigung", hint: "Dann wären wir uns einig, dass … Ausnahme + Wahl." },
              ],
              planSeconds: 90,
              speakSeconds: 120,
              reps: 2,
              checklist: [
                "Di una tesis (contra la Pflicht, no contra los dos días)",
                "Di un motivo concreto (un oficio sin escritorio)",
                "Usé una fórmula de discrepancia cortés (nicht / nur bedingt anschließen)",
                "Cerré con un acuerdo parcial (wären wir uns einig)",
              ],
              model: "These (modelo): „Ich spreche mich gegen eine Pflicht aus. Dem Argument mit der Bahn kann ich mich nur bedingt anschließen: es gilt für Büros. In der Küche spaltet Pflicht. Dann wären wir uns einig, dass Wahl im Büro gilt und die Ausnahme im Protokoll steht.“",
              itemIds: ["b2m12diskussionfuehren", "b2m5demkannichmichnichtanschliessen", "b2m12einig", "b2m12partner"],
            },
            {
              id: "b2m12l9e7", type: "mc", prompt: "ÖSD, para que no te exploren el día equivocado",
              question: "En B1, Goethe y ÖSD eran el mismo examen. En B2…",
              options: ["Siguen siendo el mismo", "Son dos exámenes distintos; este curso apunta al Goethe 2019", "Solo existe el telc"],
              answer: 1,
              whyWrong: ["Eso se acabó en B2", null, "telc es otro candidato, no el norte"],
              itemIds: ["b2m12oesd", "b2m12format2019"],
            },
            {
              id: "b2m12l9e8", type: "type", prompt: "Última frase del nivel",
              question: "La app no puntúa lo que usted dice; el oral necesita una pareja",
              answers: [
                "Die App bewertet nicht, was Sie sagen. Das Sprechen braucht eine Partnerin oder einen Partner",
                "Die App bewertet nicht, was Sie sagen. Das Sprechen braucht eine Partnerin oder einen Partner.",
              ],
              itemIds: ["b2m12appbewertetnicht", "b2m12partner"],
              tip: "Con esto se cierra el B2 alemán de Seshat: sabes el formato, has entrenado cada Teil, y sabes qué no te ha dado la máquina. El resto se hace hablando con alguien.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-b2m12-3",
            book: "Ich bin nicht einverstanden.",
            real: "Nee, seh ich nicht so.",
            meaning: "No, yo no lo veo así.",
            when: "Entre iguales, para cortar sin discurso. Delante de los examinadores, anschließen: te despegas de la tesis y dejas al interlocutor en pie. Interaktion se puntúa aparte.",
            register: "amigos",
            exam: "Dem kann ich mich nicht anschließen.",
            note: "El B1 tenía «Das sehe ich anders». El B2 sube un traje: anschließen es el verbo de las actas. Nee seh ich nicht so es el de la cocina de Nico.",
            sound: "deem kan ij mij nijt AN-shlee-sen",
            level: "b2",
            produce: true,
            itemId: "b2m5demkannichmichnichtanschliessen",
          },
        },
      ],
    },
  ],
};
