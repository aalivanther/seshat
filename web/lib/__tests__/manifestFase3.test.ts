import { describe, expect, it, beforeAll } from "vitest";
import { resolveAndClose, closeVocabulary, materializeForeignCards } from "../../scripts/resolve-manifest.mjs";

// PLAN-COMPOSICION.md §5 — el cierre de vocabulario: DERIVADO (nunca
// declarado — §5.1, §11.6), con las tres políticas de §5.2.

// El primer `resolveAndClose`/`closeVocabulary` de este proceso transpila los
// 72 módulos del catálogo para construir `moduleIndex()` (0,93 s medidos en
// PLAN-COMPOSICION.md §5.1) — bajo carga (toda la suite corriendo en
// paralelo) eso puede superar el timeout POR DEFECTO de un test (5 s) antes
// de que la aserción llegue a ejecutarse. Precalentar la caché aquí, con un
// timeout generoso propio, evita que el primer test "real" pague ese coste.
beforeAll(() => {
  resolveAndClose("solo-ingles");
}, 30_000);

describe("T3 — los manifiestos que deben ser cerrados, lo son (política 'strict')", () => {
  it("solo-ingles resuelve sin lanzar, con 0 tarjetas ajenas (0 de 3.552 referencias cruzan de idioma)", () => {
    const r = resolveAndClose("solo-ingles");
    expect(r.foreign.size).toBe(0);
    expect(r.modules.length).toBeGreaterThan(0);
  });

  it("solo-aleman resuelve sin lanzar, con 0 tarjetas ajenas", () => {
    const r = resolveAndClose("solo-aleman");
    expect(r.foreign.size).toBe(0);
  });

  it("solo-ingles + solo-aleman se reparten el catálogo de módulos/exámenes/misiones/libretas al completo", () => {
    const en = resolveAndClose("solo-ingles");
    const de = resolveAndClose("solo-aleman");
    expect(en.modules.length + de.modules.length).toBe(96);
    expect(en.exams.length + de.exams.length).toBe(19);
    expect(en.missions.length + de.missions.length).toBe(8);
    expect(en.references.length + de.references.length).toBe(10);
    expect(en.references.some((p) => p.id === "verbs")).toBe(false);
    expect(de.references.some((p) => p.id === "verbs")).toBe(true);
  });
});

describe("T2 — un módulo suelto arrastra sus tarjetas y nada queda huérfano", () => {
  it("muestra-b1m7 (b1m7 solo): cierra por tarjetas, no por módulos completos", () => {
    const r = resolveAndClose("muestra-b1m7");
    expect(r.modules.map((p) => p.id)).toEqual(["b1m7"]);
    expect(r.foreign.size).toBeGreaterThan(0); // b1m7 sí cita tarjetas ajenas — es contenido real, no una isla
  });

  it("las tarjetas ajenas se pueden materializar con su VocabItem completo", () => {
    const r = resolveAndClose("muestra-b1m7");
    const cards = materializeForeignCards(r.foreign);
    expect(cards.size).toBe(r.foreign.size);
    for (const [id, item] of cards) {
      expect(item, `tarjeta "${id}" vino vacía`).toBeTruthy();
      expect((item as { id: string }).id).toBe(id);
    }
  });
});

describe("closeVocabulary: las tres políticas, en memoria (sin pasar por manifiestos)", () => {
  it("'cards' es de UN salto: no puede ciclar (una VocabItem no cita a otra)", () => {
    const { foreign } = closeVocabulary(["b1m7"], "cards");
    // los 6 ítems ajenos de b1m7 (medidos en la sesión: b1m6/a2m4/a2m9)
    expect([...new Set(foreign.values())].sort()).toEqual(["a2m4", "a2m9", "b1m6"]);
  });

  it("'strict' lanza cuando el conjunto no está cerrado, y lista lo que falta", () => {
    expect(() => closeVocabulary(["b1m7"], "strict")).toThrow(/tarjetas ajenas/);
  });

  it("'modules' expande transitivamente y termina (aunque el grafo real tenga ciclos hacia delante)", () => {
    const { modules } = closeVocabulary(["b1m7"], "modules");
    expect(modules.has("b1m7")).toBe(true);
    expect(modules.size).toBeGreaterThan(1); // arrastra los módulos dueños de sus tarjetas ajenas
    expect(modules.size).toBeLessThan(96); // pero no el catálogo entero: es alcanzabilidad real, no un fallback a "todo"
  });

  it("un conjunto ya cerrado no cambia bajo ninguna política (0 tarjetas ajenas ⇒ punto fijo)", () => {
    const allDe = closeVocabulary(
      ["fi", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11",
       "a2m1", "a2m2", "a2m3", "a2m4", "a2m5", "a2m6", "a2m7", "a2m8", "a2m9", "a2m10", "a2exam",
       "b1m1", "b1m2", "b1m3", "b1m4", "b1m5", "b1m6", "b1m7", "b1m8", "b1m9", "b1m10", "b1m11", "b1m12",
       "b2m1", "b2m2", "b2m3", "b2m4", "b2m5", "b2m6", "b2m7", "b2m8", "b2m9", "b2m10", "b2m11", "b2m12"],
      "modules",
    );
    expect(allDe.modules.size).toBe(48); // todo el alemán: cerrado sobre sí mismo
  });
});
