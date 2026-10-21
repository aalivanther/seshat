"use client";

// Guardia global de audio: al cambiar de ruta, cualquier lectura en curso o
// encolada muere — el Hören de un examen no debe seguir sonando en el inicio.

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { stopSpeech } from "@/lib/tts";

export function TTSGuard() {
  const pathname = usePathname();
  useEffect(() => {
    return () => stopSpeech();
  }, [pathname]);
  return null;
}
