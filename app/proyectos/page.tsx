import type { Metadata } from "next";
import ProyectosContent from "./ProyectosContent";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Explorá todos nuestros desarrollos residenciales, urbanizaciones y espacios comerciales en Salta Capital.",
};

export default function ProyectosPage() {
  return <ProyectosContent />;
}
