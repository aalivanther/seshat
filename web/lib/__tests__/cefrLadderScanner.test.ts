import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";
import { CEFR_SCALE } from "@/lib/cefr";

// PLAN 1.9.9 F0.1 (ampliado en 1.9.9.5 B.1) — «nadie vuelve a escribir la
// escalera».
//
// La escala CEFR (a1·a2·b1·b2·c1·c2) se ha escrito a mano en el repo en
// varias formas y lenguajes (censo original en
// PLAN-ARQUITECTURA-MODULAR.md §5.1). Este test la busca por FORMA, no por
// archivo:línea — así que si mañana aparece una copia nueva en un sitio que
// nadie citó, este test la encuentra igual. Y así fue como sobrevivió una:
// `cefr.ts:asCefr` era una CADENA DE `if` (`cefr === "a1" || cefr === "a2" ||
// ...`), la única de las formas que el escáner de la 1.9.9 no reconocía —
// PLAN-1.9.9.5.md §B.1. Ahora es una forma más (ver `IF_CHAIN_SHAPES`).
//
// Única excepción: `web/lib/cefr.ts` (F1.1), que es donde la escala DEBE
// vivir. Cualquier otro sitio que la escriba es una copia que hay que borrar.

const SELF = fileURLToPath(import.meta.url);
const here = dirname(SELF);
const webRoot = join(here, "..", "..");
const repoRoot = join(webRoot, "..");

const ALLOWED_FILE = join(webRoot, "lib", "cefr.ts");

function walk(dir: string, exts: string[], out: string[] = []): string[] {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, exts, out);
    else if (exts.some((e) => name.endsWith(e))) out.push(full);
  }
  return out;
}

// Los cinco directorios que cita el plan — a propósito NO incluye `data/`:
// ahí vive contenido real (p.ej. `level: "b1"` de una fase), no lógica de
// comparación de niveles.
const WEB_DIRS = ["lib", "app", "components", "scripts"].map((d) => join(webRoot, d));
const BACKEND_DIR = join(repoRoot, "backend");

const webFiles = WEB_DIRS.flatMap((d) => walk(d, [".ts", ".tsx", ".mjs"]));
const goFiles = walk(BACKEND_DIR, [".go"]);

// PLAN 1.9.9.5 B.1 — séptima forma: una CADENA DE `if` que compara la misma
// variable contra dos o más peldaños consecutivos (`cefr === "a1" || cefr
// === "a2"`). Es justo la forma que sobrevivió al refactor de la 1.9.9 en
// `cefr.ts:asCefr`, porque las 6 formas de abajo no la reconocían. Generada
// desde CEFR_SCALE (no una copia más): un par por cada dos peldaños
// consecutivos, con backreference para exigir la MISMA variable a ambos lados.
const IF_CHAIN_SHAPES = CEFR_SCALE.slice(0, -1).map((tok, i) => {
  const next = CEFR_SCALE[i + 1];
  return {
    label: `cadena de if (=== "${tok}" || === "${next}")`,
    re: new RegExp(String.raw`(\w+)\s*===\s*["']${tok}["']\s*\|\|\s*\1\s*===\s*["']${next}["']`),
    files: webFiles,
  };
});

// Las FORMAS conocidas en las que el repo escribe la escalera hoy. Cada una
// es lo bastante genérica para pillar una copia nueva de la misma forma en
// cualquier archivo — no está anclada a una línea concreta.
const SHAPES: { label: string; re: RegExp; files: string[] }[] = [
  ...IF_CHAIN_SHAPES,
  {
    label: 'array ["a1","a2","b1",...]',
    re: /\[\s*["']a1["']\s*,\s*["']a2["']\s*,\s*["']b1["']/,
    files: webFiles,
  },
  {
    label: 'array ["a2","b1","b2","c1"] (medallas)',
    re: /\[\s*["']a2["']\s*,\s*["']b1["']\s*,\s*["']b2["']\s*,\s*["']c1["']/,
    files: webFiles,
  },
  {
    label: "mapa de rango {a1:0, a2:1, b1:2, ...}",
    re: /\ba1\s*:\s*0\s*,\s*a2\s*:\s*1\s*,\s*b1\s*:\s*2/,
    files: webFiles,
  },
  {
    label: 'mapa "siguiente nivel" {a1:"a2", a2:"b1", ...}',
    re: /\ba1\s*:\s*["']a2["']\s*,\s*a2\s*:\s*["']b1["']/,
    files: webFiles,
  },
  {
    label: "regex /(a1|a2|b1).../ ",
    re: /a1\|a2\|b1/,
    files: webFiles,
  },
  {
    label: 'mapa Go {"a1": true, "a2": true, "b1": true}',
    re: /"a1":\s*true,\s*"a2":\s*true,\s*"b1":\s*true/,
    files: goFiles,
  },
];

interface Hit {
  file: string;
  shape: string;
}

function scan(): Hit[] {
  const hits: Hit[] = [];
  for (const shape of SHAPES) {
    for (const file of shape.files) {
      if (file === ALLOWED_FILE) continue; // el único sitio permitido (F1.1)
      if (file === SELF) continue; // este propio fichero CITA las formas en comentarios/etiquetas
      const src = readFileSync(file, "utf8");
      if (shape.re.test(src)) hits.push({ file: relative(repoRoot, file), shape: shape.label });
    }
  }
  return hits;
}

function scanText(src: string): string[] {
  return SHAPES.filter((shape) => shape.re.test(src)).map((shape) => shape.label);
}

describe("PLAN 1.9.9 F0.1 — una sola escalera CEFR", () => {
  it("ninguna copia de la escalera vive fuera de web/lib/cefr.ts", () => {
    const hits = scan();
    // toEqual([]) imprime la lista completa en el diff si falla: es la prueba
    // de que "falla por la razón correcta" — hoy debe listar el censo entero.
    expect(hits).toEqual([]);
  });

  it("una copia sucia a propósito SÍ se ve (si esto pasa en vacío, el escáner es teatro)", () => {
    const dirty = `
      const orden = ["a1", "a2", "b1"];
      if (cefr === "a1" || cefr === "a2") return;
    `;
    const hits = scanText(dirty);
    expect(hits.some((h) => h.includes("array"))).toBe(true);
    expect(hits.some((h) => h.includes("cadena de if"))).toBe(true);
  });
});
