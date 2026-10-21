//go:build unix

package main

import (
	"context"
	"fmt"
	"os"
	"os/exec"
	"strings"
	"syscall"
	"time"
)

// inspectLockProcess: señal 0 pregunta si el PID existe, sin enviarle nada.
// EPERM también es «existe» (otro usuario). Si existe, miramos si el binario
// es el nuestro: mismo ejecutable significa la instancia que se durmió con
// el portátil, no un extraño que heredó el número.
func inspectLockProcess(pid int) (alive, ours bool) {
	err := syscall.Kill(pid, 0)
	if err != nil && err != syscall.EPERM {
		return false, false
	}
	return true, processIsOurs(pid)
}

func processIsOurs(pid int) bool {
	self, err := os.Executable()
	if err != nil || self == "" {
		return false
	}
	raw, resolved := self, resolvePath(self)
	for _, line := range processExecutableLines(pid) {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		for _, c := range []string{raw, resolved} {
			if c == "" {
				continue
			}
			if sameExecutablePath(c, line) || commandStartsWith(line, c) {
				return true
			}
		}
		tok, _, _ := strings.Cut(line, " ")
		if tok != "" && (sameExecutablePath(raw, tok) || sameExecutablePath(resolved, tok)) {
			return true
		}
	}
	return false
}

// processExecutableLines: rutas con las que se puede reconocer el binario.
// En Linux, /proc/<pid>/exe es la ruta real, da igual cómo se haya escrito
// el comando. En Darwin no hay /proc y `ps` devuelve el argv: un `./seshat`
// no coincide con la ruta absoluta, y el candado se robaría tras una siesta.
// `lsof -d txt` es el ejecutable mapeado, absoluto. Si nada de eso responde,
// el llamador cae al margen de tiempo — no inventa un «es nuestro».
func processExecutableLines(pid int) []string {
	var lines []string
	if dest, err := os.Readlink(fmt.Sprintf("/proc/%d/exe", pid)); err == nil && dest != "" {
		lines = append(lines, strings.TrimSuffix(dest, " (deleted)"))
	}
	lines = append(lines, lsofTexts(pid)...)
	if cmd := psCommand(pid); cmd != "" {
		lines = append(lines, cmd)
	}
	return lines
}

func lsofTexts(pid int) []string {
	lsof := "/usr/sbin/lsof"
	if _, err := os.Stat(lsof); err != nil {
		return nil
	}
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()
	out, err := exec.CommandContext(ctx, lsof, "-a", "-p", fmt.Sprint(pid), "-d", "txt", "-Fn").Output()
	if len(out) == 0 {
		if err != nil {
			return nil
		}
	}
	var paths []string
	for _, line := range strings.Split(string(out), "\n") {
		// El formato -F antepone «n» al nombre. La ruta puede llevar espacios.
		if len(line) < 2 || line[0] != 'n' {
			continue
		}
		paths = append(paths, line[1:])
	}
	return paths
}

func psCommand(pid int) string {
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()
	out, err := exec.CommandContext(ctx, "/bin/ps", "-p", fmt.Sprint(pid), "-ww", "-o", "command=").Output()
	if err != nil {
		return ""
	}
	return string(out)
}
