"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import type { SanityProyecto } from "@/lib/sanity/types";
type Proyecto = SanityProyecto;

type EstadoTab =
  | "Todos"
  | "Proximo lanzamiento"
  | "En construccion"
  | "Entregado";

const ESTADO_LABEL: Record<string, string> = {
  "En construccion": "En desarrollo",
  Entregado: "Entregado",
  "Proximo lanzamiento": "Próximamente",
};

const ESTADO_BADGE: Record<string, string> = {
  "En construccion": "bg-[#C41230] text-white",
  Entregado: "bg-[#1A1A1A] text-white",
  "Proximo lanzamiento": "border border-[#C41230] text-[#C41230]",
};

const TABS: { key: EstadoTab; label: string }[] = [
  { key: "Todos", label: "Ver todos" },
  { key: "Proximo lanzamiento", label: "Próximamente" },
  { key: "En construccion", label: "En desarrollo" },
  { key: "Entregado", label: "Entregados" },
];

function ProyectoCard({ proyecto, index }: { proyecto: Proyecto; index: number }) {
  return (
    <Link
      href={`/proyectos/${proyecto.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full"
    >
      {/* Imagen */}
      <div className="relative overflow-hidden aspect-[16/10] bg-[#1a1a1a]">
        <Image
          src={proyecto.imagenHero}
          alt={proyecto.nombre}
          fill
          priority={index < 3}
          className={`object-cover transition-transform duration-500 group-hover:scale-[1.04] ${
            proyecto.estado === "Entregado" ? "[filter:grayscale(35%)]" : ""
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Bloque de texto */}
      <div className="pt-4 pb-5 border-b-2 border-transparent group-hover:border-[#C41230] transition-colors duration-500">
        {/* Badge de estado */}
        <span
          className={`inline-block text-[9px] font-bold tracking-[2px] uppercase px-2 py-1 mb-3 ${
            ESTADO_BADGE[proyecto.estado]
          }`}
        >
          {ESTADO_LABEL[proyecto.estado]}
        </span>

        {/* Nombre */}
        <p className="text-[#1A1A1A] text-xl font-extrabold leading-tight tracking-tight mb-1">
          {proyecto.nombre}
        </p>

        {/* Dirección */}
        <p className="text-[#999] text-xs mb-3 flex items-center gap-1">
          <span aria-hidden="true">📍</span>
          {proyecto.ubicacion.direccion}
        </p>

        {/* Stats */}
        <p className="text-[10px] text-[#aaa] font-semibold tracking-wide">
          {proyecto.superficie}
          {" · "}
          {proyecto.unidades} unidades
          {" · "}
          {proyecto.pisos} {proyecto.pisos === 1 ? "piso" : "pisos"}
        </p>
      </div>
    </Link>
  );
}

const VALID_ESTADOS: EstadoTab[] = [
  "Todos",
  "Proximo lanzamiento",
  "En construccion",
  "Entregado",
];

function ProyectosInner({ proyectos }: { proyectos: Proyecto[] }) {
  const searchParams = useSearchParams();
  const estadoParam = searchParams.get("estado") as EstadoTab | null;
  const initialTab =
    estadoParam && VALID_ESTADOS.includes(estadoParam) ? estadoParam : "Todos";
  const [tabActiva, setTabActiva] = useState<EstadoTab>(initialTab);

  useEffect(() => {
    const param = searchParams.get("estado") as EstadoTab | null;
    if (param && VALID_ESTADOS.includes(param)) setTabActiva(param);
    else setTabActiva("Todos");
  }, [searchParams]);

  const proyectosFiltrados =
    tabActiva === "Todos"
      ? proyectos
      : proyectos.filter((p) => p.estado === tabActiva);
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
          <div className="flex overflow-x-auto overflow-y-hidden scrollbar-none border-b border-[#e8e8e8]">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTabActiva(key)}
                className={`relative py-3.5 pr-6 md:pr-8 text-[11px] font-bold tracking-[2px] uppercase transition-colors duration-150 cursor-pointer whitespace-nowrap flex-shrink-0 ${
                  tabActiva === key
                    ? "text-[#1A1A1A]"
                    : "text-[#aaa] hover:text-[#555]"
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
            <div className="grid gap-x-6 gap-y-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {proyectosFiltrados.map((p, i) => (
                <ScrollReveal key={p.slug} delay={i * 80} className="w-full">
                  <ProyectoCard proyecto={p} index={i} />
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

export default function ProyectosContent({ proyectos }: { proyectos: Proyecto[] }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#C41230] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ProyectosInner proyectos={proyectos} />
    </Suspense>
  );
}
