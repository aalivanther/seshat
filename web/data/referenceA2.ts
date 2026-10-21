// La libreta del NIVEL A2: notas vivas propias — participios con su auxiliar,
// el pasado directo (war/hatte) y los conectores de narración.
// Curado desde a2m1/a2m2 (+ los participios sembrados en phase11 del A1).

export interface ParticipleEntry {
  inf: string; // infinitivo
  partizip: string;
  aux: "haben" | "sein";
  es: string;
  /** grupo didáctico */
  group: "regular" | "irregular" | "sin-ge" | "sein";
}

export const participles: ParticipleEntry[] = [
  // ge—t (regulares)
  { inf: "machen", partizip: "gemacht", aux: "haben", es: "hacer", group: "regular" },
  { inf: "lernen", partizip: "gelernt", aux: "haben", es: "aprender", group: "regular" },
  { inf: "spielen", partizip: "gespielt", aux: "haben", es: "jugar", group: "regular" },
  { inf: "kaufen", partizip: "gekauft", aux: "haben", es: "comprar", group: "regular" },
  { inf: "hören", partizip: "gehört", aux: "haben", es: "escuchar", group: "regular" },
  { inf: "tanzen", partizip: "a2m1getanzt", aux: "haben", es: "bailar", group: "regular" },
  { inf: "arbeiten", partizip: "gearbeitet", aux: "haben", es: "trabajar (-tet: raíz en -t)", group: "regular" },
  { inf: "üben", partizip: "geübt", aux: "haben", es: "practicar", group: "regular" },
  { inf: "faulenzen", partizip: "a2m1gefaulenzt", aux: "haben", es: "flojear", group: "regular" },
  // ge—en (irregulares)
  { inf: "essen", partizip: "gegessen", aux: "haben", es: "comer", group: "irregular" },
  { inf: "trinken", partizip: "getrunken", aux: "haben", es: "beber", group: "irregular" },
  { inf: "sehen", partizip: "gesehen", aux: "haben", es: "ver", group: "irregular" },
  { inf: "lesen", partizip: "gelesen", aux: "haben", es: "leer", group: "irregular" },
  { inf: "schreiben", partizip: "geschrieben", aux: "haben", es: "escribir", group: "irregular" },
  { inf: "schlafen", partizip: "a2m1geschlafen", aux: "haben", es: "dormir", group: "irregular" },
  { inf: "finden", partizip: "a2m1gefunden", aux: "haben", es: "encontrar", group: "irregular" },
  { inf: "einkaufen", partizip: "eingekauft", aux: "haben", es: "hacer la compra (separable: ge en medio)", group: "irregular" },
  { inf: "kennenlernen", partizip: "a2m1kennengelernt", aux: "haben", es: "conocer (a alguien)", group: "irregular" },
  // sin ge- (inseparables y -ieren)
  { inf: "besuchen", partizip: "a2m1besucht", aux: "haben", es: "visitar", group: "sin-ge" },
  { inf: "bezahlen", partizip: "a2m1bezahlt", aux: "haben", es: "pagar", group: "sin-ge" },
  { inf: "bestellen", partizip: "a2m1bestellt", aux: "haben", es: "pedir (en el café)", group: "sin-ge" },
  { inf: "telefonieren", partizip: "a2m1telefoniert", aux: "haben", es: "hablar por teléfono", group: "sin-ge" },
  { inf: "fotografieren", partizip: "a2m1fotografiert", aux: "haben", es: "fotografiar", group: "sin-ge" },
  // con sein (movimiento y cambio de estado)
  { inf: "fahren", partizip: "gefahren", aux: "sein", es: "ir (en vehículo)", group: "sein" },
  { inf: "gehen", partizip: "gegangen", aux: "sein", es: "ir (a pie)", group: "sein" },
  { inf: "fliegen", partizip: "geflogen", aux: "sein", es: "volar", group: "sein" },
  { inf: "kommen", partizip: "gekommen", aux: "sein", es: "venir / llegar", group: "sein" },
  { inf: "reisen", partizip: "gereist", aux: "sein", es: "viajar", group: "sein" },
  { inf: "aufstehen", partizip: "aufgestanden", aux: "sein", es: "levantarse", group: "sein" },
  { inf: "bleiben", partizip: "geblieben", aux: "sein", es: "quedarse (¡excepción sin movimiento!)", group: "sein" },
  { inf: "passieren", partizip: "passiert", aux: "sein", es: "ocurrir (excepción)", group: "sein" },
];

export const GROUP_LABEL: Record<ParticipleEntry["group"], string> = {
  regular: "ge—t · la fábrica regular",
  irregular: "ge—en · los rebeldes",
  "sin-ge": "sin ge- · inseparables y -ieren",
  sein: "con sein · movimiento y cambio",
};

/** el pasado directo: war y hatte (más frecuentes que el Perfekt de sein/haben) */
export const pastTables: { title: string; es: string; rows: [string, string][]; tip: string }[] = [
  {
    title: "sein → war",
    es: "estaba / fui",
    rows: [["ich", "war"], ["du", "warst"], ["er/sie/es", "war"], ["wir", "waren"], ["ihr", "wart"], ["sie/Sie", "waren"]],
    tip: "El alemán real dice «Ich war in Berlin», casi nunca «bin gewesen».",
  },
  {
    title: "haben → hatte",
    es: "tenía / tuve",
    rows: [["ich", "hatte"], ["du", "hattest"], ["er/sie/es", "hatte"], ["wir", "hatten"], ["ihr", "hattet"], ["sie/Sie", "hatten"]],
    tip: "«Wir hatten Hunger» — para estados (hambre, sed, tiempo), war/hatte gana al Perfekt.",
  },
];

/** conectores de narración: el pegamento de contar en pasado */
export const connectors: { de: string; es: string; example: string; exampleEs: string }[] = [
  { de: "zuerst", es: "primero", example: "Zuerst habe ich gefrühstückt.", exampleEs: "Primero desayuné." },
  { de: "dann", es: "luego", example: "Dann bin ich zum Bahnhof gegangen.", exampleEs: "Luego fui a la estación." },
  { de: "danach", es: "después de eso", example: "Danach haben wir Kaffee getrunken.", exampleEs: "Después tomamos café." },
  { de: "später", es: "más tarde", example: "Später habe ich Musik gehört.", exampleEs: "Más tarde escuché música." },
  { de: "am Abend", es: "por la noche", example: "Am Abend war ich müde.", exampleEs: "Por la noche estaba cansada." },
  { de: "gestern", es: "ayer", example: "Gestern habe ich Deutsch gelernt.", exampleEs: "Ayer estudié alemán." },
  { de: "letztes Wochenende", es: "el finde pasado", example: "Letztes Wochenende bin ich ans Meer gefahren.", exampleEs: "El finde pasado fui al mar." },
];

/** Anclas de m3–m10: dativo, Wechsel, weil/dass, comparativo, reflexivos. */
export const a2Anchors: { title: string; es: string; rows: [string, string][]; tip: string }[] = [
  {
    title: "Dativo: a quién",
    es: "schenken, helfen, mit, von",
    rows: [["ich", "mir"], ["du", "dir"], ["er/sie", "ihm/ihr"], ["wir", "uns"], ["ihr", "euch"], ["Sie", "Ihnen"]],
    tip: "Ich schenke Anna die Jacke — la persona (Anna) va en dativo, delante de la cosa.",
  },
  {
    title: "Wechselpräpositionen",
    es: "wo (dativo) / wohin (acusativo)",
    rows: [["Wo?", "in/auf/an + Dativ"], ["Wohin?", "in/auf/an + Akkusativ"], ["Beispiel wo", "Die Lampe steht auf dem Tisch."], ["Beispiel wohin", "Ich stelle die Lampe auf den Tisch."]],
    tip: "Si no hay movimiento hacia, dativo. Si hay destino, acusativo.",
  },
  {
    title: "weil / dass / wenn",
    es: "el verbo al final",
    rows: [["weil", "Ich bleibe, weil ich arbeiten muss."], ["dass", "Ich weiß, dass er kommt."], ["wenn", "Wenn ich Zeit habe, komme ich."]],
    tip: "Tras weil/dass/wenn el verbo conjugado va al final. Deshalb NO: Deshalb bleibe ich.",
  },
  {
    title: "Comparativo",
    es: "als, no wie",
    rows: [["teurer als", "más caro que"], ["so groß wie", "tan grande como"], ["am teuersten", "el más caro"]],
    tip: "als compara distinto; wie iguala. *teurer wie es calco.",
  },
];
