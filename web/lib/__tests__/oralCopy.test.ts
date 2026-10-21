import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const web = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const entrevista = join(web, "app", "entrevista");
const page = readFileSync(join(entrevista, "page.tsx"), "utf8");
const copy = readFileSync(join(web, "lib", "oralCopy.ts"), "utf8");
const fuentes = readdirSync(entrevista)
  .filter((n) => n.endsWith(".ts") || n.endsWith(".tsx"))
  .map((n) => readFileSync(join(entrevista, n), "utf8"))
  .join("\n");

describe("copy oral — F4: se ensaya en voz alta; la nota sale de lo escrito", () => {
  it("no promete reconocimiento de voz ni puntuación por pronunciación", () => {
    expect(fuentes.toLowerCase()).not.toMatch(/te escuchamos/);
    expect(fuentes.toLowerCase()).not.toMatch(/puntuamos tu pronunciaci/);
    expect(page).toMatch(/ORAL_CONTRACT/);
    expect(copy).toMatch(/Ensayas en voz alta/);
    expect(copy).toMatch(/la nota sale de lo que escribes/);
    expect(copy).toMatch(/No hay micrófono ni reconocimiento de voz/);
  });

  it("interviewFor no recicla el A1: el comentario no promete 'la más alta escrita'", () => {
    expect(fuentes).not.toMatch(/sirve la más alta que SÍ está escrita/);
    expect(page).toMatch(/devuelve null/);
  });
});

describe("F4 — el audio del simulacro es la voz del sistema", () => {
  const web = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
  it("ExamPlayer dice que el audio no es el CD oficial", () => {
    const exam = readFileSync(join(web, "components", "ExamPlayer.tsx"), "utf8");
    expect(exam).toMatch(/voz del sistema/);
    expect(exam).toMatch(/no el CD oficial del examen/);
  });

  it("escritura no guarda nota y no enseña /10", () => {
    const esc = readFileSync(join(web, "app", "escritura", "page.tsx"), "utf8");
    expect(esc).toMatch(/no se guarda como nota/);
    expect(esc).not.toMatch(/\/10/);
    expect(esc).not.toMatch(/parseCorrectorWithRetry|parseFail/);
  });
});

describe("F3 — portada de entrevista no escrita", () => {
  it("la UI dice aún no escrito", () => {
    expect(page).toMatch(/aún no escrito/);
  });
});

describe("F4 — copy de colocación: sitúa el cuaderno", () => {
  const web = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
  it("el landing no dice que la prueba no cuenta para el progreso", () => {
    const landing = readFileSync(join(web, "app", "page.tsx"), "utf8");
    expect(landing.toLowerCase()).not.toMatch(/no cuenta para tu progreso/);
    expect(landing).toMatch(/sitúa el cuaderno/);
  });

  it("la página de colocación abre el nivel y deja atrás los anteriores", () => {
    const col = readFileSync(join(web, "app", "colocacion", "page.tsx"), "utf8");
    expect(col).toMatch(/no sustituye un simulacro/);
    expect(col).toMatch(/abre tu nivel y deja atrás los anteriores/);
  });
});
