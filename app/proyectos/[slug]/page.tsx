import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { proyectos } from "@/data/proyectos";
import ProyectoPageClient from "@/components/ProyectoPageClient";

export function generateStaticParams() {
  return proyectos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const proyecto = proyectos.find((p) => p.slug === slug);
  if (!proyecto) return {};

  return {
    title: proyecto.nombre,
    description: proyecto.tagline,
    openGraph: {
      title: proyecto.nombre,
      description: proyecto.tagline,
      images: [
        {
          url: proyecto.imagenHero,
          width: 1200,
          height: 630,
          alt: proyecto.nombre,
        },
      ],
    },
  };
}

export default async function ProyectoSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const proyecto = proyectos.find((p) => p.slug === slug);

  if (!proyecto) notFound();

  return <ProyectoPageClient proyecto={proyecto} />;
}
