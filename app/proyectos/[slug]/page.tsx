"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import ScrollReveal from "@/components/ScrollReveal";
import { proyectos, Proyecto } from "@/data/proyectos";

// ── Icon map ────────────────────────────────────────────────────────────────
const AMENITY_ICONS: Record<string, string> = {
  pool: "🏊",
  gym: "🏋️",
  parking: "🚗",
  terrace: "🌇",
  security: "🛡️",
  park: "🌳",
  playground: "🎪",
  walking: "🚶",
  elevator: "🛗",
  ac: "❄️",
  wifi: "📶",
};

function getAmenityIcon(key: string): string {
  return AMENITY_ICONS[key] ?? "✦";
}

// ── Helpers ─────────────────────────────────────────────────────────────────
function estadoLabel(estado: Proyecto["estado"]): string {
  if (estado === "En construccion") return "En desarrollo";
  if (estado === "Proximo lanzamiento") return "Próximo lanzamiento";
  return "Entregado";
}

function unidadLabel(categoria: Proyecto["categoria"], n: number): string {
  const singular: Record<Proyecto["categoria"], string> = {
    Residencial: "depto",
    Urbanizacion: "lote",
    Comercial: "local",
  };
  const plural: Record<Proyecto["categoria"], string> = {
    Residencial: "deptos",
    Urbanizacion: "lotes",
    Comercial: "locales",
  };
  return `${n} ${n === 1 ? singular[categoria] : plural[categoria]}`;
}

// ── Subnav ───────────────────────────────────────────────────────────────────
const SECTIONS = [
  { id: "descripcion", label: "Descripción" },
  { id: "avance", label: "Avance de obra" },
  { id: "amenities", label: "Amenities" },
  { id: "galeria", label: "Galería" },
  { id: "plano", label: "Plano maestro" },
  { id: "ubicacion", label: "Ubicación" },
  { id: "contacto", label: "Contacto" },
];

function SubnavSticky({
  proyecto,
  showAvance,
}: {
  proyecto: Proyecto;
  showAvance: boolean;
}) {
  const [activeId, setActiveId] = useState("descripcion");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const ids = SECTIONS.filter(
      (s) => showAvance || s.id !== "avance"
    ).map((s) => s.id);

    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    function onScroll() {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80) {
        setActiveId("contacto");
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", onScroll);
    };
  }, [showAvance]);

  const visibleSections = SECTIONS.filter(
    (s) => showAvance || s.id !== "avance"
  );

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveId(id);
    setMenuOpen(false);
  }

  const activeLabel = visibleSections.find((s) => s.id === activeId)?.label ?? visibleSections[0]?.label;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A] border-b border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-[72px] flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logos/logo-negativo.png"
            alt="IES Desarrollos Inmobiliarios"
            width={120}
            height={40}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>

        {/* Secciones — desktop */}
        <div className="hidden lg:flex items-center overflow-x-auto scrollbar-none flex-1 justify-end">
          {visibleSections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`relative h-[72px] px-4 text-[10px] font-bold tracking-[1.5px] uppercase transition-colors duration-150 cursor-pointer whitespace-nowrap flex-shrink-0 ${
                activeId === s.id
                  ? "text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {s.label}
              {activeId === s.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C41230]" />
              )}
            </button>
          ))}
        </div>

        {/* Sección activa — mobile (center) */}
        <div className="lg:hidden flex-1 text-center">
          <span className="text-[10px] font-bold tracking-[1.5px] uppercase text-white/60">
            {activeLabel}
          </span>
        </div>

        {/* Brochure — desktop */}
        {proyecto.brochureUrl ? (
          <a
            href={proyecto.brochureUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex flex-shrink-0 items-center gap-2 text-[10px] font-bold tracking-[1px] uppercase text-[#C41230] hover:text-red-400 transition-colors"
          >
            <span className="w-7 h-7 border border-[#C41230] flex items-center justify-center text-xs">
              ↓
            </span>
            Brochure
          </a>
        ) : null}

        {/* Hamburger — mobile */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] flex-shrink-0 cursor-pointer"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <span className={`block w-5 h-[2px] bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-5 h-[2px] bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-[2px] bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`lg:hidden bg-[#1A1A1A] border-t border-white/10 overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 py-2">
          {visibleSections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`flex items-center justify-between py-3.5 border-b border-white/10 text-[11px] font-bold tracking-[1.5px] uppercase transition-colors text-left cursor-pointer ${
                activeId === s.id ? "text-[#C41230]" : "text-white/50 hover:text-white"
              }`}
            >
              {s.label}
              {activeId === s.id && <span className="w-1.5 h-1.5 rounded-full bg-[#C41230]" />}
            </button>
          ))}

          {proyecto.brochureUrl && (
            <a
              href={proyecto.brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 py-4 text-[11px] font-bold tracking-[1px] uppercase text-[#C41230] hover:text-red-400 transition-colors"
            >
              <span className="w-6 h-6 border border-[#C41230] flex items-center justify-center text-xs">↓</span>
              Descargar Brochure
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Secciones ────────────────────────────────────────────────────────────────
function SectionHeader({
  label,
  title,
  dark,
}: {
  label: string;
  title: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-12">
      <span className="block text-[10px] font-bold tracking-[3px] uppercase text-[#C41230] mb-2.5">
        {label}
      </span>
      <p
        className={`text-[32px] font-extrabold tracking-[-0.8px] ${
          dark ? "text-white" : "text-[#1A1A1A]"
        }`}
      >
        {title}
      </p>
    </div>
  );
}

function SecDescripcion({ proyecto }: { proyecto: Proyecto }) {
  return (
    <section
      id="descripcion"
      className="scroll-mt-[72px] bg-white px-6 md:px-16 py-18"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
        {/* Texto */}
        <ScrollReveal delay={0}>
          <div>
            <h2 className="text-[34px] font-extrabold text-[#1A1A1A] tracking-[-1px] leading-[1.1] mb-6">
              {proyecto.nombre}
            </h2>
            <p className="text-[14px] text-[#595959] leading-[1.75]">
              {proyecto.descripcion}
            </p>
          </div>
        </ScrollReveal>

        {/* Ficha técnica */}
        <ScrollReveal delay={100}>
          <div className="flex flex-col gap-5">
          <div className="flex gap-4 items-start pb-5 border-b border-[#f0f0f0]">
            <div className="w-9 h-9 bg-[#F5F4F2] flex items-center justify-center text-base flex-shrink-0">
              📍
            </div>
            <div>
              <p className="text-[9px] text-[#aaa] font-bold tracking-[2px] uppercase mb-1">
                Ubicación
              </p>
              <p className="text-[14px] text-[#1A1A1A] font-semibold">
                {proyecto.ubicacion.direccion}
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start pb-5 border-b border-[#f0f0f0]">
            <div className="w-9 h-9 bg-[#F5F4F2] flex items-center justify-center text-base flex-shrink-0">
              📐
            </div>
            <div>
              <p className="text-[9px] text-[#aaa] font-bold tracking-[2px] uppercase mb-1">
                Superficie
              </p>
              <p className="text-[14px] text-[#1A1A1A] font-semibold">
                {proyecto.superficie}
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start pb-5 border-b border-[#f0f0f0]">
            <div className="w-9 h-9 bg-[#F5F4F2] flex items-center justify-center text-base flex-shrink-0">
              🏢
            </div>
            <div>
              <p className="text-[9px] text-[#aaa] font-bold tracking-[2px] uppercase mb-1">
                {proyecto.categoria === "Urbanizacion"
                  ? "Lotes"
                  : proyecto.categoria === "Residencial"
                  ? "Unidades"
                  : "Locales"}
              </p>
              <p className="text-[14px] text-[#1A1A1A] font-semibold">
                {unidadLabel(proyecto.categoria, proyecto.unidades)}
                {proyecto.categoria !== "Urbanizacion" &&
                  ` · ${proyecto.pisos} pisos`}
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-9 h-9 bg-[#F5F4F2] flex items-center justify-center text-base flex-shrink-0">
              📅
            </div>
            <div>
              <p className="text-[9px] text-[#aaa] font-bold tracking-[2px] uppercase mb-1">
                Entrega estimada
              </p>
              <p className="text-[14px] text-[#1A1A1A] font-semibold">
                {proyecto.anioEntrega}
              </p>
            </div>
          </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function SecAvance({ proyecto }: { proyecto: Proyecto }) {
  return (
    <section
      id="avance"
      className="scroll-mt-[72px] bg-[#F5F4F2] px-6 md:px-16 py-18"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal delay={0}>
          <span className="block text-[10px] font-bold tracking-[3px] uppercase text-[#C41230] mb-8">
            Avance de obra
          </span>
        </ScrollReveal>
        <ScrollReveal delay={100}>
        <div className="grid grid-cols-[200px_1fr] gap-16 items-start">
          {/* Porcentaje grande */}
          <div>
            <div className="text-[72px] font-extrabold text-[#1A1A1A] tracking-[-3px] leading-none">
              {proyecto.porcentajeAvance}
              <span className="text-[22px] font-semibold text-[#595959]">
                %
              </span>
            </div>
            <p className="text-[10px] font-bold tracking-[2px] uppercase text-[#aaa] mt-2">
              completado
            </p>
          </div>

          {/* Fases */}
          <div className="flex flex-col gap-5">
            {proyecto.fasesObra.map((fase) => {
              const isPending = !fase.completada && !fase.activa;
              const barWidth = fase.completada
                ? 100
                : fase.activa
                ? proyecto.porcentajeAvance
                : 0;

              return (
                <div
                  key={fase.nombre}
                  className="grid grid-cols-[160px_1fr_44px] gap-4 items-center"
                >
                  <span
                    className={`text-[11px] font-bold tracking-[0.5px] ${
                      isPending ? "text-[#bbb]" : "text-[#1A1A1A]"
                    }`}
                  >
                    {fase.nombre}
                  </span>
                  <div className="h-[4px] bg-[#e0e0e0] relative">
                    <div
                      className={`absolute left-0 top-0 h-[4px] transition-all duration-500 ${
                        fase.completada ? "bg-[#1A1A1A]" : "bg-[#C41230]"
                      }`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                  <span
                    className={`text-[11px] font-bold text-right ${
                      isPending ? "text-[#ccc]" : "text-[#1A1A1A]"
                    }`}
                  >
                    {isPending ? "—" : fase.completada ? "100%" : `${barWidth}%`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function SecAmenities({ proyecto }: { proyecto: Proyecto }) {
  return (
    <section
      id="amenities"
      className="scroll-mt-[72px] bg-white px-6 md:px-16 py-18"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal delay={0}>
          <SectionHeader label="Infraestructura" title="Todo lo que necesitás" />
        </ScrollReveal>
        <ScrollReveal delay={100}>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-[2px]">
          {proyecto.amenities.map((a) => (
            <div
              key={a.label}
              className="bg-[#fafafa] py-7 px-5 flex flex-col items-center gap-3"
            >
              <span className="text-2xl">{getAmenityIcon(a.icono)}</span>
              <span className="text-[10px] font-bold tracking-[1px] uppercase text-[#1A1A1A] text-center">
                {a.label}
              </span>
            </div>
          ))}
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/92 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Imagen */}
      <div
        className="relative w-full max-w-5xl mx-6 aspect-[16/10]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[index]}
          alt={`Foto ${index + 1}`}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
      </div>

      {/* Cerrar */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors text-xl cursor-pointer"
        aria-label="Cerrar"
      >
        ✕
      </button>

      {/* Contador */}
      <div className="absolute top-6 left-6 text-white/50 text-[11px] font-bold tracking-[2px] uppercase">
        {index + 1} / {images.length}
      </div>

      {/* Prev */}
      {index > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors text-xl cursor-pointer"
          aria-label="Anterior"
        >
          ‹
        </button>
      )}

      {/* Next */}
      {index < images.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors text-xl cursor-pointer"
          aria-label="Siguiente"
        >
          ›
        </button>
      )}
    </div>
  );
}

function SecGaleria({ proyecto }: { proyecto: Proyecto }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const images = proyecto.galeria;
  const main = images[0];
  const thumbs = images.slice(1, 5);
  const extras = images.length - 5;

  const open = (i: number) => setLightboxIndex(i);
  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const next = useCallback(() => setLightboxIndex((i) => (i !== null && i < images.length - 1 ? i + 1 : i)), [images.length]);

  return (
    <section
      id="galeria"
      className="scroll-mt-[72px] bg-[#F5F4F2] px-6 md:px-16 py-18"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal delay={0}>
          <SectionHeader label="Galería" title="Así se ve el proyecto" />
        </ScrollReveal>

        {/* Imagen principal */}
        <div
          className="relative w-full aspect-[16/7] overflow-hidden mb-[2px] cursor-zoom-in group"
          onClick={() => open(0)}
        >
          {main && (
            <Image
              src={main}
              alt={`${proyecto.nombre} — galería`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="100vw"
            />
          )}
          <div className="absolute bottom-4 right-4 bg-black/50 text-white text-[10px] font-bold tracking-[1.5px] uppercase px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            Ver galería
          </div>
        </div>

        {/* Thumbs */}
        <div className="grid grid-cols-4 gap-[2px]">
          {thumbs.map((src, i) => {
            const isLast = i === thumbs.length - 1;
            const showMore = isLast && extras > 0;
            return (
              <div
                key={i}
                className="relative aspect-[4/3] overflow-hidden cursor-zoom-in group"
                onClick={() => open(showMore ? 0 : i + 1)}
              >
                <Image
                  src={src}
                  alt={`${proyecto.nombre} — foto ${i + 2}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="25vw"
                />
                {showMore ? (
                  <div className="absolute inset-0 bg-black/65 flex items-center justify-center">
                    <span className="text-white text-[18px] font-extrabold">
                      +{extras}
                    </span>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  );
}

function SecPlano({ proyecto }: { proyecto: Proyecto }) {
  const images = proyecto.planoMaestro;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const next = useCallback(() => setLightboxIndex((i) => (i !== null && i < images.length - 1 ? i + 1 : i)), [images.length]);

  return (
    <section
      id="plano"
      className="scroll-mt-[72px] bg-white px-6 md:px-16 py-18"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal delay={0}>
          <SectionHeader label="Plano maestro" title="Vista del desarrollo" />
        </ScrollReveal>
        <ScrollReveal delay={100}>
        <div
          className="relative w-full aspect-[16/7] overflow-hidden bg-[#e8e4dc] cursor-zoom-in group"
          onClick={() => images[0] && setLightboxIndex(0)}
        >
          {images[0] && (
            <Image
              src={images[0]}
              alt={`${proyecto.nombre} — plano maestro`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="100vw"
            />
          )}
          <div className="absolute bottom-4 right-4 bg-black/50 text-white text-[10px] font-bold tracking-[1.5px] uppercase px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            Ver plano
          </div>
        </div>
        </ScrollReveal>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  );
}

function SecUbicacion({ proyecto }: { proyecto: Proyecto }) {
  const { lat, lng, direccion } = proyecto.ubicacion;
  const mapsUrl = `https://maps.google.com/maps?q=${lat},${lng}&output=embed`;

  return (
    <section
      id="ubicacion"
      className="scroll-mt-[72px] bg-[#F5F4F2] px-6 md:px-16 py-18"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal delay={0}>
          <SectionHeader label="Ubicación" title="Cómo llegar" />
        </ScrollReveal>
        <ScrollReveal delay={100}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-12 items-start">
          <div className="flex flex-col gap-6">
            <p className="text-[22px] font-bold text-[#1A1A1A] tracking-[-0.3px] leading-[1.3]">
              {direccion}
            </p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#C41230] text-white text-[11px] font-bold tracking-[1px] uppercase px-6 py-3 hover:bg-red-800 transition-colors self-start"
            >
              Ver en Google Maps →
            </a>
          </div>
          <div className="w-full aspect-[16/9]">
            <iframe
              src={mapsUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de ubicación"
              className="w-full h-full"
            />
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function SecContacto({ proyecto }: { proyecto: Proyecto }) {
  return (
    <section
      id="contacto"
      className="scroll-mt-[72px] bg-[#1A1A1A] px-6 md:px-16 py-18"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
        <ScrollReveal delay={0}>
          <div>
            <span className="block text-[10px] font-bold tracking-[3px] uppercase text-[#C41230] mb-3">
              Contacto
            </span>
            <p className="text-[32px] font-extrabold text-white tracking-[-0.8px] mb-4">
              ¿Te interesa este proyecto?
            </p>
            <p className="text-[13px] text-white/40">
              Dejanos tus datos y un asesor te contacta a la brevedad.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Nombre y apellido"
              className="bg-white/[0.06] border border-white/10 px-4 py-3.5 text-[12px] text-white/60 placeholder:text-white/30 outline-none focus:border-white/25 transition-colors font-[Montserrat]"
            />
            <input
              type="tel"
              placeholder="Teléfono"
              className="bg-white/[0.06] border border-white/10 px-4 py-3.5 text-[12px] text-white/60 placeholder:text-white/30 outline-none focus:border-white/25 transition-colors font-[Montserrat]"
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            className="bg-white/[0.06] border border-white/10 px-4 py-3.5 text-[12px] text-white/60 placeholder:text-white/30 outline-none focus:border-white/25 transition-colors font-[Montserrat]"
          />
          <textarea
            placeholder="¿Alguna consulta puntual?"
            rows={4}
            className="bg-white/[0.06] border border-white/10 px-4 py-3.5 text-[12px] text-white/60 placeholder:text-white/30 outline-none focus:border-white/25 transition-colors resize-none font-[Montserrat]"
          />
          <button
            type="submit"
            className="self-start bg-[#C41230] text-white text-[11px] font-bold tracking-[1.5px] uppercase px-8 py-3.5 hover:bg-red-800 transition-colors mt-1 cursor-pointer"
          >
            Enviar consulta →
          </button>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function ProyectoSlugPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0];
  const proyecto = proyectos.find((p) => p.slug === slug);

  if (!proyecto) return notFound();

  const showAvance =
    proyecto.estado === "En construccion" && proyecto.porcentajeAvance > 0;

  return (
    <>
      <SubnavSticky proyecto={proyecto} showAvance={showAvance} />

      {/* Hero */}
      <div className="relative h-[860px] mt-[72px] bg-[#1A1A1A]">
        <Image
          src={proyecto.imagenHero}
          alt={proyecto.nombre}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        {/* Contenido */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-12 z-10">
          {/* Categoría + estado */}
          <ScrollReveal delay={0}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-white/50 text-[10px] font-bold tracking-[2.5px] uppercase">
                {proyecto.categoria === "Urbanizacion"
                  ? "Urbanización"
                  : proyecto.categoria}
              </span>
              <div className="w-1 h-1 rounded-full bg-[#C41230]" />
              <span className="text-[9px] font-bold tracking-[1.5px] uppercase px-2.5 py-1 text-white bg-[#C41230]">
                {estadoLabel(proyecto.estado)}
              </span>
            </div>
          </ScrollReveal>

          {/* Título */}
          <ScrollReveal delay={120}>
            <h1 className="text-[54px] md:text-[60px] font-extrabold text-white tracking-[-2px] leading-[0.95] mb-4">
              {proyecto.nombre}
            </h1>
          </ScrollReveal>

          {/* Tagline */}
          <ScrollReveal delay={240}>
            <p className="text-white/55 text-[15px] mb-8 max-w-lg">
              {proyecto.tagline}
            </p>
          </ScrollReveal>

          {/* Métricas + CTAs */}
          <ScrollReveal delay={360}>
          <div className="flex gap-10 items-center flex-wrap">
            <div className="flex flex-col gap-1">
              <span className="text-white/35 text-[9px] font-bold tracking-[2px] uppercase">
                Entrega estimada
              </span>
              <span className="text-white text-[14px] font-bold">
                {proyecto.anioEntrega}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white/35 text-[9px] font-bold tracking-[2px] uppercase">
                {proyecto.categoria === "Urbanizacion"
                  ? "Lotes"
                  : proyecto.categoria === "Residencial"
                  ? "Unidades"
                  : "Locales"}
              </span>
              <span className="text-white text-[14px] font-bold">
                {unidadLabel(proyecto.categoria, proyecto.unidades)}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white/35 text-[9px] font-bold tracking-[2px] uppercase">
                Superficie
              </span>
              <span className="text-white text-[14px] font-bold">
                {proyecto.superficie}
              </span>
            </div>

            <div className="h-9 w-[1px] bg-white/15" />

            <div className="flex gap-3">
              <a
                href="#contacto"
                className="bg-[#C41230] text-white text-[11px] font-bold tracking-[1px] uppercase px-6 py-3 hover:bg-red-800 transition-colors"
              >
                Consultar
              </a>
              {proyecto.brochureUrl && (
                <a
                  href={proyecto.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/35 text-white text-[11px] font-bold tracking-[1px] uppercase px-6 py-3 hover:border-white/60 transition-colors"
                >
                  ↓ Brochure
                </a>
              )}
            </div>
          </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Secciones */}
      <main>
        <SecDescripcion proyecto={proyecto} />
        {showAvance && <SecAvance proyecto={proyecto} />}
        <SecAmenities proyecto={proyecto} />
        <SecGaleria proyecto={proyecto} />
        <SecPlano proyecto={proyecto} />
        <SecUbicacion proyecto={proyecto} />
        <SecContacto proyecto={proyecto} />
      </main>
    </>
  );
}
