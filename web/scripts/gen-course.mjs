#!/usr/bin/env node
// Genera data/course.gen.ts para un DROP concreto (U1: sellar la fuga).
// La base (drop 1) NO importa los archivos de drops futuros → su texto no
// existe en el bundle: la liberación escalonada es real también contra
// DevTools. Multi-IDIOMA: cada drop pertenece a un idioma; el generado emite
// un curso POR idioma (registry idioma→curso — nada de singleton alemán).
// Uso: node scripts/gen-course.mjs <drop>   (sin argumento = último drop, dev)
//
// PLAN-COMPOSICION.md FASE 1: el eje ya no son las cuatro tablas DROPS /
// MISSION_FILES / EXAM_FILES / REF_FILES (agrupaban por DROP). El catálogo
// (web/content/catalog.mjs) declara una fila por PIEZA, con su `since` (el
// drop en el que se publicó) — el número de drop sigue siendo el argumento
// de la CLI, pero ahora es un filtro sobre el catálogo (`since <= drop`),
// no un índice en una tabla. Criterio de aceptación: para n = 1..7, el
// `course.gen.ts` que esto produce es BYTE A BYTE IDÉNTICO al que producían
// las cuatro tablas viejas (verificado con `catalogFase1.test.ts`).

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { CATALOG } from "../content/catalog.mjs";
import { resolveAndClose, materializeForeignCards, manifestsDir, ALL_FEATURES_ON } from "./resolve-manifest.mjs";

export const MAX_DROP = Math.max(...CATALOG.map((p) => p.since));
const dataDir = join(dirname(fileURLToPath(import.meta.url)), "..", "data");

// escribir SOLO al ejecutarse directamente: importar este módulo (p. ej. para
// leer MAX_DROP desde otro script) no debe regenerar archivos como efecto
const runDirectly =
  process.argv[1] && import.meta.url.replace(/\\/g, "/").endsWith(process.argv[1].replace(/\\/g, "/").split("/").pop());
if (runDirectly) main();

function main() {
const arg = process.argv[2] ?? String(MAX_DROP);
// PLAN-COMPOSICION.md FASE 2: un argumento numérico sigue siendo "since <=
// N" (SIN TOCAR — es la ruta que catalogFase1.test.ts comprueba byte a byte
// contra los drops 1-7 de antes de esta fase); cualquier otra cosa es el id
// de un manifiesto (web/manifests/<id>.json), resuelto con cierre de
// vocabulario y, si arrastra tarjetas ajenas, un lockfile junto al generado.
if (/^\d+$/.test(arg)) {
  mainDrop(Number(arg));
} else {
  mainManifest(arg);
}
}

function mainDrop(drop) {
if (!Number.isInteger(drop) || drop < 1 || drop > MAX_DROP) {
  console.error(`drop inválido: ${drop} (1..${MAX_DROP})`);
  process.exit(1);
}

const included = CATALOG.filter((p) => p.since <= drop);
emit(included, { drop, importedCardsByLang: new Map(), manifestId: null });
writeFeatures(ALL_FEATURES_ON); // un drop numérico es siempre el build completo: todo encendido, como hoy
}

function mainManifest(manifestId) {
const { manifest, modules, exams, missions, references, staticReferences, foreign } = resolveAndClose(manifestId);
const included = [...modules, ...exams, ...missions, ...references, ...(staticReferences ?? [])];

// PLAN-COMPOSICION.md §6.3 opción A: las tarjetas ajenas se emiten como
// LITERALES en course.gen.ts, agrupadas por idioma — nunca se importa el
// fichero que las declara (eso metería sus lecciones en el bundle).
const importedCardsByLang = new Map(); // lang → Map(vocabId → VocabItem)
if (foreign.size > 0) {
  const cards = materializeForeignCards(foreign);
  for (const [id, item] of cards) {
    const ownerId = foreign.get(id);
    const owner = CATALOG.find((p) => p.kind === "module" && p.id === ownerId);
    if (!importedCardsByLang.has(owner.lang)) importedCardsByLang.set(owner.lang, new Map());
    importedCardsByLang.get(owner.lang).set(id, item);
  }
}

// el drop que ve el alumno es una etiqueta de negocio (PLAN-COMPOSICION.md
// §8.1): si el manifiesto la declara (`dropNumber`, los drop-N de producto),
// esa es la fuente; si no (un manifiesto que no es un drop: "solo-ingles",
// "muestra-b1m7"), no hay drop de producto que fingir — se usa el `since`
// más alto de lo incluido, que es la mejor aproximación honesta.
const drop = manifest.dropNumber ?? Math.max(...included.map((p) => p.since), 0);
emit(included, { drop, importedCardsByLang, manifestId });
writeFeatures(manifest.features);
writeLock(manifestId, manifest, { modules, exams, missions, references, foreign });
}

function emit(included, { drop, importedCardsByLang, manifestId }) {
// módulos: agrupar POR IDIOMA, en el orden (since, order) — el mismo orden
// que antes daban "drop ascendente, luego el `order` interno del drop".
const modules = included.filter((p) => p.kind === "module")
  .sort((a, b) => a.since - b.since || a.order - b.order);
const byLang = new Map(); // lang → { imports: [], order: [], vocabs: [] }
for (const p of modules) {
  if (!byLang.has(p.lang)) byLang.set(p.lang, { imports: [], order: [], vocabs: [] });
  const acc = byLang.get(p.lang);
  acc.imports.push(`import { ${p.exports.phase}, ${p.exports.vocab} } from "./${p.file}";`);
  acc.vocabs.push(p.exports.vocab);
  acc.order.push(p.exports.phase);
}

// PLAN-COMPOSICION.md §6.3 opción A: tarjetas ajenas materializadas como
// literales, una `const` por idioma que las necesita — vacío en la ruta de
// drop numérico, así que no cambia ni un byte de lo que ya se vendía.
const importedCardsVarByLang = new Map(); // lang → nombre de la const
const importedCardsDecls = [];
for (const [lang, cardsMap] of importedCardsByLang) {
  if (cardsMap.size === 0) continue;
  const varName = `importedCards_${lang}`;
  importedCardsVarByLang.set(lang, varName);
  const entries = [...cardsMap.entries()]
    .map(([id, item]) => `  ${JSON.stringify(id)}: ${JSON.stringify(item, null, 2).replace(/\n/g, "\n  ")},`)
    .join("\n");
  importedCardsDecls.push(
    `/** Tarjetas que este build necesita y cuyos módulos NO viajan (cierre de\n` +
    ` *  vocabulario del manifiesto «${manifestId}»). Emitidas como dato, no\n` +
    ` *  importadas: traer su fichero metería también sus lecciones en el bundle.\n` +
    ` *  Los ids son los originales — el progreso del alumno vale igual. */\n` +
    `const ${varName}: Record<string, VocabItem> = {\n${entries}\n};`,
  );
}
const hasImportedCards = importedCardsDecls.length > 0;

// misiones incluidas (por idioma de su propia fila del catálogo)
const missions = included.filter((p) => p.kind === "mission").sort((a, b) => a.since - b.since);
const missionImports = missions.map((p) => `import { ${p.exports.missions} } from "./${p.file}";`);
const missionSpreadByLang = new Map(); // lang → [exportName...]
for (const p of missions) {
  if (!missionSpreadByLang.has(p.lang)) missionSpreadByLang.set(p.lang, []);
  missionSpreadByLang.get(p.lang).push(p.exports.missions);
}

const allImports = [];
const courseEntries = [];
for (const [lang, acc] of byLang) {
  allImports.push(...acc.imports);
  const importedLine = importedCardsVarByLang.has(lang) ? `\n      ...${importedCardsVarByLang.get(lang)},` : "";
  courseEntries.push(`  ${lang}: {
    phases: [
      ${acc.order.join(", ")},
    ],
    vocab: {
${acc.vocabs.map((v) => `      ...${v},`).join("\n")}${importedLine}
    },
  },`);
}

// simulacros incluidos, agrupados por idioma de su propia fila
const exams = included.filter((p) => p.kind === "exam").sort((a, b) => a.since - b.since);
const examImports = exams.map((p) => `import { ${p.exports.set} } from "./${p.file}";`);
const examsByLangAcc = new Map();
for (const p of exams) {
  if (!examsByLangAcc.has(p.lang)) examsByLangAcc.set(p.lang, []);
  examsByLangAcc.get(p.lang).push(p.exports.set);
}
const examEntries = [...examsByLangAcc.entries()]
  .map(([lang, exps]) => `  ${lang}: [${exps.join(", ")}],`)
  .join("\n");

// referencias incluidas (import de namespace, key fija)
const refs = included.filter((p) => p.kind === "reference").sort((a, b) => a.since - b.since);
const refImports = refs.map((p) => `import * as ref_${p.key} from "./${p.file}";`);
const refEntries = refs.map((p) => `  ${p.key}: ref_${p.key},`);

// Los TIPOS de todas las libretas, sea cual sea su drop: `import type` no emite
// una línea al bundle, así que el registro tiene la misma forma en un build
// base que en el último, y la libreta que aún no viaja queda simplemente sin
// valor. Se derivan del catálogo ENTERO (no filtrado por drop) para que
// añadir una libreta sea una fila.
const allRefs = CATALOG.filter((p) => p.kind === "reference").sort((a, b) => a.since - b.since);
const refTypeImports = allRefs.map((p) => `import type * as RefT_${p.key} from "./${p.file}";`);
const refTypeFields = allRefs.map((p) => `${p.key}?: typeof RefT_${p.key}`);

const missionEntries = [...missionSpreadByLang.entries()]
  .map(([lang, exps]) => `  ${lang}: { ${exps.map((e) => `...${e}`).join(", ")} },`)
  .join("\n");

const headerLine2 = manifestId
  ? `// Manifiesto horneado: ${manifestId} (drop ${drop}). Regenerar: node scripts/gen-course.mjs ${manifestId}`
  : `// Drop horneado: ${drop}. Regenerar: node scripts/gen-course.mjs <drop>`;
const typeImportLine = hasImportedCards
  ? `import type { Course, Mission, VocabItem } from "@/lib/types";`
  : `import type { Course, Mission } from "@/lib/types";`;
const importedCardsSection = hasImportedCards ? `\n${importedCardsDecls.join("\n\n")}\n` : "";

const out = `// ⚠️ GENERADO por scripts/gen-course.mjs — NO editar a mano.
${headerLine2}
${typeImportLine}
import type { ExamSet } from "@/lib/examTypes";
${refTypeImports.join("\n")}
${allImports.join("\n")}
${missionImports.join("\n")}
${examImports.join("\n")}
${refImports.join("\n")}
${importedCardsSection}
/** el drop de contenido incluido en ESTE build (fuente única) */
export const BUILT_DROP = ${drop};

/** registry idioma → curso: SOLO los idiomas con contenido en este drop */
export const courses: Record<string, Course> = {
${courseEntries.join("\n")}
};

/** misiones de práctica real por idioma (drop-gated como las fases) */
export const missionsByLang: Record<string, Record<string, Mission>> = {
${missionEntries}
};

/** simulacros por idioma (drop-gated — U1 aplica a TODO contenido) */
export const genExamsByLang: Record<string, ExamSet[]> = {
${examEntries}
};

/** libretas de referencia incluidas (type-only para las ausentes: cero bundle) */
export const refModules: { ${refTypeFields.join("; ")} } = {
${refEntries.join("\n")}
};
`;

writeFileSync(join(dataDir, "course.gen.ts"), out);
const langs = [...byLang.keys()].map((l) => `${l}:${byLang.get(l).order.length}`).join(", ");
const label = manifestId ? `manifiesto "${manifestId}" (drop ${drop})` : `el drop ${drop}`;
console.log(`course.gen.ts generado para ${label} (fases por idioma → ${langs})`);
}

/** `data/features.gen.ts` — PLAN-COMPOSICION.md §7.3: qué trae ESTE build,
 *  compilado desde el manifiesto del mismo modo que `course.gen.ts`. Un
 *  `false` aquí no esconde un botón: hace que la UI ni lo pregunte por
 *  runtime (§11.5 — nada de interruptores fuera del build). */
function writeFeatures(features) {
  const fields = Object.entries(features)
    .map(([k, v]) => `  ${k}: ${v},`)
    .join("\n");
  const out = `// ⚠️ GENERADO por scripts/gen-course.mjs — NO editar a mano.
export const FEATURES = {
${fields}
} as const;

export type Capability = keyof typeof FEATURES;

export const has = (c: Capability): boolean => FEATURES[c];
`;
  writeFileSync(join(dataDir, "features.gen.ts"), out);
}

/** El lockfile — PLAN-COMPOSICION.md §4.5: qué se ha construido EXACTAMENTE,
 *  para poder diffearlo entre dos builds del mismo manifiesto sin leer
 *  `course.gen.ts` entero, y para que el smoke lo compruebe contra el
 *  binario ya compilado (T6, §9.3). */
function writeLock(manifestId, manifest, { modules, exams, missions, references, foreign }) {
  const langs = [...new Set(modules.map((p) => p.lang))].sort();
  const levels = [...new Set(modules.map((p) => `${p.lang}-${p.level}`))].sort();
  const lock = {
    manifest: manifestId,
    resolvedAt: new Date().toISOString().slice(0, 10),
    modules: modules.map((p) => p.id).sort(),
    exams: exams.map((p) => p.id).sort(),
    missions: missions.map((p) => p.id).sort(),
    references: references.map((p) => p.id).sort(),
    features: manifest.features,
    importedCards: Object.fromEntries([...foreign.entries()].sort()),
    counts: { modules: modules.length, exams: exams.length, missions: missions.length, references: references.length },
    langs,
    levels,
  };
  writeFileSync(join(manifestsDir, `${manifestId}.lock.json`), JSON.stringify(lock, null, 2) + "\n");
}
