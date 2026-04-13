import { defineType, defineField } from 'sanity'

export const faseObra = defineType({
  name: 'faseObra',
  title: 'Fase de Obra',
  type: 'object',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre de la fase',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'completada',
      title: '¿Completada?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'activa',
      title: '¿Activa actualmente?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
