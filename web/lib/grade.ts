// Corrección tolerante con feedback específico.
// Detecta el TIPO de error para dar consejos útiles en vez de solo "mal".

export interface GradeResult {
  correct: boolean;
  /** acierto con matices (p.ej. faltó Umlaut) — cuenta como correcto pero avisa */
  almost: boolean;
  feedback: string | null;
  expected: string;
}

import { langConfig } from "./language";

// regex derivada del LanguageConfig: con otro idioma pliega SUS diacríticos
// regex derivado del config EN JUEGO (memo por config — cambia con el idioma)
let diacriticFor: unknown = null;
let diacriticRe: RegExp | null = null;
function DIACRITIC(): RegExp | null {
  const cfg = langConfig();
  if (diacriticFor !== cfg) {
    diacriticFor = cfg;
    const keys = Object.keys(cfg.diacriticStrip).join("");
    diacriticRe = keys ? new RegExp(`[${keys}]`, "g") : null;
  }
  return diacriticRe;
}

/** normaliza diacríticos del idioma a formas planas para comparar */
function deUmlaut(s: string): string {
  const re = DIACRITIC();
  return re ? s.replace(re, (c) => langConfig().diacriticStrip[c] ?? c) : s;
}

/**
 * Variante ASCII legítima del target (ä→ae, ö→oe, ü→ue, ß→ss) para comparar
 * contra lo tecleado. Dirección única target→ascii: nunca colapsa "ss" reales
 * (isst ≠ ist).
 */
function asciiFold(s: string): string {
  return langConfig().asciiFold.reduce((acc, [re, rep]) => acc.replace(re, rep), s);
}

// ── equivalencias del idioma ──
// Memo por config (igual que DIACRITIC): cambiar de idioma invalida las tablas.
// Se pasan a Map a propósito: la clave viene del texto del alumno y un Record
// respondería a "constructor" o "toString" con lo que hay en Object.prototype.
interface EquivTables {
  contractions: Map<string, string[]>;
  /** palabra → cifra ("sixteen" → "16") */
  numerals: Map<string, string>;
  /** cifra → palabra canónica; solo para las pistas en vivo, nunca para corregir */
  words: Map<string, string>;
}
let equivFor: unknown = null;
let equivTables: EquivTables | null = null;
function EQUIV(): EquivTables | null {
  const cfg = langConfig();
  if (equivFor !== cfg) {
    equivFor = cfg;
    const eq = cfg.equivalents;
    if (!eq) equivTables = null;
    else {
      const numerals = new Map(Object.entries(eq.numerals));
      const words = new Map<string, string>();
      for (const [word, digit] of numerals) if (!words.has(digit)) words.set(digit, word);
      equivTables = {
        contractions: new Map(Object.entries(eq.contractions)),
        numerals,
        words,
      };
    }
  }
  return equivTables;
}

/** tope de variantes: solo se dispara con frases llenas de contracciones ambiguas */
const MAX_VARIANTS = 16;

/**
 * Formas plenas de una frase ya limpia: "i dont know" → ["i do not know"].
 * Las contracciones ambiguas multiplican la lista (he'd = he had / he would);
 * pasado el tope se queda con la primera lectura, que es la frecuente.
 */
/** Contracciones cuya forma sin apóstrofo es OTRA palabra inglesa de verdad.
 *  `clean()` borra el apóstrofo, así que «we're» y «were» llegan aquí iguales:
 *  sin este freno, tecleando «we are» se daba por buena una respuesta que era
 *  «were» —el pasado de `be`, que es justo la gramática ancla del A2 m1— y lo
 *  mismo con «we will» por «well». Estas solo se expanden si el alumno escribió
 *  el apóstrofo, que es lo único que las distingue. */
const AMBIGUAS = new Set(["were", "well", "hell", "shell", "shed", "id", "wed", "its", "lets", "ill", "hes", "whos"]);

function expandContractions(cleaned: string, conApostrofo = true): string[] {
  const table = EQUIV()?.contractions;
  if (!table) return [cleaned];
  const toks = cleaned.split(" ");
  let out: string[][] = [[]];
  let touched = false;
  for (const tok of toks) {
    const alts = !conApostrofo && AMBIGUAS.has(tok) ? undefined : table.get(tok);
    if (!alts || !alts.length) {
      for (const acc of out) acc.push(tok);
      continue;
    }
    touched = true;
    const use = out.length * alts.length <= MAX_VARIANTS ? alts : [alts[0]];
    if (use.length === 1) {
      const parts = use[0].split(" ");
      for (const acc of out) acc.push(...parts);
      continue;
    }
    const next: string[][] = [];
    for (const acc of out) for (const alt of use) next.push([...acc, ...alt.split(" ")]);
    out = next;
  }
  return touched ? out.map((toksOut) => toksOut.join(" ")) : [cleaned];
}

/** conjunto vacío = «ninguna cifra permitida», o sea: no toques los números */
const NO_DIGITS: Set<string> = new Set();

/** las cifras que aparecen en la respuesta esperada ("the 2nd floor" → {"2nd"}) */
function digitsIn(cleaned: string): Set<string> {
  const out = new Set<string>();
  for (const tok of cleaned.split(" ")) if (/\d/.test(tok)) out.add(tok);
  return out;
}

/**
 * Números escritos → cifra. `allowed` = null significa «todas»; si trae un
 * conjunto, solo se convierten los números que la respuesta esperada escribe
 * con esa cifra exacta.
 */
function numeralize(cleaned: string, allowed: Set<string> | null): string {
  const table = EQUIV()?.numerals;
  if (!table || (allowed && !allowed.size)) return cleaned;
  const toks = cleaned.split(" ");
  const out: string[] = [];
  for (let i = 0; i < toks.length; i++) {
    // el bigrama primero: "twenty one" y "a hundred" son un solo número
    const pair = i + 1 < toks.length ? table.get(`${toks[i]} ${toks[i + 1]}`) : undefined;
    if (pair && (!allowed || allowed.has(pair))) {
      out.push(pair);
      i++;
      continue;
    }
    const one = table.get(toks[i]);
    out.push(one && (!allowed || allowed.has(one)) ? one : toks[i]);
  }
  return out.join(" ");
}

/** formas plenas de una frase, salvo que el ejercicio corrija la escritura exacta */
function forms(cleaned: string, strict: boolean, conApostrofo = true): string[] {
  return strict ? [cleaned] : expandContractions(cleaned, conApostrofo);
}

/**
 * ¿Son la misma respuesta escrita de dos maneras? Ambas cadenas llegan ya
 * limpias. Sin tabla de equivalencias (alemán) esto es una comparación a secas.
 */
function sameAnswer(
  input: string,
  expected: string,
  opts?: GradeOptions,
  inputConApostrofo = true,
  esperadaConApostrofo = true,
): boolean {
  if (input === expected) return true;
  if (!EQUIV()) return false;
  const strict = opts?.strictContractions === true;
  // Por defecto la cifra solo vale cuando la esperada ES la cifra: así el módulo
  // que ENSEÑA a escribir «eleven» sigue rechazando «11», que es justo lo que
  // pide ese ejercicio. En el simulacro el baremo oficial da las dos por buenas
  // en los dos sentidos, y para eso está numeralsEitherWay.
  const both = opts?.numeralsEitherWay === true;
  const allowed = both ? null : digitsIn(expected);
  const inNum = numeralize(input, allowed);
  const exNum = both ? numeralize(expected, null) : expected;
  if (inNum === exNum) return true;
  // El freno vale para los DOS lados: si la respuesta esperada se escribió
  // «were» (sin apóstrofo), no puede expandirse a «we are» y aceptar algo que
  // no es lo que el ejercicio pide.
  const seen = new Set(forms(inNum, strict, inputConApostrofo));
  for (const v of forms(exNum, strict, esperadaConApostrofo)) if (seen.has(v)) return true;
  return false;
}

/** forma canónica única, para medir distancias sin que la contracción cuente como typo */
function canonicalForm(cleaned: string, allowed: Set<string> | null, strict: boolean): string {
  return forms(numeralize(cleaned, allowed), strict)[0];
}

/** superficies válidas de una respuesta, para orientar mientras se teclea */
function surfaces(cleaned: string, strict: boolean): string[] {
  const out = [cleaned, ...forms(cleaned, strict)];
  const table = EQUIV()?.words;
  if (table) {
    // "16" también se teclea "sixteen": sin esto el aviso en vivo se pone rojo
    // a mitad de una respuesta que Comprobar va a aceptar
    const spelled = cleaned.split(" ").map((t) => table.get(t) ?? t).join(" ");
    if (spelled !== cleaned) out.push(spelled);
  }
  return [...new Set(out)];
}

function clean(s: string): string {
  s = s.replace(/[\u2018\u2019\u02BC]/g, "'").replace(/[\u201C\u201D]/g, '"');
  return s
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[.,!?;:'"«»„“”]/g, "")
    .toLowerCase();
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  const dp = new Array(n + 1);
  for (let j = 0; j <= n; j++) dp[j] = j;
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j];
      dp[j] = Math.min(
        dp[j] + 1,
        dp[j - 1] + 1,
        prev + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
      prev = tmp;
    }
  }
  return dp[n];
}

export interface GradeOptions {
  /**
   * Ejercicios cuyo objetivo ES el Umlaut (plurales Äpfel/Apfel): no perdonar
   * el Umlaut omitido a secas. La convención ascii ae/oe/ue/ss sigue valiendo.
   */
  strictUmlaut?: boolean;
  /**
   * Ejercicios cuyo objetivo ES la forma escrita: el dictado (se corrige lo que
   * se oyó) y el transform/errorfix que precisamente pide contraer o descontraer
   * («Yes, I'm» → «Yes, I am»). Sin esto, la equivalencia daría por buena la
   * frase que el ejercicio manda cambiar. Es el gemelo de strictUmlaut.
   */
  strictContractions?: boolean;
  /**
   * Respuestas cortas de simulacro: el baremo oficial da por buenas «16» y
   * «sixteen» en los dos sentidos, se pida lo que se pida. Fuera del examen NO
   * se activa, porque en la lección la palabra escrita puede ser el objetivo.
   */
  numeralsEitherWay?: boolean;
}

/**
 * Corrige texto libre contra respuestas aceptadas.
 * Jerarquía: exacto → exacto sin mayúsculas/puntuación (o equivalencia declarada
 * por el idioma: don't = do not, sixteen = 16) → convención ascii ae/oe/ue/ss
 * (avisa) → Umlaut omitido (avisa; inválido si strictUmlaut) → typo de 1-2
 * letras (avisa) → mal.
 * La equivalencia es un acierto LIMPIO, no un «casi»: son dos maneras correctas
 * de escribir lo mismo, no un fallo perdonado.
 */
export function gradeText(input: string, accepted: string[], opts?: GradeOptions): GradeResult {
  const canonical = accepted[0];
  const raw = input.trim();

  for (const a of accepted) {
    if (raw === a.trim()) {
      return { correct: true, almost: false, feedback: null, expected: canonical };
    }
  }

  const ci = clean(raw);
  // ¿escribió el alumno un apóstrofo? Es lo único que separa «we're» de «were»
  // una vez que `clean()` ha pasado por encima.
  const conApostrofo = /['’\u02BC]/.test(raw);
  for (const a of accepted) {
    if (sameAnswer(ci, clean(a), opts, conApostrofo, /['’\u02BC]/.test(a))) {
      // correcto salvo mayúsculas/puntuación
      const capIssue = /[A-ZÄÖÜ]/.test(a) && raw.toLowerCase() === raw;
      return {
        correct: true,
        almost: capIssue,
        feedback: capIssue
          ? langConfig().capitalizedNouns
            ? "Bien — pero en alemán los sustantivos (y el inicio de frase) van con mayúscula: " + canonical
            : "Bien — pero en inglés van con mayúscula el inicio de frase, I, y los días y meses: " + canonical
          : null,
        expected: canonical,
      };
    }
  }

  // Convención ascii legítima: "muede" por "müde", "dreissig" por "dreißig"
  for (const a of accepted) {
    const target = clean(a);
    if (ci === clean(asciiFold(a)) && ci !== target) {
      return {
        correct: true,
        almost: true,
        feedback: "Válido — pero escríbelo con sus letras: " + canonical,
        expected: canonical,
      };
    }
  }

  // Umlaut omitido a secas: "mude" por "müde" (error clásico del hispanohablante)
  if (!opts?.strictUmlaut) {
    for (const a of accepted) {
      const target = clean(a);
      if (deUmlaut(ci) === deUmlaut(target)) {
        return {
          correct: true,
          almost: true,
          feedback: "¡Ojo con los Umlauts/ß! La forma correcta es: " + canonical,
          expected: canonical,
        };
      }
    }
  }

  // Typo pequeño (proporcional al largo). Se mide sobre la forma canónica para
  // que la contracción no se cuente como distancia: "I do nott know" contra
  // "I don't know" es un typo, no otra respuesta.
  const both = opts?.numeralsEitherWay === true;
  const strict = opts?.strictContractions === true;
  for (const a of accepted) {
    const expected = clean(a);
    const target = canonicalForm(expected, both ? null : NO_DIGITS, strict);
    const mine = canonicalForm(ci, both ? null : digitsIn(expected), strict);
    const dist = levenshtein(deUmlaut(mine), deUmlaut(target));
    const allowance = target.length > 10 ? 2 : 1;
    if (dist <= allowance && target.length > 3) {
      return {
        correct: false,
        almost: true,
        feedback: "Muy cerca — revisa letra por letra. Era: " + canonical,
        expected: canonical,
      };
    }
  }

  return { correct: false, almost: false, feedback: null, expected: canonical };
}

export type LiveStatus = "empty" | "ready" | "ontrack" | "off";

/**
 * Evaluación en vivo mientras se escribe: ¿lo tecleado es (prefijo de) alguna
 * respuesta aceptada? Tolerante a mayúsculas y Umlauts para no penalizar a mitad
 * de palabra. No revela la respuesta — solo orienta. Quien pinte esto usa
 * liveShown: «ready» no es un verde, es el mismo aviso que «ontrack».
 */
export function liveCheck(input: string, accepted: string[], opts?: GradeOptions): LiveStatus {
  const raw = input.trim();
  if (!raw) return "empty";
  // en strictUmlaut el diacrítico ES el objetivo: el live no puede prometer
  // "suena bien" a lo que Comprobar va a rechazar (Apfel vs Äpfel)
  const fold = opts?.strictUmlaut
    ? (s: string) => clean(asciiFold(s))
    : (s: string) => deUmlaut(clean(s));
  const norm = fold(raw);
  // "ready" tiene que decir exactamente lo mismo que dirá Comprobar: si el
  // idioma declara que "do not" es "don't", aquí también vale
  for (const a of accepted) {
    if (sameAnswer(norm, fold(a), opts)) return "ready";
  }
  // El prefijo se compara contra TODAS las superficies válidas (la contraída, la
  // plena, el número en letra): tecleando "do no..." no puede saltar el rojo si
  // la respuesta esperada es "don't"
  const strict = opts?.strictContractions === true;
  for (const a of accepted) {
    for (const s of surfaces(fold(a), strict)) if (s.startsWith(norm)) return "ontrack";
  }
  // tolera 1 typo en curso: prefijo con distancia ≤1 contra el prefijo del mismo largo
  for (const a of accepted) {
    for (const s of surfaces(fold(a), strict)) {
      const target = s.slice(0, norm.length);
      if (target && levenshtein(norm, target) <= 1) return "ontrack";
    }
  }
  return "off";
}

/**
 * Lo que puede ver el alumno antes de Comprobar. «ready» se pliega en
 * «ontrack»: si el encaje completo se distinguiera, bastaría teclear hasta
 * el verde y luego confirmar, y el SRS oiría un acierto que no fue a ciegas.
 * El «off» se queda: a mitad de palabra sí orienta.
 */
export function liveShown(status: LiveStatus): Exclude<LiveStatus, "ready"> {
  return status === "ready" ? "ontrack" : status;
}

export type DiffOp = { ch: string; kind: "ok" | "bad" | "miss" };

/**
 * Diff carácter a carácter (alineación por edición mínima) entre lo escrito y
 * lo esperado, para mostrar exactamente dónde estuvo el fallo.
 * kind: ok = coincide · bad = carácter tuyo que sobra/difiere · miss = carácter esperado que faltó
 */
export function charDiff(input: string, expected: string): { got: DiffOp[]; want: DiffOp[] } {
  const a = input, b = expected;
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const eq = a[i - 1].toLowerCase() === b[j - 1].toLowerCase() ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + eq);
    }
  }
  const got: DiffOp[] = [], want: DiffOp[] = [];
  let i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i - 1].toLowerCase() === b[j - 1].toLowerCase() && dp[i][j] === dp[i - 1][j - 1]) {
      const exact = a[i - 1] === b[j - 1];
      got.unshift({ ch: a[i - 1], kind: exact ? "ok" : "bad" });
      want.unshift({ ch: b[j - 1], kind: exact ? "ok" : "miss" });
      i--; j--;
    } else if (i > 0 && j > 0 && dp[i][j] === dp[i - 1][j - 1] + 1) {
      got.unshift({ ch: a[i - 1], kind: "bad" });
      want.unshift({ ch: b[j - 1], kind: "miss" });
      i--; j--;
    } else if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
      got.unshift({ ch: a[i - 1], kind: "bad" });
      i--;
    } else {
      want.unshift({ ch: b[j - 1], kind: "miss" });
      j--;
    }
  }
  return { got, want };
}

