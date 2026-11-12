import api from '../api/api'

export const listarCategoriasService = async () => {
  const res = await api.get('/categorias')
  return res.data
}

export const obtenerCategoriaService = async (id) => {
  const res = await api.get(`/categorias/${id}`)
  return res.data
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

export const subirImagenCategoriaService = async (id, archivo) => {
  const formData = new FormData()
  formData.append('imagen', archivo)

  const res = await api.post(`/categorias/${id}/imagen`, formData)
  return res.data
}
