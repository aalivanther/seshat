// LA LIBRETA INGLESA — las 5 pestañas propias del A1 de inglés (la 6ª, Nativo,
// es genérica y vive en el curso). Igual que la libreta alemana: todo lo que el
// examen exige, en un sitio, para consultar en cualquier momento.
//
// CONVENCIÓN de `sound` (la del curso EN): sílabas con guiones, la tónica en
// MAYÚSCULAS, escrito "a la española": la h aspirada se apunta como «j» suave,
// la w como «u», th como «z» de andar por casa, y las vocales largas dobladas
// («ii» = i larga). No es fonética seria: es tu oreja hispanohablante.
//
// TRES REGLAS QUE NO SE ROMPEN (el alumno las ve en la pestaña Sonidos, en la
// clínica de la -s del m4 y en la de la s líquida del m9):
//   1. /z/ se escribe «s̬» — una s con la rayita de voz debajo: góus̬, livs̬, is̬,
//      plíis̬, MIÚ-s̬ik, BÍ-s̬i. La «z» NO es /z/: es la th sorda de think.
//      Se eligió así porque, si el alumno ignora la rayita, sigue leyendo una
//      s — mientras que una «z» le haría decir /θ/, que es peor.
//   2. La r solo se escribe si de verdad suena, o sea si detrás va una vocal
//      (very, right, there is). Post-vocálica no: uéek, nées, KAA, DOO, SÍS-ta.
//      El curso enseña inglés BRITÁNICO y el británico no es rótico.
//   3. La -ing va entera, con su g: LÉE-ning, UÉE-king. Nada de «-in».
//
// Todos los strings en inglés son audio-ables: la bocina los lee con la voz
// inglesa cuando la libreta está en modo inglés (adoptLang fija el TTS).

/* ══ 1 · VERBOS — la 3ª persona y las contracciones SON el contenido A1 ══ */

export interface EnVerbEntry {
  id: string;
  base: string;                        // "go"
  meaning: string;                     // "ir"
  third: string;                       // "goes" — he/she/it
  thirdSound: "/s/" | "/z/" | "/ɪz/";  // el sonido de esa -s (clínica del m4)
  spellRule?: string;                  // "-o → -es" · "consonante + y → -ies"
  negative: string;                    // "don't go / doesn't go"
  contractions?: string[];             // solo be/do (y can en Preguntas)
  sound?: string;                      // guía "suena como" hispanohablante
  example?: { en: string; es: string };
  trap?: string;                       // la trampa del hispanohablante
  group: "regular" | "irregular-a1";
  moduleId: string;                    // dónde lo aprendiste
}

export const EN_VERB_GROUP_LABEL: Record<EnVerbEntry["group"], string> = {
  "irregular-a1": "las tres islas: be, have y do",
  regular: "la fábrica regular: base + -s en 3ª persona",
};

export const EN_THIRD_SOUND_TIP =
  "La -s de he/she/it tiene TRES sonidos y el examen los escucha: /s/ suave tras sonido sordo (works), /z/ zumbada tras sonido sonoro o vocal (goes), /ɪz/ con sílaba extra tras s, sh, ch, x (watches). En las guías de «suena…» la zumbada lleva su rayita: góus̬, livs̬, STÁ-dis̬. Toca la bocina de cada 3ª persona y deja que el oído se lo aprenda.";

export const enVerbs: EnVerbEntry[] = [
  // ── Las tres islas ────────────────────────────────────────────────
  {
    id: "env-be",
    base: "be",
    meaning: "ser / estar",
    third: "is",
    thirdSound: "/z/",
    negative: "I'm not · isn't · aren't",
    contractions: ["I'm", "you're", "he's", "she's", "it's", "we're", "they're", "isn't", "aren't"],
    sound: "bii · am, is̬, aa",
    example: { en: "I'm from Spain. She's my sister.", es: "Soy de España. Ella es mi hermana." },
    trap: "be no necesita a do para nada: pregunta y niega solo (Are you…? / I'm not…). Y la edad va con be: I'm 25 — nunca «I have 25 years».",
    group: "irregular-a1",
    moduleId: "ena1m1",
  },
  {
    id: "env-have",
    base: "have",
    meaning: "tener",
    third: "has",
    thirdSound: "/z/",
    negative: "don't have / doesn't have",
    sound: "jav → 3ª: jas̬",
    example: { en: "I have two brothers. Amy has a cat.", es: "Tengo dos hermanos. Amy tiene un gato." },
    trap: "La 3ª no es «haves»: has. Y para negar o preguntar SÍ necesita a do: I don't have a car · Do you have…? — nada de «I haven't a car».",
    group: "irregular-a1",
    moduleId: "ena1m2",
  },
  {
    id: "env-do",
    base: "do",
    meaning: "hacer — y el auxiliar de preguntas y negaciones",
    third: "does",
    thirdSound: "/z/",
    negative: "don't / doesn't",
    contractions: ["don't", "doesn't"],
    sound: "duu → 3ª: das̬ (¡cambia la vocal!)",
    example: { en: "What do you do? — Does she work here?", es: "¿A qué te dedicas? — ¿Trabaja ella aquí?" },
    trap: "does suena «das», no «dus». Y cuando does trabaja de auxiliar, el verbo suelta su -s: Does she work? — la -s ya se la llevó does.",
    group: "irregular-a1",
    moduleId: "ena1m4",
  },

  // ── La fábrica regular ────────────────────────────────────────────
  {
    id: "env-speak",
    base: "speak",
    meaning: "hablar (idiomas)",
    third: "speaks",
    thirdSound: "/s/",
    negative: "don't speak / doesn't speak",
    sound: "SPIIK — s líquida, sin e delante",
    example: { en: "I speak Spanish and a little English.", es: "Hablo español y un poco de inglés." },
    trap: "Nada de «espík»: arranca en la s. Sopla la s y pega el resto detrás.",
    group: "regular",
    moduleId: "ena1m3",
  },
  {
    id: "env-go",
    base: "go",
    meaning: "ir",
    third: "goes",
    thirdSound: "/z/",
    spellRule: "-o → -es: goes",
    negative: "don't go / doesn't go",
    sound: "góu → góus̬",
    example: { en: "Ben goes to work by bus.", es: "Ben va al trabajo en autobús." },
    group: "regular",
    moduleId: "ena1m4",
  },
  {
    id: "env-get",
    base: "get",
    meaning: "levantarse (get up) · llegar (get to)",
    third: "gets",
    thirdSound: "/s/",
    negative: "don't get up / doesn't get up",
    sound: "guet",
    example: { en: "She gets up at seven.", es: "Ella se levanta a las siete." },
    trap: "get casi nunca va solo: get up, get to, get home. Aprende el chunk entero.",
    group: "regular",
    moduleId: "ena1m4",
  },
  {
    id: "env-work",
    base: "work",
    meaning: "trabajar",
    third: "works",
    thirdSound: "/s/",
    negative: "don't work / doesn't work",
    sound: "uéek — boca floja, vocal larga y NI RASTRO de r",
    example: { en: "Amy works in a hospital.", es: "Amy trabaja en un hospital." },
    trap: "work ≠ walk: work es «uéek» (boca floja, sin r), walk es «uóok» (o larga). La clínica del m9 vive de este par.",
    group: "regular",
    moduleId: "ena1m4",
  },
  {
    id: "env-study",
    base: "study",
    meaning: "estudiar",
    third: "studies",
    thirdSound: "/z/",
    spellRule: "consonante + y → -ies: studies",
    negative: "don't study / doesn't study",
    sound: "STÁ-di — s líquida",
    example: { en: "Amy studies English at night.", es: "Amy estudia inglés por la noche." },
    group: "regular",
    moduleId: "ena1m4",
  },
  {
    id: "env-live",
    base: "live",
    meaning: "vivir",
    third: "lives",
    thirdSound: "/z/",
    negative: "don't live / doesn't live",
    sound: "liv — i CORTA",
    example: { en: "I live in London.", es: "Vivo en Londres." },
    trap: "live (vivo) con i corta ≠ leave (irse) con i larga — el par estrella de la clínica del m6.",
    group: "regular",
    moduleId: "ena1m4",
  },
  {
    id: "env-know",
    base: "know",
    meaning: "saber / conocer",
    third: "knows",
    thirdSound: "/z/",
    negative: "don't know / doesn't know",
    sound: "NÓU — la k es muda",
    example: { en: "I don't know.", es: "No lo sé." },
    trap: "La k no suena: «nóu», igualito que no. I don't know es de las frases más dichas del inglés — tenla lista.",
    group: "regular",
    moduleId: "ena1m4",
  },
  {
    id: "env-watch",
    base: "watch",
    meaning: "ver (tele, deporte)",
    third: "watches",
    thirdSound: "/ɪz/",
    spellRule: "-ch/-sh/-s/-x → -es (sílaba extra)",
    negative: "don't watch / doesn't watch",
    sound: "uóch → UÓ-chis̬",
    example: { en: "She watches TV in the evening.", es: "Ella ve la tele por la tarde-noche." },
    trap: "watches GANA una sílaba: uó-chis. Si dices «uochs» el examinador oye watch a secas.",
    group: "regular",
    moduleId: "ena1m4",
  },
  {
    id: "env-like",
    base: "like",
    meaning: "gustar",
    third: "likes",
    thirdSound: "/s/",
    negative: "don't like / doesn't like",
    sound: "láik",
    example: { en: "I like coffee. Do you like tea?", es: "Me gusta el café. ¿Te gusta el té?" },
    trap: "En inglés TÚ eres el sujeto: I like coffee — nunca «me likes». El «me gusta» español te tiende la trampa cada vez.",
    group: "regular",
    moduleId: "ena1m5",
  },
  {
    id: "env-want",
    base: "want",
    meaning: "querer",
    third: "wants",
    thirdSound: "/s/",
    negative: "don't want / doesn't want",
    sound: "uónt",
    example: { en: "I want a sandwich, please.", es: "Quiero un sándwich, por favor." },
    trap: "Con otro verbo detrás pide su to: I want TO come — «I want come» ✗.",
    group: "regular",
    moduleId: "ena1m5",
  },
  {
    id: "env-eat",
    base: "eat",
    meaning: "comer",
    third: "eats",
    thirdSound: "/s/",
    negative: "don't eat / doesn't eat",
    sound: "IIT — i larga",
    example: { en: "We eat at home on Sundays.", es: "Los domingos comemos en casa." },
    trap: "eat con i larga ≠ it con i corta. «It» de una letra, «eat» de sonrisa larga.",
    group: "regular",
    moduleId: "ena1m5",
  },
  {
    id: "env-drink",
    base: "drink",
    meaning: "beber",
    third: "drinks",
    thirdSound: "/s/",
    negative: "don't drink / doesn't drink",
    sound: "drink",
    example: { en: "Amy drinks tea every day.", es: "Amy bebe té todos los días." },
    group: "regular",
    moduleId: "ena1m5",
  },
  {
    id: "env-need",
    base: "need",
    meaning: "necesitar",
    third: "needs",
    thirdSound: "/z/",
    negative: "don't need / doesn't need",
    sound: "niid — i larga",
    example: { en: "I need a new jacket.", es: "Necesito una chaqueta nueva." },
    group: "regular",
    moduleId: "ena1m6",
  },
  {
    id: "env-buy",
    base: "buy",
    meaning: "comprar",
    third: "buys",
    thirdSound: "/z/",
    negative: "don't buy / doesn't buy",
    sound: "BÁI — la u no suena",
    example: { en: "Ben buys a present for Amy.", es: "Ben compra un regalo para Amy." },
    trap: "Se escribe buy, suena «bái» — idéntico a by y bye. El inglés escrito y el hablado van cada uno a su bola.",
    group: "regular",
    moduleId: "ena1m6",
  },
  {
    id: "env-take",
    base: "take",
    meaning: "coger / llevar(se)",
    third: "takes",
    thirdSound: "/s/",
    negative: "don't take / doesn't take",
    sound: "téik",
    example: { en: "She takes the bus to work.", es: "Ella coge el autobús al trabajo." },
    group: "regular",
    moduleId: "ena1m6",
  },
  {
    id: "env-look",
    base: "look",
    meaning: "mirar (look at)",
    third: "looks",
    thirdSound: "/s/",
    negative: "don't look / doesn't look",
    sound: "luk — u corta",
    example: { en: "I'm just looking, thanks.", es: "Solo estoy mirando, gracias. (la frase escudo de las tiendas)" },
    group: "regular",
    moduleId: "ena1m6",
  },
  {
    id: "env-wear",
    base: "wear",
    meaning: "llevar puesto",
    third: "wears",
    thirdSound: "/z/",
    negative: "don't wear / doesn't wear",
    sound: "uéa",
    example: { en: "He wears a black jacket.", es: "Él lleva una chaqueta negra." },
    trap: "wear es solo de ropa. Llevar cosas de un sitio a otro es take.",
    group: "regular",
    moduleId: "ena1m6",
  },
  {
    id: "env-play",
    base: "play",
    meaning: "jugar / tocar (música)",
    third: "plays",
    thirdSound: "/z/",
    spellRule: "vocal + y → -s normal: plays (¡sin -ies!)",
    negative: "don't play / doesn't play",
    sound: "pléi",
    example: { en: "Ben plays football on Sundays.", es: "Ben juega al fútbol los domingos." },
    group: "regular",
    moduleId: "ena1m8",
  },
  {
    id: "env-read",
    base: "read",
    meaning: "leer",
    third: "reads",
    thirdSound: "/z/",
    negative: "don't read / doesn't read",
    sound: "RIID — i larga, no «rid»",
    example: { en: "I read in my free time.", es: "Leo en mi tiempo libre." },
    group: "regular",
    moduleId: "ena1m8",
  },
  {
    id: "env-listen",
    base: "listen",
    meaning: "escuchar (listen to)",
    third: "listens",
    thirdSound: "/z/",
    negative: "don't listen / doesn't listen",
    sound: "LÍ-sen — la t es muda",
    example: { en: "She listens to music every morning.", es: "Ella escucha música cada mañana." },
    trap: "Ese to no se negocia: listen TO music. «Listen music» es el calco exacto de «escuchar música» — y está mal.",
    group: "regular",
    moduleId: "ena1m8",
  },
  {
    id: "env-love",
    base: "love",
    meaning: "encantar / amar",
    third: "loves",
    thirdSound: "/z/",
    negative: "don't love / doesn't love",
    sound: "lav — la o suena «a»",
    example: { en: "I love swimming!", es: "¡Me encanta nadar!" },
    trap: "Con actividades pide -ing: I love swimming, she loves reading.",
    group: "regular",
    moduleId: "ena1m8",
  },
  {
    id: "env-hate",
    base: "hate",
    meaning: "odiar",
    third: "hates",
    thirdSound: "/s/",
    negative: "don't hate / doesn't hate",
    sound: "jéit — h aspirada",
    example: { en: "Ben hates Mondays.", es: "Ben odia los lunes." },
    group: "regular",
    moduleId: "ena1m8",
  },
  {
    id: "env-help",
    base: "help",
    meaning: "ayudar",
    third: "helps",
    thirdSound: "/s/",
    negative: "don't help / doesn't help",
    sound: "jelp — h aspirada suave",
    example: { en: "Can you help me?", es: "¿Puedes ayudarme?" },
    trap: "La h de help se sopla, ni jota española ni muda. Y ayudar a alguien es help ME, sin «to»: help me.",
    group: "regular",
    moduleId: "ena1m10",
  },
  {
    id: "env-see",
    base: "see",
    meaning: "ver",
    third: "sees",
    thirdSound: "/z/",
    negative: "don't see / doesn't see",
    sound: "sii — i larga",
    example: { en: "I can see the station!", es: "¡Ya veo la estación!" },
    trap: "see es ver con los ojos; la tele se watch: I watch TV, pero I see my friends.",
    group: "regular",
    moduleId: "ena1m10",
  },
  {
    id: "env-come",
    base: "come",
    meaning: "venir",
    third: "comes",
    thirdSound: "/z/",
    negative: "don't come / doesn't come",
    sound: "kam — la o suena «a»",
    example: { en: "Do you want to come to my party?", es: "¿Quieres venir a mi fiesta?" },
    group: "regular",
    moduleId: "ena1m11",
  },
];

/* ══ 2 · PREGUNTAS — el ORDEN es el contenido ══ */
// El hispanohablante pregunta sin auxiliar («You like coffee?» con entonación).
// El inglés exige la ficha delante — y la respuesta corta hace ECO del auxiliar.

export interface EnQuestionEntry {
  id: string;
  qword?: string;                       // "Where" · undefined = pregunta yes/no
  aux: "am/is/are" | "do/does" | "can" | "was/were";
  pattern: string;                      // "Where + are + you + from?" — fichas
  example: string;
  exampleEs: string;
  shortYes: string;                     // el eco del auxiliar, SIEMPRE visible
  shortNo: string;
  sound?: string;
  moduleId: string;
}

export interface EnQuestionGroup {
  aux: EnQuestionEntry["aux"];
  title: string;
  body: string;                         // explicación breve, <b> permitido
}

export const enQuestionGroups: EnQuestionGroup[] = [
  {
    aux: "am/is/are",
    title: "Con be: el verbo salta delante él solito",
    body: "be no necesita ayuda de nadie: para preguntar, <b>el propio am/is/are se pone delante del sujeto</b>. You are hungry → <b>Are you</b> hungry? Y la respuesta corta hace eco del mismo be: Yes, I <b>am</b>. / No, I'm <b>not</b>. En español basta la entonación; en inglés el orden cambia de verdad.",
  },
  {
    aux: "do/does",
    title: "Con los demás verbos: do/does abre la pregunta",
    body: "EL error nº 1 del hispanohablante: preguntar sin auxiliar («You like coffee?» ✗). Con cualquier verbo normal, la ficha <b>do</b> (o <b>does</b> para he/she/it) se planta delante — y el verbo se queda en su base: <b>Does she work?</b>, nunca «Does she works?» (la -s ya se la llevó does). La respuesta corta devuelve el eco: Yes, I <b>do</b>. / No, she <b>doesn't</b>.",
  },
  {
    aux: "can",
    title: "Con can: salta delante, como be",
    body: "can va por libre, igual que be: <b>Can you…?</b> y a correr — sin do y con el verbo en su base pelada (Can you help…, jamás «Can you to help»). El eco: Yes, I <b>can</b>. / No, I <b>can't</b>.",
  },
  {
    aux: "was/were",
    title: "was/were: el pasado de be — solo reconocerlo",
    body: "Frontera del A1: <b>was/were</b> (el pasado de be) aparece en el cuento del m11 y puede sonar en el examen de oído. Te basta con RECONOCERLO — producir el pasado llega en el A2. Ojo al oído: suenan débiles, «uas» y «ua».",
  },
];

export const enQuestions: EnQuestionEntry[] = [
  // be
  {
    id: "enq-are-you-hungry",
    aux: "am/is/are",
    pattern: "Are + you + hungry?",
    example: "Are you hungry?",
    exampleEs: "¿Tienes hambre?",
    shortYes: "Yes, I am.",
    shortNo: "No, I'm not.",
    sound: "aa yu JÁN-gri",
    moduleId: "ena1m5",
  },
  {
    id: "enq-where-are-you-from",
    qword: "Where",
    aux: "am/is/are",
    pattern: "Where + are + you + from?",
    example: "Where are you from? — I'm from Spain.",
    exampleEs: "¿De dónde eres? — Soy de España.",
    shortYes: "Yes, I am.",
    shortNo: "No, I'm not.",
    sound: "uéa aa yu FROM",
    moduleId: "ena1m3",
  },
  {
    id: "enq-whats-your-name",
    qword: "What",
    aux: "am/is/are",
    pattern: "What + is + your + name?",
    example: "What's your name? — It's Ana.",
    exampleEs: "¿Cómo te llamas? — Ana.",
    shortYes: "Yes, it is.",
    shortNo: "No, it isn't.",
    sound: "uóts yoo NÉIM — What is se funde en What's",
    moduleId: "ena1m1",
  },
  {
    id: "enq-how-old-are-you",
    qword: "How old",
    aux: "am/is/are",
    pattern: "How old + are + you?",
    example: "How old are you? — I'm twenty-five.",
    exampleEs: "¿Cuántos años tienes? — Veinticinco. (¡con be, no con have!)",
    shortYes: "Yes, I am.",
    shortNo: "No, I'm not.",
    sound: "jáu óuld aa YU",
    moduleId: "ena1m3",
  },

  // do/does
  {
    id: "enq-do-you-like",
    aux: "do/does",
    pattern: "Do + you + like + coffee?",
    example: "Do you like coffee?",
    exampleEs: "¿Te gusta el café?",
    shortYes: "Yes, I do.",
    shortNo: "No, I don't.",
    sound: "du yu láik KÓ-fi",
    moduleId: "ena1m5",
  },
  {
    id: "enq-does-she-work",
    aux: "do/does",
    pattern: "Does + she + work?",
    example: "Does she work? — Yes, she works in a school.",
    exampleEs: "¿Trabaja ella? — Sí, trabaja en un colegio.",
    shortYes: "Yes, she does.",
    shortNo: "No, she doesn't.",
    sound: "das̬ shi UÉEK — el verbo en su base: la -s se la llevó does",
    moduleId: "ena1m4",
  },
  {
    id: "enq-where-do-you-live",
    qword: "Where",
    aux: "do/does",
    pattern: "Where + do + you + live?",
    example: "Where do you live? — I live in London.",
    exampleEs: "¿Dónde vives? — Vivo en Londres.",
    shortYes: "Yes, I do.",
    shortNo: "No, I don't.",
    sound: "uéa du yu LIV",
    moduleId: "ena1m9",
  },
  {
    id: "enq-what-time-do-you-get-up",
    qword: "What time",
    aux: "do/does",
    pattern: "What time + do + you + get up?",
    example: "What time do you get up? — At seven.",
    exampleEs: "¿A qué hora te levantas? — A las siete.",
    shortYes: "Yes, I do.",
    shortNo: "No, I don't.",
    sound: "uót táim du yu guet ÁP",
    moduleId: "ena1m4",
  },

  // can
  {
    id: "enq-can-you-help-me",
    aux: "can",
    pattern: "Can + you + help + me?",
    example: "Can you help me?",
    exampleEs: "¿Puedes ayudarme?",
    shortYes: "Yes, I can.",
    shortNo: "No, I can't.",
    sound: "kan yu JELP mi",
    moduleId: "ena1m10",
  },
  {
    id: "enq-can-i-have",
    aux: "can",
    pattern: "Can + I + have + a coffee, please?",
    example: "Can I have a coffee, please?",
    exampleEs: "¿Me pones un café, por favor? (LA frase para pedir cualquier cosa)",
    shortYes: "Yes, of course!",
    shortNo: "Sorry, no.",
    sound: "kan ái jav a KÓ-fi, plíis̬",
    moduleId: "ena1m5",
  },

  // was/were (receptivo)
  {
    id: "enq-where-were-you",
    qword: "Where",
    aux: "was/were",
    pattern: "Where + were + you + yesterday?",
    example: "Where were you yesterday? — I was at Amy's party.",
    exampleEs: "¿Dónde estuviste ayer? — Estuve en la fiesta de Amy.",
    shortYes: "Yes, I was.",
    shortNo: "No, I wasn't.",
    sound: "uéa ua yu YÉS-ta-dei — were débil, casi «ua»",
    moduleId: "ena1m11",
  },
  {
    id: "enq-was-it-good",
    aux: "was/were",
    pattern: "Was + it + good?",
    example: "Was it good? — Yes, it was great!",
    exampleEs: "¿Estuvo bien? — ¡Sí, genial!",
    shortYes: "Yes, it was.",
    shortNo: "No, it wasn't.",
    sound: "uos̬ it GUD",
    moduleId: "ena1m11",
  },
];

/* ══ 3 · PRONUNCIACIÓN — los 10 contrastes que deciden la inteligibilidad ══ */
// Ordenados por carga funcional (los errores que MÁS estorban van primero).
// Cada palabra lleva bocina: compara los pares hasta que el oído los separe.

export interface EnPronContrast {
  id: string;
  title: string;                        // "ship / sheep"
  how: string;                          // cómo ponerlo en la boca (es)
  pairs: { a: string; b: string; es: string }[];
  fl: "alto" | "medio";                 // carga funcional: por qué importa
  moduleId: string;                     // su clínica de sonido
}

export const enPronContrasts: EnPronContrast[] = [
  {
    id: "enp-ship-sheep",
    title: "ship / sheep — la i corta y la i larga",
    how: "La i española vive JUSTO en medio de las dos inglesas. Para /ɪ/ (corta) relaja la boca, casi una «e» vaga: it, live. Para /iː/ (larga) sonríe y estírala: eat, leave. Si las pronuncias igual, chip (patata frita) y cheap (barato) se te mezclan en la tienda.",
    pairs: [
      { a: "it", b: "eat", es: "eso · comer" },
      { a: "live", b: "leave", es: "vivir · irse" },
      { a: "chip", b: "cheap", es: "patata frita · barato" },
    ],
    fl: "alto",
    moduleId: "ena1m6",
  },
  {
    id: "enp-teen-ty",
    title: "thirteen / thirty — el acento decide el número",
    how: "No es la vocal, es el GOLPE: los -teen (13-19) acentúan al final, thir-TEEN; las decenas (30-90) al principio, THIR-ty. El Listening del examen vive de esta trampa: si dudas, pide que lo repitan — o fíjate solo en dónde cae el golpe.",
    pairs: [
      { a: "thirteen", b: "thirty", es: "13 · 30" },
      { a: "fifteen", b: "fifty", es: "15 · 50" },
      { a: "fourteen", b: "forty", es: "14 · 40" },
    ],
    fl: "alto",
    moduleId: "ena1m3",
  },
  {
    id: "enp-letters",
    title: "A · E · I · G · J — las letras que traicionan",
    how: "Deletrear tu nombre es la primera tarea del examen oral. Las traidoras: A suena «éi», E suena «íi», I suena «ái» — justo cruzadas con el español. Y G («yíi») vs J («yéi») van al revés de lo que esperas. Deletrea tu nombre y tu email en voz alta hasta que salga solo.",
    pairs: [
      { a: "A", b: "E", es: "«éi» · «íi»" },
      { a: "E", b: "I", es: "«íi» · «ái»" },
      { a: "G", b: "J", es: "«yíi» · «yéi» — ¡cruzadas!" },
    ],
    fl: "alto",
    moduleId: "ena1m1",
  },
  {
    id: "enp-h",
    title: "la h aspirada — ni jota ni muda",
    how: "La h inglesa es un soplo suave, como empañar un cristal: hello, hungry, house. La jota española es demasiado fuerte; la h muda del español, demasiado poco. Sopla — sin rascar la garganta.",
    pairs: [
      { a: "hungry", b: "angry", es: "hambriento · enfadado — ¡peligro en el desayuno!" },
      { a: "hat", b: "at", es: "sombrero · en" },
      { a: "hair", b: "air", es: "pelo · aire" },
    ],
    fl: "alto",
    moduleId: "ena1m1",
  },
  {
    id: "enp-s-liquida",
    title: "la s líquida — Spain, no «Espain»",
    how: "El español no arranca palabras con s + consonante y tu boca mete una e de contrabando: «espík», «Espain». El truco: alarga la s sola (ssss) y pega el resto detrás — ssss-peak, ssss-chool. Sin e. El oído inglés la nota SIEMPRE.",
    pairs: [
      { a: "Spain", b: "speak", es: "España · hablar — las dos arrancan en s pelada" },
      { a: "student", b: "study", es: "estudiante · estudiar" },
      { a: "school", b: "street", es: "colegio · calle" },
    ],
    fl: "alto",
    moduleId: "ena1m3",
  },
  {
    id: "enp-third-s",
    title: "la s que zumba — /s/ · /z/ · /ɪz/",
    how: "Gramática que se OYE: si no distingues works (/s/ suave), goes (/z/ zumbada, como una abeja) y watches (/ɪz/, sílaba extra), tampoco la producirás. Pon la mano en la garganta: en /z/ vibra, en /s/ no. Y ojo, porque la /z/ no vive solo en la -s de he/she: is, his, please, these, music, busy, cheese, shoes, zero y Thursday zumban todas. En las guías de «suena…» de este curso la escribimos «s̬», una s con la rayita de voz debajo — góus̬, is̬, plíis̬, MIÚ-s̬ik. La letra «z», en cambio, es la th sorda de think: zank yu.",
    pairs: [
      { a: "works", b: "goes", es: "/s/ sorda · /z/ zumbada — góus̬" },
      { a: "ice", b: "eyes", es: "hielo · ojos — solo cambia la última letra" },
      { a: "goes", b: "watches", es: "una sílaba · ¡sílaba extra /ɪz/!" },
    ],
    fl: "alto",
    moduleId: "ena1m4",
  },
  {
    id: "enp-cat-cup",
    title: "cat / cup — la a abierta y la a oscura",
    how: "Dos aes donde el español tiene una: en cat, hat, sandwich abre la boca como para el médico (aaa exagerada); en cup, bus, lunch la a es corta y oscura, casi un gruñido. Family y dad van con la abierta; mum y Monday con la oscura.",
    pairs: [
      { a: "cat", b: "cup", es: "gato · taza" },
      { a: "hat", b: "hut", es: "sombrero · cabaña" },
      { a: "bag", b: "bug", es: "bolso · bicho" },
    ],
    fl: "medio",
    moduleId: "ena1m2",
  },
  {
    id: "enp-b-v",
    title: "b / v — en inglés SÍ son distintas",
    how: "En español b y v suenan igual; en inglés no. La v inglesa muerde: dientes de arriba sobre el labio de abajo y deja pasar aire, como una f con motor. Very, five, have — muerde el labio. Berry, ban — labios juntos, como tu b de siempre.",
    pairs: [
      { a: "very", b: "berry", es: "muy · baya" },
      { a: "van", b: "ban", es: "furgoneta · prohibición" },
      { a: "vote", b: "boat", es: "votar · barco" },
    ],
    fl: "medio",
    moduleId: "ena1m2",
  },
  {
    id: "enp-sh-ch",
    title: "sh / ch — mandar callar vs estornudar",
    how: "sh es el «shhh» de mandar callar, aire continuo: she, shoes, fish. ch es tu che española de coche, un golpe seco: cheese, chips, chicken. El menú inglés está lleno de las dos: fish and chips las junta en la misma bandeja.",
    pairs: [
      { a: "ship", b: "chip", es: "barco · patata frita" },
      { a: "shoes", b: "choose", es: "zapatos · elegir" },
      { a: "wash", b: "watch", es: "lavar · mirar" },
    ],
    fl: "medio",
    moduleId: "ena1m5",
  },
  {
    id: "enp-er-schwa",
    title: "work, first, nurse — la er floja (y la schwa)",
    how: "La vocal de work/first/nurse no existe en español: boca floja, labios neutros, un «ee» perezoso largo — por eso la escribimos uéek, féest, nées. Y aquí está la regla que lo gobierna todo: el inglés británico NO es rótico, así que la r solo suena cuando detrás viene una vocal (very, right, there is). Delante de consonante o al final de palabra desaparece y la vocal se alarga: car = KAA, door = DOO, first = FÉEST. Su hermana pequeña, la schwa /ə/, vive en las sílabas átonas: TEA-cher, DOC-tor acaban en un soplido vago (TÍI-cha, DOC-ta), nunca en «-or» claro.",
    pairs: [
      { a: "work", b: "walk", es: "trabajar · andar — ¡el clásico!" },
      { a: "bird", b: "word", es: "pájaro · palabra — misma vocal, distinta letra" },
      { a: "teacher", b: "doctor", es: "los dos acaban en schwa /ə/, se escriba como se escriba" },
    ],
    fl: "medio",
    moduleId: "ena1m9",
  },
];

/* ══ 4 · NÚMEROS, FECHAS Y PRECIOS — la munición del Listening T1 ══ */

export interface EnNumberEntry {
  id: string;
  kind: "number" | "ordinal" | "time" | "price" | "date" | "phone";
  target: string;                       // lo que se dice (audio-able, en inglés)
  source: string;                       // qué es, en español
  sound: string;                        // guía "suena como"
  trap?: string;                        // la trampa, si la hay
}

export const EN_NUMBER_KIND_LABEL: Record<EnNumberEntry["kind"], string> = {
  number: "números",
  ordinal: "ordinales",
  time: "horas",
  price: "precios",
  date: "fechas",
  phone: "teléfono",
};

export const enNumbers: EnNumberEntry[] = [
  {
    id: "ennum-0-12",
    kind: "number",
    target: "zero, one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve",
    source: "0-12: cada uno con su cara",
    sound: "S̬ÍA-rou, uán, tuu, zrii, fóo, fáiv, siks, SÉ-ven, éit, náin, ten, i-LÉ-ven, tuélf",
    trap: "three arranca con la lengua entre los dientes — tu «zrii» de andar por casa vale; «tri» se confunde con tree (árbol).",
  },
  {
    id: "ennum-teens",
    kind: "number",
    target: "thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen",
    source: "13-19: los -teen",
    sound: "zée-TÍIN, foo-TÍIN, fif-TÍIN… el golpe SIEMPRE al final",
    trap: "La trampa estrella del examen: thir-TEEN (13) golpea al final, THIR-ty (30) al principio. El acento decide el número — entrénalo en la pestaña Sonidos.",
  },
  {
    id: "ennum-tens",
    kind: "number",
    target: "twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety",
    source: "decenas: los -ty",
    sound: "TUÉN-ti, ZÉE-ti, FÓO-ti… el golpe al principio",
    trap: "forty pierde la u de four (¡se escribe sin ella!). Y fifty cambia la v de five por f.",
  },
  {
    id: "ennum-21",
    kind: "number",
    target: "twenty-one, twenty-two, thirty-five, ninety-nine",
    source: "21 en adelante: decena-guion-unidad",
    sound: "tuén-ti-UÁN, zée-ti-FÁIV",
    trap: "Mismo orden que en español (veinti-uno) — aquí no hay vuelta de tuerca. Solo el guion al escribir.",
  },
  {
    id: "ennum-100",
    kind: "number",
    target: "a hundred, a hundred and fifty",
    source: "100 y 150",
    sound: "a JÁN-dred (an(d) FIF-ti)",
    trap: "En el habla es «a hundred», no «one hundred». Y el and británico entre centena y resto: a hundred AND fifty.",
  },
  {
    id: "ennum-ordinals-123",
    kind: "ordinal",
    target: "first, second, third",
    source: "1º, 2º, 3º — los tres rebeldes",
    sound: "féest, SÉ-kond, zéed",
    trap: "Se escriben 1st, 2nd, 3rd. Nada de «oneth»: los tres primeros van por libre — y first lleva la er floja de work.",
  },
  {
    id: "ennum-ordinals-th",
    kind: "ordinal",
    target: "fourth, fifth, sixth, tenth, twelfth, twentieth",
    source: "del 4º en adelante: -th",
    sound: "fóoz, fifz, siksz, tenz, tuélfz, TUÉN-ti-ez",
    trap: "fifth y twelfth cambian la v por f antes del -th: five → fifth, twelve → twelfth.",
  },
  {
    id: "ennum-date",
    kind: "date",
    target: "My birthday is on the twelfth of May.",
    source: "Mi cumpleaños es el 12 de mayo.",
    sound: "mái BÉEZ-dei is̬ on de TUÉLFZ ov MÉI",
    trap: "Se ESCRIBE 12th May (o 12 May, estilo británico), se DICE «the twelfth of May» (o «May the twelfth»). El the y el of no se escriben, pero sí se pronuncian — y las fechas van con on. (May 12th es la forma americana.)",
  },
  {
    id: "ennum-oclock",
    kind: "time",
    target: "It's seven o'clock.",
    source: "Son las siete en punto.",
    sound: "its SÉ-ven o-KLÓK",
    trap: "o'clock solo con horas en punto: seven o'clock ✓, «half past seven o'clock» ✗.",
  },
  {
    id: "ennum-halfpast",
    kind: "time",
    target: "half past seven",
    source: "las siete y media (7:30)",
    sound: "jaf past SÉ-ven — la l de half es muda",
    trap: "half past seven = 7:30: la media va DESPUÉS de la hora, como en español. (Si estudias alemán: es justo lo contrario de «halb acht».)",
  },
  {
    id: "ennum-quarter",
    kind: "time",
    target: "quarter past seven, quarter to eight",
    source: "7:15 y 7:45",
    sound: "KUÓO-ta past · KUÓO-ta tu",
    trap: "past = pasadas de · to = para las: quarter to eight = las ocho MENOS cuarto. El to mira hacia delante.",
  },
  {
    id: "ennum-pounds",
    kind: "price",
    target: "It's three pounds fifty.",
    source: "Son 3,50 £ (se escribe £3.50)",
    sound: "zrii páunds̬ FIF-ti (o directamente: zrii FIF-ti)",
    trap: "£3.50 se dice «three pounds fifty» o «three fifty» — el punto no se lee JAMÁS. Y el símbolo £ va delante al escribir, pero pounds se dice detrás.",
  },
  {
    id: "ennum-p",
    kind: "price",
    target: "It's fifty p.",
    source: "Son 50 peniques (50p)",
    sound: "FIF-ti PII — la p se dice como la letra",
    trap: "Los precios pequeños van en p, dicho tal cual: 50p = «fifty p», 99p = «ninety-nine p». Nadie dice «pence» en la tienda.",
  },
  {
    id: "ennum-phone",
    kind: "phone",
    target: "oh seven seven, double four, nine…",
    source: "el teléfono: cifra a cifra",
    sound: "óu SÉ-ven SÉ-ven, DÁ-bol FÓO, náin",
    trap: "El 0 se dice «oh» (como la letra O) y dos cifras iguales seguidas son «double»: 44 = double four. Cifra a cifra, como lo pide el examen.",
  },
];

/* ══ 5 · IRREGULARES DEL A1 — corta y letal ══ */

export interface EnIrregularEntry {
  id: string;
  singular: string;
  plural: string;
  es: string;
  sound: string;
  trap?: string;
}

export const enIrregularPlurals: EnIrregularEntry[] = [
  {
    id: "enirr-man",
    singular: "man",
    plural: "men",
    es: "hombre → hombres",
    sound: "man → men — la a se vuelve e",
    trap: "Sin -s: «mans» ✗. El plural vive en la vocal.",
  },
  {
    id: "enirr-woman",
    singular: "woman",
    plural: "women",
    es: "mujer → mujeres",
    sound: "UÚ-man → UÍ-min",
    trap: "La sorpresa: en women cambia la PRIMERA vocal («uí-min»), aunque lo escrito casi no se mueva.",
  },
  {
    id: "enirr-child",
    singular: "child",
    plural: "children",
    es: "niño/a → niños/as",
    sound: "cháild → CHÍL-dren",
    trap: "children ya es plural completo: «childrens» ✗ y «childs» ✗.",
  },
  {
    id: "enirr-person",
    singular: "person",
    plural: "people",
    es: "persona → gente / personas",
    sound: "PÉE-son → PÍI-pol",
    trap: "people YA es plural: people ARE friendly (nunca «people is» — el calco de «la gente es»). Y «peoples» ✗.",
  },
  {
    id: "enirr-foot",
    singular: "foot",
    plural: "feet",
    es: "pie → pies",
    sound: "fut → fiit",
    trap: "u corta → i larga. On foot (a pie) siempre en singular.",
  },
  {
    id: "enirr-tooth",
    singular: "tooth",
    plural: "teeth",
    es: "diente → dientes",
    sound: "tuuz → tiiz",
    trap: "Mismo truco que foot/feet: oo → ee. La th final, lengua entre los dientes (apropiadamente).",
  },
];

/** was/were — el pasado de be, SOLO receptivo en el A1 (frontera del m11) */
export const enPastBe: {
  title: string;
  es: string;
  rows: [string, string][];
  tip: string;
} = {
  title: "be → was / were",
  es: "el pasado de be: estuve / era…",
  rows: [
    ["I", "was"],
    ["you", "were"],
    ["he/she/it", "was"],
    ["we", "were"],
    ["they", "were"],
  ],
  tip: "Solo RECONOCERLO: aparece en el cuento del m11 («It was great!») y puede sonar en el examen de oído. Producir el pasado llega en el A2. Al oído van débiles: was suena «uas» y were casi «ua».",
};
