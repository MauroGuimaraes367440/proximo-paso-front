import { useId } from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { toast } from 'react-toastify'
import { Plus } from 'lucide-react'
import { categoriaSchema } from '../../validators/categorias.validators'
import { crearCategoriaService } from '../../services/categorias.service'
import { obtenerError } from '../../utils/errores'
import { capitalizar } from '../../utils/textos'

const NuevaCategoriaForm = ({ onCreada }) => {
  const nombreId = useId()

  // reset: vuelve los campos a vacío (para crear otra después de guardar)
  const { register, handleSubmit, reset, formState: { errors, isValid, isSubmitting } } = useForm({
    resolver: joiResolver(categoriaSchema),
    mode: 'onChange',
    defaultValues: { nombre: '' }
  })

  const crear = async (data) => {
    try {
      const categoria = await crearCategoriaService(data.nombre)
      toast.success(`Categoría "${capitalizar(categoria.nombre)}" creada`)
      reset()
      onCreada()
    } catch (error) {
      // Ej: 409 "La categoría ya existe"
      toast.error(obtenerError(error).mensaje)
    }
  }

  return (
    <form className="tarjeta nueva-categoria" onSubmit={handleSubmit(crear)} noValidate>
      <div className="campo">
        <label htmlFor={nombreId}>Nueva categoría</label>
        <input
          id={nombreId}
          type="text"
          placeholder="Ej: tecnología"
          aria-invalid={errors.nombre ? 'true' : 'false'}
          {...register('nombre')}
        />
        {errors.nombre && <span className="campo__error">{errors.nombre.message}</span>}
      </div>
      <button type="submit" className="btn btn--primario" disabled={!isValid || isSubmitting}>
        <Plus size={18} aria-hidden="true" />
        {isSubmitting ? 'Creando…' : 'Crear'}
      </button>
    </form>
  )
}

export default NuevaCategoriaForm
