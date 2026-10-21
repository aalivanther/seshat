package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"
)

func resetDraftEnv(t *testing.T) {
	t.Helper()
	dataDir = t.TempDir()
	states = map[string]*State{}
	readonlyProfiles = map[string]bool{}
}

func postDraft(t *testing.T, body string) *httptest.ResponseRecorder {
	t.Helper()
	r := httptest.NewRequest(http.MethodPost, "/api/exam-draft", strings.NewReader(body))
	r.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	handleExamDraft(w, r)
	return w
}

func postDraftRaw(t *testing.T, body string, contentType string) *httptest.ResponseRecorder {
	t.Helper()
	r := httptest.NewRequest(http.MethodPost, "/api/exam-draft", strings.NewReader(body))
	if contentType != "" {
		r.Header.Set("Content-Type", contentType)
	}
	w := httptest.NewRecorder()
	handleExamDraft(w, r)
	return w
}

func draftJSON(setID string, startedAt int64, idx int, answers string) string {
	if answers == "" {
		answers = "{}"
	}
	return fmt.Sprintf(`{"setId":%q,"startedAt":%d,"idx":%d,"answers":%s}`, setID, startedAt, idx, answers)
}

func TestExamDraftRoundTrip(t *testing.T) {
	resetDraftEnv(t)

	start := time.Now().Unix() - 600
	w := postDraft(t, draftJSON("sim-a", start, 3, `{"h1":1,"h2":"ja"}`))
	if w.Code != http.StatusOK {
		t.Fatalf("guardar borrador: %d %s", w.Code, w.Body.String())
	}
	st := loadProfile("default")
	d := st.ExamDrafts["sim-a"]
	if d == nil || d.StartedAt != start || d.Idx != 3 {
		t.Fatalf("borrador no persistió: %+v", d)
	}
	if string(d.Answers["h1"]) != "1" {
		t.Fatalf("respuesta h1: %s", d.Answers["h1"])
	}

	states = map[string]*State{}
	loaded := loadProfile("default")
	got := loaded.ExamDrafts["sim-a"]
	if got == nil || got.StartedAt != start {
		t.Fatalf("tras reabrir el JSON no está: %+v", loaded.ExamDrafts)
	}
	now := start + 10
	left := 45*60 - (now - got.StartedAt)
	if left != 45*60-10 {
		t.Fatalf("reloj: startedAt fijo, remaining = duration - elapsed, no un contador congelado: %d", left)
	}

	del := httptest.NewRequest(http.MethodDelete, "/api/exam-draft?setId=sim-a", nil)
	dw := httptest.NewRecorder()
	handleExamDraft(dw, del)
	if dw.Code != http.StatusOK {
		t.Fatalf("borrar: %d", dw.Code)
	}
	if loadProfile("default").ExamDrafts["sim-a"] != nil {
		t.Fatal("el borrador debía desaparecer al terminar")
	}
}

func TestExamDraftRejectsEachInvalidField(t *testing.T) {
	resetDraftEnv(t)
	now := time.Now().Unix()
	cases := []struct {
		name string
		body string
	}{
		{"setId vacío", draftJSON("", now-60, 0, `{}`)},
		{"setId con espacios", draftJSON("sim a", now-60, 0, `{}`)},
		{"setId mayúsculas", draftJSON("SIM-A", now-60, 0, `{}`)},
		{"startedAt cero", draftJSON("sim-a", 0, 0, `{}`)},
		{"idx negativo", draftJSON("sim-a", now-60, -1, `{}`)},
		{"idx fuera de rango", draftJSON("sim-a", now-60, examDraftMaxIdx+1, `{}`)},
		{"no-json", `no-json`},
		{"answers array", fmt.Sprintf(`{"setId":"sim-a","startedAt":%d,"idx":0,"answers":[]}`, now-60)},
		{"clave de respuesta enorme", draftJSON("sim-a", now-60, 0, fmt.Sprintf(`{"%s":1}`, strings.Repeat("k", examDraftMaxKey+1)))},
		{"valor de respuesta enorme", draftJSON("sim-a", now-60, 0, fmt.Sprintf(`{"h1":%q}`, strings.Repeat("x", examDraftMaxValBytes+1)))},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			w := postDraft(t, tc.body)
			if w.Code == http.StatusOK {
				t.Fatalf("payload debía rechazarse, salió 200: %s", w.Body.String())
			}
		})
	}
}

func TestExamDraftRejectsExpired(t *testing.T) {
	resetDraftEnv(t)
	old := time.Now().Unix() - (examDraftMaxAgeSec + 3600)
	w := postDraft(t, draftJSON("sim-a", old, 0, `{}`))
	if w.Code != http.StatusBadRequest {
		t.Fatalf("un borrador más viejo que el tope debía caducar, salió %d %s", w.Code, w.Body.String())
	}
}

func TestExamDraftClampsFutureStart(t *testing.T) {
	resetDraftEnv(t)
	future := time.Now().Unix() + 3600
	w := postDraft(t, draftJSON("sim-a", future, 0, `{}`))
	if w.Code != http.StatusOK {
		t.Fatalf("un reloj adelantado se recorta, no se rechaza: %d %s", w.Code, w.Body.String())
	}
	d := loadProfile("default").ExamDrafts["sim-a"]
	if d == nil {
		t.Fatal("el borrador debía guardarse recortado")
	}
	if d.StartedAt > time.Now().Unix()+2 {
		t.Fatalf("startedAt debía recortarse a ahora, quedó %d", d.StartedAt)
	}
}

func TestExamDraftGETIs405(t *testing.T) {
	resetDraftEnv(t)
	r := httptest.NewRequest(http.MethodGet, "/api/exam-draft", nil)
	w := httptest.NewRecorder()
	handleExamDraft(w, r)
	if w.Code != http.StatusMethodNotAllowed {
		t.Fatalf("GET debía ser 405, salió %d", w.Code)
	}
}

func TestExamDraftRequiresJSONContentType(t *testing.T) {
	resetDraftEnv(t)
	now := time.Now().Unix() - 60
	w := postDraftRaw(t, draftJSON("sim-a", now, 0, `{}`), "text/plain")
	if w.Code != http.StatusUnsupportedMediaType {
		t.Fatalf("sin application/json debía ser 415, salió %d", w.Code)
	}
}

func TestExamDraftDeleteUnknownIsOK(t *testing.T) {
	resetDraftEnv(t)
	r := httptest.NewRequest(http.MethodDelete, "/api/exam-draft?setId=sim-inexistente", nil)
	w := httptest.NewRecorder()
	handleExamDraft(w, r)
	if w.Code != http.StatusOK {
		t.Fatalf("borrar un id que no está debe ser idempotente, salió %d %s", w.Code, w.Body.String())
	}
}

func TestExamDraftDeleteRejectsBadID(t *testing.T) {
	resetDraftEnv(t)
	for _, q := range []string{"", "SIM-A", strings.Repeat("a", 80)} {
		url := "/api/exam-draft"
		if q != "" {
			url += "?setId=" + q
		}
		r := httptest.NewRequest(http.MethodDelete, url, nil)
		w := httptest.NewRecorder()
		handleExamDraft(w, r)
		if w.Code != http.StatusBadRequest {
			t.Fatalf("DELETE setId=%q debía ser 400, salió %d", q, w.Code)
		}
	}
}

func TestExamDraftCapsAtEight(t *testing.T) {
	resetDraftEnv(t)
	now := time.Now().Unix() - 60
	for i := 0; i < examDraftMaxPerProfile; i++ {
		id := fmt.Sprintf("sim-%c", 'a'+i)
		w := postDraft(t, draftJSON(id, now, 0, `{}`))
		if w.Code != http.StatusOK {
			t.Fatalf("borrador %s: %d %s", id, w.Code, w.Body.String())
		}
	}
	w := postDraft(t, draftJSON("en-sim-a", now, 0, `{}`))
	if w.Code != http.StatusBadRequest {
		t.Fatalf("el noveno borrador debía rechazarse, salió %d %s", w.Code, w.Body.String())
	}
	// actualizar uno que ya existe sigue valiendo
	w = postDraft(t, draftJSON("sim-a", now, 2, `{"h1":1}`))
	if w.Code != http.StatusOK {
		t.Fatalf("actualizar uno existente no debe contar como noveno: %d %s", w.Code, w.Body.String())
	}
}

func TestExamDraftRejectsTooManyAnswers(t *testing.T) {
	resetDraftEnv(t)
	now := time.Now().Unix() - 60
	var b strings.Builder
	b.WriteByte('{')
	for i := 0; i < examDraftMaxAnswers+1; i++ {
		if i > 0 {
			b.WriteByte(',')
		}
		fmt.Fprintf(&b, `"h%d":%d`, i, i)
	}
	b.WriteByte('}')
	w := postDraft(t, draftJSON("sim-a", now, 0, b.String()))
	if w.Code != http.StatusBadRequest {
		t.Fatalf("más de %d respuestas debía rechazarse, salió %d", examDraftMaxAnswers, w.Code)
	}
}

func TestExamDraftRejectsInvalidJSONAnswer(t *testing.T) {
	resetDraftEnv(t)
	now := time.Now().Unix() - 60
	// el decoder de RawMessage exige JSON válido por valor; un objeto
	// truncado tumba el decode entero
	w := postDraft(t, fmt.Sprintf(`{"setId":"sim-a","startedAt":%d,"idx":0,"answers":{"h1":}}`, now))
	if w.Code == http.StatusOK {
		t.Fatal("JSON de respuesta truncado debía rechazarse")
	}
}

func TestCloneStateIsolatesDraftAnswers(t *testing.T) {
	orig := &State{ExamDrafts: map[string]*ExamDraft{
		"sim-a": {StartedAt: 1, Idx: 0, Answers: map[string]json.RawMessage{"h1": json.RawMessage(`1`)}},
	}}
	cp := cloneState(orig)
	cp.ExamDrafts["sim-a"].Answers["h1"][0] = '9'
	if string(orig.ExamDrafts["sim-a"].Answers["h1"]) != "1" {
		t.Fatal("cloneState compartía el backing array de las respuestas")
	}
	cp.ExamDrafts["sim-a"].Idx = 7
	if orig.ExamDrafts["sim-a"].Idx != 0 {
		t.Fatal("cloneState compartía el ExamDraft")
	}
}

func TestSanitizeDropsCorruptDraftOnLoad(t *testing.T) {
	st := &State{}
	raw := []byte(`{"schemaVersion":2,"lessons":{},"items":{},"examDrafts":{"sim-a":{"startedAt":1,"idx":-3,"answers":{"x":"no-json"}}}}`)
	if err := decodeState(raw, st); err != nil {
		t.Fatal(err)
	}
	if _, ok := st.ExamDrafts["sim-a"]; ok {
		t.Fatalf("un borrador corrupto no debe sobrevivir al cargar: %+v", st.ExamDrafts)
	}
}

func TestSanitizeDropsInvalidSetIDAndKeepsSane(t *testing.T) {
	st := &State{}
	now := time.Now().Unix() - 30
	raw := []byte(fmt.Sprintf(
		`{"schemaVersion":2,"lessons":{},"items":{},"examDrafts":{"SIM-A":{"startedAt":%d,"idx":0,"answers":{}},"sim-a":{"startedAt":%d,"idx":2,"answers":{"h1":1}}}}`,
		now, now,
	))
	if err := decodeState(raw, st); err != nil {
		t.Fatal(err)
	}
	if _, ok := st.ExamDrafts["SIM-A"]; ok {
		t.Fatal("un setId inválido no debe sobrevivir al cargar")
	}
	if st.ExamDrafts["sim-a"] == nil || st.ExamDrafts["sim-a"].Idx != 2 {
		t.Fatalf("el borrador sano debía quedar: %+v", st.ExamDrafts)
	}
}

func TestSanitizeCapsTooManyDrafts(t *testing.T) {
	st := &State{ExamDrafts: map[string]*ExamDraft{}}
	now := time.Now().Unix()
	for i := 0; i < examDraftMaxPerProfile+3; i++ {
		id := fmt.Sprintf("sim-%c", 'a'+i)
		st.ExamDrafts[id] = &ExamDraft{StartedAt: now - int64(i)*10, Idx: 0, Answers: map[string]json.RawMessage{}}
	}
	sanitizeExamDrafts(st)
	if len(st.ExamDrafts) > examDraftMaxPerProfile {
		t.Fatalf("sanitize debía dejar como mucho %d, quedó %d", examDraftMaxPerProfile, len(st.ExamDrafts))
	}
	if st.ExamDrafts["sim-a"] == nil {
		t.Fatal("el más reciente (sim-a) debía conservarse")
	}
}

func TestSanitizeDropsInvalidAnswerKeys(t *testing.T) {
	now := time.Now().Unix() - 30
	st := &State{ExamDrafts: map[string]*ExamDraft{
		"sim-a": {
			StartedAt: now,
			Idx:       1,
			Answers: map[string]json.RawMessage{
				"ok":                    json.RawMessage(`1`),
				"roto":                  json.RawMessage(`notjson`),
				strings.Repeat("k", 80): json.RawMessage(`2`),
			},
		},
	}}
	sanitizeExamDrafts(st)
	d := st.ExamDrafts["sim-a"]
	if d == nil {
		t.Fatal("el borrador sano debía quedar")
	}
	if _, ok := d.Answers["roto"]; ok {
		t.Fatal("la respuesta que no es JSON debía caerse")
	}
	if string(d.Answers["ok"]) != "1" {
		t.Fatalf("la respuesta válida debía quedar: %s", d.Answers["ok"])
	}
}

func TestLessonResultPersistsAndReloads(t *testing.T) {
	resetDraftEnv(t)
	st := newState()
	st.Lessons["f0l1"] = &LessonStat{Completed: true, BestScore: 1, LastScore: 1, Attempts: 1, LastAt: time.Now()}
	states["default"] = st
	if err := saveProfile("default"); err != nil {
		t.Fatal(err)
	}
	states = map[string]*State{}
	loaded := loadProfile("default")
	if loaded.Lessons["f0l1"] == nil || !loaded.Lessons["f0l1"].Completed {
		t.Fatal("la lección no sobrevivió al guardar/cargar")
	}
	if loaded.ExamDrafts != nil && len(loaded.ExamDrafts) != 0 {
		t.Fatal("un perfil viejo no debe inventar examDrafts")
	}
}
