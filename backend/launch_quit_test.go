package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

// Un dispositivo de la red local NO puede apagar la app de otro, ni aunque
// mande un Origin impecable de la propia interfaz.
func TestQuitOnlyFromThisMachine(t *testing.T) {
	dataDir = t.TempDir()

	lan := httptest.NewRequest(http.MethodPost, "/api/quit", nil)
	lan.RemoteAddr = "192.168.1.44:52000"
	lan.Header.Set("Origin", "http://192.168.1.9:8787")
	w := httptest.NewRecorder()
	handleQuit(w, lan)
	if w.Code != http.StatusForbidden {
		t.Fatalf("un móvil de la LAN apagó la app: esperaba 403, salió %d", w.Code)
	}

	local := httptest.NewRequest(http.MethodPost, "/api/quit", nil)
	local.RemoteAddr = "127.0.0.1:52000"
	local.Header.Set("Origin", "http://localhost:8787")
	w2 := httptest.NewRecorder()
	handleQuit(w2, local)
	if w2.Code != http.StatusOK {
		t.Fatalf("desde el propio equipo debe poder apagarse: salió %d", w2.Code)
	}
}
