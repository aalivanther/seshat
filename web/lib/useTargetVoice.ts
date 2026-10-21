"use client";

// hasTargetVoice() en RENDER rompe la hidratación: el HTML del servidor sale
// sin bocinas y el cliente las pinta. Este hook da el mismo boolean pero como
// estado: false en el primer render (= HTML del servidor) y actualizado en
// efecto, con el listener voiceschanged y la gracia de 1200 ms de siempre.

import { useEffect, useState } from "react";
import { hasTargetVoice } from "@/lib/tts";

export function useTargetVoice(): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const synth = typeof window !== "undefined" ? window.speechSynthesis : undefined;
    if (!synth) return;
    const check = () => setReady(hasTargetVoice());
    check();
    const t = setTimeout(check, 1200); // las voces cargan async: gracia inicial
    synth.addEventListener("voiceschanged", check);
    return () => { clearTimeout(t); synth.removeEventListener("voiceschanged", check); };
  }, []);
  return ready;
}
