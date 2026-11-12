import { useId, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { toast } from 'react-toastify'
import AlertaError from '../common/AlertaError'
import { crearPostulacionSchema } from '../../validators/postulaciones.validators'
import { crearPostulacionService } from '../../services/postulaciones.service'
import { obtenerError } from '../../utils/errores'
import { ESTADOS } from '../../utils/estados'
import { capitalizar } from '../../utils/textos'

const PostulacionForm = ({ valoresIniciales }) => {
  const puestoId = useId()
  const empresaId = useId()
  const categoriaId = useId()
  const estadoId = useId()
  const descripcionId = useId()
  const enlaceId = useId()
  const notasId = useId()

  const navigate = useNavigate()
  const categorias = useSelector(state => state.categorias.lista)
  const [errorApi, setErrorApi] = useState(null)

  const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({
    resolver: joiResolver(crearPostulacionSchema),
    mode: 'onChange',
    defaultValues: {
      puesto: '',
      empresa: '',
      categoria: '',
      estado: 'guardada',
      descripcion: '',
      enlace: '',
      notas: '',
      ...valoresIniciales
    }
  })

  const crear = async (data) => {
    setErrorApi(null)
    try {
      await crearPostulacionService(data)
      toast.success('Postulación agregada')
      navigate('/postulaciones')
    } catch (error) {
      setErrorApi(obtenerError(error))
    }
  }

  return (
    <form className="formulario tarjeta" onSubmit={handleSubmit(crear)} noValidate>
      <AlertaError error={errorApi} />

      <div className="formulario__grilla">
        <div className="campo">
          <label htmlFor={puestoId}>Puesto</label>
          <input
            id={puestoId}
            type="text"
            placeholder="Ej: Desarrollador Frontend"
            aria-invalid={errors.puesto ? 'true' : 'false'}
            {...register('puesto')}
          />
          {errors.puesto && <span className="campo__error">{errors.puesto.message}</span>}
        </div>

        <div className="campo">
          <label htmlFor={empresaId}>Empresa</label>
          <input
            id={empresaId}
            type="text"
            placeholder="Ej: Globant"
            aria-invalid={errors.empresa ? 'true' : 'false'}
            {...register('empresa')}
          />
          {errors.empresa && <span className="campo__error">{errors.empresa.message}</span>}
        </div>

        <div className="campo">
          <label htmlFor={categoriaId}>Categoría</label>
          <select id={categoriaId} aria-invalid={errors.categoria ? 'true' : 'false'} {...register('categoria')}>
            <option value="">Elegí una categoría</option>
            {categorias.map(c => (
              <option key={c._id} value={c._id}>{capitalizar(c.nombre)}</option>
            ))}
          </select>
          {errors.categoria && <span className="campo__error">{errors.categoria.message}</span>}
        </div>

        <div className="campo">
          <label htmlFor={estadoId}>Estado</label>
          <select id={estadoId} {...register('estado')}>
            {ESTADOS.map(e => (
              <option key={e.valor} value={e.valor}>{e.texto}</option>
            ))}
          </select>
        </div>

        <div className="campo campo--completo">
          <label htmlFor={descripcionId}>Descripción</label>
          <textarea
            id={descripcionId}
            rows={5}
            placeholder="Pegá acá la descripción del puesto: tareas, requisitos, beneficios…"
            aria-invalid={errors.descripcion ? 'true' : 'false'}
            {...register('descripcion')}
          />
          {errors.descripcion && <span className="campo__error">{errors.descripcion.message}</span>}
        </div>

        <div className="campo campo--completo">
          <label htmlFor={enlaceId}>
            Enlace a la oferta <span className="texto-suave">(opcional)</span>
          </label>
          <input
            id={enlaceId}
            type="url"
            placeholder="https://..."
            aria-invalid={errors.enlace ? 'true' : 'false'}
            {...register('enlace')}
          />
          {errors.enlace && <span className="campo__error">{errors.enlace.message}</span>}
        </div>

        <div className="campo campo--completo">
          <label htmlFor={notasId}>
            Notas <span className="texto-suave">(opcional)</span>
          </label>
          <textarea
            id={notasId}
            rows={3}
            placeholder="Contactos, fechas, impresiones de la entrevista…"
            aria-invalid={errors.notas ? 'true' : 'false'}
            {...register('notas')}
          />
          {errors.notas && <span className="campo__error">{errors.notas.message}</span>}
        </div>
      </div>

      <div className="formulario__acciones">
        <Link to="/postulaciones" className="btn btn--secundario">Cancelar</Link>
        <button type="submit" className="btn btn--primario" disabled={!isValid || isSubmitting}>
          {isSubmitting ? 'Guardando…' : 'Guardar postulación'}
        </button>
      </div>
    </form>
  )
}

export default PostulacionForm
