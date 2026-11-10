import { useState } from 'react'
import { toast } from 'react-toastify'
import { Pencil, Trash2 } from 'lucide-react'
import EstadoBadge from './EstadoBadge'
import FilaEdicionPostulacion from './FilaEdicionPostulacion'
import { eliminarPostulacionService } from '../../services/postulaciones.service'
import { obtenerError } from '../../utils/errores'
import { fechaDesdeId, formatearFecha } from '../../utils/fechas'
import { capitalizar } from '../../utils/textos'

// Una fila de la tabla. Cada fila tiene su propio estado (si se está editando o borrando)
const FilaPostulacion = ({ postulacion, onEliminada, onActualizada }) => {
  const [editando, setEditando] = useState(false)
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

  const alGuardar = () => {
    setEditando(false)
    onActualizada()
  }

  // En modo edición se dibuja la otra versión de la fila
  if (editando) {
    return (
      <FilaEdicionPostulacion
        postulacion={postulacion}
        onCancelar={() => setEditando(false)}
        onGuardada={alGuardar}
      />
    )
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
          <div className="confirmar">
            <button
              type="button"
              className="btn-icono"
              onClick={() => setEditando(true)}
              title="Editar"
              aria-label={`Editar postulación a ${postulacion.puesto}`}
            >
              <Pencil size={18} />
            </button>
            <button
              type="button"
              className="btn-icono btn-icono--peligro"
              onClick={() => setConfirmando(true)}
              title="Eliminar"
              aria-label={`Eliminar postulación a ${postulacion.puesto}`}
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </td>
    </tr>
  )
}

export default FilaPostulacion
