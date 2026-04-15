/**
 * Script de migración: carga los proyectos hardcodeados en Sanity
 *
 * Uso:
 *   npx ts-node --esm scripts/migrate-to-sanity.ts
 *
 * Requiere en .env.local (o variables de entorno):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_TOKEN  (con rol Editor o Administrator)
 */

import * as dotenv from 'dotenv'
import * as path from 'path'
import * as fs from 'fs'
import { createClient } from '@sanity/client'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const TOKEN = process.env.SANITY_API_TOKEN

if (!PROJECT_ID || PROJECT_ID === 'REEMPLAZAR_CON_PROJECT_ID') {
  console.error('❌ Falta NEXT_PUBLIC_SANITY_PROJECT_ID en .env.local')
  process.exit(1)
}

if (!TOKEN || TOKEN === 'REEMPLAZAR_CON_TOKEN') {
  console.error('❌ Falta SANITY_API_TOKEN en .env.local')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-01-01',
  token: TOKEN,
  useCdn: false,
})

// ---------------------------------------------------------------------------
// Sube una imagen local a Sanity y devuelve la referencia
// ---------------------------------------------------------------------------
async function uploadImage(localPath: string): Promise<{ _type: 'image'; asset: { _type: 'reference'; _ref: string } } | null> {
  const fullPath = path.join(process.cwd(), 'public', localPath)

  if (!fs.existsSync(fullPath)) {
    console.warn(`  ⚠️  Imagen no encontrada: ${fullPath}`)
    return null
  }

  const filename = path.basename(fullPath)
  const ext = path.extname(filename).toLowerCase().slice(1)
  const contentType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png'

  console.log(`  📤 Subiendo imagen: ${filename}`)
  const stream = fs.createReadStream(fullPath)
  const asset = await client.assets.upload('image', stream, { filename, contentType })

  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
  }
}

// ---------------------------------------------------------------------------
// Datos de proyectos (copiados de /data/proyectos.ts para evitar imports)
// ---------------------------------------------------------------------------
const proyectos = [
  {
    slug: 'tower-one',
    nombre: 'Tower One',
    estado: 'En construccion',
    anioEntrega: 2026,
    destacado: true,
    tagline: 'Altura y diseño en el corazón de Salta',
    descripcion: 'Tower One es un desarrollo residencial de alta gama ubicado en el microcentro salteño. Ofrece departamentos de 1, 2 y 3 dormitorios con vistas panorámicas a la ciudad y el Cerro San Bernardo.',
    imagenHero: '/proyectos/IES11_imgprinc.jpg',
    superficie: '65–120 m²',
    m2Totales: 6840,
    pisos: 18,
    unidades: 72,
    amenities: [
      { icono: 'pool', label: 'Piscina' },
      { icono: 'gym', label: 'Gimnasio' },
      { icono: 'parking', label: 'Cocheras' },
      { icono: 'terrace', label: 'Terraza' },
      { icono: 'security', label: 'Seguridad 24hs' },
    ],
    galeria: ['/proyectos/IES11_imgprinc.jpg', '/proyectos/IES14_imgprinc.jpg', '/proyectos/images.jpeg'],
    instalaciones: [
      { foto: '/proyectos/IES11_imgprinc.jpg', label: 'Lobby' },
      { foto: '/proyectos/IES14_imgprinc.jpg', label: 'Piscina' },
    ],
    planoMaestro: ['/proyectos/30-191112-plano-con-paisajismo-scaled.jpg'],
    ubicacion: { direccion: 'Av. Entre Ríos 200, Salta Capital', lat: -24.7859, lng: -65.4117 },
    porcentajeAvance: 65,
    fasesObra: [
      { nombre: 'Fundaciones', completada: true, activa: false },
      { nombre: 'Estructura', completada: true, activa: false },
      { nombre: 'Mampostería', completada: false, activa: true },
      { nombre: 'Instalaciones', completada: false, activa: false },
      { nombre: 'Terminaciones', completada: false, activa: false },
    ],
  },
  {
    slug: 'los-aromos',
    nombre: 'Los Aromos',
    estado: 'Entregado',
    anioEntrega: 2023,
    destacado: true,
    tagline: 'Vivir en armonía con la naturaleza',
    descripcion: 'Urbanización cerrada con lotes de 400 a 800 m² rodeados de espacios verdes. Infraestructura completa: agua, gas, electricidad y acceso pavimentado.',
    imagenHero: '/proyectos/IES14_imgprinc.jpg',
    superficie: '400–800 m²',
    m2Totales: 28800,
    pisos: 1,
    unidades: 48,
    amenities: [
      { icono: 'park', label: 'Parque' },
      { icono: 'security', label: 'Seguridad 24hs' },
      { icono: 'playground', label: 'Juegos' },
      { icono: 'walking', label: 'Senderos' },
      { icono: 'parking', label: 'Estacionamiento' },
    ],
    galeria: ['/proyectos/IES14_imgprinc.jpg', '/proyectos/IES11_imgprinc.jpg', '/proyectos/images.jpeg'],
    instalaciones: [
      { foto: '/proyectos/IES14_imgprinc.jpg', label: 'Ingreso' },
      { foto: '/proyectos/images.jpeg', label: 'Espacios verdes' },
    ],
    planoMaestro: ['/proyectos/30-191112-plano-con-paisajismo-scaled.jpg'],
    ubicacion: { direccion: 'Ruta 51 km 12, Salta Capital', lat: -24.8102, lng: -65.389 },
    porcentajeAvance: 0,
    fasesObra: [],
  },
  {
    slug: 'proyecto-prueba',
    nombre: 'Proyecto Prueba',
    estado: 'Entregado',
    anioEntrega: 2024,
    destacado: false,
    tagline: 'Proyecto de prueba para testear filtros',
    descripcion: 'Este es un proyecto de prueba para verificar que los filtros por estado funcionan correctamente en la sección de proyectos.',
    imagenHero: '/proyectos/IES14_imgprinc.jpg',
    superficie: '50–90 m²',
    m2Totales: 2000,
    pisos: 5,
    unidades: 20,
    amenities: [
      { icono: 'parking', label: 'Cocheras' },
      { icono: 'security', label: 'Seguridad 24hs' },
    ],
    galeria: ['/proyectos/IES14_imgprinc.jpg', '/proyectos/IES11_imgprinc.jpg'],
    instalaciones: [{ foto: '/proyectos/IES14_imgprinc.jpg', label: 'Fachada' }],
    planoMaestro: ['/proyectos/30-191112-plano-con-paisajismo-scaled.jpg'],
    ubicacion: { direccion: 'Calle Prueba 123, Salta Capital', lat: -24.79, lng: -65.41 },
    porcentajeAvance: 100,
    fasesObra: [
      { nombre: 'Fundaciones', completada: true, activa: false },
      { nombre: 'Estructura', completada: true, activa: false },
      { nombre: 'Terminaciones', completada: true, activa: false },
    ],
  },
  {
    slug: 'centro-comercial-norte',
    nombre: 'Centro Comercial Norte',
    estado: 'Proximo lanzamiento',
    anioEntrega: 2027,
    destacado: true,
    tagline: 'El nuevo polo comercial del norte salteño',
    descripcion: 'Complejo comercial moderno con locales de distintos rubros, oficinas y estacionamiento para 200 vehículos. Zona de alto tráfico peatonal y vehicular.',
    imagenHero: '/proyectos/images.jpeg',
    superficie: '40–200 m²',
    m2Totales: 4200,
    pisos: 3,
    unidades: 35,
    amenities: [
      { icono: 'parking', label: '200 Cocheras' },
      { icono: 'elevator', label: 'Ascensores' },
      { icono: 'security', label: 'Seguridad 24hs' },
      { icono: 'ac', label: 'Clima central' },
      { icono: 'wifi', label: 'WiFi' },
    ],
    galeria: ['/proyectos/images.jpeg', '/proyectos/IES11_imgprinc.jpg', '/proyectos/IES14_imgprinc.jpg'],
    instalaciones: [{ foto: '/proyectos/images.jpeg', label: 'Fachada' }],
    planoMaestro: ['/proyectos/30-191112-plano-con-paisajismo-scaled.jpg'],
    ubicacion: { direccion: 'Av. Virrey Toledo 1500, Salta Capital', lat: -24.7721, lng: -65.423 },
    porcentajeAvance: 0,
    fasesObra: [],
  },
]

// ---------------------------------------------------------------------------
// Caché de imágenes ya subidas para no subirlas duplicadas
// ---------------------------------------------------------------------------
const imageCache = new Map<string, { _type: 'image'; asset: { _type: 'reference'; _ref: string } } | null>()

async function getOrUploadImage(localPath: string) {
  if (imageCache.has(localPath)) return imageCache.get(localPath)!
  const ref = await uploadImage(localPath)
  imageCache.set(localPath, ref)
  return ref
}

// ---------------------------------------------------------------------------
// Migración principal
// ---------------------------------------------------------------------------
async function migrate() {
  console.log(`\n🚀 Migrando ${proyectos.length} proyectos a Sanity (${PROJECT_ID}/${DATASET})\n`)

  for (const p of proyectos) {
    console.log(`\n📁 Proyecto: ${p.nombre}`)

    const imagenHero = await getOrUploadImage(p.imagenHero)

    const galeriaRefs = (
      await Promise.all(p.galeria.map((img) => getOrUploadImage(img)))
    ).filter(Boolean)

    const instalacionesRefs = await Promise.all(
      p.instalaciones.map(async (inst) => {
        const fotoRef = await getOrUploadImage(inst.foto)
        return fotoRef ? { _type: 'instalacion', _key: inst.label, label: inst.label, foto: fotoRef } : null
      })
    ).then((arr) => arr.filter(Boolean))

    const planoMaestroRefs = (
      await Promise.all(p.planoMaestro.map((img) => getOrUploadImage(img)))
    ).filter(Boolean)

    const doc = {
      _type: 'proyecto',
      _id: `proyecto-${p.slug}`,
      nombre: p.nombre,
      slug: { _type: 'slug', current: p.slug },
      estado: p.estado,
      anioEntrega: p.anioEntrega,
      tagline: p.tagline,
      descripcion: p.descripcion,
      imagenHero,
      superficie: p.superficie,
      m2Totales: p.m2Totales,
      pisos: p.pisos,
      unidades: p.unidades,
      destacado: p.destacado,
      amenities: p.amenities.map((a, i) => ({ ...a, _key: `amenity-${i}` })),
      galeria: galeriaRefs.map((ref, i) => ({ ...(ref as object), _key: `galeria-${i}` })),
      instalaciones: instalacionesRefs,
      planoMaestro: planoMaestroRefs.map((ref, i) => ({ ...(ref as object), _key: `plano-${i}` })),
      ubicacion: p.ubicacion,
      porcentajeAvance: p.porcentajeAvance,
      fasesObra: p.fasesObra.map((f, i) => ({ ...f, _key: `fase-${i}` })),
    }

    await client.createOrReplace(doc)
    console.log(`  ✅ Creado: ${p.nombre}`)
  }

  console.log('\n✅ Migración completada exitosamente')
  console.log('📌 Verificá los proyectos en tu Sanity Studio antes de continuar')
}

migrate().catch((err) => {
  console.error('❌ Error durante la migración:', err)
  process.exit(1)
})
