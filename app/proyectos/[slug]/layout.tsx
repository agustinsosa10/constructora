import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/lib/sanity/fetch";
import { proyectoBySlugQuery, allSlugsQuery } from "@/sanity/lib/queries";
import type { SanityProyecto } from "@/lib/sanity/types";

const SITE_URL = "https://iesdesarrollos.com.ar";

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>(allSlugsQuery)
  return slugs.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const proyecto = await sanityFetch<SanityProyecto | null>(
    proyectoBySlugQuery,
    { slug },
  )

  if (!proyecto || Array.isArray(proyecto)) notFound();

  const title = proyecto.nombre;
  const description = proyecto.descripcion;
  const url = `${SITE_URL}/proyectos/${proyecto.slug}`;
  const image = proyecto.imagenHero;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | IES Desarrollos Inmobiliarios`,
      description,
      url,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | IES Desarrollos Inmobiliarios`,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function SlugLayout({ children }: { children: React.ReactNode }) {
  return children;
}
