import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-start bg-[#1A1A1A] overflow-hidden"
    >
      {/* Background overlay — replace with next/image when real photo available */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent z-10" />
      <div className="absolute inset-0 bg-[#2a2a2a]" /> {/* placeholder bg */}

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 py-32">
        <p className="text-[#C41230] text-xs font-bold tracking-[0.3em] uppercase mb-4">
          Salta Capital
        </p>
        <h1 className="text-white font-extrabold tracking-tight leading-none text-5xl md:text-7xl lg:text-8xl mb-6 max-w-2xl">
          Construimos<br />el futuro<br />de Salta
        </h1>
        <p className="text-white/70 text-lg md:text-xl max-w-md mb-10 leading-relaxed">
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
