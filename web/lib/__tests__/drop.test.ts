import { describe, expect, it } from "vitest";
import { DROPS, DROP, levelInDrop, levelInDropFor, dropInfo } from "@/lib/drop";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const webRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

function extractObjectLiteral(src: string, name: string): Record<string, number> {
  const at = src.indexOf(name);
  const start = src.indexOf("{", at);
  let depth = 0, end = -1;
  for (let i = start; i < src.length; i++) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}" && --depth === 0) { end = i + 1; break; }
  }
  return new Function(`return ${src.slice(start, end)};`)() as Record<string, number>;
}

describe("drop.ts — T8 / §1.8", () => {
  const LEVEL_MIN_DROP = extractObjectLiteral(readFileSync(join(webRoot, "lib", "drop.ts"), "utf8"), "LEVEL_MIN_DROP");

  it("DROPS es 1..N continuo, cada uno con news y href que resuelve", () => {
    const ids = DROPS.map((d) => d.id);
    expect(ids).toEqual(Array.from({ length: ids.length }, (_, i) => i + 1));
    for (const d of DROPS) {
      expect(d.news.length).toBeGreaterThan(10);
      expect(d.href.startsWith("/")).toBe(true);
      expect(dropInfo(d.id)?.name).toBe(d.name);
    }
  });

  it("cada clave de LEVEL_MIN_DROP tiene DropInfo o es un nivel aún no anunciado con min > max DROPS", () => {
    const maxDrop = Math.max(...DROPS.map((d) => d.id));
    for (const [id, min] of Object.entries(LEVEL_MIN_DROP)) {
      expect(id).toMatch(/^[a-z]{2}-[a-z][12]$/);
      if (min <= maxDrop) expect(dropInfo(min), `${id} min=${min} sin DropInfo`).toBeDefined();
    }
  });

  it("BUILT_DROP < min → levelInDrop falso (no tarjeta de 0 módulos)", () => {
    expect(levelInDropFor("de-b1", 4)).toBe(false);
    expect(levelInDropFor("de-b1", 5)).toBe(true);
    expect(levelInDropFor("en-a2", 5)).toBe(false);
    expect(levelInDropFor("en-a2", 6)).toBe(true);
    expect(levelInDropFor("en-b1", 6)).toBe(false);
    expect(levelInDropFor("en-b1", 7)).toBe(true);
    expect(levelInDrop("de-a1")).toBe(true);
  });

  it("de-b2 y en-b2 entran en el drop 8, no antes", () => {
    expect(LEVEL_MIN_DROP["de-b2"]).toBe(8);
    expect(LEVEL_MIN_DROP["en-b2"]).toBe(8);
    expect(levelInDropFor("de-b2", 7)).toBe(false);
    expect(levelInDropFor("en-b2", 7)).toBe(false);
    expect(levelInDropFor("de-b2", 8)).toBe(true);
    expect(levelInDropFor("en-b2", 8)).toBe(true);
  });

  it("gen-course.mjs no mantiene una tabla LEVEL_MIN_DROP rival", () => {
    const gen = readFileSync(join(webRoot, "scripts", "gen-course.mjs"), "utf8");
    expect(gen).not.toMatch(/LEVEL_MIN_DROP/);
  });

  it("R1 — build-app.sh inyecta BUILT_DROP como contentVersion", () => {
    const sh = readFileSync(join(webRoot, "..", "build-app.sh"), "utf8");
    expect(sh).toMatch(/BUILT_DROP = \[0-9\]\*/);
    expect(sh).toMatch(/-X main\.contentVersion=\$DROP/);
  });
});
