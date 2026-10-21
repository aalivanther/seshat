import { describe, expect, it } from "vitest";
import ts from "typescript";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Exercise } from "@/lib/types";
import { CATALOG } from "../../content/catalog.mjs";

// REGRESIÓN de un bug crítico encontrado en la auditoría del B1: 19 de los 97
// `gapbank` del nivel repiten una palabra en dos huecos ("wird … wird …
// werden"). El player marcaba cada palabra del banco como gastada al primer
// uso, así que esos ejercicios eran IMPOSIBLES de completar.
//
// El contrato REAL (components/kinds/Gapbank.tsx): el banco que se
// PINTA es `[...new Set(ex.bank)]` (deduplicado — una ficha por palabra
// distinta, aunque el array `bank` la liste dos veces) y cada ficha se puede
// reutilizar hasta `capacity[w] = max(veces en bank, veces en answers)` de las
// veces. Eso deja DOS formas de que un ejercicio sea irresoluble que el test
// anterior no distinguía:
//   (a) una respuesta necesita una palabra que NO ESTÁ en el banco en
//       absoluto: `capacity` la infla igualmente a partir de `answers` (su
//       fórmula es `max(0, n) = n`), así que la comparación numérica sale
//       "con capacidad de sobra" aunque NO EXISTA ninguna ficha que pintar —
//       el hueco queda sin nada que colocar (19h/18d: "capacidad desde
//       answers y aun así no se pinta");
//   (b) una palabra SÍ está en el banco pero varios huecos la reclaman más
//       veces de las que la capacidad (ya inflada) permite — solo se ve
//       simulando el consumo hueco a hueco, no comparando el total al final.
// El test anterior comparaba `capacityOf(bank, answers)[w] >= need[w]`, y como
// `capacityOf` YA incluye `need[w]` en su propio `max(...)`, la comparación es
// cierta por construcción: no podía fallar nunca (tautológico). Este test
// sustituye esa comparación por una SIMULACIÓN del jugador: banco deduplicado,
// consumo secuencial hueco a hueco, y el caso (a) aparte y explícito.

function load(file: string): Record<string, unknown> {
  const src = readFileSync(file, "utf8");
  const js = ts
    .transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS } })
    .outputText.replace(/require\("@\/lib\/(?:types|examTypes)"\)/g, "{}");
  const mod = { exports: {} as Record<string, unknown> };
  new Function("exports", "require", "module", js)(mod.exports, () => ({}), mod);
  return mod.exports;
}

function gapbanksOf(file: string): Exercise[] {
  const mod = load(file);
  const phase = Object.values(mod).find(
    (v): v is { lessons: { sections: { exercises?: Exercise[] }[] }[] } =>
      !!v && typeof v === "object" && Array.isArray((v as { lessons?: unknown }).lessons),
  );
  if (!phase) return [];
  return phase.lessons
    .flatMap((l) => l.sections.flatMap((s) => s.exercises ?? []))
    .filter((e) => e.type === "gapbank");
}

// Todos los archivos de fase del curso (no solo b1m1..12: el bug es del motor,
// no del B1 alemán). La lista sale del MISMO catálogo (content/catalog.mjs)
// que usa el validador y el empaquetado — nada de recorrer un rango a mano
// que se olvida de un nivel o de un idioma nuevo.
const files = CATALOG.filter((p) => p.kind === "module").map((p) => join("data", `${p.file}.ts`));

const count = (arr: string[]) =>
  arr.reduce<Record<string, number>>((m, w) => ({ ...m, [w]: (m[w] ?? 0) + 1 }), {});

/** la misma capacidad que calcula el player (con su misma fórmula, defectos incluidos) */
function capacityOf(bank: string[], answers: string[]): Record<string, number> {
  const cap = { ...count(bank) };
  for (const [w, n] of Object.entries(count(answers))) cap[w] = Math.max(cap[w] ?? 0, n);
  return cap;
}

/** simula rellenar los huecos EN ORDEN con la respuesta correcta, gastando
 *  fichas del banco DEDUPLICADO una a una — así se ve si un hueco se queda sin
 *  ficha aunque la capacidad "total" pareciera alcanzar */
function firstUnplayable(bank: string[], answers: string[]): number | null {
  const bankSet = new Set(bank);
  const capacity = capacityOf(bank, answers);
  const used: Record<string, number> = {};
  for (let i = 0; i < answers.length; i++) {
    const w = answers[i];
    if (!bankSet.has(w)) return i; // (a): ni una ficha pintada para esta palabra
    const soFar = used[w] ?? 0;
    if (soFar >= (capacity[w] ?? 0)) return i; // (b): capacidad ya gastada
    used[w] = soFar + 1;
  }
  return null;
}

describe("gapbank: todos los del curso son RESOLUBLES (simulación real del player)", () => {
  const all = files.flatMap((f) => gapbanksOf(f).map((e) => ({ f, e })));

  it("hay gapbanks que auditar", () => {
    expect(all.length).toBeGreaterThan(50);
  });

  it("cada hueco tiene una ficha disponible cuando le toca (banco deduplicado, consumo secuencial)", () => {
    const broken: string[] = [];
    for (const { f, e } of all) {
      const ex = e as unknown as { id: string; bank: string[]; answers: string[] };
      const gi = firstUnplayable(ex.bank, ex.answers);
      if (gi !== null) {
        const w = ex.answers[gi];
        const inBank = ex.bank.includes(w);
        broken.push(
          `${f} ${ex.id}: hueco ${gi + 1} necesita «${w}» y ` +
            (inBank ? "ya no queda ficha disponible (capacidad agotada por huecos anteriores)" : "esa palabra NO está en el banco — no hay ficha que pintar"),
        );
      }
    }
    expect(broken, broken.join("\n")).toHaveLength(0);
  });

  it("los que repiten palabra existen de verdad (el caso que rompía el player)", () => {
    const repeated = all.filter(({ e }) => {
      const ex = e as unknown as { answers: string[] };
      return ex.answers.length !== new Set(ex.answers).size;
    });
    // si algún día bajan a cero, el test sigue verde; lo que importa es que el
    // caso está cubierto por la simulación de arriba
    expect(repeated.length).toBeGreaterThan(0);
  });

  it("el número de huecos ___ coincide con el de respuestas", () => {
    const bad: string[] = [];
    for (const { f, e } of all) {
      const ex = e as unknown as { id: string; text: string; answers: string[] };
      const gaps = ex.text.split("___").length - 1;
      if (gaps !== ex.answers.length) bad.push(`${f} ${ex.id}: ${gaps} huecos vs ${ex.answers.length} respuestas`);
    }
    expect(bad, bad.join("\n")).toHaveLength(0);
  });
});
