import { useId } from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { Search } from 'lucide-react'
import { busquedaOfertasSchema } from '../../validators/ofertas.validators'

const BuscadorOfertas = ({ busqueda, ubicacion, onBuscar }) => {
  const busquedaId = useId()
  const ubicacionId = useId()

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: joiResolver(busquedaOfertasSchema),
    mode: 'onChange',
    defaultValues: { busqueda, ubicacion }
  })

  return (
    <form className="tarjeta buscador" onSubmit={handleSubmit(onBuscar)} noValidate>
      <div className="campo">
        <label htmlFor={busquedaId}>Puesto o palabra clave</label>
        <input
          id={busquedaId}
          type="text"
          placeholder="Ej: react, diseñador, contador"
          aria-invalid={errors.busqueda ? 'true' : 'false'}
          {...register('busqueda')}
        />
        {errors.busqueda && <span className="campo__error">{errors.busqueda.message}</span>}
      </div>

      <div className="campo">
        <label htmlFor={ubicacionId}>Ubicación</label>
        <input
          id={ubicacionId}
          type="text"
          placeholder="Ej: Montevideo, remoto"
          aria-invalid={errors.ubicacion ? 'true' : 'false'}
          {...register('ubicacion')}
        />
        {errors.ubicacion && <span className="campo__error">{errors.ubicacion.message}</span>}
      </div>

      <button type="submit" className="btn btn--primario" disabled={!isValid}>
        <Search size={18} aria-hidden="true" />
        Buscar
      </button>
    </form>
  )
}

export default BuscadorOfertas
