"use client";

import { notFound } from "next/navigation";
import { has } from "@/data/features";
import { ExamPlayer } from "@/components/ExamPlayer";
import type { ExamSet } from "@/lib/examTypes";

export default function ExamPage({ set }: { set: ExamSet | null }) {
  if (!has("exams")) notFound();
  if (!set) notFound();
  return <ExamPlayer set={set} />;
}
