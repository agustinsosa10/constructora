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
          { title: 'En construcción', value: 'En construccion' },
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
      title: 'URL del brochure (PDF)',
      type: 'url',
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
      title: 'Cantidad de pisos',
      type: 'number',
      validation: (R) => R.required().positive(),
    }),
    defineField({
      name: 'unidades',
      title: 'Cantidad de unidades',
      type: 'number',
      validation: (R) => R.required().positive(),
    }),
    defineField({
      name: 'destacado',
      title: '¿Destacado en el inicio?',
      type: 'boolean',
      description: 'Activar para mostrar este proyecto en el carousel de la página de inicio',
      initialValue: false,
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{ type: 'amenity' }],
    }),
    defineField({
      name: 'galeria',
      title: 'Galería de imágenes',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'planoMaestro',
      title: 'Planos maestro',
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
      title: 'Fases de obra',
      type: 'array',
      of: [{ type: 'faseObra' }],
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
