import { useState } from 'react'
import { toast } from 'react-toastify'
import { ImageOff, ImageUp, Pencil, Trash2 } from 'lucide-react'
import RenombrarCategoriaForm from './RenombrarCategoriaForm'
import ImagenCategoriaForm from './ImagenCategoriaForm'
import { eliminarCategoriaService } from '../../services/categorias.service'
import { obtenerError } from '../../utils/errores'
import { capitalizar } from '../../utils/textos'

const TarjetaCategoria = ({ categoria, onCambio }) => {
  const [modo, setModo] = useState('normal')
  const [eliminando, setEliminando] = useState(false)

  const alTerminar = () => {
    setModo('normal')
    onCambio()
  }

  const eliminar = async () => {
    setEliminando(true)
    try {
      await eliminarCategoriaService(categoria._id)
      toast.success('Categoría eliminada')
      onCambio()
    } catch (error) {
      toast.error(obtenerError(error).mensaje)
      setEliminando(false)
      setModo('normal')
    }
  }

  return (
    <article className="tarjeta-categoria">
      {categoria.imagenUrl ? (
        <img src={categoria.imagenUrl} alt={categoria.nombre} className="tarjeta-categoria__imagen" />
      ) : (
        <div className="tarjeta-categoria__imagen tarjeta-categoria__imagen--vacia">
          <ImageOff size={28} aria-hidden="true" />
          <span>Sin imagen</span>
        </div>
      )}

      <div className="tarjeta-categoria__cuerpo">
        {modo === 'normal' && (
          <>
            <h2 className="tarjeta-categoria__nombre">{capitalizar(categoria.nombre)}</h2>
            <div className="tarjeta-categoria__acciones">
              <button type="button" className="btn-icono" onClick={() => setModo('renombrar')} title="Renombrar" aria-label={`Renombrar ${categoria.nombre}`}>
                <Pencil size={18} />
              </button>
              <button type="button" className="btn-icono" onClick={() => setModo('imagen')} title="Subir imagen" aria-label={`Subir imagen de ${categoria.nombre}`}>
                <ImageUp size={18} />
              </button>
              <button type="button" className="btn-icono btn-icono--peligro" onClick={() => setModo('borrar')} title="Eliminar" aria-label={`Eliminar ${categoria.nombre}`}>
                <Trash2 size={18} />
              </button>
            </div>
          </>
        )}

        {modo === 'renombrar' && (
          <RenombrarCategoriaForm categoria={categoria} onCancelar={() => setModo('normal')} onListo={alTerminar} />
        )}

        {modo === 'imagen' && (
          <ImagenCategoriaForm categoria={categoria} onCancelar={() => setModo('normal')} onListo={alTerminar} />
        )}

        {modo === 'borrar' && (
          <div className="confirmar">
            <span>¿Eliminar "{capitalizar(categoria.nombre)}"?</span>
            <button type="button" className="btn btn--peligro btn--chico" onClick={eliminar} disabled={eliminando}>
              {eliminando ? 'Eliminando…' : 'Sí'}
            </button>
            <button type="button" className="btn btn--secundario btn--chico" onClick={() => setModo('normal')} disabled={eliminando}>
              No
            </button>
          </div>
        )}
      </div>
    </article>
  )
}

export default TarjetaCategoria
