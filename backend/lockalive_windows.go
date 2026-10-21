//go:build windows

package main

import (
	"os"
	"syscall"
	"unsafe"
)

// processQueryLimitedInformation deja leer la ruta del ejecutable sin pedir
// derechos de depuración. Con eso se distingue nuestra Seshat (aunque lleve
// horas suspendida) de un PID reciclado en otro programa.
const processQueryLimitedInformation = 0x1000

var (
	lockKernel      = syscall.NewLazyDLL("kernel32.dll")
	lockOpenProcess = lockKernel.NewProc("OpenProcess")
	lockQueryImage  = lockKernel.NewProc("QueryFullProcessImageNameW")
	lockCloseHandle = lockKernel.NewProc("CloseHandle")
)

func inspectLockProcess(pid int) (alive, ours bool) {
	h, _, e := lockOpenProcess.Call(uintptr(processQueryLimitedInformation), 0, uintptr(uint32(pid)))
	if h == 0 {
		// Sin acceso el proceso existe, pero no podemos comprobar el binario:
		// se trata como ajeno y decide el margen de tiempo.
		if errno, ok := e.(syscall.Errno); ok && errno == syscall.ERROR_ACCESS_DENIED {
			return true, false
		}
		return false, false
	}
	defer lockCloseHandle.Call(h)

	buf := make([]uint16, 32768)
	n := uint32(len(buf))
	r, _, _ := lockQueryImage.Call(
		h,
		0, // nombre Win32, no la ruta NT
		uintptr(unsafe.Pointer(&buf[0])),
		uintptr(unsafe.Pointer(&n)),
	)
	if r == 0 || n == 0 {
		return true, false
	}
	self, err := os.Executable()
	if err != nil {
		return true, false
	}
	return true, sameExecutablePath(self, syscall.UTF16ToString(buf[:n]))
}
