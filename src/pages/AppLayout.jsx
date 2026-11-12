import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router'
import { toast } from 'react-toastify'
import Sidebar from '../components/layout/Sidebar'
import { listarCategoriasService } from '../services/categorias.service'
import { setCategorias } from '../features/categorias/categorias.slice'

const AppLayout = () => {
  const dispatch = useDispatch()
  const categorias = useSelector(state => state.categorias.lista)

  useEffect(() => {
    if (categorias.length > 0) return

    const cargarCategorias = async () => {
      try {
        const datos = await listarCategoriasService()
        dispatch(setCategorias(datos))
      } catch {
        toast.error('No se pudieron cargar las categorías')
      }
    }
    cargarCategorias()
  }, [categorias.length, dispatch])

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
