import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Crown } from 'lucide-react'
import { cambiarPlanService } from '../../services/usuarios.service'
import { actualizarUsuario } from '../../features/auth/auth.slice'
import { guardarUsuario } from '../../utils/sesion'
import { obtenerError } from '../../utils/errores'

const CambioPlan = () => {
  const dispatch = useDispatch()
  const [cambiando, setCambiando] = useState(false)

  const pasarAPremium = async () => {
    setCambiando(true)
    try {
      const datos = await cambiarPlanService()
      guardarUsuario(datos.usuario)
      dispatch(actualizarUsuario(datos.usuario))
      toast.success('¡Ya sos Premium! Postulaciones ilimitadas.')
    } catch (error) {
      toast.error(obtenerError(error).mensaje)
      setCambiando(false)
    }
  }

  return (
    <article className="tarjeta cambio-plan">
      <h2 className="tarjeta__titulo">Plan Premium</h2>
      <p>
        Registrá <strong>postulaciones sin límite</strong>. Tu plan Plus permite hasta 4.
      </p>
      <button type="button" className="btn btn--premium" onClick={pasarAPremium} disabled={cambiando}>
        <Crown size={18} aria-hidden="true" />
        {cambiando ? 'Cambiando…' : 'Pasar a Premium'}
      </button>
    </article>
  )
}

export default CambioPlan
