import api from '../api/api'

// Cualquier usuario logueado puede listar categorías (las usa en filtros y formularios)
export const listarCategoriasService = async () => {
  const res = await api.get('/categorias')
  return res.data // [{ _id, nombre, imagenUrl }]
}
