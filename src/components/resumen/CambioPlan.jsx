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

  return (
    <div className="cambio-plan">
      <p>
        <strong>Pasate a Premium</strong> para registrar postulaciones sin límite.
      </p>
      <button type="button" className="btn btn--premium" onClick={pasarAPremium} disabled={cambiando}>
        <Crown size={18} aria-hidden="true" />
        {cambiando ? 'Cambiando…' : 'Pasar a Premium'}
      </button>
    </div>
  )
}

export default CambioPlan
