import type { Phase, VocabItem } from "@/lib/types";

const GESPRAECH_BESCHEID =
  "Herr Vogel, guten Abend — Sie wollten mir den Bescheid zeigen. | Ja, Frau Marín. Kommen Sie rein. Der liegt auf dem Tisch, Aktenzeichen B 14-338. Ich hab Widerspruch eingelegt, schriftlich, innerhalb der Frist. | Innerhalb von einem Monat, nicht? | Genau. Angesichts der Begründung, die das Amt da hineingeschrieben hat, blieb mir nichts anderes übrig. Hinsichtlich der Miete tun sie so, als läge ich über dem Mietspiegel. Ich liege darunter. | Bezüglich welcher Wohnung denn — Ihrer, hier, dritter Stock? | Meiner, ja. Infolge einer Anzeige des Vermieters, Eigenbedarf. Seitens der Hausverwaltung kam nichts Schriftliches, nur ein Anruf. Anhand der Zahlen im Mietspiegel, die ich ausgedruckt habe, hält das nicht. | Und das Amt sagt? | Das Amt sagt, mangels vollständiger Unterlagen könne man nicht entscheiden. Mangels! Ich habe alles abgegeben. Mittels eines Einschreibens, im Zuge der Anmeldung habe ich sogar die alte Meldebescheinigung beigelegt. | Das muss ja ein Fehler gewesen sein. | Das dürfte Absicht sein, oder Schlamperei, das ist mir inzwischen wurscht. Zugunsten des Vermieters wird jeder Zweifel ausgelegt, das sehe ich so. | Herr Vogel, wegen des Lärms von unten haben Sie sich schon mal beschwert, oder? | Wegen dem Lärm, ja. Da mach ich Stress, wenn's sein muss. Also, die Miete — die ist das eine. Der Eigenbedarf ist das andere. Der Vermieter hat keine Papiere, der hat nix in der Hand, außer einem Satz im Brief. | Hiermit legen Sie Widerspruch ein, das haben Sie schon. Was jetzt? | Jetzt warte ich. Sofern der Bescheid rechtskräftig wird, ohne dass jemand die Akte liest, ziehe ich vor die Schlichtung. Ich bin zuständig für meine Wohnung, nicht er. | Das Amt ist zuständig für den Bescheid. | Das Amt ist zuständig, ja. Ob es das auch tut, steht auf einem anderen Blatt. In Kraft tritt das erst, wenn die Frist abläuft. Und die läuft nächste Woche ab, wenn niemand antwortet. | Dann notieren wir das. Ich kann mit zur Sprechstunde, Donnerstag. | Tun Sie das. Junges Volk geht nicht mehr hin. Wir Alten schon. Das Haus gehört nicht dem, der am lautesten Eigenbedarf sagt. Das notiert Sofía, und dann gehen sie.";

// B2 MÓDULO 8 — Wem gehört die Stadt?: el genitivo culto y la frase de
// tres pisos. El Amtsdeutsch es la nominalización del m3 un escalón más
// arriba: preposiciones de genitivo, subordinadas anidadas, el Vorfeld
// cuando la subordinada abre. Recicla b1m8gefrist, b1m8gekuendigung,
// b1m1laerm, b1m1kaltmiete, b1m1mietvertrag, b1m1sichanmelden,
// b1m8gesichbeschweren, b1m1wohnungsnot. Prefijo b2m8. Herr Vogel es el
// contrapunto generacional; Oma Ilse no vuelve.

export const vocabB2m8: Record<string, VocabItem> = {
  b2m8angesichts: {
    id: "b2m8angesichts", target: "angesichts (+ Genitiv)", source: "ante / a la vista de", sound: "an-GUE-zijts",
    gram: { trap: "angesichts von dem Lärm" },
  },
  b2m8hinsichtlich: { id: "b2m8hinsichtlich", target: "hinsichtlich (+ Genitiv)", source: "en lo que respecta a / respecto de", sound: "HIN-zijt-lij" },
  b2m8bezuglich: { id: "b2m8bezuglich", target: "bezüglich (+ Genitiv)", source: "con respecto a (cartas de la administración)", sound: "be-TSÜK-lij" },
  b2m8infolge: { id: "b2m8infolge", target: "infolge (+ Genitiv)", source: "a consecuencia de", sound: "in-FOL-gue" },
  b2m8behoerde: { id: "b2m8behoerde", target: "die Behörde", source: "la administración / el organismo oficial", article: "die", plural: "Behörden", sound: "be-HÖA-de" },
  b2m8bescheid: { id: "b2m8bescheid", target: "der Bescheid", source: "la resolución (lo que te contesta el Amt)", article: "der", plural: "Bescheide", sound: "be-SHAIT" },
  b2m8mangels: {
    id: "b2m8mangels", target: "mangels (+ Genitiv)", source: "a falta de / por falta de", sound: "MANG-els",
    gram: { trap: "mangels von Unterlagen" },
  },
  b2m8zugunsten: { id: "b2m8zugunsten", target: "zugunsten (+ Genitiv)", source: "en favor de", sound: "tsu-GUN-sten" },
  b2m8seitens: { id: "b2m8seitens", target: "seitens (+ Genitiv)", source: "de parte de (una institución)", sound: "ZAIT-ens" },
  b2m8anhand: { id: "b2m8anhand", target: "anhand (+ Genitiv)", source: "a partir de / con ayuda de (unos datos)", sound: "an-HANT" },
  b2m8mittels: { id: "b2m8mittels", target: "mittels (+ Genitiv)", source: "mediante / por medio de", sound: "MI-tels" },
  b2m8imzuge: { id: "b2m8imzuge", target: "im Zuge (+ Genitiv)", source: "en el marco de / en el transcurso de", sound: "im TSUU-gue" },
  b2m8widerspruch: { id: "b2m8widerspruch", target: "der Widerspruch", source: "el recurso (contra un Bescheid)", article: "der", plural: "Widersprüche", sound: "VII-da-shpruj" },
  b2m8laermbelaestigung: { id: "b2m8laermbelaestigung", target: "die Lärmbelästigung", source: "las molestias por ruido", article: "die", sound: "LEAM-be-les-ti-gung" },
  b2m8mietspiegel: { id: "b2m8mietspiegel", target: "der Mietspiegel", source: "el índice de alquileres de la ciudad", article: "der", sound: "MIIT-shpii-guel" },
  b2m8eigenbedarf: { id: "b2m8eigenbedarf", target: "die Eigenbedarfskündigung", source: "el desahucio por necesidad propia del casero", article: "die", plural: "Eigenbedarfskündigungen", sound: "AI-guen-be-darfs-kün-di-gung" },
  b2m8aufenthaltserlaubnis: { id: "b2m8aufenthaltserlaubnis", target: "die Aufenthaltserlaubnis", source: "el permiso de residencia", article: "die", plural: "Aufenthaltserlaubnisse", sound: "AUF-ent-halts-er-laup-nis" },
  b2m8anmeldungamt: { id: "b2m8anmeldungamt", target: "die Anmeldung (beim Bürgeramt)", source: "el empadronamiento (el trámite en el Amt)", article: "die", sound: "AN-mel-dung" },
  b2m8genehmigung: { id: "b2m8genehmigung", target: "die Genehmigung", source: "la autorización / el permiso administrativo", article: "die", plural: "Genehmigungen", sound: "gue-NEE-mi-gung" },
  b2m8bebauungsplan: { id: "b2m8bebauungsplan", target: "der Bebauungsplan", source: "el plan urbanístico (qué se puede construir)", article: "der", plural: "Bebauungspläne", sound: "be-BAU-ungs-plaan" },
  b2m8gemeinde: { id: "b2m8gemeinde", target: "die Gemeinde", source: "el municipio (el ayuntamiento pequeño)", article: "die", plural: "Gemeinden", sound: "gue-MAIN-de" },
  b2m8zustaendig: { id: "b2m8zustaendig", target: "zuständig sein für", source: "ser el competente para (un trámite)", sound: "TSÜS-ten-dij zain füa" },
  b2m8inkrafttreten: { id: "b2m8inkrafttreten", target: "in Kraft treten", source: "entrar en vigor", sound: "in kraft TREE-ten" },
  b2m8haettegestelltwerdenmuessen: {
    id: "b2m8haettegestelltwerdenmuessen", target: "weil der Antrag hätte gestellt werden müssen", source: "porque la solicitud tendría que haber sido presentada (tres pisos)", sound: "vail dea AN-traak JE-te gue-SHTELT VEA-den MÜ-sen",
    gram: { trap: "weil der Antrag gestellt werden müssen hätte" },
  },
  b2m8rechtskraeftig: { id: "b2m8rechtskraeftig", target: "rechtskräftig", source: "firme (una resolución que ya no se puede recurrir)", sound: "REJTS-kref-tij" },
  b2m8widerspruchsfrist: { id: "b2m8widerspruchsfrist", target: "die Widerspruchsfrist", source: "el plazo para recurrir", article: "die", sound: "VII-da-shprujs-frist" },
  b2m8aktenzeichen: { id: "b2m8aktenzeichen", target: "das Aktenzeichen", source: "el número de expediente", article: "das", plural: "Aktenzeichen", sound: "AK-ten-tsai-jen" },
  b2m8sachbearbeiter: { id: "b2m8sachbearbeiter", target: "der Sachbearbeiter / die Sachbearbeiterin", source: "el funcionario / la funcionaria que lleva tu caso", article: "der", plural: "Sachbearbeiter", sound: "ZAJ-be-ar-bai-ta" },
  b2m8sozialwohnung: { id: "b2m8sozialwohnung", target: "die Sozialwohnung", source: "la vivienda protegida (Alemania)", article: "die", plural: "Sozialwohnungen", sound: "zo-tsi-AAL-voo-nung" },
  b2m8gemeindewohnung: { id: "b2m8gemeindewohnung", target: "die Gemeindewohnung (österr.)", source: "la vivienda municipal — palabra austriaca", article: "die", plural: "Gemeindewohnungen", sound: "gue-MAIN-de-voo-nung" },
  b2m8verdrangung: { id: "b2m8verdrangung", target: "die Verdrängung", source: "la expulsión del barrio por el precio (gentrificación)", article: "die", sound: "fea-DRENG-ung" },
  b2m8wohnraum: { id: "b2m8wohnraum", target: "der Wohnraum", source: "el parque de vivienda / el espacio habitable", article: "der", sound: "VOON-raum" },
  b2m8hiermitwiderspruch: { id: "b2m8hiermitwiderspruch", target: "Hiermit lege ich Widerspruch ein", source: "Por la presente interpongo recurso", sound: "HIIA-mit LEE-gue ij VII-da-shpruj ain" },
  b2m8natwegendem: { id: "b2m8natwegendem", target: "Wegen dem Lärm", source: "Por el ruido (dativo coloquial, muy extendido)", sound: "VEE-guen deem leam" },
  b2m8natstress: { id: "b2m8natstress", target: "Da mach ich Stress", source: "Por eso armo jaleo / no me quedo quieto", sound: "da maj ij shtres" },
  b2m8natalso: { id: "b2m8natalso", target: "Also, die Miete …", source: "Bueno, el alquiler… (abre el tema en voz alta)", sound: "AL-zo, di MII-te" },
  b2m8natnixinderhand: { id: "b2m8natnixinderhand", target: "Der hat nix in der Hand", source: "No tiene nada (ningún papel, ninguna prueba)", sound: "dea hat niks in dea hant" },
  b2m8hausverwaltung: { id: "b2m8hausverwaltung", target: "die Hausverwaltung", source: "la administración de la finca", article: "die", plural: "Hausverwaltungen", sound: "HAUS-fea-val-tung" },
  b2m8mieterverein: { id: "b2m8mieterverein", target: "der Mieterverein", source: "la asociación de inquilinos", article: "der", plural: "Mietervereine", sound: "MII-ta-fe-rain" },
  b2m8schlichtungsstelle: { id: "b2m8schlichtungsstelle", target: "die Schlichtungsstelle", source: "la oficina de mediación (alquiler, vecinos)", article: "die", plural: "Schlichtungsstellen", sound: "SHLIJ-tungs-shte-le" },
  b2m8wohnberechtigungsschein: { id: "b2m8wohnberechtigungsschein", target: "der Wohnberechtigungsschein (WBS)", source: "el certificado de acceso a vivienda protegida", article: "der", sound: "VOON-be-rej-ti-gungs-shain" },
  b2m8auslaenderbehoerde: { id: "b2m8auslaenderbehoerde", target: "die Ausländerbehörde", source: "la oficina de extranjería", article: "die", plural: "Ausländerbehörden", sound: "AUS-len-da-be-höa-de" },
  b2m8ortsuebliche: { id: "b2m8ortsuebliche", target: "die ortsübliche Vergleichsmiete", source: "el alquiler comparable de la zona", article: "die", sound: "ORTS-üu-bli-je fea-GLAIJS-mii-te" },
  b2m8modernisierung: { id: "b2m8modernisierung", target: "die Modernisierung", source: "la modernización (la que sube el alquiler)", article: "die", plural: "Modernisierungen", sound: "mo-der-ni-ZII-rung" },
  b2m8nebenkostenabrechnung: { id: "b2m8nebenkostenabrechnung", target: "die Nebenkostenabrechnung", source: "la liquidación anual de gastos", article: "die", plural: "Nebenkostenabrechnungen", sound: "NEE-ben-kos-ten-ap-rej-nung" },
  b2m8staffelmiete: { id: "b2m8staffelmiete", target: "die Staffelmiete", source: "el alquiler escalonado (sube por contrato)", article: "die", sound: "SHTA-fel-mii-te" },
  b2m8zweckentfremdung: { id: "b2m8zweckentfremdung", target: "die Zweckentfremdung", source: "el uso de vivienda para otra cosa (oficinas, turistas)", article: "die", sound: "TSVEK-ent-frem-dung" },
  b2m8milieuschutz: { id: "b2m8milieuschutz", target: "der Milieuschutz", source: "la protección del barrio (norma berlinesa contra la expulsión)", article: "der", sound: "mi-LIEU-shuts" },
  b2m8wohnflaeche: { id: "b2m8wohnflaeche", target: "die Wohnfläche", source: "la superficie habitable (metros cuadrados oficiales)", article: "die", sound: "VOON-fle-je" },
  b2m8eigentuemer: { id: "b2m8eigentuemer", target: "der Eigentümer / die Eigentümerin", source: "el propietario / la propietaria", article: "der", plural: "Eigentümer", sound: "AI-guen-tü-ma" },
  b2m8einschreiben: { id: "b2m8einschreiben", target: "das Einschreiben", source: "el certificado (correo con acuse)", article: "das", plural: "Einschreiben", sound: "AIN-shrai-ben" },
  b2m8meldebescheinigung: { id: "b2m8meldebescheinigung", target: "die Meldebescheinigung", source: "el justificante de empadronamiento", article: "die", plural: "Meldebescheinigungen", sound: "MEL-de-be-shai-ni-gung" },
  b2m8nachweis: { id: "b2m8nachweis", target: "der Nachweis", source: "la prueba documental / el justificante", article: "der", plural: "Nachweise", sound: "NAAJ-vais" },
  b2m8kuendigungsschutz: { id: "b2m8kuendigungsschutz", target: "der Kündigungsschutz", source: "la protección frente al despido del piso", article: "der", sound: "KÜN-di-gungs-shuts" },
};

export const b2m8: Phase = {
  id: "b2m8",
  level: "b2",
  n: 8,
  title: "Wem gehört die Stadt?",
  goal: "Leer un texto normativo, presentar un recurso formal y resumir una norma en lenguaje llano, con el genitivo que el Amtsdeutsch exige.",
  color: "#1d4ed8",
  lessons: [
    {
      id: "b2m8l1",
      phaseId: "b2m8",
      title: "Angesichts des Bescheids",
      subtitle: "Cuatro preposiciones de genitivo: el traje del Amt",
      minutes: 14,
      sections: [
        {
          kind: "phrases",
          title: "Lo que abre una carta a la Behörde",
          itemIds: ["b2m8angesichts", "b2m8hinsichtlich", "b2m8bezuglich", "b2m8infolge", "b2m8behoerde", "b2m4antrag", "b2m8bescheid", "b1m8gefrist"],
        },
        {
          kind: "note",
          note: {
            title: "La regla detrás: el genitivo no es un caso suelto, es un estilo",
            body: "Estas preposiciones <b>rigen genitivo</b>. El hispanohablante pone <i>von</i> o un dativo porque «por» y «de» no avisan del caso.<br/><br/>· <b>angesichts des Bescheids</b> — ante la resolución.<br/>· <b>hinsichtlich der Miete</b> — en lo que respecta al alquiler.<br/>· <b>bezüglich Ihres Antrags</b> — con respecto a su solicitud (fórmula de carta).<br/>· <b>infolge der Anzeige</b> — a consecuencia de la denuncia.<br/><br/>El artículo en genitivo: <b>des</b> (der/das), <b>der</b> (die). El adjetivo, si hay, lleva <b>-en</b>: <b>angesichts des neuen Bescheids</b>.<br/><br/>No son sinónimos de <i>wegen</i>. <i>wegen</i> ya lo tienes; estas son el registro que el Bescheid usa contra ti, y el que tú usas en el Widerspruch.",
            table: [
              ["preposición", "caso", "ejemplo"],
              ["angesichts", "Genitiv", "angesichts der Begründung"],
              ["hinsichtlich", "Genitiv", "hinsichtlich der Miete"],
              ["bezüglich", "Genitiv", "bezüglich Ihres Antrags"],
              ["infolge", "Genitiv", "infolge der Anzeige"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m8l1e1", type: "fastmatch", prompt: "Ráfaga: piso y trámite que ya tienes",
              pairs: [
                { target: "die Frist", source: "el plazo" },
                { target: "die Kündigung", source: "la rescisión" },
                { target: "der Lärm", source: "el ruido" },
                { target: "die Kaltmiete", source: "el alquiler en frío" },
                { target: "der Mietvertrag", source: "el contrato de alquiler" },
              ],
              targetSeconds: 22,
              itemIds: ["b1m8gefrist", "b1m8gekuendigung", "b1m1laerm", "b1m1kaltmiete", "b1m1mietvertrag"],
            },
            {
              id: "b2m8l1e2", type: "mc", prompt: "Reconoce el genitivo",
              question: "„Angesichts des Bescheids lege ich Widerspruch ein.“",
              options: [
                "Ante la resolución, interpongo recurso",
                "Después de la resolución, interpongo recurso",
                "Sin resolución, interpongo recurso",
              ],
              answer: 0,
              whyWrong: [null, "Eso sería nach / infolge de otro tipo", "Eso sería mangels"],
              itemIds: ["b2m8angesichts", "b2m8bescheid", "b2m8widerspruch"],
            },
            {
              id: "b2m8l1e3", type: "match", prompt: "Empareja preposición y glosa",
              pairs: [
                { target: "angesichts", source: "ante / a la vista de" },
                { target: "hinsichtlich", source: "en lo que respecta a" },
                { target: "bezüglich", source: "con respecto a (carta)" },
                { target: "infolge", source: "a consecuencia de" },
              ],
              itemIds: ["b2m8angesichts", "b2m8hinsichtlich", "b2m8bezuglich", "b2m8infolge"],
            },
            {
              id: "b2m8l1e4", type: "cloze", prompt: "El artículo del genitivo",
              text: "Hinsichtlich ___ Miete liegt Herr Vogel unter dem Mietspiegel.",
              answers: ["der"],
              translation: "En lo que respecta al alquiler, el señor Vogel está por debajo del índice.",
              hints: ["die Miete → genitivo d-e-r", "d..."],
              itemIds: ["b2m8hinsichtlich", "b2m8mietspiegel"],
            },
            {
              id: "b2m8l1e5", type: "errorfix", prompt: "Un hispanohablante escribió esto. Arréglalo.",
              wrong: "Angesichts von dem Bescheid lege ich Widerspruch ein.",
              answers: [
                "Angesichts des Bescheids lege ich Widerspruch ein.",
                "Angesichts des Bescheids lege ich Widerspruch ein",
              ],
              why: "angesichts rige genitivo, no von + dativo. des Bescheids, no von dem Bescheid. El von es el calco de «ante la resolución».",
              translation: "Ante la resolución, interpongo recurso.",
              itemIds: ["b2m8angesichts", "b2m8bescheid"],
            },
            {
              id: "b2m8l1e6", type: "transform", prompt: "Ponle el traje de Amt",
              source: "Wegen der Anzeige hat das Amt den Bescheid geschickt.",
              instruction: "Sustituye wegen por infolge + genitivo",
              answers: [
                "Infolge der Anzeige hat das Amt den Bescheid geschickt",
                "Infolge der Anzeige hat das Amt den Bescheid geschickt.",
              ],
              translation: "A consecuencia de la denuncia, la oficina ha enviado la resolución.",
              itemIds: ["b2m8infolge", "b2m8bescheid"],
            },
            {
              id: "b2m8l1e7", type: "build", prompt: "Construye la fórmula de carta",
              target: "Bezüglich Ihres Antrags teilen wir mit",
              translation: "Con respecto a su solicitud, comunicamos",
              distractors: ["von", "Ihrem"],
              itemIds: ["b2m8bezuglich", "b2m4antrag"],
            },
            {
              id: "b2m8l1e8", type: "type", prompt: "Cierre de producción",
              question: "Ante la resolución de la administración, presento una solicitud",
              answers: [
                "Angesichts des Bescheids der Behörde stelle ich einen Antrag",
                "Angesichts des Bescheids der Behörde stelle ich einen Antrag.",
                "Angesichts des Bescheids der Behörde lege ich einen Antrag vor",
              ],
              itemIds: ["b2m8angesichts", "b2m8behoerde", "b2m4antrag"],
            },
          ],
        },
      ],
    },
    {
      id: "b2m8l2",
      phaseId: "b2m8",
      title: "Mangels Unterlagen",
      subtitle: "Otras seis: mangels, zugunsten, seitens, anhand, mittels, im Zuge",
      minutes: 13,
      sections: [
        {
          kind: "phrases",
          title: "Las que el Bescheid usa contra ti — y las que usas tú",
          itemIds: ["b2m8mangels", "b2m8zugunsten", "b2m8seitens", "b2m8anhand", "b2m8mittels", "b2m8imzuge", "b2m8widerspruch"],
        },
        {
          kind: "note",
          note: {
            title: "La regla detrás: mangels no lleva artículo, im Zuge sí",
            body: "· <b>mangels</b> — a falta de. Suele ir <u>sin artículo</u>: <b>mangels Unterlagen</b>, <b>mangels gültiger Dokumente</b>. El calco *mangels von Unterlagen es de examen.<br/>· <b>zugunsten des Vermieters</b> — en favor del casero.<br/>· <b>seitens der Hausverwaltung</b> — de parte de la administración de la finca.<br/>· <b>anhand der Zahlen</b> — a partir de las cifras.<br/>· <b>mittels eines Einschreibens</b> — mediante un certificado.<br/>· <b>im Zuge der Anmeldung</b> — en el marco del empadronamiento. Aquí <i>im Zuge</i> es locución; el genitivo va detrás.<br/><br/>Si el sustantivo no lleva artículo (mangels Unterlagen), el adjetivo va en genitivo fuerte: <b>gültiger Dokumente</b>.",
            table: [
              ["con artículo", "sin artículo (mangels, a menudo)"],
              ["zugunsten des Vermieters", "mangels Unterlagen"],
              ["anhand der Zahlen", "mangels gültiger Dokumente"],
              ["im Zuge der Anmeldung", "mittels Einschreibens (también se ve)"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m8l2e1", type: "mc", prompt: "mangels, la trampa del von",
              question: "Elige la frase correcta:",
              options: [
                "Mangels vollständiger Unterlagen kann das Amt nicht entscheiden.",
                "Mangels von vollständigen Unterlagen kann das Amt nicht entscheiden.",
              ],
              answer: 0,
              whyWrong: [null, "mangels no lleva von. El genitivo va pegado: vollständiger Unterlagen"],
              itemIds: ["b2m8mangels"],
            },
            {
              id: "b2m8l2e2", type: "match", prompt: "Empareja",
              pairs: [
                { target: "mangels", source: "a falta de" },
                { target: "zugunsten", source: "en favor de" },
                { target: "seitens", source: "de parte de" },
                { target: "anhand", source: "a partir de (datos)" },
                { target: "mittels", source: "mediante" },
              ],
              itemIds: ["b2m8mangels", "b2m8zugunsten", "b2m8seitens", "b2m8anhand", "b2m8mittels"],
            },
            {
              id: "b2m8l2e3", type: "cloze", prompt: "De parte de quién",
              text: "___ der Hausverwaltung kam nichts Schriftliches.",
              answers: ["Seitens"],
              translation: "De parte de la administración de la finca no llegó nada por escrito.",
              itemIds: ["b2m8seitens"],
            },
            {
              id: "b2m8l2e4", type: "gapbank", prompt: "Herr Vogel arma el recurso",
              text: "___ der Zahlen im Mietspiegel hält der Eigenbedarf nicht. ___ eines Einschreibens habe ich alles abgegeben. ___ der Anmeldung lag die alte Bescheinigung bei. ___ des Vermieters wird jeder Zweifel ausgelegt.",
              answers: ["Anhand", "Mittels", "Im Zuge", "Zugunsten"],
              bank: ["Anhand", "Mittels", "Im Zuge", "Zugunsten", "Wegen", "Trotz"],
              translation: "A partir de las cifras del índice, la necesidad propia no se sostiene. Mediante un certificado lo entregué todo. En el marco del empadronamiento iba el justificante viejo. En favor del casero se interpreta cada duda.",
              itemIds: ["b2m8anhand", "b2m8mittels", "b2m8imzuge", "b2m8zugunsten", "b2m8mietspiegel"],
            },
            {
              id: "b2m8l2e5", type: "errorfix", prompt: "Un hispanohablante escribió esto. Arréglalo.",
              wrong: "Mangels von Unterlagen kann das Amt nicht entscheiden.",
              answers: [
                "Mangels Unterlagen kann das Amt nicht entscheiden.",
                "Mangels Unterlagen kann das Amt nicht entscheiden",
                "Mangels vollständiger Unterlagen kann das Amt nicht entscheiden.",
              ],
              why: "mangels no lleva von ni, a menudo, artículo. Mangels Unterlagen. El von es el «de» español, que aquí sobra.",
              translation: "A falta de documentos, la oficina no puede decidir.",
              itemIds: ["b2m8mangels"],
            },
            {
              id: "b2m8l2e6", type: "transform", prompt: "Del habla al Widerspruch",
              source: "Ich lege Widerspruch ein.",
              instruction: "Pon la fórmula de documento: Hiermit …",
              answers: [
                "Hiermit lege ich Widerspruch ein",
                "Hiermit lege ich Widerspruch ein.",
              ],
              itemIds: ["b2m8hiermitwiderspruch", "b2m8widerspruch", "b1m8gehiermit"],
            },
            {
              id: "b2m8l2e7", type: "translate", prompt: "Al alemán de Amt",
              direction: "toTarget",
              source: "A falta de documentos válidos no se puede decidir",
              answers: [
                "Mangels gültiger Dokumente kann nicht entschieden werden",
                "Mangels gültiger Dokumente kann nicht entschieden werden.",
                "Mangels gültiger Dokumente kann das Amt nicht entscheiden",
              ],
              itemIds: ["b2m8mangels"],
            },
            {
              id: "b2m8l2e8", type: "type", prompt: "Cierre de producción",
              question: "Por la presente interpongo recurso contra la resolución",
              answers: [
                "Hiermit lege ich Widerspruch gegen den Bescheid ein",
                "Hiermit lege ich Widerspruch gegen den Bescheid ein.",
                "Hiermit lege ich gegen den Bescheid Widerspruch ein",
              ],
              itemIds: ["b2m8hiermitwiderspruch", "b2m8bescheid"],
            },
          ],
        },
      ],
    },
    {
      id: "b2m8l3",
      phaseId: "b2m8",
      title: "Wegen des Lärms, wegen dem Lärm",
      subtitle: "El genitivo como estilo — y el dativo que la calle ya dio por bueno",
      minutes: 14,
      sections: [
        {
          kind: "phrases",
          title: "Tres normas para la misma preposición, y el léxico del piso",
          itemIds: ["b1m7feaufgrund", "b2m8laermbelaestigung", "b2m8mietspiegel", "b2m8eigenbedarf", "b2m8aufenthaltserlaubnis", "b2m8anmeldungamt", "b2m8natwegendem"],
        },
        {
          kind: "note",
          note: {
            title: "La regla detrás: el real no es el libro con menos cortesía",
            body: "La píldora de este módulo es el ejemplo perfecto del contrato Nativo en B2: el <b>real no es el libro más informal</b>, es <b>otra norma</b>.<br/><br/>· Libro: <b>wegen des Lärms</b> (genitivo).<br/>· Calle: <b>wegen dem Lärm</b> (dativo). Lo oyes en toda Alemania, y no es un error de ignorante: es la norma hablada.<br/>· Examen: <b>aufgrund der anhaltenden Lärmbelästigung</b>. Ni wegen ni dativo: otra preposición, adjetivo, nominalización.<br/><br/>En el Schreiben, wegen + dativo te baja la banda. En el Hören, wegen + dativo es lo que suena. Las dos cosas son verdad a la vez.<br/><br/>La misma operación con «en cuanto al alquiler»: calle <b>Also, die Miete…</b> · examen <b>Hinsichtlich der Miete…</b>",
            table: [
              ["libro", "calle", "examen"],
              ["wegen des Lärms", "wegen dem Lärm", "aufgrund der Lärmbelästigung"],
              ["Ich beschwere mich.", "Da mach ich Stress.", "Hiermit lege ich Widerspruch ein."],
              ["Was die Miete angeht …", "Also, die Miete …", "Hinsichtlich der Miete …"],
              ["Er hat keine Papiere.", "Der hat nix in der Hand.", "Mangels gültiger Dokumente …"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m8l3e1", type: "bucket", prompt: "¿Libro, calle o examen?",
              categories: ["libro / examen (genitivo)", "calle (dativo / jerga)"],
              items: [
                { text: "wegen des Lärms", bucket: 0 },
                { text: "wegen dem Lärm", bucket: 1 },
                { text: "aufgrund der Lärmbelästigung", bucket: 0 },
                { text: "Da mach ich Stress.", bucket: 1 },
                { text: "Hinsichtlich der Miete …", bucket: 0 },
                { text: "Also, die Miete …", bucket: 1 },
                { text: "Mangels gültiger Dokumente", bucket: 0 },
                { text: "Der hat nix in der Hand.", bucket: 1 },
              ],
              itemIds: ["b2m8natwegendem", "b1m7feaufgrund", "b2m8natstress", "b2m8hinsichtlich", "b2m8natnixinderhand"],
            },
            {
              id: "b2m8l3e2", type: "mc", prompt: "Eigenbedarf, la palabra que desahucia",
              question: "¿Qué es una Eigenbedarfskündigung?",
              options: [
                "El casero rescinde porque dice que necesita el piso para él o su familia",
                "El inquilino se va porque el alquiler sube",
                "El Amt cierra el piso por ruina",
              ],
              answer: 0,
              whyWrong: [null, "Eso sería una subida o un acuerdo, no este término", "Eso sería una Verfügung urbanística"],
              itemIds: ["b2m8eigenbedarf"],
            },
            {
              id: "b2m8l3e3", type: "cloze", prompt: "El traje de examen del ruido",
              text: "___ der anhaltenden Lärmbelästigung lege ich Beschwerde ein.",
              answers: ["Aufgrund"],
              translation: "Debido a las molestias continuadas por ruido, presento queja.",
              itemIds: ["b1m7feaufgrund", "b2m8laermbelaestigung"],
            },
            {
              id: "b2m8l3e4", type: "hearreal", prompt: "¿Libro o calle?",
              book: "Wegen des Lärms beschwere ich mich.",
              real: "Wegen dem Lärm mach ich Stress.",
              translation: "Por el ruido me quejo / armo jaleo.",
              itemIds: ["b2m8natwegendem", "b2m8natstress", "b1m1laerm"],
            },
            {
              id: "b2m8l3e5", type: "transform", prompt: "Del libro al examen",
              source: "Wegen des Lärms beschwere ich mich.",
              instruction: "Dilo con aufgrund + Lärmbelästigung",
              answers: [
                "Aufgrund der Lärmbelästigung beschwere ich mich",
                "Aufgrund der Lärmbelästigung beschwere ich mich.",
                "Aufgrund der anhaltenden Lärmbelästigung lege ich Beschwerde ein",
              ],
              itemIds: ["b1m7feaufgrund", "b2m8laermbelaestigung"],
            },
            {
              id: "b2m8l3e6", type: "paraphrase", prompt: "Sin wegen: dilo como el Amt",
              source: "Wegen der Miete schreibe ich.",
              forbid: ["Wegen", "wegen"],
              answers: [
                "Hinsichtlich der Miete schreibe ich.",
                "Hinsichtlich der Miete schreibe ich",
                "Bezüglich der Miete schreibe ich.",
                "Bezüglich der Miete nehme ich Stellung.",
              ],
              itemIds: ["b2m8hinsichtlich", "b2m8bezuglich"],
            },
            {
              id: "b2m8l3e7", type: "speak", prompt: "Di la calle — y no la lleves al Schreiben",
              text: "Wegen dem Lärm da mach ich Stress.",
              phonetic: "VEE-guen deem leam da maj ij shtres",
              translation: "Por el ruido, armo jaleo.",
              itemIds: ["b2m8natwegendem", "b2m8natstress"],
            },
            {
              id: "b2m8l3e8", type: "type", prompt: "Cierre de producción",
              question: "Debido a las molestias por ruido interpongo recurso",
              answers: [
                "Aufgrund der Lärmbelästigung lege ich Widerspruch ein",
                "Aufgrund der Lärmbelästigung lege ich Widerspruch ein.",
                "Aufgrund der anhaltenden Lärmbelästigung lege ich Widerspruch ein",
              ],
              itemIds: ["b1m7feaufgrund", "b2m8laermbelaestigung", "b2m8widerspruch"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-b2m8-1",
            book: "Wegen des Lärms",
            real: "Wegen dem Lärm",
            meaning: "Por el ruido.",
            when: "El dativo se oye en toda Alemania, también entre hablantes cultos. En el Schreiben de examen, es fuga: quieren genitivo o, mejor, aufgrund.",
            register: "amigos",
            exam: "Aufgrund der anhaltenden Lärmbelästigung",
            note: "El real no es el libro con menos cortesía: es otra norma. El examen no arbitra la calle; cambia de preposición y nominaliza.",
            sound: "VEE-guen deem leam",
            level: "b2",
            produce: true,
            itemId: "b2m8natwegendem",
          },
        },
      ],
    },
    {
      id: "b2m8l4",
      phaseId: "b2m8",
      title: "Der eine lange Satz",
      subtitle: "Tres pisos: subordinadas anidadas y la subordinada que abre el Vorfeld",
      minutes: 15,
      sections: [
        {
          kind: "phrases",
          title: "La ciudad en papel: plan, permiso, vigencia",
          itemIds: ["b2m8genehmigung", "b2m8bebauungsplan", "b2m8gemeinde", "b2m8zustaendig", "b2m8inkrafttreten"],
        },
        {
          kind: "note",
          note: {
            title: "La regla detrás: tres verbos al final, y el Vorfeld ocupado",
            body: "Una frase de B2 administrativo apila subordinadas. El orden de la pila es el de siempre, solo que más alta:<br/><br/><b>Ich glaube, dass der Antrag abgelehnt wurde, weil die Frist, die im Bescheid genannt wurde, abgelaufen war.</b><br/>Tres pisos: <i>dass</i> · <i>weil</i> · relativa. Cada una manda su verbo al final de SU piso.<br/><br/>Cuando la subordinada <b>abre</b> la frase, ocupa el Vorfeld entero y la principal empieza por el verbo:<br/><b>Nachdem der Bescheid, den wir im März erhalten hatten, rechtskräftig geworden war, legten wir Widerspruch ein.</b><br/><br/>El calco: *Nachdem der Bescheid war rechtskräftig, wir legten Widerspruch ein. El español no mueve el verbo; el alemán mueve dos veces.",
            table: [
              ["piso", "qué hay"],
              ["1 (principal)", "legten wir Widerspruch ein"],
              ["2 (Nachdem … war)", "el Bescheid se había vuelto firme"],
              ["3 (relativa)", "den wir im März erhalten hatten"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m8l4e1", type: "mc", prompt: "La subordinada que abre",
              question: "Elige la frase correcta:",
              options: [
                "Nachdem der Bescheid rechtskräftig geworden war, legten wir Widerspruch ein.",
                "Nachdem der Bescheid rechtskräftig geworden war, wir legten Widerspruch ein.",
              ],
              answer: 0,
              whyWrong: [null, "La subordinada ocupa el Vorfeld: la principal empieza por el verbo (legten)"],
              itemIds: ["b2m8rechtskraeftig", "b2m8widerspruch"],
            },
            {
              id: "b2m8l4e2", type: "cloze", prompt: "¿Quién es competente?",
              text: "Das Bürgeramt ist ___ für die Anmeldung.",
              answers: ["zuständig"],
              translation: "El Bürgeramt es el competente para el empadronamiento.",
              itemIds: ["b2m8zustaendig", "buergeramt", "b2m8anmeldungamt"],
            },
            {
              id: "b2m8l4e3", type: "errorfix", prompt: "El calco del Vorfeld. Arréglalo.",
              wrong: "Nachdem der Bescheid da war, wir haben Widerspruch eingelegt.",
              answers: [
                "Nachdem der Bescheid da war, haben wir Widerspruch eingelegt.",
                "Nachdem der Bescheid da war, haben wir Widerspruch eingelegt",
              ],
              why: "Tras una subordinada antepuesta, la principal empieza por el verbo. haben wir, no wir haben. Es el mismo te-ka-mo-lo del m1, en frase de dos pisos.",
              translation: "Cuando llegó la resolución, interpusimos recurso.",
              itemIds: ["b2m8widerspruch", "b2m8bescheid"],
            },
            {
              id: "b2m8l4e4", type: "gapbank", prompt: "Tres pisos, un Bescheid",
              text: "Ich glaube, ___ der Antrag abgelehnt wurde, ___ die Frist, ___ im Bescheid genannt wurde, abgelaufen war.",
              answers: ["dass", "weil", "die"],
              bank: ["dass", "weil", "die", "das", "denn", "welche"],
              translation: "Creo que la solicitud fue denegada porque el plazo que se citaba en la resolución había vencido.",
              itemIds: ["b2m4antrag", "b2m8bescheid", "b1m8gefrist"],
              tip: "die (relativa de Frist, femenino), no das. denn no manda el verbo al final y aquí hay que mandarlo.",
            },
            {
              id: "b2m8l4e5", type: "transform", prompt: "Antepon la subordinada",
              source: "Wir legten Widerspruch ein, nachdem der Bescheid gekommen war.",
              instruction: "Empieza por Nachdem (inversión en la principal)",
              answers: [
                "Nachdem der Bescheid gekommen war, legten wir Widerspruch ein",
                "Nachdem der Bescheid gekommen war, legten wir Widerspruch ein.",
              ],
              itemIds: ["b2m8widerspruch"],
            },
            {
              id: "b2m8l4e6", type: "build", prompt: "Construye la vigencia",
              target: "Der Bebauungsplan tritt nächste Woche in Kraft",
              altTargets: ["Nächste Woche tritt der Bebauungsplan in Kraft"],
              translation: "El plan urbanístico entra en vigor la semana que viene",
              distractors: ["kraft", "dem"],
              itemIds: ["b2m8bebauungsplan", "b2m8inkrafttreten"],
            },
            {
              id: "b2m8l4e7", type: "translate", prompt: "Al alemán de tres pisos",
              direction: "toEs",
              source: "Nachdem die Genehmigung, die die Gemeinde erteilt hatte, in Kraft getreten war, begann der Bau.",
              answers: [
                "Cuando la autorización que había concedido el municipio entró en vigor, empezó la obra",
                "Cuando la autorización que había concedido el municipio entró en vigor, empezó la obra.",
                "Después de que la autorización que el municipio había concedido entrara en vigor, empezó la construcción",
              ],
              itemIds: ["b2m8genehmigung", "b2m8gemeinde", "b2m8inkrafttreten"],
            },
            {
              id: "b2m8l4e8", type: "type", prompt: "Cierre de producción",
              question: "El Bürgeramt es el competente para el empadronamiento",
              answers: [
                "Das Bürgeramt ist für die Anmeldung zuständig",
                "Das Bürgeramt ist für die Anmeldung zuständig.",
                "Das Bürgeramt ist zuständig für die Anmeldung",
              ],
              itemIds: ["b2m8zustaendig", "buergeramt", "b2m8anmeldungamt"],
            },
          ],
        },
      ],
    },
    {
      id: "b2m8l5",
      phaseId: "b2m8",
      title: "Weil der Antrag hätte gestellt werden müssen",
      subtitle: "Clínica: el campo medio en la frase de tres pisos",
      minutes: 16,
      sections: [
        {
          kind: "phrases",
          title: "La pila más cara del nivel",
          itemIds: ["b2m8haettegestelltwerdenmuessen", "b2m8rechtskraeftig", "b2m8widerspruchsfrist", "b2m8aktenzeichen", "b2m8sachbearbeiter", "b2m1stellungnahme"],
        },
        {
          kind: "note",
          note: {
            title: "La clínica que cierra el trabajo del m1",
            body: "Cuando hay <b>dos subordinadas anidadas</b> y un <b>modal en Perfekt de pasiva</b>, el orden final es contraintuitivo hasta para quien ya lo sabe:<br/><br/><b>…, weil der Antrag hätte gestellt werden müssen.</b><br/><br/>Pila, de dentro a fuera: <b>hätte</b> (auxiliar, adelantado) · <b>gestellt</b> (participio) · <b>werden</b> (infinitivo de pasiva) · <b>müssen</b> (modal).<br/>No: *gestellt werden müssen hätte<br/>No: *hätte müssen gestellt werden<br/><br/>Y el campo medio: lo conocido (der Antrag, den wir schon kennen) va <b>antes</b> de lo nuevo (hätte gestellt werden müssen). Los pronombres, si los hay, lo más a la izquierda posible.<br/><br/>Eso es lo que el m1 abrió y aquí se cobra.",
            table: [
              ["mal", "bien"],
              ["weil der Antrag gestellt werden müssen hätte", "weil der Antrag hätte gestellt werden müssen"],
              ["weil hätte der Antrag gestellt werden müssen", "weil der Antrag hätte gestellt werden müssen"],
              ["Nachdem war der Bescheid da, wir schrieben", "Nachdem der Bescheid da war, schrieben wir"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m8l5e1", type: "mc", prompt: "La pila de tres pisos",
              question: "Elige la frase correcta:",
              options: [
                "…, weil der Antrag hätte gestellt werden müssen.",
                "…, weil der Antrag gestellt werden müssen hätte.",
                "…, weil der Antrag hätte müssen gestellt werden.",
              ],
              answer: 0,
              whyWrong: [null, "hätte se adelanta, no cierra", "el participio va antes de werden, el modal cierra"],
              itemIds: ["b2m8haettegestelltwerdenmuessen"],
            },
            {
              id: "b2m8l5e2", type: "errorfix", prompt: "El calco de la clínica. Arréglalo.",
              wrong: "Anna ärgert sich, weil der Antrag gestellt werden müssen hätte.",
              answers: [
                "Anna ärgert sich, weil der Antrag hätte gestellt werden müssen.",
                "Anna ärgert sich, weil der Antrag hätte gestellt werden müssen",
              ],
              why: "Con modal + pasiva en irreal de pasado, hätte se adelanta: hätte gestellt werden müssen. El auxiliar no espera al final. Es la misma clínica del m6, un piso más arriba.",
              translation: "Anna se fastidia porque la solicitud tendría que haber sido presentada.",
              itemIds: ["b2m8haettegestelltwerdenmuessen"],
            },
            {
              id: "b2m8l5e3", type: "cloze", prompt: "El auxiliar adelantado",
              text: "…, obwohl die Stellungnahme ___ geschickt werden müssen.",
              answers: ["hätte"],
              translation: "… aunque el escrito de alegaciones tendría que haber sido enviado.",
              itemIds: ["b2m8haettegestelltwerdenmuessen", "b2m1stellungnahme"],
            },
            {
              id: "b2m8l5e4", type: "gapbank", prompt: "El campo medio: lo conocido primero",
              text: "Nachdem der Bescheid, ___ wir im März erhalten hatten, rechtskräftig geworden ___, legten wir Widerspruch ein. Die Widerspruchsfrist ___ nächste Woche ab.",
              answers: ["den", "war", "läuft"],
              bank: ["den", "war", "läuft", "das", "hat", "worden"],
              translation: "Cuando la resolución que habíamos recibido en marzo quedó firme, interpusimos recurso. El plazo del recurso vence la semana que viene.",
              itemIds: ["b2m8rechtskraeftig", "b2m8widerspruchsfrist", "b2m8bescheid"],
              tip: "den (Bescheid, masculino, acusativo de la relativa). war (Plusquamperfekt pasivo de estado). läuft (Präsens de plazo). wurde no encaja en el hueco de war: aquí es geworden war.",
            },
            {
              id: "b2m8l5e5", type: "transform", prompt: "Mete la pila bajo weil",
              source: "Der Antrag hätte gestellt werden müssen.",
              instruction: "Complétala: Das Amt schreibt, weil …",
              answers: [
                "Das Amt schreibt, weil der Antrag hätte gestellt werden müssen",
                "Das Amt schreibt, weil der Antrag hätte gestellt werden müssen.",
              ],
              itemIds: ["b2m8haettegestelltwerdenmuessen", "b2m4antrag"],
            },
            {
              id: "b2m8l5e6", type: "bucket", prompt: "¿hätte al final o adelantado?",
              categories: ["auxiliar al FINAL", "hätte ADELANTADO (modal + pasiva / doble inf.)"],
              items: [
                { text: "weil der Bescheid gekommen war", bucket: 0 },
                { text: "weil der Antrag hätte gestellt werden müssen", bucket: 1 },
                { text: "dass die Frist abgelaufen war", bucket: 0 },
                { text: "dass die Stellungnahme hätte geschickt werden müssen", bucket: 1 },
                { text: "obwohl wir Widerspruch eingelegt hatten", bucket: 0 },
                { text: "obwohl der Antrag hätte bearbeitet werden müssen", bucket: 1 },
              ],
              itemIds: ["b2m8haettegestelltwerdenmuessen"],
            },
            {
              id: "b2m8l5e7", type: "listen", prompt: "Escucha y transcribe el número de expediente",
              text: "Das Aktenzeichen lautet B vierzehn Bindestrich dreihundertachtunddreißig",
              translation: "El número de expediente es B 14-338",
              itemIds: ["b2m8aktenzeichen"],
            },
            {
              id: "b2m8l5e8", type: "type", prompt: "Cierre de la clínica",
              question: "Porque la solicitud tendría que haber sido presentada",
              answers: [
                "weil der Antrag hätte gestellt werden müssen",
                "weil der Antrag hätte gestellt werden müssen.",
              ],
              itemIds: ["b2m8haettegestelltwerdenmuessen"],
              tip: "Si te salió hätte delante de gestellt werden müssen, la clínica del m1 está cerrada.",
            },
          ],
        },
      ],
    },
    {
      id: "b2m8l6",
      phaseId: "b2m8",
      title: "Lesen: wem gehört die Wohnung?",
      subtitle: "Eigenbedarf, Mietspiegel y una Gemeindewohnung vienesa",
      minutes: 18,
      sections: [
        {
          kind: "phrases",
          title: "Palabras de ciudad que verás en el texto",
          itemIds: ["b2m8sozialwohnung", "b2m8gemeindewohnung", "b2m8verdrangung", "b2m8wohnraum", "buergeramt"],
        },
        {
          kind: "note",
          note: {
            title: "Cómo se lee un texto que apila genitivos",
            body: "Subraya cada <b>angesichts / hinsichtlich / mangels / anhand</b>: detrás va un genitivo, y ahí suele estar la clave. Las relativas largas se deshacen: busca el sustantivo de delante y el verbo de detrás.<br/><br/>El recuadro es de Viena: <i>Gemeindewohnung</i> en lugar de Sozialwohnung, <i>Jänner</i>, <i>Grätzl</i> ya lo viste. Notas a pie.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m8l6e1", type: "read", prompt: "Lee el reportaje. Las preguntas van en alemán.",
              title: "Eigenbedarf — und der Mietspiegel darunter",
              source: "Stadtleben (Berlin), mit einem Kasten aus Wien",
              text: "Herr Vogel, 74, dritter Stock, Prenzlauer Berg, hat den Brief in der Küche an den Kühlschrank gehängt, neben den Mietspiegel. Der Vermieter kündigt wegen Eigenbedarfs. Die Tochter, heißt es, brauche die Wohnung. Angesichts der Begründung, die auf einem einzigen Satz besteht, hat Vogel Widerspruch eingelegt. Hinsichtlich der Miete liegt er unter dem Spiegel, nicht darüber. Anhand der Zahlen, die das Bezirksamt im März veröffentlicht hat, wäre eine Erhöhung von acht Prozent das Höchste gewesen — keine Kündigung.\n\nBezüglich des Eigenbedarfs verlangt das Mietrecht Papiere. Seitens der Hausverwaltung kam ein Anruf, kein Schreiben. Mangels gültiger Dokumente, schreibt Vogel in seiner Stellungnahme, sei der Bedarf nicht nachgewiesen. «Der hat nix in der Hand», sagt er, und dann, weil Sofía Marín am Tisch sitzt, die Übersetzung: «Mangels Unterlagen.» Im Zuge der Anmeldung, vor zwölf Jahren, hat er jede Bescheinigung abgegeben, die das Bürgeramt wollte. Der Sachbearbeiter, dessen Aktenzeichen jetzt auf dem Bescheid steht, hat ihm damals die Hand geschüttelt.\n\nDie Verdrängung aus dem Kiez ist keine Metapher. Der Wohnraum, der in den neunziger Jahren noch bezahlbar war, wird anhand von Inseraten teurer, nicht anhand von Löhnen. Infolge von Modernisierungen, die niemand bestellt hat, steigen die Nebenkosten. Zugunsten der Eigentümer legt jede Unschärfe im Gesetz den Zweifel nach oben aus. Die Gemeinde, zuständig für den Bebauungsplan, tritt mit Beschlüssen in Kraft, die auf dem Papier Schutz versprechen. Ob sie ihn halten, sieht man an den Umzugswagen.\n\nEin Kasten aus Wien, Ottakring, zeigt eine andere Schraube und dieselbe Bewegung. Die Gemeindewohnung*, die der Bezirk noch besitzt, wird «im Jänner* neu vergeben», schreibt die Bezirkszeitung. Anhand der Warteliste, die auf der Stiege* des Amtes hängt, dauert es drei Jahre. Wer keine Gemeindewohnung bekommt, sucht auf dem freien Markt — und findet, hinsichtlich der Preise, Berlin. Der Konsumentenschutz hilft bei Verträgen. Bei Eigenbedarf hilft er nicht. Da hilft der Widerspruch, oder er hilft nicht.\n\nDer Mieterverein, den Vogel seit den achtziger Jahren kennt, rät zur Schlichtungsstelle, bevor man klagt. Die Hausverwaltung kennt das Spiel. Der Eigentümer auch. Anhand der Wohnfläche und der Nebenkostenabrechnung, die Vogel in einem Einschreiben nachgereicht hat, wäre eine Staffelmiete das Äußerste gewesen — keine Kündigung. Milieuschutz und Zweckentfremdung stehen im Bezirk auf dem Papier. Ob sie den dritten Stock halten, ist eine andere Akte.\n\nWas wäre zu überlegen? Sofía würde eher dafür plädieren, den Eigenbedarf an echte Nachweise zu binden, nicht an einen Satz. Herr Vogel ist konkreter. «Hiermit lege ich Widerspruch ein. Das hab ich schon. Jetzt soll die Behörde die Akte lesen, bevor der Bescheid rechtskräftig wird.» Die Widerspruchsfrist läuft in acht Tagen ab. Nachdem der Brief, den niemand persönlich erklärt hat, in Kraft zu treten droht, geht er donnerstags ins Amt. Junges Volk, sagt er, geht nicht mehr hin. Er schon. Wer einen Wohnberechtigungsschein hat, sucht trotzdem. Die ortsübliche Vergleichsmiete steigt schneller als jede Meldebescheinigung.\n\n*Gemeindewohnung = österr. für eine kommunale Sozialwohnung · *Jänner = österr. für Januar · *Stiege = österr. für Treppe",
              questions: [
                {
                  id: "b2m8l6e1q1",
                  q: "Warum hat Herr Vogel Widerspruch eingelegt?",
                  options: [
                    "Wegen einer Eigenbedarfskündigung, deren Begründung aus einem Satz besteht.",
                    "Weil die Miete über dem Mietspiegel liegt.",
                    "Weil das Bürgeramt die Anmeldung verweigert hat.",
                  ],
                  answer: 0,
                  why: "Eigenbedarf, un solo Satz. La Miete está por debajo del Spiegel, no por encima.",
                },
                {
                  id: "b2m8l6e1q2",
                  q: "Was kam seitens der Hausverwaltung?",
                  options: ["Ein Anruf, kein Schreiben.", "Ein Einschreiben mit Unterlagen.", "Nichts, nicht einmal ein Anruf."],
                  answer: 0,
                  why: "«Seitens der Hausverwaltung kam ein Anruf, kein Schreiben.»",
                },
                {
                  id: "b2m8l6e1q3",
                  q: "Welche Rolle spielt der Mietspiegel in Vogels Argument?",
                  options: [
                    "Er zeigt, dass eine Kündigung überzogen ist: die Miete liegt darunter.",
                    "Er begründet den Eigenbedarf der Tochter.",
                    "Er ersetzt den Widerspruch.",
                  ],
                  answer: 0,
                  inference: true,
                  why: "Anhand der Zahlen… Erhöhung, keine Kündigung. Hay que unir Mietspiegel y Eigenbedarf.",
                },
                {
                  id: "b2m8l6e1q4",
                  q: "Wozu dient der Wiener Kasten?",
                  options: [
                    "Er zeigt dieselbe Verdrängung unter anderem Namen: Gemeindewohnung statt Sozialwohnung.",
                    "Er rät Vogel, nach Ottakring zu ziehen.",
                    "Er erklärt die Stiege als deutsches Wort.",
                  ],
                  answer: 0,
                  inference: true,
                  why: "Misma presión, otro léxico. Stiege está glosada; no es el tema.",
                },
                {
                  id: "b2m8l6e1q5",
                  q: "Was fordert Vogel am Ende konkret?",
                  options: [
                    "Dass die Behörde die Akte liest, bevor der Bescheid rechtskräftig wird.",
                    "Dass Sofía die Miete übernimmt.",
                    "Dass der Bebauungsplan gestrichen wird.",
                  ],
                  answer: 0,
                  inference: true,
                  why: "Cita directa al final. El plan urbanístico aparece antes, no como su petición.",
                },
              ],
              itemIds: ["b2m8eigenbedarf", "b2m8mietspiegel", "b2m8verdrangung", "b2m8gemeindewohnung", "b2m8kuendigungsschutz"],
            },
            {
              id: "b2m8l6e2", type: "mc", prompt: "Austriacismo",
              question: "«Gemeindewohnung» en Viena es…",
              options: [
                "El equivalente a una Sozialwohnung comunal",
                "Un piso de estudiantes",
                "El Bürgeramt vienés",
              ],
              answer: 0,
              whyWrong: [null, "No es una residencia de estudiantes", "El Amt es otra cosa; la nota lo glosa como vivienda"],
              itemIds: ["b2m8gemeindewohnung", "b2m8sozialwohnung"],
            },
            {
              id: "b2m8l6e3", type: "cloze", prompt: "El genitivo que sostiene el recurso",
              text: "Mangels gültiger ___ sei der Bedarf nicht nachgewiesen.",
              answers: ["Dokumente", "Unterlagen"],
              translation: "A falta de documentos válidos, la necesidad no estaría acreditada.",
              itemIds: ["b2m8mangels"],
            },
            {
              id: "b2m8l6e4", type: "match", prompt: "Empareja ciudad y papel",
              pairs: [
                { target: "die Sozialwohnung", source: "vivienda protegida (DE)" },
                { target: "die Gemeindewohnung", source: "vivienda municipal (AT)" },
                { target: "die Verdrängung", source: "la expulsión del barrio" },
                { target: "der Wohnraum", source: "el parque de vivienda" },
              ],
              itemIds: ["b2m8sozialwohnung", "b2m8gemeindewohnung", "b2m8verdrangung", "b2m8wohnraum", "b2m8ortsuebliche", "b2m8modernisierung", "b2m8nebenkostenabrechnung", "b2m8staffelmiete", "b2m8wohnflaeche", "b2m8meldebescheinigung", "b2m8nachweis"],
            },
            {
              id: "b2m8l6e5", type: "paraphrase", prompt: "Sin nix: dilo como el Amt",
              source: "Der hat nix in der Hand.",
              forbid: ["nix", "Hand"],
              answers: [
                "Mangels gültiger Dokumente ist der Bedarf nicht nachgewiesen.",
                "Mangels gültiger Dokumente ist der Bedarf nicht nachgewiesen",
                "Er hat keine Papiere.",
                "Es liegen keine Unterlagen vor.",
              ],
              itemIds: ["b2m8natnixinderhand", "b2m8mangels"],
            },
            {
              id: "b2m8l6e6", type: "gapbank", prompt: "La tesis de Vogel",
              text: "___ der Begründung lege ich Widerspruch ein. ___ der Miete liege ich unter dem Spiegel. ___ gültiger Dokumente ist der Eigenbedarf nicht nachgewiesen.",
              answers: ["Angesichts", "Hinsichtlich", "Mangels"],
              bank: ["Angesichts", "Hinsichtlich", "Mangels", "Trotz", "Wegen", "Durch"],
              translation: "Ante la fundamentación, interpongo recurso. En lo que respecta al alquiler, estoy por debajo del índice. A falta de documentos válidos, la necesidad propia no está acreditada.",
              itemIds: ["b2m8angesichts", "b2m8hinsichtlich", "b2m8mangels", "b2m8eigenbedarf"],
            },
          ],
        },
      ],
    },
    {
      id: "b2m8l7",
      phaseId: "b2m8",
      title: "Der Bescheid auf dem Tisch",
      subtitle: "Audio largo con cuaderno: Herr Vogel y Sofía",
      minutes: 18,
      sections: [
        {
          kind: "note",
          note: {
            title: "Escuchar Amtsdeutsch (y anotar el Aktenzeichen)",
            body: "Herr Vogel enseña el Bescheid a Sofía. Anota <b>el número de expediente</b>, <b>el plazo</b> y cada preposición de genitivo: ahí suelen estar las claves. El TTS no distingue dos voces: los nombres van en el texto.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m8l7e1", type: "audiomc", prompt: "El salón de Vogel · afirmación 1. Cuaderno, dos escuchas.",
              audio: GESPRAECH_BESCHEID,
              question: "„Herr Vogel hat bereits Widerspruch eingelegt.“ — Richtig oder falsch?",
              options: ["Richtig", "Falsch"],
              answer: 0,
              plays: 2,
              notepad: true,
              whyWrong: [null, "«Ich hab Widerspruch eingelegt, schriftlich, innerhalb der Frist»"],
              itemIds: ["b2m8widerspruch", "b2m8bescheid"],
            },
            {
              id: "b2m8l7e2", type: "audiomc", prompt: "Afirmación 2. El expediente.",
              audio: GESPRAECH_BESCHEID,
              question: "¿Cuál es el Aktenzeichen?",
              options: ["B 14-338", "B 41-883", "14-B-338"],
              answer: 0,
              plays: 2,
              notepad: true,
              whyWrong: [null, "El orden es B 14-338", "No empieza por el número"],
              itemIds: ["b2m8aktenzeichen"],
            },
            {
              id: "b2m8l7e3", type: "audiomc", prompt: "Afirmación 3. La Miete.",
              audio: GESPRAECH_BESCHEID,
              question: "„Herr Vogel liegt über dem Mietspiegel.“ — Richtig oder falsch?",
              options: ["Richtig", "Falsch"],
              answer: 1,
              plays: 2,
              notepad: true,
              whyWrong: ["«Hinsichtlich der Miete tun sie so, als läge ich über dem Mietspiegel. Ich liege darunter»", null],
              itemIds: ["b2m8hinsichtlich", "b2m8mietspiegel"],
            },
            {
              id: "b2m8l7e4", type: "audiomc", prompt: "Afirmación 4. Lo que llegó del casero.",
              audio: GESPRAECH_BESCHEID,
              question: "¿Qué llegó de parte de la Hausverwaltung?",
              options: ["Un teléfono, nada por escrito", "Un certificado con documentos", "El Bescheid en persona"],
              answer: 0,
              plays: 2,
              notepad: true,
              whyWrong: [null, "Él envió un Einschreiben; ellos no", "El Bescheid es del Amt"],
              itemIds: ["b2m8seitens", "b2m8eigenbedarf"],
            },
            {
              id: "b2m8l7e5", type: "audiomc", prompt: "Afirmación 5. mangels.",
              audio: GESPRAECH_BESCHEID,
              question: "¿Qué dice el Amt que falta?",
              options: [
                "Unterlagen completos, según el Amt — Vogel dice que lo entregó todo",
                "El permiso de residencia de Vogel",
                "La firma de Sofía",
              ],
              answer: 0,
              plays: 2,
              notepad: true,
              whyWrong: [null, "La Aufenthaltserlaubnis no sale en esta llamada", "Sofía no firma nada"],
              itemIds: ["b2m8mangels", "b2m4antrag"],
            },
            {
              id: "b2m8l7e6", type: "audiomc", prompt: "Afirmación 6. El plazo.",
              audio: GESPRAECH_BESCHEID,
              question: "¿Cuándo dice Vogel que vence el plazo si nadie responde?",
              options: ["La semana que viene", "Mañana", "En un año"],
              answer: 0,
              plays: 2,
              notepad: true,
              whyWrong: [null, "No dice morgen", "El año no aparece"],
              itemIds: ["b2m8widerspruchsfrist", "b2m8inkrafttreten"],
            },
            {
              id: "b2m8l7e7", type: "audiomc", prompt: "Afirmación 7. El cierre.",
              audio: GESPRAECH_BESCHEID,
              question: "¿Qué propone Sofía?",
              options: [
                "Acompañarlo el jueves a la Sprechstunde",
                "Pagar ella la diferencia de Miete",
                "Hablar con Lena Krüger",
              ],
              answer: 0,
              plays: 2,
              notepad: true,
              whyWrong: [null, "Nadie habla de pagar", "Lena no está en este audio"],
              itemIds: ["buergeramt", "b2m8zustaendig"],
            },
            {
              id: "b2m8l7e8", type: "shadow", prompt: "Sombrea el cierre de Vogel",
              text: "Das Haus gehört nicht dem, der am lautesten Eigenbedarf sagt.",
              phonetic: "das haus gue-HÖAT nijt deem, dea am LAU-tes-ten AI-guen-be-darf zaakt",
              translation: "La casa no es de quien más alto dice necesidad propia.",
              reps: 2,
              itemIds: ["b2m8eigenbedarf"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-b2m8-2",
            book: "Ich beschwere mich.",
            real: "Da mach ich Stress.",
            meaning: "Por eso armo jaleo / no me quedo quieto.",
            when: "Entre vecinos, para anunciar que no vas a tragar. En el Widerspruch, jamás: ahí se interpone, no se arma estrés.",
            register: "amigos",
            exam: "Hiermit lege ich Widerspruch ein.",
            note: "Stress machen es de rellano. El examen no suaviza la queja: la convierte en un acto jurídico (Widerspruch einlegen) con hiermit.",
            sound: "da maj ij shtres",
            level: "b2",
            produce: true,
            itemId: "b2m8natstress",
          },
        },
      ],
    },
    {
      id: "b2m8l8",
      phaseId: "b2m8",
      title: "Zwei Schreiben",
      subtitle: "Widerspruch formal (~100) y comentario: ¿de quién es la ciudad? (~150)",
      minutes: 22,
      sections: [
        {
          kind: "note",
          note: {
            title: "El recurso no es una queja, y el comentario no es un Bescheid",
            body: "El Widerspruch es Sie, Anrede, Aktenzeichen, genitivos, <b>Hiermit lege ich Widerspruch ein</b>. Nada de wegen dem, nada de Stress.<br/>El comentario puede citar a Vogel y luego traducir: «Da macht er Stress. Hiermit legt er Widerspruch ein.»",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b2m8l8e1", type: "mc", prompt: "Fuga de registro",
              question: "En un Widerspruch, ¿qué no puede aparecer?",
              options: ["wegen dem, Stress machen, nix", "angesichts, hinsichtlich, Hiermit lege ich", "Aktenzeichen und Frist"],
              answer: 0,
              whyWrong: [null, "Eso ES el registro del recurso", "Eso son datos, no fugas"],
              itemIds: ["b2m8natwegendem", "b2m8natstress"],
            },
            {
              id: "b2m8l8e2", type: "match", prompt: "Empareja fórmula y sitio",
              pairs: [
                { target: "Hiermit lege ich Widerspruch ein.", source: "el recurso" },
                { target: "Hinsichtlich der Miete …", source: "el traje de examen del tema" },
                { target: "Also, die Miete …", source: "el salón, en voz alta" },
                { target: "Mangels gültiger Dokumente …", source: "la denegación del Amt" },
              ],
              itemIds: ["b2m8hiermitwiderspruch", "b2m8hinsichtlich", "b2m8natalso", "b2m8mangels"],
            },
            {
              id: "b2m8l8e3", type: "errorfix", prompt: "Fuga en el recurso. Arréglalo.",
              wrong: "Sehr geehrte Damen und Herren, wegen dem Lärm lege ich Widerspruch ein.",
              answers: [
                "Sehr geehrte Damen und Herren, wegen des Lärms lege ich Widerspruch ein.",
                "Sehr geehrte Damen und Herren, wegen des Lärms lege ich Widerspruch ein",
              ],
              why: "En el Schreiben, wegen rige genitivo: des Lärms, no dem Lärm. El dativo es la norma de la calle, y aquí es fuga.",
              translation: "Estimados señores: debido a las molestias por ruido interpongo recurso.",
              itemIds: ["b2m8natwegendem", "b1m7feaufgrund", "b2m8laermbelaestigung"],
            },
              { id: "b2m8l8e4", type: "write", prompt: "Schreiben A · Widerspruch al Amt. Unas 100 palabras, usted.",
                scenario: "Has recibido un Bescheid (Aktenzeichen B 14-338) que estima un Eigenbedarf del casero. Escribe el recurso: discute la fundamentación, cita el Mietspiegel y pide que se revise el expediente antes de que la resolución sea firme.",
                genre: "mail-formal",
                register: "Sie",
                frame: ["Anrede + Aktenzeichen", "Hiermit lege ich Widerspruch ein", "Angesichts / hinsichtlich / mangels + genitivo", "Petición: die Akte zu prüfen, bevor der Bescheid rechtskräftig wird", "Mit freundlichen Grüßen"],
                bullets: ["Abre con Anrede formal y el Aktenzeichen", "Usa Hiermit lege ich Widerspruch ein", "Usa al menos una preposición de genitivo (angesichts, hinsichtlich, mangels, anhand)", "Nombra Eigenbedarf o Mietspiegel", "Cierra con la Grußformel"],
                checks: [
                  {
                    re: "Sehr geehrte",
                    label: "Anrede formal"
                  },
                  {
                    re: "(Widerspruch|widerspreche)",
                    label: "el recurso"
                  },
                  {
                    re: "(angesichts|hinsichtlich|mangels|anhand|bezüglich|aufgrund)",
                    label: "preposición de genitivo"
                  },
                  {
                    re: "(Eigenbedarf|Mietspiegel|Bescheid|Aktenzeichen)",
                    label: "el asunto"
                  },
                  {
                    re: "(Mit freundlichen Grüßen|Freundliche Grüße)",
                    label: "Grußformel"
                  }
                ],
                requireConnectors: {
                  min: 2,
                  bank: ["weil", "sofern", "dennoch", "nachdem"]
                },
                rubric: ["erfuellung", "kohaerenz", "wortschatz", "strukturen"],
                minWords: 90,
                maxWords: 115,
                model: "Sehr geehrte Damen und Herren, Aktenzeichen B 14-338. Hiermit lege ich Widerspruch gegen den Bescheid vom 12. März ein. Angesichts der Begründung, die aus einem Satz besteht, und hinsichtlich der Miete, die unter dem Mietspiegel liegt, ist die Eigenbedarfskündigung nicht nachvollziehbar. Mangels gültiger Dokumente ist der Bedarf nicht nachgewiesen. Ich bitte Sie, die Akte zu prüfen, weil der Bescheid sonst rechtskräftig wird. Sofern Unterlagen fehlen, reiche ich sie umgehend nach. Die Widerspruchsfrist habe ich eingehalten. Eine Kopie dieses Schreibens geht an den Mieterverein und an die Schlichtungsstelle. Mit freundlichen Grüßen Herr Vogel",
                itemIds: ["b2m8hiermitwiderspruch", "b2m8angesichts", "b2m8eigenbedarf", "b2m8mietspiegel", "b1m8gesehrgeehrte", "a2mitfreundlichengruessen"],
              },
              { id: "b2m8l8e5", type: "write", prompt: "Schreiben B · comentario: ¿de quién es la ciudad? Unas 150 palabras, tú.",
                scenario: "En un foro alguien afirma que el piso es de quien tiene la escritura, punto. Reacciona a Mark y argumenta con Herr Vogel, Eigenbedarf y Verdrängung.",
                genre: "forum",
                register: "du",
                stimulus: {
                  author: "Mark_Eigentum",
                  text: "Wem gehört die Stadt? Dem, der sie bezahlt hat. Eigenbedarf ist sein Recht. Wer mietet, weiß, dass er gehen muss, wenn der Eigentümer die Wohnung braucht."
                },
                frame: ["Reacción: Das mag so sein; dennoch …", "Tesis: Die Stadt gehört auch denen, die sie bewohnen.", "Prueba: Mietspiegel / Vogel / mangels Dokumente", "Objeción: Man könnte einwenden, Eigentum sei Eigentum.", "Cierre: Widerspruch / Nachweise / nicht dem, der am lautesten …"],
                bullets: ["Reacciona a Mark de tú", "Usa al menos una preposición de genitivo o Amtsdeutsch (angesichts, hinsichtlich, mangels, anhand)", "Nombra Eigenbedarf, Mietspiegel o Verdrängung", "Concede algo y no te rindas", "Cierra con una tesis sobre de quién es la ciudad, no con un saludo de carta"],
                checks: [
                  {
                    re: "(Mark|du (schreibst|sagst|meinst|hast))",
                    label: "reacción a Mark"
                  },
                  {
                    re: "(angesichts|hinsichtlich|mangels|anhand|bezüglich|aufgrund)",
                    label: "genitivo culto"
                  },
                  {
                    re: "(Eigenbedarf|Mietspiegel|Verdrängung|Wohnraum)",
                    label: "léxico de ciudad"
                  },
                  {
                    re: "(mag so sein|zwar|dennoch|einerseits)",
                    label: "concesión"
                  },
                  {
                    re: "(gehört|Stadt|Widerspruch|Nachweis)",
                    label: "tesis de cierre"
                  }
                ],
                requireConnectors: {
                  min: 3,
                  bank: ["dennoch", "weil", "sofern", "nachdem", "wobei"]
                },
                rubric: ["erfuellung", "kohaerenz", "wortschatz", "strukturen"],
                minWords: 135,
                maxWords: 170,
                model: "Lieber Mark, das mag so sein, dass Eigentum ein Recht ist; dennoch greift dein Satz zu kurz. Angesichts einer Eigenbedarfskündigung, die aus einem Satz besteht, und hinsichtlich eines Mietspiegels, unter dem die Miete schon liegt, ist «wer mietet, geht» keine Stadt, sondern Verdrängung. Mangels gültiger Dokumente ist der Bedarf oft nicht nachgewiesen, weil das Amt die Akte lesen muss, bevor der Bescheid rechtskräftig wird. Herr Vogel wohnt seit zwölf Jahren im dritten Stock; anhand der Zahlen wäre eine Erhöhung das Äußerste, keine Kündigung, sofern der Eigenbedarf nicht belegt ist. Nachdem der Brief da ist, bleibt der Widerspruch. Die Stadt gehört auch denen, die sie bewohnen, nicht nur denen, die sie bezahlt haben. Wer zwölf Jahre Miete zahlt, hat mehr in der Hand als einen Satz auf einem Brief. Der Kündigungsschutz existiert nicht als Höflichkeit, sondern als Regel für den Wohnraum, den man schon bewohnt. Nicht dem, der am lautesten Eigenbedarf sagt.",
                itemIds: ["b2m8eigenbedarf", "b2m8verdrangung", "b2m8mietspiegel", "b2m8wohnraum", "b2m8widerspruch"],
              },
              { id: "b2m8l8e6", type: "order", prompt: "Ordena el Widerspruch de banda A",
                sentences: ["Aktenzeichen B 14-338.", "Hiermit lege ich Widerspruch ein.", "Angesichts der Begründung ist der Eigenbedarf nicht nachgewiesen.", "Ich bitte um Prüfung, bevor der Bescheid rechtskräftig wird."],
                itemIds: ["b2m8hiermitwiderspruch", "b2m8aktenzeichen", "b2m8rechtskraeftig"],
              },
            {
              id: "b2m8l8ex81", type: "write", prompt: "Aufgabe 2 · Nachricht Sie. Off-topic = 0.",
              scenario: "Eres Sofía. Escribes al Amt, Sie: angesichts der Wohnungsnot pides que se revise una Kaution retenida mangels Begründung. Genitivo a la vista. Off-topic = 0.",
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
              model: "Sehr geehrte Damen und Herren,\nangesichts der Wohnungsnot in der Winsstraße bitte ich Sie um Prüfung meiner Kaution, Aktenzeichen W 9-214. Mangels schriftlicher Begründung wurde der Betrag einbehalten, und hinsichtlich der Mängelliste fehlt jedes Foto. Deshalb bitte ich Sie, mir bis zum 20. mitzuteilen, welche Schäden Sie ansetzen. Außerdem sollte die Rückzahlung innert acht Wochen erfolgen, weil der Vertrag das so festhält. Allerdings erkenne ich Löcher über sechs Millimeter als Schaden an, nicht normale Abnutzung. Ich stehe für Rückfragen gern zur Verfügung. Eine kurze schriftliche Bestätigung reicht.\nMit freundlichen Grüßen\nSofía Marín",
              itemIds: [],
              tip: "Menos de 50 palabras o tema equivocado: 0. Ni un du.",
            },
            {
              id: "b2m8l8ex82", type: "write", prompt: "Aufgabe 1 · Forumsbeitrag. Off-topic = 0.",
              scenario: "Foro del Kiez: Clara pregunta de quién es la calle si el Amt decide el aparcamiento sin oír a la etage. Usa genitivo (angesichts, hinsichtlich). Off-topic = 0.",
              genre: "forum",
              stimulus: { author: "Clara H.", text: "Wem gehört die Winsstraße, wenn das Amt die Parkplätze räumt, ohne die Etage zu fragen? Angesichts der Mieten reicht ein Zettel nicht." },
              bullets: [
                "Concede un punto a Clara H. y marca el desacuerdo.",
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
              model: "Zu dem Beitrag von Clara H. möchte ich Folgendes sagen: Zwar stimmt, dass ein Zettel am Geländer keine Anhörung ist. Allerdings gehört die Straße nicht der Etage allein: hinsichtlich der Feuerwehr muss die Rampe frei bleiben. Ein Vorteil klarer Regeln ist, dass niemand im Dunkeln entscheidet. Ein Nachteil ist, dass mangels Protokoll später niemand weiß, wer unterschrieben hat. Deshalb sollte das Amt angesichts der Wohnungsnot erst laden und dann räumen. Außerdem gehört die betroffene Seite an den Tisch, bevor ein Rad ohne Ankündigung entfernt wird. Ich plädiere dafür, weniger zu behaupten und mehr festzuhalten, weil nur so die Akte in drei Monaten noch verständlich ist. Wem die Stadt gehört, zeigt sich am Verfahren, nicht am Plakat. Nur so bleibt die Sache nachvollziehbar. Das ist die Mindestanforderung an ein Protokoll, das jemand in drei Monaten noch verstehen soll. Das ist die Mindestanforderung an ein Protokoll, das jemand in drei Monaten noch verstehen soll.",
              itemIds: [],
              tip: "150 palabras: intro, concesión, dos argumentos, propuesta, cierre. Off-topic = 0.",
            },
          ],
        },
      ],
    },
    {
      id: "b2m8l9",
      phaseId: "b2m8",
      title: "Das Haus gehört nicht dem Lautesten",
      subtitle: "El relato del módulo y tu monólogo de cuatro minutos",
      minutes: 24,
      sections: [
        {
          kind: "phrases",
          title: "Últimas piezas para hablar de la ciudad sin quedarte en wegen",
          itemIds: ["b2m1stellungnahme", "b2m8sachbearbeiter", "b2m8aufenthaltserlaubnis"],
        },
        {
          kind: "note",
          note: {
            title: "Herr Vogel: der Brief am Kühlschrank",
            body: "<i>Lee en voz alta.</i><br/><br/>Der Brief hängt in der Küche, neben dem [[Mietspiegel|índice de alquileres]]. [[Eigenbedarf|necesidad propia del casero]], ein Satz. [[Aktenzeichen|número de expediente]] B 14-338. Herr Vogel hat [[Widerspruch|recurso]] eingelegt, schriftlich, innerhalb der Frist. Angesichts der Begründung blieb ihm nichts anderes übrig. Hinsichtlich der Miete liegt er unter dem Spiegel. Anhand der Zahlen hält der Bedarf nicht. Seitens der [[Hausverwaltung|administración de la finca]] kam ein Anruf, kein Schreiben.<br/><br/>«Mangels Unterlagen», sagt das Amt. «Der hat nix in der Hand», sagt Vogel. Sofía übersetzt, ohne zu lächeln. Wegen dem Lärm von unten hat er schon mal Stress gemacht. Wegen des Eigenbedarfs macht er etwas anderes: einen Widerspruch. Also, die Miete — die ist das eine. Der [[Bescheid|resolución]] ist das andere. In Kraft tritt er, wenn die Frist abläuft und niemand die Akte liest.<br/><br/>Sofía geht donnerstags mit. Junges Volk, sagt Vogel, geht nicht mehr hin. Wir Alten schon. Nachdem der Brief, den niemand erklärt hat, auf dem Tisch gelegen hat, sagt er den Satz, den Sofía behält: Das Haus gehört nicht dem, der am lautesten Eigenbedarf sagt.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            { id: "b2m8l9e9", type: "match", prompt: "Empareja el trámite y la casa",
              pairs: [
                {
                  target: "die Stellungnahme",
                  source: "el escrito de alegaciones"
                },
                {
                  target: "der Sachbearbeiter",
                  source: "el funcionario del caso"
                },
                {
                  target: "die Aufenthaltserlaubnis",
                  source: "el permiso de residencia"
                },
                {
                  target: "die Hausverwaltung",
                  source: "la administración de la finca"
                },
                {
                  target: "der Eigentümer",
                  source: "el propietario"
                },
                {
                  target: "das Einschreiben",
                  source: "el certificado postal"
                }
              ],
              itemIds: ["b2m1stellungnahme", "b2m8sachbearbeiter", "b2m8aufenthaltserlaubnis", "b2m8hausverwaltung", "b2m8eigentuemer", "b2m8einschreiben"],
            },
            { id: "b2m8l9e10", type: "match", prompt: "Empareja las palabras de la ciudad",
              pairs: [
                {
                  target: "der Mieterverein",
                  source: "la asociación de inquilinos"
                },
                {
                  target: "die Schlichtungsstelle",
                  source: "la mediación"
                },
                {
                  target: "der Wohnberechtigungsschein",
                  source: "el certificado WBS"
                },
                {
                  target: "die Ausländerbehörde",
                  source: "extranjería"
                },
                {
                  target: "der Milieuschutz",
                  source: "la protección del barrio"
                },
                {
                  target: "die Zweckentfremdung",
                  source: "el cambio de uso de la vivienda"
                }
              ],
              itemIds: ["b2m8mieterverein", "b2m8schlichtungsstelle", "b2m8wohnberechtigungsschein", "b2m8auslaenderbehoerde", "b2m8milieuschutz", "b2m8zweckentfremdung"],
            },
            { id: "b2m8l9e1", type: "mc", prompt: "Inferencia (frase 5)",
              question: "¿Por qué distingue Vogel el Lärm del Eigenbedarf?",
              options: ["Porque el ruido se discute en el rellano y el desahucio, en el Amt", "Porque el ruido es más grave", "Porque Sofía le ha pedido que no haga Stress"],
              answer: 0,
              whyWrong: [
                null,
                "El relato no compara gravedad",
                "Sofía le acompaña, no le calla"
              ],
              itemIds: ["b2m8natstress", "b2m8eigenbedarf"],
            },
            {
              id: "b2m8l9exi1", type: "mc", prompt: "Inferencia: traducir sin sonreír",
              question: "Sofía traduce «nix in der Hand» y no sonríe. ¿Por qué el relato se toma esa molestia?",
              options: [
                "Porque no entiende el dativo de Vogel y no quiere que se note",
                "Porque Vogel le ha prohibido reírse en el Amt",
                "Porque «Mangels Unterlagen» y la frase de rellano son el mismo hecho en dos trajes: sonreír convertiría al vecino en chiste",
              ],
              answer: 2,
              whyWrong: [
                "Traduce, luego entiende; el dativo no es el tema",
                "Vogel le pide que le acompañe, no que se calle la cara",
                null,
              ],
              itemIds: ["b2m8natnixinderhand", "b2m8mangels"],
            },
            {
              id: "b2m8l9exi2", type: "mc", prompt: "Inferencia: la gente joven que ya no va",
              question: "«Junges Volk geht nicht mehr hin.» ¿Qué implica Vogel que no llega a decir?",
              options: [
                "Que los jóvenes tienen mejores abogados y por eso no pisan el Amt",
                "Que el Amt vive de quien todavía se presenta: si solo van los mayores, el expediente puede caducar sin lector",
                "Que Sofía es demasiado joven para acompañarle el jueves",
              ],
              answer: 1,
              whyWrong: [
                "No habla de abogados; habla de quién entra por la puerta",
                null,
                "Al contrario: la invita, precisamente porque la gente joven ya no va",
              ],
              itemIds: ["b2m8bescheid", "b2m8inkrafttreten", "b2m8widerspruchsfrist"],
            },
            { id: "b2m8l9e2", type: "order", prompt: "Ordena la semana de Vogel",
              sentences: ["Der Brief hängt am Kühlschrank.", "Vogel legt Widerspruch ein.", "Sofía übersetzt «nix in der Hand».", "Donnerstags gehen sie ins Amt."],
              itemIds: ["b2m8widerspruch", "buergeramt"],
            },
            { id: "b2m8l9e3", type: "fastmatch", prompt: "Ráfaga: el piso del B1",
              pairs: [
                {
                  target: "die Wohnungsnot",
                  source: "la escasez de vivienda"
                },
                {
                  target: "sich anmelden",
                  source: "empadronarse"
                },
                {
                  target: "der Vermieter",
                  source: "el casero"
                },
                {
                  target: "die Kaution",
                  source: "la fianza"
                }
              ],
              targetSeconds: 20,
              itemIds: ["b1m1wohnungsnot", "b1m1sichanmelden", "b1m1vermieter", "b1m1kaution"],
            },
            { id: "b2m8l9e4", type: "gapbank", prompt: "Reconstruye la traducción de Sofía",
              text: "Vogel: Der hat nix in der Hand. Amt: ___ gültiger Dokumente. Vogel, Schreiben: ___ lege ich Widerspruch ein. ___ der Miete liege ich unter dem Spiegel.",
              answers: ["Mangels", "Hiermit", "Hinsichtlich"],
              bank: ["Mangels", "Hiermit", "Hinsichtlich", "Wegen", "Trotz", "Durch"],
              translation: "Vogel: no tiene nada. Amt: a falta de documentos válidos. Vogel, escrito: por la presente interpongo recurso. En lo que respecta al alquiler, estoy por debajo del índice.",
              itemIds: ["b2m8mangels", "b2m8hiermitwiderspruch", "b2m8hinsichtlich"],
            },
            { id: "b2m8l9e5", type: "transform", prompt: "Del rellano al Widerspruch",
              source: "Da mach ich Stress.",
              instruction: "Dilo con Hiermit … Widerspruch",
              answers: ["Hiermit lege ich Widerspruch ein", "Hiermit lege ich Widerspruch ein."],
              itemIds: ["b2m8natstress", "b2m8hiermitwiderspruch"],
            },
            { id: "b2m8l9e6", type: "hearreal", prompt: "¿Libro o calle?",
              book: "Er hat keine Papiere.",
              real: "Der hat nix in der Hand.",
              translation: "No tiene papeles / no tiene nada en la mano.",
              itemIds: ["b2m8natnixinderhand"],
            },
            { id: "b2m8l9e7", type: "monologue", prompt: "Sprechen · monólogo de 4 minutos. Planifica, habla, repite.",
              topic: "Wem gehört die Stadt? Eigenbedarf, Miete und wer bleiben darf",
              slides: [
                {
                  title: "1. Thema und Standpunkt",
                  hint: "Ich möchte über Wohnraum sprechen. Die Stadt gehört …"
                },
                {
                  title: "2. Ein Fall",
                  hint: "Herr Vogel / eine Kündigung / der Mietspiegel … Angesichts …"
                },
                {
                  title: "3. Das Amt",
                  hint: "Bescheid, Widerspruch, Frist, zuständig … Mangels …"
                },
                {
                  title: "4. Einwand",
                  hint: "Man könnte einwenden, Eigentum sei Eigentum. Dennoch …"
                },
                {
                  title: "5. Schluss",
                  hint: "Nicht dem, der am lautesten … / Hiermit … / Vielen Dank."
                }
              ],
              planSeconds: 120,
              speakSeconds: 240,
              reps: 2,
              checklist: ["Traté las 5 diapositivas", "Hablé al menos 3:30", "Usé al menos 2 preposiciones de genitivo (angesichts, hinsichtlich, mangels, anhand, aufgrund)", "Nombré Eigenbedarf o Mietspiegel o Widerspruch", "Traduje al menos una fórmula de calle al registro de examen"],
              model: "Diapositiva 3 (modelo): „Mangels gültiger Dokumente ist der Eigenbedarf oft nicht nachgewiesen. Das Bürgeramt ist zuständig für den Bescheid; es muss die Akte lesen, bevor er rechtskräftig wird. Hiermit legt man Widerspruch ein — nicht, indem man Stress macht, sondern indem man die Frist hält.“",
              itemIds: ["b2m8eigenbedarf", "b2m8widerspruch", "b2m8zustaendig", "b2m8verdrangung", "b2m8wohnraum"],
            },
            { id: "b2m8l9e8", type: "type", prompt: "Cierre del módulo — y del bloque conflictivo",
              question: "Ante la resolución interpongo recurso; a falta de documentos el desahucio no se sostiene",
              answers: ["Angesichts des Bescheids lege ich Widerspruch ein; mangels Dokumente hält die Kündigung nicht", "Angesichts des Bescheids lege ich Widerspruch ein; mangels Dokumente hält die Kündigung nicht.", "Angesichts des Bescheids lege ich Widerspruch ein. Mangels Dokumente hält die Kündigung nicht"],
              itemIds: ["b2m8angesichts", "b2m8widerspruch", "b2m8mangels"],
              tip: "Dos genitivos cultos y un Widerspruch en una sola frase. El bloque del conflicto está cerrado: ya no te defiendes en alemán, discutes — y recurres.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-b2m8-4",
            book: "Er hat keine Papiere.",
            real: "Der hat nix in der Hand.",
            meaning: "No tiene nada (ningún papel, ninguna prueba).",
            when: "En el rellano, para decir que el otro va de farol. En el escrito, mangels gültiger Dokumente.",
            register: "amigos",
            exam: "Mangels gültiger Dokumente …",
            note: "nix y in der Hand son de habla. El examen borra la mano y deja el genitivo de la falta.",
            sound: "dea hat niks in dea hant",
            level: "b2",
            produce: true,
            itemId: "b2m8natnixinderhand"
          },
        },
      ],
    },
  ],
};
