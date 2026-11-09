import api from '../api/api'

// Todas las llamadas a /postulaciones. El token lo agrega el interceptor de api.js

// params: { page, limit, estado, categoria } → viajan como ?page=1&limit=10...
export const listarPostulacionesService = async (params) => {
  const res = await api.get('/postulaciones', { params })
  return res.data // { postulaciones, page, limit, total, totalPages }
}

export const obtenerPostulacionService = async (id) => {
  const res = await api.get(`/postulaciones/${id}`)
  return res.data
}

export const crearPostulacionService = async (datos) => {
  const res = await api.post('/postulaciones', datos)
  return res.data
}

export const actualizarPostulacionService = async (id, cambios) => {
  const res = await api.patch(`/postulaciones/${id}`, cambios)
  return res.data
}

export const eliminarPostulacionService = async (id) => {
  const res = await api.delete(`/postulaciones/${id}`)
  return res.data
}
