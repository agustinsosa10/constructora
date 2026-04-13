import { defineType, defineField } from 'sanity'

export const amenity = defineType({
  name: 'amenity',
  title: 'Amenity',
  type: 'object',
  fields: [
    defineField({
      name: 'icono',
      title: 'Ícono',
      type: 'string',
      options: {
        list: [
          { title: 'Piscina', value: 'pool' },
          { title: 'Gimnasio', value: 'gym' },
          { title: 'Cocheras / Estacionamiento', value: 'parking' },
          { title: 'Terraza', value: 'terrace' },
          { title: 'Seguridad 24hs', value: 'security' },
          { title: 'Parque / Espacios verdes', value: 'park' },
          { title: 'Juegos infantiles', value: 'playground' },
          { title: 'Senderos', value: 'walking' },
          { title: 'Ascensores', value: 'elevator' },
          { title: 'Aire acondicionado', value: 'ac' },
          { title: 'WiFi', value: 'wifi' },
        ],
        layout: 'dropdown',
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'label',
      title: 'Etiqueta',
      type: 'string',
      validation: (R) => R.required(),
    }),
  ],
})
