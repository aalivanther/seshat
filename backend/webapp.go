package main

// La app empaquetada ES este binario (decisión D1 de DEUDA-TECNICA.md):
// sirve el export estático de Next embebido (webdist/, copiado por
// build-app.sh desde web/out) y la API en el MISMO origen y puerto —
// adiós Node en la máquina del cliente, adiós CORS, un solo prompt de
// firewall. En desarrollo webdist/ solo tiene el placeholder y este
// servidor responde 404 en "/": next dev/start siguen siendo la UI.

import (
	"embed"
	"io/fs"
	"log"
	"net"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"regexp"
	"sort"
	"strings"
)

//go:embed all:webdist
var webdist embed.FS

// webFiles devuelve el FS de la UI embebida, o nil si solo está el placeholder.
func webFiles() fs.FS {
	sub, err := fs.Sub(webdist, "webdist")
	if err != nil {
		return nil
	}
	if _, err := fs.Stat(sub, "index.html"); err != nil {
		return nil // build de desarrollo: sin UI embebida
	}
	return sub
}

// registerWebApp monta la UI embebida en "/" (la API vive bajo /api y gana
// por especificidad de patrón). Resolución tipo export estático de Next:
// /ruta → /ruta, /ruta.html, /ruta/index.html, y 404.html como red final.
func registerWebApp() bool {
	files := webFiles()
	// La ruta se registra SIEMPRE, aunque ahora mismo no haya nada que servir:
	// un paquete instalado en caliente trae su propia interfaz, y si el handler
	// no existiera habría que reiniciar la app para verla. Lo que decide qué se
	// sirve es cada petición, no el arranque.
	var server http.Handler = http.NotFoundHandler()
	if files != nil {
		server = http.FileServerFS(files)
	}
	// Si hay una actualización aplicada, su interfaz manda sobre la de fábrica.
	// Se resuelve en CADA petición (no al arrancar) para que instalar un drop
	// surta efecto al recargar, sin cerrar y volver a abrir la aplicación.
	updated := http.FileServer(http.Dir(activeWebDir()))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// N14: la UI también pasa por la llave. Si solo se protegiera /api/, un
		// vecino de wifi vería la app entera cargar y fallar pieza a pieza; peor
		// aún, la primera visita del móvil (que trae la llave en la URL) no
		// tendría dónde dejar la cookie.
		if !lanAuthorized(w, r) {
			denyLAN(w, r)
			return
		}
		touchActivity() // abrir la app cuenta como estar vivo (N15)
		if activeUpdate() != nil {
			if servedFromUpdate(w, r, updated) {
				return
			}
		}
		if files == nil {
			http.NotFound(w, r) // sin UI embebida y sin paquete: nada que servir
			return
		}
		p := strings.TrimPrefix(path.Clean(r.URL.Path), "/")
		// /_next/static/* lleva hash en el nombre: cacheable para siempre —
		// los móviles de la LAN no deben re-descargar la app en cada visita
		if strings.HasPrefix(p, "_next/static/") {
			w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
		} else {
			w.Header().Set("Cache-Control", "no-cache")
		}
		if p == "" {
			p = "index.html"
		}
		for _, candidate := range []string{p, p + ".html", path.Join(p, "index.html")} {
			if info, err := fs.Stat(files, candidate); err == nil && !info.IsDir() {
				// FileServer redirige 301 los .../index.html explícitos: para
				// esos, servir el DIRECTORIO y que él resuelva su index
				if candidate == "index.html" || strings.HasSuffix(candidate, "/index.html") {
					r.URL.Path = "/" + strings.TrimSuffix(candidate, "index.html")
				} else {
					r.URL.Path = "/" + candidate
				}
				server.ServeHTTP(w, r)
				return
			}
		}
		if b, err := fs.ReadFile(files, "404.html"); err == nil {
			w.Header().Set("Content-Type", "text/html; charset=utf-8")
			w.WriteHeader(http.StatusNotFound)
			_, _ = w.Write(b)
			return
		}
		w.WriteHeader(http.StatusNotFound)
		_, _ = w.Write([]byte("404"))
	})
	// «hay interfaz» = la traía el binario, o la trae un paquete ya instalado
	return files != nil || activeUpdate() != nil
}

// lanInfo enumera las IPv4 privadas de la máquina — la pantalla "En tu
// teléfono" (AP15) muestra estas URLs con QR; mDNS no es fiable en Android.
// lanIPs: las direcciones de esta máquina por las que el móvil puede entrar.
//
// Antes devolvía TODAS las IPv4 privadas de TODAS las interfaces activas, así
// que en un portátil con Docker o una VPN la pantalla del teléfono pintaba tres
// o cuatro QR sin decir cuál servía —y el de Docker (172.17.0.1) no sirve nunca.
// Ahora cada dirección viaja con el nombre de su interfaz y ordenadas: primero
// el wifi/ethernet de verdad, después lo demás. Y se incluye el rango de
// Tailscale (100.64/10), que `IsPrivate` no considera privado pero por el que sí
// se puede estudiar desde el móvil.
type lanAddr struct {
	IP    string `json:"ip"`
	Iface string `json:"iface"`
	/** ¿es una interfaz física de red normal, o una virtual (Docker, VM, VPN)? */
	Likely bool `json:"likely"`
}

// interfaces virtuales típicas: por ahí NO se llega desde el móvil
var virtualIface = regexp.MustCompile(`(?i)^(docker|br-|veth|vboxnet|vmnet|virbr|utun|tun|tap|zt|awdl|llw|bridge|ap\d)`)

func lanAddrs() []lanAddr {
	out := []lanAddr{}
	ifaces, err := net.Interfaces()
	if err != nil {
		log.Printf("lan-info: %v", err)
		return out
	}
	for _, iface := range ifaces {
		if iface.Flags&net.FlagUp == 0 || iface.Flags&net.FlagLoopback != 0 {
			continue
		}
		addrs, err := iface.Addrs()
		if err != nil {
			continue
		}
		for _, a := range addrs {
			ipnet, ok := a.(*net.IPNet)
			if !ok {
				continue
			}
			ip4 := ipnet.IP.To4()
			if ip4 == nil {
				continue
			}
			// privadas de siempre + el rango de Tailscale, que también vale
			cgnat := ip4[0] == 100 && ip4[1] >= 64 && ip4[1] <= 127
			if !ip4.IsPrivate() && !cgnat {
				continue
			}
			out = append(out, lanAddr{
				IP:     ip4.String(),
				Iface:  iface.Name,
				Likely: !virtualIface.MatchString(iface.Name) && !cgnat,
			})
		}
	}
	// las de verdad primero: es la que el alumno necesita escanear
	sort.SliceStable(out, func(i, j int) bool { return out[i].Likely && !out[j].Likely })
	return out
}

// lanIPs se mantiene para el log de arranque, que solo quiere direcciones.
func lanIPs() []string {
	out := []string{}
	for _, a := range lanAddrs() {
		out = append(out, a.IP)
	}
	return out
}

// servedFromUpdate sirve la UI del paquete instalado. Devuelve false si el
// archivo pedido no existe ahí: entonces sigue el camino de siempre y responde
// la UI embebida — así una actualización a medias nunca deja pantallas en
// blanco, solo mezcla lo nuevo con lo de fábrica.
func servedFromUpdate(w http.ResponseWriter, r *http.Request, updated http.Handler) bool {
	p := strings.TrimPrefix(path.Clean(r.URL.Path), "/")
	if p == "" {
		p = "index.html"
	}
	root := activeWebDir()
	for _, candidate := range []string{p, p + ".html", path.Join(p, "index.html")} {
		full := filepath.Join(root, filepath.FromSlash(candidate))
		// nunca salir de la carpeta del paquete (mismo cuidado que con el zip)
		if !strings.HasPrefix(full, filepath.Clean(root)+string(os.PathSeparator)) {
			return false
		}
		if info, err := os.Stat(full); err == nil && !info.IsDir() {
			// mismas reglas que la UI embebida: los chunks con hash son eternos,
			// el HTML se revalida SIEMPRE. Sin esto, tras instalar un paquete el
			// navegador podía seguir pintando la pantalla vieja y parecía que la
			// actualización no había servido de nada.
			if strings.HasPrefix(p, "_next/static/") {
				w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
			} else {
				w.Header().Set("Cache-Control", "no-store")
			}
			r2 := r.Clone(r.Context())
			if candidate == "index.html" || strings.HasSuffix(candidate, "/index.html") {
				r2.URL.Path = "/" + strings.TrimSuffix(candidate, "index.html")
			} else {
				r2.URL.Path = "/" + candidate
			}
			updated.ServeHTTP(w, r2)
			return true
		}
	}
	return false
}
