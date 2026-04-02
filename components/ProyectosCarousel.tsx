"use client";

import { useState } from "react";
import Link from "next/link";
import { proyectos } from "@/data/proyectos";

const ESTADO_BADGE: Record<string, string> = {
  "En construccion": "En construcción",
  "Entregado": "Entregado",
  "Proximo lanzamiento": "Próximo lanzamiento",
};

export default function ProyectosCarousel() {
  const [current, setCurrent] = useState(0);
  const total = proyectos.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const visible = [
    proyectos[current % total],
    proyectos[(current + 1) % total],
    proyectos[(current + 2) % total],
  ];

  return (
    <section id="proyectos" className="bg-[#F5F4F2] py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="w-10 h-0.5 bg-[#C41230] mb-3" />
            <p className="text-[#C41230] text-xs font-bold tracking-[0.3em] uppercase mb-2">
              Desarrollos
            </p>
            <h2 className="text-[#1A1A1A] font-extrabold text-4xl md:text-5xl tracking-tight leading-none">
              Donde vivís<br />importa
            </h2>
          </div>
          <Link
            href="/proyectos"
            className="hidden md:flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-[#1A1A1A] hover:text-[#C41230] transition-colors"
          >
            Ver todos
            <span className="text-[#C41230]">→</span>
          </Link>
        </div>

        {/* Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-2">
          {visible.map((proyecto, i) => (
            <Link
              key={`${proyecto.slug}-${i}`}
              href={`/proyectos/${proyecto.slug}`}
              className={`group relative overflow-hidden ${
                i === 0 ? "h-[480px]" : "h-[480px] hidden md:block"
              }`}
            >
              {/* Placeholder image bg */}
              <div className="absolute inset-0 bg-[#2a2a2a] group-hover:scale-105 transition-transform duration-500" />

              {/* Counter on main card */}
              {i === 0 && (
                <div className="absolute top-5 right-5 z-10 text-white/60 text-xs font-bold tracking-widest">
                  {String(current + 1).padStart(2, "0")}/
                  {String(total).padStart(2, "0")}
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <p className="text-[#C41230] text-xs font-bold tracking-widest uppercase mb-1">
                  {proyecto.categoria}
                </p>
                <h3 className="text-white font-extrabold text-xl md:text-2xl tracking-tight mb-1">
                  {proyecto.nombre}
                </h3>
                <p className="text-white/60 text-xs font-medium">
                  {ESTADO_BADGE[proyecto.estado]} · {proyecto.anioEntrega}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-8">
          {/* Dots */}
          <div className="flex gap-2">
            {proyectos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-0.5 transition-all duration-300 ${
                  i === current ? "w-8 bg-[#1A1A1A]" : "w-4 bg-[#1A1A1A]/30"
                }`}
                aria-label={`Ir al proyecto ${i + 1}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex gap-3">
            <button
              onClick={prev}
              className="w-10 h-10 border border-[#1A1A1A]/30 flex items-center justify-center hover:border-[#1A1A1A] transition-colors text-[#1A1A1A]"
              aria-label="Anterior"
            >
              ←
            </button>
            <button
              onClick={next}
              className="w-10 h-10 border border-[#1A1A1A]/30 flex items-center justify-center hover:border-[#1A1A1A] transition-colors text-[#1A1A1A]"
              aria-label="Siguiente"
            >
              →
            </button>
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 md:hidden">
          <Link
            href="/proyectos"
            className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-[#1A1A1A]"
          >
            Ver todos <span className="text-[#C41230]">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
