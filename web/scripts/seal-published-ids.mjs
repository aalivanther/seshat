#!/usr/bin/env node
// Sella los ids que YA viajaron a clientes: scripts/published-ids.json.
//
// El sello es el contrato con quien ya pagó — cada id de esta lista es una
// clave de progreso viva en máquinas ajenas (lecciones hechas, SRS, tests de
// fase, certificados). validate-content.mjs falla si uno desaparece.
//
// Uso: node scripts/seal-published-ids.mjs <drop|manifiesto>   (lo que se ACABA de publicar)
//
// Reglas del script, a propósito:
//   · UNIÓN, nunca reemplazo — lo ya sellado no se pierde aunque el archivo de
//     data se haya reorganizado. Retirar un id sellado exige tocar el JSON a
//     mano y explicar por qué (nunca "porque el build estaba rojo").
//   · solo mira las piezas con `since` ≤ el drop pedido, leyendo el catálogo
//     (misma fuente única que el validador — PLAN-COMPOSICION.md FASE 1).
//   · PLAN-COMPOSICION.md §8.3, FASE 5: "solo se sella lo que se publica" — el
//     argumento puede ser un número de drop (como siempre) o el id de un
//     manifiesto (web/manifests/<id>.json) que de verdad se envió a clientes.
//     Un manifiesto EXPERIMENTAL ("muestra-b1m7", una prueba interna) no se
//     pasa nunca aquí: el sello no distingue "se compiló" de "se publicó" —
//     eso lo decide quien invoca el script, no el script.

import ts from "typescript";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const dataDir = join(scriptsDir, "..", "data");
const sealedPath = join(scriptsDir, "published-ids.json");

// El catálogo se IMPORTA, no se parsea. Antes (hasta la 1.9.9) se sacaban las
// tablas del texto fuente contando llaves; el import quita ese contrato de
// formato entero — gen-course.mjs solo escribe archivos cuando se ejecuta
// directamente, así que importarlo no tiene efectos.
import { CATALOG } from "../content/catalog.mjs";
import { resolveManifest, selectPieces } from "./resolve-manifest.mjs";

function load(name) {
  const src = readFileSync(join(dataDir, `${name}.ts`), "utf8");
  const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS } })
    .outputText.replace(/require\("@\/lib\/(?:types|examTypes)"\)/g, "{}");
  const mod = { exports: {} };
  new Function("exports", "require", "module", js)(mod.exports, () => ({}), mod);
  return mod.exports;
}

const arg = process.argv[2];
if (!arg) {
  console.error("uso: node scripts/seal-published-ids.mjs <drop publicado | manifiesto>  — ej. 4, o drop-4");
  process.exit(1);
}
const isNumeric = /^\d+$/.test(arg);
if (isNumeric && Number(arg) < 1) {
  console.error("uso: node scripts/seal-published-ids.mjs <drop publicado | manifiesto>  — ej. 4, o drop-4");
  process.exit(1);
}
// la etiqueta que entra en `publishedManifests` — "drop-N" para el uso de
// siempre (un número), o el id del manifiesto tal cual si se publicó uno.
const publishedLabel = isNumeric ? `drop-${arg}` : arg;
const modulePieces = isNumeric
  ? CATALOG.filter((p) => p.kind === "module" && p.since <= Number(arg))
  : selectPieces(resolveManifest(arg)).filter((p) => p.kind === "module");
const examPieces = isNumeric
  ? CATALOG.filter((p) => p.kind === "exam" && p.since <= Number(arg))
  : selectPieces(resolveManifest(arg)).filter((p) => p.kind === "exam");

const lessonIds = new Set(), vocabIds = new Set(), exerciseIds = new Set(), phaseIds = new Set(), examSetIds = new Set();
const files = modulePieces.map((p) => p.file);
for (const file of files) {
  const mod = load(file);
  for (const [k, v] of Object.entries(mod)) {
    if (k.toLowerCase().startsWith("vocab")) {
      for (const id of Object.keys(v)) vocabIds.add(id);
    } else if (v && Array.isArray(v.lessons)) {
      phaseIds.add(v.id);
      for (const lesson of v.lessons) {
        lessonIds.add(lesson.id);
        for (const sec of lesson.sections ?? []) {
          for (const e of sec.exercises ?? []) exerciseIds.add(e.id);
        }
      }
    }
  }
}
// ExamSet.id: `exam-${setId}` es clave de progreso real (lib/ids.ts), igual
// que lessonIds/exerciseIds/phaseIds — hasta ahora se guardaba en el drop
// pero no se sellaba (19a).
for (const file of examPieces.map((p) => p.file)) {
  const mod = load(file);
  for (const v of Object.values(mod)) {
    if (v && typeof v === "object" && Array.isArray(v.sections) && v.id) examSetIds.add(v.id);
  }
}

const prev = existsSync(sealedPath) ? JSON.parse(readFileSync(sealedPath, "utf8")) : {};
const union = (key, live) => {
  const out = new Set(prev[key] ?? []);
  const added = [];
  for (const id of live) if (!out.has(id)) { out.add(id); added.push(id); }
  const kept = (prev[key] ?? []).filter((id) => !live.has(id));
  return { list: [...out].sort(), added: added.length, orphan: kept };
};

// PLAN-COMPOSICION.md §8.3 — FASE 5: `throughDrop: N` (un número, asumía una
// línea temporal única) pasa a ser `publishedManifests` (una UNIÓN de
// etiquetas — "drop-1".."drop-7", o el id de un manifiesto real que se envió
// a clientes). Si el sello viejo solo tenía `throughDrop`, se reconstruye la
// lista de drops que representaba UNA VEZ, para no perder ese historial.
const prevPublished = new Set(
  prev.publishedManifests ?? (prev.throughDrop ? Array.from({ length: prev.throughDrop }, (_, i) => `drop-${i + 1}`) : []),
);
prevPublished.add(publishedLabel);
const publishedManifests = [...prevPublished].sort();

const out = {
  _comment:
    `IDS PUBLICADOS (manifiestos: ${publishedManifests.join(", ")}) — el progreso de clientes vive en ` +
    `estas claves (lecciones, ítems de SRS, EJERCICIOS y fases). Este archivo NO se regenera en cada ` +
    `build: si el validador detecta que falta uno, es que un drop renombró o borró contenido ya vendido. ` +
    `Solo se amplía al publicar de verdad, con: node scripts/seal-published-ids.mjs <drop|manifiesto> — ` +
    `nunca con un manifiesto experimental que no se envió a nadie.`,
  publishedManifests,
};
let report = [];
for (const [key, live] of [["lessonIds", lessonIds], ["vocabIds", vocabIds], ["exerciseIds", exerciseIds], ["phaseIds", phaseIds], ["examSetIds", examSetIds]]) {
  const r = union(key, live);
  out[key] = r.list;
  report.push(`${key}: ${r.list.length} (+${r.added} nuevos${r.orphan.length ? `, ${r.orphan.length} sellados que YA NO existen: ${r.orphan.slice(0, 5).join(", ")}` : ""})`);
}
writeFileSync(sealedPath, JSON.stringify(out, null, 1) + "\n");
console.log(`sello actualizado con "${publishedLabel}" (${files.length} archivos de fase) — publicados: ${publishedManifests.join(", ")}`);
for (const line of report) console.log(`  ${line}`);
