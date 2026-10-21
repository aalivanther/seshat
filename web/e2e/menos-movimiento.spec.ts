import { expect, test } from "@playwright/test";

// P41, en escritorio, con la preferencia del sistema puesta: colocación,
// entrevista, conversación y escritura no dejan un bucle en marcha. El cursor
// del stream, si su hoja está cargada, se declara quieto dentro del media.

test.use({
  viewport: { width: 1280, height: 800 },
  reducedMotion: "reduce",
  screenshot: "only-on-failure",
});
test.setTimeout(120_000);

const RUTAS = ["/colocacion?lang=de", "/entrevista", "/conversacion", "/escritura"];

test("con menos movimiento, las cuatro pantallas no siguen moviéndose solas", async ({ page }) => {
  await page.route(/:8787\//, (route) => route.abort());

  for (const ruta of RUTAS) {
    await page.goto(ruta);
    await expect(page.locator("h1").first()).toBeVisible();
    await page.evaluate(() => new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    }));

    const enMarcha = await page.evaluate(() => {
      return document.getAnimations().flatMap((anim) => {
        const efecto = anim.effect;
        if (!efecto || !("getTiming" in efecto)) return [];
        const t = efecto.getTiming();
        const dur = typeof t.duration === "number" ? t.duration : 0;
        const infinita = t.iterations === Infinity;
        if (!infinita && !(anim.playState === "running" && dur > 0.05)) return [];
        const el = anim.effect && "target" in anim.effect ? anim.effect.target : null;
        const nombre = el instanceof Element ? el.tagName + "." + (el.className || "") : "(sin nodo)";
        return [`${nombre} ×${String(t.iterations)} ${dur}s ${anim.playState}`];
      });
    });
    expect(enMarcha, ruta).toEqual([]);
  }

  await page.goto("/conversacion");
  const cursor = await page.evaluate(() => {
    const infinitos: string[] = [];
    const quietos: string[] = [];
    const walk = (rules: CSSRuleList, enCalma: boolean) => {
      for (const rule of rules) {
        if (rule instanceof CSSMediaRule) {
          const calma = enCalma || (rule.conditionText.includes("prefers-reduced-motion") && rule.conditionText.includes("reduce"));
          walk(rule.cssRules, calma);
          continue;
        }
        if (!(rule instanceof CSSStyleRule)) {
          if ("cssRules" in rule) walk((rule as CSSGroupingRule).cssRules, enCalma);
          continue;
        }
        if (enCalma && (rule.style.animationName === "none" || rule.style.animation === "none")) {
          quietos.push(rule.selectorText);
          continue;
        }
        const paso = rule.style.animationTimingFunction.includes("step");
        const infinita = rule.style.animationIterationCount === "infinite" || rule.style.animation.includes("infinite");
        if (!enCalma && paso && infinita) infinitos.push(rule.selectorText);
      }
    };
    for (const hoja of document.styleSheets) {
      try {
        walk(hoja.cssRules, false);
      } catch {
        // hoja de otro origen: no es de esta app
      }
    }
    return { infinitos, quietos };
  });
  expect(cursor.infinitos.length).toBeGreaterThan(0);
  for (const sel of cursor.infinitos) {
    expect(cursor.quietos, sel).toContain(sel);
  }
});
