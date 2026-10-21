package main

import (
	"math"
	"time"
)

// ItemStat es la tarjeta de una palabra. Está con la escalera, y no con el
// arranque, para que un cambio de intervalo no se haga en el archivo del
// servidor entero.
type ItemStat struct {
	Correct    int       `json:"correct"`
	Wrong      int       `json:"wrong"`
	Streak     int       `json:"streak"`
	Interval   float64   `json:"intervalDays"`
	NextReview time.Time `json:"nextReview"`
	LastSeen   time.Time `json:"lastSeen"`
	// ── B1 (drop 5): memoria de lapsos y asimetría reconocer/producir.
	// Los perfiles anteriores no los traen: Ease=0 se migra a 1 al vuelo y el
	// comportamiento queda idéntico al de siempre.
	Lapses      int     `json:"lapses,omitempty"`      // fallos acumulados
	ProdCorrect int     `json:"prodCorrect,omitempty"` // aciertos PRODUCIENDO
	Ease        float64 `json:"ease,omitempty"`        // facilidad (1.0 = neutra)
	Relearn     bool    `json:"relearn,omitempty"`     // paso de reaprendizaje pendiente
}

// ---- Repetición espaciada (SM-2 simplificado) ----

// Intervalos graduados: 10min → 1d → 3d → 7d → 16d → 35d → *2.2
// El intervalo solo avanza si el ítem estaba vencido: practicarlo antes de
// tiempo (dos lecciones que comparten vocab el mismo día) no infla la escalera.
// relearnStep: 10 minutos expresados en días — el paso de reaprendizaje que
// SIEMPRE sigue a un fallo.
const relearnStep = 10.0 / 1440.0

// applyReview mueve un ítem por la escalera de repaso espaciado.
//
// Aciertos: 10 min → 1 → 3 → 7 → 16 → 35 → ×(1+1.2·Ease) (con Ease=1: ×2.2).
//
// Fallos (drop 5, PLAN.md §6.1): el intervalo YA NO se resetea a cero. Se
// reduce de forma sublineal al previo — misma filosofía que la post-lapse
// stability de FSRS y que el E-Factor conservado de SM-2 — porque reaprender
// lo olvidado es mucho más rápido que aprenderlo por primera vez. Un ítem con
// 35 días vuelve a ~2,9 días, no a cero. Los ítems jóvenes (<1 día) sí
// reaprenden desde el principio: no hay estabilidad que conservar.
//
// Asimetría reconocer/producir: fallar reconociendo (el test fácil) es
// evidencia MÁS fuerte de olvido que fallar produciendo, así que castiga más.
// Y sin una sola recuperación produciendo, el intervalo tiene techo de 16
// días: reconocer no es saber (brecha receptivo-productivo).
func applyReview(it *ItemStat, correct bool, mode string, now time.Time) {
	wasDue := !it.NextReview.After(now)
	it.LastSeen = now
	if it.Ease == 0 {
		it.Ease = 1 // migración silenciosa de perfiles anteriores al drop 5
	}

	if !correct {
		it.Wrong++
		it.Lapses++
		it.Streak = 0
		// el ítem queda marcado como difícil (SM-2 penaliza, no borra)
		it.Ease = math.Max(0.6, it.Ease-0.15)
		prev := it.Interval
		if prev < 1 {
			it.Interval = 0 // ítem joven: reaprendizaje total, como siempre
		} else {
			k := 0.35
			if mode == "recognize" {
				k = 0.25
			}
			// el lapso crónico cae más, pero con SUELO: sin él, un ítem con
			// muchos fallos históricos colapsaba a 10 minutos para siempre
			// aunque hoy estuviera dominado — la fórmula post-lapso quedaba
			// anulada justo en las palabras que más ha costado aprender
			k *= math.Max(0.35, math.Pow(0.85, float64(it.Lapses-1)))
			it.Interval = math.Min(prev, math.Max(relearnStep, k*math.Pow(prev, 0.6)))
		}
		it.Relearn = true
		it.NextReview = now.Add(10 * time.Minute)
		return
	}

	it.Correct++
	it.Streak++
	// El vacío sigue siendo producir: los clientes de antes no mandaban mode.
	// Una cadena cualquiera no lo es. Si no, "prod" o "produce " levantan el
	// techo de 16 días. Esas cadenas las rechaza el POST y no llegan aquí.
	if mode == "" || mode == "produce" {
		it.ProdCorrect++
	}

	if it.Relearn {
		// superado el paso de reaprendizaje: recupera su intervalo post-lapso
		// sin volver a subir la escalera desde abajo
		it.Relearn = false
		it.Ease = math.Min(1.3, it.Ease+0.05)
		if it.Interval >= relearnStep {
			it.NextReview = now.Add(time.Duration(it.Interval * 24 * float64(time.Hour)))
			return
		}
		// ítem joven (reaprendizaje total): no hay intervalo que recuperar —
		// sigue por la escalera normal, o quedaría citado para ahora mismo
	}

	if !wasDue && it.Interval > 0 {
		return // práctica anticipada: cuenta el acierto, no toca el espaciado
	}

	switch {
	case it.Interval == 0:
		it.Interval = relearnStep
	case it.Interval < 1:
		it.Interval = 1
	case it.Interval < 3:
		it.Interval = 3
	case it.Interval < 7:
		it.Interval = 7
	case it.Interval < 16:
		it.Interval = 16
	case it.Interval < 35:
		it.Interval = 35
	default:
		it.Interval *= 1 + 1.2*it.Ease
	}
	// techo receptivo: sin recuperaciones produciendo no se pasa de 16 días
	if it.ProdCorrect == 0 && it.Interval > 16 {
		it.Interval = 16
	}
	// techo absoluto de 2 años: más allá, el intervalo deja de ser una
	// predicción útil y (a lo bestia) desbordaría time.Duration, mandando la
	// próxima revisión al pasado
	if it.Interval > 730 {
		it.Interval = 730
	}
	it.NextReview = now.Add(time.Duration(it.Interval * 24 * float64(time.Hour)))
}
