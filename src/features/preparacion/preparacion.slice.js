import { createSlice } from '@reduxjs/toolkit'

const preparacionSlice = createSlice({
  name: 'preparacion',
  initialState: {
    texto: ''
  },
  reducers: {
    setPreparacion: (state, action) => {
      state.texto = action.payload.preparacion
    },
    resetPreparacion: (state) => {
      state.texto = ''
    }
  }
})

export const { setPreparacion, resetPreparacion } = preparacionSlice.actions
export default preparacionSlice.reducer
