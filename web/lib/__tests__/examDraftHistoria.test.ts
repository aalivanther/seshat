import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const web = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const read = (rel: string) => readFileSync(join(web, rel), "utf8");

const FRASE =
  "El borrador se guarda en este perfil: puedes cerrar el portátil y seguir en el teléfono.";

describe("P33 · el borrador del examen y el de la lección", () => {
  const exam = read("components/ExamPlayer.tsx");
  const lesson = read("components/LessonPlayer.tsx");

  it("el comentario ya no dice que el simulacro vive solo en el navegador", () => {
    expect(exam).toContain("EL SIMULACRO SE GUARDA EN EL PERFIL");
    expect(exam).toContain("viven en examDrafts");
    expect(exam).not.toMatch(/no en el motor/);
    expect(exam).not.toMatch(/Se guarda en el navegador/);
    const perfil = exam.indexOf("st?.examDrafts");
    const local = exam.indexOf("window.localStorage.getItem(draftKey)");
    expect(perfil).toBeGreaterThan(0);
    expect(local).toBeGreaterThan(perfil);
    expect(exam).toContain("void postExamDraft(");
    expect(exam).toContain("window.localStorage.setItem");
  });

  it("en la pantalla se entiende que el borrador está en este perfil", () => {
    expect(exam).toContain(FRASE);
    expect(exam).toContain('restored ? "Retomas donde lo dejaste. "');
    expect(exam).not.toContain("guardadas en este dispositivo");
    expect(exam).not.toContain("este dispositivo");
  });

  it("la lección sigue en el navegador y no se sube al perfil", () => {
    expect(lesson).toContain("BORRADOR EN EL NAVEGADOR");
    expect(lesson).toContain("no es el del simulacro");
    expect(lesson).not.toContain("mismo patrón que ExamPlayer");
    expect(lesson).toContain("`seshat-leccion-${lesson.id}`");
    expect(lesson).toContain("guardadas en este dispositivo");
    expect(lesson).not.toContain("postExamDraft");
    expect(lesson).not.toContain("examDrafts");
    expect(lesson).not.toContain(FRASE);
  });
});
