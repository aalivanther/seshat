"use client";

// Certificado — solo se emite si la validación es REAL (prueba ≥80% vigente,
// o Prüfungsreife completa). Imprimible / guardable como PDF.

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { has } from "@/data/features";
import { Printer, ArrowLeft, Compass } from "@phosphor-icons/react";
import { getProfile, getState } from "@/lib/api";
import type { ServerState } from "@/lib/types";
import { courses, langOfPhase } from "@/data/course";
import {
  examReadiness,
  examReadinessTitle,
  moduleCert,
  officialExamName,
  rankOf,
} from "@/lib/achievements";
import { isCefr, type Cefr } from "@/lib/cefr";
import { celebrate } from "@/lib/juice";
import hub from "@/components/hub.module.css";
import s from "./cert.module.css";

/** `nivel` (URL vieja) = alemán A1; `nivel-de-a2`, `nivel-en-b1`, … el resto. */
function parseNivelCert(id: string): { lang: string; level: Cefr } | null {
  if (id === "nivel") return { lang: "de", level: "a1" };
  const m = /^nivel-([a-z]+)-([a-c][12])$/.exec(id);
  if (!m || !isCefr(m[2])) return null;
  return { lang: m[1], level: m[2] };
}

function fmt(d: Date | null): string {
  return d ? d.toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" }) : "—";
}

/** Sello SVG con cinta — dibujado a mano, calidad de imprenta, sin licencias */
function Seal({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 120 140" width="108" height="126" aria-hidden>
      {/* cintas */}
      <path d="M42 96 L30 134 L48 122 L58 138 L62 100 Z" fill={color} opacity="0.75" />
      <path d="M78 96 L90 134 L72 122 L62 138 L58 100 Z" fill={color} opacity="0.55" />
      {/* borde dentado del sello */}
      <g transform="translate(60 58)">
        {Array.from({ length: 24 }, (_, i) => {
          const a = (i / 24) * Math.PI * 2;
          return <circle key={i} cx={Math.cos(a) * 46} cy={Math.sin(a) * 46} r={5.5} fill={color} />;
        })}
        <circle r="46" fill={color} />
        <circle r="38" fill="none" stroke="#fffdf6" strokeWidth="1.5" opacity="0.85" />
        <circle r="30" fill="none" stroke="#fffdf6" strokeWidth="0.75" opacity="0.6" />
        {/* rosa de los vientos */}
        <path d="M0 -24 L5 -5 L24 0 L5 5 L0 24 L-5 5 L-24 0 L-5 -5 Z" fill="#fffdf6" opacity="0.95" />
        <circle r="4" fill={color} stroke="#fffdf6" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

export default function CertificatePage() {
  if (!has("certificates")) notFound();
  const params = useParams<{ id: string }>();
  const [st, setSt] = useState<ServerState | null | "loading">("loading");
  // el nombre vive en localStorage: leerlo en efecto evita el mismatch de
  // hidratación (patrón de perfil/page.tsx); mientras st==="loading" solo se
  // pinta el esqueleto, así que el valor inicial nunca llega a verse
  const [name, setName] = useState("");

  useEffect(() => {
    setName(getProfile() || "default");
    getState().then((state) => {
      setSt(state);
      celebrate(false);
    });
  }, []);

  if (st === "loading") {
    return <main className={s.wrap}><div className={hub.skeleton} style={{ height: 400 }} /></main>;
  }

  const nivel = parseNivelCert(params.id);
  const isLevel = nivel !== null;
  const phase = isLevel ? null : Object.values(courses).flatMap((c) => c.phases).find((p) => p.id === params.id);
  const certLang = isLevel ? nivel.lang : phase ? langOfPhase(phase.id) : "de";
  const certLevel: Cefr = isLevel ? nivel.level : (phase?.level ?? "a1");
  const cert = phase ? moduleCert(phase, st) : null;
  const readiness = isLevel ? examReadiness(st, { lang: nivel.lang, level: nivel.level }) : null;
  const rank = rankOf(st?.xp ?? 0);
  const examName = officialExamName(certLang, certLevel);

  // VALIDACIÓN: sin logro vigente no hay certificado — no se puede falsear por URL
  const authorized = isLevel ? readiness!.ready : !!cert?.valid;

  if (!authorized) {
    return (
      <main className={s.wrap}>
        <div className={s.deniedWrap}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800 }}>Este certificado aún no está emitido</h1>
          <p style={{ color: "var(--text-2)", marginTop: 8, maxWidth: "48ch", marginInline: "auto" }}>
            {isLevel
              ? readiness!.certsTotal === 0
                ? `Este nivel aún no tiene módulos en el curso, así que no se puede emitir el aval del ${examName}.`
                : `El aval del ${examName} exige los ${readiness!.certsTotal} certificados de módulo del ${certLevel.toUpperCase()} vigentes y ${readiness!.examsNeeded} simulacro${readiness!.examsNeeded === 1 ? "" : "s"} aprobado${readiness!.examsNeeded === 1 ? "" : "s"} en los últimos 30 días.`
              : "Se emite con todas las lecciones del módulo completas y la prueba ≥80% en los últimos 30 días."}
          </p>
          <div style={{ marginTop: 20 }}>
            <Link href="/perfil" className={s.btn}><ArrowLeft size={16} /> Volver a mi expedición</Link>
          </div>
        </div>
      </main>
    );
  }

  const color = isLevel ? "#b45309" : phase!.color;
  const today = new Date();

  return (
    <main className={s.wrap}>
      <div className={s.actions}>
        <Link href="/perfil" className={s.ghost}><ArrowLeft size={16} /> Mi expedición</Link>
        <button className={s.btn} onClick={() => window.print()}>
          <Printer size={17} /> Imprimir / guardar PDF
        </button>
      </div>

      <article className={s.cert} style={{ ["--certColor" as string]: color }}>
        <div className={s.watermark}><Compass size={420} weight="thin" /></div>
        <div className={s.inner}>
          <p className={s.kicker}>Seshat · {certLang === "en" ? "English" : "Deutsch"} · Expedición {certLevel.toUpperCase()}</p>
          <h1 className={s.title}>
            {isLevel
              ? examReadinessTitle(certLang, certLevel)
              : certLang === "en"
                ? `Certificate · Module ${phase!.n}`
                : `Zertifikat · Modul ${phase!.n}`}
          </h1>
          {!isLevel && (
            <p style={{ fontFamily: "var(--font-hand)", fontWeight: 700, color: "var(--text-2)", marginTop: 2 }}>
              {phase!.title}
            </p>
          )}

          <p className={s.certifies}>Se certifica que</p>
          <div className={s.name}>{name}</div>
          <p className={s.certifies} style={{ marginTop: 4 }}>
            explorador con rango <b lang="de">{rank.current.title}</b>,
          </p>

          {isLevel ? (
            <p className={s.body}>
              mantiene <b>vigentes los {readiness!.certsTotal} certificados de módulo</b> del nivel {certLevel.toUpperCase()}
              y ha aprobado <b>{readiness!.examsPassed30d} simulacros completos</b> del examen en los
              últimos 30 días, por lo que se encuentra <b>objetivamente en condiciones de presentar
              el {examName}</b>. {certLang === "en" ? "Good luck!" : "Viel Erfolg!"}
            </p>
          ) : (
            <p className={s.body}>
              completó las <b>{phase!.lessons.length} lecciones</b> del módulo y superó su prueba de
              dominio con <b>{cert!.score}%</b>{cert!.lastScore !== null && cert!.lastScore !== cert!.score
                ? <> (último intento, el que lo mantiene al día: <b>{cert!.lastScore}%</b>)</>
                : null} — todo mezclado y produciendo {certLang === "en" ? "inglés" : "alemán"}, como exige la
              memoria de verdad. Este logro avala el contenido del módulo de cara al
              {certLang === "en" ? "LanguageCert ESOL" : "Goethe-Zertifikat"} {(phase!.level ?? "a1").toUpperCase()}.
            </p>
          )}

          <div className={s.sealRow}>
            <div className={s.dates}>
              Emitido
              <b>{fmt(isLevel ? today : cert!.since)}</b>
              {isLevel ? "Al día mientras lo estén sus módulos" : "Vigente hasta"}
              <b>{isLevel ? "—" : fmt(cert!.validUntil)}</b>
            </div>
            <div className={s.seal}><Seal color={color} /></div>
            {/* La nota la pone el corrector del curso: la prueba de módulo se
                puntúa con reglas (lib/moduleTest.ts + lib/grade.ts). */}
            <div className={s.signature}>
              <div className={s.sigName}>Seshat</div>
              corrección automática del curso
              <br />
              (nota calculada, sin indulgencia)
            </div>
          </div>

          <p className={s.validity}>
            {isLevel
              ? "Este papel vale mientras valgan los certificados de los módulos que lo sostienen: en cuanto uno caduca, deja de estar al día. No es burocracia, es memoria — y se renueva repitiendo la prueba de ese módulo."
              : "La vigencia de 30 días no es burocracia: es memoria. Renovar el certificado repitiendo la prueba es repaso espaciado — así lo que este papel dice sigue siendo verdad."}
          </p>
        </div>
      </article>
    </main>
  );
}
