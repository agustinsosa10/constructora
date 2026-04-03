import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[100vh] overflow-hidden"
    >
      {/* Placeholder bg — reemplazar con next/image cuando haya foto real */}
      <div className="absolute inset-0 bg-[#2a2a2a]" />

      <Image
        src="/hero.jpg"
        fill
        className="object-cover"
        priority
        alt="Proyecto IES Desarrollos"
      />
     

      {/* Overlay sutil para dar profundidad a la imagen */}
      <div className="absolute inset-0 bg-black/25 z-10" />

      {/* Gradiente inferior — de transparente a oscuro */}
      <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/70 to-transparent z-20" />

      {/* Contenido sobre la banda inferior */}
      <div className="absolute bottom-0 left-0 right-0 z-30 max-w-[1440px] mx-auto px-6 md:px-12 pb-16 md:pb-24">
        <p className="text-[#C41230] text-xs font-bold tracking-[0.3em] uppercase mb-3">
          Salta Capital
        </p>
        <h1 className="text-white font-extrabold tracking-tight leading-none text-5xl md:text-7xl lg:text-8xl mb-5 max-w-3xl">
          Construimos<br />el futuro<br />de Salta
        </h1>
        <p className="text-white/70 text-base md:text-lg max-w-md mb-8 leading-relaxed">
          Desarrollos residenciales, urbanizaciones y espacios comerciales
          pensados para Salta Capital.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/#proyectos"
            className="inline-block bg-[#C41230] text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-red-800 transition-colors"
          >
            Ver Proyectos
          </Link>
          <Link
            href="/#contacto"
            className="inline-block border border-white/40 text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:border-white transition-colors"
          >
            Contactanos
          </Link>
        </div>
      </div>
    </section>
  );
}
