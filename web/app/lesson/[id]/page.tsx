import { notFound } from "next/navigation";
import { findLesson, courses } from "@/data/course";
import { lessonFreshWords, lessonVocab } from "@/lib/contentSlices";
import { LessonPlayer } from "@/components/LessonPlayer";

export default async function LessonPage(props: PageProps<"/lesson/[id]">) {
  const { id } = await props.params;
  const hit = findLesson(id);
  if (!hit) notFound();
  // La lección viaja sola, con las tarjetas de SUS frases y sus palabras
  // nuevas ya calculadas: el cliente no carga el curso para buscarlas, y el
  // vocabulario entero del idioma serializaba miles de tarjetas en cada página.
  return (
    <LessonPlayer
      lesson={hit.lesson}
      vocab={lessonVocab(hit.lesson, courses[hit.lang].vocab)}
      freshWords={lessonFreshWords(hit.lesson)}
    />
  );
}

export function generateStaticParams() {
  return Object.values(courses).flatMap((c) => c.phases.flatMap((p) => p.lessons.map((l) => ({ id: l.id }))));
}
