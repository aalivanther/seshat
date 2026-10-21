// Página servidor: un reto por módulo, en todos los idiomas del build.
import { courses } from "@/data/course";
import { levels } from "@/lib/levels";
import Client from "./Client";

export function generateStaticParams() {
  return [
    ...Object.values(courses).flatMap((c) => c.phases.map((p) => ({ id: p.id }))),
    // retos de nivel: la vuelta completa (solo niveles con contenido)
    ...levels.filter((l) => l.available).map((l) => ({ id: `nivel-${l.id}` })),
  ];
}

export default function Page() {
  return <Client />;
}
