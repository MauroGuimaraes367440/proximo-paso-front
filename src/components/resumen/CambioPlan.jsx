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
      // El usuario nuevo (con plan "premium") se guarda en los dos lugares:
      guardarUsuario(datos.usuario)              // localStorage → sobrevive al F5
      dispatch(actualizarUsuario(datos.usuario)) // Redux → la pantalla se actualiza ya
      toast.success('¡Ya sos Premium! Postulaciones ilimitadas.')
    } catch (error) {
      toast.error(obtenerError(error).mensaje)
      setCambiando(false)
    }
  }

  // Componente aparte (requisito 6.1.2 de la letra): su propia tarjeta en el Resumen
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
