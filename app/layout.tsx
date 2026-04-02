import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "IES Desarrollos Inmobiliarios | Salta Capital",
  description: "Construimos el futuro de Salta. Desarrollos residenciales, comerciales y urbanizaciones en Salta Capital.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${montserrat.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
