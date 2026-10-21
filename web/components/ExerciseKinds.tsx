"use client";

// Cada tipo vive en kinds/. Aquí solo se reexporta: el player, la libreta
// y los tests siguen importando de este archivo. Lo que no es un tipo
// (voz, barajado, entrada de texto) está en kinds/shared.

export type { KindProps } from "./kinds/shared";
export {
  AUDIO_KINDS,
  useVoiceMissing,
  VoiceMissingNotice,
  seededOrder,
  isVocabTarget,
} from "./kinds/shared";

export { MC } from "./kinds/MC";
export { Cloze } from "./kinds/Cloze";
export { Build } from "./kinds/Build";
export { Match } from "./kinds/Match";
export { TypeEx } from "./kinds/TypeEx";
export { Listen } from "./kinds/Listen";
export { Speak } from "./kinds/Speak";
export { Order } from "./kinds/Order";
export { Transform } from "./kinds/Transform";
export { Bucket } from "./kinds/Bucket";
export { Shadow } from "./kinds/Shadow";
export { Fastmatch } from "./kinds/Fastmatch";
export { Hearreal } from "./kinds/Hearreal";
export { Write } from "./kinds/Write";
export { AudioMC } from "./kinds/AudioMC";
export { Read } from "./kinds/Read";
export { Gapbank } from "./kinds/Gapbank";
export { Errorfix } from "./kinds/Errorfix";
export { Paraphrase } from "./kinds/Paraphrase";
export { Translate } from "./kinds/Translate";
export { Monologue } from "./kinds/Monologue";
