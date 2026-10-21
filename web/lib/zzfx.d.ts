declare module "zzfx" {
  /** Sintetiza y reproduce un sonido ZzFX (ver presets en https://killedbyapixel.github.io/ZzFX/) */
  export function zzfx(...parameters: (number | undefined)[]): AudioBufferSourceNode | void;
  export const ZZFX: { volume: number; sampleRate: number };
}
