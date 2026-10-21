// Página servidor: una misión de práctica real por módulo que la tenga.
import { missionsByLang } from "@/data/course";
import Client from "./Client";

export function generateStaticParams() {
  return Object.values(missionsByLang).flatMap((m) => Object.keys(m).map((id) => ({ id })));
}

export default function Page() {
  return <Client />;
}
