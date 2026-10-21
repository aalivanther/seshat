; Instalador de Seshat para Windows 11 x64 (AP5, decisión sin-firmas).
; Compilar en Windows con Inno Setup 6: iscc seshat.iss /DVersion=1.1.0
; Principios (DEUDA-TECNICA AP19/AP12):
;  - per-user (%LOCALAPPDATA%\Programs\Seshat): sin UAC.
;  - el desinstalador JAMÁS toca %APPDATA%\Seshat (el progreso) salvo que el
;    usuario marque la casilla explícita.
;  - anti-downgrade por versión.
;  - ~/.ollama (el modelo, 2GB) nunca se toca; se avisa aparte.

#ifndef Version
  #define Version "0.0.0"
#endif
; GUID propio de Seshat (fijo para siempre: es la identidad del instalador)
#define AppGUID "{7E4A2C10-5E5A-4D8B-9A3B-0C6F2D8E4A11}"

[Setup]
; la llave doble es obligatoria: en Inno "{" abre una constante, y el GUID
; debe llegar literal. ISPP expande {#AppGUID} dentro → {{7E4A...} = literal.
AppId={{#AppGUID}
AppName=Seshat
AppVersion={#Version}
AppPublisher=Seshat
DefaultDirName={localappdata}\Programs\Seshat
DisableProgramGroupPage=yes
PrivilegesRequired=lowest
OutputBaseFilename=Seshat-{#Version}-win-x64-setup
; identidad visual: la estrella de Seshat (installer/icons/seshat.ico)
SetupIconFile=seshat.ico
UninstallDisplayIcon={app}\seshat.ico
WizardStyle=modern
Compression=lzma2
SolidCompression=yes
; x64os: SOLO Windows x64 real — Windows-on-ARM queda fuera (decisión AP22)
ArchitecturesAllowed=x64os
ArchitecturesInstallIn64BitMode=x64os
CloseApplications=yes
; sin esto Inno relanza la app POR SU CUENTA además del [Run] de abajo: dos
; instancias, y la segunda se cerraba en silencio
RestartApplications=no
; anti-downgrade: Inno rechaza instalar sobre una versión mayor
VersionInfoVersion={#Version}

[Files]
Source: "seshat-{#Version}-win-x64.exe"; DestDir: "{app}"; DestName: "seshat.exe"; Flags: ignoreversion
; el .ico se instala junto al exe para que los accesos directos tengan la marca
; (el ejecutable Go no lleva icono embebido — ver DEUDA)
Source: "seshat.ico"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{userdesktop}\Seshat"; Filename: "{app}\seshat.exe"; IconFilename: "{app}\seshat.ico"; Comment: "Abre Seshat en tu navegador"
Name: "{userstartmenu}\Seshat"; Filename: "{app}\seshat.exe"; IconFilename: "{app}\seshat.ico"; Comment: "Abre Seshat en tu navegador"

[Run]
Filename: "{app}\seshat.exe"; Description: "Abrir Seshat ahora"; Flags: nowait postinstall skipifsilent

[UninstallDelete]
; SOLO el directorio de la app — el progreso (%APPDATA%\Seshat) se preserva
Type: filesandordirs; Name: "{app}"

[Code]
{ Anti-downgrade REAL: Inno no lo trae nativo. Leemos la versión instalada del
  registro (clave de desinstalación per-user) y rechazamos instalar una menor. }
function GetInstalledVersion(): String;
begin
  Result := '';
  RegQueryStringValue(HKCU,
    'Software\Microsoft\Windows\CurrentVersion\Uninstall\{#AppGUID}_is1',
    'DisplayVersion', Result);
end;

{ compara versiones a.b.c numéricamente; >0 si A>B, <0 si A<B }
function CompareVersions(A, B: String): Integer;
var
  pa, pb: Integer;
begin
  Result := 0;
  while (Result = 0) and ((A <> '') or (B <> '')) do
  begin
    pa := StrToIntDef(Copy(A, 1, Pos('.', A + '.') - 1), 0);
    pb := StrToIntDef(Copy(B, 1, Pos('.', B + '.') - 1), 0);
    if pa > pb then Result := 1
    else if pa < pb then Result := -1;
    if Pos('.', A) > 0 then A := Copy(A, Pos('.', A) + 1, MaxInt) else A := '';
    if Pos('.', B) > 0 then B := Copy(B, Pos('.', B) + 1, MaxInt) else B := '';
  end;
end;

function InitializeSetup(): Boolean;
var
  installed: String;
begin
  Result := True;
  installed := GetInstalledVersion();
  if (installed <> '') and (CompareVersions('{#Version}', installed) < 0) then
  begin
    MsgBox('Ya tienes Seshat ' + installed + ' instalada, más nueva que esta (' + '{#Version}' + ').' + #13#10 +
           'Instalar una versión anterior no es necesario: tu progreso vive aparte y está a salvo.' + #13#10 +
           'Si de verdad quieres volver atrás, desinstala primero la actual.',
           mbError, MB_OK);
    Result := False;
  end;
end;

procedure CurUninstallStepChanged(CurUninstallStep: TUninstallStep);
var
  DeleteProgress: Boolean;
begin
  if CurUninstallStep = usUninstall then
  begin
    { silencioso = jamás preguntar ni borrar progreso }
    if UninstallSilent then
      Exit;
    { DEFBUTTON2: Enter por inercia = No = conservar perfiles }
    DeleteProgress := MsgBox(
      '¿Borrar también tu PROGRESO de estudio (perfiles y avances)?' + #13#10 +
      'Elige No para conservarlo: una reinstalación futura lo encontrará intacto.' + #13#10#13#10 +
      'Nota: el modelo de IA (~2 GB en %USERPROFILE%\.ollama) no se toca en ningún caso; ' +
      'bórralo a mano si no usas Ollama para nada más.',
      mbConfirmation, MB_YESNO or MB_DEFBUTTON2) = IDYES;
    if DeleteProgress then
      DelTree(ExpandConstant('{userappdata}') + '\Seshat', True, True, True);
  end;
end;
