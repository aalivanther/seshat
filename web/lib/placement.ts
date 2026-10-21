// EXAMEN DE COLOCACIÓN — situar, no solo puntuar.
//
// Un test de nivel que devuelve «A2, 64%» no sirve de nada: el alumno ya sabía
// que estaba «más o menos por ahí». Lo que necesita saber es QUÉ domina, qué
// entiende a medias y dónde está flojo, con nombres de cosas que pueda buscar
// en el curso. Por eso cada ítem declara el tema que mide y el nivel al que
// pertenece, y cada tema aparece al menos dos veces: un diagnóstico que dependa
// de una sola respuesta no es un diagnóstico, es una moneda al aire.
//
// El análisis lo hace este archivo con reglas: una nota calculada así se
// puede explicar y repetir.

import { getProfile } from "./api";
import { CEFR_SCALE, cefrRank, isCefr, type Cefr } from "./cefr";
import type { ServerState } from "./types";

export type PlacementLevel = "a1" | "a2" | "b1" | "b2" | "c1";

export type PlacementSkill =
  | "lesen" | "hoeren" | "wortschatz" | "grammatik"
  | "reading" | "listening" | "vocabulary" | "grammar";

export interface PlacementItem {
  id: string;
  /** Se mide hasta C1 aunque el curso llegue al B1: quien ya está por encima
   *  merece saberlo, y el informe se lo dice sin fingir que aquí hay B2. */
  level: PlacementLevel;
  skill: PlacementSkill;
  /** etiqueta corta y estable del tema medido ("perfekt", "past-simple"…) */
  topic: string;
  kind: "mc" | "cloze" | "order";
  prompt: string;
  text?: string;
  audio?: string;
  options?: string[];
  answer?: number;
  answers?: string[];
  why: string;
  trap?: string;
}

/** Cómo va un tema. Tres estados, no cinco: más matices en un test de 40
 *  preguntas serían precisión fingida. */
export type TopicState = "dominado" | "a-medias" | "flojo";

export interface TopicResult {
  topic: string;
  /** el nivel MÁS BAJO donde se mide: es donde el alumno iría a estudiarlo */
  level: PlacementLevel;
  /** todos los niveles en los que aparece («questions» se mide en varios) */
  levels: PlacementLevel[];
  hits: number;
  total: number;
  state: TopicState;
}

export interface LevelResult {
  level: PlacementLevel;
  hits: number;
  total: number;
  pct: number;
}

/** Cómo de firme es la lectura del nivel. Un test de 40-68 preguntas no da para
 *  fingir precisión decimal: lo honesto es decir si el resultado está claro o si
 *  el alumno está en la frontera. */
export type Confianza = "alta" | "media" | "frontera";

export interface SkillResult {
  skill: PlacementSkill;
  hits: number;
  total: number;
  pct: number;
}

export interface PlacementReport {
  /** dónde empezar DENTRO del curso (el techo lo pone `ceiling`, hoy B2) */
  placed: Cefr;
  /** el nivel real medido, que puede estar por encima de lo que el curso ofrece */
  realLevel: PlacementLevel | null;
  /** true si el alumno está por encima del techo del curso */
  aboveCourse: boolean;
  /** el nivel más alto superado con solvencia (null si ni el A1) */
  highestSolid: PlacementLevel | null;
  byLevel: LevelResult[];
  topics: TopicResult[];
  dominados: TopicResult[];
  aMedias: TopicResult[];
  flojos: TopicResult[];
  hits: number;
  total: number;
  pct: number;
  /** frase de una línea, honesta, que resume el resultado */
  veredicto: string;
  /** por destreza, que es como reparte la nota cualquier escuela */
  bySkill: SkillResult[];
  /** ¿es una lectura firme, o está en la frontera entre dos niveles? */
  confianza: Confianza;
  /** el porqué de la confianza, en una línea */
  confianzaPorque: string;
  /** el equivalente en los exámenes oficiales del idioma */
  equivalencia: string;
  /** cómo se ha calculado, para que el resultado se pueda auditar */
  metodo: {
    itemsPorNivel: { level: PlacementLevel; total: number }[];
    corte: number;
    minItemsPorTema: number;
    /** lo que este test NO mide y una escuela sí */
    limites: string[];
  };
  /** ISO — cuándo se hizo, para poder comparar con el siguiente */
  at: string;
  /** El perfil sabe que te colocaron, pero el informe detallado no viajó con él. */
  detalleAusente?: boolean;
}

/** localStorage no se aplica a ciegas: un JSON a medias pintaría «undefined%».
 *  Un informe viejo sin veredicto no se tira: el placed sí viaja. */
export function parsePlacementReport(raw: unknown): PlacementReport | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const o = raw as Record<string, unknown>;
  if (typeof o.placed !== "string" || !isCefr(o.placed)) return null;
  let pct = 0;
  if (typeof o.pct === "number" && Number.isFinite(o.pct)) {
    pct = Math.min(100, Math.max(0, o.pct));
  }
  const veredicto = typeof o.veredicto === "string" && o.veredicto.trim()
    ? o.veredicto
    : "El cuaderno está situado. El detalle de temas no vino en este informe.";
  return { ...(o as unknown as PlacementReport), placed: o.placed, pct, veredicto };
}

/** normaliza para comparar: sin mayúsculas, sin puntuación final, sin espacios
 *  de más. Lo que se mide es el orden y las palabras, no la puntería. */
function norm(t: string): string {
  return t
    .toLowerCase()
    .replace(/[.,;:!?¿¡]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** ¿acertó este ítem? Vale para los tres formatos.
 *
 *  Ojo con `order`: los dos bancos lo escribieron distinto —el alemán guarda la
 *  frase entera en `answers` y el inglés guarda las fichas sueltas—, y con la
 *  comparación literal de antes los tres ítems ingleses eran INACERTABLES
 *  hiciera lo que hiciera el alumno. Se aceptan las dos formas: lo que importa
 *  es la secuencia final. */
export function isCorrect(item: PlacementItem, given: string | number | null): boolean {
  if (given === null || given === undefined) return false;
  if (item.kind === "mc") return typeof given === "number" && given === item.answer;
  const raw = norm(String(given));
  if (!raw) return false;
  const acc = item.answers ?? [];
  if (acc.some((a) => norm(a) === raw)) return true;
  if (item.kind === "order" && acc.length > 1 && norm(acc.join(" ")) === raw) return true;
  return false;
}

/** Umbrales de dominio de un tema, sobre sus 2-4 ítems: dominado desde el 80%
 *  de aciertos, flojo por debajo del 25%, y en medio «a medias». Tres estados y
 *  no cinco a propósito: con dos o tres preguntas por tema, más finura sería
 *  precisión fingida. */
function stateOf(hits: number, total: number): TopicState {
  if (total === 0) return "flojo";
  const r = hits / total;
  if (r >= 0.8) return "dominado";   // todo, o casi todo con varios ítems
  if (r <= 0.25) return "flojo";     // nada, o uno suelto de cuatro
  return "a-medias";
}

/** El corte por nivel: para dar un nivel por superado hace falta un 70% de sus
 *  ítems. Es exigente a propósito — colocar a alguien por encima de su sitio le
 *  arruina el curso; colocarlo por debajo solo le hace repasar. */
const CORTE = 0.7;

export function analyzePlacement(
  items: PlacementItem[],
  given: Record<string, string | number | null>,
  ceiling: Cefr,
): PlacementReport {
  // PlacementLevel es la escala CEFR menos el c2 (la prueba mide "hasta C1"
  // por diseño): se filtra de CEFR_SCALE en vez de repetirla a mano.
  const niveles = CEFR_SCALE.filter((c): c is PlacementLevel => c !== "c2");

  const byLevel: LevelResult[] = niveles.map((lv) => {
    const del = items.filter((i) => i.level === lv);
    const hits = del.filter((i) => isCorrect(i, given[i.id] ?? null)).length;
    return { level: lv, hits, total: del.length, pct: del.length ? Math.round((hits / del.length) * 100) : 0 };
  });

  // Los temas se agrupan por TEMA, no por (tema × nivel). Lo intenté al revés
  // —para que «artículos de A1» no se mezclara con «artículos de B1»— y el
  // resultado fue peor: la mitad de los grupos quedaban con un solo ítem, y un
  // diagnóstico que cuelga de una sola respuesta es una moneda al aire. Un tema
  // que se mide en varios niveles se lee como lo que es: cómo va ESE asunto.
  const mapa = new Map<string, TopicResult>();
  for (const it of items) {
    const acc =
      mapa.get(it.topic) ??
      ({ topic: it.topic, level: it.level, levels: [], hits: 0, total: 0, state: "flojo" } as TopicResult);
    acc.total += 1;
    if (!acc.levels.includes(it.level)) acc.levels.push(it.level);
    // el nivel que se enseña es el más bajo donde se mide: es donde se estudia
    if (cefrRank(it.level) < cefrRank(acc.level)) acc.level = it.level;
    if (isCorrect(it, given[it.id] ?? null)) acc.hits += 1;
    mapa.set(it.topic, acc);
  }
  const topics = [...mapa.values()]
    .map((t) => ({ ...t, levels: t.levels.sort(), state: stateOf(t.hits, t.total) }))
    // primero lo que peor va: es lo que el alumno tiene que leer
    .sort((a, b) => a.hits / a.total - b.hits / b.total || a.topic.localeCompare(b.topic));

  // el nivel donde colocar: el más alto que se supera con solvencia, y se
  // estudia EL SIGUIENTE (si ya domina el B1, se queda en B1: es lo que hay)
  let highestSolid: PlacementLevel | null = null;
  for (const lv of niveles) {
    const r = byLevel.find((b) => b.level === lv)!;
    if (r.total > 0 && r.hits / r.total >= CORTE) highestSolid = lv;
    else break; // no se salta un nivel flojo para premiar uno alto suelto
  }
  // El techo es el nivel que ESTE build enseña. Obligatorio: un default "b1"
  // mentiría el día que el curso llegue a B2 o un build solo-A1.
  const TECHO: Cefr = ceiling;
  const siguiente: Record<PlacementLevel, Cefr> = Object.fromEntries(
    niveles.map((lv) => [lv, cefrRank(lv) < cefrRank(TECHO) ? CEFR_SCALE[cefrRank(lv) + 1] : TECHO]),
  ) as Record<PlacementLevel, Cefr>;
  const placed: Cefr = highestSolid ? siguiente[highestSolid] : "a1";
  const realLevel = highestSolid;
  const aboveCourse = !!highestSolid && cefrRank(highestSolid) > cefrRank(TECHO);

  const hits = items.filter((i) => isCorrect(i, given[i.id] ?? null)).length;
  const total = items.length;
  const pct = total ? Math.round((hits / total) * 100) : 0;

  // por destreza: es como reparte la nota una escuela, y sirve para ver si la
  // debilidad es de gramática o de oído, que se arreglan de maneras distintas
  const skills = [...new Set(items.map((i) => i.skill))];
  const bySkill: SkillResult[] = skills.map((sk) => {
    const del = items.filter((i) => i.skill === sk);
    const h = del.filter((i) => isCorrect(i, given[i.id] ?? null)).length;
    return { skill: sk, hits: h, total: del.length, pct: del.length ? Math.round((h / del.length) * 100) : 0 };
  });

  // CONFIANZA: si el nivel siguiente al colocado se quedó rozando el corte, o si
  // el propio nivel superado apenas lo pasó, la lectura es de frontera y hay que
  // decirlo — un test que no admite dudas cuando las hay engaña.
  const idxSolid = highestSolid ? niveles.indexOf(highestSolid) : -1;
  const siguienteNivel = byLevel[idxSolid + 1];
  const propio = idxSolid >= 0 ? byLevel[idxSolid] : null;
  let confianza: Confianza = "alta";
  let confianzaPorque = "Los niveles se separan con claridad: no hay duda razonable sobre dónde estás.";
  const rozando = siguienteNivel && siguienteNivel.total > 0 && siguienteNivel.pct >= CORTE * 100 - 15;
  const justo = propio && propio.pct <= CORTE * 100 + 8;
  if (rozando && justo) {
    confianza = "frontera";
    confianzaPorque = `Estás entre dos niveles: superaste el ${highestSolid?.toUpperCase()} por poco (${propio!.pct}%) y te quedaste cerca del ${siguienteNivel!.level.toUpperCase()} (${siguienteNivel!.pct}%). Una escuela te pondría en el más bajo de los dos y te subiría en dos semanas si va sobrado.`;
  } else if (rozando || justo) {
    confianza = "media";
    confianzaPorque = rozando
      ? `Rozaste el ${siguienteNivel!.level.toUpperCase()} (${siguienteNivel!.pct}%, hace falta ${Math.round(CORTE * 100)}%): con un empujón en lo que sale flojo, ese nivel es tuyo.`
      : `Superaste el ${highestSolid?.toUpperCase()} justo (${propio!.pct}%): conviene repasarlo mientras avanzas.`;
  }

  const dominados = topics.filter((t) => t.state === "dominado");
  const aMedias = topics.filter((t) => t.state === "a-medias");
  const flojos = topics.filter((t) => t.state === "flojo");

  const veredicto = !highestSolid
    ? "Empiezas de cero, y está perfectamente: el curso está pensado justo para eso."
    : aboveCourse
      ? `Tu nivel medido es ${highestSolid.toUpperCase()}, por encima de donde llega este curso (${TECHO.toUpperCase()}). Te sirve para repasar sin lagunas y para preparar el examen, pero no esperes material nuevo de tu nivel: todavía no existe aquí.`
      : highestSolid === "b1"
        ? "Tienes el B1 asentado. Aquí ya solo queda pulirlo: repaso, simulacros y lo que salga flojo abajo."
        : `Tienes el ${highestSolid.toUpperCase()} bastante asentado: lo tuyo es empezar por el ${placed.toUpperCase()} sin rehacer lo que ya sabes.`;

  const equivalencia = equivalenciaOficial(items[0]?.skill, highestSolid);

  return {
    placed,
    realLevel,
    aboveCourse,
    highestSolid,
    byLevel,
    topics,
    dominados,
    aMedias,
    flojos,
    hits,
    total,
    pct,
    veredicto,
    bySkill,
    confianza,
    confianzaPorque,
    equivalencia,
    metodo: {
      itemsPorNivel: byLevel.map((b) => ({ level: b.level, total: b.total })),
      corte: Math.round(CORTE * 100),
      minItemsPorTema: 2,
      limites: [
        "No mide expresión escrita ni oral: una escuela te pediría además escribir un texto y hablar cinco minutos.",
        "Mide reconocimiento y uso guiado; la producción libre solo la ve el simulacro completo.",
        "El audio es voz sintética, no grabaciones con ruido de calle ni acentos regionales.",
      ],
    },
    at: new Date().toISOString(),
  };
}

/** El equivalente oficial del nivel, que es como lo entiende una escuela. */
function equivalenciaOficial(skill: PlacementSkill | undefined, level: PlacementLevel | null): string {
  if (!level) return "Por debajo de A1: es el punto de partida de cualquier curso para principiantes.";
  const aleman = skill === "lesen" || skill === "hoeren" || skill === "wortschatz" || skill === "grammatik";
  const de: Record<PlacementLevel, string> = {
    a1: "Goethe-Zertifikat A1 (Start Deutsch 1) · ÖSD A1",
    a2: "Goethe-Zertifikat A2 · ÖSD A2",
    b1: "Goethe-Zertifikat B1 = ÖSD B1 (el que piden para muchos trámites)",
    b2: "Goethe-Zertifikat B2 · telc B2 (nivel de acceso a muchos trabajos)",
    c1: "Goethe-Zertifikat C1 · DSH-1 / TestDaF 4 (acceso a universidad alemana)",
  };
  const en: Record<PlacementLevel, string> = {
    a1: "LanguageCert A1 Preliminary · Cambridge pre-A1/A1",
    a2: "LanguageCert A2 Access · Cambridge KEY (KET)",
    b1: "LanguageCert B1 Achiever · Cambridge PET · IELTS ~4.0-5.0",
    b2: "LanguageCert B2 Communicator · Cambridge FIRST · IELTS ~5.5-6.5",
    c1: "LanguageCert C1 Expert · Cambridge ADVANCED · IELTS ~7.0-8.0",
  };
  return aleman ? de[level] : en[level];
}

/** Nombre legible de un tema, para no enseñarle al alumno la etiqueta técnica.
 *  Lo que no esté aquí se muestra tal cual: es preferible una etiqueta rara a
 *  una traducción inventada. */
export const TOPIC_LABEL: Record<string, string> = {
  // alemán
  perfekt: "el Perfekt (pasado hablado)",
  praeteritum: "el Präteritum (pasado escrito)",
  konjunktiv2: "el Konjunktiv II (hipótesis y cortesía)",
  nebensaetze: "las subordinadas (weil, dass, obwohl…)",
  wechselpraepositionen: "preposiciones de lugar (an, auf, in…)",
  adjektivdeklination: "la declinación del adjetivo",
  rektion: "verbos con preposición fija",
  passiv: "la pasiva",
  artikel: "los artículos y sus casos",
  wortstellung: "el orden de la frase",
  trennbare: "los verbos separables",
  komparativ: "comparar (größer als, am größten)",
  modalverben: "los verbos modales",
  genitiv: "el genitivo",
  futur: "el futuro",
  praesens: "el presente (y los verbos irregulares)",
  alltagswortschatz: "vocabulario del día a día",
  falschefreunde: "los falsos amigos",
  globalverstehen: "entender la idea general",
  detailverstehen: "pescar el dato concreto",
  konjunktiv1: "el estilo indirecto (Konjunktiv I)",
  partizipialkonstruktionen: "las construcciones con participio",
  nominalisierung: "la nominalización (registro escrito)",
  "konnektoren-formell": "conectores de registro formal",
  funktionsverbgefuege: "las construcciones con verbo funcional",
  passiversatz: "alternativas a la pasiva (sich lassen, sein + zu)",
  modalpartikeln: "las partículas modales (doch, ja, mal, eben)",
  wortbildung: "formación de palabras",
  idiomatik: "expresiones hechas",
  registerwechsel: "cambiar de registro",
  konzessiv: "la concesión (obwohl, obgleich, wenngleich)",
  "irreale-vergleiche": "comparaciones irreales (als ob)",
  // inglés
  "present-simple": "el presente simple",
  "present-continuous": "el presente continuo",
  "past-simple": "el pasado simple",
  "present-perfect": "el presente perfecto",
  articles: "los artículos (a / an / the)",
  plurals: "los plurales",
  "prepositions-time": "preposiciones de tiempo (in, on, at)",
  "prepositions-place": "preposiciones de lugar",
  comparatives: "los comparativos",
  questions: "preguntar (orden y auxiliares)",
  modals: "los modales (can, must, should)",
  conditionals: "los condicionales",
  "word-order": "el orden de la frase",
  countables: "contables e incontables",
  "false-friends": "los falsos amigos",
  collocations: "las combinaciones naturales de palabras",
  "collocations-advanced": "colocaciones de nivel alto",
  "word-formation": "formación de palabras",
  passive: "la pasiva",
  "reported-speech": "el estilo indirecto",
  "relative-clauses": "las oraciones de relativo",
  inversion: "la inversión enfática (rarely had I…)",
  "cleft-sentences": "las frases hendidas (What I need is…)",
  "phrasal-verbs": "los phrasal verbs",
  hedging: "matizar y suavizar lo que se afirma",
  "discourse-markers": "los conectores del discurso",
  register: "el registro (formal o informal)",
  idioms: "las expresiones hechas",
  "narrative-tenses": "los tiempos del relato",
  "unreal-past": "el pasado irreal (I'd rather you didn't)",
  nominalisation: "la nominalización",
};

export function topicLabel(topic: string): string {
  return TOPIC_LABEL[topic] ?? topic;
}

/** Dónde se guarda el informe de cada perfil: es un diagnóstico personal, así
 *  que va por perfil y se queda en el dispositivo donde se hizo. */
export function placementKey(lang: string, profile: string): string {
  return `seshat-colocacion-${lang}-${profile || "default"}`;
}

/** Dónde colocó la prueba de nivel al alumno en este idioma — fuente única
 *  que consultan `unlock.ts`, `nextLessonId` y `highestStartedCefr` (PLAN
 *  1.9.8 §3.2): primero `ServerState` (viaja con el perfil), y si no hay,
 *  cae al informe en `localStorage` (el dispositivo donde se hizo la
 *  prueba, para cuando el backend está caído o el perfil aún no se guardó). */
export function placedLevel(st: ServerState | null, lang: string): Cefr | null {
  const fromServer = st?.placement?.[lang]?.placed;
  if (fromServer) return fromServer;
  if (typeof window === "undefined") return null;
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(placementKey(lang, getProfile()));
  } catch {
    return null;
  }
  if (!raw) return null;
  try {
    return (JSON.parse(raw) as PlacementReport).placed ?? null;
  } catch {
    return null;
  }
}

/** Las destrezas, dichas como las diría un profesor y no como las guarda el dato. */
export const SKILL_LABEL: Record<string, string> = {
  grammatik: "Gramática", wortschatz: "Vocabulario", lesen: "Comprensión lectora", hoeren: "Comprensión oral",
  grammar: "Gramática", vocabulary: "Vocabulario", reading: "Comprensión lectora", listening: "Comprensión oral",
};

/** La misma destreza en una palabra: en un radar no cabe «Comprensión lectora». */
export const SKILL_SHORT: Record<string, string> = {
  grammatik: "Gramática", wortschatz: "Léxico", lesen: "Lectura", hoeren: "Oído",
  grammar: "Gramática", vocabulary: "Léxico", reading: "Lectura", listening: "Oído",
};

export function skillLabel(skill: string, short = false): string {
  return (short ? SKILL_SHORT : SKILL_LABEL)[skill] ?? skill;
}

/** Último recurso: la prueba antigua se guardó como lección `colocacion-xx`
 *  con un porcentaje global, sin el CEFR. No se puede reconstruir el corte
 *  por nivel; se sub-coloca a propósito. 66 % (el caso real: «B1 sólido»)
 *  cae en B1. No se usa si hay informe en localStorage o colocación en el
 *  perfil. */
export function placedFromColocacionScore(score: number): Cefr {
  const pct = score <= 1 ? score * 100 : score;
  if (pct >= 72) return "b2";
  if (pct >= 58) return "b1";
  if (pct >= 42) return "a2";
  return "a1";
}
