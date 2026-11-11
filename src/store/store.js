import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/auth.slice'
import postulacionesReducer from '../features/postulaciones/postulaciones.slice'
import categoriasReducer from '../features/categorias/categorias.slice'
import preparacionReducer from '../features/preparacion/preparacion.slice'
import resumenReducer from '../features/resumen/resumen.slice'
import ofertasReducer from '../features/ofertas/ofertas.slice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    postulaciones: postulacionesReducer,
    categorias: categoriasReducer,
    preparacion: preparacionReducer,
    resumen: resumenReducer,
    ofertas: ofertasReducer
  }
})

export default store
