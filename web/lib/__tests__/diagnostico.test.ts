// El diagnóstico del perfil: que la forma del radar y los grupos digan la verdad.

import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { ejesDe, puntosDe } from "@/components/Diagnostico";
import type { ModuleMastery } from "@/lib/mastery";
import type { PlacementReport } from "@/lib/placement";
import type { Phase } from "@/lib/types";

function fase(id: string, title: string): Phase {
  return { id, title, color: "#000", lessons: [] } as unknown as Phase;
}

function mod(over: Partial<ModuleMastery> & { id: string }): ModuleMastery {
  return {
    phase: fase(over.id, over.id.toUpperCase()),
    pct: 0, state: "sin-empezar", lessonsDone: 0, lessonsTotal: 10,
    testPct: null, strongWords: 0, words: 100,
    ...over,
  } as ModuleMastery;
}

const informe = {
  at: "2026-08-18T10:00:00.000Z",
  placed: "a2", realLevel: "a2", aboveCourse: false, highestSolid: "a2",
  byLevel: [], hits: 40, total: 68, pct: 59, veredicto: "…",
  topics: [
    { topic: "perfekt", level: "a2", levels: ["a2"], hits: 4, total: 4, state: "dominado" },
    { topic: "artikel", level: "a1", levels: ["a1"], hits: 1, total: 4, state: "flojo" },
    { topic: "wortstellung", level: "a2", levels: ["a2"], hits: 2, total: 4, state: "a-medias" },
  ],
  dominados: [], aMedias: [], flojos: [],
  bySkill: [
    { skill: "lesen", hits: 8, total: 10, pct: 80 },
    { skill: "hoeren", hits: 3, total: 10, pct: 30 },
    { skill: "wortschatz", hits: 6, total: 10, pct: 60 },
    { skill: "grammatik", hits: 5, total: 10, pct: 50 },
  ],
  confianza: "media", confianzaPorque: "…", equivalencia: "…",
  metodo: { itemsPorNivel: {}, corte: 0.7, minItemsPorTema: 2, limites: [] },
} as unknown as PlacementReport;

describe("puntos del diagnóstico", () => {
  it("un módulo sin empezar no cuenta como debilidad", () => {
    const puntos = puntosDe(null, [mod({ id: "f1" }), mod({ id: "f2", lessonsDone: 3, pct: 20 })]);
    expect(puntos.map((p) => p.key)).toEqual(["m-f2"]);
    expect(puntos[0].fuerza).toBe("flojo");
  });

  it("mezcla los temas de la prueba con los módulos y los ordena de mejor a peor", () => {
    const puntos = puntosDe(informe, [mod({ id: "f1", lessonsDone: 10, pct: 90 })]);
    expect(puntos[0].pct).toBeGreaterThanOrEqual(puntos[puntos.length - 1].pct);
    expect(puntos.filter((p) => p.fuerza === "fuerte").length).toBe(2); // perfekt + módulo
    expect(puntos.find((p) => p.key === "t-artikel")?.fuerza).toBe("flojo");
    // los módulos llevan enlace; los temas de la prueba, no: no hay dónde ir
    expect(puntos.find((p) => p.origen === "prueba")?.href).toBeUndefined();
  });
});

describe("ejes del radar", () => {
  it("sin prueba ni progreso no hay figura que dibujar", () => {
    expect(ejesDe(null, [mod({ id: "f1" })]).length).toBe(0);
  });

  it("con prueba y progreso salen las cuatro destrezas más memoria y pruebas", () => {
    const ejes = ejesDe(informe, [
      mod({ id: "f1", lessonsDone: 10, words: 100, strongWords: 25, testPct: 80 }),
    ]);
    expect(ejes.map((e) => e.label)).toEqual([
      "Lectura", "Oído", "Léxico", "Gramática", "Memoria", "Pruebas",
    ]);
    expect(ejes.find((e) => e.label === "Memoria")?.value).toBe(25);
    expect(ejes.find((e) => e.label === "Pruebas")?.value).toBe(80);
    // tres ejes es el mínimo para que el polígono sea un polígono
    expect(ejes.length).toBeGreaterThanOrEqual(3);
  });
});

describe("detalleAusente no pinta un 0% como suspenso", () => {
  it("Diagnostico oculta pct y confianza si falta el detalle", () => {
    const src = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "..", "..", "components", "Diagnostico.tsx"),
      "utf8",
    );
    expect(src).toMatch(/!rep\.detalleAusente && <span className="num"> · \{rep\.pct\}%/);
  });
});
