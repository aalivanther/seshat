// La libreta del NIVEL B2: siete pestañas — Konjunktiv I, Nominalisierung,
// Passiversatz, conectores de dos piezas, rección de nombres y adjetivos,
// trampas del hispanohablante y Nativo (PLAN-DE-B2 §2 y §4).
//
// QUÉ NO ESTÁ AQUÍ, Y ES A PROPÓSITO: el Konjunktiv II de cortesía, la pasiva
// de werden, la declinación del adjetivo, weil/obwohl/damit y las preposiciones
// de genitivo de B1 (wegen, während, trotz). Eso vive en referenceB1.ts. Una
// libreta que se repite deja de ser una libreta: aquí solo entra lo que el B2
// añade o cierra.
//
// Regla de la casa: explicaciones en español, alemán limpio en los ejemplos
// (sin corchetes ni marcas) para que el TTS los pueda leer tal cual.

// ─────────────────────────────────────────────────────────────────────────────
// 1 · KONJUNKTIV I — contar lo que dicen otros sin firmarlo
// ─────────────────────────────────────────────────────────────────────────────

export interface K1Form {
  inf: string;
  /** la forma que de verdad se escribe: 3ª del singular, salvo sei- entero */
  k1: string;
  es: string;
  rows: [string, string][];
  note: string;
}

/** El paradigma útil es corto. Enseñar las seis personas de kommen es enseñar
 *  formas que coinciden con el indicativo y que nadie escribe. */
export const k1Forms: K1Form[] = [
  {
    inf: "sein", k1: "sei", es: "sea / es (en indirecta)",
    rows: [["ich", "sei"], ["du", "seiest"], ["er/sie/es", "sei"], ["wir", "seien"], ["ihr", "seiet"], ["sie/Sie", "seien"]],
    note: "La única que se conjuga entera, porque ninguna forma coincide con el indicativo. Er sagte, er sei krank es la frase que abre el nivel.",
  },
  {
    inf: "haben", k1: "habe", es: "haya / tiene (en indirecta)",
    rows: [["ich", "habe"], ["du", "habest"], ["er/sie/es", "habe"], ["wir", "haben"], ["ihr", "habet"], ["sie/Sie", "haben"]],
    note: "En 3ª del singular se ve (er habe). En plural coincide con el indicativo, y ahí salta la regla de sustitución: sie haben → sie hätten.",
  },
  {
    inf: "kommen", k1: "komme", es: "venga / viene (en indirecta)",
    rows: [["ich", "komme"], ["du", "kommest"], ["er/sie/es", "komme"], ["wir", "kommen"], ["ihr", "kommet"], ["sie/Sie", "kommen"]],
    note: "Solo la 3ª del singular se distingue. sie kommen se sustituye por sie kämen o sie würden kommen.",
  },
  {
    inf: "können", k1: "könne", es: "pueda / puede (en indirecta)",
    rows: [["ich", "könne"], ["du", "könnest"], ["er/sie/es", "könne"], ["wir", "können"], ["ihr", "könnet"], ["sie/Sie", "können"]],
    note: "Die Ministerin sagte, sie könne nichts dazu sagen. El Umlaut se queda: distingue pueda de podía.",
  },
  {
    inf: "müssen", k1: "müsse", es: "tenga que (en indirecta)",
    rows: [["ich", "müsse"], ["du", "müssest"], ["er/sie/es", "müsse"], ["wir", "müssen"], ["ihr", "müsset"], ["sie/Sie", "müssen"]],
    note: "Er sagte, man müsse die Frist einhalten. Otra vez: la 3ª se ve, el plural se sustituye.",
  },
  {
    inf: "wollen", k1: "wolle", es: "quiera (en indirecta; no confundir con will de distanciamiento)",
    rows: [["ich", "wolle"], ["du", "wollest"], ["er/sie/es", "wolle"], ["wir", "wollen"], ["ihr", "wollet"], ["sie/Sie", "wollen"]],
    note: "Sie sagte, sie wolle nichts unterschreiben es K I de wollen. Sie will nichts gewusst haben es OTRA cosa: distanciamiento.",
  },
];

export const k1SubstitutionRule = {
  title: "La regla de sustitución: cuando K I = indicativo, se usa K II",
  body:
    "El español no tiene este problema porque el subjuntivo no se parece al indicativo. En alemán, la mayoría de las formas de Konjunktiv I coinciden con el presente, y entonces la indirecta se cae: el lector no puede saber si citas o afirmas. La regla que hay que automatizar: si no se distingue, se cambia a Konjunktiv II (o a würde + Infinitiv).",
  rows: [
    ["sie haben", "sie hätten", "K I = indicativo → K II"],
    ["sie kommen", "sie kämen / sie würden kommen", "igual"],
    ["sie müssen", "sie müssten", "igual"],
    ["er sei / er habe / er komme / er könne", "se queda", "aquí SÍ se ve: no se toca"],
  ] as [string, string, string][],
  trap: {
    wrong: "Die Sprecher sagten, sie haben nichts gewusst.",
    right: "Die Sprecher sagten, sie hätten nichts gewusst.",
    why: "haben en plural no marca la indirecta. hätten sí.",
  },
};

export const k1PastRule = {
  title: "El pasado de la indirecta es uno solo",
  body:
    "Da igual que el original fuera Perfekt, Präteritum o Plusquamperfekt: en Konjunktiv I el pasado es sei + Partizip (verbos con sein) o habe + Partizip (los demás). Es de lo poco del B2 que es más fácil que el español, y hay que venderlo como tal.",
  rows: [
    ["Er ist gekommen. / Er kam. / Er war gekommen.", "Er sagte, er sei gekommen."],
    ["Sie hat gearbeitet. / Sie arbeitete.", "Sie sagte, sie habe gearbeitet."],
    ["Wir sind gefahren.", "Sie sagten, sie seien gefahren. (seien: K I de sein, plural)"],
    ["Sie haben die Zahlen gefälscht.", "Sie sagten, sie hätten die Zahlen gefälscht. (sustitución: haben = indicativo)"],
  ] as [string, string][],
};

export interface K1Use {
  id: "zitieren" | "distanz" | "sollenwollen";
  label: string;
  when: string;
  examples: { de: string; es: string }[];
}

export const k1Uses: K1Use[] = [
  {
    id: "zitieren",
    label: "Citar · lo que dijo otro",
    when: "Prensa, actas, síntesis, cualquier párrafo que resuma una postura ajena. El B2 casi nunca afirma: atribuye. Sin esto no hay Lesen Teil 1 ni Teil 4, ni el párrafo de resumen del Schreiben.",
    examples: [
      { de: "Der Sprecher sagte, die Reform sei notwendig.", es: "El portavoz dijo que la reforma es necesaria." },
      { de: "Die Ministerin betonte, sie habe nichts gewusst.", es: "La ministra subrayó que no sabía nada." },
      { de: "Mehrere Medien berichten, die Firma habe die Zahlen gefälscht.", es: "Varios medios informan de que la empresa falsificó las cifras." },
      { de: "Laut der Redaktion lasse sich das so nicht belegen.", es: "Según la redacción, eso no se puede demostrar así." },
    ],
  },
  {
    id: "distanz",
    label: "Distanciarse · sin negar",
    when: "Cuando no firmas lo que transmites y tampoco lo desmientes. El español necesita una oración (dicen que, según parece). El alemán lo hace con el modo, y se nota.",
    examples: [
      { de: "Er behauptet, er sei nicht informiert worden.", es: "Sostiene que no se le informó. (behaupten ya marca distancia)" },
      { de: "Sie räumt ein, es habe Fehler gegeben.", es: "Reconoce que hubo errores." },
      { de: "Die Sprecherin bestreitet, davon gewusst zu haben.", es: "La portavoz niega haberlo sabido. (infinitivo: otra forma de reportar)" },
      { de: "Einem Bericht zufolge sind die Zahlen ungenau.", es: "Según un informe, las cifras son inexactas. (zufolge pospuesto; el bloque ocupa la posición 1)" },
    ],
  },
  {
    id: "sollenwollen",
    label: "sollen y wollen de distanciamiento",
    when: "Un modal hace el trabajo de una oración entera. sollen = fuente AJENA (dicen que). wollen = la PROPIA fuente lo sostiene (ella afirma que). No son obligación ni deseo.",
    examples: [
      { de: "Er soll reich sein.", es: "Dicen que es rico. (fuente ajena; tú no firmas)" },
      { de: "Sie soll die Unterlagen gefälscht haben.", es: "Se dice que falsificó la documentación." },
      { de: "Sie will nichts davon gewusst haben.", es: "Ella sostiene que no sabía nada. (es ELLA quien lo afirma)" },
      { de: "Er will zur Tatzeit woanders gewesen sein.", es: "Pretende que a la hora de los hechos estaba en otra parte." },
    ],
  },
];

export const k1ReportingVerbs: [string, string, string][] = [
  ["sagen", "decir, neutro", "Er sagte, er sei krank."],
  ["betonen", "subrayar", "Sie betonte, die Frist müsse eingehalten werden."],
  ["behaupten", "afirmar (con distancia: no lo firmas)", "Er behauptet, nichts gewusst zu haben."],
  ["bestreiten", "negar, impugnar", "Die Firma bestreitet, die Zahlen gefälscht zu haben."],
  ["einräumen", "reconocer, conceder", "Sie räumte ein, es habe Verzögerungen gegeben."],
  ["melden / berichten", "informar", "Die Polizei meldet, der Fahrer sei geflüchtet."],
  ["laut + Dativ", "según (delante)", "Laut der Studie sinkt die Beteiligung."],
  ["zufolge (pospuesto)", "según (detrás del nombre)", "Einem Bericht zufolge sind die Zahlen ungenau."],
  ["nach Angaben von", "según datos de", "Nach Angaben von Greenpeace sei der Ausstoß gestiegen."],
];

export const K1_TIP =
  "Si solo miras una cosa de esta pestaña, que sea la regla de sustitución. Er sei krank se ve; sie haben nichts gewusst, no. El B2 se juega en sie hätten. Y el pasado es uno: sei gekommen, habe gearbeitet, sirva el original de Perfekt, Präteritum o Plusquamperfekt.";

// ─────────────────────────────────────────────────────────────────────────────
// 2 · NOMINALISIERUNG — del estilo verbal al nominal, y de vuelta
// ─────────────────────────────────────────────────────────────────────────────

export const NOMINAL_TIP =
  "Un B2 escrito no se distingue de un B1 escrito por tener menos errores: se distingue por empaquetar en un sintagma lo que el B1 pone en una oración. El español también nominaliza (a causa del mal tiempo) y eso engaña: el alumno cree que ya sabe. Lo que no tiene es la productividad del alemán —cualquier verbo da un -ung, cualquier adjetivo un -heit/-keit— ni la costumbre de usarlo. Y la regla que evita el desastre: saber cuándo NO nominalizar. Un texto entero en estilo nominal es Papierdeutsch, y la rúbrica lo penaliza igual que la pobreza.";

export interface NominalSuffix {
  suffix: string;
  from: string;
  es: string;
  examples: [string, string][];
}

export const nominalSuffixes: NominalSuffix[] = [
  {
    suffix: "-ung", from: "verbo", es: "la acción o el resultado",
    examples: [["untersuchen → die Untersuchung", "investigar → la investigación"], ["entscheiden → die Entscheidung", "decidir → la decisión"], ["anmelden → die Anmeldung", "empadronarse → el empadronamiento"]],
  },
  {
    suffix: "-heit / -keit", from: "adjetivo", es: "la cualidad",
    examples: [["frei → die Freiheit", "libre → la libertad"], ["möglich → die Möglichkeit", "posible → la posibilidad"], ["zuständig → die Zuständigkeit", "competente → la competencia"]],
  },
  {
    suffix: "-nis", from: "verbo o adjetivo", es: "el resultado o el estado",
    examples: [["erkennen → die Erkenntnis", "reconocer → el hallazgo"], ["geheim → das Geheimnis", "secreto → el secreto"]],
  },
  {
    suffix: "-schaft", from: "nombre o adjetivo", es: "el conjunto o la condición",
    examples: [["Freund → die Freundschaft", "amigo → la amistad"], ["wissen → die Wissenschaft", "saber → la ciencia"]],
  },
  {
    suffix: "das + infinitivo", from: "verbo", es: "el hecho de hacer",
    examples: [["lesen → das Lesen", "leer → el leer / la lectura"], ["speichern → das Speichern", "guardar → el almacenamiento"]],
  },
];

/** Seis pares de alto rendimiento: subordinada → sintagma. Se aprenden como tabla. */
export const nominalPairs: { sub: string; prep: string; exampleSub: string; exampleNom: string; es: string }[] = [
  { sub: "weil", prep: "wegen / aufgrund + Genitiv", exampleSub: "Weil das Wetter schlecht war, wurde das Fest abgesagt.", exampleNom: "Aufgrund des schlechten Wetters wurde das Fest abgesagt.", es: "porque → a causa de" },
  { sub: "wenn / falls", prep: "bei / im Falle + Genitiv", exampleSub: "Wenn die Vorschriften verletzt werden, ist die IT zu informieren.", exampleNom: "Im Falle einer Verletzung der Vorschriften ist die IT zu informieren.", es: "si → en caso de" },
  { sub: "obwohl", prep: "trotz + Genitiv", exampleSub: "Obwohl wir mehrfach hingewiesen haben, ändert sich nichts.", exampleNom: "Trotz mehrfacher Hinweise ändert sich nichts.", es: "aunque → a pesar de" },
  { sub: "damit / um … zu", prep: "zur / zwecks + Genitiv", exampleSub: "Wir schreiben, damit die Zuständigkeit geklärt wird.", exampleNom: "Zur Klärung der Zuständigkeit schreiben wir.", es: "para que → para / a fin de" },
  { sub: "nachdem", prep: "nach + Dativ", exampleSub: "Nachdem die Prüfung bestanden wurde, kann man sich immatrikulieren.", exampleNom: "Nach bestandener Prüfung kann man sich immatrikulieren.", es: "después de que → después de" },
  { sub: "indem", prep: "durch + Akkusativ", exampleSub: "Indem man die Daten löscht, reduziert man das Risiko.", exampleNom: "Durch das Löschen der Daten reduziert man das Risiko.", es: "al + infinitivo → mediante / a través de" },
];

export interface FvgItem {
  de: string;
  es: string;
  example: string;
  simple: string;
}

/** No son sinónimos elegantes del verbo simple: son marca de registro. */
export const funktionsverbgefuege: FvgItem[] = [
  { de: "zur Verfügung stellen", es: "poner a disposición", example: "Die IT hat uns die Daten zur Verfügung gestellt.", simple: "geben / bereitstellen" },
  { de: "in Frage stellen", es: "cuestionar, poner en duda", example: "Die Speicherung wird in Frage gestellt.", simple: "bezweifeln" },
  { de: "Kritik üben (an + D)", es: "criticar", example: "Die Redaktion übt Kritik an dem Entwurf.", simple: "kritisieren" },
  { de: "in Betracht ziehen", es: "tomar en consideración", example: "Wir ziehen eine Verlängerung in Betracht.", simple: "überlegen" },
  { de: "zum Ausdruck bringen", es: "expresar", example: "Damit bringen wir unser Bedauern zum Ausdruck.", simple: "ausdrücken / sagen" },
  { de: "Rücksicht nehmen (auf + A)", es: "tener en cuenta, ser considerado con", example: "Bitte nehmen Sie Rücksicht auf die Nachbarn.", simple: "berücksichtigen" },
  { de: "zur Sprache bringen", es: "sacar el tema", example: "Wir haben das Thema in der Sitzung zur Sprache gebracht.", simple: "ansprechen" },
  { de: "eine Rolle spielen", es: "desempeñar un papel", example: "Das spielt eine entscheidende Rolle.", simple: "wichtig sein" },
  { de: "Stellung nehmen (zu + D)", es: "pronunciarse sobre", example: "Die Behörde nahm Stellung zu den Vorwürfen.", simple: "sich äußern" },
  { de: "in Kraft treten", es: "entrar en vigor", example: "Der Bescheid trat am ersten Juni in Kraft.", simple: "gelten beginnen" },
];

export const nominalRule = {
  title: "Cuándo SÍ y cuándo NO",
  body:
    "SÍ en el escrito formal: el correo a un superior, el informe, el Widerspruch, el párrafo de síntesis. NO en el mail a un amigo, en el oral espontáneo, ni en tres frases seguidas. El B2 alterna. Enseñar solo la subida produce alumnos que escriben como una circular, y Kohärenz lo nota.",
  rows: [
    ["B1 verbal", "Weil das Wetter schlecht war, wurde das Fest abgesagt."],
    ["B2 nominal", "Aufgrund des schlechten Wetters wurde das Fest abgesagt."],
    ["B2+ (no se pide)", "Die wetterbedingte Absage des Festes…"],
    ["demasiado", "Unter Berücksichtigung der Bestimmungen des… (Amtsdeutsch ilegible)"],
  ] as [string, string][],
  trap: {
    wrong: "die Entscheidung zu gehen",
    right: "die Entscheidung zu gehen vale; der Entschluss zum Weggang también. Lo que no vale es mezclar artículo, mayúscula y zu al azar: das Speichern (infinitivo sustantivado, mayúscula, neutro), no «das speichern».",
    why: "El infinitivo sustantivado español (el leer) y el alemán no se calcan. Artículo + mayúscula, y si lleva complemento suele preferirse la -ung: die Speicherung der Daten, no «das Speichern von den Daten» en un informe.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 3 · PASSIVERSATZ — las cinco salidas del «se», cerradas
// ─────────────────────────────────────────────────────────────────────────────

export const PASSIVERSATZ_TIP =
  "El B1 enseñó drei salidas del «se» (man, Vorgangspassiv, sich). El B2 cierra la lista y obliga a elegir. Elegir mal no da error: da registro equivocado. Das lässt sich machen y Das kann man machen significan lo mismo y no puntúan igual.";

export const zustandVsVorgang = {
  title: "Zustandspassiv frente a Vorgangspassiv",
  body:
    "wird geöffnet = el proceso (se está abriendo / se abre). ist geöffnet = el resultado (está abierta). El español «está abierta» empuja a poner ist siempre, y por eso el Zustandspassiv se produce de más; el Vorgangspassiv, de menos.",
  rows: [
    ["proceso", "Die Tür wird um acht geöffnet.", "La puerta se abre a las ocho."],
    ["resultado", "Die Tür ist geöffnet.", "La puerta está abierta."],
    ["proceso con modal", "Das muss bis Freitag erledigt werden.", "Eso tiene que estar hecho para el viernes."],
    ["resultado con modal", "Das muss bis Freitag erledigt sein.", "Eso tiene que estar listo para el viernes. (estado, no acción)"],
  ] as [string, string, string][],
};

export const passivImpersonal = {
  title: "La pasiva sin sujeto, y la de dativo",
  body:
    "Dos estructuras que no se producen jamás por transferencia, porque el español exige un sujeto y el alemán no tiene ninguno.",
  rows: [
    ["con es en el Vorfeld", "Es wird getanzt.", "Se baila. / Hay baile."],
    ["el es desaparece", "Sonntags wird hier nicht gearbeitet.", "Los domingos aquí no se trabaja."],
    ["norma", "Hier wird nicht geraucht.", "Aquí no se fuma."],
    ["dativo, sin sujeto", "Mir wurde geholfen.", "Me ayudaron. (me queda en dativo)"],
    ["dativo, despido", "Mir wurde zum 30. Juni gekündigt.", "Me despidieron a 30 de junio."],
    ["dativo, permiso", "Ihm wurde widersprochen.", "Se le contradijo. / Le llevaron la contraria."],
  ] as [string, string, string][],
};

export interface PassiversatzRow {
  form: string;
  formula: string;
  de: string;
  es: string;
  when: string;
}

export const passiversatzTable: PassiversatzRow[] = [
  {
    form: "man",
    formula: "man + 3ª singular",
    de: "So macht man das.",
    es: "Así se hace.",
    when: "Conversación y también reglamentos. No es informal: es la salida ligera. Si TODO el escrito formal va con man, no enseñas la pasiva.",
  },
  {
    form: "Vorgangspassiv",
    formula: "werden + Partizip II",
    de: "So wird das gehandhabt.",
    es: "Así se procede.",
    when: "Prensa, normas, informes. El registro escrito del examen.",
  },
  {
    form: "pasiva impersonal",
    formula: "(es) wird + Partizip, sin agente",
    de: "Es wird hier unter hohem Zeitdruck gearbeitet.",
    es: "Aquí se trabaja con mucha presión de tiempo.",
    when: "Describir un ambiente o un proceso sin culpable. El es se cae si otra cosa ocupa el Vorfeld.",
  },
  {
    form: "sich lassen",
    formula: "sich lassen + Infinitiv",
    de: "Das lässt sich machen.",
    es: "Eso se puede hacer.",
    when: "Registro formal escrito. Es la Ersatzform que más puntúa por palabra.",
  },
  {
    form: "sein + zu + Infinitiv",
    formula: "sein + zu + Infinitiv",
    de: "Die Unterlagen sind bis Montag einzureichen.",
    es: "La documentación hay que entregarla para el lunes.",
    when: "Obligación impersonal de registro alto: reglamentos, correos a un superior, Studienordnung.",
  },
  {
    form: "-bar / -lich",
    formula: "adjetivo de posibilidad",
    de: "Die Frist ist einhaltbar. Das ist nachvollziehbar.",
    es: "El plazo se puede cumplir. Eso se puede entender.",
    when: "Compresión máxima. Muy de informe. No se esparce: una o dos por texto.",
  },
];

export const passivVsSeB2 = {
  title: "El «se» español tiene cinco salidas, y hay que elegir",
  intro:
    "El B1 dejó tres. El B2 añade sich lassen, sein + zu y -bar, y obliga a no repetir siempre man. La clínica del módulo 2 es exactamente esta tabla.",
  rows: [
    ["Se habla alemán.", "Man spricht Deutsch.", "conversación, general"],
    ["Aquí se trabaja mucho.", "Es wird hier viel gearbeitet.", "ambiente, prensa, informe"],
    ["La puerta se abre a las ocho.", "Die Tür wird um acht geöffnet.", "proceso"],
    ["La puerta está abierta.", "Die Tür ist geöffnet.", "resultado"],
    ["Eso se puede hacer.", "Das lässt sich machen. / Das ist zu machen. / Das ist machbar.", "formal escrito"],
  ] as [string, string, string][],
};

// ─────────────────────────────────────────────────────────────────────────────
// 4 · CONECTORES DE DOS PIEZAS — y los cultos que los acompañan
// ─────────────────────────────────────────────────────────────────────────────

export type B2KonnEffect = "final" | "inversion" | "nada" | "jedesto" | "wedernoch" | "parallel";

export const B2_KONN_EFFECT_LABEL: Record<B2KonnEffect, string> = {
  final: "verbo AL FINAL (subordinante)",
  inversion: "INVERSIÓN: el bloque ocupa la posición 1",
  nada: "no toca nada (coordinante)",
  jedesto: "mitad de je: verbo AL FINAL · mitad de desto: INVERSIÓN",
  wedernoch: "tras noch, INVERSIÓN (wie nach einem Konjunktionaladverb)",
  parallel: "las dos piezas del mismo tipo sintáctico (dos adjetivos, dos verbos, dos sintagmas)",
};

export interface ZweiTeileKonn {
  de: string;
  es: string;
  effect: B2KonnEffect;
  example: string;
  exampleEs: string;
  trap?: string;
}

export const zweiTeileKonnektoren: ZweiTeileKonn[] = [
  {
    de: "nicht nur … sondern auch",
    es: "no solo … sino también",
    effect: "parallel",
    example: "Die Regelung ist nicht nur ungerecht, sondern auch unpraktikabel.",
    exampleEs: "La norma no solo es injusta, sino también impracticable.",
    trap: "mezclar tipos: nicht nur ungerecht, sondern auch sie funktioniert nicht",
  },
  {
    de: "weder … noch",
    es: "ni … ni",
    effect: "wedernoch",
    example: "Weder die Umfrage noch die Studie überzeugt. · Weder hat er angerufen, noch hat er geschrieben.",
    exampleEs: "Ni la encuesta ni el estudio convence. Ni llamó ni escribió. (tras noch, el verbo se adelanta)",
    trap: "Weder er hat angerufen, noch er hat geschrieben.",
  },
  {
    de: "sowohl … als auch",
    es: "tanto … como",
    effect: "parallel",
    example: "Sowohl die Kosten als auch die Fristen sprechen dagegen.",
    exampleEs: "Tanto los costes como los plazos hablan en contra.",
  },
  {
    de: "zwar … aber",
    es: "es cierto que … pero",
    effect: "nada",
    example: "Zwar spart man Zeit, aber die Belastung steigt.",
    exampleEs: "Cierto que se ahorra tiempo, pero la carga sube. (zwar NO manda el verbo al final)",
    trap: "Zwar man spart Zeit… / Zwar dass man Zeit spart…",
  },
  {
    de: "entweder … oder",
    es: "o … o",
    effect: "parallel",
    example: "Entweder wir verlängern die Frist, oder wir streichen den Punkt.",
    exampleEs: "O alargamos el plazo o tachamos el punto.",
  },
  {
    de: "teils … teils",
    es: "en parte … en parte",
    effect: "nada",
    example: "Die Reaktionen waren teils zustimmend, teils ablehnend.",
    exampleEs: "Las reacciones fueron en parte favorables, en parte contrarias.",
  },
  {
    de: "je … desto / umso",
    es: "cuanto más … más",
    effect: "jedesto",
    example: "Je mehr Menschen sich beteiligen, desto belastbarer ist das Ergebnis.",
    exampleEs: "Cuanta más gente participa, más sostenible es el resultado.",
    trap: "Je mehr ich lerne, desto ich verstehe besser. (en desto, verbo ANTES del sujeto)",
  },
  {
    de: "einerseits … andererseits",
    es: "por un lado … por otro",
    effect: "inversion",
    example: "Einerseits braucht die Stadt Wohnraum, andererseits darf der Zusammenhalt nicht verloren gehen.",
    exampleEs: "Por un lado la ciudad necesita vivienda, por otro no puede perderse la cohesión.",
    trap: "andererseits es darf nicht… (sin invertir)",
  },
];

export interface KultKonn {
  de: string;
  es: string;
  effect: "final" | "inversion";
  example: string;
  exampleEs: string;
  note: string;
}

export const kultKonnektoren: KultKonn[] = [
  { de: "zumal", es: "máxime cuando, sobre todo porque", effect: "final", example: "Die Umfrage ist wenig aussagekräftig, zumal nur zwölf Personen teilgenommen haben.", exampleEs: "La encuesta dice poco, máxime cuando solo han participado doce.", note: "Causa extra, más fuerte que weil." },
  { de: "sofern", es: "siempre que, en la medida en que", effect: "final", example: "Sofern die Unterlagen vollständig sind, wird der Antrag bearbeitet.", exampleEs: "Siempre que la documentación esté completa, se tramita la solicitud.", note: "Condición formal; el si del reglamento." },
  { de: "insofern", es: "en ese sentido, en la medida en que", effect: "final", example: "Insofern die Zahlen stimmen, ist der Trend klar.", exampleEs: "En la medida en que las cifras cuadren, la tendencia es clara.", note: "También adverbio: Insofern stimme ich zu (entonces, inversión)." },
  { de: "wobei", es: "si bien, con la salvedad de que", effect: "final", example: "Dem kann ich mich nicht anschließen, wobei ich den Einwand verstehe.", exampleEs: "No puedo sumarme a eso, si bien entiendo la objeción.", note: "No es «con lo cual» siempre: en B2 suele conceder." },
  { de: "wohingegen", es: "mientras que (contraste paralelo)", effect: "final", example: "Wohingegen die Autorin eine Abgabe vorschlägt, hält der Autor das für unpraktikabel.", exampleEs: "Mientras que la autora propone una tasa, el autor lo considera impracticable.", note: "Contrasta dos sujetos, no dos tiempos." },
  { de: "indem", es: "al + infinitivo, mediante", effect: "final", example: "Indem man die Daten löscht, reduziert man das Risiko.", exampleEs: "Al borrar los datos se reduce el riesgo.", note: "La conversión a durch es el puente con la nominalización." },
  { de: "sodass / so dass", es: "de modo que", effect: "final", example: "Die Frist wurde verkürzt, sodass niemand mehr widersprechen konnte.", exampleEs: "Se acortó el plazo, de modo que ya nadie pudo recurrir.", note: "Consecuencia; las dos grafías valen." },
  { de: "ohne dass", es: "sin que", effect: "final", example: "Der Beitrag wurde erhöht, ohne dass jemand informiert wurde.", exampleEs: "Se subió la cuota sin que se informara a nadie.", note: "Si el sujeto es el mismo, ohne … zu." },
  { de: "(an)statt dass", es: "en vez de que", effect: "final", example: "Anstatt dass man die Anwohner fragt, entscheidet man über ihre Köpfe hinweg.", exampleEs: "En vez de preguntar a los vecinos, se decide por encima de ellos.", note: "Si el sujeto es el mismo, (an)statt … zu." },
  { de: "allerdings", es: "sin embargo, eso sí", effect: "inversion", example: "Das mag zutreffen. Allerdings ändert es nichts an der Frist.", exampleEs: "Puede que sea cierto. Eso sí, no cambia el plazo.", note: "ADVERBIO: posición 1 → inversión. No es obwohl." },
  { de: "jedoch", es: "no obstante", effect: "inversion", example: "Die Idee ist gut, jedoch fehlen die Mittel.", exampleEs: "La idea es buena; no obstante faltan los medios.", note: "También puede ir detrás del verbo: Die Idee ist jedoch gut." },
  { de: "dennoch", es: "aun así", effect: "inversion", example: "Das mag zutreffen; dennoch überwiegen die Nachteile.", exampleEs: "Puede que sea cierto; aun así pesan más las desventajas.", note: "La pareja de la concesión: Das mag zutreffen; dennoch…" },
];

export const konnektorenB2Rule = {
  title: "Adverbio o conjunción, otra vez, pero con los cultos",
  body:
    "El B1 machacó deshalb ↔ weil. Aquí toca la segunda tanda, la que nadie avisa: allerdings y jedoch EXIGEN su posición (invierten o se cuelan detrás del verbo); zwar no manda al verbo al final, pero wobei sí; je… desto tiene el verbo al final SOLO en la primera mitad. El Lesen Teil 2 del Goethe —reconstruir un texto al que le faltan frases— se resuelve con ellos.",
};

export const argumentSkeleton = {
  title: "La arquitectura del texto argumentativo",
  steps: [
    "Tesis, en una frase, sin rodeos.",
    "Argumento 1 + prueba (dato, ejemplo, fuente).",
    "Argumento 2 + prueba.",
    "Objeción concedida: Zwar… aber… / Das mag zutreffen; dennoch…",
    "Refutación: por qué, aun así, tu lado aguanta.",
    "Cierre que AVANZA: no copies la tesis. Una consecuencia, una propuesta, un límite.",
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 5 · RECCIÓN DE NOMBRES Y ADJETIVOS — la otra mitad del sistema
// ─────────────────────────────────────────────────────────────────────────────

export const REKTION_B2_TIP =
  "El B1 hizo los verbos (warten auf, sich freuen über). En cuanto se escribe en estilo nominal aparece la otra mitad: die Frage nach, stolz auf, abhängig von. No hay regla y no la va a haber: es léxico con caso, y se aprende por volumen. El da-Kompositum anticipador (Ich gehe davon aus, dass…) es lo que sostiene la frase larga: sin él, Ich freue mich, dass… es lo único que se sabe construir.";

export interface RektionNomen {
  nomen: string;
  prep: string;
  kasus: "Akkusativ" | "Dativ" | "Genitiv";
  es: string;
  example: string;
  exampleEs: string;
  trap?: string;
}

export const rektionNomen: RektionNomen[] = [
  { nomen: "die Frage", prep: "nach", kasus: "Dativ", es: "la pregunta por / acerca de", example: "Die Frage nach den Kosten bleibt offen.", exampleEs: "La pregunta por los costes sigue abierta.", trap: "die Frage um / über" },
  { nomen: "der Grund", prep: "für", kasus: "Akkusativ", es: "el motivo de", example: "Der Grund für diese Entwicklung liegt in der Mobilität.", exampleEs: "El motivo de esta evolución está en la movilidad.", trap: "der Grund von" },
  { nomen: "das Interesse", prep: "an", kasus: "Dativ", es: "el interés por", example: "Das Interesse an erneuerbaren Energien steigt.", exampleEs: "El interés por las energías renovables sube.", trap: "das Interesse für (existe, pero es más 'en beneficio de')" },
  { nomen: "die Auswirkung", prep: "auf", kasus: "Akkusativ", es: "el efecto sobre", example: "Die Auswirkung auf die Luftqualität ist messbar.", exampleEs: "El efecto sobre la calidad del aire es medible." },
  { nomen: "die Voraussetzung", prep: "für", kasus: "Akkusativ", es: "el requisito para", example: "Die Voraussetzung für die Zulassung ist der Abschluss.", exampleEs: "El requisito para la admisión es el título." },
  { nomen: "der Einfluss", prep: "auf", kasus: "Akkusativ", es: "la influencia sobre", example: "Der Einfluss auf das Klima ist belegt.", exampleEs: "La influencia sobre el clima está demostrada." },
  { nomen: "der Bedarf", prep: "an", kasus: "Dativ", es: "la necesidad de", example: "Der Bedarf an Wohnraum wächst.", exampleEs: "La necesidad de vivienda crece.", trap: "der Bedarf von" },
  { nomen: "die Kritik", prep: "an", kasus: "Dativ", es: "la crítica a", example: "Die Kritik an dem Entwurf war heftig.", exampleEs: "La crítica al borrador fue dura." },
  { nomen: "die Suche", prep: "nach", kasus: "Dativ", es: "la búsqueda de", example: "Die Suche nach einer Lösung dauert an.", exampleEs: "La búsqueda de una solución continúa." },
  { nomen: "der Verzicht", prep: "auf", kasus: "Akkusativ", es: "la renuncia a", example: "Der Verzicht auf das Auto fällt vielen schwer.", exampleEs: "Renunciar al coche a muchos les cuesta." },
  { nomen: "die Einigung", prep: "auf", kasus: "Akkusativ", es: "el acuerdo sobre", example: "Die Einigung auf einen Kompromiss gelang erst spät.", exampleEs: "El acuerdo sobre un término medio llegó tarde." },
  { nomen: "die Stellungnahme", prep: "zu", kasus: "Dativ", es: "el pronunciamiento sobre", example: "Die Stellungnahme zu den Vorwürfen kam spät.", exampleEs: "El pronunciamiento sobre las acusaciones llegó tarde." },
];

export interface RektionAdj {
  adj: string;
  prep: string;
  kasus: "Akkusativ" | "Dativ" | "Genitiv";
  es: string;
  example: string;
  exampleEs: string;
  trap?: string;
}

export const rektionAdjektive: RektionAdj[] = [
  { adj: "stolz", prep: "auf", kasus: "Akkusativ", es: "orgulloso de", example: "Darauf bin ich durchaus stolz.", exampleEs: "De eso sí que estoy orgulloso.", trap: "stolz von / stolz über" },
  { adj: "abhängig", prep: "von", kasus: "Dativ", es: "dependiente de", example: "Das ist von zahlreichen Faktoren abhängig.", exampleEs: "Eso depende de numerosos factores.", trap: "abhängig de / abhängig aus" },
  { adj: "zuständig", prep: "für", kasus: "Akkusativ", es: "competente para", example: "Die Stadt ist zuständig für den Nahverkehr.", exampleEs: "El ayuntamiento es competente para el transporte urbano.", trap: "zuständig von" },
  { adj: "überzeugt", prep: "von", kasus: "Dativ", es: "convencido de", example: "Ich bin fest davon überzeugt, dass sich ein Umstieg lohnt.", exampleEs: "Estoy firmemente convencido de que merece la pena cambiarse." },
  { adj: "verantwortlich", prep: "für", kasus: "Akkusativ", es: "responsable de", example: "Wer ist verantwortlich für die Verspätung?", exampleEs: "¿Quién es responsable del retraso?", trap: "verantwortlich von" },
  { adj: "reich", prep: "an", kasus: "Dativ", es: "rico en", example: "Die Region ist reich an erneuerbaren Quellen.", exampleEs: "La región es rica en fuentes renovables." },
  { adj: "beteiligt", prep: "an", kasus: "Dativ", es: "implicado en", example: "An dem Projekt sind drei Ämter beteiligt.", exampleEs: "En el proyecto están implicadas tres oficinas." },
  { adj: "interessiert", prep: "an", kasus: "Dativ", es: "interesado en", example: "Sind Sie an einer Verlängerung interessiert?", exampleEs: "¿Le interesa una prórroga?" },
  { adj: "bereit", prep: "zu", kasus: "Dativ", es: "dispuesto a", example: "Wir sind zu einem Gespräch bereit.", exampleEs: "Estamos dispuestos a una conversación." },
  { adj: "froh", prep: "über", kasus: "Akkusativ", es: "contento de / por", example: "Ich bin froh über die Entscheidung.", exampleEs: "Estoy contento con la decisión." },
  { adj: "sicher", prep: "vor", kasus: "Dativ", es: "a salvo de", example: "Niemand ist vor solchen Fehlern sicher.", exampleEs: "Nadie está a salvo de tales errores." },
  { adj: "angewiesen", prep: "auf", kasus: "Akkusativ", es: "dependiente de (no tener más remedio)", example: "Viele Haushalte sind auf den Nahverkehr angewiesen.", exampleEs: "Muchos hogares dependen del transporte urbano." },
];

export const daKompositaB2 = {
  title: "El da-Komposita anticipador",
  body:
    "El español no tiene nada equivalente y el alumno lo omite (*Ich gehe aus, dass…) o lo pone donde no va. Es lo que sostiene la frase larga argumentativa: el da- anuncia la subordinada que viene detrás. Con PERSONAS no vale: se pregunta bei wem, an wen, nunca *wobei con gente.",
  rows: [
    ["ausgehen von", "Ich gehe davon aus, dass der Verbrauch steigt.", "Parto de que el consumo sube."],
    ["abhängen von", "Es hängt davon ab, ob die Kasse zahlt.", "Depende de si la mutua paga."],
    ["überzeugt sein von", "Ich bin fest davon überzeugt, dass es sich lohnt.", "Estoy convencido de que merece la pena."],
    ["sich freuen auf/über", "Ich freue mich darauf, dass du kommst.", "Me hace ilusión que vengas."],
    ["sich einsetzen für", "Wir setzen uns dafür ein, dass die Frist verlängert wird.", "Abogamos por que se alargue el plazo."],
    ["sich entschuldigen bei + für", "Wir entschuldigen uns bei den Bewohnern dafür, dass die Umleitung nötig ist.", "Pedimos disculpas a los vecinos por el desvío. (DOS preposiciones)"],
  ] as [string, string, string][],
  trap: {
    wrong: "Ich gehe aus, dass das stimmt.",
    right: "Ich gehe davon aus, dass das stimmt.",
    why: "ausgehen pide von. Sin davon, la preposición se queda huérfana y la frase no es alemana.",
  },
};

export const doppelRektion: [string, string, string][] = [
  ["sich bei jdm. für etw. bedanken", "darse las gracias a alguien por algo", "Ich bedanke mich bei Ihnen für die Unterlagen."],
  ["sich bei jdm. für etw. entschuldigen", "disculparse ante alguien por algo", "Ich entschuldige mich bei den Nachbarn für den Lärm."],
  ["jdm. etw. vorwerfen", "reprocharle algo a alguien (sin preposición: dativo + acusativo)", "Man wirft der Behörde Versäumnisse vor."],
  ["jdn. vor etw. warnen", "advertir a alguien de algo", "Der Arzt warnt die Patienten vor dem Eingriff."],
];

// ─────────────────────────────────────────────────────────────────────────────
// 6 · TRAMPAS DEL HISPANOHABLANTE EN B2
// ─────────────────────────────────────────────────────────────────────────────

export interface TrapB2 {
  id: string;
  title: string;
  wrong: string;
  right: string;
  why: string;
  moduleId: string;
}

export const trapsB2: TrapB2[] = [
  {
    id: "b2-trap-mittelfeld",
    title: "El orden dentro del campo medio",
    wrong: "Ich habe gestern ihm es gegeben.",
    right: "Ich habe es ihm gestern gegeben.",
    why: "En B1 se aprendió dónde va el verbo. En B2 hay que aprender dónde va todo lo demás. Pronombres delante, y entre ellos acusativo antes que dativo (al revés que con los nombres). Lo conocido antes que lo nuevo. te-ka-mo-lo: temporal → causal → modal → local. nicht, por defecto, al final del Mittelfeld, delante de la segunda pieza del verbo. No genera frases agramaticales: genera frases raras, y Kohärenz lo nota.",
    moduleId: "b2m1",
  },
  {
    id: "b2-trap-vorfeld",
    title: "Cinco frases seguidas que empiezan por Ich",
    wrong: "Ich denke, dass… Ich glaube, dass… Ich bin der Meinung, dass…",
    right: "Meiner Ansicht nach… · Dagegen spricht… · Aus den Zahlen ergibt sich…",
    why: "El Vorfeld solo admite una pieza, y elegir cuál es la herramienta de cohesión más barata del alemán. Empezar cinco frases con Ich es lo que hace que un texto correcto suene a redacción de instituto.",
    moduleId: "b2m1",
  },
  {
    id: "b2-trap-ki",
    title: "Indicativo donde toca Konjunktiv I",
    wrong: "Er sagte, er ist krank. · Die Sprecher sagten, sie haben nichts gewusst.",
    right: "Er sagte, er sei krank. · Die Sprecher sagten, sie hätten nichts gewusst.",
    why: "El español resuelve la indirecta con el tiempo (dijo que venía). El alemán, con un modo que el español no usa tras verbos de decir. Y cuando K I coincide con el indicativo, se sustituye por K II: si no, la cita y la afirmación se confunden.",
    moduleId: "b2m1",
  },
  {
    id: "b2-trap-se",
    title: "El «se» resuelto siempre con man",
    wrong: "Man hat mir gekündigt. · Man kann das machen. (en un escrito formal, una y otra vez)",
    right: "Mir wurde gekündigt. · Das lässt sich machen. / Das ist zu machen.",
    why: "man no es un error. Es quedarse en B1. El B2 elige: pasiva impersonal, sich lassen, sein + zu, -bar. Y la de dativo no tiene sujeto: el español necesita uno (me despidieron) y por eso no se produce nunca por transferencia.",
    moduleId: "b2m2",
  },
  {
    id: "b2-trap-papierdeutsch",
    title: "Nominalizarlo todo",
    wrong: "Unter Berücksichtigung der Tatsache der verspäteten Einreichung der Unterlagen…",
    right: "Weil die Unterlagen zu spät eingereicht wurden… — y UNA nominalización al lado, no cinco.",
    why: "El salto de registro es la marca del B2 escrito. Un texto entero en estilo nominal es Papierdeutsch, y los propios alemanes lo llaman así. El B2 alterna.",
    moduleId: "b2m3",
  },
  {
    id: "b2-trap-doppelinf",
    title: "El doble infinitivo, y el auxiliar que se adelanta",
    wrong: "…, weil ich kommen hätte können. · Ich hätte sollen früher anrufen.",
    right: "…, weil ich hätte kommen können. · Ich hätte früher anrufen sollen.",
    why: "Ich hätte kommen können tiene un orden que el español no da nunca por transferencia, y dentro de subordinada cambia otra vez: el auxiliar se adelanta y rompe la única regla que el alumno tenía interiorizada (el verbo al final). Es la trampa formal más cara del nivel.",
    moduleId: "b2m6",
  },
  {
    id: "b2-trap-partikeln",
    title: "Las partículas: ninguna, o todas",
    wrong: "Komm her. (seco, con un amigo) · Das ist doch mal ja eigentlich unmöglich. (esparcidas)",
    right: "Komm mal her. · Das ist ja unmöglich.",
    why: "El español pone ese matiz en la entonación y en la cara. Quien no usa partículas suena cortante; quien las esparce, raro. Se enseñan por posición y por acto de habla, en pares mínimos, nunca como lista de traducciones. Y en el escrito formal casi no van.",
    moduleId: "b2m7",
  },
  {
    id: "b2-trap-jedesto",
    title: "je… desto con el verbo en el sitio del español",
    wrong: "Je mehr ich lerne, desto ich verstehe besser.",
    right: "Je mehr ich lerne, desto besser verstehe ich.",
    why: "La mitad de je es subordinada: verbo al FINAL. La de desto abre la principal: desto + comparativo + VERBO + sujeto. El español (cuanto más… más) no tiene ninguna de esas consecuencias, y el calco se entiende y está mal.",
    moduleId: "b2m5",
  },
  {
    id: "b2-trap-allerdings",
    title: "allerdings tratado como obwohl",
    wrong: "Allerdings ich verstehe den Einwand. · Allerdings dass es teuer ist…",
    right: "Allerdings verstehe ich den Einwand. · Es ist teuer. Allerdings lohnt es sich.",
    why: "allerdings y jedoch son adverbios, no conjunciones. Ocupan la posición 1 e invierten, o se cuelan detrás del verbo. wobei SÍ manda el verbo al final. La clínica de b2m5 es exactamente este reparto.",
    moduleId: "b2m5",
  },
  {
    id: "b2-trap-davon",
    title: "El da- anticipador omitido",
    wrong: "Ich gehe aus, dass das stimmt. · Ich bin stolz, dass…",
    right: "Ich gehe davon aus, dass das stimmt. · Ich bin stolz darauf, dass…",
    why: "El español no tiene nada equivalente. Sin el da-, la preposición se queda huérfana. Es lo que sostiene la frase larga: Ich freue mich, dass… es B1; Ich gehe davon aus, dass… es B2.",
    moduleId: "b2m9",
  },
  {
    id: "b2-trap-register",
    title: "La palabra correcta con el traje equivocado",
    wrong: "Könnten Sie mir das mal eben hinkriegen? (a un superior) · Ich habe Ihr Schreiben bekommen, Kumpel.",
    right: "Könnten Sie mir das bitte zukommen lassen? · Ich habe Ihr Schreiben erhalten.",
    why: "En B2 el problema ya no es entender mal: es sonar mal. kriegen en una carta formal, erhalten con un amigo, Kumpel en una reunión. El alumno acierta la palabra y falla el traje, y la rúbrica lo penaliza igual.",
    moduleId: "b2m10",
  },
  {
    id: "b2-trap-resumir",
    title: "Resumir copiando",
    wrong: "Pegar tres frases del original una detrás de otra y llamar a eso Zusammenfassung.",
    right: "Presente + Konjunktiv I + una nominalización, sin detalle y sin opinión propia. Prohibirse las palabras del texto fuente.",
    why: "El error de este nivel no es acortar mal: es no reformular. Resumir y contrastar dos fuentes es la operación que el examen cobra en el Schreiben y en el Vortrag.",
    moduleId: "b2m11",
  },
];

export interface FalseFriendB2 {
  de: string;
  means: string;
  sounds: string;
  instead: string;
  example: string;
  exampleEs: string;
  moduleId: string;
}

/** Los de B1 no se reabren. Estos son de registro o de nivel alto. */
export const falseFriendsB2: FalseFriendB2[] = [
  { de: "kriegen", means: "conseguir, recibir (hablado)", sounds: "vale en una carta formal", instead: "erhalten / bekommen en formal", example: "Hast du die Mail gekriegt?", exampleEs: "¿Te ha llegado el correo? (con un amigo)", moduleId: "b2m10" },
  { de: "erhalten", means: "recibir (formal, escrito)", sounds: "suena bien con un amigo", instead: "bekommen / kriegen en coloquial", example: "Wir haben Ihr Schreiben erhalten.", exampleEs: "Hemos recibido su escrito.", moduleId: "b2m10" },
  { de: "der Kumpel", means: "el colega, el tío (muy coloquial)", sounds: "compañero de trabajo, en una reunión", instead: "der Kollege / die Kollegin", example: "Mein Kumpel kommt später.", exampleEs: "Mi colega (de bares) viene luego.", moduleId: "b2m10" },
  { de: "scheinbar", means: "en apariencia, pero no es así", sounds: "por lo visto", instead: "offenbar / anscheinend (por lo visto, y es así)", example: "Er war scheinbar krank — in Wahrheit hatte er keine Lust.", exampleEs: "Aparentemente estaba enfermo: en realidad no le apetecía.", moduleId: "b2m7" },
  { de: "kostspielig", means: "costoso (registro alto)", sounds: "la única forma de decir caro", instead: "teuer en conversación; kostspielig en informe", example: "Das dürfte recht kostspielig gewesen sein.", exampleEs: "Eso debió de resultar bastante costoso.", moduleId: "b2m7" },
  { de: "die Stiege", means: "la escalera (AT y sur de Alemania)", sounds: "la forma estándar", instead: "die Treppe en producción; Stiege se reconoce", example: "Die Stiege ist steil.", exampleEs: "La escalera es empinada. (en Viena)", moduleId: "b2m10" },
  { de: "der Jänner", means: "enero (AT)", sounds: "lo que hay que escribir en el Goethe", instead: "der Januar en producción", example: "Der Jänner war mild.", exampleEs: "El enero fue suave. (prensa austriaca)", moduleId: "b2m10" },
];

// ─────────────────────────────────────────────────────────────────────────────
// 7 · NATIVO — las 48 del sílabo, book / real / exam
// ─────────────────────────────────────────────────────────────────────────────

export interface NativoB2 {
  id: string;
  moduleId: string;
  book: string;
  real: string;
  exam: string;
  meaning: string;
  when: string;
  register: "amigos" | "neutral" | "jerga" | "regional";
}

export const nativoB2: NativoB2[] = [
  { id: "nat-b2m1-1", moduleId: "b2m1", book: "Er hat gesagt, dass er krank ist.", real: "Er meinte, er ist krank.", exam: "Er sagte, er sei krank.", meaning: "Dijo que está enfermo", when: "El libro enseña la indirecta con dass; la calle se salta el modo; el examen quiere Konjunktiv I. Las tres conviven: hay que saber cuál se escribe.", register: "amigos" },
  { id: "nat-b2m1-2", moduleId: "b2m1", book: "Man sagt, dass er reich ist.", real: "Es heißt, er ist reich.", exam: "Er soll reich sein. / Angeblich ist er reich.", meaning: "Dicen que es rico", when: "sollen de distanciamiento hace en una palabra lo que el español resuelve con una oración. En el oral coloquial, Es heißt… basta.", register: "neutral" },
  { id: "nat-b2m1-3", moduleId: "b2m1", book: "Das ist nicht wahr.", real: "Das ist doch Quatsch.", exam: "Das lässt sich so nicht belegen.", meaning: "Eso no es verdad", when: "Quatsch con amigos; en un Forumsbeitrag, belegen. doch no se traduce: marca que contradices algo dado por sabido.", register: "jerga" },
  { id: "nat-b2m1-4", moduleId: "b2m1", book: "Ich habe es in der Zeitung gelesen.", real: "Stand in der Zeitung.", exam: "Einem Bericht zufolge…", meaning: "Lo leí en el periódico", when: "La calle se come el sujeto; el examen cita la fuente con zufolge pospuesto.", register: "amigos" },

  { id: "nat-b2m2-1", moduleId: "b2m2", book: "Man macht das so.", real: "Das macht man halt so.", exam: "So wird das gehandhabt.", meaning: "Así se hace", when: "halt no se traduce: marca resignación o evidencia. En el escrito formal, gehandhabt. Elegir es el nivel.", register: "amigos" },
  { id: "nat-b2m2-2", moduleId: "b2m2", book: "Das kann man machen.", real: "Das geht.", exam: "Das lässt sich machen.", meaning: "Eso se puede hacer", when: "Tres trajes, misma idea. Das geht cierra una conversación; lässt sich abre un informe.", register: "amigos" },
  { id: "nat-b2m2-3", moduleId: "b2m2", book: "Ich wurde entlassen.", real: "Ich bin rausgeflogen.", exam: "Mir wurde zum 30. Juni gekündigt.", meaning: "Me despidieron", when: "El examen es pasiva de dativo, sin sujeto. rausgeflogen no se escribe ni se dice a un superior.", register: "jerga" },
  { id: "nat-b2m2-4", moduleId: "b2m2", book: "Hier arbeitet man viel.", real: "Hier ist echt viel los.", exam: "Es wird hier unter hohem Zeitdruck gearbeitet.", meaning: "Aquí se trabaja mucho", when: "Pasiva impersonal de ambiente: el es se cae si otra cosa ocupa el Vorfeld (Sonntags wird hier nicht gearbeitet).", register: "amigos" },

  { id: "nat-b2m3-1", moduleId: "b2m3", book: "Weil das Wetter schlecht war, wurde das Fest abgesagt.", real: "Das Wetter war mies, deshalb ist das Fest ausgefallen.", exam: "Aufgrund des schlechten Wetters wurde das Fest abgesagt.", meaning: "Como el tiempo era malo, se canceló la fiesta", when: "La conversión weil → aufgrund es la operación del módulo. mies no se escribe.", register: "amigos" },
  { id: "nat-b2m3-2", moduleId: "b2m3", book: "Wir haben darüber gesprochen.", real: "Wir haben's angesprochen.", exam: "Wir haben das Thema zur Sprache gebracht.", meaning: "Hemos hablado de ello", when: "zur Sprache bringen es Funktionsverbgefüge, no un sinónimo elegante: es marca de registro.", register: "amigos" },
  { id: "nat-b2m3-3", moduleId: "b2m3", book: "Das ist wichtig.", real: "Das ist echt wichtig.", exam: "Das spielt eine entscheidende Rolle.", meaning: "Eso es importante", when: "eine Rolle spielen en el escrito; echt en el recado de voz. No al revés.", register: "amigos" },
  { id: "nat-b2m3-4", moduleId: "b2m3", book: "Man hat das untersucht.", real: "Das haben die untersucht.", exam: "Die Untersuchung ergab, dass…", meaning: "Se ha investigado", when: "El verbo se volvió nombre y el nombre hizo de sujeto: ahí se ve un B2 escrito.", register: "amigos" },

  { id: "nat-b2m4-1", moduleId: "b2m4", book: "Das Problem, das wir lösen müssen.", real: "Das Problem, das noch ansteht.", exam: "Das zu lösende Problem.", meaning: "El problema que hay que resolver", when: "El Gerundivum (zu + Partizip I) es pasivo y obligativo. No tiene calco español. Se produce en el escrito; se reconoce en la Studienordnung.", register: "neutral" },
  { id: "nat-b2m4-2", moduleId: "b2m4", book: "Die Reform, die das Parlament gestern beschlossen hat.", real: "Die neue Reform von gestern.", exam: "Die gestern vom Parlament beschlossene Reform.", meaning: "La reforma que el parlamento aprobó ayer", when: "El atributo extendido se lee de dentro hacia el participio, y el participio se declina como un adjetivo. Ahí se cobra b1m9.", register: "neutral" },
  { id: "nat-b2m4-3", moduleId: "b2m4", book: "Der Kollege, mit dem ich arbeite.", real: "Mein Kollege halt.", exam: "Der Kollege, mit dem ich zusammenarbeite.", meaning: "El compañero con el que trabajo", when: "halt cierra una explicación que das por sabida. La relativa con preposición se queda en el escrito.", register: "amigos" },
  { id: "nat-b2m4-4", moduleId: "b2m4", book: "Das, was mich stört, ist…", real: "Was mich stört: …", exam: "Was mich daran stört, ist vor allem…", meaning: "Lo que me molesta es…", when: "was tras das, alles, etwas, nichts. La calle se come el das; el examen lo sostiene y añade daran.", register: "amigos" },

  { id: "nat-b2m5-1", moduleId: "b2m5", book: "Ich bin dafür.", real: "Bin ich voll dafür.", exam: "Ich spreche mich dafür aus.", meaning: "Estoy a favor", when: "sich aussprechen für es el verbo del Forumsbeitrag. voll dafür, con amigos menores de 35.", register: "jerga" },
  { id: "nat-b2m5-2", moduleId: "b2m5", book: "Er ist Arzt und auch Musiker.", real: "Der ist Arzt, und Musik macht er auch noch.", exam: "Er ist nicht nur Arzt, sondern auch Musiker.", meaning: "Es médico y además músico", when: "Las dos piezas del mismo tipo. El calco mezcla un adjetivo con una frase y se cae.", register: "amigos" },
  { id: "nat-b2m5-3", moduleId: "b2m5", book: "Ich sehe das anders.", real: "Seh ich anders.", exam: "Dem kann ich mich nicht anschließen.", meaning: "Yo lo veo de otra manera", when: "sich anschließen + Dativ: el discrepante cortés del oral y del foro.", register: "amigos" },
  { id: "nat-b2m5-4", moduleId: "b2m5", book: "Das stimmt, aber…", real: "Ja schon, aber…", exam: "Das mag zutreffen; dennoch…", meaning: "Es verdad, pero…", when: "Conceder sin rendirse: la función que separa un B2 de un manifiesto. schon no es «ya»: es la concesión hablada.", register: "amigos" },

  { id: "nat-b2m6-1", moduleId: "b2m6", book: "Ich hätte früher zum Arzt gehen sollen.", real: "Ich hätt eher hingehen sollen.", exam: "Ich hätte den Arztbesuch nicht so lange aufschieben sollen.", meaning: "Debería haber ido antes al médico", when: "Doble infinitivo: el participio de sollen no se usa aquí. Dentro de subordinada, el auxiliar se adelanta: weil ich hätte gehen sollen.", register: "amigos" },
  { id: "nat-b2m6-2", moduleId: "b2m6", book: "Vielleicht ist es anders.", real: "Kann auch sein, dass…", exam: "Es wäre denkbar, dass…", meaning: "A lo mejor es de otra manera", when: "K II atenuador: no afirmas, propones. Es lo que hace defendible un argumento.", register: "amigos" },
  { id: "nat-b2m6-3", moduleId: "b2m6", book: "Er tut so, als ob er nichts weiß.", real: "Der tut so, als ob nix wär.", exam: "Er tut so, als wüsste er von nichts.", meaning: "Hace como si no supiera nada", when: "als + K II, sin ob, adelanta el verbo. El indicativo (weiß) es el calco y se oye; el examen quiere wüsste.", register: "jerga" },
  { id: "nat-b2m6-4", moduleId: "b2m6", book: "Man kann dagegen sagen, dass…", real: "Da könnte man aber sagen…", exam: "Dagegen ließe sich einwenden, dass…", meaning: "Se puede objetar que…", when: "ließe sich: K II + Passiversatz, el registro del escrito argumentativo.", register: "amigos" },

  { id: "nat-b2m7-1", moduleId: "b2m7", book: "Das ist sicher teuer.", real: "Das muss ja teuer gewesen sein.", exam: "Das dürfte recht kostspielig gewesen sein.", meaning: "Eso seguro que es caro", when: "muss de deducción, no de obligación. ja marca que lo das por sabido. dürfte = probable, registro más alto.", register: "amigos" },
  { id: "nat-b2m7-2", moduleId: "b2m7", book: "Sag es mir.", real: "Sag mal…", exam: "Könnten Sie mir bitte sagen…", meaning: "Dímelo", when: "mal suaviza el imperativo. Sin mal, con un amigo, suena a orden. En Sie, las partículas se caen.", register: "amigos" },
  { id: "nat-b2m7-3", moduleId: "b2m7", book: "Warum sagst du das?", real: "Warum sagst du das denn?", exam: "Worauf stützt sich diese Aussage?", meaning: "¿Por qué dices eso?", when: "denn en pregunta es interés, no «entonces». El examen reformula entero.", register: "amigos" },
  { id: "nat-b2m7-4", moduleId: "b2m7", book: "Es ist zu teuer.", real: "Das ist mir zu happig.", exam: "Der Preis erscheint mir nicht angemessen.", meaning: "Es demasiado caro", when: "happig es jerga de precio. En un Widerspruch, angemessen.", register: "jerga" },

  { id: "nat-b2m8-1", moduleId: "b2m8", book: "Wegen des Lärms…", real: "Wegen dem Lärm…", exam: "Aufgrund der anhaltenden Lärmbelästigung…", meaning: "A causa del ruido", when: "El real no es el libro con menos cortesía: es OTRA NORMA. El dativo coloquial con wegen está extendidísimo; el examen quiere Genitiv o aufgrund.", register: "amigos" },
  { id: "nat-b2m8-2", moduleId: "b2m8", book: "Ich beschwere mich.", real: "Da mach ich Stress.", exam: "Hiermit lege ich Widerspruch ein.", meaning: "Me quejo / Recurro", when: "Widerspruch einlegen es la fórmula. Stress machen no se escribe a un Amt.", register: "jerga" },
  { id: "nat-b2m8-3", moduleId: "b2m8", book: "Was die Miete angeht…", real: "Also, die Miete…", exam: "Hinsichtlich der Miete…", meaning: "En cuanto al alquiler…", when: "hinsichtlich + Genitiv: el Arranque del escrito administrativo.", register: "amigos" },
  { id: "nat-b2m8-4", moduleId: "b2m8", book: "Er hat keine Papiere.", real: "Der hat nix in der Hand.", exam: "Mangels gültiger Dokumente…", meaning: "No tiene papeles", when: "mangels + Genitiv, a menudo sin artículo. nix no se escribe.", register: "jerga" },

  { id: "nat-b2m9-1", moduleId: "b2m9", book: "Ich denke, dass…", real: "Ich geh mal davon aus, dass…", exam: "Ich gehe davon aus, dass…", meaning: "Pienso que / Parto de que", when: "El da- anticipador es la diferencia. mal suaviza la suposición hablada; en el escrito, se quita.", register: "amigos" },
  { id: "nat-b2m9-2", moduleId: "b2m9", book: "Das hängt von vielen Dingen ab.", real: "Kommt drauf an.", exam: "Das ist von zahlreichen Faktoren abhängig.", meaning: "Depende de muchas cosas", when: "drauf = darauf comido. El adjetivo abhängig von es la rección que el estilo nominal necesita.", register: "amigos" },
  { id: "nat-b2m9-3", moduleId: "b2m9", book: "Der Grund dafür ist…", real: "Das liegt daran, dass…", exam: "Der Grund für diese Entwicklung liegt in…", meaning: "El motivo es…", when: "Grund für, no von. liegen in + Dativ para la causa de fondo.", register: "amigos" },
  { id: "nat-b2m9-4", moduleId: "b2m9", book: "Ich bin stolz darauf.", real: "Da bin ich schon stolz drauf.", exam: "Darauf bin ich durchaus stolz.", meaning: "Estoy orgulloso de ello", when: "Vorfeld elegido (Darauf…): cohesión barata. drauf, hablado; darauf, escrito.", register: "amigos" },

  { id: "nat-b2m10-1", moduleId: "b2m10", book: "der Januar", real: "der Jänner", exam: "der Januar", meaning: "enero", when: "Jänner es austriaco. Se reconoce en Der Standard; se produce Januar. La regla de producción del módulo cabe en esta tarjeta.", register: "regional" },
  { id: "nat-b2m10-2", moduleId: "b2m10", book: "die Treppe", real: "die Stiege", exam: "die Treppe", meaning: "la escalera", when: "Stiege: Austria y sur de Alemania. En Suiza se dice Treppe. Plurizentrismo POR TEXTO, nunca mudando al elenco.", register: "regional" },
  { id: "nat-b2m10-3", moduleId: "b2m10", book: "die Straße", real: "die Strasse", exam: "die Straße", meaning: "la calle", when: "En Suiza no existe la ß: Strasse, gross, Ermässigung. En el Goethe se escribe ß. Reconocer no es producir.", register: "regional" },
  { id: "nat-b2m10-4", moduleId: "b2m10", book: "Das ist sehr gut.", real: "Das ist echt stark.", exam: "Das halte ich für ausgesprochen gelungen.", meaning: "Está muy bien", when: "stark de elogio es jerga joven. ausgesprochen gelungen, el traje del escrito. sehr gut no está mal: está corto.", register: "jerga" },

  { id: "nat-b2m11-1", moduleId: "b2m11", book: "Kurz gesagt…", real: "Also im Endeffekt…", exam: "Zusammenfassend lässt sich sagen, dass…", meaning: "En resumen…", when: "El cierre de la síntesis. im Endeffekt cierra una caña; lässt sich sagen cierra un Vortrag.", register: "amigos" },
  { id: "nat-b2m11-2", moduleId: "b2m11", book: "In dem Text steht, dass…", real: "Da steht halt, dass…", exam: "Dem Artikel zufolge…", meaning: "En el texto dice que…", when: "Atribuir sin firmar. halt da por sabido el contenido; zufolge cita la fuente.", register: "amigos" },
  { id: "nat-b2m11-3", moduleId: "b2m11", book: "Anders gesagt…", real: "Also quasi…", exam: "Mit anderen Worten…", meaning: "Dicho de otro modo…", when: "Reformular es decirlo con otras palabras. quasi no se escribe.", register: "amigos" },
  { id: "nat-b2m11-4", moduleId: "b2m11", book: "Ich erkläre es dir.", real: "Ich sag's dir mal ganz einfach.", exam: "Ich fasse den wesentlichen Inhalt kurz zusammen.", meaning: "Te lo explico", when: "Resumir no es acortar: es transmitir el contenido esencial, sin detalle y sin opinión propia.", register: "amigos" },

  { id: "nat-b2m12-1", moduleId: "b2m12", book: "Zuerst möchte ich über das Thema sprechen.", real: "Also, ich fang mal an.", exam: "Sehr geehrte Damen und Herren, in meinem Vortrag geht es um die Frage, ob…", meaning: "Empiezo a hablar del tema", when: "La apertura del Vortrag no se dice en la calle y en el Teil 1 es oro. Memorízala: el contenido cambia, la fórmula no.", register: "neutral" },
  { id: "nat-b2m12-2", moduleId: "b2m12", book: "Ich bin nicht einverstanden.", real: "Nee, seh ich nicht so.", exam: "Da muss ich Ihnen leider widersprechen.", meaning: "No estoy de acuerdo", when: "Discrepar cortésmente: 40 puntos del Teil 2 se juegan aquí. Nee se queda fuera de la sala.", register: "amigos" },
  { id: "nat-b2m12-3", moduleId: "b2m12", book: "Darf ich etwas sagen?", real: "Kann ich mal?", exam: "Darf ich dazu kurz das Wort ergreifen?", meaning: "¿Puedo decir algo?", when: "Pedir el turno. das Wort ergreifen es la fórmula; Kann ich mal, la cocina de Nico.", register: "amigos" },
  { id: "nat-b2m12-4", moduleId: "b2m12", book: "Dann sind wir uns einig.", real: "Gut, dann machen wir das so.", exam: "Vielen Dank für Ihre Aufmerksamkeit. Ich beantworte gern Ihre Fragen.", meaning: "Entonces estamos de acuerdo / Gracias, paso a preguntas", when: "El cierre del Vortrag ofrece las preguntas: valen 12 de 44. Sin él, el Teil 1 queda cojo. La de acuerdo se reserva para cuando de verdad lo hay.", register: "neutral" },
];
