import { test, expect } from "@playwright/test";
import { CATALOG } from "../content/catalog.mjs";

type Piece = { kind: string; id: string; lang: string; level: string };

const pieces = CATALOG as Piece[];
const modules = pieces.filter((p) => p.kind === "module");
const exams = pieces.filter((p) => p.kind === "exam");

test.describe("hubs de idioma y nivel", () => {
  test("landing y colocación cargan", async ({ page }) => {
    const res = await page.goto("/");
    expect(res?.ok()).toBeTruthy();
    await expect(page.locator("body")).toBeVisible();
    await page.goto("/colocacion");
    await expect(page.locator("body")).toBeVisible();
  });

  for (const lang of ["de", "en"]) {
    test(`idioma ${lang}`, async ({ page }) => {
      await page.goto(`/idioma/${lang}`);
      await expect(page.locator("body")).toBeVisible();
      await expect(page.locator("body")).not.toContainText("Application error");
    });
  }

  for (const id of ["de-a1", "de-a2", "de-b1", "de-b2", "en-a1", "en-a2", "en-b1", "en-b2"]) {
    test(`nivel ${id}`, async ({ page }) => {
      await page.goto(`/nivel/${id}`);
      await expect(page.locator("body")).toBeVisible();
    });
  }
});

test.describe("cada módulo", () => {
  for (const m of modules) {
    test(`${m.lang} ${m.level} ${m.id}`, async ({ page }) => {
      const res = await page.goto(`/modulo/${m.id}`);
      expect(res?.ok() ?? res?.status() === 304).toBeTruthy();
      await expect(page.locator("body")).toBeVisible();
      await expect(page.locator("body")).not.toContainText("Application error");
    });
  }
});

test.describe("cada simulacro", () => {
  for (const ex of exams) {
    test(`${ex.lang} ${ex.level} ${ex.id}`, async ({ page }) => {
      const res = await page.goto(`/examen/${ex.id}`);
      expect(res?.ok() ?? res?.status() === 304).toBeTruthy();
      await expect(page.locator("body")).toBeVisible();
    });
  }
});

test.describe("feats preexistentes", () => {
  const routes = [
    "/escritura",
    "/conversacion",
    "/entrevista",
    "/review",
    "/referencia",
    "/telefono",
    "/perfil",
    "/examen",
    "/actualizar",
  ];
  for (const href of routes) {
    test(href, async ({ page }) => {
      await page.goto(href);
      await expect(page.locator("body")).toBeVisible();
      await expect(page.locator("body")).not.toContainText("Application error");
    });
  }
});
