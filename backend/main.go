package main

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"flag"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"os/signal"
	"path/filepath"
	"regexp"
	"sort"
	"strconv"
	"strings"
	"sync"
	"syscall"
	"time"

	"golang.org/x/text/unicode/norm"
	"net"
)

// ---- Versión ----

// version se inyecta en release: go build -ldflags "-X main.version=1.0.0"
var version = "dev"

// contentVersion identifica el drop de contenido incluido en este build.
var contentVersion = "2" // inyectado por build-app.sh: -ldflags "-X main.contentVersion=<drop>"

// manifest identifica el manifiesto (PLAN-COMPOSICION.md §4.2) con el que se
// horneó este build, si se pidió uno — vacío en un build por número de drop
// puro. El drop sigue siendo el número que ve el alumno (contentVersion, la
// ETIQUETA de negocio, §8.1); esto es la composición exacta por debajo,
// visible para que un "solo-ingles" y el build completo no sean
// indistinguibles desde fuera.
var manifest = "" // inyectado por build-app.sh: -ldflags "-X main.manifest=<id>"

// ---- Modelo ----

type LessonStat struct {
	Completed bool      `json:"completed"`
	BestScore float64   `json:"bestScore"`
	LastScore float64   `json:"lastScore"`
	Attempts  int       `json:"attempts"`
	LastAt    time.Time `json:"lastAt"`
}

// currentSchema es la versión del esquema de perfil que esta build entiende.
// Con drops mensuales convivirán N versiones en máquinas de clientes: sin
// este número no hay migración segura posible (B4).
const currentSchema = 2

// SeenRequest es un envío de lesson-result que ya se aplicó. Vive en el
// perfil: un anillo corto en memoria olvidaba el id y la lección se
// aplicaba otra vez.
type SeenRequest struct {
	ID string    `json:"id"`
	At time.Time `json:"at"`
}

type State struct {
	SchemaVersion int                    `json:"schemaVersion"`
	Lessons       map[string]*LessonStat `json:"lessons"`
	Items         map[string]*ItemStat   `json:"items"`
	XP            int                    `json:"xp"`
	StreakDays    int                    `json:"streakDays"`
	LastActive    string                 `json:"lastActive"` // YYYY-MM-DD
	Avatar        string                 `json:"avatar"`     // icono de explorador elegido
	Color         string                 `json:"color"`      // color del perfil (#hex)
	XPToday       int                    `json:"xpToday"`    // XP ganado hoy (para el cap diario)
	XPDay         string                 `json:"xpDay"`      // día del contador (YYYY-MM-DD)

	// Nivel en el que la prueba de nivel colocó al alumno, por idioma ("en" →
	// "b1"). Es un dato del PERFIL, no del navegador: la prueba se hace muchas
	// veces desde el móvil (QR) y el desbloqueo tiene que seguir valiendo en
	// el ordenador (PLAN 1.9.8 §1.3).
	Placement map[string]*PlacementStat `json:"placement"`

	// Borrador de simulacro: startedAt (epoch s) es la fuente del reloj;
	// Answers van por ítem. Cerrar la pestaña no regenera minutos.
	ExamDrafts map[string]*ExamDraft `json:"examDrafts"`

	// Ids de lesson-result ya aplicados. No son progreso del alumno: evitan
	// que un reintento vuelva a mover la escalera. Van aquí, y no en un
	// anillo de 20 en memoria, porque el vigésimo primer envío olvidaba el
	// primero. El tope y la edad están en pruneSeenRequests.
	SeenRequests []SeenRequest `json:"seenRequests,omitempty"`

	// Extra preserva campos que esta versión NO conoce (perfil tocado por una
	// versión más nueva de la app): un downgrade que re-guarda no debe
	// borrarlos en silencio (B5). Se re-inyectan al serializar.
	Extra map[string]json.RawMessage `json:"-"`
}

type ExamDraft struct {
	StartedAt int64                      `json:"startedAt"`
	Idx       int                        `json:"idx"`
	Answers   map[string]json.RawMessage `json:"answers"`
}

type PlacementStat struct {
	Placed string `json:"placed"` // forma CEFR (a1, b2, c1…): el techo lo decide el front
	Pct    int    `json:"pct"`
	At     string `json:"at"` // RFC3339
}

// knownStateFields DEBE reflejar los tags json de State: todo lo demás que
// venga en el archivo se conserva en Extra.
var knownStateFields = map[string]bool{
	"schemaVersion": true, "lessons": true, "items": true, "xp": true,
	"streakDays": true, "lastActive": true, "avatar": true, "color": true,
	"xpToday": true, "xpDay": true, "placement": true, "examDrafts": true,
	"seenRequests": true,
}

// cloneState: copia profunda de lo que un POST puede tocar. Existe para poder
// DESHACER: si el guardado falla, la memoria tiene que volver a como estaba.
// Sin esto, el arreglo del disco lleno (responder 503) y el de los reintentos
// del cliente se combinaban en el peor de los mundos: el estado quedaba mutado
// pero el requestId no quedaba con él —solo permanece si el guardado triunfa—,
// así que los tres reintentos volvían a aplicar todo: intentos ×3 y la
// escalera del SRS corrompida. El slice de ids va copiado aparte: si se
// compartiera, un fallo de disco dejaría el id apuntado y el reintento no
// volvería a intentarlo.
func cloneState(st *State) *State {
	cp := *st
	cp.Lessons = make(map[string]*LessonStat, len(st.Lessons))
	for k, v := range st.Lessons {
		if v == nil {
			continue
		}
		l := *v
		cp.Lessons[k] = &l
	}
	cp.Items = make(map[string]*ItemStat, len(st.Items))
	for k, v := range st.Items {
		if v == nil {
			continue
		}
		i := *v
		cp.Items[k] = &i
	}
	if st.Placement != nil {
		cp.Placement = make(map[string]*PlacementStat, len(st.Placement))
		for k, v := range st.Placement {
			if v == nil {
				continue
			}
			p := *v
			cp.Placement[k] = &p
		}
	}
	if st.ExamDrafts != nil {
		cp.ExamDrafts = make(map[string]*ExamDraft, len(st.ExamDrafts))
		for k, v := range st.ExamDrafts {
			if v == nil {
				continue
			}
			d := *v
			if v.Answers != nil {
				d.Answers = make(map[string]json.RawMessage, len(v.Answers))
				for ak, av := range v.Answers {
					cpb := make(json.RawMessage, len(av))
					copy(cpb, av)
					d.Answers[ak] = cpb
				}
			}
			cp.ExamDrafts[k] = &d
		}
	}
	if len(st.SeenRequests) > 0 {
		cp.SeenRequests = append([]SeenRequest(nil), st.SeenRequests...)
	}
	if st.Extra != nil {
		cp.Extra = make(map[string]json.RawMessage, len(st.Extra))
		for k, v := range st.Extra {
			cp.Extra[k] = copyRaw(v)
		}
	}
	return &cp
}

func newState() *State {
	return &State{SchemaVersion: currentSchema, Lessons: map[string]*LessonStat{}, Items: map[string]*ItemStat{}}
}

// decodeState hace el unmarshal en dos pasos: struct + mapa crudo, guardando
// en Extra los campos desconocidos para que sobrevivan al próximo save.
func decodeState(b []byte, st *State) error {
	if err := json.Unmarshal(b, st); err != nil {
		return err
	}
	var raw map[string]json.RawMessage
	if err := json.Unmarshal(b, &raw); err != nil {
		return err
	}
	for k, v := range raw {
		if knownStateFields[k] {
			continue
		}
		if st.Extra == nil {
			st.Extra = map[string]json.RawMessage{}
		}
		st.Extra[k] = v
	}
	sanitizeExamDrafts(st)
	return nil
}

const (
	examDraftMaxAgeSec     = 48 * 3600
	examDraftMaxIdx        = 500
	examDraftMaxAnswers    = 400
	examDraftMaxKey        = 64
	examDraftMaxValBytes   = 8 << 10
	examDraftMaxPerProfile = 8
	examDraftMaxBody       = 256 << 10
)

var examSetIDRe = regexp.MustCompile(`^[a-z][a-z0-9-]{0,62}$`)

func validExamSetID(id string) bool {
	return examSetIDRe.MatchString(id)
}

func copyRaw(v json.RawMessage) json.RawMessage {
	if v == nil {
		return nil
	}
	cp := make(json.RawMessage, len(v))
	copy(cp, v)
	return cp
}

func sanitizeExamDrafts(st *State) {
	if st == nil || st.ExamDrafts == nil {
		return
	}
	now := time.Now().Unix()
	for k, d := range st.ExamDrafts {
		if d == nil || !validExamSetID(k) || d.StartedAt <= 0 || now-d.StartedAt > examDraftMaxAgeSec || d.Idx < 0 {
			delete(st.ExamDrafts, k)
			continue
		}
		if d.StartedAt > now {
			d.StartedAt = now
		}
		if d.Idx > examDraftMaxIdx {
			d.Idx = examDraftMaxIdx
		}
		if d.Answers == nil {
			d.Answers = map[string]json.RawMessage{}
			continue
		}
		n := 0
		for ak, av := range d.Answers {
			if ak == "" || len(ak) > examDraftMaxKey || len(av) > examDraftMaxValBytes || (len(av) > 0 && !json.Valid(av)) {
				delete(d.Answers, ak)
				continue
			}
			n++
			if n > examDraftMaxAnswers {
				delete(d.Answers, ak)
			}
		}
	}
	if len(st.ExamDrafts) > examDraftMaxPerProfile {
		type pair struct {
			k string
			t int64
		}
		all := make([]pair, 0, len(st.ExamDrafts))
		for k, d := range st.ExamDrafts {
			all = append(all, pair{k, d.StartedAt})
		}
		sort.Slice(all, func(i, j int) bool { return all[i].t > all[j].t })
		for _, p := range all[examDraftMaxPerProfile:] {
			delete(st.ExamDrafts, p.k)
		}
	}
}

// stateJSON serializa un State re-inyectando los campos desconocidos
// preservados en Extra. Único camino de State → bytes (disco y API).
func stateJSON(st *State, indent bool) []byte {
	b, _ := json.Marshal(st)
	if len(st.Extra) > 0 {
		var m map[string]json.RawMessage
		if json.Unmarshal(b, &m) == nil {
			for k, v := range st.Extra {
				if _, ok := m[k]; !ok {
					m[k] = v
				}
			}
			if mb, err := json.Marshal(m); err == nil {
				b = mb
			}
		}
	}
	if indent {
		var out bytes.Buffer
		if json.Indent(&out, b, "", "  ") == nil {
			return out.Bytes()
		}
	}
	return b
}

// migrateState corre las migraciones secuenciales de esquema hasta
// currentSchema. v0 (perfiles de antes de schemaVersion) → v1: solo estampar.
func migrateState(st *State) {
	for st.SchemaVersion < currentSchema {
		switch st.SchemaVersion {
		case 0:
			st.SchemaVersion = 1 // v0→v1: solo estampar la versión
		case 1:
			// v1→v2: funde las tarjetas de las palabras que se enseñaban dos
			// veces con ids distintos (ver migrate_items.go y el registro en
			// web/scripts/vocab-aliases.json). El mismo registro puede traer
			// alias de lección o de fase (módulo): migrateLessonAliases mueve
			// ese progreso igual, por las claves que arma web/lib/ids.ts.
			if n := migrateItemAliases(st); n > 0 {
				log.Printf("perfil migrado a v2: %d tarjeta(s) de vocabulario repetidas fundidas en una", n)
			}
			if n := migrateLessonAliases(st); n > 0 {
				log.Printf("perfil migrado a v2: %d progreso(s) de lección/fase repetidos fundidos", n)
			}
			st.SchemaVersion = 2
		default:
			st.SchemaVersion = currentSchema // no debería alcanzarse
		}
	}
}

// ---- Perfiles y persistencia ----

var (
	mu      sync.Mutex
	states  = map[string]*State{}
	dataDir string
	nameRe  = regexp.MustCompile(`^[\p{L}0-9_-]{1,24}$`)
	// nombres de dispositivo reservados de Windows: "con.json" es la consola;
	// un perfil llamado "Con" rompería la app entera en NTFS (B17)
	reservedWin = regexp.MustCompile(`^(con|prn|aux|nul|com[1-9]|lpt[1-9])$`)
)

func profilePath(name string) string {
	return filepath.Join(dataDir, name+".json")
}

// profileTmpSeq distingue el temporal de cada guardado. saveProfile solo lo
// incrementa con el mutex global tomado: si dos reintentos coinciden al
// soltar el candado, no pueden truncarse el .tmp el uno al otro.
var profileTmpSeq uint64

func profileTmpPath(name string) string {
	profileTmpSeq++
	return fmt.Sprintf("%s.%d.tmp", profilePath(name), profileTmpSeq)
}

// normalizeProfile valida y canoniza un nombre de perfil: NFC ("café" tecleado
// en mac (NFD) y en Windows (NFC) deben ser EL MISMO archivo), minúsculas
// (el FS de macOS es case-insensitive y "Anna"/"anna" serían dos estados en
// memoria pisando un mismo archivo) y nunca un reservado de Windows.
func normalizeProfile(raw string) (string, bool) {
	name := norm.NFC.String(strings.TrimSpace(raw))
	if !nameRe.MatchString(name) {
		return "", false
	}
	name = strings.ToLower(name)
	if reservedWin.MatchString(name) {
		return "", false
	}
	return name, true
}

// profileOf saca el perfil del header X-Profile. Ausente → "default";
// malformado → error (nunca escribir en el progreso de otro por accidente).
func profileOf(r *http.Request) (string, bool) {
	raw := r.Header.Get("X-Profile")
	if strings.TrimSpace(raw) == "" {
		return "default", true
	}
	return normalizeProfile(raw)
}

// badProfile responde el 400 estándar de perfil inválido.
func badProfile(w http.ResponseWriter) {
	http.Error(w, "perfil inválido (letras, números, - y _, máx 24; sin nombres reservados)", http.StatusBadRequest)
}

func loadProfile(name string) *State {
	if st, ok := states[name]; ok {
		return st
	}
	st := newState()
	b, rerr := os.ReadFile(profilePath(name))
	if rerr != nil && !os.IsNotExist(rerr) {
		// error de lectura REAL (permisos, disco): servir estado vacío temporal
		// SIN cachear — así saveProfile (que exige states[name]) nunca pisa el
		// archivo que no pudimos leer
		readonlyProfiles[name] = true
		log.Printf("perfil %s ilegible (%v): solo-lectura temporal, sin guardar", name, rerr)
		return st
	}
	if rerr == nil {
		loaded := &State{}
		if err := decodeState(b, loaded); err != nil {
			// NUNCA pisar un perfil corrupto: se aparta a .bak con timestamp
			// (meses de progreso valen más que un arranque limpio silencioso)
			bak := profilePath(name) + "." + time.Now().Format("20060102-150405") + ".bak"
			if rerr := os.Rename(profilePath(name), bak); rerr == nil {
				log.Printf("perfil %s corrupto: apartado en %s (%v)", name, bak, err)
				recoveredProfiles[name] = filepath.Base(bak)
			} else {
				log.Printf("perfil %s corrupto y no se pudo apartar: %v / %v", name, err, rerr)
			}
		} else {
			st = loaded
		}
	}
	if st.Lessons == nil {
		st.Lessons = map[string]*LessonStat{}
	}
	if st.Items == nil {
		st.Items = map[string]*ItemStat{}
	}
	// Un `null` dentro de items/lessons entra por un respaldo editado a mano o
	// por un guardado a medias, y luego revienta MUY lejos de aquí: el pánico
	// deja el mutex global cerrado y la app entera se queda colgada mientras
	// /api/health sigue diciendo que todo va bien. Se limpia en la puerta.
	for id, it := range st.Items {
		if it == nil {
			delete(st.Items, id)
		}
	}
	for id, ls := range st.Lessons {
		if ls == nil {
			delete(st.Lessons, id)
		}
	}
	// perfil de una versión FUTURA del esquema: NO abrir para escribir —
	// solo-lectura temporal SIN cachear (mismo mecanismo que los ilegibles),
	// así un downgrade de la app no destruye datos que no entiende (B4)
	if st.SchemaVersion > currentSchema {
		readonlyProfiles[name] = true
		log.Printf("perfil %s con esquema v%d > v%d (la app es más vieja que el perfil): solo-lectura temporal, sin guardar — actualiza la app", name, st.SchemaVersion, currentSchema)
		return st
	}
	// Al cargar, no cuando llegue la próxima lección: si no, un perfil
	// con miles de ids viejos seguiría por encima del tope hasta entonces.
	pruneSeenRequests(st, time.Now())
	if st.SchemaVersion < currentSchema {
		migrateState(st)
		states[name] = st
		// El reintento del rename puede soltar el mutex. Si al volver hay
		// otro *State, devolver el migrado haría que el llamador lo clonara
		// y pisara el que ya está publicado.
		_ = saveProfile(name)
		if cur := states[name]; cur != nil {
			return cur
		}
		return st
	}
	states[name] = st
	return st
}

// perfiles que NO deben guardarse (ilegibles o de esquema futuro): las
// mutaciones sobre ellos responden error — jamás un éxito fantasma (bug 2)
var readonlyProfiles = map[string]bool{}

// recoveredProfiles: perfiles cuyo archivo estaba corrupto y se apartó a un
// .bak. Antes esto solo se contaba en el log: en pantalla salía una expedición
// vacía —0 XP, 0 racha, ningún certificado— exactamente igual que una
// instalación nueva, y el alumno pensaba que había perdido meses sin más.
var recoveredProfiles = map[string]string{}

func profileReadonly(name string) bool {
	mu.Lock()
	defer mu.Unlock()
	// cargar primero: un perfil readonly JAMÁS visto aún no está en el map y
	// sin esto la primera mutación pasaría el guard (éxito fantasma residual)
	loadProfile(name)
	return readonlyProfiles[name]
}

// errEstadoSustituido: el *State que serializamos ya no es el publicado.
// La foto del .tmp no debe sustituir al perfil.
var errEstadoSustituido = errors.New("el perfil cambió mientras se reintentaba el guardado")

// saveProfile persiste states[name]. El llamador trae el mutex global
// cerrado: un disco lleno tiene que seguir siendo un error, no un 200 con
// el estado solo en memoria. Los reintentos del rename lo sueltan al dormir
// y lo vuelven a tomar; al volver, el candado está cerrado otra vez.
func saveProfile(name string) error {
	st := states[name]
	if st == nil {
		return nil
	}
	// Defender/antivirus en Windows escanea el .tmp recién escrito y provoca
	// sharing violations transitorias (B20). Esa espera no puede hacerse con
	// el mutex global cerrado: el teléfono, en la misma red, se quedaría
	// parado detrás de un perfil que no es el suyo (B12). El primer intento
	// no espera. Si al volver hay otro *State, esta foto es vieja y no se
	// renombra. Si el puntero es el mismo pero el JSON ya no coincide —alguien
	// mutó el publicado sin clonar—, el .tmp se reescribe: renombrar la foto
	// vieja dejaría el disco atrás y aquí devolveríamos nil.
	var (
		b       []byte
		tmp     string
		escrito bool
		rerr    error
	)
	for _, wait := range []time.Duration{0, 25 * time.Millisecond, 75 * time.Millisecond} {
		if wait > 0 {
			mu.Unlock()
			time.Sleep(wait)
			mu.Lock()
			if states[name] != st {
				if escrito {
					_ = os.Remove(tmp)
				}
				log.Printf("guardado de %s: el estado cambió durante el reintento; no se pisa el perfil", name)
				return errEstadoSustituido
			}
		}
		// Otro guardado pudo dejar ya esta foto mientras dormíamos. Devolver
		// el error del rename haría que la lección deshiciera la memoria y,
		// al reintentar, pisara ese archivo con el avatar y el XP viejos.
		if profileAlreadyCurrent(name, st) {
			if escrito {
				_ = os.Remove(tmp)
			}
			return nil
		}
		ahora := stateJSON(st, true)
		if !escrito || !bytes.Equal(ahora, b) {
			if escrito {
				_ = os.Remove(tmp)
			}
			b = ahora
			tmp = profileTmpPath(name)
			f, err := os.Create(tmp)
			if err != nil {
				log.Printf("error guardando %s: %v", name, err)
				return err
			}
			// Write, Sync y Close DEBEN triunfar antes del rename: un disco lleno
			// jamás debe sustituir el perfil bueno por un tmp truncado
			_, werr := f.Write(b)
			serr := f.Sync() // fsync: el progreso sobrevive a un corte de luz
			cerr := f.Close()
			if werr != nil || serr != nil || cerr != nil {
				log.Printf("error guardando %s (write=%v sync=%v close=%v) — perfil en disco intacto", name, werr, serr, cerr)
				_ = os.Remove(tmp)
				return errors.Join(werr, serr, cerr)
			}
			escrito = true
		}
		if rerr = os.Rename(tmp, profilePath(name)); rerr == nil {
			return nil
		}
	}
	log.Printf("error guardando %s tras 3 intentos de rename: %v", name, rerr)
	_ = os.Remove(tmp)
	if profileAlreadyCurrent(name, st) {
		return nil
	}
	return rerr
}

// profileAlreadyCurrent: el archivo del perfil ya es el JSON de este estado.
// Pasa cuando otro guardado terminó mientras este dormía el reintento.
func profileAlreadyCurrent(name string, st *State) bool {
	if st == nil {
		return false
	}
	actual, err := os.ReadFile(profilePath(name))
	if err != nil {
		return false
	}
	return bytes.Equal(actual, stateJSON(st, true))
}

// saveOrFail guarda y, si no puede, responde 503 con un motivo legible en vez
// de un 200 mentiroso. Devuelve false cuando ya ha escrito la respuesta.
// Un estado sustituido durante el reintento no es un fallo de disco: 503
// haría que el cliente repitiera la lección.
func saveOrFail(w http.ResponseWriter, name string) bool {
	err := saveProfile(name)
	if errors.Is(err, errEstadoSustituido) {
		return true
	}
	if err != nil {
		http.Error(w,
			"no se pudo guardar tu progreso en el disco ("+err.Error()+"). "+
				"Suele ser disco lleno o permisos de la carpeta de datos. "+
				"Lo que acabas de hacer NO ha quedado guardado.",
			http.StatusServiceUnavailable)
		return false
	}
	return true
}

// rollbackUnlessReplaced deshace la copia solo si sigue publicada. Si durante
// la espera del rename otro guardado puso su *State, restaurar «antes» lo
// pisaría — y con él el progreso de ese otro aparato. Si el disco ya tiene
// esta foto, tampoco: la memoria volvería atrás y el reintento la escribiría
// encima del archivo bueno.
func rollbackUnlessReplaced(name string, published, before *State) {
	if before != nil && states[name] == published && !profileAlreadyCurrent(name, published) {
		states[name] = before
	}
}

// errAvatarPendiente: la elección no está en el estado que quedó publicado.
// Un 200 con el avatar viejo haría creer al alumno que sí se guardó.
var errAvatarPendiente = errors.New("el avatar no quedó en el perfil publicado")

// persistAvatar clona antes de tocar avatar y color. Mutar el *State que la
// lección tiene publicado no vale: si a ella se le agota el rename, restaura
// «antes» y se lleva el cambio. El llamador trae el mutex cerrado.
func persistAvatar(name, avatar, color string) (*State, error) {
	st := loadProfile(name)
	antes := states[name]
	st = cloneState(st)
	states[name] = st
	st.Avatar = avatar
	st.Color = color
	err := saveProfile(name)
	if err != nil && !errors.Is(err, errEstadoSustituido) {
		rollbackUnlessReplaced(name, st, antes)
		return nil, err
	}
	publicado := estadoPublicado(name, st)
	if publicado.Avatar == avatar && publicado.Color == color {
		return publicado, nil
	}
	// Se publicó otro mientras tanto. La elección va encima de ese, no se
	// responde con el suyo como si el nuestro hubiera ganado.
	base := publicado
	cp := cloneState(publicado)
	states[name] = cp
	cp.Avatar = avatar
	cp.Color = color
	err = saveProfile(name)
	if err != nil && !errors.Is(err, errEstadoSustituido) {
		rollbackUnlessReplaced(name, cp, base)
		return nil, err
	}
	publicado = estadoPublicado(name, cp)
	if publicado.Avatar != avatar || publicado.Color != color {
		return nil, errAvatarPendiente
	}
	return publicado, nil
}

func handleAvatar(w http.ResponseWriter, r *http.Request) {
	if p, ok := profileOf(r); ok && profileReadonly(p) {
		http.Error(w, "perfil en solo-lectura (archivo ilegible o de una versión más nueva de la app) — no se puede guardar", http.StatusServiceUnavailable)
		return
	}
	if !jsonPost(w, r, 4<<10) {
		return
	}
	var body struct {
		Avatar string `json:"avatar"`
		Color  string `json:"color"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil || len(body.Avatar) > 32 || len(body.Color) > 16 {
		http.Error(w, "payload inválido", http.StatusBadRequest)
		return
	}
	profile, ok := profileOf(r)
	if !ok {
		badProfile(w)
		return
	}
	mu.Lock()
	defer mu.Unlock()
	st, err := persistAvatar(profile, body.Avatar, body.Color)
	if err != nil {
		msg := "no se pudo guardar tu progreso en el disco (" + err.Error() + "). " +
			"Suele ser disco lleno o permisos de la carpeta de datos. " +
			"Lo que acabas de hacer NO ha quedado guardado."
		if errors.Is(err, errAvatarPendiente) {
			msg = "no se pudo guardar el avatar porque el perfil cambió a la vez. Vuelve a elegirlo."
		}
		http.Error(w, msg, http.StatusServiceUnavailable)
		return
	}
	writeRaw(w, stateJSON(st, false))
}

// estadoPublicado es el *State que hay que devolver tras guardar. Si durante
// el reintento se publicó otro, el cliente tiene que ver ese: si le
// devolvemos la foto local, el siguiente guardado la escribiría encima.
func estadoPublicado(name string, fallback *State) *State {
	if cur := states[name]; cur != nil {
		return cur
	}
	return fallback
}

func listProfiles() []string {
	entries, err := os.ReadDir(dataDir)
	if err != nil {
		log.Printf("no pude listar perfiles en %s: %v", dataDir, err)
	}
	seen := map[string]bool{}
	var out []string
	for _, e := range entries {
		n := e.Name()
		if !strings.HasSuffix(n, ".json") || strings.Contains(n, ".bak") || strings.HasSuffix(n, ".tmp") {
			continue
		}
		name := strings.ToLower(strings.TrimSuffix(n, ".json"))
		if !seen[name] {
			seen[name] = true
			out = append(out, name)
		}
	}
	sort.Strings(out)
	if len(out) == 0 {
		out = []string{"default"}
	}
	return out
}

// ---- Idempotencia de lesson-result (B10) ----

// El cliente reintenta el mismo requestId a los 0, 700 y 2500 ms, con un
// tope de 8 s por intento. El corte es mucho más largo: un equipo dormido
// puede despertar días después y soltar ese mismo intento, y eso sigue
// siendo un doble clic, no una segunda recuperación.
const (
	// Treinta días cubren ese despertar. Pasado el plazo el id caduca:
	// guardarlos todos hincharía el perfil y ya no son el mismo envío.
	seenReqMaxAge = 30 * 24 * time.Hour
	// La edad es el corte de verdad. Este tope solo evita que el perfil
	// crezca sin límite si el reloj no avanza. Está muy por encima del
	// anillo de 20, que olvidaba el primer id al llegar el vigésimo primero.
	seenReqCap = 4096
)

func requestAlreadySeen(st *State, id string, now time.Time) bool {
	if id == "" || st == nil {
		return false
	}
	for _, s := range st.SeenRequests {
		if s.ID != id {
			continue
		}
		at := s.At
		// Un respaldo con la hora en el futuro no puede quedar clavado
		// para siempre: se cuenta como de ahora y caduca con los demás.
		if at.After(now) {
			at = now
		}
		if now.Sub(at) <= seenReqMaxAge {
			return true
		}
	}
	return false
}

func noteSeenRequest(st *State, id string, now time.Time) {
	if st == nil || id == "" {
		return
	}
	st.SeenRequests = append(st.SeenRequests, SeenRequest{ID: id, At: now})
	pruneSeenRequests(st, now)
}

func pruneSeenRequests(st *State, now time.Time) {
	if st == nil || len(st.SeenRequests) == 0 {
		return
	}
	best := make(map[string]time.Time, len(st.SeenRequests))
	order := make([]string, 0, len(st.SeenRequests))
	for _, s := range st.SeenRequests {
		if s.ID == "" || len(s.ID) > 128 {
			continue
		}
		at := s.At
		if at.After(now) {
			at = now
		}
		if now.Sub(at) > seenReqMaxAge {
			continue
		}
		if prev, ok := best[s.ID]; ok {
			if at.After(prev) {
				best[s.ID] = at
			}
			continue
		}
		best[s.ID] = at
		order = append(order, s.ID)
	}
	if len(order) == 0 {
		st.SeenRequests = nil
		return
	}
	if len(order) > seenReqCap {
		sort.Slice(order, func(i, j int) bool {
			ti, tj := best[order[i]], best[order[j]]
			if ti.Equal(tj) {
				return order[i] < order[j]
			}
			return ti.Before(tj)
		})
		order = order[len(order)-seenReqCap:]
	}
	kept := make([]SeenRequest, len(order))
	for i, id := range order {
		kept[i] = SeenRequest{ID: id, At: best[id]}
	}
	st.SeenRequests = kept
}

// ---- HTTP ----

// privateHost: localhost, *.local (mDNS), IPv6 loopback y link-local, rangos
// privados RFC1918 y Tailscale (100.64/10). Nada de internet.
//
// Antes admitía cualquier nombre de UNA sola etiqueta, con la idea de aceptar
// los «desktop-abc» de Windows. El efecto real era que un `Origin: http://evil`
// contaba como privado y pasaba los filtros: un nombre sin punto no prueba
// nada, mientras que .local sí es del protocolo de red local. La app se
// alcanza por IP (es lo que lleva el QR), así que no se pierde nada.
var privateHost = regexp.MustCompile(`^(localhost|127\.0\.0\.1|\[::1\]|\[fe80:[^\]]*\]|[a-z0-9-]+\.local|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(1[6-9]|2\d|3[01])\.\d+\.\d+|100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\.\d+\.\d+)(:\d+)?$`)

// cors: la app vive en la máquina del usuario y en su red local — se refleja
// el Origin solo si es localhost o una IP privada (LAN). Nada de internet.
func cors(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		touchActivity() // N15: cualquier petición cuenta como "el usuario sigue ahí"
		// DNS REBINDING: el CORS mira el Origin, pero una web hostil puede hacer
		// que evil.example resuelva a 127.0.0.1 y entonces su origen ES el
		// nuestro a ojos del navegador. Lo que NO puede falsificar es el Host que
		// el navegador manda (el nombre que tecleó): si no es un host privado, la
		// petición no viene de la app del usuario. Coste: una regex por petición.
		if r.Host != "" && !privateHost.MatchString(strings.ToLower(r.Host)) {
			http.Error(w, "host no permitido", http.StatusForbidden)
			return
		}
		// N14: desde la red local hace falta la llave del QR. Desde este equipo,
		// nada. Sin esto, cualquiera en la misma wifi lee y escribe el progreso
		// ajeno con solo acertar el puerto.
		if !lanAuthorized(w, r) {
			denyLAN(w, r)
			return
		}
		origin := r.Header.Get("Origin")
		if origin != "" {
			if u, err := url.Parse(origin); err == nil && privateHost.MatchString(strings.ToLower(u.Host)) {
				w.Header().Set("Access-Control-Allow-Origin", origin)
			}
		}
		w.Header().Set("Vary", "Origin")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, X-Profile")
		w.Header().Set("Access-Control-Max-Age", "86400") // preflight cacheado: no un OPTIONS por request
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		h(w, r)
	}
}

// jsonPost limita el cuerpo y exige Content-Type: application/json en POST
// (cierra el CSRF de text/plain y los cuerpos gigantes).
func jsonPost(w http.ResponseWriter, r *http.Request, maxBytes int64) bool {
	if r.Method != http.MethodPost {
		http.Error(w, "POST only", http.StatusMethodNotAllowed)
		return false
	}
	if ct := r.Header.Get("Content-Type"); !strings.HasPrefix(ct, "application/json") {
		http.Error(w, "Content-Type debe ser application/json", http.StatusUnsupportedMediaType)
		return false
	}
	r.Body = http.MaxBytesReader(w, r.Body, maxBytes)
	return true
}

func writeJSON(w http.ResponseWriter, v any) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(v)
}

// writeRaw escribe una respuesta JSON ya serializada (el patrón "marshal
// dentro del lock, escribir fuera": una tablet LAN lenta drenando su TCP no
// debe congelar el backend para todos los perfiles — B12).
func writeRaw(w http.ResponseWriter, b []byte) {
	w.Header().Set("Content-Type", "application/json")
	w.Write(b)
}

type itemResult struct {
	ItemID  string `json:"itemId"`
	Correct bool   `json:"correct"`
	// "recognize" | "produce" — lo etiqueta el cliente según el tipo de
	// ejercicio. Vacío = "produce" (comportamiento histórico). Otra cadena
	// no se acepta: no es producir.
	Mode string `json:"mode,omitempty"`
}

// knownReviewMode cierra el techo productivo. El vacío se queda, porque los
// clientes de antes no tenían campo mode y producir era el único
// comportamiento. Una cadena distinta no se reinterpreta como producir:
// un typo no debe alargar la tarjeta.
func knownReviewMode(mode string) bool {
	return mode == "" || mode == "recognize" || mode == "produce"
}

type lessonResult struct {
	LessonID  string       `json:"lessonId"`
	Score     float64      `json:"score"` // 0..1
	Items     []itemResult `json:"items"`
	RequestID string       `json:"requestId"` // opcional: idempotencia de reintentos
}

type placementReq struct {
	Lang   string `json:"lang"`
	Placed string `json:"placed"`
	Pct    int    `json:"pct"`
}

// langFormRe valida solo la FORMA del idioma, nunca su pertenencia: el
// backend es agnóstico de idioma a propósito, y en Go no existe ningún
// registro de idiomas que mantener sincronizado con web/data (PLAN 1.9.8
// §3.1). Un idioma bien formado pero desconocido escribe un dato muerto que
// nadie lee — eso es preferible a un segundo registro invisible.
var langFormRe = regexp.MustCompile(`^[a-z]{2}$`)

// placedCefrFormRe es la FORMA de la escala CEFR (a/b/c × 1/2), no una lista
// de lo que el curso enseña. `d1` y `b9` fuera; `b2`/`c1`/`c2` dentro.
// El techo enseñado lo decide el front. No se escribe a1,a2,b1 a mano:
// el escáner de escaleras lo pillaría como sexta copia.
var placedCefrFormRe = regexp.MustCompile(`^[abc][12]$`)

// maxPlacementLangs acota el crecimiento del perfil: el riesgo real de este
// endpoint es un JSON sin límite, no que el idioma sea raro.
const maxPlacementLangs = 32

// handlePlacement guarda dónde colocó la prueba de nivel al alumno, por
// idioma. Sigue el mismo camino atómico que /api/lesson-result: copiar sobre
// cloneState, mutar la copia, guardar, y solo publicarla si el guardado
// triunfa (PLAN 1.9.8 §1.3, §3.1).
func handlePlacement(w http.ResponseWriter, r *http.Request) {
	if p, ok := profileOf(r); ok && profileReadonly(p) {
		http.Error(w, "perfil en solo-lectura (archivo ilegible o de una versión más nueva de la app) — no se puede guardar", http.StatusServiceUnavailable)
		return
	}
	if !jsonPost(w, r, 4<<10) {
		return
	}
	var req placementReq
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if !langFormRe.MatchString(req.Lang) {
		http.Error(w, "lang inválido: dos letras minúsculas", http.StatusBadRequest)
		return
	}
	if !placedCefrFormRe.MatchString(req.Placed) {
		http.Error(w, "placed inválido: un peldaño CEFR (a1, a2, b1, b2, c1, c2)", http.StatusBadRequest)
		return
	}
	if req.Pct < 0 || req.Pct > 100 {
		http.Error(w, "pct fuera de rango (0-100)", http.StatusBadRequest)
		return
	}
	profile, ok := profileOf(r)
	if !ok {
		badProfile(w)
		return
	}
	mu.Lock()
	defer mu.Unlock()
	st := loadProfile(profile)
	if _, exists := st.Placement[req.Lang]; !exists && len(st.Placement) >= maxPlacementLangs {
		http.Error(w, "límite de idiomas colocados alcanzado", http.StatusBadRequest)
		return
	}

	// se trabaja sobre una COPIA: si el guardado falla, se descarta entera y
	// la memoria queda como estaba (ver cloneState)
	antes := states[profile]
	st = cloneState(st)
	states[profile] = st
	if st.Placement == nil {
		st.Placement = map[string]*PlacementStat{}
	}
	st.Placement[req.Lang] = &PlacementStat{Placed: req.Placed, Pct: req.Pct, At: time.Now().UTC().Format(time.RFC3339)}

	if !saveOrFail(w, profile) {
		rollbackUnlessReplaced(profile, st, antes)
		return
	}
	b := stateJSON(estadoPublicado(profile, st), false)
	writeRaw(w, b)
}

type examDraftReq struct {
	SetID     string                     `json:"setId"`
	StartedAt int64                      `json:"startedAt"`
	Idx       int                        `json:"idx"`
	Answers   map[string]json.RawMessage `json:"answers"`
}

func validDraftAnswers(m map[string]json.RawMessage) bool {
	if len(m) > examDraftMaxAnswers {
		return false
	}
	for k, v := range m {
		if k == "" || len(k) > examDraftMaxKey || len(v) > examDraftMaxValBytes {
			return false
		}
		if len(v) > 0 && !json.Valid(v) {
			return false
		}
	}
	return true
}

func handleExamDraft(w http.ResponseWriter, r *http.Request) {
	if p, ok := profileOf(r); ok && profileReadonly(p) {
		http.Error(w, "perfil en solo-lectura (archivo ilegible o de una versión más nueva de la app) — no se puede guardar", http.StatusServiceUnavailable)
		return
	}
	profile, ok := profileOf(r)
	if !ok {
		badProfile(w)
		return
	}
	switch r.Method {
	case http.MethodDelete:
		handleExamDraftDelete(w, r, profile)
	case http.MethodPost:
		handleExamDraftPost(w, r, profile)
	default:
		http.Error(w, "solo POST o DELETE", http.StatusMethodNotAllowed)
	}
}

func handleExamDraftDelete(w http.ResponseWriter, r *http.Request, profile string) {
	setID := r.URL.Query().Get("setId")
	if !validExamSetID(setID) {
		http.Error(w, "identificador de examen inválido", http.StatusBadRequest)
		return
	}
	mu.Lock()
	defer mu.Unlock()
	st := loadProfile(profile)
	antes := states[profile]
	st = cloneState(st)
	states[profile] = st
	if st.ExamDrafts != nil {
		delete(st.ExamDrafts, setID)
	}
	if !saveOrFail(w, profile) {
		rollbackUnlessReplaced(profile, st, antes)
		return
	}
	writeRaw(w, stateJSON(estadoPublicado(profile, st), false))
}

func handleExamDraftPost(w http.ResponseWriter, r *http.Request, profile string) {
	if !jsonPost(w, r, examDraftMaxBody) {
		return
	}
	var req examDraftReq
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		var maxErr *http.MaxBytesError
		if errors.As(err, &maxErr) {
			http.Error(w, "el borrador es demasiado grande", http.StatusRequestEntityTooLarge)
			return
		}
		http.Error(w, "no pude leer el borrador", http.StatusBadRequest)
		return
	}
	if !validExamSetID(req.SetID) {
		http.Error(w, "identificador de examen inválido", http.StatusBadRequest)
		return
	}
	now := time.Now().Unix()
	if req.StartedAt <= 0 || now-req.StartedAt > examDraftMaxAgeSec {
		http.Error(w, "el borrador ha caducado o no tiene hora de inicio", http.StatusBadRequest)
		return
	}
	if req.StartedAt > now {
		req.StartedAt = now
	}
	if req.Idx < 0 || req.Idx > examDraftMaxIdx {
		http.Error(w, "paso del examen fuera de rango", http.StatusBadRequest)
		return
	}
	if req.Answers == nil {
		req.Answers = map[string]json.RawMessage{}
	}
	if !validDraftAnswers(req.Answers) {
		http.Error(w, "respuestas del borrador no válidas", http.StatusBadRequest)
		return
	}
	copied := make(map[string]json.RawMessage, len(req.Answers))
	for k, v := range req.Answers {
		copied[k] = copyRaw(v)
	}
	mu.Lock()
	defer mu.Unlock()
	st := loadProfile(profile)
	nDrafts := 0
	if st.ExamDrafts != nil {
		nDrafts = len(st.ExamDrafts)
	}
	if _, exists := st.ExamDrafts[req.SetID]; !exists && nDrafts >= examDraftMaxPerProfile {
		http.Error(w, "demasiados simulacros a medias", http.StatusBadRequest)
		return
	}
	antes := states[profile]
	st = cloneState(st)
	states[profile] = st
	if st.ExamDrafts == nil {
		st.ExamDrafts = map[string]*ExamDraft{}
	}
	st.ExamDrafts[req.SetID] = &ExamDraft{StartedAt: req.StartedAt, Idx: req.Idx, Answers: copied}
	if !saveOrFail(w, profile) {
		rollbackUnlessReplaced(profile, st, antes)
		return
	}
	writeRaw(w, stateJSON(estadoPublicado(profile, st), false))
}

func handleGetState(w http.ResponseWriter, r *http.Request) {
	profile, ok := profileOf(r)
	if !ok {
		badProfile(w)
		return
	}
	mu.Lock()
	defer mu.Unlock()
	st := loadProfile(profile)
	eff := *st
	if eff.StreakDays > 0 {
		today := time.Now().Format("2006-01-02")
		yesterday := time.Now().AddDate(0, 0, -1).Format("2006-01-02")
		if eff.LastActive != today && eff.LastActive != yesterday {
			eff.StreakDays = 0
		}
	}
	b := stateJSON(&eff, false)
	if bak := recoveredProfiles[profile]; bak != "" {
		var m map[string]json.RawMessage
		if json.Unmarshal(b, &m) == nil {
			note, _ := json.Marshal("Tu archivo de progreso estaba dañado y no se pudo leer. " +
				"Lo he apartado sin borrarlo (" + bak + ", en tu carpeta de datos) y he empezado " +
				"uno nuevo. Si tienes un respaldo, impórtalo desde el perfil.")
			m["recoveredNotice"] = note
			if nb, err := json.Marshal(m); err == nil {
				b = nb
			}
		}
	}
	writeRaw(w, b)
}

// lessonPassScore es el único corte de «lección hecha». El cliente no
// repite el número: lee `completed` en la respuesta. Si este corte se
// mueve, se mueve aquí; la pantalla no tiene otra cifra.
const lessonPassScore = 0.8

func handleLessonResult(w http.ResponseWriter, r *http.Request) {
	if p, ok := profileOf(r); ok && profileReadonly(p) {
		http.Error(w, "perfil en solo-lectura (archivo ilegible o de una versión más nueva de la app) — no se puede guardar", http.StatusServiceUnavailable)
		return
	}
	if !jsonPost(w, r, 256<<10) {
		return
	}
	var res lessonResult
	if err := json.NewDecoder(r.Body).Decode(&res); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if res.LessonID == "" || len(res.LessonID) > 64 || len(res.Items) > 200 || len(res.RequestID) > 128 {
		http.Error(w, "payload inválido", http.StatusBadRequest)
		return
	}
	for _, it := range res.Items {
		if it.ItemID == "" || len(it.ItemID) > 64 {
			http.Error(w, "payload inválido: identificador de ítem vacío o demasiado largo", http.StatusBadRequest)
			return
		}
		// Antes de crear la lección o mover tarjetas: un modo raro tira
		// el POST entero, también las filas buenas del mismo cuerpo.
		if !knownReviewMode(it.Mode) {
			http.Error(w, "payload inválido: modo desconocido", http.StatusBadRequest)
			return
		}
	}
	if res.Score < 0 {
		res.Score = 0
	} else if res.Score > 1 {
		res.Score = 1
	}
	now := time.Now()
	profile, ok := profileOf(r)
	if !ok {
		badProfile(w)
		return
	}
	// El JSON se arma con el candado tomado y se escribe fuera: una respuesta
	// lenta (el teléfono en la misma red) no debe frenar al resto de perfiles.
	// El 503 de saveOrFail sí sale dentro: es corto y ya lleva la respuesta.
	respuesta := func() []byte {
		mu.Lock()
		defer mu.Unlock()
		st := loadProfile(profile)

		if requestAlreadySeen(st, res.RequestID, now) {
			return stateJSON(st, false)
		}

		antes := states[profile]
		st = cloneState(st)
		states[profile] = st

		ls := st.Lessons[res.LessonID]
		if ls == nil {
			ls = &LessonStat{}
			st.Lessons[res.LessonID] = ls
		}
		ls.Attempts++
		ls.LastScore = res.Score
		if res.Score > ls.BestScore {
			ls.BestScore = res.Score
		}
		if res.Score >= lessonPassScore {
			ls.Completed = true
		}
		ls.LastAt = now

		gained := 0
		for _, ir := range res.Items {
			it := st.Items[ir.ItemID]
			if it == nil {
				it = &ItemStat{}
				st.Items[ir.ItemID] = it
			}
			applyReview(it, ir.Correct, ir.Mode, now)
			if ir.Correct {
				gained += 2
			}
		}
		const dailyXPCap = 500
		today := now.Format("2006-01-02")
		if st.XPDay != today {
			st.XPDay = today
			st.XPToday = 0
		}
		earn := gained + int(res.Score*20)
		if st.XPToday+earn > dailyXPCap {
			earn = dailyXPCap - st.XPToday
		}
		if earn > 0 {
			st.XP += earn
			st.XPToday += earn
		}
		touchStreak(st, now)
		// Dentro de la copia, antes de guardar: el id queda en el disco
		// solo si la lección también, y un fallo deshace los dos.
		noteSeenRequest(st, res.RequestID, now)
		if !saveOrFail(w, profile) {
			rollbackUnlessReplaced(profile, st, antes)
			return nil
		}
		return stateJSON(estadoPublicado(profile, st), false)
	}()
	if respuesta != nil {
		writeRaw(w, respuesta)
	}
}

func touchStreak(st *State, now time.Time) {
	today := now.Format("2006-01-02")
	if st.LastActive == today {
		return
	}
	yesterday := now.AddDate(0, 0, -1).Format("2006-01-02")
	if st.LastActive == yesterday {
		st.StreakDays++
	} else {
		st.StreakDays = 1
	}
	st.LastActive = today
}

// ---- Arranque: data dir, logging, single-instance ----

// setupLogging manda el log a archivo ADEMÁS de stderr: una .app/.exe de
// doble clic no tiene stderr, y "no pude guardar el perfil" tiene que quedar
// en algún sitio (B25). Rotación simple: >5MB al arrancar → .old.
func setupLogging(path string) {
	if fi, err := os.Stat(path); err == nil && fi.Size() > 5<<20 {
		_ = os.Rename(path, path+".old") // pisa el .old anterior
	}
	f, err := os.OpenFile(path, os.O_CREATE|os.O_APPEND|os.O_WRONLY, 0o644)
	if err != nil {
		log.Printf("sin log a archivo (%v): solo stderr", err)
		return
	}
	// OJO: io.MultiWriter aborta en el PRIMER error y NO escribe en los
	// siguientes. Una app GUI de Windows lanzada desde el Explorador no tiene
	// stderr válido, así que el MultiWriter fallaba en os.Stderr y el archivo
	// —el único diagnóstico posible en esa plataforma— quedaba VACÍO.
	// Con este writer, un stderr roto no se lleva por delante el log.
	log.SetOutput(io.MultiWriter(quietWriter{os.Stderr}, f))
}

// quietWriter se traga los errores de su destino: sirve para meter un stderr
// que puede no existir dentro de un MultiWriter sin envenenarlo.
type quietWriter struct{ w io.Writer }

func (q quietWriter) Write(p []byte) (int, error) {
	_, _ = q.w.Write(p)
	return len(p), nil // siempre "correcto": el siguiente writer sigue vivo
}

// migrateLegacyProfiles copia (NO mueve: conservador) los perfiles que vivían
// junto al ejecutable al data dir nuevo, una sola vez, y deja un marcador.
func migrateLegacyProfiles(legacyDir string) {
	if filepath.Clean(legacyDir) == filepath.Clean(dataDir) {
		return
	}
	entries, err := os.ReadDir(legacyDir)
	if err != nil {
		return // no hay layout viejo: nada que migrar
	}
	copied := 0
	for _, e := range entries {
		n := e.Name()
		if !strings.HasSuffix(n, ".json") {
			continue
		}
		b, err := os.ReadFile(filepath.Join(legacyDir, n))
		if err != nil {
			log.Printf("migración: no pude leer %s: %v", n, err)
			continue
		}
		if err := os.WriteFile(filepath.Join(dataDir, n), b, 0o644); err != nil {
			log.Printf("migración: no pude copiar %s: %v", n, err)
			continue
		}
		copied++
	}
	if copied > 0 {
		marker := fmt.Sprintf("Perfiles copiados de %s el %s (los originales siguen allí, sin tocar).\n",
			legacyDir, time.Now().Format(time.RFC3339))
		_ = os.WriteFile(filepath.Join(dataDir, "migrated-from.txt"), []byte(marker), 0o644)
		log.Printf("migración one-shot: %d perfil(es) copiados de %s a %s", copied, legacyDir, dataDir)
	}
}

// migrateProfileNamesToLower pasa Ana.json a ana.json. profileOf busca el
// nombre ya en minúsculas: si el archivo no baja, en Linux ese perfil no se
// vuelve a abrir. El rename va en dos pasos porque en APFS un cambio de
// solo-caso a veces no se aplica. Si el destino existe y no es el mismo
// archivo, no se toca: en un disco que distingue mayúsculas serían dos
// perfiles, y pisar uno borra su historial. Se anota y se sigue.
func migrateProfileNamesToLower(dir string) {
	entries, err := os.ReadDir(dir)
	if err != nil {
		return
	}
	for _, e := range entries {
		n := e.Name()
		if !strings.HasSuffix(n, ".json") || n == strings.ToLower(n) {
			continue
		}
		src := filepath.Join(dir, n)
		lowerName := strings.ToLower(n)
		lower := filepath.Join(dir, lowerName)
		fiSrc, errSrc := os.Stat(src)
		fiDst, errDst := os.Stat(lower)
		if errSrc == nil && errDst == nil && !os.SameFile(fiSrc, fiDst) {
			log.Printf("perfil %s no se pasa a minúsculas: %s ya existe y es otro archivo", n, lowerName)
			continue
		}
		// dos pasos: en FS case-insensitive (APFS) un rename directo de solo-caso
		// puede no aplicarse; vía nombre temporal funciona en todos
		tmp := src + ".casemig"
		if err := os.Rename(src, tmp); err == nil {
			if err := os.Rename(tmp, lower); err == nil {
				log.Printf("perfil migrado a minúsculas: %s → %s", n, lowerName)
			} else {
				_ = os.Rename(tmp, src) // revertir
			}
		}
	}
}

// acquireLock impone una sola instancia: dos backends cacheando states sobre
// los mismos archivos harían last-writer-wins con el progreso (B14).
// lockHeartbeat refresca el mtime cada 2 min. Ese reloj solo desambigua un
// PID reciclado: si el proceso sigue siendo este binario —el portátil durmió
// y el latido no pudo correr—, el lock se respeta aunque el archivo esté viejo.
func lockHeartbeat(path string) {
	t := time.NewTicker(2 * time.Minute)
	defer t.Stop()
	for range t.C {
		now := time.Now()
		if err := os.Chtimes(path, now, now); err != nil {
			log.Printf("heartbeat del lock: %v", err)
			return
		}
	}
}

// readLock devuelve el PID y el puerto anotados en el lockfile. El formato es
// "<pid>" (versiones anteriores) o "<pid> <puerto>" (desde v1.3.1).
func readLock(path string) (pid int, port string) {
	b, err := os.ReadFile(path)
	if err != nil {
		return 0, ""
	}
	parts := strings.Fields(string(b))
	if len(parts) > 0 {
		pid, _ = strconv.Atoi(parts[0])
	}
	if len(parts) > 1 {
		port = parts[1]
	}
	return pid, port
}

// writeLockPort anota el puerto realmente ligado, para que un segundo arranque
// sepa a dónde llevar al usuario.
func writeLockPort(path, port string) {
	_ = os.WriteFile(path, []byte(fmt.Sprintf("%d %s", os.Getpid(), port)), 0o644)
}

func acquireLock() string {
	path := filepath.Join(dataDir, ".lock")
	for range 2 {
		f, err := os.OpenFile(path, os.O_CREATE|os.O_EXCL|os.O_WRONLY, 0o644)
		if err == nil {
			fmt.Fprintf(f, "%d", os.Getpid())
			f.Close()
			return path
		}
		if !os.IsExist(err) {
			fatalf("No pude crear el archivo de bloqueo en %s.\n\n%v", path, err)
		}
		pid, port := readLock(path)
		if pid != 0 && lockHolderAlive(pid, path) {
			// SEGUNDO ARRANQUE con la app ya viva. Antes esto era una muerte
			// silenciosa: el usuario cerraba la pestaña (lo normal), volvía a
			// abrir Seshat y NO PASABA NADA, nunca más. Ahora el segundo clic
			// significa "tráeme la pestaña de vuelta", que es lo que quería.
			if port == "" {
				port = "8787"
			}
			log.Printf("Seshat ya está abierta (PID %d, puerto %s): traigo su pestaña", pid, port)
			if os.Getenv("SESHAT_NO_BROWSER") == "" {
				openBrowser("http://localhost:" + port)
			}
			os.Exit(0)
		}
		// lock huérfano de un proceso muerto: robarlo
		log.Printf("lockfile huérfano (PID %d ya no vive): lo reclamo", pid)
		_ = os.Remove(path)
	}
	fatalf("No pude reservar el archivo de bloqueo en %s.", path)
	return ""
}

// cleanupDataDir borra *.tmp huérfanos de escrituras interrumpidas y resuelve
// imports a medias: un .json.new sin .json se promociona (completa el import
// interrumpido); con .json presente, se descarta.
func cleanupDataDir() {
	// B7: los .bak de corruptos/resets/imports se acumulan para siempre —
	// conservar solo los 5 más recientes por perfil
	if entries, err := os.ReadDir(dataDir); err == nil {
		byProfile := map[string][]string{}
		for _, e := range entries {
			name := e.Name()
			if e.IsDir() || !strings.Contains(name, ".bak") {
				continue
			}
			prefix := strings.SplitN(name, ".", 2)[0]
			byProfile[prefix] = append(byProfile[prefix], name)
		}
		for _, baks := range byProfile {
			if len(baks) <= 5 {
				continue
			}
			sort.Strings(baks) // los timestamps del nombre ordenan cronológicamente
			for _, old := range baks[:len(baks)-5] {
				if err := os.Remove(filepath.Join(dataDir, old)); err == nil {
					log.Printf("retención: %s eliminado (se conservan 5 .bak por perfil)", old)
				}
			}
		}
	}

	entries, err := os.ReadDir(dataDir)
	if err != nil {
		return
	}
	for _, e := range entries {
		n := e.Name()
		full := filepath.Join(dataDir, n)
		switch {
		case strings.HasSuffix(n, ".tmp"):
			_ = os.Remove(full)
			log.Printf("limpieza: borrado tmp huérfano %s", n)
		case strings.HasSuffix(n, ".json.new"):
			final := filepath.Join(dataDir, strings.TrimSuffix(n, ".new"))
			if _, err := os.Stat(final); os.IsNotExist(err) {
				if os.Rename(full, final) == nil {
					log.Printf("limpieza: import interrumpido completado (%s)", n)
				}
			} else {
				_ = os.Remove(full)
				log.Printf("limpieza: borrado import huérfano %s", n)
			}
		}
	}
}

var boundPort string

// listenWithFallback intenta el puerto pedido y hasta 12 siguientes — un
// puerto ocupado jamás debe ser una muerte sin mensaje (AP16).
func listenWithFallback(port string) (net.Listener, string, error) {
	p, err := strconv.Atoi(port)
	if err != nil {
		p = 8787
	}
	var lastErr error
	for i := 0; i < 13; i++ {
		candidate := strconv.Itoa(p + i)
		ln, err := net.Listen("tcp", ":"+candidate)
		if err == nil {
			return ln, candidate, nil
		}
		lastErr = err
	}
	return nil, "", lastErr
}

// dueHandler: los ítems que tocan repasar. Extraído del cierre anónimo para
// que se pueda probar de punta a punta — el auditor tenía razón en que ni un
// test tocaba un handler completo, y este es justo el que se colgaba con un
// `null` en el perfil.
func dueHandler(w http.ResponseWriter, r *http.Request) {
	now := time.Now()
	profile, ok := profileOf(r)
	if !ok {
		badProfile(w)
		return
	}
	mu.Lock()
	defer mu.Unlock()
	st := loadProfile(profile)
	type due struct {
		ItemID  string  `json:"itemId"`
		Streak  int     `json:"streak"`
		Overdue float64 `json:"overdueDays"`
	}
	var out []due
	for id, it := range st.Items {
		// un `null` en el JSON del perfil daba `it == nil` y reventaba aquí:
		// el pánico dejaba el mutex global cerrado y la app entera colgada
		if it == nil {
			continue
		}
		if !it.NextReview.After(now) {
			out = append(out, due{id, it.Streak, now.Sub(it.NextReview).Hours() / 24})
		}
	}
	sort.Slice(out, func(i, j int) bool { return out[i].Overdue > out[j].Overdue })
	if out == nil {
		out = []due{}
	}
	b, _ := json.Marshal(out)
	writeRaw(w, b)
}

func handleExport(w http.ResponseWriter, r *http.Request) {
	profile, ok := profileOf(r)
	if !ok {
		badProfile(w)
		return
	}
	mu.Lock()
	defer mu.Unlock()
	st := loadProfile(profile)
	b := stateJSON(st, true)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Content-Disposition",
		`attachment; filename="perfil-`+profile+`-`+time.Now().Format("2006-01-02")+`.json"`)
	w.Write(b)
}

func handleImport(w http.ResponseWriter, r *http.Request) {
	if p, ok := profileOf(r); ok && profileReadonly(p) {
		http.Error(w, "perfil en solo-lectura (archivo ilegible o de una versión más nueva de la app) — no se puede guardar", http.StatusServiceUnavailable)
		return
	}
	if !jsonPost(w, r, 4<<20) {
		return
	}
	profile, ok := profileOf(r)
	if !ok {
		badProfile(w)
		return
	}
	raw, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "no pude leer el archivo: "+err.Error(), http.StatusBadRequest)
		return
	}
	var incoming State
	if err := decodeState(raw, &incoming); err != nil {
		http.Error(w, "el archivo no es un respaldo válido de esta app: "+err.Error(), http.StatusBadRequest)
		return
	}
	if incoming.SchemaVersion > currentSchema {
		http.Error(w, "este respaldo es de una versión más nueva de la app: actualízala antes de importar", http.StatusBadRequest)
		return
	}
	migrateState(&incoming)
	if incoming.Lessons == nil || incoming.Items == nil {
		http.Error(w, "respaldo incompleto: faltan lessons/items", http.StatusBadRequest)
		return
	}
	if incoming.XP < 0 || incoming.XP > 10_000_000 || incoming.StreakDays < 0 || incoming.StreakDays > 36500 ||
		incoming.XPToday < 0 || len(incoming.Lessons) > 5000 || len(incoming.Items) > 20000 {
		http.Error(w, "respaldo fuera de rango", http.StatusBadRequest)
		return
	}
	if len(incoming.Avatar) > 32 {
		incoming.Avatar = ""
	}
	if len(incoming.Color) > 16 {
		incoming.Color = ""
	}
	for id, ls := range incoming.Lessons {
		if len(id) > 64 || ls == nil || ls.BestScore < 0 || ls.BestScore > 1 {
			http.Error(w, "respaldo con lecciones inválidas", http.StatusBadRequest)
			return
		}
	}
	for id, it := range incoming.Items {
		if len(id) > 64 || it == nil || it.Interval < 0 {
			http.Error(w, "respaldo con ítems inválidos", http.StatusBadRequest)
			return
		}
	}
	// Un respaldo puede traer miles de ids viejos. Se recortan antes de
	// pisar el perfil, con las mismas reglas que un envío en vivo.
	pruneSeenRequests(&incoming, time.Now())
	final := profilePath(profile)
	mu.Lock()
	defer mu.Unlock()
	nb := stateJSON(&incoming, true)
	tmp := final + ".tmp"
	f, ferr := os.Create(tmp)
	if ferr != nil {
		http.Error(w, "no pude escribir el perfil nuevo; import cancelado", http.StatusInternalServerError)
		return
	}
	_, werr := f.Write(nb)
	serr := f.Sync()
	cerr := f.Close()
	if werr != nil || serr != nil || cerr != nil {
		_ = os.Remove(tmp)
		http.Error(w, "no pude escribir el perfil nuevo; import cancelado", http.StatusInternalServerError)
		return
	}
	prov := final + ".new"
	if err := os.Rename(tmp, prov); err != nil {
		_ = os.Remove(tmp)
		http.Error(w, "no pude preparar el perfil nuevo; import cancelado", http.StatusInternalServerError)
		return
	}
	if _, err := os.Stat(final); err == nil {
		bak := final + "." + time.Now().Format("20060102-150405") + ".preimport.bak"
		if err := os.Rename(final, bak); err != nil {
			_ = os.Remove(prov)
			http.Error(w, "no pude respaldar el perfil actual; import cancelado", http.StatusInternalServerError)
			return
		}
		if err := os.Rename(prov, final); err != nil {
			_ = os.Rename(bak, final)
			_ = os.Remove(prov)
			http.Error(w, "no pude activar el perfil nuevo; import cancelado", http.StatusInternalServerError)
			return
		}
	} else if err := os.Rename(prov, final); err != nil {
		_ = os.Remove(prov)
		http.Error(w, "no pude activar el perfil nuevo; import cancelado", http.StatusInternalServerError)
		return
	}
	states[profile] = &incoming
	writeRaw(w, stateJSON(&incoming, false))
}

func versionMap() map[string]any {
	out := map[string]any{"app": version, "engine": version, "content": contentVersion, "drop": contentVersion, "manifest": manifest}
	if up := activeUpdate(); up != nil {
		out["app"] = up.Version
		out["pack"] = up.Version
		out["packTitle"] = up.Title
		out["packAppliedAt"] = up.AppliedAt
		if up.Drop > 0 {
			out["content"] = strconv.Itoa(up.Drop)
			out["drop"] = strconv.Itoa(up.Drop)
		}
	}
	return out
}

func main() {
	dataDirFlag := flag.String("data-dir", "", "directorio de perfiles (default: <config del usuario>/Seshat/profiles)")
	showVersion := flag.Bool("version", false, "imprime la versión y sale")
	flag.Parse()
	if *showVersion {
		fmt.Printf("seshat %s (contenido %s)\n", version, contentVersion)
		return
	}

	exe, _ := os.Executable()
	base := filepath.Dir(exe)
	// con `go run` el ejecutable vive en un tmp: usa el cwd en ese caso
	if strings.Contains(base, "go-build") {
		base, _ = os.Getwd()
	}
	legacyDir := filepath.Join(base, "profiles")

	if *dataDirFlag != "" {
		if abs, err := filepath.Abs(*dataDirFlag); err == nil {
			dataDir = abs
		} else {
			dataDir = *dataDirFlag
		}
	} else {
		// FUERA del directorio de la app: un update jamás debe pisar meses de
		// progreso, y en Program Files / .app firmado ni siquiera se puede
		// escribir (B16/D2)
		cfg, err := os.UserConfigDir()
		if err != nil {
			fatalf("No encuentro tu carpeta de configuración, así que no sabría dónde guardar tu progreso.\n\n%v", err)
		}
		dataDir = filepath.Join(cfg, "Seshat", "profiles")
	}

	// ¿existía ya el data dir? — decide la migración one-shot de más abajo
	_, statErr := os.Stat(dataDir)
	dataDirExisted := statErr == nil

	// el padre debe existir antes de abrir el log (vive en <dataDir>/..)
	if err := os.MkdirAll(filepath.Dir(dataDir), 0o755); err != nil {
		fatalf("No pude crear la carpeta %s.\n\nSin ella no hay dónde guardar tu progreso. Si tu equipo es del trabajo, puede que una política lo impida.\n\n%v", filepath.Dir(dataDir), err)
	}
	setupLogging(filepath.Join(filepath.Dir(dataDir), "seshat.log"))

	// este error IBA descartado: en Program Files fallaba en silencio y toda
	// la sesión vivía solo en memoria (el bug nº1 del empaquetado, B16)
	if err := os.MkdirAll(dataDir, 0o755); err != nil {
		fatalf("No pude crear la carpeta de perfiles %s.\n\nSin ella tu progreso no se guardaría.\n\n%v", dataDir, err)
	}

	if !dataDirExisted {
		migrateLegacyProfiles(legacyDir)
	}

	lockPath := acquireLock()
	go lockHeartbeat(lockPath)
	cleanupDataDir()

	// migración: perfiles con mayúsculas → minúsculas (el case-folding de
	// profileOf los buscaría en minúsculas; en Linux serían huérfanos)
	migrateProfileNamesToLower(dataDir)

	// migración: progress.json antiguo → profiles/default.json
	oldPath := filepath.Join(base, "progress.json")
	if _, err := os.Stat(oldPath); err == nil {
		if _, err := os.Stat(profilePath("default")); os.IsNotExist(err) {
			// copia byte a byte (Rename cruzaría directorios/volúmenes) y con
			// el error a la cara — jamás log de éxito incondicional
			if b, rerr := os.ReadFile(oldPath); rerr != nil {
				log.Printf("migración de progress.json: no pude leerlo: %v", rerr)
			} else if werr := os.WriteFile(profilePath("default"), b, 0o644); werr != nil {
				log.Printf("migración de progress.json: no pude copiarlo: %v", werr)
			} else {
				log.Println("progreso antiguo copiado a profiles/default.json (el original queda intacto)")
			}
		}
	}

	// health y version SIN lock a propósito: el health-check del instalador o
	// del updater debe responder aunque un handler tenga el mutex ocupado (B24)
	http.HandleFunc("/api/health", cors(func(w http.ResponseWriter, _ *http.Request) {
		writeJSON(w, map[string]any{"ok": true})
	}))
	http.HandleFunc("/api/version", cors(func(w http.ResponseWriter, _ *http.Request) {
		writeJSON(w, versionMap())
	}))

	http.HandleFunc("/api/profiles", cors(func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			mu.Lock()
			// defer: si algo revienta aquí dentro (un nil, un índice), net/http se come
			// el pánico pero el mutex GLOBAL se quedaba cerrado y la app entera colgada,
			// con /api/health respondiendo que todo iba bien. Nunca más a mano.
			defer mu.Unlock()
			b, _ := json.Marshal(listProfiles())
			writeRaw(w, b)
		case http.MethodPost:
			if ct := r.Header.Get("Content-Type"); !strings.HasPrefix(ct, "application/json") {
				http.Error(w, "Content-Type debe ser application/json", http.StatusUnsupportedMediaType)
				return
			}
			r.Body = http.MaxBytesReader(w, r.Body, 4<<10)
			var body struct {
				Name string `json:"name"`
			}
			if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
				http.Error(w, "nombre inválido (letras, números, - y _, máx 24)", http.StatusBadRequest)
				return
			}
			name, ok := normalizeProfile(body.Name)
			if !ok {
				http.Error(w, "nombre inválido o reservado (letras, números, - y _, máx 24)", http.StatusBadRequest)
				return
			}
			mu.Lock()
			defer mu.Unlock()
			loadProfile(name)
			if !saveOrFail(w, name) {
				return
			}
			b, _ := json.Marshal(listProfiles())
			writeRaw(w, b)
		default:
			http.Error(w, "GET o POST", http.StatusMethodNotAllowed)
		}
	}))

	http.HandleFunc("/api/state", cors(handleGetState))

	http.HandleFunc("/api/lesson-result", cors(handleLessonResult))

	// Dónde colocó la prueba de nivel al alumno, por idioma (PLAN 1.9.8 §1.3)
	http.HandleFunc("/api/placement", cors(handlePlacement))
	http.HandleFunc("/api/exam-draft", cors(handleExamDraft))

	// Ítems pendientes de repaso, más vencidos primero
	http.HandleFunc("/api/due", cors(dueHandler))

	http.HandleFunc("/api/reset", cors(func(w http.ResponseWriter, r *http.Request) {
		if p, ok := profileOf(r); ok && profileReadonly(p) {
			http.Error(w, "perfil en solo-lectura (archivo ilegible o de una versión más nueva de la app) — no se puede guardar", http.StatusServiceUnavailable)
			return
		}
		if r.Method != http.MethodDelete {
			http.Error(w, "DELETE only", http.StatusMethodNotAllowed)
			return
		}
		profile, ok := profileOf(r)
		if !ok {
			badProfile(w)
			return
		}
		mu.Lock()
		defer mu.Unlock()
		// el reset aparta el archivo actual: recuperable a mano si fue un error
		if _, err := os.Stat(profilePath(profile)); err == nil {
			bak := profilePath(profile) + "." + time.Now().Format("20060102-150405") + ".reset.bak"
			if err := os.Rename(profilePath(profile), bak); err != nil {
				// Sin respaldo NO se borra: antes se seguía adelante y el disco
				// quedaba con el progreso viejo y la memoria en cero — al
				// primer guardado posterior, ese cero se escribía encima y ya
				// no había copia de nada.
				log.Printf("reset %s: no se pudo respaldar (%v) — se cancela el borrado", profile, err)
				http.Error(w,
					"no se pudo guardar la copia de seguridad antes de borrar ("+err.Error()+"), "+
						"así que NO se ha borrado nada. Revisa el espacio y los permisos de la carpeta de datos.",
					http.StatusServiceUnavailable)
				return
			}
		}
		states[profile] = newState()
		if !saveOrFail(w, profile) {
			return
		}
		b := stateJSON(states[profile], false)
		writeRaw(w, b)
	}))

	// personalización del perfil (avatar + color)
	http.HandleFunc("/api/avatar", cors(handleAvatar))

	http.HandleFunc("/api/export", cors(handleExport))
	http.HandleFunc("/api/import", cors(handleImport))

	// "Salir de Seshat" desde la propia app: en Windows el proceso es GUI
	// (sin consola) y esta es la única forma de cerrarlo con dignidad
	http.HandleFunc("/api/quit", cors(handleQuit))

	// N15: latido de la app abierta. El apagado por inactividad se apoya en
	// CUALQUIER petición, pero el frontend puede llamar aquí cada 30 s para que
	// una sesión de lectura larga (sin tocar nada) no cuente como abandono.
	http.HandleFunc("/api/ping", cors(handlePing))

	// Actualizaciones incrementales: un paquete de contenido se instala desde la
	// propia app (ver update.go), sin descargar el motor entero otra vez.
	http.HandleFunc("/api/update/state", cors(handleUpdateState))
	http.HandleFunc("/api/update/apply", cors(handleUpdateApply))
	http.HandleFunc("/api/update/rollback", cors(handleUpdateRollback))

	// pantalla "En tu teléfono" (AP15): IPs privadas + puerto real
	http.HandleFunc("/api/lan-info", cors(func(w http.ResponseWriter, r *http.Request) {
		// la llave solo se entrega a quien ya está dentro: desde este equipo
		// (que es quien enseña el QR) o desde un móvil ya emparejado
		// `addrs` trae la interfaz de cada dirección para que la pantalla del
		// teléfono pueda decir cuál es el wifi y cuál un puente de Docker;
		// `ips` se mantiene por compatibilidad con versiones anteriores de la UI.
		writeJSON(w, map[string]any{"ips": lanIPs(), "addrs": lanAddrs(), "port": boundPort, "key": lanKey()})
	}))

	hasUI := registerWebApp()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8787"
	}
	// puerto ocupado ≠ muerte silenciosa (AP16): probar los siguientes
	ln, chosen, err := listenWithFallback(port)
	if err != nil {
		_ = os.Remove(lockPath)
		fatalf("No encontré ningún puerto libre a partir del %s.\n\nOtra aplicación los está usando. Cierra lo que tengas abierto e inténtalo de nuevo.\n\n%v", port, err)
	}
	boundPort = chosen
	writeLockPort(lockPath, chosen) // que un segundo arranque sepa a dónde ir
	srv := &http.Server{
		ReadHeaderTimeout: 10 * time.Second, // anti-slowloris desde la LAN (B13)
	}
	go func() {
		what := "backend"
		if hasUI {
			what = "app completa (UI + API)"
		}
		log.Printf("Seshat %s: %s (contenido %s) en http://0.0.0.0:%s — datos en %s", version, what, contentVersion, chosen, dataDir)
		if err := srv.Serve(ln); err != nil && !errors.Is(err, http.ErrServerClosed) {
			_ = os.Remove(lockPath)
			fatalf("El servidor de Seshat se detuvo por un error.\n\n%v", err)
		}
	}()

	// COMPORTAMIENTO DE APP: abrir el navegador en la app recién levantada.
	// Se salta con SESHAT_NO_BROWSER=1 (desarrollo, servidores, tests).
	if os.Getenv("SESHAT_NO_BROWSER") == "" {
		go func() {
			time.Sleep(300 * time.Millisecond) // que el listener esté servido
			openBrowser(fmt.Sprintf("http://localhost:%s", chosen))
		}()
	}

	// N15: a partir de aquí ya hay servidor; el reloj de inactividad empieza.
	startIdleWatchdog()

	// Parada limpia por SIGINT/SIGTERM (contrato del instalador, B13) o
	// porque el usuario le dio a "Salir" dentro de la app.
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)
	select {
	case <-stop:
	case <-quitRequested:
		// el motivo concreto (Salir, inactividad) ya lo dejó dicho requestQuit
	}
	log.Println("apagando limpio")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Printf("shutdown: %v", err)
	}
	_ = os.Remove(lockPath)
}
