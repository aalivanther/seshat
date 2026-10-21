import type { Metadata } from "next";
import { Nunito, Geist_Mono, Shantell_Sans } from "next/font/google";
import { AppTopBar } from "@/components/AppTopBar";
import { TTSGuard } from "@/components/TTSGuard";
import { JuiceListener } from "@/components/JuiceListener";
import { UpdateNews } from "@/components/UpdateNews";
import { Heartbeat } from "@/components/Heartbeat";
import { ThemeScript } from "@/components/ThemeToggle";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

// La voz "escrita a mano" de la libreta: diseñada para leer, cero Comic Sans
const shantell = Shantell_Sans({
  variable: "--font-shantell",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Seshat — aprende idiomas",
  description: "Seshat: cursos de idiomas en cuaderno interactivo. Alemán e inglés A1–B2 — frase usable primero, gramática después.",
  appleWebApp: { capable: true, title: "Seshat", statusBarStyle: "default" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbf7f0",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${nunito.variable} ${shantell.variable} ${geistMono.variable}`}>
      <head>
        {/* El tema se aplica ANTES de pintar nada: si esto viviera solo dentro
            del interruptor, en las pantallas inmersivas —lección, examen— la
            barra no se monta y el tema oscuro entraría con un fogonazo blanco. */}
        <ThemeScript />
      </head>
      <body>
        <TTSGuard />
        <Heartbeat />
        <JuiceListener />
        <UpdateNews />
        <AppTopBar />
        {children}
      </body>
    </html>
  );
}
