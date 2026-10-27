// Página servidor: una misión de práctica real por módulo que la tenga. La
// misión viaja entera solo a SU página; el resto de la app ve su cabecera.
import { missionsByLang } from "@/data/course";
import Client from "./Client";

export function generateStaticParams() {
  return Object.values(missionsByLang).flatMap((m) => Object.keys(m).map((id) => ({ id })));
}

export default async function Page(props: PageProps<"/mision/[id]">) {
  const { id } = await props.params;
  const mission = Object.values(missionsByLang).find((m) => m[id])?.[id] ?? null;
  return <Client mission={mission} />;
}
