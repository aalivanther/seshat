import { describe, expect, it } from "vitest";
import { DemoEngine, type EngineRequest, type KeyValueStore } from "@/demo/lib/demoEngine";
import { applyReview, RELEARN_STEP } from "@/demo/lib/demoSrs";
import { newItemStat } from "@/demo/lib/demoState";

// La demo web del portafolio no tiene binario Go: la sirve un motor que corre
// en el navegador (web/demo/lib). Si ese motor se aparta de backend/main.go y
// backend/srs.go, la demo enseña otro producto. Estas pruebas repiten casos de
// srs_test.go y del contrato HTTP de main.go contra el motor de la demo.

function memoryStore(): KeyValueStore & { data: Map<string, string> } {
  const data = new Map<string, string>();
  return {
    data,
    getItem: (k) => data.get(k) ?? null,
    setItem: (k, v) => void data.set(k, v),
    removeItem: (k) => void data.delete(k),
    keys: () => [...data.keys()],
  };
}

const T0 = Date.parse("2026-08-01T10:00:00Z");

function engineAt(clock: { now: number }, store = memoryStore(), session = memoryStore()) {
  const engine = new DemoEngine({ store, session, now: () => clock.now, version: { app: "1.0.0-demo", content: "8" } });
  return { engine, store, session };
}

function req(method: string, path: string, body?: unknown, profile = "ana"): EngineRequest {
  return {
    method,
    path,
    profile,
    contentType: body === undefined ? "" : "application/json",
    body: body === undefined ? "" : typeof body === "string" ? body : JSON.stringify(body),
  };
}

describe("repaso espaciado de la demo = srs.go", () => {
  it("escalera completa de aciertos: 10 min → 1 → 3 → 7 → 16 → 35 → ×2,2", () => {
    const it = newItemStat();
    let now = T0;
    const want = [1 / 144, 1, 3, 7, 16, 35, 35 * 2.2, 35 * 2.2 * 2.2];
    for (const w of want) {
      applyReview(it, true, "produce", now);
      expect(it.intervalDays).toBeCloseTo(w, 9);
      expect(Math.abs(it.nextReview - (now + w * 86_400_000))).toBeLessThan(1000);
      now = it.nextReview;
    }
    expect(it.correct).toBe(want.length);
  });

  it("un fallo desde 16 días cae de forma sublineal, no a cero", () => {
    const it = { ...newItemStat(), correct: 5, streak: 5, intervalDays: 16, nextReview: T0 - 3_600_000 };
    applyReview(it, false, "produce", T0);
    expect(it.intervalDays).toBeCloseTo(0.35 * Math.pow(16, 0.6), 9);
    expect(it.relearn).toBe(true);
    expect(it.nextReview).toBe(T0 + 10 * 60_000);
    expect(it.ease).toBeLessThan(1);
  });

  it("fallar reconociendo castiga más; sin producir, el techo es 16 días", () => {
    const prod = { ...newItemStat(), intervalDays: 35, nextReview: T0 - 1 };
    const recog = { ...newItemStat(), intervalDays: 35, nextReview: T0 - 1 };
    applyReview(prod, false, "produce", T0);
    applyReview(recog, false, "recognize", T0);
    expect(recog.intervalDays).toBeLessThan(prod.intervalDays);

    const solo = { ...newItemStat(), intervalDays: 16, nextReview: T0 - 1 };
    applyReview(solo, true, "recognize", T0);
    expect(solo.intervalDays).toBe(16);
    expect(RELEARN_STEP).toBeCloseTo(10 / 1440, 12);
  });
});

describe("contrato HTTP del motor de la demo = main.go", () => {
  it("lesson-result: aprueba con 0,8, suma XP como el motor y no cuenta dos veces el mismo envío", async () => {
    const clock = { now: T0 };
    const { engine } = engineAt(clock);
    const body = {
      lessonId: "a1m1l1",
      score: 0.85,
      requestId: "r-1",
      items: [
        { itemId: "a1hallo", correct: true, mode: "produce" },
        { itemId: "a1tschuess", correct: false, mode: "recognize" },
      ],
    };
    const r1 = await engine.handle(req("POST", "/lesson-result", body));
    expect(r1.status).toBe(200);
    const st = JSON.parse(r1.body);
    expect(st.lessons.a1m1l1).toMatchObject({ completed: true, attempts: 1, bestScore: 0.85 });
    // 1 acierto ×2 + trunc(0,85·20) = 2 + 17
    expect(st.xp).toBe(19);
    expect(st.streakDays).toBe(1);
    expect(st.items.a1tschuess).toMatchObject({ wrong: 1, lapses: 1, relearn: true });

    const again = JSON.parse((await engine.handle(req("POST", "/lesson-result", body))).body);
    expect(again.xp).toBe(19);
    expect(again.lessons.a1m1l1.attempts).toBe(1);

    clock.now = T0 + 11 * 60_000;
    const due = JSON.parse((await engine.handle(req("GET", "/due"))).body) as { itemId: string }[];
    expect(due.map((d) => d.itemId).sort()).toEqual(["a1hallo", "a1tschuess"]);
  });

  it("rechaza un modo desconocido y un perfil mal formado con los textos del motor", async () => {
    const { engine } = engineAt({ now: T0 });
    const bad = await engine.handle(
      req("POST", "/lesson-result", { lessonId: "x", score: 1, items: [{ itemId: "a", correct: true, mode: "prod" }] }),
    );
    expect(bad.status).toBe(400);
    expect(bad.body).toBe("payload inválido: modo desconocido\n");
    const prof = await engine.handle(req("GET", "/state", undefined, "con"));
    expect(prof.status).toBe(400);
    const ct = await engine.handle({ ...req("POST", "/lesson-result", { lessonId: "x" }), contentType: "text/plain" });
    expect(ct.status).toBe(415);
  });

  it("un perfil dañado se aparta sin borrarlo y /state lo avisa", async () => {
    const { engine, store } = engineAt({ now: T0 });
    store.setItem("seshat-demo:perfil:ana", "{roto");
    const st = JSON.parse((await engine.handle(req("GET", "/state"))).body);
    expect(st.xp).toBe(0);
    expect(st.recoveredNotice).toContain("estaba dañado");
    const baks = [...store.data.keys()].filter((k) => k.endsWith(".bak"));
    expect(baks).toHaveLength(1);
    expect(store.getItem(baks[0])).toBe("{roto");
  });

  it("un perfil de un esquema futuro queda en solo-lectura (503) y no se pisa", async () => {
    const { engine, store } = engineAt({ now: T0 });
    const future = JSON.stringify({ schemaVersion: 3, lessons: {}, items: {}, xp: 7 });
    store.setItem("seshat-demo:perfil:ana", future);
    const r = await engine.handle(req("POST", "/avatar", { avatar: "fox", color: "#fff" }));
    expect(r.status).toBe(503);
    expect(store.getItem("seshat-demo:perfil:ana")).toBe(future);
  });

  it("exportar e importar: el respaldo vuelve igual y un esquema v1 funde los alias", async () => {
    const clock = { now: T0 };
    const { engine, store } = engineAt(clock);
    await engine.handle(
      req("POST", "/lesson-result", { lessonId: "l1", score: 1, requestId: "a", items: [{ itemId: "w1", correct: true }] }),
    );
    const exp = await engine.handle(req("GET", "/export"));
    expect(exp.headers["Content-Disposition"]).toMatch(/perfil-ana-\d{4}-\d{2}-\d{2}\.json/);
    const imp = await engine.handle(req("POST", "/import", exp.body, "bea"));
    expect(imp.status).toBe(200);
    expect(JSON.parse(imp.body).items.w1.correct).toBe(1);

    // a2aelter → a2m7aelter es una fila real de web/scripts/vocab-aliases.json
    const v1 = {
      schemaVersion: 1,
      lessons: {},
      items: { a2aelter: { correct: 3, wrong: 1, streak: 2, intervalDays: 7, nextReview: "2026-08-08T10:00:00Z", lastSeen: "2026-08-01T10:00:00Z" } },
      xp: 10,
      streakDays: 0,
      lastActive: "",
    };
    const migrated = JSON.parse((await engine.handle(req("POST", "/import", v1, "bea"))).body);
    expect(migrated.schemaVersion).toBe(2);
    expect(migrated.items.a2aelter).toBeUndefined();
    expect(migrated.items.a2m7aelter).toMatchObject({ correct: 3, intervalDays: 7 });
    // el import dejó copia de lo que había antes
    expect([...store.data.keys()].some((k) => k.startsWith("seshat-demo:perfil:bea.") && k.endsWith(".preimport.bak"))).toBe(true);
  });

  it("borradores de simulacro: se guardan, se validan y se borran", async () => {
    const clock = { now: T0 };
    const { engine } = engineAt(clock);
    const startedAt = Math.floor(T0 / 1000) - 60;
    const ok = await engine.handle(req("POST", "/exam-draft", { setId: "goethe-a1-1", startedAt, idx: 3, answers: { q1: "b" } }));
    expect(JSON.parse(ok.body).examDrafts["goethe-a1-1"]).toEqual({ startedAt, idx: 3, answers: { q1: "b" } });
    const old = await engine.handle(req("POST", "/exam-draft", { setId: "goethe-a1-1", startedAt: startedAt - 49 * 3600, idx: 0 }));
    expect(old.status).toBe(400);
    const del = await engine.handle(req("DELETE", "/exam-draft?setId=goethe-a1-1"));
    expect(JSON.parse(del.body).examDrafts).toEqual({});
  });

  it("perfiles: crear uno lo lista, y sin ninguno sale default", async () => {
    const { engine } = engineAt({ now: T0 });
    expect(JSON.parse((await engine.handle(req("GET", "/profiles"))).body)).toEqual(["default"]);
    const r = await engine.handle(req("POST", "/profiles", { name: "  Café " }));
    expect(JSON.parse(r.body)).toEqual(["café"]);
  });
});
