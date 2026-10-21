//go:build windows

package main

import (
	"os/exec"
	"syscall"
)

// setNoConsole evita la consola negra que Windows abriría al lanzar un
// proceso desde la app (CREATE_NO_WINDOW). El navegador al abrir Seshat
// pasa por aquí.
func setNoConsole(cmd *exec.Cmd) {
	cmd.SysProcAttr = &syscall.SysProcAttr{
		CreationFlags: 0x08000000, // CREATE_NO_WINDOW
		HideWindow:    true,
	}
}
