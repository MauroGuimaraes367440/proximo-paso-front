import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  usuario: JSON.parse(localStorage.getItem('usuario')),
  token: localStorage.getItem('token')
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loguear: (state, action) => {
      state.usuario = action.payload.usuario
      state.token = action.payload.token
    },
    actualizarUsuario: (state, action) => {
      state.usuario = action.payload
    },
    desloguear: (state) => {
      state.usuario = null
      state.token = null
    }
  }
})

export const { loguear, actualizarUsuario, desloguear } = authSlice.actions
export default authSlice.reducer