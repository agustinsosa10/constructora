const METRICAS = [
  { valor: "+250", label: "Departamentos" },
  { valor: "+7", label: "Proyectos finalizados" },
  { valor: "6", label: "En ejecución" },
  { valor: "+10", label: "Años de experiencia" },
];

export default function NosotrosSection() {
  return (
    <section id="nosotros" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left: text + metrics */}
          <div>
            <div className="w-10 h-0.5 bg-[#C41230] mb-3" />
            <p className="text-[#C41230] text-xs font-bold tracking-[0.3em] uppercase mb-2">
              Nosotros
            </p>
            <h2 className="text-[#1A1A1A] font-extrabold text-4xl md:text-5xl tracking-tight leading-tight mb-6">
              Construimos<br />en Salta<br />desde hace más<br />de una década
            </h2>
            <p className="text-[#595959] text-base leading-relaxed mb-12 max-w-md">
              IES Desarrollos Inmobiliarios nació con el propósito de transformar
              la ciudad de Salta. Diseñamos y construimos espacios que combinan
              calidad arquitectónica, funcionalidad y valor a largo plazo.
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-0">
              {METRICAS.map((m, i) => (
                <div
                  key={m.label}
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
              ))}
            </div>
          </div>

          {/* Right: photo placeholder */}
          <div className="relative aspect-[4/5] bg-[#e8e6e3] flex items-center justify-center">
            <p className="text-[#595959]/40 text-sm font-medium">
              Foto institucional
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
