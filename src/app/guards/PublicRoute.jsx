import { Navigate, Outlet } from 'react-router'
import { useSelector } from 'react-redux'

// Login y registro: si ya hay sesión, no tiene sentido mostrarlos
const PublicRoute = () => {
  const token = useSelector(state => state.auth.token)

  if (token) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

export default PublicRoute
