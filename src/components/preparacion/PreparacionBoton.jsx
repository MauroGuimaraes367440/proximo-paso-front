import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Sparkles } from 'lucide-react'
import { generarPreparacionService } from '../../services/postulaciones.service'
import { setPreparacion } from '../../features/preparacion/preparacion.slice'
import { obtenerError } from '../../utils/errores'

const PreparacionBoton = ({ postulacionId, yaGenerada }) => {
  const dispatch = useDispatch()
  const [generando, setGenerando] = useState(false)

  const generar = async () => {
    setGenerando(true)
    try {
      const datos = await generarPreparacionService(postulacionId)
      dispatch(setPreparacion(datos))
    } catch (error) {
      toast.error(obtenerError(error).mensaje)
    } finally {
      setGenerando(false)
    }
  }

  let texto = 'Generar preparación'
  if (generando) texto = 'Generando… (puede tardar unos segundos)'
  else if (yaGenerada) texto = 'Generar otra'

  return (
    <button type="button" className="btn btn--primario" onClick={generar} disabled={generando}>
      <Sparkles size={18} aria-hidden="true" />
      {texto}
    </button>
  )
}

export default PreparacionBoton
