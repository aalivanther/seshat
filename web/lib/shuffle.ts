// Fisher-Yates ÚNICO de la app (antes había 4 copias). Variantes con semilla
// (Build en kinds/Build, Order en kinds/Order) quedan aparte a propósito:
// son deterministas por id de ejercicio y no deben compartir esta
// implementación aleatoria.

/** copia barajada (Fisher-Yates); no muta el original */
export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** n elementos al azar sin reemplazo */
export function sample<T>(arr: readonly T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

/** un elemento al azar */
export function pickOne<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
