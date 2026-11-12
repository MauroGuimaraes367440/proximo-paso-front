import api from '../api/api'

export const buscarOfertasService = async (params) => {
  const res = await api.get('/ofertas', { params })
  return res.data
}
