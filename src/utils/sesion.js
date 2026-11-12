export const guardarSesion = ({ usuario, token }) => {
  localStorage.setItem('token', token)
  localStorage.setItem('usuario', JSON.stringify(usuario))
}

export const borrarSesionGuardada = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('usuario')
}

export const guardarUsuario = (usuario) => {
  localStorage.setItem('usuario', JSON.stringify(usuario))
}
