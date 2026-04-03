import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

const METRICAS = [
  { valor: "+250", label: "Departamentos" },
  { valor: "+7", label: "Proyectos finalizados" },
  { valor: "6", label: "En ejecución" },
  { valor: "+10", label: "Años de experiencia" },
];

export default function NosotrosSection() {
  return (
    <section id="nosotros" className="bg-white py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left: text + metrics */}
          <div>
            <ScrollReveal delay={0}>
              <div className="w-10 h-0.5 bg-[#C41230] mb-3" />
              <p className="text-[#C41230] text-xs font-bold tracking-[0.3em] uppercase mb-2">
                Nosotros
              </p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-[#1A1A1A] font-extrabold text-4xl md:text-5xl tracking-tight leading-tight mb-6">
                Construimos<br />en Salta<br />desde hace más<br />de una década
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-[#595959] text-base leading-relaxed mb-12 max-w-md">
                IES Desarrollos Inmobiliarios nació con el propósito de transformar
                la ciudad de Salta. Diseñamos y construimos espacios que combinan
                calidad arquitectónica, funcionalidad y valor a largo plazo.
              </p>
            </ScrollReveal>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-0">
              {METRICAS.map((m, i) => (
                <ScrollReveal key={m.label} delay={300 + i * 60}>
                  <div
                    className={`py-6 pr-8 ${
                      i % 2 === 0 ? "border-r border-[#1A1A1A]/10" : "pl-8 pr-0"
                    } ${i < 2 ? "border-b border-[#1A1A1A]/10" : ""}`}
                  >
                    <div className="w-6 h-0.5 bg-[#C41230] mb-3" />
                    <p className="text-[#1A1A1A] font-extrabold text-3xl tracking-tight">
                      {m.valor}
                    </p>
                    <p className="text-[#595959] text-sm mt-1">{m.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Right: photo */}
          <ScrollReveal delay={150}>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/ies.jpeg"
                alt="IES Desarrollos Inmobiliarios"
                fill
                className="object-cover transition-transform duration-500 ease-in-out hover:scale-110"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
