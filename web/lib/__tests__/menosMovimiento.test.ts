import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Footprints } from "@phosphor-icons/react";
import type { Badge } from "@/lib/achievements";
import { BadgeUnlocks } from "@/components/BadgeUnlocks";
import { reducedMotion, scrollBehavior } from "@/lib/juice";

// P41: quien pidió menos movimiento no ve parpadeos, scroll suave ni el
// resorte de la medalla. El hundido al pulsar se queda.

const web = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

const mq = {
  matches: false,
  media: "(prefers-reduced-motion: reduce)",
  onchange: null,
  addListener() {},
  removeListener() {},
  addEventListener() {},
  removeEventListener() {},
  dispatchEvent() {
    return false;
  },
};

function leer(rel: string): string {
  return readFileSync(join(web, rel), "utf8");
}

const medalla: Badge = {
  id: "p41",
  icon: Footprints,
  title: "Prueba",
  desc: "Una medalla de prueba",
  earned: true,
  progress: 1,
  lang: "de",
};

describe("P41 — menos movimiento en las pantallas que faltaban", () => {
  afterEach(() => {
    mq.matches = false;
    vi.unstubAllGlobals();
  });

  it("el scroll del chat salta si se pidió calma, y se desliza si no", () => {
    expect(scrollBehavior(true)).toBe("auto");
    expect(scrollBehavior(false)).toBe("smooth");
    // sin ventana (el render del servidor) no hay preferencia que respetar
    expect(reducedMotion()).toBe(false);
    expect(scrollBehavior()).toBe("smooth");

    vi.stubGlobal("window", { matchMedia: () => mq });
    mq.matches = true;
    expect(reducedMotion()).toBe(true);
    expect(scrollBehavior()).toBe("auto");
    mq.matches = false;
    expect(scrollBehavior()).toBe("smooth");
  });

  it("la conversación no anima la lista ni fuerza un scroll suave", () => {
    const src = leer("app/conversacion/page.tsx");
    expect(src).not.toContain("scrollIntoView");
    expect(src).not.toContain('behavior: "smooth"');
    expect(src).not.toContain("useAutoAnimate");
    expect(src).not.toContain("motion.");
  });

  it("colocación, entrevista y escritura no pierden el hundido al pulsar", () => {
    const colocacion = leer("app/colocacion/colocacion.module.css");
    expect(colocacion).toContain(".btn:active { transform: translateY(1.5px); }");
    expect(colocacion).toContain(".opcion:active { transform: translateY(1px); }");
    expect(colocacion).toContain(".ficha:active { transform: translateY(1px); }");
    expect(colocacion).toContain(".btnEscuchar:active { transform: translateY(1.5px); }");
    // la barra cuelga del global (acorta la duración); no es un bucle
    expect(colocacion).toContain("transition: width .35s ease");
    expect(colocacion).not.toContain("@keyframes");

    const entrevista = leer("app/entrevista/page.tsx");
    expect(entrevista).toContain("celebrate(");
    expect(entrevista).not.toContain("scrollIntoView");
    expect(entrevista).not.toContain("motion.");

    const escritura = leer("app/escritura/page.tsx");
    expect(escritura).not.toContain("scrollIntoView");
    expect(escritura).not.toContain("useAutoAnimate");
    expect(escritura).not.toContain("motion.");
  });

  it("la medalla no entra girando si se pidió calma, y el confeti no se quita del código", () => {
    const src = leer("components/BadgeUnlocks.tsx");
    expect(src).toContain("celebrate(true)");
    expect(src).toContain("reducedMotion()");

    // Sin ventana, motion pinta el resorte de partida. Con la ventana a medias
    // que usa el doble de matchMedia, motion intenta enganchar el documento
    // y revienta: el camino quieto no debe llegar a motion.
    const viva = renderToStaticMarkup(createElement(BadgeUnlocks, { badges: [medalla] }));
    expect(viva).toContain("scale(0)");
    expect(viva).toContain("rotate(-12deg)");

    vi.stubGlobal("window", { matchMedia: () => mq });
    mq.matches = true;
    const quieta = renderToStaticMarkup(createElement(BadgeUnlocks, { badges: [medalla] }));
    expect(quieta).toContain("Prueba");
    expect(quieta).toContain("Una medalla de prueba");
    expect(quieta).not.toContain("scale(0)");
    expect(quieta).not.toContain("rotate");
  });
});
