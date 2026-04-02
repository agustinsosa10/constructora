import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProyectosCarousel from "@/components/ProyectosCarousel";
import NosotrosSection from "@/components/NosotrosSection";
import ContactoSection from "@/components/ContactoSection";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ScrollReveal>
        <ProyectosCarousel />
      </ScrollReveal>
      <ScrollReveal>
        <NosotrosSection />
      </ScrollReveal>
      <ScrollReveal>
        <ContactoSection />
      </ScrollReveal>
      <ScrollReveal>
        <Footer />
      </ScrollReveal>
    </>
  );
}
