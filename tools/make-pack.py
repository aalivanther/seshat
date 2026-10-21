#!/usr/bin/env python3
"""Arma el paquete de actualización (.seshatpack) de un drop.

El paquete es un zip con el manifiesto y la interfaz ya exportada. Se instala
desde la propia app (Perfil → Actualizar), sin que nadie tenga que descargar
otra vez los 47 MB del motor ni reinstalar nada.

Uso:
  ./build-app.sh 1.5 6                 # deja web/out con el drop dentro
  python3 tools/make-pack.py 1.5 6 \
      --title "Drop 6 — Alemán B2" \
      --nota "12 módulos de B2" --nota "Simulacro Goethe B2" \
      --requiere 1.4
"""
import argparse, json, os, sys, zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

ap = argparse.ArgumentParser()
ap.add_argument("version")
ap.add_argument("drop", type=int)
ap.add_argument("--title", default="")
ap.add_argument("--nota", action="append", default=[], help="una línea de las notas del parche (repetible)")
ap.add_argument("--requiere", default="", help="versión mínima de la app (p. ej. 1.4)")
ap.add_argument("--web", default=os.path.join(ROOT, "web", "out"))
args = ap.parse_args()

if not os.path.isfile(os.path.join(args.web, "index.html")):
    sys.exit(f"no encuentro la interfaz exportada en {args.web} — corre antes ./build-app.sh {args.version} {args.drop}")

manifest = {
    "version": args.version,
    "drop": args.drop,
    "title": args.title or f"Drop {args.drop}",
    "notes": args.nota,
    "requiresApp": args.requiere,
}

out = os.path.join(ROOT, "dist", f"Seshat-{args.version}-drop{args.drop}.seshatpack")
os.makedirs(os.path.dirname(out), exist_ok=True)
n = 0
# ZIP_DEFLATED y no STORED: el paquete viaja por internet y la UI comprime bien
with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as z:
    z.writestr("manifest.json", json.dumps(manifest, ensure_ascii=False, indent=2))
    for base, _, files in os.walk(args.web):
        for f in files:
            full = os.path.join(base, f)
            rel = os.path.relpath(full, args.web)
            z.write(full, os.path.join("web", rel))
            n += 1

mb = os.path.getsize(out) / 1e6
print(f"{out}\n  {n} archivos · {mb:.1f} MB · requiere app {args.requiere or 'cualquiera'}")
if not args.nota:
    print("  AVISO: sin notas de parche. El alumno verá «todo salió bien» y nada más.")
