import { notFound } from "next/navigation";
import { sanityFetch } from "@/lib/sanity/fetch";
import { proyectoBySlugQuery } from "@/sanity/lib/queries";
import type { SanityProyecto } from "@/lib/sanity/types";
import ProyectoPageClient from "@/components/ProyectoPageClient";
import Footer from "@/components/Footer";

export default async function ProyectoSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const proyecto = await sanityFetch<SanityProyecto | null>(
    proyectoBySlugQuery,
    { slug },
  )

  if (!proyecto || Array.isArray(proyecto)) notFound();

  // Adaptamos galeria y planoMaestro de SanityImageAsset[] → string[]
  // para mantener compatibilidad con ProyectoPageClient
  const proyectoAdaptado = {
    ...proyecto,
    galeria: proyecto.galeria?.map((img) => img.url) ?? [],
    planoMaestro: proyecto.planoMaestro?.map((img) => img.url) ?? [],
  }

  return (
    <>
      <ProyectoPageClient proyecto={proyectoAdaptado} />
      <Footer />
    </>
  );
}
