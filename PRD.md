# Plan: Sitio Web Constructora

## Contexto

La constructora tiene un sitio web desactualizado (iesdesarrollos.com.ar) y quiere reemplazarlo por uno moderno que tome como referencia proyectonorte.com.ar y agroupsalta.com, con especial énfasis en la sección de proyectos. El requisito clave es que el cliente pueda gestionar sus propios proyectos sin depender de un desarrollador, por lo que se incorpora Sanity como CMS headless.

El documento de diseño debe servir para ser presentado a los jefes de la constructora antes de iniciar el desarrollo.

---

## Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | Next.js 15 (App Router) |
| Estilos | Tailwind CSS |
| CMS | Sanity v3 |
| Imágenes | Sanity Image Pipeline + next/image |
| Mapa | Google Maps Embed API |
| Deploy frontend | Vercel |
| Deploy Studio | Sanity Cloud |
| shadcn para componentes *no es obligatorio*  |

**Flujo de datos:**
1. El cliente gestiona proyectos desde `studio.dominio.com.ar` (Sanity Studio)
2. Next.js fetch vía GROQ queries a la Sanity API
3. Páginas de detalle con ISR (se actualizan automáticamente al guardar en Sanity)
4. Frontend en `dominio.com.ar`, studio en `studio.dominio.com.ar`

---

## Arquitectura: One-page + Detail Pages

La página principal es una sola página con secciones ancla. Cada proyecto tiene su propia página de detalle con URL propia (buena para SEO).

```
/                           → One-page (Hero + Proyectos + Nosotros + Contacto)
/proyectos/[slug]           → Detalle de cada proyecto
```

### Estructura del proyecto

```
/
├── app/
│   ├── page.tsx                    # One-page principal
│   └── proyectos/[slug]/page.tsx   # Detalle de proyecto
├── sanity/
│   └── schemas/
│       ├── proyecto.ts             # Schema del proyecto
│       └── configuracion.ts        # Datos globales (empresa, contacto)
└── components/                     # Componentes React reutilizables
```

---

## Modelo de Contenidos (Sanity)

### Documento: Proyecto

| Campo | Tipo | Detalle |
|---|---|---|
| Nombre | String | Nombre del proyecto |
| Slug | Slug | URL amigable (/proyectos/edificio-norte) |
| Estado | Select | En construcción / Entregado / Próximo lanzamiento |
| Tipo | Select | Vivienda / Comercial / Mixto |
| Descripción | Text | Descripción general |
| Ubicación | Object | Dirección + coordenadas para Google Maps |
| Galería de fotos | Image[] | Múltiples imágenes |
| Planos | File[] | Imágenes o PDFs |
| Metrajes | Object | Superficie total, por unidad, etc. |
| Ambientes | Number | Cantidad de ambientes |
| Avance de obra | Number | Porcentaje (solo si está en construcción) |
| Imagen destacada | Image | Para la card en la grilla de proyectos |

### Documento: Configuración Global

| Campo | Tipo |
|---|---|
| Nombre y logo | String + Image |
| Teléfono / WhatsApp | String |
| Email | String |
| Dirección de la oficina | String |
| Redes sociales | Object |
| Texto "Sobre nosotros" | Text |
| Foto institucional | Image |

---

## UI/UX

### Página principal (one-page)

| Sección | Descripción |
|---|---|
| **Navbar** | Logo + links ancla + botón CTA "Contactanos" |
| **Hero** | Imagen/video de fondo full-screen, nombre empresa, tagline, botón "Ver proyectos" |
| **Proyectos** | Grid de cards desplazables con filtros por estado y tipo. Card: imagen destacada, nombre, tipo, badge de estado, botón "Ver más" |
| **Nosotros** | Foto institucional + texto + métricas clave |
| **Contacto** | Formulario + WhatsApp directo + mapa de la oficina |
| **Footer** | Logo, links, redes sociales |

### Página de detalle de proyecto

| Bloque | Descripción |
|---|---|
| **Hero** | Imagen principal full-width, nombre y badge de estado |
| **Info general** | Tipo, ubicación, metrajes, ambientes, avance |
| **Galería** | Grid de fotos con lightbox |
| **Planos** | Visor de planos/PDFs |
| **Mapa** | Google Maps embebido |
| **CTA final** | "¿Te interesa este proyecto? Contactanos" |
| que haya un navbar en cada proyecto como proyectonorte    |
---

## Despliegue

| Entorno | URL |
|---|---|
| Producción | `dominio.com.ar` |
| Sanity Studio | `studio.dominio.com.ar` |
| Preview | URL automática de Vercel por rama |

---

## Alcance

**Incluido:**
- Diseño y desarrollo del frontend (Next.js + Tailwind)
- Configuración de Sanity con todos los schemas definidos
- Panel de administración para carga autónoma de proyectos
- Integración con Google Maps
- Formulario de contacto con envío por email
- Configuración del dominio en Vercel
- Diseño responsive (mobile, tablet, desktop)
- SEO básico (meta tags, Open Graph por proyecto)

**No incluido:**
- Diseño de identidad visual (ya la tienen)
- Carga inicial de proyectos (la realiza el cliente)
- Mantenimiento posterior al lanzamiento

---

## Infraestructura — Costos mensuales estimados

| Servicio | Costo |
|---|---|
| Vercel | Gratis |
| Sanity | Gratis (hasta 2 usuarios admin) |
| Google Maps | Gratis (uso básico) |
| Dominio | Ya lo tienen |
| **Total** | **$0/mes** |

---

## Referencias visuales

- https://proyectonorte.com.ar — referencia general de layout y estilo
- https://agroupsalta.com — referencia principal de estructura: Hero, Proyectos, Nosotros, Contacto
- https://iesdesarrollos.com.ar/index.php — sitio actual a reemplazar
