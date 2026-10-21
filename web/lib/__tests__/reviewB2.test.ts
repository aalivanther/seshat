import { describe, expect, it } from "vitest";
import {
  tNominalisierung, tKonjunktiv1, tPartizipAttribut, tZweiteiligerKonnektor,
  tPassivErsatz, tDiscourseEn, tRegisterEn, levelTemplatesOf,
} from "@/lib/reviewSession";
import { courseOf } from "@/data/course";
import type { VocabItem } from "@/lib/types";

const mk = (v: Partial<VocabItem> & { id: string; target: string; source: string }): VocabItem =>
  v as VocabItem;

const plain: VocabItem = { id: "a1hund", target: "der Hund", source: "el perro", article: "der" };

describe("B2: sin el campo, la plantilla calla", () => {
  it("tNominalisierung(ficha A1 sin nomen) === null", () => {
    expect(tNominalisierung(plain, "x")).toBeNull();
  });

  it("tKonjunktiv1 sin k1 === null", () => {
    expect(tKonjunktiv1(plain, "x")).toBeNull();
  });

  it("tPassivErsatz(pool vacío o sin passiv) === null", () => {
    expect(tPassivErsatz([], "x")).toBeNull();
    expect(tPassivErsatz([plain], "x")).toBeNull();
  });

  it("el resto de B2 también calla sin flags", () => {
    expect(tPartizipAttribut(plain, "x")).toBeNull();
    expect(tZweiteiligerKonnektor(plain, "x")).toBeNull();
    expect(tDiscourseEn(plain, "x")).toBeNull();
    expect(tRegisterEn(plain, "x")).toBeNull();
  });
});

describe("tKonjunktiv1", () => {
  it("con gram.k1 produce transform y answers contienen sei", () => {
    const v = mk({
      id: "k",
      target: "er sei krank",
      source: "dice que está enfermo",
      gram: { k1: "sei", trap: "er ist krank" },
    });
    const ex = tKonjunktiv1(v, "t");
    expect(ex).not.toBeNull();
    expect(ex!.type).toBe("transform");
    expect((ex as { answers: string[] }).answers.some((a) => /sei/i.test(a))).toBe(true);
  });
});

describe("levelTemplatesOf", () => {
  it("incluye nomen, k1, partizip, zweiteilig después de parafrasis", () => {
    const kinds = levelTemplatesOf("de").map((t) => t.kind);
    expect(kinds.slice(0, 5)).toEqual(["rektion", "dawo", "k2", "errorfix", "parafrasis"]);
    expect(kinds.slice(5)).toEqual(["nomen", "k1", "partizip", "zweiteilig"]);
  });
});

describe("una ficha A1 real no activa B2", () => {
  it("vía build null: ni nomen ni k1 ni partizip ni zweiteilig", () => {
    const v = courseOf("de").vocab.hund ?? courseOf("de").vocab.hallo;
    expect(v, "tiene que haber una ficha A1 en el curso").toBeDefined();
    const b2 = new Set(["nomen", "k1", "partizip", "zweiteilig"]);
    for (const t of levelTemplatesOf("de")) {
      if (!b2.has(t.kind)) continue;
      expect(t.build(v!, "sonda", 99), t.kind).toBeNull();
    }
  });
});
