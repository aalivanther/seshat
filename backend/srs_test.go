package main

// Tests de las funciones puras del SRS y la racha (deuda B3).
// Solo toca applyReview y touchStreak — sin red, sin disco, con `now` controlado.

import (
	"math"
	"testing"
	"time"
)

const eps = 1e-9

func almostEqual(a, b float64) bool { return math.Abs(a-b) <= eps }

// withinSecond tolera el redondeo float64→Duration al convertir días a ns.
func withinSecond(got, want time.Time) bool {
	d := got.Sub(want)
	return d > -time.Second && d < time.Second
}

// ---- applyReview ----

// Escalera completa de aciertos desde ítem nuevo, respondiendo SIEMPRE en el
// momento exacto del vencimiento (NextReview == now cuenta como vencido:
// !After). 10min → 1d → 3d → 7d → 16d → 35d → ×2.2 → ×2.2 …
func TestApplyReviewLadderFullClimb(t *testing.T) {
	now := time.Date(2026, 8, 1, 10, 0, 0, 0, time.UTC)
	it := &ItemStat{}

	wantIntervals := []float64{
		1.0 / 144.0, // 10 min
		1, 3, 7, 16, 35,
		35 * 2.2,       // 77
		35 * 2.2 * 2.2, // 169.4
	}
	for i, want := range wantIntervals {
		applyReview(it, true, "produce", now)
		if !almostEqual(it.Interval, want) {
			t.Fatalf("paso %d: Interval = %v, esperaba %v", i+1, it.Interval, want)
		}
		wantNext := now.Add(time.Duration(want * 24 * float64(time.Hour)))
		if !withinSecond(it.NextReview, wantNext) {
			t.Fatalf("paso %d: NextReview = %v, esperaba ≈%v", i+1, it.NextReview, wantNext)
		}
		if it.Correct != i+1 || it.Streak != i+1 || it.Wrong != 0 {
			t.Fatalf("paso %d: contadores Correct=%d Streak=%d Wrong=%d, esperaba %d/%d/0",
				i+1, it.Correct, it.Streak, it.Wrong, i+1, i+1)
		}
		if !it.LastSeen.Equal(now) {
			t.Fatalf("paso %d: LastSeen = %v, esperaba %v", i+1, it.LastSeen, now)
		}
		now = it.NextReview // llegar justo al vencimiento del siguiente paso
	}
}

// Ítem nuevo: el primer acierto arranca la escalera en 10 minutos exactos.
func TestApplyReviewNewItemFirstCorrect(t *testing.T) {
	now := time.Date(2026, 8, 1, 10, 0, 0, 0, time.UTC)
	it := &ItemStat{}
	applyReview(it, true, "produce", now)
	if !almostEqual(it.Interval, 1.0/144.0) {
		t.Fatalf("Interval = %v, esperaba 1/144 (10 min)", it.Interval)
	}
	if !withinSecond(it.NextReview, now.Add(10*time.Minute)) {
		t.Fatalf("NextReview = %v, esperaba ≈now+10min", it.NextReview)
	}
}

// Acierto ANTES de vencer con intervalo en marcha: cuenta el acierto pero NO
// toca ni Interval ni NextReview (practicar antes de tiempo no infla).
func TestApplyReviewEarlyCorrectDoesNotInflate(t *testing.T) {
	now := time.Date(2026, 8, 1, 10, 0, 0, 0, time.UTC)
	next := now.Add(48 * time.Hour) // vence en 2 días
	it := &ItemStat{Correct: 3, Streak: 3, Interval: 3, NextReview: next, LastSeen: now.Add(-24 * time.Hour)}

	applyReview(it, true, "produce", now)

	if it.Correct != 4 || it.Streak != 4 {
		t.Fatalf("el acierto debe contar: Correct=%d Streak=%d, esperaba 4/4", it.Correct, it.Streak)
	}
	if !almostEqual(it.Interval, 3) {
		t.Fatalf("Interval = %v, no debía moverse de 3", it.Interval)
	}
	if !it.NextReview.Equal(next) {
		t.Fatalf("NextReview = %v, no debía moverse de %v", it.NextReview, next)
	}
	if !it.LastSeen.Equal(now) {
		t.Fatalf("LastSeen sí debe actualizarse: %v ≠ %v", it.LastSeen, now)
	}
}

// Fallo desde 16 días: el intervalo NO se resetea a cero — cae de forma
// sublineal (drop 5, PLAN.md §6.1). Reaprender es más rápido que aprender.
func TestApplyReviewFailureKeepsStability(t *testing.T) {
	now := time.Date(2026, 8, 1, 10, 0, 0, 0, time.UTC)
	it := &ItemStat{Correct: 5, Streak: 5, Interval: 16, NextReview: now.Add(-time.Hour)}

	applyReview(it, false, "produce", now)

	if it.Wrong != 1 || it.Streak != 0 || it.Lapses != 1 {
		t.Fatalf("Wrong=%d Streak=%d Lapses=%d, esperaba 1/0/1", it.Wrong, it.Streak, it.Lapses)
	}
	// 0.35 · 16^0.6 ≈ 1.90 días
	if !almostEqual(it.Interval, 0.35*math.Pow(16, 0.6)) {
		t.Fatalf("Interval = %v, esperaba ~1.9 días (post-lapso), NO 0", it.Interval)
	}
	if it.Interval <= 0 || it.Interval >= 16 {
		t.Fatalf("Interval = %v: debe bajar pero nunca a cero ni subir", it.Interval)
	}
	if !it.Relearn {
		t.Fatal("el fallo debe dejar pendiente el paso de reaprendizaje")
	}
	if !it.NextReview.Equal(now.Add(10 * time.Minute)) {
		t.Fatalf("NextReview = %v, esperaba exactamente now+10min", it.NextReview)
	}
	if it.Correct != 5 {
		t.Fatalf("Correct = %d, el fallo no debe tocar los aciertos históricos", it.Correct)
	}
	if it.Ease >= 1 {
		t.Fatalf("Ease = %v, el fallo debe penalizar la facilidad", it.Ease)
	}
}

// Fallar RECONOCIENDO castiga más que fallar produciendo: fallar el test fácil
// es evidencia más fuerte de olvido.
func TestApplyReviewRecognizeFailsHarder(t *testing.T) {
	now := time.Date(2026, 8, 1, 10, 0, 0, 0, time.UTC)
	prod := &ItemStat{Interval: 35, NextReview: now.Add(-time.Hour)}
	recog := &ItemStat{Interval: 35, NextReview: now.Add(-time.Hour)}

	applyReview(prod, false, "produce", now)
	applyReview(recog, false, "recognize", now)

	if !(recog.Interval < prod.Interval) {
		t.Fatalf("recognize=%v produce=%v: reconocer debe castigar más", recog.Interval, prod.Interval)
	}
	if !almostEqual(prod.Interval, 0.35*math.Pow(35, 0.6)) {
		t.Fatalf("produce: Interval = %v, esperaba ~2.9 días", prod.Interval)
	}
}

// El lapso crónico cae más hondo: el suelo decrece 0.85^(lapses-1).
func TestApplyReviewChronicLapseFallsDeeper(t *testing.T) {
	now := time.Date(2026, 8, 1, 10, 0, 0, 0, time.UTC)
	first := &ItemStat{Interval: 35, NextReview: now.Add(-time.Hour)}
	chronic := &ItemStat{Interval: 35, Lapses: 3, NextReview: now.Add(-time.Hour)}

	applyReview(first, false, "produce", now)
	applyReview(chronic, false, "produce", now)

	if !(chronic.Interval < first.Interval) {
		t.Fatalf("crónico=%v primero=%v: el reincidente debe caer más", chronic.Interval, first.Interval)
	}
}

// Fallo tras racha larga (169 días): baja a ~7,5 días, no a cero — el caso
// que hacía destructivo el reset en B1 (medio curso a la casilla de salida).
func TestApplyReviewFailureAfterLongStreak(t *testing.T) {
	now := time.Date(2026, 8, 1, 10, 0, 0, 0, time.UTC)
	it := &ItemStat{Correct: 12, Streak: 12, Interval: 169.4, NextReview: now.Add(-3 * time.Hour)}

	applyReview(it, false, "produce", now)

	if it.Streak != 0 || it.Wrong != 1 {
		t.Fatalf("Streak=%d Wrong=%d, esperaba 0/1", it.Streak, it.Wrong)
	}
	if it.Interval < 6 || it.Interval > 9 {
		t.Fatalf("Interval = %v, esperaba ~7.5 días", it.Interval)
	}
	if !it.NextReview.Equal(now.Add(10 * time.Minute)) {
		t.Fatalf("NextReview = %v, esperaba now+10min", it.NextReview)
	}
}

// Ítem JOVEN (<1 día): sí reaprende desde cero — no hay estabilidad que salvar.
func TestApplyReviewYoungItemFullReset(t *testing.T) {
	now := time.Date(2026, 8, 1, 10, 0, 0, 0, time.UTC)
	it := &ItemStat{Interval: 0.5, Streak: 1, NextReview: now.Add(-time.Minute)}

	applyReview(it, false, "produce", now)

	if it.Interval != 0 {
		t.Fatalf("Interval = %v, un ítem joven sí resetea a 0", it.Interval)
	}
}

// Superar el paso de reaprendizaje devuelve el intervalo post-lapso SIN volver
// a subir la escalera desde abajo.
func TestApplyReviewRelearnRestoresInterval(t *testing.T) {
	now := time.Date(2026, 8, 1, 10, 0, 0, 0, time.UTC)
	it := &ItemStat{Correct: 8, Streak: 8, Interval: 35, ProdCorrect: 5, NextReview: now.Add(-time.Hour)}

	applyReview(it, false, "produce", now) // lapso: ~2.9 días, cita en 10 min
	post := it.Interval

	later := now.Add(11 * time.Minute)
	applyReview(it, true, "produce", later) // supera el reaprendizaje

	if it.Relearn {
		t.Fatal("tras acertar, el paso de reaprendizaje debe cerrarse")
	}
	if !almostEqual(it.Interval, post) {
		t.Fatalf("Interval = %v, esperaba conservar el post-lapso %v", it.Interval, post)
	}
	if !withinSecond(it.NextReview, later.Add(time.Duration(post*24*float64(time.Hour)))) {
		t.Fatalf("NextReview = %v, esperaba later + %v días", it.NextReview, post)
	}
}

// TECHO RECEPTIVO: sin una sola recuperación produciendo, el intervalo no pasa
// de 16 días por mucho que se acierte reconociendo. Reconocer no es saber.
func TestApplyReviewReceptiveCeiling(t *testing.T) {
	now := time.Date(2026, 8, 1, 10, 0, 0, 0, time.UTC)
	it := &ItemStat{Interval: 16, NextReview: now.Add(-time.Hour)}

	applyReview(it, true, "recognize", now) // subiría a 35
	if it.Interval != 16 {
		t.Fatalf("Interval = %v, el techo receptivo debe frenarlo en 16", it.Interval)
	}
	if it.ProdCorrect != 0 {
		t.Fatalf("ProdCorrect = %d, reconocer no cuenta como producir", it.ProdCorrect)
	}

	// una sola recuperación produciendo levanta el techo
	applyReview(it, true, "produce", now.Add(17*24*time.Hour))
	if it.Interval != 35 {
		t.Fatalf("Interval = %v, tras producir debe seguir la escalera a 35", it.Interval)
	}
}

// Perfiles anteriores al drop 5 (Ease=0 en disco) se migran a 1.0 al vuelo y
// la escalera queda EXACTAMENTE como estaba (×2.2).
func TestApplyReviewMigratesEaseFromZero(t *testing.T) {
	now := time.Date(2026, 8, 1, 10, 0, 0, 0, time.UTC)
	it := &ItemStat{Interval: 35, ProdCorrect: 3, NextReview: now.Add(-time.Hour)} // Ease: 0 (viejo)

	applyReview(it, true, "produce", now)

	if it.Ease != 1 {
		t.Fatalf("Ease = %v, esperaba migración silenciosa a 1.0", it.Ease)
	}
	if !almostEqual(it.Interval, 35*2.2) {
		t.Fatalf("Interval = %v, esperaba 35×2.2 = 77 (la escalera de siempre)", it.Interval)
	}
}

// Fallo aunque NO estuviera vencido: también cuenta como lapso (la rama de
// fallo no mira wasDue — fallar es fallar), con la misma caída sublineal.
func TestApplyReviewEarlyFailureAlsoLapses(t *testing.T) {
	now := time.Date(2026, 8, 1, 10, 0, 0, 0, time.UTC)
	it := &ItemStat{Streak: 4, Interval: 7, NextReview: now.Add(72 * time.Hour)}

	applyReview(it, false, "produce", now)

	if it.Streak != 0 || it.Lapses != 1 {
		t.Fatalf("Streak=%d Lapses=%d, esperaba 0/1 aunque no estuviera vencido", it.Streak, it.Lapses)
	}
	if it.Interval <= 0 || it.Interval >= 7 {
		t.Fatalf("Interval = %v, esperaba caída sublineal desde 7", it.Interval)
	}
	if !it.NextReview.Equal(now.Add(10 * time.Minute)) {
		t.Fatalf("NextReview = %v, esperaba now+10min", it.NextReview)
	}
}

// Acierto DENTRO de la ventana de reaprendizaje de un ítem JOVEN (Interval 0
// tras el fallo): como no hay intervalo post-lapso que recuperar, sigue por la
// escalera normal — jamás debe quedar citado para "ahora mismo".
func TestApplyReviewCorrectInsideRelearnWindowYoung(t *testing.T) {
	now := time.Date(2026, 8, 1, 10, 0, 0, 0, time.UTC)
	it := &ItemStat{}
	applyReview(it, false, "produce", now) // fallo de ítem joven: Interval = 0

	later := now.Add(5 * time.Minute) // aún NO vencido
	applyReview(it, true, "produce", later)

	if !almostEqual(it.Interval, relearnStep) {
		t.Fatalf("Interval = %v, esperaba el paso de 10 min", it.Interval)
	}
	if !it.NextReview.After(later) {
		t.Fatalf("NextReview = %v: nunca debe quedar citado para ya", it.NextReview)
	}
	if it.Streak != 1 || it.Correct != 1 || it.Wrong != 1 {
		t.Fatalf("Streak=%d Correct=%d Wrong=%d, esperaba 1/1/1", it.Streak, it.Correct, it.Wrong)
	}
}

// El acierto en el instante EXACTO del vencimiento cuenta como vencido
// (wasDue usa !After, no Before).
func TestApplyReviewDueAtExactInstant(t *testing.T) {
	now := time.Date(2026, 8, 1, 10, 0, 0, 0, time.UTC)
	it := &ItemStat{Interval: 1, NextReview: now, Streak: 2, Correct: 2}

	applyReview(it, true, "produce", now)

	if !almostEqual(it.Interval, 3) {
		t.Fatalf("Interval = %v, esperaba avance a 3 (vencido en el instante exacto)", it.Interval)
	}
}

// ---- touchStreak ----

func TestTouchStreakFirstDay(t *testing.T) {
	st := newState()
	now := time.Date(2026, 8, 8, 9, 30, 0, 0, time.UTC)

	touchStreak(st, now)

	if st.StreakDays != 1 {
		t.Fatalf("StreakDays = %d, esperaba 1 el primer día", st.StreakDays)
	}
	if st.LastActive != "2026-08-08" {
		t.Fatalf("LastActive = %q, esperaba 2026-08-08", st.LastActive)
	}
}

func TestTouchStreakConsecutiveDayIncrements(t *testing.T) {
	st := newState()
	st.StreakDays = 3
	st.LastActive = "2026-08-07"
	now := time.Date(2026, 8, 8, 22, 0, 0, 0, time.UTC)

	touchStreak(st, now)

	if st.StreakDays != 4 {
		t.Fatalf("StreakDays = %d, esperaba 4 (día consecutivo)", st.StreakDays)
	}
	if st.LastActive != "2026-08-08" {
		t.Fatalf("LastActive = %q, esperaba 2026-08-08", st.LastActive)
	}
}

func TestTouchStreakSameDayNoChange(t *testing.T) {
	st := newState()
	morning := time.Date(2026, 8, 8, 9, 0, 0, 0, time.UTC)
	evening := time.Date(2026, 8, 8, 23, 59, 0, 0, time.UTC)

	touchStreak(st, morning)
	touchStreak(st, evening) // segunda sesión el mismo día

	if st.StreakDays != 1 {
		t.Fatalf("StreakDays = %d, esperaba 1 (mismo día no suma)", st.StreakDays)
	}
	if st.LastActive != "2026-08-08" {
		t.Fatalf("LastActive = %q, esperaba 2026-08-08", st.LastActive)
	}
}

func TestTouchStreakGapResetsToOne(t *testing.T) {
	st := newState()
	st.StreakDays = 15
	st.LastActive = "2026-08-05" // hace 3 días

	touchStreak(st, time.Date(2026, 8, 8, 12, 0, 0, 0, time.UTC))

	if st.StreakDays != 1 {
		t.Fatalf("StreakDays = %d, esperaba reset a 1 tras hueco de 2+ días", st.StreakDays)
	}
	if st.LastActive != "2026-08-08" {
		t.Fatalf("LastActive = %q, esperaba 2026-08-08", st.LastActive)
	}
}

func TestTouchStreakTwoDayGapResets(t *testing.T) {
	st := newState()
	st.StreakDays = 7
	st.LastActive = "2026-08-06" // anteayer: ni hoy ni ayer

	touchStreak(st, time.Date(2026, 8, 8, 12, 0, 0, 0, time.UTC))

	if st.StreakDays != 1 {
		t.Fatalf("StreakDays = %d, esperaba 1 (anteayer rompe la racha)", st.StreakDays)
	}
}

func TestTouchStreakAcrossMonthBoundary(t *testing.T) {
	st := newState()
	st.StreakDays = 9
	st.LastActive = "2026-07-31"

	touchStreak(st, time.Date(2026, 8, 1, 8, 0, 0, 0, time.UTC))

	if st.StreakDays != 10 {
		t.Fatalf("StreakDays = %d, esperaba 10 (31 jul → 1 ago es consecutivo)", st.StreakDays)
	}
}

// Un ítem con MUCHOS lapsos históricos no debe colapsar a 10 minutos: si hoy
// está dominado (intervalo largo), un fallo lo baja, pero con suelo. Sin él, la
// fórmula post-lapso quedaba anulada justo en las palabras que más costaron.
func TestApplyReviewChronicLapseHasFloor(t *testing.T) {
	now := time.Date(2026, 8, 1, 10, 0, 0, 0, time.UTC)
	it := &ItemStat{Interval: 120, Lapses: 20, ProdCorrect: 9, NextReview: now.Add(-time.Hour)}

	applyReview(it, false, "produce", now)

	if it.Interval < 1 {
		t.Fatalf("Interval = %v: 20 lapsos no pueden mandar a 10 min un ítem de 120 días", it.Interval)
	}
}

// El intervalo tiene techo: sin él, la multiplicación indefinida desbordaría
// time.Duration y NextReview acabaría en el pasado.
func TestApplyReviewIntervalCeiling(t *testing.T) {
	now := time.Date(2026, 8, 1, 10, 0, 0, 0, time.UTC)
	it := &ItemStat{Interval: 700, ProdCorrect: 12, Ease: 1, NextReview: now.Add(-time.Hour)}

	applyReview(it, true, "produce", now)

	if it.Interval > 730 {
		t.Fatalf("Interval = %v, esperaba tope de 730 días", it.Interval)
	}
	if !it.NextReview.After(now) {
		t.Fatalf("NextReview = %v: jamás puede quedar en el pasado", it.NextReview)
	}
}
