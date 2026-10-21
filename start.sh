#!/bin/bash
# Arranca Seshat para uso diario: compila la UI, la embebe y sirve TODO
# (app + progreso) desde el binario Go en UN solo puerto.
# Uso: ./start.sh
set -e
cd "$(dirname "$0")"
ROOT="$(pwd)"

echo "→ Compilando la app (UI + motor en un binario)..."
(cd web && node scripts/gen-course.mjs && rm -rf out && npm run build)
rm -rf backend/webdist && mkdir -p backend/webdist
cp -R web/out/. backend/webdist/

IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || echo "localhost")
echo ""
echo "══════════════════════════════════════════════"
echo "  En esta máquina:  http://localhost:8787"
echo "  En tu red local:  http://$IP:8787  (hace falta el QR)"
echo "  Desde el móvil se entra SOLO por «En tu teléfono» → escanear el QR:"
echo "  el enlace lleva la llave de esta Seshat, así que compartir wifi ya no"
echo "  significa que cualquiera pueda abrir tu progreso."
echo "  (Con \`next dev\` en :3000 la cookie no cruza de puerto: para ese caso"
echo "   arranca con SESHAT_NO_LAN_KEY=1 y NUNCA fuera de tu casa.)"
echo "══════════════════════════════════════════════"
echo ""
# --data-dir explícito: tus perfiles de siempre (el default UserConfigDir
# es para la app empaquetada de clientes)
cd backend && exec go run . --data-dir "$ROOT/backend/profiles"
