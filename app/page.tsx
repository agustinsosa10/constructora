import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProyectosCarousel from "@/components/ProyectosCarousel";
import NosotrosSection from "@/components/NosotrosSection";
import ContactoSection from "@/components/ContactoSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ProyectosCarousel />
      <NosotrosSection />
      <ContactoSection />
    </>
  );
}
