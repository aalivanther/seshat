package main

import (
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"sync/atomic"
	"testing"
	"time"
)

// UN `null` EN EL PERFIL NO PUEDE CONGELAR LA APP.
//
// Un respaldo editado a mano o un guardado a medias mete `"items":{"x":null}`.
// Antes: /api/due desreferenciaba el nil, net/http se comía el pánico… y el
// mutex global quedaba cerrado para siempre, con la app entera colgada y
// /api/health respondiendo que todo iba bien.
func TestNullItemDoesNotFreezeTheApp(t *testing.T) {
	dataDir = t.TempDir()
	states = map[string]*State{}
	readonlyProfiles = map[string]bool{}
	if err := os.WriteFile(filepath.Join(dataDir, "roto.json"),
		[]byte(`{"schemaVersion":2,"lessons":{"a":null},"items":{"b1m1laerm":null},"xp":7}`), 0o600); err != nil {
		t.Fatal(err)
	}

	mu.Lock()
	st := loadProfile("roto")
	mu.Unlock()
	if len(st.Items) != 0 || len(st.Lessons) != 0 {
		t.Fatalf("los nulos deberían limpiarse al cargar: items=%d lessons=%d", len(st.Items), len(st.Lessons))
	}
	if st.XP != 7 {
		t.Fatalf("el resto del perfil debe sobrevivir: xp=%d", st.XP)
	}

	// y el candado tiene que seguir libre: lo comprobamos con un límite de tiempo
	done := make(chan bool, 1)
	go func() {
		mu.Lock()
		mu.Unlock()
		done <- true
	}()
	select {
	case <-done:
	case <-time.After(2 * time.Second):
		t.Fatal("el mutex global quedó bloqueado: la app estaría colgada")
	}
}

// Un perfil con nulos que ADEMÁS necesita migración de alias: la fusión no
// puede propagar el nil a la tarjeta nueva.
func TestMigrationDropsNullCards(t *testing.T) {
	st := newState()
	st.SchemaVersion = 1
	st.Items["b1laerm"] = nil
	migrateState(st)
	if _, ok := st.Items["b1m1laerm"]; ok {
		t.Fatal("un null no es progreso: no debe viajar a la tarjeta nueva")
	}
}

// /api/due sobre un perfil ya cargado con basura no puede reventar.
func TestDueSurvivesNullItem(t *testing.T) {
	dataDir = t.TempDir()
	states = map[string]*State{}
	readonlyProfiles = map[string]bool{}
	st := newState()
	st.Items["ok"] = &ItemStat{Streak: 2, NextReview: time.Now().Add(-time.Hour)}
	st.Items["roto"] = nil
	states["default"] = st

	r := httptest.NewRequest(http.MethodGet, "/api/due", nil)
	r.RemoteAddr = "127.0.0.1:5000"
	w := httptest.NewRecorder()
	dueHandler(w, r)
	if w.Code != http.StatusOK {
		t.Fatalf("esperaba 200, salió %d", w.Code)
	}
	var out []map[string]any
	if err := json.Unmarshal(w.Body.Bytes(), &out); err != nil {
		t.Fatalf("respuesta ilegible: %v", err)
	}
	if len(out) != 1 {
		t.Fatalf("esperaba 1 ítem vencido (el nulo se ignora), salieron %d", len(out))
	}
}

// EL DISCO LLENO NO PUEDE RESPONDER «GUARDADO».
//
// Es el fallo más probable en casa de un cliente (carpeta sin permisos, disco
// lleno) y antes devolvía 200 con el estado en memoria: el alumno seguía
// estudiando encima de algo que no se guardaba.
func TestSaveFailureIsReported(t *testing.T) {
	dir := t.TempDir()
	dataDir = dir
	states = map[string]*State{}
	readonlyProfiles = map[string]bool{}
	states["default"] = newState()

	if err := os.Chmod(dir, 0o555); err != nil { // solo lectura
		t.Skip("no se puede quitar el permiso de escritura en este sistema")
	}
	defer os.Chmod(dir, 0o755)

	if err := saveProfile("default"); err == nil {
		t.Fatal("guardar en una carpeta sin permiso de escritura debe devolver error")
	}
	w := httptest.NewRecorder()
	if saveOrFail(w, "default") {
		t.Fatal("saveOrFail debería haber fallado")
	}
	if w.Code != http.StatusServiceUnavailable {
		t.Fatalf("esperaba 503 (no se pudo guardar), salió %d", w.Code)
	}
}

// UN GUARDADO FALLIDO NO PUEDE DEJAR EL PROGRESO A MEDIAS.
//
// El escenario que juntaba dos arreglos de la v1.4 y salía peor: el estado se
// mutaba en memoria, el guardado fallaba (disco lleno) y el requestId no
// quedaba en el perfil —solo queda en la copia si el guardado triunfa—, así
// que los tres reintentos re-aplicaban todo: intentos ×3 y SRS corrompido.
// El rollback tiene que devolver el estado de antes, ids incluidos.
func TestFalloDeDiscoNoDejaProgresoAMedias(t *testing.T) {
	dir := t.TempDir()
	dataDir = dir
	states = map[string]*State{}
	readonlyProfiles = map[string]bool{}

	st := newState()
	st.Lessons["l1"] = &LessonStat{Attempts: 1, BestScore: 0.5}
	st.XP = 100
	states["default"] = st

	// simular el fallo de guardado: carpeta sin permiso de escritura
	if err := os.Chmod(dir, 0o555); err != nil {
		t.Skip("no se puede quitar el permiso de escritura aquí")
	}
	defer os.Chmod(dir, 0o755)

	before := *states["default"].Lessons["l1"]
	beforeXP := states["default"].XP

	// lo que hace el handler: copiar, mutar, intentar guardar, y al fallar volver
	antes := states["default"]
	cp := cloneState(antes)
	states["default"] = cp
	cp.Lessons["l1"].Attempts += 3
	cp.XP += 50
	if err := saveProfile("default"); err == nil {
		t.Skip("el guardado no falló: el sistema permite escribir igualmente")
	}
	states["default"] = antes // el rollback del handler

	if got := *states["default"].Lessons["l1"]; got != before {
		t.Fatalf("la lección quedó mutada pese al fallo: %+v vs %+v", got, before)
	}
	if states["default"].XP != beforeXP {
		t.Fatalf("el XP quedó mutado pese al fallo: %d vs %d", states["default"].XP, beforeXP)
	}
}

// La copia tiene que ser PROFUNDA: si comparte punteros, el rollback no sirve.
func TestCloneStateEsProfundo(t *testing.T) {
	st := newState()
	st.Lessons["l"] = &LessonStat{Attempts: 1}
	st.Items["i"] = &ItemStat{Correct: 1, Streak: 2}
	st.SeenRequests = []SeenRequest{{ID: "req-1", At: time.Unix(1_700_000_000, 0).UTC()}}
	cp := cloneState(st)
	cp.Lessons["l"].Attempts = 99
	cp.Items["i"].Correct = 99
	cp.XP = 500
	cp.SeenRequests[0].ID = "otro"
	cp.SeenRequests = append(cp.SeenRequests, SeenRequest{ID: "req-2"})
	if st.Lessons["l"].Attempts != 1 || st.Items["i"].Correct != 1 || st.XP != 0 {
		t.Fatal("la copia comparte memoria con el original: el rollback no funcionaría")
	}
	if len(st.SeenRequests) != 1 || st.SeenRequests[0].ID != "req-1" {
		t.Fatal("la copia comparte el registro de requestId: un fallo de disco marcaría el envío como hecho")
	}
}

// El reintento del rename (antivirus en Windows) no puede dormir con el
// candado de todos los perfiles: el otro aparato, en la misma red, guarda
// el suyo mientras este espera.
func TestReintentoDeRenameSueltaElCandado(t *testing.T) {
	dataDir = t.TempDir()
	states = map[string]*State{}
	readonlyProfiles = map[string]bool{}

	lento := newState()
	lento.XP = 1
	states["lento"] = lento
	// Un directorio en el sitio del perfil: el rename falla las tres veces
	// y el guardado llega a las esperas de 25 y 75 ms.
	if err := os.Mkdir(profilePath("lento"), 0o755); err != nil {
		t.Fatal(err)
	}

	var stop atomic.Bool
	type resultado struct {
		err error
		xp  int
	}
	hecho := make(chan resultado, 1)
	mu.Lock()
	defer mu.Unlock()
	defer func() { stop.Store(true) }()
	go func() {
		mu.Lock()
		defer mu.Unlock()
		if stop.Load() {
			return
		}
		otro := newState()
		otro.XP = 7
		states["otro"] = otro
		err := saveProfile("otro")
		xp := 0
		if b, rerr := os.ReadFile(profilePath("otro")); rerr == nil {
			var st State
			if json.Unmarshal(b, &st) == nil {
				xp = st.XP
			}
		}
		hecho <- resultado{err, xp}
	}()
	// Que el otro goroutine llegue a bloquearse en el candado antes de
	// que el reintento lo suelte. Si no, un guardado rápido no prueba nada.
	time.Sleep(20 * time.Millisecond)
	err := saveProfile("lento")
	select {
	case got := <-hecho:
		if got.err != nil || got.xp != 7 {
			t.Fatalf("el otro perfil debía guardarse durante la espera: err=%v xp=%d", got.err, got.xp)
		}
	default:
		t.Fatal("el reintento no soltó el candado: el otro perfil siguió esperando")
	}
	if err == nil || errors.Is(err, errEstadoSustituido) {
		t.Fatalf("lento debía agotar el rename, no %v", err)
	}
	info, statErr := os.Stat(profilePath("lento"))
	if statErr != nil || !info.IsDir() {
		t.Fatal("los reintentos no deben convertir el directorio del perfil en un archivo")
	}
}

// Si durante la espera otro guardado publica su *State, la foto vieja no
// se renombra encima. Tampoco es un 503: el cliente reintentaría la lección.
func TestReintentoNoPisaPerfilSiElEstadoCambio(t *testing.T) {
	dataDir = t.TempDir()
	states = map[string]*State{}
	readonlyProfiles = map[string]bool{}

	viejo := newState()
	viejo.XP = 1
	states["default"] = viejo
	if err := os.Mkdir(profilePath("default"), 0o755); err != nil {
		t.Fatal(err)
	}
	nuevo := newState()
	nuevo.XP = 99
	marcador := []byte("MARCADOR-PERFIL")

	var stop atomic.Bool
	entro := make(chan error, 1)
	mu.Lock()
	defer mu.Unlock()
	defer func() { stop.Store(true) }()
	go func() {
		mu.Lock()
		defer mu.Unlock()
		if stop.Load() {
			return
		}
		states["default"] = nuevo
		if err := os.Remove(profilePath("default")); err != nil {
			entro <- err
			return
		}
		entro <- os.WriteFile(profilePath("default"), marcador, 0o600)
	}()
	time.Sleep(20 * time.Millisecond)

	w := httptest.NewRecorder()
	if !saveOrFail(w, "default") {
		t.Fatal("un estado sustituido no es un fallo de disco")
	}
	if w.Code == http.StatusServiceUnavailable || w.Body.Len() != 0 {
		t.Fatalf("no debía responder 503: %d %s", w.Code, w.Body.String())
	}
	select {
	case entrErr := <-entro:
		if entrErr != nil {
			t.Fatal(entrErr)
		}
	default:
		t.Fatal("nadie entró al candado durante la espera")
	}
	if states["default"] != nuevo {
		t.Fatal("saveProfile no debía dejar publicada la foto vieja")
	}
	got, err := os.ReadFile(profilePath("default"))
	if err != nil {
		t.Fatal(err)
	}
	if string(got) != string(marcador) {
		t.Fatalf("el rename de la foto vieja pisó el perfil nuevo: %q", got)
	}
	antes := newState()
	rollbackUnlessReplaced("default", viejo, antes)
	if states["default"] != nuevo {
		t.Fatal("restaurar «antes» pisó el estado que ya publicó el otro guardado")
	}
}

// saveProfile reescribe el .tmp si el mismo *State cambia de JSON durante
// la espera. Si no, renombrar la foto ya escrita dejaría el avatar viejo
// en disco, el nuevo en memoria, y saveProfile devolvería nil. El handler
// de /api/avatar ya no muta así: publica una copia.
func TestReintentoNoDejaAvatarViejoSiMutaronElMismoEstado(t *testing.T) {
	dataDir = t.TempDir()
	states = map[string]*State{}
	readonlyProfiles = map[string]bool{}

	st := newState()
	st.Avatar = "viejo"
	st.Color = "#111"
	st.XP = 3
	states["default"] = st
	// Directorio en el sitio del perfil: el primer rename falla y se llega
	// a soltar el candado. La mutación ocurre ahí, y luego el camino queda
	// libre para que el reintento sí pueda renombrar.
	if err := os.Mkdir(profilePath("default"), 0o755); err != nil {
		t.Fatal(err)
	}

	var stop atomic.Bool
	entro := make(chan error, 1)
	mu.Lock()
	defer mu.Unlock()
	defer func() { stop.Store(true) }()
	go func() {
		mu.Lock()
		defer mu.Unlock()
		if stop.Load() {
			entro <- errors.New("el guardado terminó antes de mutar")
			return
		}
		st.Avatar = "nuevo"
		st.Color = "#fff"
		entro <- os.Remove(profilePath("default"))
	}()
	time.Sleep(20 * time.Millisecond)

	err := saveProfile("default")
	select {
	case entrErr := <-entro:
		if entrErr != nil {
			t.Fatal(entrErr)
		}
	default:
		t.Fatal("nadie mutó el estado durante la espera")
	}
	if err != nil {
		t.Fatalf("guardar el estado ya mutado no debía fallar: %v", err)
	}
	if states["default"] != st || st.Avatar != "nuevo" || st.Color != "#fff" {
		t.Fatal("la memoria debía quedarse con el avatar nuevo en el mismo estado")
	}
	got, rerr := os.ReadFile(profilePath("default"))
	if rerr != nil {
		t.Fatal(rerr)
	}
	var disco State
	if jerr := json.Unmarshal(got, &disco); jerr != nil {
		t.Fatal(jerr)
	}
	if disco.Avatar != "nuevo" || disco.Color != "#fff" || disco.XP != 3 {
		t.Fatalf("el disco quedó con la foto vieja: avatar=%q color=%q xp=%d", disco.Avatar, disco.Color, disco.XP)
	}
}

func TestRollbackNoPisaEstadoSustituido(t *testing.T) {
	antes := newState()
	copia := newState()
	nuevo := newState()
	states = map[string]*State{"p": nuevo}
	rollbackUnlessReplaced("p", copia, antes)
	if states["p"] != nuevo {
		t.Fatal("el rollback pisó un estado que ya no era el nuestro")
	}
	states["p"] = copia
	rollbackUnlessReplaced("p", copia, antes)
	if states["p"] != antes {
		t.Fatal("si la copia sigue publicada, el fallo de disco debe deshacerla")
	}
	states["p"] = copia
	rollbackUnlessReplaced("p", copia, nil)
	if states["p"] != copia {
		t.Fatal("sin «antes» no hay nada que restaurar")
	}
}

// El rename se agota, pero otro guardado ya dejó en disco el JSON de este
// estado (avatar nuevo incluido). Devolver error y deshacer la memoria
// haría que el reintento de la lección pisara esa foto.
func TestRenameAgotadoNoDeshaceSiElDiscoYaTieneLaFoto(t *testing.T) {
	dataDir = t.TempDir()
	defer func() { _ = os.Chmod(dataDir, 0o755) }()
	states = map[string]*State{}
	readonlyProfiles = map[string]bool{}

	st := newState()
	st.Avatar = "viejo"
	st.Color = "#111"
	st.XP = 4
	states["default"] = st
	antes := newState()
	antes.Avatar = "viejo"
	antes.XP = 1
	if err := os.Mkdir(profilePath("default"), 0o755); err != nil {
		t.Fatal(err)
	}

	var stop atomic.Bool
	entro := make(chan error, 1)
	mu.Lock()
	defer mu.Unlock()
	defer func() { stop.Store(true) }()
	go func() {
		mu.Lock()
		defer mu.Unlock()
		if stop.Load() {
			entro <- errors.New("el guardado terminó antes de dejar la foto")
			return
		}
		st.Avatar = "nuevo"
		st.Color = "#fff"
		if err := os.Remove(profilePath("default")); err != nil {
			entro <- err
			return
		}
		if err := os.WriteFile(profilePath("default"), stateJSON(st, true), 0o600); err != nil {
			entro <- err
			return
		}
		// Sin permiso de escritura el intento siguiente no puede renombrar.
		// Si nadie mira el archivo, eso se cuenta como fallo y se deshace.
		entro <- os.Chmod(dataDir, 0o555)
	}()
	time.Sleep(20 * time.Millisecond)

	err := saveProfile("default")
	select {
	case entrErr := <-entro:
		if entrErr != nil {
			t.Fatal(entrErr)
		}
	default:
		t.Fatal("nadie dejó la foto en disco durante la espera")
	}
	if err != nil {
		t.Fatalf("el archivo ya era esta foto; agotar el rename no es un fallo: %v", err)
	}
	rollbackUnlessReplaced("default", st, antes)
	if states["default"] != st || st.Avatar != "nuevo" || st.XP != 4 {
		t.Fatalf("el rollback pisó la foto que ya estaba en disco: avatar=%q xp=%d", st.Avatar, st.XP)
	}
	_ = os.Chmod(dataDir, 0o755)
	got, rerr := os.ReadFile(profilePath("default"))
	if rerr != nil {
		t.Fatal(rerr)
	}
	var disco State
	if jerr := json.Unmarshal(got, &disco); jerr != nil {
		t.Fatal(jerr)
	}
	if disco.Avatar != "nuevo" || disco.Color != "#fff" || disco.XP != 4 {
		t.Fatalf("el disco no es la foto nueva: avatar=%q color=%q xp=%d", disco.Avatar, disco.Color, disco.XP)
	}
}

// Aunque el puntero siga siendo el nuestro, no se restaura «antes» si el
// archivo ya es esa foto: la memoria quedaría detrás del disco.
func TestRollbackNoDeshaceFotoYaEnDisco(t *testing.T) {
	dataDir = t.TempDir()
	states = map[string]*State{}
	readonlyProfiles = map[string]bool{}

	st := newState()
	st.Avatar = "nuevo"
	st.XP = 9
	states["default"] = st
	if err := os.WriteFile(profilePath("default"), stateJSON(st, true), 0o600); err != nil {
		t.Fatal(err)
	}
	antes := newState()
	antes.Avatar = "viejo"
	antes.XP = 1
	rollbackUnlessReplaced("default", st, antes)
	if states["default"] != st || st.Avatar != "nuevo" || st.XP != 9 {
		t.Fatal("restaurar «antes» deshizo una foto que el disco ya tenía")
	}
}

// Durante la espera se publica otro *State. La respuesta no puede ser un
// 200 con el avatar viejo: la elección se guarda encima de lo que quedó.
func TestAvatarSustituidoSeReaplica(t *testing.T) {
	dataDir = t.TempDir()
	states = map[string]*State{}
	readonlyProfiles = map[string]bool{}

	st := newState()
	st.Avatar = "viejo"
	st.Color = "#111"
	st.XP = 3
	states["default"] = st
	if err := os.Mkdir(profilePath("default"), 0o755); err != nil {
		t.Fatal(err)
	}

	otro := newState()
	otro.Avatar = "viejo"
	otro.Color = "#111"
	otro.XP = 50

	var stop atomic.Bool
	entro := make(chan error, 1)
	mu.Lock()
	defer mu.Unlock()
	defer func() { stop.Store(true) }()
	go func() {
		mu.Lock()
		defer mu.Unlock()
		if stop.Load() {
			entro <- errors.New("el guardado terminó antes de sustituir")
			return
		}
		states["default"] = otro
		if err := os.Remove(profilePath("default")); err != nil {
			entro <- err
			return
		}
		entro <- os.WriteFile(profilePath("default"), stateJSON(otro, true), 0o600)
	}()
	time.Sleep(20 * time.Millisecond)

	publicado, err := persistAvatar("default", "nuevo", "#fff")
	select {
	case entrErr := <-entro:
		if entrErr != nil {
			t.Fatal(entrErr)
		}
	default:
		t.Fatal("nadie sustituyó el estado durante la espera")
	}
	if err != nil {
		t.Fatal(err)
	}
	if publicado == nil || publicado.Avatar != "nuevo" || publicado.Color != "#fff" || publicado.XP != 50 {
		t.Fatalf("no quedó la elección sobre el estado nuevo: %+v", publicado)
	}
	if states["default"] == nil || states["default"].Avatar != "nuevo" || states["default"].XP != 50 {
		t.Fatal("la memoria se quedó sin la elección")
	}
	got, rerr := os.ReadFile(profilePath("default"))
	if rerr != nil {
		t.Fatal(rerr)
	}
	var disco State
	if jerr := json.Unmarshal(got, &disco); jerr != nil {
		t.Fatal(jerr)
	}
	if disco.Avatar != "nuevo" || disco.Color != "#fff" || disco.XP != 50 {
		t.Fatalf("el disco se quedó con el avatar viejo: avatar=%q color=%q xp=%d", disco.Avatar, disco.Color, disco.XP)
	}
}

func TestHandleAvatarGuardaEleccion(t *testing.T) {
	dataDir = t.TempDir()
	states = map[string]*State{}
	readonlyProfiles = map[string]bool{}

	req := httptest.NewRequest(http.MethodPost, "/api/avatar", strings.NewReader(`{"avatar":"fox","color":"#abc"}`))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	handleAvatar(w, req)
	if w.Code != http.StatusOK {
		t.Fatalf("status %d: %s", w.Code, w.Body.String())
	}
	var st State
	if err := json.Unmarshal(w.Body.Bytes(), &st); err != nil {
		t.Fatal(err)
	}
	if st.Avatar != "fox" || st.Color != "#abc" {
		t.Fatalf("respuesta avatar=%q color=%q", st.Avatar, st.Color)
	}
	if states["default"] == nil || states["default"].Avatar != "fox" {
		t.Fatal("no quedó publicado")
	}
}
