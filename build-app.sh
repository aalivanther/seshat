#!/bin/bash
# Empaqueta Seshat como binario único por plataforma (decisión D1):
# export estático de Next embebido + API en el mismo origen y puerto.
# Uso: ./build-app.sh <versión> <drop>   (p. ej. ./build-app.sh 1.3.3 5)
#      Los DOS argumentos son obligatorios: sin el drop no se sabe qué
#      contenido entra en el binario, y el script aborta.
set -euo pipefail
cd "$(dirname "$0")"

VERSION="${1:?uso: ./build-app.sh <versión> <drop> — ej. ./build-app.sh 1.1.0 2}"
DROP_ARG="${2:?falta el DROP o manifiesto explícito (U4): ./build-app.sh <versión> <drop|manifiesto>}"
# PLAN-COMPOSICION.md §8.1: el segundo argumento acepta lo de siempre — un
# número de drop — o el id de un manifiesto (web/manifests/<id>.json,
# PLAN-COMPOSICION.md FASE 2). `gen-course.mjs` ya distingue los dos casos; el
# DROP numérico real (el que ve el alumno) se lee más abajo de `BUILT_DROP` en
# el `course.gen.ts` recién generado — es la fuente única sea cual sea el
# argumento, incluso para un drop que no trajo contenido nuevo.
if [[ "$DROP_ARG" =~ ^[0-9]+$ ]]; then
  MANIFEST_ID=""
else
  MANIFEST_ID="$DROP_ARG"
fi
echo "→ Seshat $VERSION ($([ -n "$MANIFEST_ID" ] && echo "manifiesto \"$MANIFEST_ID\"" || echo "drop de contenido $DROP_ARG"))"

# ── PUERTA DE CALIDAD (G2 del auditor frío) ──────────────────────────────────
# Hasta la v1.3.1 este script no corría NI UN test: solo el validador de
# contenido, y de rebote (npm run build → prebuild). Una suite roja se
# empaquetaba y se enviaba a clientes de pago. Ahora NADA se compila hasta que
# la web y el backend pasan sus pruebas. `set -e` ya abortaría, pero el mensaje
# explícito importa: quien lance el build tiene que saber POR QUÉ se paró.
abort() {
  echo ""
  echo "✗ BUILD ABORTADO — $1"
  echo "  No se empaqueta nada: arréglalo y vuelve a lanzar ./build-app.sh $VERSION $DROP_ARG"
  exit 1
}

# ORDEN IMPORTANTE: el curso del drop se genera ANTES de los tests. Nueve de los
# diecisiete ficheros de test importan `course.gen.ts`, así que empaquetar el
# drop 1 corría los tests contra el curso del drop 5 — y `langLeaks.test.ts`, que
# es el guardián de que no se filtre contenido sin liberar, nunca veía el curso
# real del artefacto que se estaba construyendo.
echo "→ Generando el curso de \"$DROP_ARG\" (antes de los tests: son sobre ESTE contenido)..."
(cd web && node scripts/gen-course.mjs "$DROP_ARG") || abort "no se pudo generar el curso de \"$DROP_ARG\"."
# El índice ligero y el vocabulario troceado que lee el cliente salen de ESE
# curso: se derivan antes de los tests, que también los leen.
(cd web && node scripts/gen-derived.mjs) || abort "no se pudieron derivar los módulos ligeros del curso de \"$DROP_ARG\"."

# El DROP numérico que ve el alumno sale de `BUILT_DROP` en el generado —
# válido tanto si el argumento fue un número como un id de manifiesto.
DROP=$(grep -o 'BUILT_DROP = [0-9]*' web/data/course.gen.ts | grep -o '[0-9]*$') || true
if [ -z "$DROP" ]; then abort "no pude leer BUILT_DROP de data/course.gen.ts recién generado."; fi

echo "→ Tests de la web (vitest)..."
(cd web && npx --no-install vitest run) || abort "la suite de vitest está en ROJO."

echo "→ go vet del backend..."
(cd backend && go vet ./...) || abort "go vet ha encontrado problemas en backend/."

echo "→ Tests del backend (go test)..."
(cd backend && go test -count=1 ./...) || abort "la suite de Go está en ROJO."

echo "→ Build de producción (hermético — el curso del drop $DROP ya se generó arriba)..."
# build HERMÉTICO: sin cachés de builds de otros drops (la fuga U1 reapareció
# una vez por caché incremental — nunca más)
(cd web && rm -rf out .next && npm run build)

echo "→ Embebiendo UI en el binario..."
rm -rf backend/webdist
mkdir -p backend/webdist
cp -R web/out/. backend/webdist/
# Los .txt son el payload RSC de Next para navegar sin recargar el documento.
# En la app local el HTML ya está en disco: un clic recarga la página y es
# instantáneo. Quitarlos recorta ~60 MB del binario (de ~103 a ~40).
echo "   recortando payloads RSC (.txt)..."
find backend/webdist -name '*.txt' -delete
# PLACEHOLDER no debe faltar si el find vaciara el dir (no lo hace: hay HTML)
if [ ! -f backend/webdist/index.html ]; then abort "webdist sin index.html tras el recorte"; fi
echo "   webdist: $(du -sh backend/webdist | awk '{print $1}')"

mkdir -p dist
echo "→ Iconos de la app (marca propia: la estrella de Seshat)..."
python3 installer/make-icons.py

echo "→ Compilando macOS (Apple Silicon)..."
# -trimpath: el binario no guarda rutas de la máquina donde se compiló (se publica como Release).
(cd backend && GOOS=darwin GOARCH=arm64 go build -trimpath -ldflags "-s -w -X main.version=$VERSION -X main.contentVersion=$DROP -X main.manifest=$MANIFEST_ID" -o "../dist/seshat-$VERSION-mac-arm64" .)

# ── SMOKE DEL BINARIO PRODUCIDO (G2) ─────────────────────────────────────────
# Que compile no es que funcione. Un go:embed sin UI, un puerto que no liga o
# una versión mal inyectada en los ldflags solo se ven EJECUTANDO justo lo que
# se va a enviar. Se arranca con un --data-dir de usar y tirar (jamás el perfil
# real de nadie) y sin abrir navegador, se comprueba /api/health, /api/version
# —que la versión sea la que se está empaquetando— y se cierra por /api/quit.
SMOKE_DIR=""
SMOKE_PID=""
smoke_cleanup() {
  if [ -n "$SMOKE_PID" ]; then
    kill "$SMOKE_PID" 2>/dev/null || true
    wait "$SMOKE_PID" 2>/dev/null || true
    SMOKE_PID=""
  fi
  if [ -n "$SMOKE_DIR" ]; then
    rm -rf "$SMOKE_DIR"
    SMOKE_DIR=""
  fi
}
# el temporal se borra pase lo que pase: abortos, Ctrl-C o final feliz
trap smoke_cleanup EXIT INT TERM
smoke_fail() {
  echo ""
  echo "   últimas líneas del binario:"
  [ -n "$SMOKE_DIR" ] && [ -f "$SMOKE_DIR/smoke.log" ] && tail -20 "$SMOKE_DIR/smoke.log" | sed "s/^/     /" || true
  abort "el binario recién compilado no pasa el smoke: $1"
}

MAC_SMOKE_RAN="no"
if [ "$(uname -s)" != "Darwin" ] || [ "$(uname -m)" != "arm64" ]; then
  echo ""
  echo "⚠⚠⚠ SMOKE DEL BINARIO MAC OMITIDO ⚠⚠⚠"
  echo "  Este equipo ($(uname -s)/$(uname -m)) no puede ejecutar el binario mac-arm64,"
  echo "  así que NADIE ha comprobado que arranque, sirva la UI o se apague."
  echo "  El paquete que va a salir de este build NO está verificado en vivo."
  echo "  Compílalo y publícalo desde un Mac Apple Silicon para tener el smoke real."
  echo ""
else
  echo "→ Smoke del binario producido (arranca, responde y se cierra)..."
  SMOKE_DIR="$(mktemp -d "${TMPDIR:-/tmp}/seshat-smoke.XXXXXX")"
  mkdir -p "$SMOKE_DIR/profiles"
  SESHAT_NO_BROWSER=1 PORT=8899 "dist/seshat-$VERSION-mac-arm64" --data-dir "$SMOKE_DIR/profiles" \
    >"$SMOKE_DIR/smoke.log" 2>&1 &
  SMOKE_PID=$!

  # el puerto REAL lo escribe el propio binario en su lockfile ("<pid> <puerto>"):
  # con fallback de puertos, adivinarlo desde fuera sería mentirle al smoke
  SMOKE_PORT=""
  for _ in $(seq 1 100); do
    if [ -f "$SMOKE_DIR/profiles/.lock" ]; then
      SMOKE_PORT="$(awk '{print $2}' "$SMOKE_DIR/profiles/.lock" 2>/dev/null || true)"
      if [ -n "$SMOKE_PORT" ]; then break; fi
    fi
    sleep 0.2
  done
  [ -n "$SMOKE_PORT" ] || smoke_fail "no ligó ningún puerto en 20 s (¿murió al arrancar?)"

  BASE="http://127.0.0.1:$SMOKE_PORT"
  HEALTH="$(curl -sf --max-time 5 "$BASE/api/health" || true)"
  case "$HEALTH" in
    *'"ok":true'*) ;;
    *) smoke_fail "/api/health respondió «$HEALTH»" ;;
  esac

  VER_JSON="$(curl -sf --max-time 5 "$BASE/api/version" || true)"
  case "$VER_JSON" in
    *"\"app\":\"$VERSION\""*) ;;
    *) smoke_fail "/api/version dice «$VER_JSON» y estamos empaquetando la $VERSION — los ldflags no llegaron al binario" ;;
  esac
  case "$VER_JSON" in
    *"\"content\":\"$DROP\""*) ;;
    *) smoke_fail "/api/version no reporta el drop $DROP: «$VER_JSON»" ;;
  esac
  # T6 (PLAN-COMPOSICION.md §9.3): si se pidió un manifiesto, el binario tiene
  # que saber cuál — sin esto, un build "solo-ingles" y el completo serían
  # indistinguibles desde fuera aunque llevaran contenido distinto.
  if [ -n "$MANIFEST_ID" ]; then
    case "$VER_JSON" in
      *"\"manifest\":\"$MANIFEST_ID\""*) ;;
      *) smoke_fail "/api/version no reporta el manifiesto \"$MANIFEST_ID\": «$VER_JSON»" ;;
    esac
  fi

  # la UI embebida: si webdist viajó vacío, el binario sirve 404 y nadie se entera
  UI_CODE="$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "$BASE/" || true)"
  [ "$UI_CODE" = "200" ] || smoke_fail "la UI embebida devuelve HTTP $UI_CODE en / (¿go:embed sin web/out?)"

  QUIT="$(curl -sf --max-time 5 -X POST "$BASE/api/quit" || true)"
  case "$QUIT" in
    *'"bye":true'*) ;;
    *) smoke_fail "/api/quit respondió «$QUIT» — la app no se podría cerrar desde su propia interfaz" ;;
  esac

  # cerrarse de verdad es parte del contrato: se comprueba que deje de responder
  STOPPED=""
  for _ in $(seq 1 50); do
    if ! curl -sf --max-time 2 "$BASE/api/health" >/dev/null 2>&1; then STOPPED="1"; break; fi
    sleep 0.2
  done
  [ -n "$STOPPED" ] || smoke_fail "sigue respondiendo 10 s después de /api/quit (no se apaga)"

  echo "   OK — puerto $SMOKE_PORT · versión $VERSION · drop $DROP · UI servida · apagado limpio"
  smoke_cleanup
  MAC_SMOKE_RAN="yes"
fi

# ── APP BUNDLE de macOS ──────────────────────────────────────────────────────
# Un ejecutable suelto abre la TERMINAL al hacer doble clic y obliga a dejarla
# abierta: eso no es una app, es un proceso. Empaquetado en .app, macOS lo
# arranca sin consola, con su icono y su nombre — y el propio binario abre el
# navegador y puede cerrarse desde la interfaz (Salir).
APP="dist/Seshat.app"
rm -rf "$APP"
mkdir -p "$APP/Contents/MacOS" "$APP/Contents/Resources"
# El ejecutable del bundle NO es el servidor: es un lanzador que arranca y
# TERMINA. Es deliberado. Si el binario largo fuera el ejecutable del .app,
# LaunchServices lo consideraría "ya abierto" y el segundo doble clic no haría
# NADA — que es justo lo que le pasa al usuario que cierra la pestaña y quiere
# volver (auditoría de empaquetado, hallazgo 1). Con un lanzador que sale al
# instante, cada doble clic vuelve a ejecutarse: si el servidor ya vive, solo
# abre la pestaña; si no, lo levanta.
cp "dist/seshat-$VERSION-mac-arm64" "$APP/Contents/MacOS/seshat-server"
chmod +x "$APP/Contents/MacOS/seshat-server"
cat > "$APP/Contents/MacOS/Seshat" <<'LAUNCHER'
#!/bin/bash
# Lanzador de Seshat: abre la app y se aparta.
HERE="$(cd "$(dirname "$0")" && pwd)"
LOCK="$HOME/Library/Application Support/Seshat/profiles/.lock"

# ¿ya está viva? El lockfile guarda "<pid> <puerto>"
if [ -f "$LOCK" ]; then
  PID=$(awk '{print $1}' "$LOCK" 2>/dev/null)
  PORT=$(awk '{print $2}' "$LOCK" 2>/dev/null)
  if [ -n "$PID" ] && kill -0 "$PID" 2>/dev/null; then
    open "http://localhost:${PORT:-8787}"
    exit 0
  fi
fi

# no está viva: levantarla en segundo plano y salir
nohup "$HERE/seshat-server" >/dev/null 2>&1 &
exit 0
LAUNCHER
chmod +x "$APP/Contents/MacOS/Seshat"
cp installer/icons/seshat.icns "$APP/Contents/Resources/seshat.icns"
cat > "$APP/Contents/Info.plist" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleName</key><string>Seshat</string>
  <key>CFBundleDisplayName</key><string>Seshat</string>
  <key>CFBundleIdentifier</key><string>com.seshat.app</string>
  <key>CFBundleVersion</key><string>$VERSION</string>
  <key>CFBundleShortVersionString</key><string>$VERSION</string>
  <key>CFBundleExecutable</key><string>Seshat</string>
  <key>CFBundleIconFile</key><string>seshat</string>
  <key>CFBundlePackageType</key><string>APPL</string>
  <key>LSMinimumSystemVersion</key><string>11.0</string>
  <!-- sin icono en el Dock: la app vive en la pestaña del navegador, como las
       herramientas locales que abren su panel (el cierre está DENTRO de la app) -->
  <key>LSUIElement</key><true/>
  <key>NSHighResolutionCapable</key><true/>
</dict>
</plist>
PLIST
# zip para distribuir (un .app suelto pierde permisos al comprimirse mal)
(cd dist && rm -f "Seshat-$VERSION-mac.zip" && ditto -c -k --keepParent Seshat.app "Seshat-$VERSION-mac.zip")
echo "   dist/Seshat.app + Seshat-$VERSION-mac.zip"


# Recursos del .exe de Windows: icono + VERSIONINFO. Un ejecutable de 45 MB
# sin firma, sin icono y sin metadatos es el retrato robot de un troyano para
# SmartScreen y Defender — y en el Administrador de tareas aparecería como un
# "seshat.exe" anónimo, justo donde el usuario va a buscarlo. go-winres es una
# herramienta Go pura: se descarga sola y no instala nada en el sistema.
# El sufijo _windows_amd64 es OBLIGATORIO: así el build de macOS lo ignora.
echo "→ Recursos del ejecutable Windows (icono + metadatos)..."
if go run github.com/tc-hib/go-winres@latest simply \
    --icon installer/windows/seshat.ico \
    --product-name "Seshat" \
    --file-description "Seshat — cursos de idiomas" \
    --product-version "$VERSION" \
    --file-version "$VERSION" \
    --out backend/rsrc 2>/dev/null; then
  # go-winres nombra rsrc_windows_amd64.syso / _386: nos quedamos con el de 64
  rm -f backend/rsrc_windows_386.syso
  echo "   icono y metadatos embebidos"
else
  echo "   ⚠ sin recursos (¿sin red?): el .exe saldrá sin icono — no bloquea el build"
fi

echo "→ Compilando Windows 11 x64..."
# -trimpath: igual que en macOS, sin rutas locales dentro del ejecutable.
(cd backend && GOOS=windows GOARCH=amd64 go build -trimpath -ldflags "-s -w -X main.version=$VERSION -X main.contentVersion=$DROP -X main.manifest=$MANIFEST_ID -H=windowsgui" -o "../dist/seshat-$VERSION-win-x64.exe" .)

# ── SMOKE ESTÁTICO DEL .EXE (N7) ─────────────────────────────────────────────
# Sin Windows ni wine a mano, EJECUTARLO no es posible aquí — así que esto NO
# es un smoke real y no pretende serlo (no hay /api/health, no hay apagado
# comprobado). Es la verificación más barata que SÍ es posible sin esas dos
# cosas: que el build no haya escupido basura silenciosa (cero bytes, un
# fichero de texto de error de Go en vez de un binario). Coger esto por un
# smoke sería el mismo fix fantasma que ya se cazó una vez en este documento.
WIN_EXE="dist/seshat-$VERSION-win-x64.exe"
echo "→ Verificación estática del .exe de Windows (NO es un smoke — nadie lo ha ejecutado)..."
WIN_MAGIC="$(dd if="$WIN_EXE" bs=1 count=2 2>/dev/null)"
[ "$WIN_MAGIC" = "MZ" ] || abort "el .exe de Windows no empieza por la cabecera MZ/PE — el build produjo basura, no un ejecutable"
WIN_SIZE="$(wc -c < "$WIN_EXE" | tr -d ' ')"
[ "$WIN_SIZE" -gt 1000000 ] || abort "el .exe de Windows pesa solo $WIN_SIZE bytes — demasiado poco para ser el binario real"
echo "   OK (estático) — cabecera MZ, $((WIN_SIZE / 1000000)) MB. Sigue sin arrancarse en ningún sitio (N7 viva)."

# ── Instalador de macOS (.dmg) ───────────────────────────────────────────────
# Un .zip está bien para actualizar, pero para instalar por primera vez la gente
# espera un disco con la app y la carpeta Aplicaciones al lado: arrastras y ya.
# Se arma con hdiutil, que viene con el sistema — cero dependencias.
echo "→ Instalador de macOS (.dmg)..."
DMG_STAGE="dist/dmg-stage"
rm -rf "$DMG_STAGE" "dist/Seshat-$VERSION.dmg"
mkdir -p "$DMG_STAGE"
cp -R dist/Seshat.app "$DMG_STAGE/"
ln -s /Applications "$DMG_STAGE/Aplicaciones"
cat > "$DMG_STAGE/LEEME.txt" <<DMGREADME
Seshat $VERSION

INSTALAR
  Arrastra Seshat a la carpeta «Aplicaciones» que tienes al lado.

PRIMERA VEZ QUE LA ABRES
  Como la aplicación va sin firma de Apple, macOS pedirá permiso: ábrela, deja
  que salga el aviso y luego ve a Ajustes del Sistema → Privacidad y seguridad
  → «Abrir de todos modos». Solo hay que hacerlo una vez.

QUÉ ES
  Seshat no tiene ventana propia: abre tu navegador y el motor corre por detrás.
  Para cerrarla del todo, usa el botón «Salir» dentro de la app. Tu progreso
  vive en tu carpeta de usuario: puedes mover o borrar la app sin perder nada.

ACTUALIZAR
  Los drops llegan como un archivo .seshatpack y se instalan desde
  Perfil → Actualizar, sin reinstalar la aplicación.
DMGREADME
hdiutil create -quiet -volname "Seshat $VERSION" -srcfolder "$DMG_STAGE" \
  -ov -format UDZO "dist/Seshat-$VERSION.dmg" || abort "no se pudo crear el .dmg"
rm -rf "$DMG_STAGE"
echo "   dist/Seshat-$VERSION.dmg (arrastrar a Aplicaciones)"

# ── Paquete portable de Windows (N16) ────────────────────────────────────────
# El instalador .iss solo se puede compilar en una máquina Windows con Inno
# Setup, y aquí no hay ninguna. Eso NO puede dejar a Windows sin producto: se
# arma un .zip portable —exe + icono + instrucciones— que se descomprime y
# funciona. El instalador sigue existiendo para quien quiera menú de inicio y
# desinstalador, pero ya no es la única forma de entregar Windows.
echo "→ Paquete portable de Windows..."
WINDIR="dist/Seshat-$VERSION-win-x64"
rm -rf "$WINDIR" "dist/Seshat-$VERSION-win-x64.zip"
mkdir -p "$WINDIR"
cp "dist/seshat-$VERSION-win-x64.exe" "$WINDIR/Seshat.exe"
cp installer/icons/seshat.ico "$WINDIR/seshat.ico"
cat > "$WINDIR/LEEME.txt" <<WINREADME
Seshat $VERSION — versión portable para Windows 11 (64 bits)

CÓMO SE USA — dos maneras
A) INSTALAR (recomendado): clic derecho en «Instalar Seshat.ps1» → «Ejecutar
   con PowerShell». Copia la app a tu carpeta de usuario, crea los accesos
   directos del menú de inicio y del escritorio, y la registra en «Agregar o
   quitar programas». No pide permisos de administrador.
B) PORTABLE: descomprime esta carpeta donde quieras y doble clic en Seshat.exe.
3. La primera vez Windows enseñará SmartScreen: "Más información" >
   "Ejecutar de todas formas". Pasa porque la app va sin firma de código,
   no porque haya nada raro dentro.

QUÉ TIENES QUE SABER
- Seshat no tiene ventana propia: vive en tu navegador y el motor corre por
  detrás. Para cerrarla del todo, usa el botón "Salir" de la propia app.
- Si no la tocas durante una hora, se apaga sola.
- Tu progreso NO está en esta carpeta: vive en tu carpeta de usuario, así que
  puedes borrar o mover esto sin perder nada.
- Para estudiar desde el móvil: "En tu teléfono" y escanea el QR (misma wifi).
  El enlace del código lleva la llave de tu Seshat; sin escanearlo, nadie de
  tu red puede abrir tu progreso.

Comprobar que el archivo llegó íntegro (PowerShell):
  certutil -hashfile Seshat.exe SHA256
y compara con el SHA-256 publicado en el post del drop.
WINREADME
# Instalador para Windows SIN compilar nada: un script de PowerShell que copia
# la app a la carpeta del usuario, crea los accesos directos y se registra en
# «Agregar o quitar programas». El .iss de Inno sigue existiendo para quien
# tenga un Windows a mano, pero ya no es la única vía digna: hasta hoy, lo que
# se entregaba era el .exe del PROGRAMA (que se ejecuta tal cual), no un
# instalador.
cat > "$WINDIR/Instalar Seshat.ps1" <<'WINPS'
# Instalador de Seshat para Windows 11 (64 bits).
# Uso: clic derecho en este archivo → «Ejecutar con PowerShell».
# No pide permisos de administrador: instala solo para tu usuario.

$ErrorActionPreference = "Stop"
$origen  = Split-Path -Parent $MyInvocation.MyCommand.Path
$destino = Join-Path $env:LOCALAPPDATA "Seshat"

Write-Host ""
Write-Host "  Instalando Seshat en $destino" -ForegroundColor Cyan

if (Test-Path (Join-Path $destino "Seshat.exe")) {
  Get-Process -Name "Seshat","seshat" -ErrorAction SilentlyContinue | Stop-Process -Force
  Start-Sleep -Milliseconds 500
}
New-Item -ItemType Directory -Force -Path $destino | Out-Null
Copy-Item (Join-Path $origen "Seshat.exe") $destino -Force
Copy-Item (Join-Path $origen "seshat.ico") $destino -Force -ErrorAction SilentlyContinue

$shell = New-Object -ComObject WScript.Shell
$menu  = Join-Path $env:APPDATA "Microsoft\Windows\Start Menu\Programs\Seshat.lnk"
$esc   = Join-Path ([Environment]::GetFolderPath("Desktop")) "Seshat.lnk"
foreach ($sitio in @($menu, $esc)) {
  $lnk = $shell.CreateShortcut($sitio)
  $lnk.TargetPath       = Join-Path $destino "Seshat.exe"
  $lnk.WorkingDirectory = $destino
  $lnk.IconLocation     = Join-Path $destino "seshat.ico"
  $lnk.Description      = "Seshat - cursos de idiomas"
  $lnk.Save()
}

$desinstalador = Join-Path $destino "Desinstalar.ps1"
@'
$destino = Join-Path $env:LOCALAPPDATA "Seshat"
Get-Process -Name "Seshat","seshat" -ErrorAction SilentlyContinue | Stop-Process -Force
Remove-Item (Join-Path $env:APPDATA "Microsoft\Windows\Start Menu\Programs\Seshat.lnk") -ErrorAction SilentlyContinue
Remove-Item (Join-Path ([Environment]::GetFolderPath("Desktop")) "Seshat.lnk") -ErrorAction SilentlyContinue
Remove-Item "HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\Seshat" -Recurse -ErrorAction SilentlyContinue
Write-Host ""
Write-Host "  Seshat desinstalada. TU PROGRESO NO SE HA BORRADO:" -ForegroundColor Yellow
Write-Host "  sigue en $env:APPDATA\Seshat por si vuelves."
Remove-Item $destino -Recurse -Force -ErrorAction SilentlyContinue
'@ | Set-Content -Encoding UTF8 $desinstalador

$clave = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\Seshat"
New-Item -Path $clave -Force | Out-Null
Set-ItemProperty $clave DisplayName     "Seshat"
Set-ItemProperty $clave DisplayVersion  "__VERSION__"
Set-ItemProperty $clave Publisher       "Seshat"
Set-ItemProperty $clave DisplayIcon     (Join-Path $destino "seshat.ico")
Set-ItemProperty $clave InstallLocation $destino
Set-ItemProperty $clave NoModify 1
Set-ItemProperty $clave NoRepair 1
Set-ItemProperty $clave UninstallString ("powershell -ExecutionPolicy Bypass -File `"" + $desinstalador + "`"")

Write-Host ""
Write-Host "  Listo. Seshat esta en tu menu de inicio y en el escritorio." -ForegroundColor Green
Write-Host "  La primera vez Windows ensenara SmartScreen: mas informacion -> ejecutar de todas formas."
Write-Host "  Tu progreso se guarda en $env:APPDATA\Seshat y no se toca al actualizar ni al desinstalar."
Write-Host ""
Read-Host "  Pulsa Enter para cerrar"
WINPS
# la versión se inyecta para que «Agregar o quitar programas» no mienta
python3 - "$WINDIR/Instalar Seshat.ps1" "$VERSION" <<'PYV'
import sys
p, v = sys.argv[1], sys.argv[2]
s = open(p, encoding="utf-8").read().replace("__VERSION__", v)
open(p, "w", encoding="utf-8").write(s)
PYV
(cd dist && zip -qr "Seshat-$VERSION-win-x64.zip" "Seshat-$VERSION-win-x64")

echo "→ Verificando el contenido del zip portable de Windows..."
WINZIP_LIST="$(unzip -l "dist/Seshat-$VERSION-win-x64.zip")"
for f in "Seshat.exe" "seshat.ico" "LEEME.txt" "Instalar Seshat.ps1"; do
  case "$WINZIP_LIST" in
    *"$f"*) ;;
    *) abort "el zip portable de Windows no contiene $f" ;;
  esac
done
echo "   OK — el zip trae exe + icono + LEEME + instalador de PowerShell"

rm -rf "$WINDIR"
echo "   dist/Seshat-$VERSION-win-x64.zip (portable, sin instalador)"

# el placeholder vuelve para que el árbol de dev quede limpio y compilable
rm -rf backend/webdist
mkdir -p backend/webdist
printf "placeholder para go:embed — build-app.sh lo reemplaza con web/out\n" > backend/webdist/PLACEHOLDER.txt
# y el curso de dev vuelve al drop máximo
(cd web && node scripts/gen-course.mjs)

echo ""
ls -lh dist/ | tail -3
echo ""
echo "Listo. El binario sirve UI+API en un solo puerto (8787, con fallback)."
echo ""
if [ "$MAC_SMOKE_RAN" = "yes" ]; then
  echo "Smoke mac-arm64: EJECUTADO Y VERDE (arrancó, sirvió la UI, se apagó limpio)."
else
  echo "Smoke mac-arm64: NO SE EJECUTÓ EN ESTE BUILD — el binario mac sale sin probar en vivo."
fi
echo "Smoke win-x64: NUNCA se ejecuta (solo verificación estática de cabecera+peso+zip)."
echo "El .exe de Windows sigue sin arrancarse ni una vez en todo el pipeline (N7)."
echo ""
echo "Distribución SIN firmas (decisión 2026-08-09) — primera apertura:"
echo "  macOS (Sequoia): intenta abrirlo (fallará con aviso) y luego"
echo "           Ajustes > Privacidad y seguridad > 'Abrir de todos modos'."
echo "           Terminal (salta el aviso): xattr -d com.apple.quarantine <binario>"
echo "  Windows: SmartScreen > Más información > Ejecutar de todas formas."
echo "Incluye estas instrucciones en cada post de drop de Patreon."
echo ""
echo "Windows se entrega YA con dist/Seshat-$VERSION-win-x64.zip (portable)."
echo "El instalador es opcional (menú de inicio + desinstalador) y necesita una"
echo "máquina Windows: compilar installer/windows/seshat.iss con Inno Setup 6.3+"
echo "  iscc seshat.iss /DVersion=$VERSION"
echo "(copiando antes dist/seshat-$VERSION-win-x64.exe junto al .iss)"

# nota de drop lista para pegar en Patreon (con checksums — sin firmas,
# el SHA256 es la única señal de integridad).
#
# OJO: el hash tiene que ser el del ARCHIVO QUE SE DESCARGA. Hasta la v1.3.1 se
# publicaba el del binario suelto mientras se distribuía el .zip, así que nadie
# podía verificar nada: el hash nunca coincidía y la única señal de integridad
# era decorativa. Ahora se publica el del .zip de mac (lo que baja el usuario) y,
# de propina, el del binario que va dentro para quien quiera mirar más adentro.
SHA_MACZIP=$(shasum -a 256 "dist/Seshat-$VERSION-mac.zip" | cut -d" " -f1)
SHA_MAC=$(shasum -a 256 "dist/seshat-$VERSION-mac-arm64" | cut -d" " -f1)
SHA_WIN=$(shasum -a 256 "dist/seshat-$VERSION-win-x64.exe" | cut -d" " -f1)
SHA_WINZIP=$(shasum -a 256 "dist/Seshat-$VERSION-win-x64.zip" | cut -d" " -f1)
cat > "dist/NOTAS-drop$DROP-v$VERSION.md" <<NOTAS
# Seshat v$VERSION — drop de contenido $DROP

**Qué trae:** (rellena aquí el titular del drop)

**Cómo actualizar:** descarga el archivo de tu plataforma y ábrelo — reemplaza
al anterior sin más. Tu progreso vive fuera de la app y se conserva SIEMPRE
(los perfiles no se tocan al actualizar ni al desinstalar).

**Primera apertura (la app va sin firmas):**
- macOS (Sequoia): al abrirlo saldrá un aviso — ve a Ajustes → Privacidad y
  seguridad → «Abrir de todos modos». (Avanzados: xattr -d com.apple.quarantine.)
- Windows: si sale SmartScreen: «Más información» → «Ejecutar de todas formas».

**Verificación (SHA-256) — del archivo que descargas:**
- mac · Seshat-$VERSION-mac.zip: $SHA_MACZIP
- win (portable, recomendado) · Seshat-$VERSION-win-x64.zip: $SHA_WINZIP
- win (solo el ejecutable) · seshat-$VERSION-win-x64.exe: $SHA_WIN

Cómo comprobarlo: en mac \`shasum -a 256 Seshat-$VERSION-mac.zip\`; en Windows
\`certutil -hashfile seshat-$VERSION-win-x64.exe SHA256\`. Si distribuyes el
instalador de Windows, pega también su hash: lo imprime \`certutil\` igual.

(Dentro del .zip, el binario de mac es $SHA_MAC.)

Al abrir tras actualizar, la propia app te anuncia lo nuevo y te lleva ahí.
NOTAS
echo "→ dist/NOTAS-drop$DROP-v$VERSION.md generada (con SHA-256)."
