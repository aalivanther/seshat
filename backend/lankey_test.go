package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func withDataDir(t *testing.T) {
	t.Helper()
	dataDir = t.TempDir()
	lanKeyOnce = onceReset()
	lanKeyVal = ""
}

func TestLanKeyIsStableAndLong(t *testing.T) {
	withDataDir(t)
	k := lanKey()
	if len(k) < 20 {
		t.Fatalf("llave demasiado corta (%d): se adivinaría en una LAN", len(k))
	}
	if k2 := lanKey(); k2 != k {
		t.Fatal("la llave cambió entre llamadas: el QR de ayer dejaría de valer")
	}
	// una instancia nueva sobre la MISMA carpeta debe reutilizarla
	dir := dataDir
	lanKeyOnce = onceReset()
	lanKeyVal = ""
	dataDir = dir
	if k3 := lanKey(); k3 != k {
		t.Fatalf("la llave no sobrevive al reinicio: %q vs %q", k3, k)
	}
}

func TestLoopbackNeedsNoKey(t *testing.T) {
	withDataDir(t)
	r := httptest.NewRequest(http.MethodGet, "/api/state", nil)
	r.RemoteAddr = "127.0.0.1:51000"
	if !lanAuthorized(httptest.NewRecorder(), r) {
		t.Fatal("desde el propio equipo no se puede pedir llave")
	}
}

func TestLanWithoutKeyIsRejected(t *testing.T) {
	withDataDir(t)
	r := httptest.NewRequest(http.MethodGet, "/api/state", nil)
	r.RemoteAddr = "192.168.1.44:51000"
	w := httptest.NewRecorder()
	if lanAuthorized(w, r) {
		t.Fatal("un dispositivo de la LAN sin llave NO puede entrar")
	}
	denyLAN(w, r)
	if w.Code != http.StatusUnauthorized {
		t.Fatalf("esperaba 401, salió %d", w.Code)
	}
}

func TestLanWithKeyInURLGetsCookie(t *testing.T) {
	withDataDir(t)
	r := httptest.NewRequest(http.MethodGet, "/?k="+lanKey(), nil)
	r.RemoteAddr = "192.168.1.44:51000"
	w := httptest.NewRecorder()
	if !lanAuthorized(w, r) {
		t.Fatal("la llave del QR debería abrir")
	}
	cookies := w.Result().Cookies()
	if len(cookies) != 1 || cookies[0].Name != lanCookie || cookies[0].Value != lanKey() {
		t.Fatalf("no se dejó la cookie de emparejamiento: %+v", cookies)
	}
	if !cookies[0].HttpOnly {
		t.Fatal("la cookie de la llave debe ser HttpOnly")
	}

	// y a partir de ahí, sin ?k= en cada navegación
	r2 := httptest.NewRequest(http.MethodGet, "/idioma/de", nil)
	r2.RemoteAddr = "192.168.1.44:51000"
	r2.AddCookie(cookies[0])
	if !lanAuthorized(httptest.NewRecorder(), r2) {
		t.Fatal("con la cookie puesta debería seguir abriendo")
	}
}

func TestWrongKeyIsRejected(t *testing.T) {
	withDataDir(t)
	real := lanKey()
	for _, bad := range []string{"", "x", real[:len(real)-1], real + "a"} {
		r := httptest.NewRequest(http.MethodGet, "/?k="+bad, nil)
		r.RemoteAddr = "10.0.0.9:51000"
		if lanAuthorized(httptest.NewRecorder(), r) {
			t.Fatalf("llave inválida aceptada: %q", bad)
		}
	}
}

// Un Origin de una sola etiqueta («evil») NO es un host privado: pasaba por
// serlo y colaba en los filtros de origen.
func TestSingleLabelHostIsNotPrivate(t *testing.T) {
	for _, bad := range []string{"evil", "evil:8787", "attacker-site", "seshat"} {
		if privateHost.MatchString(bad) {
			t.Fatalf("%q no debería contar como host privado", bad)
		}
	}
	for _, good := range []string{"localhost", "localhost:8787", "macbook.local", "192.168.1.9:8787", "100.101.2.3"} {
		if !privateHost.MatchString(good) {
			t.Fatalf("%q sí es un host privado legítimo", good)
		}
	}
}
