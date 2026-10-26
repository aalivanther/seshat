import { describe, expect, it } from "vitest";
import { newWordsIn } from "@/lib/newWords";
import { course, courseOf, courses, findLesson } from "@/data/course";
import { asciiFold, glueOf } from "@/lib/langUtils";
import type { Exercise } from "@/lib/types";

// f0l1 es la primera lección "real" (fase Fundamento): presenta hallo, tschuess,
// aufwiedersehen, bisspaeter, ichheisse, wieheisstdu — buen punto de corte para
// probar qué se considera "conocido hasta aquí".
const LESSON = "f0l1";

function typeEx(answers: string[], question = "Di en alemán: la frase"): Exercise {
  return { id: "syn-1", type: "type", prompt: "Traduce", question, answers };
}

describe("newWordsIn", () => {
  it("palabra inventada («Quixotisch») en una lección real: se detecta como nueva", () => {
    expect(newWordsIn(typeEx(["Quixotisch"]), LESSON)).toEqual(["Quixotisch"]);
  });

  it("palabras GLUE («und») no se marcan; las presentadas en la lección tampoco", () => {
    // hallo se presenta en f0l1; und es pegamento → solo la inventada es nueva
    expect(newWordsIn(typeEx(["Quixotisch und Hallo"]), LESSON)).toEqual(["Quixotisch"]);
  });

  it("palabra presentada en la propia lección no es nueva", () => {
    expect(newWordsIn(typeEx(["Hallo"]), LESSON)).toEqual([]);
  });

  it("palabra presentada ANTES sigue conocida en lecciones posteriores", () => {
    const laterLesson = course.phases[1].lessons[course.phases[1].lessons.length - 1].id;
    expect(newWordsIn(typeEx(["Tschüss"]), laterLesson)).toEqual([]);
  });

  it("nombre propio que aparece en el español del ejercicio no cuenta (Mexiko ~ México)", () => {
    expect(newWordsIn(typeEx(["Mexiko"], "Di en alemán: Vengo de México"), LESSON)).toEqual([]);
  });

  it("palabra inventada en minúscula sí se marca (sin trato de nombre propio)", () => {
    expect(newWordsIn(typeEx(["blorfig"]), LESSON)).toEqual(["blorfig"]);
  });

  it("tope de 3 palabras nuevas por ejercicio", () => {
    const ex = typeEx(["Quixotisch Blarfweg Zumpfkraft Wibbelwapp"]);
    expect(newWordsIn(ex, LESSON)).toHaveLength(3);
  });

  it("la misma palabra repetida se reporta una sola vez", () => {
    expect(newWordsIn(typeEx(["Quixotisch Quixotisch"]), LESSON)).toEqual(["Quixotisch"]);
  });

  it("lessonId desconocido → sin avisos (no hay mapa para juzgar)", () => {
    expect(newWordsIn(typeEx(["Quixotisch"]), "no-such-lesson")).toEqual([]);
  });

  it("en cloze se evalúa la frase con el hueco relleno", () => {
    const ex: Exercise = {
      id: "syn-cloze", type: "cloze", prompt: "Completa",
      text: "Hallo, ich ___ Quixotisch", answers: ["heiße"],
      // ojo: la palabra inventada NO puede aparecer en el español del ejercicio
      // (activaría la supresión de nombres propios que prueba otro caso)
      translation: "Hola, me llamo…",
    };
    // heiße se presenta en f0l1 (ichheisse); la inventada es la única nueva
    const out = newWordsIn(ex, LESSON);
    expect(out).toContain("Quixotisch");
    expect(out).not.toContain("heiße");
  });
});

// ── La implementación anterior, copiada tal cual (copias de Set por lección).
// newWords.ts guarda ahora ordinales en vez de copias; esto prueba, sobre el
// curso REAL de los dos idiomas, que responde exactamente lo mismo. ──
const old = (() => {
  const tokenize = (text: string) => text.toLowerCase().split(/[^a-zäöüß]+/).filter((t) => t.length >= 3);
  const knownByLang = new Map<string, Map<string, { known: Set<string>; stems: Set<string> }>>();
  function stemOf(t: string): string {
    const noUmlaut = t.replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u");
    const s = noUmlaut.replace(/(?:est|en|st|er|et|e|t|n)$/, "");
    return s.length >= 3 ? s : noUmlaut;
  }
  function addStemsOf(t: string, stems: Set<string>): void {
    stems.add(stemOf(t));
    const m = /^(auf|aus|an|ab|ein|mit|nach|vor|zu|um|weg|zurück|fern)(.{4,})$/.exec(t);
    if (m) stems.add(stemOf(m[2]));
  }
  function build(lang: string) {
    const cached = knownByLang.get(lang);
    if (cached) return cached;
    const c = courseOf(lang);
    const known = new Set<string>();
    const stems = new Set<string>();
    const knownByLesson = new Map<string, { known: Set<string>; stems: Set<string> }>();
    knownByLang.set(lang, knownByLesson);
    for (const p of c.phases) {
      for (const l of p.lessons) {
        for (const sec of l.sections) {
          for (const id of sec.itemIds ?? []) {
            const v = c.vocab[id];
            if (!v) continue;
            for (const t of tokenize(v.target)) {
              if (known.has(t)) continue;
              known.add(t);
              addStemsOf(t, stems);
            }
            if (v.plural) {
              for (const t of tokenize(v.plural)) {
                if (known.has(t)) continue;
                known.add(t);
                addStemsOf(t, stems);
              }
            }
          }
        }
        knownByLesson.set(l.id, { known: new Set(known), stems: new Set(stems) });
      }
    }
    return knownByLesson;
  }
  const isKnown = (token: string, known: Set<string>, stems: Set<string>, glue: Set<string>) =>
    known.has(token) || glue.has(token) || stems.has(stemOf(token));
  function spanishTexts(ex: Exercise): string {
    const parts: string[] = [ex.prompt ?? ""];
    if ("translation" in ex && ex.translation) parts.push(ex.translation);
    if ("question" in ex && ex.question) parts.push(ex.question);
    if (ex.type === "match") parts.push(...ex.pairs.map((p) => p.source));
    return parts.join(" ").toLowerCase();
  }
  function looksLikeProperNoun(raw: string, spanish: string): boolean {
    if (!/^[A-ZÄÖÜ]/.test(raw)) return false;
    const folded = asciiFold(raw.toLowerCase());
    for (const sTok of spanish.split(/[^a-záéíóúüñäöß]+/i)) {
      if (sTok.length < 3) continue;
      const sf = asciiFold(sTok);
      if (sf === folded) return true;
      if (Math.abs(sf.length - folded.length) <= 2 && (sf.startsWith(folded.slice(0, 4)) || folded.startsWith(sf.slice(0, 4)))) {
        return true;
      }
    }
    return false;
  }
  const stripParens = (t: string) => t.replace(/\([^)]*\)/g, " ");
  function germanTexts(ex: Exercise): string[] {
    switch (ex.type) {
      case "cloze": return [stripParens(ex.text.replace("___", ex.answers[0] ?? ""))];
      case "build": return [stripParens(ex.target)];
      case "type": return [stripParens(ex.answers[0] ?? "")];
      case "listen": return [stripParens(ex.text)];
      case "match": return ex.pairs.map((p) => stripParens(p.target));
      case "order": return ex.sentences.map(stripParens);
      case "transform": return [stripParens(ex.source), stripParens(ex.answers[0] ?? "")];
      case "bucket": return ex.items.map((it) => stripParens(it.text));
      default: return [];
    }
  }
  return function oldNewWordsIn(ex: Exercise, lessonId: string): string[] {
    if (ex.type === "read") return [];
    const lang = findLesson(lessonId)?.lang ?? "de";
    const entry = build(lang).get(lessonId);
    if (!entry) return [];
    const glue = glueOf(lang);
    const { known, stems } = entry;
    const seen = new Set<string>();
    const fresh: string[] = [];
    const spanish = spanishTexts(ex);
    for (const text of germanTexts(ex)) {
      for (const raw of text.split(/[^A-Za-zÄÖÜäöüß]+/)) {
        if (raw.length < 3) continue;
        const token = raw.toLowerCase();
        if (seen.has(token) || isKnown(token, known, stems, glue)) continue;
        if (looksLikeProperNoun(raw, spanish)) continue;
        seen.add(token);
        fresh.push(raw);
        if (fresh.length >= 3) return fresh;
      }
    }
    return fresh;
  };
})();

describe("newWordsIn con ordinales ≡ la implementación de copias por lección", () => {
  for (const lang of Object.keys(courses)) {
    it(`curso real «${lang}»: cada ejercicio de cada lección da lo mismo`, () => {
      let n = 0;
      for (const p of courses[lang].phases) {
        for (const l of p.lessons) {
          for (const sec of l.sections) {
            for (const ex of sec.exercises ?? []) {
              expect(newWordsIn(ex, l.id), `${l.id}/${ex.id}`).toEqual(old(ex, l.id));
              n++;
            }
          }
        }
      }
      expect(n).toBeGreaterThan(1000);
    });

    it(`curso real «${lang}»: el corte cae en la misma lección (tarjetas de antes, de la propia y de después)`, () => {
      // Sondas sintéticas: las formas de las tarjetas presentadas en la lección
      // anterior, en la propia y en las dos siguientes. Es justo donde una
      // comparación de ordinales mal hecha (< en vez de ≤, o al revés) se nota.
      const c = courses[lang];
      const lessons = c.phases.flatMap((p) => p.lessons);
      const targetsOf = (i: number) =>
        (lessons[i]?.sections ?? []).flatMap((sec) => sec.itemIds ?? []).flatMap((id) => {
          const v = c.vocab[id];
          return v ? [v.target, ...(v.plural ? [v.plural] : [])] : [];
        });
      let n = 0;
      lessons.forEach((l, i) => {
        for (const text of [i - 1, i, i + 1, i + 2].flatMap(targetsOf)) {
          const ex = typeEx([text], "Di en la lengua que estudias: la frase");
          expect(newWordsIn(ex, l.id), `${l.id} ← «${text}»`).toEqual(old(ex, l.id));
          n++;
        }
      });
      expect(n).toBeGreaterThan(1000);
    });
  }
});
