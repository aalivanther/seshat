import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement, type ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { refModules } from "@/data/course.gen";
import { LibretaDeA1 } from "@/app/referencia/deA1";
import { LibretaDeA2 } from "@/app/referencia/deA2";
import { LibretaDeB1 } from "@/app/referencia/deB1";
import { LibretaDeB2 } from "@/app/referencia/deB2";
import { LibretaEnA1 } from "@/app/referencia/enA1";
import { LibretaEnA2 } from "@/app/referencia/enA2";
import { LibretaEnB1 } from "@/app/referencia/enB1";
import { LibretaEnB2 } from "@/app/referencia/enB2";
import { NativoTab } from "@/app/referencia/nativo";

// P32: la página solo compone. Cada pestaña tiene que seguir pintando, y cada
// export que una libreta lee por nombre tiene que existir — si no, la sección
// sale en blanco sin romper el build (el validador mira lo mismo).

const web = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const dir = join(web, "app", "referencia");
const read = (name: string) => readFileSync(join(dir, name), "utf8");

const PAGE_TABS: { name: string; file: string; Comp: ComponentType<{ tab: string }> }[] = [
  { name: "TABS", file: "deA1.tsx", Comp: LibretaDeA1 },
  { name: "TABS_A2", file: "deA2.tsx", Comp: LibretaDeA2 },
  { name: "TABS_B1", file: "deB1.tsx", Comp: LibretaDeB1 },
  { name: "TABS_B2", file: "deB2.tsx", Comp: LibretaDeB2 },
  { name: "TABS_EN", file: "enA1.tsx", Comp: LibretaEnA1 },
  { name: "TABS_EN_A2", file: "enA2.tsx", Comp: LibretaEnA2 },
  { name: "TABS_EN_B1", file: "enB1.tsx", Comp: LibretaEnB1 },
  { name: "TABS_EN_B2", file: "enB2.tsx", Comp: LibretaEnB2 },
];

function tabIds(src: string, name: string): string[] {
  const m = src.match(new RegExp(`const ${name} = \\[([\\s\\S]*?)\\] as const`));
  if (!m) throw new Error(`no está ${name}`);
  return [...m[1].matchAll(/id: "([^"]+)"/g)].map((x) => x[1]);
}

function isEmpty(v: unknown): boolean {
  if (v === undefined || v === null) return true;
  if (Array.isArray(v)) return v.length === 0;
  if (typeof v === "string") return v.trim() === "";
  if (typeof v === "object") return Object.keys(v).length === 0;
  return false;
}

/** Lo mismo que el validador: alias `const x = refModules.clave` y usos `x?.export`. */
function exportsUsados(): Map<string, Set<string>> {
  const expected = new Map<string, Set<string>>();
  for (const name of readdirSync(dir)) {
    if (!name.endsWith(".tsx")) continue;
    const src = read(name);
    const alias = new Map<string, string>();
    for (const m of src.matchAll(/const\s+(\w+)\s*=\s*refModules\.(\w+)\s*;/g)) alias.set(m[1], m[2]);
    for (const [local, key] of alias) {
      const used = expected.get(key) ?? new Set<string>();
      for (const m of src.matchAll(new RegExp(`\\b${local}\\?\\.(\\w+)`, "g"))) used.add(m[1]);
      expected.set(key, used);
    }
  }
  return expected;
}

describe("P32 · la libreta partida, la página solo compone", () => {
  const page = read("page.tsx");

  it("la página monta cada libreta y no se queda el detalle", () => {
    for (const { file } of PAGE_TABS) {
      const stem = file.replace(/\.tsx$/, "");
      expect(page, stem).toContain(`from "./${stem}"`);
    }
    expect(page).toContain('from "./nativo"');
    expect(page).not.toMatch(/function (EnVerbsTab|NumbersTab|NativoTab|EnB1TensesTab)\b/);
    expect(page).not.toContain("Busca un verbo (alemán o español)");
    expect(page).not.toContain("Dativo, Wechsel, weil y comparativo");
    expect(page).toContain('from "@/components/ExerciseKinds"');
  });

  it("cada pestaña de la página pinta en su libreta, y nativo sigue en la página", () => {
    expect(page).toContain('tab === "nativo"');
    for (const { name, file, Comp } of PAGE_TABS) {
      const ids = tabIds(page, name);
      expect(ids, name).toContain("nativo");
      const src = read(file);
      for (const id of ids) {
        if (id === "nativo") {
          expect(src, `${file} no pinta nativo`).not.toContain('tab === "nativo"');
          continue;
        }
        expect(src, `${file} ${id}`).toContain(`tab === "${id}"`);
        const html = renderToStaticMarkup(createElement(Comp, { tab: id }));
        expect(html.length, `${file} ${id} en blanco`).toBeGreaterThan(40);
      }
    }
    const nativo = renderToStaticMarkup(createElement(NativoTab, { level: "a1", lang: "de" }));
    expect(nativo).toContain("Nativo");
  });

  it("cada ancla que una libreta lee sigue existiendo y con contenido", () => {
    const expected = exportsUsados();
    const claves = ["verbs", "questions", "pronunciation", "a2", "en", "b1", "ena2", "enb1", "b2", "enb2"];
    const mods = refModules as Record<string, Record<string, unknown> | undefined>;
    for (const key of claves) {
      const want = expected.get(key);
      expect(want && want.size > 0, `nadie lee refModules.${key}`).toBe(true);
      const mod = mods[key];
      expect(mod, key).toBeTruthy();
      for (const name of want ?? []) {
        expect(Object.prototype.hasOwnProperty.call(mod, name), `${key}.${name}`).toBe(true);
        expect(isEmpty(mod?.[name]), `${key}.${name} vacío`).toBe(false);
      }
    }
  });
});
