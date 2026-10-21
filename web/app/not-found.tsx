import Link from "next/link";
import s from "./not-found.module.css";

// 404 con el estilo de la libreta — nunca la página genérica del framework.
export default function NotFound() {
  return (
    <main className={s.page}>
      <p className={s.code}>
        404
      </p>
      <h1 className={s.title}>Esta página no está en el cuaderno</h1>
      <p className={s.text}>
        Puede que el enlace sea viejo o que la hoja aún no exista. Tu progreso está a salvo.
      </p>
      <div className={s.back}>
        <Link href="/" className={s.home}>
          Volver a la expedición →
        </Link>
      </div>
    </main>
  );
}
