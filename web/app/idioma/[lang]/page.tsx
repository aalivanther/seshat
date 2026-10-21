// Página servidor: enumera los idiomas CON contenido en este build (export
// estático — un drop sin inglés ni genera su página) y delega al cliente.
import { LANGUAGES } from "@/lib/languages";
import { courses } from "@/data/course";
import Client from "./Client";

export function generateStaticParams() {
  return LANGUAGES.filter((l) => (courses[l.id]?.phases.length ?? 0) > 0).map((l) => ({ lang: l.id }));
}

export default function Page() {
  return <Client />;
}
