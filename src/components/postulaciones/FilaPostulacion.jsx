import { useState } from 'react'
import { toast } from 'react-toastify'
import { Trash2 } from 'lucide-react'
import EstadoBadge from './EstadoBadge'
import { eliminarPostulacionService } from '../../services/postulaciones.service'
import { obtenerError } from '../../utils/errores'
import { fechaDesdeId, formatearFecha } from '../../utils/fechas'
import { capitalizar } from '../../utils/textos'

// Una fila de la tabla. Cada fila tiene su propio estado (si está confirmando el borrado)
const FilaPostulacion = ({ postulacion, onEliminada }) => {
  const [confirmando, setConfirmando] = useState(false)
  const [eliminando, setEliminando] = useState(false)

  const eliminar = async () => {
    setEliminando(true)
    try {
      await eliminarPostulacionService(postulacion._id)
      toast.success('Postulación eliminada')
      onEliminada()
    } catch (error) {
      toast.error(obtenerError(error).mensaje)
      setEliminando(false)
      setConfirmando(false)
    }
  }

  return (
    <tr>
      <td data-label="Puesto" className="tabla__principal">{postulacion.puesto}</td>
      <td data-label="Empresa">{postulacion.empresa}</td>
      <td data-label="Categoría">
        {postulacion.categoria ? capitalizar(postulacion.categoria.nombre) : 'Sin categoría'}
      </td>
      <td data-label="Estado"><EstadoBadge estado={postulacion.estado} /></td>
      <td data-label="Agregada" className="texto-suave">
        {formatearFecha(fechaDesdeId(postulacion._id))}
      </td>
      <td className="tabla__acciones">
        {confirmando ? (
          <div className="confirmar">
            <span>¿Eliminar?</span>
            <button type="button" className="btn btn--peligro btn--chico" onClick={eliminar} disabled={eliminando}>
              {eliminando ? 'Eliminando…' : 'Sí'}
            </button>
            <button type="button" className="btn btn--secundario btn--chico" onClick={() => setConfirmando(false)} disabled={eliminando}>
              No
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn-icono"
            onClick={() => setConfirmando(true)}
            title="Eliminar"
            aria-label={`Eliminar postulación a ${postulacion.puesto}`}
          >
            <Trash2 size={18} />
          </button>
        )}
      </td>
    </tr>
  )
}

export default FilaPostulacion
