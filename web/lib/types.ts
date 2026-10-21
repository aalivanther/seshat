// Modelo de contenido del curso.
// Filosofía: frase usable → comprensión → regla → práctica con corrección inmediata.

// Cefr vive en ./cefr (PLAN 1.9.9 F1.1, la única escalera del repo);
// se reexporta aquí para no romper importaciones existentes.
import type { Cefr } from "./cefr";
export type { Cefr };

export type ExerciseType =
  | "mc" // opción múltiple (reconocimiento)
  | "cloze" // completar hueco (recuerdo con apoyo)
  | "build" // construir frase ordenando fichas (producción guiada)
  | "match" // emparejar pares (reconocimiento)
  | "type" // escribir traducción/respuesta (producción libre)
  | "listen" // escuchar TTS y escribir lo oído (dictado)
  | "speak" // leer en voz alta con guía de pronunciación (auto-evaluado)
  | "order" // ordenar oraciones de una mini-historia (secuenciación narrativa)
  | "transform" // reescribir una frase en la forma pedida (Präsens→Perfekt, output forzado)
  | "translate" // traducir en los dos sentidos: español→idioma y idioma→español
  | "bucket" // clasificar ítems en dos categorías gramaticales (VanPatten)
  | "shadow" // repetición sombreada pegándose al audio (Hamada: decodificación bottom-up)
  | "fastmatch" // emparejado con tempo: el cronómetro SOLO premia (DeKeyser/Segalowitz)
  | "hearreal" // ¿libro o calle? Misma voz y misma velocidad: el registro escrito, no un contraste fonético
  | "write" // micro-escritura por funciones (formato examen: 30-50 palabras, corrección por bullets)
  | "audiomc" // comprensión auditiva pura: pregunta ANTES, audio ×2 máx, opciones plausibles
  // ── B1 ──
  | "read" // lectura larga (300-500 palabras) con preguntas de inferencia
  | "gapbank" // párrafo con huecos y banco compartido (conectores, K2, rección)
  | "errorfix" // corregir el calco típico del hispanohablante
  | "paraphrase" // decirlo de otra manera (con palabras prohibidas)
  | "monologue"; // hablar 2-3 min con planificación y repetición de tarea

export interface ExerciseBase {
  id: string;
  type: ExerciseType;
  /** Instrucción en español */
  prompt: string;
  /** Pista incremental: se revelan en orden, cada una cuesta un poco de puntuación */
  hints?: string[];
  /** Consejo pedagógico mostrado tras responder (el "porqué") */
  tip?: string;
  /** IDs de vocabulario/frases que este ejercicio practica (para SRS) */
  itemIds?: string[];
  /** El objetivo del ejercicio ES el Umlaut: no perdonar su omisión (Äpfel vs Apfel) */
  strictUmlaut?: boolean;
  /** El objetivo del ejercicio ES la contracción: `don't` y `do not` dejan de
   *  valer lo mismo. Un dictado se corrige por lo que sonó, y la lección que
   *  enseña «Yes, I am» (nunca «Yes, I'm») se regalaría sola sin esto. */
  strictContractions?: boolean;
  /** Fuerza el modo de repaso cuando el TIPO no basta para saberlo. El caso que
   *  lo hizo falta: traducir hacia el idioma es producir, y traducir al español
   *  es reconocer — mismo tipo, dos modos, y el SRS espacia distinto cada uno. */
  mode?: ReviewMode;
}

export interface MCExercise extends ExerciseBase {
  type: "mc";
  question: string;
  options: string[];
  answer: number; // índice correcto
  /** por qué las otras están mal, indexado igual que options (opcional) */
  whyWrong?: (string | null)[];
}

export interface ClozeExercise extends ExerciseBase {
  type: "cloze";
  /** Frase con ___ como hueco. Un solo hueco por ejercicio. */
  text: string;
  answers: string[]; // respuestas aceptadas
  translation?: string;
}

export interface BuildExercise extends ExerciseBase {
  type: "build";
  /** Frase objetivo en alemán */
  target: string;
  /** Traducción al español mostrada como consigna */
  translation: string;
  /** Fichas extra que NO van en la frase (distractores) */
  distractors?: string[];
  /** Órdenes alternativos igualmente correctos con las mismas fichas
      (p. ej. inversión: "Jetzt musst du arbeiten") — también se aceptan */
  altTargets?: string[];
}

export interface MatchExercise extends ExerciseBase {
  type: "match";
  /** target = idioma que se aprende · source = idioma del alumno */
  pairs: { target: string; source: string }[];
}

export interface TypeExercise extends ExerciseBase {
  type: "type";
  question: string; // consigna, p.ej. "Traduce: Me llamo Ana"
  answers: string[]; // respuestas aceptadas (la primera es la canónica)
}

export interface ListenExercise extends ExerciseBase {
  type: "listen";
  /** Texto alemán que el TTS pronuncia y el alumno transcribe */
  text: string;
  translation?: string;
}

export interface SpeakExercise extends ExerciseBase {
  type: "speak";
  text: string; // frase a leer en voz alta
  phonetic: string; // guía "suena como" para hispanohablante
  translation?: string;
}

export interface OrderExercise extends ExerciseBase {
  type: "order";
  /** oraciones EN el orden correcto (se muestran barajadas con semilla estable) */
  sentences: string[];
  translation?: string;
}

/** TRADUCCIÓN EN LOS DOS SENTIDOS.
 *
 *  Traducir HACIA el idioma es producción pura: no hay fichas que ordenar ni
 *  opciones donde reconocer la respuesta, hay que sacarla de la cabeza. Y
 *  traducir DESDE el idioma comprueba que se ha entendido de verdad, no que se
 *  ha adivinado por el contexto. Es el ejercicio que más se parece a lo que hace
 *  alguien que estudia solo con un cuaderno, y el curso no lo tenía.
 */
export interface TranslateExercise extends ExerciseBase {
  type: "translate";
  /** "toTarget" = del español al idioma que estudia · "toEs" = al revés */
  direction: "toTarget" | "toEs";
  /** lo que se le enseña (en español si es toTarget; en el idioma si es toEs) */
  source: string;
  /** respuestas aceptadas; la primera es la canónica que se enseña al fallar */
  answers: string[];
  /** pista opcional: una palabra clave, una estructura, nunca la respuesta */
  hint?: string;
}

export interface TransformExercise extends ExerciseBase {
  type: "transform";
  /** frase fuente que se muestra (p. ej. en Präsens) */
  source: string;
  /** consigna corta de la transformación, p. ej. "Ponla en Perfekt" */
  instruction: string;
  answers: string[]; // la primera es la canónica
  translation?: string;
}

export interface BucketExercise extends ExerciseBase {
  type: "bucket";
  /** B1 usa dos (haben/sein, sub/adv). El Passiversatz de B2 llega a cuatro
   *  (sich lassen / sein+zu / -bar / man). El jugador recorre la lista. */
  categories: string[];
  /** índice en `categories` */
  items: { text: string; bucket: number }[];
}

export interface ShadowExercise extends ExerciseBase {
  type: "shadow";
  /** lo que suena (admite forma coloquial: "Haste Zeit?") */
  text: string;
  /** guía "suena como" para hispanohablante */
  phonetic?: string;
  translation?: string;
  /** pasadas objetivo (defecto 2: primera a 0.75×, luego 1×) */
  reps?: number;
}

export interface FastmatchExercise extends ExerciseBase {
  type: "fastmatch";
  /** 4-6 pares únicos, SOLO ítems ya consolidados (streak ≥2 si es generado) */
  pairs: { target: string; source: string }[];
  /** meta del bonus en segundos (defecto 25) — JAMÁS condición de fallo */
  targetSeconds?: number;
}

export interface HearrealExercise extends ExerciseBase {
  type: "hearreal";
  /** la forma del libro: "Hast du Zeit?" */
  book: string;
  /** Grafía de la calle ("Haste Zeit?"). La misma voz que book la lee
   *  a la misma velocidad: el contraste es la escritura, no una segunda voz. */
  real: string;
  translation: string;
  /** "which" = ¿cuál oíste? (defecto) · "meaning" = mc de significado (A2) */
  ask?: "which" | "meaning";
  /** solo ask:"meaning": opciones de significado; la PRIMERA es la correcta
      (se barajan al renderizar, como los distractores del repaso) */
  meaningOptions?: string[];
}

export interface WriteExercise extends ExerciseBase {
  type: "write";
  /** el escenario en español ("Escribe un email a Amy: no puedes ir el lunes") */
  scenario: string;
  /** las funciones que el texto debe cumplir — se muestran como puntos */
  bullets: string[];
  /** un regex (fuente, flag "i" implícito) por función, alineado con bullets */
  checks: { re: string; label: string }[];
  minWords: number;
  maxWords: number;
  /** texto modelo mostrado TRAS corregir (nunca antes: sería copiable) */
  model: string;
  // ── B1: tres capas — el regex ES la nota y la rúbrica es
  //    autoevaluación. Ninguna de las dos sale de esta máquina. ──
  /** decide plantilla, registro y rúbrica */
  genre?: "mail-informal" | "forum" | "mail-formal" | "essay" | "report" | "review" | "article" | "proposal" | "story";
  /** el texto publicado al que hay que reaccionar (Schreiben Aufgabe 2) */
  stimulus?: { author: string; text: string };
  /** Registro que el modelo debe cumplir (el validador caza la fuga). No entra
   *  en la nota del alumno: restarlo bajaría ejercicios ya publicados. En
   *  alemán el registro ES un pronombre (`du` / `Sie`); en inglés no existe
   *  ese par y se juega en la FORMA DE LA PETICIÓN: «Give me a coffee» frente
   *  a «Could I have a coffee, please?». De ahí los dos valores ingleses. */
  register?: "du" | "Sie" | "direct" | "polite";
  /** esqueleto de funciones visible ANTES de escribir */
  frame?: string[];
  /** conectores que el texto debe usar (≥min distintos) — Kohärenz medible */
  requireConnectors?: { min: number; bank: string[] };
  /** autoevaluación por bandas tras ver el modelo (no toca la nota) */
  rubric?: ("erfuellung" | "kohaerenz" | "wortschatz" | "strukturen")[];
}

export interface AudioMCExercise extends ExerciseBase {
  type: "audiomc";
  /** lo que suena (TTS) — NO se muestra jamás */
  audio: string;
  /** la pregunta, visible ANTES de reproducir (estrategia del examen) */
  question: string;
  options: string[];
  answer: number;
  /** reproducciones permitidas (default 2 — regla LanguageCert) */
  plays?: number;
  whyWrong?: (string | null)[];
  /** Cuaderno para tomar notas MIENTRAS suena. En un audio de tres minutos,
   *  retener seis datos de cabeza no mide comprensión: mide memoria. Lo que se
   *  escriba aquí no se corrige ni se guarda — es papel de borrador. */
  notepad?: boolean;
}

/** LECTURA LARGA (B1): 300-500 palabras con glosas tocables [[wort|glosa]] y
 *  preguntas de las que al menos 2 son de INFERENCIA, no de detalle.
 *  Excluido de retos y del aviso de palabras nuevas (PLAN.md §2). */
export interface ReadExercise extends ExerciseBase {
  type: "read";
  title: string;
  /** el texto; admite glosas [[wort|glosa]] como las notas de gramática */
  text: string;
  /** de dónde sale (prensa, foro, carta) — el B1 es plurizéntrico */
  source?: string;
  questions: {
    id: string;
    q: string;
    /** Opción múltiple: la forma clásica. Se omite cuando la pregunta es de
     *  respuesta escrita — el Reading Part 4 del B1 inglés dejó de ser test. */
    options?: string[];
    answer?: number;
    /** Respuesta corta escrita: todas las formas que valen. El baremo oficial
     *  acepta variantes («(at) reception», «16 / sixteen»), así que aquí se
     *  listan igual que en cualquier ejercicio de texto libre. */
    accepted?: string[];
    /** true = exige inferir, no localizar un dato */
    inference?: boolean;
    why?: string;
  }[];
}

/** GAPBANK (B1/B2): párrafo con 2-7 huecos y un banco COMPARTIDO con distractores
 *  de sobra. 2-5 = drill; 6-7 = Lesen T2 B2 / insert, con 1-2 frases de más.
 *  Un tipo para cuatro batallas: conectores, Konjunktiv II,
 *  preposiciones regidas y relativos (PLAN.md §7). */
export interface GapbankExercise extends ExerciseBase {
  type: "gapbank";
  /** el párrafo con ___ en cada hueco (2-7) */
  text: string;
  /** las respuestas EN ORDEN de aparición de los huecos */
  answers: string[];
  /** el banco visible: incluye las respuestas + distractores plausibles */
  bank: string[];
  translation?: string;
}

/** ERRORFIX (B1): el calco del hispanohablante, corregido por el alumno.
 *  Salvaguardas obligatorias: un solo error, material ya visto, y al corregir
 *  la forma mala desaparece de pantalla (PLAN.md §6.2). */
export interface ErrorfixExercise extends ExerciseBase {
  type: "errorfix";
  /** la frase MAL, tal y como la escribiría un hispanohablante */
  wrong: string;
  /** la(s) forma(s) correcta(s) */
  answers: string[];
  /** qué falla exactamente (se enseña TRAS corregir) */
  why: string;
  translation?: string;
}

/** PARAPHRASE (B1): decirlo de otra manera — la habilidad del nivel.
 *  Lo define `forbid`: las palabras que NO se pueden reutilizar. */
export interface ParaphraseExercise extends ExerciseBase {
  type: "paraphrase";
  /** la frase de partida */
  source: string;
  /** palabras prohibidas en la respuesta (lo que fuerza la reformulación) */
  forbid: string[];
  /** reformulaciones aceptadas (la primera es la canónica) */
  answers: string[];
  translation?: string;
}

/** MONOLOGUE (B1): hablar 2-3 minutos con planificación previa y repetición
 *  de tarea (Ellis). Autoevaluación por HECHOS CONTABLES, no impresiones. */
export interface MonologueExercise extends ExerciseBase {
  type: "monologue";
  topic: string;
  /** las diapositivas/puntos fijos que estructuran el monólogo */
  slides: { title: string; hint: string }[];
  /** segundos de planificación antes de hablar (Ellis: mejora complejidad) */
  planSeconds?: number;
  speakSeconds?: number;
  /** repeticiones de la tarea (la 2ª sale mejor: task repetition) */
  reps?: number;
  /** checklist de hechos contables para autoevaluar */
  checklist: string[];
  model?: string;
}

export type Exercise =
  | MCExercise
  | ClozeExercise
  | BuildExercise
  | MatchExercise
  | TypeExercise
  | ListenExercise
  | SpeakExercise
  | OrderExercise
  | TransformExercise
  | BucketExercise
  | ShadowExercise
  | FastmatchExercise
  | HearrealExercise
  | WriteExercise
  | AudioMCExercise
  | ReadExercise
  | GapbankExercise
  | ErrorfixExercise
  | ParaphraseExercise
  | MonologueExercise
  | TranslateExercise;

/** Ítem de vocabulario/frase — unidad que trackea el SRS.
 * target = idioma que se aprende · source = idioma del alumno.
 * Los artículos válidos los define el LanguageConfig del nivel. */
export interface VocabItem {
  id: string;
  target: string;
  source: string;
  /** nota de pronunciación "suena como" */
  sound?: string;
  /** género si es sustantivo (p.ej. der/die/das en alemán) */
  article?: string;
  plural?: string;
  /** Metadato GRAMATICAL opcional (B1/B2): habilita las plantillas de nivel
   *  del repaso. Todo aditivo — sin el campo que pide cada plantilla, esa
   *  plantilla devuelve null y A1/A2/B1 se comportan igual (PLAN.md §6.2,
   *  PLAN-DE-B2.md §7.4). */
  gram?: {
    /** Verbo con preposición regida: `warten auf` + Akkusativ. El caso es
     *  opcional a propósito: en inglés la mecánica es idéntica —`depend on`,
     *  `good at`, `look forward to`— pero no hay caso que marcar, y sin esto
     *  las colocaciones inglesas no cabían en el campo que ya existía. */
    rektion?: { prep: string; case?: "akk" | "dat"; stem: string };
    /** forma sintética de Konjunktiv II si el ítem la tiene (kann → könnte) */
    k2?: string;
    /** conector y qué le hace al verbo: weil (sub) / deshalb (adv) / aber
     *  (koord). B2 añade `zweiteilig` (je…desto, weder…noch). El cubo de
     *  conectores solo mira sub/adv: este valor no lo alimenta. */
    konn?: "sub" | "adv" | "koord" | "zweiteilig";
    /** el calco típico del hispanohablante con este ítem (para tErrorFix) */
    trap?: string;
    /** formulaciones equivalentes aceptadas (para tParaphrase) */
    same?: string[];
    /** B2: «weil das Wetter schlecht war» ↔ «wegen des schlechten Wetters» */
    nomen?: { verbal: string; nominal: string };
    /** B2: forma Konjunktiv I (sei, habe, komme…) */
    k1?: string;
    /** B2: relativa ↔ atributo participial */
    partizip?: { relative: string; attr: string };
    /** B2: traje del «se» (Passiversatz) */
    passiv?: "sich-lassen" | "sein-zu" | "bar" | "man";
    /** B2: las dos piezas de je…desto / weder…noch / nicht nur…sondern auch */
    zweiteilig?: { left: string; right: string; example: string };
    /** B2 inglés: marcador discursivo (however, therefore…) */
    discourse?: string;
    /** B2 inglés: altura de registro */
    register?: "formal" | "informal";
  };
}

export interface GrammarNote {
  title: string;
  /** HTML sencillo permitido: <b>, <i>, <u>, <mark class="akk|dat">, <br/>.
      Glosas audibles: [[wort|glosa]] — subrayado tocable que suena y traduce. */
  body: string;
  /** tabla opcional de conjugación [["ich","bin"],...] */
  table?: string[][];
  /** visualización opcional: línea del tiempo del tiempo verbal (gram. cognitiva) */
  viz?: {
    kind: "timeline";
    pastLabel: string; // "gestern"
    pastExample: string; // "Ich habe Deutsch gelernt."
    nowLabel: string; // "jetzt"
    nowExample: string; // "Ich lerne Deutsch."
  };
}

/** Tarjeta NATIVO: cómo se expresan de verdad (chunk formulaico + registro).
 * A1 es receptivo puro: reconocer al oírlo — nunca se exige producirlo. */
export interface NativoCard {
  id: string; // "nat-<fase>-<n>"
  /** lo que diría el libro: "Hast du Zeit?" */
  book: string;
  /** cómo suena/se escribe de verdad: "Haste Zeit?" (TTS-able) */
  real: string;
  /** qué significa (es) */
  meaning: string;
  /** cuándo se usa Y cuándo no: el registro es obligatorio (Thomas: el error
      pragmático perdona menos que el gramatical) */
  when: string;
  register: "amigos" | "neutral" | "jerga" | "regional";
  /** LO QUE PUNTÚA EN EL EXAMEN: la misma intención dicha como la quiere el
      Goethe-Zertifikat. La calle no es un adorno — el alumno tiene que saber
      qué versión escribe en el Schreiben y dice en el Sprechen, o memoriza un
      registro que le baja la banda. Obligatorio en B1. */
  exam?: string;
  /** el porqué en una línea: "hast du se funde en el habla rápida" */
  note?: string;
  /** guía "suena como" para hispanohablante */
  sound?: string;
  level: "a1" | "a2" | "b1" | "b2";
  /** true SOLO para fórmulas seguras (defecto false); prohibido en a1 */
  produce?: boolean;
  /** desde A2: entra al repaso exprés en plantillas SOLO receptivas */
  itemId?: string;
}

export interface LessonSection {
  kind: "phrases" | "note" | "exercises" | "nativo";
  /** para phrases: ids de VocabItem que se presentan */
  itemIds?: string[];
  note?: GrammarNote;
  exercises?: Exercise[];
  /** para nativo: LA tarjeta de la píldora (1 máx por lección, tras el cierre) */
  nativo?: NativoCard;
  title?: string;
}

export interface Lesson {
  id: string;
  phaseId: string;
  title: string;
  subtitle: string;
  /** minutos estimados */
  minutes: number;
  /** Secuencia: presentar frases → (nota gramatical) → ejercicios */
  sections: LessonSection[];
  /** Recursos externos curados para escuchar/leer */
  resources?: { label: string; url: string; note: string }[];
}

/** Modo de recuperación de un ítem: reconocerlo (elegir entre opciones) o
 *  producirlo (escribirlo/decirlo). El SRS los trata distinto — reconocer no
 *  es saber, y fallar el test fácil informa más (PLAN.md §6.1). */
export type ReviewMode = "recognize" | "produce";

/** Reconocer, más lo que el alumno se puntúa solo. speak y shadow imitan un
 *  modelo; el monólogo marca una lista propia. Ninguno de los tres ha sacado
 *  la forma de memoria, y por eso no levantan el techo de 16 días. El resto
 *  de los tipos produce. */
const RECOGNIZE_TYPES = new Set<string>([
  "mc", "match", "fastmatch", "bucket", "hearreal", "audiomc", "read", "shadow", "speak", "monologue",
]);

export function modeOf(t: ExerciseType): ReviewMode {
  return RECOGNIZE_TYPES.has(t) ? "recognize" : "produce";
}

/** el modo REAL de un ejercicio: lo que declare él, y si no, lo que diga su tipo */
export function modeOfExercise(ex: { type: ExerciseType; mode?: ReviewMode }): ReviewMode {
  return ex.mode ?? modeOf(ex.type);
}


export interface Phase {
  id: string;
  /** nivel al que pertenece ("a1" si se omite — el contenido A1 no lo declara) */
  level?: Cefr;
  n: number;
  title: string;
  goal: string; // "Al terminar podrás..."
  color: string; // acento de la fase
  lessons: Lesson[];
}

/** PRÁCTICA REAL: una misión TBLT por módulo (Ellis: significado, vacío,
 * recursos propios, resultado NO lingüístico). El idioma es la herramienta;
 * la misión se puntúa por can-dos cumplidos, jamás por gramática. */
export interface Mission {
  phaseId: string;
  title: string; // "Tu café, en inglés"
  /** descriptor can-do CEFR en español ("Puedo pedir comida y bebida...") */
  canDo: string;
  /** el resultado NO lingüístico ("tienes tu café en la mano") */
  outcome: string;
  /** toolkit de 6-10 frases con audio (se practican con shadow antes) */
  prep: { text: string; es: string }[];
  steps: string[];
  /** variante en el mundo real */
  world: string;
  /** variante sin salir de casa (simulada completa, en voz alta) */
  home: string;
  /** role-play: la otra persona abre y el alumno responde en voz alta */
  roleplay?: { partner: string; opener: string };
  /** checklist can-do final — el % marcado es la nota de la misión */
  checklist: string[];
}

export interface Course {
  phases: Phase[];
  vocab: Record<string, VocabItem>;
}

// ---- Estado del backend ----

export interface ItemStat {
  correct: number;
  wrong: number;
  streak: number;
  intervalDays: number;
  nextReview: string;
  lastSeen: string;
  // El JSON los guarda desde el drop 5 y los omite en perfiles anteriores.
  // Si el tipo no los nombra, un import que copie el ítem campo a campo los
  // tira, y sin prodCorrect el techo de 16 días se mueve sin que nadie estudie.
  lapses?: number;
  prodCorrect?: number;
  ease?: number;
  relearn?: boolean;
}

export interface LessonStat {
  completed: boolean;
  bestScore: number;
  lastScore: number;
  attempts: number;
  lastAt: string;
}

export interface ServerState {
  lessons: Record<string, LessonStat>;
  items: Record<string, ItemStat>;
  xp: number;
  streakDays: number;
  lastActive: string;
  avatar?: string;
  color?: string;
  // Van en el archivo. Opcionales porque un perfil viejo puede no traerlos:
  // sin el nombre, el mismo import limpio pierde el esquema ya migrado y el
  // XP contado hoy (el tope diario vive en xpToday/xpDay).
  schemaVersion?: number;
  xpToday?: number;
  xpDay?: string;
  /** Aviso del motor cuando el archivo de progreso estaba dañado y se apartó:
   *  sin esto, la pantalla enseñaba una expedición vacía idéntica a la de una
   *  instalación nueva y nadie sabía que había una copia recuperable. */
  recoveredNotice?: string;
  /** Dónde colocó la prueba de nivel al alumno, por idioma. Dato del PERFIL,
   *  no del navegador: viaja entre dispositivos (PLAN 1.9.8 §1.3). */
  placement?: Record<string, { placed: Cefr; pct: number; at: string }>;
  /** Borrador de simulacro en curso: arranque (epoch s) + respuestas por ítem.
   *  El reloj se reconstruye; no se guarda el entero «segundos que quedaban». */
  examDrafts?: Record<string, { startedAt: number; idx: number; answers: Record<string, unknown> }>;
  /** Ids de envío ya aplicados. Van en el archivo: si el tipo no los nombra,
   *  un import campo a campo los tira y el mismo envío vuelve a sumar XP
   *  y a mover la escalera. */
  seenRequests?: { id: string; at: string }[];
}
