import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'
import { Plus } from 'lucide-react'
import EncabezadoPagina from '../../components/common/EncabezadoPagina'
import AlertaError from '../../components/common/AlertaError'
import InformeUso from '../../components/resumen/InformeUso'
import CambioPlan from '../../components/resumen/CambioPlan'
import GraficoEstados from '../../components/resumen/GraficoEstados'
import ResumenAdmin from '../../components/resumen/ResumenAdmin'
import { contarPorEstadoService } from '../../services/postulaciones.service'
import { setResumen } from '../../features/resumen/resumen.slice'
import { obtenerError } from '../../utils/errores'

const DashboardPage = () => {
  const dispatch = useDispatch()
  const usuario = useSelector(state => state.auth.usuario)
  const esAdmin = usuario.rol === 'admin'

  const [cargando, setCargando] = useState(!esAdmin)
  const [error, setError] = useState(null)

  // Al entrar: se cuentan las postulaciones por estado y se guardan en Redux.
  // El admin no tiene postulaciones (la API le respondería 403), así que no se pide nada
  useEffect(() => {
    if (esAdmin) return

    const cargar = async () => {
      try {
        const conteos = await contarPorEstadoService()
        dispatch(setResumen(conteos))
      } catch (err) {
        setError(obtenerError(err))
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [esAdmin, dispatch])

  if (esAdmin) {
    return (
      <section>
        <EncabezadoPagina titulo={`Hola, ${usuario.username}`} descripcion="Panel de administración." />
        <ResumenAdmin />
      </section>
    )
  }

  return (
    <section>
      <EncabezadoPagina titulo={`Hola, ${usuario.username}`} descripcion="Así vienen tus postulaciones.">
        <Link to="/postulaciones/nueva" className="btn btn--primario">
          <Plus size={18} aria-hidden="true" />
          Nueva postulación
        </Link>
      </EncabezadoPagina>

      <AlertaError error={error} />

      {cargando ? (
        <p className="tarjeta texto-suave">Cargando tu resumen…</p>
      ) : (
        !error && (
          <div className="resumen">
            <div className="resumen__columna">
              <InformeUso />
              {/* El cambio de plan solo corresponde si el usuario es Plus */}
              {usuario.plan === 'plus' && <CambioPlan />}
            </div>
            <GraficoEstados />
          </div>
        )
      )}
    </section>
  )
}

export default DashboardPage
