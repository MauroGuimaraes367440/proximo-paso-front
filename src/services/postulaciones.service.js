import api from '../api/api'
import { ESTADOS } from '../utils/estados'

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

// Cuenta las postulaciones de cada estado: un pedido por estado con limit=1,
// del que solo interesa el "total" que devuelve la API.
// Resultado: { guardada: 2, enviada: 1, entrevista: 0, aceptada: 0, rechazada: 1 }
export const contarPorEstadoService = async () => {
  const conteos = {}
  for (const estado of ESTADOS) {
    const datos = await listarPostulacionesService({ estado: estado.valor, limit: 1 })
    conteos[estado.valor] = datos.total
  }
  return conteos
}

// La API le pasa puesto, empresa y descripción a Groq y devuelve el texto generado
export const generarPreparacionService = async (id) => {
  const res = await api.post(`/postulaciones/${id}/preparacion`)
  return res.data // { postulacionId, preparacion }
}
