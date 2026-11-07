import { Outlet } from 'react-router'
import Sidebar from '../components/layout/Sidebar'

// Diseño de la app con sesión iniciada: menú a la izquierda y la página a la derecha
const AppLayout = () => {
  return (
    <div className="app">
      <Sidebar />

      <main className="app__contenido">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
