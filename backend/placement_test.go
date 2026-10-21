package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

// PLAN 1.9.8 §5.8 — el nivel colocado viaja con el PERFIL, no con el
// navegador (§1.3): tiene que sobrevivir a un guardar/cargar como cualquier
// otro dato del estado.
func TestPlacementRoundTrips(t *testing.T) {
	dataDir = t.TempDir()
	states = map[string]*State{}
	readonlyProfiles = map[string]bool{}

	st := newState()
	st.Placement = map[string]*PlacementStat{
		"en": {Placed: "b1", Pct: 80, At: "2026-08-21T10:00:00Z"},
	}
	states["default"] = st
	if err := saveProfile("default"); err != nil {
		t.Fatalf("no se pudo guardar: %v", err)
	}

	states = map[string]*State{} // forzar recarga desde disco
	loaded := loadProfile("default")
	got := loaded.Placement["en"]
	if got == nil || got.Placed != "b1" || got.Pct != 80 {
		t.Fatalf("la colocación no sobrevivió al guardar/cargar: %+v", loaded.Placement)
	}
}

// PLAN 1.9.9 F4.1 — relajar la validación de ESCRITURA de `placed` no puede
// alterar un perfil ya guardado en disco: `loadProfile`/`decodeState` nunca
// consultaban `validPlacedCefr` (solo lo hacía `handlePlacement`, en la
// puerta del POST), así que un valor que la lista cerrada de antes habría
// rechazado si llegara hoy por primera vez —"c1", digamos— sigue cargando
// EXACTAMENTE igual si ya estaba en el archivo de un perfil real.
func TestF41RelaxationDoesNotAlterStoredProfiles(t *testing.T) {
	dataDir = t.TempDir()
	states = map[string]*State{}
	readonlyProfiles = map[string]bool{}

	raw := []byte(`{"schemaVersion":2,"lessons":{},"items":{},"xp":42,"streakDays":3,"lastActive":"2026-08-01",` +
		`"placement":{"de":{"placed":"c1","pct":91,"at":"2026-08-01T09:00:00Z"}}}`)
	st := &State{}
	if err := decodeState(raw, st); err != nil {
		t.Fatalf("perfil real ilegible: %v", err)
	}
	got := st.Placement["de"]
	if got == nil || got.Placed != "c1" || got.Pct != 91 {
		t.Fatalf("un perfil guardado con un placed que la lista cerrada de antes habría rechazado debe cargar idéntico: %+v", st.Placement)
	}
	// y el resto del perfil, intacto — la relajación es de UN endpoint de
	// escritura, no del cargador
	if st.XP != 42 || st.StreakDays != 3 {
		t.Fatalf("el resto del perfil debe cargar igual: xp=%d streak=%d", st.XP, st.StreakDays)
	}
}

// PLAN 1.9.8 §5.9 — un perfil de ANTES de este cambio no trae el campo:
// tiene que cargar limpio, sin placement, sin error (compatibilidad, §3.1).
func TestPlacementAbsentLoadsClean(t *testing.T) {
	st := &State{}
	raw := []byte(`{"schemaVersion":2,"lessons":{},"items":{},"xp":5,"streakDays":1,"lastActive":"2026-08-21"}`)
	if err := decodeState(raw, st); err != nil {
		t.Fatalf("un perfil viejo sin placement debe cargar sin error: %v", err)
	}
	if len(st.Placement) != 0 {
		t.Fatalf("un perfil sin el campo no debe traer placement: %+v", st.Placement)
	}
	if st.XP != 5 {
		t.Fatalf("el resto del perfil debe cargar igual: xp=%d", st.XP)
	}
}

// PLAN 1.9.8 §5.10 — la trampa de knownStateFields (§3.1): un perfil con
// campos desconocidos EN Extra, más placement, no puede duplicar ninguna
// clave al volver a serializarse, y ambos deben sobrevivir intactos.
func TestPlacementDoesNotDuplicateOrClobberExtra(t *testing.T) {
	st := &State{}
	raw := []byte(`{"schemaVersion":2,"lessons":{},"items":{},"xp":0,"streakDays":0,"lastActive":"",` +
		`"placement":{"en":{"placed":"b1","pct":80,"at":"2026-08-21T10:00:00Z"}},` +
		`"futureFlag":true}`)
	if err := decodeState(raw, st); err != nil {
		t.Fatalf("carga inválida: %v", err)
	}

	out := stateJSON(st, false)
	if n := strings.Count(string(out), `"placement"`); n != 1 {
		t.Fatalf(`"placement" debe aparecer exactamente una vez en el JSON, salió %d: %s`, n, out)
	}

	var m map[string]json.RawMessage
	if err := json.Unmarshal(out, &m); err != nil {
		t.Fatalf("JSON resultante ilegible: %v", err)
	}
	if _, ok := m["futureFlag"]; !ok {
		t.Fatal("un campo desconocido (Extra) no puede perderse solo por añadir placement")
	}
	var placement map[string]PlacementStat
	if err := json.Unmarshal(m["placement"], &placement); err != nil {
		t.Fatalf("placement ilegible: %v", err)
	}
	if placement["en"].Placed != "b1" || placement["en"].Pct != 80 {
		t.Fatalf("el valor de placement se corrompió al re-serializar: %+v", placement["en"])
	}
}

// PLAN 1.9.8 §5.11 / PLAN 1.9.9 F4.1 — POST /api/placement valida la FORMA,
// no la pertenencia, tanto para `lang` como (desde F4.1) para `placed`: un
// idioma bien formado y desconocido ("fr") o un placed bien formado y sin
// curso real ("b2") se aceptan — eso es lo que demuestra que Go no mantiene
// un registro cerrado de ninguno de los dos. El mapa de idiomas sigue con
// tope: la entrada 33 se rechaza.
func TestPostPlacementRejectsInvalidInput(t *testing.T) {
	dataDir = t.TempDir()
	states = map[string]*State{}
	readonlyProfiles = map[string]bool{}

	post := func(body string) int {
		r := httptest.NewRequest(http.MethodPost, "/api/placement", strings.NewReader(body))
		r.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()
		handlePlacement(w, r)
		return w.Code
	}

	rejected := []string{
		`{"lang":"en","placed":"c3","pct":50}`,      // no es un peldaño CEFR
		`{"lang":"en","placed":"d1","pct":50}`,      // forma de letra+dígito, no es CEFR
		`{"lang":"en","placed":"cefr","pct":50}`,    // ni una letra + un dígito
		`{"lang":"en","placed":"b1","pct":150}`,     // pct fuera de rango
		`{"lang":"klingon","placed":"b1","pct":50}`, // mal formado (no son 2 letras)
		`{"lang":"","placed":"b1","pct":50}`,        // lang vacío
	}
	for _, body := range rejected {
		if code := post(body); code != http.StatusBadRequest {
			t.Fatalf("payload %s: esperaba 400, salió %d", body, code)
		}
	}

	// bien formado y desconocido: NO hay registro de idiomas en Go que lo filtre
	if code := post(`{"lang":"fr","placed":"b1","pct":50}`); code != http.StatusOK {
		t.Fatalf(`lang:"fr" (bien formado, desconocido) debe aceptarse, salió %d`, code)
	}

	// F4.1: "b2" ya no está en ninguna lista cerrada de Go (la fase 1 quitó el
	// motivo por el que existía) — bien formado, se acepta aunque el curso
	// alemán/inglés todavía no llegue ahí. Reutiliza "fr" (ya en el mapa, esto
	// es una actualización) para no adelantar el tope de idiomas de abajo.
	if code := post(`{"lang":"fr","placed":"b2","pct":50}`); code != http.StatusOK {
		t.Fatalf(`placed:"b2" (bien formado, relajado en F4.1) debe aceptarse, salió %d`, code)
	}
	if code := post(`{"lang":"fr","placed":"c1","pct":91}`); code != http.StatusOK {
		t.Fatalf(`placed:"c1" debe persistirse, salió %d`, code)
	}
	if got := loadProfile("default").Placement["fr"]; got == nil || got.Placed != "c1" {
		t.Fatalf("c1 no quedó guardado: %+v", loadProfile("default").Placement["fr"])
	}

	// tope de 32 idiomas: los primeros 32 (fr ya cuenta como 1) entran, el 33 no
	langs := []string{"fr"}
	for c := byte('a'); len(langs) < 32; c++ {
		for c2 := byte('a'); c2 <= 'z' && len(langs) < 32; c2++ {
			l := string(c) + string(c2)
			if l != "fr" {
				langs = append(langs, l)
			}
		}
	}
	for _, l := range langs[1:] {
		if code := post(`{"lang":"` + l + `","placed":"b1","pct":50}`); code != http.StatusOK {
			t.Fatalf("lang %q debería aceptarse (aún bajo el tope), salió %d", l, code)
		}
	}
	if code := post(`{"lang":"zz","placed":"b1","pct":50}`); code != http.StatusBadRequest {
		t.Fatalf("la entrada 33 en el mapa debe rechazarse por tope, salió %d", code)
	}
}
