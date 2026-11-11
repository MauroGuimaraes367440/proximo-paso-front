import { createSlice } from '@reduxjs/toolkit'
import { desloguear } from '../auth/auth.slice'

// Los resultados de la última búsqueda en Jooble (como forecast.slice en clase)
const initialState = {
  lista: [],
  page: 1,
  total: 0
}

const ofertasSlice = createSlice({
  name: 'ofertas',
  initialState,
  reducers: {
    setOfertas: (state, action) => {
      state.lista = action.payload.ofertas
      state.page = action.payload.page
      state.total = action.payload.total
    },
    resetOfertas: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(desloguear, () => initialState)
  }
})

export const { setOfertas, resetOfertas } = ofertasSlice.actions
export default ofertasSlice.reducer
