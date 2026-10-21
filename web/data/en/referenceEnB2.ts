// LA LIBRETA INGLESA DEL B2 — lo que se consulta con prisa: los marcadores
// discursivos escritos, la pasiva impersonal, la modalidad epistémica, las
// cláusulas no finitas, las TRES inversiones que sí son B2, las trampas del
// hispanohablante y Nativo (PLAN-EN-B2 §2 y §4).
//
// QUÉ NO ESTÁ AQUÍ, Y ES A PROPÓSITO:
//   · Lo del B1 (tiempos, pasiva simple, estilo indirecto, 1º y 2º
//     condicional, relativas, gerundio/infinitivo, preposiciones pegadas,
//     phrasal verbs de B1, conectores CON SU NIVEL REAL hasta however) vive
//     en `referenceEnB1.ts`. Aquí solo entra lo que el B2 añade.
//   · Lo que el EGP sitúa en C1/C2 NO se pide en producción: hendidas
//     What I need is… / It was Ben who…, condicionales mixtos, Hardly had I…,
//     Should you need…, Had I known…, phrasal verbs de tres piezas, cláusulas
//     de -ed (Faced with…, Being told…). Se marcan como terreno superior.
//
// LOS NIVELES de marcadores e inversiones están verificados en el English
// Grammar Profile y el English Vocabulary Profile (PLAN-EN-B2 §2.3 y §2.5).
//
// Todos los strings en inglés son audio-ables tal cual: la bocina los lee
// con la voz inglesa cuando la libreta está en modo inglés.

/* ══ 1 · MARCADORES DISCURSIVOS ESCRITOS ═══════════════════════════════════ */
// El B1 respetó el corte: however es A2; whereas, moreover, furthermore,
// as a result e in conclusion son B2 y no iban como objetivo. Aquí entran.
// Y el EGP lo confirma con tres competencias: comparación, abrir y
// cerrar y resumir.

export const EN_B2_MARKER_TIP =
  "Dos avisos. Primero: In conclusion no se dice en voz alta, ni So yeah, basically se escribe. El cierre tiene traje. Segundo: the thing is / the problem is / the reason is son el foco de B2 — no las hendidas What I need is… (C1) ni It was Ben who… (C2). Y la puntuación va dentro del criterio Organisation: el comma splice no es estética, son puntos.";

export interface EnB2Marker {
  word: string;
  es: string;
  /** qué va detrás, o dónde se sienta */
  follows: string;
  fn: "contraste" | "adicion" | "causa" | "comparacion" | "cierre" | "concesion" | "definir" | "foco";
  example: string;
  trap?: string;
}

export const enb2Markers: EnB2Marker[] = [
  { word: "whereas", es: "mientras que (dos cosas paralelas)", follows: "frase entera", fn: "contraste", example: "Cardiff recycles a lot, whereas London recycles less.", trap: "usarlo como however" },
  { word: "while (contraste)", es: "si bien, mientras que", follows: "frase entera", fn: "contraste", example: "While the pay is good, the hours are terrible." },
  { word: "on the other hand", es: "por otro lado", follows: "punto delante, coma detrás", fn: "contraste", example: "On the other hand, the scheme is cheaper to run." },
  { word: "nevertheless", es: "no obstante", follows: "punto delante, coma detrás", fn: "contraste", example: "Nevertheless, the plan went ahead." },
  { word: "even if", es: "incluso si", follows: "frase entera", fn: "contraste", example: "Even if the council reversed the plan, the air would not go back to 2010." },
  { word: "moreover", es: "es más", follows: "punto delante, coma detrás", fn: "adicion", example: "Moreover, the cost has doubled." },
  { word: "furthermore", es: "además (muy formal)", follows: "punto delante, coma detrás", fn: "adicion", example: "Furthermore, nobody was consulted." },
  { word: "what's more / what is more", es: "es más (hablado / escrito)", follows: "punto delante", fn: "adicion", example: "What is more, the figures are out of date." },
  { word: "in addition to", es: "además de", follows: "sustantivo o -ing", fn: "adicion", example: "In addition to the rent, there is council tax." },
  { word: "not only … but also", es: "no solo … sino también", follows: "piezas paralelas", fn: "adicion", example: "Not only is it cheaper, but it is also faster.", trap: "Not only did I… es C1; el B2 es present simple o be" },
  { word: "as a result", es: "como consecuencia", follows: "punto delante, coma detrás", fn: "causa", example: "As a result, the shop closed." },
  { word: "consequently", es: "por consiguiente", follows: "punto delante, coma detrás", fn: "causa", example: "Consequently, traffic has shifted to the next street." },
  { word: "therefore", es: "por lo tanto", follows: "punto delante, o tras el sujeto", fn: "causa", example: "The rent went up. Therefore, I moved out." },
  { word: "thus", es: "así pues (muy escrito)", follows: "punto delante", fn: "causa", example: "Thus, the scheme failed its own test." },
  { word: "hence", es: "de ahí que (escrito)", follows: "punto delante, a menudo un sintagma", fn: "causa", example: "The evidence is thin. Hence the caution." },
  { word: "due to the fact that", es: "debido a que", follows: "frase entera", fn: "causa", example: "Due to the fact that the figures are from 2019, they cannot be compared.", trap: "due to + frase sin the fact that: better because / since" },
  { word: "thanks to", es: "gracias a", follows: "sustantivo (positivo)", fn: "causa", example: "Thanks to the new lane, journey times fell." },
  { word: "likewise", es: "igualmente, del mismo modo", follows: "punto delante", fn: "comparacion", example: "The north cut emissions. Likewise, the west brought in charges." },
  { word: "similarly", es: "de forma similar", follows: "punto delante, coma detrás", fn: "comparacion", example: "Similarly, smaller towns have followed the same pattern." },
  { word: "in the same way", es: "del mismo modo", follows: "frase", fn: "comparacion", example: "In the same way, the second study found no effect." },
  { word: "to begin with / for a start", es: "para empezar", follows: "punto delante", fn: "cierre", example: "To begin with, the headline overstates the finding." },
  { word: "in conclusion", es: "en conclusión", follows: "punto delante, coma detrás", fn: "cierre", example: "In conclusion, the evidence is thinner than the headline.", trap: "decirlo en voz alta en una caña" },
  { word: "to sum up", es: "en suma", follows: "punto delante", fn: "cierre", example: "To sum up, the evidence points to fewer cars, not fewer people." },
  { word: "all things considered", es: "en conjunto, a fin de cuentas", follows: "punto delante", fn: "cierre", example: "All things considered, the scheme is defensible." },
  { word: "admittedly", es: "cierto es que, a decir verdad", follows: "coma detrás, o punto delante", fn: "concesion", example: "Admittedly, car journeys are quicker; nevertheless, they are not cheaper." },
  { word: "granted", es: "concedido, bien está", follows: "coma detrás", fn: "concesion", example: "Granted, the first year is expensive." },
  { word: "despite the fact that", es: "a pesar de que", follows: "frase entera", fn: "concesion", example: "Despite the fact that the lane is new, drivers still park on it.", trap: "Despite the lane is new" },
  { word: "it is true that … but", es: "es verdad que … pero", follows: "frase + but", fn: "concesion", example: "It is true that the cost is high, but the alternative costs more." },
  { word: "namely", es: "a saber", follows: "el término que precisas", fn: "definir", example: "One group is hit harder, namely part-time staff." },
  { word: "that is to say", es: "es decir", follows: "la reformulación", fn: "definir", example: "The scheme is regressive, that is to say, it falls on those who can least afford it." },
  { word: "in other words", es: "dicho de otro modo", follows: "punto delante, coma detrás", fn: "definir", example: "In other words, the problem is distribution, not volume." },
  { word: "in terms of", es: "en lo que respecta a", follows: "sustantivo o -ing", fn: "definir", example: "In terms of cost, the bus wins." },
  { word: "the thing is (that)", es: "lo que pasa es que / la cosa es que", follows: "frase", fn: "foco", example: "The thing is, nobody read the small print." },
  { word: "the problem is (that)", es: "el problema es que", follows: "frase", fn: "foco", example: "The problem is that the first sentence never says what the paragraph is about." },
  { word: "the reason (that / why / for)", es: "la razón es que / de", follows: "frase o sustantivo", fn: "foco", example: "The reason I called is that the figures do not add up." },
];

export const enb2MarkerGroups: { id: EnB2Marker["fn"]; label: string; hint: string }[] = [
  { id: "contraste", label: "Contraste", hint: "whereas contrapone dos cosas paralelas; however contrapone dos frases. No son sinónimos." },
  { id: "adicion", label: "Adición", hint: "moreover / furthermore / what is more: punto delante, coma detrás. And another thing se queda en la discusión de bar." },
  { id: "causa", label: "Causa y efecto", hint: "as a result, consequently, therefore, thus, hence. because of ya era A2; estas son las de informe." },
  { id: "comparacion", label: "Comparación", hint: "likewise, similarly, in the same way: la competencia #1139 del EGP, y casi nadie las produce." },
  { id: "cierre", label: "Apertura y cierre", hint: "to begin with, in conclusion, to sum up. In conclusion no se dice en voz alta." },
  { id: "concesion", label: "Concesión", hint: "La función nueva del nivel: admittedly, granted, it is true that… but. Sin esto, el ensayo suena a manifiesto." },
  { id: "definir", label: "Ejemplificar y definir", hint: "namely, that is to say, in other words, in terms of. Classifying, generalising, defining: las funciones oficiales." },
  { id: "foco", label: "Foco nominal", hint: "The thing/problem/reason is… — las dos únicas entradas de FOCUS en B2. Las hendidas clásicas son C1 y C2." },
];

export const enb2Punctuation = {
  title: "La puntuación es gramática, no estética",
  body:
    "El criterio Organisation de LanguageCert mide, literalmente, cómo de coherentes van las ideas y cómo de precisa es la puntuación. El español y el inglés puntúan distinto, y las diferencias son pocas, sistemáticas y por tanto enseñables en una tarde. El Reading Part 2 —seis frases extraídas, siete opciones— no se aprueba sin saber cómo se cose un párrafo inglés.",
  rows: [
    ["Comma splice", "Llegué tarde, no había nadie.", "I arrived late. There was nobody there. / I arrived late; there was nobody there. / I arrived late, and there was nobody there.", "La coma sola NO une dos oraciones. Es el error de puntuación número uno del hispanohablante."],
    ["Coma antes de and", "casi nunca en español", "I went home, and she stayed.", "Solo si cada mitad tiene SU sujeto. I went home and stayed: sin coma."],
    ["however", "However the bins are new, nobody uses them.", "The bins are new. However, nobody uses them.", "Punto delante, coma detrás. No une dos frases en una."],
    ["Dos puntos", "para introducir cualquier cosa", "tras una oración completa", "This is the point: nobody was asked. No: The point: nobody was asked."],
    ["Párrafo", "idea trenzada, largo", "una idea, frase-tema al principio", "Si el lector no sabe de qué va en la primera frase, no es un párrafo inglés."],
  ] as [string, string, string, string][],
};

export const enb2MarkerTraps: [string, string, string][] = [
  ["Although the lane is new, but nobody uses it.", "Although the lane is new, nobody uses it.", "although ya hace de pero: uno de los dos sobra"],
  ["Despite the lane is new…", "Despite the new lane… / Although the lane is new…", "despite no admite frase entera: quiere sustantivo o -ing, o despite the fact that"],
  ["However the bins are new, nobody uses them.", "The bins are new. However, nobody uses them.", "however no es although"],
  ["In conclusion, so yeah, that's me.", "In conclusion, the evidence points to starting small.", "el cierre escrito no se dice en voz alta, ni al revés"],
  ["The thing is is that…", "The thing is that… / The thing is, nobody read it.", "una sola is. The thing is, con coma, es hablado"],
];

/* ══ 2 · PASIVA IMPERSONAL ═════════════════════════════════════════════════ */
// , #723, #724, #728. Dieciocho competencias de PASSIVES en B2
// frente a diez en B1, y las de B2 son casi todas de construcción impersonal
// o de tiempo compuesto. Es la estructura más B2 de todas.

export const EN_B2_PASSIVE_TIP =
  "People say es correcto y baja el registro sin romperlo: por eso nadie te lo corrige, y por eso te deja en B1. El molde es It is thought/said/believed/reported that… y He is said to have…. Prohibirse people say / they say en el escrito formal no es pedantería: es la herramienta exacta contra la evitación.";

export const enb2ImpersonalMoulds: [string, string, string][] = [
  ["It is said that the library will close.", "Se dice que la biblioteca cerrará.", "molde 1: It + be + participio + that"],
  ["It is widely believed that the figures are wrong.", "Se cree de forma generalizada que las cifras están mal.", "widely / generally / commonly suben el alcance"],
  ["It has been reported that the manager resigned.", "Se ha informado de que el gerente dimitió.", "present perfect pasivo: el de la prensa"],
  ["The manager is said to have resigned last week.", "Se dice que el gerente dimitió la semana pasada.", "molde 2: sujeto + be + said/thought/believed + to + infinitivo / have + participio"],
  ["She is thought to be abroad.", "Se cree que está en el extranjero.", "infinitivo simple: el estado presente"],
  ["The scheme is believed to have been dropped.", "Se cree que el plan se ha aparcado.", "pasiva de infinitivo: to have been + participio"],
  ["It should be noted that the figures are from 2019.", "Cabe señalar que las cifras son de 2019.", "pasiva con modal para evaluar o resumir"],
  ["It is not yet known who leaked the memo.", "Aún no se sabe quién filtró la nota.", "el quién es el hueco; no se inventa un they"],
];

export const enb2ReportingPassives: [string, string][] = [
  ["say", "It is said that… / He is said to…"],
  ["think", "It is thought that… / She is thought to…"],
  ["believe", "It is believed that… / They are believed to…"],
  ["report", "It is reported that… / It has been reported that…"],
  ["expect", "It is expected that… / He is expected to…"],
  ["consider", "It is considered that… / She is considered to be…"],
  ["know", "It is known that… / He is known to have…"],
  ["claim", "It is claimed that… / They are claimed to have…"],
];

export const enb2PassiveScale = {
  title: "La escalera de la impersonalidad",
  body:
    "Misma afirmación, cuatro trajes. El B2 no es producir la pasiva: es elegir el traje. get + participio es la de la calle y en el escrito formal se cambia por be. According to nombra la fuente; It is thought that la esconde.",
  rows: [
    ["Calle, rumor", "Apparently the library's closing. · Word is, she's resigned."],
    ["Neutro, hablado", "People say it's closing. · They reckon she'll go."],
    ["Prensa, sin mojarse", "It is widely believed that the library will close."],
    ["Prensa, con fuente", "According to the report, the scheme has been dropped."],
    ["Desmentido, exam", "These claims have been denied."],
    ["Desmentido, calle", "That's rubbish."],
  ] as [string, string][],
};

export const enb2SeExitsB2 = {
  title: "Un «se» español, y la salida que el B1 no cerró",
  body:
    "El B1 dio three salidas (pasiva, you genérico, they/people). El B2 cierra la que el hispanohablante nunca produce: la impersonal con it y la de infinitivo. People say comunica y no puntúa como B2.",
  rows: [
    ["Se dice que cerrará.", "It is said that it will close.", "escrito, informe, examen"],
    ["Se cree que dimitió.", "He is said to have resigned.", "molde 2, más denso"],
    ["Se ha desmentido.", "These claims have been denied.", "sin agente: el quién no importa"],
    ["Se señala que las cifras son de 2019.", "It should be noted that the figures are from 2019.", "evaluar o resumir"],
    ["Lo cancelaron. (calle)", "It got cancelled.", "get-passive: informal, a menudo malo"],
    ["Lo cancelaron. (exam)", "It was cancelled.", "be-passive: el escrito"],
  ] as [string, string, string][],
};

export const enb2PassiveTraps: [string, string, string][] = [
  ["People say the library will close. (en un informe)", "It is widely believed that the library will close.", "people say es correcto y es evitación"],
  ["Is said that it will close.", "It is said that it will close.", "el it del molde no significa nada y va siempre"],
  ["He is said that he resigned.", "He is said to have resigned. / It is said that he resigned.", "el molde 2 lleva to, no that"],
  ["The story was denied by them.", "These claims have been denied.", "el agente con by es la excepción: cuatro de cada cinco pasivas reales van sin él"],
];

/* ══ 3 · MODALIDAD — cuánto te mojas ═══════════════════════════════════════ */
// MODALITY es el 24 % del EGP del B2 (60 de 248). El B2 no aprende modales
// nuevos: aprende a graduar el compromiso con perífrasis. Trece expressions
// with be, más may/must/can't have + participio.

export const EN_B2_MODALITY_TIP =
  "Enséñalo como escala, no como lista: it is / it's bound to be / it's highly likely / it may well be / it could be / it's supposed to be / apparently. El ejercicio que la entrena es clasificar por cuánto se moja el que habla, y parafrasear de subida y de bajada. Encaja una a una con las funciones nuevas del handbook: degrees of probability, hypothesising, agreement with reservations.";

export interface EnB2BeExpr {
  form: string;
  use: string;
  example: string;
  es: string;
  note: string;
}

export const enb2BeExpressions: EnB2BeExpr[] = [
  { form: "be likely to", use: "probabilidad graduable", example: "It is likely to rain. · It is highly likely that the bill will go up.", es: "es probable que", note: "Acepta modificador: highly, very, much more, less. , #472." },
  { form: "be (much) more / less likely", use: "comparar probabilidades", example: "Younger drivers are much more likely to be fined.", es: "es (mucho) más / menos probable que", note: "Compara dos grupos, no afirma uno." },
  { form: "be bound to", use: "certeza inevitable", example: "It's bound to come out eventually.", es: "va a pasar sí o sí", note: "No es obligación. Es 'no tiene cómo no pasar'." },
  { form: "be sure to / be certain to", use: "certeza", example: "She is sure to object. · It's certain to cost more.", es: "seguro que", note: "Más escrito que bound to." },
  { form: "be supposed to (obligación)", use: "expectativa o norma", example: "You're supposed to give two weeks' notice.", es: "se supone que debes", note: "La norma sin acusar a nadie. Ya se olía en B1; aquí se nombra." },
  { form: "be supposed to (rumor)", use: "dicen que", example: "The house is supposed to be empty.", es: "se supone que (rumor)", note: "Mismo supposed, otro oficio. El manual casi nunca los separa; el B2 sí." },
  { form: "be meant to", use: "estado ideal, o rumor suave", example: "It's meant to be a listed building.", es: "se supone que es / debería ser", note: ". Muy británico. No es intend." },
  { form: "be due to / be to", use: "previsto, programado (formal)", example: "The surveyor is due to call on Friday. · The committee is to meet in May.", es: "está previsto que", note: "Agenda, no voluntad. be to es más formal aún." },
  { form: "be obliged to", use: "obligación externa institucional", example: "Landlords are obliged to protect the deposit.", es: "están obligados a", note: "La ley, el contrato, el reglamento. No I have to de todos los días." },
  { form: "be forced to", use: "obligación fuera del control del sujeto", example: "We were forced to close for a week.", es: "se vieron forzados a", note: "Hay un empujón externo. Distinto de decided to." },
  { form: "be obvious / sure / likely / certain that", use: "aserción graduada con that", example: "It is obvious that the figures do not add up.", es: "es obvio / seguro / probable que", note: "It + adjetivo + that: hacer la aserción menos directa." },
];

export const enb2ModalityScale: [string, string, string][] = [
  ["certeza", "it's bound to be · it must be · it's certain to", "no tiene cómo no ser"],
  ["muy probable", "it's highly likely · it's very likely to", "apostarías"],
  ["probable", "it's likely to · it should · it ought to", "lo normal"],
  ["posible, inclinada", "it may well be · it could well", "puede, y no te sorprendería"],
  ["posible", "it could be · it might be · it may", "no lo descartas"],
  ["rumor / expectativa", "it's supposed to be · it's meant to be · apparently", "lo dice alguien, no tú"],
  ["imposible", "it can't be · it cannot have been", "el contrario de must, no mustn't"],
];

export const enb2PerfectModals: [string, string, string][] = [
  ["must have + participio", "They must have left in a hurry — the lights are on.", "deducción sobre el PASADO: tiene que haber…"],
  ["can't have / cannot have", "It can't have been a fox — the lock was forced.", "deducción negativa sobre el pasado. NUNCA mustn't have para esto"],
  ["may have", "I may have missed the email.", "posibilidad en el pasado; también concede: I may have missed it, but…"],
  ["might have", "She might have already gone.", "igual de posible, un grado más hipotético"],
  ["could have (especular)", "It could have been the neighbour.", "especulación sobre lo que pasó"],
  ["could have (lamentar)", "I could have waited.", "lo que fue posible y no hiciste"],
  ["should have / ought to have", "In hindsight, I ought to have written it differently.", "arrepentimiento: deberías haber… y no lo hiciste"],
];

export const enb2HedgingTools: [string, string, string][] = [
  ["It is unfortunate that nobody flagged this.", "Es lamentable que nadie lo señalara.", "it + adjetivo + that: atenuar la aserción"],
  ["I may have missed the email, but the charge is still there.", "Puede que se me pasara el correo, pero el cargo sigue.", "may… but: conceder"],
  ["The evidence strongly suggests…", "Las pruebas sugieren con fuerza…", "suggests, no proves: bajar el compromiso"],
  ["There is no conclusive evidence either way.", "No hay pruebas concluyentes en ningún sentido.", "admitir ignorancia sin sonar a nada"],
  ["It could be argued that the cost falls on those who can least afford it.", "Podría argumentarse que el coste recae sobre quienes menos pueden pagarlo.", "quitarse del medio: la opinión sin yo"],
];

export const enb2ModalityTraps: [string, string, string][] = [
  ["He mustn't have left — the lights are on. (queriendo deducir)", "He can't have left — the lights are on.", "mustn't prohíbe; can't deduce que NO"],
  ["It's bound to I go.", "I'm bound to go. / It's bound to happen.", "bound to + infinitivo, con su sujeto"],
  ["The house is supposed to empty.", "The house is supposed to be empty.", "supposed to + infinitivo; el rumor también lleva be"],
  ["I think that, I think that, I think that…", "It is likely that… / The evidence suggests… / It could be argued that…", "I think es B1; la escala es B2"],
];

/* ══ 4 · NO FINITAS ════════════════════════════════════════════════════════ */
// -ing delante de la principal: B2. after having/being + -ed: B2
//. rather than + no finita: B2. -ed delante (Told to wait…,
// Faced with…, Being told…): C1. not + -ing: C1. Se paran donde manda el EGP.

export const EN_B2_NONFINITE_TIP =
  "Empaquetar: meter la circunstancia dentro de la frase en vez de ponerla al lado. After I finished, I left es correcto y es B1. Having finished, I left es B2. El sujeto del -ing TIENE que ser el de la principal: si no, el modificador se queda colgando y la frase dice otra cosa. Y aquí se para: Faced with…, Being told…, Not knowing… se reconocen en la lectura, marcadas como C1, y no entran en el SRS como tarjeta productiva.";

export interface EnB2NonFinite {
  id: string;
  form: string;
  when: string;
  example: string;
  es: string;
  trap: string;
  level: "B2" | "C1";
}

export const enb2NonFinite: EnB2NonFinite[] = [
  {
    id: "enb2-nf-ing",
    form: "-ing delante de la principal",
    when: "la circunstancia ocurre a la vez o justo antes, MISMO sujeto",
    example: "Walking back from the station, I realised the last bus had gone.",
    es: "Volviendo de la estación, me di cuenta de que se había ido el último bus.",
    trap: "Walking home, the bus appeared. (¿quién andaba? dangling modifier)",
    level: "B2",
  },
  {
    id: "enb2-nf-having",
    form: "Having + participio / after having + participio",
    when: "la circunstancia es ANTERIOR, mismo sujeto",
    example: "Having missed the connection, we took the replacement bus.",
    es: "Como habíamos perdido el enlace, cogimos el bus alternativo.",
    trap: "Having missed the connection, the bus was full. (el bus no perdió el enlace)",
    level: "B2",
  },
  {
    id: "enb2-nf-aftering",
    form: "preposición + -ing",
    when: "after, before, without, by, on, in spite of + -ing",
    example: "After leaving the ring road, the traffic eases. · Rather than driving, we booked the train.",
    es: "Después de salir de la ronda, el tráfico afloja. En vez de ir en coche, reservamos el tren.",
    trap: "After to leave… · Rather than to drive…",
    level: "B2",
  },
  {
    id: "enb2-nf-rather",
    form: "rather than + no finita",
    when: "preferir o rechazar con alternativa",
    example: "Rather than driving, we could book the earlier train.",
    es: "En vez de ir en coche, podríamos reservar el tren de antes.",
    trap: "Rather than to drive… (rather than no lleva to)",
    level: "B2",
  },
  {
    id: "enb2-nf-ed",
    form: "-ed delante de la principal (Faced with…, Told to wait…)",
    when: "terreno C1: se reconoce, no se produce",
    example: "Faced with a delay, she sat down. (reconocer)",
    es: "Ante un retraso, se sentó.",
    trap: "producirlo en un write de B2 y creerte que puntúa extra: no es el nivel",
    level: "C1",
  },
  {
    id: "enb2-nf-being",
    form: "Being told… / Not knowing…",
    when: "C1. El handbook de LanguageCert firma igual: -ing en B2, -ed en Expert",
    example: "Being told to wait, she sat down. (reconocer)",
    es: "Como le dijeron que esperara, se sentó.",
    trap: "meterlo en el SRS con produce: true. CLAUDE.md lo prohíbe: no se sube de nivel",
    level: "C1",
  },
];

export const enb2RelativeB2: [string, string, string][] = [
  ["preposición al final", "the station I told you about", "no es informal: es lo normal. the station about which I told you suena a examen antiguo"],
  ["explicativa con whose", "Amy, whose shift had overrun, arrived late", "comas, y whose también para cosas en registro escrito"],
  ["especificativa con whose", "the colleague whose English is perfect", "sin comas: dice CUÁL"],
  ["relativa de frase entera", "We just stood there, which was a relief.", "which se refiere a TODO lo anterior. what means no existe"],
  ["there had been", "There had been three cancellations before anyone put up a notice.", "cero apariciones en el B1; aquí se estrena como capa de fondo"],
];

export const enb2NonFiniteTraps: [string, string, string][] = [
  ["Walking home, the bus appeared.", "Walking home, I saw the bus. / As I was walking home, the bus appeared.", "el sujeto del -ing tiene que ser el de la principal"],
  ["After I finished, I left. (y nada más, en un write de B2)", "Having finished, I left.", "la subordinada de always es evitación: es correcta y te deja en B1"],
  ["Faced with the delay, I sat down. (como objetivo)", "Having been delayed, I sat down. / After the delay, I sat down.", "Faced with es C1: se lee, no se pide"],
];

/* ══ 5 · INVERSIONES B2 — solo tres ═══════════════════════════════════════ */
// VERIFICADO contra el EGP: Never (before) had I… B2; No sooner had I… than
// B2; Not only… but also con present simple B2. Not only did I… C1.
// Should you need… C1. Had I known… C1. Hardly had I… C2. Were I to… C2.

export const EN_B2_INVERSION_TIP =
  "Tres patrones se automatizan; nueve se olvidan. El Hardly had I… del encargo de muchos manuales es C2, no B2. Se enseñan esas tres, en producción, y se marca explícitamente que las demás son terreno superior. Y solo se usan si hay algo que enfatizar: pegar Never have I… en un correo al banco no es B2, es disfraz.";

export interface EnB2Inversion {
  id: string;
  form: string;
  example: string;
  es: string;
  note: string;
  level: "B2" | "C1" | "C2";
  produce: boolean;
}

export const enb2Inversions: EnB2Inversion[] = [
  {
    id: "enb2-inv-never",
    form: "Never (before) have / had I…",
    example: "Never before had I seen her without the coat. · Never have we had this much in the pot.",
    es: "Jamás la había visto sin el abrigo. Nunca hemos tenido tanto en el cajón.",
    note: ", #138, #1193. Auxiliar antes del sujeto. Si no hay auxiliar, se pone do/does/did — pero el caso vivo de B2 es have/had.",
    level: "B2",
    produce: true,
  },
  {
    id: "enb2-inv-nosooner",
    form: "No sooner had I… than…",
    example: "No sooner had we agreed than someone reopened the parking row.",
    es: "No bien habíamos acordado, alguien reabrió lo del parking.",
    note: ". than, no when. Las dos mitades van: had + participio en la invertida, pasado simple en la otra.",
    level: "B2",
    produce: true,
  },
  {
    id: "enb2-inv-notonly",
    form: "Not only … but also (con present simple o be)",
    example: "Not only is it cheaper, but it is also faster to organise.",
    es: "No solo es más barato, sino que además se organiza antes.",
    note: ", #176. El B2 es is/are o present simple. Not only did I… (con do) es C1.",
    level: "B2",
    produce: true,
  },
  {
    id: "enb2-inv-notonlydid",
    form: "Not only did I…",
    example: "Not only did she complain, she also wrote to the paper. (reconocer)",
    es: "No solo se quejó, sino que además escribió al periódico.",
    note: "C1 (#273, #803, #1198). Se lee; no se pide.",
    level: "C1",
    produce: false,
  },
  {
    id: "enb2-inv-shouldyou",
    form: "Should you need…",
    example: "Should you need anything, please call. (reconocer)",
    es: "Si necesitara algo, llame.",
    note: "Condicional invertido, C1 (#1123, #595).",
    level: "C1",
    produce: false,
  },
  {
    id: "enb2-inv-hadiknown",
    form: "Had I known…",
    example: "Had I known, I would have waited. (reconocer)",
    es: "De haberlo sabido, habría esperado.",
    note: "C1. El B2 produce If I had known, I would have… — el tercer condicional, sin invertir.",
    level: "C1",
    produce: false,
  },
  {
    id: "enb2-inv-hardly",
    form: "Hardly had I…",
    example: "Hardly had I sat down when the phone rang. (reconocer, y de C2)",
    es: "Apenas me había sentado cuando sonó el teléfono.",
    note: "C2 (#139, #783). No es B2. Los manuales lo ponen en B2 y el EGP no.",
    level: "C2",
    produce: false,
  },
];

export const enb2InversionTraps: [string, string, string][] = [
  ["Never I had seen that.", "Never had I seen that.", "el auxiliar se adelanta: had I, no I had"],
  ["No sooner we had agreed when someone objected.", "No sooner had we agreed than someone objected.", "had delante, than (no when) detrás"],
  ["Not only did I finish, but I also sent it. (como objetivo de B2)", "Not only is it cheaper, but it is also faster. / I not only finished, I also sent it.", "did I es C1; el B2 es be o presente, o se deja sin invertir"],
  ["Hardly had I arrived when… (en un write de B2)", "No sooner had I arrived than… / I had hardly arrived when…", "Hardly had I es C2. No se produce."],
];

/* ══ 6 · TRAMPAS Y FALSOS AMIGOS CULTOS ════════════════════════════════════ */
// Las del B1 no se reabren como tema: se cazan en el errorfix. Estas son las
// que aparecen CUANDO SE ESCRIBE FORMAL, más la evitación, que es la trampa
// característica del nivel: no genera errores, genera techo.

export interface EnB2FalseFriend {
  es: string;
  wrong: string;
  means: string;
  right: string;
  moduleId: string;
}

export const enb2FalseFriends: EnB2FalseFriend[] = [
  { es: "últimamente", wrong: "ultimately", means: "en última instancia, al final del todo", right: "lately · recently", moduleId: "enb2m8" },
  { es: "tópico, cliché", wrong: "topic", means: "tema", right: "a cliché · a stereotype", moduleId: "enb2m4" },
  { es: "es evidente / hay evidencias", wrong: "evidences · it is evidence that", means: "evidence = pruebas, incontable, sin plural", right: "it is clear that… · there is evidence that…", moduleId: "enb2m4" },
  { es: "notorio, conocido", wrong: "notorious", means: "famoso por algo MALO", right: "well-known · renowned", moduleId: "enb2m4" },
  { es: "solicitar (un puesto)", wrong: "solicit", means: "abordar, requerir de forma turbia", right: "apply for · request", moduleId: "enb2m2" },
  { es: "pretender (aspirar)", wrong: "pretend", means: "fingir", right: "intend · aim to · claim to", moduleId: "enb2m2" },
  { es: "realizar (llevar a cabo)", wrong: "realise", means: "darse cuenta", right: "carry out · conduct", moduleId: "enb2m5" },
  { es: "política (de empresa, de ayuntamiento)", wrong: "politics", means: "la política, la actividad política", right: "policy", moduleId: "enb2m11" },
  { es: "suceder (ocurrir)", wrong: "succeed", means: "tener éxito", right: "happen · occur · follow", moduleId: "enb2m5" },
  { es: "agenda (de citas)", wrong: "agenda", means: "orden del día de una reunión", right: "diary · calendar", moduleId: "enb2m2" },
  { es: "exponer (presentar un tema)", wrong: "expose", means: "destapar, dejar a la intemperie", right: "present · set out · outline", moduleId: "enb2m4" },
  { es: "resumir", wrong: "resume", means: "reanudar", right: "summarise · sum up", moduleId: "enb2m1" },
  { es: "avisar", wrong: "advise", means: "aconsejar", right: "warn · let someone know · notify", moduleId: "enb2m6" },
  { es: "controlar (revisar)", wrong: "control", means: "dominar, mandar sobre", right: "check · monitor", moduleId: "enb2m7" },
  { es: "introducir (un tema)", wrong: "introduce a topic (a veces vale) / introduce a paragraph (calco)", means: "presentar a alguien; insertar", right: "bring in · put in · raise", moduleId: "enb2m1" },
  { es: "demandar (pedir)", wrong: "demand", means: "exigir; en jurídico, denunciar", right: "request · call for", moduleId: "enb2m11" },
  { es: "relevante (importante)", wrong: "relevant (queriendo decir importante)", means: "pertinente, que viene al caso", right: "significant · important", moduleId: "enb2m5" },
  { es: "manifestarse", wrong: "manifest", means: "mostrarse, hacerse patente", right: "demonstrate · protest", moduleId: "enb2m11" },
];

export interface EnB2Trap {
  id: string;
  title: string;
  wrong: string;
  right: string;
  why: string;
  moduleId: string;
}

export const enb2Traps: EnB2Trap[] = [
  {
    id: "enb2-trap-avoidance",
    title: "La evitación: el techo que no genera errores",
    wrong: "Un texto sin pasivas impersonales, sin whereas, sin -ing inicial y sin phrasal verbs. Cero errores. Nota de Range: 2 sobre 5.",
    right: "Prohibirse la salida fácil: people say, they say, after I finished, postpone (una vez, para forzar put off), I think that como único marco.",
    why: "Es LA trampa del B2 y la causa de la meseta. Capel (2012) lo documenta en el corpus de Cambridge: los aprendices evitan los phrasal verbs bajo examen. El español está del lado de las lenguas que no tienen la categoría. En las cinco filas (phrasal, pasiva impersonal, relativa explicativa, -ing clause, inversión) la columna de la derecha dice lo mismo: es correcto. Nadie te lo corrige. El curso te lo nombra.",
    moduleId: "enb2m6",
  },
  {
    id: "enb2-trap-commasplice",
    title: "El comma splice y el párrafo español",
    wrong: "I arrived late, there was nobody there. · A long paragraph with three ideas and no topic sentence.",
    right: "I arrived late. There was nobody there. · One paragraph, one idea, topic sentence first.",
    why: "La puntuación está dentro de Organisation. El Reading Part 2 examina lo mismo en recepción: sus seis huecos son frases-tema, frases-resumen y transiciones. Un solo contenido, dos partes del examen.",
    moduleId: "enb2m1",
  },
  {
    id: "enb2-trap-circunloquio",
    title: "Cinco palabras donde hay una",
    wrong: "make the situation better · the people who are in charge of the town · it is a thing that happens a lot · say that something is not true",
    right: "improve · the council / the authorities · it is common / widespread · deny / refute",
    why: "El descriptor de B2 penaliza el circunloquio: without much conspicuous searching for words. En B1 el rodeo estaba permitido. En B2 se prohíbe el rodeo para forzar la palabra: si das vueltas, no has dicho la palabra que puntúa.",
    moduleId: "enb2m2",
  },
  {
    id: "enb2-trap-peoplesay",
    title: "people say en lugar de la pasiva impersonal",
    wrong: "People say the library will close. · They cancelled it. (en un informe)",
    right: "It is widely believed that the library will close. · It was cancelled. / It is said to have been cancelled.",
    why: "Es la estructura más B2 que existe y el español la resuelve con se. People say comunica y baja el registro sin romperlo: el perfil exacto de la evitación.",
    moduleId: "enb2m4",
  },
  {
    id: "enb2-trap-register",
    title: "Registro de más y registro de menos",
    wrong: "I would like to express my utmost gratitude (a un amigo). · this is a joke (al banco).",
    right: "Thanks, that's great. · I am far from satisfied with the way this was handled.",
    why: "Baja el criterio de vocabulario por los dos lados. book / real / exam son exactamente las tres columnas de esta lección. El B2 se pasa de frenada hacia lo culto tanto como hacia lo coloquial.",
    moduleId: "enb2m3",
  },
  {
    id: "enb2-trap-collocation",
    title: "La colocación imposible",
    wrong: "do a decision · strong rain · make homework · responsible of · interest for",
    right: "make a decision · heavy rain · do homework · responsible for · have an interest in",
    why: "El handbook mete la colocación como objetivo explícito. El descriptor de Vocabulary control permite equivocarse de palabra si no rompe la comunicación; no permite la colocación imposible. Se ataca con fastmatch, no razonando.",
    moduleId: "enb2m7",
  },
  {
    id: "enb2-trap-dangling",
    title: "El -ing con el sujeto de otro",
    wrong: "Walking home, the bus appeared. · Having missed the connection, the platform was empty.",
    right: "Walking home, I saw the bus. · Having missed the connection, we found the platform empty.",
    why: "El gerundio español no encabeza así, así que el alumno o no lo intenta (evitación) o lo calca y deja el sujeto colgando. El sujeto del -ing es el de la principal, sin excepción.",
    moduleId: "enb2m9",
  },
  {
    id: "enb2-trap-indirectq",
    title: "La pregunta indirecta que se sigue invirtiendo",
    wrong: "Could you tell me where is the station? · I don't know where is it.",
    right: "Could you tell me where the station is. · I don't know where it is.",
    why: "Coe la marca como problema even for advanced learners. El B1 ya la atacó; en B2 sobrevive. En cuanto la pregunta va dentro de otra frase, deja de comportarse como pregunta.",
    moduleId: "enb2m9",
  },
  {
    id: "enb2-trap-thirdcond",
    title: "would en las dos mitades del tercero",
    wrong: "If I would have known, I would have waited. · If I had have known…",
    right: "If I had known, I would have waited.",
    why: "El tercer condicional es la única pieza del temario oficial de LanguageCert B2 que el B1 dejó sin tocar. El would vive SIEMPRE en la mitad sin if. Los mixtos (If I had studied, I would be a doctor now) son C1 y no entran como objetivo.",
    moduleId: "enb2m6",
  },
  {
    id: "enb2-trap-hardly",
    title: "Hardly had I… producido como si fuera B2",
    wrong: "Hardly had I sat down when the phone rang. (en un write, como lucimiento)",
    right: "No sooner had I sat down than the phone rang. · I had hardly sat down when the phone rang.",
    why: "El EGP coloca Hardly had I en C2. El B2 tiene tres inversiones y nada más: never, no sooner… than, not only… but also con presente. Tres se automatizan; nueve se olvidan.",
    moduleId: "enb2m11",
  },
  {
    id: "enb2-trap-cleft",
    title: "La hendidura que aún no toca",
    wrong: "What I need is a quieter street. · It was Ben who broke it. (como objetivo)",
    right: "The thing is, we need a quieter street. · The problem is that Ben broke it. · Ben broke it.",
    why: "What I need is… es C1. It was Ben who… es C2. El B2 focaliza con un sintagma nominal genérico al principio: The thing/problem/reason is…. Son más útiles y más frecuentes, y son exactamente lo que un hispanohablante necesita para no calcar «Lo que pasa es que…» con una estructura torcida.",
    moduleId: "enb2m1",
  },
];

/* ══ 7 · NATIVO — las 48 del sílabo, book / real / exam ════════════════════ */

export interface NativoEnB2 {
  id: string;
  moduleId: string;
  book: string;
  real: string;
  exam: string;
  meaning: string;
  when: string;
  register: "amigos" | "neutral" | "jerga" | "regional";
}

export const nativoEnB2: NativoEnB2[] = [
  { id: "nat-enb2m1-1", moduleId: "enb2m1", book: "In conclusion…", real: "So yeah, basically…", exam: "In conclusion… / All things considered…", meaning: "En conclusión", when: "El cierre de un texto no se dice en voz alta ni al revés. In conclusion en una caña suena a manual; So yeah en un ensayo, a WhatsApp.", register: "amigos" },
  { id: "nat-enb2m1-2", moduleId: "enb2m1", book: "However…", real: "But then again…", exam: "Nevertheless… / That said…", meaning: "Sin embargo", when: "Tres registros del mismo contraste. however lleva punto delante y coma detrás.", register: "amigos" },
  { id: "nat-enb2m1-3", moduleId: "enb2m1", book: "The reason is that…", real: "The thing is…", exam: "The reason for this is that…", meaning: "La razón es que / Lo que pasa es que", when: "El foco nominal de B2, en sus tres alturas. No es What I need is… (C1).", register: "amigos" },
  { id: "nat-enb2m1-4", moduleId: "enb2m1", book: "Furthermore…", real: "And another thing…", exam: "Moreover… / What is more…", meaning: "Es más / Además", when: "La adición formal frente a la de discusión de bar. Punto delante.", register: "amigos" },

  { id: "nat-enb2m2-1", moduleId: "enb2m2", book: "I would like to apply for…", real: "I'm after that job.", exam: "I am writing to apply for…", meaning: "Quiero solicitar…", when: "La fórmula de apertura de la Writing 1. I'm after se queda en la calle.", register: "amigos" },
  { id: "nat-enb2m2-2", moduleId: "enb2m2", book: "increase", real: "go up", exam: "a rise in / an increase in", meaning: "subir / una subida", when: "El verbo de la calle frente al nombre del informe. Condensar es el oficio del módulo.", register: "amigos" },
  { id: "nat-enb2m2-3", moduleId: "enb2m2", book: "a lot of money", real: "a fortune", exam: "a considerable sum", meaning: "mucho dinero", when: "La escala de la cantidad. a lot of no está mal: está corto para 150 palabras formales.", register: "amigos" },
  { id: "nat-enb2m2-4", moduleId: "enb2m2", book: "I want to know…", real: "Any chance you could tell me…", exam: "I would be grateful if you could confirm…", meaning: "Quiero saber / Le agradecería que confirmara", when: "Pedir información en tres alturas. I want en una covering letter tira el registro.", register: "amigos" },

  { id: "nat-enb2m3-1", moduleId: "enb2m3", book: "I am not satisfied.", real: "This is a joke.", exam: "I am far from satisfied with…", meaning: "No estoy satisfecho", when: "La queja en tres alturas. this is a joke se queda en el grupo de amigos; al banco, far from satisfied.", register: "jerga" },
  { id: "nat-enb2m3-2", moduleId: "enb2m3", book: "Could you help me?", real: "Any chance you could…?", exam: "I would appreciate it if you could…", meaning: "¿Me ayuda?", when: "La petición. El pasado de cortesía (I was wondering if) vive en el mismo traje.", register: "amigos" },
  { id: "nat-enb2m3-3", moduleId: "enb2m3", book: "That is not correct.", real: "That's not right, is it?", exam: "I am afraid that is not quite accurate.", meaning: "Eso no es correcto", when: "Contradecir sin agredir. La coletilla (is it?) suaviza; I am afraid, también, y es el exam.", register: "amigos" },
  { id: "nat-enb2m3-4", moduleId: "enb2m3", book: "Yes, I agree.", real: "Yeah, fair enough.", exam: "I take your point, although…", meaning: "Sí, de acuerdo / Te concedo el punto, aunque", when: "Conceder: la función nueva del B2. fair enough cierra una caña; I take your point abre la reserva.", register: "amigos" },

  { id: "nat-enb2m4-1", moduleId: "enb2m4", book: "People say that…", real: "Apparently…", exam: "It is widely believed that…", meaning: "Dicen que / Se cree que", when: "La escalera exacta de la impersonalidad. People say es la evitación; el examen la prohíbe a propósito.", register: "amigos" },
  { id: "nat-enb2m4-2", moduleId: "enb2m4", book: "They cancelled it.", real: "It got cancelled.", exam: "It was cancelled.", meaning: "Lo cancelaron", when: "La pasiva con get, que es la de la calle. En el escrito formal, be.", register: "amigos" },
  { id: "nat-enb2m4-3", moduleId: "enb2m4", book: "The report says…", real: "Word is…", exam: "According to the report…", meaning: "El informe dice / Según el informe", when: "Citar una fuente en tres alturas. Word is, rumor de barrio.", register: "jerga" },
  { id: "nat-enb2m4-4", moduleId: "enb2m4", book: "It is not true.", real: "That's rubbish.", exam: "These claims have been denied.", meaning: "No es verdad / Esas afirmaciones han sido desmentidas", when: "Desmentir. rubbish no se escribe a un periódico; denied, sí.", register: "jerga" },

  { id: "nat-enb2m5-1", moduleId: "enb2m5", book: "It is probable that…", real: "Odds are…", exam: "It is highly likely that…", meaning: "Es probable que", when: "La escala de probabilidad. probable suena a traducción; highly likely, a informe.", register: "amigos" },
  { id: "nat-enb2m5-2", moduleId: "enb2m5", book: "It must be true.", real: "It's got to be.", exam: "The evidence strongly suggests…", meaning: "Tiene que ser verdad", when: "Deducción en tres alturas. suggests, no proves: bajar el compromiso es el oficio.", register: "amigos" },
  { id: "nat-enb2m5-3", moduleId: "enb2m5", book: "It is supposed to be good.", real: "It's meant to be great.", exam: "It is said to be…", meaning: "Se supone que es bueno", when: "El rumor con supposed / meant, que el manual nunca separa de la obligación. Reputed to se reconoce; no se produce.", register: "amigos" },
  { id: "nat-enb2m5-4", moduleId: "enb2m5", book: "I don't know.", real: "Search me.", exam: "There is no conclusive evidence.", meaning: "No lo sé / No hay pruebas concluyentes", when: "Admitir ignorancia sin sonar a nada. Search me no se escribe.", register: "jerga" },

  { id: "nat-enb2m6-1", moduleId: "enb2m6", book: "I am sorry.", real: "My bad.", exam: "I sincerely apologise for…", meaning: "Lo siento / Le pido disculpas por", when: "La disculpa en tres alturas. My bad cierra un recado; sincerely apologise abre una carta.", register: "jerga" },
  { id: "nat-enb2m6-2", moduleId: "enb2m6", book: "I should have told you.", real: "I should've said something.", exam: "In hindsight, I ought to have…", meaning: "Debería habértelo dicho", when: "El arrepentimiento formal. ought to have es el traje; should've, la cocina.", register: "amigos" },
  { id: "nat-enb2m6-3", moduleId: "enb2m6", book: "I made a mistake.", real: "I messed up.", exam: "I take full responsibility.", meaning: "Me equivoqué / Asumo la responsabilidad", when: "Asumir la culpa. messed up no se escribe a Priya en un correo de trabajo.", register: "jerga" },
  { id: "nat-enb2m6-4", moduleId: "enb2m6", book: "That is not what I meant.", real: "No, hang on — what I meant was…", exam: "Allow me to rephrase that.", meaning: "No es lo que quería decir / Permítame reformularlo", when: "La reparación, que es la que puntúa: can correct most of his/her mistakes.", register: "amigos" },

  { id: "nat-enb2m7-1", moduleId: "enb2m7", book: "It was very good.", real: "It was banging.", exam: "The food was outstanding.", meaning: "Estaba muy bueno / La comida fue excepcional", when: "La valoración en tres alturas. very good es el circunloquio del módulo; banging, jerga joven británica.", register: "jerga" },
  { id: "nat-enb2m7-2", moduleId: "enb2m7", book: "postpone", real: "put it off", exam: "postpone / defer", meaning: "aplazar", when: "La evitación en directo: el alumno usa el latino y el nativo el phrasal. Las dos valen; el B2 tiene que poder elegir.", register: "amigos" },
  { id: "nat-enb2m7-3", moduleId: "enb2m7", book: "I stopped smoking.", real: "I packed it in.", exam: "I gave up smoking.", meaning: "Dejé de fumar", when: "stop doing (se acabó) frente a stop to do (paré a). packed it in es jerga; gave up, el exam.", register: "jerga" },
  { id: "nat-enb2m7-4", moduleId: "enb2m7", book: "very expensive", real: "a bit steep", exam: "on the pricey side / overpriced", meaning: "muy caro / tirando a caro / demasiado caro para lo que es", when: "El matiz que separa caro de no lo vale. very expensive es A2; on the pricey side es reseña.", register: "amigos" },

  { id: "nat-enb2m8-1", moduleId: "enb2m8", book: "On the other hand…", real: "Then again…", exam: "Whereas… / By contrast…", meaning: "Por otro lado / Mientras que", when: "El contraste en tres alturas. whereas contrapone dos cosas paralelas, no dos frases sueltas.", register: "amigos" },
  { id: "nat-enb2m8-2", moduleId: "enb2m8", book: "It is true that… but…", real: "Alright, fair enough, but…", exam: "Admittedly, … Nevertheless,…", meaning: "Es verdad que… pero / Cierto es… no obstante", when: "La concesión, la función nueva del nivel. Sin ella, el ensayo suena a manifiesto.", register: "amigos" },
  { id: "nat-enb2m8-3", moduleId: "enb2m8", book: "because of this", real: "so, yeah", exam: "as a result / consequently", meaning: "por eso / como consecuencia", when: "Causa-efecto formal. so yeah cierra una caña.", register: "amigos" },
  { id: "nat-enb2m8-4", moduleId: "enb2m8", book: "In my opinion…", real: "If you ask me…", exam: "It could be argued that…", meaning: "En mi opinión / Podría argumentarse que", when: "Quitarse del medio: la opinión sin yo. In my opinion, usado seis veces, es B1.", register: "amigos" },

  { id: "nat-enb2m9-1", moduleId: "enb2m9", book: "After I finished, I left.", real: "Soon as I was done, I was off.", exam: "Having finished, I left.", meaning: "Cuando terminé, me fui", when: "La no finita frente a la subordinada de siempre. Soon as, hablado y sin as. Faced with es C1: se reconoce, no se produce.", register: "jerga" },
  { id: "nat-enb2m9-2", moduleId: "enb2m9", book: "which was very good", real: "which was nice", exam: ", which proved invaluable", meaning: "lo cual estuvo muy bien / lo cual resultó invaluable", when: "La relativa de frase entera. La coma va. what means no existe.", register: "amigos" },
  { id: "nat-enb2m9-3", moduleId: "enb2m9", book: "the flat about which I told you", real: "the flat I told you about", exam: "the flat I told you about", meaning: "el piso del que te hablé", when: "La preposición al final no es informal: es lo normal. about which suena a examen antiguo.", register: "amigos" },
  { id: "nat-enb2m9-4", moduleId: "enb2m9", book: "It was cancelled.", real: "It got binned.", exam: "The service was suspended.", meaning: "Se canceló / Lo aparcaron / El servicio quedó suspendido", when: "El registro del transporte público británico. binned, jerga; suspended, el cartel.", register: "jerga" },

  { id: "nat-enb2m10-1", moduleId: "enb2m10", book: "she said quietly", real: "she went, all quiet", exam: "she said quietly / murmured Nora", meaning: "dijo en voz baja", when: "El verbo de decir con adverbio y con sujeto invertido. went, all quiet es relato oral.", register: "amigos" },
  { id: "nat-enb2m10-2", moduleId: "enb2m10", book: "It was very moving.", real: "It got me, that.", exam: "I found it profoundly moving.", meaning: "Fue muy conmovedor", when: "La emoción en tres alturas. got me, that: objeto al frente, muy hablado.", register: "amigos" },
  { id: "nat-enb2m10-3", moduleId: "enb2m10", book: "I had never seen it before.", real: "Never seen it before, me.", exam: "Never before had I seen…", meaning: "No lo había visto nunca", when: "La inversión con never, que sí es B2. Hardly had I es C2 y no se produce.", register: "amigos" },
  { id: "nat-enb2m10-4", moduleId: "enb2m10", book: "he told me not to go", real: "he was like, don't go", exam: "he advised me not to go", meaning: "me dijo que no fuera", when: "La orden reportada en negativo: not to. was like, relato oral joven.", register: "jerga" },

  { id: "nat-enb2m11-1", moduleId: "enb2m11", book: "I do not agree.", real: "Yeah, I'm not sure about that.", exam: "I see it rather differently.", meaning: "No estoy de acuerdo / Yo lo veo de otra manera", when: "Discrepar sin romper. I do not agree a secas suena bordo; rather differently, Part 3.", register: "amigos" },
  { id: "nat-enb2m11-2", moduleId: "enb2m11", book: "We should decide.", real: "Let's just call it.", exam: "Shall we agree on…?", meaning: "Deberíamos decidir / ¿Quedamos en…?", when: "Cerrar el acuerdo, que es lo que puntúa el Part 3. El B1 se contentaba con intentarlo.", register: "amigos" },
  { id: "nat-enb2m11-3", moduleId: "enb2m11", book: "Not only is it cheap, it is fast.", real: "It's cheap AND it's quick.", exam: "Not only is it cheaper, but it is also faster.", meaning: "No solo es barato, es rápido", when: "La inversión enfática, en su sitio. Not only did I es C1; el B2 es be o presente.", register: "amigos" },
  { id: "nat-enb2m11-4", moduleId: "enb2m11", book: "That is not fair.", real: "That's out of order.", exam: "That strikes me as unfair.", meaning: "Eso no es justo / Eso me parece injusto", when: "La queja moral en tres alturas. out of order es británico de bronca contenida.", register: "jerga" },

  { id: "nat-enb2m12-1", moduleId: "enb2m12", book: "I am nervous.", real: "I'm bricking it.", exam: "I am rather apprehensive.", meaning: "Estoy nervioso / Estoy bastante inquieto", when: "El nervio, en tres alturas. bricking it es jerga británica fuerte; en el oral, rather apprehensive o nada.", register: "jerga" },
  { id: "nat-enb2m12-2", moduleId: "enb2m12", book: "Could you repeat that?", real: "Sorry, say again?", exam: "I beg your pardon, could you repeat the question?", meaning: "¿Puede repetir?", when: "La reparación en el oral, que puntúa. say again, con un amigo; I beg your pardon, con la examinadora.", register: "amigos" },
  { id: "nat-enb2m12-3", moduleId: "enb2m12", book: "I think that…", real: "Reckon…", exam: "From my perspective… / It seems to me…", meaning: "Creo que / Desde mi punto de vista", when: "La opinión en el Speaking Part 1. Reckon, norte de Inglaterra; I think that seis veces es B1.", register: "amigos" },
  { id: "nat-enb2m12-4", moduleId: "enb2m12", book: "In conclusion, I think…", real: "So yeah, that's me.", exam: "To sum up, the evidence points to…", meaning: "En conclusión… / En suma, las pruebas apuntan a…", when: "El cierre del monólogo de dos minutos. So yeah, that's me se queda fuera de la sala. Los 30 s de preparación no crecen: se entrena o se sufre.", register: "amigos" },
];
