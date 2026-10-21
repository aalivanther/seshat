package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"
)

// Humo en caliente: HTTP de verdad, reloj de pared y dos clientes.

func liveServer(t *testing.T) *httptest.Server {
	t.Helper()
	resetHTTPEnv(t)
	mux := http.NewServeMux()
	mux.HandleFunc("/api/health", func(w http.ResponseWriter, _ *http.Request) {
		writeJSON(w, map[string]any{"ok": true})
	})
	mux.HandleFunc("/api/state", handleGetState)
	mux.HandleFunc("/api/placement", handlePlacement)
	mux.HandleFunc("/api/lesson-result", handleLessonResult)
	mux.HandleFunc("/api/exam-draft", handleExamDraft)
	mux.HandleFunc("/api/export", handleExport)
	mux.HandleFunc("/api/import", handleImport)
	srv := httptest.NewServer(mux)
	t.Cleanup(srv.Close)
	return srv
}

func livePOST(t *testing.T, srv *httptest.Server, path, body string) *http.Response {
	t.Helper()
	r, err := http.Post(srv.URL+path, "application/json", strings.NewReader(body))
	if err != nil {
		t.Fatal(err)
	}
	return r
}

func liveGET(t *testing.T, srv *httptest.Server, path string) *http.Response {
	t.Helper()
	r, err := http.Get(srv.URL + path)
	if err != nil {
		t.Fatal(err)
	}
	return r
}

func readJSON(t *testing.T, resp *http.Response) map[string]any {
	t.Helper()
	defer resp.Body.Close()
	b, err := io.ReadAll(resp.Body)
	if err != nil {
		t.Fatal(err)
	}
	var m map[string]any
	if err := json.Unmarshal(b, &m); err != nil {
		t.Fatalf("JSON %d: %s", resp.StatusCode, b)
	}
	return m
}

func TestLiveWallClockExamDraftDropsTenSeconds(t *testing.T) {
	srv := liveServer(t)
	start := time.Now().Unix()
	body := fmt.Sprintf(`{"setId":"en-sim-a","startedAt":%d,"idx":0,"answers":{"h1":1}}`, start)
	resp := livePOST(t, srv, "/api/exam-draft", body)
	if resp.StatusCode != 200 {
		t.Fatalf("guardar borrador: %d", resp.StatusCode)
	}
	resp.Body.Close()

	time.Sleep(10 * time.Second)

	st := readJSON(t, liveGET(t, srv, "/api/state"))
	drafts, _ := st["examDrafts"].(map[string]any)
	d, _ := drafts["en-sim-a"].(map[string]any)
	if d == nil {
		t.Fatalf("el borrador no está tras 10 s: %v", st["examDrafts"])
	}
	got := int64(d["startedAt"].(float64))
	elapsed := time.Now().Unix() - got
	if elapsed < 9 || elapsed > 16 {
		t.Fatalf("tras 10 s de pared el elapsed debía ser ~10, salió %d (startedAt=%d)", elapsed, got)
	}
	const duration = 45 * 60
	left := duration - elapsed
	if left >= duration {
		t.Fatal("el remaining se regeneró al recargar")
	}
}

func TestLiveTwoTabsSeeTheSameClock(t *testing.T) {
	srv := liveServer(t)
	start := time.Now().Unix() - 30
	body := fmt.Sprintf(`{"setId":"en-sim-a","startedAt":%d,"idx":2,"answers":{"h1":1}}`, start)
	resp := livePOST(t, srv, "/api/exam-draft", body)
	resp.Body.Close()
	if resp.StatusCode != 200 {
		t.Fatalf("draft: %d", resp.StatusCode)
	}

	a := readJSON(t, liveGET(t, srv, "/api/state"))
	b := readJSON(t, liveGET(t, srv, "/api/state"))
	da := a["examDrafts"].(map[string]any)["en-sim-a"].(map[string]any)
	db := b["examDrafts"].(map[string]any)["en-sim-a"].(map[string]any)
	gotA := int64(da["startedAt"].(float64))
	gotB := int64(db["startedAt"].(float64))
	if gotA != gotB || gotA != start {
		t.Fatalf("dos pestañas tienen que ver el mismo startedAt=%d, salió %d y %d", start, gotA, gotB)
	}
}

func TestLiveKillAndReopenKeepsPlacementAndLesson(t *testing.T) {
	srv := liveServer(t)
	dir := dataDir
	resp := livePOST(t, srv, "/api/placement", `{"lang":"en","placed":"a2","pct":72}`)
	if resp.StatusCode != 200 {
		t.Fatalf("colocación: %d", resp.StatusCode)
	}
	resp.Body.Close()
	resp = livePOST(t, srv, "/api/lesson-result", `{"lessonId":"ena1m1l1","score":1,"items":[{"itemId":"enhello","correct":true,"mode":"produce"}],"requestId":"live-1"}`)
	if resp.StatusCode != 200 {
		t.Fatalf("lección: %d", resp.StatusCode)
	}
	resp.Body.Close()
	srv.Close()

	// kill: memoria vacía, mismo disco
	states = map[string]*State{}
	dataDir = dir
	srv2 := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.URL.Path {
		case "/api/state":
			handleGetState(w, r)
		default:
			http.NotFound(w, r)
		}
	}))
	defer srv2.Close()
	st := readJSON(t, liveGET(t, srv2, "/api/state"))
	pl, _ := st["placement"].(map[string]any)
	en, _ := pl["en"].(map[string]any)
	if en == nil || en["placed"] != "a2" {
		t.Fatalf("tras kill+reabrir se perdió la colocación EN: %v", st["placement"])
	}
	lessons, _ := st["lessons"].(map[string]any)
	lec, _ := lessons["ena1m1l1"].(map[string]any)
	if lec == nil || lec["completed"] != true {
		t.Fatalf("tras kill+reabrir se perdió la lección: %v", st["lessons"])
	}
}

func TestLiveHealthThenWork(t *testing.T) {
	srv := liveServer(t)
	h := liveGET(t, srv, "/api/health")
	m := readJSON(t, h)
	if m["ok"] != true {
		t.Fatalf("health: %v", m)
	}
}

func TestLiveExportRoundTripOverHTTP(t *testing.T) {
	srv := liveServer(t)
	resp := livePOST(t, srv, "/api/lesson-result", `{"lessonId":"ena1m1l1","score":1,"items":[],"requestId":"exp-1"}`)
	resp.Body.Close()
	ex := liveGET(t, srv, "/api/export")
	b, _ := io.ReadAll(ex.Body)
	ex.Body.Close()
	if !bytes.Contains(b, []byte(`"ena1m1l1"`)) {
		t.Fatalf("export vacío: %s", b)
	}
	imp, err := http.Post(srv.URL+"/api/import", "application/json", bytes.NewReader(b))
	if err != nil {
		t.Fatal(err)
	}
	if imp.StatusCode != 200 {
		t.Fatalf("import: %d", imp.StatusCode)
	}
	imp.Body.Close()
}
