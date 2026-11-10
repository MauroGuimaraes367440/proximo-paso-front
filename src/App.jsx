import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import store from './store/store'
import ContainerPage from './pages/ContainerPage'
import AppLayout from './pages/AppLayout'
import LoginPage from './pages/login/LoginPage'
import RegisterPage from './pages/register/RegisterPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import PostulacionesPage from './pages/postulaciones/PostulacionesPage'
import NuevaPostulacionPage from './pages/postulaciones/NuevaPostulacionPage'
import DetallePostulacionPage from './pages/postulaciones/DetallePostulacionPage'
import OfertasPage from './pages/ofertas/OfertasPage'
import CategoriasPage from './pages/categorias/CategoriasPage'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './app/guards/ProtectedRoute'
import PublicRoute from './app/guards/PublicRoute'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Sin sesión: header simple arriba */}
          <Route element={<PublicRoute />}>
            <Route element={<ContainerPage />}>
              <Route path="/" element={<LoginPage />} />
              <Route path="/registro" element={<RegisterPage />} />
            </Route>
          </Route>

          {/* Con sesión: barra lateral */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/postulaciones" element={<PostulacionesPage />} />
              <Route path="/postulaciones/nueva" element={<NuevaPostulacionPage />} />
              {/* :id es la parte variable. "/postulaciones/nueva" también encaja acá,
                  pero React Router siempre prefiere la ruta fija antes que la variable */}
              <Route path="/postulaciones/:id" element={<DetallePostulacionPage />} />
              <Route path="/ofertas" element={<OfertasPage />} />
              <Route path="/categorias" element={<CategoriasPage />} />
            </Route>
          </Route>

          {/* Cualquier otra dirección */}
          <Route element={<ContainerPage />}>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  )
}

export default App
