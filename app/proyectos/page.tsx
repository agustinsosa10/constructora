"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { proyectos, Proyecto } from "@/data/proyectos";

type Categoria = "Urbanizacion" | "Residencial" | "Comercial";
type EstadoFiltro = "desarrollo" | "entregados";

const CATEGORIAS: { key: Categoria; label: string }[] = [
  { key: "Urbanizacion", label: "Urbanizaciones" },
  { key: "Residencial", label: "Residencial" },
  { key: "Comercial", label: "Comercial" },
];

function getGridCols(count: number): string {
  if (count === 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-2";
  return "grid-cols-3";
}

function StatusPill({ estado }: { estado: Proyecto["estado"] }) {
  if (estado === "En construccion") {
    return (
      <span className="text-[9px] font-bold tracking-[1.5px] uppercase px-2.5 py-1 text-white bg-[#C41230]">
        En construcción
      </span>
    );
  }
  if (estado === "Proximo lanzamiento") {
    return (
      <span className="text-[9px] font-bold tracking-[1.5px] uppercase px-2.5 py-1 text-white bg-black/50 border border-white/25">
        Próximo lanzamiento
      </span>
    );
  }
  return null;
}

function ProyectoCard({ proyecto, entregado }: { proyecto: Proyecto; entregado: boolean }) {
  return (
    <Link href={`/proyectos/${proyecto.slug}`} className="group block">
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

        {/* Pill de estado (esquina superior izquierda) */}
        {!entregado && (
          <div className="absolute top-4 left-4">
            <StatusPill estado={proyecto.estado} />
          </div>
        )}

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
  const [categoriaActiva, setCategoriaActiva] = useState<Categoria>("Urbanizacion");
  const [estadoPorCategoria, setEstadoPorCategoria] = useState<Record<Categoria, EstadoFiltro>>({
    Urbanizacion: "desarrollo",
    Residencial: "desarrollo",
    Comercial: "desarrollo",
  });

  const estadoActivo = estadoPorCategoria[categoriaActiva];

  const proyectosFiltrados = proyectos.filter((p) => {
    if (p.categoria !== categoriaActiva) return false;
    if (estadoActivo === "desarrollo") {
      return p.estado === "En construccion" || p.estado === "Proximo lanzamiento";
    }
    return p.estado === "Entregado";
  });

  const totalDesarrollo = proyectos.filter(
    (p) =>
      p.categoria === categoriaActiva &&
      (p.estado === "En construccion" || p.estado === "Proximo lanzamiento")
  ).length;

  const totalEntregados = proyectos.filter(
    (p) => p.categoria === categoriaActiva && p.estado === "Entregado"
  ).length;

  const count = estadoActivo === "desarrollo" ? totalDesarrollo : totalEntregados;

  function setEstado(estado: EstadoFiltro) {
    setEstadoPorCategoria((prev) => ({ ...prev, [categoriaActiva]: estado }));
  }

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
            <h1
              className="text-[42px] md:text-[52px] font-extrabold text-[#1A1A1A] leading-none tracking-[-1.5px] mb-10"
            >
              Nuestros
              <br />
              desarrollos
            </h1>
          </ScrollReveal>

          {/* Tabs nivel 1 — categorías */}
          <div className="flex border-b border-[#e8e8e8]">
            {CATEGORIAS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setCategoriaActiva(key)}
                className={`relative py-3.5 pr-8 text-[11px] font-bold tracking-[2px] uppercase transition-colors duration-150 cursor-pointer ${
                  categoriaActiva === key ? "text-[#1A1A1A]" : "text-[#aaa] hover:text-[#555]"
                } ${key === "Urbanizacion" ? "pl-0" : "pl-0"}`}
              >
                {label}
                {categoriaActiva === key && (
                  <span className="absolute bottom-[-1px] left-0 right-8 h-[2px] bg-[#C41230]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Contenido */}
        <div className="bg-white px-8 md:px-16 pb-20">
          {/* Header de estado */}
          <div className="flex items-center justify-between py-10">
            <div className="flex items-baseline gap-3">
              <span className="text-[11px] font-extrabold tracking-[3px] uppercase text-[#999]">
                {estadoActivo === "desarrollo" ? "En desarrollo" : "Entregados"}
              </span>
              <span className="text-[10px] font-bold text-[#C41230]">
                {count} {count === 1 ? "proyecto" : "proyectos"}
              </span>
            </div>

            {/* Toggle nivel 2 */}
            <div className="flex border border-[#e0e0e0] overflow-hidden">
              <button
                onClick={() => setEstado("desarrollo")}
                className={`px-5 py-2.5 text-[10px] font-bold tracking-[1.5px] uppercase transition-all duration-150 cursor-pointer ${
                  estadoActivo === "desarrollo"
                    ? "bg-[#1A1A1A] text-white"
                    : "bg-white text-[#aaa] hover:bg-[#f5f5f5] hover:text-[#555]"
                }`}
              >
                En desarrollo
              </button>
              <button
                onClick={() => setEstado("entregados")}
                className={`px-5 py-2.5 text-[10px] font-bold tracking-[1.5px] uppercase transition-all duration-150 cursor-pointer ${
                  estadoActivo === "entregados"
                    ? "bg-[#1A1A1A] text-white"
                    : "bg-white text-[#aaa] hover:bg-[#f5f5f5] hover:text-[#555]"
                }`}
              >
                Entregados
              </button>
            </div>
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
                  <ProyectoCard
                    proyecto={p}
                    entregado={p.estado === "Entregado"}
                  />
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
