// MODELO DEL PERFIL PARA LA DEMO WEB — traducción fiel de backend/main.go.
//
// La demo publicada en el portafolio no tiene binario Go detrás: el «motor»
// corre dentro del navegador y guarda en localStorage. Para que la demo
// enseñe la app de verdad (y no una maqueta), este archivo reproduce el
// modelo del perfil tal cual lo entiende el backend: mismos campos, mismo
// orden al serializar, mismas reglas de saneado y de migración de esquema.
// Si algo cambia en main.go, aquí tiene que cambiar igual.

/** La versión del esquema que entiende esta build (currentSchema en Go). */
export const CURRENT_SCHEMA = 2;

/** time.Time{} de Go en milisegundos: el «nunca» de nextReview/lastSeen. */
export const GO_ZERO_TIME_MS = Date.parse("0001-01-01T00:00:00Z");

/** Tope de time.Duration (int64 en nanosegundos) expresado en milisegundos.
 *  now.Sub() satura ahí en Go; sin replicarlo, un ítem sin fecha daría
 *  ~739 000 días de retraso en vez de los ~106 751 que da el motor real. */
export const GO_MAX_DURATION_MS = 9_223_372_036_854.775;

export interface LessonStat {
  completed: boolean;
  bestScore: number;
  lastScore: number;
  attempts: number;
  /** milisegundos epoch; GO_ZERO_TIME_MS = sin fecha */
  lastAt: number;
}

export interface ItemStat {
  correct: number;
  wrong: number;
  streak: number;
  intervalDays: number;
  nextReview: number;
  lastSeen: number;
  // omitempty en Go: un cero no se serializa
  lapses: number;
  prodCorrect: number;
  ease: number;
  relearn: boolean;
}

export interface PlacementStat {
  placed: string;
  pct: number;
  at: string;
}

export interface ExamDraft {
  startedAt: number;
  idx: number;
  /** null = el mapa nil de Go (solo pasa con un respaldo editado a mano) */
  answers: Record<string, unknown> | null;
}

export interface SeenRequest {
  id: string;
  at: number;
}

/** Estado de un perfil. Los mapas a `null` son los mapas nil de Go, y las
 *  entradas a `null` son punteros nil: el motor los distingue (un import con
 *  una lección `null` se rechaza; una carga normal la limpia), así que aquí
 *  también. */
export interface State {
  schemaVersion: number;
  lessons: Record<string, LessonStat | null> | null;
  items: Record<string, ItemStat | null> | null;
  xp: number;
  streakDays: number;
  lastActive: string;
  avatar: string;
  color: string;
  xpToday: number;
  xpDay: string;
  placement: Record<string, PlacementStat | null> | null;
  examDrafts: Record<string, ExamDraft | null> | null;
  seenRequests: SeenRequest[];
  /** campos que esta versión no conoce: sobreviven al siguiente guardado (B5) */
  extra: Record<string, unknown>;
}

/** Los tags json de State en Go; lo demás va a `extra`. */
const KNOWN_STATE_FIELDS = new Set([
  "schemaVersion", "lessons", "items", "xp", "streakDays", "lastActive", "avatar",
  "color", "xpToday", "xpDay", "placement", "examDrafts", "seenRequests",
]);

export function newState(): State {
  return {
    schemaVersion: CURRENT_SCHEMA,
    lessons: {},
    items: {},
    xp: 0,
    streakDays: 0,
    lastActive: "",
    avatar: "",
    color: "",
    xpToday: 0,
    xpDay: "",
    placement: null,
    examDrafts: null,
    seenRequests: [],
    extra: {},
  };
}

export function newItemStat(): ItemStat {
  return {
    correct: 0, wrong: 0, streak: 0, intervalDays: 0,
    nextReview: GO_ZERO_TIME_MS, lastSeen: GO_ZERO_TIME_MS,
    lapses: 0, prodCorrect: 0, ease: 0, relearn: false,
  };
}

export function newLessonStat(): LessonStat {
  return { completed: false, bestScore: 0, lastScore: 0, attempts: 0, lastAt: GO_ZERO_TIME_MS };
}

/** Copia profunda (cloneState en Go). El motor muta una copia y solo la
 *  publica si el guardado triunfa: aquí el guardado es un setItem que puede
 *  fallar por cuota, y la regla es la misma. */
export function cloneState(st: State): State {
  const cp: State = { ...st, extra: { ...st.extra }, seenRequests: st.seenRequests.map((s) => ({ ...s })) };
  cp.lessons = {};
  for (const [k, v] of Object.entries(st.lessons ?? {})) if (v) cp.lessons[k] = { ...v };
  cp.items = {};
  for (const [k, v] of Object.entries(st.items ?? {})) if (v) cp.items[k] = { ...v };
  if (st.placement) {
    cp.placement = {};
    for (const [k, v] of Object.entries(st.placement)) if (v) cp.placement[k] = { ...v };
  }
  if (st.examDrafts) {
    cp.examDrafts = {};
    for (const [k, v] of Object.entries(st.examDrafts)) {
      if (!v) continue;
      cp.examDrafts[k] = { ...v, answers: v.answers ? structuredClone(v.answers) : null };
    }
  }
  for (const [k, v] of Object.entries(st.extra)) cp.extra[k] = structuredClone(v);
  return cp;
}

// ---- Fechas al estilo Go ----

function pad(n: number, width = 2): string {
  return String(n).padStart(width, "0");
}

/** now.Format("2006-01-02") en hora LOCAL, como el motor (la racha cuenta
 *  días del calendario del alumno, no de Greenwich). */
export function localDay(ms: number): string {
  const d = new Date(ms);
  return `${pad(d.getFullYear(), 4)}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** now.AddDate(0, 0, delta) y luego Format("2006-01-02"), en hora local. */
export function localDayShifted(ms: number, deltaDays: number): string {
  const d = new Date(ms);
  return localDay(new Date(d.getFullYear(), d.getMonth(), d.getDate() + deltaDays, d.getHours(), d.getMinutes()).getTime());
}

/** Marca de los .bak: time.Now().Format("20060102-150405"), hora local. */
export function backupStamp(ms: number): string {
  const d = new Date(ms);
  return `${pad(d.getFullYear(), 4)}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

/** time.Now().UTC().Format(time.RFC3339): sin fracción de segundo. */
export function rfc3339Utc(ms: number): string {
  return new Date(Math.floor(ms / 1000) * 1000).toISOString().replace(".000Z", "Z");
}

/** Serialización de un time.Time (RFC3339Nano: la fracción sin ceros a la
 *  derecha). Se escribe siempre en UTC; Go usaría la zona local, que es el
 *  mismo instante y cualquier lector RFC3339 lo entiende igual. */
export function goTimeJSON(ms: number): string {
  const iso = new Date(ms).toISOString();
  const m = /^(.*T\d\d:\d\d:\d\d)(?:\.(\d+))?Z$/.exec(iso);
  if (!m) return iso;
  const frac = (m[2] ?? "").replace(/0+$/, "");
  return frac ? `${m[1]}.${frac}Z` : `${m[1]}Z`;
}

const RFC3339_RE = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|[+-]\d{2}:\d{2})$/;

// ---- Decodificación (json.Unmarshal sobre State) ----

/** Error con el mismo texto que pondría encoding/json: el motor lo enseña
 *  tal cual en el 400 del import y en el registro de perfiles dañados. */
export class DecodeError extends Error {}

function typeName(v: unknown): string {
  if (Array.isArray(v)) return "array";
  if (v === null) return "null";
  if (typeof v === "boolean") return "bool";
  return typeof v;
}

function fieldErr(v: unknown, struct: string, field: string, goType: string): DecodeError {
  const what = typeof v === "number" ? `number ${v}` : typeName(v);
  return new DecodeError(`json: cannot unmarshal ${what} into Go struct field ${struct}.${field} of type ${goType}`);
}

function decInt(v: unknown, struct: string, field: string, fallback: number): number {
  if (v === null || v === undefined) return fallback;
  if (typeof v !== "number" || !Number.isInteger(v)) throw fieldErr(v, struct, field, "int");
  return v;
}

function decFloat(v: unknown, struct: string, field: string, fallback: number): number {
  if (v === null || v === undefined) return fallback;
  if (typeof v !== "number") throw fieldErr(v, struct, field, "float64");
  return v;
}

function decString(v: unknown, struct: string, field: string, fallback: string): string {
  if (v === null || v === undefined) return fallback;
  if (typeof v !== "string") throw fieldErr(v, struct, field, "string");
  return v;
}

function decBool(v: unknown, struct: string, field: string, fallback: boolean): boolean {
  if (v === null || v === undefined) return fallback;
  if (typeof v !== "boolean") throw fieldErr(v, struct, field, "bool");
  return v;
}

function decTime(v: unknown, struct: string, field: string, fallback: number): number {
  if (v === null || v === undefined) return fallback;
  if (typeof v !== "string") throw fieldErr(v, struct, field, "time.Time");
  const ms = RFC3339_RE.test(v) ? Date.parse(v) : Number.NaN;
  if (Number.isNaN(ms)) {
    throw new DecodeError(`parsing time ${JSON.stringify(v)} as "2006-01-02T15:04:05Z07:00": cannot parse`);
  }
  return ms;
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** Un mapa de punteros a struct: null → nil (mapa o entrada). */
function decMap<T>(
  v: unknown,
  struct: string,
  field: string,
  goType: string,
  entry: (raw: Record<string, unknown>) => T,
): Record<string, T | null> | null {
  if (v === null || v === undefined) return null;
  if (!isPlainObject(v)) throw fieldErr(v, struct, field, goType);
  const out: Record<string, T | null> = {};
  for (const [k, raw] of Object.entries(v)) {
    if (raw === null) {
      out[k] = null;
      continue;
    }
    if (!isPlainObject(raw)) throw fieldErr(raw, struct, field, goType);
    out[k] = entry(raw);
  }
  return out;
}

function decodeLesson(raw: Record<string, unknown>): LessonStat {
  const S = "State.lessons";
  return {
    completed: decBool(raw.completed, S, "completed", false),
    bestScore: decFloat(raw.bestScore, S, "bestScore", 0),
    lastScore: decFloat(raw.lastScore, S, "lastScore", 0),
    attempts: decInt(raw.attempts, S, "attempts", 0),
    lastAt: decTime(raw.lastAt, S, "lastAt", GO_ZERO_TIME_MS),
  };
}

function decodeItem(raw: Record<string, unknown>): ItemStat {
  const S = "State.items";
  return {
    correct: decInt(raw.correct, S, "correct", 0),
    wrong: decInt(raw.wrong, S, "wrong", 0),
    streak: decInt(raw.streak, S, "streak", 0),
    intervalDays: decFloat(raw.intervalDays, S, "intervalDays", 0),
    nextReview: decTime(raw.nextReview, S, "nextReview", GO_ZERO_TIME_MS),
    lastSeen: decTime(raw.lastSeen, S, "lastSeen", GO_ZERO_TIME_MS),
    lapses: decInt(raw.lapses, S, "lapses", 0),
    prodCorrect: decInt(raw.prodCorrect, S, "prodCorrect", 0),
    ease: decFloat(raw.ease, S, "ease", 0),
    relearn: decBool(raw.relearn, S, "relearn", false),
  };
}

function decodePlacement(raw: Record<string, unknown>): PlacementStat {
  const S = "State.placement";
  return {
    placed: decString(raw.placed, S, "placed", ""),
    pct: decInt(raw.pct, S, "pct", 0),
    at: decString(raw.at, S, "at", ""),
  };
}

function decodeDraft(raw: Record<string, unknown>): ExamDraft {
  const S = "State.examDrafts";
  let answers: Record<string, unknown> | null = null;
  if (raw.answers !== null && raw.answers !== undefined) {
    if (!isPlainObject(raw.answers)) throw fieldErr(raw.answers, S, "answers", "map[string]json.RawMessage");
    answers = { ...raw.answers };
  }
  return {
    startedAt: decInt(raw.startedAt, S, "startedAt", 0),
    idx: decInt(raw.idx, S, "idx", 0),
    answers,
  };
}

function decodeSeen(v: unknown): SeenRequest[] {
  if (v === null || v === undefined) return [];
  if (!Array.isArray(v)) throw fieldErr(v, "State", "seenRequests", "[]main.SeenRequest");
  return v.map((raw) => {
    // un null dentro de un slice de structs es un struct vacío en Go
    if (raw === null) return { id: "", at: GO_ZERO_TIME_MS };
    if (!isPlainObject(raw)) throw fieldErr(raw, "State", "seenRequests", "main.SeenRequest");
    return {
      id: decString(raw.id, "SeenRequest", "id", ""),
      at: decTime(raw.at, "SeenRequest", "at", GO_ZERO_TIME_MS),
    };
  });
}

/** decodeState de Go: struct + campos desconocidos en `extra`, y saneado de
 *  los borradores de simulacro. Lanza DecodeError si el JSON no encaja. */
export function decodeState(text: string, nowMs: number): State {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch (e) {
    throw new DecodeError(e instanceof Error ? e.message : "JSON ilegible");
  }
  const st = newState();
  // `null` a secas es un Unmarshal válido que no toca nada: State a cero
  st.schemaVersion = 0;
  st.lessons = null;
  st.items = null;
  if (parsed === null) return st;
  if (!isPlainObject(parsed)) {
    throw new DecodeError(`json: cannot unmarshal ${typeName(parsed)} into Go value of type main.State`);
  }
  const S = "State";
  st.schemaVersion = decInt(parsed.schemaVersion, S, "schemaVersion", 0);
  st.lessons = decMap(parsed.lessons, S, "lessons", "main.LessonStat", decodeLesson);
  st.items = decMap(parsed.items, S, "items", "main.ItemStat", decodeItem);
  st.xp = decInt(parsed.xp, S, "xp", 0);
  st.streakDays = decInt(parsed.streakDays, S, "streakDays", 0);
  st.lastActive = decString(parsed.lastActive, S, "lastActive", "");
  st.avatar = decString(parsed.avatar, S, "avatar", "");
  st.color = decString(parsed.color, S, "color", "");
  st.xpToday = decInt(parsed.xpToday, S, "xpToday", 0);
  st.xpDay = decString(parsed.xpDay, S, "xpDay", "");
  st.placement = decMap(parsed.placement, S, "placement", "main.PlacementStat", decodePlacement);
  st.examDrafts = decMap(parsed.examDrafts, S, "examDrafts", "main.ExamDraft", decodeDraft);
  st.seenRequests = decodeSeen(parsed.seenRequests);
  for (const [k, v] of Object.entries(parsed)) {
    if (!KNOWN_STATE_FIELDS.has(k)) st.extra[k] = v;
  }
  sanitizeExamDrafts(st, nowMs);
  return st;
}

// ---- Borradores de simulacro (mismos topes que main.go) ----

export const EXAM_DRAFT_MAX_AGE_SEC = 48 * 3600;
export const EXAM_DRAFT_MAX_IDX = 500;
export const EXAM_DRAFT_MAX_ANSWERS = 400;
export const EXAM_DRAFT_MAX_KEY = 64;
export const EXAM_DRAFT_MAX_VAL_BYTES = 8 << 10;
export const EXAM_DRAFT_MAX_PER_PROFILE = 8;
export const EXAM_DRAFT_MAX_BODY = 256 << 10;

const EXAM_SET_ID_RE = /^[a-z][a-z0-9-]{0,62}$/;

export function validExamSetId(id: string): boolean {
  return EXAM_SET_ID_RE.test(id);
}

const encoder = new TextEncoder();

/** len() de Go sobre un string: bytes UTF-8, no caracteres. */
export function byteLen(s: string): number {
  return encoder.encode(s).length;
}

/** Bytes del json.RawMessage que guardaría el motor para este valor. */
export function rawLen(v: unknown): number {
  return byteLen(JSON.stringify(v) ?? "");
}

export function sanitizeExamDrafts(st: State, nowMs: number): void {
  if (!st.examDrafts) return;
  const now = Math.floor(nowMs / 1000);
  for (const [k, d] of Object.entries(st.examDrafts)) {
    if (!d || !validExamSetId(k) || d.startedAt <= 0 || now - d.startedAt > EXAM_DRAFT_MAX_AGE_SEC || d.idx < 0) {
      delete st.examDrafts[k];
      continue;
    }
    if (d.startedAt > now) d.startedAt = now;
    if (d.idx > EXAM_DRAFT_MAX_IDX) d.idx = EXAM_DRAFT_MAX_IDX;
    if (!d.answers) {
      d.answers = {};
      continue;
    }
    let n = 0;
    for (const [ak, av] of Object.entries(d.answers)) {
      if (ak === "" || byteLen(ak) > EXAM_DRAFT_MAX_KEY || rawLen(av) > EXAM_DRAFT_MAX_VAL_BYTES) {
        delete d.answers[ak];
        continue;
      }
      n++;
      if (n > EXAM_DRAFT_MAX_ANSWERS) delete d.answers[ak];
    }
  }
  const keys = Object.keys(st.examDrafts);
  if (keys.length > EXAM_DRAFT_MAX_PER_PROFILE) {
    const byNewest = keys
      .map((k) => ({ k, t: st.examDrafts?.[k]?.startedAt ?? 0 }))
      .sort((a, b) => b.t - a.t);
    for (const p of byNewest.slice(EXAM_DRAFT_MAX_PER_PROFILE)) delete st.examDrafts[p.k];
  }
}

// ---- Idempotencia de lesson-result (B10) ----

const SEEN_REQ_MAX_AGE_MS = 30 * 24 * 3600 * 1000;
const SEEN_REQ_CAP = 4096;

export function requestAlreadySeen(st: State, id: string, nowMs: number): boolean {
  if (!id) return false;
  for (const s of st.seenRequests) {
    if (s.id !== id) continue;
    // un respaldo con la hora en el futuro cuenta como de ahora
    const at = Math.min(s.at, nowMs);
    if (nowMs - at <= SEEN_REQ_MAX_AGE_MS) return true;
  }
  return false;
}

export function noteSeenRequest(st: State, id: string, nowMs: number): void {
  if (!id) return;
  st.seenRequests.push({ id, at: nowMs });
  pruneSeenRequests(st, nowMs);
}

export function pruneSeenRequests(st: State, nowMs: number): void {
  if (st.seenRequests.length === 0) return;
  const best = new Map<string, number>();
  const order: string[] = [];
  for (const s of st.seenRequests) {
    if (!s.id || byteLen(s.id) > 128) continue;
    const at = Math.min(s.at, nowMs);
    if (nowMs - at > SEEN_REQ_MAX_AGE_MS) continue;
    const prev = best.get(s.id);
    if (prev !== undefined) {
      if (at > prev) best.set(s.id, at);
      continue;
    }
    best.set(s.id, at);
    order.push(s.id);
  }
  let kept = order;
  if (kept.length > SEEN_REQ_CAP) {
    kept = [...kept]
      .sort((a, b) => {
        const ta = best.get(a) ?? 0;
        const tb = best.get(b) ?? 0;
        if (ta === tb) return a < b ? -1 : a > b ? 1 : 0;
        return ta - tb;
      })
      .slice(kept.length - SEEN_REQ_CAP);
  }
  st.seenRequests = kept.map((id) => ({ id, at: best.get(id) ?? nowMs }));
}

// ---- Serialización (stateJSON en Go) ----

/** json.Marshal ordena las claves de los mapas; los structs van en el orden
 *  en que se declararon. Se replica para que un respaldo exportado aquí sea
 *  byte a byte lo que esperaría el motor de escritorio al importarlo. */
function sortedMap<T, R>(m: Record<string, T | null> | null, f: (v: T) => R): Record<string, R | null> | null {
  if (!m) return null;
  const out: Record<string, R | null> = {};
  for (const k of Object.keys(m).sort()) {
    const v = m[k];
    out[k] = v === null || v === undefined ? null : f(v);
  }
  return out;
}

/** Las respuestas son json.RawMessage: Go ordena las claves del mapa, pero
 *  cada valor sale tal como llegó. */
function sortTopKeys(v: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const k of Object.keys(v).sort()) out[k] = v[k];
  return out;
}

function itemJSON(it: ItemStat): Record<string, unknown> {
  const o: Record<string, unknown> = {
    correct: it.correct,
    wrong: it.wrong,
    streak: it.streak,
    intervalDays: it.intervalDays,
    nextReview: goTimeJSON(it.nextReview),
    lastSeen: goTimeJSON(it.lastSeen),
  };
  if (it.lapses) o.lapses = it.lapses;
  if (it.prodCorrect) o.prodCorrect = it.prodCorrect;
  if (it.ease) o.ease = it.ease;
  if (it.relearn) o.relearn = it.relearn;
  return o;
}

/** El objeto JSON que el motor mandaría por la API (y escribiría a disco). */
export function stateObject(st: State): Record<string, unknown> {
  const o: Record<string, unknown> = {
    schemaVersion: st.schemaVersion,
    lessons: sortedMap(st.lessons, (l) => ({
      completed: l.completed,
      bestScore: l.bestScore,
      lastScore: l.lastScore,
      attempts: l.attempts,
      lastAt: goTimeJSON(l.lastAt),
    })),
    items: sortedMap(st.items, itemJSON),
    xp: st.xp,
    streakDays: st.streakDays,
    lastActive: st.lastActive,
    avatar: st.avatar,
    color: st.color,
    xpToday: st.xpToday,
    xpDay: st.xpDay,
    placement: sortedMap(st.placement, (p) => ({ placed: p.placed, pct: p.pct, at: p.at })),
    examDrafts: sortedMap(st.examDrafts, (d) => ({
      startedAt: d.startedAt,
      idx: d.idx,
      answers: d.answers ? sortTopKeys(d.answers) : null,
    })),
  };
  if (st.seenRequests.length > 0) {
    o.seenRequests = st.seenRequests.map((s) => ({ id: s.id, at: goTimeJSON(s.at) }));
  }
  const extraKeys = Object.keys(st.extra);
  if (extraKeys.length === 0) return o;
  // con campos desconocidos Go re-serializa como mapa: el nivel superior
  // entero sale ordenado alfabéticamente, y lo conocido manda sobre lo
  // desconocido
  const merged: Record<string, unknown> = { ...o };
  for (const k of extraKeys) if (!(k in merged)) merged[k] = st.extra[k];
  const out: Record<string, unknown> = {};
  for (const k of Object.keys(merged).sort()) out[k] = merged[k];
  return out;
}

export function stateJSON(st: State, indent: boolean): string {
  return JSON.stringify(stateObject(st), null, indent ? 2 : undefined);
}
