import { createSlice } from '@reduxjs/toolkit'
import { desloguear } from '../auth/auth.slice'

const initialState = {
  lista: [],
  page: 1,
  totalPages: 0,
  total: 0
}

const postulacionesSlice = createSlice({
  name: 'postulaciones',
  initialState,
  reducers: {
    setPostulaciones: (state, action) => {
      state.lista = action.payload.postulaciones
      state.page = action.payload.page
      state.totalPages = action.payload.totalPages
      state.total = action.payload.total
    }
  },
  // Escucha una acción de OTRO slice: al cerrar sesión se vacía,
  // así el próximo usuario no ve las postulaciones del anterior
  extraReducers: (builder) => {
    builder.addCase(desloguear, () => initialState)
  }
})

export const { setPostulaciones } = postulacionesSlice.actions
export default postulacionesSlice.reducer
