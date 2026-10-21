package main

import (
	"math"
	"sort"
)

// FUSIÓN DE TARJETAS DEL SRS (esquema v1 → v2)
//
// vocabAliases no son «34 palabras del B1». Es el registro entero
// (web/scripts/vocab-aliases.json): cientos de ids retirados de
// vocabulario, lección y fase. Esta función solo corre al pasar el
// esquema de 1 a 2, desde migrateState. Un perfil que ya está en v2 no
// vuelve a fundir: una fila nueva del registro no mueve progreso hasta
// el esquema siguiente. No hay un migrate.go.
//
// Al unificar NO se tira el progreso viejo: quien lleve meses con
// «b1gztermin» en la cabeza tiene ese mérito guardado bajo ese nombre.
//
// La fusión no suma intervalos: eso regalaría repasos. Se queda con la tarjeta
// MÁS MADURA (la de intervalo mayor) y le añade el historial de la otra —
// aciertos, fallos y lapsos, que son cuentas reales— pero conserva la racha y
// el próximo repaso de la madura. Si solo existe la vieja, se renombra tal cual.
func migrateItemAliases(st *State) int {
	if st.Items == nil {
		return 0
	}
	merged := 0
	for _, old := range sortedAliasKeys() {
		new := vocabAliases[old]
		src, ok := st.Items[old]
		// OJO: `ok` es true también cuando el valor es `null` en el JSON. Sin
		// esta guarda se copiaba el nil a la tarjeta nueva y el pánico llegaba
		// mucho después, en /api/due, con el mutex global cerrado detrás.
		if !ok || src == nil {
			delete(st.Items, old)
			continue
		}
		delete(st.Items, old)
		merged++
		dst, exists := st.Items[new]
		if !exists || dst == nil {
			st.Items[new] = src // nunca se repasó la nueva: el progreso viejo ES el progreso
			continue
		}
		mature, other := dst, src
		if src.Interval > dst.Interval {
			mature, other = src, dst
		}
		mature.Correct += other.Correct
		mature.Wrong += other.Wrong
		mature.ProdCorrect += other.ProdCorrect
		mature.Lapses += other.Lapses
		if other.LastSeen.After(mature.LastSeen) {
			mature.LastSeen = other.LastSeen
		}
		// una tarjeta en reaprendizaje manda: el fallo reciente sigue pendiente
		if other.Relearn {
			mature.Relearn = true
			if other.NextReview.Before(mature.NextReview) {
				mature.NextReview = other.NextReview
			}
			if other.Interval < mature.Interval {
				mature.Interval = other.Interval
			}
			if other.Streak < mature.Streak {
				mature.Streak = other.Streak
			}
		}
		if mature.Ease == 0 {
			mature.Ease = other.Ease
		} else if other.Ease != 0 {
			mature.Ease = math.Min(mature.Ease, other.Ease) // la peor facilidad, sin regalos
		}
		st.Items[new] = mature
	}
	return merged
}

// sortedAliasKeys devuelve las claves de vocabAliases en orden estable. Un
// mapa Go se recorre en orden aleatorio: cuando dos o más orígenes se funden
// en el MISMO destino (22 casos reales hoy), la rama de reaprendizaje de
// arriba puede achicar el intervalo de la tarjeta "madura" a mitad de la
// fusión — así que qué origen se procesa primero cambia el resultado final.
// Un fuzz de 3.000 perfiles × 30 fusiones dio 8,8% de resultados distintos
// entre sí antes de este fix. Recorrer en orden alfabético no cambia el
// resultado a mejor o peor: solo hace que sea el MISMO en todas las máquinas.
func sortedAliasKeys() []string {
	keys := make([]string, 0, len(vocabAliases))
	for k := range vocabAliases {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	return keys
}

// FUSIÓN DE PROGRESO DE LECCIÓN Y DE FASE (mismo esquema v1 → v2)
//
// web/scripts/vocab-aliases.json protege CUATRO familias de id (lecciones,
// vocabulario, ejercicios, fases: ver validate-content.mjs), pero hasta ahora
// solo migrateItemAliases sabía mover algo — un alias sobre una lección o una
// fase pasaba el validador sin mover ni un byte de progreso real (deuda: "el
// interruptor universal de silencio").
//
// Un id de ejercicio no tiene contraparte en el backend: no existe progreso
// por ejercicio (solo por lección y por ítem de vocabulario), así que un
// alias sobre uno no tiene nada que migrar — no es una laguna, es que ahí no
// hay estado que perder.
//
// Un id de lección vive tal cual como clave de st.Lessons. Un id de FASE
// (módulo) no es una clave directa: aparece como prefijo de las claves
// sintéticas que arma el frontend en web/lib/ids.ts — testId, retoId y
// missionId. Migrar una fase es migrar esas tres claves derivadas.
func migrateLessonAliases(st *State) int {
	if st.Lessons == nil {
		return 0
	}
	merged := 0
	for _, old := range sortedAliasKeys() {
		new := vocabAliases[old]
		if mergeLessonKey(st, old, new) {
			merged++
		}
		for _, prefix := range []string{"test-", "reto-", "mission-"} {
			if mergeLessonKey(st, prefix+old, prefix+new) {
				merged++
			}
		}
	}
	return merged
}

// mergeLessonKey funde st.Lessons[old] en st.Lessons[new] y devuelve si había
// algo que mover. Política de fusión, igual de honesta que la de items: nunca
// se tira historial. Completed es un OR (una vez aprobada, sigue aprobada);
// BestScore se queda con la mejor nota vista bajo cualquiera de los dos ids;
// LastScore/LastAt vienen del intento más reciente de los dos (es el que
// describe mejor "cómo le va ahora"); Attempts suma, porque son intentos
// reales que ocurrieron.
func mergeLessonKey(st *State, old, new string) bool {
	src, ok := st.Lessons[old]
	if !ok || src == nil {
		delete(st.Lessons, old)
		return false
	}
	delete(st.Lessons, old)
	dst, exists := st.Lessons[new]
	if !exists || dst == nil {
		st.Lessons[new] = src
		return true
	}
	dst.Completed = dst.Completed || src.Completed
	if src.BestScore > dst.BestScore {
		dst.BestScore = src.BestScore
	}
	if src.LastAt.After(dst.LastAt) {
		dst.LastScore = src.LastScore
		dst.LastAt = src.LastAt
	}
	dst.Attempts += src.Attempts
	return true
}
