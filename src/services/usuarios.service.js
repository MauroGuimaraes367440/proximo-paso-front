import api from '../api/api'

// Pasa el usuario logueado de Plus a Premium (la API sabe quién es por el token)
export const cambiarPlanService = async () => {
  const res = await api.patch('/usuarios/plan')
  return res.data // { message, usuario: { id, username, rol, plan } }
}
