import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { LesenAdsItem } from "@/components/exam/LesenAds";
import type { LesenAds } from "@/lib/examTypes";

const web = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const read = (rel: string) => readFileSync(join(web, rel), "utf8");

const item: LesenAds = {
  kind: "lesen-ads",
  id: "p31-ads",
  situation: "Sie möchten Brot kaufen.",
  situationEs: "Quieres comprar pan.",
  adA: "Bäckerei Krüger, sonntag geschlossen.",
  adB: "Café Sonne, sonntags geöffnet.",
  answer: "b",
};

function pinta(answer: Record<string, unknown>): string {
  return renderToStaticMarkup(
    createElement(LesenAdsItem, {
      item,
      answer,
      setAnswer: () => {},
      onNext: () => {},
    }),
  );
}

describe("P31 · un ítem de examen por fichero", () => {
  const player = read("components/ExamPlayer.tsx");
  const ads = read("components/exam/LesenAds.tsx");
  const css = read("components/exam/lesenads.module.css");
  const compartido = read("components/exam.module.css");
  const shared = read("components/exam/shared.tsx");

  it("lesen-ads sale del player y el player solo lo monta", () => {
    expect(player).toContain('item.kind === "lesen-ads" && <LesenAdsItem ');
    expect(player).toContain('from "./exam/LesenAds"');
    expect(player).not.toMatch(/function LesenAdsItem\b/);
    expect(ads).toMatch(/export function LesenAdsItem\b/);
    expect(ads).toContain("item.adA");
    expect(ads).toContain("item.adB");
    expect(ads).not.toMatch(/scoreExam|examScore|examDraft/);
    expect(player).not.toMatch(/function NextBtn\b/);
    expect(player).toContain('from "./exam/shared"');
    expect(shared).toContain("Dejar en blanco");
    expect(shared).toContain("Continuar");
    expect(player).not.toContain("Dejar en blanco");
    expect(read("lib/examScore.ts")).toMatch(/item\.kind === "lesen-ads"/);
  });

  it("el css de los anuncios se va con el ítem; el pie compartido se queda", () => {
    for (const c of ["adGrid", "adCard", "adPicked", "adLetter"]) {
      expect(css, c).toMatch(new RegExp(`\\.${c}(?![\\w-])`));
      expect(compartido, c).not.toMatch(new RegExp(`\\.${c}(?![\\w-])`));
    }
    expect(css).toMatch(/max-width:\s*640px/);
    expect(css).toMatch(/grid-template-columns:\s*1fr/);
    for (const c of ["question", "questionEs", "footer", "btnPrimary", "btnGhost"]) {
      expect(compartido, c).toMatch(new RegExp(`\\.${c}(?![\\w-])`));
    }
    expect(read("lib/useTactile.ts")).toContain('"adCard"');
  });

  it("en blanco se puede saltar; con anuncio elegido, solo continuar", () => {
    const vacio = pinta({});
    expect(vacio).toContain("Sie möchten Brot kaufen.");
    expect(vacio).toContain("Quieres comprar pan.");
    expect(vacio).toContain("Bäckerei Krüger, sonntag geschlossen.");
    expect(vacio).toContain("Café Sonne, sonntags geöffnet.");
    expect(vacio).toContain("a)");
    expect(vacio).toContain("b)");
    expect(vacio).toContain("Dejar en blanco");
    expect(vacio).toContain("En el examen real puedes dejar en blanco");
    expect(vacio).toContain("Continuar");
    expect(vacio).toMatch(/disabled/);

    const elegido = pinta({ "p31-ads": "b" });
    expect(elegido).toContain("Bäckerei Krüger, sonntag geschlossen.");
    expect(elegido).toContain("Café Sonne, sonntags geöffnet.");
    expect(elegido).not.toContain("Dejar en blanco");
    expect(elegido).toContain("Continuar");
    expect(elegido).not.toMatch(/disabled/);
    expect(vacio.match(/<button/g)?.length).toBe(4);
    expect(elegido.match(/<button/g)?.length).toBe(3);
  });
});
