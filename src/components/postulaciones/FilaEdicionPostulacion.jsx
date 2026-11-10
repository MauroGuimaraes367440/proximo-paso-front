import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { toast } from 'react-toastify'
import { Check, X } from 'lucide-react'
import { editarFilaSchema } from '../../validators/postulaciones.validators'
import { actualizarPostulacionService } from '../../services/postulaciones.service'
import { obtenerError } from '../../utils/errores'
import { ESTADOS } from '../../utils/estados'
import { capitalizar } from '../../utils/textos'
import { fechaDesdeId, formatearFecha } from '../../utils/fechas'

// La fila en modo edición: los textos se convierten en inputs
const FilaEdicionPostulacion = ({ postulacion, onCancelar, onGuardada }) => {
  const categorias = useSelector(state => state.categorias.lista)

  // defaultValues: el formulario arranca con los datos actuales de la postulación
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({
    resolver: joiResolver(editarFilaSchema),
    mode: 'onChange',
    defaultValues: {
      puesto: postulacion.puesto,
      empresa: postulacion.empresa,
      categoria: postulacion.categoria ? postulacion.categoria._id : '',
      estado: postulacion.estado
    }
  })

  const guardar = async (data) => {
    try {
      await actualizarPostulacionService(postulacion._id, data)
      toast.success('Cambios guardados')
      onGuardada()
    } catch (error) {
      toast.error(obtenerError(error).mensaje)
    }
  }

  return (
    <tr className="tabla__fila--editando">
      <td data-label="Puesto">
        <div className="celda-edicion">
          <input type="text" aria-label="Puesto" aria-invalid={errors.puesto ? 'true' : 'false'} {...register('puesto')} />
          {errors.puesto && <span className="campo__error">{errors.puesto.message}</span>}
        </div>
      </td>
      <td data-label="Empresa">
        <div className="celda-edicion">
          <input type="text" aria-label="Empresa" aria-invalid={errors.empresa ? 'true' : 'false'} {...register('empresa')} />
          {errors.empresa && <span className="campo__error">{errors.empresa.message}</span>}
        </div>
      </td>
      <td data-label="Categoría">
        <div className="celda-edicion">
          <select aria-label="Categoría" aria-invalid={errors.categoria ? 'true' : 'false'} {...register('categoria')}>
            <option value="">Elegí…</option>
            {categorias.map(c => (
              <option key={c._id} value={c._id}>{capitalizar(c.nombre)}</option>
            ))}
          </select>
          {errors.categoria && <span className="campo__error">{errors.categoria.message}</span>}
        </div>
      </td>
      <td data-label="Estado">
        <div className="celda-edicion">
          <select aria-label="Estado" {...register('estado')}>
            {ESTADOS.map(e => (
              <option key={e.valor} value={e.valor}>{e.texto}</option>
            ))}
          </select>
        </div>
      </td>
      <td data-label="Agregada" className="texto-suave">
        {formatearFecha(fechaDesdeId(postulacion._id))}
      </td>
      <td className="tabla__acciones">
        <div className="confirmar">
          {/* No hay <form> (no puede ir dentro de un <tr>): el botón llama a handleSubmit directamente */}
          <button
            type="button"
            className="btn btn--primario btn--chico"
            onClick={handleSubmit(guardar)}
            disabled={!isValid || isSubmitting}
          >
            <Check size={16} aria-hidden="true" />
            {isSubmitting ? 'Guardando…' : 'Guardar'}
          </button>
          <button type="button" className="btn btn--secundario btn--chico" onClick={onCancelar} disabled={isSubmitting}>
            <X size={16} aria-hidden="true" />
            Cancelar
          </button>
        </div>
      </td>
    </tr>
  )
}

export default FilaEdicionPostulacion
