// LA LIBRETA INGLESA DEL B1 — lo que se consulta con prisa y no se aprende de
// memoria de una sentada: el reparto de los tiempos, la pasiva, el estilo
// indirecto, los tres condicionales, las relativas, los dos montones del
// gerundio, las preposiciones pegadas, los phrasal verbs del nivel, los
// conectores CON SU NIVEL REAL y las trampas del hispanohablante.
//
// QUÉ NO ESTÁ AQUÍ, Y ES A PROPÓSITO:
//   · Lo del A1 (la -s de tercera, el orden de las preguntas, los diez
//     contrastes de sonido, números y fechas) vive en `referenceEn.ts`, y lo
//     del A2 (los irregulares por familias, la -ed, comparar, cantidades,
//     futuro, modales, pronombres) en `referenceEnA2.ts`. Una libreta que se
//     repite deja de ser una libreta: aquí solo entra lo que el B1 añade.
//   · Nada que no esté enseñado en enb1m1-enb1m12. La libreta RECOGE; no
//     amplía. Si una fila no tiene módulo detrás, no está.
//   · Lo que el curso enseña solo para RECONOCER —el past perfect continuous,
//     los conectores B2, el molde «He is thought to be…»— va marcado como tal,
//     porque decirle a alguien que produzca lo que solo tiene que entender es
//     la manera más rápida de que escriba peor.
//
// LOS NIVELES DE LOS CONECTORES están verificados acepción por acepción en el
// English Vocabulary Profile y el English Grammar Profile (PLAN-EN-B1, apéndice
// A.4). Es el dato que casi ningún manual tiene bien: `however` es A2 y
// `whereas`, `moreover`, `furthermore`, `as a result` e `in conclusion` son B2.
//
// Todos los strings en inglés son audio-ables tal cual: la bocina los lee con
// la voz inglesa cuando la libreta está en modo inglés.

/* ══ 1 · LOS TIEMPOS, EN UNA TABLA ═════════════════════════════════════════ */
// El B1 es donde el sistema verbal explota (en el corpus TREACLE, el sintagma
// verbal alcanza en B1 su máximo relativo de errores). La tabla no está para
// aprendérsela: está para mirarla mientras se escribe.

export interface EnB1Tense {
  id: string;
  /** el nombre que usa el curso */
  name: string;
  form: string;
  /** cuándo se usa, en una línea */
  when: string;
  example: string;
  es: string;
  moduleId: string;
}

export const EN_B1_TENSE_TIP =
  "Si solo miras una cosa de esta pestaña, que sea la primera fila contra la segunda. «Llevo dos años aquí» NO es I live here since two years: es I've lived here for two years. Es el error nº 1 del hispanohablante en inglés, el que sobrevive hasta C1 y el que se arregla mirando esta tabla diez veces.";

export const enb1Tenses: EnB1Tense[] = [
  {
    id: "enb1-t-pp",
    name: "Present perfect",
    form: "have / has + participio",
    when: "empezó antes y sigue, o pasó sin fecha y cuenta ahora",
    example: "I've lived here for two years.",
    es: "Llevo dos años viviendo aquí.",
    moduleId: "enb1m1",
  },
  {
    id: "enb1-t-past",
    name: "Past simple",
    form: "verbo en pasado",
    when: "terminado, con su momento cerrado (ayer, en 2023, el año pasado)",
    example: "I moved in two years ago.",
    es: "Me instalé hace dos años.",
    moduleId: "enb1m1",
  },
  {
    id: "enb1-t-ppc",
    name: "Present perfect continuous",
    form: "have / has been + -ing",
    when: "la DURACIÓN de una actividad que sigue: How long have you been…?",
    example: "I've been working here since March.",
    es: "Llevo trabajando aquí desde marzo.",
    moduleId: "enb1m1",
  },
  {
    id: "enb1-t-pastcont",
    name: "Past continuous",
    form: "was / were + -ing",
    when: "el decorado de una escena pasada: lo que estaba pasando cuando pasó otra cosa",
    example: "She said she was living in Leeds.",
    es: "Dijo que estaba viviendo en Leeds.",
    moduleId: "enb1m3",
  },
  {
    id: "enb1-t-pastperf",
    name: "Past perfect",
    form: "had + participio",
    when: "el piso de abajo del pasado: lo que ya estaba antes de lo que cuentas",
    example: "When I got there, she had already left.",
    es: "Cuando llegué, ya se había ido.",
    moduleId: "enb1m10",
  },
  {
    id: "enb1-t-usedto",
    name: "used to / would",
    form: "used to + infinitivo · would + infinitivo",
    when: "costumbres y estados de antes que ya no son (would, solo acciones)",
    example: "I used to live with my sister.",
    es: "Antes vivía con mi hermana.",
    moduleId: "enb1m10",
  },
];

/** Los marcadores mandan: son lo que decide el tiempo antes que el significado */
export const enb1Markers: [string, string, string][] = [
  ["for + duración", "present perfect", "for two years · for ages · for three months"],
  ["since + arranque", "present perfect", "since March · since 2023 · since I arrived"],
  ["just, already, yet", "present perfect", "I've just moved in. · I haven't signed it yet."],
  ["ever, never", "present perfect", "Have you ever been to Manchester?"],
  ["ago, last, in 2023, yesterday", "past simple", "I arrived in London in 2023."],
  ["when I was…", "past simple", "When I was a student, I shared a room."],
  ["by the time…", "past perfect en la otra mitad", "By the time we arrived, the film had started."],
];

/** Dónde va cada adverbio del perfecto: la posición es lo que corrige el examen */
export const enb1PerfectAdverbs: [string, string, string][] = [
  ["just", "have + JUST + participio", "I've just moved in."],
  ["already", "have + ALREADY + participio", "I've already paid."],
  ["yet", "al FINAL, y solo en negativa o pregunta", "I haven't signed it yet."],
  ["still", "antes del verbo principal, detrás de be", "I'm still looking."],
  ["ever / never", "have + EVER/NEVER + participio", "I've never been to Scotland."],
];

/** Simple o continuo: la decisión que se falla, con la regla que la resuelve */
export const enb1SimpleVsContinuous = {
  title: "¿Simple o continuo?",
  body:
    "Con la DURACIÓN de una actividad, el inglés prefiere el continuo: I've been working here since March. Con verbos de estado (be, know, have = tener) va el simple y el continuo no existe: I've known her for two years, jamás «I've been knowing». Y cuando cuentas CUÁNTAS veces o CUÁNTOS, también simple: I've seen that film three times.",
  rows: [
    ["la duración de una actividad", "I've been working here since March.", "continuo"],
    ["un estado (be, know, have)", "I've known her for two years.", "simple — «I've been knowing» no existe"],
    ["cuántas veces", "I've seen it three times.", "simple"],
    ["cuántos, cuánto", "I've read two of her books.", "simple"],
  ] as [string, string, string][],
};

/* ══ 2 · LA PASIVA ═════════════════════════════════════════════════════════ */
// Aviso de nivel que el curso da con nombre y apellidos: LanguageCert coloca la
// pasiva en B2, no en B1. Se enseña igual porque el texto del Reading Part 4
// está escrito en pasiva de arriba abajo: sin ella no lees tu propio examen.

export const EN_B1_PASSIVE_TIP =
  "Dos piezas y ya está: be en el tiempo que toque + participio. Lo que hay que entender no es la forma, es PARA QUÉ: el inglés pasa a pasiva cuando quien hace la acción no importa, no se sabe o se prefiere no decir. Por eso vive en la prensa, en los carteles y en los informes. Y el agente con by es la excepción: en un texto real, cuatro de cada cinco pasivas van sin él.";

export const enb1PassiveTable: [string, string, string][] = [
  ["Present simple", "They deliver the paper.", "The paper is delivered."],
  ["Past simple", "They published it on Tuesday.", "It was published on Tuesday."],
  ["Present perfect", "They have sold the tickets.", "The tickets have been sold."],
  ["Con modal", "You can't eat here.", "Eating is not permitted."],
  ["Con agente (la excepción)", "A journalist writes it.", "It is written by a journalist."],
];

/** El «se» español tiene TRES salidas en inglés, y hay que elegir */
export const enb1SeExits = {
  title: "Un «se» español, tres salidas inglesas",
  body:
    "El español tiene una máquina de decir cosas sin culpable —el «se»— y el inglés no la tiene: tiene tres piezas distintas. Y el error del hispanohablante no es de forma, es de FRECUENCIA: tira siempre de they say, porque es lo más corto, y no produce la pasiva nunca. En una carta formal eso se paga en el criterio de vocabulario, por registro.",
  rows: [
    ["Se limpia todas las tardes.", "The library is cleaned every evening.", "escrito, formal, prensa"],
    ["Aquí no se puede comer.", "You aren't allowed to eat here.", "hablado, normas — ese «you» es «uno»"],
    ["Dicen que la piscina cierra.", "They say the pool is closing.", "hablado, rumor"],
    ["Se cree que fue un fallo.", "It is believed that it was a mistake.", "escrito, informe"],
    ["Aquí se habla español.", "Spanish is spoken here.", "nunca «Here speaks Spanish»"],
  ] as [string, string, string][],
};

/** Los dos moldes impersonales, y el registro de cada uno */
export const enb1ImpersonalMoulds: [string, string, string][] = [
  ["Calle", "They reckon it'll close.", "muy hablado, muy británico"],
  ["Neutro", "People say it's closing.", "vale en cualquier sitio"],
  ["Examen", "It is said that it will close.", "molde 1 — el que hay que producir"],
  ["Examen, versión corta", "He is thought to be abroad.", "molde 2 — basta con reconocerlo"],
  ["Verbos que entran", "say · believe · think · know · report · expect · show", "no hace falta ninguno más"],
];

/** get + participio: la pasiva de la calle */
export const enb1GetPassive = {
  title: "get + participio: la otra pasiva, la de la calle",
  body:
    "Significa lo mismo que la de be, pero es informal, es repentina y casi siempre es mala: get stolen, get hurt, get caught, get lost, get sacked. Se reconoce en el Listening a todas horas y en el Writing formal se cambia por be. Y no admite by con comodidad: cuando quieras nombrar al culpable, vuelve a be.",
  rows: [
    ["My phone got nicked.", "My phone was stolen.", "Me han robado el móvil."],
    ["Ben got hurt at work.", "Ben was injured at work.", "Ben se hizo daño en el trabajo."],
    ["The post got taken down.", "The post was removed.", "Retiraron la publicación."],
    ["—", "They stole my bike.", "«They stole me my bike» no existe: steal no lleva ese dativo"],
  ] as [string, string, string][],
};

/** El titular borra lo que se puede adivinar. Reconocer, no imitar. */
export const enb1Headlines: [string, string, string][] = [
  ["LIBRARY SAVED AFTER PROTEST", "The library was saved after a protest.", "el artículo y el «was»"],
  ["TWO SCHOOLS MERGED", "Two schools were merged.", "el «were»"],
  ["POOL TO CLOSE IN MARCH", "The pool is going to close in March.", "«is going to» queda en «to»"],
  ["ROAD TO BE REPAIRED", "The road is going to be repaired.", "«is going»"],
];

/* ══ 3 · EL ESTILO INDIRECTO ═══════════════════════════════════════════════ */
// El backshift NO es interferencia del español: el español también concuerda
// tiempos («dijo que estaba cansado»). Lo que sí falla es say/tell, la
// inversión de la pregunta contada y las órdenes con subjuntivo.

export const EN_B1_REPORTED_TIP =
  "La buena noticia primero: el paso atrás no es un calco. «Está cansado» → «Dijo que ESTABA cansado» lo haces todos los días sin pensarlo. Lo que sí hay que aprender es el reparto de say / tell / ask, que en español es un solo «me dijo», y que una pregunta contada deja de comportarse como pregunta.";

/** Cada verbo de decir con su construcción: es una lista corta y cerrada */
export const enb1SayTell: [string, string, string][] = [
  ["tell + PERSONA, siempre", "He told me he was tired.", "«He told that…» no existe: si dices tell, di a quién"],
  ["say sin persona", "He said he was tired.", "y con persona, con to: He said to me…"],
  ["ask + persona", "He asked me if I was free.", "vale para preguntas y para peticiones"],
  ["explain / describe / suggest + TO", "He explained the contract to me.", "«He explained me…» es el calco del clítico"],
  ["mention / announce / point out + TO", "He mentioned it to me yesterday.", "mismo grupo que explain"],
];

/** El paso atrás, tiempo por tiempo */
export const enb1Backshift: [string, string][] = [
  ["«I'm living in Leeds.»", "She said she was living in Leeds."],
  ["«I saw the film.» / «I've seen it.»", "He said he had seen the film."],
  ["«I'll call you back.»", "She said she would call me back."],
  ["«I can come on Friday.»", "He said he could come on Friday."],
  ["«I must go now.»", "She said she had to go then."],
  ["«I had already left.»", "She said she had already left. — el past perfect ya no retrocede más"],
];

/** Y el paso que el español NO da: los marcadores también se mueven */
export const enb1BackshiftMarkers: [string, string][] = [
  ["yesterday", "the day before"],
  ["tomorrow", "the next day"],
  ["today", "that day"],
  ["now", "then"],
  ["here", "there"],
  ["this", "that"],
];

/** Una pregunta contada ya no se pregunta: tres cosas cambian */
export const enb1ReportedQuestions = {
  title: "La pregunta contada pierde la inversión y pierde el «do»",
  body:
    "Coe marca esto como problema «para intermedios y hasta avanzados»: es de los que sobreviven a todo. Tres reglas y una cuarta que es el otro calco: las órdenes y peticiones se cuentan con INFINITIVO, no con «that» ni con subjuntivo.",
  rows: [
    ["«Where do you live?»", "She asked me where I lived.", "sin inversión y sin do"],
    ["«What time is it?»", "He asked me what time it was.", "nunca «what time was it»"],
    ["«Are you free?»", "She asked me if I was free.", "sin palabra interrogativa → if"],
    ["«Have you finished?»", "They asked me whether I had finished.", "whether: el de registro alto y el obligatorio con «or not»"],
    ["«Call me back.»", "He asked me to call him back.", "petición → infinitivo"],
    ["«Don't worry.»", "She told me not to worry.", "en negativo, NOT TO"],
  ] as [string, string, string][],
};

/** Diez verbos que valen por veinte «said» — cada uno con su construcción */
export const enb1ReportingVerbs: [string, string, string][] = [
  ["admit + -ing", "He admitted taking the money.", "reconocer algo que hiciste"],
  ["promise + to", "She promised to call me.", "prometer"],
  ["complain about + -ing", "He complained about the noise.", "quejarse"],
  ["apologise for + -ing", "She apologised for being late.", "pedir perdón"],
  ["warn somebody about", "They warned me about the strike.", "avisar"],
  ["suggest + -ing", "She suggested going by bus.", "sugerir — nunca «suggested me»"],
  ["refuse + to", "He refused to answer.", "negarse"],
  ["point out that", "She pointed out that the price had gone up.", "señalar un dato"],
  ["announce", "They announced the new timetable.", "anunciar"],
  ["mention", "He mentioned it yesterday.", "mencionar"],
];

/* ══ 4 · LOS TRES CONDICIONALES, EL DESEO Y LAS TEMPORALES ═════════════════ */

export const EN_B1_COND_TIP =
  "Una sola regla de bolsillo y no hace falta más: el would vive SIEMPRE en la mitad que NO lleva if. Si en tu frase hay un would pegado a un if, bórralo. Y su gemela: detrás de if, when, as soon as, until, as long as, provided that, in case y unless va PRESENTE, aunque hables de mañana — el inglés ya sabe que es futuro por la otra mitad.";

export interface EnB1Conditional {
  id: string;
  name: string;
  ifHalf: string;
  mainHalf: string;
  when: string;
  example: string;
  es: string;
  trap: string;
  moduleId: string;
}

export const enb1Conditionals: EnB1Conditional[] = [
  {
    id: "enb1-cond-0",
    name: "Cero — lo que pasa siempre",
    ifHalf: "if + presente",
    mainHalf: "presente",
    when: "una ley, una costumbre, la letra pequeña: siempre que pasa A, pasa B",
    example: "If you book in advance, it costs half as much.",
    es: "Si reservas con antelación, cuesta la mitad.",
    trap: "«If you will book…»",
    moduleId: "enb1m9",
  },
  {
    id: "enb1-cond-1",
    name: "Primero — lo veo posible",
    ifHalf: "if + presente",
    mainHalf: "will + infinitivo",
    when: "puede pasar de verdad, y apostarías a que sí",
    example: "If you keep the receipt, they will change it.",
    es: "Si guardas el tique, te lo cambian.",
    trap: "«If it will rain, we'll take the bus.»",
    moduleId: "enb1m5",
  },
  {
    id: "enb1-cond-2",
    name: "Segundo — no lo veo, o es mentira",
    ifHalf: "if + pasado simple (irreal)",
    mainHalf: "would / could / might + infinitivo",
    when: "hipótesis, consejo envuelto, lo que harías y no vas a hacer",
    example: "If I won the lottery, I would give up work.",
    es: "Si me tocara la lotería, dejaría de trabajar.",
    trap: "«If I would have the money…»",
    moduleId: "enb1m5",
  },
];

/** El deseo y el arrepentimiento: el mismo pasado irreal, otro oficio */
export const enb1Wishes: [string, string, string][] = [
  ["I wish + PASADO", "I wish I had more money.", "Ojalá tuviera más dinero (no lo tengo). Nunca «I wish I have»"],
  ["If only + PASADO", "If only it were cheaper!", "Lo mismo, con más queja dentro; suele ir sola"],
  ["should have + participio", "I should have kept the receipt.", "Debería haberlo guardado, y no lo hice. Terreno B2: basta con la fórmula entera"],
  ["shouldn't have + participio", "I shouldn't have bought it.", "No debería haberlo comprado (lo compré)"],
];

/** Las conjunciones que se llevan el futuro por delante */
export const enb1TimeClauses: [string, string, string][] = [
  ["when", "I'll ring you when I get in.", "«when I will get in» no existe"],
  ["as soon as", "As soon as I get there, I'll text you.", "el «llegue» del español es presente aquí"],
  ["until", "Wait here until they call the flight.", "hasta que algo pare"],
  ["by the time", "By the time we get there, it'll be full.", "para cuando: casi siempre lleva will en la otra mitad"],
  ["once", "Once we're through security, we can relax.", "una vez que"],
  ["as long as", "You can take it on board as long as it fits.", "siempre que — condición con aviso"],
  ["provided (that)", "Provided that you check in online, you don't have to queue.", "lo mismo, pero escrito y formal"],
  ["in case", "Take a jumper in case it gets cold.", "por si acaso: el jersey se coge ANTES"],
  ["unless", "I won't move unless the rent goes down.", "ya lleva la negación dentro: «unless you don't…» es error doble"],
];

/* ══ 5 · LAS RELATIVAS ═════════════════════════════════════════════════════ */

export const EN_B1_RELATIVE_TIP =
  "El calco es el error nº 1 de este bloque y viene de una frase que en español coloquial suena bien: «la persona que ELLA trabaja conmigo». El relativo YA es el sujeto de su frase, así que detrás no se pone otro. Y el verbo de la relativa concuerda con lo que va delante: somebody who speaks Spanish, nunca «who speak».";

export const enb1Relatives: [string, string, string][] = [
  ["una persona", "who / that", "the colleague who sits next to me"],
  ["una cosa o un sitio", "which / that", "the café which opened in 2019"],
  ["algo DE alguien", "whose", "a colleague whose English is perfect"],
  ["un sitio (= en el que)", "where", "the place where I work"],
  ["un momento", "when", "the day when I got the job"],
  ["una razón", "why", "the reason why I left"],
  ["tras the only, the first, the best, everything (si el hueco pide who/which)", "se prefiere that", "the only thing that matters"],
];

export interface EnB1RelativeRule {
  id: string;
  title: string;
  body: string;
  rows: [string, string, string][];
  moduleId: string;
}

export const enb1RelativeRules: EnB1RelativeRule[] = [
  {
    id: "enb1-rel-omit",
    title: "Cuándo desaparece el relativo",
    body:
      "El «que» español no se puede quitar nunca; el inglés lo borra cuando el relativo es el OBJETO de su frase. La prueba en tres segundos: mira lo que va justo detrás. Si va un sujeto nuevo (I, she, Sam…), se puede quitar. Si va directamente un verbo, se queda.",
    rows: [
      ["un verbo detrás (works, pays…)", "NO se quita — es el sujeto", "the colleague who works nights"],
      ["un sujeto nuevo detrás (I, she…)", "SÍ se quita — es el objeto", "the job (that) I applied for"],
      ["y la preposición se queda al final", "SÍ se quita", "the person (who) I work with"],
      ["la versión formal, que en B1 no hace falta", "—", "the person with whom I work"],
    ],
    moduleId: "enb1m2",
  },
  {
    id: "enb1-rel-commas",
    title: "Dos comas cambian lo que dice la frase",
    body:
      "Sin comas, la relativa dice CUÁL: sin ella no sabrías de quién hablas. Con comas, añade un dato de más y la frase se sostiene sin ella. Tres reglas duras de la explicativa: nunca «that», nunca se puede quitar el relativo, y las dos comas o ninguna — la puntuación va dentro del criterio de Organisation, así que no es estética, son puntos.",
    rows: [
      ["The nurse who works nights is Amy.", "hay varias enfermeras; hablamos de una", "especificativa, sin comas"],
      ["Amy, who is a nurse, works nights.", "ya sabes quién es Amy; te cuento algo más", "explicativa, con dos comas"],
      ["Amy, that is a nurse, works nights.", "MAL", "«that» no entra en la explicativa"],
      ["I start at six, which means I finish at two.", "«which» se refiere a toda la frase anterior", "«what means» no existe: what no es relativo"],
    ],
    moduleId: "enb1m2",
  },
];

/* ══ 6 · VERB PATTERNS ═════════════════════════════════════════════════════ */
// Aquí no hay nada que entender: hay que clasificar. Es reparto léxico puro,
// como el género de los sustantivos en español.

export const EN_B1_PATTERN_TIP =
  "No existe ninguna regla que te diga si detrás de un verbo va -ing o to. Son dos montones y se reparten, igual que se reparten los incontables del A2. Y el truco del examen: cuando no te acuerdes de en qué montón está un verbo, CAMBIA DE VERBO. Si dudas de «I've finished to write», di «I've written it» y sigue: Accuracy puntúa lo que escribes, no lo que intentabas escribir.";

export const enb1GerundVerbs: string[] = [
  "enjoy", "avoid", "mind", "finish", "keep", "practise", "imagine", "risk",
  "give up", "end up", "can't stand", "suggest", "involve",
];

export const enb1InfinitiveVerbs: string[] = [
  "decide", "agree", "offer", "refuse", "manage", "promise", "afford", "hope",
  "want", "need", "plan", "expect", "seem", "learn",
];

export const enb1PatternExamples: [string, string, string][] = [
  ["I enjoy living here.", "I decided to complain.", "«I enjoy to live here»"],
  ["I don't mind waiting.", "They agreed to look into it.", "«I don't mind to wait»"],
  ["They keep putting bags there.", "He refused to pay.", "«He refused paying»"],
  ["without asking (preposición)", "I hope to hear from you.", "«without to ask»"],
];

/** Los seis que cambian de significado: aquí SÍ hay lógica */
export interface EnB1ChangingVerb {
  verb: string;
  ing: string;
  ingEs: string;
  to: string;
  toEs: string;
}

export const enb1ChangingVerbs: EnB1ChangingVerb[] = [
  {
    verb: "stop",
    ing: "I stopped listening.",
    ingEs: "Dejé de escuchar — se acabó lo de escuchar",
    to: "I stopped to listen.",
    toEs: "Me paré a escuchar — paré de andar, con ese fin",
  },
  {
    verb: "remember",
    ing: "I remember posting the letter.",
    ingEs: "Me acuerdo de haberla echado — primero la acción",
    to: "Remember to sign it.",
    toEs: "Acuérdate de firmarlo — todavía no está hecho",
  },
  {
    verb: "forget",
    ing: "I'll never forget seeing that.",
    ingEs: "No se me va a olvidar haberlo visto",
    to: "I forgot to tell you.",
    toEs: "Se me olvidó decírtelo — no llegué a decirlo",
  },
  {
    verb: "try",
    ing: "We tried talking to them.",
    ingEs: "Probamos a hablar con ellos, a ver si funcionaba",
    to: "We tried to talk to them.",
    toEs: "Intentamos hablar con ellos — costó, o no salió",
  },
  {
    verb: "go on",
    ing: "She went on talking.",
    ingEs: "Siguió con lo mismo",
    to: "She went on to talk about the price.",
    toEs: "Pasó a otra cosa",
  },
  {
    verb: "mean",
    ing: "It means waiting two hours.",
    ingEs: "Supone esperar dos horas",
    to: "I meant to tell you.",
    toEs: "Tenía intención de decírtelo",
  },
];

/** La regla que SÍ es regla: detrás de preposición, -ing. Sin excepciones. */
export const enb1PrepIng = {
  title: "Detrás de preposición, siempre -ing",
  body:
    "Sin excepciones y sin listas: without asking, before signing, how about meeting, there's no point in complaining. El caso venenoso es el «to» que es PREPOSICIÓN y parece infinitivo — look forward to, be used to, get used to —: detrás va -ing igual que detrás de cualquier otra.",
  rows: [
    ["I'm looking forward to seeing the flat.", "«to see the flat»", "ese «to» es preposición, no infinitivo"],
    ["I've got used to living here.", "«to live here»", "lo mismo: get used TO + -ing"],
    ["They put it up without asking anybody.", "«without to ask»", "without es preposición"],
    ["There's no point in complaining.", "«no point in complain»", "in es preposición"],
    ["How about meeting halfway?", "«How about to meet»", "about es preposición"],
  ] as [string, string, string][],
};

/* ══ 7 · PREPOSICIONES PEGADAS ═════════════════════════════════════════════ */
// No hay regla: hay unidad léxica. El verbo y su preposición se aprenden como
// una sola palabra con un espacio en medio.

export const EN_B1_PREP_TIP =
  "El corpus TREACLE, medido con hispanohablantes, pone la preposición en el 14 % de los errores gramaticales, y el subtipo dominante es elegir la equivocada. No se arregla razonando: se arregla aprendiendo el bloque entero, como aprendiste «flatmate» y no «flat» + «mate».";

export interface EnB1PrepGroup {
  id: string;
  label: string;
  hint: string;
  rows: [string, string, string][];
  moduleId: string;
}

export const enb1PrepGroups: EnB1PrepGroup[] = [
  {
    id: "enb1-prep-life",
    label: "Las de la vida diaria",
    hint: "Las nueve del módulo 1: son las que más veces al día se dicen y las que más veces se fallan.",
    moduleId: "enb1m1",
    rows: [
      ["depender de", "depend on", "«depends of»"],
      ["preocuparse por", "worry about", "«worry for»"],
      ["pensar en", "think about / think of", "«think in»"],
      ["escuchar algo", "listen to", "«listen music» — aquí el inglés SÍ pone preposición"],
      ["tener ganas de", "look forward to + -ing", "«look forward to see»"],
      ["llevarse bien con", "get on with", "—"],
      ["acostumbrarse a", "get used to + -ing", "«get used to live»"],
      ["esperar a alguien", "wait for", "«wait somebody»"],
      ["aguantar algo", "put up with", "«put up something»"],
    ],
  },
  {
    id: "enb1-prep-work",
    label: "Las del trabajo",
    hint: "Cinco bloques que caen en toda carta de presentación y en toda entrevista.",
    moduleId: "enb1m2",
    rows: [
      ["presentarse a un trabajo", "apply for a job", "«apply to a job» — a una empresa sí: apply to a company"],
      ["dársele bien algo", "be good at", "«good in»"],
      ["ser responsable de", "be responsible for", "«responsible of»"],
      ["tratar con gente", "deal with people", "—"],
      ["trabajar con / para", "work with people · work for a company", "dos preposiciones, dos cosas distintas"],
    ],
  },
  {
    id: "enb1-prep-money",
    label: "Las del dinero",
    hint: "Truco de bolsillo: casi todo lo que sale de tu bolsillo va con FOR. La excepción grande es spend, que va con ON.",
    moduleId: "enb1m5",
    rows: [
      ["pagar algo", "pay for something", "«I paid the coffees»"],
      ["gastarse en algo", "spend money on something", "«spend in takeaways»"],
      ["cobrarle algo a alguien", "charge somebody for something", "—"],
      ["pedir algo", "ask for something", "—"],
      ["ahorrar para", "save up for", "—"],
      ["quedarse sin", "run out of", "—"],
    ],
  },
  {
    id: "enb1-prep-none",
    label: "Los que en inglés NO llevan preposición",
    hint: "El error contrario, y conviene tenerlo en otro montón: aquí el español la pone y el inglés no. Mezclar los dos montones confunde.",
    moduleId: "enb1m12",
    rows: [
      ["entrar en la habitación", "enter the room", "«enter in the room»"],
      ["asistir a una reunión", "attend a meeting", "«assist to a meeting» — assist es ayudar"],
      ["casarse con alguien", "marry somebody", "«marry with»"],
      ["llegar a un sitio", "reach London · arrive in London", "«arrive to London»"],
      ["llamar a alguien", "phone somebody · ring somebody", "«phone to somebody»"],
    ],
  },
];

/** La regla de bolsillo más rentable del nivel: to + verbo, for + sustantivo */
export const enb1ForTo = {
  title: "«Para» son dos palabras en inglés: to + VERBO, for + SUSTANTIVO",
  body:
    "El español tiene una sola palabra para dos cosas que el inglés separa, y la separación cabe en una línea. Prueba de dos segundos: mira lo que va después. ¿Un verbo en infinitivo? to. ¿Un sustantivo? for. ¿Un verbo, pero estás diciendo para qué SIRVE un objeto? for + -ing.",
  rows: [
    ["Vine para estudiar inglés", "I came here to study English.", "«I came here for study English»"],
    ["Fui a por información", "I went to the council for information.", "«for get information»"],
    ["Es para cortar cartón", "It's for cutting cardboard.", "«for to cut cardboard»"],
    ["Para no despertar al bebé", "…so as not to wake the baby.", "«for not wake the baby»"],
    ["Escribimos con el fin de", "We wrote in order to get an answer.", "la versión formal de la carta"],
  ] as [string, string, string][],
};

/* ══ 8 · PHRASAL VERBS DEL NIVEL ═══════════════════════════════════════════ */

export const EN_B1_PHRASAL_TIP =
  "El hispanohablante tiene un reflejo con los phrasal verbs: los evita y tira del latinismo (postpone en vez de put off, abandon en vez de give up), porque le suena más culto. En inglés pasa lo contrario: suena a instancia. Y la regla del pronombre no admite discusión — si el phrasal se puede partir y el objeto es it, them, him o her, va EN MEDIO: I looked it up, jamás «I looked up it».";

export interface EnB1Phrasal {
  verb: string;
  es: string;
  example: string;
  /** ¿se parte cuando el objeto es un pronombre? */
  splits: boolean;
}

export interface EnB1PhrasalGroup {
  id: string;
  label: string;
  hint: string;
  verbs: EnB1Phrasal[];
  moduleId: string;
}

export const enb1PhrasalGroups: EnB1PhrasalGroup[] = [
  {
    id: "enb1-phr-home",
    label: "Casa y convivencia",
    hint: "Los del módulo 1: piso, vecinos y aguante.",
    moduleId: "enb1m1",
    verbs: [
      { verb: "settle in", es: "hacerse a un sitio nuevo", example: "It took me a year to settle in.", splits: false },
      { verb: "put up with", es: "aguantar", example: "I can't put up with it.", splits: false },
      { verb: "get on with", es: "llevarse bien con", example: "I get on with my flatmate.", splits: false },
      { verb: "look back", es: "echar la vista atrás", example: "When I look back, I can't believe it.", splits: false },
    ],
  },
  {
    id: "enb1-phr-work",
    label: "Trabajo y papeleo",
    hint: "Los del módulo 2: son los que aparecen en un anuncio y en una entrevista.",
    moduleId: "enb1m2",
    verbs: [
      { verb: "fill in", es: "rellenar un impreso", example: "Fill it in online.", splits: true },
      { verb: "hand in", es: "presentar (la dimisión, un trabajo)", example: "I handed in my notice.", splits: true },
      { verb: "turn down", es: "rechazar (y bajar el volumen)", example: "They turned it down.", splits: true },
      { verb: "take on", es: "contratar", example: "They took on two new baristas.", splits: true },
      { verb: "end up", es: "acabar en un sitio sin planearlo", example: "She ended up working nights.", splits: false },
      { verb: "deal with", es: "tratar con, ocuparse de", example: "She deals with them all day.", splits: false },
    ],
  },
  {
    id: "enb1-phr-health",
    label: "Salud",
    hint: "Los siete del módulo 6, con la regla de siempre: si detrás hay dos palabritas (out of, down on), no se parte.",
    moduleId: "enb1m6",
    verbs: [
      { verb: "get over", es: "quitarse algo de encima", example: "It takes a week to get over the flu.", splits: false },
      { verb: "come down with", es: "empezar a caer malo", example: "I've come down with something.", splits: false },
      { verb: "look after", es: "cuidar de alguien", example: "I'm looking after my neighbour.", splits: false },
      { verb: "put off", es: "aplazar", example: "Don't put it off.", splits: true },
      { verb: "run out of", es: "quedarse sin", example: "We've run out of them.", splits: false },
      { verb: "give up", es: "dejar algo definitivamente", example: "He gave up smoking.", splits: true },
      { verb: "cut down on", es: "reducir, no eliminar", example: "I've cut down on salt.", splits: false },
      { verb: "turn up", es: "presentarse, aparecer", example: "Turn up ten minutes early.", splits: false },
      { verb: "carry on", es: "seguir", example: "You can't carry on like this.", splits: false },
    ],
  },
  {
    id: "enb1-phr-travel",
    label: "Viaje",
    hint: "Los seis del módulo 9: la preposición no se traduce, se aprende pegada.",
    moduleId: "enb1m9",
    verbs: [
      { verb: "set off", es: "salir hacia un sitio", example: "We set off at five.", splits: false },
      { verb: "get in", es: "llegar (un tren, un vuelo)", example: "What time does your flight get in?", splits: false },
      { verb: "check in / check out", es: "facturar · dejar el hotel", example: "We check out at ten.", splits: false },
      { verb: "drop off", es: "dejar a alguien en un sitio", example: "Can you drop me off at the station?", splits: true },
      { verb: "pick up", es: "recoger a alguien", example: "I'll pick you up from the airport.", splits: true },
      { verb: "see somebody off", es: "ir a despedir a alguien", example: "We went to see her off.", splits: true },
      { verb: "get off", es: "bajarse", example: "Get off at the third stop.", splits: false },
    ],
  },
  {
    id: "enb1-phr-people",
    label: "Relaciones",
    hint: "Los del módulo 10: en inglés las relaciones se dicen casi todas con phrasal verbs.",
    moduleId: "enb1m10",
    verbs: [
      { verb: "get on (with)", es: "llevarse bien", example: "We get on really well.", splits: false },
      { verb: "fall out (with)", es: "pelearse y dejar de hablarse", example: "I fell out with my brother.", splits: false },
      { verb: "make up", es: "hacer las paces", example: "We made up a week later.", splits: false },
      { verb: "take after", es: "salir a alguien de la familia", example: "She takes after her mother.", splits: false },
      { verb: "look up to", es: "admirar a alguien", example: "I look up to my older sister.", splits: false },
      { verb: "let somebody down", es: "fallarle a alguien", example: "I let her down.", splits: true },
      { verb: "grow up", es: "criarse", example: "I grew up in a small town.", splits: false },
    ],
  },
  {
    id: "enb1-phr-claim",
    label: "Reclamar y arreglar",
    hint: "Los siete del módulo 11, y look into es la palabra que quieres que use el ayuntamiento en su respuesta.",
    moduleId: "enb1m11",
    verbs: [
      { verb: "sort out", es: "arreglar un lío", example: "I'll sort it out.", splits: true },
      { verb: "look up", es: "buscar un dato", example: "I looked it up.", splits: true },
      { verb: "look into", es: "estudiar un asunto oficialmente", example: "The council are looking into it.", splits: false },
      { verb: "throw away", es: "tirar a la basura", example: "Don't throw them away.", splits: true },
      { verb: "get away with", es: "salirse con la suya", example: "They always get away with it.", splits: false },
      { verb: "find out", es: "averiguar", example: "I wanted to find out who paid for it.", splits: true },
      { verb: "keep down", es: "mantener bajo (el ruido)", example: "We keep it down at night.", splits: true },
    ],
  },
];

/** La regla del pronombre, en cuatro filas */
export const enb1PhrasalPronoun: [string, string, string][] = [
  ["I looked up the rule.", "I looked it up.", "«I looked up it»"],
  ["I'll sort out the bins.", "I'll sort them out.", "«I'll sort out them»"],
  ["They're looking into the case.", "They're looking into it.", "«They're looking it into»"],
  ["I can't put up with the noise.", "I can't put up with it.", "«I can't put it up with»"],
];

/* ══ 9 · CONECTORES, CON SU NIVEL REAL ═════════════════════════════════════ */
// Niveles del English Vocabulary Profile y del English Grammar Profile,
// acepción por acepción (PLAN-EN-B1, apéndice A.4). El EGP registra lo que un
// aprobado de B1 ya produce; el EVP marca lo que se espera que conozca.

export const EN_B1_CONNECTOR_TIP =
  "Dos avisos que no te va a dar ningún manual. Primero: «however» NO es una novedad del B1 — es A2, ya lo tienes por debajo. Segundo: hay una familia entera que suena muy culta y que es B2 —whereas, moreover, furthermore, as a result, in conclusion, even if—; meterla en un texto de B1 no sube la nota. Lo que la sube es colocar bien los de tu nivel, porque la mitad de los fallos no son de significado: son de qué pieza cabe detrás.";

export interface EnB1Connector {
  word: string;
  es: string;
  /** qué va detrás */
  follows: string;
  level: "A2" | "B1" | "B2";
  example: string;
}

export const enb1Connectors: EnB1Connector[] = [
  { word: "although", es: "aunque", follows: "frase entera", level: "B1", example: "Although the flat is small, it's very bright." },
  { word: "though", es: "aunque (y al final, «eso sí»)", follows: "frase entera", level: "B1", example: "It was long. It was worth it, though." },
  { word: "even though", es: "aunque (con el volumen más alto)", follows: "frase entera", level: "B1", example: "Even though it costs more, I buy the local one." },
  { word: "while", es: "si bien, mientras que", follows: "frase entera", level: "B1", example: "While the pay is good, the hours are terrible." },
  { word: "despite", es: "a pesar de", follows: "sustantivo o -ing", level: "B1", example: "Despite the high rent, I took the flat." },
  { word: "in spite of", es: "a pesar de", follows: "sustantivo o -ing", level: "B1", example: "In spite of the price, I bought it." },
  { word: "unless", es: "a menos que (negación incluida)", follows: "frase en afirmativo", level: "B1", example: "I won't move unless the rent goes down." },
  { word: "since", es: "como, ya que (causal)", follows: "frase entera", level: "B1", example: "Since I speak Spanish, they took me on." },
  { word: "due to", es: "debido a", follows: "sustantivo", level: "B1", example: "I left due to the hours." },
  { word: "therefore", es: "por eso, por lo tanto", follows: "coma y frase nueva", level: "B1", example: "The rent went up. Therefore, I moved out." },
  { word: "otherwise", es: "si no", follows: "coma y frase nueva", level: "B1", example: "Send your CV today, otherwise you'll miss it." },
  { word: "besides", es: "además", follows: "coma y frase nueva", level: "B1", example: "Besides, the neighbourhood is quiet." },
  { word: "in addition", es: "además (escrito)", follows: "coma y frase nueva", level: "B1", example: "In addition, the delivery is free." },
  { word: "for instance", es: "por ejemplo", follows: "un ejemplo", level: "B1", example: "…for instance, the noise at night." },
  { word: "apart from", es: "aparte de", follows: "sustantivo o -ing", level: "B1", example: "Apart from the pay, everything is fine." },
  { word: "according to", es: "según", follows: "sustantivo", level: "B1", example: "According to the advert, no experience is necessary." },
  { word: "at least", es: "al menos (lo bueno dentro de lo malo)", follows: "frase", level: "B1", example: "At least she apologised." },
  { word: "actually", es: "en realidad (¡no «actualmente»!)", follows: "frase", level: "B1", example: "Actually, it wasn't true." },
  { word: "anyway", es: "en fin, el caso es que", follows: "frase", level: "B1", example: "Anyway, I told her the truth." },
  { word: "instead of", es: "en vez de", follows: "sustantivo o -ing", level: "B1", example: "I walk instead of taking the bus." },
  { word: "on the other hand", es: "por otro lado", follows: "punto delante, coma detrás", level: "B1", example: "On the other hand, the paper is free." },
  { word: "however", es: "sin embargo", follows: "punto delante, coma detrás", level: "A2", example: "The bins are new. However, nobody uses them." },
  { word: "so", es: "así que", follows: "frase", level: "A2", example: "I missed the bus, so I walked." },
  { word: "because of", es: "por, a causa de", follows: "sustantivo", level: "A2", example: "…because of the noise." },
  { word: "whereas", es: "mientras que (contrasta dos cosas paralelas)", follows: "frase entera", level: "B2", example: "Cardiff recycles a lot, whereas London recycles less." },
  { word: "nevertheless", es: "no obstante", follows: "punto delante, coma detrás", level: "B2", example: "Nevertheless, the plan went ahead." },
  { word: "moreover", es: "es más", follows: "punto delante, coma detrás", level: "B2", example: "Moreover, the cost has doubled." },
  { word: "furthermore", es: "además (muy formal)", follows: "punto delante, coma detrás", level: "B2", example: "Furthermore, nobody was consulted." },
  { word: "as a result", es: "como consecuencia", follows: "punto delante, coma detrás", level: "B2", example: "As a result, the shop closed." },
  { word: "in conclusion", es: "en conclusión", follows: "punto delante, coma detrás", level: "B2", example: "In conclusion, it was worth it." },
  { word: "even if", es: "incluso si", follows: "frase entera", level: "B2", example: "Even if it rains, we're going." },
];

/** Los tres calcos de conector que hay que matar */
export const enb1ConnectorTraps: [string, string, string][] = [
  ["Although the flat is small, but it's bright.", "Although the flat is small, it's bright.", "«although» ya hace de «pero»: uno de los dos sobra"],
  ["Despite the rent is high…", "Although the rent is high… / Despite the high rent…", "despite no admite frase entera detrás"],
  ["Despite of the rain…", "Despite the rain… / In spite of the rain…", "«despite of» no existe: o uno, o el otro"],
  ["However the bins are new, nobody uses them.", "The bins are new. However, nobody uses them.", "however no une dos frases en una"],
];

/* ══ 10 · TRAMPAS Y FALSOS AMIGOS ══════════════════════════════════════════ */
// Las de este nivel no son las del A2. Estas son las que aparecen CUANDO YA SE
// HABLA y fosilizan precisamente porque no impiden comunicarse: sobreviven en
// corpus de universitarios avanzados si nadie interviene.

export interface EnB1FalseFriend {
  es: string;
  wrong: string;
  means: string;
  right: string;
  moduleId: string;
}

export const enb1FalseFriends: EnB1FalseFriend[] = [
  { es: "actualmente", wrong: "actually", means: "en realidad — y sirve para corregir con suavidad", right: "currently", moduleId: "enb1m3" },
  { es: "eventualmente (quizá)", wrong: "eventually", means: "al final, con el tiempo — justo lo contrario", right: "possibly · I might…", moduleId: "enb1m12" },
  { es: "sensible (que se emociona)", wrong: "sensible", means: "sensato, prudente", right: "sensitive", moduleId: "enb1m5" },
  { es: "el argumento de una peli", wrong: "the argument", means: "la discusión, la bronca", right: "the plot", moduleId: "enb1m10" },
  { es: "discutir (reñir)", wrong: "discuss", means: "tratar un tema, sin bronca", right: "argue", moduleId: "enb1m12" },
  { es: "asistir a algo", wrong: "assist to", means: "ayudar a", right: "attend (sin preposición)", moduleId: "enb1m12" },
  { es: "no soporto", wrong: "I can't support", means: "no puedo apoyar", right: "I can't stand", moduleId: "enb1m12" },
  { es: "la carrera universitaria", wrong: "my career", means: "mi trayectoria profesional entera", right: "my degree", moduleId: "enb1m2" },
  { es: "la advertencia", wrong: "the advert", means: "el anuncio (de trabajo, de piso)", right: "the warning", moduleId: "enb1m2" },
  { es: "un compromiso", wrong: "a compromise", means: "un término medio en el que los dos ceden", right: "a commitment · an appointment", moduleId: "enb1m11" },
  { es: "bien, está bien", wrong: "a fine", means: "una multa — y en inglés te la DAN, no te la ponen", right: "fine (adjetivo)", moduleId: "enb1m11" },
  { es: "las costumbres", wrong: "customs", means: "la aduana, y va siempre en plural", right: "customs (habits) · traditions", moduleId: "enb1m9" },
  { es: "la operación", wrong: "the surgery", means: "el consultorio, el sitio", right: "an operation", moduleId: "enb1m6" },
  { es: "íntimo (un amigo)", wrong: "an intimate friend", means: "algo bastante más privado de lo que querías decir", right: "a close friend", moduleId: "enb1m10" },
  { es: "solo (sin compañía)", wrong: "lonely", means: "solo y dolido — «lonely» duele", right: "alone · on his own", moduleId: "enb1m10" },
];

export interface EnB1Trap {
  id: string;
  title: string;
  wrong: string;
  right: string;
  why: string;
  moduleId: string;
}

export const enb1Traps: EnB1Trap[] = [
  {
    id: "enb1-trap-since",
    title: "«Desde hace» con presente",
    wrong: "I live here since three years. · I am working here for three years.",
    right: "I've lived here for three years. · I've been working here for three years.",
    why: "EL error del nivel, y el que sobrevive hasta C1. El español mantiene el presente para lo que empezó antes y sigue; el inglés obliga a present perfect. Son tres piezas: for es duración, since es punto de arranque, y el tiempo verbal no es opcional.",
    moduleId: "enb1m1",
  },
  {
    id: "enb1-trap-explainme",
    title: "El clítico de dativo con verbos de decir",
    wrong: "He explained me the problem. · He said me that… · She suggested me another area.",
    right: "He explained the problem to me. · He told me that… · She suggested another area.",
    why: "El español pega «me» a cualquier verbo de decir. En inglés hay dos montones cerrados: tell, give, show, send y buy llevan la persona pegada; explain, say, describe, suggest, recommend y mention la llevan con TO.",
    moduleId: "enb1m3",
  },
  {
    id: "enb1-trap-adverb",
    title: "El adverbio entre el verbo y su objeto",
    wrong: "I like very much this flat. · I speak very well English. · I go always to the gym.",
    right: "I like this flat very much. · I speak English very well. · I always go to the gym.",
    why: "En inglés NO se mete nada entre el verbo y su objeto. Y los de frecuencia van antes del verbo y después de be: I always take the bus, I am always late. Es el calco más resistente de todos.",
    moduleId: "enb1m1",
  },
  {
    id: "enb1-trap-rektion",
    title: "La rección del español, trasladada",
    wrong: "It depends of the weather. · I think in you. · She's married with a doctor.",
    right: "It depends on the weather. · I'm thinking of you. · She's married to a doctor.",
    why: "El clásico de los clásicos. No hay lógica que traducir: el verbo y su preposición son una unidad léxica y se aprenden juntos o no se aprenden.",
    moduleId: "enb1m1",
  },
  {
    id: "enb1-trap-forto",
    title: "«Para» resuelto siempre con for",
    wrong: "I came here for study English. · This is for eat.",
    right: "I came here to study English. · This is for eating. · This is to eat.",
    why: "For + cosa, to + verbo. Es la regla de bolsillo con mejor relación resultado-esfuerzo de todo el nivel, y probablemente el error más repetido del hispanohablante en B1.",
    moduleId: "enb1m11",
  },
  {
    id: "enb1-trap-willif",
    title: "Futuro en la mitad que no lo lleva",
    wrong: "When I will arrive, I'll call you. · If it will rain, we stay home.",
    right: "When I arrive, I'll call you. · If it rains, we'll stay home.",
    why: "El español usa subjuntivo en la subordinada («cuando llegue») y el aprendiz lo traduce por futuro porque el sentido es futuro. La explicación que funciona: el inglés ya sabe que es futuro por la otra mitad; repetirlo le sobra.",
    moduleId: "enb1m9",
  },
  {
    id: "enb1-trap-wouldif",
    title: "would en las dos mitades",
    wrong: "If I would have money, I would travel.",
    right: "If I had money, I would travel.",
    why: "El would traduce el «-ría» del español y el alumno lo pone dos veces porque «si tuviera» no se parece a un pasado. El would vive siempre en la mitad SIN if.",
    moduleId: "enb1m5",
  },
  {
    id: "enb1-trap-preping",
    title: "Infinitivo detrás de preposición",
    wrong: "I'm interested in learn English. · Before to go out… · I look forward to see you.",
    right: "I'm interested in learning English. · Before going out… · I look forward to seeing you.",
    why: "El infinitivo español cubre las dos funciones. En inglés, detrás de preposición va -ing, sin excepciones. El caso venenoso es el «to» preposicional de look forward to y be used to: parece infinitivo y no lo es.",
    moduleId: "enb1m11",
  },
  {
    id: "enb1-trap-gerund",
    title: "Infinitivo donde el verbo pide -ing",
    wrong: "I enjoy to read. · I finished to work at six.",
    right: "I enjoy reading. · I finished working at six.",
    why: "Lista cerrada y corta: enjoy, avoid, mind, finish, keep, practise, imagine, risk, suggest. No hay regla detrás; hay reparto.",
    moduleId: "enb1m11",
  },
  {
    id: "enb1-trap-se",
    title: "El «se» impersonal sin traducción de una pieza",
    wrong: "In Spain people eats late. · How is called this? · Here is spoken English.",
    right: "In Spain people eat late. · What's this called? · English is spoken here.",
    why: "El «se» español tiene tres salidas en inglés y hay que elegir: pasiva, you genérico o they/people. Y ojo: people es plural, siempre.",
    moduleId: "enb1m4",
  },
  {
    id: "enb1-trap-reflexive",
    title: "El reflexivo español que el inglés no quiere",
    wrong: "I feel myself tired. · We've known us for years.",
    right: "I feel tired. · We've known each other for years.",
    why: "El «se» español tiene tres destinos en inglés —-self, each other, o nada— y el más frecuente de los tres es NADA. Para lo recíproco va each other, jamás us.",
    moduleId: "enb1m10",
  },
  {
    id: "enb1-trap-relative",
    title: "El sujeto repetido en la relativa",
    wrong: "The people that they live there… · The man which I saw… · the place where I work in it",
    right: "The people who live there… · The man who I saw… · the place where I work",
    why: "El español repite el pronombre y no distingue who de which. El relativo YA es el sujeto de su frase: detrás no va otro. Y where ya significa «en el que».",
    moduleId: "enb1m2",
  },
  {
    id: "enb1-trap-indirectq",
    title: "La pregunta indirecta que se sigue invirtiendo",
    wrong: "Could you tell me where is the station? · He asked me if did I want a coffee.",
    right: "Could you tell me where the station is? · He asked me if I wanted a coffee.",
    why: "Coe la marca como problema para intermedios y hasta avanzados. En cuanto la pregunta va dentro de otra frase, deja de comportarse como pregunta: ni inversión ni do.",
    moduleId: "enb1m3",
  },
  {
    id: "enb1-trap-usedto",
    title: "«Suelo» traducido por used to",
    wrong: "I use to go to bed early. · It uses to rain in March.",
    right: "I usually go to bed early. · It usually rains in March.",
    why: "used to vive SOLO en el pasado: no tiene presente. Para el presente, usually, normally o tend to. Y en negativa y pregunta se cae la -d: I didn't use to like coffee.",
    moduleId: "enb1m10",
  },
  {
    id: "enb1-trap-mustnt",
    title: "mustn't donde iba don't have to",
    wrong: "You mustn't pay for the appointment. (queriendo decir que es gratis)",
    right: "You don't have to pay for the appointment.",
    why: "El español escribe las dos igual («no tienes que»). mustn't PROHÍBE, don't have to EXIME. Es el error de modal más caro del nivel porque cambia el significado entero.",
    moduleId: "enb1m6",
  },
  {
    id: "enb1-trap-cantbe",
    title: "El contrario de must be no es mustn't be",
    wrong: "He mustn't be at home — his car isn't there.",
    right: "He can't be at home — his car isn't there.",
    why: "Para deducir que algo NO es, el inglés usa can't. mustn't es una prohibición. En español las dos se dicen «no puede ser», y por eso el calco no chirría al oído: chirría en la nota.",
    moduleId: "enb1m6",
  },
  {
    id: "enb1-trap-phrasalpron",
    title: "El pronombre fuera del phrasal verb",
    wrong: "I looked up it. · Put off it. · I'll sort out them.",
    right: "I looked it up. · Put it off. · I'll sort them out.",
    why: "El español pone el pronombre delante del verbo entero («lo busqué»). Si el phrasal se puede partir y el objeto es un pronombre, se parte. Los de tres piezas (put up with, look forward to) no se parten nunca.",
    moduleId: "enb1m11",
  },
  {
    id: "enb1-trap-orders",
    title: "La orden contada con «that»",
    wrong: "He asked me that I called him back. · They ordered her that she went.",
    right: "He asked me to call him back. · They told her to go.",
    why: "Aquí sí hay calco, y no es el backshift: el español cuenta las órdenes con subjuntivo y el inglés con infinitivo. En negativo, not to.",
    moduleId: "enb1m3",
  },
];
