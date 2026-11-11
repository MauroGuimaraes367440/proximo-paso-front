import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Tags } from 'lucide-react'
import EncabezadoPagina from '../../components/common/EncabezadoPagina'
import NuevaCategoriaForm from '../../components/categorias/NuevaCategoriaForm'
import TarjetaCategoria from '../../components/categorias/TarjetaCategoria'
import { listarCategoriasService } from '../../services/categorias.service'
import { setCategorias } from '../../features/categorias/categorias.slice'

const CategoriasPage = () => {
  const dispatch = useDispatch()
  // Las categorías ya están en Redux: las cargó AppLayout al entrar a la app
  const categorias = useSelector(state => state.categorias.lista)

  // Después de crear, renombrar, subir imagen o borrar: se vuelven a pedir
  // y se actualiza Redux. Como Redux es compartido, también se actualizan
  // los filtros y formularios de postulaciones de toda la app
  const recargar = async () => {
    try {
      const datos = await listarCategoriasService()
      dispatch(setCategorias(datos))
    } catch {
      toast.error('No se pudieron actualizar las categorías')
    }
  }

  return (
    <section>
      <EncabezadoPagina
        titulo="Categorías"
        descripcion="Las categorías que los usuarios eligen para clasificar sus postulaciones."
      />

      <NuevaCategoriaForm onCreada={recargar} />

      {categorias.length === 0 ? (
        <div className="tarjeta vacio">
          <Tags size={32} aria-hidden="true" />
          <p>Todavía no hay categorías. Creá la primera arriba.</p>
        </div>
      ) : (
        <div className="grilla-categorias">
          {categorias.map(categoria => (
            <TarjetaCategoria key={categoria._id} categoria={categoria} onCambio={recargar} />
          ))}
        </div>
      )}
    </section>
  )
}

export default CategoriasPage
