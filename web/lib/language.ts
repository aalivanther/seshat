// Configuración por idioma-objetivo: TODO lo específico del idioma vive aquí.
// Añadir un idioma nuevo = escribir su LanguageConfig + su contenido.

/**
 * Dos maneras de escribir LA MISMA respuesta. No es tolerancia a errores (de eso
 * ya se encarga la cascada de gradeText): es que el idioma tiene dos formas
 * igual de correctas y el alumno no tiene por qué adivinar cuál pusimos nosotros.
 */
export interface LanguageEquivalents {
  /**
   * Contracción → formas plenas que valen por ella. La clave va como la deja
   * clean(): minúsculas y SIN apóstrofo ("dont", "hed").
   * Varias formas plenas cuando la contracción es ambigua: he'd es «he had» y
   * también «he would», y las dos son respuestas correctas.
   */
  contractions: Record<string, string[]>;
  /**
   * Número escrito → su cifra ("sixteen" → "16", "second" → "2nd"). Solo entra
   * en juego cuando la respuesta esperada trae ESA cifra; el porqué, en grade.ts.
   */
  numerals: Record<string, string>;
}

export interface LanguageConfig {
  /** BCP-47 para TTS y atributos lang */
  code: string; // "de-DE"
  htmlLang: string; // "de"
  /** artículos/género válidos en VocabItem.article */
  articles: string[];
  /** regex para separar el artículo inicial de una palabra ("der Hund" → "Hund") */
  articleRegex: RegExp;
  /** los sustantivos van capitalizados (alemán: sí) — el corrector avisa */
  capitalizedNouns: boolean;
  /** plegado target→ASCII legítimo de teclado (ä→ae...); dirección única */
  asciiFold: [RegExp, string][];
  /** diacrítico omitido "a secas" (ä→a) — se acepta con aviso salvo strict */
  diacriticStrip: Record<string, string>;
  /** nombres de voz TTS preferidas (mejor calidad primero) */
  preferredVoices: RegExp;
  /** nombre del idioma en español, para los textos del motor ("alemán") */
  spanishName: string;
  /** qué buscar en ajustes de voz del sistema ("alemán» o «Deutsch") */
  voiceSearch: string;
  /** Qué le pega la contracción al final de una palabra, a efectos de `forbid`
   *  y de cualquier búsqueda de palabra suelta. En inglés «n't», «'s» o «'re»
   *  son parte de LA MISMA palabra —prohibir `do` tiene que impedir `don't`—;
   *  en alemán el apóstrofo es un clítico y `geht's` sigue siendo `geht`, así
   *  que no lleva cola. Fuente de regex, sin flags. */
  contractionTail?: string;
  /** botones de caracteres especiales del teclado de ejercicios ([] = ninguno) */
  specialChars: string[];
  /**
   * Rótulo de ese grupo. Vive en el idioma: un «Caracteres alemanes» fijo
   * se oye también cuando el curso es otro y la lista va vacía.
   */
  specialCharsLabel: string;
  /** elogios de cierre de lección en el idioma: [alto ≥90, medio ≥70, bajo] */
  praise: [string, string, string];
  /** grito de acierto perfecto en un ejercicio ("Sehr gut!" / "Great!") */
  cheer: string;
  /** dos escrituras que son la misma respuesta; sin tabla, no hay equivalencias */
  equivalents?: LanguageEquivalents;
}

export const GERMAN: LanguageConfig = {
  code: "de-DE",
  htmlLang: "de",
  articles: ["der", "die", "das"],
  articleRegex: /^(der|die|das)\s+/i,
  capitalizedNouns: true,
  asciiFold: [
    [/ä/g, "ae"], [/ö/g, "oe"], [/ü/g, "ue"],
    [/Ä/g, "Ae"], [/Ö/g, "Oe"], [/Ü/g, "Ue"],
    [/ß/g, "ss"],
  ],
  diacriticStrip: { "ä": "a", "ö": "o", "ü": "u", "Ä": "A", "Ö": "O", "Ü": "U", "ß": "ss" },
  preferredVoices: /katja|conrad|hedda|seraphina|anna|petra|helena|markus|viktor/i,
  spanishName: "alemán",
  voiceSearch: "«alemán» o «Deutsch»",
  specialChars: ["ä", "ö", "ü", "ß"],
  specialCharsLabel: "Caracteres alemanes",
  praise: ["Ausgezeichnet!", "Gut gemacht!", "Weiter so!"],
  cheer: "¡Sehr gut!",
  // Sin equivalencias a propósito: las contracciones alemanas (im, zum, ans) NO
  // son libres —«in dem Kino» no es lo que se dice— y el examen puntúa la
  // palabra escrita, así que «dreißig» y «30» tienen que seguir siendo
  // respuestas distintas.
};

// ── inglés: contracciones ──
// Clave tal y como la deja clean(): minúsculas, sin apóstrofo. La expansión es
// la forma canónica, así que las tres escrituras convergen: "there isn't",
// "there's not" y "there is not" acaban todas en «there is not».
// Homógrafos (well, ill, hell, shell, shed, wed, its, were): la tabla solo
// AÑADE lecturas, nunca quita, y se aplica a los dos lados por igual — «Well
// done» sigue casando consigo mismo. El único falso positivo posible exige que
// el alumno teclee la expansión absurda ("I feel i will"), que no es un error real.
// Fuera a propósito: ain't, gonna, wanna, y'all (no son respuestas válidas en el
// examen) y los pares que el curso ENSEÑA a distinguir: your/you're, their/they're/there.
const EN_CONTRACTIONS: Record<string, string[]> = {
  // negativas
  dont: ["do not"], doesnt: ["does not"], didnt: ["did not"],
  isnt: ["is not"], arent: ["are not"], wasnt: ["was not"], werent: ["were not"],
  hasnt: ["has not"], havent: ["have not"], hadnt: ["had not"],
  wont: ["will not"], wouldnt: ["would not"], shouldnt: ["should not"],
  couldnt: ["could not"], cant: ["can not"], cannot: ["can not"],
  shant: ["shall not"], mustnt: ["must not"], mightnt: ["might not"],
  neednt: ["need not"],
  // ser/estar y haber
  im: ["i am"], youre: ["you are"], were: ["we are"], theyre: ["they are"],
  hes: ["he is", "he has"], shes: ["she is", "she has"], its: ["it is", "it has"],
  thats: ["that is", "that has"], theres: ["there is", "there has"],
  heres: ["here is"], wheres: ["where is"], whats: ["what is", "what has"],
  whos: ["who is", "who has"], hows: ["how is"], whens: ["when is"], whys: ["why is"],
  ive: ["i have"], youve: ["you have"], weve: ["we have"], theyve: ["they have"],
  // futuro y condicional
  ill: ["i will"], youll: ["you will"], hell: ["he will"], shell: ["she will"],
  itll: ["it will"], well: ["we will"], theyll: ["they will"], thatll: ["that will"],
  id: ["i would", "i had"], youd: ["you would", "you had"],
  hed: ["he would", "he had"], shed: ["she would", "she had"],
  itd: ["it would", "it had"], wed: ["we would", "we had"],
  theyd: ["they would", "they had"],
  // imperativo
  lets: ["let us"],
};

// ── inglés: números ──
// El baremo oficial del B1 acepta «16 / sixteen» y «second / 2nd» en las
// respuestas cortas. Se cubre 0-31 (fechas y horas), las decenas y los
// ordinales; se genera en vez de teclearse porque 120 filas a mano son 120
// erratas en potencia.
const EN_CARDINALS = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
  "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
  "seventeen", "eighteen", "nineteen",
];
const EN_ORDINALS = [
  "zeroth", "first", "second", "third", "fourth", "fifth", "sixth", "seventh",
  "eighth", "ninth", "tenth", "eleventh", "twelfth", "thirteenth", "fourteenth",
  "fifteenth", "sixteenth", "seventeenth", "eighteenth", "nineteenth",
];
const EN_TENS: Record<number, string> = {
  20: "twenty", 30: "thirty", 40: "forty", 50: "fifty",
  60: "sixty", 70: "seventy", 80: "eighty", 90: "ninety",
};
const EN_TENS_ORD: Record<number, string> = {
  20: "twentieth", 30: "thirtieth", 40: "fortieth", 50: "fiftieth",
  60: "sixtieth", 70: "seventieth", 80: "eightieth", 90: "ninetieth",
};

/** 1→st, 2→nd, 3→rd, 11-13→th (la excepción de los adolescentes) */
function enOrdSuffix(n: number): string {
  const t = n % 100;
  if (t >= 11 && t <= 13) return "th";
  return ["th", "st", "nd", "rd"][n % 10] ?? "th";
}

function enNumerals(): Record<string, string> {
  const m: Record<string, string> = {};
  const put = (word: string, digit: string): void => { if (!(word in m)) m[word] = digit; };
  for (let n = 0; n <= 19; n++) {
    put(EN_CARDINALS[n], String(n));
    put(EN_ORDINALS[n], `${n}${enOrdSuffix(n)}`);
  }
  for (const t of [20, 30, 40, 50, 60, 70, 80, 90]) {
    put(EN_TENS[t], String(t));
    put(EN_TENS_ORD[t], `${t}${enOrdSuffix(t)}`);
  }
  // 21-31: con guion y sin él, porque el alumno escribe las dos
  for (let n = 21; n <= 31; n++) {
    const tens = EN_TENS[Math.floor(n / 10) * 10];
    const card = `${tens}-${EN_CARDINALS[n % 10]}`;
    put(card, String(n));
    put(card.replace("-", " "), String(n));
    const ord = `${tens}-${EN_ORDINALS[n % 10]}`;
    put(ord, `${n}${enOrdSuffix(n)}`);
    put(ord.replace("-", " "), `${n}${enOrdSuffix(n)}`);
  }
  put("a hundred", "100");
  put("one hundred", "100");
  return m;
}

export const ENGLISH: LanguageConfig = {
  code: "en-US",
  htmlLang: "en",
  articles: ["the", "a", "an"],
  articleRegex: /^(the|an|a)\s+/i,
  capitalizedNouns: false,
  asciiFold: [], // el inglés no tiene plegado de teclado legítimo
  diacriticStrip: {},
  preferredVoices: /samantha|ava|allison|susan|zira|aria|jenny|guy|david|mark|hazel|libby|daniel|karen|moira|serena/i,
  spanishName: "inglés",
  voiceSearch: "«inglés» o «English»",
  contractionTail: "(?:n?['’][a-z]+)?",
  specialChars: [],
  specialCharsLabel: "Caracteres ingleses",
  praise: ["Excellent!", "Well done!", "Keep going!"],
  cheer: "Great!",
  equivalents: { contractions: EN_CONTRACTIONS, numerals: enNumerals() },
};

// ── config EN JUEGO ──
// El motor (TTS, corrección, palabras nuevas) pregunta SIEMPRE por función,
// nunca captura el config en constantes de módulo: así una lección de inglés
// corrige/pronuncia en inglés y una de alemán en alemán, en la misma sesión.
let current: LanguageConfig = GERMAN;

export function langConfig(): LanguageConfig {
  return current;
}

/** La fijan los puntos de entrada (idioma/nivel/lección) vía languages.adoptLang */
export function setLangConfig(c: LanguageConfig): void {
  current = c;
}
