// Los mismos estados que acepta la API. Se usan en badges, filtros, formularios y el gráfico.
// color: el que usa el gráfico del Resumen (combina con las etiquetas de la tabla)
export const ESTADOS = [
  { valor: 'guardada', texto: 'Guardada', color: '#94a3b8' },
  { valor: 'enviada', texto: 'Enviada', color: '#3b82f6' },
  { valor: 'entrevista', texto: 'Entrevista', color: '#f59e0b' },
  { valor: 'aceptada', texto: 'Aceptada', color: '#22c55e' },
  { valor: 'rechazada', texto: 'Rechazada', color: '#ef4444' }
]

export const textoEstado = (valor) => {
  const estado = ESTADOS.find(e => e.valor === valor)
  return estado ? estado.texto : valor
}
