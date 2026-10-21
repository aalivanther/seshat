// LA LIBRETA INGLESA DEL A2 — lo que el alumno mira diez veces y no se puede
// aprender de memoria de una sentada: los irregulares por familias, la -ed,
// la comparación, las cantidades, el futuro decidido, los modales de norma y
// permiso, los pronombres y los dos montones de verbos de decir.
//
// QUÉ NO ESTÁ AQUÍ, Y ES A PROPÓSITO:
//   · Lo del A1 (la -s de tercera, el orden de las preguntas, los diez
//     contrastes de sonido, números y fechas, plurales irregulares) vive en
//     `referenceEn.ts` y se consulta allí. Una libreta que se repite deja de
//     ser una libreta.
//   · La FRONTERA del nivel —el present perfect de `ena2m10`, el will y la
//     primera condicional de `ena2m11`— tampoco: se presenta, se reconoce y
//     no se examina en A2, y su ficha de consulta está en la libreta del B1,
//     que es donde esa gramática se produce de verdad.
//   · Nada que no esté enseñado en ena2m1-ena2m12. Una libreta recoge; no
//     amplía.
//
// CONVENCIÓN de `sound`, la misma del A1 (ver `referenceEn.ts`): sílabas con
// guiones, la tónica en MAYÚSCULAS, «s̬» para la /z/ zumbada, la r solo si de
// verdad suena, y la -ing entera. No es fonética: es la oreja hispanohablante.
//
// Todos los strings en inglés son audio-ables tal cual: la bocina los lee con
// la voz inglesa cuando la libreta está en modo inglés.

/* ══ 1 · LOS IRREGULARES, POR FAMILIAS DE CAMBIO VOCÁLICO ══════════════════ */
// El módulo 2 los agrupó por lo que le pasa a la vocal, NO por orden
// alfabético, y esa es la agrupación que hace que se memoricen: el alfabético
// junta verbos que no tienen nada que ver y separa los que riman. La libreta
// respeta ese orden porque es el orden en el que están guardados en la cabeza.

export interface EnA2IrregularVerb {
  base: string;
  past: string;
  es: string;
  sound?: string;
  /** el pasado inventado que sale solo */
  trap?: string;
}

export interface EnA2IrregularFamily {
  id: string;
  /** el nombre de la familia, tal y como se enseñó */
  label: string;
  /** qué le pasa a la vocal — es la clave de recuperación */
  change: string;
  hint: string;
  verbs: EnA2IrregularVerb[];
  moduleId: string;
}

export const EN_A2_IRREGULAR_TIP =
  "Regla de supervivencia mientras los aprendes: si no te sale el pasado raro, NO te inventes una -ed. «I goed» suena a niño de tres años y en el examen cuenta como error de sistema. Y consuélate con la cuenta: en español «ir» en pasado son doce formas (fui, fuiste… iba, ibas…); en inglés es went, una sola, para todas las personas y para los dos pasados españoles.";

export const enA2IrregularFamilies: EnA2IrregularFamily[] = [
  {
    id: "ena2-irr-big8",
    label: "Los ocho grandes",
    change: "cada uno a lo suyo — no hay patrón, hay frecuencia",
    hint: "No son una familia: son los ocho que salen en un texto de cada tres. Si solo vas a memorizar una fila, memoriza esta.",
    moduleId: "ena2m2",
    verbs: [
      { base: "go", past: "went", es: "ir", sound: "uent", trap: "goed" },
      { base: "have", past: "had", es: "tener · haber", sound: "jad" },
      { base: "see", past: "saw", es: "ver", sound: "soo" },
      { base: "get", past: "got", es: "conseguir · llegar · recibir", sound: "got" },
      { base: "make", past: "made", es: "hacer (fabricar)", sound: "méid", trap: "I did a mistake — es I made a mistake" },
      { base: "take", past: "took", es: "coger · llevar · tardar", sound: "tuk", trap: "taked" },
      { base: "come", past: "came", es: "venir · llegar", sound: "kéim" },
      { base: "say", past: "said", es: "decir", sound: "sed — jamás «séid»" },
    ],
  },
  {
    id: "ena2-irr-a",
    label: "La A abierta",
    change: "i / u → a",
    hint: "La vocal se abre y se queda en A. Se oyen todas iguales de bien: léelas en voz alta y la familia entra por el oído antes que por la cabeza.",
    moduleId: "ena2m2",
    verbs: [
      { base: "sing", past: "sang", es: "cantar", sound: "sang" },
      { base: "drink", past: "drank", es: "beber", sound: "drank" },
      { base: "swim", past: "swam", es: "nadar", sound: "suam" },
      { base: "run", past: "ran", es: "correr", sound: "ran" },
      { base: "sit", past: "sat", es: "sentarse", sound: "sat" },
    ],
  },
  {
    id: "ena2-irr-ought",
    label: "Las -ought / -aught",
    change: "todo se vuelve «-oot»",
    hint: "La familia más rentable del inglés: cinco verbos altísimos de frecuencia y una sola cosa que aprender. Se escriben con esa maraña de letras y suenan todas igual — o larga y la gh MUDA. Si tienes prisa, empieza por aquí.",
    moduleId: "ena2m2",
    verbs: [
      { base: "buy", past: "bought", es: "comprar", sound: "boot" },
      { base: "think", past: "thought", es: "pensar", sound: "zoot" },
      { base: "bring", past: "brought", es: "traer", sound: "broot" },
      { base: "catch", past: "caught", es: "coger · pillar", sound: "koot", trap: "catch se parece a watch, que sí es regular (watched). Parecerse en el infinitivo no dice nada del pasado." },
      { base: "teach", past: "taught", es: "enseñar", sound: "toot" },
    ],
  },
  {
    id: "ena2-irr-ou",
    label: "Las «óu»",
    change: "i larga / ea → óu",
    hint: "Dos grupos que suenan al mismo sitio: los de write y los de wake. Todos acaban cayendo en «óu».",
    moduleId: "ena2m2",
    verbs: [
      { base: "write", past: "wrote", es: "escribir", sound: "róut" },
      { base: "drive", past: "drove", es: "conducir", sound: "dróuv" },
      { base: "ride", past: "rode", es: "montar (en bici)", sound: "róud" },
      { base: "wake", past: "woke", es: "despertarse", sound: "uóuk" },
      { base: "break", past: "broke", es: "romper", sound: "bróuk" },
      { base: "speak", past: "spoke", es: "hablar", sound: "spóuk" },
    ],
  },
  {
    id: "ena2-irr-t",
    label: "Las que acaban en -t",
    change: "la vocal se acorta y aparece una -t",
    hint: "Regalo escondido: acaban en el mismo grupo consonántico que ya entrenaste con worked y helped. Esa /t/ final ya la tienes en la boca.",
    moduleId: "ena2m2",
    verbs: [
      { base: "sleep", past: "slept", es: "dormir", sound: "slept" },
      { base: "keep", past: "kept", es: "guardar · seguir", sound: "kept" },
      { base: "feel", past: "felt", es: "sentir(se)", sound: "felt" },
      { base: "leave", past: "left", es: "irse · dejarse algo", sound: "left" },
      { base: "meet", past: "met", es: "quedar con alguien · conocer", sound: "met" },
    ],
  },
  {
    id: "ena2-irr-ew",
    label: "Las «-úu»",
    change: "-ow / -y → -ew",
    hint: "Se escriben con -ew y todas acaban en el mismo «-úu».",
    moduleId: "ena2m2",
    verbs: [
      { base: "know", past: "knew", es: "saber · conocer", sound: "niúu — la k es muda en las dos formas" },
      { base: "grow", past: "grew", es: "crecer", sound: "gruu" },
      { base: "throw", past: "threw", es: "tirar", sound: "zruu" },
      { base: "fly", past: "flew", es: "volar", sound: "fluu" },
    ],
  },
  {
    id: "ena2-irr-same",
    label: "Las que no cambian",
    change: "nada de nada",
    hint: "Un regalo con trampa: si la forma es la misma, lo ÚNICO que dice el tiempo verbal es el contexto. It costs £40 (cuesta) frente a It cost £40 last year (costó). Cuando uses una de estas, pon el marcador temporal o nadie sabrá de qué hablas.",
    moduleId: "ena2m2",
    verbs: [
      { base: "put", past: "put", es: "poner", sound: "put" },
      { base: "cut", past: "cut", es: "cortar", sound: "cat" },
      { base: "let", past: "let", es: "dejar (permitir)", sound: "let" },
      { base: "cost", past: "cost", es: "costar", sound: "kost" },
      { base: "read", past: "read", es: "leer", sound: "riid → RED — se escribe igual y SÍ cambia al oído" },
    ],
  },
  {
    id: "ena2-irr-loose",
    label: "Los sueltos que hacen falta igual",
    change: "cada uno por su cuenta",
    hint: "No entran en ninguna familia y aparecen en cuanto cuentas un contratiempo. Se aprenden de uno en uno, y son pocos.",
    moduleId: "ena2m2",
    verbs: [
      { base: "be", past: "was / were", es: "ser · estar", sound: "uos̬ / uée", trap: "En el A1 solo había que reconocerlo; en A2 se produce. There was / There were = «había»." },
      { base: "lose", past: "lost", es: "perder", sound: "lost", trap: "I missed my phone — missed es «no llegar a tiempo», no «perder»" },
      { base: "find", past: "found", es: "encontrar", sound: "fáund" },
      { base: "tell", past: "told", es: "decir a alguien", sound: "tóuld" },
      { base: "fall", past: "fell", es: "caerse", sound: "fel", trap: "falled" },
      { base: "forget", past: "forgot", es: "olvidar · dejarse algo", sound: "fa-GOT" },
      { base: "pay", past: "paid", es: "pagar", sound: "péid" },
      { base: "hear", past: "heard", es: "oír", sound: "jéed — una sola vocal larga, no «jíard»" },
      { base: "wear", past: "wore", es: "llevar puesto", sound: "uóo" },
      { base: "eat", past: "ate", es: "comer", sound: "éit — suena EXACTAMENTE igual que eight (ocho)" },
    ],
  },
];

/** La otra mitad del pasado, y la que decide la nota: el auxiliar */
export const enA2PastAux = {
  title: "did / didn't: el auxiliar se lleva la marca y el verbo se queda desnudo",
  body:
    "Es la misma máquina del do / does del A1, un tiempo más allá. En cuanto entra did, el verbo vuelve a su forma de diccionario: la marca de pasado ya está puesta y una frase solo lleva UNA. Este es el error nº 1 del nivel y el que más se re-inyecta en los módulos siguientes.",
  rows: [
    ["afirmativa", "I went to the cinema.", "el verbo lleva la marca"],
    ["negativa", "I didn't go out.", "didn't la lleva → go, desnudo"],
    ["pregunta", "Where did you go?", "did la lleva → go, desnudo"],
    ["pregunta corta", "Did you see it?", "«DÍ-dyu síi it» en habla rápida"],
  ] as [string, string, string][],
  traps: [
    { wrong: "Did you went?", right: "Did you go?" },
    { wrong: "I didn't went out.", right: "I didn't go out." },
    { wrong: "We didn't had time.", right: "We didn't have time." },
    { wrong: "I didn't do nothing.", right: "I didn't do anything." },
  ],
};

/* ══ 2 · LA -ed Y SUS TRES SONIDOS ═════════════════════════════════════════ */
// Se escribe -ed SIEMPRE. Suena de tres maneras y no las eliges tú: lo decide
// el último sonido del infinitivo. Y —esto es lo que casi ningún curso dice—
// las tres NO cuestan lo mismo.

export interface EnA2EdSound {
  id: string;
  sound: "/ɪd/" | "/t/" | "/d/";
  /** cuándo sale */
  when: string;
  syllable: string;
  examples: { verb: string; sound: string }[];
  cost: "barato" | "caro";
  why: string;
  train: string;
}

export const enA2EdSounds: EnA2EdSound[] = [
  {
    id: "ena2-ed-id",
    sound: "/ɪd/",
    when: "detrás de t o d",
    syllable: "AÑADE una sílaba",
    examples: [
      { verb: "wanted", sound: "UÓN-tid" },
      { verb: "decided", sound: "di-SÁI-did" },
      { verb: "visited", sound: "VÍ-s̬i-tid" },
      { verb: "started", sound: "STAA-tid" },
    ],
    cost: "barato",
    why: "Añadir sílabas es exactamente lo que el español sabe hacer. Te va a salir bien desde el primer día.",
    train: "Un repaso y a otra cosa.",
  },
  {
    id: "ena2-ed-t",
    sound: "/t/",
    when: "detrás de sonido sordo: k, p, s, sh, ch, f",
    syllable: "NO añade sílaba — se pega",
    examples: [
      { verb: "worked", sound: "uéekt" },
      { verb: "helped", sound: "jelpt" },
      { verb: "asked", sound: "aaskt" },
      { verb: "missed", sound: "mist" },
      { verb: "watched", sound: "uócht" },
    ],
    cost: "caro",
    why: "Te obliga a cerrar la palabra con dos o tres consonantes seguidas y sin vocal detrás. El español no hace eso jamás: la boca mete una vocal de apoyo («uor-KED») y ahí se pierde la /t/ — y con ella el pasado.",
    train: "Todos los días. Y empújala a la palabra siguiente: I worked all day suena «uéek-tool». Ese enlace es lo que te la salva.",
  },
  {
    id: "ena2-ed-d",
    sound: "/d/",
    when: "detrás de todo lo demás: vocales, l, n, r, v, m, g",
    syllable: "NO añade sílaba — se pega",
    examples: [
      { verb: "played", sound: "pléid" },
      { verb: "listened", sound: "LÍ-send" },
      { verb: "arrived", sound: "a-RÁIVD" },
      { verb: "phoned", sound: "fóund" },
      { verb: "rained", sound: "réind" },
    ],
    cost: "caro",
    why: "Lo mismo que la /t/, con la garganta vibrando.",
    train: "Todos los días.",
  },
];

export const EN_A2_ED_TIP =
  "Lo que ordena el esfuerzo, y que casi nadie cuenta: las tres NO cuestan lo mismo. La /ɪd/ sale sola —añade una sílaba, que es justo lo que el español sabe hacer— y se acierta de entrada. Las otras dos exigen cerrar la palabra con un grupo de consonantes sin vocal detrás, algo que la fonotáctica española no hace nunca, y por eso se caen. Ponerlas en fila como si fueran hermanas es el error: casi todo tu tiempo a /t/ y /d/, y a /ɪd/ un repaso y a otra cosa. Esa consonante final ES la gramática, y si te la comes el examinador no ha oído un pasado, ha oído un presente mal dicho.";

/** Los tres retoques de ortografía de la -ed — y valen igual para la -er */
export const enA2EdSpelling: { rule: string; what: string; example: string }[] = [
  { rule: "acaba en -e", what: "solo añades -d", example: "arrive → arrived · decide → decided" },
  { rule: "consonante + -y", what: "la -y se vuelve -ied", example: "study → studied · try → tried" },
  { rule: "vocal + consonante (tónica)", what: "doblas la consonante", example: "stop → stopped · plan → planned" },
  { rule: "cualquier otra cosa", what: "+ -ed y a otra cosa", example: "work → worked · play → played" },
];

/* ══ 3 · COMPARAR: -er, more, y el superlativo ═════════════════════════════ */
// Es el módulo que decide la Parte 3 del oral (semejanzas y diferencias entre
// dos imágenes), así que esta pestaña se abre mucho antes del examen.

export const enA2ComparativeRules: { syllables: string; how: string; example: string }[] = [
  { syllables: "una sílaba", how: "-er", example: "cheap → cheaper · big → bigger · cold → colder" },
  { syllables: "dos, acaba en -y", how: "-ier", example: "easy → easier · busy → busier · happy → happier" },
  { syllables: "dos o más, el resto", how: "more + adjetivo", example: "expensive → more expensive · comfortable → more comfortable" },
  { syllables: "las dos cosas a la vez", how: "NO EXISTE", example: "more cheaper ✗ · more better ✗ · expensiver ✗" },
];

export const enA2IrregularComparatives: { adj: string; comp: string; sup: string; es: string; note?: string }[] = [
  { adj: "good", comp: "better", sup: "the best", es: "bueno → mejor → el mejor", note: "En boca británica, «BÉ-ta»." },
  { adj: "bad", comp: "worse", sup: "the worst", es: "malo → peor → el peor", note: "worse se dice «uées», con la vocal larga de work, no «uors»." },
  { adj: "far", comp: "further / farther", sup: "the furthest", es: "lejos → más lejos → el más lejano", note: "Las dos formas valen." },
];

export interface EnA2CompareNote {
  id: string;
  title: string;
  body: string;
  rows: [string, string, string][];
}

export const enA2CompareNotes: EnA2CompareNote[] = [
  {
    id: "ena2-cmp-than",
    title: "than / that — un «que» español que en inglés son dos",
    body:
      "Suena bien y está mal, que es lo peor que le puede pasar a un error: en habla rápida than y that se pronuncian igual de flojas y el oído no te salva. Regla de bolsillo: si delante hay un comparativo (algo con -er, con more, o better / worse), va THAN. En cualquier otro sitio, that. Y «than me», no «than I»: el libro antiguo dirá otra cosa, pero en la calle y en el oral se dice than me y nadie parpadea.",
    rows: [
      ["mejor que este", "better than this one", "hay comparación"],
      ["más grande que el mío", "bigger than mine", "hay comparación"],
      ["creo que es mejor", "I think that it's better", "es una subordinada"],
      ["la diferencia es que…", "the difference is that…", "es una subordinada"],
    ],
  },
  {
    id: "ena2-cmp-the",
    title: "El superlativo: -est / the most, y el THE que no se cae nunca",
    body:
      "Del comparativo al superlativo hay dos cambios: la terminación pasa de -er a -est (y more pasa a the most), y delante va THE, que no se cae ni en el habla rápida ni en un mensaje. La ortografía es la misma de siempre: big → the biggest, easy → the easiest, nice → the nicest.",
    rows: [
      ["el más barato", "the cheapest", "It's best coffee ✗ — le falta el the"],
      ["el más caro", "the most expensive", "the more expensive ✗"],
      ["el mejor", "the best", "the most good ✗"],
      ["el peor", "the worst", "the most bad ✗"],
    ],
  },
  {
    id: "ena2-cmp-inof",
    title: "«El más barato DE la tienda» — casi siempre IN, no OF",
    body:
      "Después del superlativo el español pone siempre «de», y la mano traduce of. En inglés es IN con sitios y con grupos de personas, y solo es OF con periodos de tiempo. Y no es que of suene extranjero: es que significa otra cosa — the best of the shop es «lo mejorcito que da de sí la tienda».",
    rows: [
      ["el más barato de la tienda", "the cheapest in the shop", "un sitio → in"],
      ["el mejor café de Londres", "the best coffee in London", "un sitio → in"],
      ["el pequeño de la familia", "the youngest in the family", "un grupo → in"],
      ["el peor día de mi vida", "the worst day of my life", "un periodo de tiempo → of"],
    ],
  },
  {
    id: "ena2-cmp-much",
    title: "Cuánto más: much cheaper, no very cheaper",
    body:
      "«Mucho más barato» es much cheaper. very solo acompaña a adjetivos sin comparar (very cheap). Y con números, «más de diez libras» es more THAN ten pounds — el mismo than de comparar, otra vez.",
    rows: [
      ["mucho más barato", "much cheaper", "very cheaper ✗"],
      ["un poco más barato", "a bit cheaper", "a little bit cheaper también vale"],
      ["más de diez libras", "more than ten pounds", "more of ten pounds ✗"],
      ["igual de barato que", "as cheap as", "FRONTERA: se presenta en la L8, no se examina"],
    ],
  },
];

/* ══ 4 · CONTABLES, INCONTABLES Y CUANTIFICADORES ══════════════════════════ */
// El reparto no coincide con el español, así que no se deduce: hay una lista
// cerrada de diez y se aprende entera. Hay gente con nivel C2 que sigue
// diciendo «the informations».

export interface EnA2Uncountable {
  en: string;
  es: string;
  verb: "is" | "are";
  trap: string;
}

export const EN_A2_UNCOUNTABLE_TIP =
  "Ninguna de las diez lleva -s. Ninguna lleva a / an. Y todas llevan el verbo en singular… menos people, que es plural (uno es a person) y va con are, con many y con a lot of. Si necesitas contarlas, se cuentan por porciones: a piece of advice, two pieces of luggage, a slice of bread.";

export const enA2Uncountables: EnA2Uncountable[] = [
  { en: "people", es: "la gente", verb: "are", trap: "People are very friendly. — «People is» ✗ es el calco exacto de «la gente es»." },
  { en: "news", es: "las noticias", verb: "is", trap: "Acaba en -s y aun así es singular: The news is good." },
  { en: "information", es: "la información", verb: "is", trap: "informations ✗ · an information ✗" },
  { en: "advice", es: "el consejo, los consejos", verb: "is", trap: "advices ✗ · «me dio dos consejos» → she gave me some advice." },
  { en: "furniture", es: "los muebles", verb: "is", trap: "furnitures ✗ · a furniture ✗" },
  { en: "luggage", es: "el equipaje, las maletas", verb: "is", trap: "luggages ✗ · dos maletas → two pieces of luggage." },
  { en: "homework", es: "los deberes", verb: "is", trap: "homeworks ✗ · «tengo muchos deberes» → a lot of homework." },
  { en: "money", es: "el dinero", verb: "is", trap: "moneys ✗ · «¿cuánto dinero?» → How much money?" },
  { en: "hair", es: "el pelo", verb: "is", trap: "My hair is long. — «my hairs» serían pelos sueltos, uno a uno." },
  { en: "bread", es: "el pan", verb: "is", trap: "a bread ✗ · una barra → a loaf of bread." },
];

export const enA2Quantifiers: { q: string; goesWith: string; example: string; note: string }[] = [
  { q: "much", goesWith: "lo que NO se cuenta", example: "There isn't much milk.", note: "Solo vive en preguntas y negaciones: en afirmativa suena a libro antiguo." },
  { q: "many", goesWith: "lo que SÍ se cuenta", example: "Are there many tables free?", note: "Igual que much: preguntas y negaciones." },
  { q: "a lot of", goesWith: "los dos", example: "a lot of sugar · a lot of people", note: "La que más se oye. El nativo no elige: tira de a lot of y se ahorra el problema." },
  { q: "How much…?", goesWith: "lo que NO se cuenta", example: "How much sugar do you take?", note: "La misma How much del precio del A1: el dinero tampoco se cuenta." },
  { q: "How many…?", goesWith: "lo que SÍ se cuenta", example: "How many people are there?", note: "En español dices «cuánta gente» en singular; en inglés people manda many y verbo plural." },
  { q: "a few", goesWith: "lo que SÍ se cuenta", example: "a few eggs · a few minutes", note: "POSITIVO: hay algo, poco pero suficiente." },
  { q: "a little", goesWith: "lo que NO se cuenta", example: "a little milk · a little time", note: "POSITIVO. En la mesa: Just a little, thanks." },
  { q: "few (sin a)", goesWith: "lo que SÍ se cuenta", example: "Few people came.", note: "NEGATIVO: casi nadie. Una letra y la frase cambia de signo. En habla normal se prefiere not many." },
  { q: "little (sin a)", goesWith: "lo que NO se cuenta", example: "I have little time.", note: "NEGATIVO: casi nada. En habla normal se prefiere not much." },
  { q: "too much / too many", goesWith: "según el montón", example: "There's too much salt in the soup.", note: "Con too, la cantidad se vuelve queja. Abre media reclamación de restaurante." },
  { q: "more", goesWith: "sustantivo, a pelo", example: "We need more time.", note: "more of time ✗" },
  { q: "most", goesWith: "sustantivo en general / of + grupo", example: "Most people take the bus. · most of my friends", note: "«La mayoría DE la gente» en general es Most people, sin the y sin of. The most people ✗" },
  { q: "enough", goesWith: "sustantivo, a pelo", example: "There isn't enough room.", note: "Detrás de un adjetivo también existe (big enough), y esa es la frontera del m4 L8." },
  { q: "no", goesWith: "sustantivo, a pelo", example: "There's no milk.", note: "Lleva sustantivo detrás." },
  { q: "none", goesWith: "nada, o of + grupo", example: "How many are left? None. · None of them can come.", note: "Si detrás NO hay sustantivo, none. «No of them» ✗" },
  { q: "all", goesWith: "sustantivo / of + grupo", example: "all day · all of them", note: "Igual que most." },
];

export const enA2SomeAny: { when: string; use: string; example: string }[] = [
  { when: "afirmo", use: "some", example: "There's some bread." },
  { when: "pregunto de verdad", use: "any", example: "Is there any milk?" },
  { when: "niego", use: "any", example: "They don't have any soup today." },
  { when: "OFREZCO algo", use: "some", example: "Would you like some tea?" },
  { when: "PIDO algo", use: "some", example: "Can I have some water?" },
  { when: "compuestos", use: "something / anything", example: "something to eat · Anything to drink?" },
];

export const EN_A2_SOMEANY_TIP =
  "El 80 % es la fórmula del A1: some afirma, any pregunta y niega. Las dos excepciones son las que caen en el oral, y las dos son de restaurante — al OFRECER y al PEDIR se dice some aunque la frase sea una pregunta, porque some se usa cuando ya cuentas con que la respuesta es sí. Con any sonaría a que dudas de que quede té. Y no se te olvide lo del A1: en inglés se niega UNA sola vez (I don't want any sugar, nunca «I don't want no sugar»).";

export const enA2ZeroArticle = {
  title: "El artículo que el español pone y el inglés quita",
  body:
    "Para hablar de algo EN GENERAL, el español pone artículo («me gusta la música») y el inglés no pone nada. Vale para lo que no se cuenta (music, life, money, coffee, bread) y para los plurales (I like dogs). Y su pareja, que es la mitad que nadie enseña: cuando SEÑALAS algo concreto, el the vuelve. Truco de un segundo: ¿podrías añadir «en general» detrás? Si sí, fuera el the.",
  rows: [
    ["I like music.", "I like the music in this café."],
    ["Life is hard.", "The life of a nurse is hard."],
    ["Money isn't everything.", "The money is on the table."],
    ["Coffee is expensive.", "The coffee here is very good."],
    ["I love cooking.", "The cooking was Amy's job."],
  ] as [string, string][],
};

/* ══ 5 · EL FUTURO: going to, continuo y horarios ══════════════════════════ */

export interface EnA2FutureForm {
  id: string;
  form: string;
  says: string;
  example: string;
  es: string;
  note?: string;
}

export const enA2Futures: EnA2FutureForm[] = [
  {
    id: "ena2-fut-goingto",
    form: "be + going to + verbo desnudo",
    says: "lo he decidido yo — el plan existía antes de la frase",
    example: "I'm going to book a hotel.",
    es: "Voy a reservar un hotel.",
    note: "Es pieza por pieza lo mismo que el español «voy a + infinitivo». Lo único que hay que vigilar es el be: «I going to book» no es inglés, y al hablar la contracción es obligatoria (I'm, you're, he's, we're).",
  },
  {
    id: "ena2-fut-cont",
    form: "be + verbo -ing + hora o fecha",
    says: "está apalabrado, con hora y sitio, y hay otra gente metida",
    example: "We're meeting Amy at six.",
    es: "Hemos quedado con Amy a las seis.",
    note: "Para las citas —el 90 % de lo que vas a contar— es lo que suena a nativo. Se distingue del «ahora mismo» por lo que hay alrededor: at six, on Friday, tonight → plan; now, at the moment → este segundo.",
  },
  {
    id: "ena2-fut-simple",
    form: "presente simple",
    says: "lo dice un horario publicado — no es tu plan, es el plan del mundo",
    example: "The train leaves at ten.",
    es: "El tren sale a las diez.",
    note: "Trenes, aviones, cines, tiendas. Es la ÚNICA excepción honesta, y la regla para decidir cabe en una pregunta: ¿lo decides tú, o está en un cartel?",
  },
  {
    id: "ena2-fut-evidence",
    form: "be + going to (con pruebas delante)",
    says: "se ve venir — la predicción con evidencia",
    example: "Look at those clouds. It's going to rain.",
    es: "Mira esas nubes. Va a llover.",
  },
];

export const enA2FutureTraps = {
  title: "Los dos errores del futuro, y ninguno se te corrige solo",
  items: [
    {
      id: "ena2-fut-trap-present",
      wrong: "I go to the cinema tomorrow.",
      right: "I'm going to the cinema tomorrow.",
      why: "En español «mañana voy al cine» es impecable. En inglés el presente simple significa RUTINA y nada más, así que la frase no dice nada. Vacuna de una línea: si en la frase hay una fecha futura, el verbo no puede ir en presente simple.",
    },
    {
      id: "ena2-fut-trap-movement",
      wrong: "«I'm going to work» entendido como intención",
      right: "Mira lo que va DETRÁS de to",
      why: "Detrás hay un SITIO (the station, Brighton) → movimiento: vas allí. Detrás hay un VERBO (book, take, study) → intención: eso vas a hacer. La ambigüedad solo existe con work, home, bed y the shops, que son sitio y verbo a la vez: I'm going to work (voy al trabajo) frente a I'm going to work harder (voy a esforzarme más).",
    },
  ],
};

export const enA2TimeClauses = {
  title: "«Cuando llegue»: una frase, UNA marca de futuro, y va en la principal",
  body:
    "El español pone subjuntivo («cuando llegue») o infinitivo («antes de salir»), y el inglés no tiene ninguna de las dos cosas. Al traducir, la mano mete un futuro donde iba el subjuntivo y sale «When I will get there…». El inglés ya sabe que la frase habla del futuro porque lo dice la principal: repetirlo le sobra. La subordinada se queda en PRESENTE. Las palabras que abren esa mitad son cuatro y con ellas sobra: when, before, after, as soon as. Y la coma: si la subordinada va delante, lleva coma detrás; si va detrás, no lleva nada.",
  rows: [
    ["cuando llegue…", "when I get there…", "presente: el futuro ya está en la otra mitad"],
    ["antes de salir…", "before we leave…", "presente, y CON sujeto: el inglés no usa infinitivo aquí"],
    ["después de llegar…", "after we arrive…", "presente, y con sujeto"],
    ["en cuanto llegue a casa…", "as soon as I get home…", "presente"],
    ["…te llamo / te voy a llamar", "…I'm going to call you", "AQUÍ va la marca de futuro"],
  ] as [string, string, string][],
  note:
    "En pregunta, when no es subordinada de tiempo sino la pregunta entera, y ahí sí puede haber futuro detrás: When is your birthday? Y para quitar miedo: si en la subordinada pones going to por error, se te entiende igual. Lo que rompe y lo que el corrector marca es el will.",
};

/* ══ 6 · MODALES: obligación, prohibición y permiso ════════════════════════ */

export interface EnA2Modal {
  id: string;
  form: string;
  what: string;
  example: string;
  es: string;
  shape: string;
  note?: string;
}

export const enA2Modals: EnA2Modal[] = [
  {
    id: "ena2-mod-haveto",
    form: "have to / has to",
    what: "obligación — la voz de la VIDA: la circunstancia, el horario, el jefe, la cola",
    example: "She has to work on Saturday.",
    es: "Tiene que trabajar el sábado.",
    shape: "Verbo normal: la -s de tercera (has to), y do / does / did para preguntar y negar.",
    note: "Traducción exacta de «tener que». Y el «hay que» impersonal se dice con un you que no señala a nadie: You have to check in first.",
  },
  {
    id: "ena2-mod-must",
    form: "must",
    what: "obligación — la voz de la NORMA escrita, y la de uno mismo",
    example: "Passengers must show their tickets.",
    es: "Los viajeros deben mostrar el billete.",
    shape: "Modal: invariable, sin to detrás, sin -s, sin do en la pregunta.",
    note: "Si lo has leído en un cartel, must. Si se lo cuentas a un amigo, have to. Y si dudas, have to: en inglés hablado de hoy es mucho más frecuente y no queda raro en ningún sitio.",
  },
  {
    id: "ena2-mod-mustnt",
    form: "mustn't",
    what: "PROHIBICIÓN — puerta cerrada",
    example: "You mustn't smoke in here.",
    es: "Aquí no se puede fumar.",
    shape: "Modal. Y ojo al oído: la primera t desaparece — se dice «MA-sent», en dos golpes.",
    note: "El not niega LA ACCIÓN: «es obligatorio no hacerlo».",
  },
  {
    id: "ena2-mod-donthaveto",
    form: "don't have to / doesn't have to",
    what: "EXIME — no hace falta, tú eliges",
    example: "You don't have to pay.",
    es: "No hace falta pagar.",
    shape: "Verbo normal: don't / doesn't / didn't have to. Nunca «doesn't has to» ni «didn't had to».",
    note: "El not niega LA OBLIGACIÓN. Por eso «It's up to you» es la respuesta natural a don't have to, y jamás a mustn't.",
  },
  {
    id: "ena2-mod-can",
    form: "can",
    what: "petición y permiso, escalón directo",
    example: "Can I sit here?",
    es: "¿Puedo sentarme aquí?",
    shape: "Modal: verbo desnudo detrás, sin do.",
    note: "No es maleducado: es directo y corriente. Can I…? pide para mí; Can you…? pide a otro.",
  },
  {
    id: "ena2-mod-could",
    form: "could",
    what: "petición y permiso, escalón neutro-formal — el de este curso por defecto",
    example: "Could I have a stamp, please?",
    es: "¿Me pone un sello, por favor?",
    shape: "Modal.",
    note: "Si solo te quedas con uno, quédate con este: sirve con un desconocido, en una ventanilla, en un correo y en el examen.",
  },
  {
    id: "ena2-mod-may",
    form: "may",
    what: "permiso, escalón formal",
    example: "May I ask a question?",
    es: "¿Puedo hacerle una pregunta?",
    shape: "Modal.",
    note: "Oficina, entrevista, trámite serio, alguien mucho mayor. Con un amigo suena antiguo, casi de broma.",
  },
  {
    id: "ena2-mod-couldnt",
    form: "couldn't",
    what: "imposibilidad en pasado",
    example: "I couldn't get through.",
    es: "No conseguí que me lo cogieran.",
    shape: "Modal. Es el pasado de can.",
  },
];

export const EN_A2_MODAL_TIP =
  "Detrás de TODOS los modales el verbo va desnudo: «I must to go» ✗, «Can you to help» ✗, «May I to ask» ✗. El español mete un infinitivo tras la perífrasis («tengo que ir») y en «tener que» hasta hay preposición — por eso el to sale solo. Es un error barato de arreglar: conviene hacerlo pronto y no volver.";

export const enA2Signs = {
  title: "El inglés de los carteles: tres moldes y ya está",
  items: [
    { pattern: "No + verbo en -ing", means: "prohibición", examples: "No smoking · No parking · No entry" },
    { pattern: "Do not + verbo", means: "prohibición, más seca (los carteles no se contraen)", examples: "Do not enter · Do not touch" },
    { pattern: "un sustantivo a secas", means: "información o restricción", examples: "Staff only · Out of order · Way out" },
  ],
  tip: "Y el aviso que más disgustos da: PULL es «tirar DE» y PUSH, que se parece tanto a «pulsar», es «empujar». Van justo al revés de lo que dice el oído. Otros que verás cada día en Londres: Mind the gap, Keep left, Please queue here.",
};

/* ══ 7 · PRONOMBRES, REFLEXIVOS Y POSESIVOS ════════════════════════════════ */

export interface EnA2PronounRow {
  subject: string;
  object: string;
  possAdj: string;
  possPron: string;
  reflexive: string;
  example: string;
}

export const enA2Pronouns: EnA2PronounRow[] = [
  { subject: "I", object: "me", possAdj: "my", possPron: "mine", reflexive: "myself", example: "Amy phoned me. · It's mine." },
  { subject: "you", object: "you", possAdj: "your", possPron: "yours", reflexive: "yourself / yourselves", example: "I saw you at the bus stop. · Which room is yours?" },
  { subject: "he", object: "him", possAdj: "his", possPron: "his", reflexive: "himself", example: "I helped him with the boxes. · That coat is his." },
  { subject: "she", object: "her", possAdj: "her", possPron: "hers", reflexive: "herself", example: "I saw her this morning. · The keys are hers." },
  { subject: "it", object: "it", possAdj: "its", possPron: "—", reflexive: "itself", example: "I can't find it." },
  { subject: "we", object: "us", possAdj: "our", possPron: "ours", reflexive: "ourselves", example: "Wait for us! · The flat is ours." },
  { subject: "they", object: "them", possAdj: "their", possPron: "theirs", reflexive: "themselves", example: "I don't know them. · This letter is theirs." },
];

export const EN_A2_PRONOUN_TIP =
  "Lo nuevo son cinco palabras (me, him, her, us, them); lo que de verdad hay que cambiar es EL SITIO. El español pone el pronombre delante del verbo («la vi», «le ayudé»); el inglés lo pone siempre detrás, pegado: I saw her. Y tras preposición, la misma fila: for me, with him, next to her, between us. Aviso caro: el objeto que el español calla, el inglés lo dice — «no lo encuentro» es I can't find IT, no «I can't find».";

export const enA2Possessives = {
  title: "Dos familias de posesivos, y el genitivo que va al revés",
  body:
    "my / your / his / her / our / their PIDEN sustantivo detrás. mine / yours / his / hers / ours / theirs van SOLOS y sustituyen al grupo entero. De ahí salen los dos errores espejo: «It's mine key» ✗ (mine ya lleva dentro el sustantivo) y «it's her» a secas ✗ (es hers). Ninguno lleva apóstrofo: hers, yours, ours, theirs, its — y ese its sin apóstrofo es el posesivo, mientras que it's es «it is».",
  genitive: [
    { rule: "dueño en singular", how: "'s", example: "Amy's flat · the landlord's number" },
    { rule: "plural que ya acaba en -s", how: "solo el apóstrofo", example: "my flatmates' room" },
    { rule: "plural irregular, sin -s", how: "'s otra vez", example: "the children's room" },
    { rule: "el dueño es una cosa", how: "of, o dos sustantivos juntos", example: "the end of the street · the front door key" },
  ],
  tip: "El español dice cosa + de + dueño; el inglés le da la vuelta: dueño + 's + cosa. «the flat of Amy» ✗ → Amy's flat. La pregunta es Whose is this? — «Of who…?» no es inglés en ningún registro. Y «un amigo mío» es a friend of mine, nunca «a friend of me» ni «a my friend».",
};

export const enA2Reflexives = {
  title: "El reflexivo inglés sirve para poco — y los veinte «me» españoles que hay que tirar",
  uses: [
    { what: "reflexivo de verdad: el que hace y el que recibe son el mismo", example: "I cut myself.", es: "Me corté." },
    { what: "énfasis: sin ayuda de nadie", example: "I did it myself.", es: "Lo hice yo sola." },
    { what: "by + reflexivo = solo/a", example: "I live by myself.", es: "Vivo sola. (= I live on my own; «by my own» ✗)" },
    { what: "fórmula de la casa", example: "Help yourself!", es: "¡Sírvete! (plural: Help yourselves)" },
    { what: "mutuo — y NO es reflexivo", example: "They help each other.", es: "Se ayudan (el uno al otro)." },
  ],
  test:
    "La prueba que resuelve los veinte de golpe, y la puedes hacer tú: ¿puedes añadir «a mí misma» y la frase sigue significando lo mismo? «Me corté a mí misma» → sí → I cut myself. «Me levanté a mí misma» → no significa nada → I got up, sin nada. Una prueba contra veinte verbos: no hace falta la lista.",
  traps: [
    { wrong: "I get up myself at seven.", right: "I get up at seven." },
    { wrong: "I feel myself tired.", right: "I feel tired." },
    { wrong: "I woke up myself late.", right: "I woke up late." },
    { wrong: "She complained herself about the noise.", right: "She complained about the noise." },
  ],
};

/* ══ 8 · tell me / explain TO me — los dos montones ════════════════════════ */
// Reparto léxico puro, como el género de los sustantivos en español. No se
// razona: se clasifica. Y solo hay que memorizar el montón pequeño.

export const enA2VerbObjects = {
  title: "El error que el español provoca, y por qué es tan tozudo",
  body:
    "En español CUALQUIER verbo de decir o de dar admite el pronombre delante: me dijo, me explicó, me describió, me recomendó, me sugirió, me mencionó. Una sola construcción para todos, así que el español no ofrece ninguna pista de que en inglés haya dos grupos — y por eso «He explained me the rules» sobrevive hasta niveles muy altos. Memoriza el montón B, que son seis verbos, y da por hecho que todo lo demás se comporta como tell.",
  directGroup: {
    label: "MONTÓN A — la persona va pegada al verbo, sin to",
    verbs: ["tell", "give", "show", "send", "lend", "buy", "bring", "offer", "teach", "ask", "make", "cook"],
    examples: [
      { en: "Tell me the truth.", es: "Dime la verdad." },
      { en: "Give her the keys.", es: "Dale las llaves." },
      { en: "Show me how it works.", es: "Enséñame cómo funciona." },
      { en: "She sent me a message.", es: "Me mandó un mensaje." },
    ],
  },
  toGroup: {
    label: "MONTÓN B — la persona NECESITA to (son seis, y son los que se memorizan)",
    verbs: ["explain", "say", "describe", "suggest", "recommend", "mention", "repeat"],
    examples: [
      { en: "Can you explain it to me?", es: "¿Me lo explicas?" },
      { en: "What did she say to you?", es: "¿Qué te dijo?" },
      { en: "Describe the flat to me.", es: "Descríbeme el piso." },
      { en: "She recommended the street to me.", es: "Me recomendó la calle." },
    ],
  },
  notes: [
    "Los del montón A TAMBIÉN pueden llevar to, pero entonces la cosa va primero: Give the keys to her. Las dos son correctas. Los del montón B nunca pueden quitarlo.",
    "say y tell son la pareja que más se cruza: tell casi siempre lleva persona (tell me, tell him); say casi nunca la lleva, y si la lleva, con to (She said nothing · She said it to me).",
  ],
};

/* ══ 9 · LAS TRAMPAS DEL HISPANOHABLANTE, CON SU NOMBRE ════════════════════ */
// Cada una resuelve la duda en una línea. Lo que hace falta cuando el alumno
// abre la libreta no es la gramática entera: es saber cuál de las dos frases
// que tiene en la cabeza es la buena.

export interface EnA2Trap {
  id: string;
  title: string;
  wrong: string;
  right: string;
  why: string;
  moduleId: string;
}

export const enA2Traps: EnA2Trap[] = [
  {
    id: "ena2-trap-didwent",
    title: "did + verbo en pasado",
    wrong: "Did you went? · I didn't went.",
    right: "Did you go? · I didn't go.",
    why: "El español marca el pasado en el verbo siempre; el inglés lo marca UNA vez, y cuando hay did lo lleva did. El verbo se queda desnudo.",
    moduleId: "ena2m2",
  },
  {
    id: "ena2-trap-ed",
    title: "la -ed pronunciada a la española",
    wrong: "worked → «uor-KED» · asked → «as-KED»",
    right: "uéekt · aaskt — una sílaba, y cerrando con la punta de la lengua",
    why: "El español no cierra palabras con dos consonantes seguidas y mete una vocal de apoyo. Ahí se pierde la /t/, y con ella el pasado entero.",
    moduleId: "ena2m1",
  },
  {
    id: "ena2-trap-doublecomp",
    title: "comparativo doble",
    wrong: "more cheaper · more better · He is more tall",
    right: "cheaper · better · He is taller",
    why: "El adjetivo lleva la marca de comparación UNA sola vez: o dentro (-er) o delante (more). Nunca las dos.",
    moduleId: "ena2m4",
  },
  {
    id: "ena2-trap-uncount",
    title: "incontables españoles que en inglés no lo son (y al revés)",
    wrong: "many money · the informations · some advices · my hairs",
    right: "much money · information · some advice · my hair",
    why: "Es lista cerrada, no regla: people, news, information, advice, furniture, luggage, homework, money, hair, bread. Ninguna lleva -s ni a/an.",
    moduleId: "ena2m5",
  },
  {
    id: "ena2-trap-peopleis",
    title: "«People is»",
    wrong: "People is very friendly.",
    right: "People are very friendly.",
    why: "people es plural (uno es a person), aunque «la gente» sea singular en español. Va con are, con many y con a lot of.",
    moduleId: "ena2m5",
  },
  {
    id: "ena2-trap-someany",
    title: "any al ofrecer y al pedir",
    wrong: "Would you like any tea? · Can I have any water?",
    right: "Would you like some tea? · Can I have some water?",
    why: "some se usa cuando ya cuentas con que la respuesta es sí. Es la excepción que cae en el oral, y las dos veces es de restaurante.",
    moduleId: "ena2m5",
  },
  {
    id: "ena2-trap-adverb",
    title: "el adverbio metido entre el verbo y su objeto",
    wrong: "I like very much this film. · I speak very well English.",
    right: "I like this film very much. · I speak English very well.",
    why: "En inglés NO se mete nada entre el verbo y su objeto. En español el adverbio se cuela ahí con toda naturalidad, y este es el más resistente de todos los calcos.",
    moduleId: "ena2m3",
  },
  {
    id: "ena2-trap-goingto",
    title: "going to de movimiento confundido con going to de intención",
    wrong: "«I'm going to work» leído siempre como «voy a trabajar»",
    right: "Mira lo que va detrás de to: sitio → movimiento · verbo → intención",
    why: "Es una trampa que crea el propio A1, que enseñó I'm going to work como «voy al trabajo». Solo es ambigua con work, home, bed y the shops.",
    moduleId: "ena2m6",
  },
  {
    id: "ena2-trap-presentfuture",
    title: "el presente español para los planes",
    wrong: "I go to the cinema tomorrow.",
    right: "I'm going to the cinema tomorrow.",
    why: "En inglés el presente simple es RUTINA. Si hay una fecha futura en la frase, el verbo no puede ir en presente simple — salvo horarios publicados (The train leaves at ten).",
    moduleId: "ena2m6",
  },
  {
    id: "ena2-trap-whenwill",
    title: "futuro en la mitad de «cuando»",
    wrong: "When I will get there, I'm going to call you.",
    right: "When I get there, I'm going to call you.",
    why: "Una frase, una marca de futuro, y va en la principal. La subordinada de tiempo (when, before, after, as soon as) se queda en presente.",
    moduleId: "ena2m6",
  },
  {
    id: "ena2-trap-mustnt",
    title: "mustn't confundido con don't have to",
    wrong: "You don't have to smoke here. (queriendo prohibir)",
    right: "You mustn't smoke here.",
    why: "El español escribe las dos igual («no tienes que»). mustn't PROHÍBE; don't have to EXIME. En un aviso de hospital, equivocarse es un problema serio.",
    moduleId: "ena2m7",
  },
  {
    id: "ena2-trap-modalto",
    title: "to detrás del modal",
    wrong: "I must to go. · Can you to help me? · May I to ask?",
    right: "I must go. · Can you help me? · May I ask?",
    why: "El español pone infinitivo tras la perífrasis, y en «tener que» hasta hay preposición. Detrás de un modal, el verbo va desnudo.",
    moduleId: "ena2m7",
  },
  {
    id: "ena2-trap-iwant",
    title: "«I want a coffee» en una ventanilla",
    wrong: "I want a coffee. · Send me the form.",
    right: "Could I have a coffee, please? · Could you send me the form?",
    why: "En inglés el registro no es un pronombre: se dice you a todo el mundo, así que el registro se juega ENTERO en la forma de la petición. Un texto sin un solo fallo de gramática puede perder puntos por esto, porque el error de registro se penaliza aparte.",
    moduleId: "ena2m7",
  },
  {
    id: "ena2-trap-explainme",
    title: "explain me",
    wrong: "He explained me the rules. · She suggested me another café.",
    right: "He explained the rules to me. · She suggested another café.",
    why: "Seis verbos exigen to + persona: explain, say, describe, suggest, recommend, mention. Todo lo demás se comporta como tell.",
    moduleId: "ena2m9",
  },
  {
    id: "ena2-trap-pronounplace",
    title: "el pronombre de objeto delante del verbo",
    wrong: "I her saw this morning. · I can't find.",
    right: "I saw her this morning. · I can't find it.",
    why: "En inglés el pronombre de objeto va detrás del verbo, pegado. Y si el verbo lleva objeto, el objeto se dice: el español puede callarlo, el inglés no.",
    moduleId: "ena2m9",
  },
  {
    id: "ena2-trap-possessive",
    title: "posesivo por pronombre, y el «de» del genitivo",
    wrong: "This is my. · the flat of Amy · Of who is this?",
    right: "This is mine. · Amy's flat · Whose is this?",
    why: "mine / yours / hers van solos; my / your / her piden sustantivo. Y el dueño va delante con 's.",
    moduleId: "ena2m9",
  },
  {
    id: "ena2-trap-reflexive",
    title: "el reflexivo español que el inglés no quiere",
    wrong: "I feel myself tired. · I get up myself at seven.",
    right: "I feel tired. · I get up at seven.",
    why: "Prueba de un segundo: si no puedes añadir «a mí misma» sin que la frase cambie de sentido, en inglés no va nada.",
    moduleId: "ena2m9",
  },
  {
    id: "ena2-trap-thanthat",
    title: "than escrito that",
    wrong: "It's cheaper that the other one.",
    right: "It's cheaper than the other one.",
    why: "Un «que» español, dos palabras inglesas. Si delante hay un comparativo, THAN. El oído no te salva porque las dos suenan igual de flojas: esto se arregla mirándolo al escribir.",
    moduleId: "ena2m4",
  },
  {
    id: "ena2-trap-superof",
    title: "«el mejor DE Londres» con of",
    wrong: "the best coffee of London",
    right: "the best coffee in London",
    why: "Tras superlativo: sitio o grupo de personas → IN. Solo con periodos de tiempo es OF (the worst day of my life).",
    moduleId: "ena2m4",
  },
  {
    id: "ena2-trap-mostpeople",
    title: "«la mayoría de la gente» con artículo y con of",
    wrong: "The most people take the bus. · most my friends",
    right: "Most people take the bus. · most of my friends",
    why: "Hablando en general, most a secas. De un grupo con nombre y apellidos, most of.",
    moduleId: "ena2m4",
  },
  {
    id: "ena2-trap-generalthe",
    title: "el artículo del español en las frases generales",
    wrong: "I like the music. (queriendo decir «me gusta la música»)",
    right: "I like music.",
    why: "En general, sin the. Concretando, con the (I like the music in this café). Truco: ¿podrías añadir «en general»? Entonces fuera el the.",
    moduleId: "ena2m5",
  },
  {
    id: "ena2-trap-eding",
    title: "adjetivos en -ed y en -ing",
    wrong: "I am boring. · The film was bored.",
    right: "I am bored. · The film was boring.",
    why: "El español usa el mismo adjetivo para las dos cosas. En inglés, -ed es cómo se siente la PERSONA y -ing es cómo es la COSA. «I am boring» significa que eres tú el aburrido de la fiesta.",
    moduleId: "ena2m3",
  },
];
