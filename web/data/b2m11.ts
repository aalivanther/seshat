import type { Phase, VocabItem } from "@/lib/types";

const DEBATTE_PROTOKOLL =
  "Lena Krüger: Guten Abend. Tagesordnung Punkt zwei: Nachtbus versus Parkplätze in der Winsstraße. Ich bitte um kurze Beiträge, dann fasse ich zusammen. Clara Hofmann hat das Wort. | Clara Hofmann: Laut unserem Artikel braucht die Schicht den Bus. Im Wesentlichen geht es darum, dass der Takt nach Mitternacht fehlt. Details zur Farbe der Haltestelle lasse ich weg. | Lena Krüger: Herr Vogel, Sie haben die Gegenposition. | Herr Vogel: Demgegenüber sage ich: Ohne Parkplätze stirbt der Laden unten. Im Gegensatz zu Frau Hofmann sehe ich nicht den Bus, ich sehe die Kunden. | Lena Krüger: Beide Texte stimmen darin überein, dass nachts etwas fehlt. Die Diskrepanz liegt in der Ursache. Sofía, Sie schreiben das Protokoll — ohne Wertung, bitte. | Sofía Marín: Zusammenfassend lässt sich sagen, dass die eine Seite den Bus fordert und die andere die Parkplätze. Mit anderen Worten: es fehlt ein Kompromiss, nicht ein Feind. | Lena Krüger: Das ist auf den Punkt gebracht. Wer den Faden verloren hat: wir stimmen uns nächste Woche ab. Kai Bergmann, möchten Sie das Wort ergreifen? | Kai Bergmann: Nur eine Rückmeldung. Das Protokoll sollte hinzufügen, dass der Betriebsrat den Bus unterstützt, die Anwohner aber nicht überstimmt werden dürfen. | Lena Krüger: Notiert. Ich fasse den wesentlichen Inhalt kurz zusammen: Nachtnetz ja, Parkraum nicht ersatzlos streichen. Dem Artikel zufolge ist der Bus machbar; laut Herr Vogel ist er das nur, wenn die Kunden bleiben. | Clara Hofmann: Anders gesagt, wir brauchen beides. | Herr Vogel: Also quasi. Aber schreiben Sie das nicht als meine Meinung, sondern als den Stand der Besprechung. | Lena Krüger: Gut. Wer den Faden verloren hat: zwei Lücken, eine Straße. Die Nachtschicht und der Halt vor der Tür. Wir stimmen uns nächste Woche ab, und das Protokoll geht an das Bezirksamt, ohne Wertung und ohne Feindbild. | Sofía Marín: Verstanden. Ich gebe es wieder, ich drehe es nicht um. | Lena Krüger: Danke. Damit ist Punkt zwei für heute geschlossen.";

// B2 · MÓDULO 11 — In eigenen Worten. Resumir, sintetizar dos fuentes que
// se contradicen y transmitir a un tercero. Gramática ancla: la operación
// del resumen (presente + K I + nominalización, sin detalles y sin opinión
// propia), verbos de reformulación, contraste de fuentes (im Gegensatz zu,
// wohingegen, demgegenüber) y citar frente a parafrasear (laut, zufolge,
// nach Angaben von). Clínica L5: resumir no es acortar — paraphrase con
// forbid. Recicla rección del m9 y registro del m10.
// Lena Krüger modera; Sofía escribe el protocolo. Prefijo b2m11.
//
// El Goethe-Zertifikat B2 de 2019 NO tiene un Teil de Sprachmittlung: no
// hay un papel de «pásalo al español». El módulo enseña resumir y contrastar
// fuentes porque eso es lo que el Lesen (postura, foro) y el Schreiben
// (reaccionar a un texto ajeno, informar a quien no estaba) sí piden. No se
// borra el módulo: se cobra la operación, no un nombre de tarea que el
// formato vigente no usa.

export const vocabB2m11: Record<string, VocabItem> = {
  // ── L1 · la operación del resumen ──
  b2m11zusammenfassend: { id: "b2m11zusammenfassend", target: "zusammenfassend", source: "en resumen / resumiendo", sound: "tsu-ZA-men-fa-sent", gram: { konn: "adv" } },
  b2m11mitanderenworten: { id: "b2m11mitanderenworten", target: "mit anderen Worten", source: "dicho de otro modo", sound: "mit AN-de-ren VOA-ten", gram: { konn: "adv" } },
  b2m11dasheisst: { id: "b2m11dasheisst", target: "das heißt", source: "es decir / o sea", sound: "das heest", gram: { konn: "koord" } },
  b2m11kurzgesagt: { id: "b2m11kurzgesagt", target: "kurz gesagt", source: "en pocas palabras", sound: "kurts gue-ZAAKT" },
  b2m11imwesentlichen: { id: "b2m11imwesentlichen", target: "im Wesentlichen", source: "en lo esencial", sound: "im vee-ZENT-li-jen" },
  b2m11fazit: { id: "b2m11fazit", target: "das Fazit", source: "la conclusión / el balance", article: "das", plural: "Fazits", sound: "FAA-tsit" },
  b2m11natendeffekt: { id: "b2m11natendeffekt", target: "Also im Endeffekt …", source: "Así que, al final… (calle)", sound: "AL-zo im ENT-ef-ekt" },

  // ── L2 · citar frente a parafrasear ──
  b2m11zufolge: { id: "b2m11zufolge", target: "dem Artikel zufolge", source: "según el artículo (el artículo manda, dativo delante)", sound: "deem ar-TEE-kel tsu-FOA-gue" },
  b2m11soautorin: { id: "b2m11soautorin", target: "so die Autorin", source: "según la autora (cita compacta de prensa)", sound: "zoo di au-TOO-rin" },
  b2m11umschreiben: { id: "b2m11umschreiben", target: "umschreiben", source: "parafrasear / decirlo con otras palabras", sound: "UM-shrai-ben" },
  b2m11kernaussage: { id: "b2m11kernaussage", target: "die Kernaussage", source: "la idea central / lo que el texto sostiene de verdad", article: "die", plural: "Kernaussagen", sound: "KERN-aus-zaa-gue" },
  b2m11ohnewertung: { id: "b2m11ohnewertung", target: "ohne Wertung", source: "sin valorar / sin meter la opinión", sound: "OO-ne VERT-ung" },
  b2m11natzufolge: { id: "b2m11natzufolge", target: "Dem Artikel zufolge …", source: "Según el artículo…", sound: "deem ar-TEE-kel tsu-FOA-gue" },

  // ── L3 · dos fuentes ──
  b2m11imgegensatzzu: { id: "b2m11imgegensatzzu", target: "im Gegensatz zu", source: "al contrario de / a diferencia de", sound: "im GEE-guen-zats tsu", gram: { konn: "adv" } },
  b2m11demgegenueber: { id: "b2m11demgegenueber", target: "demgegenüber", source: "frente a eso / en cambio", sound: "deem-gee-guen-Ü-ba", gram: { konn: "adv" } },
  b2m11stimmenueberein: { id: "b2m11stimmenueberein", target: "beide Texte stimmen darin überein, dass …", source: "ambos textos coinciden en que…", sound: "BAI-de TEK-ste shti-men da-RIN ü-ba-AIN, das" },
  b2m11gegenposition: { id: "b2m11gegenposition", target: "die Gegenposition", source: "la postura contraria", article: "die", sound: "GEE-guen-po-zi-tisión" },
  b2m11ausgangstext: { id: "b2m11ausgangstext", target: "der Ausgangstext", source: "el texto de partida", article: "der", plural: "Ausgangstexte", sound: "AUS-gangs-tekst" },
  b2m11diskrepanz: { id: "b2m11diskrepanz", target: "die Diskrepanz", source: "la discrepancia / el desajuste entre dos relatos", article: "die", plural: "Diskrepanzen", sound: "dis-kre-PANTS" },
  b2m11natalsoquasi: { id: "b2m11natalsoquasi", target: "Also quasi …", source: "O sea, como… (muleta de reformulación)", sound: "AL-zo KVAA-zi" },

  // ── L4 · reunión y protocolo ──
  b2m11besprechung: { id: "b2m11besprechung", target: "die Besprechung", source: "la reunión de trabajo", article: "die", plural: "Besprechungen", sound: "be-SHPRE-jung" },
  b2m11tagesordnung: { id: "b2m11tagesordnung", target: "die Tagesordnung", source: "el orden del día", article: "die", sound: "TAA-ges-ort-nung" },
  b2m11moderieren: { id: "b2m11moderieren", target: "moderieren", source: "moderar (un debate, una mesa)", sound: "mo-de-RII-ren" },
  b2m11sichabstimmen: { id: "b2m11sichabstimmen", target: "sich abstimmen", source: "ponerse de acuerdo / coordinarse / votar", sound: "zij AP-shti-men" },
  b2m11aufdenpunkt: { id: "b2m11aufdenpunkt", target: "auf den Punkt bringen", source: "ir al grano / dejarlo en una frase", sound: "auf deen punkt BRIN-guen" },
  b2m11fadenverlieren: { id: "b2m11fadenverlieren", target: "den Faden verlieren", source: "perder el hilo", sound: "deen FAA-den fea-LII-ren" },
  b2m11wortergreifen: { id: "b2m11wortergreifen", target: "das Wort ergreifen", source: "tomar la palabra", sound: "das vort er-GRAI-fen" },
  b2m11hinzufuegen: { id: "b2m11hinzufuegen", target: "hinzufügen", source: "añadir (un punto al acta)", sound: "HIN-tsu-fü-guen" },
  b2m11rueckmeldung: { id: "b2m11rueckmeldung", target: "die Rückmeldung", source: "la devolución / el comentario de vuelta", article: "die", plural: "Rückmeldungen", sound: "RÜK-mel-dung" },
  b2m11natfasse: { id: "b2m11natfasse", target: "Ich fasse den wesentlichen Inhalt kurz zusammen", source: "Resumo en breve el contenido esencial", sound: "ij FA-se deen vee-ZENT-li-jen IN-halt kurts tsu-ZA-men" },

  // ── L5 · clínica ──
  b2m11reformulierung: { id: "b2m11reformulierung", target: "die Reformulierung", source: "la reformulación (decir lo mismo con otras palabras)", article: "die", sound: "re-for-mu-LII-rung" },
  b2m11sichenthalten: { id: "b2m11sichenthalten", target: "sich der eigenen Meinung enthalten", source: "abstenerse de meter la opinión propia", sound: "zij dea AI-gue-nen MAI-nung ent-HAL-ten" },
  b2m11detailsweg: { id: "b2m11detailsweg", target: "Details weglassen", source: "dejar fuera los detalles", sound: "de-TAIL-s VEK-la-sen" },

  // ── L6–L9 · resumir y transmitir ──
  b2m11derdritte: { id: "b2m11derdritte", target: "der Dritte", source: "el tercero (quien no ha leído las fuentes)", article: "der", sound: "dea DRI-te" },
  b2m11wiedergeben: { id: "b2m11wiedergeben", target: "wiedergeben", source: "reproducir / dar cuenta de (un contenido)", sound: "VEE-da-gee-ben" },
  b2m11uebertragen: { id: "b2m11uebertragen", target: "ins Spanische übertragen", source: "pasar al español (no es un Teil del Goethe B2 2019)", sound: "ins shpaa-NI-she ü-ba-TRAA-guen" },
  b2m11stellungnahmeab: { id: "b2m11stellungnahmeab", target: "eine Stellungnahme abgeben", source: "emitir una toma de posición", sound: "AI-ne SHTE-lung-naa-me AP-gee-ben" },
  b2m11moderation: { id: "b2m11moderation", target: "die Moderation", source: "la moderación (el oficio de Lena Krüger)", article: "die", sound: "mo-de-ra-TSIÓN" },
  b2m11worterteilen: { id: "b2m11worterteilen", target: "das Wort erteilen", source: "dar la palabra (lo hace quien modera)", sound: "das vort er-TAI-len" },
  b2m11wesentlicherinhalt: { id: "b2m11wesentlicherinhalt", target: "der wesentliche Inhalt", source: "el contenido esencial", article: "der", sound: "dea vee-ZENT-li-je IN-halt" },
  b2m11lautem: { id: "b2m11lautem", target: "laut dem Protokoll", source: "según el acta", sound: "laut deem pro-to-KOL" },
  b2m11luecke: { id: "b2m11luecke", target: "die Lücke", source: "la laguna / el hueco (lo que falta en el relato)", article: "die", plural: "Lücken", sound: "LÜ-ke" },
  b2m11haltvorder: { id: "b2m11haltvorder", target: "der Halt vor der Tür", source: "la parada / el aparcamiento ante la puerta", article: "der", sound: "dea halt foa dea tüa" },
  b2m11vermittlung: { id: "b2m11vermittlung", target: "die Vermittlung", source: "transmitir el contenido a un tercero (resumir y contrastar; no es un Teil del Goethe B2 2019)", article: "die", sound: "fea-MIT-lung" },
};

export const b2m11: Phase = {
  id: "b2m11",
  level: "b2",
  n: 11,
  title: "In eigenen Worten",
  goal: "Resumir sin copiar, sintetizar dos textos que no se ponen de acuerdo y transmitírselo a quien no los ha leído — en alemán y, si hace falta, en español.",
  color: "#4f46e5",
  lessons: [
    {
      id: "b2m11l1",
      phaseId: "b2m11",
      title: "Kurz gesagt, ohne mich",
      subtitle: "El resumen: presente, sin detalle, sin tu opinión",
      minutes: 13,
      sections: [
        {
          kind: "phrases",
          title: "Las muletillas que abren un resumen",
          itemIds: ["b2m11zusammenfassend", "b2m11mitanderenworten", "b2m11dasheisst", "b2m11kurzgesagt", "b2m11imwesentlichen", "b2m3zusammenfassung"],
        },
        {
          kind: "note",
          note: {
            title: "Resumir no es acortar: es cambiar de operación",
            body: "Un resumen de B2 hace <b>tres cosas a la vez</b> y ninguna es «quitar adjetivos».<br/>1. <b>Presente</b>, aunque el original esté en pasado: se habla de lo que el texto <i>sostiene</i>, no de lo que pasó el martes.<br/>2. <b>Sin detalles</b>: cifras sueltas, anécdotas, nombres de calle — fuera, salvo que sean la tesis.<br/>3. <b>Sin opinión propia</b>: el <i>ich finde</i> se reserva para cuando te lo piden. En un protocolo, en el Lesen que pide la postura, en el Schreiben que informa a quien no ha leído, tu parecer estorba.<br/><br/><b>Lo que este módulo no es.</b> El Goethe-Zertifikat B2 de <b>2019 no tiene Sprachmittlung</b>: no hay un Teil de «pásalo al español». Mediar, aquí, no es el nombre de una tarea. Es la operación que el Lesen y el Schreiben sí cobran: resumir sin copiar y contrastar dos fuentes. Otros formatos examinan la Sprachmittlung como papel con nombre; el Goethe B2 de 2019, no.<br/><br/>Las muletillas no son adorno: señalan el cambio de operación. <i>Zusammenfassend lässt sich sagen, dass…</i> avisa al lector de que ya no está en el original. <i>Im Wesentlichen</i> avisa de que se ha cortado. <i>Das heißt</i> avisa de que se reformula. Si pegas tres frases del original una detrás de otra, no has resumido: has hecho un collage, y es el error de la clínica.",
            table: [
              ["zusammenfassend", "abre el resumen, verbo detrás"],
              ["im Wesentlichen", "marca que se ha cortado lo accesorio"],
              ["mit anderen Worten / das heißt", "reformula, no añade"],
              ["das Fazit", "el balance, no el último detalle"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m11l1e1", type: "match", prompt: "Muletilla y oficio",
              pairs: [
                { target: "zusammenfassend", source: "abre el resumen" },
                { target: "im Wesentlichen", source: "marca que se ha cortado" },
                { target: "mit anderen Worten", source: "reformula" },
                { target: "das heißt", source: "explica lo mismo más claro" },
                { target: "das Fazit", source: "el balance final" },
              ],
              itemIds: ["b2m11zusammenfassend", "b2m11imwesentlichen", "b2m11mitanderenworten", "b2m11dasheisst", "b2m11fazit"],
            },
            {
              id: "b2m11l1e2", type: "mc", prompt: "Qué NO es un resumen",
              question: "Has copiado tres frases del artículo, las has pegado y has quitado dos adjetivos. ¿Qué tienes?",
              options: ["Un resumen de B2", "Un collage: las palabras prohibidas siguen ahí", "Un resumen pasado al español"],
              answer: 1,
              whyWrong: ["El B2 pide operación, no tijera", null, "Ni siquiera has cambiado de lengua"],
              itemIds: ["b2m3zusammenfassung", "b2m11reformulierung"],
              tip: "En la clínica de L5 esas palabras estarán prohibidas. Empieza ya a no enamorarte de la frase bonita del original.",
            },
            {
              id: "b2m11l1e3", type: "cloze", prompt: "La fórmula de examen que abre el resumen",
              text: "___ lässt sich sagen, dass beide Seiten den Takt wollen.",
              answers: ["Zusammenfassend"],
              translation: "En resumen cabe decir que las dos partes quieren la frecuencia.",
              itemIds: ["b2m11zusammenfassend"],
            },
            {
              id: "b2m11l1e4", type: "errorfix", prompt: "El resumen se ha colado la opinión",
              wrong: "Zusammenfassend finde ich, dass der Bus kommt.",
              answers: ["Zusammenfassend lässt sich sagen, dass der Bus kommt.", "Zusammenfassend lässt sich sagen, dass der Bus kommt"],
              why: "zusammenfassend no es la puerta de tu parecer. Si te piden resumen, la opinión se calla. «lässt sich sagen» despersonaliza: es la máquina del m2 al servicio del resumen.",
              translation: "En resumen cabe decir que se pide el bus.",
              itemIds: ["b2m11zusammenfassend", "b2m11ohnewertung"],
            },
            {
              id: "b2m11l1e5", type: "paraphrase", prompt: "Dilo sin las palabras del original",
              source: "Der Nachtbus muss unbedingt eingeführt werden, und zwar sofort.",
              forbid: ["Nachtbus", "unbedingt", "sofort", "eingeführt"],
              answers: [
                "Im Wesentlichen wird eine Verbindung nach Mitternacht gefordert.",
                "Kurz gesagt wird eine Linie für die Nacht verlangt.",
              ],
              translation: "En lo esencial se pide una conexión después de medianoche.",
              itemIds: ["b2m11imwesentlichen", "b2m11kurzgesagt"],
            },
            {
              id: "b2m11l1e6", type: "gapbank", prompt: "Arma el resumen",
              text: "___ geht es um den Takt. ___, beide Seiten wollen eine Lösung. Das ___ ist: es fehlt ein Kompromiss.",
              answers: ["Im Wesentlichen", "Kurz gesagt", "Fazit"],
              bank: ["Im Wesentlichen", "Kurz gesagt", "Fazit", "Allerdings", "Kumpel", "Jänner"],
              itemIds: ["b2m11imwesentlichen", "b2m11kurzgesagt", "b2m11fazit"],
            },
            {
              id: "b2m11l1e7", type: "translate", prompt: "Al alemán, registro de resumen",
              direction: "toTarget",
              source: "Dicho de otro modo, se trata del orden del día.",
              answers: [
                "Mit anderen Worten geht es um die Tagesordnung.",
                "Mit anderen Worten: es geht um die Tagesordnung.",
              ],
              itemIds: ["b2m11mitanderenworten", "b2m11tagesordnung"],
            },
            {
              id: "b2m11l1e8", type: "type", prompt: "Cierre",
              question: "En resumen cabe decir que las dos partes quieren una solución",
              answers: [
                "Zusammenfassend lässt sich sagen, dass beide Seiten eine Lösung wollen",
                "Zusammenfassend lässt sich sagen, dass beide Seiten eine Lösung wollen.",
              ],
              itemIds: ["b2m11zusammenfassend"],
            },
            {
              id: "b2m11l1e9", type: "fastmatch", prompt: "Velocidad: atribución que ya tienes de B1",
              pairs: [
                { target: "laut einer Studie", source: "según un estudio" },
                { target: "zu einem Thema Stellung nehmen", source: "posicionarse sobre un tema" },
                { target: "der Beitrag (im Forum)", source: "la aportación en un foro" },
                { target: "behaupten", source: "afirmar (algo discutible)" },
              ],
              targetSeconds: 25,
              itemIds: ["b1m6lautstudie", "b1m12gzstellungnehmenzu", "b1m12gzbeitrag", "b1m12gzbehaupten"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-b2m11-1",
            book: "Kurz gesagt…",
            real: "Also im Endeffekt…",
            meaning: "Así que, al final / en resumidas cuentas…",
            when: "Para cerrar de palabra, con amigos o en el pasillo después de la reunión. En el protocolo y en el Vortrag, la fila de examen. Endeffekt en un escrito de Sie suena a barra.",
            register: "amigos",
            exam: "Zusammenfassend lässt sich sagen, dass…",
            note: "Endeffekt es el balance de la calle. El examen quiere el se impersonal del resumen: lässt sich sagen. Misma operación, otro traje — el m10 no se ha ido.",
            sound: "AL-zo im ENT-ef-ekt",
            level: "b2",
            produce: true,
            itemId: "b2m11natendeffekt",
          },
        },
      ],
    },

    {
      id: "b2m11l2",
      phaseId: "b2m11",
      title: "Laut, zufolge, so die Autorin",
      subtitle: "Citar no es parafrasear — el Lesen y el Schreiben premian las dos",
      minutes: 13,
      sections: [
        {
          kind: "phrases",
          title: "De quién es la frase",
          itemIds: ["b2m11zufolge", "b2m1nachangaben", "b2m11soautorin", "b2m1zitieren", "b2m11umschreiben", "b2m11kernaussage"],
        },
        {
          kind: "note",
          note: {
            title: "La cita lleva comillas o laut; la paráfrasis, otras palabras",
            body: "Citar es <b>prestar las palabras del otro</b>: <i>laut Hofmann</i>, <i>dem Artikel zufolge</i>, <i>nach Angaben der Senatsverwaltung</i>, <i>so die Autorin</i>. El Konjunktiv I del m1 (<i>sie sei der Meinung</i>) es la marca de que no firmas tú.<br/><br/>Parafrasear es <b>devolver el contenido con tu léxico</b>. Por eso existe <i>umschreiben</i> y por eso el ejercicio de reformular te prohíbe las palabras del original: si las reutilizas, no has parafraseado nada.<br/><br/>Ojo a <b>zufolge</b>: el nombre va <b>delante</b> y en dativo (<i>dem Artikel zufolge</i>), no detrás. *zufolge dem Artikel es el calco.",
            table: [
              ["laut + Dativ", "laut dem Artikel"],
              ["zufolge (detrás del nombre)", "dem Artikel zufolge"],
              ["nach Angaben von", "nach Angaben der Polizei"],
              ["so X", "so die Autorin"],
              ["umschreiben", "contenido sí, palabras no"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m11l2e1", type: "mc", prompt: "El orden de zufolge",
              question: "«Según el artículo» en registro de prensa es…",
              options: ["zufolge dem Artikel", "dem Artikel zufolge", "zufolge den Artikel"],
              answer: 1,
              whyWrong: ["zufolge va DETRÁS del nombre", null, "además el artículo iría en dativo"],
              itemIds: ["b2m11zufolge"],
            },
            {
              id: "b2m11l2e2", type: "errorfix", prompt: "zufolge se ha colado delante",
              wrong: "Zufolge dem Artikel fehlt der Takt.",
              answers: ["Dem Artikel zufolge fehlt der Takt.", "Dem Artikel zufolge fehlt der Takt"],
              why: "zufolge es postposición: el nombre en dativo va delante. Es de las pocas que el español no adivina («según el artículo» pondría según delante).",
              translation: "Según el artículo falta la frecuencia.",
              itemIds: ["b2m11zufolge"],
            },
            {
              id: "b2m11l2e3", type: "cloze", prompt: "La cita compacta de prensa",
              text: "Der Takt reiche nicht, ___ die Autorin.",
              answers: ["so"],
              translation: "La frecuencia no basta, según la autora.",
              itemIds: ["b2m11soautorin"],
              tip: "«so die Autorin» va entre comas o al cierre. Es la firma de que no lo dices tú.",
            },
            {
              id: "b2m11l2e4", type: "bucket", prompt: "¿Cita o paráfrasis?",
              categories: ["cita (palabras o atribución)", "paráfrasis (contenido, otras palabras)"],
              items: [
                { text: "Dem Artikel zufolge fehlt der Takt.", bucket: 0 },
                { text: "Im Wesentlichen wird eine Nachtverbindung gefordert.", bucket: 1 },
                { text: "«Der Bus muss sofort kommen», so Hofmann.", bucket: 0 },
                { text: "Mit anderen Worten: nach Mitternacht fährt nichts.", bucket: 1 },
                { text: "Nach Angaben der Senatsverwaltung sinkt der Ausstoß.", bucket: 0 },
                { text: "Kurz gesagt geht es um den Fahrplan, nicht um Moral.", bucket: 1 },
              ],
              itemIds: ["b2m11zufolge", "b2m11umschreiben", "b2m1nachangaben"],
            },
            {
              id: "b2m11l2e5", type: "paraphrase", prompt: "Umschreiben: dilo sin las palabras de Hofmann",
              source: "Der Takt nach Mitternacht fehlt, und die Schicht hat kein Argument, sondern ein Problem.",
              forbid: ["Takt", "Mitternacht", "Schicht", "Argument", "Problem"],
              answers: [
                "Dem Artikel zufolge haben Nachtschicht-Beschäftigte keine brauchbare Verbindung.",
                "Laut Hofmann gibt es nachts keine brauchbare Verbindung für die, die arbeiten.",
              ],
              translation: "Según el artículo, quien trabaja de noche no tiene conexión usable.",
              itemIds: ["b2m11zufolge", "b2m11umschreiben", "b2m11kernaussage"],
            },
            {
              id: "b2m11l2e6", type: "gapbank", prompt: "Atribuye sin firmar tú",
              text: "___ Artikel zufolge fehlt der Takt. ___ Angaben der Stadt ist der Bus machbar. Der Takt reiche nicht, ___ die Autorin.",
              answers: ["Dem", "Nach", "so"],
              bank: ["Dem", "Nach", "so", "Vom", "Bei", "als"],
              itemIds: ["b2m11zufolge", "b2m1nachangaben", "b2m11soautorin"],
            },
            {
              id: "b2m11l2e7", type: "listen", prompt: "La fórmula de examen",
              text: "Dem Artikel zufolge fehlt nach Mitternacht der Takt.",
              itemIds: ["b2m11natzufolge"],
            },
            {
              id: "b2m11l2e8", type: "type", prompt: "Cierre",
              question: "Según el artículo falta la frecuencia",
              answers: [
                "Dem Artikel zufolge fehlt der Takt",
                "Dem Artikel zufolge fehlt der Takt.",
                "Laut dem Artikel fehlt der Takt",
              ],
              itemIds: ["b2m11zufolge", "b2m11lautem"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-b2m11-2",
            book: "In dem Text steht, dass…",
            real: "Da steht halt, dass…",
            meaning: "En el texto dice que…",
            when: "halt es la partícula de «ya se sabe». Con amigos, para señalar el contenido sin citar. En el protocolo y en el Schreiben, zufolge / laut. Da steht halt en un Vortrag suena a que no te has leído el original.",
            register: "amigos",
            exam: "Dem Artikel zufolge…",
            note: "La calle señala con da. El examen nombra la fuente. Resumir es, entre otras cosas, elegir esa fila.",
            sound: "da shteet halt, das",
            level: "b2",
            produce: true,
            itemId: "b2m11natzufolge",
          },
        },
      ],
    },

    {
      id: "b2m11l3",
      phaseId: "b2m11",
      title: "Im Gegensatz zu, wohingegen",
      subtitle: "Dos fuentes que no se ponen de acuerdo: el esqueleto del contraste",
      minutes: 13,
      sections: [
        {
          kind: "phrases",
          title: "Las piezas que sostienen «A dice X, B dice Y»",
          itemIds: ["b2m11imgegensatzzu", "b2m5wohingegen", "b2m11demgegenueber", "b2m11stimmenueberein", "b2m11gegenposition", "b2m11diskrepanz"],
        },
        {
          kind: "note",
          note: {
            title: "Primero el acuerdo, luego la grieta — si no, parece que no has leído",
            body: "Sintetizar dos textos que se contradicen no es elegir bando. El esqueleto que el Lesen y el Schreiben premian — no hay un Teil de Sprachmittlung en el Goethe B2 de 2019; hay foro, reglamento y un escrito que reacciona a un texto ajeno—:<br/>1. <b>Dónde coinciden</b>: <i>Beide Texte stimmen darin überein, dass…</i><br/>2. <b>Dónde se separan</b>: <i>im Gegensatz zu A behauptet B…</i> · <i>A fordert X, wohingegen B Y verlangt</i> · <i>demgegenüber…</i><br/>3. <b>La grieta</b>: <i>die Diskrepanz liegt in…</i> (causa, no insulto).<br/><br/><i>wohingegen</i> manda el verbo al final. <i>demgegenüber</i> e <i>im Gegensatz zu</i> no. Es la misma guerra adverbio/conjunción del m5, ahora al servicio de contrastar fuentes.",
            table: [
              ["übereinstimmen darin, dass", "el dato compartido"],
              ["im Gegensatz zu + Dativ", "frente a la otra fuente"],
              ["wohingegen (verbo al final)", "mientras que"],
              ["demgegenüber", "frente a eso, con inversión"],
              ["die Diskrepanz", "el desajuste, sin pelea"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m11l3e1", type: "match", prompt: "Conector de contraste y traje",
              pairs: [
                { target: "im Gegensatz zu Hofmann", source: "a diferencia de Hofmann" },
                { target: "wohingegen Vogel Parkplätze fordert", source: "mientras que Vogel pide aparcamiento" },
                { target: "demgegenüber bleibt der Laden", source: "frente a eso, la tienda permanece" },
                { target: "beide stimmen darin überein, dass …", source: "ambos coinciden en que…" },
              ],
              itemIds: ["b2m11imgegensatzzu", "b2m5wohingegen", "b2m11demgegenueber", "b2m11stimmenueberein"],
            },
            {
              id: "b2m11l3e2", type: "errorfix", prompt: "wohingegen manda al final",
              wrong: "Hofmann fordert den Bus, wohingegen Vogel fordert Parkplätze.",
              answers: ["Hofmann fordert den Bus, wohingegen Vogel Parkplätze fordert.", "Hofmann fordert den Bus, wohingegen Vogel Parkplätze fordert"],
              why: "wohingegen es conjunción subordinante: el verbo se va al final de su mitad. El calco «mientras que Vogel pide» deja el verbo en medio, como en español.",
              translation: "Hofmann pide el bus, mientras que Vogel pide aparcamiento.",
              itemIds: ["b2m5wohingegen"],
            },
            {
              id: "b2m11l3e3", type: "cloze", prompt: "El dato compartido, primero",
              text: "Beide Texte stimmen darin ___, dass nachts etwas fehlt.",
              answers: ["überein"],
              translation: "Ambos textos coinciden en que de noche falta algo.",
              itemIds: ["b2m11stimmenueberein"],
            },
            {
              id: "b2m11l3e4", type: "gapbank", prompt: "El esqueleto de dos fuentes",
              text: "___ Hofmann fordert den Bus. ___, dass nachts etwas fehlt, sind sie sich einig. Die ___ liegt in der Ursache.",
              answers: ["Im Gegensatz zu", "Darin", "Diskrepanz"],
              bank: ["Im Gegensatz zu", "Darin", "Diskrepanz", "Allerdings", "Kumpel", "Jänner"],
              translation: "A diferencia de Hofmann pide el bus. En que de noche falta algo están de acuerdo. La discrepancia está en la causa.",
              itemIds: ["b2m11imgegensatzzu", "b2m11stimmenueberein", "b2m11diskrepanz"],
            },
            {
              id: "b2m11l3e5", type: "paraphrase", prompt: "Contrasta sin «aber»",
              source: "Hofmann will den Bus, aber Vogel will die Parkplätze.",
              forbid: ["aber", "will", "Bus", "Parkplätze"],
              answers: [
                "Im Gegensatz zu Hofmann fordert Vogel den Parkraum.",
                "Hofmann fordert eine Nachtlinie, wohingegen Vogel den Parkraum verteidigt.",
              ],
              translation: "A diferencia de Hofmann, Vogel defiende el aparcamiento.",
              itemIds: ["b2m11imgegensatzzu", "b2m5wohingegen", "b2m11gegenposition"],
            },
            {
              id: "b2m11l3e6", type: "build", prompt: "demgegenüber con inversión",
              target: "Demgegenüber bleibt der Laden ohne Kunden.",
              translation: "Frente a eso, la tienda se queda sin clientes.",
              distractors: ["obwohl", "weil"],
              itemIds: ["b2m11demgegenueber"],
            },
            {
              id: "b2m11l3e7", type: "mc", prompt: "Qué va primero en la síntesis",
              question: "Empiezas el protocolo de dos fuentes que se pelean. ¿Qué va primero?",
              options: ["Tu parecer", "Dónde coinciden", "El insulto más gracioso"],
              answer: 1,
              whyWrong: ["El protocolo no te pide bando", null, "Tampoco"],
              itemIds: ["b2m11stimmenueberein", "b2m5protokoll"],
            },
            {
              id: "b2m11l3e8", type: "type", prompt: "Cierre",
              question: "Ambos textos coinciden en que de noche falta algo",
              answers: [
                "Beide Texte stimmen darin überein, dass nachts etwas fehlt",
                "Beide Texte stimmen darin überein, dass nachts etwas fehlt.",
              ],
              itemIds: ["b2m11stimmenueberein"],
            },
          ],
        },
      ],
    },

    {
      id: "b2m11l4",
      phaseId: "b2m11",
      title: "Lena erteilt das Wort",
      subtitle: "Reunión, orden del día, protocolo: resumir en voz alta",
      minutes: 13,
      sections: [
        {
          kind: "phrases",
          title: "El oficio de quien no firma el contenido",
          itemIds: ["b2m11besprechung", "b2m5protokoll", "b2m11tagesordnung", "b2m11moderieren", "b2m11wortergreifen", "b2m11worterteilen", "b2m11aufdenpunkt"],
        },
        {
          kind: "note",
          note: {
            title: "El protocolo no es tu diario: es el resumen por escrito",
            body: "Lena Krüger <b>modera</b> debates vecinales: da la palabra, corta cuando se pierde el hilo, resume sin bando. Sofía, esta vez, <b>escribe el Protokoll</b>. Las dos operaciones son la misma: transmitir sin firmar.<br/><br/>· <b>die Tagesordnung</b> — de qué se habla, y en qué orden.<br/>· <b>das Wort erteilen</b> lo hace quien modera; <b>das Wort ergreifen</b> lo hace quien pide turno.<br/>· <b>auf den Punkt bringen</b> — una frase, no un discurso.<br/>· <b>hinzufügen</b> — un punto que el acta aún no tiene.<br/>· <b>die Rückmeldung</b> — la devolución, no la bronca.<br/>· <b>sich abstimmen</b> — coordinarse o votar, según el contexto.<br/><br/>Si el protocolo dice «ich finde», has fallado el género. Si copia las intervenciones enteras, también: el acta resume.",
            table: [
              ["moderieren / das Wort erteilen", "oficio de Lena"],
              ["das Wort ergreifen", "pedir turno"],
              ["das Protokoll", "el producto escrito del resumen"],
              ["auf den Punkt bringen", "una frase, no un discurso"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m11l4e1", type: "match", prompt: "Quién hace qué en la Besprechung",
              pairs: [
                { target: "das Wort erteilen", source: "dar la palabra (quien modera)" },
                { target: "das Wort ergreifen", source: "tomar la palabra" },
                { target: "das Protokoll schreiben", source: "redactar el acta" },
                { target: "auf den Punkt bringen", source: "dejarlo en una frase" },
              ],
              itemIds: ["b2m11worterteilen", "b2m11wortergreifen", "b2m5protokoll", "b2m11aufdenpunkt"],
            },
            {
              id: "b2m11l4e2", type: "mc", prompt: "El género del protocolo",
              question: "Sofía escribe el acta. ¿Qué queda fuera?",
              options: ["Tagesordnung, Kernaussage, Diskrepanz", "Ich finde, ein Witz über Vogel, tres anécdotas", "ohne Wertung, zusammenfassend"],
              answer: 1,
              whyWrong: ["Eso es el acta", null, "Eso también es el acta"],
              itemIds: ["b2m5protokoll", "b2m11ohnewertung", "b2m11tagesordnung"],
            },
            {
              id: "b2m11l4e3", type: "cloze", prompt: "Quien modera da la palabra",
              text: "Lena Krüger ___ Clara Hofmann das Wort.",
              answers: ["erteilt"],
              translation: "Lena Krüger le da la palabra a Clara Hofmann.",
              itemIds: ["b2m11worterteilen", "b2m11moderieren"],
            },
            {
              id: "b2m11l4e4", type: "errorfix", prompt: "El acta no firma",
              wrong: "Im Protokoll finde ich, dass der Bus kommt.",
              answers: ["Im Protokoll heißt es, dass der Bus kommt.", "Im Protokoll heißt es, dass der Bus kommt"],
              why: "El acta atribuye, no opina. heißt es / laut dem Protokoll / zusammenfassend lässt sich sagen. finde ich es el error de género, no de gramática.",
              translation: "En el acta consta que se pide el bus.",
              itemIds: ["b2m5protokoll", "b2m11lautem", "b2m11ohnewertung"],
            },
            {
              id: "b2m11l4e5", type: "gapbank", prompt: "La reunión en tres huecos",
              text: "Punkt zwei der ___: der Nachtbus. Lena ___ die Debatte. Sofía schreibt das ___ ohne Wertung.",
              answers: ["Tagesordnung", "moderiert", "Protokoll"],
              bank: ["Tagesordnung", "moderiert", "Protokoll", "Kumpel", "Jänner", "Stiege"],
              itemIds: ["b2m11tagesordnung", "b2m11moderieren", "b2m5protokoll"],
            },
            {
              id: "b2m11l4e6", type: "build", prompt: "Pedir la palabra",
              target: "Darf ich dazu das Wort ergreifen?",
              translation: "¿Puedo tomar la palabra sobre eso?",
              distractors: ["erteilen", "verlieren"],
              itemIds: ["b2m11wortergreifen"],
            },
            {
              id: "b2m11l4e7", type: "paraphrase", prompt: "Al acta, sin las palabras de Kai",
              source: "Der Betriebsrat unterstützt den Bus, aber die Anwohner dürfen nicht überstimmt werden.",
              forbid: ["Betriebsrat", "unterstützt", "Anwohner", "überstimmt"],
              answers: [
                "Laut Kai soll die Linie kommen, ohne die Nachbarschaft zu übergehen.",
                "Dem Beitrag zufolge braucht es den Bus und zugleich eine Stimme für die Nachbarschaft.",
              ],
              itemIds: ["b2m11zufolge", "b2m11hinzufuegen", "b2m11rueckmeldung"],
            },
            {
              id: "b2m11l4e8", type: "type", prompt: "Cierre",
              question: "Resumo en breve el contenido esencial",
              answers: [
                "Ich fasse den wesentlichen Inhalt kurz zusammen",
                "Ich fasse den wesentlichen Inhalt kurz zusammen.",
              ],
              itemIds: ["b2m11natfasse", "b2m11wesentlicherinhalt", "b2m1zusammenfassen"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-b2m11-3",
            book: "Anders gesagt",
            real: "Also quasi…",
            meaning: "O sea / como…",
            when: "Muleta para reformular de palabra, cuando aún estás buscando la frase. En el escrito y en el Vortrag: mit anderen Worten. Quasi en un protocolo queda de pasillo.",
            register: "amigos",
            exam: "Mit anderen Worten",
            note: "quasi no añade información: gana medio segundo. El examen no paga ese segundo; paga la reformulación limpia.",
            sound: "AL-zo KVAA-zi",
            level: "b2",
            produce: true,
            itemId: "b2m11natalsoquasi",
          },
        },
      ],
    },

    {
      id: "b2m11l5",
      phaseId: "b2m11",
      title: "Clínica: resumir no es acortar",
      subtitle: "A propósito: las palabras del original están prohibidas",
      minutes: 14,
      sections: [
        {
          kind: "phrases",
          title: "Lo que el collage no sabe hacer",
          itemIds: ["b2m11reformulierung", "b2m11sichenthalten", "b2m11detailsweg", "b2m11ohnewertung", "b2m11kernaussage"],
        },
        {
          kind: "note",
          note: {
            title: "Si puedes reutilizar las palabras, el ejercicio no existe",
            body: "El error de este nivel es <b>copiar frases del original y pegarlas seguidas</b>. Por eso el ejercicio de reformular te <b>prohíbe las palabras del texto fuente</b>: si las reutilizas, no has parafraseado.<br/><br/>Tres pruebas de que has resumido de verdad:<br/>· No está la palabra estrella del original.<br/>· No está tu <i>ich finde</i>.<br/>· Está la <b>Kernaussage</b>, no el ejemplo del segundo párrafo.<br/><br/>La reformulación usa lo que ya tienes: rección del m9 (<i>der Grund für, die Voraussetzung für</i>), registro del m10, conectores de contraste de L3. Resumir es elegir traje, no inventar lengua.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m11l5e1", type: "bucket", prompt: "¿Resumen o collage?",
              categories: ["resumen (operación hecha)", "collage / opinión colada"],
              items: [
                { text: "Im Wesentlichen wird eine Nachtverbindung gefordert.", bucket: 0 },
                { text: "Der Nachtbus muss unbedingt eingeführt werden, und zwar sofort.", bucket: 1 },
                { text: "Zusammenfassend lässt sich sagen, dass beide Seiten eine Lücke sehen.", bucket: 0 },
                { text: "Zusammenfassend finde ich Vogel unmöglich.", bucket: 1 },
                { text: "Dem Artikel zufolge fehlt nachts eine Verbindung.", bucket: 0 },
                { text: "«Der Bus muss sofort kommen», und dann noch drei Sätze aus Absatz zwei.", bucket: 1 },
              ],
              itemIds: ["b2m11imwesentlichen", "b2m11sichenthalten", "b2m11ohnewertung"],
            },
            {
              id: "b2m11l5e2", type: "paraphrase", prompt: "Prohibidas las palabras de Hofmann",
              source: "Die Voraussetzung für einen echten Umstieg ist ein Nahverkehr, der nach Mitternacht noch taktet.",
              forbid: ["Voraussetzung", "Umstieg", "Nahverkehr", "Mitternacht", "taktet"],
              answers: [
                "Im Wesentlichen braucht der Wechsel eine Verbindung, die auch nachts fährt.",
                "Kurz gesagt gelingt der Wechsel nur mit einer Linie für die Nacht.",
              ],
              itemIds: ["b2m11imwesentlichen", "b2m11kurzgesagt", "b2m11reformulierung"],
            },
            {
              id: "b2m11l5e3", type: "paraphrase", prompt: "Prohibidas las palabras de Vogel",
              source: "Ohne Parkplätze stirbt der Laden unten, und die Kunden bleiben weg.",
              forbid: ["Parkplätze", "stirbt", "Laden", "Kunden"],
              answers: [
                "Demgegenüber hängt das Geschäft am Halt vor der Tür.",
                "Laut Vogel braucht der Einzelhandel den Halt vor der Tür.",
              ],
              itemIds: ["b2m11demgegenueber", "b2m11umschreiben"],
            },
            {
              id: "b2m11l5e4", type: "errorfix", prompt: "El detalle que no era la tesis",
              wrong: "Das Fazit ist die Farbe der Haltestelle.",
              answers: ["Das Fazit ist nicht die Farbe der Haltestelle.", "Die Farbe der Haltestelle ist ein Detail, kein Fazit."],
              why: "Hofmann lo dijo en la tertulia: el color de la parada se deja fuera. El Fazit es la tesis (el Takt), no el adorno. Details weglassen es la operación, no un consejo de estilo.",
              translation: "El balance no es el color de la parada.",
              itemIds: ["b2m11fazit", "b2m11detailsweg"],
            },
            {
              id: "b2m11l5e5", type: "gapbank", prompt: "Las tres pruebas",
              text: "Ich lasse die ___ weg, enthalte mich der eigenen ___ und treffe die ___.",
              answers: ["Details", "Meinung", "Kernaussage"],
              bank: ["Details", "Meinung", "Kernaussage", "Kumpel", "Stiege", "Farbe"],
              itemIds: ["b2m11detailsweg", "b2m11sichenthalten", "b2m11kernaussage"],
            },
            {
              id: "b2m11l5e6", type: "mc", prompt: "Por qué se prohíben palabras del original",
              question: "Si el ejercicio de paráfrasis no prohibiera palabras, ¿qué pasaría?",
              options: ["Nada: copiar también es resumir", "Se podría devolver el original y darlo por válido", "Subiría la nota de Wortschatz"],
              answer: 1,
              whyWrong: ["Copiar no es la operación del nivel", null, "Wortschatz se demuestra cambiando de palabras"],
              itemIds: ["b2m11reformulierung", "b2m11umschreiben"],
            },
            {
              id: "b2m11l5e7", type: "transform", prompt: "Del original al resumen despersonalizado",
              source: "Ich finde, der Bus muss kommen.",
              instruction: "Resumen sin opinión: zusammenfassend lässt sich sagen",
              answers: [
                "Zusammenfassend lässt sich sagen, dass der Bus gefordert wird.",
                "Zusammenfassend wird der Bus gefordert.",
              ],
              itemIds: ["b2m11zusammenfassend", "b2m11sichenthalten"],
            },
            {
              id: "b2m11l5e8", type: "type", prompt: "Cierre de la clínica",
              question: "Hay que abstenerse de meter la opinión propia",
              answers: [
                "Man muss sich der eigenen Meinung enthalten",
                "Man muss sich der eigenen Meinung enthalten.",
                "Ich muss mich der eigenen Meinung enthalten",
              ],
              itemIds: ["b2m11sichenthalten"],
            },
          ],
        },
      ],
    },

    {
      id: "b2m11l6",
      phaseId: "b2m11",
      title: "Zwei Quellen, ein Protokoll",
      subtitle: "Hofmann y Vogel no se ponen de acuerdo — tú se lo cuentas a un tercero",
      minutes: 18,
      sections: [
        {
          kind: "phrases",
          title: "El tercero no ha leído nada",
          itemIds: ["b2m5vermitteln", "b2m11derdritte", "b2m11wiedergeben", "b2m11vermittlung", "b2m6nachtschicht"],
        },
        {
          kind: "note",
          note: {
            title: "El tercero no tiene el original: si copias, no entiende; si opinas, no se fía",
            body: "Lena ha convocado el debate. Clara Hofmann ha publicado un comentario. Herr Vogel, vecino jubilado de Sofía, ha escrito al distrito. Los dos textos se contradicen. Tu trabajo —el de Sofía en el protocolo, el tuyo en esta lección— es resumir y contrastar: que un tercero que no ha leído las fuentes sepa qué se sostiene, dónde coinciden y dónde no. Sin tu bando.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m11l6e1", type: "read", prompt: "Fuente A. Subraya la Kernaussage, no el ejemplo del segundo párrafo.",
              title: "Der Kiez braucht den Bus, nicht das schlechte Gewissen",
              source: "Clara Hofmann, Kommentar, Lokalredaktion Berlin",
              text: "Die Winsstraße nach Mitternacht ist keine Idylle. Wer um vier zur Schicht muss, steht an einer Haltestelle, an der nichts kommt. Das ist die Kernaussage, und sie braucht keine Moral. Im Wesentlichen fehlt eine Verbindung, nicht ein Vortrag über das Auto.\n\nLaut Zahlen des Bezirks sind in diesem Kiez dreihundert Menschen in Pflege, Küche, Reinigung mit Schichtbeginn vor sechs. Nach Angaben der BVG fährt die letzte Tram kurz nach Mitternacht. Demgegenüber bleibt das Auto die einzige planbare Option — nicht aus Trotz, aus Fahrplan. Wer das als Hobby der Autofahrer verkauft, missversteht die Tagesordnung.\n\nIch bin für den Nachtbus. Das heißt nicht, dass ich gegen jeden Parkplatz bin. Es heißt, dass die Voraussetzung für den Verzicht eine Linie ist, die existiert. Details wie die Farbe der Haltestelle, das Modell des Fahrzeugs, der Name der Kampagne lasse ich weg: sie gehören nicht ins Fazit.\n\nIm Gegensatz zu dem, was in der Bewohnerversammlung oft gesagt wird, ist der Bus keine Strafe für den Laden unten. Ein Laden, der von Schichtarbeiterinnen lebt, lebt auch von ihrer Ankunft. So die Betreiberin der Bäckerei in der zweiten Reihe, die ich zitieren darf: ohne Frühschicht keine Brötchen um sieben. Das ist keine Pointe. Das ist der wesentliche Inhalt.\n\nZusammenfassend lässt sich sagen: der Bezirk kann den Takt bestellen. Er kann ihn auch weiter der Grafik überlassen, in der die Pendler nicht vorkommen. Beides ist eine Entscheidung. Nur eines von beiden ist eine Lösung. Mit anderen Worten: wer den Bus verweigert, weil jemand irgendwo einmal falsch geparkt hat, verwechselt Ursache und Anekdote.\n\nIch bitte die Moderation, das so ins Protokoll zu nehmen — ohne meine Adjektive, mit der Forderung. Der Dritte, der morgen nur das Protokoll liest, muss verstehen, was gefordert wird, nicht, wen ich unmöglich finde. Das ist vermitteln. Alles andere ist ein Leserbrief mit Datum.\n\nNoch ein Satz an die Gegenposition, ohne sie zu verhöhnen: wer den Parkraum verteidigt, verteidigt oft denselben Arbeitsweg, nur von der anderen Seite. Die Diskrepanz liegt nicht im Willen. Sie liegt in der Frage, welche Lücke man zuerst schließt. Ich gehe davon aus, dass beides auf die Tagesordnung gehört. Nur nicht als Feindschaft. Die Vermittlung, die ich der Moderation zumute, ist genau das: zwei Lücken stehen lassen, ohne aus der Nachtschicht einen Feind des Ladens zu machen. Wer das nicht ins Protokoll nimmt, hat den Ausgangstext nicht gelesen, sondern sortiert. Ein Dritter braucht beide Sätze. Einen Feind braucht er nicht.",
              questions: [
                {
                  id: "b2m11l6e1q1",
                  q: "Was ist laut Hofmann die Kernaussage?",
                  options: ["Die Farbe der Haltestelle sei falsch.", "Nach Mitternacht fehlt eine Verbindung für die Schicht.", "Der Laden unten müsse schließen."],
                  answer: 1,
                  why: "Primer párrafo: «Im Wesentlichen fehlt eine Verbindung, nicht ein Vortrag über das Auto.»",
                },
                {
                  id: "b2m11l6e1q2",
                  q: "Was soll ins Protokoll, was nicht?",
                  options: ["Ihre Adjektive und wen sie unmöglich findet.", "Die Forderung, ohne ihre Adjektive, so dass ein Dritter sie versteht.", "Nur das Zitat der Bäckerei."],
                  answer: 1,
                  why: "«ohne meine Adjektive, mit der Forderung. Der Dritte […] muss verstehen, was gefordert wird.»",
                },
                {
                  id: "b2m11l6e1q3",
                  q: "Wie steht Hofmann zum Parkplatz?",
                  options: ["Sie will alle Parkplätze abschaffen.", "Sie ist für den Bus und sagt ausdrücklich, das heiße nicht, gegen jeden Parkplatz zu sein.", "Sie ignoriert den Laden."],
                  answer: 1,
                  inference: true,
                  why: "«Das heißt nicht, dass ich gegen jeden Parkplatz bin.» La tesis es el bus como presupuesto, no la guerra al bordillo.",
                },
                {
                  id: "b2m11l6e1q4",
                  q: "Wozu dient das Zitat der Bäckerei?",
                  options: ["Als Pointe gegen Vogel.", "Als Beleg, dass der Laden von der Schicht lebt, nicht gegen sie.", "Als Detail, das ins Fazit gehört wie die Farbe der Haltestelle."],
                  answer: 1,
                  why: "«ohne Frühschicht keine Brötchen um sieben. Das ist keine Pointe. Das ist der wesentliche Inhalt.»",
                },
                {
                  id: "b2m11l6e1q5",
                  q: "Wo sieht Hofmann die Diskrepanz mit der Gegenposition?",
                  options: ["Im Willen der Anwohner, die das Auto lieben.", "Nicht im Willen, sino en qué laguna se cierra primero.", "En que Vogel no ha leído las cifras."],
                  answer: 1,
                  inference: true,
                  why: "Cierre: «Die Diskrepanz liegt nicht im Willen. Sie liegt in der Frage, welche Lücke man zuerst schließt.»",
                },
              ],
              itemIds: ["b2m11kernaussage", "b2m5vermitteln", "b2m11derdritte", "b2m11fazit", "b2m11ausgangstext"],
            },
            {
              id: "b2m11l6e2", type: "read", prompt: "Fuente B. Contrasta. El tercero necesita las DOS, no tu favorita.",
              title: "Ohne Halt vor der Tür kein Laden",
              source: "Herr Vogel, Schreiben an das Bezirksamt Prenzlauer Berg",
              text: "Sehr geehrte Damen und Herren, ich wohne in der Winsstraße und schreibe nicht, weil ich das Auto verehre. Ich schreibe, weil der Laden unter uns ohne Halt vor der Tür stirbt. Das ist meine Kernaussage. Alles andere ist Beiwerk.\n\nIm Gegensatz zu dem Kommentar von Frau Hofmann sehe ich nachts nicht zuerst die Schicht. Ich sehe die Kundschaft, die um halb acht noch Brot kauft, weil sie selbst Schicht hatte — und die nicht drei Straßen weiter trägt, wenn der letzte Platz weg ist. Dem Artikel zufolge ist der Bus die Voraussetzung. Demgegenüber ist für uns der Halt die Voraussetzung. Beide Sätze können wahr sein. In der Winsstraße sind sie es nicht zur selben Zeit.\n\nNach Angaben des Einzelhandels im Kiez sind in zwei Jahren vier Läden geschlossen worden, sobald die Parkspur zur «Begegnungszone» wurde. Ich zitiere keine Moral. Ich zitiere Kassen. Wohingegen der Bus in der Grafik der Redaktion schon als Lösung dasteht, steht er in unserer Straße noch als Versprechen. Ein Versprechen füllt kein Regal.\n\nIch bitte, das Protokoll ohne meine Verärgerung zu schreiben und mit der Forderung: kein Nachtnetz, das den Parkraum ersatzlos streicht. Sich der eigenen Meinung enthalten heißt hier: meine Adjektive dürfen fehlen, die Zahl der geschlossenen Läden nicht. Details wie mein Alter oder der Name meiner Katze gehören nicht ins Fazit. Die Diskrepanz schon.\n\nBeide Texte stimmen darin überein, dass nachts etwas fehlt. Die Autorin nennt den Takt. Ich nenne den Halt. Mit anderen Worten: wir verhandeln zwei Lücken, als wäre es eine. Das ist der Fehler der Tagesordnung, nicht der Charakter der Nachbarn.\n\nZusammenfassend lässt sich sagen: ich bin nicht gegen den Bus. Ich bin gegen eine Lösung, die den Laden als Kollateralschaden verbucht. Der Dritte, der nur das Protokoll liest, soll das so wiedergegeben bekommen — umgeschrieben, wo meine Sätze zu scharf sind, aber nicht umgedreht. Vermitteln ist nicht schlichten um jeden Preis. Vermitteln ist, beide Kernaussagen stehen zu lassen.\n\nEin letzter Satz an die Moderation: wenn Lena Krüger das Wort erteilt, möchte ich nicht als der Mann vom Auto erscheinen. Ich möchte als der Nachbar vom Laden erscheinen. Das ist keine Kleinigkeit. Das ist, wen der Dritte morgen vor sich hat. Die Vermittlung, die ich mir wünsche, lässt den Halt vor der Tür stehen, auch wenn die Nachtschicht zu Recht den Bus verlangt. Zwei Sätze, ein Protokoll. Wer nur einen stehen lässt, hat nicht vermittelt. Er hat Partei ergriffen und es Zusammenfassung genannt.",
              questions: [
                {
                  id: "b2m11l6e2q1",
                  q: "Was ist Vogels Kernaussage?",
                  options: ["Er verehrt das Auto.", "Ohne Halt vor der Tür stirbt der Laden.", "Der Bus sei grundsätzlich falsch."],
                  answer: 1,
                  why: "Lo declara al principio y lo repite al final: no está contra el bus, está contra perder el Halt.",
                },
                {
                  id: "b2m11l6e2q2",
                  q: "Worin stimmen beide Texte überein?",
                  options: ["Dass der Bus sofort kommen muss.", "Dass nachts etwas fehlt.", "Dass der Laden schließen soll."],
                  answer: 1,
                  why: "Vogel lo escribe con la fórmula del módulo: «Beide Texte stimmen darin überein, dass nachts etwas fehlt.»",
                },
                {
                  id: "b2m11l6e2q3",
                  q: "Was darf laut Vogel im Protokoll fehlen — und was nicht?",
                  options: ["Die Zahl der geschlossenen Läden darf fehlen.", "Seine Verärgerung darf fehlen; die Zahl der geschlossenen Läden nicht.", "Die Diskrepanz darf fehlen."],
                  answer: 1,
                  inference: true,
                  why: "«meine Adjektive dürfen fehlen, die Zahl der geschlossenen Läden nicht.» Hay que separar enfado y dato.",
                },
                {
                  id: "b2m11l6e2q4",
                  q: "Wie definiert Vogel «vermitteln»?",
                  options: ["Schlichten um jeden Preis.", "Beide Kernaussagen stehen lassen, umschreiben ohne umzudrehen.", "Die Autorin korrigieren."],
                  answer: 1,
                  why: "«Vermitteln ist nicht schlichten um jeden Preis. Vermitteln ist, beide Kernaussagen stehen zu lassen.»",
                },
                {
                  id: "b2m11l6e2q5",
                  q: "Worin liegt die Diskrepanz zwischen Hofmann und Vogel?",
                  options: [
                    "In der Moral der Autofahrer.",
                    "En qué laguna se nombra primero: el Takt o el Halt.",
                    "En que uno quiere el bus y el otro no.",
                  ],
                  answer: 1,
                  inference: true,
                  why: "Los dos niegan estar contra el otro objeto. La grieta es la prioridad: conexión nocturna frente a parada ante la tienda. Vogel: «wir verhandeln zwei Lücken, als wäre es eine.»",
                },
              ],
              itemIds: ["b2m11gegenposition", "b2m11diskrepanz", "b2m11wiedergeben", "b2m11stimmenueberein"],
            },
            {
              id: "b2m11l6e3", type: "mc", prompt: "Lo que el tercero necesita oír primero",
              question: "Sofía abre el protocolo. ¿Qué frase resume sin tomar partido?",
              options: [
                "Ich finde Hofmann überzeugender.",
                "Beide Seiten sehen nachts eine Lücke; die Diskrepanz liegt in der Ursache.",
                "Vogel verehrt das Auto.",
              ],
              answer: 1,
              whyWrong: ["Opinión: prohibida en el acta", null, "Eso es precisamente lo que Vogel pide que no se escriba"],
              itemIds: ["b2m5vermitteln", "b2m11diskrepanz", "b2m11ohnewertung", "b2m11luecke", "b2m11haltvorder"],
            },
            {
              id: "b2m11l6e4", type: "paraphrase", prompt: "Síntesis para el tercero, sin las palabras clave de ambos",
              source: "Hofmann fordert den Nachtbus, Vogel verteidigt die Parkplätze.",
              forbid: ["Nachtbus", "Parkplätze", "fordert", "verteidigt"],
              answers: [
                "Die eine Seite will eine Verbindung nach Mitternacht, die andere den Halt vor der Tür.",
                "Im Wesentlichen stehen eine Nachtlinie und der Halt vor den Läden gegeneinander.",
              ],
              itemIds: ["b2m5vermitteln", "b2m11imwesentlichen", "b2m11derdritte"],
            },
            {
              id: "b2m11l6e5", type: "gapbank", prompt: "El acta en tres frases",
              text: "Beide Texte stimmen darin ___, dass nachts etwas fehlt. ___ Hofmann nennt den Takt, Vogel den Halt. Die ___ liegt in der Reihenfolge, nicht im Willen.",
              answers: ["überein", "Im Gegensatz zu", "Diskrepanz"],
              bank: ["überein", "Im Gegensatz zu", "Diskrepanz", "Allerdings", "Kumpel", "Jänner"],
              itemIds: ["b2m11stimmenueberein", "b2m11imgegensatzzu", "b2m11diskrepanz"],
            },
            {
              id: "b2m11l6e6", type: "order", prompt: "El orden de una síntesis que se puede leer sin los originales",
              sentences: [
                "Beide Seiten sehen nachts eine Lücke.",
                "Hofmann nennt die fehlende Verbindung für die Schicht.",
                "Vogel nennt den Halt vor dem Laden.",
                "Die Diskrepanz liegt darin, welche Lücke zuerst geschlossen wird.",
              ],
              itemIds: ["b2m11stimmenueberein", "b2m11diskrepanz"],
            },
            {
              id: "b2m11l6e7", type: "type", prompt: "Cierre: una frase de protocolo",
              question: "Ambos coinciden en que de noche falta algo; la discrepancia está en la causa",
              answers: [
                "Beide stimmen darin überein, dass nachts etwas fehlt; die Diskrepanz liegt in der Ursache",
                "Beide stimmen darin überein, dass nachts etwas fehlt; die Diskrepanz liegt in der Ursache.",
              ],
              itemIds: ["b2m11stimmenueberein", "b2m11diskrepanz"],
            },
          ],
        },
      ],
    },

    {
      id: "b2m11l7",
      phaseId: "b2m11",
      title: "Hören: die Moderation mitschreiben",
      subtitle: "Lena reparte turnos — cuaderno: quién dice la causa",
      minutes: 16,
      sections: [
        {
          kind: "phrases",
          title: "Lo que va a sonar en la Winsstraße",
          itemIds: ["b2m11tagesordnung", "b2m11fadenverlieren", "b2m11hinzufuegen", "b2m11rueckmeldung", "b2m11sichabstimmen"],
        },
        {
          kind: "note",
          note: {
            title: "Anota la atribución, no la anécdota",
            body: "Vas a oír a Lena Krüger, Clara Hofmann, Herr Vogel, Sofía y Kai Bergmann. Los nombres van en el audio. En el examen, no. Apunta: <b>quién formula la Kernaussage</b> y <b>qué pide Lena para el protocolo</b> (ohne Wertung).",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m11l7e1", type: "audiomc", prompt: "Asamblea. Pregunta ANTES. Cuaderno. Dos escuchas.",
              audio: DEBATTE_PROTOKOLL,
              question: "Was ist Punkt zwei der Tagesordnung?",
              options: ["Die Farbe der Haltestelle", "Nachtbus versus Parkplätze in der Winsstraße", "Das Jobticket der Küche"],
              answer: 1,
              plays: 2,
              notepad: true,
              whyWrong: ["Eso Hofmann dice que se deja fuera", null, "Eso era el m9"],
              itemIds: ["b2m11tagesordnung"],
            },
            {
              id: "b2m11l7e2", type: "audiomc", prompt: "La consigna de Lena a Sofía.",
              audio: DEBATTE_PROTOKOLL,
              question: "Was bittet Lena Sofía für das Protokoll?",
              options: ["Mit ihrer Meinung", "Ohne Wertung", "Mit einem Witz über Vogel"],
              answer: 1,
              plays: 2,
              notepad: true,
              whyWrong: ["Lo contrario", null, "Tampoco"],
              itemIds: ["b2m11ohnewertung", "b2m5protokoll"],
            },
            {
              id: "b2m11l7e3", type: "audiomc", prompt: "Dónde coinciden, según Lena.",
              audio: DEBATTE_PROTOKOLL,
              question: "Worin stimmen beide Texte laut Lena überein?",
              options: ["Dass der Bus kommen muss", "Dass nachts etwas fehlt", "Dass der Laden schließen soll"],
              answer: 1,
              plays: 2,
              notepad: true,
              whyWrong: ["Eso es Hofmann, no el acuerdo", null, "Eso sería malinterpretar a Vogel"],
              itemIds: ["b2m11stimmenueberein"],
            },
            {
              id: "b2m11l7e4", type: "audiomc", prompt: "La Rückmeldung de Kai.",
              audio: DEBATTE_PROTOKOLL,
              question: "Was soll das Protokoll laut Kai hinzufügen?",
              options: [
                "Dass der Betriebsrat den Bus unterstützt, die Anwohner aber nicht überstimmt werden dürfen",
                "Dass Vogel das Auto verehrt",
                "Dass die Haltestelle rot sein soll",
              ],
              answer: 0,
              plays: 2,
              notepad: true,
              whyWrong: [null, "Kai no dice eso", "El color se había descartado"],
              itemIds: ["b2m11hinzufuegen", "b2m11rueckmeldung"],
            },
            {
              id: "b2m11l7e5", type: "audiomc", prompt: "El resumen de Lena. ¿Quién dice qué?",
              audio: DEBATTE_PROTOKOLL,
              question: "Wie lautet Lenas Zusammenfassung?",
              options: [
                "Nachtnetz nein, Parkraum ja",
                "Nachtnetz ja, Parkraum nicht ersatzlos streichen",
                "Nur der Bus, ohne Kompromiss",
              ],
              answer: 1,
              plays: 2,
              notepad: true,
              whyWrong: ["Al revés", null, "Ella pide las dos cosas en tensión"],
              itemIds: ["b2m11natfasse", "b2m1zusammenfassen"],
            },
            {
              id: "b2m11l7e6", type: "shadow", prompt: "Sombrea la frase de Sofía",
              text: "Mit anderen Worten: es fehlt ein Kompromiss, nicht ein Feind.",
              phonetic: "mit AN-de-ren VOA-ten: es feelt ain kom-pro-MIS, nijt ain FAINT",
              translation: "Dicho de otro modo: falta un acuerdo, no un enemigo.",
              reps: 2,
              itemIds: ["b2m11mitanderenworten"],
            },
            {
              id: "b2m11l7e7", type: "cloze", prompt: "Lo que Vogel pide al final",
              text: "Schreiben Sie das nicht als meine Meinung, sondern als den Stand der ___.",
              answers: ["Besprechung"],
              itemIds: ["b2m11besprechung"],
            },
            {
              id: "b2m11l7e8", type: "type", prompt: "Cierre de oído",
              question: "Resumo en breve el contenido esencial: red nocturna sí, sin quitar el aparcamiento sin recambio",
              answers: [
                "Ich fasse den wesentlichen Inhalt kurz zusammen: Nachtnetz ja, Parkraum nicht ersatzlos streichen",
                "Ich fasse den wesentlichen Inhalt kurz zusammen: Nachtnetz ja, Parkraum nicht ersatzlos streichen.",
              ],
              itemIds: ["b2m11natfasse", "b2m11wesentlicherinhalt"],
            },
          ],
        },
      ],
    },

    {
      id: "b2m11l8",
      phaseId: "b2m11",
      title: "Schreiben: el acta y el foro",
      subtitle: "100 de Sie al distrito, 150 de foro — las dos piden resumir y contrastar",
      minutes: 22,
      sections: [
        {
          kind: "phrases",
          title: "Lo que tiene que verse en los dos textos",
          itemIds: ["b2m11zusammenfassend", "b2m11zufolge", "b2m11imgegensatzzu", "b2m11uebertragen", "b2m11stellungnahmeab"],
        },
        {
          kind: "note",
          note: {
            title: "La Nachricht transmite; el foro toma postura después de transmitir",
            body: "Hoy las dos tareas. La formal: una Nachricht al Bezirksamt con el <b>contenido esencial</b> de las dos fuentes, sin tu bando. El foro: reaccionas a un comentario que ha mezclado las dos posturas en un solo enemigo. En el foro sí hay opinión — <b>después</b> de haber resumido las dos posturas. Si opinas antes de resumir, el tercero no tiene sobre qué decidir.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m11l8e1", type: "mc", prompt: "Qué género estás escribiendo",
              question: "La Nachricht al distrito debe…",
              options: ["Elegir bando con ich finde", "Wiedergeben ambas Kernaussagen, ohne Wertung", "Copiar el artículo de Hofmann"],
              answer: 1,
              whyWrong: ["Eso es el foro, y ni siquiera al principio", null, "Collage"],
              itemIds: ["b2m11wiedergeben", "b2m11ohnewertung"],
            },
            {
              id: "b2m11l8e2", type: "write", prompt: "Aufgabe 2 — Nachricht al Bezirksamt. Unas 100 palabras, Sie, ohne Wertung.",
              scenario: "Escribes a Frau Lindner, Bezirksamt Prenzlauer Berg: resume para ella —que no ha estado en la asamblea— las dos posturas sobre el Nachtbus y los Parkplätze. Sin tu opinión. Anrede y Grußformel.",
              genre: "mail-formal",
              register: "Sie",
              frame: [
                "Anrede: Sehr geehrte Frau Reuter,",
                "Por qué escribes: Protokoll / Besprechung",
                "Dato compartido: beide stimmen überein",
                "Contraste: im Gegensatz zu / wohingegen",
                "Fazit sin bando",
                "Grußformel",
              ],
              bullets: [
                "Abre con Anrede y cierra con Grußformel",
                "Di que ambas partes ven una laguna nocturna",
                "Nombra las dos Kernaussagen (conexión nocturna / halt ante la tienda)",
                "No cueles ich finde ni un bando",
              ],
              checks: [
                { re: "Sehr geehrte.*Mit freundlichen Grüßen", label: "Anrede y Grußformel" },
                { re: "(überein|beide|nachts|Nacht)", label: "dato compartido" },
                { re: "(Gegensatz|wohingegen|demgegenüber|einerseits|andererseits)", label: "contraste" },
                { re: "(Bus|Linie|Halt|Laden|Park)", label: "las dos demandas" },
              ],
              minWords: 90,
              maxWords: 125,
              requireConnectors: { min: 2, bank: ["weil", "außerdem", "deshalb", "aber"] },
              rubric: ["erfuellung", "kohaerenz", "wortschatz", "strukturen"],
              model: "Sehr geehrte Frau Reuter, hiermit übermittle ich Ihnen das Wesentliche der Besprechung in der Winsstraße. Beide Seiten stimmen darin überein, dass nachts etwas fehlt. Im Gegensatz zu Frau Hofmann, die eine Nachtlinie für die Schicht fordert, nennt Herr Vogel den Halt vor dem Laden, weil der Einzelhandel den Halt braucht. Die Diskrepanz liegt in der Reihenfolge, nicht im Willen, und deshalb gehören beide Lücken auf die Tagesordnung. Außerdem bitte ich um eine Rückmeldung, sobald der Punkt terminiert ist. Ein Fazit ohne Wertung: der Bezirk hat zwei Forderungen, nicht einen Feind. Mit freundlichen Grüßen\nSofía Marín",
              itemIds: ["b2m11stimmenueberein", "b2m11imgegensatzzu", "b2m11diskrepanz", "b2m11wesentlicherinhalt"],
            },
            {
              id: "b2m11l8e3", type: "write", prompt: "Aufgabe 1 — Forumsbeitrag. Unas 150 palabras. Primero resume las dos posturas, luego opina.",
              scenario: "En el foro del barrio alguien ha escrito que Vogel odia el bus y Hofmann odia las tiendas. Escribe tu comentario: corrige esa síntesis, da las dos Kernaussagen y después tu postura.",
              genre: "forum",
              register: "du",
              stimulus: {
                author: "Mira, Forum Winsstraße",
                text: "Vogel will kein Bus, Hofmann will keine Läden. Typisch. Entweder die Schicht oder der Kiez.",
              },
              frame: [
                "Reacción: so einfach ist das nicht",
                "Mediación: beide sehen eine Lücke",
                "Contraste: im Gegensatz zu / wohingegen",
                "Tu postura DESPUÉS",
                "Cierre: Kompromiss, nicht Feind",
              ],
              bullets: [
                "Reacciona al comentario de Mira",
                "Resume las dos posturas sin convertirlas en enemigos",
                "Usa un conector de contraste (im Gegensatz zu / wohingegen / demgegenüber)",
                "Da tu opinión solo después de haber resumido las dos posturas",
              ],
              checks: [
                { re: "(Mira|Beitrag|gelesen|Forum)", label: "reacción" },
                { re: "(überein|beide|Lücke|fehlt)", label: "dato compartido" },
                { re: "(Gegensatz|wohingegen|demgegenüber)", label: "contraste" },
                { re: "(Meiner Meinung nach|Ich bin der Meinung|Ich finde|überzeugt)", label: "postura después" },
              ],
              minWords: 135,
              maxWords: 175,
              requireConnectors: { min: 3, bank: ["weil", "allerdings", "aber", "deshalb", "außerdem", "trotzdem"] },
              rubric: ["erfuellung", "kohaerenz", "wortschatz", "strukturen"],
              model: "Mira, ich habe deinen Beitrag gelesen, und so einfach ist das nicht. Beide Seiten stimmen darin überein, dass nachts etwas fehlt. Im Gegensatz zu deinem Satz will Hofmann nicht die Läden abschaffen, und Vogel ist nicht gegen den Bus. Die eine Kernaussage ist die Verbindung für die Nachtschicht, die andere der Halt vor der Tür. Allerdings wird aus zwei Lücken schnell ein Feindbild, und genau das ist keine Vermittlung. Meiner Meinung nach gehört beides auf die Tagesordnung, weil eine Linie ohne Kunden den Kiez auch nicht rettet. Deshalb wünsche ich mir einen Kompromiss, nicht ein Entweder-oder. Trotzdem danke fürs Anstoßen — nur bitte ohne Karikatur, denn der Dritte versteht sonst nur den Streit und nicht den Inhalt. Wer vermittelt, lässt beide Kernaussagen stehen; wer karikiert, hat schon gewählt, bevor der Dritte überhaupt zuhört und entscheiden kann.",
              itemIds: ["b2m11stimmenueberein", "b2m11imgegensatzzu", "b2m11kernaussage", "b2m5vermitteln"],
            },
            {
              id: "b2m11l8e4", type: "paraphrase", prompt: "Al español, para Lucía, que no ha leído los originales",
              source: "Beide Seiten sehen nachts eine Lücke; die Diskrepanz liegt in der Ursache.",
              forbid: ["Lücke", "Diskrepanz", "Ursache", "Seiten"],
              answers: [
                "Las dos partes echan en falta algo por la noche; no se ponen de acuerdo en el porqué.",
                "A las dos les falta algo de noche, y se separan en el motivo.",
              ],
              translation: "Las dos partes echan en falta algo por la noche; no se ponen de acuerdo en el porqué.",
              itemIds: ["b2m11uebertragen", "b2m11derdritte"],
              tip: "Lucía no ha leído el alemán: el contenido tiene que sobrevivir en castellano. En el Goethe B2 de 2019 esa misma operación se cobra en Lesen y Schreiben, en alemán.",
            },
            {
              id: "b2m11l8e5", type: "gapbank", prompt: "El esqueleto de la Nachricht",
              text: "Beide stimmen darin ___, dass nachts etwas fehlt. Im Gegensatz ___ Hofmann nennt Vogel den Halt. Das ___ übermittle ich ohne Wertung.",
              answers: ["überein", "zu", "Fazit"],
              bank: ["überein", "zu", "Fazit", "aber", "von", "Kumpel"],
              itemIds: ["b2m11stimmenueberein", "b2m11imgegensatzzu", "b2m11fazit"],
            },
            {
              id: "b2m11l8e6", type: "type", prompt: "Cierre",
              question: "Según el acta se pide el bus y el halt; yo me abstengo de opinar",
              answers: [
                "Laut dem Protokoll werden der Bus und der Halt gefordert; ich enthalte mich der eigenen Meinung",
                "Laut dem Protokoll werden der Bus und der Halt gefordert; ich enthalte mich der eigenen Meinung.",
              ],
              itemIds: ["b2m11lautem", "b2m11sichenthalten"],
            },
          ],
        },
      ],
    },

    {
      id: "b2m11l9",
      phaseId: "b2m11",
      title: "Vortrag: zwei Texte, ein Dritter",
      subtitle: "Cuatro minutos de síntesis — y luego preguntas",
      minutes: 18,
      sections: [
        {
          kind: "phrases",
          title: "Abrir, atribuir, contrastar, cerrar",
          itemIds: ["b2m5vermitteln", "b2m11natfasse", "b2m11moderation", "b2m11wesentlicherinhalt", "b2m11natalsoquasi"],
        },
        {
          kind: "note",
          note: {
            title: "Zwei Texte, ein Protokoll, und Lucía in Valencia",
            body: "<i>Lee en voz alta. El esqueleto de hoy es el de la síntesis, no el de la opinión.</i><br/><br/>Lena Krüger erteilte Hofmann das Wort und danach Vogel. Beide sahen nachts eine [[Lücke|laguna]]; sie nannten nicht dieselbe. Hofmann forderte die Verbindung für die Schicht. Vogel den [[Halt vor der Tür|aparcamiento ante la puerta]]. Sofía schrieb das [[Protokoll|acta]] ohne Wertung: Forderungen hinein, Adjektive raus. Die [[Diskrepanz|discrepancia]] ließ sie stehen. Einen Feind setzte sie nicht.<br/><br/>Kai bat, den [[Betriebsrat|comité de empresa]] und die Anwohner hinzuzufügen. Nicht weil er eine Seite wählte. Weil ein Protokoll, das eine Partei unsichtbar lässt, schon Partei ergriffen hat und es Zusammenfassung nennt. Lena notierte es. Zusammenfassend ließ sich sagen: zwei Lücken, eine Straße.<br/><br/>Lucía Ortega in Valencia bekam denselben Inhalt auf Spanisch, ohne die Wörter des Originals. Wenn der Inhalt die Sprache wechselt und überlebt, war es ein [[wesentlicher Inhalt|contenido esencial]]. Wenn nur Hofmanns Adjektive überleben, war es ein Leserbrief mit Datum. Der [[Dritte|tercero]] muss verstehen, was gefordert wird — auch wenn er in einer anderen Sprache liest.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m11l9e1", type: "order", prompt: "El relato de la Winsstraße",
              sentences: [
                "Lena Krüger erteilte Hofmann das Wort und danach Vogel.",
                "Sofía schrieb das Protokoll ohne Wertung.",
                "Kai bat, den Betriebsrat und die Anwohner hinzuzufügen.",
                "Lucía in Valencia bekam denselben Inhalt auf Spanisch, ohne die Wörter des Originals.",
              ],
              itemIds: ["b2m11worterteilen", "b2m5protokoll", "b2m11hinzufuegen", "b2m11uebertragen"],
            },
            {
              id: "b2m11l9exi1", type: "mc", prompt: "Inferencia: el español de Lucía",
              question: "Lucía recibe el mismo contenido en español, sin las palabras del original. ¿Qué demuestra eso que el «ohne Wertung» del acta no llega a decir?",
              options: [
                "Que Lucía habla mejor alemán que Sofía y por eso no necesita el original",
                "Que el Bezirksamt ha pedido una versión en español",
                "Que el contenido sobrevivió al cambio de lengua: si solo viajan los adjetivos de Hofmann, no era un resumen",
              ],
              answer: 2,
              whyWrong: [
                "Lucía lee el resultado, no el original; el relato no compara niveles",
                "Nadie en el Amt pide castellano; Lucía es la amiga del intercambio",
                null,
              ],
              itemIds: ["b2m11uebertragen", "b2m11wesentlicherinhalt", "b2m11derdritte"],
            },
            {
              id: "b2m11l9exi2", type: "mc", prompt: "Inferencia: por qué Kai añade y no elige",
              question: "Kai pide añadir el Betriebsrat y los vecinos. ¿Por qué no elige bando?",
              options: [
                "Porque el oficio del acta no es elegir: es no volver invisible a una parte",
                "Porque detesta a Hofmann y no quiere firmar su bus",
                "Porque Lena ha olvidado la fecha de la votación",
              ],
              answer: 0,
              whyWrong: [
                null,
                "Kai apoya el bus en la tertulia; aquí pide visibilidad, no un enemigo",
                "La votación es la semana siguiente; nadie ha perdido el calendario",
              ],
              itemIds: ["b2m11hinzufuegen", "b2m5protokoll", "b2m11ohnewertung"],
            },
            {
              id: "b2m11l9e2", type: "match", prompt: "Tramo del Vortrag y fórmula",
              pairs: [
                { target: "Ich fasse den wesentlichen Inhalt kurz zusammen.", source: "entrada / cierre" },
                { target: "Beide Texte stimmen darin überein, dass …", source: "acuerdo" },
                { target: "Im Gegensatz zu A behauptet B …", source: "contraste" },
                { target: "Die Diskrepanz liegt in …", source: "grieta" },
              ],
              itemIds: ["b2m11natfasse", "b2m11stimmenueberein", "b2m11imgegensatzzu", "b2m11diskrepanz"],
            },
            {
              id: "b2m11l9e3", type: "monologue", prompt: "Vortrag de 4 minutos. Planifica, habla, repite.",
              topic: "Zwei Texte, ein Protokoll: was der Dritte wissen muss",
              slides: [
                { title: "Einstieg", hint: "Zwei Quellen zur Winsstraße. Ein Dritter, der sie nicht gelesen hat. Ich fasse zusammen, ich wähle nicht." },
                { title: "Übereinstimmung", hint: "Beide sehen nachts eine Lücke." },
                { title: "Gegensatz", hint: "Hofmann: Verbindung für die Schicht. Vogel: Halt vor dem Laden. wohingegen / im Gegensatz zu." },
                { title: "Diskrepanz", hint: "Nicht der Wille — die Reihenfolge der Lücken. Was ins Protokoll gehört, was nicht." },
                { title: "Schluss und Fragen", hint: "Zusammenfassend … Ich stehe für Fragen zur Verfügung." },
              ],
              planSeconds: 180,
              speakSeconds: 240,
              reps: 2,
              checklist: [
                "Presenté dos fuentes y un tercero que no las ha leído",
                "Di el acuerdo (nachts eine Lücke) antes del contraste",
                "Nombré las dos Kernaussagen con im Gegensatz zu o wohingegen",
                "Marqué la Diskrepanz sin elegir bando — o marqué la opinión como mía y al final",
                "Cerré ofreciendo preguntas y hablé cerca de 4 minutos en las dos pasadas",
              ],
              model: "Einstieg (modelo): „Ich möchte Ihnen zwei Texte zur Winsstraße wiedergeben, für einen Dritten, der sie nicht gelesen hat. Beide stimmen darin überein, dass nachts etwas fehlt. Im Gegensatz zu Clara Hofmann, die eine Nachtlinie für die Schicht fordert, nennt Herr Vogel den Halt vor dem Laden. Die Diskrepanz liegt in der Reihenfolge, nicht im Charakter. Ins Protokoll gehören die Forderungen, nicht die Adjektive. Zusammenfassend lässt sich sagen: zwei Lücken, ein Kiez. Ich stehe Ihnen nun für Fragen zur Verfügung.“",
              itemIds: ["b2m5vermitteln", "b2m11derdritte", "b2m11stimmenueberein", "b2m11natfasse"],
            },
            {
              id: "b2m11l9e4", type: "gapbank", prompt: "El hilo del Vortrag",
              text: "Ich ___ den wesentlichen Inhalt. Beide stimmen darin ___. Die ___ lasse ich stehen, meine Meinung halte ich zurück.",
              answers: ["fasse", "überein", "Diskrepanz"],
              bank: ["fasse", "überein", "Diskrepanz", "kriege", "Jänner", "Farbe"],
              itemIds: ["b2m1zusammenfassen", "b2m11stimmenueberein", "b2m11diskrepanz"],
            },
            {
              id: "b2m11l9e5", type: "paraphrase", prompt: "Última reformulación, sin quasi",
              source: "Also quasi brauchen wir beides.",
              forbid: ["quasi", "beides", "brauchen"],
              answers: [
                "Mit anderen Worten ist ein Kompromiss nötig.",
                "Kurz gesagt fehlt eine Lösung, die beide Lücken kennt.",
              ],
              itemIds: ["b2m11mitanderenworten", "b2m11natalsoquasi"],
            },
            {
              id: "b2m11l9e6", type: "type", prompt: "Última frase del módulo",
              question: "Resumo el contenido esencial y me abstengo de opinar",
              answers: [
                "Ich fasse den wesentlichen Inhalt zusammen und enthalte mich der eigenen Meinung",
                "Ich fasse den wesentlichen Inhalt zusammen und enthalte mich der eigenen Meinung.",
              ],
              itemIds: ["b2m11natfasse", "b2m11sichenthalten", "b2m11wesentlicherinhalt"],
            },

            {
              id: "b2m11l9ex81", type: "write", prompt: "Aufgabe 2 · Nachricht Sie. Off-topic = 0.",
              scenario: "Eres Sofía. Escribes a Frau Reuter (Bezirksamt) un acta: dos fuentes sobre el bus de noche, sin tu opinión. Resume, contrasta, pide una fecha. Off-topic = 0.",
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
              model: "Sehr geehrte Frau Reuter,\nlaut Hofmann braucht der Kiez den Halt vor der Tür; Vogel dagegen fürchtet, der Takt werde dünner, nicht dichter. Beide stimmen darin überein, dass der letzte Bus zu früh geht. Die Diskrepanz liegt in der Finanzierung, nicht im Charakter. Deshalb bitte ich Sie, uns bis zum 12. einen Termin zu nennen, an dem beide Zahlen auf dem Tisch liegen. Außerdem sollte das Protokoll ohne meine Meinung rausgehen, weil Sie nicht da waren. Allerdings ersetze ich keine Beschlussvorlage. Ich stehe für Rückfragen gern zur Verfügung.\nMit freundlichen Grüßen\nSofía Marín",
              itemIds: [],
              tip: "Menos de 50 palabras o tema equivocado: 0. Ni un du.",
            },
            {
              id: "b2m11l9ex82", type: "write", prompt: "Aufgabe 1 · Forumsbeitrag. Off-topic = 0.",
              scenario: "Foro del barrio: alguien dice que Vogel odia el bus y Hofmann las tiendas. Tú resumes sin copiar y contrastas. Off-topic = 0.",
              genre: "forum",
              stimulus: { author: "Mira T.", text: "Vogel hasst den Bus, Hofmann hasst die Läden. Mehr steht in den Texten nicht. Wer das zusammenfasst, soll sich endlich auf eine Seite stellen." },
              bullets: [
                "Concede un punto a Mira T. y marca el desacuerdo.",
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
              model: "Zu dem Beitrag von Mira T. möchte ich Folgendes sagen: Zwar klingen die zwei Texte scharf. Allerdings hasst niemand den Bus: Hofmann fordert den Halt, Vogel warnt vor einem Takt ohne Geld. Ein Vorteil des Kontrasts ist, dass man sieht, wo sie übereinstimmen — der letzte Bus geht zu früh. Ein Nachteil des «Hass»-Satzes ist, dass er die Diskrepanz durch ein Adjektiv ersetzt. Deshalb sollte ein Protokoll erst den Punkt nennen, in dem beide recht haben, und dann die Grietas. Außerdem müsste man zufolge und laut benutzen, nicht «ich finde». Ich plädiere dafür, zu übertragen ohne zu kopieren, weil der Dritte die Originale nicht hat. Wer sich auf eine Seite stellt, hat zusammengefasst, bevor er gelesen hat. Nur so bleibt die Sache nachvollziehbar. Das ist die Mindestanforderung an ein Protokoll, das jemand in drei Monaten noch verstehen soll. Das ist die Mindestanforderung an ein Protokoll, das jemand in drei Monaten noch verstehen soll.",
              itemIds: [],
              tip: "150 palabras: intro, concesión, dos argumentos, propuesta, cierre. Off-topic = 0.",
            },

            {
              id: "b2m11l9extra1", type: "errorfix", prompt: "wohingegen manda el verbo al final.",
              wrong: "Hofmann will den Bus, wohingegen Vogel will die Läden.",
              answers: ["Hofmann will den Bus, wohingegen Vogel die Läden will."],
              why: "wohingegen es conjunción: el verbo va al final de su mitad.",
              translation: "Hofmann quiere el bus, mientras que Vogel quiere los locales.",
              itemIds: []
            },
            {
              id: "b2m11l9extra2", type: "transform", prompt: "Contrastar",
              source: "A will X, B will Y.",
              instruction: "Reescríbelo en registro de examen.",
              answers: ["Im Gegensatz zu A fordert B Y."],
              translation: "im Gegensatz zu",
              itemIds: [],
            },
            {
              id: "b2m11l9extra3", type: "errorfix", prompt: "Sin opinión en el acta.",
              wrong: "Ich finde, der Halt fehlt.",
              answers: ["Laut Hofmann fehlt der Halt."],
              why: "El protocolo atribuye. Ich finde es tu firma, y no te la piden.",
              translation: "Según Hofmann falta la parada.",
              itemIds: []
            },
            {
              id: "b2m11l9extra4", type: "transform", prompt: "Atribuir",
              source: "Laut dem Artikel fehlt der Takt.",
              instruction: "Reescríbelo en registro de examen.",
              answers: ["Dem Artikel zufolge fehlt der Takt."],
              translation: "zufolge detrás",
              itemIds: [],
            },          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-b2m11-4",
            book: "Ich erkläre es dir.",
            real: "Ich sag's dir mal ganz einfach.",
            meaning: "Te lo digo en plata / te lo dejo fácil.",
            when: "Para bajar el registro con un igual, cuando el original era denso. En el Vortrag y en el protocolo: Ich fasse den wesentlichen Inhalt kurz zusammen. «Ganz einfach» delante de un examinador suena a que le hablas como a un niño.",
            register: "amigos",
            exam: "Ich fasse den wesentlichen Inhalt kurz zusammen.",
            note: "Reformular hacia abajo (calle) y reformular hacia el Lesen o el Schreiben son la misma operación en dos trajes. El Goethe B2 de 2019 no tiene Sprachmittlung; cobra esta operación en esas dos pruebas. El m10 te enseñó a no mezclar los trajes; este módulo te enseña a hacer los dos.",
            sound: "ij zaks dia mal gants AIN-faj",
            level: "b2",
            produce: true,
            itemId: "b2m11natfasse",
          },
        },
      ],
    },
  ],
};
