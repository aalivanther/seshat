import { describe, expect, it } from "vitest";
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { withCourseGenLock } from "./courseGenLock";
import { BUILT_DROP, courses } from "@/data/course";
import { DROP } from "@/lib/drop";
import { phaseLoaders } from "@/data/phaseLoaders.gen";
import { loadFullPhase } from "@/data/phases";
import { levels } from "@/lib/levels";
import { levelPseudoPhase } from "@/lib/retoLevel";

// El curso entero (data/course.gen.ts y lo que lo reexporta) son ~9 MB de
// JavaScript. Mientras un solo módulo de cliente lo importaba, viajaba entero
// a TODAS las páginas: la portada tardaba ~18 s en enseñarse con un 4G lento.
// Ahora el cliente lee el índice derivado (data/courseIndex.ts…) y cada
// página de servidor recorta lo suyo. Estas pruebas impiden la vuelta atrás.

const webRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

/** lo que solo puede importar el servidor (o un test) */
const SERVER_ONLY = [
  "@/data/course",
  "@/data/exams",
  "@/data/course.gen",
  "@/lib/contentSlices",
  "@/lib/newWords",
];

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (name === "__tests__" || name === "node_modules") continue;
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(ts|tsx)$/.test(name)) out.push(full);
  }
  return out;
}

/** page.tsx/layout.tsx sin "use client" (y los dos módulos que solo usan ellas) */
function isServerFile(rel: string, src: string): boolean {
  if (rel === "lib/contentSlices.ts" || rel === "lib/newWords.ts") return true;
  return /^app\/.*(page|layout)\.tsx$/.test(rel) && !/^\s*["']use client["']/.test(src);
}

function importsOf(src: string): string[] {
  return [...src.matchAll(/(?:^|\n)\s*(?:import|export)\s+(?!type\b)[^;]*?from\s+["']([^"']+)["']/g)].map((m) => m[1]);
}

describe("el curso entero no viaja al cliente", () => {
  const files = ["app", "components", "lib", "demo"].flatMap((d) => walk(join(webRoot, d)));

  it("ningún módulo de cliente (ni compartido) importa el curso completo", () => {
    const leaks: string[] = [];
    for (const f of files) {
      const rel = relative(webRoot, f).replace(/\\/g, "/");
      const src = readFileSync(f, "utf8");
      if (isServerFile(rel, src)) continue;
      for (const spec of importsOf(src)) {
        if (SERVER_ONLY.includes(spec)) leaks.push(`${rel} → ${spec}`);
      }
    }
    expect(leaks).toEqual([]);
  });

  it("las vistas ligeras de data/ no tiran del curso", () => {
    for (const name of ["courseIndex.ts", "examsIndex.ts", "vocab.ts", "vocabIdSet.ts", "phases.ts", "refs.gen.ts", "drop.gen.ts"]) {
      const src = readFileSync(join(webRoot, "data", name), "utf8");
      for (const spec of importsOf(src)) {
        expect(["./course.gen", "./course", "./exams"], `${name} → ${spec}`).not.toContain(spec);
      }
    }
  });

  it("los módulos derivados están al día con course.gen.ts", () => {
    // Otros tests regeneran course.gen.ts con drops viejos (y lo devuelven al
    // final). Con el candado puesto, si el drop horneado ya no es el de los
    // derivados, es uno de esos: no hay nada que comparar todavía.
    withCourseGenLock(() => {
      const dropOf = (file: string, re: RegExp) => re.exec(readFileSync(join(webRoot, "data", file), "utf8"))?.[1];
      const baked = dropOf("course.gen.ts", /BUILT_DROP = (\d+)/);
      const derived = dropOf("courseIndex.gen.ts", /Derivado de course\.gen\.ts \(drop (\d+)\)/);
      expect(derived, "courseIndex.gen.ts sin cabecera de drop").toBeDefined();
      if (baked !== derived) return;
      const out = execFileSync("node", [join(webRoot, "scripts", "gen-derived.mjs"), "--check"], {
        cwd: webRoot,
        encoding: "utf8",
      });
      expect(out).toContain("al día");
    });
  }, 120_000); // espera su turno con el candado de los que regeneran el curso

  // Estos dos comparan con el curso completo tal como se importó al arrancar
  // el fichero: si en ese instante otro test lo tenía regenerado con un drop
  // viejo, no son comparables (los derivados no se mueven con esos tests).
  const mismoDrop = BUILT_DROP === DROP;

  it.runIf(mismoDrop)("el reto pide cada módulo y recibe el mismo objeto que tiene el curso", async () => {
    const phases = Object.values(courses).flatMap((c) => c.phases);
    expect(Object.keys(phaseLoaders).sort()).toEqual(phases.map((p) => p.id).sort());
    for (const p of phases) expect(await loadFullPhase(p), p.id).toBe(p);
  });

  it.runIf(mismoDrop)("la vuelta al nivel junta las lecciones de sus módulos en el orden de siempre", async () => {
    for (const lv of levels.filter((l) => l.available)) {
      const meta = levelPseudoPhase(lv.id);
      if (!meta) continue;
      const full = await loadFullPhase(meta);
      const want = courses[lv.lang].phases.filter((p) => (p.level ?? "a1") === lv.cefr).flatMap((p) => p.lessons);
      expect(full.lessons.length, lv.id).toBe(want.length);
      full.lessons.forEach((l, i) => expect(l, `${lv.id} #${i}`).toBe(want[i]));
      expect({ ...full, lessons: [] }).toEqual({ ...meta, lessons: [] });
    }
  });
});
