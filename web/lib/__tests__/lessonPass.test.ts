import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const web = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const root = join(web, "..");

describe("P27 — el corte de lección hecha lo dice el servidor", () => {
  it("el confeti de la lección y de la prueba lee completed, no un 0,8 paralelo", () => {
    const lesson = readFileSync(join(web, "components", "LessonPlayer.tsx"), "utf8");
    const prueba = readFileSync(join(web, "app", "prueba", "[id]", "Client.tsx"), "utf8");

    expect(lesson).toMatch(/const hayRespuesta = server !== "pending"/);
    expect(lesson).toMatch(
      /server !== "pending" && server !== null && !!server\.lessons\[lesson\.id\]\?\.completed/,
    );
    expect(lesson).toMatch(/const fraseDominada = hayRespuesta \? dominada : score >= 80/);
    expect(lesson).toMatch(/if \(!finished \|\| total <= 0 \|\| !dominada\) return;/);
    expect(lesson).not.toMatch(/score >= 80\) \{ celebrate/);
    expect(lesson).toMatch(/Lección dominada\./);
    expect(lesson).toMatch(/Completada\. Lo que fallaste/);

    expect(prueba).toMatch(/st\?\.lessons\[id\]\?\.completed/);
    expect(prueba).not.toMatch(/total >= 0\.8/);
    expect(prueba).not.toMatch(/>= 0\.8/);
    expect(prueba).toMatch(/celebrate\(total >= 0\.9\)/);
  });

  it("los comentarios del registro no apuntan a un migrate.go ni a 34 palabras", () => {
    const json = readFileSync(join(web, "scripts", "vocab-aliases.json"), "utf8");
    const go = readFileSync(join(root, "backend", "migrate_items.go"), "utf8");
    expect(json).toMatch(/migrate_items\.go/);
    expect(json).toMatch(/esquema de 1 a 2/);
    expect(json).not.toMatch(/migrate\.go reescribe/);
    expect(go).toMatch(/no son «34 palabras del B1»/);
    expect(go).not.toMatch(/Hasta la v1\.3\.1, 34 palabras/);
    expect(go).toMatch(/desde migrateState/);
  });
});
