import api from '../api/api'

// La API consulta Jooble y devuelve las ofertas con los mismos nombres de campo
// que una postulación (puesto, empresa, descripcion, enlace) + ubicacion
// params: { busqueda, ubicacion, page } → ?busqueda=react&ubicacion=montevideo&page=1
export const buscarOfertasService = async (params) => {
  const res = await api.get('/ofertas', { params })
  return res.data // { ofertas: [...], page, total }
}
