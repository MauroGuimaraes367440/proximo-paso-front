export const obtenerError = (error) => {
  if (!error.response) {
    return {
      mensaje: 'No se pudo conectar con el servidor. Revisá tu conexión e intentá de nuevo.',
      detalles: []
    }
  }

  const { message, errores } = error.response.data

  return {
    mensaje: message || 'Ocurrió un error inesperado',
    detalles: errores || []
  }
}
