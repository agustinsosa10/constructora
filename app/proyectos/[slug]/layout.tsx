import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { proyectos } from "@/data/proyectos";

const SITE_URL = "https://iesdesarrollos.com.ar";

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateStaticParams() {
  return proyectos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const proyecto = proyectos.find((p) => p.slug === slug);

  if (!proyecto) notFound();

  const title = proyecto.nombre;
  const description = proyecto.descripcion;
  const url = `${SITE_URL}/proyectos/${proyecto.slug}`;
  const image = proyecto.imagenHero.startsWith("/")
    ? `${SITE_URL}${proyecto.imagenHero}`
    : proyecto.imagenHero;

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
