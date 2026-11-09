import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/auth.slice'
import postulacionesReducer from '../features/postulaciones/postulaciones.slice'
import categoriasReducer from '../features/categorias/categorias.slice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    postulaciones: postulacionesReducer,
    categorias: categoriasReducer
  }
})

export default store
