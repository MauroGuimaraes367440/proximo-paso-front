import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Upload } from 'lucide-react'
import { subirImagenCategoriaService } from '../../services/categorias.service'
import { TIPOS_IMAGEN, TAMANO_MAXIMO } from '../../validators/categorias.validators'
import { obtenerError } from '../../utils/errores'

// Basado en el UploadForm de clase: un input type="file" registrado con useForm.
// Sin Joi: las reglas van en register (como el "required" de clase), con "validate"
const ImagenCategoriaForm = ({ categoria, onCancelar, onListo }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ mode: 'onChange' })

  const subir = async (data) => {
    // Un input file devuelve una lista de archivos: nos quedamos con el primero
    const archivo = data.imagen[0]
    try {
      await subirImagenCategoriaService(categoria._id, archivo)
      toast.success('Imagen subida')
      onListo()
    } catch (error) {
      // Ej: 413 "La imagen no puede superar los 3 MiB"
      toast.error(obtenerError(error).mensaje)
    }
  }

  return (
    <form className="formulario" onSubmit={handleSubmit(subir)} noValidate>
      <div className="campo">
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          aria-label="Imagen de la categoría"
          {...register('imagen', {
            required: 'Elegí una imagen',
            validate: {
              tipo: (archivos) => TIPOS_IMAGEN.includes(archivos[0]?.type) || 'Solo JPG, PNG o WEBP',
              tamano: (archivos) => archivos[0]?.size <= TAMANO_MAXIMO || 'La imagen no puede superar los 3 MB'
            }
          })}
        />
        {errors.imagen && <span className="campo__error">{errors.imagen.message}</span>}
      </div>
      <div className="formulario__acciones">
        <button type="button" className="btn btn--secundario btn--chico" onClick={onCancelar} disabled={isSubmitting}>
          Cancelar
        </button>
        <button type="submit" className="btn btn--primario btn--chico" disabled={isSubmitting}>
          <Upload size={16} aria-hidden="true" />
          {isSubmitting ? 'Subiendo…' : 'Subir'}
        </button>
      </div>
    </form>
  )
}

export default ImagenCategoriaForm
