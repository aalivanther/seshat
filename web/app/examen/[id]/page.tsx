// Página servidor: enumera los params en build (export estático) y le da al
// cliente SU simulacro entero — los demás no viajan.
import { examsByLang } from "@/data/exams";
import Client from "./Client";

export function generateStaticParams() {
  return Object.values(examsByLang).flat().map((e) => ({ id: e.id }));
}

export default async function Page(props: PageProps<"/examen/[id]">) {
  const { id } = await props.params;
  const set = Object.values(examsByLang).flat().find((e) => e.id === id) ?? null;
  return <Client set={set} />;
}
