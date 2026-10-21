// REFERENCIA — Preguntar en alemán: las W-Fragen y los patrones de pregunta
// del A1, con las preguntas oficiales del examen oral (Start Deutsch 1).
// («warum» no aparece en el curso — llega en A2; por eso no está aquí.)
//
// CONVENCIÓN de `sound` (la del curso): sílabas con guiones, la tónica en
// MAYÚSCULAS; w = «v», z = «ts», ei = «ai», ie = «ii» (i larga), h = «j»
// suave, sch/sp/st = «sh», ö = di «e» con boca de «o», ü = di «i» con boca de «u».

export interface QuestionWord {
  de: string;              // "Wer"
  es: string;              // "quién"
  sound?: string;
  example: { de: string; es: string };
  trap?: string;           // "wer ≠ where — falso amigo"
}

export const questionWords: QuestionWord[] = [
  {
    de: "Wer",
    es: "quién",
    sound: "vea",
    example: { de: "Wer ist das? — Das ist meine Schwester.", es: "¿Quién es? — Es mi hermana." },
    trap: "Falso amigo del inglés: wer ≠ where. wer = QUIÉN (persona); «dónde» es wo.",
  },
  {
    de: "Was",
    es: "qué",
    sound: "vas",
    example: { de: "Was machst du beruflich?", es: "¿A qué te dedicas?" },
    trap: "También abre tu pregunta de precios: Was kostet das? (¿cuánto cuesta?) — literal «¿qué cuesta eso?».",
  },
  {
    de: "Wo",
    es: "dónde (sin movimiento)",
    sound: "vo",
    example: { de: "Wo wohnst du? — Ich wohne in Berlin.", es: "¿Dónde vives? — Vivo en Berlín." },
    trap: "Solo para UBICACIÓN. Si hay movimiento hacia un sitio, el alemán exige wohin — el español usa «dónde» para ambos, el alemán no perdona.",
  },
  {
    de: "Wohin",
    es: "adónde (con movimiento)",
    sound: "vo-JÍN",
    example: { de: "Wohin fährst du? — Nach Berlin.", es: "¿Adónde vas? — A Berlín." },
    trap: "wo + hin = hacia dónde. El trío completo: wo (dónde estás), wohin (adónde vas), woher (de dónde vienes).",
  },
  {
    de: "Woher",
    es: "de dónde",
    sound: "vo-JÉA",
    example: { de: "Woher kommen Sie? — Ich komme aus Spanien.", es: "¿De dónde viene usted? — Vengo de España." },
    trap: "Se responde con aus + país/ciudad: aus Mexiko, aus Berlin. Pregunta fija del Sprechen Teil 1.",
  },
  {
    de: "Wann",
    es: "cuándo",
    sound: "van",
    example: { de: "Wann beginnt der Kurs? — Um neun Uhr.", es: "¿Cuándo empieza el curso? — A las nueve." },
    trap: "Se responde con um + hora (um 9 Uhr) o am + día (am Montag). No confundas con «wenn» — para preguntar, siempre wann.",
  },
  {
    de: "Wie",
    es: "cómo",
    sound: "vii",
    example: { de: "Wie heißt du? / Wie geht es dir?", es: "¿Cómo te llamas? / ¿Cómo estás?" },
    trap: "El comodín del A1: Wie alt...? (edad), Wie spät...? (hora), Wie bitte? (¿perdón? — cuando no entendiste).",
  },
  {
    de: "Wie viel / Wie viele",
    es: "cuánto / cuántos",
    sound: "vii fíil / vii FÍI-le",
    example: { de: "Wie viel Uhr ist es? / Wie viele Kinder haben Sie?", es: "¿Qué hora es? / ¿Cuántos hijos tiene usted?" },
    trap: "wie viel + incontable (Uhr, Geld); wie viele + plural contable (Kinder, Hunde). Para precios los alemanes prefieren Was kostet...?",
  },
  {
    de: "Wie lange",
    es: "cuánto tiempo",
    sound: "vii LÁNG-e",
    example: { de: "Wie lange dauert die Fahrt? — Zwei Stunden.", es: "¿Cuánto dura el viaje? — Dos horas." },
    trap: "Literal «cómo de largo». No es «wie viel Zeit»: para duración, los alemanes dicen wie lange.",
  },
  {
    de: "Welcher / Welche / Welches",
    es: "cuál / qué (eligiendo entre opciones)",
    sound: "VÉL-ja / VÉL-je / VÉL-jes",
    example: { de: "Welche Größe haben Sie? — Größe M.", es: "¿Qué talla tiene usted? — La M." },
    trap: "Concuerda con el género como dieser: der Rock → Welcher?, die Jacke → Welche?, das Hemd → Welches? Y en el examen: Welche Sprachen sprechen Sie?",
  },
];

export interface QuestionPattern {
  title: string;           // "Pregunta con verbo primero (Ja/Nein)"
  body: string;            // explicación breve con <b> permitido
  examples: { de: string; es: string }[];
}

export const questionPatterns: QuestionPattern[] = [
  {
    title: "W-Frage: palabra interrogativa + verbo en 2ª posición",
    body: "Cuando la pregunta empieza con una W-Frage (wer, was, wo...), el orden es tu V2 de siempre: <b>W-palabra + verbo + sujeto</b>. La palabra interrogativa ocupa la posición 1, así que el verbo va inmediatamente después y el sujeto detrás — nunca «Wo du wohnst?». Se responde con una frase completa o con el dato pelado.",
    examples: [
      { de: "Wo wohnst du?", es: "¿Dónde vives?" },
      { de: "Was machst du morgen?", es: "¿Qué haces mañana?" },
      { de: "Wann beginnt der Film?", es: "¿Cuándo empieza la película?" },
      { de: "Wohin fahrt ihr im Sommer?", es: "¿Adónde vais en verano?" },
    ],
  },
  {
    title: "Ja/Nein-Frage: el verbo salta a la 1ª posición",
    body: "Si la respuesta esperada es sí o no, NO hay palabra interrogativa: el <b>verbo conjugado abre la frase</b> y el sujeto va justo después — Magst du...?, Hast du...? En español basta la entonación («¿tienes tiempo?»); en alemán el orden cambia de verdad. Con separables y modales, la segunda parte sigue yéndose al final: Stehst du früh <b>auf</b>? · Kannst du <b>kochen</b>?",
    examples: [
      { de: "Magst du Katzen?", es: "¿Te gustan los gatos?" },
      { de: "Hast du am Samstag Zeit?", es: "¿Tienes tiempo el sábado?" },
      { de: "Kannst du gut kochen?", es: "¿Sabes cocinar bien?" },
      { de: "Stehst du früh auf?", es: "¿Te levantas temprano?" },
    ],
  },
  {
    title: "La versión formal: preguntas con Sie",
    body: "Con desconocidos, en tiendas, en el Amt y EN TODO EL EXAMEN ORAL se usa <b>Sie</b> (usted): verbo en <b>-en</b> + Sie con mayúscula. Es la forma que oirás del examinador y la que debes usar con él. Truco: la forma con Sie es idéntica al infinitivo, así que casi no hay conjugación que memorizar — kommen Sie, haben Sie, sprechen Sie. Única excepción: <b>sein</b> → <b>sind Sie</b> (Was sind Sie von Beruf?), nunca «sein Sie».",
    examples: [
      { de: "Wie heißen Sie?", es: "¿Cómo se llama usted?" },
      { de: "Haben Sie ein Zimmer frei?", es: "¿Tiene una habitación libre?" },
      { de: "Können Sie das bitte wiederholen?", es: "¿Puede repetirlo, por favor?" },
      { de: "Was sind Sie von Beruf?", es: "¿A qué se dedica usted?" },
    ],
  },
  {
    title: "Respuestas cortas: Ja, Nein... y Doch",
    body: "A una Ja/Nein-Frage respondes <b>Ja</b> (sí) o <b>Nein</b> (no) — y educadamente añades algo: Ja, gern! · Nein, leider nicht. La estrella es <b>doch</b>: contradice una pregunta NEGATIVA — si te preguntan «Hast du <b>keine</b> Zeit?» y SÍ tienes, «Ja» sonaría ambiguo; dices <b>Doch!</b> (¡sí que tengo!). El español no tiene esta palabra. Es del final del A1 — el curso no lo practica, pero apréndelo: en el examen y en la calle lo oirás seguro.",
    examples: [
      { de: "Hast du Zeit? — Ja, klar!", es: "¿Tienes tiempo? — ¡Sí, claro!" },
      { de: "Kommst du mit? — Nein, leider nicht.", es: "¿Vienes? — No, lamentablemente no." },
      { de: "Hast du keine Zeit? — Doch!", es: "¿No tienes tiempo? — ¡Sí que tengo!" },
      { de: "Magst du keinen Kaffee? — Doch, ich trinke jeden Tag Kaffee.", es: "¿No te gusta el café? — Sí, bebo café todos los días." },
    ],
  },
  {
    title: "Sprechen Teil 1: presentarte — la lista oficial completa",
    body: "En el <b>Teil 1</b> del examen oral te presentas siguiendo la tarjeta oficial con SIETE puntos: <b>Name · Alter · Land · Wohnort · Sprachen · Beruf · Hobby</b>. Después, el examinador SIEMPRE pide dos extras: <b>deletrear</b> tu nombre o una palabra y decir un <b>número</b> (teléfono o código postal). Prepárate estas preguntas hasta decir las respuestas dormido — son puntos regalados. Responde en frases completas: Ich heiße..., Ich bin ... Jahre alt, Ich komme aus..., Ich wohne in..., Ich spreche..., Ich bin ... von Beruf, Mein Hobby ist...",
    examples: [
      { de: "Wie heißen Sie?", es: "¿Cómo se llama usted? → Ich heiße Lucía Ortega." },
      { de: "Wie alt sind Sie?", es: "¿Cuántos años tiene? → Ich bin dreißig Jahre alt." },
      { de: "Woher kommen Sie?", es: "¿De dónde viene? → Ich komme aus Spanien." },
      { de: "Wo wohnen Sie?", es: "¿Dónde vive? → Ich wohne in Valencia." },
      { de: "Welche Sprachen sprechen Sie?", es: "¿Qué idiomas habla? → Ich spreche Spanisch und ein bisschen Deutsch." },
      { de: "Was sind Sie von Beruf?", es: "¿A qué se dedica? → Ich bin Programmiererin von Beruf." },
      { de: "Was ist Ihr Hobby?", es: "¿Cuál es su hobby? → Mein Hobby ist Fußball." },
      { de: "Buchstabieren Sie bitte Ihren Namen.", es: "Deletree su nombre, por favor. → Ich buchstabiere: O-R-T-E-G-A." },
      { de: "Wie ist Ihre Telefonnummer?", es: "¿Cuál es su teléfono? → Meine Telefonnummer ist null eins sieben sechs..." },
    ],
  },
  {
    title: "Sprechen Teil 2: TÚ haces las preguntas (tarjeta con Thema + palabra)",
    body: "En el <b>Teil 2</b> te dan una tarjeta con un tema (p. ej. <b>Essen</b>, <b>Freizeit</b>) y una palabra (p. ej. <b>trinken</b>) — y te toca a TI formular una pregunta con ella para otro candidato; luego respondes la suya. Fórmula segura: convierte la palabra en una <b>W-Frage o Ja/Nein-Frage con du</b>. Vale cualquier pregunta gramaticalmente correcta que use la palabra — no busques la pregunta perfecta, busca TU patrón: Was + verbo + du gern? funciona casi siempre.",
    examples: [
      { de: "Thema Essen, Wort «trinken» → Was trinkst du gern?", es: "¿Qué te gusta beber?" },
      { de: "Thema Freizeit, Wort «schwimmen» → Schwimmst du gern?", es: "¿Te gusta nadar?" },
      { de: "Thema Tagesablauf, Wort «aufstehen» → Wann stehst du auf?", es: "¿A qué hora te levantas?" },
      { de: "Thema Einkaufen, Wort «kosten» → Was kostet ein Kilo Tomaten?", es: "¿Cuánto cuesta un kilo de tomates?" },
    ],
  },
];
