# CLAUDE.md — IES Desarrollos Inmobiliarios

Sitio web para IES Desarrollos Inmobiliarios, constructora/inmobiliaria de Salta Capital.
Desarrollado por Antigravity.

---

## Stack

- **Framework:** Next.js 15 (App Router)
- **Estilos:** Tailwind CSS v4
- **CMS:** Sanity v3 (Fase 2 — aún no implementado)
- **Imágenes:** `next/image`
- **Formulario:** Resend (envío de emails)
- **Mapa:** Google Maps Embed API
- **Deploy:** Vercel
- **Package manager:** pnpm

## Arquitectura

```
/app
  page.tsx                    # One-page: Hero + Proyectos + Nosotros + Contacto
  /proyectos/[slug]/page.tsx  # Detalle de cada proyecto
/components                   # Componentes React reutilizables
/data
  proyectos.ts                # Datos hardcodeados (Fase 1, antes de Sanity)
/public
  /logos                      # Logos de IES (positivo, negativo, solo)
```

## Convenciones

- Componentes en PascalCase, archivos en kebab-case
- Español para nombres de variables de dominio (`proyecto`, `estado`, `tipologia`)
- Inglés para nombres técnicos de componentes y funciones
- No usar `any` en TypeScript
- Clases Tailwind directamente en JSX — no CSS modules ni styled-components

## Identidad visual

| Token | Valor |
|---|---|
| Rojo IES | `#C41230` |
| Gris IES | `#595959` |
| Fondo oscuro | `#1A1A1A` |
| Fondo sección | `#F5F4F2` |
| Tipografía | Montserrat (Google Fonts) |

Logos disponibles en `/public/logos/`:
- `logo-positivo.png` — sobre fondo blanco
- `logo-negativo.png` — sobre fondo oscuro (hero, footer)

## Páginas y secciones

### `/` — One-page principal
- `#hero` — imagen full-screen, tagline, CTA
- `#proyectos` — grid con filtros por estado y tipo
- `#nosotros` — foto + texto + métricas
- `#contacto` — formulario + WhatsApp + Google Maps

### `/proyectos/[slug]` — Detalle de proyecto
1. Navbar sticky (mismo que home, comportamiento transparente → sólido)
2. Hero full-width con categoría, nombre, año de entrega, tagline
3. Descripción y ubicación
4. Grid de amenities (íconos + labels)
5. Galería de fotos (carousel + lightbox)
6. Instalaciones / espacios comunes (fotos + labels)
7. Tipologías (tabs: m², dormitorios, baños, plano)
8. Plano maestro (carousel)
9. Google Maps embebido
10. Formulario de contacto final

## Datos — Fase 1 (hardcodeados)

Los proyectos se definen en `/data/proyectos.ts` con esta estructura:

```ts
type Proyecto = {
  slug: string
  nombre: string
  categoria: 'Residencial' | 'Urbanizacion' | 'Comercial'
  estado: 'En construccion' | 'Entregado' | 'Proximo lanzamiento'
  anioEntrega: number
  tagline: string
  descripcion: string
  imagenHero: string
  brochureUrl?: string
  amenities: { icono: string; label: string }[]
  galeria: string[]
  instalaciones: { foto: string; label: string }[]
  tipologias: {
    nombre: string
    dormitorios: number
    banos: number
    m2: number
    descripcion: string
    plano: string
  }[]
  planoMaestro: string[]
  ubicacion: { direccion: string; lat: number; lng: number }
}
```

## Fase 2 — Sanity (pendiente)

Cuando la constructora tenga el contenido listo:
- Instalar Sanity v3, definir schemas basados en el tipo `Proyecto` de arriba
- Reemplazar imports de `/data/proyectos.ts` por GROQ queries
- Agregar ISR con `revalidate` por webhook de Sanity
- Studio en `studio.iesdesarrollos.com.ar`

## Flujo de trabajo Git

### Ramas
- `main` → producción (conectado a Vercel, deploy automático)
- `dev` → rama de desarrollo activa, base para todas las features
- `feature/*` → una rama por feature, se abre desde `dev` y se mergea a `dev`

### Ciclo de una feature
```
git checkout dev
git checkout -b feature/nombre-feature
# ... desarrollo ...
git push origin feature/nombre-feature
# PR o merge directo a dev
git checkout dev && git merge feature/nombre-feature
git branch -d feature/nombre-feature
```

### Merge a producción
Cuando `dev` está estable y listo para lanzar:
```
git checkout main
git merge dev
git push origin main  # dispara el deploy en Vercel
```

### Nombres de branches sugeridos
- `feature/setup-nextjs`
- `feature/navbar`
- `feature/hero`
- `feature/seccion-proyectos`
- `feature/seccion-nosotros`
- `feature/seccion-contacto`
- `feature/detalle-proyecto`
- `feature/sanity-integration` (Fase 2)

### Remoto
`git@github.com:agustinsosa10/constructora.git`

---

## Referencia visual

- **Inspiración estructura detalle:** proyectonorte.com.ar (NO copiar, son de la misma provincia)
- **Inspiración estructura general:** agroupsalta.com
- **Sitio actual:** iesdesarrollos.com.ar (a reemplazar)

## Pendiente de la constructora

- Fotos de proyectos (crítico — sin esto no se puede lanzar)
- Foto institucional (sección Nosotros)
- Tagline oficial (propuesta actual: "Construimos el futuro de Salta")
- Listado de proyectos con datos completos
- Confirmación de métricas (+250 deptos, +7 finalizados, 6 en ejecución, +10 años)
