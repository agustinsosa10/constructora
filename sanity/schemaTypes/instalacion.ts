import { defineType, defineField } from 'sanity'

export const instalacion = defineType({
  name: 'instalacion',
  title: 'Instalación',
  type: 'object',
  fields: [
    defineField({
      name: 'foto',
      title: 'Fotografía',
      type: 'image',
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'label',
      title: 'Descripción',
      type: 'string',
      validation: (R) => R.required(),
    }),
  ],
})
