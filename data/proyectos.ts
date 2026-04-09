export type FaseObra = {
  nombre: string;
  completada: boolean;
  activa: boolean;
};

export type Proyecto = {
  slug: string;
  nombre: string;
  estado: "En construccion" | "Entregado" | "Proximo lanzamiento";
  anioEntrega: number;
  tagline: string;
  descripcion: string;
  imagenHero: string;
  brochureUrl?: string;
  superficie: string;
  m2Totales: number;
  pisos: number;
  unidades: number;
  destacado: boolean;
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
    estado: "En construccion",
    anioEntrega: 2026,
    destacado: true,
    tagline: "Altura y diseño en el corazón de Salta",
    descripcion:
      "Tower One es un desarrollo residencial de alta gama ubicado en el microcentro salteño. Ofrece departamentos de 1, 2 y 3 dormitorios con vistas panorámicas a la ciudad y el Cerro San Bernardo.",
    imagenHero: "/proyectos/IES11_imgprinc.jpg",
    superficie: "65–120 m²",
    m2Totales: 6840,
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
      "/proyectos/IES11_imgprinc.jpg",
      "/proyectos/IES14_imgprinc.jpg",
      "/proyectos/images.jpeg",
      "/proyectos/IES11_imgprinc.jpg",
      "/proyectos/IES14_imgprinc.jpg",
    ],
    instalaciones: [
      { foto: "/proyectos/IES11_imgprinc.jpg", label: "Lobby" },
      { foto: "/proyectos/IES14_imgprinc.jpg", label: "Piscina" },
    ],
    planoMaestro: ["/proyectos/30-191112-plano-con-paisajismo-scaled.jpg"],
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
    estado: "Entregado",
    anioEntrega: 2023,
    destacado: true,
    tagline: "Vivir en armonía con la naturaleza",
    descripcion:
      "Urbanización cerrada con lotes de 400 a 800 m² rodeados de espacios verdes. Infraestructura completa: agua, gas, electricidad y acceso pavimentado.",
    imagenHero: "/proyectos/IES14_imgprinc.jpg",
    superficie: "400–800 m²",
    m2Totales: 28800,
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
      "/proyectos/IES14_imgprinc.jpg",
      "/proyectos/IES11_imgprinc.jpg",
      "/proyectos/images.jpeg",
      "/proyectos/IES14_imgprinc.jpg",
      "/proyectos/IES11_imgprinc.jpg",
    ],
    instalaciones: [
      { foto: "/proyectos/IES14_imgprinc.jpg", label: "Ingreso" },
      { foto: "/proyectos/images.jpeg", label: "Espacios verdes" },
    ],
    planoMaestro: ["/proyectos/30-191112-plano-con-paisajismo-scaled.jpg"],
    ubicacion: {
      direccion: "Ruta 51 km 12, Salta Capital",
      lat: -24.8102,
      lng: -65.389,
    },
    porcentajeAvance: 0,
    fasesObra: [],
  },
  {
    slug: "proyecto-prueba",
    nombre: "Proyecto Prueba",
    estado: "Entregado",
    anioEntrega: 2024,
    destacado: false,
    tagline: "Proyecto de prueba para testear filtros",
    descripcion: "Este es un proyecto de prueba para verificar que los filtros por estado funcionan correctamente en la sección de proyectos.",
    imagenHero: "/proyectos/IES14_imgprinc.jpg",
    superficie: "50–90 m²",
    m2Totales: 2000,
    pisos: 5,
    unidades: 20,
    amenities: [
      { icono: "parking", label: "Cocheras" },
      { icono: "security", label: "Seguridad 24hs" },
    ],
    galeria: [
      "/proyectos/IES14_imgprinc.jpg",
      "/proyectos/IES11_imgprinc.jpg",
    ],
    instalaciones: [
      { foto: "/proyectos/IES14_imgprinc.jpg", label: "Fachada" },
    ],
    planoMaestro: ["/proyectos/30-191112-plano-con-paisajismo-scaled.jpg"],
    ubicacion: {
      direccion: "Calle Prueba 123, Salta Capital",
      lat: -24.79,
      lng: -65.41,
    },
    porcentajeAvance: 100,
    fasesObra: [
      { nombre: "Fundaciones", completada: true, activa: false },
      { nombre: "Estructura", completada: true, activa: false },
      { nombre: "Terminaciones", completada: true, activa: false },
    ],
  },
  {
    slug: "centro-comercial-norte",
    nombre: "Centro Comercial Norte",
    estado: "Proximo lanzamiento",
    anioEntrega: 2027,
    destacado: true,
    tagline: "El nuevo polo comercial del norte salteño",
    descripcion:
      "Complejo comercial moderno con locales de distintos rubros, oficinas y estacionamiento para 200 vehículos. Zona de alto tráfico peatonal y vehicular.",
    imagenHero: "/proyectos/images.jpeg",
    superficie: "40–200 m²",
    m2Totales: 4200,
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
      "/proyectos/images.jpeg",
      "/proyectos/IES11_imgprinc.jpg",
      "/proyectos/IES14_imgprinc.jpg",
    ],
    instalaciones: [{ foto: "/proyectos/images.jpeg", label: "Fachada" }],
    planoMaestro: ["/proyectos/30-191112-plano-con-paisajismo-scaled.jpg"],
    ubicacion: {
      direccion: "Av. Virrey Toledo 1500, Salta Capital",
      lat: -24.7721,
      lng: -65.423,
    },
    porcentajeAvance: 0,
    fasesObra: [],
  },
];

export const ANIO_FUNDACION = 2014;

export function calcularMetricas(lista: Proyecto[]) {
  const anioActual = new Date().getFullYear();
  const aniosTrayectoria = anioActual - ANIO_FUNDACION;

  const enConstruccion = lista.filter((p) => p.estado === "En construccion");
  const entregados = lista.filter((p) => p.estado === "Entregado");

  const m2EnDesarrollo = enConstruccion.reduce(
    (acc, p) => acc + p.m2Totales,
    0,
  );
  const slugsUnicos = new Set(lista.map((p) => p.slug));
  return {
    aniosTrayectoria,
    m2EnDesarrollo,
    proyectosEnDesarrollo: enConstruccion.length,
    proyectosEntregados: entregados.length,
    totalProyectos: slugsUnicos.size,
  };
}
