#!/usr/bin/env node
// Validador de contenido en build-time: los invariantes del curso se rompen
// AQUÍ, no en la cara del alumno. `npm run build` falla si algo no cuadra.

import ts from "typescript";
import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
// EL CATÁLOGO: la fuente ÚNICA de qué archivo es cada pieza, de qué idioma y
// desde qué drop (PLAN-COMPOSICION.md FASE 1 — sustituye a las cuatro tablas
// DROPS/MISSION_FILES/EXAM_FILES/REF_FILES, que agrupaban por drop en vez de
// por pieza). PLAN 1.9.9 F2.2: se IMPORTA, no se parsea — los dos ficheros
// son .mjs, así que no hace falta transpilar nada, y un import no puede
// desincronizarse del formato real como sí podía un parseo de texto.
import { CATALOG } from "../content/catalog.mjs";
import { addExercise, addLongNote, emptyStrandCounts, formatStrandReport } from "./hebras.mjs";

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const dataDir = join(scriptsDir, "..", "data");

// La escala CEFR vive en una sola fuente TS (lib/cefr.ts, PLAN 1.9.9 F1.1).
// Esta sí se PARSEA (por conteo de corchetes, no de llaves: es un array) en
// vez de importarse: es TypeScript, y este script es .mjs plano sin
// transpilador propio para sus propios imports (el `ts` de arriba lo usa para
// cargar los DATOS del curso, no para importarse a sí mismo).
const cefrSrc = readFileSync(join(scriptsDir, "..", "lib", "cefr.ts"), "utf8");
const CEFR_SCALE = (() => {
  const at = cefrSrc.indexOf("CEFR_SCALE = [");
  if (at === -1) {
    console.error("✗ no encuentro CEFR_SCALE en lib/cefr.ts (¿cambió el formato?)");
    process.exit(1);
  }
  const start = cefrSrc.indexOf("[", at);
  let depth = 0, end = -1;
  for (let i = start; i < cefrSrc.length; i++) {
    if (cefrSrc[i] === "[") depth++;
    else if (cefrSrc[i] === "]" && --depth === 0) { end = i + 1; break; }
  }
  if (end === -1) {
    console.error("✗ CEFR_SCALE de lib/cefr.ts no cierra corchetes");
    process.exit(1);
  }
  return new Function(`return ${cefrSrc.slice(start, end)};`)();
})();

/** archivo de data (tal cual lo importa course.gen.ts) → { drop, lang } */
const packedAs = new Map();
for (const p of CATALOG) {
  if (p.kind === "module") packedAs.set(p.file, { drop: p.since, lang: p.lang });
}
/** drop e idioma de las misiones/simulacros/libretas (no son fases) */
const dropLangOfAux = new Map();
for (const p of CATALOG) {
  if (p.kind === "mission" || p.kind === "exam" || p.kind === "reference") {
    dropLangOfAux.set(p.file, { drop: p.since, lang: p.lang });
  }
}

// ── ORDEN derivado de los imports de data/course.gen.ts (antes era una lista
// manual que podía desincronizarse: una fase añadida a course.gen.ts y olvidada
// aquí pasaba el build sin validarse) ──
const courseSrc = readFileSync(join(dataDir, "course.gen.ts"), "utf8");
const ORDER = [...courseSrc.matchAll(/import\s*\{[^}]*\}\s*from\s*["']\.\/([\w\/-]+)["']/g)]
  .map((m) => m[1])
  // misiones y simulacros no son fases: tienen su propio bloque más abajo
  // (hasta v1.3.1 este comentario MENTÍA — nadie los validaba: G1)
  .filter((name) => {
    const base = name.split("/").pop();
    return !base.startsWith("missions") && !base.startsWith("exam");
  });
if (ORDER.length === 0) {
  console.error("✗ no pude derivar el orden de fases de data/course.gen.ts (¿cambió el formato de imports?)");
  process.exit(1);
}

function load(name) {
  const path = join(dataDir, `${name}.ts`);
  if (!existsSync(path)) throw new Error(`no existe data/${name}.ts`);
  const src = readFileSync(path, "utf8");
  const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS } })
    .outputText.replace(/require\("@\/lib\/(?:types|examTypes)"\)/g, "{}");
  const mod = { exports: {} };
  new Function("exports", "require", "module", js)(mod.exports, () => ({}), mod);
  return mod.exports;
}

const problems = [];
// avisos que NO rompen el build (se imprimen con console.warn como el de fases
// no cableadas): desequilibrios pedagógicos, no invariantes rotos
const warnings = [];
// Los tipos que el motor sabe pintar (components/ExerciseKinds.tsx + el
// registro de ExercisePlayer). Si añades uno nuevo, va aquí y con sus reglas.
// `dictation` no entra: no está en ExerciseType y el player no tiene rama.
// El dictado de verdad es `listen`; un alias aquí sería una lección en blanco.
const KNOWN_TYPES = new Set([
  "mc", "cloze", "type", "listen", "build", "match", "order", "bucket", "transform",
  "write", "speak", "shadow", "fastmatch", "audiomc", "hearreal",
  "read", "gapbank", "errorfix", "paraphrase", "monologue", "translate",
]);
// Gemelas de banco aprobadas a mano (ver el bloque de gapbank más abajo)
let twinLedger = {};
const twinLedgerSeen = new Set();
{
  const twinPath = new URL("./gapbank-twins.json", import.meta.url);
  if (existsSync(twinPath)) {
    try {
      twinLedger = JSON.parse(readFileSync(twinPath, "utf8")).approved ?? {};
    } catch {
      warnings.push("scripts/gapbank-twins.json ilegible: se validará como si no hubiera excepciones");
    }
  }
}
const vocab = {};
// qué módulo introduce cada ítem (índice en ORDER): lo necesita la hebra de
// fluidez — "material ya visto" = ítems de módulos ANTERIORES
const vocabOwner = {};
// ids de cada módulo, en el orden de ORDER, para no reescanear el vocabulario
// al cerrar la fase
const idsByModule = [];
// dónde se EMPAQUETA cada ítem (G3): course.gen agrupa por idioma y por drop,
// así que un itemId solo es alcanzable desde ejercicios del MISMO idioma y de
// un drop ≥ al suyo. Fuera de eso el ítem llega muerto al cliente.
const vocabPack = {}; // id → { drop, lang, file }
const exerciseIds = new Set();
const lessonIds = new Set();
let lessons = 0, exercises = 0;
// Una fila por módulo, de todos los niveles: el porcentaje no es el booleano
// de B1/B2. Se imprime al final y no entra en `problems`.
const strandRows = [];

/** Superficie contable: la glosa [[wort|glosa]] deja el Wort y el HTML no es
 *  una palabra. Si la traducción de la glosa contara, una lectura bien glosada
 *  parecería llena de palabras que el curso no enseña. */
function surface(s) {
  return (s ?? "")
    .replace(/\[\[([^\]|]+)\|[^\]]+\]\]/g, "$1")
    .replace(/<[^>]+>/g, " ");
}

/** palabras de un texto con glosas [[wort|glosa]] y HTML simple */
function wordCount(s) {
  return surface(s).trim().split(/\s+/).filter(Boolean).length;
}

/** las glosas deben abrir, cerrar y llevar barra — mismo criterio para notas de
 *  gramática y para los textos largos del B1 */
function glossError(b) {
  const opens = (b.match(/\[\[/g) ?? []).length;
  const closes = (b.match(/\]\]/g) ?? []).length;
  const wellFormed = (b.match(/\[\[[^\]|]+\|[^\]]+\]\]/g) ?? []).length;
  if (opens !== closes || wellFormed !== opens) {
    return `glosas [[wort|glosa]] mal formadas (${opens} abren, ${closes} cierran, ${wellFormed} válidas)`;
  }
  return null;
}

/** tokens normalizados (minúsculas, sin puntuación) */
function tokens(s) {
  return (s ?? "").toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter(Boolean);
}

/** ¿aparece `w` como palabra suelta en `s`? (\b no sirve: ä/ö/ü/ß no son \w) */
function hasWord(s, w) {
  const esc = String(w).trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (!esc) return false;
  return new RegExp(`(?<![\\p{L}\\p{N}])${esc}(?![\\p{L}\\p{N}])`, "iu").test(s ?? "");
}

/** La respuesta, sin puntuación de los bordes: «Wer ist das?» y «Wer ist das»
 *  son la misma forma que el alumno copiaría. */
function bordeRespuesta(s) {
  return String(s ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
}

/** Quita las citas que vetan la forma («no escribas X», «nunca X», «no X»).
 *  Lo que queda es lo que la pista ofrece como solución, no como aviso. */
function sinVeto(hint, needle) {
  const esc = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `(?:no\\s+(?:escribas|escriba|pongas|ponga|uses|use|digas|diga)|nunca|jamás|no)\\s+(?:[«"“'])?${esc}(?![\\p{L}\\p{N}'])`,
    "giu",
  );
  return String(hint ?? "").replace(re, " ");
}

/** Como hasWord, pero el apóstrofo pega la contracción: «it» no está suelto
 *  dentro de «It's», ni «can» dentro de «can't». */
function hasLoose(s, w) {
  const esc = String(w).trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (!esc) return false;
  return new RegExp(`(?<![\\p{L}\\p{N}'])${esc}(?![\\p{L}\\p{N}'])`, "iu").test(s ?? "");
}

/** La pista da la solución si la respuesta canónica sigue ahí, como palabra
 *  o frase suelta, después de ignorar el veto. Una glosa que escribe la forma
 *  también la da: se puede copiar. */
function pistaDaSolucion(hint, answer) {
  const needle = bordeRespuesta(answer);
  if (!needle) return false;
  return hasLoose(sinVeto(hint, needle), needle);
}

/** Lo que el ejercicio enseña como solución, no las variantes aceptadas. */
function respuestasCanonicas(e) {
  const out = [];
  const add = (v) => {
    if (typeof v === "string" && v.trim()) out.push(v.trim());
  };
  switch (e.type) {
    case "cloze":
    case "type":
    case "transform":
    case "translate":
    case "errorfix":
    case "paraphrase":
      add(e.answers?.[0]);
      break;
    case "listen":
      add(e.text);
      break;
    case "build":
      add(e.target);
      break;
    case "mc":
    case "audiomc":
      if (Array.isArray(e.options) && Number.isInteger(e.answer)) add(e.options[e.answer]);
      break;
    case "gapbank":
      for (const a of e.answers ?? []) add(a);
      break;
    case "read":
      for (const q of e.questions ?? []) {
        if (Array.isArray(q.accepted) && q.accepted[0]) add(q.accepted[0]);
        else if (Array.isArray(q.options) && Number.isInteger(q.answer)) add(q.options[q.answer]);
      }
      break;
    case "write":
      add(e.model);
      break;
    default:
      break;
  }
  return out;
}

/** cuántas palabras cambian entre dos frases (diferencia de multiconjuntos: un
 *  reordenamiento cuenta 0, una sustitución cuenta 1) */
function wordsChanged(a, b) {
  const A = tokens(a), B = tokens(b);
  const bag = new Map();
  for (const w of B) bag.set(w, (bag.get(w) ?? 0) + 1);
  let unmatched = 0;
  for (const w of A) {
    const n = bag.get(w) ?? 0;
    if (n) bag.set(w, n - 1); else unmatched++;
  }
  let leftover = 0;
  for (const n of bag.values()) leftover += n;
  return { changed: Math.max(unmatched, leftover), len: Math.max(A.length, B.length, 1) };
}

// ═══════════════════════════════════════════════════════════════════════════
// REGLAS QUE DEPENDEN DEL IDIOMA
//
// Casi todo este validador es agnóstico —un `mc` sin `options` está roto en
// cualquier lengua— y así debe seguir. Pero había tres familias de reglas
// escritas en alemán a secas, que con el inglés A2/B1 pasaban de red a estorbo:
//
//   · las clases de fichas intercambiables de `gapbank` (Umlaut, Konjunktiv),
//   · el detector de fuga de registro de `write` (du / Sie),
//   · el largo esperado de un `read` (el alemán compone palabras y necesita
//     menos que el inglés para contar lo mismo).
//
// Cada idioma trae aquí las suyas. La regla es POR IDIOMA, nunca adivinada del
// contenido: el idioma sale del catálogo de gen-course (que es quien decide
// de verdad en qué curso viaja cada archivo).
// ═══════════════════════════════════════════════════════════════════════════

/* ── alemán ──────────────────────────────────────────────────────────────── */

/** ascii del alemán: ä→a, ö→o, ü→u, ß→ss (la convención que ya usa grade.ts) */
const deAscii = (w) => w.replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ß/g, "ss");
const deStem = (w) => deAscii(w.toLowerCase()).replace(/(en|est|et|te|st|e|n|t)$/, "");

/* ── inglés ──────────────────────────────────────────────────────────────── */

/** apóstrofos tipográficos → apóstrofo recto (el contenido mezcla ’ y ') */
const enApos = (w) => String(w).toLowerCase().replace(/[‘’ʼ´]/g, "'");

/** Variantes ortográficas británica/americana: las DOS son inglés correcto, así
 *  que en el mismo hueco encajan igual y el alumno que escoge la otra falla sin
 *  haberse equivocado. Es una tabla a mano a propósito: la regla «-our → -or»
 *  convertiría «four» en «for». */
const EN_SPELLING = {
  colour: "color", colours: "colors", favourite: "favorite", flavour: "flavor",
  neighbour: "neighbor", neighbours: "neighbors", behaviour: "behavior",
  labour: "labor", humour: "humor", theatre: "theater", centre: "center",
  metre: "meter", metres: "meters", litre: "liter", litres: "liters",
  organise: "organize", organised: "organized", realise: "realize",
  recognise: "recognize", apologise: "apologize", travelling: "traveling",
  travelled: "traveled", traveller: "traveler", cancelled: "canceled",
  programme: "program", practise: "practice", defence: "defense",
  licence: "license", jewellery: "jewelry", grey: "gray", aeroplane: "airplane",
  maths: "math", pyjamas: "pajamas", cheque: "check", tyre: "tire",
};

/** Contracciones → forma plena. `don't` y `do not` NO son dos respuestas: son
 *  la misma escrita de dos maneras, y en un banco de fichas eso es un hueco con
 *  dos claves. Ojo con `'s` y `'d`, que son ambiguos (is/has, would/had): se
 *  desarrollan por la lectura más frecuente y se documenta la limitación. */
function enCanonical(w) {
  let s = enApos(w)
    .replace(/\bcan't\b/g, "can not")
    .replace(/\bcannot\b/g, "can not")
    .replace(/\bwon't\b/g, "will not")
    .replace(/\bshan't\b/g, "shall not")
    .replace(/n't\b/g, " not")
    .replace(/'ll\b/g, " will")
    .replace(/'re\b/g, " are")
    .replace(/'ve\b/g, " have")
    .replace(/'m\b/g, " am")
    .replace(/'d\b/g, " would")
    .replace(/'s\b/g, " is");
  s = s.split(/\s+/).filter(Boolean).map((t) => EN_SPELLING[t] ?? t).join(" ");
  return s.trim();
}

/** Raíz aproximada de una palabra inglesa (Porter de andar por casa): sirve para
 *  ver que dos fichas del banco son el mismo lema con otra terminación. */
function enStemWord(w) {
  let s = enApos(w).replace(/[^a-z]/g, "");
  if (!s) return "";
  if (/ies$/.test(s) && s.length > 4) s = s.slice(0, -3) + "y";
  else if (/(ches|shes|sses|xes|zes|oes)$/.test(s)) s = s.slice(0, -2);
  else if (/[^s]s$/.test(s)) s = s.slice(0, -1);
  if (/ied$/.test(s) && s.length > 4) s = s.slice(0, -3) + "y";
  else if (/ing$/.test(s) && s.length > 4) s = s.slice(0, -3);
  else if (/ed$/.test(s) && s.length > 4) s = s.slice(0, -2);
  s = s.replace(/([^aeiou])\1$/, "$1"); // stopp→stop, runn→run
  return s.replace(/e$/, "");           // mak(e)/making, us(e)/used
}
const enStem = (w) => enApos(w).split(/\s+/).filter(Boolean).map(enStemWord).join(" ");

// Artículo de cita, el de LanguageConfig.articleRegex: en alemán der/die/das
// y en inglés the/a/an. No es un toLowerCase del target —el artículo es parte
// de la palabra, así que «der See» y «die See» no se juntan— ni un plegado de
// mayúsculas o de diacríticos del lema. «an» va delante de «a» para no dejar
// la palabra mordida. ein/den/dem/des se quedan fuera: «ein» también es el
// número y el caso no es el artículo con el que se cita el sustantivo.
const ARTICLE_PREFIX = {
  de: /^(der|die|das)\s+/i,
  en: /^(the|an|a)\s+/i,
};

/** Separa el artículo de cita inicial, si lo hay, y deja el resto tal cual.
 *  Sin idioma conocido no se pela nada: mejor no avisar que avisar cruzando
 *  lenguas. Un target que es solo el artículo no tiene lema. */
function articuloYLema(lang, target) {
  const raw = String(target ?? "").trim();
  if (!raw) return null;
  const re = ARTICLE_PREFIX[lang];
  if (!re) return { raw, lema: raw, conArticulo: false };
  const m = re.exec(raw);
  if (!m) return { raw, lema: raw, conArticulo: false };
  const lema = raw.slice(m[0].length).trim();
  if (!lema) return { raw, lema: raw, conArticulo: false };
  return { raw, lema, conArticulo: true };
}

/** marcadores de petición cortés: en inglés el registro NO es un pronombre, es
 *  la forma de la petición («Give me a coffee» / «Could I have a coffee?») */
const EN_POLITE = [
  /\bcould (you|i|we)\b/i, /\bwould (you|it)\b/i, /\bmay i\b/i, /\bmight i\b/i,
  /\bwould you mind\b/i, /\bi was wondering\b/i, /\bi'd (like|appreciate)\b/i,
  /\bi would (like|appreciate|be grateful)\b/i, /\bplease\b/i, /\bif possible\b/i,
  /\bwould it be possible\b/i, /\bthank you\b/i, /\bcan i\b/i, /\bdo you mind\b/i,
  /\bi'm sorry to (bother|trouble)\b/i, /\blook forward to hearing\b/i,
];
/** exigencia sin envoltura (el imperativo pelado se busca aparte, frase a
 *  frase: «Do you mind…?» empieza por «Do» y es justo lo contrario de brusco) */
const EN_BLUNT = [
  ["I want", /\bi want\b/i],
  ["you must", /\byou must\b/i],
];
/** verbos que, al abrir una frase que NO es pregunta, son una orden pelada */
const EN_IMPERATIVE = /^\s*(give|send|bring|tell|get|make|do|write|call|come|go|help|pay|fix|answer)\b/i;
/** deferencia de carta formal: en un texto de registro directo suena a otra persona */
const EN_FORMAL = [
  ["Dear Sir/Madam", /\bdear (sir|madam|sir or madam)\b/i],
  ["Yours sincerely/faithfully", /\byours (sincerely|faithfully)\b/i],
  ["I would be grateful", /\bi would be grateful\b/i],
  ["I am writing to…", /\bi am writing to\b/i],
  ["Would you be so kind", /\bwould you be so kind\b/i],
];

/* ── la tabla ────────────────────────────────────────────────────────────── */

const LANG_RULES = {
  de: {
    // Clases de intercambiables del B1 alemán: conectores del mismo grupo e
    // indicativo vs Konjunktiv del mismo verbo. Fallo DURO y sin apelación: si
    // dos de estas caen en el mismo banco, el hueco tiene dos claves.
    swappable: [
      ["deshalb", "darum", "daher", "deswegen", "trotzdem", "dennoch", "außerdem", "zudem", "allerdings", "jedoch"],
      ["können", "könnten", "konnten"],
      ["haben", "hätten", "hatten"],
      ["sind", "wären", "waren"],
      ["ist", "wäre", "war"],
      ["müssen", "müssten", "mussten"],
      ["sollen", "sollten"],
      ["wird", "würde"],
      ["weil", "da"],
    ],
    // Pares irregulares de un mismo verbo (indicativo/Konjunktiv II, o número
    // cruzado) que el stemmer de abajo NO puede cazar: o el cambio es un
    // ablaut real (gibt/gäbe: geben cambia de raíz, no de terminación) o el
    // par cruza singular/plural (könnte/könnten) y el sufijo que se recorta
    // no coincide entre las dos formas. Se listan a mano, como `swappable`,
    // pero APELABLES en gapbank-twins.json igual que las gemelas automáticas
    // — el generador algorítmico de abajo (deStem/deAscii) se deja intacto:
    // tocarlo para colar estos casos empezaba a confundir pares que NO son
    // gemelas (p.ej. "schon"/"schön", ascii y raíz idénticas tras el recorte,
    // pero palabras distintas sin relación gramatical).
    irregularTwins: [
      ["kann", "könnte", "konnte"],
      ["hat", "hätte", "hatte"],
      ["muss", "müsste", "musste"],
      ["gibt", "gäbe"],
      ["könnte", "könnten"],
      ["konnte", "könnten"],
      ["wurde", "würde"],
    ],
    // el alemán no tiene contracciones que compitan en un banco de fichas: la
    // única normalización posible (ae/oe/ue) ya la cubre el chequeo de gemelas
    canonical: null,
    /** gemelas por FORMA: solo cambian el Umlaut o la terminación
     *  (konnte/könnte, wurde/würde, gibt/gäbe). Apelable en gapbank-twins.json. */
    twins(want, bankLower) {
      const irregular = new Set();
      for (const klass of LANG_RULES.de.irregularTwins) {
        if (!klass.includes(want)) continue;
        for (const w of bankLower) if (w !== want && klass.includes(w)) irregular.add(w);
      }
      if (want.length < 4) return [...irregular]; // palabras cortas: el stemmer da demasiados falsos positivos, la lista a mano no
      const stemmed = bankLower.filter(
        (w) => w !== want && w.length >= 4 && deStem(w) === deStem(want) && deAscii(w) !== deAscii(want),
      );
      return [...new Set([...stemmed, ...irregular])];
    },
    softTwins: null,
    registers: ["du", "Sie"],
    /** fuga del tratamiento contrario en el modelo de un `write` */
    registerLeaks(register, model) {
      if (register === "Sie") {
        // du/dich/dir/dein en un texto de usted: la fuga que tumba el
        // registro. Puntuación → espacios ("dich," también es fuga)
        const m = ` ${model.replace(/[^\p{L}\p{N}]+/gu, " ")} `;
        return [["du", / du /i], ["dich", / dich /i], ["dir", / dir /i], ["dein", / dein/i]]
          .filter(([, re]) => re.test(m)).map(([w]) => w);
      }
      // al revés hay que hilar fino: "sie" minúscula es ella/ellos, y
      // "Sie" a principio de frase también puede serlo. Solo cuenta
      // como fuga el Sie/Ihnen con mayúscula EN MEDIO de la frase.
      return [...model.matchAll(/(^|[^\p{L}\p{N}]+)(Sie|Ihnen)(?![\p{L}\p{N}])/gu)]
        .filter((m) => m[1] !== "" && !/[.!?…]\s*$/.test(m[1]))
        .map((m) => m[2]);
    },
    readWords: { a1: [60, 170], a2: [120, 320], b1: [250, 600], b2: [400, 750] },
  },

  en: {
    // Sinónimos de verdad: en el hueco donde cabe uno cabe el otro y NINGÚN
    // contexto los separa. Por eso son fallo duro, igual que en alemán.
    // Deliberadamente FUERA de esta lista:
    //   · for/since — los separa el complemento (duración vs punto de partida),
    //   · this/that/these/those — los separa el número y la distancia,
    //   · some/any — los separa la polaridad,
    //   · so/such — los separa lo que va detrás (adjetivo vs sustantivo),
    //   · have to/has to entre sí — los separa el sujeto.
    swappable: [
      ["although", "though", "even though"],
      ["however", "nevertheless", "nonetheless"],
      ["moreover", "furthermore", "besides"],
      ["therefore", "thus", "hence", "consequently"],
      ["despite", "in spite of"],
      ["must", "have to"],
      ["must", "has to"],
      ["should", "ought to"],
      ["everyone", "everybody"],
      ["someone", "somebody"],
      ["anyone", "anybody"],
      ["no one", "nobody"],
      ["maybe", "perhaps"],
      ["as soon as", "once"],
      ["in order to", "so as to"],
      ["a lot of", "lots of", "plenty of"],
    ],
    canonical: enCanonical,
    /** Gemelas DURAS del inglés: caben en el mismo hueco casi siempre, pero
     *  existe un contexto que SÍ las separa, así que son fallo APELABLE en
     *  gapbank-twins.json (a diferencia de los sinónimos de arriba, que no
     *  tienen apelación porque no hay contexto que los distinga).
     *  · el backshift, que es la trampa del B1 igual que el Konjunktiv en
     *    alemán: will/would, can/could, may/might, shall/should;
     *  · used to / would para hábitos pasados (con verbo de estado solo vale
     *    «used to», y ahí el distractor es legítimo);
     *  · because / since de causa (pero «since» temporal es otra cosa);
     *  · which / that y who / that, intercambiables en la relativa DEFINING y
     *    solo «which» en la explicativa.
     *  Aquí NO entra la concordancia (is/are/am, do/does): esa la resuelve el
     *  sujeto, que está escrito en el propio hueco. */
    hardTwins: [
      ["will", "would"], ["can", "could"], ["may", "might"], ["shall", "should"],
      ["used to", "would"], ["because", "since"], ["which", "that"], ["who", "that"],
    ],
    twins(want, bankLower) {
      const klass = LANG_RULES.en.hardTwins.filter((k) => k.includes(want));
      if (!klass.length) return [];
      const rivals = new Set();
      for (const k of klass) for (const w of bankLower) if (w !== want && k.includes(w)) rivals.add(w);
      return [...rivals];
    },
    /** Gemelas BLANDAS: el mismo lema con otra terminación (get/gets,
     *  work/working, book/books). En inglés la concordancia y el tiempo suelen
     *  estar escritos alrededor del hueco —«She ___ up at seven» solo admite
     *  «gets»—, así que esto es AVISO y no fallo: hay ejercicios publicados que
     *  contrastan justamente eso a propósito. Que lo mire el autor, no el build. */
    softTwins(want, bankLower) {
      if (want.length < 2) return [];
      return bankLower.filter(
        (w) =>
          w !== want &&
          w.length >= 2 &&
          enStem(w) === enStem(want) &&
          enCanonical(w) !== enCanonical(want) &&
          // dos palabras que no comparten ni las dos primeras letras no son el
          // mismo lema: es una colisión del stemmer casero
          enApos(w).slice(0, 2) === enApos(want).slice(0, 2),
      );
    },
    registers: ["direct", "polite"],
    registerLeaks(register, model) {
      if (register !== "polite") return EN_FORMAL.filter(([, re]) => re.test(model)).map(([w]) => w);
      const leaks = EN_BLUNT.filter(([, re]) => re.test(model)).map(([w]) => w);
      const afirmaciones = model.split(/(?<=[.!?])\s+/).filter((f) => !/\?\s*$/.test(f));
      if (afirmaciones.some((f) => EN_IMPERATIVE.test(f))) leaks.push("imperativo pelado");
      return leaks;
    },
    /** un modelo de registro cortés que no usa ni una fórmula de cortesía no
     *  enseña el registro que dice enseñar (mismo criterio que requireConnectors:
     *  el modelo cumple su propia regla) */
    registerNeeds(register, model) {
      if (register !== "polite") return null;
      return EN_POLITE.some((re) => re.test(model))
        ? null
        : "ni una fórmula de cortesía (could/would/may I, please, I'd like…)";
    },
    // el inglés dice en más palabras lo que el alemán compone en una
    // (Wohnungssuche → «looking for a flat»): mismos textos, ~15 % más largos
    readWords: { a1: [70, 200], a2: [140, 380], b1: [280, 700], b2: [500, 950] },
  },
};

/** idioma sin bloque propio: se valida SIN las redes que dependen del idioma,
 *  y se dice en voz alta (callarlo sería apagar la alarma sin avisar) */
const NEUTRAL_RULES = {
  swappable: [], canonical: null, twins: () => [], softTwins: null,
  registers: null, registerLeaks: () => [], readWords: LANG_RULES.de.readWords,
};
const langRulesMissing = new Set();
function rulesFor(lang) {
  const r = LANG_RULES[lang];
  if (r) return r;
  if (!langRulesMissing.has(lang)) {
    langRulesMissing.add(lang);
    warnings.push(
      `idioma "${lang}" sin bloque en LANG_RULES: sus gapbank se validan sin red de claves ambiguas ` +
        `y sus write sin detector de fugas de registro. Escríbele sus reglas antes de publicar contenido suyo.`,
    );
  }
  return NEUTRAL_RULES;
}

// Archivos de data con pinta de fase (export con lessons) que course.gen.ts no
// importa: contenido invisible para el alumno — casi siempre un drop a medias.
// courseIndex/examsIndex/vocab son las vistas ligeras del cliente: no traen contenido propio
const wired = new Set([...ORDER, "course", "course.gen", "exams", "courseIndex", "examsIndex", "vocab", "vocabIdSet", "phases"]);
// misiones, simulacros y libretas: cableados vía course.gen pero jamás fases.
// La lista sale de las tablas de gen-course (nada de listas paralelas a mano).
for (const [file] of dropLangOfAux) wired.add(file);
const unwired = [];
const dataFiles = [];
for (const f of readdirSync(dataDir, { withFileTypes: true })) {
  if (f.isDirectory()) {
    for (const g of readdirSync(join(dataDir, f.name))) {
      if (g.endsWith(".ts")) dataFiles.push(`${f.name}/${g}`);
    }
  } else if (f.name.endsWith(".ts")) {
    dataFiles.push(f.name);
  }
}
/** ¿un registro de misiones? Record<phaseId, Mission> — la firma es el phaseId
 *  interno más los pasos, que ninguna otra cosa de data/ tiene. */
function looksLikeMissions(mod) {
  return Object.values(mod).some(
    (v) =>
      v && typeof v === "object" && !Array.isArray(v) &&
      Object.values(v).some((m) => m && typeof m === "object" && m.phaseId && Array.isArray(m.steps)),
  );
}

/** ¿un simulacro? ExamSet = objeto con `sections` */
function looksLikeExam(mod) {
  return Object.values(mod).some((v) => v && typeof v === "object" && Array.isArray(v.sections));
}

for (const f of dataFiles) {
  const name = f.slice(0, -3);
  if (wired.has(name)) continue;
  // lo generado (course.gen, el índice, el vocabulario troceado…) sale del
  // contenido ya cableado: no es contenido suelto que se pueda olvidar
  if (name.endsWith(".gen")) continue;
  const base = name.split("/").pop();
  let mod;
  try {
    mod = load(name);
  } catch {
    continue; // no transpila con el loader casero: no puede ser una fase válida
  }
  if (Object.values(mod).some((v) => v && typeof v === "object" && Array.isArray(v.lessons))) {
    unwired.push(name);
    continue;
  }
  // No es una fase, pero puede ser contenido igual de terminado y de invisible.
  // Aquí el veredicto es DURO, y a propósito: una fase suelta es lo normal al
  // empaquetar un drop base (course.gen solo importa hasta el drop horneado),
  // mientras que el catálogo lista TODAS las piezas, sea cual sea su `since`.
  // Un archivo que no sale en ninguna fila no llega al alumno hoy ni mañana.
  // Esto es lo que dejó `missionsEnA2.ts` días escrito con el build en verde:
  // el detector de arriba solo miraba exports con `lessons`.
  if (base.startsWith("missions") || looksLikeMissions(mod)) {
    problems.push(
      `data/${f}: misiones escritas que NO importa nadie — no hay fila "mission" para ellas ` +
        `en web/content/catalog.mjs, así que no viajan en ningún build y el alumno no verá su práctica real`,
    );
  } else if (base.startsWith("reference")) {
    problems.push(
      `data/${f}: libreta escrita que NO importa nadie — le falta su fila "reference" ` +
        `en web/content/catalog.mjs y, con ella, sus pestañas en app/referencia/`,
    );
  } else if (base.startsWith("exam") || looksLikeExam(mod)) {
    problems.push(
      `data/${f}: simulacro escrito que NO importa nadie — le falta su fila "exam" en web/content/catalog.mjs`,
    );
  }
}
if (unwired.length) {
  // esperado al empaquetar un drop base (gen-course excluye lo no liberado);
  // se validan IGUAL — un drop futuro roto no debe pasar el build de hoy
  console.warn(`⚠ fases fuera de este drop (validadas igualmente): ${unwired.join(", ")}`);
  ORDER.push(...unwired.sort());
}

// Pasada 1: todo el vocabulario (en runtime course.vocab es la fusión global,
// así que las referencias hacia delante entre fases son válidas)
const mods = ORDER.map((name) => [name, load(name)]);
mods.forEach(([name, mod], mi) => {
  for (const [k, v] of Object.entries(mod)) {
    if (!k.toLowerCase().startsWith("vocab")) continue;
    for (const id of Object.keys(v)) {
      if (vocab[id]) problems.push(`vocab duplicado: ${id} (${name})`);
      vocab[id] = v[id];
      vocabOwner[id] = mi;
      (idsByModule[mi] ??= []).push(id);
      const pack = packedAs.get(name);
      if (pack) vocabPack[id] = { ...pack, file: name };
      const it = v[id];
      if (!it.target || !it.source) problems.push(`vocab ${id}: falta target/source`);

      // ── metadato gramatical B1: si está, tiene que poder generar plantilla ──
      const g = it.gram;
      if (g) {
        if (g.rektion) {
          if (!g.rektion.prep) problems.push(`vocab ${id}: gram.rektion sin prep`);
          else if (!hasWord(it.target, g.rektion.prep)) {
            problems.push(`vocab ${id}: la preposición "${g.rektion.prep}" no aparece en el target ("${it.target}") — tRektion no puede abrir hueco (plantilla muerta)`);
          }
        }
        if (g.konn && !["sub", "adv", "koord", "zweiteilig"].includes(g.konn)) {
          problems.push(`vocab ${id}: gram.konn "${g.konn}" inválido (sub/adv/koord/zweiteilig)`);
        }
        if (g.trap && g.trap.trim() === (it.target ?? "").trim()) {
          problems.push(`vocab ${id}: gram.trap igual al target (tErrorFix no tendría nada que corregir)`);
        }
        if ((g.same ?? []).some((s) => s.trim() === (it.target ?? "").trim())) {
          problems.push(`vocab ${id}: gram.same contiene el propio target (tParaphrase pediría repetir la frase)`);
        }
      }
    }
  }
});

// Tokens ya vistos, por idioma. Un ítem entra cuando su módulo ya quedó atrás
// o, dentro del módulo, cuando un itemId anterior al `read` ya lo presentó.
// No se lematiza: una raíz inventada contaría como vista una forma que la
// ficha no enseña, y el aviso mediría otra cosa. El target suele traer
// artículo y paréntesis; la palabra que el texto repite es un token de esa
// ficha, no la ficha entera — si se exigiera la igualdad literal, ninguna
// lectura llegaría al umbral y el aviso dejaría de distinguir.
const knownTargetTokens = new Map();

// JUICIO, no la vara del 98 %. Ese 98 % es lectura extensiva larga, sin
// andamio. Aquí el solape es literal —el token tiene que ser un token de un
// target ya visto, sin lemas—, así que nombres, números y flexión no cuentan
// y un texto didáctico sano de este curso se queda lejos del 98 (la masa anda
// por el 70-90 %). Por debajo del 65 % ya no está en esa banda: más de un
// token de cada tres no fue nunca una ficha. Aviso, no fallo.
const READ_KNOWN_PCT = 65;

function addTargetTokens(lang, id, mi) {
  const it = vocab[id];
  if (!it?.target) return;
  const owner = vocabOwner[id];
  // un itemId que apunta hacia delante no es «anterior»
  if (owner !== undefined && owner > mi) return;
  const pack = vocabPack[id];
  if (pack && pack.lang !== lang) return;
  let set = knownTargetTokens.get(lang);
  if (!set) {
    set = new Set();
    knownTargetTokens.set(lang, set);
  }
  for (const t of tokens(surface(it.target))) set.add(t);
}

function publishModuleTargets(mi, lang) {
  for (const id of idsByModule[mi] ?? []) addTargetTokens(lang, id, mi);
}

function knownTargetShare(text, lang) {
  const toks = tokens(surface(text));
  if (!toks.length) return null;
  const known = knownTargetTokens.get(lang);
  let hit = 0;
  if (known) for (const t of toks) if (known.has(t)) hit++;
  return { hit, n: toks.length, pct: Math.round((hit / toks.length) * 100) };
}

// Pasada 2: lecciones y ejercicios
mods.forEach(([name, mod], mi) => {
  // la fase es el export con lessons (phaseX en A1, a2mX en A2...)
  const phase = Object.entries(mod).find(([k, v]) => !k.toLowerCase().startsWith("vocab") && v && Array.isArray(v.lessons))?.[1];
  // El idioma, antes del return: aunque la fase esté rota, sus ítems ya
  // quedaron escritos y un `read` posterior no debe fingir que no existen.
  const here = packedAs.get(name);
  const lang = here?.lang ?? (name.includes("/") ? name.split("/")[0] : "de");
  if (!phase) {
    publishModuleTargets(mi, lang);
    problems.push(`${name}: sin export de fase (objeto con lessons)`);
    return;
  }

  // en qué drop/idioma se empaqueta ESTA fase (G3). Sin entrada en gen-course
  // la fase no viaja en ningún build: se avisa y se valida sin cruce.
  if (!here) warnings.push(`${name}: no aparece en el catálogo de gen-course.mjs (no se empaqueta en ningún build)`);

  /** ¿este itemId es ALCANZABLE desde esta fase cuando gen-course hornea su drop? */
  const packProblem = (id) => {
    if (!here) return null;
    const from = vocabPack[id];
    if (!from) return null; // ítem de un archivo sin drop: ya avisado arriba
    if (from.lang !== here.lang) {
      return `pertenece al idioma "${from.lang}" (${from.file}) y esta fase es de "${here.lang}" — course.gen emite un curso POR idioma: el itemId llega muerto`;
    }
    if (from.drop > here.drop) {
      return `vive en el drop ${from.drop} (${from.file}) y esta fase se publica en el drop ${here.drop} — el build de ese drop NO importa ese vocabulario: itemId muerto en el cliente`;
    }
    return null;
  };

  // ── NIVEL E IDIOMA DE LA FASE: el dato de verdad, no el prefijo del id ──
  // Antes el nivel de un `read` se deducía de si su id empezaba por "b1"/"a2".
  // Los ids alemanes lo llevan (`b1m7l6e1`); los ingleses NO (`ena1m1l8e10`,
  // `enb1m3l6e1`), así que un `read` inglés de B1 se medía con la vara del A1 y
  // pasaba la puerta siendo un texto de nivel equivocado. `phase.level` es el
  // campo que declara el nivel (opcional en types.ts: el A1 alemán no lo pone).
  const level = phase.level ?? "a1";
  // `lang` ya está resuelto arriba (gen-course, o el directorio si no hay fila:
  // data/en es inglés y la raíz es alemán). Un `read` inglés no hereda los
  // targets del alemán.
  const R = rulesFor(lang);

  // Ausencia de hebra, solo B1 y B2, y solo como aviso: un booleano (basta
  // un ejercicio) no es el cuarto de tiempo de Nation. El porcentaje de
  // todos los niveles lo imprime hebras.mjs y no falla el build.
  const strands = ["b1", "b2"].includes(level)
    ? { input: false, output: false, form: false, fluency: false }
    : null;
  const strandCounts = emptyStrandCounts();

  for (const lesson of phase.lessons) {
    lessons++;
    if (lessonIds.has(lesson.id)) problems.push(`lección duplicada: ${lesson.id}`);
    lessonIds.add(lesson.id);
    if (lesson.phaseId !== phase.id) problems.push(`${lesson.id}: phaseId ${lesson.phaseId} ≠ ${phase.id}`);

    const steps = lesson.sections.reduce(
      (n, s) => n + (s.kind === "exercises" ? (s.exercises?.length ?? 0) : 1), 0);
    if (steps === 0) problems.push(`${lesson.id}: lección sin pasos`);

    // píldora Nativo: 1 máx por lección, SIEMPRE tras la última sección de
    // ejercicios (es el postre — nunca interrumpe la secuencia de práctica)
    const nativoIdx = lesson.sections.findIndex((s) => s.kind === "nativo");
    if (nativoIdx !== -1) {
      const lastEx = lesson.sections.map((s) => s.kind).lastIndexOf("exercises");
      if (nativoIdx < lastEx) problems.push(`${lesson.id}: sección nativo antes de la última de ejercicios`);
      if (lesson.sections.filter((s) => s.kind === "nativo").length > 1) {
        problems.push(`${lesson.id}: más de una píldora nativo (máx 1)`);
      }
      const card = lesson.sections[nativoIdx].nativo;
      if (!card) problems.push(`${lesson.id}: sección nativo sin tarjeta`);
      else {
        if (!card.when || !card.register) problems.push(`${card.id ?? lesson.id}: NativoCard sin when/register (obligatorios)`);
        if (!card.book || !card.real || !card.meaning) problems.push(`${card.id ?? lesson.id}: NativoCard incompleta (book/real/meaning)`);
        // El `level` de la tarjeta manda sobre las reglas de abajo (exam
        // obligatorio en B1, produce/itemId prohibidos en A1). Si no coincide
        // con el de su fase, esas reglas se aplican al nivel equivocado y la
        // tarjeta se cuela: una tarjeta B1 marcada "a1" no exige `exam`.
        if (card.level && card.level !== level) {
          problems.push(`${card.id ?? lesson.id}: NativoCard de nivel "${card.level}" en un módulo de "${level}" — con el nivel descuadrado se le aplican las reglas del nivel que no es`);
        }
        // B1 se estudia PARA UN EXAMEN: una fórmula de la calle sin su gemela
        // de examen enseña a medias — el alumno la escribe en el Schreiben y le
        // baja la banda por registro. En B1 la versión de examen es obligatoria.
        if (["b1", "b2"].includes(card.level) && !card.exam) {
          problems.push(`${card.id ?? lesson.id}: NativoCard de ${card.level.toUpperCase()} sin \`exam\` — falta la versión que puntúa en el examen`);
        }
        if (card.exam && card.exam.trim() === card.real.trim()) {
          problems.push(`${card.id}: la versión de examen es idéntica a la de la calle (o la calle no lo es, o el examen está mal)`);
        }
        if (card.level === "a1" && card.produce) problems.push(`${card.id}: produce:true prohibido en nivel a1 (receptivo puro)`);
        if (card.level === "a1" && card.itemId) problems.push(`${card.id}: itemId prohibido en a1 (fuera del SRS)`);
        if (card.itemId && vocab[card.itemId]) {
          const bad = packProblem(card.itemId);
          if (bad) problems.push(`${card.id ?? lesson.id}: itemId ${card.itemId} ${bad}`);
        }
      }
    }

    for (const sec of lesson.sections) {
      // La píldora va detrás de los ejercicios de su lección; al llegar aquí
      // ya es anterior para lo que venga en la lección siguiente.
      if (sec.kind === "nativo" && sec.nativo?.itemId) addTargetTokens(lang, sec.nativo.itemId, mi);
      for (const id of sec.itemIds ?? []) {
        addTargetTokens(lang, id, mi);
        if (sec.kind === "phrases" && !vocab[id]) problems.push(`${lesson.id} phrases: itemId huérfano ${id}`);
        else if (vocab[id]) {
          const bad = packProblem(id);
          if (bad) problems.push(`${lesson.id} ${sec.kind}: itemId ${id} ${bad}`);
        }
      // (las glosas se validan por nota más abajo)
      }
      if (sec.kind === "note" && sec.note?.body) {
        const b = sec.note.body;
        const gl = glossError(b);
        if (gl) problems.push(`${lesson.id}: nota con ${gl}`);
        // Un mini-cuento largo también es input con foco en el significado.
        // No es un ejercicio: el porcentaje no lo mete en el %, solo lo anota,
        // para que un 0 % de `read` no se «arregle» borrando el cuento.
        if (wordCount(b) >= 150) {
          addLongNote(strandCounts);
          if (strands) strands.input = true;
        }
        if (sec.note.viz && sec.note.viz.kind === "timeline") {
          for (const k of ["pastLabel", "pastExample", "nowLabel", "nowExample"]) {
            if (!sec.note.viz[k]) problems.push(`${lesson.id}: timeline sin ${k}`);
          }
        }
      }
      for (const e of sec.exercises ?? []) {
        exercises++;
        addExercise(strandCounts, e.type);
        if (exerciseIds.has(e.id)) problems.push(`ejercicio duplicado: ${e.id}`);
        exerciseIds.add(e.id);
        // `e` = ejercicio de siempre; `h` = ítems de Hören tipo examen (a2examl2h1…).
        // Las lecciones `*b` del A1 (f2l2b) numeran con `be`.
        if (
          !e.id.startsWith(lesson.id + "e") &&
          !e.id.startsWith(lesson.id + "h") &&
          !e.id.startsWith(lesson.id.replace(/b$/, "") + "be")
        ) {
          problems.push(`${e.id}: id no lleva el prefijo de su lección ${lesson.id}`);
        }
        for (const id of e.itemIds ?? []) {
          if (!vocab[id]) { problems.push(`${e.id}: itemId huérfano ${id}`); continue; }
          const bad = packProblem(id);
          if (bad) problems.push(`${e.id}: itemId ${id} ${bad}`);
        }
        if (e.type === "cloze") {
          if ((e.text.match(/___/g) ?? []).length !== 1) problems.push(`${e.id}: cloze sin ___ único`);
          if (!e.answers?.length) problems.push(`${e.id}: cloze sin answers`);
        }
        // ALLOWLIST DE TIPOS: una errata («clozee») dejaba al ejercicio sin
        // NINGUNA validación y se pintaba como una tarjeta vacía que el alumno
        // no puede completar ni saltar. El validador de exámenes ya tenía su
        // `default:`; este no.
        if (!KNOWN_TYPES.has(e.type)) {
          problems.push(
            `${e.id}: tipo de ejercicio desconocido «${e.type}» — o es una errata, o hay que enseñarle al validador (y al motor) qué hacer con él`,
          );
        }
        // TRANSLATE: sin frase que traducir o sin respuesta no hay ejercicio, y
        // una traducción idéntica al original delata un copia-pega.
        if (e.type === "translate") {
          if (e.direction !== "toTarget" && e.direction !== "toEs") {
            problems.push(`${e.id}: translate sin dirección («toTarget» o «toEs»)`);
          }
          if (!e.source?.trim()) problems.push(`${e.id}: translate sin frase de origen`);
          if (!e.answers?.length) problems.push(`${e.id}: translate sin answers`);
          if (e.source && e.answers?.some((a) => a.trim() === e.source.trim())) {
            problems.push(`${e.id}: translate con una respuesta idéntica al origen — no hay nada que traducir`);
          }
          if (e.hint && e.answers?.some((a) => a.toLowerCase().includes(e.hint.toLowerCase()))) {
            problems.push(`${e.id}: la pista contiene la respuesta`);
          }
        }

        // hints[] se revela a cambio de dejar el acierto en 0,75. Si la forma
        // ya está escrita en la pista, ese 0,75 se copia. El `hint` singular
        // de translate es otra pista (siempre visible) y se mira arriba.
        // «no escribas X» cita la forma para vetarla: no es la solución.
        if (Array.isArray(e.hints) && e.hints.length) {
          const leaked = [];
          for (const ans of respuestasCanonicas(e)) {
            if (e.hints.some((h) => typeof h === "string" && pistaDaSolucion(h, ans))) leaked.push(bordeRespuesta(ans));
          }
          if (leaked.length) {
            problems.push(
              `${e.id}: la pista contiene la respuesta canónica («${[...new Set(leaked)].join("», «")}»)`,
            );
          }
        }

        // SPEAK: 90 ejercicios vivos y cero reglas. Sin texto que leer en voz
        // alta, la tarjeta sale en blanco y no hay forma de hacerla.
        if (e.type === "speak") {
          if (!e.prompt?.trim()) problems.push(`${e.id}: speak sin consigna`);
          if (!e.text?.trim()) problems.push(`${e.id}: speak sin texto que decir en voz alta`);
        }

        if (e.type === "mc") {
          // `undefined < 0` es false y `undefined >= n` también: un mc SIN
          // `answer` u `options` se colaba por ahí, y son el tipo más común del
          // curso (683). Además, sin `options` el propio validador reventaba
          // con un stack trace que no decía ni qué ejercicio era.
          if (!Array.isArray(e.options) || e.options.length === 0) {
            problems.push(`${e.id}: mc sin options — no hay nada que elegir`);
          } else if (!Number.isInteger(e.answer) || e.answer < 0 || e.answer >= e.options.length) {
            problems.push(`${e.id}: mc con answer inválida (${JSON.stringify(e.answer)}) para ${e.options.length} opciones`);
          }
          if (e.whyWrong && (e.whyWrong.length !== e.options?.length || e.whyWrong[e.answer] !== null)) {
            problems.push(`${e.id}: whyWrong desalineado`);
          }
          if ((e.options?.length ?? 0) > 4) problems.push(`${e.id}: mc con ${e.options.length} opciones (máx 4)`);
          // Una sola opción no es elegir: es pulsar. (Dos SÍ es legítimo: el
          // curso usa binarios de propósito — Richtig/Falsch, der/die — así que
          // eso no se avisa.)
          if ((e.options?.length ?? 0) === 1) problems.push(`${e.id}: mc con una sola opción — no hay nada que elegir`);
          if (e.options && new Set(e.options.map((o) => String(o).trim())).size !== e.options.length) {
            problems.push(`${e.id}: mc con opciones repetidas — la clave deja de ser única`);
          }
        }
        if (e.type === "match") {
          const t = new Set(), s2 = new Set();
          for (const p of e.pairs) {
            if (t.has(p.target)) problems.push(`${e.id}: match con target duplicado "${p.target}"`);
            if (s2.has(p.source)) problems.push(`${e.id}: match con source duplicado "${p.source}"`);
            t.add(p.target); s2.add(p.source);
          }
          if (e.pairs.length < 2) problems.push(`${e.id}: match con <2 pares`);
        }
        if (e.type === "type" && !e.answers?.length) problems.push(`${e.id}: type sin answers`);
        if (e.type === "order") {
          if (!e.sentences || e.sentences.length < 3 || e.sentences.length > 6) {
            problems.push(`${e.id}: order necesita 3-6 oraciones (tiene ${e.sentences?.length ?? 0})`);
          }
          if (new Set(e.sentences ?? []).size !== (e.sentences ?? []).length) {
            problems.push(`${e.id}: order con oraciones duplicadas (romperían el orden único)`);
          }
        }
        if (e.type === "transform") {
          if (!e.source) problems.push(`${e.id}: transform sin source`);
          if (!e.instruction) problems.push(`${e.id}: transform sin instruction`);
          if (!e.answers?.length) problems.push(`${e.id}: transform sin answers`);
          if (e.source && e.answers?.[0] && e.source.trim() === e.answers[0].trim()) {
            problems.push(`${e.id}: transform con source igual a la respuesta`);
          }
        }
        if (e.type === "bucket") {
          if (!e.categories || e.categories.length !== 2) problems.push(`${e.id}: bucket necesita exactamente 2 categorías`);
          if (!e.items || e.items.length < 4 || e.items.length > 10) {
            problems.push(`${e.id}: bucket necesita 4-10 ítems (tiene ${e.items?.length ?? 0})`);
          }
          for (const it of e.items ?? []) {
            if (it.bucket !== 0 && it.bucket !== 1) problems.push(`${e.id}: bucket con ítem sin categoría válida ("${it.text}")`);
          }
          const buckets = new Set((e.items ?? []).map((it) => it.bucket));
          if (buckets.size < 2) problems.push(`${e.id}: bucket con todos los ítems en la misma categoría (no discrimina)`);
        }
        if (e.type === "listen" && !e.text) problems.push(`${e.id}: listen sin texto`);
        if (e.type === "shadow") {
          if (!e.text) problems.push(`${e.id}: shadow sin texto`);
          if (e.text && e.text.length > 120) problems.push(`${e.id}: shadow con texto >120 chars (imposible sombrearlo)`);
        }
        if (e.type === "fastmatch") {
          if (!e.pairs || e.pairs.length < 4 || e.pairs.length > 6) {
            problems.push(`${e.id}: fastmatch necesita 4-6 pares (tiene ${e.pairs?.length ?? 0})`);
          }
          const ft = new Set(), fs = new Set();
          for (const p of e.pairs ?? []) {
            if (ft.has(p.target)) problems.push(`${e.id}: fastmatch con target duplicado "${p.target}"`);
            if (fs.has(p.source)) problems.push(`${e.id}: fastmatch con source duplicado "${p.source}"`);
            ft.add(p.target); fs.add(p.source);
          }
        }
        if (e.type === "write") {
          if (!e.scenario || !e.model) problems.push(`${e.id}: write sin scenario/model`);
          if (!e.bullets?.length || !e.checks?.length) problems.push(`${e.id}: write sin bullets/checks`);
          if (e.bullets?.length !== e.checks?.length) problems.push(`${e.id}: write con bullets (${e.bullets?.length}) ≠ checks (${e.checks?.length})`);
          if (!(e.minWords > 0) || !(e.maxWords > e.minWords)) problems.push(`${e.id}: write con rango de palabras inválido`);
          for (const c of e.checks ?? []) {
            try { new RegExp(c.re, "i"); } catch { problems.push(`${e.id}: write con regex inválido (${c.label})`); }
          }
          if (e.model) {
            const mw = e.model.trim().split(/\s+/).length;
            if (mw < e.minWords || mw > e.maxWords) problems.push(`${e.id}: el modelo tiene ${mw} palabras, fuera del rango ${e.minWords}-${e.maxWords} que exige`);
            const failing = (e.checks ?? []).filter((c) => { try { return !new RegExp(c.re, "i").test(e.model); } catch { return false; } });
            if (failing.length) problems.push(`${e.id}: el propio modelo no pasa sus checks (${failing.map((c) => c.label).join(", ")})`);
          }
          // ── extras B1 (PLAN §3.3): el piso determinista tiene que sostenerse
          //    en el propio modelo, o el ejercicio corrige lo que no cumple ──
          // REGISTRO, POR IDIOMA. En alemán el registro ES un pronombre
          // (du/Sie) y basta con cazar la fuga del contrario. En inglés no hay
          // ese par: el registro se juega en la FORMA DE LA PETICIÓN («Give me
          // a coffee» frente a «Could I have a coffee, please?»), así que el
          // detector de cada idioma vive en LANG_RULES con sus marcadores.
          if (e.register) {
            if (R.registers && !R.registers.includes(e.register)) {
              problems.push(
                `${e.id}: write register:"${e.register}" no existe en ${lang.toUpperCase()} (aquí son ${R.registers.map((r) => `"${r}"`).join(" o ")}) — ` +
                  `el detector de registro no sabría qué buscar y el ejercicio quedaría sin red`,
              );
            } else if (e.model) {
              const leaks = R.registerLeaks(e.register, e.model);
              if (leaks.length) {
                problems.push(`${e.id}: write register:"${e.register}" pero el modelo filtra el registro contrario (${[...new Set(leaks)].join(", ")})`);
              }
              const missing = R.registerNeeds?.(e.register, e.model);
              if (missing) {
                problems.push(`${e.id}: write register:"${e.register}" y el modelo no trae ${missing} — el modelo tiene que cumplir su propia regla, como con requireConnectors`);
              }
            }
          }
          if (e.requireConnectors) {
            const { min, bank } = e.requireConnectors;
            if (!(min > 0) || !bank?.length) problems.push(`${e.id}: write requireConnectors sin min>0 o sin banco`);
            else {
              const used = new Set((bank ?? []).filter((c) => hasWord(e.model ?? "", c)));
              if (used.size < min) {
                problems.push(`${e.id}: el modelo usa ${used.size} conector(es) del banco y exige ${min} (Kohärenz medible: el modelo debe cumplir su propia regla)`);
              }
            }
          }
          if (e.stimulus && (!e.stimulus.author || !e.stimulus.text)) {
            problems.push(`${e.id}: write con stimulus sin autor/texto (no hay a quién reaccionar)`);
          }
        }

        // ── LECTURA LARGA (B1): el nivel se entrena infiriendo, no localizando ──
        if (e.type === "read") {
          if (!e.title) problems.push(`${e.id}: read sin título`);
          if (!e.text) problems.push(`${e.id}: read sin texto`);
          if (e.text) {
            const gl = glossError(e.text);
            if (gl) problems.push(`${e.id}: read con ${gl}`);
            const w = wordCount(e.text);
            // El rango depende del NIVEL y del IDIOMA: 250 palabras en A1 no
            // son un texto, son un muro (y el examen A1 no pide nada parecido),
            // y la misma historia ocupa más palabras en inglés que en alemán,
            // que compone. El nivel sale de `phase.level`, no del prefijo del
            // id: `enb1m3l6e1` no empieza por "b1" y se medía como A1.
            const RANGE = R.readWords[level] ?? R.readWords.a1;
            if (w < RANGE[0] || w > RANGE[1]) {
              warnings.push(
                `${e.id}: read de ${w} palabras (fuera de ${RANGE[0]}-${RANGE[1]} para ${level.toUpperCase()} en ${lang.toUpperCase()}: ` +
                  `por debajo no da volumen, por encima no cabe en una lección)`,
              );
            }
            const share = knownTargetShare(e.text, lang);
            if (share && share.pct < READ_KNOWN_PCT) {
              warnings.push(
                `${e.id}: lectura con el ${share.pct} % de los tokens que ya son target de un ítem anterior en ${lang.toUpperCase()} (${share.hit}/${share.n}). ` +
                  `Por debajo del ${READ_KNOWN_PCT} % — juicio para un texto didáctico de unas 400 palabras, no es un fallo del build. ` +
                  `El 98 % es de textos largos de lectura extensiva; aquí el umbral es un juicio y no se reescribe la lectura.`,
              );
            }
          }
          const qs = e.questions ?? [];
          if (qs.length < 4 || qs.length > 6) problems.push(`${e.id}: read necesita 4-6 preguntas (tiene ${qs.length})`);
          const inf = qs.filter((q) => q.inference).length;
          if (inf < 2) {
            problems.push(`${e.id}: read con ${inf} pregunta(s) de inferencia (mínimo 2: sin ellas es un ejercicio de localizar datos, que es el nivel A2)`);
          }
          for (const q of qs) {
            const label = q.id ?? q.q ?? "?";
            // Dos formas de preguntar, y el nivel manda cuál. La de siempre es
            // de opciones; la de RESPUESTA ESCRITA existe porque el Reading
            // Part 4 del B1 inglés dejó de ser test: son ocho preguntas
            // abiertas, y el baremo oficial acepta variantes de la misma
            // respuesta («(at) reception», «16 / sixteen»), que es justo lo que
            // lista `accepted`.
            const abierta = Array.isArray(q.accepted) && q.accepted.length > 0;
            if (abierta) {
              if (q.options || q.answer !== undefined) {
                problems.push(`${e.id}: pregunta "${label}" mezcla respuesta escrita (accepted) con opción múltiple — o una cosa o la otra`);
              }
              if (q.accepted.some((a) => typeof a !== "string" || !a.trim())) {
                problems.push(`${e.id}: pregunta "${label}" con una respuesta aceptada vacía`);
              }
              continue;
            }
            const opts = q.options ?? [];
            if (opts.length < 2 || opts.length > 4) problems.push(`${e.id}: pregunta "${label}" necesita 2-4 opciones o respuestas aceptadas (accepted) — tiene ${opts.length} opciones`);
            if (!(q.answer >= 0 && q.answer < opts.length)) problems.push(`${e.id}: pregunta "${label}" con answer fuera de rango`);
          }
        }

        // Los itemIds de este ejercicio no son anteriores a él: cuentan para
        // el que venga después. Si se sumaran antes, la propia lectura se
        // aprobaría con las palabras que acaba de estrenar.
        for (const id of e.itemIds ?? []) addTargetTokens(lang, id, mi);

        // ── GAPBANK: el banco SIEMPRE sobra, o el último hueco sale por descarte ──
        if (e.type === "gapbank") {
          const holes = (e.text?.match(/___/g) ?? []).length;
          if (holes < 2 || holes > 7) problems.push(`${e.id}: gapbank necesita 2-7 huecos ___ (tiene ${holes})`);
          const answers = e.answers ?? [];
          if (answers.length !== holes) problems.push(`${e.id}: gapbank con ${answers.length} answers para ${holes} huecos`);
          const bank = e.bank ?? [];
          if (new Set(bank).size !== bank.length) problems.push(`${e.id}: gapbank con el banco duplicado (la misma ficha dos veces)`);
          const missing = answers.filter((a) => !bank.includes(a));
          if (missing.length) problems.push(`${e.id}: gapbank con answers fuera del banco (${missing.join(", ")})`);
          const extra = bank.length - new Set(answers).size;
          // 2-5 huecos: mínimo 2 distractores (si el banco es exacto, el último
          // sale por descarte). 6-7 huecos = Lesen T2 B2 / LC insert: el oficial
          // sobra 1-2 frases, no 2 fijas.
          const minExtra = holes >= 6 ? 1 : 2;
          if (extra < minExtra) problems.push(`${e.id}: gapbank con ${extra} distractor(es) sobrantes (mínimo ${minExtra}: con banco exacto se resuelve por eliminación)`);

          // ── LA MISMA RESPUESTA CON DOS TRAJES ──
          // El duplicado exacto ya está cazado arriba; esto caza el disfrazado:
          // «don't» y «do not», «I'll» y «I will», «colour» y «color» no son dos
          // fichas, son una escrita de dos maneras — y el alumno que coge la
          // otra falla sin haberse equivocado. Depende del idioma (el alemán no
          // tiene contracciones que compitan en un banco), así que va por tabla.
          if (R.canonical) {
            const byCanon = new Map();
            for (const w of bank) {
              const k = R.canonical(String(w));
              if (!byCanon.has(k)) byCanon.set(k, []);
              byCanon.get(k).push(String(w));
            }
            for (const [, ws] of byCanon) {
              if (ws.length > 1) {
                problems.push(
                  `${e.id}: el banco trae «${ws.join("» y «")}», que son LA MISMA respuesta escrita de dos formas — ` +
                    `el hueco tendría dos claves. Deja una sola y busca otro distractor.`,
                );
              }
            }
          }

          // ── CLAVE ÚNICA: la familia de fallo dominante del B1 ──
          // Si en un hueco encaja también otra ficha del banco, hay DOS
          // respuestas correctas y el ejercicio castiga a quien eligió la otra.
          // A mano es incazable entre 3.900 ejercicios. No podemos juzgar
          // gramática, así que comprobamos las clases de intercambiables
          // conocidas del nivel Y DEL IDIOMA: en alemán, conectores del mismo
          // grupo e indicativo vs Konjunktiv del mismo verbo; en inglés,
          // sinónimos de conector (although/though, however/nevertheless),
          // relativas defining (which/that) y must/have to. Las listas viven en
          // LANG_RULES: la regla es por idioma, nunca adivinada del contenido.
          const bankLower = bank.map((w) => String(w).toLowerCase());
          answers.forEach((ans, gi) => {
            const want = String(ans).toLowerCase();
            const rivals = new Set();
            for (const klass of R.swappable) {
              if (!klass.includes(want)) continue;
              for (const w of bankLower) if (w !== want && klass.includes(w)) rivals.add(w);
            }
            if (rivals.size) {
              problems.push(
                `${e.id}: el hueco ${gi + 1} espera «${ans}», pero el banco ofrece «${[...rivals].join("», «")}» — ` +
                  `encajan igual de bien y el alumno que elige la otra falla sin haberse equivocado`,
              );
            }
          });
          answers.forEach((ans, gi) => {
            const want = String(ans).toLowerCase();
            const twins = R.twins(want, bankLower);
            if (twins.length) {
              // LIBRO DE EXCEPCIONES: un aviso que nadie revisa es ruido, y 28
              // líneas fijas en cada build enseñan a ignorar la salida entera.
              // Cada gemela vista y aprobada por un nativo se anota, con el
              // motivo, en scripts/gapbank-twins.json. Lo que NO esté anotado
              // es un fallo del build, no un aviso: obliga a mirarlo una vez.
              const key = `${e.id}#${gi + 1}`;
              const ok = twinLedger[key];
              if (!ok) {
                problems.push(
                  `${e.id}: el hueco ${gi + 1} espera «${ans}» y el banco trae «${twins.join("», «")}» — ` +
                    (lang === "de"
                      ? `solo cambian el Umlaut o la terminación. `
                      : `caben en el mismo hueco y solo el contexto largo las separa. `) +
                    `Si el contexto descarta la otra, anótalo en ` +
                    `scripts/gapbank-twins.json con la clave "${key}" y el motivo; si no, cambia el distractor.`,
                );
              } else {
                twinLedgerSeen.add(key);
              }
            }
          });
          // ── gemelas BLANDAS (hoy solo el inglés): el mismo lema con otra
          // terminación (get/gets, work/working, book/books). En inglés la
          // concordancia y el tiempo suelen ir escritos alrededor del hueco, así
          // que muchas veces el contraste es deliberado y correcto: por eso es
          // AVISO y no fallo. Romper el build aquí tumbaría ejercicios ya
          // publicados que enseñan justamente la -s de tercera persona.
          if (R.softTwins) {
            answers.forEach((ans, gi) => {
              const want = String(ans).toLowerCase();
              const near = R.softTwins(want, bankLower);
              if (near.length) {
                warnings.push(
                  `${e.id}: el hueco ${gi + 1} espera «${ans}» y el banco trae «${near.join("», «")}», el mismo lema con otra ` +
                    `terminación — comprueba que el sujeto o el tiempo del hueco descarten la otra`,
                );
              }
            });
          }
        }

        // ── ERRORFIX: un solo error, o es otra frase (PLAN §6.2, salvaguardas) ──
        if (e.type === "errorfix") {
          if (!e.wrong) problems.push(`${e.id}: errorfix sin wrong`);
          if (!e.answers?.length) problems.push(`${e.id}: errorfix sin answers`);
          if (!e.why) problems.push(`${e.id}: errorfix sin why (el porqué es lo que se enseña al corregir)`);
          if (e.wrong && e.answers?.[0]) {
            if (e.wrong.trim() === e.answers[0].trim()) problems.push(`${e.id}: errorfix con wrong igual a la respuesta (no hay error que arreglar)`);
            else {
              const { changed, len } = wordsChanged(e.wrong, e.answers[0]);
              if (changed / len > 0.4) {
                problems.push(`${e.id}: errorfix cambia ${changed} de ${len} palabras (>40%): eso es otra frase, no UN error — la salvaguarda exige un solo fallo por ítem`);
              }
            }
          }
        }

        // ── PARAPHRASE: si la respuesta usa lo prohibido, el ejercicio no existe ──
        if (e.type === "paraphrase") {
          if (!e.source) problems.push(`${e.id}: paraphrase sin source`);
          if (!e.answers?.length) problems.push(`${e.id}: paraphrase sin answers`);
          if (!e.forbid?.length) problems.push(`${e.id}: paraphrase sin forbid (sin palabras prohibidas no fuerza reformular nada)`);
          for (const a of e.answers ?? []) {
            const hit = (e.forbid ?? []).filter((f) => hasWord(a, f));
            if (hit.length) problems.push(`${e.id}: la respuesta "${a}" usa palabra(s) prohibida(s) (${hit.join(", ")}) — el ejercicio sería imposible o trivial`);
            if (e.source && a.trim() === e.source.trim()) problems.push(`${e.id}: paraphrase con una answer idéntica al source`);
          }
        }

        // ── MONOLOGUE: hablar 2-3 min con hechos contables, no impresiones ──
        if (e.type === "monologue") {
          const slides = e.slides ?? [];
          if (slides.length < 3 || slides.length > 6) problems.push(`${e.id}: monologue necesita 3-6 diapositivas (tiene ${slides.length})`);
          if ((e.checklist ?? []).length < 3) problems.push(`${e.id}: monologue con checklist corta (${e.checklist?.length ?? 0}; mínimo 3 hechos contables)`);
          if (e.speakSeconds !== undefined && (e.speakSeconds < 60 || e.speakSeconds > 300)) {
            problems.push(`${e.id}: monologue con speakSeconds ${e.speakSeconds} (fuera de 60-300)`);
          }
        }

        // Aviso de ausencia (B1 y B2). No es el porcentaje: speak y shadow no
        // entran aquí a propósito, y la fluidez no exige reloj.
        if (strands) {
          if (e.type === "read") strands.input = true;
          if (e.type === "write" || e.type === "monologue" || e.type === "paraphrase") strands.output = true;
          if (["gapbank", "errorfix", "transform", "bucket"].includes(e.type)) strands.form = true;
          if (e.type === "fastmatch") strands.fluency = true;
          else if (e.itemIds?.length && e.itemIds.every((id) => (vocabOwner[id] ?? Infinity) < mi)) {
            // Material ya presentado, sin cronómetro. Un solo gesto calla el
            // aviso, a propósito: no hace falta que sea un fastmatch. El
            // porcentaje de hebras.mjs no usa esta cláusula; si la usara, el
            // repaso parecería fluidez.
            strands.fluency = true;
          }
        }
        if (e.type === "audiomc") {
          if (!e.audio) problems.push(`${e.id}: audiomc sin audio`);
          if (!e.question) problems.push(`${e.id}: audiomc sin pregunta`);
          if (!e.options || e.options.length < 2 || e.options.length > 4) problems.push(`${e.id}: audiomc necesita 2-4 opciones`);
          if (e.answer < 0 || e.answer >= (e.options?.length ?? 0)) problems.push(`${e.id}: audiomc answer fuera de rango`);
          if (e.audio && e.options?.some((o) => o === e.audio)) problems.push(`${e.id}: audiomc con el audio literal entre las opciones (regalado)`);
        }
        if (e.type === "hearreal") {
          if (!e.book || !e.real) problems.push(`${e.id}: hearreal sin book/real`);
          if (e.book && e.real && e.book.trim() === e.real.trim()) {
            problems.push(`${e.id}: hearreal con book igual a real (nada que discriminar)`);
          }
          if (!e.translation) problems.push(`${e.id}: hearreal sin translation`);
          if (e.ask === "meaning" && (!e.meaningOptions || e.meaningOptions.length < 2 || e.meaningOptions.length > 4)) {
            problems.push(`${e.id}: hearreal ask:"meaning" necesita 2-4 meaningOptions`);
          }
        }
        if (e.type === "build") {
          // sin este guardia, un build sin target tumbaba el validador con un
          // TypeError sin id: el autor no sabía ni qué ejercicio mirar
          if (typeof e.target !== "string" || !e.target.trim()) {
            problems.push(`${e.id}: build sin target (no hay frase que construir)`);
            continue;
          }
          const words = new Set(e.target.replace(/[?.!,]/g, "").split(/\s+/));
          for (const d of e.distractors ?? []) {
            if (words.has(d)) problems.push(`${e.id}: distractor "${d}" duplica palabra del target`);
          }
        }
      }
    }
  }

  // Ausencia total en B1/B2: aviso, no error. Un ejercicio basta. El
  // porcentaje (hebras.mjs) es otra cuenta y no se empuja a `problems`.
  if (strands) {
    const missing = [];
    if (!strands.input) missing.push("(a) input con significado — ni un `read` ni un cuento largo");
    if (!strands.output) missing.push("(b) output con significado — ni `write`, ni `monologue`, ni `paraphrase`");
    if (!strands.form) missing.push("(c) foco en la forma — ni `gapbank`, ni `errorfix`, ni `transform`, ni `bucket`");
    if (!strands.fluency) {
      missing.push("(d) fluidez — ni un `fastmatch` ni un ejercicio cuyos itemIds vengan todos de módulos anteriores (material ya presentado, aunque no lleve reloj; un solo gesto basta y no falla el build)");
    }
    if (missing.length) {
      warnings.push(`${phase.id}: hebras de Nation incompletas — falta ${missing.join(" · ")}`);
    }
  }
  // Al cerrar el módulo, también los ítems que ninguna sección listó pasan
  // a ser anteriores: el alumno ya dejó atrás la fase. No se vuelcan al
  // empezar, o la lectura se mediría con palabras que todavía no ha visto.
  publishModuleTargets(mi, lang);
  strandRows.push({ id: phase.id, level, lang, ...strandCounts });
});

// ── misiones de práctica real: spec TBLT mínima ──
let missionCount = 0;
const missionPhaseIds = [];
for (const f of CATALOG.filter((p) => p.kind === "mission").map((p) => p.file)) {
  let mod;
  try {
    mod = load(f);
  } catch {
    continue; // el drop puede no incluirlas aún
  }
  const rec = Object.values(mod).find((v) => v && typeof v === "object" && !Array.isArray(v));
  for (const [pid, m] of Object.entries(rec ?? {})) {
    missionCount++;
    if (m.phaseId !== pid) problems.push(`misión ${pid}: phaseId interno ${m.phaseId} no coincide`);
    for (const field of ["title", "canDo", "outcome", "world", "home"]) {
      if (!m[field]) problems.push(`misión ${pid}: falta ${field}`);
    }
    if (!m.prep?.length || m.prep.length < 4) problems.push(`misión ${pid}: toolkit corto (${m.prep?.length ?? 0} frases; mínimo 4)`);
    if (!m.steps?.length) problems.push(`misión ${pid}: sin pasos`);
    if (!m.checklist?.length || m.checklist.length < 3) problems.push(`misión ${pid}: checklist corta (mínimo 3 can-dos)`);
    // Antes había aquí un `if (!lessonIds.size || ...) continue;` que no
    // comprobaba nada (iba al final del bucle). Lo que sí importa: la misión
    // cuelga de un módulo REAL — si el id no existe, la misión no se abre nunca
    // y el alumno no ve jamás la práctica del módulo.
    missionPhaseIds.push(pid);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// SIMULACROS DE EXAMEN (G1). Hasta v1.3.1 el comentario decía que "se validan
// aparte" y era FALSO: ningún camino los cargaba. El producto estrella era el
// único contenido sin red — un `answer` fuera de rango compilaba y se enviaba.
// ═══════════════════════════════════════════════════════════════════════════
const SKILLS = ["hoeren", "lesen", "schreiben", "sprechen"];
let examSets = 0, examItems = 0;
const examSetIds = new Set();

/** ¿vacío? (undefined, "", [], {}) — lo que la libreta pintaría en blanco */
function isEmpty(v) {
  if (v === undefined || v === null) return true;
  if (Array.isArray(v)) return v.length === 0;
  if (typeof v === "string") return v.trim() === "";
  if (typeof v === "object") return Object.keys(v).length === 0;
  return false;
}

/** rúbrica de bandas A→E: A vale el máximo, E vale 0 y la suma de los máximos
 *  no puede pasar del techo de la tarea (o la tarea puntuaría por encima) */
function checkRubric(P, label, rubric, maxPoints) {
  if (!rubric?.length) return;
  let top = 0;
  const seen = new Set();
  for (const c of rubric) {
    if (!c.id) { P(`${label}: criterio de rúbrica sin id`); continue; }
    if (seen.has(c.id)) P(`${label}: criterio de rúbrica duplicado "${c.id}"`);
    seen.add(c.id);
    if (!c.label || !c.help) P(`${label}: criterio "${c.id}" sin label/help`);
    const bands = c.bands ?? [];
    if (bands.length < 2) { P(`${label}: criterio "${c.id}" con ${bands.length} banda(s) (mínimo 2)`); continue; }
    if (bands.some((b) => typeof b !== "number" || !Number.isFinite(b) || b < 0)) {
      P(`${label}: criterio "${c.id}" con bandas no numéricas o negativas`);
      continue;
    }
    for (let i = 1; i < bands.length; i++) {
      if (bands[i] > bands[i - 1]) { P(`${label}: criterio "${c.id}" con bandas que suben (A debe ser la mejor: ${bands.join(" > ")})`); break; }
    }
    if (bands[bands.length - 1] !== 0) P(`${label}: criterio "${c.id}" con la última banda ≠ 0 (E vale 0 en el baremo Goethe)`);
    top += bands[0];
  }
  if (maxPoints > 0 && top > maxPoints + 1e-9) {
    P(`${label}: la rúbrica suma ${top} puntos en banda A pero la tarea vale ${maxPoints} — el alumno vería una nota imposible`);
  }
}

function validateExamSet(file, set) {
  examSets++;
  const who = set.id || file;
  const P = (msg) => problems.push(`simulacro ${who}: ${msg}`);
  if (!set.id) P(`sin id (${file})`);
  else if (examSetIds.has(set.id)) P(`id de simulacro duplicado (también en otro archivo)`);
  examSetIds.add(set.id);
  if (!set.title || !set.description) P("sin title/description");
  if (!set.sections?.length) { P("sin secciones"); return; }

  // TODOS los ids del set (ítems, sub-ítems, statements, opinions, situations):
  // son las claves con las que se guarda la respuesta del alumno. Repetido =
  // una respuesta pisa a la otra y el baremo miente.
  const ids = new Map();
  const seeId = (id, what) => {
    if (!id || !String(id).trim()) { P(`${what} sin id`); return; }
    if (ids.has(id)) P(`id duplicado "${id}" (${ids.get(id)} y ${what}) — las respuestas se guardan por id: una pisa a la otra`);
    else ids.set(id, what);
  };

  const modular = !!set.scoring?.modular;
  if (set.scoring) {
    const sc = set.scoring;
    if (!(sc.passPct > 0 && sc.passPct <= 100)) P(`scoring.passPct inválido (${sc.passPct})`);
    if (!sc.bands?.length) P("scoring sin bandas de nota");
  }

  /** valida un ítem; devuelve los puntos que aporta a su módulo (0 si receptivo) */
  const checkItem = (item, inGroup) => {
    const label = `${item.kind} ${item.id ?? "?"}`;
    switch (item.kind) {
      case "hoeren-mc":
      case "lesen-mc": {
        const opts = item.options ?? [];
        if (opts.length < 2) P(`${label}: ${opts.length} opción(es) (mínimo 2)`);
        if (opts.some((o) => isEmpty(o))) P(`${label}: opción vacía`);
        if (new Set(opts).size !== opts.length) P(`${label}: opciones repetidas (más de una "correcta")`);
        if (!Number.isInteger(item.answer) || item.answer < 0 || item.answer >= opts.length) {
          P(`${label}: answer ${item.answer} FUERA DE RANGO (0..${opts.length - 1}) — el ítem sería incorrectible`);
        }
        if (!item.question || !item.questionEs) P(`${label}: sin question/questionEs`);
        if (item.kind === "hoeren-mc" && !inGroup && !item.audio) P(`${label}: sin audio (nada que escuchar)`);
        return 0;
      }
      case "hoeren-rf": {
        if (typeof item.richtig !== "boolean") P(`${label}: richtig no es booleano`);
        if (!item.statement || !item.statementEs) P(`${label}: sin statement/statementEs`);
        if (!inGroup && !item.audio) P(`${label}: sin audio`);
        return 0;
      }
      case "lesen-schild": {
        if (typeof item.richtig !== "boolean") P(`${label}: richtig no es booleano`);
        if (!item.sign || !item.where) P(`${label}: sin sign/where`);
        if (!item.statement || !item.statementEs) P(`${label}: sin statement/statementEs`);
        return 0;
      }
      case "hoeren-wersagt": {
        const keys = (item.speakers ?? []).map((s) => s.key);
        if (keys.length < 2) P(`${label}: necesita al menos 2 hablantes`);
        if (new Set(keys).size !== keys.length) P(`${label}: hablantes con key duplicada`);
        if ((item.speakers ?? []).some((s) => !s.key || !s.name)) P(`${label}: hablante sin key/name`);
        if (!keys.includes(item.answer)) P(`${label}: answer "${item.answer}" no es ninguno de los hablantes (${keys.join(", ")})`);
        if (!item.statement || !item.statementEs) P(`${label}: sin statement/statementEs`);
        return 0;
      }
      case "lesen-text": {
        const sts = item.statements ?? [];
        if (!sts.length) P(`${label}: sin statements (no hay nada que responder)`);
        if (!item.text || !item.title) P(`${label}: sin title/text`);
        for (const st of sts) {
          seeId(st.id, `statement de ${item.id}`);
          if (!st.statement || !st.statementEs) P(`${label}: statement "${st.id}" sin texto/traducción`);
          if (typeof st.richtig !== "boolean") P(`${label}: statement "${st.id}" con richtig no booleano`);
        }
        return 0;
      }
      case "lesen-janein": {
        const ops = item.opinions ?? [];
        if (!ops.length) P(`${label}: sin opinions`);
        if (!item.question || !item.questionEs) P(`${label}: sin question/questionEs`);
        for (const op of ops) {
          seeId(op.id, `opinión de ${item.id}`);
          if (!op.author || !op.text) P(`${label}: opinión "${op.id}" sin autor/texto`);
          if (typeof op.ja !== "boolean") P(`${label}: opinión "${op.id}" con ja no booleano`);
        }
        return 0;
      }
      case "lesen-ads": {
        if (item.answer !== "a" && item.answer !== "b") P(`${label}: answer "${item.answer}" fuera de rango (solo "a" o "b")`);
        if (!item.adA || !item.adB) P(`${label}: sin adA/adB`);
        if (item.adA && item.adA === item.adB) P(`${label}: los dos anuncios son idénticos (no hay nada que elegir)`);
        if (!item.situation || !item.situationEs) P(`${label}: sin situation/situationEs`);
        return 0;
      }
      case "lesen-match": {
        // Goethe B1 T3: cada anuncio UNA vez y exactamente un "0".
        // LanguageCert Access R3: allowReuse (un texto puede repetirse) y
        // requireNone:false (el 0 no es obligatorio; ceros pueden ser 0).
        const ads = item.ads ?? [];
        const sits = item.situations ?? [];
        const allowReuse = !!item.allowReuse;
        const requireNone = item.requireNone !== false && !allowReuse;
        if (!ads.length) P(`${label}: sin anuncios`);
        if (!sits.length) P(`${label}: sin situaciones`);
        const keys = new Set();
        for (const ad of ads) {
          if (!ad.key || !String(ad.key).trim()) { P(`${label}: anuncio sin key`); continue; }
          if (ad.key === "0") P(`${label}: un anuncio usa la key "0", reservada para «ningún anuncio sirve»`);
          if (keys.has(ad.key)) P(`${label}: key de anuncio duplicada "${ad.key}"`);
          keys.add(ad.key);
          if (!ad.text) P(`${label}: anuncio "${ad.key}" sin texto`);
        }
        const used = new Map();
        let zeros = 0;
        for (const s of sits) {
          seeId(s.id, `situación de ${item.id}`);
          if (!s.situation || !s.situationEs) P(`${label}: situación "${s.id}" sin texto/traducción`);
          if (s.answer === "0") { zeros++; continue; }
          if (!keys.has(s.answer)) {
            P(`${label}: la situación "${s.id}" apunta al anuncio "${s.answer}", que NO existe (hay ${[...keys].join(", ")}) — irresoluble`);
            continue;
          }
          if (!allowReuse && used.has(s.answer)) {
            P(`${label}: el anuncio "${s.answer}" es la respuesta de "${used.get(s.answer)}" Y de "${s.id}" — en el examen cada anuncio se usa una sola vez`);
          } else used.set(s.answer, s.id);
        }
        if (requireNone) {
          if (zeros > 1) P(`${label}: ${zeros} situaciones con respuesta "0" — el examen deja exactamente una sin pareja`);
        }
        return 0;
      }
      case "lesen-insert": {
        const sents = item.sentences ?? [];
        const gaps = item.gaps ?? [];
        if (!item.title || !item.text) P(`${label}: sin title/text`);
        if (sents.length < 2) P(`${label}: banco de frases demasiado corto`);
        if (!gaps.length) P(`${label}: sin huecos`);
        const keys = new Set();
        for (const s of sents) {
          if (!s.key || !s.text) { P(`${label}: frase sin key/text`); continue; }
          if (keys.has(s.key)) P(`${label}: key de frase duplicada "${s.key}"`);
          keys.add(s.key);
        }
        const used = new Set();
        for (const g of gaps) {
          seeId(g.id, `hueco de ${item.id}`);
          if (!keys.has(g.answer)) P(`${label}: el hueco "${g.id}" apunta a "${g.answer}", que no está en el banco`);
          else if (used.has(g.answer)) P(`${label}: la frase "${g.answer}" rellena dos huecos`);
          else used.add(g.answer);
        }
        if (sents.length - used.size < 1) P(`${label}: no sobra ninguna frase (el examen deja al menos una fuera)`);
        return 0;
      }
      case "hoeren-group": {
        if (!item.audio) P(`${label}: grupo sin audio (es lo único que comparten sus ítems)`);
        const subs = item.items ?? [];
        if (!subs.length) P(`${label}: grupo SIN ítems (el alumno oye el audio y no hay nada que responder)`);
        for (const sub of subs) {
          seeId(sub.id, `sub-ítem de ${item.id}`);
          if (sub.kind === "hoeren-group") P(`${label}: grupo anidado dentro de otro grupo (no lo puntúa nadie)`);
          else checkItem(sub, true);
        }
        return 0;
      }
      case "hoeren-notes":
      case "lesen-notes": {
        if (item.kind === "hoeren-notes") {
          if (!item.audio) P(`${label}: sin audio`);
          if (typeof item.twice !== "boolean") P(`${label}: twice debe ser boolean`);
        } else {
          if (!item.title || !item.text) P(`${label}: sin title/text`);
        }
        const gaps = item.gaps ?? [];
        if (!gaps.length) P(`${label}: sin huecos (nada que escribir)`);
        for (const g of gaps) {
          seeId(g.id, `hueco de ${item.id}`);
          if (!g.prompt || !g.promptEs) P(`${label}: hueco "${g.id}" sin prompt/promptEs`);
          if (!g.answers?.length || g.answers.some((a) => isEmpty(a))) {
            P(`${label}: hueco "${g.id ?? "?"}" sin answers (incorrectible)`);
          }
          if (g.maxWords !== undefined && (!Number.isInteger(g.maxWords) || g.maxWords < 1 || g.maxWords > 5)) {
            P(`${label}: hueco "${g.id}" con maxWords ${g.maxWords} (debe estar entre 1 y 5)`);
          }
          const cap = g.maxWords ?? (item.kind === "lesen-notes" ? 5 : 3);
          for (const a of g.answers ?? []) {
            const n = String(a).trim().split(/\s+/).filter(Boolean).length;
            if (n > cap) P(`${label}: hueco "${g.id}" acepta "${a}" (${n} palabras, tope ${cap})`);
          }
        }
        return 0;
      }
      case "hoeren-photo-match": {
        if (!item.audio) P(`${label}: sin audio`);
        const photos = item.photos ?? [];
        const its = item.items ?? [];
        if (photos.length < 5) P(`${label}: ${photos.length} foto(s) (mínimo 5)`);
        if (!its.length) P(`${label}: sin ítems (nada que emparejar)`);
        const keys = new Set();
        for (const p of photos) {
          if (!p.key || !String(p.key).trim()) { P(`${label}: foto sin key`); continue; }
          if (p.key === "0") P(`${label}: una foto usa la key "0", reservada`);
          if (keys.has(p.key)) P(`${label}: key de foto duplicada "${p.key}"`);
          keys.add(p.key);
          if (!p.scene || !p.sceneEs) P(`${label}: foto "${p.key}" sin scene/sceneEs`);
        }
        for (const it of its) {
          seeId(it.id, `ítem de ${item.id}`);
          if (!it.prompt || !it.promptEs) P(`${label}: ítem "${it.id}" sin prompt/promptEs`);
          if (!keys.has(it.answer)) {
            P(`${label}: el ítem "${it.id}" apunta a la foto "${it.answer}", que NO existe`);
          }
        }
        return 0;
      }
      case "schreiben-form": {
        const fields = item.fields ?? [];
        if (!fields.length) P(`${label}: formulario sin campos`);
        for (const [i, f] of fields.entries()) {
          if (!f.label) P(`${label}: campo ${i + 1} sin label`);
          if (!f.answers?.length) P(`${label}: campo "${f.label ?? i + 1}" sin answers (incorrectible)`);
        }
        if (!item.scenario || !item.scenarioEs) P(`${label}: sin scenario/scenarioEs`);
        return 0;
      }
      case "schreiben-message": {
        if (!item.task || !item.taskEs) P(`${label}: sin task/taskEs`);
        if (!item.points?.length) P(`${label}: sin puntos de contenido (no hay tarea que cumplir)`);
        if ((item.points ?? []).some((p) => isEmpty(p))) P(`${label}: punto de contenido vacío`);
        if (isEmpty(item.model)) P(`${label}: sin model (la autoevaluación no tiene con qué comparar)`);
        if (item.stimulus && (!item.stimulus.source || !item.stimulus.text)) {
          P(`${label}: stimulus sin source/text (no hay a qué reaccionar)`);
        }
        const max = item.points_max ?? (item.rubric ? 40 : 10);
        if (item.points_max !== undefined && !(item.points_max > 0)) P(`${label}: points_max ${item.points_max} (debe ser > 0)`);
        checkRubric(P, label, item.rubric, max);
        return item.points_max ?? (item.rubric ? 40 : 0);
      }
      case "sprechen": {
        if (![1, 2, 3, 4].includes(item.teil)) P(`${label}: teil ${item.teil} inválido (1-4)`);
        if (item.weight !== undefined && !(item.weight > 0)) P(`${label}: weight ${item.weight} (debe ser > 0)`);
        const w = item.weight ?? (item.teil === 2 ? 1.5 : 3);
        if (!item.prompt || !item.promptEs) P(`${label}: sin prompt/promptEs`);
        if (isEmpty(item.model)) P(`${label}: sin model`);
        checkRubric(P, label, item.rubric, w);
        return item.weight ?? 0;
      }
      case "sprechen-praesentation": {
        if (item.weight !== undefined && !(item.weight > 0)) P(`${label}: weight ${item.weight} (debe ser > 0)`);
        const w = item.weight ?? 40;
        if (!item.topic || !item.topicEs) P(`${label}: sin topic/topicEs`);
        const slides = item.slides ?? [];
        if (slides.length !== 5) P(`${label}: ${slides.length} diapositiva(s) — el Teil 2 del B1 tiene SIEMPRE 5 fijas`);
        for (const [i, sl] of slides.entries()) {
          if (!sl.title || !sl.hint || !sl.model) P(`${label}: diapositiva ${i + 1} sin title/hint/model`);
        }
        checkRubric(P, label, item.rubric, w);
        return item.weight ?? 0;
      }
      default:
        P(`ítem con kind desconocido "${item.kind}" (${item.id ?? "sin id"}) — el baremo lo ignoraría en silencio`);
        return 0;
    }
  };

  for (const section of set.sections) {
    if (!SKILLS.includes(section.skill)) P(`sección con skill inválido "${section.skill}"`);
    if (!section.teile?.length) { P(`sección ${section.skill}: sin Teile`); continue; }
    let points = 0;
    for (const teil of section.teile) {
      if (!teil.title) P(`sección ${section.skill}: Teil sin título`);
      if (!teil.instruction || !teil.instructionEs) P(`"${teil.title ?? section.skill}": sin instruction/instructionEs`);
      if (!teil.items?.length) { P(`"${teil.title ?? section.skill}": Teil sin ítems`); continue; }
      for (const item of teil.items) {
        examItems++;
        seeId(item.id, item.kind);
        points += checkItem(item, false);
      }
    }
    // MODULAR (B1): cada módulo vale 100 puntos exactos. Si los pesos suman más,
    // el alumno ve un porcentaje > 100 y el corte del 60 % deja de significar nada.
    if (modular && (section.skill === "schreiben" || section.skill === "sprechen") && points > 100 + 1e-9) {
      P(`módulo ${section.skill}: sus tareas suman ${points} puntos y el examen modular reparte 100`);
    }
  }
}

for (const file of CATALOG.filter((p) => p.kind === "exam").map((p) => p.file)) {
  let mod;
  try {
    mod = load(file);
  } catch (err) {
    problems.push(`simulacro ${file}: no se puede cargar (${err.message})`);
    continue;
  }
  const sets = Object.values(mod).filter((v) => v && typeof v === "object" && Array.isArray(v.sections));
  if (!sets.length) { problems.push(`simulacro ${file}: sin export de ExamSet (objeto con sections)`); continue; }
  for (const set of sets) validateExamSet(file, set);
}

// ── LIBRETAS DE REFERENCIA: /referencia lee estos exports por nombre
// con `?? []`, así que un export renombrado o vaciado NO rompe el build: pinta
// una sección en blanco. La lista de lo que consume se deriva de los ficheros
// de app/referencia/ (la página compone; cada libreta lee los suyos). Cada
// fichero se mira solo: un alias de uno no cuenta los usos de otro. Nada de
// listas paralelas que se pudran.
const refDir = join(scriptsDir, "..", "app", "referencia");
const refExpected = new Map(); // key de refModules → Set(exports usados)
if (existsSync(refDir)) {
  for (const name of readdirSync(refDir)) {
    if (!/\.tsx?$/.test(name)) continue;
    const src = readFileSync(join(refDir, name), "utf8");
    const alias = new Map(); // variable local → key de refModules
    for (const m of src.matchAll(/const\s+(\w+)\s*=\s*refModules\.(\w+)\s*;/g)) alias.set(m[1], m[2]);
    for (const [local, key] of alias) {
      const used = refExpected.get(key) ?? new Set();
      for (const m of src.matchAll(new RegExp(`\\b${local}\\?\\.(\\w+)`, "g"))) used.add(m[1]);
      refExpected.set(key, used);
    }
  }
}
let refModulesChecked = 0;
for (const { file, key } of CATALOG.filter((p) => p.kind === "reference")) {
  let mod;
  try {
    mod = load(file);
  } catch (err) {
    problems.push(`libreta ${file}: no se puede cargar (${err.message})`);
    continue;
  }
  refModulesChecked++;
  const exported = Object.entries(mod).filter(([, v]) => !isEmpty(v));
  if (!exported.length) problems.push(`libreta ${file}: no exporta NADA con contenido`);
  const want = refExpected.get(key);
  // La otra mitad del cableado: estar en el catálogo mete la libreta en el
  // bundle, pero si /referencia no lee su clave nadie la pinta jamás. Viaja
  // (pesa) y no se ve — que es como estuvo la del inglés A2.
  if (!refExpected.has(key)) {
    problems.push(
      `libreta ${file}: viaja en el bundle (el catálogo la trae con la clave "${key}") pero ` +
        `app/referencia/ no lee refModules.${key} — nadie la pinta. Añade su const y sus pestañas.`,
    );
    continue;
  }
  if (!want.size) {
    warnings.push(`libreta ${file}: no pude derivar de app/referencia/ qué exports consume (¿cambió el formato?) — solo se comprueba que no esté vacía`);
    continue;
  }
  for (const name of [...want].sort()) {
    if (!(name in mod)) {
      problems.push(`libreta ${file}: /referencia lee "${name}" y el módulo NO lo exporta — la sección saldría en blanco sin romper el build`);
    } else if (isEmpty(mod[name])) {
      problems.push(`libreta ${file}: el export "${name}" está vacío — /referencia pintaría una sección sin contenido`);
    }
  }
}

for (const w of warnings) console.warn(`⚠ ${w}`);

// ── N18 BLINDADO: una palabra, UNA tarjeta ─────────────────────────────────
// Dos ids con el mismo `target` en el mismo idioma son dos tarjetas de SRS
// para la misma palabra: el alumno la repasa el doble y la mochila miente
// sobre su tamaño. Si un módulo posterior quiere reforzar una palabra ya
// enseñada, la REFERENCIA por su id de siempre — no la vuelve a declarar.
// Corre SIEMPRE, exista o no el sello (published-ids.json): esta red no
// protege progreso ya vendido, protege que no se declare un duplicado hoy —
// un `mv published-ids.json` no debe poder apagarla (19a/19b).
{
  const byTarget = {};
  for (const [id, it] of Object.entries(vocab)) {
    const lang = vocabPack[id]?.lang ?? "de";
    const key = `${lang}\u001f${String(it.target ?? "").trim()}`;
    (byTarget[key] ??= []).push(id);
  }
  for (const [key, ids] of Object.entries(byTarget)) {
    if (ids.length < 2) continue;
    const [lang, target] = key.split("\u001f");
    problems.push(
      `«${target}» (${lang}) está declarada ${ids.length} veces: ${ids.join(", ")} — ` +
        `son ${ids.length} tarjetas de SRS para UNA palabra (deuda N18). Deja la primera, borra las demás y ` +
        `apunta sus itemIds a la que queda; si ya estaba publicada, añade la fila en scripts/vocab-aliases.json.`,
    );
  }
}

// El mismo lema con artículo de cita y sin él no choca en N18 («Hund» y
// «der Hund» son dos tarjetas). Se avisa y no se falla: fundir ids es alias,
// snapshot y migración, y cada par es su propia decisión. El lema no se
// pasa a minúsculas ni se le quitan diacríticos — eso juntaría palabras que
// no son la misma—. La exención del A1 inglés es de prefijos de id y no
// entra aquí. El listado de avisos de arriba ya se imprimió: estos salen
// ahora, o se quedan en el array y nadie los ve.
{
  const porLema = {};
  for (const [id, it] of Object.entries(vocab)) {
    const lang = vocabPack[id]?.lang ?? "de";
    const partes = articuloYLema(lang, it?.target);
    if (!partes) continue;
    const key = `${lang}\u001f${partes.lema}`;
    const grupo = (porLema[key] ??= { lang, lema: partes.lema, items: [] });
    grupo.items.push({ id, raw: partes.raw, conArticulo: partes.conArticulo });
  }
  const cita = (xs) => xs
    .slice()
    .sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
    .map((x) => `${x.id} («${x.raw}»)`)
    .join(", ");
  const desde = warnings.length;
  for (const key of Object.keys(porLema).sort()) {
    const grupo = porLema[key];
    const con = grupo.items.filter((x) => x.conArticulo);
    const sin = grupo.items.filter((x) => !x.conArticulo);
    if (!con.length || !sin.length) continue;
    warnings.push(
      `«${grupo.lema}» (${grupo.lang}): el mismo lema está con artículo y sin él. ` +
        `Sin artículo: ${cita(sin)}. Con artículo: ${cita(con)}. ` +
        `Mismo idioma, dos tarjetas de SRS. Aviso, no es un fallo del build: no se fusionan los ids.`,
    );
  }
  for (let i = desde; i < warnings.length; i++) console.warn(`⚠ ${warnings[i]}`);
}

// Excepciones de gapbank-twins.json que ya no corresponden a ninguna gemela
// real (el ejercicio cambió): igual que N18, no depende de que exista el
// sello — es higiene del propio libro de excepciones.
for (const key of Object.keys(twinLedger)) {
  if (!twinLedgerSeen.has(key)) {
    warnings.push(
      `scripts/gapbank-twins.json: la excepción "${key}" ya no corresponde a ninguna gemela — ` +
        `el ejercicio cambió; borra la fila para que el libro no acumule permisos muertos`,
    );
  }
}

// CONVENCIÓN DE IDS: cada ítem de vocabulario lleva el prefijo de SU módulo.
// Con `b1muell` nadie sabe de dónde sale un itemId al leer una lección, y ya
// costó un duplicado (b1meinermeinungnach vs b1m1meinermeinungnach) que el
// alumno repasaba dos veces. Se unificó entero en la v1.3.2; esta regla es lo
// que impide que el nivel vuelva a tener dos convenciones a la vez. Tampoco
// depende del sello: es una regla sobre CÓMO SE ESCRIBE un id nuevo, no sobre
// qué se ha vendido ya.
//
// ── LA EXCEPCIÓN DEL A1 INGLÉS, QUE NO SE «ARREGLA» ──────────────────────
// Los ids del A1 inglés son `enhello`, `enbreakfast`: prefijo de idioma y
// nada más, sin módulo. Incumplen la convención Y VAN A SEGUIR INCUMPLIÉNDOLA:
// se publicaron en los drops 3 y 4, así que son claves de progreso vivas en
// las máquinas de alumnos reales. Renombrarlas son cientos de filas de alias
// a cambio de nada — la convención es para leer el contenido, no para el
// alumno. Así que la regla se aplica a los módulos NUEVOS (ena2m*, enb1m*) y
// ena1m* queda exento a propósito. Si algún día alguien viene a "unificarlo",
// que lea esto antes: la deuda es intencionada y quitarla rompe progreso ajeno.
const A1_EN_EXENTO = /^ena1m\d+$/;
// construido desde CEFR_SCALE (PLAN 1.9.9 F1.4): antes era un literal propio
// que solo reconocía a1/a2/b1, así que un módulo b2m*/c1m* se saltaba ESTA
// comprobación de prefijo entera, en silencio. Si añades un CEFR a la escala
// y esta regex no sale de CEFR_SCALE, estás mintiendo.
const MODULE_PREFIX_RE = new RegExp(`^[a-z]{0,2}(${CEFR_SCALE.join("|")})m?\\d+$`);
for (const [id, pack] of Object.entries(vocabPack)) {
  const mod = /^(?:data\/)?(?:[a-z]+\/)?([a-z0-9]+)$/.exec(pack.file ?? "")?.[1];
  // fases especiales (exámenes, phaseN del A1 alemán) fuera; `en` delante
  // porque los módulos ingleses se llaman ena2m3, enb1m7…
  if (!mod || !MODULE_PREFIX_RE.test(mod)) continue;
  if (A1_EN_EXENTO.test(mod)) continue;
  if (!id.startsWith(mod)) {
    problems.push(
      `${id} vive en ${mod} pero no lleva su prefijo — con ids sin módulo no se sabe de dónde ` +
        `sale un itemId, y dos módulos acaban enseñando la misma palabra por separado. ` +
        `Renómbralo a ${mod}${id.replace(new RegExp(`^(?:[a-z]{2})?(?:${CEFR_SCALE.join("|")})?(?:m\\d+)?`), "")} y añade la fila en scripts/vocab-aliases.json.`,
    );
  }
}

// ── SELLO DE LO PUBLICADO: scripts/published-ids.json lista los ids que ya
// viajaron a clientes (drops 1-4). A diferencia del snapshot, NO se regenera:
// si el snapshot se borra por accidente la red desaparece en silencio, y esto
// la mantiene. Un id publicado que desaparece = progreso huérfano en máquinas
// ajenas. Solo se amplía a mano al publicar un drop nuevo.
// Esto SÍ depende de que exista el sello (no hay nada contra qué comparar sin
// él) — a diferencia de los tres checks de arriba, que ahora corren siempre. ──
const sealedPath = join(scriptsDir, "published-ids.json");
if (existsSync(sealedPath)) {
  const sealed = JSON.parse(readFileSync(sealedPath, "utf8"));
  // TODAS las familias selladas se comparan igual (antes exerciseIds y phaseIds
  // se guardaban pero NO se miraban: los ~3.900 ids de ejercicio son claves de
  // SRS y quedaban fuera de la red — G4 del auditor frío). examSetIds se suma
  // aquí: `exam-${setId}` es clave de progreso real (lib/ids.ts) y hasta ahora
  // renombrar un ExamSet.id pasaba el validador en verde (19a).
  const now = {
    lessonIds: new Set(lessonIds),
    vocabIds: new Set(Object.keys(vocab)),
    exerciseIds: new Set(exerciseIds),
    phaseIds: new Set(
      mods.map(([, mod]) => Object.values(mod).find((v) => v && Array.isArray(v.lessons))?.id).filter(Boolean),
    ),
    examSetIds: new Set(examSetIds),
  };

  const LABEL = { lessonIds: "lecciones", vocabIds: "ítems de vocabulario", exerciseIds: "ejercicios", phaseIds: "fases", examSetIds: "simulacros" };
  // Un id publicado puede desaparecer del contenido SOLO si el registro de alias
  // dice a dónde se fue: entonces el progreso viaja (backend/migrate_items.go),
  // que es justo lo que este sello protege.
  let sealAliases = {};
  const sealAliasPath = new URL("./vocab-aliases.json", import.meta.url);
  if (existsSync(sealAliasPath)) {
    try {
      sealAliases = JSON.parse(readFileSync(sealAliasPath, "utf8")).aliases ?? {};
    } catch {
      /* el problema se reporta abajo, en el bloque del snapshot */
    }
  }
  const gone = [];
  for (const key of Object.keys(now)) {
    const missing = (sealed[key] ?? []).filter((id) => !now[key].has(id) && !sealAliases[id]);
    if (missing.length) {
      gone.push(`${missing.length} ${LABEL[key]} (${missing.slice(0, 5).join(", ")}${missing.length > 5 ? "…" : ""})`);
    }
  }
  if (gone.length) {
    problems.push(
      `SELLO ROTO — ids ya PUBLICADOS (manifiestos: ${(sealed.publishedManifests ?? []).join(", ")}) que ya no existen: ` +
        gone.join(" · ") +
        ` — eso deja huérfano el progreso de quien ya compró. Restaura los ids o migra el progreso a conciencia.`,
    );
  }
}

console.log(formatStrandReport(strandRows));
console.log(
  `validador: ${ORDER.length} fases · ${lessons} lecciones · ${exercises} ejercicios · ` +
    `${Object.keys(vocab).length} ítems · ${missionCount} misiones · ` +
    `${examSets} simulacros (${examItems} ítems de examen) · ${refModulesChecked} libretas`,
);
// OJO: aquí NO se sale NI SE IMPRIME EL DETALLE. La verja (con el listado
// completo) está al FINAL del archivo, después de las comprobaciones del
// snapshot y del registro de alias. Antes el detalle se imprimía AQUÍ y la
// verja final solo mostraba el recuento — así que los `problems.push`
// posteriores (misión con módulo inexistente, alias ilegible, alias cuyo
// origen sigue vivo, alias cuyo DESTINO NO EXISTE, alias encadenado) se
// anotaban y nadie veía CUÁLES eran: el build fallaba mudo (N2).
//
// El snapshot de ids tiene DOS salidas propias más abajo (`process.exit(1)`
// si es ilegible, o si le faltan ids) — cada una imprime SU mensaje y corta.
// `flushProblems()` se llama justo antes de ambas para que, si esa salida
// gana la carrera, lo acumulado en `problems` hasta ese punto (los checks del
// cuerpo del archivo, N18, prefijos, sello…) NO se pierda por el camino.
function flushProblems() {
  if (!problems.length) return;
  console.error(`\n✗ ${problems.length} problema(s) de contenido:\n` + problems.map((p) => "  - " + p).join("\n"));
}

// ── Snapshot de ids: el backend guarda progreso/SRS por estos ids — un drop
// que RENOMBRE o BORRE ids deja huérfanos meses de progreso de clientes sin
// que nadie lo note. Los ids actuales deben ser superconjunto del snapshot. ──
const snapshotPath = join(scriptsDir, "content-ids.snapshot.json");
const phaseIds = mods
  .map(([, mod]) => Object.values(mod).find((v) => v && Array.isArray(v.lessons))?.id)
  .filter(Boolean)
  .sort();

// Cada misión cuelga de un módulo REAL. Si el id no existe (un renombrado a
// medias, un copy-paste entre idiomas), la misión no se abre nunca y el alumno
// se queda sin la práctica del módulo sin que nadie se entere.
{
  const known = new Set(phaseIds);
  for (const pid of missionPhaseIds) {
    if (!known.has(pid)) {
      problems.push(`misión ${pid}: no existe ningún módulo con ese id — la misión queda inalcanzable`);
    }
  }
}
const current = {
  lessonIds: [...lessonIds].sort(),
  vocabIds: Object.keys(vocab).sort(),
  exerciseIds: [...exerciseIds].sort(),
  // los ids de fase también son claves de progreso (test-<phaseId>, certificados)
  phaseIds,
};
if (existsSync(snapshotPath)) {
  let prev = null;
  try {
    prev = JSON.parse(readFileSync(snapshotPath, "utf8"));
  } catch {
    flushProblems();
    console.error(
      `✗ snapshot ilegible (${snapshotPath}).\n` +
        `  NO lo borres a ciegas: es la red que avisa de ids retirados. Recupéralo del control de\n` +
        `  versiones (git checkout -- ${snapshotPath}) y, si de verdad se perdió, regenéralo desde el\n` +
        `  último build publicado antes de tocar contenido.`,
    );
    process.exit(1);
  }
  // Un id retirado deja de ser huérfano SI está en el registro de alias: ahí
  // consta a qué id se fundió, y backend/migrate_items.go se lleva el progreso
  // guardado. Sin esa fila, sigue siendo progreso que desaparece en silencio.
  let aliases = {};
  const aliasPath = new URL("./vocab-aliases.json", import.meta.url);
  if (existsSync(aliasPath)) {
    try {
      aliases = JSON.parse(readFileSync(aliasPath, "utf8")).aliases ?? {};
    } catch {
      problems.push("scripts/vocab-aliases.json ilegible: es el registro que salva el progreso de los ids retirados");
    }
  }
  const allCurrent = new Set([...current.lessonIds, ...current.vocabIds, ...current.exerciseIds, ...current.phaseIds]);
  for (const [from, to] of Object.entries(aliases)) {
    if (allCurrent.has(from)) {
      problems.push(`alias ${from} → ${to}: el id de origen SIGUE en el contenido; un alias vivo esconde la palabra duplicada que venía a arreglar`);
    }
    if (!allCurrent.has(to)) {
      problems.push(`alias ${from} → ${to}: el destino no existe en el contenido — el progreso migrado caería en el vacío`);
    }
    if (aliases[to]) {
      problems.push(`alias ${from} → ${to}: el destino también está retirado (cadena) — una sola pasada de migración no lo alcanza`);
    }
  }

  const missing = [];
  for (const key of ["lessonIds", "vocabIds", "exerciseIds", "phaseIds"]) {
    const have = new Set(current[key]);
    for (const id of prev?.[key] ?? []) {
      if (!have.has(id) && !aliases[id]) missing.push(`${key.replace(/Ids$/, "")}: ${id}`);
    }
  }
  if (missing.length) {
    flushProblems();
    console.error(
      `\n✗ ${missing.length} id(s) del snapshot ya no existen en el contenido:\n` +
        missing.map((m) => "  - " + m).join("\n") +
        `\n\n  Estos ids son CLAVES DE PROGRESO (lecciones hechas, SRS, certificados). Al desaparecer,` +
        `\n  el progreso guardado en máquinas ajenas queda huérfano y en silencio.` +
        `\n  Qué hacer, por este orden:` +
        `\n    1. Si fue un descuido (renombrar/borrar sin querer): RESTAURA el id exacto en data/.` +
        `\n    2. Si el cambio es deliberado: mantén el id viejo como alias o escribe la migración en el` +
        `\n       backend ANTES de retirarlo, y solo entonces actualiza el snapshot en el mismo commit` +
        `\n       (con la explicación en el mensaje) — nunca como paso suelto para "poner el build en verde".` +
        `\n  NO borres ${snapshotPath}: borrarlo no arregla nada, solo apaga la única alarma que avisa.`,
    );
    process.exit(1);
  }
}
// LA VERJA, al final y una sola vez: todo lo anotado durante el fichero cuenta,
// y el detalle completo se imprime AQUÍ (no antes) — es la única forma de que
// un fallo tardío (snapshot, alias, misión huérfana) no salga mudo (N2).
if (problems.length) {
  flushProblems();
  console.error(`\n✗ no se empaqueta nada hasta que estén resueltos.`);
  process.exit(1);
}

writeFileSync(snapshotPath, JSON.stringify(current, null, 2) + "\n");

console.log("✓ contenido válido · snapshot de ids regenerado");
