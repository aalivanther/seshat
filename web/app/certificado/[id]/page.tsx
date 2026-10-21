// Página servidor: enumera los params en build (export estático) y delega
// todo el trabajo al componente cliente.
import { courses } from "@/data/course";
import { CEFR_SCALE } from "@/lib/cefr";
import Client from "./Client";

export function generateStaticParams() {
  const modules = Object.values(courses).flatMap((c) => c.phases.map((p) => ({ id: p.id })));
  const taught = CEFR_SCALE.slice(0, 4); // a1–b2: lo que el curso enseña
  const niveles = ["de", "en"].flatMap((lang) =>
    taught.map((level) => ({ id: `nivel-${lang}-${level}` })),
  );
  return [...modules, { id: "nivel" }, ...niveles];
}

export default function Page() {
  return <Client />;
}
