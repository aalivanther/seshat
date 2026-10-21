//go:build windows

package main

import (
	"syscall"
	"unsafe"
)

// openWindows abre una URL con ShellExecuteW, la API que usa el propio
// Explorador. No crea ningún proceso hijo (a diferencia de rundll32), así que
// no puede parpadear una consola ni disparar las heurísticas de comportamiento
// que los antivirus aplican a los ejecutables sin firma.
func openWindows(url string) bool {
	shell32 := syscall.NewLazyDLL("shell32.dll")
	shellExecute := shell32.NewProc("ShellExecuteW")
	verb, _ := syscall.UTF16PtrFromString("open")
	target, _ := syscall.UTF16PtrFromString(url)
	const swShowNormal = 1
	r, _, _ := shellExecute.Call(
		0,
		uintptr(unsafe.Pointer(verb)),
		uintptr(unsafe.Pointer(target)),
		0, 0, swShowNormal,
	)
	// ShellExecute devuelve >32 cuando ha ido bien
	return r > 32
}
