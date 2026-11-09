// La API no guarda fecha de creación, pero el _id de MongoDB la trae adentro:
// sus primeros 8 caracteres son los segundos desde 1970 escritos en hexadecimal
export const fechaDesdeId = (id) => {
  const segundos = parseInt(id.substring(0, 8), 16)
  return new Date(segundos * 1000)
}

// Ej: "7 nov 2026"
export const formatearFecha = (fecha) => {
  return fecha.toLocaleDateString('es-UY', { day: 'numeric', month: 'short', year: 'numeric' })
}
