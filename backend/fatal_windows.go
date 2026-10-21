//go:build windows

package main

import (
	"fmt"
	"log"
	"os"
	"syscall"
	"unsafe"
)

// fatalf: en Windows la app corre como GUI (sin consola), así que un
// log.Fatalf es una MUERTE SILENCIOSA — el usuario hace doble clic, no pasa
// nada, y no hay ni mensaje ni pista. Aquí el error se enseña en un cuadro de
// diálogo del sistema, con el texto en español y sin jerga.
//
// stdlib pura: user32.dll cargada al vuelo, cero dependencias, cero CGO.
func fatalf(format string, args ...any) {
	msg := fmt.Sprintf(format, args...)
	log.Printf("error fatal: %s", msg)

	user32 := syscall.NewLazyDLL("user32.dll")
	messageBox := user32.NewProc("MessageBoxW")
	title, _ := syscall.UTF16PtrFromString("Seshat no pudo arrancar")
	body, _ := syscall.UTF16PtrFromString(
		msg + "\n\nSi el problema sigue, el detalle técnico está en el archivo seshat.log, junto a tus perfiles.",
	)
	const mbIconError = 0x00000010
	_, _, _ = messageBox.Call(0, uintptr(unsafe.Pointer(body)), uintptr(unsafe.Pointer(title)), mbIconError)

	os.Exit(1)
}
