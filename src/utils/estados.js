// Los mismos estados que acepta la API. Se usan en badges, filtros y formularios
export const ESTADOS = [
  { valor: 'guardada', texto: 'Guardada' },
  { valor: 'enviada', texto: 'Enviada' },
  { valor: 'entrevista', texto: 'Entrevista' },
  { valor: 'aceptada', texto: 'Aceptada' },
  { valor: 'rechazada', texto: 'Rechazada' }
]

export const textoEstado = (valor) => {
  const estado = ESTADOS.find(e => e.valor === valor)
  return estado ? estado.texto : valor
}
