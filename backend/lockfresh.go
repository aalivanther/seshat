package main

import (
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"time"
)

// lockFreshWindow: el latido toca el lock cada 2 min. Pasado este margen, un
// PID que ya no es el nuestro es un número reciclado, no una Seshat dormida.
const lockFreshWindow = 10 * time.Minute

// lockHolderAlive decide si ese PID sigue siendo el dueño del lock.
//
// El proceso manda, no el reloj de pared: un portátil suspendido no ejecuta
// el latido, el mtime envejece y el proceso sigue siendo esta app. Robar el
// lock ahí levanta un segundo servidor sobre los mismos JSON.
//
// El margen de lockFreshWindow se conserva para el otro caso: el PID existe,
// pero ya es otro programa (el número se recicló). Un lock reciente puede
// ser de un cierre de hace un momento; uno viejo, no.
func lockHolderAlive(pid int, lockPath string) bool {
	if pid <= 0 {
		return false
	}
	alive, ours := inspectLockProcess(pid)
	if !alive {
		return false
	}
	if ours {
		return true
	}
	return lockFresh(lockPath)
}

func lockFresh(path string) bool {
	fi, err := os.Stat(path)
	if err != nil {
		return false
	}
	return time.Since(fi.ModTime()) < lockFreshWindow
}

func sameExecutablePath(a, b string) bool {
	a = resolvePath(a)
	b = resolvePath(b)
	if runtime.GOOS == "windows" {
		return strings.EqualFold(a, b)
	}
	return a == b
}

func resolvePath(p string) string {
	// QueryFullProcessImageName a veces antepone este prefijo; sin quitarlo,
	// la comparación fallaría y un Windows suspendido volvería a parecer muerto.
	p = strings.TrimPrefix(p, `\\?\`)
	if r, err := filepath.EvalSymlinks(p); err == nil {
		return r
	}
	return filepath.Clean(p)
}

// commandStartsWith informa si la línea de `ps` arranca por este ejecutable.
// El prefijo evita partir por espacios: la ruta del usuario puede llevarlos.
func commandStartsWith(line, exe string) bool {
	line = strings.TrimSpace(line)
	if line == exe {
		return true
	}
	if !strings.HasPrefix(line, exe) {
		return false
	}
	if len(line) == len(exe) {
		return true
	}
	next := line[len(exe)]
	return next == ' ' || next == '\t'
}
