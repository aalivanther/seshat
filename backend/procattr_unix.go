//go:build !windows

package main

import "os/exec"

// setNoConsole: en unix no hay ventana de consola que ocultar.
func setNoConsole(_ *exec.Cmd) {}
