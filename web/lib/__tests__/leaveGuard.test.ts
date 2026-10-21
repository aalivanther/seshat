import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const web = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

describe("useLeaveGuard — no vuelve a true a secas", () => {
  it("LessonPlayer y ExamPlayer lo llaman con una condición, no con true literal", () => {
    const lesson = readFileSync(join(web, "components", "LessonPlayer.tsx"), "utf8");
    const exam = readFileSync(join(web, "components", "ExamPlayer.tsx"), "utf8");
    expect(lesson).not.toMatch(/useLeaveGuard\(\s*true\s*\)/);
    expect(exam).not.toMatch(/useLeaveGuard\(\s*true\s*\)/);
    expect(lesson).toMatch(/useLeaveGuard\(/);
    expect(exam).toMatch(/useLeaveGuard\(!finished\)/);
  });

  it("ExamPlayer no se juega hasta hidratar el borrador", () => {
    const exam = readFileSync(join(web, "components", "ExamPlayer.tsx"), "utf8");
    expect(exam).toMatch(/if \(!hydrated\)/);
    expect(exam).toMatch(/Recuperando el simulacro/);
    expect(exam).not.toMatch(/if \(!hydrated\)[\s\S]{0,400}0:00/);
  });
});
