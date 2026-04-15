import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { calcularMetricas } from "@/lib/metricas";

// Clases de borde por ítem para 2 breakpoints:
//   default (< md): grid 2 cols, 3 filas (2+2+2)
//   md+:            grid 3 cols, 2 filas (3+3)
const METRIC_BORDER_CLASSES = [
  // i=0 — 2-col col0 row0 / 3-col col0 row0 → igual en ambos
  "py-6 border-r border-b border-[#1A1A1A]/10 pr-8",
  // i=1 — 2-col col1 row0 / 3-col col1 row0 (agrega border-r, px-8)
  "py-6 border-b border-[#1A1A1A]/10 pl-8 md:border-r md:px-8",
  // i=2 — 2-col col0 row1 / 3-col col2 row0 (quita border-r en md, pl-8)
  "py-6 border-r border-b border-[#1A1A1A]/10 pr-8 md:border-r-0 md:pl-8 md:pr-0",
  // i=3 — 2-col col1 row1 / 3-col col0 row1 (quita border-b en md, agrega border-r, pr-8)
  "py-6 border-b border-[#1A1A1A]/10 pl-8 md:border-b-0 md:border-r md:pr-8 md:pl-0",
  // i=4 — 2-col col0 row2 / 3-col col1 row1 (border-r en ambos, px-8 en md)
  "py-6 border-r border-[#1A1A1A]/10 pr-8 md:px-8",
  // i=5 — 2-col col1 row2 / 3-col col2 row1 (solo pl-8, sin bordes)
  "py-6 border-[#1A1A1A]/10 pl-8",
];

type Metricas = ReturnType<typeof calcularMetricas>

export default function NosotrosSection({ metricas }: { metricas: Metricas }) {
  const {
    aniosTrayectoria,
    m2EnDesarrollo,
    proyectosEnDesarrollo,
    proyectosEntregados,
    totalProyectos,
  } = metricas;

  const METRICAS = [
    { valor: `+${aniosTrayectoria}`, label: "Años de trayectoria" },
    {
      valor: `+${m2EnDesarrollo.toLocaleString("es-AR")}`,
      label: "M² desarrollados",
    },
    { valor: "+25", label: "Miembros del equipo" },
    { valor: String(totalProyectos), label: "Proyectos totales" },
    { valor: `+${proyectosEntregados}`, label: "Proyectos entregados" },
    { valor: String(proyectosEnDesarrollo), label: "Proyectos en desarrollo" },
  ];

  return (
    <section id="nosotros" className="bg-white">
      {/* Fila 1 — Texto + Imagen */}
      <div className="py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-stretch">
            {/* Texto */}
            <div className="flex flex-col justify-between">
              <div>
                <ScrollReveal delay={0}>
                  <div className="w-10 h-0.5 bg-[#C41230] mb-3" />
                  <p className="text-[#C41230] text-sm font-bold tracking-[0.3em] uppercase mb-2">
                    Nosotros
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={100}>
                  <h2 className="text-[#1A1A1A] font-extrabold text-4xl md:text-5xl tracking-tight leading-tight mb-6">
                    Más de una
                    <br />
                    década
                    <br />
                    transformando
                    <br />
                    Salta
                  </h2>
                </ScrollReveal>
                <ScrollReveal delay={200}>
                  <p className="text-[15px] text-[#595959] leading-[1.75]">
                    IES Desarrollos Inmobiliarios nació con el propósito de
                    transformar la ciudad de Salta. Diseñamos y construimos
                    espacios que combinan calidad arquitectónica, funcionalidad y
                    valor a largo plazo.
                  </p>
                </ScrollReveal>
              </div>
            </div>

            {/* Imagen — h-full para igualar la altura del texto */}
            <ScrollReveal delay={150} className="min-h-[350px]">
              <div className="relative h-full min-h-[350px] overflow-hidden">
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
      </div>

      {/* Banda de métricas — fondo blanco */}
      <div className="bg-white py-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <ScrollReveal delay={250}>
            <div className="border-t border-[#1A1A1A]/10 pt-10 mb-10 text-center">
              <p className="text-[#C41230] text-3xl font-semibold tracking-[0.2em] uppercase">
                Resultados que generan confianza
              </p>
            </div>
          </ScrollReveal>

          {/* Grid: 2 cols en mobile, 3 cols en md+ */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-0 overflow-hidden">
            {METRICAS.map((m, i) => (
              <ScrollReveal key={m.label} delay={300 + i * 70}>
                <div className={`${METRIC_BORDER_CLASSES[i]} flex flex-col items-center text-center overflow-hidden`}>
                  <div className="w-6 h-0.5 bg-[#C41230] mb-3" />
                  <p className="text-[#1A1A1A] font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                    {m.valor}
                  </p>
                  <p className="text-[#595959] text-[13px] sm:text-[15px] mt-2">{m.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
