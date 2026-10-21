import { describe, expect, it, afterAll } from "vitest";
import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// PLAN-COMPOSICION.md §8.3, FASE 5 — "solo se sella lo que se publica": el
// sello cambia de etiqueta (`throughDrop: N` → `publishedManifests: [...]`)
// pero sigue siendo UNIÓN, nunca reemplazo (CLAUDE.md: published-ids.json no
// se recorta ni se borra). Se prueba sobre una COPIA real del sello — nunca
// contra el de verdad, que es el contrato con clientes que ya pagaron.

const webRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const realSealed = join(webRoot, "scripts", "published-ids.json");
let dir = "";

function run(arg: string): string {
  return execFileSync("node", [join(dir, "scripts", "seal-published-ids.mjs"), arg], {
    cwd: dir,
    encoding: "utf8",
  });
}

describe("seal-published-ids.mjs: relabel throughDrop → publishedManifests, sin perder nada", () => {
  it("un sello viejo con throughDrop se migra a publishedManifests sin cambiar los ids sellados", () => {
    dir = mkdtempSync(join(tmpdir(), "seshat-sello-"));
    cpSync(join(webRoot, "scripts"), join(dir, "scripts"), { recursive: true });
    cpSync(join(webRoot, "content"), join(dir, "content"), { recursive: true });
    cpSync(join(webRoot, "data"), join(dir, "data"), { recursive: true });
    cpSync(join(webRoot, "manifests"), join(dir, "manifests"), { recursive: true });
    // el script transpila con `typescript`: se resuelve con un enlace al
    // node_modules de verdad en vez de copiarlo entero (mismo patrón que
    // validatorLang.test.ts).
    mkdirSync(join(dir, "node_modules"), { recursive: true });
    cpSync(join(webRoot, "node_modules", "typescript"), join(dir, "node_modules", "typescript"), { recursive: true });

    const real = JSON.parse(readFileSync(realSealed, "utf8"));
    // simular el formato PRE-fase-5: throughDrop en vez de publishedManifests
    const oldShape = { ...real, throughDrop: 7 };
    delete oldShape.publishedManifests;
    writeFileSync(join(dir, "scripts", "published-ids.json"), JSON.stringify(oldShape, null, 1));

    run("7");
    const after = JSON.parse(readFileSync(join(dir, "scripts", "published-ids.json"), "utf8"));

    expect(after.publishedManifests).toEqual(["drop-1", "drop-2", "drop-3", "drop-4", "drop-5", "drop-6", "drop-7"]);
    expect(after.throughDrop).toBeUndefined();
    // los CINCO conjuntos: ni uno de menos (unión). Pueden aparecer ids
    // nuevos del árbol actual; lo que no puede es perderse un id sellado.
    for (const key of ["lessonIds", "vocabIds", "exerciseIds", "phaseIds", "examSetIds"]) {
      const got = new Set(after[key] as string[]);
      for (const id of real[key] as string[]) {
        expect(got.has(id), `${key} perdió ${id}`).toBe(true);
      }
    }
  }, 30_000);

  it("sellar un manifiesto real (no un drop numérico) añade su propio id a publishedManifests", () => {
    run("solo-ingles");
    const after = JSON.parse(readFileSync(join(dir, "scripts", "published-ids.json"), "utf8"));
    expect(after.publishedManifests).toContain("solo-ingles");
    // sigue siendo unión: drop-1..7 no desaparecen porque se selló otra cosa
    expect(after.publishedManifests).toContain("drop-7");
  }, 30_000);

  afterAll(() => {
    if (dir) rmSync(dir, { recursive: true, force: true });
  });
});
