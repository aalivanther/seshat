// DEMO ESTÁTICA DE SESHAT PARA EL PORTAFOLIO.
//
// La app de verdad es un binario Go que sirve esta web y guarda el progreso
// (backend/). El portafolio solo puede publicar archivos estáticos bajo una
// subruta (/seshat/), sin servidor. Este script arma una copia temporal de
// web/ (`.demo/`), le cambia las piezas que dependen del binario por las de
// web/demo/ —sobre todo lib/api.ts, que pasa a hablar con un motor que corre
// en el navegador y guarda en localStorage— y la compila con su propio
// next.config.ts. El next.config.ts de la app no se toca: la app de
// escritorio sigue compilando exactamente igual.
//
// Uso:   npm run build:demo
// Vars:  DEMO_BASE_PATH  subruta donde se publica (por defecto /seshat)
//        DEMO_OUT_DIR    carpeta de salida (por defecto ../../demos/seshat,
//                        es decir Akyrion/demos/seshat); nunca dentro de Seshat/

import { cp, mkdir, readFile, readdir, rm, stat, symlink, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { homedir } from "node:os";

const web = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const seshatRoot = resolve(web, "..");
const stage = join(web, ".demo");
const basePath = process.env.DEMO_BASE_PATH ?? "/seshat";
const outDir = resolve(process.env.DEMO_OUT_DIR ?? join(seshatRoot, "..", "demos", "seshat"));

/** Lo que la compilación necesita de web/. Los tests (lib/__tests__) se
 *  quedan fuera: la copia no los corre, y next build los revisaría de tipos
 *  sin ganar nada. */
const COPY = ["app", "components", "lib", "data", "public", "package.json", "tsconfig.json", "next-env.d.ts"];
/** Lo que se sustituye: cada archivo de web/demo/ pisa el de la misma ruta. */
const OVERLAY = join(web, "demo");

function fail(message) {
  throw new Error(`build-demo: ${message}`);
}

function isInside(child, parent) {
  const rel = relative(parent, child);
  return rel === "" || (!rel.startsWith("..") && !rel.startsWith(sep) && rel !== "..");
}

if (basePath !== "" && !/^\/[a-zA-Z0-9/_-]+[a-zA-Z0-9_-]$/.test(basePath)) {
  fail(`DEMO_BASE_PATH debe ser una ruta absoluta sin barra final (p. ej. /seshat); llegó «${basePath}»`);
}
if (isInside(outDir, seshatRoot)) {
  fail(`la salida (${outDir}) no puede quedar dentro de Seshat/: el export de la demo no es parte del proyecto`);
}

/** Cambia un texto exacto de la copia y falla si no lo encuentra: si alguien
 *  reescribe la pantalla original, la demo no debe compilar con la versión
 *  vieja del parche sin que nadie se entere. */
async function edit(file, replacements) {
  const path = join(stage, file);
  let text = await readFile(path, "utf8");
  for (const [from, to, expected] of replacements) {
    const count = typeof from === "string" ? text.split(from).length - 1 : (text.match(from) ?? []).length;
    if (count !== expected) fail(`${file}: esperaba ${expected} aparición(es) de ${from}, hay ${count}`);
    text = typeof from === "string" ? text.split(from).join(to) : text.replace(from, to);
  }
  await writeFile(path, text);
}

async function listFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await listFiles(full)));
    else out.push(full);
  }
  return out;
}

function run(command, args, cwd, env) {
  const result = spawnSync(command, args, { cwd, env, stdio: "inherit" });
  if (result.error) fail(`no se pudo lanzar ${command}: ${result.error.message}`);
  if (result.status !== 0) fail(`${[command, ...args].join(" ")} terminó con código ${result.status}`);
}

async function main() {
  const pkg = JSON.parse(await readFile(join(web, "package.json"), "utf8"));
  // Entorno mínimo y explícito: nada de la sesión de quien compila (tokens,
  // rutas, variables NEXT_PUBLIC_ sueltas) puede acabar horneado en el bundle.
  const env = Object.fromEntries(
    Object.entries(process.env).filter(([key]) => ["PATH", "HOME", "TMPDIR", "SYSTEMROOT", "LANG"].includes(key)),
  );
  env.NEXT_TELEMETRY_DISABLED = "1";
  env.NEXT_PUBLIC_SESHAT_DEMO_VERSION = `${pkg.version}-demo`;

  // la misma puerta que el build normal (prebuild): contenido inválido no se publica
  run(process.execPath, [join(web, "scripts", "validate-content.mjs")], web, env);

  await rm(stage, { recursive: true, force: true });
  await mkdir(stage);
  for (const name of COPY) {
    await cp(join(web, name), join(stage, name), {
      recursive: true,
      filter: (src) => !src.includes(`${sep}lib${sep}__tests__`),
    });
  }
  // el registro de alias lo carga la migración de respaldos antiguos
  await mkdir(join(stage, "scripts"));
  await cp(join(web, "scripts", "vocab-aliases.json"), join(stage, "scripts", "vocab-aliases.json"));
  await cp(OVERLAY, stage, { recursive: true });
  await symlink(join(web, "node_modules"), join(stage, "node_modules"), "dir");

  // <a> a pelo no recibe el basePath (Link sí): sin esto el enlace llevaría
  // a la raíz del portafolio en vez de al perfil de la demo
  await edit("components/ProfilePicker.tsx", [
    ['<a href="/perfil"', `<a href="${basePath}/perfil/"`, 1],
  ]);
  // las copias de seguridad no van a una carpeta del ordenador, sino al
  // almacenamiento del navegador: la pantalla tiene que decir dónde están
  await edit("app/perfil/page.tsx", [
    ["Tu expedición vive en esta máquina.", "En esta demo, tu expedición vive en este navegador.", 1],
    [/en tu(\s+)carpeta de datos/g, "en el$1almacenamiento de este navegador", 4],
    ["(un archivo que acaba en", "(una entrada que acaba en", 2],
  ]);

  await writeFile(
    join(stage, "next.config.ts"),
    [
      'import type { NextConfig } from "next";',
      "",
      "// Config de la demo estática (la genera scripts/build-demo.mjs).",
      "const nextConfig: NextConfig = {",
      '  output: "export",',
      "  trailingSlash: true,",
      `  basePath: ${JSON.stringify(basePath)},`,
      "  images: { unoptimized: true },",
      `  turbopack: { root: ${JSON.stringify(web)} },`,
      "};",
      "",
      "export default nextConfig;",
      "",
    ].join("\n"),
  );

  run(process.execPath, [join(web, "node_modules", "next", "dist", "bin", "next"), "build"], stage, env);

  const exported = join(stage, "out");
  if (!(await stat(exported).catch(() => null))?.isDirectory()) fail("next build no dejó la carpeta out/");

  // Nada del ordenador de quien compila puede viajar en la demo pública.
  const leaks = [homedir(), seshatRoot].filter((p) => p.length > 1);
  for (const file of await listFiles(exported)) {
    if (!/\.(html|js|txt|json|css|map)$/.test(file)) continue;
    const text = await readFile(file, "utf8");
    const hit = leaks.find((p) => text.includes(p));
    if (hit) fail(`${relative(exported, file)} contiene una ruta local (${hit})`);
  }

  await rm(outDir, { recursive: true, force: true });
  await mkdir(dirname(outDir), { recursive: true });
  await cp(exported, outDir, { recursive: true });
  // GitHub Pages ignora las carpetas que empiezan por _ (como _next) sin esto
  await writeFile(join(outDir, ".nojekyll"), "");
  console.log(`Demo de Seshat exportada en ${outDir} (subruta: ${basePath || "/"})`);
}

try {
  await main();
} finally {
  // la copia temporal no se queda nunca dentro de Seshat/, salga bien o mal
  await rm(stage, { recursive: true, force: true });
}
