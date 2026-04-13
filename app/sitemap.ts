import type { MetadataRoute } from "next";
import { sanityFetch } from "@/lib/sanity/fetch";
import { allSlugsQuery } from "@/sanity/lib/queries";

const SITE_URL = "https://iesdesarrollos.com.ar";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await sanityFetch<{ slug: string }[]>(allSlugsQuery)

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/proyectos`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const proyectoRoutes: MetadataRoute.Sitemap = slugs.map((p) => ({
    url: `${SITE_URL}/proyectos/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...proyectoRoutes];
}
