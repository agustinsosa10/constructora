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
      name: 'porcentaje',
      title: 'Porcentaje completado (%)',
      type: 'number',
      validation: (R) => R.required().min(0).max(100),
      initialValue: 0,
    }),
  ],
})
