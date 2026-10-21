// MOTOR DE PROGRESO DENTRO DEL NAVEGADOR — la demo web de Seshat.
//
// En la app de escritorio, un binario Go sirve la interfaz y la API /api y
// guarda cada perfil en un archivo JSON de la carpeta del usuario. La demo del
// portafolio es solo un export estático: no hay binario. Este módulo hace su
// papel sin salir de la pestaña: responde a las mismas rutas, con los mismos
// códigos HTTP, los mismos textos de error y el mismo JSON que main.go, y en
// vez de archivos usa localStorage (una entrada por perfil).
//
// Lo que el motor de escritorio hace y aquí no tiene sentido (cerrar la app,
// la red local, instalar paquetes) no se finge: esas rutas no existen y sus
// pantallas lo explican.

import {
  CURRENT_SCHEMA,
  DecodeError,
  EXAM_DRAFT_MAX_AGE_SEC,
  EXAM_DRAFT_MAX_ANSWERS,
  EXAM_DRAFT_MAX_BODY,
  EXAM_DRAFT_MAX_IDX,
  EXAM_DRAFT_MAX_KEY,
  EXAM_DRAFT_MAX_PER_PROFILE,
  EXAM_DRAFT_MAX_VAL_BYTES,
  GO_MAX_DURATION_MS,
  backupStamp,
  byteLen,
  cloneState,
  decodeState,
  localDay,
  localDayShifted,
  newItemStat,
  newLessonStat,
  newState,
  noteSeenRequest,
  pruneSeenRequests,
  rawLen,
  requestAlreadySeen,
  rfc3339Utc,
  stateJSON,
  validExamSetId,
  type State,
} from "./demoState";
import { migrateState } from "./demoMigrate";
import { applyReview, touchStreak } from "./demoSrs";

// ---- Almacenamiento ----

/** Lo mínimo de Storage que usa el motor; en las pruebas se inyecta uno en
 *  memoria para no depender de un navegador. */
export interface KeyValueStore {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  keys(): string[];
}

/** Envuelve un Storage del navegador (localStorage o sessionStorage). */
export function browserStore(storage: Storage): KeyValueStore {
  return {
    getItem: (k) => storage.getItem(k),
    setItem: (k, v) => storage.setItem(k, v),
    removeItem: (k) => storage.removeItem(k),
    keys: () => {
      const out: string[] = [];
      for (let i = 0; i < storage.length; i++) {
        const k = storage.key(i);
        if (k !== null) out.push(k);
      }
      return out;
    },
  };
}

/** Prefijo propio: el portafolio sirve varias demos en el mismo origen, y
 *  todas comparten un único localStorage. */
const PROFILE_PREFIX = "seshat-demo:perfil:";
const RECOVERED_PREFIX = "seshat-demo:recuperado:";
/** Copias de seguridad que se conservan por perfil (cleanupDataDir en Go). */
const BACKUPS_PER_PROFILE = 5;

function profileKey(name: string): string {
  return PROFILE_PREFIX + name;
}

// ---- Peticiones y respuestas ----

export interface EngineRequest {
  method: string;
  /** ruta bajo /api, con su query (p. ej. "/exam-draft?setId=goethe-a1-1") */
  path: string;
  /** lo que la app real mandaría en la cabecera X-Profile */
  profile: string;
  contentType: string;
  body: string;
}

export interface EngineResponse {
  status: number;
  body: string;
  headers: Record<string, string>;
}

function json(body: string): EngineResponse {
  return { status: 200, body, headers: { "Content-Type": "application/json" } };
}

/** http.Error de Go: texto plano con salto de línea final. */
function httpError(status: number, text: string): EngineResponse {
  return { status, body: text + "\n", headers: { "Content-Type": "text/plain; charset=utf-8" } };
}

const READONLY_TEXT =
  "perfil en solo-lectura (este navegador no deja leer su almacenamiento, o el perfil es de una versión más nueva de la app) — no se puede guardar";

function badProfile(): EngineResponse {
  return httpError(400, "perfil inválido (letras, números, - y _, máx 24; sin nombres reservados)");
}

function saveFailed(err: unknown): EngineResponse {
  const detail = err instanceof Error ? err.message : String(err);
  return httpError(
    503,
    "no se pudo guardar tu progreso en este navegador (" + detail + "). " +
      "Suele ser el almacenamiento lleno o bloqueado (modo privado, permisos del sitio). " +
      "Lo que acabas de hacer NO ha quedado guardado.",
  );
}

// ---- Perfiles ----

const NAME_RE = /^[\p{L}0-9_-]{1,24}$/u;
const RESERVED_WIN_RE = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/;

/** normalizeProfile de Go: NFC, minúsculas y nunca un reservado de Windows
 *  (en la demo no hay NTFS, pero un perfil exportado aquí tiene que poder
 *  importarse en la app de escritorio con el mismo nombre). */
export function normalizeProfile(raw: string): string | null {
  const name = raw.trim().normalize("NFC");
  if (!NAME_RE.test(name)) return null;
  const lower = name.toLowerCase();
  if (RESERVED_WIN_RE.test(lower)) return null;
  return lower;
}

function profileOf(raw: string): string | null {
  if (raw.trim() === "") return "default";
  return normalizeProfile(raw);
}

interface Loaded {
  st: State;
  /** ilegible o de esquema futuro: se sirve, pero no se escribe encima */
  readonly: boolean;
}

export class DemoEngine {
  private readonly store: KeyValueStore;
  private readonly session: KeyValueStore | null;
  private readonly now: () => number;
  private readonly version: { app: string; content: string };
  /** el mutex global de main.go: un handler no empieza hasta que acaba el anterior */
  private queue: Promise<unknown> = Promise.resolve();

  constructor(opts: {
    store: KeyValueStore;
    /** donde vive el aviso de «perfil dañado» mientras dura la sesión del
     *  navegador, igual que en Go dura lo que dura el proceso */
    session: KeyValueStore | null;
    now?: () => number;
    version: { app: string; content: string };
  }) {
    this.store = opts.store;
    this.session = opts.session;
    this.now = opts.now ?? (() => Date.now());
    this.version = opts.version;
  }

  /** Atiende una petición en exclusiva (ver `queue`). */
  handle(req: EngineRequest): Promise<EngineResponse> {
    const run = this.queue.then(() => this.route(req));
    // La cola solo espera a que acabe; el fallo le llega igual al llamador
    // por `run`, que es quien decide qué decirle al alumno.
    this.queue = run.then(
      () => undefined,
      () => undefined,
    );
    return run;
  }

  // ---- persistencia ----

  private async loadProfile(name: string): Promise<Loaded> {
    let raw: string | null;
    try {
      raw = this.store.getItem(profileKey(name));
    } catch {
      // error de lectura REAL: estado vacío temporal y sin guardar encima
      return { st: newState(), readonly: true };
    }
    let st = newState();
    if (raw !== null) {
      try {
        st = decodeState(raw, this.now());
      } catch (e) {
        if (!(e instanceof DecodeError)) throw e;
        // NUNCA pisar un perfil dañado: se aparta con marca de tiempo
        st = newState();
        const bak = `${name}.${backupStamp(this.now())}.bak`;
        try {
          this.store.setItem(PROFILE_PREFIX + bak, raw);
          this.store.removeItem(profileKey(name));
          this.pruneBackups(name);
          this.session?.setItem(RECOVERED_PREFIX + name, PROFILE_PREFIX + bak);
        } catch {
          // Como en Go cuando el rename falla: se sigue con un perfil nuevo
          // en memoria y el primer guardado escribirá encima del dañado.
          this.store.removeItem(PROFILE_PREFIX + bak);
        }
      }
    }
    if (!st.lessons) st.lessons = {};
    if (!st.items) st.items = {};
    // un `null` dentro de items/lessons se limpia en la puerta
    for (const [id, it] of Object.entries(st.items)) if (!it) delete st.items[id];
    for (const [id, ls] of Object.entries(st.lessons)) if (!ls) delete st.lessons[id];
    if (st.schemaVersion > CURRENT_SCHEMA) return { st, readonly: true };
    pruneSeenRequests(st, this.now());
    if (st.schemaVersion < CURRENT_SCHEMA) {
      await migrateState(st);
      // como `_ = saveProfile(name)`: si no se puede guardar, se sirve migrado
      this.trySave(name, st);
    }
    return { st, readonly: false };
  }

  /** saveProfile: el estado solo «existe» si setItem triunfa. */
  private save(name: string, st: State): void {
    this.store.setItem(profileKey(name), stateJSON(st, false));
  }

  private trySave(name: string, st: State): Error | null {
    try {
      this.save(name, st);
      return null;
    } catch (e) {
      return e instanceof Error ? e : new Error(String(e));
    }
  }

  /** Aparta la versión guardada con un sufijo (.reset.bak, .preimport.bak). */
  private backup(name: string, suffix: string): void {
    const current = this.store.getItem(profileKey(name));
    if (current === null) return;
    this.store.setItem(`${PROFILE_PREFIX}${name}.${backupStamp(this.now())}${suffix}`, current);
    this.pruneBackups(name);
  }

  /** Retención de copias: las 5 más recientes por perfil. En Go se hace al
   *  arrancar; aquí al escribir, porque el espacio de localStorage es corto y
   *  lo comparten todas las demos del sitio. */
  private pruneBackups(name: string): void {
    const baks = this.store
      .keys()
      .filter((k) => k.startsWith(`${PROFILE_PREFIX}${name}.`) && k.includes(".bak"))
      .sort();
    for (const old of baks.slice(0, Math.max(0, baks.length - BACKUPS_PER_PROFILE))) {
      this.store.removeItem(old);
    }
  }

  private listProfiles(): string[] {
    let keys: string[] = [];
    try {
      keys = this.store.keys();
    } catch {
      keys = [];
    }
    const seen = new Set<string>();
    for (const k of keys) {
      if (!k.startsWith(PROFILE_PREFIX)) continue;
      const rest = k.slice(PROFILE_PREFIX.length);
      // un nombre de perfil no lleva puntos: lo que los lleva es una copia
      if (rest.includes(".")) continue;
      seen.add(rest.toLowerCase());
    }
    const out = [...seen].sort();
    return out.length ? out : ["default"];
  }

  // ---- enrutado ----

  private async route(req: EngineRequest): Promise<EngineResponse> {
    const url = new URL(req.path, "http://seshat.demo");
    switch (url.pathname) {
      case "/health":
        return json(JSON.stringify({ ok: true }));
      case "/version":
        return json(JSON.stringify(this.versionMap()));
      case "/profiles":
        return this.handleProfiles(req);
      case "/state":
        return this.handleGetState(req);
      case "/lesson-result":
        return this.handleLessonResult(req);
      case "/placement":
        return this.handlePlacement(req);
      case "/exam-draft":
        return this.handleExamDraft(req, url);
      case "/due":
        return this.handleDue(req);
      case "/reset":
        return this.handleReset(req);
      case "/avatar":
        return this.handleAvatar(req);
      case "/export":
        return this.handleExport(req);
      case "/import":
        return this.handleImport(req);
      case "/ping":
        if (req.method !== "POST") return httpError(405, "usa POST");
        return json(JSON.stringify({ ok: true }));
      default:
        return httpError(404, "404 page not found");
    }
  }

  private versionMap(): Record<string, string> {
    const { app, content } = this.version;
    return { app, engine: app, content, drop: content, manifest: "" };
  }

  /** jsonPost: POST, Content-Type JSON y un tope de tamaño. */
  private jsonPost(req: EngineRequest): EngineResponse | null {
    if (req.method !== "POST") return httpError(405, "POST only");
    if (!req.contentType.startsWith("application/json")) {
      return httpError(415, "Content-Type debe ser application/json");
    }
    return null;
  }

  /** Lee el cuerpo como haría json.Decoder detrás de un MaxBytesReader. */
  private decodeBody(req: EngineRequest, maxBytes: number): { value: unknown } | { error: string; tooLarge: boolean } {
    if (byteLen(req.body) > maxBytes) return { error: "http: request body too large", tooLarge: true };
    try {
      return { value: JSON.parse(req.body) };
    } catch (e) {
      return { error: e instanceof Error ? e.message : "JSON ilegible", tooLarge: false };
    }
  }

  private async readonlyGuard(req: EngineRequest): Promise<EngineResponse | null> {
    const p = profileOf(req.profile);
    if (p === null) return null;
    const { readonly } = await this.loadProfile(p);
    return readonly ? httpError(503, READONLY_TEXT) : null;
  }

  private async handleProfiles(req: EngineRequest): Promise<EngineResponse> {
    if (req.method === "GET") return json(JSON.stringify(this.listProfiles()));
    if (req.method !== "POST") return httpError(405, "GET o POST");
    if (!req.contentType.startsWith("application/json")) {
      return httpError(415, "Content-Type debe ser application/json");
    }
    const body = this.decodeBody(req, 4 << 10);
    const raw = "value" in body && isObject(body.value) ? body.value.name : undefined;
    if (!("value" in body) || (raw !== undefined && raw !== null && typeof raw !== "string")) {
      return httpError(400, "nombre inválido (letras, números, - y _, máx 24)");
    }
    const name = normalizeProfile(typeof raw === "string" ? raw : "");
    if (name === null) return httpError(400, "nombre inválido o reservado (letras, números, - y _, máx 24)");
    const { st, readonly } = await this.loadProfile(name);
    // Go guarda aunque el perfil no se pueda leer (saveProfile exige que esté
    // en memoria, y uno ilegible no lo está): ahí no escribe nada y responde
    if (!readonly) {
      const err = this.trySave(name, st);
      if (err) return saveFailed(err);
    }
    return json(JSON.stringify(this.listProfiles()));
  }

  private async handleGetState(req: EngineRequest): Promise<EngineResponse> {
    const profile = profileOf(req.profile);
    if (profile === null) return badProfile();
    const { st } = await this.loadProfile(profile);
    const eff = cloneState(st);
    if (eff.streakDays > 0) {
      const now = this.now();
      if (eff.lastActive !== localDay(now) && eff.lastActive !== localDayShifted(now, -1)) eff.streakDays = 0;
    }
    const body = stateJSON(eff, false);
    let bak: string | null = null;
    try {
      bak = this.session?.getItem(RECOVERED_PREFIX + profile) ?? null;
    } catch {
      bak = null;
    }
    if (!bak) return json(body);
    const m = JSON.parse(body) as Record<string, unknown>;
    m.recoveredNotice =
      "Tu progreso guardado en este navegador estaba dañado y no se pudo leer. " +
      "Lo he apartado sin borrarlo (" + bak + ", en el almacenamiento de este navegador) y he empezado " +
      "uno nuevo. Si tienes un respaldo, impórtalo desde el perfil.";
    // Go lo re-serializa como mapa: las claves salen en orden alfabético
    const sorted: Record<string, unknown> = {};
    for (const k of Object.keys(m).sort()) sorted[k] = m[k];
    return json(JSON.stringify(sorted));
  }

  /** lessonPassScore: el único corte de «lección hecha». */
  private static readonly LESSON_PASS_SCORE = 0.8;
  private static readonly DAILY_XP_CAP = 500;

  private async handleLessonResult(req: EngineRequest): Promise<EngineResponse> {
    const guard = await this.readonlyGuard(req);
    if (guard) return guard;
    const notPost = this.jsonPost(req);
    if (notPost) return notPost;
    const body = this.decodeBody(req, 256 << 10);
    if (!("value" in body)) return httpError(400, body.error);
    let res: LessonResultReq;
    try {
      res = parseLessonResult(body.value);
    } catch (e) {
      return httpError(400, e instanceof Error ? e.message : String(e));
    }
    if (res.lessonId === "" || byteLen(res.lessonId) > 64 || res.items.length > 200 || byteLen(res.requestId) > 128) {
      return httpError(400, "payload inválido");
    }
    for (const it of res.items) {
      if (it.itemId === "" || byteLen(it.itemId) > 64) {
        return httpError(400, "payload inválido: identificador de ítem vacío o demasiado largo");
      }
      // un modo raro tira el POST entero, también las filas buenas
      if (!(it.mode === "" || it.mode === "recognize" || it.mode === "produce")) {
        return httpError(400, "payload inválido: modo desconocido");
      }
    }
    res.score = Math.min(1, Math.max(0, res.score));
    const now = this.now();
    const profile = profileOf(req.profile);
    if (profile === null) return badProfile();

    const loaded = await this.loadProfile(profile);
    if (requestAlreadySeen(loaded.st, res.requestId, now)) return json(stateJSON(loaded.st, false));

    const st = cloneState(loaded.st);
    const lessons = st.lessons ?? (st.lessons = {});
    const items = st.items ?? (st.items = {});
    const ls = lessons[res.lessonId] ?? newLessonStat();
    lessons[res.lessonId] = ls;
    ls.attempts++;
    ls.lastScore = res.score;
    if (res.score > ls.bestScore) ls.bestScore = res.score;
    if (res.score >= DemoEngine.LESSON_PASS_SCORE) ls.completed = true;
    ls.lastAt = now;

    let gained = 0;
    for (const ir of res.items) {
      const it = items[ir.itemId] ?? newItemStat();
      items[ir.itemId] = it;
      applyReview(it, ir.correct, ir.mode, now);
      if (ir.correct) gained += 2;
    }
    const today = localDay(now);
    if (st.xpDay !== today) {
      st.xpDay = today;
      st.xpToday = 0;
    }
    let earn = gained + Math.trunc(res.score * 20);
    if (st.xpToday + earn > DemoEngine.DAILY_XP_CAP) earn = DemoEngine.DAILY_XP_CAP - st.xpToday;
    if (earn > 0) {
      st.xp += earn;
      st.xpToday += earn;
    }
    touchStreak(st, now);
    // el id queda guardado solo si la lección también
    noteSeenRequest(st, res.requestId, now);
    const err = this.trySave(profile, st);
    if (err) return saveFailed(err);
    return json(stateJSON(st, false));
  }

  private async handlePlacement(req: EngineRequest): Promise<EngineResponse> {
    const guard = await this.readonlyGuard(req);
    if (guard) return guard;
    const notPost = this.jsonPost(req);
    if (notPost) return notPost;
    const body = this.decodeBody(req, 4 << 10);
    if (!("value" in body)) return httpError(400, body.error);
    let p: { lang: string; placed: string; pct: number };
    try {
      p = parsePlacement(body.value);
    } catch (e) {
      return httpError(400, e instanceof Error ? e.message : String(e));
    }
    if (!/^[a-z]{2}$/.test(p.lang)) return httpError(400, "lang inválido: dos letras minúsculas");
    if (!/^[abc][12]$/.test(p.placed)) {
      return httpError(400, "placed inválido: un peldaño CEFR (a1, a2, b1, b2, c1, c2)");
    }
    if (p.pct < 0 || p.pct > 100) return httpError(400, "pct fuera de rango (0-100)");
    const profile = profileOf(req.profile);
    if (profile === null) return badProfile();
    const loaded = await this.loadProfile(profile);
    const placed = loaded.st.placement ?? {};
    if (!(p.lang in placed) && Object.keys(placed).length >= 32) {
      return httpError(400, "límite de idiomas colocados alcanzado");
    }
    const st = cloneState(loaded.st);
    const placement = st.placement ?? (st.placement = {});
    placement[p.lang] = { placed: p.placed, pct: p.pct, at: rfc3339Utc(this.now()) };
    const err = this.trySave(profile, st);
    if (err) return saveFailed(err);
    return json(stateJSON(st, false));
  }

  private async handleExamDraft(req: EngineRequest, url: URL): Promise<EngineResponse> {
    const guard = await this.readonlyGuard(req);
    if (guard) return guard;
    const profile = profileOf(req.profile);
    if (profile === null) return badProfile();
    if (req.method === "DELETE") {
      const setId = url.searchParams.get("setId") ?? "";
      if (!validExamSetId(setId)) return httpError(400, "identificador de examen inválido");
      const loaded = await this.loadProfile(profile);
      const st = cloneState(loaded.st);
      if (st.examDrafts) delete st.examDrafts[setId];
      const err = this.trySave(profile, st);
      if (err) return saveFailed(err);
      return json(stateJSON(st, false));
    }
    if (req.method !== "POST") return httpError(405, "solo POST o DELETE");
    const notPost = this.jsonPost(req);
    if (notPost) return notPost;
    const body = this.decodeBody(req, EXAM_DRAFT_MAX_BODY);
    if (!("value" in body)) {
      return body.tooLarge
        ? httpError(413, "el borrador es demasiado grande")
        : httpError(400, "no pude leer el borrador");
    }
    let d: { setId: string; startedAt: number; idx: number; answers: Record<string, unknown> | null };
    try {
      d = parseExamDraft(body.value);
    } catch {
      return httpError(400, "no pude leer el borrador");
    }
    if (!validExamSetId(d.setId)) return httpError(400, "identificador de examen inválido");
    const now = Math.floor(this.now() / 1000);
    if (d.startedAt <= 0 || now - d.startedAt > EXAM_DRAFT_MAX_AGE_SEC) {
      return httpError(400, "el borrador ha caducado o no tiene hora de inicio");
    }
    if (d.startedAt > now) d.startedAt = now;
    if (d.idx < 0 || d.idx > EXAM_DRAFT_MAX_IDX) return httpError(400, "paso del examen fuera de rango");
    const answers = d.answers ?? {};
    const entries = Object.entries(answers);
    const validAnswers =
      entries.length <= EXAM_DRAFT_MAX_ANSWERS &&
      entries.every(([k, v]) => k !== "" && byteLen(k) <= EXAM_DRAFT_MAX_KEY && rawLen(v) <= EXAM_DRAFT_MAX_VAL_BYTES);
    if (!validAnswers) return httpError(400, "respuestas del borrador no válidas");
    const loaded = await this.loadProfile(profile);
    const drafts = loaded.st.examDrafts ?? {};
    if (!(d.setId in drafts) && Object.keys(drafts).length >= EXAM_DRAFT_MAX_PER_PROFILE) {
      return httpError(400, "demasiados simulacros a medias");
    }
    const st = cloneState(loaded.st);
    const target = st.examDrafts ?? (st.examDrafts = {});
    target[d.setId] = { startedAt: d.startedAt, idx: d.idx, answers: structuredClone(answers) };
    const err = this.trySave(profile, st);
    if (err) return saveFailed(err);
    return json(stateJSON(st, false));
  }

  private async handleDue(req: EngineRequest): Promise<EngineResponse> {
    const profile = profileOf(req.profile);
    if (profile === null) return badProfile();
    const { st } = await this.loadProfile(profile);
    const now = this.now();
    const out: { itemId: string; streak: number; overdueDays: number }[] = [];
    for (const [id, it] of Object.entries(st.items ?? {})) {
      if (!it) continue;
      if (!(it.nextReview > now)) {
        // now.Sub() de Go satura en el máximo de time.Duration
        const overdueMs = Math.min(now - it.nextReview, GO_MAX_DURATION_MS);
        out.push({ itemId: id, streak: it.streak, overdueDays: overdueMs / 3_600_000 / 24 });
      }
    }
    out.sort((a, b) => b.overdueDays - a.overdueDays);
    return json(JSON.stringify(out));
  }

  private async handleReset(req: EngineRequest): Promise<EngineResponse> {
    const guard = await this.readonlyGuard(req);
    if (guard) return guard;
    if (req.method !== "DELETE") return httpError(405, "DELETE only");
    const profile = profileOf(req.profile);
    if (profile === null) return badProfile();
    // sin copia de seguridad NO se borra nada (main.go, /api/reset)
    try {
      this.backup(profile, ".reset.bak");
    } catch (e) {
      const detail = e instanceof Error ? e.message : String(e);
      return httpError(
        503,
        "no se pudo guardar la copia de seguridad antes de borrar (" + detail + "), " +
          "así que NO se ha borrado nada. Revisa el espacio de almacenamiento de este navegador.",
      );
    }
    const st = newState();
    const err = this.trySave(profile, st);
    if (err) return saveFailed(err);
    return json(stateJSON(st, false));
  }

  private async handleAvatar(req: EngineRequest): Promise<EngineResponse> {
    const guard = await this.readonlyGuard(req);
    if (guard) return guard;
    const notPost = this.jsonPost(req);
    if (notPost) return notPost;
    const body = this.decodeBody(req, 4 << 10);
    let avatar = "";
    let color = "";
    try {
      if (!("value" in body)) throw new Error(body.error);
      ({ avatar, color } = parseAvatar(body.value));
    } catch {
      return httpError(400, "payload inválido");
    }
    if (byteLen(avatar) > 32 || byteLen(color) > 16) return httpError(400, "payload inválido");
    const profile = profileOf(req.profile);
    if (profile === null) return badProfile();
    const loaded = await this.loadProfile(profile);
    const st = cloneState(loaded.st);
    st.avatar = avatar;
    st.color = color;
    const err = this.trySave(profile, st);
    if (err) return saveFailed(err);
    return json(stateJSON(st, false));
  }

  private async handleExport(req: EngineRequest): Promise<EngineResponse> {
    const profile = profileOf(req.profile);
    if (profile === null) return badProfile();
    const { st } = await this.loadProfile(profile);
    return {
      status: 200,
      body: stateJSON(st, true),
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="perfil-${profile}-${localDay(this.now())}.json"`,
      },
    };
  }

  private async handleImport(req: EngineRequest): Promise<EngineResponse> {
    const guard = await this.readonlyGuard(req);
    if (guard) return guard;
    const notPost = this.jsonPost(req);
    if (notPost) return notPost;
    const profile = profileOf(req.profile);
    if (profile === null) return badProfile();
    if (byteLen(req.body) > 4 << 20) {
      return httpError(400, "no pude leer el archivo: http: request body too large");
    }
    let incoming: State;
    try {
      incoming = decodeState(req.body, this.now());
    } catch (e) {
      if (!(e instanceof DecodeError)) throw e;
      return httpError(400, "el archivo no es un respaldo válido de esta app: " + e.message);
    }
    if (incoming.schemaVersion > CURRENT_SCHEMA) {
      return httpError(400, "este respaldo es de una versión más nueva de la app: actualízala antes de importar");
    }
    await migrateState(incoming);
    if (!incoming.lessons || !incoming.items) return httpError(400, "respaldo incompleto: faltan lessons/items");
    if (
      incoming.xp < 0 || incoming.xp > 10_000_000 || incoming.streakDays < 0 || incoming.streakDays > 36500 ||
      incoming.xpToday < 0 || Object.keys(incoming.lessons).length > 5000 || Object.keys(incoming.items).length > 20000
    ) {
      return httpError(400, "respaldo fuera de rango");
    }
    if (byteLen(incoming.avatar) > 32) incoming.avatar = "";
    if (byteLen(incoming.color) > 16) incoming.color = "";
    for (const [id, ls] of Object.entries(incoming.lessons)) {
      if (byteLen(id) > 64 || !ls || ls.bestScore < 0 || ls.bestScore > 1) {
        return httpError(400, "respaldo con lecciones inválidas");
      }
    }
    for (const [id, it] of Object.entries(incoming.items)) {
      if (byteLen(id) > 64 || !it || it.intervalDays < 0) return httpError(400, "respaldo con ítems inválidos");
    }
    pruneSeenRequests(incoming, this.now());
    // antes de pisar, la copia del perfil actual (.preimport.bak)
    try {
      this.backup(profile, ".preimport.bak");
    } catch {
      return httpError(500, "no pude respaldar el perfil actual; import cancelado");
    }
    try {
      this.save(profile, incoming);
    } catch {
      return httpError(500, "no pude escribir el perfil nuevo; import cancelado");
    }
    return json(stateJSON(incoming, false));
  }
}

// ---- Cuerpos de las peticiones (json.Decode sobre los structs de Go) ----

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function typeErr(v: unknown, struct: string, field: string, goType: string): Error {
  const what = Array.isArray(v) ? "array" : typeof v === "number" ? `number ${v}` : typeof v === "boolean" ? "bool" : typeof v;
  return new Error(`json: cannot unmarshal ${what} into Go struct field ${struct}.${field} of type ${goType}`);
}

function field<T>(obj: Record<string, unknown>, key: string, struct: string, goType: string, fallback: T, ok: (v: unknown) => boolean): T {
  const v = obj[key];
  if (v === undefined || v === null) return fallback;
  if (!ok(v)) throw typeErr(v, struct, key, goType);
  return v as T;
}

const isStr = (v: unknown) => typeof v === "string";
const isNum = (v: unknown) => typeof v === "number";
const isInt = (v: unknown) => typeof v === "number" && Number.isInteger(v);
const isBool = (v: unknown) => typeof v === "boolean";

/** Un cuerpo que no es objeto: `null` deja el struct a cero, lo demás es error. */
function asStruct(v: unknown, goType: string): Record<string, unknown> {
  if (v === null) return {};
  if (!isObject(v)) {
    const what = Array.isArray(v) ? "array" : typeof v === "boolean" ? "bool" : typeof v;
    throw new Error(`json: cannot unmarshal ${what} into Go value of type ${goType}`);
  }
  return v;
}

interface LessonResultReq {
  lessonId: string;
  score: number;
  items: { itemId: string; correct: boolean; mode: string }[];
  requestId: string;
}

function parseLessonResult(v: unknown): LessonResultReq {
  const o = asStruct(v, "main.lessonResult");
  const rawItems = field<unknown[]>(o, "items", "lessonResult", "[]main.itemResult", [], Array.isArray);
  return {
    lessonId: field(o, "lessonId", "lessonResult", "string", "", isStr),
    score: field(o, "score", "lessonResult", "float64", 0, isNum),
    requestId: field(o, "requestId", "lessonResult", "string", "", isStr),
    items: rawItems.map((raw) => {
      const it = raw === null ? {} : raw;
      if (!isObject(it)) throw typeErr(raw, "lessonResult", "items", "main.itemResult");
      return {
        itemId: field(it, "itemId", "itemResult", "string", "", isStr),
        correct: field(it, "correct", "itemResult", "bool", false, isBool),
        mode: field(it, "mode", "itemResult", "string", "", isStr),
      };
    }),
  };
}

function parsePlacement(v: unknown): { lang: string; placed: string; pct: number } {
  const o = asStruct(v, "main.placementReq");
  return {
    lang: field(o, "lang", "placementReq", "string", "", isStr),
    placed: field(o, "placed", "placementReq", "string", "", isStr),
    pct: field(o, "pct", "placementReq", "int", 0, isInt),
  };
}

function parseExamDraft(v: unknown): {
  setId: string;
  startedAt: number;
  idx: number;
  answers: Record<string, unknown> | null;
} {
  const o = asStruct(v, "main.examDraftReq");
  const answers = o.answers;
  if (answers !== undefined && answers !== null && !isObject(answers)) {
    throw typeErr(answers, "examDraftReq", "answers", "map[string]json.RawMessage");
  }
  return {
    setId: field(o, "setId", "examDraftReq", "string", "", isStr),
    startedAt: field(o, "startedAt", "examDraftReq", "int64", 0, isInt),
    idx: field(o, "idx", "examDraftReq", "int", 0, isInt),
    answers: isObject(answers) ? answers : null,
  };
}

function parseAvatar(v: unknown): { avatar: string; color: string } {
  const o = asStruct(v, "struct");
  return {
    avatar: field(o, "avatar", "struct", "string", "", isStr),
    color: field(o, "color", "struct", "string", "", isStr),
  };
}
