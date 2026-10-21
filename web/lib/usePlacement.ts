"use client";

// Los informes de la prueba de nivel, uno por idioma.
//
// Viven en el dispositivo (localStorage) y por perfil, no en el servidor: son
// un diagnóstico personal y no tiene sentido que viajen. Como ahora los mira
// más de una pantalla —el diagnóstico y las pestañas de idioma del perfil—,
// leerlos vive aquí y no duplicado en cada una.

import { useEffect, useState } from "react";
import { getProfile } from "./api";
import { parsePlacementReport, placedLevel, placementKey, type PlacementReport } from "./placement";
import type { ServerState } from "./types";

export function usePlacementReports(
  langIds: string[],
  st?: ServerState | null,
): Record<string, PlacementReport | null> {
  const [reports, setReports] = useState<Record<string, PlacementReport | null>>({});
  const clave = langIds.join(",");

  useEffect(() => {
    const prof = getProfile();
    const out: Record<string, PlacementReport | null> = {};
    for (const id of clave.split(",").filter(Boolean)) {
      try {
        const raw = window.localStorage.getItem(placementKey(id, prof));
        if (raw && raw.length < 200_000) {
          const parsed = parsePlacementReport(JSON.parse(raw) as unknown);
          if (parsed) out[id] = parsed;
        }
      } catch {
        out[id] = null;
      }
      // Perfil restaurado en otro aparato: el informe detallado se quedó en el
      // navegador original, pero placedLevel (ServerState) sabe que la prueba
      // se hizo. No fingimos «no hecha» ni un 0% que parece suspenso.
      if (!out[id] && placedLevel(st ?? null, id)) {
        const placed = placedLevel(st ?? null, id)!;
        // PlacementLevel no incluye c2: el detalle no viajó; el placed sí.
        const solid = placed === "c2" ? "c1" : placed;
        out[id] = {
          placed,
          realLevel: solid,
          aboveCourse: false,
          highestSolid: solid,
          byLevel: [],
          topics: [],
          dominados: [],
          aMedias: [],
          flojos: [],
          hits: 0,
          total: 0,
          pct: 0,
          veredicto: "Hiciste la prueba en otro aparato: el cuaderno ya está situado. El informe detallado se quedó allí.",
          bySkill: [],
          confianza: "media",
          confianzaPorque: "El detalle de temas se quedó en el dispositivo donde hiciste la prueba.",
          equivalencia: "",
          metodo: { itemsPorNivel: [], corte: 0.7, minItemsPorTema: 2, limites: [] },
          at: "",
          detalleAusente: true,
        };
      }
    }
    setReports(out);
  }, [clave, st]);

  return reports;
}
