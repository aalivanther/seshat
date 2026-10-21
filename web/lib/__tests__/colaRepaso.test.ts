import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// P35: la cola de /api/due es la deuda que el producto decidió no enseñar.
// useProgress la pide por defecto; quien no pinta dueCount tiene que apagarla.
// Quien sí la pinte (hoy no queda ninguna) sigue pidiéndola. No se reabre el
// número en el hub: va contra la cabecera de reviewSession.

const web = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

function walk(dir: string, out: string[] = []): string[] {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    if (name === "node_modules" || name === "out" || name === "__tests__") continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (name.endsWith(".ts") || name.endsWith(".tsx")) out.push(full);
  }
  return out;
}

function stripComments(src: string): string {
  return src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
}

const screens = [...walk(join(web, "app")), ...walk(join(web, "components"))];

function callsOf(code: string): { pide: boolean; apaga: boolean } {
  const pide = /useProgress\(\s*\)/.test(code) || /due\s*:\s*true/.test(code);
  const apaga = /due\s*:\s*false/.test(code);
  return { pide, apaga };
}

describe("P35 · la cola de repasos no se pide donde no se pinta", () => {
  it("useProgress sigue pidiendo /api/due salvo que se apague", () => {
    const hook = readFileSync(join(web, "lib", "useProgress.ts"), "utf8");
    expect(hook).toMatch(/const due = opts\?\.due \?\? true/);
    expect(hook).toMatch(/if \(due\) getDue\(\)/);
  });

  it("quien no lee dueCount pasa due: false, y quien lo lee no lo apaga", () => {
    const mal: string[] = [];
    for (const file of screens) {
      const raw = readFileSync(file, "utf8");
      if (!raw.includes("useProgress(")) continue;
      const code = stripComments(raw);
      const lee = /\bdueCount\b/.test(code);
      const { pide, apaga } = callsOf(code);
      const rel = relative(web, file);
      if (!lee && pide) mal.push(`${rel} pide la cola y no pinta dueCount`);
      if (lee && apaga && !pide) mal.push(`${rel} pinta dueCount pero apaga el fetch`);
      if (!lee && !apaga) mal.push(`${rel} llama a useProgress sin apagar la cola`);
    }
    expect(mal).toEqual([]);
    expect(screens.some((f) => readFileSync(f, "utf8").includes("useProgress("))).toBe(true);
  });

  it("el hub sigue sin el número y sin pedir la cola", () => {
    const hub = readFileSync(join(web, "app", "idioma", "[lang]", "Client.tsx"), "utf8");
    expect(hub).toMatch(/useProgress\(\{\s*due:\s*false\s*\}\)/);
    expect(stripComments(hub)).not.toMatch(/\bdueCount\b/);
    expect(hub).toContain("¿Repasamos?");
    expect(hub).not.toMatch(/vencid/);
    expect(stripComments(hub)).not.toMatch(/getDue\(/);
  });

  it("la lección no pide la cola que no pinta", () => {
    const lesson = readFileSync(join(web, "components", "LessonPlayer.tsx"), "utf8");
    expect(lesson).toMatch(/useProgress\(\{\s*due:\s*false\s*\}\)/);
    expect(stripComments(lesson)).not.toMatch(/\bdueCount\b/);
    expect(stripComments(lesson)).not.toMatch(/getDue\(/);
  });

  it("el repaso exprés no reabre la deuda visible ni llama a /api/due", () => {
    const session = readFileSync(join(web, "lib", "reviewSession.ts"), "utf8");
    expect(session).toContain("Lo que desaparece");
    expect(session).toMatch(/es la deuda visible, no la ciencia/);
    const page = readFileSync(join(web, "app", "review", "page.tsx"), "utf8");
    expect(stripComments(page)).not.toMatch(/getDue\(/);
    expect(stripComments(page)).not.toMatch(/\bdueCount\b/);
    const direct = [...screens, ...walk(join(web, "lib"))].filter((f) => {
      // la definición vive en api.ts; el único que la llama es el hook
      const rel = relative(web, f);
      if (rel === "lib/api.ts" || rel === "lib/useProgress.ts") return false;
      return /getDue\(/.test(stripComments(readFileSync(f, "utf8")));
    });
    expect(direct.map((f) => relative(web, f))).toEqual([]);
  });
});
