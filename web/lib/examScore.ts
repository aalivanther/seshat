// Baremo de los simulacros — lógica pura, testeable sin UI.
// A1/A2/inglés: porcentaje global con el corte del set (60% Goethe, 50%
// LanguageCert). B1: examen MODULAR — cada destreza vale 100 puntos, se
// aprueba por separado con corte 60 y SIN compensación (PLAN-B1 §2).

import type { ExamSet, RubricCriterion } from "./examTypes";
import { gradeText } from "./grade";

export interface SkillScore { got: number; max: number; }

/** Dos medias del examen modular, cada módulo ya sobre 100.
 *  La objetiva sale de la clave; la otra, de la rúbrica que marca el alumno.
 *  No entra en `pass`: separarlas es para que se vean, no para mover el corte. */
export interface ModularSplit {
  objectivePct: number;
  selfPct: number;
  objectiveSkills: string[];
  selfSkills: string[];
}

export interface ExamResults {
  bySkill: Record<string, SkillScore>;
  totalPct: number;
  /** el módulo más flojo (solo en exámenes modulares): lo que decide el aprobado */
  weakestPct?: number;
  pass: boolean;
  itemResults: { id: string; label: string; ok: boolean | null; detail: string }[];
  /** solo modular (B1): estado por módulo sobre 100 puntos y su corte */
  modules?: { skill: string; points: number; pct: number; pass: boolean }[];
  /** modular: ¿aprobó TODOS los módulos? (el certificado completo) */
  allModulesPassed?: boolean;
  /** modular, y solo si hay destrezas de los dos lados */
  split?: ModularSplit;
}

export type ExamAnswers = Record<string, unknown>;

export function scoreExam(set: ExamSet, answers: ExamAnswers): ExamResults {
  // etiquetas V/F según el idioma del set (los sets ingleses empiezan en-)
  const en = set.id.startsWith("en-");
  const T = en ? "True" : "Richtig";
  const F = en ? "False" : "Falsch";
  const bySkill: Record<string, SkillScore> = {};
  const itemResults: ExamResults["itemResults"] = [];

  for (const section of set.sections) {
    const sk = (bySkill[section.skill] ??= { got: 0, max: 0 });
    for (const teil of section.teile) {
      for (const item of teil.items) {
        if (item.kind === "hoeren-mc") {
          sk.max += 1;
          const ok = answers[item.id] === item.answer;
          if (ok) sk.got += 1;
          itemResults.push({ id: item.id, label: item.question, ok, detail: `Correcta: ${"abc"[item.answer]}) ${item.options[item.answer]}` });
        } else if (item.kind === "hoeren-rf" || item.kind === "lesen-schild") {
          sk.max += 1;
          const ok = answers[item.id] === item.richtig;
          if (ok) sk.got += 1;
          itemResults.push({ id: item.id, label: item.statement, ok, detail: `Correcta: ${item.richtig ? T : F}` });
        } else if (item.kind === "lesen-text") {
          const val = (answers[item.id] ?? {}) as Record<string, boolean>;
          for (const st of item.statements) {
            sk.max += 1;
            const ok = val[st.id] === st.richtig;
            if (ok) sk.got += 1;
            itemResults.push({ id: st.id, label: st.statement, ok, detail: `Correcta: ${st.richtig ? T : F}` });
          }
        } else if (item.kind === "lesen-ads") {
          sk.max += 1;
          const ok = answers[item.id] === item.answer;
          if (ok) sk.got += 1;
          itemResults.push({ id: item.id, label: item.situation, ok, detail: `Correcta: ${item.answer})` });
        } else if (item.kind === "schreiben-form") {
          const vals = (answers[item.id] ?? []) as string[];
          item.fields.forEach((f, i) => {
            sk.max += 1;
            // El baremo oficial acepta «16 / sixteen» y «second / 2nd» en los
            // dos sentidos: en un formulario de examen se puntúa el dato, no la
            // forma de escribirlo.
            const r = vals[i] ? gradeText(vals[i], f.answers, { numeralsEitherWay: true }) : null;
            const ok = !!r?.correct;
            if (ok) sk.got += 1;
            itemResults.push({ id: `${item.id}-${i}`, label: `${f.label}`, ok, detail: `Correcta: ${f.answers[0]}${vals[i] ? ` · tú: ${vals[i]}` : ""}` });
          });
        } else if (item.kind === "schreiben-message") {
          if (item.rubric) {
            // B1: bandas por criterio, con la regla dura de Erfüllung = E ⇒ 0
            const max = item.points_max ?? 40;
            sk.max += max;
            const got = rubricScore(answers[item.id], item.rubric, max);
            sk.got += got;
            itemResults.push({
              id: item.id,
              label: `Texto (~${item.words ?? 80} palabras)`,
              ok: got >= max * 0.6 ? true : got > 0 ? null : false,
              detail: `${Math.round(got)}/${max} puntos (rúbrica oficial, autoevaluada)`,
            });
          } else {
            const max = item.points_max ?? 10;
            sk.max += max;
            const stored = (answers[item.id] ?? { leit: [], gestaltung: false }) as { leit: (number | null)[]; gestaltung: boolean };
            const raw = (stored.leit ?? []).reduce((a: number, b) => a + (b ?? 0), 0) + (stored.gestaltung ? 1 : 0);
            const got = (raw / 10) * max;
            sk.got += got;
            const shown = Number.isInteger(got) ? String(got) : String(Math.round(got * 10) / 10);
            itemResults.push({
              id: item.id,
              label: `Mensaje (~${item.words ?? 30} palabras)`,
              ok: got >= max * 0.6 ? true : got > 0 ? null : false,
              detail: `${shown}/${max} puntos (baremo oficial, autoevaluado)`,
            });
          }
        } else if (item.kind === "lesen-mc") {
          sk.max += 1;
          const ok = answers[item.id] === item.answer;
          if (ok) sk.got += 1;
          itemResults.push({ id: item.id, label: item.question, ok, detail: `Correcta: ${"abc"[item.answer]}) ${item.options[item.answer]}` });
        } else if (item.kind === "lesen-insert") {
          const val = (answers[item.id] ?? {}) as Record<string, string>;
          for (const g of item.gaps) {
            sk.max += 1;
            const ok = val[g.id] === g.answer;
            if (ok) sk.got += 1;
            itemResults.push({
              id: g.id,
              label: `Hueco ${g.id}`,
              ok,
              detail: `Correcta: frase ${g.answer.toUpperCase()}`,
            });
          }
        } else if (item.kind === "lesen-match") {
          const val = (answers[item.id] ?? {}) as Record<string, string>;
          for (const s of item.situations) {
            sk.max += 1;
            const ok = val[s.id] === s.answer;
            if (ok) sk.got += 1;
            itemResults.push({
              id: s.id,
              label: s.situation,
              ok,
              detail: s.answer === "0"
                ? "Correcta: 0 — ningún anuncio servía (la trampa del Teil)"
                : `Correcta: anuncio ${s.answer.toUpperCase()}`,
            });
          }
        } else if (item.kind === "lesen-janein") {
          const val = (answers[item.id] ?? {}) as Record<string, boolean>;
          for (const op of item.opinions) {
            sk.max += 1;
            const ok = val[op.id] === op.ja;
            if (ok) sk.got += 1;
            itemResults.push({ id: op.id, label: `${op.author}: ${item.question}`, ok, detail: `Correcta: ${op.ja ? "Ja" : "Nein"}` });
          }
        } else if (item.kind === "hoeren-group") {
          // el grupo no puntúa: puntúan sus ítems (mismo baremo que sueltos)
          for (const sub of item.items) {
            sk.max += 1;
            if (sub.kind === "hoeren-mc") {
              const ok = answers[sub.id] === sub.answer;
              if (ok) sk.got += 1;
              itemResults.push({ id: sub.id, label: sub.question, ok, detail: `Correcta: ${"abc"[sub.answer]}) ${sub.options[sub.answer]}` });
            } else if (sub.kind === "hoeren-rf") {
              const ok = answers[sub.id] === sub.richtig;
              if (ok) sk.got += 1;
              itemResults.push({ id: sub.id, label: sub.statement, ok, detail: `Correcta: ${sub.richtig ? T : F}` });
            } else {
              const ok = answers[sub.id] === sub.answer;
              if (ok) sk.got += 1;
              const who = sub.speakers.find((s) => s.key === sub.answer)?.name ?? sub.answer;
              itemResults.push({ id: sub.id, label: sub.statement, ok, detail: `Lo dice: ${who}` });
            }
          }
        } else if (item.kind === "hoeren-wersagt") {
          sk.max += 1;
          const ok = answers[item.id] === item.answer;
          if (ok) sk.got += 1;
          const who = item.speakers.find((s) => s.key === item.answer)?.name ?? item.answer;
          itemResults.push({ id: item.id, label: item.statement, ok, detail: `Lo dice: ${who}` });
        } else if (item.kind === "sprechen-praesentation") {
          const max = item.weight ?? 40;
          sk.max += max;
          const got = rubricScore(answers[item.id], item.rubric, max);
          sk.got += got;
          itemResults.push({
            id: item.id,
            label: `Presentación: ${item.topic}`,
            ok: got >= max * 0.6 ? true : got > 0 ? null : false,
            detail: `${Math.round(got)}/${max} puntos (rúbrica autoevaluada)`,
          });
        } else if (item.kind === "hoeren-notes" || item.kind === "lesen-notes") {
          // answers[item.id] = Record<gapId, string>
          const val = (answers[item.id] ?? {}) as Record<string, string>;
          const defMax = item.kind === "lesen-notes" ? 5 : 3;
          for (const gap of item.gaps) {
            sk.max += 1;
            const input = typeof val[gap.id] === "string" ? val[gap.id] : "";
            const maxWords = gap.maxWords ?? defMax;
            const tooLong = countWords(input) > maxWords;
            const ok = !tooLong && !!gradeText(input, gap.answers).correct;
            if (ok) sk.got += 1;
            itemResults.push({
              id: gap.id,
              label: gap.prompt,
              ok,
              detail: tooLong
                ? `Más de ${maxWords} ${maxWords === 1 ? "palabra" : "palabras"} — no puntúa`
                : `Correcta: ${gap.answers[0]}${input ? ` · tú: ${input}` : ""}`,
            });
          }
        } else if (item.kind === "hoeren-photo-match") {
          // answers[item.id] = Record<itemId, photoKey>
          const val = (answers[item.id] ?? {}) as Record<string, string>;
          for (const it of item.items) {
            sk.max += 1;
            const ok = val[it.id] === it.answer;
            if (ok) sk.got += 1;
            const photo = item.photos.find((p) => p.key === it.answer);
            itemResults.push({
              id: it.id,
              label: it.prompt,
              ok,
              detail: `Correcta: foto ${it.answer.toUpperCase()}${photo ? ` (${photo.sceneEs})` : ""}`,
            });
          }
        } else if (item.kind === "sprechen") {
          const weight = item.weight ?? (item.teil === 2 ? 1.5 : 3);
          sk.max += weight;
          if (item.rubric) {
            const got = rubricScore(answers[item.id], item.rubric, weight);
            sk.got += got;
            itemResults.push({
              id: item.id,
              label: item.prompt,
              ok: got >= weight * 0.6 ? true : got > 0 ? null : false,
              detail: `${Math.round(got)}/${weight} puntos (rúbrica autoevaluada)`,
            });
            continue;
          }
          const self = (answers[item.id] as number | undefined) ?? 0;
          sk.got += self * weight;
          itemResults.push({ id: item.id, label: item.prompt, ok: self === 1 ? true : self > 0 ? null : false, detail: `Autoevaluación: ${self === 1 ? "bien" : self > 0 ? "a medias" : "me costó"}` });
        } else {
          const missed: never = item;
          void missed;
        }
      }
    }
  }

  const totMax = Object.values(bySkill).reduce((n, v) => n + v.max, 0);
  const totGot = Object.values(bySkill).reduce((n, v) => n + v.got, 0);
  const totalPct = totMax ? Math.round((totGot / totMax) * 100) : 0;
  const passPct = set.scoring?.passPct ?? 60;

  if (!set.scoring?.modular) {
    return { bySkill, totalPct, pass: totalPct >= passPct, itemResults };
  }

  // MODULAR (B1): cada módulo sobre 100 puntos con su propio corte. El
  // porcentaje global se sigue enseñando, pero NO decide: manda cada módulo.
  const perItem = set.scoring.pointsPerItem ?? {};
  const modules = Object.entries(bySkill).map(([skill, sc]) => {
    const factor = perItem[skill as keyof typeof perItem];
    const points = factor ? sc.got * factor : sc.max ? (sc.got / sc.max) * 100 : 0;
    const pct = Math.round(points);
    return { skill, points: Math.round(points * 10) / 10, pct, pass: pct >= passPct };
  });
  // OJO: en modular el porcentaje "global" bruto mezcla escalas (1 punto por
  // ítem en Lesen/Hören vs 40 por tarea en Schreiben) y sale engañoso. El
  // número que se enseña es la MEDIA de los módulos, todos sobre 100.
  const modAvg = modules.length
    ? Math.round(modules.reduce((n, m) => n + m.pct, 0) / modules.length)
    : totalPct;
  return {
    bySkill,
    totalPct: modAvg,
    // El B1 es MODULAR y no compensa: lo que decide si estás aprobado es el
    // módulo más flojo, no la media. Se devuelve aparte porque es lo que hay
    // que GUARDAR — guardando la media, un Sprechen de 35 quedaba escondido
    // detrás de tres módulos altos y el historial decía «aprobado».
    weakestPct: modules.length ? Math.min(...modules.map((m) => m.pct)) : totalPct,
    pass: modules.every((m) => m.pass),
    itemResults,
    modules,
    allModulesPassed: modules.every((m) => m.pass),
    split: modularSplit(modules),
  };
}

// Hören y Lesen se contrastan con la clave. Schreiben y Sprechen los marca
// el alumno: metidos en la misma cifra, una rúbrica generosa vestiría de
// oficial lo que nadie ha corregido. El aprobado de cada módulo no se toca.
const OBJECTIVE_SKILLS = new Set<string>(["hoeren", "lesen"]);
const SELF_SKILLS = new Set<string>(["schreiben", "sprechen"]);

function modularSplit(modules: { skill: string; pct: number }[]): ModularSplit | undefined {
  const objective = modules.filter((m) => OBJECTIVE_SKILLS.has(m.skill));
  const self = modules.filter((m) => SELF_SKILLS.has(m.skill));
  if (objective.length === 0 || self.length === 0) return undefined;
  const mean = (rows: { pct: number }[]) =>
    Math.round(rows.reduce((n, m) => n + m.pct, 0) / rows.length);
  return {
    objectivePct: mean(objective),
    selfPct: mean(self),
    objectiveSkills: objective.map((m) => m.skill),
    selfSkills: self.map((m) => m.skill),
  };
}

function countWords(s: string): number {
  const t = s.trim();
  return t ? t.split(/\s+/).length : 0;
}

/** Puntos de una tarea productiva evaluada por rúbrica de bandas.
 *  `answer` = Record<criterioId, índiceDeBanda>. Reglas del Goethe B1:
 *  cada criterio aporta los puntos de su banda, y si el criterio marcado
 *  `fatalE` cae en la última banda (E), la tarea entera vale 0. */
export function rubricScore(
  answer: unknown,
  rubric: RubricCriterion[] | undefined,
  max: number,
): number {
  if (!rubric?.length) return 0;
  const picked = (answer ?? {}) as Record<string, number>;
  let sum = 0;
  for (const c of rubric) {
    const idx = picked[c.id];
    if (idx === undefined || idx === null) continue;
    const band = c.bands[Math.min(Math.max(0, idx), c.bands.length - 1)] ?? 0;
    if (c.fatalE && idx === c.bands.length - 1) return 0; // Erfüllung = E ⇒ 0
    sum += band;
  }
  return Math.min(sum, max);
}

/** Banda oficial del certificado — del baremo del set (default: Goethe) */
export function band(pct: number, set?: ExamSet): string {
  const bands = set?.scoring?.bands ?? [
    { min: 90, label: "sehr gut" },
    { min: 80, label: "gut" },
    { min: 70, label: "befriedigend" },
    { min: 0, label: "ausreichend" },
  ];
  return (bands.find((b) => pct >= b.min) ?? bands[bands.length - 1]).label;
}
