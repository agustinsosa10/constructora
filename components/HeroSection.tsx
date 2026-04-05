"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";

// Agregar más imágenes al array cuando estén disponibles
const SLIDES = [
  "/hero.jpg",
  "/proyectos/IES11_imgprinc.jpg",
  "/proyectos/IES14_imgprinc.jpg",
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    if (SLIDES.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((c) => {
        setPrev(c);
        return (c + 1) % SLIDES.length;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  function goTo(index: number) {
    if (index === current) return;
    setPrev(current);
    setCurrent(index);
  }

  return (
    <section id="hero" className="relative min-h-[100vh] overflow-hidden">
      {/* Fondo fallback */}
      <div className="absolute inset-0 bg-[#2a2a2a]" />

      {/* Slides */}
      {SLIDES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 2 : i === prev ? 1 : 0 }}
        >
          <Image
            src={src}
            fill
            className="object-cover"
            priority={i === 0}
            alt={`IES Desarrollos — slide ${i + 1}`}
          />
        </div>
      ))}

      {/* Overlay sutil */}
      <div className="absolute inset-0 bg-black/25 z-10" />

      {/* Gradiente inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/70 to-transparent z-20" />

      {/* Contenido */}
      <div className="absolute bottom-0 left-0 right-0 z-30 max-w-[1440px] mx-auto px-6 md:px-12 pb-16 md:pb-24">
        <ScrollReveal delay={0}>
          <p className="text-[#C41230] text-xs font-bold tracking-[0.3em] uppercase mb-3">
            Salta Capital
          </p>
        </ScrollReveal>
        <ScrollReveal delay={120}>
          <h1 className="text-white font-extrabold tracking-tight leading-none text-5xl md:text-7xl lg:text-8xl mb-5 max-w-3xl">
            Construimos<br />el futuro<br />de Salta
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={240}>
          <p className="text-white/70 text-base md:text-lg max-w-md mb-8 leading-relaxed">
            Desarrollos residenciales, urbanizaciones y espacios comerciales
            pensados para Salta Capital.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={360}>
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
        </ScrollReveal>

        {/* Dots — solo visibles si hay más de 1 slide */}
        {SLIDES.length > 1 && (
          <div className="flex gap-2 mt-8">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ir a slide ${i + 1}`}
                className={`h-[3px] transition-all duration-300 ${
                  i === current
                    ? "bg-[#C41230] w-8"
                    : "bg-white/40 w-4 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
