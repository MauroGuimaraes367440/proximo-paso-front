import api from '../api/api'

// Cualquier usuario logueado puede listar categorías (las usa en filtros y formularios)
export const listarCategoriasService = async () => {
  const res = await api.get('/categorias')
  return res.data // [{ _id, nombre, imagenUrl }]
}

// --- Solo admin (la API responde 403 a un usuario común) ---

export const crearCategoriaService = async (nombre) => {
  const res = await api.post('/categorias', { nombre })
  return res.data
}

export const renombrarCategoriaService = async (id, nombre) => {
  const res = await api.patch(`/categorias/${id}`, { nombre })
  return res.data
}

export const eliminarCategoriaService = async (id) => {
  const res = await api.delete(`/categorias/${id}`)
  return res.data
}

// Igual que el UploadForm de clase: el archivo viaja en un FormData,
// en el campo "imagen" (el nombre que espera multer en la API)
export const subirImagenCategoriaService = async (id, archivo) => {
  const formData = new FormData()
  formData.append('imagen', archivo)

  const res = await api.post(`/categorias/${id}/imagen`, formData)
  return res.data // { message, categoria }
}
