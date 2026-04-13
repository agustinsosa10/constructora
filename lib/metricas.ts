export const ANIO_FUNDACION = 2014

type ProyectoBase = {
  slug: string
  estado: string
  m2Totales: number
}

export function calcularMetricas(lista: ProyectoBase[]) {
  const anioActual = new Date().getFullYear()
  const aniosTrayectoria = anioActual - ANIO_FUNDACION

  const enConstruccion = lista.filter((p) => p.estado === 'En construccion')
  const entregados = lista.filter((p) => p.estado === 'Entregado')

  const m2EnDesarrollo = enConstruccion.reduce((acc, p) => acc + p.m2Totales, 0)
  const slugsUnicos = new Set(lista.map((p) => p.slug))

  return {
    aniosTrayectoria,
    m2EnDesarrollo,
    proyectosEnDesarrollo: enConstruccion.length,
    proyectosEntregados: entregados.length,
    totalProyectos: slugsUnicos.size,
  }
}
