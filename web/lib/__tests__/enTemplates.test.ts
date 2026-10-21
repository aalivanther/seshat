import { describe, expect, it } from "vitest";
import { tContractionEn, tDoDoesEn, tBeDoBucketEn } from "@/lib/reviewSession";
import { levelPseudoPhase, retoLangOf } from "@/lib/retoRun";
import { missionOf } from "@/data/course";
import type { VocabItem } from "@/lib/types";

// Plantillas generativas INGLESAS del repaso/retos + reto de nivel + misiones.

const v = (target: string, id = "x"): VocabItem => ({ id, target, source: "…" });

describe("tContractionEn", () => {
  it("contrae I am → I'm en un type con la respuesta contraída", () => {
    const ex = tContractionEn(v("I am from Bogotá."), "t1");
    expect(ex).not.toBeNull();
    expect(ex!.type).toBe("type");
    expect((ex as { answers: string[] }).answers[0]).toBe("I'm from Bogotá.");
  });

  it("cannot → can't y does not → doesn't", () => {
    expect((tContractionEn(v("I cannot swim."), "t2") as { answers: string[] }).answers[0]).toBe("I can't swim.");
    expect((tContractionEn(v("She does not work."), "t3") as { answers: string[] }).answers[0]).toBe("She doesn't work.");
  });

  it("sin forma larga → null (nada que contraer)", () => {
    expect(tContractionEn(v("Hello!"), "t4")).toBeNull();
    expect(tContractionEn(v("I'm fine."), "t5")).toBeNull();
  });
});

describe("tDoDoesEn", () => {
  it("esfuma el Do/Does inicial como cloze", () => {
    const ex = tDoDoesEn(v("Does she work here?"), "d1");
    expect(ex).not.toBeNull();
    expect(ex!.type).toBe("cloze");
    expect((ex as { text: string }).text).toBe("___ she work here?");
    expect((ex as { answers: string[] }).answers).toEqual(["Does"]);
  });

  it("no aplica a frases que no son preguntas do/does", () => {
    expect(tDoDoesEn(v("Is she a nurse?"), "d2")).toBeNull();
    expect(tDoDoesEn(v("I do my homework."), "d3")).toBeNull();
  });
});

describe("tBeDoBucketEn", () => {
  it("clasifica preguntas be vs do/does (mínimo 2 de cada lado)", () => {
    const pool = [
      v("Is she from Spain?", "a"), v("Are you tired?", "b"),
      v("Do you like tea?", "c"), v("Does he work?", "d"),
      v("Hello!", "e"),
    ];
    const ex = tBeDoBucketEn(pool, "b1");
    expect(ex).not.toBeNull();
    expect(ex!.type).toBe("bucket");
    const items = (ex as { items: { text: string; bucket: 0 | 1 }[] }).items;
    for (const it of items) {
      const startsBe = /^(Is|Are|Am)\b/i.test(it.text);
      expect(it.bucket).toBe(startsBe ? 0 : 1);
    }
  });

  it("pool sin suficientes preguntas → null", () => {
    expect(tBeDoBucketEn([v("Is she…?", "a"), v("Hello", "b")], "b2")).toBeNull();
  });
});

describe("reto de nivel", () => {
  it("levelPseudoPhase agrupa TODAS las lecciones del nivel", () => {
    const p = levelPseudoPhase("de-a1");
    expect(p).not.toBeNull();
    expect(p!.id).toBe("nivel-de-a1");
    expect(p!.lessons.length).toBeGreaterThan(50);
  });

  it("acepta el id legado ('a1' → de-a1) y el inglés", () => {
    expect(levelPseudoPhase("a1")?.id).toBe("nivel-de-a1");
    expect(levelPseudoPhase("en-a1")?.id).toBe("nivel-en-a1");
    expect(levelPseudoPhase("zz")).toBeNull();
  });

  it("retoLangOf entiende fases sintéticas de nivel", () => {
    expect(retoLangOf("nivel-en-a1")).toBe("en");
    expect(retoLangOf("nivel-de-a2")).toBe("de");
  });
});

describe("misiones", () => {
  it("missionOf devuelve la misión de referencia del m5 inglés", () => {
    const m = missionOf("ena1m5");
    expect(m).toBeDefined();
    expect(m!.phaseId).toBe("ena1m5");
    expect(m!.checklist.length).toBeGreaterThanOrEqual(3);
  });

  it("módulo sin misión → undefined (la card no se pinta)", () => {
    expect(missionOf("fase-inventada")).toBeUndefined();
  });
});

describe("seededOrder (barajado de opciones mc/audiomc)", () => {
  it("misma id → misma permutación (estable entre renders)", async () => {
    // primer `import()` de ExerciseKinds.tsx en el proceso: bajo carga (toda
    // la suite corriendo a la vez, como hace build-app.sh) el coste de
    // compilarlo puede superar el timeout POR DEFECTO (5 s) antes de que la
    // aserción llegue a correr — no es un fallo de seededOrder.
    const { seededOrder } = await import("@/components/ExerciseKinds");
    expect(seededOrder("ena1m10l1e1", 3)).toEqual(seededOrder("ena1m10l1e1", 3));
  }, 20_000);

  it("es una permutación completa y distintas ids dan órdenes distintos", async () => {
    const { seededOrder } = await import("@/components/ExerciseKinds");
    const a = seededOrder("ej-a", 4);
    expect([...a].sort()).toEqual([0, 1, 2, 3]);
    const others = ["ej-b", "ej-c", "ej-d", "ej-e", "ej-f"];
    expect(others.some((id) => seededOrder(id, 4).join() !== a.join())).toBe(true);
  });

  it("con answer:0 masivo, la posición renderizada del correcto varía entre ejercicios", async () => {
    const { seededOrder } = await import("@/components/ExerciseKinds");
    const positions = new Set(
      Array.from({ length: 30 }, (_, k) => seededOrder(`ena1m10l${k}e1`, 3).indexOf(0)),
    );
    expect(positions.size).toBeGreaterThan(1); // el 0 NO siempre sale primero
  });
});
