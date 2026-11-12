import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'
import { toast } from 'react-toastify'
import { Pencil, Sparkles, Tag, Trash2 } from 'lucide-react'
import EstadoBadge from './EstadoBadge'
import FilaEdicionPostulacion from './FilaEdicionPostulacion'
import { eliminarPostulacionService } from '../../services/postulaciones.service'
import { obtenerError } from '../../utils/errores'
import { fechaDesdeId, formatearFecha } from '../../utils/fechas'
import { capitalizar } from '../../utils/textos'

const FilaPostulacion = ({ postulacion, onEliminada, onActualizada }) => {
  const [editando, setEditando] = useState(false)
  const [confirmando, setConfirmando] = useState(false)
  const [eliminando, setEliminando] = useState(false)

  const categorias = useSelector(state => state.categorias.lista)
  const categoriaCompleta = postulacion.categoria
    ? categorias.find(c => c._id === postulacion.categoria._id)
    : null
  const imagenCategoria = categoriaCompleta?.imagenUrl

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
      <td data-label="Puesto" className="tabla__principal">
        <Link to={`/postulaciones/${postulacion._id}`} className="enlace-fila">{postulacion.puesto}</Link>
      </td>
      <td data-label="Empresa">{postulacion.empresa}</td>
      <td data-label="Categoría">
        {postulacion.categoria ? (
          <span className="categoria-mini">
            {imagenCategoria ? (
              <img src={imagenCategoria} alt="" className="categoria-mini__imagen" />
            ) : (
              <span className="categoria-mini__imagen categoria-mini__imagen--vacia">
                <Tag size={14} aria-hidden="true" />
              </span>
            )}
            {capitalizar(postulacion.categoria.nombre)}
          </span>
        ) : (
          <span className="texto-suave">Sin categoría</span>
        )}
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
            <Link
              to={`/postulaciones/${postulacion._id}`}
              className="btn-icono btn-icono--ia"
              title="Ver detalle y preparar la entrevista con IA"
              aria-label={`Ver detalle de ${postulacion.puesto} y preparar la entrevista`}
            >
              <Sparkles size={18} />
            </Link>
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
