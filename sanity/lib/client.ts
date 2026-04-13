import { createClient } from 'next-sanity'

// Solo se usa para el Studio y para urlFor() — sanityFetch tiene su propio cliente
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})
