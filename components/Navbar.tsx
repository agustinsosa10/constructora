"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#1A1A1A] shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logos/logo-negativo.png"
            alt="IES Desarrollos Inmobiliarios"
            width={120}
            height={40}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-white text-sm font-semibold tracking-wide">
          <Link href="/#proyectos" className="hover:text-[#C41230] transition-colors">
            Proyectos
          </Link>
          <Link href="/#nosotros" className="hover:text-[#C41230] transition-colors">
            Nosotros
          </Link>
          <Link href="/#contacto" className="hover:text-[#C41230] transition-colors">
            Contacto
          </Link>
          <Link
            href="/#contacto"
            className="bg-[#C41230] text-white px-5 py-2 text-xs font-bold tracking-widest uppercase hover:bg-red-800 transition-colors"
          >
            Consultanos
          </Link>
        </div>
      </div>
    </nav>
  );
}
