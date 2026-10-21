package main

import (
	"bytes"
	"context"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"
)

// capturarLog desvía el log del paquete mientras corre el subtest. La
// migración de nombres anota ahí lo que hizo, y el test lo lee.
func capturarLog(t *testing.T) *bytes.Buffer {
	t.Helper()
	var buf bytes.Buffer
	prev := log.Writer()
	flags := log.Flags()
	log.SetOutput(&buf)
	log.SetFlags(0)
	t.Cleanup(func() {
		log.SetOutput(prev)
		log.SetFlags(flags)
	})
	return &buf
}

// P29: en Linux Ana.json y ana.json son dos perfiles. El arranque pasaba el
// primero a minúsculas con os.Rename, y eso sustituye el destino: el historial
// del que ya se llamaba bien desaparecía. Si no es el mismo archivo, se queda
// el nombre raro, se anota y se sigue. En APFS el par es un solo archivo y
// ahí sí hay que bajar la grafía, o el caso de Mac dejaría de migrar.

func TestMinusculasNoPisanOtroPerfil(t *testing.T) {
	t.Run("el mismo archivo baja a minúsculas", func(t *testing.T) {
		dir := t.TempDir()
		if distingueMayusculas(dir) {
			t.Skip("hace falta un disco que no distinga mayúsculas, como APFS")
		}
		escribirPerfil(t, dir, "Ana.json", "la-unica")
		escribirPerfil(t, dir, "ya.json", "ya-quieto")
		escribirPerfil(t, dir, "Notas.txt", "no-toca")

		buf := capturarLog(t)
		migrateProfileNamesToLower(dir)

		if tieneNombre(t, dir, "Ana.json") || !tieneNombre(t, dir, "ana.json") {
			t.Fatalf("Ana.json debía quedar como ana.json, hay %v", nombresEn(t, dir))
		}
		if leerPerfil(t, dir, "ana.json") != "la-unica" {
			t.Fatalf("el contenido cambió: %q", leerPerfil(t, dir, "ana.json"))
		}
		if leerPerfil(t, dir, "ya.json") != "ya-quieto" || leerPerfil(t, dir, "Notas.txt") != "no-toca" {
			t.Fatal("se tocó un archivo que ya estaba en minúsculas o que no es un perfil")
		}
		if !strings.Contains(buf.String(), "perfil migrado a minúsculas: Ana.json → ana.json") {
			t.Fatalf("no anotó la migración: %s", buf.String())
		}
		if strings.Contains(buf.String(), "no se pasa a minúsculas") {
			t.Fatalf("en este disco Ana.json y ana.json son el mismo archivo; el log dice que no: %s", buf.String())
		}
		sinCasemig(t, dir)
	})

	t.Run("otro archivo no se pisa", func(t *testing.T) {
		dir := dirQueDistingueMayusculas(t)
		buf := capturarLog(t)

		solo := filepath.Join(dir, "solo")
		if err := os.Mkdir(solo, 0o755); err != nil {
			t.Fatal(err)
		}
		escribirPerfil(t, solo, "Cata.json", "cata")
		migrateProfileNamesToLower(solo)
		if tieneNombre(t, solo, "Cata.json") || !tieneNombre(t, solo, "cata.json") {
			t.Fatalf("Cata.json debía migrar cuando el destino no existe, hay %v", nombresEn(t, solo))
		}
		if leerPerfil(t, solo, "cata.json") != "cata" {
			t.Fatalf("el huérfano cambió de contenido: %q", leerPerfil(t, solo, "cata.json"))
		}
		sinCasemig(t, solo)

		ambos := filepath.Join(dir, "ambos")
		if err := os.Mkdir(ambos, 0o755); err != nil {
			t.Fatal(err)
		}
		escribirPerfil(t, ambos, "Ana.json", "la-rara")
		escribirPerfil(t, ambos, "ana.json", "la-buena")
		escribirPerfil(t, ambos, "Beto.json", "beto")
		escribirPerfil(t, ambos, "ya.json", "ya-quieto")
		escribirPerfil(t, ambos, "Notas.txt", "no-toca")

		migrateProfileNamesToLower(ambos)

		if leerPerfil(t, ambos, "Ana.json") != "la-rara" || leerPerfil(t, ambos, "ana.json") != "la-buena" {
			t.Fatalf("se pisó un perfil: Ana=%q ana=%q nombres=%v",
				leerPerfil(t, ambos, "Ana.json"), leerPerfil(t, ambos, "ana.json"), nombresEn(t, ambos))
		}
		if !tieneNombre(t, ambos, "Ana.json") || !tieneNombre(t, ambos, "ana.json") {
			t.Fatalf("tenían que seguir los dos nombres, hay %v", nombresEn(t, ambos))
		}
		if tieneNombre(t, ambos, "Beto.json") || !tieneNombre(t, ambos, "beto.json") || leerPerfil(t, ambos, "beto.json") != "beto" {
			t.Fatalf("al negarse a pisar Ana debía seguir con Beto, hay %v", nombresEn(t, ambos))
		}
		if leerPerfil(t, ambos, "ya.json") != "ya-quieto" || leerPerfil(t, ambos, "Notas.txt") != "no-toca" {
			t.Fatal("se tocó un archivo que ya estaba en minúsculas o que no es un perfil")
		}
		if !strings.Contains(buf.String(), "perfil Ana.json no se pasa a minúsculas: ana.json ya existe y es otro archivo") {
			t.Fatalf("no anotó que no pisaba: %s", buf.String())
		}
		if !strings.Contains(buf.String(), "perfil migrado a minúsculas: Beto.json → beto.json") {
			t.Fatalf("no siguió con el otro perfil: %s", buf.String())
		}
		if strings.Contains(buf.String(), "Beto.json no se pasa") {
			t.Fatalf("Beto no tenía destino y se negó: %s", buf.String())
		}
		sinCasemig(t, ambos)
	})
}

func escribirPerfil(t *testing.T, dir, name, body string) {
	t.Helper()
	if err := os.WriteFile(filepath.Join(dir, name), []byte(body), 0o644); err != nil {
		t.Fatal(err)
	}
}

func leerPerfil(t *testing.T, dir, name string) string {
	t.Helper()
	b, err := os.ReadFile(filepath.Join(dir, name))
	if err != nil {
		t.Fatalf("leer %s: %v", name, err)
	}
	return string(b)
}

func tieneNombre(t *testing.T, dir, name string) bool {
	t.Helper()
	for _, n := range nombresEn(t, dir) {
		if n == name {
			return true
		}
	}
	return false
}

func nombresEn(t *testing.T, dir string) []string {
	t.Helper()
	entries, err := os.ReadDir(dir)
	if err != nil {
		t.Fatal(err)
	}
	var out []string
	for _, e := range entries {
		out = append(out, e.Name())
	}
	return out
}

func sinCasemig(t *testing.T, dir string) {
	t.Helper()
	for _, n := range nombresEn(t, dir) {
		if strings.HasSuffix(n, ".casemig") {
			t.Fatalf("quedó el temporal %s", n)
		}
	}
}

// distingueMayusculas prueba el directorio de verdad. En APFS el segundo
// nombre ni siquiera se puede crear: es el mismo archivo.
func distingueMayusculas(dir string) bool {
	a := filepath.Join(dir, "SeNsE.chk")
	b := filepath.Join(dir, "sense.chk")
	if err := os.WriteFile(a, []byte("A"), 0o644); err != nil {
		return false
	}
	defer os.Remove(a)
	f, err := os.OpenFile(b, os.O_CREATE|os.O_EXCL|os.O_WRONLY, 0o644)
	if err != nil {
		return false
	}
	f.Close()
	defer os.Remove(b)
	got, err := os.ReadFile(a)
	return err == nil && string(got) == "A"
}

// dirQueDistingueMayusculas es un temporal cuando el disco ya distingue, y en
// el Mac un volumen APFS sensible: si no, el test no puede tener Ana.json y
// ana.json a la vez y el fallo que se quiere cazar ni se ejecuta.
func dirQueDistingueMayusculas(t *testing.T) string {
	t.Helper()
	dir := t.TempDir()
	if distingueMayusculas(dir) {
		return dir
	}
	if runtime.GOOS != "darwin" {
		t.Skip("este disco no distingue mayúsculas y no sé crear uno que sí")
	}
	return montarAPFSSensible(t)
}

func montarAPFSSensible(t *testing.T) string {
	t.Helper()
	base := t.TempDir()
	img := filepath.Join(base, "caso.dmg")
	mnt := filepath.Join(base, "mnt")
	if err := os.Mkdir(mnt, 0o755); err != nil {
		t.Fatal(err)
	}
	hdiutil(t, "create", "-size", "8m", "-fs", "Case-sensitive APFS", "-volname", "seshatcs", "-nospotlight", img)
	hdiutil(t, "attach", "-nobrowse", "-owners", "off", "-mountpoint", mnt, img)
	t.Cleanup(func() {
		if err := detachVolumen(mnt); err != nil {
			if err2 := detachVolumen("-force", mnt); err2 != nil {
				t.Errorf("no pude desmontar %s: %v; a la fuerza: %v", mnt, err, err2)
			}
		}
	})
	if !distingueMayusculas(mnt) {
		t.Fatal("el disco montado no distingue mayúsculas")
	}
	return mnt
}

func hdiutil(t *testing.T, args ...string) {
	t.Helper()
	if out, err := hdiutilRun(args...); err != nil {
		t.Fatalf("hdiutil %s: %v\n%s", strings.Join(args, " "), err, out)
	}
}

func detachVolumen(args ...string) error {
	_, err := hdiutilRun(append([]string{"detach"}, args...)...)
	return err
}

func hdiutilRun(args ...string) ([]byte, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	return exec.CommandContext(ctx, "hdiutil", args...).CombinedOutput()
}
