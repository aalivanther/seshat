import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { barajaOrden, notaOrden, Order } from "@/components/kinds/Order";

const web = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

/** El LCG de antes del corte, sin el cruce de las dos primeras. */
function lcgSinCruce(id: string, n: number): number[] {
  const idxs = Array.from({ length: n }, (_, i) => i);
  let seed = 0;
  for (const c of id) seed = (seed * 31 + c.charCodeAt(0)) >>> 0;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 2 ** 32;
  };
  for (let i = idxs.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [idxs[i], idxs[j]] = [idxs[j], idxs[i]];
  }
  return idxs;
}

describe("P30 · Order en su fichero", () => {
  it("la misma id sale siempre igual, y no es el orden del texto", () => {
    expect(barajaOrden("a2m3l2e4", 4)).toEqual([3, 0, 1, 2]);
    expect(barajaOrden("a2m3l2e4", 4)).toEqual(barajaOrden("a2m3l2e4", 4));
    expect(barajaOrden("order-demo", 4)).toEqual([1, 0, 2, 3]);
    expect(barajaOrden("a2m3l2e4", 4).join()).not.toBe(barajaOrden("b1m7l1e9", 4).join());
  });

  it("si el LCG deja la historia en orden, cruza las dos primeras", () => {
    expect(lcgSinCruce("id209", 4)).toEqual([0, 1, 2, 3]);
    expect(barajaOrden("id209", 4)).toEqual([1, 0, 2, 3]);
  });

  it("con 3 a 6 oraciones es una permutación y nunca empieza resuelta", () => {
    for (let n = 3; n <= 6; n++) {
      for (let i = 0; i < 40; i++) {
        const o = barajaOrden(`ej-${n}-${i}`, n);
        expect([...o].sort((a, b) => a - b)).toEqual(Array.from({ length: n }, (_, k) => k));
        expect(o.every((v, k) => v === k)).toBe(false);
      }
    }
  });

  it("acertar es el orden 0, 1, 2… y fallar no es un «casi»", () => {
    const frases = ["Llegó", "Pidió", "Pagó"];
    expect(notaOrden([0, 1, 2], frases)).toEqual({
      correct: true,
      almost: false,
      feedback: null,
      expected: "Llegó → Pidió → Pagó",
    });
    expect(notaOrden([2, 0, 1], frases)).toEqual({
      correct: false,
      almost: false,
      feedback: "El orden correcto está abajo — léelo en voz alta una vez.",
      expected: "Llegó → Pidió → Pagó",
    });
  });

  it("el tipo exporta lo mismo y el player sigue montándolo", async () => {
    expect(typeof Order).toBe("function");
    const { Order: desdeKinds } = await import("@/components/ExerciseKinds");
    expect(desdeKinds).toBe(Order);

    const kinds = readFileSync(join(web, "components", "ExerciseKinds.tsx"), "utf8");
    const player = readFileSync(join(web, "components", "ExercisePlayer.tsx"), "utf8");
    const src = readFileSync(join(web, "components", "kinds", "Order.tsx"), "utf8");
    const css = readFileSync(join(web, "components", "kinds", "order.module.css"), "utf8");
    const compartido = readFileSync(join(web, "components", "ex.module.css"), "utf8");
    const tactil = readFileSync(join(web, "lib", "useTactile.ts"), "utf8");

    expect(kinds).toMatch(/export \{ Order \} from "\.\/kinds\/Order"/);
    expect(kinds).not.toMatch(/export function Order/);
    expect(kinds).not.toContain("Toca las oraciones en el orden en que pasaron");
    expect(player).toMatch(/\{ex\.type === "order" && <Order /);
    expect(player).toContain("Pista (");

    expect(src).toContain("Toca las oraciones en el orden en que pasaron");
    expect(src).toContain("Reiniciar");
    expect(src).toContain("Comprobar");
    expect(src).toContain("placed.length !== ex.sentences.length");
    expect(src).toContain("setSubmitted(false)");
    expect(src).toContain("setPlaced([])");
    expect(src).toContain("shared.translation");
    expect(src).toContain("s.tokenAreaEmpty");
    expect(src).not.toContain("shared.tokenAreaEmpty");
    expect(src).toContain("shared.footer");
    expect(src).toContain("shared.btnGhost");
    expect(src).toContain("shared.btnPrimary");
    expect(src).toContain("s.orderTray");
    expect(src).toContain("s.orderPool");
    expect(src).toContain("s.orderCard");
    expect(src).toContain("s.orderLine");
    expect(src).toContain("s.orderNum");

    // useTactile busca el nombre local dentro de la clase hasheada
    // (`order-module__…__orderTray`). Si se renombra, colocar y retirar dejan de sonar distinto.
    expect(css).toMatch(/\.tokenAreaEmpty \{/);
    expect(css).toContain("color: var(--text-3)");
    expect(css).toContain("font-size: 0.875rem");
    expect(css).toMatch(/\.orderTray \{/);
    expect(css).toMatch(/\.orderPool \{/);
    expect(css).toMatch(/\.orderCard,/);
    expect(css).toMatch(/\.orderLine \{/);
    expect(css).toMatch(/\.orderNum \{/);
    expect(compartido).not.toMatch(/\.orderTray|\.orderPool|\.orderCard|\.orderLine|\.orderNum/);
    expect(tactil).toContain('"orderTray"');
    expect(tactil).toContain('"orderPool"');
  }, 20_000);
});
