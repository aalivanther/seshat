package main

import (
	"encoding/json"
	"os"
	"testing"
)

// PLAN 1.9.9 F0.6 — el contenido cabe en el techo de importación, CON MARGEN.
//
// /api/import (main.go, cerca de la línea 1661) rechaza un respaldo con más de
// 5.000 lecciones o 20.000 ítems. Son literales sueltos, no una constante, y
// hoy (612 lecciones, 3.276 ítems) nada avisa de que un día el contenido real
// se acerque a esos números — un alumno avanzado con un respaldo legítimo
// empezaría a ver "respaldo fuera de rango" sin que nadie lo hubiera visto
// venir. No es urgente (el plan lo dice explícitamente): este test falla al
// 70% del tope, mucho antes de que el tope real se alcance.
//
// El conteo real vive en TypeScript (web/scripts/content-ids.snapshot.json,
// que regenera cada corrida de validate-content.mjs) — Go no parsea el
// contenido, así que lee ese JSON, que es exactamente el mismo puente que ya
// usa migrate_items_test.go con vocab-aliases.json.
func TestContentFitsImportCapsWithMargin(t *testing.T) {
	b, err := os.ReadFile("../web/scripts/content-ids.snapshot.json")
	if err != nil {
		t.Fatalf("no se pudo leer el snapshot de contenido: %v", err)
	}
	var snap struct {
		LessonIds []string `json:"lessonIds"`
		VocabIds  []string `json:"vocabIds"`
	}
	if err := json.Unmarshal(b, &snap); err != nil {
		t.Fatalf("snapshot de contenido ilegible: %v", err)
	}

	// Los mismos topes que /api/import — si esos literales cambian en main.go,
	// este test debe actualizarse con ellos (no hay constante compartida hoy).
	const maxLessons = 5000
	const maxItems = 20000
	const margen = 0.70

	lecciones := len(snap.LessonIds)
	items := len(snap.VocabIds)

	if float64(lecciones) > maxLessons*margen {
		t.Errorf("lecciones reales (%d) superan el %.0f%% del tope de /api/import (%d): sube el tope o trocea el respaldo antes de que un alumno real lo golpee",
			lecciones, margen*100, maxLessons)
	}
	if float64(items) > maxItems*margen {
		t.Errorf("ítems reales (%d) superan el %.0f%% del tope de /api/import (%d): sube el tope o trocea el respaldo antes de que un alumno real lo golpee",
			items, margen*100, maxItems)
	}
}
