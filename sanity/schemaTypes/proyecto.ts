import { defineType, defineField } from 'sanity'

export const proyecto = defineType({
  name: 'proyecto',
  title: 'Proyecto',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre del proyecto',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'nombre', maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'estado',
      title: 'Estado',
      type: 'string',
      options: {
        list: [
          { title: 'En desarrollo', value: 'En construccion' },
          { title: 'Entregado', value: 'Entregado' },
          { title: 'Próximo lanzamiento', value: 'Proximo lanzamiento' },
        ],
        layout: 'radio',
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'anioEntrega',
      title: 'Año de entrega',
      type: 'number',
      validation: (R) => R.required().min(2000).max(2100),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Frase corta que resume el proyecto (usada en SEO, máximo 160 caracteres)',
      validation: (R) => R.required().max(160),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      rows: 4,
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'imagenHero',
      title: 'Imagen principal',
      type: 'image',
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'brochureUrl',
      title: 'Brochure PDF (Opcional)',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
    }),
    defineField({
      name: 'superficie',
      title: 'Superficie (rango)',
      type: 'string',
      description: 'Ejemplo: 65–120 m²',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'm2Totales',
      title: 'M² totales del proyecto',
      type: 'number',
      validation: (R) => R.required().positive(),
    }),
    defineField({
      name: 'pisos',
      title: 'Cantidad de pisos (Opcional)',
      type: 'number',
      description: 'Opcional — no aplica para barrios o urbanizaciones',
      validation: (R) => R.positive(),
    }),
    defineField({
      name: 'unidades',
      title: 'Cantidad de unidades (Opcional)',
      type: 'number',
      description: 'Opcional — no aplica para barrios o urbanizaciones',
      validation: (R) => R.positive(),
    }),
    defineField({
      name: 'destacado',
      title: '¿Destacado en el inicio? (Opcional)',
      type: 'boolean',
      description: 'Activar para mostrar este proyecto en el carousel de la página de inicio',
      initialValue: false,
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities (Opcional)',
      type: 'array',
      of: [{ type: 'amenity' }],
    }),
    defineField({
      name: 'galeria',
      title: 'Galería de imágenes (Opcional)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'planoMaestro',
      title: 'Planos maestro (Opcional)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'ubicacion',
      title: 'Ubicación',
      type: 'object',
      fields: [
        defineField({
          name: 'direccion',
          title: 'Dirección',
          type: 'string',
          validation: (R) => R.required(),
        }),
        defineField({
          name: 'mapUrl',
          title: 'URL del mapa (embed de Google Maps)',
          description: `En Google Maps: Compartir → Incorporar mapa → copiá el valor del atributo src del iframe, borra todo lo demas y deja solo la url que comienza con "https" y termina con "sar"`,
          type: 'url',
          validation: (R) => R.required(),
        }),
      ],
    }),
    defineField({
      name: 'fasesObra',
      title: 'Fases de obra (Solo obligatorio cuando el estado es "En desarrollo")',
      type: 'array',
      of: [{ type: 'faseObra' }],
      validation: (R) =>
        R.custom((value, context) => {
          const doc = context.document as { estado?: string }
          if (doc?.estado === 'En construccion' && (!value || (value as unknown[]).length === 0)) {
            return 'Las fases de obra son obligatorias cuando el estado es "En desarrollo"'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {
      title: 'nombre',
      subtitle: 'estado',
      media: 'imagenHero',
    },
  },
  orderings: [
    {
      title: 'Nombre A–Z',
      name: 'nombreAsc',
      by: [{ field: 'nombre', direction: 'asc' }],
    },
    {
      title: 'Más reciente',
      name: 'anioDesc',
      by: [{ field: 'anioEntrega', direction: 'desc' }],
    },
  ],
})
