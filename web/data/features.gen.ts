// ⚠️ GENERADO por scripts/gen-course.mjs — NO editar a mano.
export const FEATURES = {
  ai: true,
  exams: true,
  missions: true,
  interview: true,
  review: true,
  challenges: true,
  placement: true,
  badges: true,
  reference: true,
  certificates: true,
  moduleTest: true,
  tts: true,
} as const;

export type Capability = keyof typeof FEATURES;

export const has = (c: Capability): boolean => FEATURES[c];
