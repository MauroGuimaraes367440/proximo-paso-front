import api from '../api/api'
import { guardarSesion } from '../utils/sesion'

export const loginService = async (credenciales) => {
  const res = await api.post('/auth/login', credenciales)

  guardarSesion(res.data)

  return res.data
}

export const registroService = async (datos) => {
  const res = await api.post('/auth/register', datos)

  return res.data
}
