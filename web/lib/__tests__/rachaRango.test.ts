import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { RANKS, rankOf } from "@/lib/achievements";

// P44: la racha y el rango informan. Al volver a 1 y al subir de rango no
// hay reproche ni elogio a la persona; si alguien lo añade, este test falla.

const web = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const read = (rel: string) => readFileSync(join(web, rel), "utf8");

const REPROCHE =
  /perdid[oa] la racha|racha rota|qué bueno eres|qué vago|vergüenza|se te olvidó|eres un genio|eres un desastre/i;

describe("P44 — la racha y el rango se quedan como información", () => {
  it("al volver a 1 solo se lee el dato, no un reproche", () => {
    const perfil = read("app/perfil/page.tsx");
    const leccion = read("components/LessonPlayer.tsx");
    const repaso = read("app/review/page.tsx");
    const barra = read("components/AppTopBar.tsx");

    expect(perfil).toContain('=== 1 ? "día" : "días"} de racha');
    expect(leccion).toContain("Días de racha");
    expect(repaso).toContain("Días de racha");
    expect(barra).toContain("${streak} días de racha");
    for (const src of [perfil, leccion, repaso, barra]) {
      expect(src).not.toMatch(REPROCHE);
    }
  });

  it("subir de rango enseña el nombre de la expedición y el XP que falta", () => {
    expect(RANKS.map((r) => r.title)).toEqual([
      "Neuling",
      "Wanderer",
      "Entdecker",
      "Pfadfinder",
      "Bergführer",
      "Weltreisender",
    ]);
    expect(rankOf(0).current.title).toBe("Neuling");
    expect(rankOf(249).current.title).toBe("Neuling");
    expect(rankOf(249).next?.title).toBe("Wanderer");
    expect(rankOf(250).current.title).toBe("Wanderer");
    expect(rankOf(750).current.title).toBe("Entdecker");
    expect(rankOf(1500).current.title).toBe("Pfadfinder");
    expect(rankOf(3000).current.title).toBe("Bergführer");
    expect(rankOf(5999).next?.title).toBe("Weltreisender");
    expect(rankOf(6000).current.title).toBe("Weltreisender");
    expect(rankOf(6000).next).toBeNull();

    const perfil = read("app/perfil/page.tsx");
    const cert = read("app/certificado/[id]/Client.tsx");
    const hub = read("app/idioma/[lang]/Client.tsx");
    const medallas = read("lib/achievements.tsx");
    expect(perfil).toContain("XP para {rank.next.title}");
    expect(cert).toContain("explorador con rango");
    expect(hub).toContain("tu rango de explorador");
    expect(medallas).toContain("3 días seguidos estudiando");
    expect(medallas).toContain("7 días seguidos");
    expect(medallas).toContain("30 días seguidos");
    for (const src of [perfil, cert, hub, medallas]) {
      expect(src).not.toMatch(REPROCHE);
    }
  });
});
