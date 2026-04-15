export type FaseObra = {
  nombre: string
  porcentaje: number
}

// Imagen resuelta como URL directa desde el CDN de Sanity
export type SanityImageAsset = {
  _key?: string
  url: string
}

export type SanityProyecto = {
  slug: string
  nombre: string
  estado: 'En construccion' | 'Entregado' | 'Proximo lanzamiento'
  anioEntrega: number
  tagline: string
  descripcion: string
  imagenHero: string          // URL directa del CDN de Sanity (resuelta via asset->url en GROQ)
  brochureUrl?: string
  superficie: string
  m2Totales: number
  pisos: number
  unidades: number
  destacado: boolean
  amenities: { icono: string; label: string }[]
  galeria: SanityImageAsset[] // Array de { _key, url }
  planoMaestro: SanityImageAsset[] // Array de { _key, url }
  ubicacion: { direccion: string; mapUrl?: string }
  fasesObra: FaseObra[]
}
