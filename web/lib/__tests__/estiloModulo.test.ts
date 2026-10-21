import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// P42: el layout vive en la hoja. En línea solo queda el dato. Los botones
// no apagan el foco ni inventan un gris fuera de la paleta.

const web = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

function leer(rel: string): string {
  return readFileSync(join(web, rel), "utf8");
}

function bloque(css: string, clase: string): string {
  const i = css.indexOf(`${clase} {`);
  expect(i, clase).toBeGreaterThanOrEqual(0);
  const j = css.indexOf("}", i);
  return css.slice(i, j);
}

// style={{ … }} con llaves anidadas (plantillas). No cuenta style={expr}.
function estilosEnLinea(src: string): string[] {
  const out: string[] = [];
  const needle = "style={{";
  let i = 0;
  while ((i = src.indexOf(needle, i)) !== -1) {
    const start = i + needle.length;
    let depth = 1;
    let j = start;
    while (j < src.length && depth > 0) {
      const c = src[j];
      if (c === "{") depth += 1;
      else if (c === "}") depth -= 1;
      j += 1;
    }
    out.push(src.slice(start, j - 1));
    i = j;
  }
  return out;
}

const LAYOUT = /display|justifyContent|alignItems|textAlign|margin|fontWeight|fontSize|lineHeight|gridColumn|cursor|flexWrap|gap:/;

describe("P42 — la prueba solo deja en línea el dato", () => {
  const src = leer("app/prueba/[id]/Client.tsx");
  const css = leer("app/prueba/[id]/prueba.module.css");

  it("el layout está en la hoja; el ancho y el color de fase, no", () => {
    const estilos = estilosEnLinea(src);
    expect(estilos).toHaveLength(2);
    expect(estilos[0]).toMatch(/width:/);
    expect(estilos[0]).toMatch(/phase\.color/);
    expect(estilos[1]).toMatch(/background:\s*phase\.color/);
    for (const e of estilos) expect(e).not.toMatch(LAYOUT);

    expect(src).toContain("p.continueCenter");
    expect(src).toContain("p.continueSplit");
    expect(src).toContain("p.titleRow");
    expect(src).toContain("p.doneIcon");
    expect(src).toContain("p.saveAlert");
    expect(src).toContain("p.ghostLink");
    expect(src).not.toMatch(/justifyContent|alignItems/);

    expect(bloque(css, ".continueCenter")).toContain("justify-content: center");
    expect(bloque(css, ".continueCenter")).toContain("margin-top: 20px");
    expect(bloque(css, ".continueSplit")).toContain("gap: 12px");
    expect(bloque(css, ".titleRow")).toContain("gap: 8px");
    expect(bloque(css, ".doneIcon")).toContain("margin-bottom: 8px");
    expect(bloque(css, ".saveAlert")).toContain("color: var(--warn)");
    expect(bloque(css, ".saveAlert")).toContain("margin-top: 14px");
    expect(bloque(css, ".saveAlert")).not.toMatch(/^\s*margin:/m);
    expect(bloque(css, ".ghostLink")).toContain("display: inline-flex");

    const movil = css.slice(css.indexOf("@media (max-width: 640px)"));
    expect(movil).toContain(".continueCenter > *");
    expect(movil).toContain("flex: 1");
    expect(css).not.toMatch(/outline:\s*none/);
    expect(css).not.toMatch(/#[0-9a-fA-F]{3,8}/);
  });
});

describe("P42 — la escritura no pide una generación", () => {
  const src = leer("app/escritura/page.tsx");

  it("la hoja la marca el alumno y no nombra un modelo", () => {
    expect(src).toContain("Revisar con la hoja");
    expect(src).toContain("no se guarda como nota");
    expect(src).not.toMatch(/aiChat|ollama|qwen|llama|OpenAI|IA local/);
    expect(src).not.toMatch(/outline:\s*none/);
  });
});

describe("P42 — el perfil separa layout y dato", () => {
  const src = leer("app/perfil/page.tsx");
  const css = leer("app/perfil/perfil.module.css");
  const hoja = css.slice(css.indexOf("Layout que estaba suelto en la página"));

  it("en línea quedan colores, anchos y el ajuste del birrete", () => {
    const estilos = estilosEnLinea(src);
    expect(estilos).toHaveLength(4);
    for (const e of estilos) {
      expect(e).not.toMatch(LAYOUT);
      expect(e).toMatch(/background:|width:|verticalAlign:/);
    }
    expect(src).toContain("style={m ? { color: p.color } : undefined}");
    expect(src).toContain("style={{ background: color }}");
    expect(src).toContain("style={{ background: c }}");
    expect(src).toContain("s.rankGrow");
    expect(src).toContain("s.certGroup");
    expect(src).toContain("s.certLevel");
    expect(src).toContain("s.backupRow");
    expect(src).toContain("s.fileLabel");
    expect(src).toContain("s.fileInput");
    expect(src).toContain("s.aboutBlock");
    expect(src).not.toContain('style={{ display: "inline-flex" }}');

    expect(bloque(hoja, ".rankGrow")).toContain("flex: 1");
    expect(bloque(hoja, ".certGroup")).toContain("display: contents");
    expect(bloque(hoja, ".certLevel")).toContain("grid-column: 1 / -1");
    expect(bloque(hoja, ".certLevel")).toContain("font-family: var(--font-hand)");
    expect(bloque(hoja, ".backupRow")).toContain("flex-wrap: wrap");
    expect(bloque(hoja, ".backupRow")).toContain("gap: 10px");
    expect(bloque(hoja, ".fileLabel")).toContain("cursor: pointer");
    expect(bloque(hoja, ".fileInput")).toContain("display: none");
    expect(bloque(hoja, ".aboutBlock")).toContain("line-height: 2");
    expect(bloque(hoja, ".grandBody")).toContain("margin-top: 6px");
    expect(bloque(hoja, ".grandBody")).not.toMatch(/^\s*margin:/m);
    // el enlace de actualizar ya era inline-flex en la ficha del botón
    expect(bloque(css, ".certBtn")).toContain("display: inline-flex");
    expect(hoja).not.toMatch(/outline:\s*none/);
    expect(hoja).not.toMatch(/#[0-9a-fA-F]{3,8}/);
  });
});

describe("P42 — el 404 tiene módulo", () => {
  const src = leer("app/not-found.tsx");
  const css = leer("app/not-found.module.css");

  it("no queda style={{}} y el enlace usa la paleta", () => {
    expect(estilosEnLinea(src)).toHaveLength(0);
    expect(src).toContain('from "./not-found.module.css"');
    expect(src).toContain("className={s.page}");
    expect(src).toContain("className={s.home}");
    expect(src).toContain("Volver a la expedición →");

    expect(bloque(css, ".page")).toContain("max-width: 560px");
    expect(bloque(css, ".page")).toContain("padding: 64px 16px");
    expect(bloque(css, ".page")).toContain("margin: 0 auto");
    expect(bloque(css, ".code")).toContain("font-family: var(--font-hand)");
    expect(bloque(css, ".code")).toContain("color: var(--accent-text)");
    expect(bloque(css, ".code")).not.toMatch(/margin/);
    expect(bloque(css, ".title")).toContain("margin-top: 8px");
    expect(bloque(css, ".title")).not.toMatch(/^\s*margin:/m);
    expect(bloque(css, ".text")).toContain("margin-top: 10px");
    expect(bloque(css, ".text")).toContain("color: var(--text-2)");
    expect(bloque(css, ".home")).toContain("background: var(--accent)");
    expect(bloque(css, ".home")).toContain("color: var(--accent-contrast)");
    expect(bloque(css, ".home")).toContain("box-shadow: var(--shadow-btn)");
    expect(css).not.toMatch(/outline:\s*none/);
    expect(css).not.toMatch(/#[0-9a-fA-F]{3,8}/);
  });
});

describe("P42 — colocación ya solo tenía dato", () => {
  it("color de la mejora y anchos de barra, nada de layout", () => {
    const src = leer("app/colocacion/page.tsx");
    const estilos = estilosEnLinea(src);
    expect(estilos.length).toBeGreaterThan(0);
    for (const e of estilos) {
      expect(e).not.toMatch(LAYOUT);
      expect(e).toMatch(/color:|width:/);
    }
  });
});
