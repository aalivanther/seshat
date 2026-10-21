"use client";

// Perfiles simples (solo un nombre): cada persona de tu red local tiene su
// propio progreso. El perfil activo se guarda por dispositivo (localStorage).

import { useEffect, useRef, useState } from "react";
import { UserCircle, Plus, Check } from "@phosphor-icons/react";
import { createProfile, getProfile, getProfiles, setProfile } from "@/lib/api";
import { motorOffText } from "./ErrorBanner";
import s from "./profile.module.css";

export function ProfilePicker() {
  const [profiles, setProfiles] = useState<string[] | null>(null);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);

  // Escape y click fuera cierran el panel
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  useEffect(() => {
    setActive(getProfile());
    getProfiles().then((p) => {
      setProfiles(p);
      // NO se abre solo: aparecía en cada carga tapando el contenido, y quien
      // estudia solo (que es casi todo el mundo) no tiene nada que elegir. El
      // aviso de «estás en default» vive en la pestaña Perfil.
    });
  }, []);

  function choose(name: string) {
    setProfile(name);
    setActive(name);
    setOpen(false);
    // el progreso de toda la app depende del perfil: recarga limpia
    window.location.reload();
  }

  async function addProfile() {
    const name = newName.trim();
    if (!/^[\p{L}0-9_-]{1,24}$/u.test(name)) {
      setError("Solo letras, números, - y _ (máx. 24)");
      return;
    }
    const updated = await createProfile(name);
    if (!updated) {
      setError("El perfil no se pudo crear. " + motorOffText());
      return;
    }
    setProfiles(updated);
    choose(name);
  }

  if (profiles === null) {
    // backend apagado o cargando: chip pasivo
    return (
      <span className={s.chip} title="Los perfiles aparecen cuando la app termina de arrancar">
        <UserCircle size={20} weight="duotone" /> {active || "sin perfil"}
      </span>
    );
  }

  return (
    <div className={s.wrap} ref={wrapRef}>
      <button className={s.chip} onClick={() => setOpen(!open)} aria-expanded={open}>
        <UserCircle size={20} weight="duotone" />{" "}
        <span className={s.chipName}>{active || "Elegir perfil"}</span>
      </button>

      {open && <div className={s.scrim} aria-hidden onClick={() => setOpen(false)} />}
      {open && (
        <div className={s.panel} role="dialog" aria-label="Elegir perfil">
          <p className={s.panelTitle}>¿Quién estudia hoy?</p>
          <div className={s.list}>
            {profiles.map((p) => (
              <button key={p} className={`${s.item} ${p === active ? s.itemActive : ""}`} onClick={() => choose(p)}>
                <UserCircle size={22} weight="duotone" />
                <span>{p}</span>
                {p === active && <Check size={18} weight="bold" />}
              </button>
            ))}
          </div>
          <div className={s.newRow}>
            <input
              className={s.input}
              placeholder="Nuevo perfil..."
              value={newName}
              maxLength={24}
              onChange={(e) => { setNewName(e.target.value); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && addProfile()}
            />
            <button className={s.addBtn} onClick={addProfile} aria-label="Crear perfil">
              <Plus size={18} weight="bold" />
            </button>
          </div>
          {error && <p className={s.error}>{error}</p>}
          {/* El panel es para CAMBIAR de perfil y nada más: la explicación larga
              vivía aquí y lo convertía en un ladrillo que tapaba media pantalla.
              Ahora está donde se lee con calma, en la pestaña «Perfil». */}
          <p className={s.hint}>
            Cada perfil guarda su propio progreso.{" "}
            <a href="/perfil" className={s.hintLink}>Gestionar perfiles →</a>
          </p>
        </div>
      )}
    </div>
  );
}
