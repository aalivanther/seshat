package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"
	"time"
)

func resetHTTPEnv(t *testing.T) {
	t.Helper()
	dataDir = t.TempDir()
	states = map[string]*State{}
	readonlyProfiles = map[string]bool{}
}

func TestLessonResultHTTPPersistsAndIsIdempotent(t *testing.T) {
	resetHTTPEnv(t)
	body := `{"lessonId":"f0l1","score":1,"items":[{"itemId":"hello","correct":true,"mode":"produce"}],"requestId":"req-1"}`
	post := func() *httptest.ResponseRecorder {
		r := httptest.NewRequest(http.MethodPost, "/api/lesson-result", strings.NewReader(body))
		r.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()
		handleLessonResult(w, r)
		return w
	}
	w1 := post()
	if w1.Code != http.StatusOK {
		t.Fatalf("primer POST: %d %s", w1.Code, w1.Body.String())
	}
	w2 := post()
	if w2.Code != http.StatusOK {
		t.Fatalf("reintento: %d %s", w2.Code, w2.Body.String())
	}
	st := loadProfile("default")
	ls := st.Lessons["f0l1"]
	if ls == nil || !ls.Completed || ls.Attempts != 1 {
		t.Fatalf("el reintento no debe volver a aplicar: %+v", ls)
	}
	states = map[string]*State{}
	loaded := loadProfile("default")
	if loaded.Lessons["f0l1"] == nil || !loaded.Lessons["f0l1"].Completed {
		t.Fatal("tras reabrir el JSON la lección no está")
	}
}

// El anillo de 20 olvidaba el primer id en cuanto entraba el vigésimo
// primero, y ese reintento volvía a pasar la lección. El id vive en el
// perfil: reabrir el proceso no lo borra, y el de otro perfil no cuenta.
func TestLessonResultVeintiunoNoOlvidaElPrimero(t *testing.T) {
	resetHTTPEnv(t)
	const lesson = "f0l1"
	post := func(profile, id string) *httptest.ResponseRecorder {
		t.Helper()
		body := fmt.Sprintf(
			`{"lessonId":%q,"score":1,"items":[{"itemId":"hello","correct":true,"mode":"produce"}],"requestId":%q}`,
			lesson, id,
		)
		r := httptest.NewRequest(http.MethodPost, "/api/lesson-result", strings.NewReader(body))
		r.Header.Set("Content-Type", "application/json")
		if profile != "" {
			r.Header.Set("X-Profile", profile)
		}
		w := httptest.NewRecorder()
		handleLessonResult(w, r)
		return w
	}
	for i := 0; i < 21; i++ {
		w := post("", fmt.Sprintf("id-%02d", i))
		if w.Code != http.StatusOK {
			t.Fatalf("envío %d: %d %s", i, w.Code, w.Body.String())
		}
	}
	st := loadProfile("default")
	ls := st.Lessons[lesson]
	it := st.Items["hello"]
	if ls == nil || ls.Attempts != 21 || it == nil {
		t.Fatalf("21 ids distintos tienen que contar: lesson=%+v item=%+v", ls, it)
	}
	attempts, xp, correct, prod, interval := ls.Attempts, st.XP, it.Correct, it.ProdCorrect, it.Interval

	w := post("otro", "id-00")
	if w.Code != http.StatusOK {
		t.Fatalf("otro perfil: %d %s", w.Code, w.Body.String())
	}
	otro := loadProfile("otro")
	if otro.Lessons[lesson] == nil || otro.Lessons[lesson].Attempts != 1 {
		t.Fatalf("el id de un perfil no bloquea a otro: %+v", otro.Lessons[lesson])
	}

	states = map[string]*State{}
	w = post("", "id-00")
	if w.Code != http.StatusOK {
		t.Fatalf("reintento del primero: %d %s", w.Code, w.Body.String())
	}
	st = loadProfile("default")
	ls = st.Lessons[lesson]
	it = st.Items["hello"]
	if ls == nil || ls.Attempts != attempts || st.XP != xp || it == nil ||
		it.Correct != correct || it.ProdCorrect != prod || it.Interval != interval {
		t.Fatalf("el primero volvió a aplicarse: attempts=%v xp=%d item=%+v", ls, st.XP, it)
	}
	if st.Extra != nil {
		if _, ok := st.Extra["seenRequests"]; ok {
			t.Fatal("seenRequests no puede duplicarse en Extra")
		}
	}
	raw := stateJSON(st, false)
	if strings.Count(string(raw), `"seenRequests"`) != 1 {
		t.Fatalf("seenRequests en el JSON: %s", raw)
	}
	found := false
	for _, s := range st.SeenRequests {
		if s.ID == "id-00" {
			found = true
			break
		}
	}
	if !found {
		t.Fatal("el perfil no guardó el primer requestId")
	}
}

// Pasado el corte de edad el id ya no es el mismo envío. Dentro del plazo,
// repetirlo no mueve la lección.
func TestLessonResultRequestIdViejoVuelveAAplicarse(t *testing.T) {
	resetHTTPEnv(t)
	ahora := time.Now()
	st := newState()
	st.Lessons["f0l1"] = &LessonStat{Completed: true, BestScore: 1, LastScore: 1, Attempts: 1, LastAt: ahora}
	st.SeenRequests = []SeenRequest{
		{ID: "viejo", At: ahora.Add(-seenReqMaxAge - time.Second)},
		{ID: "fresco", At: ahora},
	}
	states["default"] = st
	if err := saveProfile("default"); err != nil {
		t.Fatal(err)
	}

	post := func(id string) *httptest.ResponseRecorder {
		t.Helper()
		body := fmt.Sprintf(`{"lessonId":"f0l1","score":1,"items":[],"requestId":%q}`, id)
		r := httptest.NewRequest(http.MethodPost, "/api/lesson-result", strings.NewReader(body))
		r.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()
		handleLessonResult(w, r)
		return w
	}
	if w := post("fresco"); w.Code != http.StatusOK {
		t.Fatalf("fresco: %d %s", w.Code, w.Body.String())
	}
	if got := loadProfile("default").Lessons["f0l1"].Attempts; got != 1 {
		t.Fatalf("un id dentro del plazo no es otra lección: attempts=%d", got)
	}
	if w := post("viejo"); w.Code != http.StatusOK {
		t.Fatalf("viejo: %d %s", w.Code, w.Body.String())
	}
	got := loadProfile("default")
	if got.Lessons["f0l1"] == nil || got.Lessons["f0l1"].Attempts != 2 {
		t.Fatalf("pasado el corte de edad el id ya no es un doble clic: %+v", got.Lessons["f0l1"])
	}
	var renovado bool
	for _, s := range got.SeenRequests {
		if s.ID != "viejo" {
			continue
		}
		renovado = true
		if time.Since(s.At) > time.Minute {
			t.Fatalf("el id reaplicado tiene que volver a apuntarse, no quedarse caducado: %v", s.At)
		}
	}
	if !renovado {
		t.Fatal("al reaplicar un id caducado hay que recordarlo otra vez")
	}
}

func TestPruneSeenRequestsTopeYEdad(t *testing.T) {
	now := time.Date(2026, 9, 28, 12, 0, 0, 0, time.UTC)
	st := &State{}
	for i := 0; i < seenReqCap+3; i++ {
		st.SeenRequests = append(st.SeenRequests, SeenRequest{
			ID: fmt.Sprintf("n-%d", i),
			At: now.Add(-time.Duration(seenReqCap+3-i) * time.Second),
		})
	}
	st.SeenRequests = append(st.SeenRequests, SeenRequest{
		ID: "caducado",
		At: now.Add(-seenReqMaxAge - time.Second),
	})
	// La copia vieja de n-0 no puede ganar al tope: la hora que cuenta es la nueva.
	st.SeenRequests = append(st.SeenRequests, SeenRequest{ID: "n-0", At: now})
	if requestAlreadySeen(st, "caducado", now) {
		t.Fatal("un id caducado no cuenta ni antes de podar")
	}
	pruneSeenRequests(st, now)
	if len(st.SeenRequests) != seenReqCap {
		t.Fatalf("el tope es %d, quedaron %d", seenReqCap, len(st.SeenRequests))
	}
	if requestAlreadySeen(st, "caducado", now) {
		t.Fatal("un id más viejo que el corte no se conserva")
	}
	if !requestAlreadySeen(st, "n-0", now) {
		t.Fatal("el duplicado reciente del más viejo tiene que quedar")
	}
	if requestAlreadySeen(st, "n-1", now) {
		t.Fatal("pasado el tope, el más viejo que no se renovó sale")
	}
	ultimo := fmt.Sprintf("n-%d", seenReqCap+2)
	if !requestAlreadySeen(st, ultimo, now) {
		t.Fatal("el más nuevo tiene que quedar")
	}
}

func TestLessonResultHTTPUmbralDeHecho(t *testing.T) {
	if lessonPassScore != 0.8 {
		t.Fatalf("el corte de lección hecha es 0,8, no %v", lessonPassScore)
	}
	resetHTTPEnv(t)
	// 0,795 redondea a 80 en la pantalla. El servidor no la da por hecha:
	// la respuesta trae completed, que es lo que mira el cliente.
	cases := []struct {
		id    string
		score string
		want  bool
	}{
		{"borde", "0.795", false},
		{"justo", "0.8", true},
	}
	for _, tc := range cases {
		t.Run(tc.id, func(t *testing.T) {
			body := fmt.Sprintf(
				`{"lessonId":%q,"score":%s,"items":[],"requestId":%q}`,
				tc.id, tc.score, "umbral-"+tc.id,
			)
			r := httptest.NewRequest(http.MethodPost, "/api/lesson-result", strings.NewReader(body))
			r.Header.Set("Content-Type", "application/json")
			w := httptest.NewRecorder()
			handleLessonResult(w, r)
			if w.Code != http.StatusOK {
				t.Fatalf("POST: %d %s", w.Code, w.Body.String())
			}
			var resp struct {
				Lessons map[string]struct {
					Completed bool `json:"completed"`
				} `json:"lessons"`
			}
			if err := json.Unmarshal(w.Body.Bytes(), &resp); err != nil {
				t.Fatal(err)
			}
			ls, ok := resp.Lessons[tc.id]
			if !ok {
				t.Fatalf("la respuesta no trae la lección %s", tc.id)
			}
			if ls.Completed != tc.want {
				t.Fatalf("completed en la respuesta = %v, quería %v", ls.Completed, tc.want)
			}
			stored := loadProfile("default").Lessons[tc.id]
			if stored == nil || stored.Completed != tc.want {
				t.Fatalf("en el perfil completed = %+v, quería %v", stored, tc.want)
			}
		})
	}
}

func TestLessonResultHTTPRechazaModoDesconocido(t *testing.T) {
	resetHTTPEnv(t)
	post := func(body string) *httptest.ResponseRecorder {
		t.Helper()
		r := httptest.NewRequest(http.MethodPost, "/api/lesson-result", strings.NewReader(body))
		r.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()
		handleLessonResult(w, r)
		return w
	}

	// El typo y el espacio no son producir. La fila hermana, válida, tampoco
	// se aplica: el POST se rechaza entero.
	malos := []string{
		`{"lessonId":"f0l1","score":1,"items":[{"itemId":"hello","correct":true,"mode":"prod"},{"itemId":"otro","correct":true,"mode":"produce"}],"requestId":"malo-prod"}`,
		`{"lessonId":"f0l1","score":1,"items":[{"itemId":"hello","correct":true,"mode":"produce "}],"requestId":"malo-espacio"}`,
	}
	for _, body := range malos {
		w := post(body)
		if w.Code != http.StatusBadRequest {
			t.Fatalf("esperaba 400, salió %d %s", w.Code, w.Body.String())
		}
	}
	// profileReadonly carga el perfil en memoria antes de mirar el cuerpo.
	// Cargar no es aplicar: no hay lección, ni tarjetas, ni archivo.
	st := loadProfile("default")
	if len(st.Lessons) != 0 || len(st.Items) != 0 || st.XP != 0 {
		t.Fatalf("un modo desconocido no debe aplicar nada: lecciones=%d ítems=%d xp=%d", len(st.Lessons), len(st.Items), st.XP)
	}
	if _, err := os.Stat(profilePath("default")); !os.IsNotExist(err) {
		t.Fatalf("no debía existir el JSON del perfil: %v", err)
	}

	w := post(`{"lessonId":"f0l1","score":1,"items":[{"itemId":"hello","correct":true,"mode":""}],"requestId":"vacio"}`)
	if w.Code != http.StatusOK {
		t.Fatalf("modo vacío: %d %s", w.Code, w.Body.String())
	}
	st = loadProfile("default")
	if st.Items["hello"] == nil || st.Items["hello"].ProdCorrect != 1 || st.Items["hello"].Correct != 1 {
		t.Fatalf("el vacío debe contar como producir: %+v", st.Items["hello"])
	}
	if st.Lessons["f0l1"] == nil || st.Lessons["f0l1"].Attempts != 1 {
		t.Fatalf("la lección válida debe quedar: %+v", st.Lessons["f0l1"])
	}
	if _, ok := st.Items["otro"]; ok {
		t.Fatal("la fila del POST rechazado no debe aparecer después")
	}

	disco, err := os.ReadFile(profilePath("default"))
	if err != nil {
		t.Fatal(err)
	}
	w = post(`{"lessonId":"f0l9","score":1,"items":[{"itemId":"hello","correct":true,"mode":"prod"}],"requestId":"malo-luego"}`)
	if w.Code != http.StatusBadRequest {
		t.Fatalf("segundo rechazo: %d %s", w.Code, w.Body.String())
	}
	disco2, err := os.ReadFile(profilePath("default"))
	if err != nil {
		t.Fatal(err)
	}
	if string(disco) != string(disco2) {
		t.Fatal("el 400 no debe reescribir el perfil")
	}
	st = loadProfile("default")
	if st.Items["hello"].ProdCorrect != 1 || st.Items["hello"].Correct != 1 {
		t.Fatalf("la tarjeta no debía moverse: %+v", st.Items["hello"])
	}
	if st.Lessons["f0l9"] != nil || st.Lessons["f0l1"].Attempts != 1 {
		t.Fatalf("la lección no debía aplicarse: %+v", st.Lessons)
	}

	w = post(`{"lessonId":"f0l2","score":1,"items":[{"itemId":"wort","correct":true,"mode":"recognize"}],"requestId":"rec"}`)
	if w.Code != http.StatusOK {
		t.Fatalf("recognize: %d %s", w.Code, w.Body.String())
	}
	st = loadProfile("default")
	if st.Items["wort"] == nil || st.Items["wort"].ProdCorrect != 0 || st.Items["wort"].Correct != 1 {
		t.Fatalf("reconocer no cuenta como producir: %+v", st.Items["wort"])
	}

	w = post(`{"lessonId":"f0l3","score":1,"items":[{"itemId":"satz","correct":true,"mode":"produce"}],"requestId":"pro"}`)
	if w.Code != http.StatusOK {
		t.Fatalf("produce: %d %s", w.Code, w.Body.String())
	}
	st = loadProfile("default")
	if st.Items["satz"] == nil || st.Items["satz"].ProdCorrect != 1 {
		t.Fatalf("produce debe sumar prodCorrect: %+v", st.Items["satz"])
	}
}

func TestLessonResultHTTPRejectsGarbage(t *testing.T) {
	resetHTTPEnv(t)
	r := httptest.NewRequest(http.MethodPost, "/api/lesson-result", strings.NewReader(`{"lessonId":"","score":1,"items":[]}`))
	r.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	handleLessonResult(w, r)
	if w.Code == http.StatusOK {
		t.Fatal("lessonId vacío debía rechazarse")
	}
}

func TestExportImportRoundTripKeepsLessons(t *testing.T) {
	resetHTTPEnv(t)
	st := newState()
	st.Lessons["f0l1"] = &LessonStat{Completed: true, BestScore: 1, LastScore: 1, Attempts: 1}
	states["default"] = st
	if err := saveProfile("default"); err != nil {
		t.Fatal(err)
	}

	er := httptest.NewRequest(http.MethodGet, "/api/export", nil)
	ew := httptest.NewRecorder()
	handleExport(ew, er)
	if ew.Code != http.StatusOK {
		t.Fatalf("export: %d %s", ew.Code, ew.Body.String())
	}
	exported := ew.Body.String()
	if !strings.Contains(exported, `"f0l1"`) {
		t.Fatalf("export no trae la lección: %s", exported)
	}

	states = map[string]*State{}
	dataDir = t.TempDir()
	ir := httptest.NewRequest(http.MethodPost, "/api/import", strings.NewReader(exported))
	ir.Header.Set("Content-Type", "application/json")
	iw := httptest.NewRecorder()
	handleImport(iw, ir)
	if iw.Code != http.StatusOK {
		t.Fatalf("import: %d %s", iw.Code, iw.Body.String())
	}
	loaded := loadProfile("default")
	if loaded.Lessons["f0l1"] == nil || !loaded.Lessons["f0l1"].Completed {
		t.Fatal("import no restauró las lecciones")
	}
}

func TestImportRejectsGarbage(t *testing.T) {
	resetHTTPEnv(t)
	r := httptest.NewRequest(http.MethodPost, "/api/import", strings.NewReader(`{"nope":true}`))
	r.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	handleImport(w, r)
	if w.Code == http.StatusOK {
		t.Fatal("un JSON sin lessons/items no puede pisar el perfil")
	}
}

func TestOldProfileKeySnapshotSurvivesExamDrafts(t *testing.T) {
	resetHTTPEnv(t)
	raw := []byte(`{"schemaVersion":2,"lessons":{"f0l1":{"completed":true,"bestScore":1,"lastScore":1,"attempts":1}},"items":{},"xp":3,"streakDays":0,"lastActive":"","placement":{"en":{"placed":"a2","pct":70,"at":"2026-01-01T00:00:00Z"}},"futureFlag":true}`)
	var before map[string]json.RawMessage
	if err := json.Unmarshal(raw, &before); err != nil {
		t.Fatal(err)
	}
	st := newState()
	if err := decodeState(raw, st); err != nil {
		t.Fatal(err)
	}
	states["default"] = st
	if err := saveProfile("default"); err != nil {
		t.Fatal(err)
	}
	states = map[string]*State{}
	loaded := loadProfile("default")
	var after map[string]json.RawMessage
	if err := json.Unmarshal(stateJSON(loaded, true), &after); err != nil {
		t.Fatal(err)
	}
	for k := range before {
		if _, ok := after[k]; !ok {
			t.Fatalf("un save con examDrafts no puede borrar la clave %q", k)
		}
	}
	if loaded.Lessons["f0l1"] == nil || !loaded.Lessons["f0l1"].Completed {
		t.Fatal("lessons no sobrevivieron")
	}
	if loaded.Placement["en"] == nil || loaded.Placement["en"].Placed != "a2" {
		t.Fatal("placement no sobrevivió")
	}
	if loaded.ExamDrafts != nil && len(loaded.ExamDrafts) != 0 {
		t.Fatal("un perfil viejo no debe inventar borradores")
	}
}

func TestSmokePlacementAndLessonSurviveReload(t *testing.T) {
	resetHTTPEnv(t)
	pr := httptest.NewRequest(http.MethodPost, "/api/placement", strings.NewReader(`{"lang":"en","placed":"a2","pct":72}`))
	pr.Header.Set("Content-Type", "application/json")
	pw := httptest.NewRecorder()
	handlePlacement(pw, pr)
	if pw.Code != http.StatusOK {
		t.Fatalf("colocación EN: %d %s", pw.Code, pw.Body.String())
	}
	lr := httptest.NewRequest(http.MethodPost, "/api/lesson-result", strings.NewReader(`{"lessonId":"ena1m1l1","score":1,"items":[{"itemId":"enhello","correct":true,"mode":"produce"}],"requestId":"smoke-1"}`))
	lr.Header.Set("Content-Type", "application/json")
	lw := httptest.NewRecorder()
	handleLessonResult(lw, lr)
	if lw.Code != http.StatusOK {
		t.Fatalf("lección: %d %s", lw.Code, lw.Body.String())
	}
	states = map[string]*State{}
	loaded := loadProfile("default")
	if loaded.Placement["en"] == nil || loaded.Placement["en"].Placed != "a2" {
		t.Fatal("tras kill+reabrir se perdió la colocación EN")
	}
	if loaded.Lessons["ena1m1l1"] == nil || !loaded.Lessons["ena1m1l1"].Completed {
		t.Fatal("tras kill+reabrir se perdió la lección")
	}
}

func TestVersionMapPublishesDrop(t *testing.T) {
	m := versionMap()
	if m["drop"] != contentVersion {
		t.Fatalf("R1: /api/version debe publicar drop, salió %v", m["drop"])
	}
	if m["content"] != contentVersion {
		t.Fatalf("content debe coincidir con el drop horneado: %v", m["content"])
	}
	b, err := json.Marshal(m)
	if err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(string(b), `"drop"`) {
		t.Fatalf("el JSON de versión no lleva drop: %s", b)
	}
}
