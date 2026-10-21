// Página servidor: enumera los params en build (export estático) y delega
// todo el trabajo al componente cliente.
import { courses } from "@/data/course";
import Client from "./Client";

export function generateStaticParams() {
  return Object.values(courses).flatMap((c) => c.phases.map((p) => ({ id: p.id })));
}

export default function Page() {
  return <Client />;
}
