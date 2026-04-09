"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { proyectos } from "@/data/proyectos";
import ScrollReveal from "@/components/ScrollReveal";

const ESTADO_BADGE: Record<string, string> = {
  "En construccion": "En desarrollo",
  Entregado: "Entregado",
  "Proximo lanzamiento": "Próximo lanzamiento",
};

const CARDS_VISIBLE_MAX = 3;
const destacados = proyectos.filter((p) => p.destacado);
const total = destacados.length;
// Si hay menos proyectos que el máximo de cards visibles, no se necesita loop infinito
const cardsVisible = Math.min(CARDS_VISIBLE_MAX, total);
const canNavigate = total > CARDS_VISIBLE_MAX;
const track = canNavigate
  ? [...destacados, ...destacados.slice(0, cardsVisible)]
  : [...destacados];

const GAP = 8; // gap-2 = 8px
// Con 3 cards: hover crece a 1.6x, las otras bajan a 0.7x (1.6 + 0.7 + 0.7 = 3.0 ✓)
// Con 2 cards: expansión más sutil para que no sea tan brusco (1.2 + 0.8 = 2.0 ✓)
const hoverGrow = cardsVisible === 2 ? 1.2 : 1.6;
const hoverShrink = cardsVisible === 2 ? 0.8 : 0.7;
const BASE_W = `calc(${100 / cardsVisible}% - ${(GAP * (cardsVisible - 1)) / cardsVisible}px)`;
const HOVER_W = `calc(${(100 / cardsVisible) * hoverGrow}% - ${(GAP * (cardsVisible - 1)) / cardsVisible}px)`;
const SHRINK_W = `calc(${(100 / cardsVisible) * hoverShrink}% - ${(GAP * (cardsVisible - 1)) / cardsVisible}px)`;

export default function ProyectosCarousel() {
  const [current, setCurrent] = useState(0);
  const [animated, setAnimated] = useState(true);
  const [hovered, setHovered] = useState<number | null>(null);
  const transitioning = useRef(false);
  const touchStartX = useRef<number | null>(null);

  // Desktop: usa transitioning guard + infinite loop
  const prev = () => {
    if (transitioning.current) return;
    transitioning.current = true;
    setAnimated(true);
    setCurrent((c) => c - 1);
  };

  const next = () => {
    if (transitioning.current) return;
    transitioning.current = true;
    setAnimated(true);
    setCurrent((c) => c + 1);
  };

  // Mobile: sin guard de transición (no hay CSS transition que dispare onTransitionEnd)
  const mobilePrev = () => setCurrent((c) => (c - 1 + total) % total);
  const mobileNext = () => setCurrent((c) => (c + 1) % total);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      delta > 0 ? mobileNext() : mobilePrev();
    }
    touchStartX.current = null;
  };

  const goTo = (i: number) => {
    setAnimated(true);
    setCurrent(Math.min(i, total - 1));
  };

  const handleTransitionEnd = () => {
    transitioning.current = false;
    if (current >= total) {
      setAnimated(false);
      setCurrent(current - total);
    }
    if (current < 0) {
      setAnimated(false);
      setCurrent(total + current);
    }
  };

  const dotIndex = ((current % total) + total) % total;

  const cardWidthPct = 100 / cardsVisible;
  const translateX = -(current * cardWidthPct);
  const translateGap = current * GAP * ((cardsVisible - 1) / cardsVisible);

  // Determina el ancho de cada card según hover
  const getWidth = (i: number) => {
    if (hovered === null) return BASE_W;
    if (i === hovered) return HOVER_W;
    const visible = i >= current && i < current + cardsVisible;
    if (visible) return SHRINK_W;
    return BASE_W;
  };

  return (
    <section id="proyectos" className="bg-[#F5F4F2] py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Header */}
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="w-10 h-0.5 bg-[#C41230] mb-3" />
              <p className="text-[#C41230] text-xs font-bold tracking-[0.3em] uppercase mb-2">
                Desarrollos
              </p>
              <h2 className="text-[#1A1A1A] font-extrabold text-4xl md:text-5xl tracking-tight leading-none">
                Nuestros desarrollos
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
        </ScrollReveal>

        {/* Carousel — desktop */}
        <div className="hidden md:block overflow-hidden">
          <div
            className="flex gap-2"
            style={{
              transform: `translateX(calc(${translateX}% - ${translateGap}px))`,
              transition: animated
                ? "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)"
                : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {track.map((proyecto, i) => (
              <Link
                key={`${proyecto.slug}-${i}`}
                href={`/proyectos/${proyecto.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden h-[480px] flex-shrink-0"
                style={{
                  width: getWidth(i),
                  transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <Image
                  src={proyecto.imagenHero}
                  alt={proyecto.nombre}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {i === current && (
                  <div className="absolute top-5 right-5 z-10 text-white/60 text-xs font-bold tracking-widest">
                    {String(dotIndex + 1).padStart(2, "0")}/
                    {String(total).padStart(2, "0")}
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-white font-extrabold text-xl md:text-2xl tracking-tight mb-1">
                    {proyecto.nombre}
                  </h3>
                  <p className="text-xs font-semibold">
                    <span className="text-[#C41230]">
                      {ESTADO_BADGE[proyecto.estado]}
                    </span>
                    <span className="text-white/50"> · </span>
                    <span className="text-white/60">
                      {proyecto.anioEntrega}
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Carousel — mobile */}
        <div
          className="md:hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Link
            href={`/proyectos/${destacados[dotIndex].slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden h-[420px] block w-full"
          >
            <Image
              src={destacados[dotIndex].imagenHero}
              alt={destacados[dotIndex].nombre}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute top-5 right-5 z-10 text-white/60 text-xs font-bold tracking-widest">
              {String(dotIndex + 1).padStart(2, "0")}/
              {String(total).padStart(2, "0")}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <h3 className="text-white font-extrabold text-xl tracking-tight mb-1">
                {destacados[dotIndex].nombre}
              </h3>
              <p className="text-xs font-semibold">
                <span className="text-[#C41230]">
                  {ESTADO_BADGE[destacados[dotIndex].estado]}
                </span>
                <span className="text-white/50"> · </span>
                <span className="text-white/60">
                  {destacados[dotIndex].anioEntrega}
                </span>
              </p>
            </div>
          </Link>
        </div>

        {/* Controls — mobile */}
        <div className="flex md:hidden items-center justify-between mt-8">
          <div className="flex gap-2">
            {destacados.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-0.5 transition-all duration-300 ${
                  i === dotIndex ? "w-8 bg-[#1A1A1A]" : "w-4 bg-[#1A1A1A]/30"
                }`}
                aria-label={`Ir al proyecto ${i + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={mobilePrev}
              className="w-10 h-10 border border-[#1A1A1A]/30 flex items-center justify-center hover:border-[#1A1A1A] transition-colors text-[#1A1A1A]"
              aria-label="Anterior"
            >
              ←
            </button>
            <button
              onClick={mobileNext}
              className="w-10 h-10 border border-[#1A1A1A]/30 flex items-center justify-center hover:border-[#1A1A1A] transition-colors text-[#1A1A1A]"
              aria-label="Siguiente"
            >
              →
            </button>
          </div>
        </div>

        {/* Controls — desktop (solo si hay más proyectos que cards visibles) */}
        {canNavigate && (
          <div className="hidden md:flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {destacados.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-0.5 transition-all duration-300 ${
                    i === dotIndex ? "w-8 bg-[#1A1A1A]" : "w-4 bg-[#1A1A1A]/30"
                  }`}
                  aria-label={`Ir al proyecto ${i + 1}`}
                />
              ))}
            </div>
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
        )}

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
