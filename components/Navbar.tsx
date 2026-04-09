"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ alwaysDark }: { alwaysDark?: boolean } = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const enProyectos = pathname.startsWith("/proyectos");
  const esHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!esHome) return;

    const ids = ["hero", "nosotros", "proyectos", "contacto"];
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-10% 0px -60% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    function onScroll() {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80
      ) {
        setActiveSection("contacto");
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", onScroll);
    };
  }, [esHome]);

  // Cerrar menu al cambiar de ruta
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isDark = alwaysDark || scrolled || menuOpen;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDark ? "bg-[#1A1A1A] shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 h-18 flex items-center justify-between">
        <Link href="/" onClick={() => setMenuOpen(false)}>
          <Image
            src={
              isDark
                ? "/logos/logo-positivo.png"
                : "/logos/logo-monocromo-negativo.png"
            }
            alt="IES Desarrollos Inmobiliarios"
            width={120}
            height={40}
            className="h-8 w-auto object-contain drop-shadow-md"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div
          className={`hidden md:flex items-center gap-8 text-[10px] font-semibold tracking-[1.5px] text-white uppercase whitespace-nowrap `}
        >
          <Link
            href="/#hero"
            className={`transition-colors ${esHome && activeSection === "hero" ? "text-[#C41230]" : "hover:text-[#C41230]"}`}
          >
            Inicio
          </Link>
          <Link
            href="/#nosotros"
            className={`transition-colors ${esHome && activeSection === "nosotros" ? "text-[#C41230]" : "hover:text-[#C41230]"}`}
          >
            Nosotros
          </Link>
          <Link
            href={enProyectos ? "/proyectos" : "/#proyectos"}
            className={`transition-colors ${esHome && activeSection === "proyectos" ? "text-[#C41230]" : "hover:text-[#C41230]"}`}
          >
            Proyectos
          </Link>
          <Link
            href="/#contacto"
            className={`text-white px-5 py-2 text-xs font-semibold tracking-widest uppercase transition-colors ${esHome && activeSection === "contacto" ? "bg-red-800" : "bg-[#C41230] hover:bg-red-800"}`}
          >
            Consultanos
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] cursor-pointer ${!isDark ? "drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
          />
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden bg-[#1A1A1A] border-t border-white/10 overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4 gap-1 text-white text-sm font-semibold tracking-wide">
          <Link
            href="/#hero"
            onClick={() => setMenuOpen(false)}
            className="py-3 border-b border-white/10 hover:text-[#C41230] transition-colors"
          >
            Inicio
          </Link>
          <Link
            href="/#nosotros"
            onClick={() => setMenuOpen(false)}
            className="py-3 border-b border-white/10 hover:text-[#C41230] transition-colors"
          >
            Nosotros
          </Link>
          <Link
            href={enProyectos ? "/proyectos" : "/#proyectos"}
            onClick={() => setMenuOpen(false)}
            className="py-3 border-b border-white/10 hover:text-[#C41230] transition-colors"
          >
            Proyectos
          </Link>
          <Link
            href="/#contacto"
            onClick={() => setMenuOpen(false)}
            className="mt-3 bg-[#C41230] text-white text-xs font-bold tracking-widest uppercase px-5 py-3 text-center hover:bg-red-800 transition-colors"
          >
            Consultanos
          </Link>
        </div>
      </div>
    </nav>
  );
}
