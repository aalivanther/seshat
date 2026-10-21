import { afterEach, describe, expect, it, vi } from "vitest";
import { LANGUAGES, getLanguage, getActiveLang, adoptLang } from "@/lib/languages";
import { langConfig, GERMAN, ENGLISH } from "@/lib/language";
import { glueOf } from "@/lib/langUtils";
import {
  resolveLevelId, levelsOf, phasesOf, getLevel, levelOfPhase, highestAvailableUpTo, highestStartedCefr, levels,
} from "@/lib/levels";
import { CEFR_SCALE, cefrRank } from "@/lib/cefr";
import { phasesOf as progressPhasesOf, levelPct } from "@/lib/useProgress";
import { levelPseudoPhase } from "@/lib/retoRun";
import { courseOf, findLesson, langOfPhase, course } from "@/data/course";
import { examsByLang } from "@/data/exams";
import { examResultId } from "@/lib/ids";
import type { Course, Lesson, Phase, ServerState } from "@/lib/types";

/** Un A2 inglés de mentira, para probar el día que exista: un módulo con una
    lección. El motor no distingue este de uno escrito a mano. */
function withFakeEnA2(en: Course): Course {
  const lesson: Lesson = {
    id: "ena2m1l1", phaseId: "ena2m1", title: "Last weekend", subtitle: "past simple", minutes: 10, sections: [],
  };
  const phase: Phase = {
    id: "ena2m1", level: "a2", n: 1, title: "Last weekend", goal: "Contar lo que pasó", color: "#000",
    lessons: [lesson],
  };
  return { ...en, phases: [...en.phases, phase] };
}

// El registry multi-idioma: la deuda "idioma→curso" saldada. Estos tests
// clavan el contrato para que un idioma nuevo no rompa el anterior.

function fakeBrowser() {
  const store = new Map<string, string>();
  vi.stubGlobal("window", {
    localStorage: {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => void store.set(k, v),
    },
  });
  return store;
}

afterEach(() => {
  vi.unstubAllGlobals();
  adoptLang("de"); // el config en juego vuelve al default para otros tests
});

describe("registry de idiomas", () => {
  it("de y en existen, con config y glue propios", () => {
    expect(LANGUAGES.map((l) => l.id)).toContain("de");
    expect(LANGUAGES.map((l) => l.id)).toContain("en");
    expect(getLanguage("de")!.config).toBe(GERMAN);
    expect(getLanguage("en")!.config).toBe(ENGLISH);
    expect(getLanguage("fr")).toBeUndefined();
  });

  it("glue por idioma: 'the' es pegamento inglés, 'der' alemán — sin cruces", () => {
    expect(glueOf("en").has("the")).toBe(true);
    expect(glueOf("en").has("der")).toBe(false);
    expect(glueOf("de").has("der")).toBe(true);
    expect(glueOf("de").has("the")).toBe(false);
  });

  it("config inglés: artículo the/a/an se pela, sin plegado de teclado", () => {
    expect("the cat".replace(ENGLISH.articleRegex, "")).toBe("cat");
    expect("an apple".replace(ENGLISH.articleRegex, "")).toBe("apple");
    expect(ENGLISH.asciiFold).toHaveLength(0);
    expect(ENGLISH.capitalizedNouns).toBe(false);
  });
});

describe("idioma activo + config en juego", () => {
  it("sin window: activo = de (SSR determinista)", () => {
    expect(getActiveLang()).toBe("de");
  });

  it("adoptLang cambia activo Y el config que consulta el motor", () => {
    fakeBrowser();
    adoptLang("en");
    expect(getActiveLang()).toBe("en");
    expect(langConfig()).toBe(ENGLISH);
    adoptLang("de");
    expect(langConfig()).toBe(GERMAN);
  });

  it("adoptar un idioma inexistente no hace nada", () => {
    fakeBrowser();
    adoptLang("en");
    adoptLang("xx");
    expect(getActiveLang()).toBe("en");
  });
});

describe("niveles compuestos", () => {
  it("resolveLevelId acepta el legado: 'a1' → de-a1", () => {
    expect(resolveLevelId("a1")!.id).toBe("de-a1");
    expect(resolveLevelId("de-a2")!.id).toBe("de-a2");
    expect(resolveLevelId("zz")).toBeUndefined();
  });

  it("cada nivel filtra fases de SU idioma y SU cefr", () => {
    const deA1 = getLevel("de-a1")!;
    const phases = phasesOf(deA1);
    expect(phases.length).toBeGreaterThan(0);
    for (const p of phases) expect(p.level ?? "a1").toBe("a1");
    // ninguna fase inglesa se cuela en un nivel alemán
    for (const p of phases) expect(langOfPhase(p.id)).toBe("de");
  });

  it("levelsOf separa por idioma", () => {
    expect(levelsOf("de").every((l) => l.lang === "de")).toBe(true);
    expect(levelsOf("en").every((l) => l.lang === "en")).toBe(true);
  });
});

describe("courses por idioma", () => {
  it("courseOf de idioma ausente devuelve curso vacío (jamás undefined)", () => {
    const c = courseOf("xx");
    expect(c.phases).toHaveLength(0);
    expect(Object.keys(c.vocab)).toHaveLength(0);
  });

  it("`course` (compat) sigue siendo el alemán", () => {
    expect(course).toBe(courseOf("de"));
    expect(course.phases.length).toBeGreaterThanOrEqual(24);
  });

  it("findLesson dice el idioma dueño de la lección", () => {
    const l = course.phases[0].lessons[0];
    const hit = findLesson(l.id);
    expect(hit).not.toBeNull();
    expect(hit!.lang).toBe("de");
  });

  it("levelOfPhase encuentra el nivel dueño", () => {
    const p = course.phases[0];
    expect(levelOfPhase(p.id)?.id).toBe("de-a1");
  });
});

// La prueba de nivel mide hasta C1, pero cada curso llega hasta donde llega:
// colocar a alguien en un nivel que no existe es un 404 justo tras aprobar.
describe("nivel de entrada que existe de verdad", () => {
  it("el inglés A2 aterriza en el nivel más alto disponible del inglés", () => {
    const destino = highestAvailableUpTo("en", "a2");
    expect(destino).toBeDefined();
    expect(levels.find((l) => l.id === destino?.id)?.available).toBe(true);
    expect(destino?.lang).toBe("en");
  });

  it("nunca devuelve un nivel por encima del que se pide", () => {
    for (const lang of ["de", "en"]) {
      for (const cefr of CEFR_SCALE) {
        const d = highestAvailableUpTo(lang, cefr);
        if (!d) continue;
        expect(cefrRank(d.cefr)).toBeLessThanOrEqual(cefrRank(cefr));
      }
    }
  });
});


// ── Niveles en el registro: disponibles solo si este build trae módulos ──

describe("un nivel registrado: disponible solo si tiene módulos en este build", () => {
  const fichas = ["en-a2", "en-b1"];

  it("está en el registro, con sus textos escritos", () => {
    for (const id of fichas) {
      const lv = getLevel(id)!;
      expect(lv).toBeDefined();
      expect(lv.lang).toBe("en");
      expect(lv.title.length).toBeGreaterThan(0);
      expect(lv.desc.length).toBeGreaterThan(0);
      expect(lv.goal.length).toBeGreaterThan(0);
    }
    // el norte de examen, dicho en la ficha
    expect(getLevel("en-a2")!.desc).toContain("LanguageCert");
    expect(getLevel("en-b1")!.desc).toContain("LanguageCert");
  });

  // OJO: estas pruebas nacieron cuando `en-a2` y `en-b1` estaban registrados y
  // VACÍOS. Ya no lo están —el contenido se está escribiendo—, así que lo que
  // se comprueba ahora es la regla que las motivaba, y que sigue viva: un nivel
  // solo está disponible si sus módulos viajan de verdad en el build, y todo
  // lo que cuelga de un nivel (fases, reto, porcentaje) aguanta que no los haya.
  it("disponible ⇔ tiene módulos en ESTE build, nivel por nivel", () => {
    for (const lv of levels) {
      const tiene = phasesOf(lv).length > 0;
      expect(lv.available).toBe(tiene);
    }
  });

  it("las piezas que cuelgan de un nivel aguantan uno sin módulos", () => {
    // un id que no existe en el registro se comporta como el nivel vacío de ayer
    const fantasma = "xx-a1";
    // idioma que no existe: es el equivalente exacto del nivel vacío de ayer
    expect(phasesOf({ ...getLevel("en-a1")!, id: fantasma, lang: "xx" })).toEqual([]);
    expect(progressPhasesOf(fantasma)).toEqual([]);
    expect(levelPct(null, fantasma)).toBe(0);
    expect(levelPseudoPhase(fantasma)).toBeNull();
  });

  it("cada fase cae dentro de un nivel de su propio idioma", () => {
    for (const p of courseOf("en").phases) {
      const lv = levelOfPhase(p.id);
      expect(lv).toBeDefined();
      expect(lv!.lang).toBe("en");
      expect(lv!.cefr).toBe(p.level ?? "a1");
    }
  });

  it("invariante: todo nivel DISPONIBLE tiene módulos de verdad", () => {
    for (const lv of levels.filter((l) => l.available)) expect(phasesOf(lv).length).toBeGreaterThan(0);
  });
});

describe("highestStartedCefr — el nivel al que se le habla al alumno", () => {
  const hecho = (ids: string[]): ServerState => ({
    lessons: Object.fromEntries(
      ids.map((id) => [id, { completed: true, bestScore: 1, lastScore: 1, attempts: 1, lastAt: new Date().toISOString() }]),
    ),
    items: {},
    xp: 0,
    streakDays: 0,
    lastActive: "",
  });

  it("sin nada hecho, el suelo es el primer nivel disponible", () => {
    expect(highestStartedCefr("en", null)).toBe("a1");
  });

  it("terminar solo el A1 inglés NO sube el listón al A2", () => {
    // la regla que importa: sube el CONTENIDO COMPLETADO, no el registrado
    const a1 = courseOf("en").phases.filter((p) => (p.level ?? "a1") === "a1");
    const todasA1 = a1.flatMap((p) => p.lessons.map((l) => l.id));
    expect(highestStartedCefr("en", hecho(todasA1))).toBe("a1");
  });

  it("en alemán sí sube: aprobar el simulacro del B1 manda B1 (PLAN 1.9.9.5 B.2/B.4: una lección sola ya no basta)", () => {
    const b1 = courseOf("de").phases.filter((p) => p.level === "b1");
    expect(b1.length).toBeGreaterThan(0);
    const b1Exam = examsByLang.de?.find((e) => e.level === "b1");
    expect(b1Exam).toBeDefined();
    const st = hecho([]);
    st.lessons[examResultId(b1Exam!.id)] = { completed: true, bestScore: 1, lastScore: 1, attempts: 1, lastAt: "" };
    expect(highestStartedCefr("de", st)).toBe("b1");
  });

  it("sube al A2 en cuanto se aprueba su simulacro (PLAN 1.9.9.5 B.2/B.4: una lección sola ya no basta)", () => {
    // Esto se probaba con un curso falso porque el A2 inglés no existía. Ya
    // existe: se comprueba contra el contenido de verdad, que es más fuerte.
    const a2 = courseOf("en").phases.filter((p) => p.level === "a2");
    expect(a2.length).toBeGreaterThan(0);
    const a2Exam = examsByLang.en?.find((e) => e.level === "a2");
    expect(a2Exam).toBeDefined();
    const st = hecho([]);
    st.lessons[examResultId(a2Exam!.id)] = { completed: true, bestScore: 1, lastScore: 1, attempts: 1, lastAt: "" };
    expect(highestStartedCefr("en", st)).toBe("a2");
  });
});
