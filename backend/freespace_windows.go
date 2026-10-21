//go:build windows

package main

import (
	"syscall"
	"unsafe"
)

// freeGB en Windows: GetDiskFreeSpaceExW por LazyDLL, sin CGO ni dependencias
// (misma vía que el resto de llamadas del sistema en este proyecto).
func freeGB(path string) float64 {
	kernel32 := syscall.NewLazyDLL("kernel32.dll")
	proc := kernel32.NewProc("GetDiskFreeSpaceExW")
	p, err := syscall.UTF16PtrFromString(path)
	if err != nil {
		return 0
	}
	var freeForCaller, total, free uint64
	r, _, _ := proc.Call(
		uintptr(unsafe.Pointer(p)),
		uintptr(unsafe.Pointer(&freeForCaller)),
		uintptr(unsafe.Pointer(&total)),
		uintptr(unsafe.Pointer(&free)),
	)
	if r == 0 {
		return 0
	}
	return float64(freeForCaller) / 1e9
}
