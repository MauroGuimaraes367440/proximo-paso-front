import { createSlice } from '@reduxjs/toolkit'
import { desloguear } from '../auth/auth.slice'

const initialState = {
  conteos: {
    guardada: 0,
    enviada: 0,
    entrevista: 0,
    aceptada: 0,
    rechazada: 0
  },
  total: 0
}

const resumenSlice = createSlice({
  name: 'resumen',
  initialState,
  reducers: {
    setResumen: (state, action) => {
      state.conteos = action.payload

      let total = 0
      for (const cantidad of Object.values(action.payload)) {
        total += cantidad
      }
      state.total = total
    }
  },
  extraReducers: (builder) => {
    builder.addCase(desloguear, () => initialState)
  }
})

export const { setResumen } = resumenSlice.actions
export default resumenSlice.reducer
