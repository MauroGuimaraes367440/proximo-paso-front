// Convierte un error de axios en un mensaje para mostrar en pantalla.
// La API responde { message, errores? } (errores = lista de validaciones Joi).
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
