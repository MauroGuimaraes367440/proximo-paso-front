import { createSlice } from '@reduxjs/toolkit'
import { desloguear } from '../auth/auth.slice'

// Las categorías las usan varias pantallas (tabla, filtros, formularios), por eso van en Redux
const categoriasSlice = createSlice({
  name: 'categorias',
  initialState: {
    lista: []
  },
  reducers: {
    setCategorias: (state, action) => {
      state.lista = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(desloguear, (state) => {
      state.lista = []
    })
  }
})

export const { setCategorias } = categoriasSlice.actions
export default categoriasSlice.reducer
