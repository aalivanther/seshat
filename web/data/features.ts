// Las funcionalidades REALES de este build viven en features.gen.ts
// (generado por scripts/gen-course.mjs desde el manifiesto — PLAN-COMPOSICION.md
// §7.3). Aquí solo el re-export estable: el código de la app importa de
// "@/data/features", nunca del generado directamente, igual que "@/data/course".
export { FEATURES, has } from "./features.gen";
export type { Capability } from "./features.gen";
