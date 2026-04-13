import { createClient } from 'next-sanity'

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

// Verifica que el projectId tenga el formato correcto (a-z, 0-9, guiones)
const isConfigured = /^[a-z0-9-]+$/.test(PROJECT_ID)

const client = isConfigured
  ? createClient({
      projectId: PROJECT_ID,
      dataset: DATASET,
      apiVersion: '2024-01-01',
      useCdn: process.env.NODE_ENV === 'production',
    })
  : null

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  if (!client) {
    // Sanity no está configurado — retorna array vacío para no romper el build
    return [] as unknown as T
  }

  return client.fetch<T>(query, params, {
    next: {
      // Sin revalidación automática — se actualiza via webhook en /api/revalidate
      revalidate: false,
    },
  })
}
