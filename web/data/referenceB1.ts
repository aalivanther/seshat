// La libreta del NIVEL B1: seis pestañas de notas vivas — Konjunktiv II,
// Passiv, verbos con preposición, conectores, declinación del adjetivo y las
// trampas del hispanohablante (PLAN.md §6.5 (e) · PLAN-B1.md §6).
//
// La pestaña 3 (verbos con preposición) NO es consulta: es INFRAESTRUCTURA —
// misma tabla que alimenta las plantillas de repaso de rección y los da-/wo-
// Komposita. Se escribe una vez, se usa en varios sitios.
//
// Regla de la casa: explicaciones en español, alemán limpio en los ejemplos
// (sin corchetes ni marcas) para que el TTS los pueda leer tal cual.

// ─────────────────────────────────────────────────────────────────────────────
// 1 · KONJUNKTIV II — la forma de lo que no es (todavía)
// ─────────────────────────────────────────────────────────────────────────────

export interface K2Form {
  inf: string;
  /** la forma sintética de 1ª persona: la que hay que saber de memoria */
  k2: string;
  es: string;
  /** conjugación completa */
  rows: [string, string][];
  /** por qué esta y no würde */
  note: string;
}

/** Las once formas sintéticas OBLIGATORIAS: con estos verbos, «würde» es un
 *  error diagnóstico de nivel («*Ich würde Zeit haben» delata el B1 a medias).
 *  OJO: obligatorias sí, únicas no. El alemán conserva vivas otras formas
 *  sintéticas que en B1 se entienden y suenan bien (fände, bräuchte, gäbe,
 *  täte, ließe): la lista de abajo es la que hay que producir, no una frontera
 *  más allá de la cual el alemán deje de existir. */
export const k2Forms: K2Form[] = [
  {
    inf: "haben", k2: "hätte", es: "tendría / habría",
    rows: [["ich", "hätte"], ["du", "hättest"], ["er/sie/es", "hätte"], ["wir", "hätten"], ["ihr", "hättet"], ["sie/Sie", "hätten"]],
    note: "La más usada de todas: Ich hätte gern einen Kaffee. Y la que arma el pasado irreal: Ich hätte das gemacht.",
  },
  {
    inf: "sein", k2: "wäre", es: "sería / estaría",
    rows: [["ich", "wäre"], ["du", "wärst"], ["er/sie/es", "wäre"], ["wir", "wären"], ["ihr", "wärt"], ["sie/Sie", "wären"]],
    note: "Wäre es möglich…? es la cortesía del examen. Y con verbos de movimiento hace el pasado irreal: Ich wäre gekommen.",
  },
  {
    inf: "können", k2: "könnte", es: "podría",
    rows: [["ich", "könnte"], ["du", "könntest"], ["er/sie/es", "könnte"], ["wir", "könnten"], ["ihr", "könntet"], ["sie/Sie", "könnten"]],
    note: "Könnten Sie mir helfen? — la petición educada estándar. Ojo: könnte lleva Umlaut, konnte (pasado real) no.",
  },
  {
    inf: "müssen", k2: "müsste", es: "tendría que / debería",
    rows: [["ich", "müsste"], ["du", "müsstest"], ["er/sie/es", "müsste"], ["wir", "müssten"], ["ihr", "müsstet"], ["sie/Sie", "müssten"]],
    note: "La obligación suavizada: Ich müsste eigentlich lernen. Otra vez, el Umlaut separa müsste de musste.",
  },
  {
    inf: "sollen", k2: "sollte", es: "debería (consejo)",
    rows: [["ich", "sollte"], ["du", "solltest"], ["er/sie/es", "sollte"], ["wir", "sollten"], ["ihr", "solltet"], ["sie/Sie", "sollten"]],
    note: "El consejo del nivel: Du solltest mehr schlafen. Aquí no hay Umlaut: el Konjunktiv II (sollte) y el pasado (sollte) se escriben igual, y solo el contexto los separa.",
  },
  {
    inf: "mögen", k2: "möchte", es: "querría, me gustaría",
    rows: [["ich", "möchte"], ["du", "möchtest"], ["er/sie/es", "möchte"], ["wir", "möchten"], ["ihr", "möchtet"], ["sie/Sie", "möchten"]],
    note: "La forma más usada del alemán entero y también un Konjunktiv II, aunque ya nadie la sienta como tal: Ich möchte einen Termin vereinbaren. «*Ich würde mögen» no existe.",
  },
  {
    inf: "wollen", k2: "wollte", es: "quería / querría (petición suavizada)",
    rows: [["ich", "wollte"], ["du", "wolltest"], ["er/sie/es", "wollte"], ["wir", "wollten"], ["ihr", "wolltet"], ["sie/Sie", "wollten"]],
    note: "Sin Umlaut, igual que el pasado — y ese doble uso es justo su gracia: Ich wollte Sie etwas fragen suena más suave que Ich will. Nunca «*Ich würde wollen».",
  },
  {
    inf: "dürfen", k2: "dürfte", es: "sería posible que / podría (permiso o suposición)",
    rows: [["ich", "dürfte"], ["du", "dürftest"], ["er/sie/es", "dürfte"], ["wir", "dürften"], ["ihr", "dürftet"], ["sie/Sie", "dürften"]],
    note: "Dürfte ich Sie kurz stören? — permiso ultraeducado. También suposición: Das dürfte teuer sein.",
  },
  {
    inf: "wissen", k2: "wüsste", es: "sabría",
    rows: [["ich", "wüsste"], ["du", "wüsstest"], ["er/sie/es", "wüsste"], ["wir", "wüssten"], ["ihr", "wüsstet"], ["sie/Sie", "wüssten"]],
    note: "Ich wüsste nicht, wie das gehen soll. Suena culto y cae en los exámenes: memorízala con Umlaut.",
  },
  {
    inf: "gehen", k2: "ginge", es: "iría / sería posible",
    rows: [["ich", "ginge"], ["du", "gingest"], ["er/sie/es", "ginge"], ["wir", "gingen"], ["ihr", "ginget"], ["sie/Sie", "gingen"]],
    note: "Sobre todo impersonal: Ginge es auch am Freitag? = ¿valdría también el viernes? Oro puro para negociar citas.",
  },
  {
    inf: "kommen", k2: "käme", es: "vendría",
    rows: [["ich", "käme"], ["du", "kämst"], ["er/sie/es", "käme"], ["wir", "kämen"], ["ihr", "kämt"], ["sie/Sie", "kämen"]],
    note: "Ich käme gern, aber ich habe keine Zeit. La forma corta suena mucho mejor que «würde kommen».",
  },
];

export interface K2Use {
  id: "hoeflichkeit" | "hypothese" | "rat";
  label: string;
  /** cuándo se usa, en español */
  when: string;
  examples: { de: string; es: string }[];
}

/** Los tres usos del Konjunktiv II. El mismo trozo de gramática hace tres
 *  trabajos distintos — y en el examen los tres puntúan en sitios distintos. */
export const k2Uses: K2Use[] = [
  {
    id: "hoeflichkeit",
    label: "Cortesía · pedir sin exigir",
    when: "En cuanto pides algo a alguien que no es tu amigo íntimo. En B1 ya no es vocabulario: es registro, y su ausencia suena grosera aunque la frase sea correcta.",
    examples: [
      { de: "Könnten Sie mir bitte helfen?", es: "¿Podría ayudarme, por favor?" },
      { de: "Ich hätte gern einen Termin am Montag.", es: "Querría una cita el lunes." },
      { de: "Wäre es möglich, den Termin zu verschieben?", es: "¿Sería posible cambiar la cita?" },
      { de: "Dürfte ich Sie etwas fragen?", es: "¿Podría preguntarle algo?" },
      { de: "Ginge es auch später?", es: "¿Valdría también más tarde?" },
    ],
  },
  {
    id: "hypothese",
    label: "Hipótesis · lo que no es (o no fue)",
    when: "Para lo irreal: presente («si tuviera…, haría») y pasado («si hubiera tenido…, habría hecho»). La subordinada TAMBIÉN va en Konjunktiv II, igual que el subjuntivo español.",
    examples: [
      { de: "Wenn ich Zeit hätte, würde ich mehr lesen.", es: "Si tuviera tiempo, leería más." },
      { de: "Wenn ich reich wäre, würde ich ein Haus kaufen.", es: "Si fuera rico, compraría una casa." },
      { de: "Wenn ich das gewusst hätte, wäre ich früher gekommen.", es: "Si lo hubiera sabido, habría venido antes." },
      { de: "Ich hätte dir helfen können.", es: "Habría podido ayudarte. (irreal del pasado con modal: el modal en infinitivo, al final)" },
      { de: "An deiner Stelle wäre ich schon zu Hause.", es: "Yo en tu lugar ya estaría en casa." },
    ],
  },
  {
    id: "rat",
    label: "Consejo y reproche · lo que se debería",
    when: "Para aconsejar sin dar órdenes y para el reproche suave. Es la función estrella de la parte oral del B1 y de los foros del Schreiben.",
    examples: [
      { de: "Du solltest mehr schlafen.", es: "Deberías dormir más." },
      { de: "An deiner Stelle würde ich mit dem Chef sprechen.", es: "Yo en tu lugar hablaría con el jefe." },
      { de: "Du hättest mir Bescheid sagen sollen.", es: "Deberías habérmelo dicho. (reproche: hättest … sollen)" },
      { de: "Es wäre besser, wenn wir früher anfangen würden.", es: "Sería mejor que empezáramos antes." },
      { de: "Du müsstest eigentlich mehr üben.", es: "En realidad tendrías que practicar más." },
    ],
  },
];

/** La decisión que resuelve el 80 % de los errores: ¿forma propia o würde? */
export const k2WuerdeRule = {
  title: "¿Forma propia o würde + Infinitiv?",
  body:
    "El español tiene UNA sola forma («iría», «tendría», «podría»), así que la tentación es construir todo con würde. El alemán no funciona así: hay un grupo corto de verbos frecuentísimos que EXIGEN su forma sintética, y con los demás lo normal es würde + Infinitiv. «*Ich würde Zeit haben» es el error que delata el nivel. Matiz honesto para que nadie se lleve una sorpresa leyendo prensa: la lista no es una frontera del idioma — fände, bräuchte, gäbe, täte o ließe siguen vivas y son buen alemán; lo que pasa es que en B1 nadie te va a pedir que las produzcas.",
  synthetic: {
    label: "Forma propia OBLIGATORIA (el grupo que hay que saber de memoria)",
    list: ["hätte", "wäre", "könnte", "müsste", "sollte", "dürfte", "wüsste", "möchte", "wollte", "ginge", "käme"],
    example: { de: "Ich hätte gern mehr Zeit.", es: "Me gustaría tener más tiempo." },
  },
  wuerde: {
    label: "würde + Infinitiv para todo lo demás",
    hint: "Verbos normales: machen, arbeiten, kaufen, lernen, fahren, sagen, ausschalten…",
    example: { de: "Ich würde sofort umziehen.", es: "Me mudaría enseguida." },
  },
  trap: {
    wrong: "Wenn ich Zeit haben würde, würde ich kommen.",
    right: "Wenn ich Zeit hätte, würde ich kommen.",
    why: "En la subordinada con wenn también manda la regla: haben tiene forma propia, así que allí va hätte. Y dos würde en la misma frase, aunque se oigan en la calle, se corrigen en el examen: si uno de los dos verbos tiene forma sintética, esa es la que va.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 2 · PASSIV — lo que el español resuelve con «se»
// ─────────────────────────────────────────────────────────────────────────────

export interface PassivRow {
  /** etiqueta del tiempo o del caso */
  tense: string;
  /** la fórmula seca */
  formula: string;
  de: string;
  es: string;
  note?: string;
}

export const passivTable: PassivRow[] = [
  {
    tense: "Präsens",
    formula: "werden (conjugado) + Partizip II",
    de: "Das Formular wird jeden Tag kontrolliert.",
    es: "El formulario se revisa todos los días.",
    note: "werden se conjuga, el participio se queda quieto al final.",
  },
  {
    tense: "Präteritum",
    formula: "wurde + Partizip II",
    de: "Das Haus wurde 1920 gebaut.",
    es: "La casa se construyó en 1920.",
    note: "Es el pasado de la pasiva en textos escritos: prensa, historia, reglamentos.",
  },
  {
    tense: "Perfekt",
    formula: "ist/sind + Partizip II + worden",
    de: "Das Haus ist 1920 gebaut worden.",
    es: "La casa fue construida en 1920.",
    note: "worden, NUNCA geworden. En la pasiva, werden pierde su ge-.",
  },
  {
    tense: "Con Modalverb (Präsens)",
    formula: "Modal + Partizip II + werden",
    de: "Das muss bis Freitag gemacht werden.",
    es: "Eso tiene que estar hecho para el viernes.",
    note: "El final es siempre «Partizip + werden», en ese orden. Desde el español se dice al revés y por eso duele.",
  },
  {
    tense: "Con Modalverb (Präteritum)",
    formula: "musste/sollte/konnte + Partizip II + werden",
    de: "Der Termin musste verschoben werden.",
    es: "La cita tuvo que aplazarse.",
  },
  {
    tense: "En Nebensatz",
    formula: "…, weil + Partizip II + werden/wurde (al final)",
    de: "Ich bin sauer, weil mein Paket nicht geliefert wurde.",
    es: "Estoy enfadado porque mi paquete no se entregó.",
    note: "La subordinada manda el bloque entero al final, sin romperlo.",
  },
  {
    tense: "Zustandspassiv (sein)",
    formula: "sein + Partizip II",
    de: "Die Tür ist geöffnet.",
    es: "La puerta está abierta. (el resultado, no la acción)",
    note: "Contrasta con «Die Tür wird geöffnet» = la puerta se está abriendo. El español «está abierta» empuja a poner ist siempre: ese es el error.",
  },
];

export const passivAgent = {
  title: "¿von o durch? El español dice «por» para las dos",
  von: {
    label: "von + Dativ · quién lo hace (persona, institución, fuerza con voluntad)",
    example: { de: "Der Brief wurde von meiner Chefin geschrieben.", es: "La carta fue escrita por mi jefa." },
  },
  durch: {
    label: "durch + Akkusativ · a través de qué (medio, causa, instrumento)",
    example: { de: "Die Stadt wurde durch ein Erdbeben zerstört.", es: "La ciudad fue destruida por un terremoto." },
  },
  tip: "Truco: si puede firmar el correo, va con von. Si es un fenómeno o un medio, va con durch. Y en la mayoría de las pasivas reales no aparece ningún agente: precisamente por eso se usa la pasiva.",
};

export const passivVsSe = {
  title: "El «se» español tiene TRES salidas en alemán",
  intro:
    "El español resuelve casi todo con «se»: «se habla alemán», «se construyó en 1920», «se abre la puerta». El alemán reparte ese único «se» entre tres construcciones, y el alumno hispanohablante se queda siempre en la del medio (man) sin producir jamás una pasiva — que es contenido evaluable del B1 y el pan de los textos de prensa del examen.",
  options: [
    {
      label: "Passiv · el registro escrito, el del examen",
      de: "Hier wird Deutsch gesprochen.",
      es: "Aquí se habla alemán.",
      when: "Prensa, normas, informes, cualquier texto donde no importe quién actúa.",
    },
    {
      label: "man · la salida ligera, y también válida por escrito",
      de: "Hier spricht man Deutsch.",
      es: "Aquí se habla alemán.",
      when: "Conversación y consejos generales — pero no es «informal»: los reglamentos y las Hausordnungen alemanas lo usan sin problema. man es sujeto: lleva verbo en 3ª del singular.",
    },
    {
      label: "sich + verbo · SOLO cuando algo se hace solo",
      de: "Die Tür öffnet sich automatisch.",
      es: "La puerta se abre sola.",
      when: "Ojo: «se abre la puerta» (alguien la abre) NO es esto, es «Die Tür wird geöffnet».",
    },
  ],
  tip: "Regla práctica para el Schreiben: la pasiva pertenece a los textos FORMALES e informativos — el comentario del foro de la Aufgabe 2, un mail formal, un reglamento, la prensa. Ahí una o dos pasivas bien puestas suben la banda de Strukturen. En un mail informal a un amigo (Aufgabe 1) no hace falta ninguna, y forzarla suena mal: allí lo natural es el activo o man. Mira los modelos del simulacro — el email a Sofía no lleva pasiva y no le falta nada.",
};

// ─────────────────────────────────────────────────────────────────────────────
// 3 · VERBEN MIT PRÄPOSITION — la pestaña más consultada del nivel
//     (infraestructura: misma tabla para consultar y para repasar)
// ─────────────────────────────────────────────────────────────────────────────

export interface RektionVerb {
  /** el verbo CON su preposición: se aprende como bloque, nunca suelto */
  verb: string;
  es: string;
  example: string;
  exampleEs: string;
  /** el calco típico del hispanohablante, si lo hay */
  trap?: string;
}

export interface RektionGroup {
  prep: string;
  kasus: "Akkusativ" | "Dativ";
  /** da-Kompositum del grupo: «de eso», «en eso», «con eso» */
  da: string;
  /** wo-Kompositum del grupo: la pregunta */
  wo: string;
  hint: string;
  verbs: RektionVerb[];
}

export const rektionGroups: RektionGroup[] = [
  {
    prep: "an", kasus: "Akkusativ", da: "daran", wo: "woran",
    hint: "Lo que ocupa la cabeza: pensar, recordar, acostumbrarse, creer.",
    verbs: [
      { verb: "denken an + A", es: "pensar en", example: "Ich denke oft an meine Familie.", exampleEs: "Pienso a menudo en mi familia.", trap: "denken in" },
      { verb: "sich erinnern an + A", es: "acordarse de", example: "Erinnerst du dich an den Sommer?", exampleEs: "¿Te acuerdas del verano?", trap: "sich erinnern von" },
      { verb: "sich gewöhnen an + A", es: "acostumbrarse a", example: "Ich gewöhne mich langsam an das Wetter.", exampleEs: "Me voy acostumbrando al tiempo." },
      { verb: "glauben an + A", es: "creer en", example: "Ich glaube an dieses Projekt.", exampleEs: "Creo en este proyecto." },
    ],
  },
  {
    prep: "an", kasus: "Dativ", da: "daran", wo: "woran",
    hint: "Mismo an, otro caso: participar, trabajar en algo, sufrir de algo.",
    verbs: [
      { verb: "teilnehmen an + D", es: "participar en", example: "Ich nehme an einem Kurs teil.", exampleEs: "Participo en un curso.", trap: "teilnehmen in" },
      { verb: "arbeiten an + D", es: "trabajar en (un proyecto)", example: "Wir arbeiten an einer Lösung.", exampleEs: "Estamos trabajando en una solución." },
      { verb: "leiden an + D", es: "padecer (una enfermedad)", example: "Er leidet an einer Allergie.", exampleEs: "Padece una alergia." },
      { verb: "liegen an + D", es: "deberse a", example: "Das liegt am Wetter.", exampleEs: "Eso se debe al tiempo." },
    ],
  },
  {
    prep: "auf", kasus: "Akkusativ", da: "darauf", wo: "worauf",
    hint: "Lo que está por venir: esperar, alegrarse de algo futuro, prepararse.",
    verbs: [
      { verb: "warten auf + A", es: "esperar a", example: "Ich warte auf den Bus.", exampleEs: "Espero el autobús.", trap: "warten für" },
      { verb: "sich freuen auf + A", es: "hacer ilusión (algo futuro)", example: "Ich freue mich auf den Urlaub.", exampleEs: "Me hacen ilusión las vacaciones."},
      { verb: "achten auf + A", es: "prestar atención a, cuidar de", example: "Achte auf deine Gesundheit!", exampleEs: "¡Cuida tu salud!" },
      { verb: "sich vorbereiten auf + A", es: "prepararse para", example: "Ich bereite mich auf die Prüfung vor.", exampleEs: "Me preparo para el examen.", trap: "sich vorbereiten für" },
      { verb: "sich verlassen auf + A", es: "confiar en, contar con", example: "Du kannst dich auf mich verlassen.", exampleEs: "Puedes contar conmigo." },
      { verb: "aufpassen auf + A", es: "vigilar, cuidar", example: "Passt du kurz auf meine Tasche auf?", exampleEs: "¿Me vigilas un momento el bolso?" },
    ],
  },
  {
    prep: "auf", kasus: "Dativ", da: "darauf", wo: "worauf",
    hint: "El auf raro, con Dativ: insistir.",
    verbs: [
      { verb: "bestehen auf + D", es: "insistir en", example: "Ich bestehe auf einer Rückerstattung.", exampleEs: "Insisto en una devolución del dinero." },
    ],
  },
  {
    prep: "über", kasus: "Akkusativ", da: "darüber", wo: "worüber",
    hint: "El tema del que se habla y lo que ya ha pasado.",
    verbs: [
      { verb: "sprechen über + A", es: "hablar de", example: "Wir sprechen über die Zukunft.", exampleEs: "Hablamos del futuro.", trap: "sprechen von (existe, pero es «mencionar»)" },
      { verb: "sich freuen über + A", es: "alegrarse de (algo ya ocurrido)", example: "Ich freue mich über dein Geschenk.", exampleEs: "Me alegro por tu regalo.", trap: "sich freuen für das Geschenk" },
      { verb: "sich ärgern über + A", es: "enfadarse por", example: "Ich ärgere mich über den Lärm.", exampleEs: "Me enfada el ruido." },
      { verb: "sich beschweren über + A", es: "quejarse de", example: "Ich möchte mich über die Lieferung beschweren.", exampleEs: "Quiero quejarme del envío." },
      { verb: "nachdenken über + A", es: "reflexionar sobre", example: "Ich denke über deinen Vorschlag nach.", exampleEs: "Estoy pensando en tu propuesta." },
      { verb: "sich informieren über + A", es: "informarse sobre", example: "Informieren Sie sich über die Kosten.", exampleEs: "Infórmese sobre los costes." },
      { verb: "diskutieren über + A", es: "debatir sobre", example: "In Deutschland wird über ein Tempolimit diskutiert.", exampleEs: "En Alemania se debate sobre un límite de velocidad." },
    ],
  },
  {
    prep: "für", kasus: "Akkusativ", da: "dafür", wo: "wofür",
    hint: "A favor de, a cambio de, en beneficio de.",
    verbs: [
      { verb: "sich interessieren für + A", es: "interesarse por", example: "Ich interessiere mich für Geschichte.", exampleEs: "Me intereso por la historia.", trap: "sich interessieren an" },
      { verb: "sich entscheiden für + A", es: "decidirse por", example: "Wir haben uns für die kleine Wohnung entschieden.", exampleEs: "Nos hemos decidido por el piso pequeño." },
      { verb: "sorgen für + A", es: "encargarse de", example: "Ich sorge für die Getränke.", exampleEs: "Yo me encargo de las bebidas." },
      { verb: "sich bedanken für + A", es: "dar las gracias por", example: "Ich bedanke mich für Ihre Hilfe.", exampleEs: "Le agradezco su ayuda." },
      { verb: "halten für + A", es: "considerar, tener por", example: "Ich halte das für eine gute Idee.", exampleEs: "Me parece una buena idea." },
    ],
  },
  {
    prep: "um", kasus: "Akkusativ", da: "darum", wo: "worum",
    hint: "Lo que uno pide y aquello de lo que se ocupa.",
    verbs: [
      { verb: "sich kümmern um + A", es: "ocuparse de", example: "Ich kümmere mich um die Kinder.", exampleEs: "Me ocupo de los niños." },
      { verb: "bitten um + A", es: "pedir (algo)", example: "Ich bitte Sie um eine schnelle Antwort.", exampleEs: "Le pido una respuesta rápida.", trap: "fragen für" },
      { verb: "sich bewerben um + A", es: "solicitar (un puesto)", example: "Ich bewerbe mich um die Stelle.", exampleEs: "Solicito el puesto." },
      { verb: "es geht um + A", es: "se trata de", example: "In dem Text geht es um Umweltschutz.", exampleEs: "El texto trata de la protección del medio ambiente." },
    ],
  },
  {
    prep: "von", kasus: "Dativ", da: "davon", wo: "wovon",
    hint: "Origen, dependencia y opinión.",
    verbs: [
      { verb: "abhängen von + D", es: "depender de", example: "Das hängt vom Wetter ab.", exampleEs: "Eso depende del tiempo." },
      { verb: "träumen von + D", es: "soñar con", example: "Ich träume von einer eigenen Werkstatt.", exampleEs: "Sueño con un taller propio.", trap: "träumen mit" },
      { verb: "halten von + D", es: "opinar de", example: "Was hältst du von diesem Plan?", exampleEs: "¿Qué opinas de este plan?" },
      { verb: "sich verabschieden von + D", es: "despedirse de", example: "Ich verabschiede mich von meinen Kollegen.", exampleEs: "Me despido de mis compañeros." },
    ],
  },
  {
    prep: "mit", kasus: "Dativ", da: "damit", wo: "womit",
    hint: "Compañía, herramienta y aquello con lo que uno se ocupa o cuenta.",
    verbs: [
      { verb: "sich beschäftigen mit + D", es: "ocuparse de, dedicarse a", example: "Ich beschäftige mich mit dem Thema seit einem Jahr.", exampleEs: "Llevo un año con este tema." },
      { verb: "rechnen mit + D", es: "contar con (esperar)", example: "Damit habe ich nicht gerechnet.", exampleEs: "Con eso no contaba." },
      { verb: "aufhören mit + D", es: "dejar de", example: "Er hat mit dem Rauchen aufgehört.", exampleEs: "Ha dejado de fumar." },
      { verb: "anfangen mit + D", es: "empezar con", example: "Wir fangen mit der Grammatik an.", exampleEs: "Empezamos con la gramática." },
    ],
  },
  {
    prep: "nach", kasus: "Dativ", da: "danach", wo: "wonach",
    hint: "Preguntar e interesarse por algo que falta.",
    verbs: [
      { verb: "fragen nach + D", es: "preguntar por", example: "Er hat nach dir gefragt.", exampleEs: "Preguntó por ti.", trap: "fragen für" },
      { verb: "sich erkundigen nach + D", es: "informarse de (preguntando)", example: "Ich erkundige mich nach den Preisen.", exampleEs: "Me informo de los precios." },
      { verb: "suchen nach + D", es: "buscar (con esfuerzo)", example: "Ich suche nach einer besseren Lösung.", exampleEs: "Busco una solución mejor." },
    ],
  },
  {
    prep: "zu", kasus: "Dativ", da: "dazu", wo: "wozu",
    hint: "Pertenencia, resultado e invitación.",
    verbs: [
      { verb: "gehören zu + D", es: "formar parte de", example: "Das gehört zu meinen Aufgaben.", exampleEs: "Eso forma parte de mis tareas." },
      { verb: "führen zu + D", es: "llevar a (como consecuencia)", example: "Ein Tempolimit führt zu weniger Unfällen.", exampleEs: "Un límite de velocidad lleva a menos accidentes." },
      { verb: "einladen zu + D", es: "invitar a", example: "Ich lade dich zu meiner Party ein.", exampleEs: "Te invito a mi fiesta." },
    ],
  },
  {
    prep: "bei", kasus: "Dativ", da: "dabei", wo: "wobei",
    hint: "Ante quién: la empresa, la persona a la que te diriges. EXCEPCIÓN a da-/wo-: sich bewerben bei y sich entschuldigen bei piden PERSONA o institución, y con personas da-/wo- no valen — se pregunta bei wem? y se responde bei ihm / bei ihr, nunca *wobei ni *dabei. Solo helfen bei lleva cosa (bei den Hausaufgaben), y ahí sí: Wobei kann ich dir helfen? · Dabei helfe ich dir gern.",
    verbs: [
      { verb: "sich bewerben bei + D", es: "presentar candidatura en (una empresa)", example: "Ich bewerbe mich bei einer kleinen Firma.", exampleEs: "Me presento en una empresa pequeña." },
      { verb: "sich entschuldigen bei + D", es: "disculparse ante (alguien)", example: "Ich entschuldige mich bei meiner Nachbarin.", exampleEs: "Me disculpo ante mi vecina.", trap: "sich entschuldigen mit" },
      { verb: "helfen bei + D", es: "ayudar con (una tarea)", example: "Kannst du mir bei den Hausaufgaben helfen?", exampleEs: "¿Me ayudas con los deberes?" },
    ],
  },
  {
    prep: "vor", kasus: "Dativ", da: "davor", wo: "wovor",
    hint: "El miedo y la advertencia.",
    verbs: [
      { verb: "Angst haben vor + D", es: "tener miedo a", example: "Ich habe Angst vor der Prüfung.", exampleEs: "Tengo miedo del examen.", trap: "Angst haben von" },
      { verb: "sich fürchten vor + D", es: "temer", example: "Sie fürchtet sich vor Hunden.", exampleEs: "Le tiene miedo a los perros." },
      { verb: "warnen vor + D", es: "advertir de", example: "Der Arzt warnt vor zu viel Sitzen.", exampleEs: "El médico advierte de estar demasiado sentado." },
    ],
  },
  {
    prep: "gegen", kasus: "Akkusativ", da: "dagegen", wo: "wogegen",
    hint: "La oposición — y dagegen/dafür son literalmente la respuesta del examen.",
    verbs: [
      { verb: "protestieren gegen + A", es: "protestar contra", example: "Die Leute protestieren gegen die neuen Preise.", exampleEs: "La gente protesta contra los nuevos precios." },
      { verb: "sich wehren gegen + A", es: "defenderse de", example: "Er wehrt sich gegen die Kritik.", exampleEs: "Se defiende de las críticas." },
      { verb: "sein gegen + A", es: "estar en contra de", example: "Ich bin gegen ein Handyverbot.", exampleEs: "Estoy en contra de prohibir el móvil." },
    ],
  },
];

/** El total de la tabla, plano — lo que consume el repaso de rección */
export const rektionVerbs: (RektionVerb & { prep: string; kasus: "Akkusativ" | "Dativ" })[] =
  rektionGroups.flatMap((g) => g.verbs.map((v) => ({ ...v, prep: g.prep, kasus: g.kasus })));

export const daWoRule = {
  title: "da- y wo-: el atajo que el español no tiene",
  body:
    "Cuando lo que sigue a la preposición es una COSA (no una persona), el alemán no dice «über es» ni «auf das»: funde preposición y pronombre en una sola palabra. Para responder, da- (darüber, darauf, davon). Para preguntar, wo- (worüber, worauf, wovon). Si la preposición empieza por vocal, se mete una r de enlace: da+r+auf, wo+r+über.",
  examples: [
    { de: "Ich freue mich darüber.", es: "Me alegro de ello." },
    { de: "Worauf wartest du?", es: "¿Qué esperas? / ¿A qué esperas?" },
    { de: "Woran denkst du?", es: "¿En qué piensas?" },
    { de: "Ich freue mich darauf, dass du kommst.", es: "Me hace ilusión que vengas. (da- anticipador: anuncia la subordinada que viene)" },
    { de: "Ich bin dafür. / Ich bin dagegen.", es: "Estoy a favor. / Estoy en contra." },
  ],
  people: {
    label: "Con PERSONAS no vale da-/wo-",
    de: "An wen denkst du? – Ich denke an ihn.",
    es: "¿En quién piensas? – Pienso en él. (preposición + pronombre, por separado)",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 4 · KONNEKTOREN — la trampa nº 1 del B1 escrito
// ─────────────────────────────────────────────────────────────────────────────

/** qué le hace el conector al verbo de SU frase */
export type KonnEffect = "final" | "inversion" | "nada" | "infinitiv" | "jedesto";

export const KONN_EFFECT_LABEL: Record<KonnEffect, string> = {
  final: "verbo AL FINAL (conjunción subordinante)",
  inversion: "INVERSIÓN: el bloque ocupa la posición 1 y el verbo va justo detrás",
  nada: "no toca nada: el verbo sigue en 2ª posición (conjunción coordinante)",
  infinitiv: "cierra con zu + Infinitiv al final",
  jedesto: "DOS mitades: en la de je, verbo AL FINAL · en la de desto, INVERSIÓN",
};

export interface Konnektor {
  de: string;
  es: string;
  effect: KonnEffect;
  example: string;
  exampleEs: string;
  /** el calco típico del hispanohablante */
  trap?: string;
}

export interface KonnGroup {
  fn: string;
  hint: string;
  items: Konnektor[];
}

export const konnektoren: KonnGroup[] = [
  {
    fn: "Causa · por qué",
    hint: "Tres familias con el mismo significado y tres sintaxis distintas: ahí se pierden los puntos. Y una cuarta cosa que no es conector: wegen no es conjunción sino PREPOSICIÓN + Genitiv — introduce un bloque nominal (sin verbo propio) que ocupa la posición 1, así que el verbo va inmediatamente detrás.",
    items: [
      { de: "weil", es: "porque", effect: "final", example: "Ich bleibe zu Hause, weil ich krank bin.", exampleEs: "Me quedo en casa porque estoy enfermo.", trap: "weil ich bin krank" },
      { de: "da", es: "como, dado que", effect: "final", example: "Da es regnet, nehmen wir den Bus.", exampleEs: "Como llueve, cogemos el bus." },
      { de: "denn", es: "pues, porque", effect: "nada", example: "Ich bleibe zu Hause, denn ich bin krank.", exampleEs: "Me quedo en casa, pues estoy enfermo." },
      { de: "deshalb", es: "por eso", effect: "inversion", example: "Ich bin krank, deshalb bleibe ich zu Hause.", exampleEs: "Estoy enfermo, por eso me quedo en casa.", trap: "deshalb ich bleibe" },
      { de: "deswegen", es: "por eso", effect: "inversion", example: "Es regnet, deswegen fahren wir nicht.", exampleEs: "Llueve, por eso no vamos." },
      { de: "darum", es: "por eso", effect: "inversion", example: "Der Zug fiel aus, darum kam ich zu spät.", exampleEs: "Se canceló el tren, por eso llegué tarde." },
      // NO es conjunción: preposición + Genitiv. El sintagma ocupa la posición 1
      // y el verbo va justo detrás, igual que tras deshalb → effect "inversion".
      { de: "wegen + Genitiv", es: "a causa de (preposición, no conjunción)", effect: "inversion", example: "Wegen des Regens bleiben wir zu Hause.", exampleEs: "A causa de la lluvia nos quedamos en casa.", trap: "Wegen des Regens wir bleiben zu Hause." },
    ],
  },
  {
    fn: "Consecuencia · y entonces qué",
    hint: "El resultado. Con also y folglich el verbo salta delante del sujeto.",
    items: [
      { de: "also", es: "así que, por lo tanto", effect: "inversion", example: "Der Laden hat zu, also gehen wir morgen.", exampleEs: "La tienda está cerrada, así que vamos mañana.", trap: "confundir also (conclusivo) con dann (temporal)" },
      { de: "folglich", es: "por consiguiente", effect: "inversion", example: "Er kam nicht, folglich haben wir ohne ihn angefangen.", exampleEs: "No vino, por consiguiente empezamos sin él." },
      { de: "so dass / sodass", es: "de modo que", effect: "final", example: "Es regnete stark, sodass wir zu Hause blieben.", exampleEs: "Llovía fuerte, de modo que nos quedamos en casa." },
    ],
  },
  {
    fn: "Concesión · a pesar de",
    hint: "obwohl y trotzdem significan casi lo mismo y hacen cosas opuestas con el verbo. Es LA confusión del nivel. Y trotz no es ninguno de los dos: es PREPOSICIÓN + Genitiv, un bloque nominal sin verbo propio que ocupa la posición 1 y empuja el verbo justo detrás. Aviso para no aprender de más: jedoch y allerdings son los flexibles del grupo — la etiqueta de abajo describe su uso más frecuente (posición 1 + inversión), pero también son correctos dentro de la frase (Sie ist allerdings teuer) y, jedoch, delante del sujeto sin invertir (jedoch ich kann nichts machen). Que un texto los use así NO es un error.",
    items: [
      { de: "obwohl", es: "aunque", effect: "final", example: "Obwohl ich müde bin, gehe ich laufen.", exampleEs: "Aunque estoy cansado, salgo a correr.", trap: "obwohl ich bin müde" },
      { de: "trotzdem", es: "aun así, sin embargo", effect: "inversion", example: "Ich bin müde. Trotzdem gehe ich laufen.", exampleEs: "Estoy cansado. Aun así salgo a correr.", trap: "trotzdem ich gehe laufen" },
      { de: "dennoch", es: "no obstante", effect: "inversion", example: "Es war teuer, dennoch haben wir es gekauft.", exampleEs: "Era caro, no obstante lo compramos." },
      { de: "allerdings", es: "eso sí, sin embargo", effect: "inversion", example: "Die Wohnung ist schön, allerdings ist sie teuer.", exampleEs: "El piso es bonito, eso sí, es caro." },
      { de: "jedoch", es: "sin embargo", effect: "inversion", example: "Ich verstehe Sie, jedoch kann ich nichts machen.", exampleEs: "Le entiendo, sin embargo no puedo hacer nada." },
      // Igual que wegen: preposición + Genitiv, no conjunción → posición 1 + verbo.
      { de: "trotz + Genitiv", es: "a pesar de (preposición, no conjunción)", effect: "inversion", example: "Trotz des Regens feiern wir draußen.", exampleEs: "A pesar de la lluvia celebramos fuera.", trap: "Trotz des Regens wir feiern draußen." },
    ],
  },
  {
    fn: "Condición · si",
    hint: "wenn para lo posible y lo repetido; falls para lo poco probable; sonst para la amenaza.",
    items: [
      { de: "wenn", es: "si, cuando", effect: "final", example: "Wenn ich Zeit habe, komme ich vorbei.", exampleEs: "Si tengo tiempo, me paso.", trap: "Wenn ich Zeit habe, ich komme" },
      { de: "falls", es: "en caso de que", effect: "final", example: "Falls es Probleme gibt, rufen Sie mich an.", exampleEs: "En caso de que haya problemas, llámeme.", trap: "Falls es gibt Probleme" },
      { de: "sonst", es: "si no, de lo contrario", effect: "inversion", example: "Beeil dich, sonst verpassen wir den Zug.", exampleEs: "Date prisa, si no perdemos el tren." },
      { de: "es sei denn", es: "a no ser que", effect: "nada", example: "Wir kommen, es sei denn, es regnet.", exampleEs: "Vamos, a no ser que llueva." },
    ],
  },
  {
    fn: "Finalidad · para qué",
    hint: "La decisión es UNA: ¿los dos verbos tienen el mismo sujeto o no?",
    items: [
      { de: "um … zu", es: "para (mismo sujeto)", effect: "infinitiv", example: "Ich lerne Deutsch, um in Berlin zu arbeiten.", exampleEs: "Estudio alemán para trabajar en Berlín.", trap: "um dass ich arbeite" },
      { de: "damit", es: "para que (sujetos distintos)", effect: "final", example: "Ich erkläre es langsam, damit alle es verstehen.", exampleEs: "Lo explico despacio para que todos lo entiendan.", trap: "für dass alle es verstehen" },
      { de: "zum + Nominalisierung", es: "para (sustantivado)", effect: "nada", example: "Ich brauche das Buch zum Lernen.", exampleEs: "Necesito el libro para estudiar." },
    ],
  },
  {
    fn: "Tiempo · cuándo",
    hint: "als es UNA vez en el pasado; wenn es siempre o en el futuro; nachdem exige un tiempo anterior.",
    items: [
      { de: "als", es: "cuando (una vez, en pasado)", effect: "final", example: "Als ich klein war, wohnte ich am Meer.", exampleEs: "Cuando era pequeño vivía junto al mar.", trap: "usar wenn para un hecho único del pasado" },
      { de: "wenn", es: "cuando (repetido o futuro)", effect: "final", example: "Wenn ich nach Hause komme, koche ich.", exampleEs: "Cuando llego a casa, cocino." },
      { de: "während", es: "mientras", effect: "final", example: "Während ich koche, höre ich Musik.", exampleEs: "Mientras cocino escucho música." },
      { de: "bevor", es: "antes de que", effect: "final", example: "Bevor du gehst, ruf mich an.", exampleEs: "Antes de irte, llámame." },
      { de: "nachdem", es: "después de que", effect: "final", example: "Nachdem ich gegessen hatte, ging ich spazieren.", exampleEs: "Después de comer, salí a pasear.", trap: "Nachdem ich gegessen habe, ging ich" },
      { de: "seitdem", es: "desde que", effect: "final", example: "Seitdem ich hier wohne, fahre ich Rad.", exampleEs: "Desde que vivo aquí, voy en bici." },
      { de: "sobald", es: "en cuanto", effect: "final", example: "Sobald ich fertig bin, melde ich mich.", exampleEs: "En cuanto termine, te aviso." },
      { de: "danach", es: "después", effect: "inversion", example: "Zuerst esse ich, danach lerne ich.", exampleEs: "Primero como, después estudio." },
    ],
  },
  {
    fn: "Adición y contraste · el pegamento del texto",
    hint: "Los que suben la nota de Kohärenz en el Schreiben — y los que más se calcan mal del español.",
    items: [
      { de: "außerdem", es: "además", effect: "inversion", example: "Die Wohnung ist klein, außerdem ist sie teuer.", exampleEs: "El piso es pequeño, además es caro.", trap: "außerdem sie ist teuer" },
      { de: "einerseits … andererseits", es: "por un lado… por otro", effect: "inversion", example: "Einerseits verbindet uns das Netz, andererseits macht es einsam.", exampleEs: "Por un lado la red nos une, por otro aísla.", trap: "andererseits es macht einsam (sin invertir)" },
      { de: "auf der einen Seite … auf der anderen Seite", es: "por una parte… por otra parte", effect: "inversion", example: "Auf der einen Seite ist ein Auto praktisch, auf der anderen Seite ist es teuer.", exampleEs: "Por una parte un coche es práctico, por otra parte es caro. — Variante perfectamente alemana de einerseits … andererseits, no un calco del español: el bloque ocupa la posición 1 y el verbo va detrás.", trap: "auf der anderen Seite es ist teuer (sin invertir)" },
      { de: "aber", es: "pero", effect: "nada", example: "Ich wollte kommen, aber ich hatte keine Zeit.", exampleEs: "Quería venir, pero no tuve tiempo." },
      { de: "sondern", es: "sino", effect: "nada", example: "Das ist kein Problem, sondern eine Chance.", exampleEs: "Eso no es un problema, sino una oportunidad.", trap: "usar aber después de una negación" },
      { de: "zwar … aber", es: "es cierto que… pero", effect: "nada", example: "Das ist zwar teuer, aber es lohnt sich.", exampleEs: "Es cierto que es caro, pero merece la pena." },
      { de: "je … desto", es: "cuanto más… más (dos mitades, dos órdenes)", effect: "jedesto", example: "Je mehr ich lerne, desto besser verstehe ich.", exampleEs: "Cuanto más estudio, mejor entiendo. — La mitad de je es subordinada: el verbo cae AL FINAL (je mehr ich lerne). La mitad de desto abre la frase principal: desto + comparativo + VERBO + sujeto (desto besser verstehe ich).", trap: "Je mehr ich lerne, desto ich verstehe besser." },
      { de: "das heißt", es: "es decir", effect: "nada", example: "Ich arbeite in Schichten, das heißt, ich schlafe unregelmäßig.", exampleEs: "Trabajo por turnos, es decir, duermo de forma irregular." },
      { de: "meiner Meinung nach", es: "en mi opinión", effect: "inversion", example: "Meiner Meinung nach überwiegen die Vorteile.", exampleEs: "En mi opinión pesan más las ventajas.", trap: "in meiner Meinung" },
    ],
  },
];

export const konnektorenRule = {
  title: "La regla que decide la nota del Schreiben",
  body:
    "El español usa «por eso» y «aunque» sin ninguna consecuencia sintáctica, así que el alumno trata igual a weil y a deshalb. El alemán los reparte en tres familias: las conjunciones subordinantes (weil, obwohl, da, wenn, damit…) mandan el verbo AL FINAL; los adverbios conectores (deshalb, trotzdem, außerdem, danach, also…) ocupan la posición 1 y obligan a INVERTIR (conector + verbo + sujeto); y las coordinantes (und, aber, oder, denn, sondern) no tocan nada. Antes de escribir cada frase larga, decide de qué familia es tu conector: ahí está la mitad de los errores de Strukturen.",
};

// ─────────────────────────────────────────────────────────────────────────────
// 5 · ADJEKTIVDEKLINATION — las tres tablas
// ─────────────────────────────────────────────────────────────────────────────

export interface DeklTable {
  id: "schwach" | "gemischt" | "stark";
  title: string;
  subtitle: string;
  /** cabeceras: caso + los cuatro géneros */
  head: string[];
  rows: string[][];
  tip: string;
}

export const adjektivTables: DeklTable[] = [
  {
    id: "schwach",
    title: "Tras der/die/das (declinación débil)",
    subtitle: "También tras dieser, jeder, welcher, alle. El artículo ya dice el caso, así que el adjetivo se relaja.",
    head: ["", "masculino", "femenino", "neutro", "plural"],
    rows: [
      ["Nominativ", "der alte Mann", "die alte Frau", "das alte Haus", "die alten Leute"],
      ["Akkusativ", "den alten Mann", "die alte Frau", "das alte Haus", "die alten Leute"],
      ["Dativ", "dem alten Mann", "der alten Frau", "dem alten Haus", "den alten Leuten"],
      ["Genitiv", "des alten Mannes", "der alten Frau", "des alten Hauses", "der alten Leute"],
    ],
    tip: "Solo hay dos terminaciones posibles: -e y -en. Las cinco casillas de arriba a la izquierda llevan -e; TODO lo demás, -en.",
  },
  {
    id: "gemischt",
    title: "Tras ein/kein/mein (declinación mixta)",
    subtitle: "Tras los artículos indeterminados y los posesivos.",
    head: ["", "masculino", "femenino", "neutro", "plural"],
    rows: [
      ["Nominativ", "ein alter Mann", "eine alte Frau", "ein altes Haus", "keine alten Leute"],
      ["Akkusativ", "einen alten Mann", "eine alte Frau", "ein altes Haus", "keine alten Leute"],
      ["Dativ", "einem alten Mann", "einer alten Frau", "einem alten Haus", "keinen alten Leuten"],
      ["Genitiv", "eines alten Mannes", "einer alten Frau", "eines alten Hauses", "keiner alten Leute"],
    ],
    tip: "Igual que la débil, salvo en las tres casillas donde ein no marca el género: ahí el adjetivo tiene que hacerlo él — alter Mann, altes Haus (y en Akkusativ neutro, altes otra vez).",
  },
  {
    id: "stark",
    title: "Sin artículo (declinación fuerte)",
    subtitle: "Con incontables, plurales sueltos, cantidades: guter Wein, viele nette Leute, mit frischer Milch.",
    head: ["", "masculino", "femenino", "neutro", "plural"],
    rows: [
      ["Nominativ", "guter Wein", "frische Milch", "kaltes Wasser", "nette Leute"],
      ["Akkusativ", "guten Wein", "frische Milch", "kaltes Wasser", "nette Leute"],
      ["Dativ", "gutem Wein", "frischer Milch", "kaltem Wasser", "netten Leuten"],
      ["Genitiv", "guten Weines", "frischer Milch", "kalten Wassers", "netter Leute"],
    ],
    tip: "Si no hay artículo, el adjetivo hace su trabajo: se pone la terminación que llevaría el artículo (der → -er, das → -es, dem → -em, der(f. Dat) → -er).",
  },
];

export const adjektivRule = {
  title: "La regla práctica: ¿quién marca el caso?",
  body:
    "Solo hay UNA pregunta que responder: ¿el artículo ya dice el caso y el género? Si sí (der, dem, dieser…), el adjetivo se conforma con -e o -en. Si no hay artículo, el adjetivo asume el trabajo y copia la terminación del artículo que falta. Y ein/kein/mein están a medias: en las tres casillas donde ein no marca nada (Nominativ masculino, Nominativ y Akkusativ neutro), el adjetivo carga con la señal.",
  survival:
    "Salida segura para el examen: en 80 palabras, cada adjetivo antepuesto es una apuesta. Si dudas, ponlo detrás del verbo — «Der Vorschlag ist besser» no se declina y no falla. Reserva los adjetivos antepuestos para dos o tres frases donde quieras lucirte: la variedad puntúa, el error resta.",
  extras: [
    { de: "der bessere Vorschlag", es: "la propuesta mejor (comparativo antepuesto: también se declina)" },
    { de: "ein gut bezahlter Job", es: "un trabajo bien pagado (participio II como adjetivo)" },
    { de: "die steigenden Preise", es: "los precios que suben (participio I: el español lo dice con una relativa)" },
    { de: "die meisten Leute", es: "la mayoría de la gente" },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 6 · FALSOS AMIGOS Y TRAMPAS DEL HISPANOHABLANTE (PLAN-B1 §6)
// ─────────────────────────────────────────────────────────────────────────────

export interface FalseFriend {
  de: string;
  /** lo que significa DE VERDAD */
  means: string;
  /** lo que el hispanohablante cree que significa */
  sounds: string;
  /** cómo se dice de verdad lo que el hispanohablante quería decir */
  instead: string;
  example: string;
  exampleEs: string;
}

export const falseFriendsB1: FalseFriend[] = [
  { de: "eventuell", means: "posiblemente, quizá", sounds: "eventualmente, finalmente", instead: "schließlich (finalmente)", example: "Eventuell komme ich später.", exampleEs: "Quizá vaya más tarde." },
  { de: "sensibel", means: "sensible (emocionalmente)", sounds: "sensato", instead: "vernünftig (sensato)", example: "Sie ist ein sehr sensibler Mensch.", exampleEs: "Es una persona muy sensible." },
  { de: "konsequent", means: "coherente, constante", sounds: "en consecuencia", instead: "folglich (en consecuencia)", example: "Er lernt konsequent jeden Tag.", exampleEs: "Estudia con constancia todos los días." },
  { de: "die Konkurrenz", means: "la competencia (rival)", sounds: "concurrencia", instead: "der Andrang (afluencia)", example: "Die Konkurrenz ist günstiger.", exampleEs: "La competencia es más barata." },
  { de: "der Kompromiss", means: "el acuerdo, la transacción", sounds: "compromiso (obligación)", instead: "die Verpflichtung (compromiso)", example: "Wir haben einen Kompromiss gefunden.", exampleEs: "Hemos llegado a un acuerdo." },
  { de: "der Termin", means: "la cita concertada, la fecha", sounds: "término", instead: "der Begriff (término)", example: "Ich habe morgen einen Termin beim Arzt.", exampleEs: "Mañana tengo cita en el médico." },
  { de: "seriös", means: "fiable, respetable", sounds: "serio (sin bromas)", instead: "ernst (serio)", example: "Das ist ein seriöses Angebot.", exampleEs: "Es una oferta fiable." },
  { de: "realisieren", means: "darse cuenta; llevar a cabo", sounds: "realizar (hacer)", instead: "machen, durchführen", example: "Ich habe erst später realisiert, was passiert war.", exampleEs: "Solo después me di cuenta de lo que había pasado." },
  { de: "der Chef", means: "el jefe", sounds: "chef, cocinero", instead: "der Koch (cocinero)", example: "Mein Chef ist heute nicht da.", exampleEs: "Mi jefe hoy no está." },
  { de: "das Gymnasium", means: "el instituto (secundaria)", sounds: "gimnasio", instead: "die Turnhalle, das Fitnessstudio", example: "Meine Tochter geht aufs Gymnasium.", exampleEs: "Mi hija va al instituto." },
  { de: "bekommen", means: "recibir", sounds: "llegar a ser", instead: "werden (llegar a ser)", example: "Ich habe eine Nachricht bekommen.", exampleEs: "He recibido un mensaje." },
  { de: "die Rente", means: "la pensión (jubilación)", sounds: "renta", instead: "das Einkommen (renta, ingresos)", example: "Sie geht nächstes Jahr in Rente.", exampleEs: "El año que viene se jubila." },
  { de: "ordinär", means: "vulgar, grosero", sounds: "ordinario, común", instead: "gewöhnlich (común)", example: "Der Witz war ziemlich ordinär.", exampleEs: "El chiste fue bastante vulgar." },
  { de: "brav", means: "obediente, formal", sounds: "bravo, valiente", instead: "mutig (valiente)", example: "Die Kinder waren heute sehr brav.", exampleEs: "Los niños se portaron muy bien hoy." },
  { de: "die Notiz", means: "la nota, el apunte", sounds: "noticia", instead: "die Nachricht (noticia)", example: "Ich mache mir eine Notiz.", exampleEs: "Tomo una nota." },
  { de: "das Praktikum", means: "las prácticas", sounds: "práctica (costumbre)", instead: "die Übung, die Praxis", example: "Ich mache ein Praktikum im Krankenhaus.", exampleEs: "Hago prácticas en el hospital." },
  { de: "diskutieren", means: "debatir (no reñir)", sounds: "discutir (pelearse)", instead: "streiten (pelearse)", example: "Wir haben lange über das Thema diskutiert.", exampleEs: "Debatimos largo rato sobre el tema." },
  { de: "aktuell", means: "de actualidad, vigente", sounds: "actualmente", instead: "zurzeit, momentan (actualmente)", example: "Das ist die aktuelle Version.", exampleEs: "Esa es la versión vigente." },
];

export interface TrapB1 {
  id: string;
  title: string;
  /** la frase tal y como la escribe el hispanohablante */
  wrong: string;
  /** la forma correcta */
  right: string;
  why: string;
}

/** Las trampas estructurales del §6: cada una vale varias frases mal por texto */
export const trapsB1: TrapB1[] = [
  {
    id: "wuerde-haben",
    title: "würde donde toca la forma sintética",
    wrong: "Ich würde mehr Zeit haben.",
    right: "Ich hätte mehr Zeit.",
    why: "Los frecuentes (haben, sein, können, müssen, sollen, dürfen, wissen, mögen, wollen, gehen, kommen) exigen forma propia. Es el error diagnóstico del B1.",
  },
  {
    id: "wenn-wuerde",
    title: "Doble condicional en la subordinada",
    wrong: "Wenn ich Zeit haben würde, würde ich kommen.",
    right: "Wenn ich Zeit hätte, würde ich kommen.",
    why: "El español dice «si tuviera» (subjuntivo) y el alemán también quiere Konjunktiv II en la subordinada — pero con la forma propia del verbo.",
  },
  {
    id: "se-passiv",
    title: "El «se» español resuelto siempre con man",
    wrong: "Man hat das Haus 1920 gebaut. (en un texto de examen)",
    right: "Das Haus wurde 1920 gebaut.",
    why: "man no es ningún error —es estándar también por escrito, y las Hausordnungen reales lo usan—, pero si TODO tu texto formal lo resuelve con man, no enseñas la pasiva, que es contenido evaluable del nivel. Una o dos pasivas en un texto formal suben la banda de Strukturen; en el mail informal a un amigo no hacen ninguna falta.",
  },
  {
    id: "worden",
    title: "geworden en vez de worden",
    wrong: "Das Haus ist gebaut geworden.",
    right: "Das Haus ist gebaut worden.",
    why: "En la pasiva, el participio de werden pierde el ge-. geworden solo se usa cuando werden significa «llegar a ser».",
  },
  {
    id: "nebensatz-modal",
    title: "El modal fuera del final en la subordinada",
    wrong: "Ich komme nicht, weil ich muss arbeiten.",
    right: "Ich komme nicht, weil ich arbeiten muss.",
    why: "En subordinada, el verbo conjugado va el ÚLTIMO de todos: primero el infinitivo o el participio, después el conjugado.",
  },
  {
    id: "vorfeld",
    title: "Subordinada delante sin invertir la principal",
    wrong: "Wenn ich Zeit habe, ich komme vorbei.",
    right: "Wenn ich Zeit habe, komme ich vorbei.",
    why: "La subordinada antepuesta ocupa la posición 1 entera, así que el verbo de la principal viene inmediatamente después y el sujeto detrás.",
  },
  {
    id: "deshalb",
    title: "deshalb tratado como weil",
    wrong: "Ich bin krank, deshalb ich bleibe zu Hause.",
    right: "Ich bin krank, deshalb bleibe ich zu Hause.",
    why: "deshalb, trotzdem, außerdem, danach y also son ADVERBIOS en posición 1: obligan a inversión. Es la trampa nº 1 del B1 escrito.",
  },
  {
    id: "das-que",
    title: "El «que» universal",
    wrong: "Der Mann, dass gestern angerufen hat, ist mein Nachbar.",
    right: "Der Mann, der gestern angerufen hat, ist mein Nachbar.",
    why: "El español usa «que» para todo; el alemán reparte: dass (completiva), der/die/das (relativa), als (comparativa: mehr als) y wenn/als (temporal).",
  },
  {
    id: "rektion",
    title: "Preposición regida calcada del español",
    wrong: "Ich interessiere mich an Musik.",
    right: "Ich interessiere mich für Musik.",
    why: "La preposición no se traduce: se aprende pegada al verbo, con su caso. Otros clásicos: warten auf (no für), träumen von (no mit), Angst haben vor (no von).",
  },
  {
    id: "freuen",
    title: "sich freuen auf / über / für",
    wrong: "Ich freue mich für das Geschenk.",
    right: "Ich freue mich über das Geschenk.",
    why: "auf + futuro (Ich freue mich auf den Urlaub), über + lo ya ocurrido (über das Geschenk). für solo con personas: Ich freue mich für dich.",
  },
  {
    id: "damit-umzu",
    title: "para que → für dass",
    wrong: "Ich erkläre es langsam, für dass alle es verstehen.",
    right: "Ich erkläre es langsam, damit alle es verstehen.",
    why: "«für dass» no existe. damit si los sujetos son distintos; um … zu si el sujeto es el mismo.",
  },
  {
    id: "seit",
    title: "«Llevo tres años aquí» en Perfekt",
    wrong: "Ich habe hier drei Jahre gewohnt.",
    right: "Ich wohne seit drei Jahren hier.",
    why: "Lo que empezó en el pasado y SIGUE va en presente con seit + Dativ. El Perfekt lo da por terminado.",
  },
  {
    id: "sondern",
    title: "aber después de una negación",
    wrong: "Das ist kein Problem, aber eine Chance.",
    right: "Das ist kein Problem, sondern eine Chance.",
    why: "Tras una negación que se corrige, el alemán exige sondern. aber solo contrapone dos cosas que ambas valen.",
  },
  {
    id: "meinung",
    title: "in meiner Meinung",
    wrong: "In meiner Meinung ist das falsch.",
    right: "Meiner Meinung nach ist das falsch.",
    why: "La fórmula lleva nach POSPUESTO. Alternativa igual de buena: Ich bin der Meinung, dass…",
  },
  {
    id: "nachdem",
    title: "nachdem sin tiempo anterior",
    wrong: "Nachdem ich gegessen habe, ging ich spazieren.",
    right: "Nachdem ich gegessen hatte, ging ich spazieren.",
    why: "nachdem exige un escalón temporal: Plusquamperfekt (hatte gegessen) si la principal está en pasado.",
  },
  {
    id: "genitiv",
    title: "El «de» español para todo",
    wrong: "Das ist das Auto von der Bruder meiner Freundin.",
    right: "Das ist das Auto des Bruders meiner Freundin.",
    why: "En registro escrito el alemán usa Genitiv: des …-s / der … Y las preposiciones wegen, während, trotz, statt, innerhalb también lo piden.",
  },
];
