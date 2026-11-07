import { Navigate, Outlet } from 'react-router'
import { useSelector } from 'react-redux'

// Solo deja pasar si hay sesión; si no, manda al login
const ProtectedRoute = () => {
  const token = useSelector(state => state.auth.token)

  if (!token) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
