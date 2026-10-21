import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { capOralPoints, interviewFor, oralLeyendaPortada, oralNotaLeyenda, scoreOralSchema } from "@/app/entrevista/page";
import type { Cefr } from "@/lib/cefr";

describe("Vortrag B2 — esquema cobrado en 4 casillas", () => {
  const vortrag = () => {
    const cfg = interviewFor("de", "b2");
    if (!cfg) throw new Error("no hay entrevista de-b2");
    const item = cfg.build().find((it) => it.schemaChecks && it.schemaChecks.length === 4);
    if (!item) throw new Error("el Vortrag no trae 4 casillas");
    return item;
  };

  it("el primer ítem DE B2 cobra These · zwei Argumente · Gegenposition · Schluss", () => {
    const labels = vortrag().schemaChecks!.map((c) => c.label);
    expect(labels).toEqual([
      "Einleitung mit These",
      "zwei Argumente",
      "Gegenposition",
      "Schluss mit Vorschlag",
    ]);
  });

  it("el modelo cubre las cuatro; una frase suelta no cubre ninguna → 0", () => {
    const item = vortrag();
    expect(scoreOralSchema(item, item.model).hit).toBe(4);
    expect(capOralPoints(item, 2, item.model)).toBe(2);
    expect(scoreOralSchema(item, "Ja, ich finde das gut.").hit).toBe(0);
    expect(capOralPoints(item, 2, "Ja, ich finde das gut.")).toBe(0);
  });

  it("These + Deshalb sin Allerdings deja el esquema incompleto: como mucho 1", () => {
    const item = vortrag();
    const half =
      "In meinem Vortrag geht es um den Nahverkehr. Erstens sinken die Abgase. Zweitens gewinnen Schichtarbeiter. Deshalb plädiere ich für ein Sozialticket.";
    const s = scoreOralSchema(item, half);
    expect(s.hit).toBeGreaterThanOrEqual(2);
    expect(s.hit).toBeLessThan(4);
    expect(s.missing).toContain("Gegenposition");
    expect(capOralPoints(item, 2, half)).toBe(1);
  });
});

/** Ítems que ya se califican y se dejan sin casillas: inventar el baremo
 *  sería contenido. El único esquema es el Vortrag de de-b2. */
const SIN_CASILLAS: { lang: string; cefr: Cefr; n: number }[] = [
  { lang: "de", cefr: "a1", n: 16 },
  { lang: "en", cefr: "a1", n: 16 },
  { lang: "de", cefr: "a2", n: 6 },
  { lang: "de", cefr: "b1", n: 4 },
  { lang: "en", cefr: "a2", n: 13 },
  { lang: "en", cefr: "b1", n: 8 },
  { lang: "en", cefr: "b2", n: 5 },
];

describe("P13 — una cadena, y el esquema manda la leyenda", () => {
  it("sin casillas el 0–2 del modelo se guarda tal cual", () => {
    const cfg = interviewFor("de", "a1");
    if (!cfg) throw new Error("no hay entrevista de-a1");
    const item = cfg.build()[0];
    expect(item.schemaChecks).toBeUndefined();
    expect(scoreOralSchema(item, item.model).total).toBe(0);
    expect(capOralPoints(item, 2, "cualquier cosa")).toBe(2);
    expect(capOralPoints(item, 0, item.model)).toBe(0);
  });

  it("solo el Vortrag de de-b2 trae casillas; el resto no se inventa", () => {
    for (const row of SIN_CASILLAS) {
      const cfg = interviewFor(row.lang, row.cefr);
      if (!cfg) throw new Error(`no hay entrevista ${row.lang}-${row.cefr}`);
      const items = cfg.build();
      expect(items, `${row.lang}-${row.cefr}`).toHaveLength(row.n);
      expect(items.filter((it) => (it.schemaChecks?.length ?? 0) > 0), `${row.lang}-${row.cefr}`).toEqual([]);
    }
    const b2 = interviewFor("de", "b2");
    if (!b2) throw new Error("no hay entrevista de-b2");
    const items = b2.build();
    expect(items).toHaveLength(5);
    const con = items.filter((it) => (it.schemaChecks?.length ?? 0) > 0);
    expect(con).toHaveLength(1);
    expect(con[0]?.prep).toBe(900);
    expect(con[0]?.schemaChecks).toHaveLength(4);
  });

  it("con casillas el número sale de ellas; sin casillas la nota es orientativa", () => {
    expect(oralNotaLeyenda(true, true)).toBe("El número sale de las casillas.");
    expect(oralNotaLeyenda(true, false)).toBe("El número sale de las casillas.");
    expect(oralNotaLeyenda(false, true)).toBe("La nota es orientativa.");
    expect(oralNotaLeyenda(false, false)).toBe("La nota es orientativa.");
    expect(oralLeyendaPortada(false, true, true)).toBe("La nota es orientativa.");
    expect(oralLeyendaPortada(true, true, true)).toBe(
      "Donde hay casillas: El número sale de las casillas. Donde no las hay: La nota es orientativa.",
    );
    expect(oralLeyendaPortada(true, false, false)).toBe("El número sale de las casillas.");
  });

  it("la pantalla pinta esa leyenda y ya no hay prompts GRADER_ muertos", () => {
    const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "app", "entrevista");
    const page = readFileSync(join(dir, "page.tsx"), "utf8");
    const archivos = readdirSync(dir).filter((n) => n.endsWith(".ts") || n.endsWith(".tsx"));
    for (const name of archivos) {
      expect(readFileSync(join(dir, name), "utf8"), name).not.toMatch(/const GRADER_/);
    }
    for (const name of ["deA1.ts", "deA2.ts", "deB1.ts", "deB2.ts", "enA1.ts", "enA2.ts", "enB1.ts", "enB2.ts"]) {
      const src = readFileSync(join(dir, name), "utf8");
      expect(src, name).not.toMatch(/oralGradeSystem|grader:/);
    }
    expect(page).toMatch(/leyendaDe\(item, false\)/);
    expect(page).toMatch(/leyendaDe\(r\.item, r\.deCasillas\)/);
    expect(page).toMatch(/leyendaPortada\(ITEMS, false\)/);
    expect(page).toMatch(/deCasillas: schema\.total > 0/);
    expect(page).not.toMatch(/corrige como un examinador|oralGradeSystem|aiChat/);
  });
});
