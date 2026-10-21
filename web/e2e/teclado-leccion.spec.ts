import { expect, test, type Locator, type Page } from "@playwright/test";

// P39, en escritorio: una lección real se termina solo con Tab e Intro.
// Continuar, al cerrar cada ejercicio, no aparece ya enfocado.

test.use({
  viewport: { width: 1280, height: 800 },
  screenshot: "only-on-failure",
});
test.setTimeout(180_000);

async function enfocarConTab(page: Page, objetivo: Locator): Promise<void> {
  await objetivo.waitFor({ state: "visible" });
  for (let i = 0; i < 80; i++) {
    const ya = await objetivo.evaluate((el) => el === document.activeElement).catch(() => false);
    if (ya) return;
    await page.keyboard.press("Tab");
  }
  const donde = await page.evaluate(() => {
    const el = document.activeElement as HTMLElement | null;
    if (!el) return "(sin foco)";
    const nombre = el.getAttribute("aria-label") || el.innerText || el.tagName;
    return `${el.tagName} ${nombre}`.replace(/\s+/g, " ").slice(0, 140);
  });
  throw new Error(`El tabulador no llegó al control. El foco se quedó en: ${donde}`);
}

async function pulsarConTeclado(page: Page, objetivo: Locator): Promise<void> {
  await enfocarConTab(page, objetivo);
  await page.keyboard.press("Enter");
}

/** `sinSalto`: el botón de cerrar el ejercicio no debe robar el foco. */
async function continuar(page: Page, sinSalto: boolean): Promise<void> {
  const btn = page.getByRole("button", { name: "Continuar" });
  await expect(btn).toBeVisible();
  if (sinSalto) {
    await page.evaluate(() => new Promise<void>((resolve) => {
      requestAnimationFrame(() => resolve());
    }));
    await expect(btn).not.toBeFocused();
    expect(await btn.getAttribute("autofocus")).toBeNull();
  }
  await pulsarConTeclado(page, btn);
}

async function escribir(page: Page, texto: string): Promise<void> {
  const input = page.getByRole("textbox");
  await enfocarConTab(page, input);
  if (texto) await page.keyboard.type(texto);
}

async function insertar(page: Page, nombre: string): Promise<void> {
  await pulsarConTeclado(page, page.getByRole("button", { name: nombre }));
  await expect(page.getByRole("textbox")).toBeFocused();
}

async function pareja(page: Page, de: string, es: string): Promise<void> {
  await pulsarConTeclado(page, page.getByRole("button", { name: de, exact: true }));
  await pulsarConTeclado(page, page.getByRole("button", { name: es, exact: true }));
  await expect(page.locator("button").filter({ hasText: `✓ ${de}` })).toBeVisible();
}

test("f0l1 se completa con tabulador e Intro, sin que Continuar robe el foco", async ({ page }) => {
  await page.route(/:8787\//, (route) => route.abort());
  // El fetch al motor solo sale en un efecto: cuando llega, React ya hidrató
  // y Tab/Intro enganchan los botones. Sin esto el HTML se pinta antes.
  const motor = page.waitForRequest(/:8787\//, { timeout: 30_000 });
  await page.goto("/lesson/f0l1");
  await motor;

  await pulsarConTeclado(page, page.getByRole("button", { name: "Ya las escuché" }));

  await expect(page.getByText("Calienta con los saludos")).toBeVisible();
  await pareja(page, "Hallo", "Hola");
  await pareja(page, "Tschüss", "Chau");
  await pareja(page, "Auf Wiedersehen", "Adiós (formal)");
  await pareja(page, "Bis später", "Hasta luego");
  await continuar(page, true);

  await expect(page.getByText("Reconoce el significado")).toBeVisible();
  await pulsarConTeclado(page, page.getByRole("button", { name: "Me llamo Ana", exact: true }));
  await continuar(page, true);

  await expect(page.getByRole("group", { name: "Caracteres alemanes" })).toBeVisible();
  await escribir(page, "hei");
  await insertar(page, "Insertar ß");
  await page.keyboard.type("e");
  await expect(page.getByRole("textbox")).toHaveValue("heiße");
  await page.keyboard.press("Enter");
  await continuar(page, true);

  await expect(page.getByText("Escucha y escribe la palabra que oyes")).toBeVisible();
  await escribir(page, "Hallo");
  await page.keyboard.press("Enter");
  await continuar(page, true);

  await expect(page.getByText("Construye la pregunta")).toBeVisible();
  for (const ficha of ["Wie", "heißt", "du"]) {
    await pulsarConTeclado(page, page.getByRole("button", { name: ficha, exact: true }));
  }
  await pulsarConTeclado(page, page.getByRole("button", { name: "Comprobar", exact: true }));
  await continuar(page, true);

  await expect(page.getByText("Cierre: tu primera palabra escrita")).toBeVisible();
  await escribir(page, "Tsch");
  await insertar(page, "Insertar ü");
  await page.keyboard.type("ss");
  await expect(page.getByRole("textbox")).toHaveValue("Tschüss");
  await page.keyboard.press("Enter");
  await continuar(page, true);

  await expect(page.getByText("Nativo · para tu oído")).toBeVisible();
  await continuar(page, false);

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Ausgezeichnet!");
});
