import { Navigate, Outlet } from 'react-router'
import { useSelector } from 'react-redux'

// Igual que ProtectedRoute, pero pregunta por el rol: solo deja pasar al admin.
const AdminRoute = () => {
  const usuario = useSelector(state => state.auth.usuario)

  if (usuario.rol !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

export default AdminRoute
