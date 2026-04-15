import type { Metadata } from "next";
import ProyectosContent from "./ProyectosContent";
import { sanityFetch } from "@/lib/sanity/fetch";
import { allProyectosQuery } from "@/sanity/lib/queries";
import type { SanityProyecto } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Explorá todos nuestros desarrollos residenciales, urbanizaciones y espacios comerciales en Salta Capital.",
};

export default async function ProyectosPage() {
  const proyectos = await sanityFetch<SanityProyecto[]>(allProyectosQuery)
  return <ProyectosContent proyectos={proyectos} />;
}
