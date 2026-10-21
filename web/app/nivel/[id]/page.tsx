// Página servidor: enumera los params en build (export estático) y delega
// todo el trabajo al componente cliente.
import { levels } from "@/lib/levels";
import Client from "./Client";

export function generateStaticParams() {
  return levels.filter((l) => l.available).map((l) => ({ id: l.id }));
}

export default function Page() {
  return <Client />;
}
