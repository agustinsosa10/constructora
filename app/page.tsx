import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProyectosCarousel from "@/components/ProyectosCarousel";
import NosotrosSection from "@/components/NosotrosSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ProyectosCarousel />
      <NosotrosSection />
    </>
  );
}
