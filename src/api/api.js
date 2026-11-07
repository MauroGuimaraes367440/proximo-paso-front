import axios from 'axios'
import { toast } from 'react-toastify'
import store from '../store/store'
import { desloguear } from '../features/auth/auth.slice'
import { borrarSesionGuardada } from '../utils/sesion'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// Antes de cada pedido: si hay sesión, agrega el token
api.interceptors.request.use((config) => {
  const token = store.getState().auth.token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// Después de cada respuesta: si el token venció (401), cierra la sesión.
// El login se excluye porque su 401 significa "credenciales incorrectas".
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const esLogin = error.config?.url === '/auth/login'

    if (error.response?.status === 401 && !esLogin) {
      borrarSesionGuardada()
      store.dispatch(desloguear())
      toast.info('Tu sesión expiró. Volvé a iniciar sesión.', { toastId: 'sesion-expirada' })
    }

    return Promise.reject(error)
  }
)

export default api
