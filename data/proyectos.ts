export type FaseObra = {
  nombre: string;
  completada: boolean;
  activa: boolean;
};

export type Proyecto = {
  slug: string;
  nombre: string;
  categoria: "Residencial" | "Urbanizacion" | "Comercial";
  estado: "En construccion" | "Entregado" | "Proximo lanzamiento";
  anioEntrega: number;
  tagline: string;
  descripcion: string;
  imagenHero: string;
  brochureUrl?: string;
  superficie: string;
  pisos: number;
  unidades: number;
  amenities: { icono: string; label: string }[];
  galeria: string[];
  instalaciones: { foto: string; label: string }[];
  planoMaestro: string[];
  ubicacion: { direccion: string; lat: number; lng: number };
  porcentajeAvance: number;
  fasesObra: FaseObra[];
};

export const proyectos: Proyecto[] = [
  {
    slug: "tower-one",
    nombre: "Tower One",
    categoria: "Residencial",
    estado: "En construccion",
    anioEntrega: 2026,
    tagline: "Altura y diseño en el corazón de Salta",
    descripcion:
      "Tower One es un desarrollo residencial de alta gama ubicado en el microcentro salteño. Ofrece departamentos de 1, 2 y 3 dormitorios con vistas panorámicas a la ciudad y el Cerro San Bernardo.",
    imagenHero: "/images/placeholder-hero.jpg",
    superficie: "65–120 m²",
    pisos: 18,
    unidades: 72,
    amenities: [
      { icono: "pool", label: "Piscina" },
      { icono: "gym", label: "Gimnasio" },
      { icono: "parking", label: "Cocheras" },
      { icono: "terrace", label: "Terraza" },
      { icono: "security", label: "Seguridad 24hs" },
    ],
    galeria: [
      "/images/placeholder-1.jpg",
      "/images/placeholder-2.jpg",
      "/images/placeholder-3.jpg",
      "/images/placeholder-4.jpg",
      "/images/placeholder-5.jpg",
    ],
    instalaciones: [
      { foto: "/images/placeholder-1.jpg", label: "Lobby" },
      { foto: "/images/placeholder-2.jpg", label: "Piscina" },
    ],
    planoMaestro: ["/images/placeholder-plano.jpg"],
    ubicacion: {
      direccion: "Av. Entre Ríos 200, Salta Capital",
      lat: -24.7859,
      lng: -65.4117,
    },
    porcentajeAvance: 65,
    fasesObra: [
      { nombre: "Fundaciones", completada: true, activa: false },
      { nombre: "Estructura", completada: true, activa: false },
      { nombre: "Mampostería", completada: false, activa: true },
      { nombre: "Instalaciones", completada: false, activa: false },
      { nombre: "Terminaciones", completada: false, activa: false },
    ],
  },
  {
    slug: "los-aromos",
    nombre: "Los Aromos",
    categoria: "Urbanizacion",
    estado: "Entregado",
    anioEntrega: 2023,
    tagline: "Vivir en armonía con la naturaleza",
    descripcion:
      "Urbanización cerrada con lotes de 400 a 800 m² rodeados de espacios verdes. Infraestructura completa: agua, gas, electricidad y acceso pavimentado.",
    imagenHero: "/images/placeholder-hero.jpg",
    superficie: "400–800 m²",
    pisos: 1,
    unidades: 48,
    amenities: [
      { icono: "park", label: "Parque" },
      { icono: "security", label: "Seguridad 24hs" },
      { icono: "playground", label: "Juegos" },
      { icono: "walking", label: "Senderos" },
      { icono: "parking", label: "Estacionamiento" },
    ],
    galeria: [
      "/images/placeholder-1.jpg",
      "/images/placeholder-2.jpg",
      "/images/placeholder-3.jpg",
      "/images/placeholder-4.jpg",
      "/images/placeholder-5.jpg",
    ],
    instalaciones: [
      { foto: "/images/placeholder-1.jpg", label: "Ingreso" },
      { foto: "/images/placeholder-2.jpg", label: "Espacios verdes" },
    ],
    planoMaestro: ["/images/placeholder-plano.jpg"],
    ubicacion: {
      direccion: "Ruta 51 km 12, Salta Capital",
      lat: -24.8102,
      lng: -65.389,
    },
    porcentajeAvance: 0,
    fasesObra: [],
  },
  {
    slug: "centro-comercial-norte",
    nombre: "Centro Comercial Norte",
    categoria: "Comercial",
    estado: "Proximo lanzamiento",
    anioEntrega: 2027,
    tagline: "El nuevo polo comercial del norte salteño",
    descripcion:
      "Complejo comercial moderno con locales de distintos rubros, oficinas y estacionamiento para 200 vehículos. Zona de alto tráfico peatonal y vehicular.",
    imagenHero: "/images/placeholder-hero.jpg",
    superficie: "40–200 m²",
    pisos: 3,
    unidades: 35,
    amenities: [
      { icono: "parking", label: "200 Cocheras" },
      { icono: "elevator", label: "Ascensores" },
      { icono: "security", label: "Seguridad 24hs" },
      { icono: "ac", label: "Clima central" },
      { icono: "wifi", label: "WiFi" },
    ],
    galeria: [
      "/images/placeholder-1.jpg",
      "/images/placeholder-2.jpg",
      "/images/placeholder-3.jpg",
    ],
    instalaciones: [
      { foto: "/images/placeholder-1.jpg", label: "Fachada" },
    ],
    planoMaestro: ["/images/placeholder-plano.jpg"],
    ubicacion: {
      direccion: "Av. Virrey Toledo 1500, Salta Capital",
      lat: -24.7721,
      lng: -65.423,
    },
    porcentajeAvance: 0,
    fasesObra: [],
  },
];
