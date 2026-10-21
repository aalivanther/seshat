//go:build !windows

package main

import "log"

// fatalf en macOS/Linux: el log ya va a stderr Y al archivo, y en el .app el
// archivo es el canal real. Sin diálogo nativo (haría falta CGO); el mensaje
// queda registrado y el proceso muere con código 1.
func fatalf(format string, args ...any) {
	log.Fatalf(format, args...)
}
