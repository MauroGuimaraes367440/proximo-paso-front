import { createSlice } from '@reduxjs/toolkit'
import { desloguear } from '../auth/auth.slice'

// Cuántas postulaciones hay en cada estado. Lo leen el informe de uso y el gráfico
// (igual que en clase el forecast.slice lo lee el TemperatureChart)
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
    // payload: { guardada: 2, enviada: 1, ... }
    setResumen: (state, action) => {
      state.conteos = action.payload

      // El total es la suma de los 5 estados
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
