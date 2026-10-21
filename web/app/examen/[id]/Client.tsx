"use client";

import { notFound, useParams } from "next/navigation";
import { examsByLang } from "@/data/exams";
import { has } from "@/data/features";
import { ExamPlayer } from "@/components/ExamPlayer";

export default function ExamPage() {
  if (!has("exams")) notFound();
  const params = useParams<{ id: string }>();
  const set = Object.values(examsByLang).flat().find((e) => e.id === params.id);
  if (!set) notFound();
  return <ExamPlayer set={set} />;
}
