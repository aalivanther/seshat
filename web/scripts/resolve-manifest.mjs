// EL RESOLVEDOR — PLAN-COMPOSICION.md §4.2-§4.5, §5.3, §7.3.
//
// Sin versiones no hay conflictos, y sin conflictos no hay resolvedor de
// verdad (§5.3, §11.2): esto es un filtro por igualdad de campos (selección),
// un recorrido de alcanzabilidad (cierre de vocabulario) y una plantilla
// (emisión de course.gen.ts) — nada más. No se instala como dependencia de
// nada: build-app.sh y gen-course.mjs lo importan como un módulo más.

import ts from "typescript";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { CATALOG } from "../content/catalog.mjs";

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const webRoot = join(scriptsDir, "..");
const dataDir = join(webRoot, "data");
export const manifestsDir = join(webRoot, "manifests");

function loadManifestRaw(id) {
  const path = join(manifestsDir, `${id}.json`);
  if (!existsSync(path)) throw new Error(`manifiesto no encontrado: "${id}" (${path})`);
  return JSON.parse(readFileSync(path, "utf8"));
}

/** Sigue `extends` de hoja a raíz, detectando ciclos, y devuelve la cadena en
 *  orden raíz→hoja: así `include`/`exclude` se concatenan en ese orden y
 *  `features`/`policy` se sobrescriben campo a campo con la hoja ganando
 *  (PLAN-COMPOSICION.md §4.4). */
export function loadManifestChain(id) {
  const chain = [];
  const seen = new Set();
  let current = id;
  while (current) {
    if (seen.has(current)) {
      throw new Error(`manifiesto "${id}": ciclo de "extends" en "${current}" (cadena: ${[...seen].join(" → ")})`);
    }
    seen.add(current);
    const m = loadManifestRaw(current);
    chain.unshift(m);
    current = m.extends;
  }
  return chain;
}

const DEFAULT_POLICY = { vocabularyClosure: "cards", onMissingCard: "fail" };

// Las doce funcionalidades censadas en AUDITORIA-FUNCIONALIDADES.md, todas
// encendidas por defecto — apagar es la EXCEPCIÓN que un manifiesto declara,
// nunca el estado de partida (PLAN-COMPOSICION.md §7.3). Un manifiesto que no
// menciona una capacidad la hereda encendida, igual que el build de hoy la
// lleva siempre encendida.
export const ALL_FEATURES_ON = {
  ai: true, exams: true, missions: true, interview: true, review: true,
  challenges: true, placement: true, badges: true, reference: true,
  certificates: true, moduleTest: true, tts: true,
};

// Qué necesita qué (PLAN-COMPOSICION.md §7.6) — seis filas del censo, no un
// feature model: impide vender un certificado que nunca podrá emitirse
// (moduleTest/exams apagados) o una medalla que nunca podrá desbloquearse
// (exams/interview apagados), y separa review/challenges por dependencia real
// de código (`retoRun.ts` importa plantillas de `reviewSession.ts`).
export const CAP_REQUIRES = {
  certificates: ["moduleTest", "exams"],
  badges: ["exams", "interview"],
  challenges: ["review"],
};

/** T4 (§9.3): falla si una capacidad encendida necesita otra que está
 *  apagada, y dice cuál. Se llama en la resolución, no en runtime: un
 *  manifiesto que no cumple esto no debe llegar a compilar. */
export function checkCapRequires(features) {
  for (const [cap, needs] of Object.entries(CAP_REQUIRES)) {
    if (!features[cap]) continue;
    const missing = needs.filter((n) => !features[n]);
    if (missing.length > 0) {
      throw new Error(
        `manifiesto inválido: "${cap}" está encendida pero necesita [${needs.join(", ")}] — falta(n): ${missing.join(", ")}`,
      );
    }
  }
}

/** Resuelve un manifiesto (con su cadena de extends) a una forma plana:
 *  qué incluir/excluir, qué funcionalidades lleva y con qué política de
 *  cierre. No toca el catálogo todavía — eso es `selectPieces`. */
export function resolveManifest(id) {
  const chain = loadManifestChain(id);
  const leaf = chain[chain.length - 1];
  // `dropNumber` (PLAN-COMPOSICION.md §8.1): el número de drop que el alumno
  // ve es una ETIQUETA de negocio, no lo que hay dentro — un drop puede no
  // traer contenido nuevo (el drop 4 real, verificado: 0 filas del catálogo
  // con `since === 4`) y aun así el manifiesto tiene que declarar "soy el
  // drop 4". Por eso NO se deriva de `included`: la hoja de la cadena lo
  // declara explícito, y si no lo declara (un manifiesto que no es un drop
  // de producto: "solo-ingles", "muestra-b1m7"), no hay número que mostrar.
  const dropNumber = chain.reduceRight((found, m) => found ?? m.dropNumber, undefined);
  const features = Object.assign({}, ALL_FEATURES_ON, ...chain.map((m) => m.features ?? {}));
  checkCapRequires(features);
  return {
    id,
    name: leaf.name ?? id,
    dropNumber,
    include: chain.flatMap((m) => m.content?.include ?? []),
    exclude: chain.flatMap((m) => m.content?.exclude ?? []),
    features,
    policy: Object.assign({}, DEFAULT_POLICY, ...chain.map((m) => m.policy ?? {})),
  };
}

/** ¿esta pieza casa con este selector? Igualdad campo a campo; los campos que
 *  el selector no menciona no se miran. `{}` selecciona todo el catálogo.
 *  PLAN-COMPOSICION.md §4.3 — a propósito NO es una minisintaxis. */
const matches = (piece, sel) => Object.entries(sel).every(([k, v]) => piece[k] === v);

/** Una pieza entra si casa con ALGÚN include y con NINGÚN exclude.
 *  Si el manifiesto declara `dropNumber` (un drop de producto), además
 *  respeta `since`: una pieza publicada después no puede colarse porque
 *  case con un selector viejo (`lang+level` del A2, p.ej. un ExamSet Goethe
 *  A2 que llega en el drop 8). Sin `dropNumber` (muestra-b1m7, solo-ingles)
 *  no hay sello de drop que honrar y manda solo el selector. */
export function selectPieces(manifest) {
  return CATALOG.filter((p) => {
    if (manifest.dropNumber != null && p.since > manifest.dropNumber) return false;
    return manifest.include.some((s) => matches(p, s)) && !manifest.exclude.some((s) => matches(p, s));
  });
}

// ── carga de contenido real (mismo patrón que validate-content.mjs y
// seal-published-ids.mjs: transpileModule + Function, sin bundler) ──

function loadDataFile(file) {
  const src = readFileSync(join(dataDir, `${file}.ts`), "utf8");
  const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS } })
    .outputText.replace(/require\("@\/lib\/(?:types|examTypes)"\)/g, "{}");
  const mod = { exports: {} };
  new Function("exports", "require", "module", js)(mod.exports, () => ({}), mod);
  return mod.exports;
}

function phaseOf(mod) {
  return Object.values(mod).find((v) => v && typeof v === "object" && Array.isArray(v.lessons));
}

/** Todos los itemIds que una fase CITA (no los que declara) — misma forma que
 *  T2 de `composicionFase0.test.ts`: `sec.itemIds`, `sec.nativo?.itemId`,
 *  `ex.itemIds`. Simulacros y misiones no tienen esta forma (citan 0
 *  itemIds — son islas, PLAN-COMPOSICION.md §2.4): por eso el cierre solo
 *  mira módulos. */
function citedItemIds(phase) {
  const ids = new Set();
  for (const l of phase.lessons ?? []) {
    for (const sec of l.sections ?? []) {
      for (const id of sec.itemIds ?? []) ids.add(id);
      if (sec.nativo?.itemId) ids.add(sec.nativo.itemId);
      for (const ex of sec.exercises ?? []) {
        for (const id of ex.itemIds ?? []) ids.add(id);
      }
    }
  }
  return ids;
}

let moduleIndexCache = null;

/** Índice GLOBAL de todos los módulos del catálogo (no solo los
 *  seleccionados: el dueño de una tarjeta puede ser cualquier módulo, esté
 *  o no en este build) — `vocabOwner` (vocabId → id de catálogo del módulo
 *  que lo declara) y, por módulo, sus tarjetas propias y sus citas. Se
 *  calcula una vez por proceso: cargar 72 módulos con `transpileModule` mide
 *  0,93 s (PLAN-COMPOSICION.md §5.1) y este script solo corre en build/test,
 *  nunca en el runtime del alumno. */
function moduleIndex() {
  if (moduleIndexCache) return moduleIndexCache;
  const modules = CATALOG.filter((p) => p.kind === "module");
  const vocabOwner = new Map(); // vocabId → catalogId
  const byModule = new Map(); // catalogId → { ownVocabIds: Set, citedIds: Set }
  for (const p of modules) {
    const mod = loadDataFile(p.file);
    const phase = phaseOf(mod);
    const vocabExport = mod[p.exports.vocab] ?? {};
    const ownVocabIds = new Set(Object.keys(vocabExport));
    for (const id of ownVocabIds) vocabOwner.set(id, p.id);
    byModule.set(p.id, { ownVocabIds, citedIds: phase ? citedItemIds(phase) : new Set() });
  }
  moduleIndexCache = { vocabOwner, byModule };
  return moduleIndexCache;
}

/** Cierra un conjunto de módulos seleccionados según la política. Alcanza-
 *  bilidad, no satisfacibilidad — no hay versiones, no hay conflictos
 *  (PLAN-COMPOSICION.md §5.3). Devuelve el conjunto final de ids de módulo y
 *  el mapa de tarjetas ajenas arrastradas (vocabId → catalogId que las
 *  declara), vacío salvo con política "cards". */
export function closeVocabulary(selectedModuleIds, policy) {
  const { vocabOwner, byModule } = moduleIndex();
  const modules = new Set(selectedModuleIds);
  const foreign = new Map();

  const foreignOwnersOf = (moduleId) => {
    const entry = byModule.get(moduleId);
    if (!entry) return [];
    const owners = [];
    for (const id of entry.citedIds) {
      const owner = vocabOwner.get(id);
      if (!owner) throw new Error(`itemId huérfano: "${id}" (citado por "${moduleId}") — no lo declara ningún módulo del catálogo`);
      if (!modules.has(owner)) owners.push([id, owner]);
    }
    return owners;
  };

  if (policy === "modules") {
    const queue = [...modules];
    while (queue.length) {
      const current = queue.pop();
      for (const [, owner] of foreignOwnersOf(current)) {
        if (!modules.has(owner)) { modules.add(owner); queue.push(owner); }
      }
    }
    return { modules, foreign };
  }

  // "cards" y "strict": UN solo salto — una VocabItem no referencia a otra
  // (lib/types.ts, campos verificados en PLAN-COMPOSICION.md §5.3), así que
  // no hay cierre transitivo que calcular ni ciclo posible.
  for (const m of [...modules]) {
    for (const [id, owner] of foreignOwnersOf(m)) foreign.set(id, owner);
  }
  if (policy === "strict" && foreign.size > 0) {
    const lines = [...foreign.entries()].map(([id, owner]) => `  ${id} (de "${owner}")`);
    throw new Error(`manifiesto no cerrado: ${foreign.size} tarjetas ajenas\n${lines.join("\n")}`);
  }
  return { modules, foreign };
}

/** Las tarjetas ajenas, con su VocabItem completo (para materializarlas —
 *  PLAN-COMPOSICION.md §6.3 opción A). */
export function materializeForeignCards(foreign) {
  const { byModule } = moduleIndex();
  void byModule; // solo para mantener la caché caliente antes de recargar por fichero
  const cards = new Map();
  const byOwnerFile = new Map();
  for (const [id, ownerId] of foreign) {
    if (!byOwnerFile.has(ownerId)) {
      const piece = CATALOG.find((p) => p.kind === "module" && p.id === ownerId);
      byOwnerFile.set(ownerId, loadDataFile(piece.file)[piece.exports.vocab]);
    }
    cards.set(id, byOwnerFile.get(ownerId)[id]);
  }
  return cards;
}

/** Resuelve un manifiesto de punta a punta: selección + cierre de
 *  vocabulario. No escribe nada — eso lo hacen `writeCourseGen`/`writeLock`. */
export function resolveAndClose(manifestId) {
  const manifest = resolveManifest(manifestId);
  const selected = selectPieces(manifest);
  const selectedModuleIds = selected.filter((p) => p.kind === "module").map((p) => p.id);
  const { modules: closedModuleIds, foreign } = closeVocabulary(selectedModuleIds, manifest.policy.vocabularyClosure);

  const modules = [...closedModuleIds]
    .map((id) => CATALOG.find((p) => p.kind === "module" && p.id === id))
    .filter((p) => p !== undefined)
    .sort((a, b) => a.since - b.since || a.order - b.order);
  const exams = selected.filter((p) => p.kind === "exam").sort((a, b) => a.since - b.since);
  const missions = selected.filter((p) => p.kind === "mission").sort((a, b) => a.since - b.since);
  const references = selected.filter((p) => p.kind === "reference").sort((a, b) => a.since - b.since);
  const staticReferences = selected.filter((p) => p.kind === "staticReference");

  return { manifest, modules, exams, missions, references, staticReferences, foreign };
}

export { moduleIndex as _moduleIndexForTests };
