package main

import (
	"crypto/rand"
	"crypto/subtle"
	"encoding/base32"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"sync"
)

// LLAVE DE LA RED LOCAL (N14)
//
// Seshat escucha en toda la red local a propósito: estudiar desde el móvil es
// una función del producto, no un descuido. El problema es lo que eso significa
// en una wifi compartida —piso de estudiantes, biblioteca, cafetería—: cualquiera
// que adivine el puerto entra en el progreso de otro, lo lee y lo cambia.
//
// La solución no es cerrar la LAN (mataría el móvil) ni una contraseña que nadie
// va a teclear en un móvil: es una llave que viaja DENTRO del QR. Desde este
// mismo equipo no se pide nada; desde fuera, una vez por dispositivo, y queda en
// una cookie. La llave vive en la carpeta de datos, así que es estable entre
// arranques y el QR de ayer sigue sirviendo.
const lanCookie = "seshat_lan"

var (
	lanKeyOnce sync.Once
	lanKeyVal  string
)

// lanKey devuelve (creándola la primera vez) la llave de este perfil de datos.
func lanKey() string {
	lanKeyOnce.Do(func() {
		path := filepath.Join(dataDir, "lan-key")
		if b, err := os.ReadFile(path); err == nil {
			if k := strings.TrimSpace(string(b)); len(k) >= 16 {
				lanKeyVal = k
				return
			}
		}
		raw := make([]byte, 15) // 120 bits: irrompible por fuerza bruta en una LAN
		if _, err := rand.Read(raw); err != nil {
			// sin azar no hay llave honesta: mejor no fingir seguridad
			fatalf("No pude generar la llave de la red local (%v).", err)
		}
		lanKeyVal = strings.ToLower(base32.StdEncoding.WithPadding(base32.NoPadding).EncodeToString(raw))
		if err := os.WriteFile(path, []byte(lanKeyVal), 0o600); err != nil {
			log.Printf("aviso: no pude guardar la llave de la red local (%v): el QR de hoy no valdrá mañana", err)
		}
	})
	return lanKeyVal
}

// lanAuthorized: ¿esta petición puede tocar la app?
// Desde el propio equipo, siempre. Desde la red, solo con la llave — en la URL
// (el QR) o ya guardada en la cookie. Si viene en la URL, se deja la cookie
// puesta para que el resto de la sesión no la arrastre.
func lanAuthorized(w http.ResponseWriter, r *http.Request) bool {
	if isLoopback(r.RemoteAddr) {
		return true
	}
	// Escape para DESARROLLO: en dev la UI vive en :3000 y el motor en :8787, o
	// sea dos orígenes, y una cookie no cruza de uno a otro — probar desde el
	// móvil sería imposible. start.sh lo activa; el binario empaquetado sirve
	// UI y API en el mismo puerto y no lo necesita nunca.
	if os.Getenv("SESHAT_NO_LAN_KEY") != "" {
		return true
	}
	key := lanKey()
	if c, err := r.Cookie(lanCookie); err == nil && subtle.ConstantTimeCompare([]byte(c.Value), []byte(key)) == 1 {
		return true
	}
	if got := r.URL.Query().Get("k"); got != "" && subtle.ConstantTimeCompare([]byte(got), []byte(key)) == 1 {
		http.SetCookie(w, &http.Cookie{
			Name:     lanCookie,
			Value:    key,
			Path:     "/",
			HttpOnly: true,
			SameSite: http.SameSiteLaxMode,
			MaxAge:   400 * 24 * 3600, // el máximo que respetan los navegadores
		})
		return true
	}
	if got := r.Header.Get("X-Seshat-Key"); got != "" && subtle.ConstantTimeCompare([]byte(got), []byte(key)) == 1 {
		return true
	}
	return false
}

// denyLAN responde a un dispositivo de la red sin llave. En castellano y sin
// tecnicismos: quien lo vea casi siempre es el propio dueño con un móvil viejo
// que ya no tiene la cookie, no un atacante.
func denyLAN(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Cache-Control", "no-store")
	if strings.HasPrefix(r.URL.Path, "/api/") {
		http.Error(w, "este dispositivo no está emparejado: vuelve a escanear el QR de «En tu teléfono»", http.StatusUnauthorized)
		return
	}
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.WriteHeader(http.StatusUnauthorized)
	_, _ = w.Write([]byte(`<!doctype html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Seshat — falta el enlace del QR</title>
<style>body{font-family:system-ui,sans-serif;background:#fdf8f0;color:#3c2f23;margin:0;
display:flex;min-height:100vh;align-items:center;justify-content:center;padding:24px}
div{max-width:34rem}h1{font-size:1.4rem;margin:0 0 .6rem}p{line-height:1.6;margin:.6rem 0}
b{color:#c97c2c}</style></head><body><div>
<h1>Este dispositivo todavía no está emparejado</h1>
<p>Seshat solo acepta dispositivos de tu red que entren por el <b>enlace del QR</b>.
Así, si compartes wifi con más gente, nadie más puede abrir tu progreso escribiendo la dirección a mano.</p>
<p>En el ordenador donde tienes Seshat abierta, ve a <b>«En tu teléfono»</b> y escanea el código otra vez.
Solo hace falta una vez por dispositivo.</p>
</div></body></html>`))
}
