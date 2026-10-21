import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const src = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), "..", "..", "components", "NativoCard.tsx"),
  "utf8",
);

describe("F8 — NativoCard.produce se pinta", () => {
  it("la tarjeta lee card.produce y dice que el alumno la usa", () => {
    expect(src).toMatch(/card\.produce/);
    expect(src).toMatch(/usas tú/);
  });
});
