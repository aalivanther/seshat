import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { TextAnswer } from "@/components/kinds/shared";
import { ENGLISH, GERMAN, setLangConfig, type LanguageConfig } from "@/lib/language";

// P39: el grupo de teclas raras dice el idioma que se estudia, y si no hay
// teclas no se pinta. Continuar, al cerrar un ejercicio, no roba el foco.

const web = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

function pinta(cfg: LanguageConfig): string {
  setLangConfig(cfg);
  return renderToStaticMarkup(
    createElement(TextAnswer, {
      locked: false,
      attempt: 0,
      accepted: ["hola"],
      onSubmit: () => {},
    }),
  );
}

afterEach(() => setLangConfig(GERMAN));

describe("P39 — rótulo de caracteres y foco de Continuar", () => {
  it("las teclas y el rótulo salen del idioma activo", () => {
    const html = pinta({ ...GERMAN, specialChars: ["ä"], specialCharsLabel: "Letras de este curso" });
    expect(html).toContain('role="group"');
    expect(html).toContain('aria-label="Letras de este curso"');
    expect(html).toContain('aria-label="Insertar ä"');
    expect(html).toContain(">ä<");
    expect(html).not.toContain("Insertar ö");
    expect(html).not.toContain("Caracteres alemanes");
    expect(html).not.toContain("Caracteres ingleses");

    const aleman = pinta(GERMAN);
    expect(aleman).toContain(`aria-label="${GERMAN.specialCharsLabel}"`);
    expect(aleman.match(/Insertar /g)).toHaveLength(GERMAN.specialChars.length);
    for (const c of GERMAN.specialChars) {
      expect(aleman).toContain(`aria-label="Insertar ${c}"`);
    }
  });

  it("sin teclas no se pinta el grupo, aunque el rótulo diga alemanes", () => {
    const html = pinta({ ...ENGLISH, specialChars: [], specialCharsLabel: "Caracteres alemanes" });
    expect(html).not.toContain("Caracteres");
    expect(html).not.toContain("Insertar");
    expect(html).not.toContain('role="group"');
    expect(html).toContain("Escribe en inglés...");
    expect(ENGLISH.specialChars).toEqual([]);
  });

  it("Continuar al cerrar el ejercicio no se enfoca solo", () => {
    const player = readFileSync(join(web, "components", "ExercisePlayer.tsx"), "utf8");
    const marca = "onClick={finish}";
    const i = player.indexOf(marca);
    expect(i).toBeGreaterThan(0);
    const bloque = player.slice(Math.max(0, i - 120), i + marca.length + 80);
    expect(bloque).toContain("<button");
    expect(bloque).toContain("Continuar");
    expect(bloque).not.toContain("autoFocus");
    expect(bloque).not.toContain("tabIndex");
  });
});
