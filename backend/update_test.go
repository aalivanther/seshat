package main

import (
	"archive/zip"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"testing"
)

func writePack(t *testing.T, path string, man map[string]any, files map[string]string) {
	t.Helper()
	f, err := os.Create(path)
	if err != nil {
		t.Fatal(err)
	}
	defer f.Close()
	z := zip.NewWriter(f)
	if man != nil {
		b, _ := json.Marshal(man)
		w, _ := z.Create("manifest.json")
		_, _ = w.Write(b)
	}
	for name, body := range files {
		w, _ := z.Create(name)
		_, _ = w.Write([]byte(body))
	}
	if err := z.Close(); err != nil {
		t.Fatal(err)
	}
}

// Una página cualquiera, abierta en este mismo equipo, no puede revertir el
// paquete: el POST llega a loopback y el CORS no lo frena. La app sí puede.
func TestRollbackRechazaOrigenAjeno(t *testing.T) {
	dataDir = t.TempDir()
	activeWeb := filepath.Join(updatesDir(), "active", "web")
	prevWeb := filepath.Join(updatesDir(), "previous", "web")
	if err := os.MkdirAll(activeWeb, 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.MkdirAll(prevWeb, 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filepath.Join(activeWeb, "index.html"), []byte("ACTIVO"), 0o644); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filepath.Join(prevWeb, "index.html"), []byte("PREVIO"), 0o644); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(activePath(), []byte(`{"version":"9","drop":9}`), 0o644); err != nil {
		t.Fatal(err)
	}

	ajeno := httptest.NewRequest(http.MethodPost, "/api/update/rollback", nil)
	ajeno.RemoteAddr = "127.0.0.1:1234"
	ajeno.Header.Set("Origin", "https://evil.example")
	w := httptest.NewRecorder()
	handleUpdateRollback(w, ajeno)
	if w.Code != http.StatusForbidden {
		t.Fatalf("origen ajeno: esperaba 403, salió %d", w.Code)
	}
	if b, err := os.ReadFile(filepath.Join(activeWeb, "index.html")); err != nil || string(b) != "ACTIVO" {
		t.Fatalf("el paquete activo se movió: %q %v", b, err)
	}
	if b, err := os.ReadFile(filepath.Join(prevWeb, "index.html")); err != nil || string(b) != "PREVIO" {
		t.Fatalf("el paquete anterior se movió: %q %v", b, err)
	}
	if _, err := os.Stat(activePath()); err != nil {
		t.Fatal("se borró active.json")
	}

	propio := httptest.NewRequest(http.MethodPost, "/api/update/rollback", nil)
	propio.RemoteAddr = "127.0.0.1:1234"
	propio.Header.Set("Origin", "http://localhost:8787")
	w2 := httptest.NewRecorder()
	handleUpdateRollback(w2, propio)
	if w2.Code != http.StatusOK {
		t.Fatalf("desde la app: esperaba 200, salió %d (%s)", w2.Code, w2.Body.String())
	}
	if b, err := os.ReadFile(filepath.Join(updatesDir(), "active", "web", "index.html")); err != nil || string(b) != "PREVIO" {
		t.Fatalf("no volvió al paquete anterior: %q %v", b, err)
	}
	if _, err := os.Stat(prevWeb); !os.IsNotExist(err) {
		t.Fatal("previous debía desaparecer al promoverse")
	}
}

func TestApplyPackInstalaYRevierte(t *testing.T) {
	dataDir = t.TempDir()
	prevV, prevC := version, contentVersion
	t.Cleanup(func() { version, contentVersion = prevV, prevC })
	version = "1.4"
	contentVersion = "5"
	pack := filepath.Join(dataDir, "p.seshatpack")
	writePack(t, pack,
		map[string]any{"version": "1.5", "drop": 6, "title": "Drop 6", "notes": []string{"algo nuevo"}, "requiresApp": "1.4"},
		map[string]string{"web/index.html": "<h1>nuevo</h1>", "web/x/y.js": "console.log(1)"})

	man, err := applyPack(pack)
	if err != nil {
		t.Fatalf("no instaló: %v", err)
	}
	if man.Version != "1.5" || len(man.Notes) != 1 || man.AppliedAt == "" {
		t.Fatalf("manifiesto incompleto: %+v", man)
	}
	if activeUpdate() == nil {
		t.Fatal("el paquete no quedó activo")
	}
	if _, err := os.Stat(filepath.Join(activeWebDir(), "x", "y.js")); err != nil {
		t.Fatal("no se extrajeron los archivos anidados")
	}
}

// Un paquete que pide más motor del que hay se rechaza CON MOTIVO, no a medias.
func TestPackMasViejoQueLaFabricaSeIgnora(t *testing.T) {
	dataDir = t.TempDir()
	prevV, prevC := version, contentVersion
	t.Cleanup(func() { version, contentVersion = prevV, prevC })
	version = "2.0.2"
	contentVersion = "8"
	web := filepath.Join(updatesDir(), "active", "web")
	if err := os.MkdirAll(web, 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filepath.Join(web, "index.html"), []byte("<h1>viejo</h1>"), 0o644); err != nil {
		t.Fatal(err)
	}
	man := []byte(`{"version":"1.9.4.5","drop":7,"title":"parche viejo"}`)
	if err := os.WriteFile(activePath(), man, 0o644); err != nil {
		t.Fatal(err)
	}
	if activeUpdate() != nil {
		t.Fatal("un paquete drop 7 no puede tapar el drop 8 de fábrica")
	}
	contentVersion = "7"
	version = "1.9.4.5"
	if activeUpdate() == nil {
		t.Fatal("el mismo paquete SÍ vale cuando la fábrica es drop 7")
	}
}

func TestApplyPackMasViejoQueLaFabricaSeRechaza(t *testing.T) {
	dataDir = t.TempDir()
	prevV, prevC := version, contentVersion
	t.Cleanup(func() { version, contentVersion = prevV, prevC })
	version = "2.0.3"
	contentVersion = "8"
	pack := filepath.Join(dataDir, "viejo.seshatpack")
	writePack(t, pack,
		map[string]any{"version": "1.9.4.5", "drop": 7, "title": "parche viejo", "requiresApp": "1.9.0.0"},
		map[string]string{"web/index.html": "<h1>viejo</h1>"})
	if _, err := applyPack(pack); err == nil {
		t.Fatal("un paquete drop 7 no puede instalarse encima del drop 8 de fábrica")
	}
	if activeUpdate() != nil {
		t.Fatal("el rechazo no puede dejar el paquete activo")
	}
}

func TestPackQuePideMasAppSeRechaza(t *testing.T) {
	dataDir = t.TempDir()
	version = "1.4"
	pack := filepath.Join(dataDir, "p.seshatpack")
	writePack(t, pack, map[string]any{"version": "2.0", "requiresApp": "2.0"},
		map[string]string{"web/index.html": "<h1>x</h1>"})
	if _, err := applyPack(pack); err == nil {
		t.Fatal("debería rechazarse por versión de app")
	}
	if activeUpdate() != nil {
		t.Fatal("no puede quedar nada instalado tras un rechazo")
	}
}

// ZIP SLIP: un nombre con ../ no puede escribir fuera de la carpeta.
func TestPackNoEscapaDeSuCarpeta(t *testing.T) {
	dataDir = t.TempDir()
	version = "1.4"
	pack := filepath.Join(dataDir, "malo.seshatpack")
	writePack(t, pack, map[string]any{"version": "1.5"},
		map[string]string{"web/index.html": "<h1>ok</h1>", "web/../../../fuera.txt": "boom"})
	_, _ = applyPack(pack)
	if _, err := os.Stat(filepath.Join(dataDir, "..", "fuera.txt")); err == nil {
		t.Fatal("el paquete escribió fuera de su carpeta")
	}
}

func TestPackSinManifiestoNiPantalla(t *testing.T) {
	dataDir = t.TempDir()
	version = "1.4"
	sin := filepath.Join(dataDir, "sin.seshatpack")
	writePack(t, sin, nil, map[string]string{"web/index.html": "x"})
	if _, err := applyPack(sin); err == nil {
		t.Fatal("un zip sin manifiesto no es una actualización")
	}
	vacio := filepath.Join(dataDir, "vacio.seshatpack")
	writePack(t, vacio, map[string]any{"version": "1.5"}, map[string]string{"lo-que-sea.txt": "x"})
	if _, err := applyPack(vacio); err == nil {
		t.Fatal("un paquete sin carpeta web/ no sirve de nada")
	}
}

func TestVersionAtLeast(t *testing.T) {
	casos := []struct {
		have, want string
		ok         bool
	}{
		{"1.4", "1.4", true}, {"1.4.1", "1.4", true}, {"1.3.9", "1.4", false},
		{"2.0", "1.9", true}, {"2.0.0", "2.0", true}, {"2.0", "2.0.0", true},
		{"1.9.9.9", "2.0", false}, {"dev", "1.4", true}, {"1.4", "", true},
	}
	for _, c := range casos {
		if got := versionAtLeast(c.have, c.want); got != c.ok {
			t.Fatalf("versionAtLeast(%q,%q) = %v", c.have, c.want, got)
		}
	}
}
