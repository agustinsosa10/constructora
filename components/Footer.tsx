import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

const LINKS_PROYECTOS = [
  { label: "Ver todos", href: "/proyectos" },
  { label: "Residencial", href: "/proyectos?cat=Residencial" },
  { label: "Urbanizaciones", href: "/proyectos?cat=Urbanizacion" },
  { label: "Comercial", href: "/proyectos?cat=Comercial" },
];

const LINKS_EMPRESA = [
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Contacto", href: "/#contacto" },
  { label: "Trabaja con nosotros", href: "/#contacto" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] py-16">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Col 1: Logo + tagline + socials */}
          <ScrollReveal delay={0}>
            <div>
              <Image
                src="/logos/logo-negativo.png"
                alt="IES Desarrollos"
                width={110}
                height={36}
                className="h-8 w-auto object-contain mb-4"
              />
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Construimos el futuro de Salta
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/50 hover:border-white/60 hover:text-white transition-colors text-xs"
                  aria-label="Instagram"
                >
                  IG
                </a>
                <a
                  href="#"
                  className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/50 hover:border-white/60 hover:text-white transition-colors text-xs"
                  aria-label="Facebook"
                >
                  FB
                </a>
                <a
                  href="#"
                  className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/50 hover:border-white/60 hover:text-white transition-colors text-xs"
                  aria-label="LinkedIn"
                >
                  LI
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Col 2: Proyectos */}
          <ScrollReveal delay={100}>
            <div>
              <p className="text-white text-xs font-bold tracking-widest uppercase mb-5">
                Proyectos
              </p>
              <ul className="space-y-3">
                {LINKS_PROYECTOS.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-white/50 text-sm hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Col 3: Empresa */}
          <ScrollReveal delay={150}>
            <div>
              <p className="text-white text-xs font-bold tracking-widest uppercase mb-5">
                Empresa
              </p>
              <ul className="space-y-3">
                {LINKS_EMPRESA.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-white/50 text-sm hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Col 4: Contact info */}
          <ScrollReveal delay={200}>
            <div>
              <p className="text-white text-xs font-bold tracking-widest uppercase mb-5">
                Contacto
              </p>
              <div className="space-y-3">
                <p className="text-white/50 text-sm">Salta Capital, Argentina</p>
                <a
                  href="https://wa.me/5493874000000"
                  className="block text-white/50 text-sm hover:text-white transition-colors"
                >
                  +54 9 387 400-0000
                </a>
                <a
                  href="mailto:info@iesdesarrollos.com.ar"
                  className="block text-white/50 text-sm hover:text-white transition-colors"
                >
                  info@iesdesarrollos.com.ar
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Copyright bar */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-white/30 text-xs text-center">
            © {new Date().getFullYear()} IES Desarrollos Inmobiliarios. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
