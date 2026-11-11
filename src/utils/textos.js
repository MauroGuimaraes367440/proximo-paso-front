// La API guarda las categorías en minúscula ("tecnología"); para mostrarlas: "Tecnología"
export const capitalizar = (texto) => {
  if (!texto) return ''
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}

// Jooble devuelve el resumen de la oferta con etiquetas HTML (<b>react</b>) y
// códigos como &nbsp;. Esto los saca para mostrar y guardar texto limpio
export const limpiarHtml = (texto) => {
  if (!texto) return ''
  return texto
    .replace(/<[^>]*>/g, ' ')   // saca cualquier etiqueta <...>
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')       // varios espacios seguidos → uno
    .trim()
}
