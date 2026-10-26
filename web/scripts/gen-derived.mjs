#!/usr/bin/env node
// Deriva del curso horneado (data/course.gen.ts) los módulos LIGEROS que lee
// el cliente. course.gen.ts importa todas las lecciones del drop: cualquier
// pantalla que lo tocara cargaba ~9 MB de JavaScript solo para listar módulos
// o contar palabras. Aquí se evalúa el curso una vez, en el build, y se
// escribe lo que cada pantalla necesita, como dato:
//
//   drop.gen.ts          el drop horneado (el mismo BUILT_DROP de course.gen.ts)
//   refs.gen.ts          las libretas de referencia de este build (/referencia)
//   phaseLoaders.gen.ts  el contenido de cada módulo, a demanda (el reto)
//   courseIndex.gen.ts   módulos y lecciones SIN contenido, misiones y
//                        simulacros sin su cuerpo (todas las pantallas)
//   vocabIds.gen.ts      ids de tarjeta por idioma (medallas, aviso de repaso)
//   vocabTargets.gen.ts  formas de las tarjetas (qué «…» de un enunciado suena)
//   vocab.<lang>.gen.ts  el vocabulario entero de UN idioma, que se pide aparte
//   vocabLoaders.gen.ts    y solo donde hace falta (repaso, reto, misión)
//   phaseWords.gen.ts    las palabras que trabaja cada módulo (diagnóstico)
//   nativo.gen.ts        la colección Nativo de cada idioma (/referencia)
//
// El contenido de una lección, un simulacro, una misión o un reto NO pasa por
// aquí: lo recorta su página en el servidor y se lo da ya hecho.
//
// Todo lo que lee el cliente sale de aquí y nada de gen-course.mjs: los tests
// que regeneran course.gen.ts con drops viejos no lo tocan, así que la app que
// ven el resto de tests sigue siendo una sola, la del drop horneado.
//
// Uso: node scripts/gen-derived.mjs            (escribe)
//      node scripts/gen-derived.mjs --check    (sale con 1 si algo está viejo)
// Lo lanzan build-app.sh (justo después de gen-course.mjs), `npm run build`,
// `npm run dev` y la demo. Si tocas contenido con el servidor de desarrollo en
// marcha, el índice no se entera hasta que lo vuelvas a lanzar.

import { registerHooks } from "node:module";
import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const webRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = join(webRoot, "data");
const check = process.argv.includes("--check");

if (typeof registerHooks !== "function") {
  console.error("✗ gen-derived necesita Node 24 (module.registerHooks y TypeScript sin transpilar)");
  process.exit(1);
}

// Node lee los .ts del contenido tal cual (quita los tipos); solo hay que
// enseñarle el alias "@/" y los imports sin extensión, como hace tsconfig.
registerHooks({
  resolve(spec, ctx, next) {
    let s = spec.startsWith("@/") ? pathToFileURL(join(webRoot, spec.slice(2))).href : spec;
    if ((s.startsWith(".") || s.startsWith("file:")) && !/\.(ts|tsx|js|mjs|json)$/.test(s)) {
      const base = s.startsWith("file:") ? fileURLToPath(s) : fileURLToPath(new URL(s, ctx.parentURL));
      for (const ext of [".ts", ".tsx", "/index.ts"]) {
        if (existsSync(base + ext)) return next(pathToFileURL(base + ext).href, ctx);
      }
    }
    return next(s, ctx);
  },
});
// web/package.json no declara "type": Node avisa en cada .ts que reinterpreta
// como módulo. Es ruido; cualquier otro aviso se sigue enseñando.
process.removeAllListeners("warning");
process.on("warning", (w) => {
  if (w.code === "MODULE_TYPELESS_PACKAGE_JSON" || w.name === "ExperimentalWarning") return;
  console.warn(w);
});

const gen = await import(pathToFileURL(join(dataDir, "course.gen.ts")).href);
const { courses, missionsByLang, genExamsByLang, refModules, BUILT_DROP } = gen;
const { CATALOG } = await import(pathToFileURL(join(webRoot, "content", "catalog.mjs")).href);

const HEADER = `// ⚠️ GENERADO por scripts/gen-derived.mjs — NO editar a mano.
// Derivado de course.gen.ts (drop ${BUILT_DROP}). Regenerar: node scripts/gen-derived.mjs`;

/** copia sin las claves dadas, en el mismo orden (el índice se lee igual que el curso) */
function without(obj, drop) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) if (!drop.includes(k)) out[k] = v;
  return out;
}

/** un registro grande, una entrada por línea: diffs legibles al cambiar contenido */
function recordLines(rec) {
  const lines = Object.entries(rec).map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`);
  return lines.length ? `{\n${lines.join("\n")}\n}` : "{}";
}

const files = new Map();

// ── el drop, las libretas y los cargadores de módulo ──
files.set(
  "drop.gen.ts",
  `${HEADER}

/** el drop de contenido incluido en ESTE build: el BUILT_DROP de course.gen.ts */
export const BUILT_DROP = ${BUILT_DROP};
`,
);
// Los TIPOS de todas las libretas del catálogo y el valor de las que trae el
// build: la misma forma que refModules en course.gen.ts (type-only = cero bundle)
const allRefs = CATALOG.filter((p) => p.kind === "reference").sort((a, b) => a.since - b.since);
const refs = allRefs.filter((p) => refModules[p.key]);
files.set(
  "refs.gen.ts",
  `${HEADER}
${allRefs.map((p) => `import type * as RefT_${p.key} from "./${p.file}";`).join("\n")}
${refs.map((p) => `import * as ref_${p.key} from "./${p.file}";`).join("\n")}

/** libretas de referencia incluidas (type-only para las ausentes: cero bundle) */
export const refModules: { ${allRefs.map((p) => `${p.key}?: typeof RefT_${p.key}`).join("; ")} } = {
${refs.map((p) => `  ${p.key}: ref_${p.key},`).join("\n")}
};
`,
);
const moduleRows = Object.values(courses).flatMap((c) =>
  c.phases.map((p) => {
    const row = CATALOG.find((r) => r.kind === "module" && r.id === p.id);
    if (!row) throw new Error(`gen-derived: el módulo «${p.id}» no tiene fila en content/catalog.mjs`);
    return row;
  }),
);
files.set(
  "phaseLoaders.gen.ts",
  `${HEADER}
import type { Phase } from "@/lib/types";

/** el contenido completo de cada módulo de este build, en un trozo aparte */
export const phaseLoaders: Record<string, () => Promise<Phase>> = {
${moduleRows.map((p) => `  ${JSON.stringify(p.id)}: () => import("./${p.file}").then((m) => m.${p.exports.phase}),`).join("\n")}
};
`,
);

// ── índice: módulos, lecciones sin contenido, misiones y simulacros sin cuerpo ──
const courseIndex = {};
const phaseWords = {};
const nativoByLang = {};
for (const [lang, c] of Object.entries(courses)) {
  courseIndex[lang] = {
    phases: c.phases.map((p) => ({
      ...without(p, []),
      lessons: p.lessons.map((l) => ({
        ...without(l, ["sections", "resources"]),
        // lo que la página del módulo contaba recorriendo las secciones
        nEx: l.sections.reduce((n, sec) => n + (sec.exercises?.length ?? 0), 0),
      })),
    })),
    vocabCount: Object.keys(c.vocab).length,
  };
  nativoByLang[lang] = [];
  for (const p of c.phases) {
    // las palabras del módulo, en el mismo orden en que las juntaba moduleMastery
    const ids = new Set();
    for (const l of p.lessons) {
      for (const sec of l.sections ?? []) {
        for (const id of sec.itemIds ?? []) ids.add(id);
        for (const ex of sec.exercises ?? []) for (const id of ex.itemIds ?? []) ids.add(id);
        if (sec.kind === "nativo" && sec.nativo) {
          nativoByLang[lang].push({ card: sec.nativo, lessonId: l.id, level: p.level ?? "a1" });
        }
      }
    }
    phaseWords[p.id] = [...ids];
  }
}
const missionIndex = {};
for (const [lang, ms] of Object.entries(missionsByLang)) {
  missionIndex[lang] = {};
  for (const [phaseId, m] of Object.entries(ms)) {
    missionIndex[lang][phaseId] = { phaseId: m.phaseId, title: m.title, outcome: m.outcome };
  }
}
const examIndex = {};
for (const [lang, sets] of Object.entries(genExamsByLang)) {
  examIndex[lang] = sets.map((s) => {
    const meta = {};
    for (const [k, v] of Object.entries(s)) {
      meta[k] = k === "sections" ? v.map((sec) => without(sec, ["teile"])) : v;
    }
    return meta;
  });
}

files.set(
  "courseIndex.gen.ts",
  `${HEADER}
import type { CourseIndex, MissionMeta } from "@/lib/types";
import type { ExamMeta } from "@/lib/examTypes";

/** módulos y lecciones de este build, sin el contenido de ninguna lección */
export const courseIndex: Record<string, CourseIndex> = ${JSON.stringify(courseIndex, null, 1)};

/** de cada misión, lo que enseña la página del módulo */
export const missionIndex: Record<string, Record<string, MissionMeta>> = ${JSON.stringify(missionIndex, null, 1)};

/** simulacros sin sus Teile: lo que listan los hubs y cuentan las medallas */
export const examIndex: Record<string, ExamMeta[]> = ${JSON.stringify(examIndex, null, 1)};
`,
);

// ── vocabulario ──
const langs = Object.keys(courses);
files.set(
  "vocabIds.gen.ts",
  `${HEADER}

/** ids de tarjeta de cada idioma: basta para contar la mochila sin traer las tarjetas */
export const vocabIds: Record<string, string[]> = ${recordLines(
    Object.fromEntries(langs.map((l) => [l, Object.keys(courses[l].vocab)])),
  )};
`,
);
const targets = [
  ...new Set(Object.values(courses).flatMap((c) => Object.values(c.vocab).map((v) => v.target.toLowerCase()))),
];
files.set(
  "vocabTargets.gen.ts",
  `${HEADER}

/** formas de TODAS las tarjetas del build, en minúsculas */
export const vocabTargets: string[] = ${JSON.stringify(targets)};
`,
);
for (const lang of langs) {
  files.set(
    `vocab.${lang}.gen.ts`,
    `${HEADER}
import type { VocabItem } from "@/lib/types";

/** todas las tarjetas del idioma «${lang}» */
export const vocab: Record<string, VocabItem> = ${recordLines(courses[lang].vocab)};
`,
  );
}
files.set(
  "vocabLoaders.gen.ts",
  `${HEADER}
import type { VocabItem } from "@/lib/types";

/** el vocabulario de cada idioma, en un trozo aparte que se pide al usarlo */
export const vocabLoaders: Record<string, () => Promise<{ vocab: Record<string, VocabItem> }>> = {
${langs.map((l) => `  ${JSON.stringify(l)}: () => import("./vocab.${l}.gen"),`).join("\n")}
};
`,
);

// ── diagnóstico y colección Nativo ──
files.set(
  "phaseWords.gen.ts",
  `${HEADER}

/** las palabras que trabaja cada módulo (frases y ejercicios de sus lecciones) */
export const phaseWords: Record<string, string[]> = ${recordLines(phaseWords)};
`,
);
files.set(
  "nativo.gen.ts",
  `${HEADER}
import type { Cefr, NativoCard } from "@/lib/types";

/** tarjetas Nativo de cada idioma, con la lección que las trae y su nivel */
export const nativoByLang: Record<string, { card: NativoCard; lessonId: string; level: Cefr }[]> = ${recordLines(nativoByLang)};
`,
);

// vocab.<idioma>.gen.ts de un idioma que este build ya no trae: fuera, para
// que nada lo pueda importar por despiste
const stale = readdirSync(dataDir).filter((f) => /^vocab\.[a-z]+\.gen\.ts$/.test(f) && !files.has(f));

if (check) {
  const old = [...files].filter(([name, text]) => {
    const path = join(dataDir, name);
    return !existsSync(path) || readFileSync(path, "utf8") !== text;
  });
  if (old.length || stale.length) {
    console.error(
      `✗ módulos derivados desfasados respecto a data/course.gen.ts: ${[...old.map(([n]) => n), ...stale].join(", ")}\n` +
        `  Regenera con: node scripts/gen-derived.mjs`,
    );
    process.exit(1);
  }
  console.log(`derivados al día (drop ${BUILT_DROP})`);
} else {
  for (const [name, text] of files) {
    const path = join(dataDir, name);
    if (!existsSync(path) || readFileSync(path, "utf8") !== text) writeFileSync(path, text);
  }
  for (const f of stale) rmSync(join(dataDir, f));
  console.log(`derivados escritos para el drop ${BUILT_DROP} (${[...files.keys()].join(", ")})`);
}
