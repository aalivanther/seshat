package main

import (
	"archive/zip"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"sync"
	"time"
)

// ACTUALIZACIONES DENTRO DE LA APP
//
// Hasta ahora, actualizar significaba descargar 47 MB de binario y reemplazar
// la aplicación entera — para un drop que casi siempre es contenido. Aquí va lo
// que el dueño pidió: un botón, un paquete que se carga desde la propia app,
// una barra de progreso y, al terminar, una frase clara y las notas del parche.
//
// Un paquete (.seshatpack) es un zip con:
//   manifest.json  → { "version": "1.5", "drop": 6, "notes": ["…", "…"],
//                      "requiresApp": "1.4", "title": "Drop 6 — Alemán B2" }
//   web/…          → la interfaz y el contenido ya exportados (lo que hoy va
//                    embebido en el binario)
//
// Al aplicarlo se descomprime junto a los perfiles, NO dentro de la app: así
// una actualización nunca puede corromper el ejecutable, el antivirus no se
// pone nervioso y volver atrás es tan barato como borrar una carpeta. El
// servidor sirve la UI del paquete si hay uno activo, y la embebida si no.
//
// Lo que un paquete NO puede hacer: cambiar el motor. Para eso sigue haciendo
// falta el binario nuevo — y el manifiesto lo declara con `requiresApp`, así
// que un paquete que pide más motor del que hay se rechaza con un motivo
// legible en vez de dejar la app a medias.

const packMaxBytes = 512 << 20 // 512 MB: un drop de contenido cabe de sobra

type updateManifest struct {
	Version     string   `json:"version"`
	Drop        int      `json:"drop"`
	Title       string   `json:"title"`
	Notes       []string `json:"notes"`
	RequiresApp string   `json:"requiresApp"`
	AppliedAt   string   `json:"appliedAt,omitempty"`
}

var updateMu sync.Mutex

func updatesDir() string   { return filepath.Join(dataDir, "updates") }
func activePath() string   { return filepath.Join(updatesDir(), "active.json") }
func activeWebDir() string { return filepath.Join(updatesDir(), "active", "web") }

// activeUpdate devuelve el paquete aplicado, o nil si la app va con su UI
// embebida de fábrica.
func activeUpdate() *updateManifest {
	b, err := os.ReadFile(activePath())
	if err != nil {
		return nil
	}
	var m updateManifest
	if json.Unmarshal(b, &m) != nil {
		return nil
	}
	if _, err := os.Stat(filepath.Join(activeWebDir(), "index.html")); err != nil {
		return nil // manifiesto sin UI: como si no hubiera nada
	}
	if packOutdated(&m) {
		// Un .seshatpack de drop 7 tapaba el drop 8 de fábrica: la landing
		// seguía en A1–B1 y el JS nuevo (colocación en el perfil) no corría.
		outdatedPackOnce.Do(func() {
			log.Printf("paquete %s (drop %d) ignorado: la fábrica es %s drop %s", m.Version, m.Drop, version, contentVersion)
		})
		return nil
	}
	return &m
}

var outdatedPackOnce sync.Once

// packOutdated: el paquete es más viejo que el binario. Servirlo escondería
// el contenido nuevo (B2, colocación en el perfil) detrás de una UI muerta.
func packOutdated(m *updateManifest) bool {
	if m == nil {
		return false
	}
	if fd, err := strconv.Atoi(contentVersion); err == nil && m.Drop > 0 && m.Drop < fd {
		return true
	}
	if version != "" && version != "dev" && m.Version != "" && m.Version != version {
		if versionAtLeast(version, m.Version) && !versionAtLeast(m.Version, version) {
			return true
		}
	}
	return false
}

// versionAtLeast: ¿`have` es al menos `want`? Compara 1.4.2 numéricamente por
// tramos; lo que no sea número cuenta como 0 (una build "dev" no bloquea nada).
func versionAtLeast(have, want string) bool {
	if want == "" {
		return true
	}
	// Una build de desarrollo ("dev") no lleva número y no puede quedarse fuera:
	// es justo donde se prueban los paquetes antes de publicarlos.
	if have == "" || have == "dev" {
		return true
	}
	hs, ws := strings.Split(have, "."), strings.Split(want, ".")
	for i := 0; i < len(ws); i++ {
		var h, w int
		if i < len(hs) {
			h, _ = strconv.Atoi(strings.TrimFunc(hs[i], func(r rune) bool { return r < '0' || r > '9' }))
		}
		w, _ = strconv.Atoi(strings.TrimFunc(ws[i], func(r rune) bool { return r < '0' || r > '9' }))
		if h != w {
			return h > w
		}
	}
	return true
}

// handleUpdateState: qué versión corre y qué paquete está aplicado.
func handleUpdateState(w http.ResponseWriter, _ *http.Request) {
	out := map[string]any{
		"app":     version,
		"content": contentVersion,
		"active":  activeUpdate(),
	}
	writeJSON(w, out)
}

// handleUpdateApply recibe el .seshatpack y lo aplica. Solo desde ESTE equipo:
// cambiar lo que ve todo el mundo no puede hacerse desde el móvil de nadie.
func handleUpdateApply(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "usa POST", http.StatusMethodNotAllowed)
		return
	}
	if !isLoopback(r.RemoteAddr) {
		http.Error(w, "las actualizaciones se instalan desde el equipo donde corre Seshat, no desde la red", http.StatusForbidden)
		return
	}
	if !updateMu.TryLock() {
		http.Error(w, "ya hay una actualización en curso", http.StatusConflict)
		return
	}
	defer updateMu.Unlock()

	if err := os.MkdirAll(updatesDir(), 0o755); err != nil {
		http.Error(w, "no se pudo preparar la carpeta de actualizaciones: "+err.Error(), http.StatusInternalServerError)
		return
	}
	tmpZip := filepath.Join(updatesDir(), "incoming.seshatpack")
	defer os.Remove(tmpZip)

	f, err := os.Create(tmpZip)
	if err != nil {
		http.Error(w, "no se pudo guardar el paquete: "+err.Error(), http.StatusInternalServerError)
		return
	}
	n, cerr := io.Copy(f, io.LimitReader(r.Body, packMaxBytes+1))
	closeErr := f.Close()
	if cerr != nil || closeErr != nil {
		http.Error(w, "la subida se interrumpió: vuelve a intentarlo", http.StatusBadRequest)
		return
	}
	if n > packMaxBytes {
		http.Error(w, "el paquete pasa de 512 MB: no parece una actualización de Seshat", http.StatusRequestEntityTooLarge)
		return
	}

	man, err := applyPack(tmpZip)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	log.Printf("actualización aplicada: %s (drop %d)", man.Version, man.Drop)
	writeJSON(w, map[string]any{"ok": true, "manifest": man})
}

// applyPack valida y descomprime. Estrategia de todo-o-nada: se extrae a una
// carpeta nueva y solo al final se cambia el puntero; si algo falla a mitad, lo
// que había sigue en su sitio y la app sigue funcionando.
func applyPack(zipPath string) (*updateManifest, error) {
	zr, err := zip.OpenReader(zipPath)
	if err != nil {
		return nil, errors.New("el archivo no es un paquete de Seshat (no se pudo abrir como zip)")
	}
	defer zr.Close()

	var man updateManifest
	found := false
	for _, zf := range zr.File {
		if filepath.Clean(zf.Name) == "manifest.json" {
			rc, err := zf.Open()
			if err != nil {
				return nil, errors.New("el paquete tiene un manifiesto ilegible")
			}
			b, _ := io.ReadAll(io.LimitReader(rc, 1<<20))
			rc.Close()
			if json.Unmarshal(b, &man) != nil {
				return nil, errors.New("el manifiesto del paquete no es un JSON válido")
			}
			found = true
			break
		}
	}
	if !found {
		return nil, errors.New("el paquete no trae manifest.json: no es una actualización de Seshat")
	}
	if man.Version == "" {
		return nil, errors.New("el manifiesto no dice qué versión trae")
	}
	if !versionAtLeast(version, man.RequiresApp) {
		return nil, fmt.Errorf("este paquete necesita Seshat %s o superior y tú tienes la %s: descarga la aplicación nueva", man.RequiresApp, version)
	}
	if packOutdated(&man) {
		return nil, fmt.Errorf("este paquete (drop %d, %s) es más viejo que el contenido de fábrica (drop %s, %s): no se instala", man.Drop, man.Version, contentVersion, version)
	}

	staging := filepath.Join(updatesDir(), "staging")
	_ = os.RemoveAll(staging)
	if err := os.MkdirAll(staging, 0o755); err != nil {
		return nil, errors.New("no se pudo preparar la instalación: " + err.Error())
	}
	defer os.RemoveAll(staging)

	var webFiles int
	for _, zf := range zr.File {
		name := filepath.ToSlash(filepath.Clean(zf.Name))
		if name == "manifest.json" {
			continue
		}
		if !strings.HasPrefix(name, "web/") {
			continue // el paquete solo puede traer la interfaz y el contenido
		}
		// ZIP SLIP: un nombre con ../ escribiría fuera de la carpeta. Se
		// comprueba SIEMPRE, aunque el paquete venga del propio autor.
		dest := filepath.Join(staging, filepath.FromSlash(name))
		if !strings.HasPrefix(dest, filepath.Clean(staging)+string(os.PathSeparator)) {
			return nil, errors.New("el paquete intenta escribir fuera de su carpeta: rechazado")
		}
		if zf.FileInfo().IsDir() {
			if err := os.MkdirAll(dest, 0o755); err != nil {
				return nil, errors.New("no se pudo crear " + name + ": " + err.Error())
			}
			continue
		}
		if err := os.MkdirAll(filepath.Dir(dest), 0o755); err != nil {
			return nil, errors.New("no se pudo crear la carpeta de " + name)
		}
		rc, err := zf.Open()
		if err != nil {
			return nil, errors.New("no se pudo leer " + name + " del paquete")
		}
		out, err := os.Create(dest)
		if err != nil {
			rc.Close()
			return nil, errors.New("no se pudo escribir " + name + ": " + err.Error())
		}
		_, cerr := io.Copy(out, rc)
		rc.Close()
		serr := out.Sync()
		clerr := out.Close()
		if cerr != nil || serr != nil || clerr != nil {
			return nil, errors.New("la instalación se quedó a medias escribiendo " + name + " (¿disco lleno?)")
		}
		webFiles++
	}
	if webFiles == 0 {
		return nil, errors.New("el paquete no trae ninguna pantalla (carpeta web/): no serviría de nada")
	}
	if _, err := os.Stat(filepath.Join(staging, "web", "index.html")); err != nil {
		return nil, errors.New("el paquete no trae la pantalla de inicio (web/index.html)")
	}

	// cambio de puntero: lo viejo se guarda por si hay que volver
	active := filepath.Join(updatesDir(), "active")
	prev := filepath.Join(updatesDir(), "previous")
	_ = os.RemoveAll(prev)
	if _, err := os.Stat(active); err == nil {
		if err := os.Rename(active, prev); err != nil {
			return nil, errors.New("no se pudo apartar la versión anterior: " + err.Error())
		}
	}
	if err := os.Rename(staging, active); err != nil {
		_ = os.Rename(prev, active) // devolver lo de antes: mejor viejo que roto
		return nil, errors.New("no se pudo activar la actualización: " + err.Error())
	}
	man.AppliedAt = time.Now().Format(time.RFC3339)
	b, _ := json.MarshalIndent(man, "", "  ")
	if err := os.WriteFile(activePath(), b, 0o644); err != nil {
		return nil, errors.New("la actualización se instaló pero no se pudo anotar: " + err.Error())
	}
	return &man, nil
}

// handleUpdateRollback vuelve al paquete anterior (o a la UI de fábrica).
func handleUpdateRollback(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "usa POST", http.StatusMethodNotAllowed)
		return
	}
	// Un formulario de cualquier página abierta en este equipo puede hacer
	// POST a 127.0.0.1 sin preflight: el CORS no llega a impedir la petición,
	// solo tapa la respuesta. Sin el origen de la propia app, esa página
	// revertiría el contenido que se está estudiando.
	if !sameAppOrigin(r) {
		http.Error(w, "esta petición no viene de Seshat", http.StatusForbidden)
		return
	}
	if !isLoopback(r.RemoteAddr) {
		http.Error(w, "solo desde el equipo donde corre Seshat", http.StatusForbidden)
		return
	}
	updateMu.Lock()
	defer updateMu.Unlock()

	active := filepath.Join(updatesDir(), "active")
	prev := filepath.Join(updatesDir(), "previous")
	_ = os.RemoveAll(active)
	_ = os.Remove(activePath())
	if _, err := os.Stat(prev); err == nil {
		if err := os.Rename(prev, active); err != nil {
			http.Error(w, "no se pudo recuperar la versión anterior: "+err.Error(), http.StatusInternalServerError)
			return
		}
		log.Println("actualización revertida al paquete anterior")
	} else {
		log.Println("actualización revertida: la app vuelve a su contenido de fábrica")
	}
	writeJSON(w, map[string]any{"ok": true, "active": activeUpdate()})
}
