// LIBERACIÓN ESCALONADA (modelo de drops de Patreon):
// cada build lleva horneado hasta QUÉ drop de contenido incluye. La base
// (drop 1) solo compila y expone el A1; el paquete de actualización (drop 2)
// añade el A2 entero. El mismo binario nuevo sobre los mismos datos ES la
// actualización: el progreso vive fuera de la app (UserConfigDir) y el
// backend migra el esquema al vuelo.
//
// build-app.sh lo controla regenerando course.gen.ts: ./build-app.sh 1.0.0 1

// drop.gen.ts lo deriva gen-derived.mjs de course.gen.ts, con el mismo
// número: importar course.gen.ts aquí metía el curso entero en cada página.
import { BUILT_DROP } from "@/data/drop.gen";

/** el drop horneado en ESTE build — única fuente: course.gen.ts (U4) */
export const DROP: number = BUILT_DROP;

/** tabla única nivel (id compuesto idioma-cefr) → primer drop que lo incluye (U4).
 *  El inglés A2 y B1 nacieron aquí como PREVISIÓN —estaban registrados en
 *  levels.ts antes de tener contenido, porque la tutora y el corrector
 *  necesitaban saber que existen— y ya lo tienen escrito: sus drops, el 6 y el
 *  7, están abajo con su anuncio. En un build anterior `levelInDrop` los sigue
 *  dando por no disponibles; y aunque el reparto de drops cambiase, `levels.ts`
 *  exige ADEMÁS que sus módulos viajen en el build, así que nunca se puede
 *  colar un nivel vacío. */
/** Drop 8 = B2 de los dos idiomas + el simulacro Goethe A2 que el drop 2
 *  nunca llegó a llevar como ExamSet. Un fixture de tests sigue teniendo
 *  que pasar por drop Y fases (`ready`), no por `available: true` a pelo. */
export const LEVEL_MIN_DROP: Record<string, number> = {
  "de-a1": 1, "de-a2": 2, "en-a1": 3, "de-b1": 5, "en-a2": 6, "en-b1": 7,
  "de-b2": 8, "en-b2": 8,
};

/** ¿Se puede ANUNCIAR este nivel como «llega pronto»? Solo si su drop existe
 *  ya en la tabla de abajo, es decir, si alguien lo ha escrito y tiene nombre.
 *  Un nivel registrado en levels.ts pero sin drop escrito NO se anuncia:
 *  ponerlo en el hub sería prometer un roadmap sin fecha a quien ha pagado. */
export function levelAnnounced(id: string): boolean {
  const d = LEVEL_MIN_DROP[id];
  return d !== undefined && DROPS.some((x) => x.id === d);
}

export interface DropInfo {
  id: number;
  /** nombre humano para la pantalla de novedades */
  name: string;
  /** qué trae — el texto del anuncio dentro de la app */
  news: string;
  /** a dónde lleva el botón del anuncio */
  href: string;
}

export const DROPS: DropInfo[] = [
  {
    id: 1,
    name: "Nivel A1 completo",
    news: "13 módulos hasta el Start Deutsch 1, simulacros oficiales y entrevista oral.",
    href: "/nivel/de-a1",
  },
  {
    id: 2,
    name: "Nivel A2 completo",
    news: "11 módulos nuevos: Perfekt, dativo, subordinadas y comparativo — rumbo al Goethe-Zertifikat A2. Con tipos de ejercicio nuevos, glosas audibles y su propia libreta.",
    href: "/nivel/de-a2",
  },
  {
    id: 3,
    name: "Inglés A1 + Retos + Nativo",
    news: "Seshat ahora habla inglés: nivel A1 completo rumbo al examen oficial. Y para todos los idiomas: Retos (10 ejercicios, 3 vidas, medallas) y Nativo — cómo hablan de verdad.",
    href: "/",
  },
  {
    id: 4,
    name: "Profundidad",
    news: "El inglés A1 casi duplica: 108 lecciones con oído real, escritura de examen e historias con repaso espiral. Y para todos los idiomas: 36 Misiones de práctica real, simulacros LanguageCert, entrevista oral inglesa, libreta inglesa y el reto de nivel.",
    href: "/",
  },
  {
    id: 5,
    name: "Alemán B1",
    news: "El nivel que te vuelve autónomo: Konjunktiv II, Passiv, relativas y subordinadas completas, textos largos de verdad, escritura argumentativa y el Goethe-Zertifikat B1 (que es también el ÖSD B1). Y para todos los niveles: el repaso ya no borra tu progreso al primer fallo.",
    href: "/nivel/de-b1",
  },
  {
    id: 6,
    name: "Inglés A2",
    news: "12 módulos nuevos, 108 lecciones y unas 570 tarjetas rumbo al LanguageCert ESOL A2 Access: contar lo que pasó (past simple, there was/were), planes con going to, comparaciones, y moverte entre lo que puedes y lo que tienes que hacer. Tu A1 no se queda atrás: cada módulo lo recicla mientras añade lo suyo.",
    href: "/nivel/en-a2",
  },
  {
    id: 7,
    name: "Inglés B1",
    news: "El nivel que te vuelve autónomo en inglés: 12 módulos, 120 lecciones y unas 740 tarjetas rumbo al LanguageCert ESOL B1 Achiever. Textos largos de los que se leen de corrido, escritura de examen con rúbrica —la carta formal de 70-100 palabras y la informal de 100-120— y tarjetas «Nativo» con sus tres registros: lo que dice el manual, lo que se dice en la calle y lo que puntúa en el examen.",
    href: "/nivel/en-b1",
  },
  {
    id: 8,
    name: "Alemán B2 + Inglés B2",
    news: "El salto de pericia, no de inventario: 12 módulos de alemán rumbo al Goethe-Zertifikat B2 y 12 de inglés rumbo al LanguageCert B2 Communicator. Citar sin firmar, argumentar, sintetizar dos fuentes, y el simulacro Goethe A2 que faltaba. El B1 no se reenseña: se cobra dentro de frases más largas.",
    href: "/nivel/de-b2",
  },
];

export function dropInfo(id: number): DropInfo | undefined {
  return DROPS.find((d) => d.id === id);
}

/** ¿este build incluye el nivel dado?
    (si el usuario salta 2 drops, UpdateNews solo anuncia el último — asumido) */
/** Igual que `levelInDrop`, con el drop inyectado: así se prueba
 *  `BUILT_DROP < min` sin registrar un nivel fantasma. */
export function levelInDropFor(level: string, built: number): boolean {
  const min = LEVEL_MIN_DROP[level];
  return min !== undefined && built >= min;
}

export function levelInDrop(level: string): boolean {
  return levelInDropFor(level, DROP);
}
