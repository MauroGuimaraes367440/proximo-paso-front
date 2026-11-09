// La API guarda las categorías en minúscula ("tecnología"); para mostrarlas: "Tecnología"
export const capitalizar = (texto) => {
  if (!texto) return ''
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}
