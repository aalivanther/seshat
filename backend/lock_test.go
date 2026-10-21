package main

import (
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strconv"
	"testing"
	"time"
)

func TestMain(m *testing.M) {
	// El test del argv relativo reejecuta este binario y necesita que se quede
	// vivo sin correr la batería otra vez.
	if os.Getenv("SESHAT_LOCK_HOLD") == "1" {
		time.Sleep(time.Minute)
		os.Exit(0)
	}
	os.Exit(m.Run())
}

// El lockfile guarda PID y PUERTO desde v1.3.1. Sin el puerto, un segundo
// arranque (el caso REAL: cerraste la pestaña y vuelves a abrir la app) no
// sabría a dónde llevarte y moría en silencio — en Windows, sin consola, eso
// significaba que el icono del escritorio dejaba de funcionar para siempre.

func TestReadLockAcceptsBothFormats(t *testing.T) {
	dir := t.TempDir()

	// formato NUEVO: "pid puerto"
	p := filepath.Join(dir, "new.lock")
	if err := os.WriteFile(p, []byte("4242 8799"), 0o644); err != nil {
		t.Fatal(err)
	}
	pid, port := readLock(p)
	if pid != 4242 || port != "8799" {
		t.Fatalf("readLock = %d/%q, esperaba 4242/8799", pid, port)
	}

	// formato VIEJO (perfiles anteriores al drop 5): solo el PID
	old := filepath.Join(dir, "old.lock")
	if err := os.WriteFile(old, []byte("777"), 0o644); err != nil {
		t.Fatal(err)
	}
	pid, port = readLock(old)
	if pid != 777 || port != "" {
		t.Fatalf("readLock legado = %d/%q, esperaba 777/\"\"", pid, port)
	}

	// basura o ausencia: nunca debe explotar
	if pid, port = readLock(filepath.Join(dir, "no-existe")); pid != 0 || port != "" {
		t.Fatalf("lock inexistente = %d/%q, esperaba 0/\"\"", pid, port)
	}
}

func TestWriteLockPortRoundTrip(t *testing.T) {
	p := filepath.Join(t.TempDir(), ".lock")
	writeLockPort(p, "8791")
	pid, port := readLock(p)
	if pid != os.Getpid() || port != "8791" {
		t.Fatalf("round trip = %d/%q, esperaba %d/8791", pid, port, os.Getpid())
	}
}

// Un PID reciclado no puede dejar la app imposible de abrir: el lockfile rancio
// (>10 min sin refrescarse) es de un muerto aunque ese número exista hoy.
func TestStaleLockIsIgnoredEvenIfPidExists(t *testing.T) {
	dir := t.TempDir()
	lock := filepath.Join(dir, ".lock")
	if err := os.WriteFile(lock, []byte("1 9999"), 0o600); err != nil {
		t.Fatal(err)
	}
	old := time.Now().Add(-2 * time.Hour)
	if err := os.Chtimes(lock, old, old); err != nil {
		t.Fatal(err)
	}
	// PID 1 existe siempre; el lock lleva dos horas sin refrescar
	if lockHolderAlive(1, lock) {
		t.Fatal("un lock de hace dos horas debe considerarse huérfano")
	}

	fresh := filepath.Join(dir, ".lock2")
	if err := os.WriteFile(fresh, []byte("1 9999"), 0o600); err != nil {
		t.Fatal(err)
	}
	if !lockHolderAlive(os.Getpid(), fresh) {
		t.Fatal("un lock recién escrito de un proceso vivo SÍ cuenta como vivo")
	}
}

// El portátil se suspende: el proceso sigue vivo, el latido no corre y el
// mtime pasa de diez minutos. Robar ese lock abre una segunda Seshat sobre
// los mismos perfiles.
func TestLiveProcessKeepsStaleLock(t *testing.T) {
	dir := t.TempDir()
	lock := filepath.Join(dir, ".lock")
	body := strconv.Itoa(os.Getpid())
	if err := os.WriteFile(lock, []byte(body), 0o600); err != nil {
		t.Fatal(err)
	}
	old := time.Now().Add(-2 * time.Hour)
	if err := os.Chtimes(lock, old, old); err != nil {
		t.Fatal(err)
	}
	if !lockHolderAlive(os.Getpid(), lock) {
		t.Fatal("un proceso vivo de este binario no se sustituye aunque el lock esté viejo")
	}
}

// Un PID vivo que no es este binario conserva el margen: fresco se respeta,
// viejo se reclama. Es el reciclaje de número, no la siesta.
func TestForeignPidUsesFreshMargin(t *testing.T) {
	if runtime.GOOS == "windows" {
		t.Skip("este caso usa /bin/sleep")
	}
	cmd := exec.Command("/bin/sleep", "30")
	if err := cmd.Start(); err != nil {
		t.Fatal(err)
	}
	defer func() {
		_ = cmd.Process.Kill()
		_, _ = cmd.Process.Wait()
	}()

	dir := t.TempDir()
	lock := filepath.Join(dir, ".lock")
	if err := os.WriteFile(lock, []byte(strconv.Itoa(cmd.Process.Pid)), 0o600); err != nil {
		t.Fatal(err)
	}
	if !lockHolderAlive(cmd.Process.Pid, lock) {
		t.Fatal("un lock fresco de otro programa sigue dentro del margen")
	}
	old := time.Now().Add(-2 * time.Hour)
	if err := os.Chtimes(lock, old, old); err != nil {
		t.Fatal(err)
	}
	if lockHolderAlive(cmd.Process.Pid, lock) {
		t.Fatal("un lock viejo de otro programa es un PID reciclado y se reclama")
	}
}

// En Darwin `ps` devuelve el argv. `./binario` no es la ruta absoluta, y sin
// mirar el ejecutable mapeado una siesta volvería a dejar robar el lock.
func TestRelativeArgvKeepsStaleLock(t *testing.T) {
	if runtime.GOOS == "windows" {
		t.Skip("el argv relativo se resuelve con lsof")
	}
	self, err := os.Executable()
	if err != nil {
		t.Fatal(err)
	}
	cmd := exec.Command("./" + filepath.Base(self))
	cmd.Dir = filepath.Dir(self)
	cmd.Env = append(os.Environ(), "SESHAT_LOCK_HOLD=1")
	if err := cmd.Start(); err != nil {
		t.Fatal(err)
	}
	defer func() {
		_ = cmd.Process.Kill()
		_, _ = cmd.Process.Wait()
	}()

	lock := filepath.Join(t.TempDir(), ".lock")
	if err := os.WriteFile(lock, []byte(strconv.Itoa(cmd.Process.Pid)), 0o600); err != nil {
		t.Fatal(err)
	}
	old := time.Now().Add(-2 * time.Hour)
	if err := os.Chtimes(lock, old, old); err != nil {
		t.Fatal(err)
	}
	if !lockHolderAlive(cmd.Process.Pid, lock) {
		t.Fatal("un proceso vivo arrancado con ruta relativa no se sustituye aunque el lock esté viejo")
	}
}

func TestDeadProcessDoesNotHoldLock(t *testing.T) {
	if runtime.GOOS == "windows" {
		t.Skip("este caso usa /bin/sleep")
	}
	cmd := exec.Command("/bin/sleep", "30")
	if err := cmd.Start(); err != nil {
		t.Fatal(err)
	}
	pid := cmd.Process.Pid
	if err := cmd.Process.Kill(); err != nil {
		t.Fatal(err)
	}
	if _, err := cmd.Process.Wait(); err != nil {
		t.Fatal(err)
	}
	lock := filepath.Join(t.TempDir(), ".lock")
	if err := os.WriteFile(lock, []byte(strconv.Itoa(pid)), 0o600); err != nil {
		t.Fatal(err)
	}
	if lockHolderAlive(pid, lock) {
		t.Fatal("un proceso ya terminado no retiene el lock")
	}
}
