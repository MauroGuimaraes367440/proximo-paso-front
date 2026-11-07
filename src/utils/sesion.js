// Guarda la sesión en localStorage para que sobreviva a un F5
export const guardarSesion = ({ usuario, token }) => {
  localStorage.setItem('token', token)
  localStorage.setItem('usuario', JSON.stringify(usuario))
}

export const borrarSesionGuardada = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('usuario')
}
