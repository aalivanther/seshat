package main

// Comportamiento de APLICACIÓN, no de proceso de terminal.
//
// Antes: el binario arrancaba un servidor y se quedaba mirando. En macOS, un
// ejecutable suelto abre la Terminal al hacer doble clic (y hay que dejarla
// abierta); en Windows, compilado como GUI, no pasaba absolutamente nada
// visible y el proceso quedaba invisible sin forma de cerrarlo.
//
// Ahora: al arrancar se abre el navegador en la app, y la app puede cerrarse a
// sí misma desde su propia interfaz (menú → Salir). Sin CGO no hay icono de
// bandeja nativo, así que la pestaña ES la ventana de la app y el cierre vive
// dentro de ella — el mismo contrato que usan las herramientas locales que
// abren su panel en el navegador.

import (
	"log"
	"net"
	"net/http"
	"net/url"
	"os"
	"os/exec"
	"runtime"
	"sync"
	"sync/atomic"
	"time"
)

// openBrowser abre la URL en el navegador por defecto del sistema.
// Es "mejor esfuerzo": si falla, la app sigue viva y el usuario tiene la URL
// impresa en el log — jamás debe tumbar el arranque.
func openBrowser(url string) {
	var cmd *exec.Cmd
	switch runtime.GOOS {
	case "darwin":
		cmd = exec.Command("open", url)
	case "windows":
		// ShellExecuteW del sistema: sin proceso hijo, sin consola posible y
		// sin la firma de comportamiento "spawn de rundll32" que vigilan los
		// antivirus en ejecutables sin firmar. Si falla, cae al método viejo.
		if openWindows(url) {
			return
		}
		cmd = exec.Command("rundll32", "url.dll,FileProtocolHandler", url)
	default:
		cmd = exec.Command("xdg-open", url)
	}
	setNoConsole(cmd) // en Windows, sin ventana negra parpadeando
	if err := cmd.Start(); err != nil {
		log.Printf("no pude abrir el navegador (ábrelo tú en %s): %v", url, err)
		return
	}
	// no esperamos al proceso del navegador, pero sí lo cosechamos para no
	// dejar un zombi colgando de nosotros
	go func() { _ = cmd.Wait() }()
}

// quitRequested se cierra cuando la app pide apagarse desde la interfaz.
var quitRequested = make(chan struct{})

// quitOnce: el "Salir" del usuario y el apagado por inactividad pueden coincidir
// (y dos pestañas pueden pulsar Salir a la vez). El select+default de antes NO
// era atómico: dos goroutines podían pasar el check y hacer un doble close →
// panic. Once lo cierra una vez y punto.
var quitOnce sync.Once

// requestQuit pide el apagado limpio dejando SIEMPRE dicho por qué en el log:
// una app que se cierra sola sin explicación es un bug reportado.
func requestQuit(reason string) {
	quitOnce.Do(func() {
		log.Printf("apagado solicitado: %s", reason)
		close(quitRequested)
	})
}

/* ── N15: apagado por inactividad ── */

// idleTimeout: una hora sin NINGUNA petición HTTP. El caso real es la pestaña
// cerrada (o el portátil suspendido) dejando el motor comiendo RAM. Una hora
// es lo bastante largo para no morir durante un descanso y lo bastante corto
// para no vivir de noche.
const idleTimeout = 60 * time.Minute

// lastActivity: nanosegundos Unix de la última petición. Atómico porque lo
// escribe cada handler HTTP y lo lee el vigilante.
var lastActivity atomic.Int64

func touchActivity() { lastActivity.Store(time.Now().UnixNano()) }

// handlePing: latido del cliente. No hace nada más que existir — el touch lo da
// el middleware cors —, pero le da al frontend una llamada barata y explícita
// que mantener viva mientras la app está abierta (aunque el usuario solo lea).
func handlePing(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "usa POST", http.StatusMethodNotAllowed)
		return
	}
	writeJSON(w, map[string]any{"ok": true})
}

// startIdleWatchdog vigila la inactividad. Se desactiva con
// SESHAT_NO_IDLE_QUIT=1 (desarrollo, kioscos, tests de larga duración).
func startIdleWatchdog() {
	if os.Getenv("SESHAT_NO_IDLE_QUIT") != "" {
		log.Println("apagado por inactividad DESACTIVADO (SESHAT_NO_IDLE_QUIT)")
		return
	}
	touchActivity() // el arranque cuenta: nadie debe morir a los 60' de un log
	go func() {
		t := time.NewTicker(time.Minute)
		defer t.Stop()
		for range t.C {
			idle := time.Since(time.Unix(0, lastActivity.Load()))
			if idle >= idleTimeout {
				requestQuit("sin peticiones durante " + idle.Round(time.Minute).String() +
					" (cierra la pestaña y Seshat se apaga sola; SESHAT_NO_IDLE_QUIT=1 lo desactiva)")
				return
			}
		}
	}()
}

// handleQuit apaga la aplicación a petición del usuario. Es el equivalente al
// "Salir" de una app de escritorio: en Windows (GUI, sin consola) es la ÚNICA
// forma de cerrarla sin ir al administrador de tareas.
func handleQuit(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "usa POST", http.StatusMethodNotAllowed)
		return
	}
	// Un POST simple desde CUALQUIER página web (sin preflight, así que el CORS
	// no lo frena) podía apagar la app probando los puertos 8787-8799. No hay
	// pérdida de datos —las escrituras son atómicas— pero sí una molestia
	// evitable: exigimos que la petición venga de la propia app.
	if !sameAppOrigin(r) {
		http.Error(w, "esta petición no viene de Seshat", http.StatusForbidden)
		return
	}
	// Y ADEMÁS: apagar el motor solo puede hacerlo quien está delante de esta
	// máquina. Un móvil emparejado de la red pasaba el filtro de origen y podía
	// dejar a oscuras a quien estuviera estudiando en el ordenador — el propio
	// botón «Salir» ya no se le pinta, pero eso es cortesía, no una defensa.
	if !isLoopback(r.RemoteAddr) {
		http.Error(w, "Seshat solo se apaga desde el equipo donde está abierta", http.StatusForbidden)
		return
	}
	writeJSON(w, map[string]any{"ok": true, "bye": true})
	// dar tiempo a que la respuesta salga antes de cerrar el servidor
	go func() {
		time.Sleep(250 * time.Millisecond)
		requestQuit("el usuario pulsó Salir en la app")
	}()
}

// sameAppOrigin: la petición debe venir de la propia interfaz de Seshat.
// Vale un Origin/Referer de un host privado (la app se abre en localhost y
// también desde el móvil de la misma red), o un fetch sin Origin —que solo
// puede originarse fuera del navegador, no desde una web hostil.
func sameAppOrigin(r *http.Request) bool {
	origin := r.Header.Get("Origin")
	if origin == "" {
		if ref := r.Header.Get("Referer"); ref != "" {
			origin = ref
		}
	}
	if origin == "" {
		// Sin Origin no hay navegador de por medio... pero sí podía haber un
		// vecino de la red con curl apagándote la app (el servidor escucha en
		// 0.0.0.0 para que funcione "En tu teléfono"). Sin cabecera, exigimos
		// que la petición venga de esta misma máquina.
		return isLoopback(r.RemoteAddr)
	}
	u, err := url.Parse(origin)
	if err != nil {
		return false
	}
	return privateHost.MatchString(u.Host)
}

// isLoopback: ¿la petición nace en este mismo equipo?
func isLoopback(remoteAddr string) bool {
	host, _, err := net.SplitHostPort(remoteAddr)
	if err != nil {
		host = remoteAddr
	}
	ip := net.ParseIP(host)
	return ip != nil && ip.IsLoopback()
}
