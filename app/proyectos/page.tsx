"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { proyectos, Proyecto } from "@/data/proyectos";

type EstadoTab = "Todos" | "Proximo lanzamiento" | "En construccion" | "Entregado";

const TABS: { key: EstadoTab; label: string }[] = [
  { key: "Todos", label: "Todos" },
  { key: "Proximo lanzamiento", label: "Próximamente" },
  { key: "En construccion", label: "En desarrollo" },
  { key: "Entregado", label: "Entregado" },
];

function getGridCols(count: number): string {
  if (count === 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-2";
  return "grid-cols-3";
}

function ProyectoCard({ proyecto }: { proyecto: Proyecto }) {
  const entregado = proyecto.estado === "Entregado";
  return (
    <Link href={`/proyectos/${proyecto.slug}`} target="_blank" rel="noopener noreferrer" className="group block">
      <div className="relative overflow-hidden cursor-pointer bg-[#1a1a1a] aspect-[3/4]">
        {/* Imagen */}
        <div className="absolute inset-0">
          <Image
            src={proyecto.imagenHero}
            alt={proyecto.nombre}
            fill
            className={`object-cover transition-transform duration-500 group-hover:scale-[1.03] ${
              entregado ? "[filter:grayscale(35%)]" : ""
            }`}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Overlay degradado */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

        {/* Flecha (esquina superior derecha, aparece en hover) */}
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/12 flex items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          →
        </div>

        {/* Info inferior */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-white/45 text-[10px] font-semibold tracking-[2px] mb-1.5 uppercase">
            {entregado
              ? `Entregado ${proyecto.anioEntrega} · ${proyecto.categoria}`
              : `Entrega ${proyecto.anioEntrega} · ${proyecto.categoria}`}
          </p>
          <p className="text-white text-lg font-extrabold leading-tight tracking-tight">
            {proyecto.nombre}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function ProyectosPage() {
  const [tabActiva, setTabActiva] = useState<EstadoTab>("Todos");

  const proyectosFiltrados =
    tabActiva === "Todos" ? proyectos : proyectos.filter((p) => p.estado === tabActiva);
  const count = proyectosFiltrados.length;

  return (
    <>
      <Navbar alwaysDark />

      <main className="pt-[72px] min-h-screen">
        {/* Header de página */}
        <div className="bg-white px-8 md:px-16 pt-14 pb-0">
          {/* Breadcrumb */}
          <p className="text-[10px] text-[#aaa] tracking-[1.5px] uppercase mb-6">
            <Link href="/" className="hover:text-[#C41230] transition-colors">
              Inicio
            </Link>
            {" / "}
            <span className="text-[#C41230]">Proyectos</span>
          </p>

          {/* Título */}
          <ScrollReveal delay={0}>
            <h1 className="text-[42px] md:text-[52px] font-extrabold text-[#1A1A1A] leading-none tracking-[-1.5px] mb-10">
              Nuestros
              <br />
              desarrollos
            </h1>
          </ScrollReveal>

          {/* Tabs — estado */}
          <div className="flex border-b border-[#e8e8e8]">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTabActiva(key)}
                className={`relative py-3.5 pr-8 text-[11px] font-bold tracking-[2px] uppercase transition-colors duration-150 cursor-pointer ${
                  tabActiva === key ? "text-[#1A1A1A]" : "text-[#aaa] hover:text-[#555]"
                }`}
              >
                {label}
                {tabActiva === key && (
                  <span className="absolute bottom-[-1px] left-0 right-8 h-[2px] bg-[#C41230]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Contenido */}
        <div className="bg-white px-8 md:px-16 pb-20">
          {/* Contador */}
          <div className="flex items-baseline gap-3 py-10">
            <span className="text-[11px] font-extrabold tracking-[3px] uppercase text-[#999]">
              {TABS.find((t) => t.key === tabActiva)?.label}
            </span>
            <span className="text-[10px] font-bold text-[#C41230]">
              {count} {count === 1 ? "proyecto" : "proyectos"}
            </span>
          </div>

          {/* Grid de cards */}
          {proyectosFiltrados.length > 0 ? (
            <div
              className={`grid gap-[2px] ${getGridCols(proyectosFiltrados.length)} ${
                proyectosFiltrados.length === 1 ? "max-w-sm" : ""
              }`}
            >
              {proyectosFiltrados.map((p, i) => (
                <ScrollReveal key={p.slug} delay={i * 80}>
                  <ProyectoCard proyecto={p} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-[13px] font-medium text-[#ccc]">
                No hay proyectos en esta categoría por el momento.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
