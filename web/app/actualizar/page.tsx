"use client";

// ACTUALIZAR SESHAT — el drop del mes, sin reinstalar nada.
//
// Antes, cada drop de contenido obligaba a descargar la aplicación entera (47
// MB) y sustituirla a mano. Aquí se carga el paquete del mes (.seshatpack),
// una barra dice por dónde va, y al terminar se lee qué trae. El motor lo
// descomprime junto a tus perfiles, así que tu progreso ni se toca y volver
// atrás es un botón.

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MarkCap } from "@/components/Art";
import { getUpdateState, getVersion, rollbackUpdate, uploadUpdate, type UpdateManifest } from "@/lib/api";
import { getActiveLang } from "@/lib/languages";
import { useConfirm } from "@/lib/useConfirm";
import hub from "@/components/hub.module.css";
import s from "./update.module.css";

type Phase = "idle" | "subiendo" | "instalando" | "listo" | "error";

export default function UpdatePage() {
  const { confirm, dialog } = useConfirm();
  const [app, setApp] = useState<string>("");
  const [engine, setEngine] = useState<string>("");
  const [drop, setDrop] = useState<string>("");
  const [verify, setVerify] = useState<"" | "ok" | "raro">("");
  const [active, setActive] = useState<UpdateManifest | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [pct, setPct] = useState(0);
  const [applied, setApplied] = useState<UpdateManifest | null>(null);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [lang, setLang] = useState("de");

  useEffect(() => {
    setLang(getActiveLang());
    void refresh();
  }, []);

  async function refresh() {
    const st = await getUpdateState();
    if (!st) return;
    setApp(st.app);
    setDrop(st.content);
    setActive(st.active ?? null);
    const v = await getVersion();
    setEngine(v?.engine ?? "");
  }

  /** Tras instalar, COMPROBAR: el motor tiene que responder ya con la versión
   *  del paquete. Si no, es que este motor es anterior a la 1.4.2 y no sabe
   *  servir paquetes — y sin decirlo, la pantalla parece la de siempre y todo
   *  «sigue igual» sin que nadie entienda por qué. */
  async function verificar(esperada: string) {
    const v = await getVersion();
    setVerify(v?.app === esperada ? "ok" : "raro");
  }

  async function onPick(file: File) {
    setError("");
    setApplied(null);
    setPct(0);
    setPhase("subiendo");
    const res = await uploadUpdate(file, (p) => {
      setPct(p);
      // el 100% de la subida no es el final: falta descomprimir y comprobar
      if (p >= 100) setPhase("instalando");
    });
    if (!res.ok) {
      setPhase("error");
      setError(res.error ?? "No se pudo instalar la actualización.");
      return;
    }
    setApplied(res.manifest ?? null);
    setPhase("listo");
    void refresh();
    if (res.manifest?.version) void verificar(res.manifest.version);
    // Recarga sola: el usuario acaba de instalar y lo que ve sigue siendo lo
    // viejo hasta que el navegador vuelva a pedir la interfaz. Se le dan unos
    // segundos para leer las notas y se recarga con un parámetro que rompe
    // cualquier caché intermedia.
    setTimeout(() => {
      const u = new URL(window.location.href);
      u.searchParams.set("v", String(Date.now()));
      window.location.replace(u.toString());
    }, 6000);
  }

  return (
    <main className={hub.wrap}>
      {dialog}
      <nav className={hub.crumbs} aria-label="Ruta">
        <Link href={`/idioma/${lang}`}>Curso</Link> <span>/</span>{" "}
        <Link href="/perfil">Mi expedición</Link> <span>/</span> <span>Actualizar</span>
      </nav>

      <h1 className={hub.title}>
        <MarkCap size={26} /> Actualizar Seshat
      </h1>
      <p className={hub.subtitle}>
        Cada drop llega como un archivo <b>.seshatpack</b>. Cárgalo aquí y la aplicación se
        actualiza sola: no hace falta reinstalar nada y <b>tu progreso no se toca</b> — vive en otra
        carpeta y ni se lee durante la instalación.
      </p>

      <section className={s.card}>
        <h2 className={s.cardTitle}>Lo que tienes ahora</h2>
        <p className={s.line}>
          Versión <b className="num">{app || "…"}</b> · contenido del drop{" "}
          <b className="num">{drop || "…"}</b>
          {engine && engine !== app && (
            <>
              {" "}· motor <b className="num">{engine}</b>
            </>
          )}
        </p>
        {active ? (
          <p className={s.line}>
            Última actualización instalada: <b>{active.title || active.version}</b>
            {active.appliedAt ? ` · ${new Date(active.appliedAt).toLocaleDateString("es-ES")}` : ""}
          </p>
        ) : (
          <p className={s.lineMuted}>Vas con el contenido de fábrica, tal cual vino la aplicación.</p>
        )}
      </section>

      <section className={s.card}>
        <h2 className={s.cardTitle}>Instalar el paquete del mes</h2>

        {phase === "idle" || phase === "error" ? (
          <>
            <button className={s.btn} onClick={() => fileRef.current?.click()}>
              Elegir el archivo y actualizar
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".seshatpack,.zip,application/zip"
              hidden
              onChange={(e) => {
                const f = e.target.files?.[0];
                e.target.value = ""; // permite reintentar con el mismo archivo
                if (f) void onPick(f);
              }}
            />
            <p className={s.lineMuted}>
              Descarga el paquete del post del drop y elígelo aquí. Si algo sale mal, la aplicación
              se queda exactamente como estaba.
            </p>
          </>
        ) : null}

        {(phase === "subiendo" || phase === "instalando") && (
          <div>
            <div
              className={s.barTrack}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={phase === "instalando" ? undefined : pct}
              aria-label="Progreso de la actualización"
            >
              <div
                className={`${s.barFill} ${phase === "instalando" ? s.barPulse : ""}`}
                style={{ width: phase === "instalando" ? "100%" : `${Math.max(3, pct)}%` }}
              />
            </div>
            <p className={s.line} aria-live="polite">
              {phase === "subiendo"
                ? `Cargando el paquete… ${pct}%`
                : "Comprobando e instalando… no cierres la aplicación."}
            </p>
          </div>
        )}

        {phase === "listo" && (
          <div className={s.ok} role="status">
            <p className={s.okTitle}>Todo ha salido bien.</p>
            <p className={s.line}>
              Seshat ya tiene <b>{applied?.title || applied?.version}</b> instalado y tu progreso
              está intacto. <b>Se recargará sola en unos segundos</b> — o pulsa el botón si tienes
              prisa.
            </p>
            {verify === "raro" && (
              <p role="alert" style={{ color: "var(--warn)", fontWeight: 700, lineHeight: 1.55 }}>
                Ojo: el paquete se ha instalado, pero el motor de esta aplicación es anterior a la
                1.4.2 y todavía no sabe servirlo — por eso seguirás viendo la versión de antes.
                Instala una vez la aplicación nueva (el .dmg en mac, el .zip en Windows) y a partir
                de ahí los paquetes bastarán.
              </p>
            )}
            {applied?.notes?.length ? (
              <>
                <h3 className={s.notesTitle}>Qué trae este parche</h3>
                <ul className={s.notes}>
                  {applied.notes.map((n, i) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
              </>
            ) : null}
            <button
              className={s.btn}
              onClick={() => {
                const u = new URL(window.location.href);
                u.searchParams.set("v", String(Date.now()));
                window.location.replace(u.toString());
              }}
            >
              Recargar y estrenarlo
            </button>
          </div>
        )}

        {phase === "error" && (
          <div className={s.bad} role="alert">
            <p className={s.okTitle}>No se ha instalado.</p>
            <p className={s.line}>{error}</p>
            <p className={s.lineMuted}>
              La aplicación sigue como estaba: no se ha tocado ni el contenido ni tu progreso.
            </p>
          </div>
        )}
      </section>

      {active && (
        <section className={s.card}>
          <h2 className={s.cardTitle}>¿Algo va peor que antes?</h2>
          <p className={s.lineMuted}>
            Puedes volver a la versión anterior del contenido. Tu progreso tampoco se toca aquí.
          </p>
          <button
            className={s.btnGhost}
            onClick={async () => {
              const ok = await confirm({
                title: "¿Volver a la versión anterior?",
                body: "El contenido vuelve a como estaba antes de este parche. Tu progreso no se toca: vive en otra carpeta.",
                confirmLabel: "Volver atrás",
              });
              if (!ok) return;
              const revertido = await rollbackUpdate();
              if (revertido) {
                setApplied(null);
                setPhase("idle");
                await refresh();
                window.location.reload();
              }
            }}
          >
            Volver a la versión anterior
          </button>
        </section>
      )}
    </main>
  );
}
