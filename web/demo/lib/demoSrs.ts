// REPASO ESPACIADO Y RACHA PARA LA DEMO WEB — traducción de backend/srs.go
// y de touchStreak (backend/main.go).
//
// La escalera es el corazón del curso: si la demo la simplificara, enseñaría
// otro producto. Cada constante y cada rama sale de srs.go, con los mismos
// nombres en los comentarios para poder compararlos línea a línea.

import { localDay, localDayShifted, type ItemStat, type State } from "./demoState";

const MINUTE_MS = 60_000;
const DAY_MS = 86_400_000;

/** 10 minutos expresados en días: el paso de reaprendizaje tras un fallo. */
export const RELEARN_STEP = 10 / 1440;

/** time.Duration(días·24·hora) trunca a nanosegundos; aquí a milisegundos. */
function daysToMs(days: number): number {
  return Math.trunc(days * DAY_MS);
}

/** applyReview de srs.go: mueve una tarjeta por la escalera.
 *
 *  Aciertos: 10 min → 1 → 3 → 7 → 16 → 35 → ×(1+1,2·Ease).
 *  Fallos: el intervalo se reduce de forma sublineal, no vuelve a cero
 *  (salvo en tarjetas de menos de un día). Fallar reconociendo castiga más
 *  que fallar produciendo, y sin un acierto produciendo el techo es 16 días. */
export function applyReview(it: ItemStat, correct: boolean, mode: string, nowMs: number): void {
  const wasDue = !(it.nextReview > nowMs);
  it.lastSeen = nowMs;
  if (it.ease === 0) it.ease = 1; // migración silenciosa de perfiles anteriores al drop 5

  if (!correct) {
    it.wrong++;
    it.lapses++;
    it.streak = 0;
    it.ease = Math.max(0.6, it.ease - 0.15);
    const prev = it.intervalDays;
    if (prev < 1) {
      it.intervalDays = 0;
    } else {
      let k = mode === "recognize" ? 0.25 : 0.35;
      // el lapso crónico cae más, pero con suelo (ver srs.go)
      k *= Math.max(0.35, Math.pow(0.85, it.lapses - 1));
      it.intervalDays = Math.min(prev, Math.max(RELEARN_STEP, k * Math.pow(prev, 0.6)));
    }
    it.relearn = true;
    it.nextReview = nowMs + 10 * MINUTE_MS;
    return;
  }

  it.correct++;
  it.streak++;
  // el vacío sigue siendo producir: los clientes de antes no mandaban mode
  if (mode === "" || mode === "produce") it.prodCorrect++;

  if (it.relearn) {
    // superado el paso de reaprendizaje: recupera su intervalo post-lapso
    it.relearn = false;
    it.ease = Math.min(1.3, it.ease + 0.05);
    if (it.intervalDays >= RELEARN_STEP) {
      it.nextReview = nowMs + daysToMs(it.intervalDays);
      return;
    }
  }

  if (!wasDue && it.intervalDays > 0) return; // práctica anticipada

  const iv = it.intervalDays;
  if (iv === 0) it.intervalDays = RELEARN_STEP;
  else if (iv < 1) it.intervalDays = 1;
  else if (iv < 3) it.intervalDays = 3;
  else if (iv < 7) it.intervalDays = 7;
  else if (iv < 16) it.intervalDays = 16;
  else if (iv < 35) it.intervalDays = 35;
  else it.intervalDays *= 1 + 1.2 * it.ease;
  // techo receptivo: sin recuperaciones produciendo no se pasa de 16 días
  if (it.prodCorrect === 0 && it.intervalDays > 16) it.intervalDays = 16;
  // techo absoluto de 2 años
  if (it.intervalDays > 730) it.intervalDays = 730;
  it.nextReview = nowMs + daysToMs(it.intervalDays);
}

/** touchStreak de main.go: un día seguido suma, un hueco vuelve a 1. */
export function touchStreak(st: State, nowMs: number): void {
  const today = localDay(nowMs);
  if (st.lastActive === today) return;
  const yesterday = localDayShifted(nowMs, -1);
  st.streakDays = st.lastActive === yesterday ? st.streakDays + 1 : 1;
  st.lastActive = today;
}
