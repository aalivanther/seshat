// Página servidor: un reto por módulo, en todos los idiomas del build. Del
// curso, el cliente solo recibe los ids que alimentan las visitas del pasado;
// los ejercicios del módulo los pide él al abrirse (data/phases.ts).
import { courses } from "@/data/course";
import { levels } from "@/lib/levels";
import { retoPastPhraseIds } from "@/lib/contentSlices";
import Client from "./Client";

export function generateStaticParams() {
  return [
    ...Object.values(courses).flatMap((c) => c.phases.map((p) => ({ id: p.id }))),
    // retos de nivel: la vuelta completa (solo niveles con contenido)
    ...levels.filter((l) => l.available).map((l) => ({ id: `nivel-${l.id}` })),
  ];
}

export default async function Page(props: PageProps<"/reto/[id]">) {
  const { id } = await props.params;
  return <Client pastPhraseIds={retoPastPhraseIds(id)} />;
}
