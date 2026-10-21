// Página servidor: enumera los params en build (export estático) y delega
// todo el trabajo al componente cliente.
import { examsByLang } from "@/data/exams";
import Client from "./Client";

export function generateStaticParams() {
  return Object.values(examsByLang).flat().map((e) => ({ id: e.id }));
}

export default function Page() {
  return <Client />;
}
