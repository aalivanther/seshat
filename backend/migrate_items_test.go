package main

import (
	"encoding/json"
	"os"
	"testing"
	"time"
)

// El registro vive en web/scripts/vocab-aliases.json y el mapa de Go se GENERA
// desde él. Si alguien toca uno y olvida el otro, la migración deja de casar
// con el contenido y el progreso se pierde en silencio: este test es la alarma.
func TestVocabAliasesNoDrift(t *testing.T) {
	b, err := os.ReadFile("../web/scripts/vocab-aliases.json")
	if err != nil {
		t.Fatalf("no se pudo leer el registro de alias: %v", err)
	}
	var doc struct {
		Aliases map[string]string `json:"aliases"`
	}
	if err := json.Unmarshal(b, &doc); err != nil {
		t.Fatalf("registro de alias ilegible: %v", err)
	}
	if len(doc.Aliases) != len(vocabAliases) {
		t.Fatalf("el registro tiene %d alias y el mapa de Go %d — corre: python3 tools/gen-aliases.py",
			len(doc.Aliases), len(vocabAliases))
	}
	for k, v := range doc.Aliases {
		if got := vocabAliases[k]; got != v {
			t.Fatalf("alias %q: el registro dice %q y el Go %q — corre: python3 tools/gen-aliases.py", k, v, got)
		}
	}
}

// Nadie puede quedar apuntando a un id que a su vez está retirado: eso dejaría
// progreso colgado tras una sola pasada de migración.
func TestVocabAliasTargetsAreFinal(t *testing.T) {
	for old, new := range vocabAliases {
		if _, chained := vocabAliases[new]; chained {
			t.Fatalf("%q apunta a %q, que también está retirado (cadena de alias)", old, new)
		}
	}
}

func TestMigrateItemAliasesRenamesWhenTargetMissing(t *testing.T) {
	st := newState()
	st.SchemaVersion = 1
	seen := time.Now().Add(-48 * time.Hour)
	st.Items["b1gztermin"] = &ItemStat{Correct: 7, Wrong: 2, Streak: 3, Interval: 12, LastSeen: seen, Ease: 1.2}
	migrateState(st)

	if _, ok := st.Items["b1gztermin"]; ok {
		t.Fatal("el id retirado sigue en el estado")
	}
	it := st.Items["b1m3einenterminvereinbaren"]
	if it == nil || it.Correct != 7 || it.Interval != 12 {
		t.Fatalf("el progreso no se renombró tal cual: %+v", it)
	}
	if st.SchemaVersion != currentSchema {
		t.Fatalf("esquema %d, esperaba %d", st.SchemaVersion, currentSchema)
	}
}

func TestMigrateItemAliasesMergesKeepingMature(t *testing.T) {
	st := newState()
	st.SchemaVersion = 1
	next := time.Now().Add(200 * time.Hour)
	st.Items["b1gztermin"] = &ItemStat{Correct: 3, Wrong: 4, Streak: 1, Interval: 2, Lapses: 2, ProdCorrect: 1, Ease: 0.8}
	st.Items["b1m3einenterminvereinbaren"] = &ItemStat{Correct: 9, Wrong: 1, Streak: 5, Interval: 30, NextReview: next, ProdCorrect: 4, Ease: 1.3}
	migrateState(st)

	it := st.Items["b1m3einenterminvereinbaren"]
	if it.Interval != 30 || it.Streak != 5 || !it.NextReview.Equal(next) {
		t.Fatalf("no ganó la tarjeta madura: %+v", it)
	}
	if it.Correct != 12 || it.Wrong != 5 || it.ProdCorrect != 5 || it.Lapses != 2 {
		t.Fatalf("el historial no se sumó: %+v", it)
	}
	if it.Ease != 0.8 {
		t.Fatalf("la facilidad debe ser la peor de las dos, no %v", it.Ease)
	}
	if len(st.Items) != 1 {
		t.Fatalf("quedaron %d tarjetas, esperaba 1", len(st.Items))
	}
}

// Un fallo reciente en la tarjeta retirada no puede evaporarse porque la otra
// estuviera madura: el repaso sigue debiéndose.
func TestMigrateItemAliasesRelearnWins(t *testing.T) {
	st := newState()
	st.SchemaVersion = 1
	soon := time.Now().Add(10 * time.Minute)
	st.Items["b1gztermin"] = &ItemStat{Correct: 1, Wrong: 3, Streak: 0, Interval: 0.02, NextReview: soon, Relearn: true}
	st.Items["b1m3einenterminvereinbaren"] = &ItemStat{Correct: 8, Streak: 6, Interval: 40, NextReview: time.Now().Add(900 * time.Hour)}
	migrateState(st)

	it := st.Items["b1m3einenterminvereinbaren"]
	if !it.Relearn || it.Streak != 0 || it.Interval != 0.02 || !it.NextReview.Equal(soon) {
		t.Fatalf("el reaprendizaje pendiente se perdió: %+v", it)
	}
}

// Migrar dos veces (o cargar un perfil ya migrado) no debe tocar nada.
func TestMigrateItemAliasesIdempotent(t *testing.T) {
	st := newState()
	st.SchemaVersion = 1
	st.Items["b1laerm"] = &ItemStat{Correct: 4, Interval: 9}
	migrateState(st)
	before := *st.Items["b1m1laerm"]
	migrateState(st)
	if got := *st.Items["b1m1laerm"]; got != before {
		t.Fatalf("la segunda pasada cambió la tarjeta: %+v vs %+v", got, before)
	}
	if len(st.Items) != 1 {
		t.Fatalf("quedaron %d tarjetas", len(st.Items))
	}
}

// El mismo registro de vocab-aliases.json protege lecciones y fases, no solo
// vocabulario (deuda: "el interruptor universal de silencio" — un alias de
// lección pasaba el validador sin mover progreso). Reutilizamos un par real
// del registro ("amsamstag" → "a2m1amsamstag") pero como si fuera un id de
// LECCIÓN: la función no distingue el tipo, solo mira dónde vive la clave.
func TestMigrateLessonAliasesRenamesWhenTargetMissing(t *testing.T) {
	st := newState()
	st.SchemaVersion = 1
	seen := time.Now().Add(-24 * time.Hour)
	st.Lessons["amsamstag"] = &LessonStat{Completed: true, BestScore: 90, LastScore: 90, Attempts: 2, LastAt: seen}
	migrateState(st)

	if _, ok := st.Lessons["amsamstag"]; ok {
		t.Fatal("el id de lección retirado sigue en el estado")
	}
	ls := st.Lessons["a2m1amsamstag"]
	if ls == nil || ls.Attempts != 2 || ls.BestScore != 90 {
		t.Fatalf("el progreso de lección no se renombró tal cual: %+v", ls)
	}
}

func TestMigrateLessonAliasesMergesBothExist(t *testing.T) {
	st := newState()
	st.SchemaVersion = 1
	older := time.Now().Add(-72 * time.Hour)
	newer := time.Now().Add(-1 * time.Hour)
	st.Lessons["amsamstag"] = &LessonStat{Completed: true, BestScore: 100, LastScore: 60, Attempts: 3, LastAt: older}
	st.Lessons["a2m1amsamstag"] = &LessonStat{Completed: false, BestScore: 70, LastScore: 70, Attempts: 1, LastAt: newer}
	migrateState(st)

	ls := st.Lessons["a2m1amsamstag"]
	if ls == nil {
		t.Fatal("la lección destino desapareció")
	}
	if !ls.Completed {
		t.Fatal("Completed debe ser OR: si cualquiera de las dos se aprobó, queda aprobada")
	}
	if ls.BestScore != 100 {
		t.Fatalf("BestScore debe ser el máximo de las dos, no %v", ls.BestScore)
	}
	if ls.Attempts != 4 {
		t.Fatalf("Attempts debe sumar, no %v", ls.Attempts)
	}
	if ls.LastScore != 70 || !ls.LastAt.Equal(newer) {
		t.Fatalf("LastScore/LastAt deben venir del intento más reciente: %+v", ls)
	}
}

// Un id de FASE (módulo) no es una clave directa de st.Lessons: vive como
// prefijo de las claves sintéticas de web/lib/ids.ts (testId/retoId/missionId).
func TestMigrateLessonAliasesPhaseDerivedKeys(t *testing.T) {
	st := newState()
	st.SchemaVersion = 1
	st.Lessons["test-amsonntag"] = &LessonStat{Completed: true, BestScore: 80, Attempts: 1}
	st.Lessons["reto-amsonntag"] = &LessonStat{BestScore: 100, Attempts: 5}
	st.Lessons["mission-amsonntag"] = &LessonStat{Completed: true, Attempts: 1}
	migrateState(st)

	for _, prefix := range []string{"test-", "reto-", "mission-"} {
		if _, ok := st.Lessons[prefix+"amsonntag"]; ok {
			t.Fatalf("%samsonntag retirado sigue en el estado", prefix)
		}
		if st.Lessons[prefix+"a2m1amsonntag"] == nil {
			t.Fatalf("%sa2m1amsonntag no recibió el progreso migrado", prefix)
		}
	}
}

// Un id de EJERCICIO no tiene contraparte en el backend (no hay progreso por
// ejercicio): un alias sobre uno no debe fallar ni fabricar estado de la nada.
func TestMigrateLessonAliasesExerciseIdIsNoop(t *testing.T) {
	st := newState()
	st.SchemaVersion = 1
	before := len(st.Lessons)
	migrateState(st)
	if len(st.Lessons) != before {
		t.Fatalf("la migración fabricó lecciones de la nada: %d → %d", before, len(st.Lessons))
	}
}

func TestMigrateLessonAliasesIdempotent(t *testing.T) {
	st := newState()
	st.SchemaVersion = 1
	st.Lessons["amsamstag"] = &LessonStat{Completed: true, BestScore: 90, Attempts: 2}
	migrateState(st)
	before := *st.Lessons["a2m1amsamstag"]
	migrateState(st)
	if got := *st.Lessons["a2m1amsamstag"]; got != before {
		t.Fatalf("la segunda pasada cambió la lección: %+v vs %+v", got, before)
	}
	if len(st.Lessons) != 1 {
		t.Fatalf("quedaron %d lecciones", len(st.Lessons))
	}
}
