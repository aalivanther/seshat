import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { resolveItems } from "@/lib/resolveItems";

describe("resolveItems — §6.1 id huérfano no se traga", () => {
  it("1 id huérfano → missing, no un array más corto en silencio", () => {
    const vocab = { a: { id: "a" }, c: { id: "c" } };
    const r = resolveItems(["a", "fantasma", "c"], vocab);
    expect(r.items.map((x) => x.id)).toEqual(["a", "c"]);
    expect(r.missing).toEqual(["fantasma"]);
  });

  it("todos resuelven → missing vacío", () => {
    expect(resolveItems(["a"], { a: 1 }).missing).toEqual([]);
  });

  it("retoRun no traga ids huérfanos con filter(Boolean)", () => {
    const src = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "..", "lib", "retoRun.ts"), "utf8");
    expect(src).toMatch(/resolveItems\(/);
    expect(src).not.toMatch(/vocab\[id\]\)\.filter\(Boolean\)/);
  });

  it("LessonPlayer pinta contenido incompleto si hay ids huérfanos", () => {
    const src = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "..", "..", "components", "LessonPlayer.tsx"),
      "utf8",
    );
    expect(src).toMatch(/Contenido incompleto/);
    expect(src).toMatch(/missingIds\.length > 0/);
  });

  it("ids nulos, vacíos o vocab ausente no lanzan", () => {
    expect(resolveItems(null, null)).toEqual({ items: [], missing: [] });
    expect(resolveItems(["", "a"], { a: 1 }).missing).toEqual(["(vacío)"]);
    expect(resolveItems(undefined, undefined).items).toEqual([]);
  });
});

