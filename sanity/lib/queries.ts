import { defineQuery } from 'next-sanity'

// Proyección completa de un proyecto — resuelve URLs de imágenes desde el CDN de Sanity
const PROYECTO_FIELDS = `
  "slug": slug.current,
  nombre,
  estado,
  anioEntrega,
  tagline,
  descripcion,
  "imagenHero": imagenHero.asset->url,
  "brochureUrl": brochureUrl.asset->url,
  superficie,
  m2Totales,
  pisos,
  unidades,
  destacado,
  amenities[] {
    icono,
    label,
  },
  "galeria": galeria[] {
    _key,
    "url": asset->url,
  },
  "planoMaestro": planoMaestro[] {
    _key,
    "url": asset->url,
  },
  ubicacion {
    direccion,
    mapUrl,
  },
  fasesObra[] {
    nombre,
    porcentaje,
  },
`

export const allProyectosQuery = defineQuery(`
  *[_type == "proyecto"] | order(_createdAt asc) {
    ${PROYECTO_FIELDS}
  }
`)

export const destacadosProyectosQuery = defineQuery(`
  *[_type == "proyecto" && destacado == true] | order(_createdAt asc) {
    ${PROYECTO_FIELDS}
  }
`)

export const proyectoBySlugQuery = defineQuery(`
  *[_type == "proyecto" && slug.current == $slug][0] {
    ${PROYECTO_FIELDS}
  }
`)

export const allSlugsQuery = defineQuery(`
  *[_type == "proyecto"] { "slug": slug.current }
`)
