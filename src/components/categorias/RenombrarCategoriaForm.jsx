import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { toast } from 'react-toastify'
import { categoriaSchema } from '../../validators/categorias.validators'
import { renombrarCategoriaService } from '../../services/categorias.service'
import { obtenerError } from '../../utils/errores'

// Mismo esquema que crear; arranca con el nombre actual
const RenombrarCategoriaForm = ({ categoria, onCancelar, onListo }) => {
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({
    resolver: joiResolver(categoriaSchema),
    mode: 'onChange',
    defaultValues: { nombre: categoria.nombre }
  })

  const renombrar = async (data) => {
    try {
      await renombrarCategoriaService(categoria._id, data.nombre)
      toast.success('Categoría renombrada')
      onListo()
    } catch (error) {
      toast.error(obtenerError(error).mensaje)
    }
  }

  return (
    <form className="formulario" onSubmit={handleSubmit(renombrar)} noValidate>
      <div className="campo">
        <input
          type="text"
          aria-label="Nuevo nombre"
          aria-invalid={errors.nombre ? 'true' : 'false'}
          {...register('nombre')}
        />
        {errors.nombre && <span className="campo__error">{errors.nombre.message}</span>}
      </div>
      <div className="formulario__acciones">
        <button type="button" className="btn btn--secundario btn--chico" onClick={onCancelar} disabled={isSubmitting}>
          Cancelar
        </button>
        <button type="submit" className="btn btn--primario btn--chico" disabled={!isValid || isSubmitting}>
          {isSubmitting ? 'Guardando…' : 'Guardar'}
        </button>
      </div>
    </form>
  )
}

export default RenombrarCategoriaForm
