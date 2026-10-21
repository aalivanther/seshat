import { notFound } from "next/navigation";
import { findLesson, courses } from "@/data/course";
import { LessonPlayer } from "@/components/LessonPlayer";

export default async function LessonPage(props: PageProps<"/lesson/[id]">) {
  const { id } = await props.params;
  const hit = findLesson(id);
  if (!hit) notFound();
  // sin prop vocab: LessonPlayer ya importa course — pasarlo aquí serializaba
  // los 860 ítems en el HTML+RSC de cada una de las 168 lecciones
  return <LessonPlayer lesson={hit.lesson} />;
}

export function generateStaticParams() {
  return Object.values(courses).flatMap((c) => c.phases.flatMap((p) => p.lessons.map((l) => ({ id: l.id }))));
}
