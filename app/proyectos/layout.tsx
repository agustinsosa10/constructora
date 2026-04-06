import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Conocé todos nuestros desarrollos residenciales, comerciales y urbanizaciones en Salta Capital.",
  openGraph: {
    title: "Proyectos | IES Desarrollos Inmobiliarios",
    description:
      "Conocé todos nuestros desarrollos residenciales, comerciales y urbanizaciones en Salta Capital.",
    url: "https://iesdesarrollos.com.ar/proyectos",
    type: "website",
  },
  alternates: {
    canonical: "https://iesdesarrollos.com.ar/proyectos",
  },
};

export default function ProyectosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
