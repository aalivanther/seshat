import type { Phase, VocabItem } from "@/lib/types";

// FASE 9 — De viaje: transportes con "mit dem X" como chunk fijo (sin explicar
// dativo), el vocabulario de la estación, Wo? vs Wohin? (el par que el español
// no distingue), el hotel con fórmulas fijas ("Ich habe ein Zimmer gebucht" —
// el Perfekt llega en el módulo Ayer y mañana) y un bloque de Klang con
// fahren/waren y Zug/Züge.
// Se sigue cazando el Umlaut omitido: du fährst (no "fahrst"), Züge (no "Zuge").

export const vocab9: Record<string, VocabItem> = {
  // f9l1 — Wie fährst du?
  zug: { id: "zug", target: "der Zug", source: "el tren", article: "der", plural: "Züge", sound: "tsuuk (z = ts)" },
  bus: { id: "bus", target: "der Bus", source: "el autobús", article: "der", plural: "Busse", sound: "bus" },
  ubahn: { id: "ubahn", target: "die U-Bahn", source: "el metro", article: "die", plural: "U-Bahnen", sound: "ú-baan" },
  fahrrad: { id: "fahrrad", target: "das Fahrrad", source: "la bicicleta", article: "das", plural: "Fahrräder", sound: "fáa-rat" },
  flugzeug: { id: "flugzeug", target: "das Flugzeug", source: "el avión", article: "das", plural: "Flugzeuge", sound: "flúuk-tsoik" },
  fahren: { id: "fahren", target: "fahren (du fährst, er fährt)", source: "ir (en vehículo) / conducir", sound: "fáa-ren; du feerst" },
  gehen: { id: "gehen", target: "gehen (zu Fuß)", source: "ir a pie / caminar", sound: "GUÉE-en (la h no suena: alarga la e)" },
  fliegen: { id: "fliegen", target: "fliegen", source: "volar / ir en avión", sound: "flíi-guen" },
  mitdembus: { id: "mitdembus", target: "Ich fahre mit dem Bus", source: "Voy en autobús (lit. con el bus)", sound: "ij FAA-re mit deem bus" },
  zufuss: { id: "zufuss", target: "zu Fuß", source: "a pie", sound: "tsu fuus" },
  // f9l2 — Am Bahnhof
  fahrkarte: { id: "fahrkarte", target: "die Fahrkarte", source: "el billete (de tren/bus)", article: "die", plural: "Fahrkarten", sound: "fáa-kar-te" },
  gleis: { id: "gleis", target: "das Gleis", source: "la vía / el andén (del tren)", article: "das", plural: "Gleise", sound: "glais" },
  abfahrt: { id: "abfahrt", target: "die Abfahrt", source: "la salida (del tren)", article: "die", sound: "áp-faat" },
  ankunft: { id: "ankunft", target: "die Ankunft", source: "la llegada", article: "die", sound: "án-kunft" },
  einsteigen: { id: "einsteigen", target: "einsteigen (ich steige ein)", source: "subir(se) (al tren/bus)", sound: "áin-shtai-guen" },
  aussteigen: { id: "aussteigen", target: "aussteigen (ich steige aus)", source: "bajar(se) (del tren/bus)", sound: "áus-shtai-guen" },
  umsteigen: { id: "umsteigen", target: "umsteigen (ich steige um)", source: "hacer transbordo", sound: "úm-shtai-guen" },
  wannfaehrtzug: { id: "wannfaehrtzug", target: "Wann fährt der Zug nach Berlin?", source: "¿Cuándo sale el tren a Berlín?", sound: "van feat dea tsuuk naj ber-LIIN" },
  einefahrkartenach: { id: "einefahrkartenach", target: "Eine Fahrkarte nach Berlin, bitte", source: "Un billete a Berlín, por favor", sound: "AI-ne FAAR-kar-te naj ber-LIIN, BI-te" },
  // f9l3 — Wohin?
  wohin: { id: "wohin", target: "Wohin?", source: "¿A dónde?", sound: "vo-jín" },
  ichfahrenach: { id: "ichfahrenach", target: "Ich fahre nach München", source: "Voy a Múnich (nach + ciudad/país)", sound: "ij FAA-re naj MÜN-jen" },
  zumarzt: { id: "zumarzt", target: "Ich gehe zum Arzt", source: "Voy al médico (zum = zu dem)", sound: "ij GUEE-e tsum artst" },
  zurbank: { id: "zurbank", target: "Ich gehe zur Bank", source: "Voy al banco (zur = zu der)", sound: "ij GUEE-e tsua bank" },
  urlaub: { id: "urlaub", target: "der Urlaub", source: "las vacaciones", article: "der", sound: "úa-laup" },
  hotel: { id: "hotel", target: "das Hotel", source: "el hotel", article: "das", plural: "Hotels", sound: "ho-tél" },
  wohinurlaub: { id: "wohinurlaub", target: "Wohin fährst du im Urlaub?", source: "¿A dónde vas de vacaciones?", sound: "vo-JIN FEERST du im UA-laup" },
  land: { id: "land", target: "das Land", source: "el país", article: "das", plural: "Länder", sound: "lant" },
  // f9l4 — Im Hotel
  schluessel: { id: "schluessel", target: "der Schlüssel", source: "la llave", article: "der", plural: "Schlüssel", sound: "shlü-sel" },
  rezeption: { id: "rezeption", target: "die Rezeption", source: "la recepción", article: "die", sound: "re-tsep-tsión (z = ts)" },
  buchen: { id: "buchen", target: "buchen", source: "reservar", sound: "búu-jen" },
  ichhabegebucht: { id: "ichhabegebucht", target: "Ich habe ein Zimmer gebucht", source: "He reservado una habitación (fórmula fija)", sound: "ij JAA-be ain TSI-ma gue-BUUJT (ch fuerte)" },
  habensiezimmerfrei: { id: "habensiezimmerfrei", target: "Haben Sie ein Zimmer frei?", source: "¿Tiene una habitación libre?", sound: "JAA-ben zii ain TSI-ma frai" },
  gepaeck: { id: "gepaeck", target: "das Gepäck", source: "el equipaje", article: "das", sound: "gue-pék" },
  koffer: { id: "koffer", target: "der Koffer", source: "la maleta", article: "der", plural: "Koffer", sound: "kó-fa" },
  pronacht: { id: "pronacht", target: "Was kostet das Zimmer pro Nacht?", source: "¿Cuánto cuesta la habitación por noche?", sound: "vas KOS-tet das TSI-ma pro najt" },
  // f9l5 — Klang
  wirwaren: { id: "wirwaren", target: "Wir waren in Berlin", source: "Estuvimos en Berlín (fórmula fija)", sound: "via váa-ren" },
  fahrzeug: { id: "fahrzeug", target: "das Fahrzeug", source: "el vehículo", article: "das", plural: "Fahrzeuge", sound: "fáa-tsoik" },
  werkzeug: { id: "werkzeug", target: "das Werkzeug", source: "la herramienta", article: "das", plural: "Werkzeuge", sound: "vérk-tsoik" },
  // f9l6 — Mini-cuento
  verpassen: { id: "verpassen", target: "verpassen", source: "perder (un tren, un bus)", sound: "fea-pá-sen" },
};

export const phase9: Phase = {
  id: "f9",
  n: 9,
  title: "De viaje",
  goal: "Moverte por Alemania: comprar billetes, entender salidas y llegadas, hacer transbordo, reservar hotel y contar a dónde vas de vacaciones.",
  color: "#1d4ed8",
  lessons: [
    {
      id: "f9l1",
      phaseId: "f9",
      title: "Wie fährst du?",
      subtitle: "Los transportes — y el chunk «mit dem Bus»",
      minutes: 9,
      sections: [
        {
          kind: "phrases",
          title: "Los transportes, fahren y gehen",
          // 9 ítems mostrados pero "auto" es repaso (presentado en el módulo
          // Intro / f3l4) — ítems NUEVOS: 8, dentro del límite.
          itemIds: ["zug", "bus", "auto", "ubahn", "fahrrad", "fahren", "gehen", "mitdembus", "zufuss"],
        },
        {
          kind: "note",
          note: {
            title: "La regla detrás: fahren cambia a→ä, y «mit dem» es un bloque",
            body: "En alemán no «vas» en bus: <b>fährst</b> en bus. <b>fahren</b> = ir en cualquier vehículo; su pareja es <b>gehen</b> = ir a pie / caminar (Ich <b>gehe</b> zu Fuß). Con du y er/sie/es la a de fahren toma Umlaut: du <b>fährst</b>, er <b>fährt</b> — «fahrst» sin Umlaut es el error a cazar. El medio de transporte va con <b>mit dem</b>: mit dem Bus, mit dem Zug, mit dem Auto, mit dem Fahrrad. Solo la U-Bahn (die) cambia: mit <b>der</b> U-Bahn. Apréndelo como bloque fijo — el porqué (dativo) llega más adelante. Y a pie: Ich gehe <b>zu Fuß</b>.",
            table: [
              ["", "fahren"],
              ["ich", "fahre"],
              ["du", "fährst (¡a→ä!)"],
              ["er/sie/es", "fährt (¡a→ä!)"],
              ["wir", "fahren"],
              ["ihr", "fahrt (sin Umlaut)"],
              ["sie/Sie", "fahren"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              // "das Flugzeug" se cambió por "der Bus": Flugzeug se presenta
              // recién en f9l3b (con fliegen) y aquí aún no estaba presentado.
              id: "f9l1e1", type: "match", prompt: "Empareja transporte y traducción",
              pairs: [
                { target: "der Zug", source: "el tren" },
                { target: "der Bus", source: "el autobús" },
                { target: "das Fahrrad", source: "la bicicleta" },
                { target: "zu Fuß", source: "a pie" },
              ],
              itemIds: ["zug", "bus", "fahrrad", "zufuss"],
            },
            {
              id: "f9l1e2", type: "mc", prompt: "Reconoce el significado",
              question: "„Ich fahre mit der U-Bahn“",
              options: ["Voy en metro", "Voy en tren", "Voy en coche", "Voy a pie"],
              answer: 0,
              whyWrong: [null, "El tren es der Zug — sería «mit dem Zug»", "El coche es das Auto — sería «mit dem Auto»", "A pie sería «Ich gehe zu Fuß» — con gehen, no fahren"],
              itemIds: ["ubahn", "mitdembus"],
              tip: "die U-Bahn es femenina, por eso «mit der U-Bahn». Los demás transportes de hoy llevan «mit dem».",
            },
            {
              id: "f9l1e3", type: "cloze", prompt: "Completa el chunk",
              text: "Ich fahre ___ dem Bus in die Stadt.",
              answers: ["mit"],
              translation: "Voy a la ciudad en autobús.",
              hints: ["La preposición del bloque fijo", "m-i-t"],
              itemIds: ["mitdembus", "bus", "stadt"],
            },
            {
              id: "f9l1e4", type: "mc", prompt: "Caza el error de Umlaut",
              question: "«Él va en coche» →",
              options: ["Er fahrt mit dem Auto", "Er fährt mit dem Auto", "Er fähren mit dem Auto"],
              answer: 1,
              whyWrong: ["«fahrt» sin Umlaut es la forma de ihr — con er la a cambia a ä: fährt", null, "«fähren» no existe — el infinitivo es fahren, y er necesita fährt"],
              itemIds: ["fahren", "auto"],
              tip: "du fährst, er fährt — el cambio a→ä solo pasa con du y er/sie/es.",
            },
            {
              id: "f9l1e5", type: "cloze", prompt: "Completa (¡con Umlaut!)",
              text: "Du ___ mit dem Fahrrad.",
              answers: ["fährst"],
              translation: "Tú vas en bicicleta.",
              hints: ["fahren conjugado para du", "La a toma Umlaut: f-ä-h-r-s-t"],
              itemIds: ["fahren", "fahrrad"],
              strictUmlaut: true,
              tip: "Aquí el Umlaut ES el objetivo: «fahrst» cuenta como error.",
            },
            {
              id: "f9l1e6", type: "listen", prompt: "Escucha y escribe lo que oyes",
              text: "Ich fahre mit der U-Bahn",
              translation: "Voy en metro",
              hints: ["U-Bahn con guion y B mayúscula", "Empieza con «Ich fahre mit...»"],
              itemIds: ["ubahn", "mitdembus"],
            },
            {
              id: "f9l1e9", type: "cloze", prompt: "Completa (a pie)",
              text: "Heute gehe ich zu ___.",
              answers: ["Fuß"],
              translation: "Hoy voy a pie.",
              hints: ["Con gehen, no con fahren", "F-u-ß = pie, con ß y mayúscula"],
              itemIds: ["zufuss", "gehen"],
            },
            {
              id: "f9l1e10", type: "type", prompt: "Traduce al alemán",
              question: "Voy en autobús",
              answers: ["Ich fahre mit dem Bus"],
              hints: ["fahren + el bloque mit dem", "Ich fahre mit dem ..."],
              itemIds: ["bus", "mitdembus"],
            },
            {
              id: "f9l1e11", type: "type", prompt: "Traduce",
              question: "Él va en tren a Berlín",
              answers: ["Er fährt mit dem Zug nach Berlin"],
              hints: ["er + fahren = fährt, con Umlaut", "mit dem Zug + nach Berlin"],
              itemIds: ["fahren", "zug"],
              tip: "Er fährt (¡ä!) mit dem Zug nach Berlin — transporte con mit dem, destino con nach.",
            },
            {
              id: "f9l1e12", type: "mc", prompt: "¿fahren o gehen?",
              question: "«Voy a pie» →",
              options: ["Ich fahre zu Fuß", "Ich gehe zu Fuß"],
              answer: 1,
              whyWrong: ["fahren es solo para vehículos — a pie se camina: gehen", null],
              itemIds: ["gehen", "zufuss", "fahren"],
              tip: "fahren = con ruedas o raíles · gehen = a pie. Por eso «zu Fuß» siempre va con gehen.",
            },
            {
              id: "f9l1e13", type: "type", prompt: "Cierre de producción (contraste fahren/gehen)",
              question: "Él va a pie",
              answers: ["Er geht zu Fuß"],
              hints: ["A pie → gehen, no fahren", "gehen con er: geht"],
              itemIds: ["gehen", "zufuss"],
              tip: "gehen es regular: ich gehe, du gehst, er geht — sin Umlaut, a diferencia de fährt.",
            },
          ],
        },
      ],
      resources: [
        { label: "Nicos Weg — transportes (A1)", url: "https://learngerman.dw.com/es/overview", note: "Busca los capítulos de «Bus und Bahn»: los transportes de esta lección en videos con actores." },
        { label: "Easy German — «How do Germans get around?»", url: "https://www.youtube.com/@EasyGerman", note: "Busca «public transport»: nativos hablando de U-Bahn, Fahrrad y Zug con subtítulos." },
      ],
    },
    {
      id: "f9l2",
      phaseId: "f9",
      title: "Am Bahnhof",
      subtitle: "Billetes, andenes y transbordos — supervivencia en la estación",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "La estación de tren",
          // "einefahrkartenach" se movió a f9l3 (es el chunk «nach + destino»)
          // junto con sus ejercicios, para quedar en 8 ítems nuevos.
          itemIds: ["fahrkarte", "gleis", "abfahrt", "ankunft", "einsteigen", "aussteigen", "umsteigen", "wannfaehrtzug"],
        },
        {
          kind: "note",
          note: {
            title: "La regla detrás: los paneles y tres separables",
            body: "En los paneles de la estación verás <b>Abfahrt</b> (salida) y <b>Ankunft</b> (llegada). Los tres verbos de subir y bajar son separables — misma mecánica que aufstehen: el prefijo se va al final. Ich steige <b>ein</b> (subo) · Ich steige <b>aus</b> (bajo) · Ich steige in Hannover <b>um</b> (hago transbordo). Para preguntar: <b>Wann fährt der Zug nach Berlin?</b> — y la respuesta recicla tu hora: Um acht Uhr, von Gleis fünf (das Gleis = la vía del tren).",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "f9l2e1", type: "match", prompt: "Empareja la palabra de la estación",
              pairs: [
                { target: "die Fahrkarte", source: "el billete" },
                { target: "das Gleis", source: "la vía (del tren)" },
                { target: "die Abfahrt", source: "la salida" },
                { target: "die Ankunft", source: "la llegada" },
              ],
              itemIds: ["fahrkarte", "gleis", "abfahrt", "ankunft"],
            },
            {
              id: "f9l2e2", type: "mc", prompt: "Reconoce el significado",
              question: "„Wann fährt der Zug nach Berlin?“",
              options: ["¿De dónde viene el tren de Berlín?", "¿Cuándo sale el tren a Berlín?", "¿Dónde está el tren a Berlín?", "¿Cuánto cuesta el tren a Berlín?"],
              answer: 1,
              whyWrong: ["Eso sería «Woher kommt der Zug?»", null, "Eso sería «Wo ist der Zug?»", "Eso sería «Was kostet der Zug?»"],
              itemIds: ["wannfaehrtzug"],
              tip: "Wann = cuándo. La respuesta recicla tu hora: «Um acht Uhr».",
            },
            {
              id: "f9l2e3", type: "mc", prompt: "Elige el separable correcto",
              question: "«bajarse (del tren)» =",
              options: ["einsteigen", "aussteigen", "umsteigen"],
              answer: 1,
              whyWrong: ["ein- = hacia dentro: subirse", null, "um- = cambio: hacer transbordo"],
              itemIds: ["einsteigen", "aussteigen", "umsteigen"],
              tip: "El prefijo lo dice todo: ein (dentro), aus (fuera), um (cambio).",
            },
            {
              id: "f9l2e4", type: "cloze", prompt: "Completa el anuncio",
              text: "Der Zug nach Berlin fährt von ___ fünf.",
              answers: ["Gleis"],
              translation: "El tren a Berlín sale de la vía cinco.",
              hints: ["La palabra de la vía del tren, con mayúscula", "G-l-e-i-s — la ei suena «ai»"],
              itemIds: ["gleis", "zug"],
            },
            {
              id: "f9l2e5", type: "cloze", prompt: "Completa el separable",
              text: "Ich steige in Hannover ___.",
              answers: ["um"],
              translation: "Hago transbordo en Hannover.",
              hints: ["El prefijo del cambio de tren", "Se fue al final de la frase, como auf en «Ich stehe auf»"],
              itemIds: ["umsteigen"],
            },
            {
              id: "f9l2e6", type: "listen", prompt: "Escucha y escribe lo que oyes",
              text: "Wir steigen hier aus",
              translation: "Nos bajamos aquí",
              hints: ["Un separable con prefijo aus al final", "Empieza con «Wir steigen...»"],
              itemIds: ["aussteigen", "hier"],
            },
            {
              id: "f9l2e7", type: "cloze", prompt: "Completa el separable",
              text: "Wir steigen in den Bus ___.",
              answers: ["ein"],
              translation: "Nos subimos al autobús.",
              hints: ["El prefijo de «hacia dentro»", "e-i-n al final"],
              itemIds: ["einsteigen", "bus"],
            },
            {
              id: "f9l2e9", type: "listen", prompt: "Escucha el panel de llegadas",
              text: "Die Ankunft ist um zehn Uhr",
              translation: "La llegada es a las diez",
              hints: ["An + kunft", "Recicla tu hora: um zehn Uhr"],
              itemIds: ["ankunft", "umachtuhr"],
            },
            {
              id: "f9l2e10", type: "build", prompt: "Construye el anuncio de salida",
              target: "Die Abfahrt ist um acht Uhr",
              translation: "La salida es a las ocho",
              distractors: ["Ankunft", "an"],
              itemIds: ["abfahrt", "umachtuhr"],
            },
            {
              id: "f9l2e11", type: "type", prompt: "Pregunta por tu tren",
              question: "¿Cuándo sale el tren a Berlín?",
              answers: ["Wann fährt der Zug nach Berlin?", "Wann fährt der Zug nach Berlin"],
              hints: ["Wann + fahren conjugado para er (¡Umlaut!)", "Wann fährt der Zug nach ...?"],
              itemIds: ["wannfaehrtzug", "zug"],
              strictUmlaut: true,
            },
          ],
        },
      ],
      resources: [
        { label: "Goethe — Fotogeschichte «Mit dem Zug»", url: "https://www.goethe.de/prj/mwd/de/deu/fot.html", note: "Fotohistoria del Goethe sobre viajar en tren: Fahrkarte, Gleis y umsteigen en imágenes reales." },
        { label: "Nicos Weg — «Am Bahnhof»", url: "https://learngerman.dw.com/es/overview", note: "Busca el capítulo de la estación: anuncios de Abfahrt y Ankunft con audio nativo." },
      ],
    },
    {
      id: "f9l3",
      phaseId: "f9",
      title: "Wohin fährst du?",
      subtitle: "Wo vs Wohin — y los chunks nach / zum / zur",
      minutes: 9,
      sections: [
        {
          kind: "phrases",
          title: "Decir a dónde vas",
          // La parte de vacaciones (urlaub, hotel, wohinurlaub, fliegen,
          // flugzeug) se partió a f9l3b: aquí quedaban 10 ítems nuevos.
          // "einefahrkartenach" llegó de f9l2: es el chunk «nach + destino».
          itemIds: ["wohin", "ichfahrenach", "zumarzt", "zurbank", "land", "einefahrkartenach"],
        },
        {
          kind: "note",
          note: {
            title: "La regla detrás: ¿dónde estás o a dónde vas?",
            body: "El español usa «dónde» para todo — el alemán no: <b>Wo?</b> = dónde ESTÁS (Wo wohnst du?) · <b>Wohin?</b> = a dónde VAS (Wohin fährst du?). Para el destino, dos chunks: <b>nach</b> + ciudad o país sin artículo (Ich fahre nach München, nach Spanien) y <b>zu</b> + persona o lugar de la ciudad: zum Arzt (zu + dem), zur Bank (zu + der). Apréndelos como bloques: <b>zum</b> para der/das, <b>zur</b> para die. Y en la taquilla, el mismo nach: <b>Eine Fahrkarte nach Berlin, bitte.</b>",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "f9l3e1", type: "mc", prompt: "¿Wo o Wohin?",
              question: "„___ fährst du?“ — „Nach München!“",
              options: ["Wo", "Wohin", "Woher"],
              answer: 1,
              whyWrong: ["Wo pregunta dónde estás — la respuesta sería «in München»", null, "Woher pregunta de dónde vienes — la respuesta sería «aus München»"],
              itemIds: ["wohin"],
              tip: "La respuesta te delata: nach = movimiento → la pregunta era Wohin.",
            },
            {
              id: "f9l3e2", type: "match", prompt: "Empareja destino y traducción",
              pairs: [
                { target: "nach München", source: "a Múnich" },
                { target: "zum Arzt", source: "al médico" },
                { target: "zur Bank", source: "al banco" },
                { target: "das Land", source: "el país" },
              ],
              itemIds: ["ichfahrenach", "zumarzt", "zurbank", "land"],
            },
            {
              id: "f9l3e3", type: "cloze", prompt: "Completa (ciudad)",
              text: "Ich fahre ___ München.",
              answers: ["nach"],
              translation: "Voy a Múnich.",
              hints: ["Ciudades y países van con esta preposición, sin artículo", "n-a-c-h"],
              itemIds: ["ichfahrenach"],
            },
            {
              id: "f9l3e4", type: "cloze", prompt: "Completa (persona/lugar)",
              text: "Ich gehe ___ Arzt.",
              answers: ["zum"],
              translation: "Voy al médico.",
              hints: ["der Arzt → zu + dem, contraído", "z-u-m"],
              itemIds: ["zumarzt"],
            },
            {
              id: "f9l3e5", type: "cloze", prompt: "Completa (lugar femenino)",
              text: "Ich gehe ___ Bank.",
              answers: ["zur"],
              translation: "Voy al banco.",
              hints: ["die Bank → zu + der, contraído", "z-u-r"],
              itemIds: ["zurbank", "bank"],
              tip: "zum para der/das (zum Arzt, zum Supermarkt) · zur para die (zur Bank, zur Apotheke).",
            },
            {
              id: "f9l3e6", type: "mc", prompt: "¿nach o zu?",
              question: "«Voy a España» →",
              options: ["Ich fahre zu Spanien", "Ich fahre nach Spanien"],
              answer: 1,
              whyWrong: ["zu es para personas y lugares de la ciudad — los países van con nach", null],
              itemIds: ["ichfahrenach", "land"],
              tip: "País o ciudad (sin artículo) → nach. Persona o lugar de tu ciudad → zu.",
            },
            {
              // Movido desde f9l2 (era f9l2e8) junto con "einefahrkartenach".
              id: "f9l3e13", type: "build", prompt: "Construye — compra tu billete",
              target: "Eine Fahrkarte nach Berlin, bitte",
              translation: "Un billete a Berlín, por favor",
              distractors: ["Gleis", "mit"],
              itemIds: ["einefahrkartenach", "fahrkarte"],
              tip: "La frase de supervivencia en la taquilla: Eine Fahrkarte nach + destino + bitte.",
            },
            {
              // Movido desde f9l2 (era f9l2e12).
              id: "f9l3e14", type: "type", prompt: "Producción: en la taquilla",
              question: "Un billete a Múnich, por favor",
              answers: ["Eine Fahrkarte nach München, bitte", "Eine Fahrkarte nach München bitte"],
              hints: ["Mismo patrón que con Berlín", "Eine Fahrkarte nach ... , bitte"],
              itemIds: ["einefahrkartenach", "fahrkarte"],
              tip: "München lleva ü. Con esta frase ya puedes viajar por toda Alemania.",
            },
            {
              id: "f9l3e11", type: "type", prompt: "Traduce",
              question: "Voy a Múnich",
              answers: ["Ich fahre nach München"],
              hints: ["fahren + nach + ciudad", "München con ü"],
              itemIds: ["ichfahrenach"],
            },
            {
              id: "f9l3e12", type: "type", prompt: "Cierre de producción",
              question: "¿A dónde vas? — Voy al médico",
              answers: [
                "Wohin gehst du? — Ich gehe zum Arzt",
                "Wohin gehst du? Ich gehe zum Arzt",
                "Wohin gehst du? - Ich gehe zum Arzt",
                "Wohin gehst du? — Ich gehe zum Arzt.",
              ],
              hints: ["Pregunta con Wohin, respuesta con zum", "Wohin gehst du? — Ich gehe zum ..."],
              itemIds: ["wohin", "zumarzt"],
            },
          ],
        },
      ],
      resources: [
        { label: "Nicos Weg — «Wohin gehst du?»", url: "https://learngerman.dw.com/es/overview", note: "Capítulos A1 con nach/zu en diálogos: escucha la diferencia Wo/Wohin en contexto." },
        { label: "Goethe — Mein Weg nach Deutschland", url: "https://www.goethe.de/prj/mwd/de/index.html", note: "Portal del Goethe sobre la vida cotidiana en Alemania — mira la sección de movilidad y transporte." },
      ],
    },
    {
      // Lección creada al partir f9l3 (tenía 10 ítems nuevos): la mitad de
      // vacaciones (Urlaub, Hotel, fliegen, Flugzeug) vive ahora aquí, con
      // sus ejercicios re-etiquetados con el prefijo f9l3b.
      id: "f9l3b",
      phaseId: "f9",
      title: "Urlaub!",
      subtitle: "Vacaciones: fliegen, el hotel y «Wohin fährst du im Urlaub?»",
      minutes: 8,
      sections: [
        {
          kind: "phrases",
          title: "Las vacaciones y el verbo fliegen",
          itemIds: ["urlaub", "hotel", "wohinurlaub", "fliegen", "flugzeug"],
        },
        {
          kind: "note",
          note: {
            title: "La regla detrás: fliegen para lo lejano, im Urlaub para el plan",
            body: "Para destinos lejanos, un verbo nuevo: <b>fliegen</b> = volar / ir en avión (das Flug<b>zeug</b> = la «cosa de volar») — Wir <b>fliegen</b> nach Spanien, con el mismo <b>nach</b> de la lección anterior. Las vacaciones van con <b>im</b>: <b>im Urlaub</b> — Wohin fährst du <b>im Urlaub</b>? Y donde duermes: <b>das Hotel</b> (ho-TÉL, tónica al final).",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "f9l3be1", type: "mc", prompt: "¿fahren o fliegen?",
              question: "«VOLAMOS a Italia» →",
              options: ["Wir fahren nach Italien", "Wir fliegen nach Italien"],
              answer: 1,
              whyWrong: ["fahren es con ruedas o raíles — volar es fliegen", null],
              itemIds: ["fliegen"],
              tip: "fahren = tierra · fliegen = aire · gehen = a pie. Tres verbos para moverte.",
            },
            {
              id: "f9l3be2", type: "match", prompt: "Empareja el vocabulario del viaje",
              pairs: [
                { target: "der Urlaub", source: "las vacaciones" },
                { target: "das Hotel", source: "el hotel" },
                { target: "das Flugzeug", source: "el avión" },
                { target: "fliegen", source: "volar" },
              ],
              itemIds: ["urlaub", "hotel", "flugzeug", "fliegen"],
            },
            {
              // Movido desde f9l3 (era f9l1e7).
              id: "f9l3be3", type: "cloze", prompt: "Completa el transporte",
              text: "Wir fliegen mit dem ___ nach Spanien.",
              answers: ["Flugzeug"],
              translation: "Volamos a España en avión.",
              hints: ["Literal: la «cosa de volar»", "Flug + zeug, con mayúscula"],
              itemIds: ["fliegen", "flugzeug"],
            },
            {
              // Movido desde f9l3 (era f9l1e8).
              id: "f9l3be4", type: "build", prompt: "Construye la frase",
              target: "Wir fliegen nach Spanien",
              translation: "Volamos a España",
              distractors: ["fahren", "mit"],
              itemIds: ["fliegen"],
              tip: "Con fliegen no necesitas «mit dem Flugzeug» — el avión ya va dentro del verbo.",
            },
            {
              // Movido desde f9l3 (era f9l3e8).
              id: "f9l3be5", type: "cloze", prompt: "Completa",
              text: "Wir fahren im ___ nach Italien.",
              answers: ["Urlaub"],
              translation: "En las vacaciones vamos a Italia.",
              hints: ["Con mayúscula: es sustantivo", "U-r-l-a-u-b — la au suena como en «casa»"],
              itemIds: ["urlaub", "ichfahrenach"],
            },
            {
              // Movido desde f9l3 (era f9l3e7).
              id: "f9l3be6", type: "listen", prompt: "Escucha y escribe lo que oyes",
              text: "Wohin fährst du im Urlaub?",
              translation: "¿A dónde vas de vacaciones?",
              hints: ["Empieza con Wohin", "im Urlaub = de vacaciones"],
              itemIds: ["wohinurlaub", "urlaub"],
            },
            {
              // Movido desde f9l3 (era f9l3e9).
              id: "f9l3be7", type: "listen", prompt: "Escucha y transcribe",
              text: "Das Hotel ist sehr teuer",
              translation: "El hotel es muy caro",
              hints: ["Recicla teuer de tus compras", "Empieza con «Das Hotel...»"],
              itemIds: ["hotel", "teuer"],
            },
            {
              // Movido desde f9l3 (era f9l3e10).
              id: "f9l3be8", type: "build", prompt: "Construye la pregunta",
              target: "Wohin fährst du im Urlaub?",
              translation: "¿A dónde vas de vacaciones?",
              distractors: ["Wo", "nach"],
              itemIds: ["wohinurlaub", "wohin"],
              tip: "Movimiento → Wohin, nunca Wo. Y fährst con Umlaut.",
            },
            {
              id: "f9l3be9", type: "type", prompt: "Cierre de producción",
              question: "Volamos a España",
              answers: ["Wir fliegen nach Spanien"],
              hints: ["fliegen conjugado para wir", "Wir fliegen nach ..."],
              itemIds: ["fliegen"],
            },
          ],
        },
      ],
      resources: [
        { label: "Nicos Weg — «Urlaub»", url: "https://learngerman.dw.com/es/overview", note: "Busca los capítulos de vacaciones y viajes del A1: fliegen y el hotel en diálogos reales." },
      ],
    },
    {
      id: "f9l4",
      phaseId: "f9",
      title: "Im Hotel",
      subtitle: "Reservar, preguntar el precio y recoger la llave",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "El hotel de arriba a abajo",
          // 8 ítems presentados. "zimmer" y "nacht" ya se presentaron en fases
          // anteriores: aquí son solo referencia (los ejercicios los reciclan
          // vía itemIds sin volver a presentarlos).
          itemIds: ["schluessel", "rezeption", "buchen", "ichhabegebucht", "habensiezimmerfrei", "gepaeck", "koffer", "pronacht"],
        },
        {
          kind: "note",
          note: {
            title: "La regla detrás: dos fórmulas fijas para el mostrador",
            body: "Reservar es <b>buchen</b>: Ich möchte ein Zimmer buchen. Si ya reservaste, la fórmula fija es <b>Ich habe ein Zimmer gebucht</b> — apréndela entera como bloque; la mecánica (Perfekt) llega en el módulo Ayer y mañana (Módulo 10), hoy solo la usas. Sin reserva: <b>Haben Sie ein Zimmer frei?</b> Y el precio recicla tu «Was kostet...?»: Was kostet das Zimmer <b>pro Nacht</b>? La llave (der Schlüssel) te espera an der Rezeption.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "f9l4e1", type: "match", prompt: "Empareja la palabra del hotel",
              pairs: [
                { target: "der Schlüssel", source: "la llave" },
                { target: "der Koffer", source: "la maleta" },
                { target: "das Gepäck", source: "el equipaje" },
                { target: "die Rezeption", source: "la recepción" },
              ],
              itemIds: ["schluessel", "koffer", "gepaeck", "rezeption"],
            },
            {
              id: "f9l4e2", type: "mc", prompt: "Reconoce el significado",
              question: "„Haben Sie ein Zimmer frei?“",
              options: ["¿Tiene una habitación libre?", "¿Es gratis la habitación?", "¿Dónde está mi habitación?"],
              answer: 0,
              whyWrong: [null, "frei aquí = libre/disponible, no gratis — gratis sería «kostenlos»", "Eso sería «Wo ist mein Zimmer?»"],
              itemIds: ["habensiezimmerfrei", "zimmer", "hotel"],
            },
            {
              id: "f9l4e3", type: "mc", prompt: "Elige la fórmula fija",
              question: "«He reservado una habitación» →",
              options: ["Ich buche ein Zimmer", "Ich habe ein Zimmer gebucht", "Ich möchte ein Zimmer"],
              answer: 1,
              whyWrong: ["Eso es presente: «reservo/estoy reservando»", null, "Eso es «quisiera una habitación» — aún sin reserva"],
              itemIds: ["ichhabegebucht", "buchen"],
              tip: "habe + gebucht al final: fórmula fija por ahora. El porqué llega en el módulo Ayer y mañana (Módulo 10).",
            },
            {
              id: "f9l4e4", type: "cloze", prompt: "Completa la fórmula",
              text: "Ich habe ein Zimmer ___.",
              answers: ["gebucht"],
              translation: "He reservado una habitación.",
              hints: ["La forma fija de buchen en esta fórmula", "ge- delante: g-e-b-u-c-h-t"],
              itemIds: ["ichhabegebucht"],
            },
            {
              id: "f9l4e5", type: "cloze", prompt: "Completa la pregunta del precio",
              text: "Was kostet das Zimmer ___ Nacht?",
              answers: ["pro"],
              translation: "¿Cuánto cuesta la habitación por noche?",
              hints: ["Igual que en español: «por» noche", "p-r-o"],
              itemIds: ["pronacht", "nacht"],
            },
            {
              id: "f9l4e6", type: "cloze", prompt: "Completa",
              text: "Ich habe viel ___.",
              answers: ["Gepäck"],
              translation: "Tengo mucho equipaje.",
              hints: ["Con Umlaut ä y mayúscula", "Ge-p-ä-ck"],
              itemIds: ["gepaeck", "viel"],
            },
            {
              id: "f9l4e7", type: "cloze", prompt: "Completa la escena",
              text: "Der ___ ist an der Rezeption.",
              answers: ["Schlüssel"],
              translation: "La llave está en la recepción.",
              hints: ["Empieza con Schl- y lleva ü", "S-c-h-l-ü-s-s-e-l — la sch suena «sh»"],
              itemIds: ["schluessel", "rezeption"],
            },
            {
              id: "f9l4e8", type: "build", prompt: "Construye con möchten",
              target: "Ich möchte ein Zimmer buchen",
              translation: "Quisiera reservar una habitación",
              distractors: ["gebucht", "frei"],
              itemIds: ["buchen", "moechte", "zimmer"],
              tip: "möchte en 2ª posición, buchen al final — la Satzklammer que ya dominas.",
            },
            {
              id: "f9l4e9", type: "listen", prompt: "Escucha y transcribe",
              text: "Mein Koffer ist an der Rezeption",
              translation: "Mi maleta está en la recepción",
              hints: ["Koffer con doble f", "Rezeption: la z suena «ts»"],
              itemIds: ["koffer", "rezeption"],
            },
            {
              id: "f9l4e10", type: "build", prompt: "Construye la pregunta del precio",
              target: "Was kostet das Zimmer pro Nacht?",
              translation: "¿Cuánto cuesta la habitación por noche?",
              distractors: ["Uhr", "frei"],
              itemIds: ["pronacht", "waskostetdas"],
            },
            {
              id: "f9l4e11", type: "type", prompt: "Pregunta en el mostrador",
              question: "¿Tiene una habitación libre?",
              answers: ["Haben Sie ein Zimmer frei?", "Haben Sie ein Zimmer frei"],
              hints: ["Formal: Haben Sie...", "... ein Zimmer frei?"],
              itemIds: ["habensiezimmerfrei"],
            },
            {
              id: "f9l4e12", type: "type", prompt: "Cierre de producción",
              question: "He reservado una habitación",
              answers: ["Ich habe ein Zimmer gebucht"],
              hints: ["La fórmula fija completa", "Ich habe ... gebucht"],
              itemIds: ["ichhabegebucht"],
              tip: "Di esta frase al llegar y el resto del check-in va solo.",
            },
          ],
        },
      ],
      resources: [
        { label: "Goethe — Mein Weg nach Deutschland", url: "https://www.goethe.de/prj/mwd/de/index.html", note: "Ejercicios del Goethe sobre situaciones cotidianas — busca las escenas de alojamiento y viaje." },
        { label: "Nicos Weg — «Ein Zimmer, bitte»", url: "https://learngerman.dw.com/es/overview", note: "Busca los capítulos de hotel/vivienda: el diálogo del mostrador con audio nativo." },
      ],
    },
    {
      id: "f9l5",
      phaseId: "f9",
      title: "Klang: fahren/waren y Zug/Züge",
      subtitle: "Pares mínimos f/v(w), u/ü y la familia -zeug",
      minutes: 9,
      sections: [
        {
          kind: "phrases",
          title: "Los sonidos del viaje",
          itemIds: ["wirwaren", "fahrzeug", "werkzeug", "zug", "fahren", "flugzeug"],
        },
        {
          kind: "note",
          note: {
            title: "La regla detrás: tres trampas de oído",
            body: "1) <b>fahren</b> («fáa-ren», con f) vs <b>waren</b> («váa-ren», la w suena v) — casi iguales al oído, significados opuestos: vamos vs estuvimos. «Wir waren in Berlin» es tu fórmula fija para el pasado. 2) <b>u vs ü</b>: der Zug («tsuuk») → die Z<b>ü</b>ge («tsüü-gue») — el plural cambia la vocal, y escribir «Zuge» sin Umlaut es error. 3) La familia <b>-zeug</b> = «cosa para»: Flug<b>zeug</b> (cosa para volar = avión), Fahr<b>zeug</b> (vehículo), Werk<b>zeug</b> (herramienta). Siempre das, siempre «tsoik».",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "f9l5e1", type: "mc", prompt: "Reconoce la fórmula del pasado",
              question: "„Wir waren in Berlin“",
              options: ["Vamos a Berlín", "Estuvimos en Berlín", "Vivimos en Berlín"],
              answer: 1,
              whyWrong: ["Eso sería «Wir fahren nach Berlin» — con f", null, "Eso sería «Wir wohnen in Berlin»"],
              itemIds: ["wirwaren"],
              tip: "waren = pasado de sein (fórmula fija por ahora). La w suena v: «váa-ren».",
            },
            {
              id: "f9l5e2", type: "listen", prompt: "Par mínimo: ¿f o w?",
              text: "Wir waren in Hamburg",
              translation: "Estuvimos en Hamburgo",
              hints: ["¿Oyes «f» o «v»? La v escrita es w", "Empieza con «Wir waren...»"],
              itemIds: ["wirwaren"],
            },
            {
              id: "f9l5e3", type: "listen", prompt: "Dictado con Umlaut",
              text: "Zwei Züge fahren nach Berlin",
              translation: "Dos trenes van a Berlín",
              hints: ["El plural de Zug cambia la vocal", "Züge con ü — «Zuge» cuenta como error"],
              itemIds: ["zug", "fahren"],
              strictUmlaut: true,
            },
            {
              id: "f9l5e4", type: "mc", prompt: "La familia -zeug",
              question: "„das Werkzeug“ =",
              options: ["la herramienta", "el avión", "el vehículo"],
              answer: 0,
              whyWrong: [null, "El avión es das Flugzeug — la «cosa de volar»", "El vehículo es das Fahrzeug — la «cosa de conducir»"],
              itemIds: ["werkzeug", "fahrzeug", "flugzeug"],
              tip: "-zeug = «cosa para»: Werk (trabajo) + zeug = herramienta.",
            },
            {
              id: "f9l5e5", type: "cloze", prompt: "Completa el plural (¡Umlaut!)",
              text: "Ein Zug, zwei ___.",
              answers: ["Züge"],
              translation: "Un tren, dos trenes.",
              hints: ["Plural con Umlaut y -e", "Z-ü-g-e"],
              itemIds: ["zug"],
              strictUmlaut: true,
              tip: "Como Haus → Häuser: el plural alemán adora el Umlaut. Zug → Züge.",
            },
            {
              id: "f9l5e6", type: "match", prompt: "Empareja la familia -zeug",
              pairs: [
                { target: "das Flugzeug", source: "el avión" },
                { target: "das Fahrzeug", source: "el vehículo" },
                { target: "das Werkzeug", source: "la herramienta" },
                { target: "der Zug", source: "el tren" },
              ],
              itemIds: ["flugzeug", "fahrzeug", "werkzeug", "zug"],
            },
            {
              id: "f9l5e7", type: "speak", prompt: "Lee en voz alta (pulsa audio para comparar)",
              text: "Wir waren in Berlin und wir fahren jetzt nach Hamburg",
              phonetic: "via VÁA-ren in bea-LÍN unt via FÁA-ren yetst naj HÁM-burk",
              translation: "Estuvimos en Berlín y ahora vamos a Hamburgo",
              itemIds: ["wirwaren", "fahren"],
            },
            {
              id: "f9l5e8", type: "build", prompt: "Repaso: construye con la pinza",
              target: "Ich muss am Bahnhof umsteigen",
              translation: "Tengo que hacer transbordo en la estación",
              distractors: ["steige", "um"],
              itemIds: ["umsteigen", "bahnhof", "muessen"],
              tip: "Con un modal, el separable NO se separa: umsteigen entero al final.",
            },
            {
              id: "f9l5e9", type: "type", prompt: "Traduce",
              question: "el vehículo (con artículo)",
              answers: ["das Fahrzeug"],
              hints: ["La familia -zeug siempre es das", "Fahr + zeug"],
              itemIds: ["fahrzeug"],
            },
            {
              id: "f9l5e10", type: "type", prompt: "Cierre de producción",
              question: "Estuvimos en Berlín",
              answers: ["Wir waren in Berlin"],
              hints: ["La fórmula fija del pasado", "Wir waren in ..."],
              itemIds: ["wirwaren"],
              tip: "Tu primera frase en pasado — de contrabando. El sistema completo llega en el módulo Ayer y mañana (Módulo 10).",
            },
          ],
        },
      ],
      resources: [
        { label: "Easy German — pronunciación u/ü", url: "https://www.youtube.com/@EasyGerman", note: "Busca «umlaut pronunciation»: pares mínimos u/ü en boca de nativos." },
        { label: "Goethe — Deutsch für dich", url: "https://www.goethe.de/prj/dfd/de/home.cfm", note: "Filtra por A1 y practica ejercicios de audio para afinar el par f/w." },
      ],
    },
    {
      id: "f9l6",
      phaseId: "f9",
      title: "Mini-cuento: Nico fährt nach Hamburg",
      subtitle: "Toda la fase en una historia — con café incluido",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "Una palabra nueva para la historia — y endlich, de repaso",
          itemIds: ["verpassen", "endlich"],
        },
        {
          kind: "note",
          note: {
            title: "La historia: Nico fährt nach Hamburg",
            body: "<i>Lee la historia en voz alta. Luego demuestra que la entendiste.</i> Casi todo el vocabulario es tuyo — lo nuevo va glosado abajo.<br/><br/>1. Heute fährt Nico nach Hamburg — seine Freundin Emma wohnt dort.<br/>2. Um acht Uhr ist er am Bahnhof und kauft eine Fahrkarte.<br/>3. Der Zug fährt um halb neun von Gleis fünf ab.<br/>4. In Hannover muss Nico umsteigen.<br/>5. Aber der Kaffee am Bahnhof ist so gut! Nico trinkt langsam — und er <b>verpasst</b> den Zug!<br/>6. „Oh nein!“, denkt Nico. „Ich muss eine Stunde warten.“<br/>7. Nico lernt eine Stunde Deutsch — eine Stunde ist viel Zeit!<br/>8. Um zwölf Uhr ist er <b>endlich</b> in Hamburg. Emma wartet am Gleis — mit einem Kaffee!<br/>9. Nico lacht: „Kaffee? Nein, danke!“<br/><br/><i>Apoyo: die Freundin = novia/amiga · denkt = piensa · wartet = espera · lacht = se ríe.</i>",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "f9l6e1", type: "mc", prompt: "Comprensión: ¿qué pasó?",
              question: "¿Por qué pierde Nico el tren en Hannover?",
              options: ["El tren llega tarde", "Se toma un café muy despacio", "No encuentra el Gleis"],
              answer: 1,
              whyWrong: ["El tren sale puntual — el problema es Nico", null, "El Gleis no es el problema — el café sí"],
              itemIds: ["verpassen"],
            },
            {
              id: "f9l6e2", type: "mc", prompt: "Comprensión: los detalles",
              question: "¿Dónde tiene que hacer transbordo Nico?",
              options: ["In Hamburg", "In Hannover", "In Berlin"],
              answer: 1,
              whyWrong: ["Hamburg es el destino final", null, "Berlín no aparece en la historia — Nico vive allí en otras historias, pero hoy no"],
              itemIds: ["umsteigen"],
            },
            {
              id: "f9l6e3", type: "cloze", prompt: "Completa la frase de la historia",
              text: "Nico trinkt langsam — und er ___ den Zug!",
              answers: ["verpasst"],
              translation: "Nico bebe despacio — ¡y pierde el tren!",
              hints: ["El verbo nuevo de esta lección, conjugado para er", "ver-pass-t"],
              itemIds: ["verpassen", "zug"],
            },
            {
              // Antes match normal: aquí es repaso (vocabulario ya trabajado en la
              // fase y en e1-e3), así que gana tempo — el cronómetro SOLO premia.
              id: "f9l6e4", type: "fastmatch", prompt: "Empareja el vocabulario de la historia — bajar de 25 segundos da bonus (pasarte no resta nada)",
              pairs: [
                { target: "verpassen", source: "perder (el tren)" },
                { target: "endlich", source: "por fin" },
                { target: "umsteigen", source: "hacer transbordo" },
                { target: "das Gleis", source: "la vía (del tren)" },
              ],
              targetSeconds: 25,
              itemIds: ["verpassen", "endlich", "umsteigen", "gleis"],
            },
            {
              id: "f9l6e5", type: "cloze", prompt: "Completa el final feliz",
              text: "Um zwölf Uhr ist Nico ___ in Hamburg.",
              answers: ["endlich"],
              translation: "A las doce Nico está por fin en Hamburgo.",
              hints: ["La palabrita del alivio: «por fin»", "end-lich"],
              itemIds: ["endlich"],
            },
            {
              id: "f9l6e6", type: "build", prompt: "Construye la frase 4 de la historia",
              target: "In Hannover muss Nico umsteigen",
              translation: "En Hannover Nico tiene que hacer transbordo",
              distractors: ["steigt", "um"],
              itemIds: ["umsteigen", "muessen"],
              tip: "«In Hannover» ocupa la posición 1 → muss va 2º y Nico después. Y con modal, umsteigen no se separa.",
            },
            {
              id: "f9l6e7", type: "listen", prompt: "Escucha la frase 8",
              text: "Emma wartet am Gleis",
              translation: "Emma espera en la vía (del tren)",
              hints: ["Nombre + verbo + lugar", "am Gleis — la ei suena «ai»"],
              itemIds: ["gleis"],
            },
            {
              id: "f9l6e8", type: "cloze", prompt: "Completa la hora de la historia",
              text: "Der Zug fährt um ___ neun.",
              answers: ["halb"],
              translation: "El tren sale a las ocho y media (lit. media hacia las nueve).",
              hints: ["Recicla tu hora: 8:30 = media hacia las NUEVE", "h-a-l-b"],
              itemIds: ["halbneun", "zug"],
            },
            {
              id: "f9l6e9", type: "type", prompt: "Traduce",
              question: "Él pierde el tren",
              answers: ["Er verpasst den Zug"],
              hints: ["verpassen conjugado para er", "der Zug en acusativo: den Zug"],
              itemIds: ["verpassen", "zug"],
            },
            {
              id: "f9l6e10", type: "type", prompt: "Cierre de producción",
              question: "Nico está por fin en Hamburgo",
              answers: ["Nico ist endlich in Hamburg"],
              hints: ["sein + endlich + in", "Nico ist endlich in ..."],
              itemIds: ["endlich"],
              tip: "Si entendiste la historia sin diccionario, el módulo De viaje es tuyo. Gute Reise!",
            },
          ],
        },
      ],
      resources: [
        { label: "lingua.com — lecturas A1", url: "https://lingua.com/german/reading/", note: "Textos cortos con preguntas de comprensión — perfectos después de este mini-cuento." },
        { label: "Goethe — Fotogeschichte «Mit dem Zug»", url: "https://www.goethe.de/prj/mwd/de/deu/fot.html", note: "La versión real de la historia de Nico: un viaje en tren contado en fotos." },
      ],
    },
  ],
};
