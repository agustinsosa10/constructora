import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProyectosCarousel from "@/components/ProyectosCarousel";
import NosotrosSection from "@/components/NosotrosSection";
import ContactoSection from "@/components/ContactoSection";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/lib/sanity/fetch";
import { allProyectosQuery } from "@/sanity/lib/queries";
import type { SanityProyecto } from "@/lib/sanity/types";
import { calcularMetricas } from "@/lib/metricas";

export default async function Home() {
  const proyectos = await sanityFetch<SanityProyecto[]>(allProyectosQuery)
  const metricas = calcularMetricas(proyectos)

  return (
    <>
      <Navbar />
      <HeroSection />
      <NosotrosSection metricas={metricas} />
      <ProyectosCarousel proyectos={proyectos} />
      <ContactoSection />
      <Footer />
    </>
  );
}
