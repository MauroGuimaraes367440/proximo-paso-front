import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router'
import { Lock, Sparkles } from 'lucide-react'
import EncabezadoPagina from '../../components/common/EncabezadoPagina'
import AlertaError from '../../components/common/AlertaError'
import PostulacionForm from '../../components/postulaciones/PostulacionForm'
import { listarPostulacionesService } from '../../services/postulaciones.service'
import { obtenerError } from '../../utils/errores'
import { LIMITE_PLUS } from '../../utils/planes'
import { limpiarHtml } from '../../utils/textos'

// Convierte una oferta de Jooble en los valores iniciales del formulario.
const valoresDesdeOferta = (oferta) => ({
  puesto: limpiarHtml(oferta.puesto).slice(0, 100),
  empresa: limpiarHtml(oferta.empresa).slice(0, 100),
  descripcion: limpiarHtml(oferta.descripcion).slice(0, 5000),
  enlace: oferta.enlace || '',
  notas: oferta.ubicacion ? `Ubicación: ${oferta.ubicacion}` : ''
})

const NuevaPostulacionPage = () => {
  const usuario = useSelector(state => state.auth.usuario)
  const esPlus = usuario.plan === 'plus'

  // Si se llegó desde Ofertas con "Guardar como postulación", la oferta viene en el
  // state de la navegación. Si se entró de otra forma (o se recargó), es undefined
  const location = useLocation()
  const oferta = location.state?.oferta
  const valoresIniciales = oferta ? valoresDesdeOferta(oferta) : {}

  const [total, setTotal] = useState(0)
  const [verificando, setVerificando] = useState(esPlus)
  const [error, setError] = useState(null)

  // Solo el plan Plus tiene límite: se pregunta cuántas postulaciones hay en total.
  // Con limit=1 la API trae una sola postulación, pero igual devuelve el "total"
  useEffect(() => {
    if (!esPlus) return

    const contar = async () => {
      try {
        const datos = await listarPostulacionesService({ page: 1, limit: 1 })
        setTotal(datos.total)
      } catch (err) {
        setError(obtenerError(err))
      } finally {
        setVerificando(false)
      }
    }
    contar()
  }, [esPlus])

  const limiteAlcanzado = esPlus && total >= LIMITE_PLUS

  let descripcion = 'Plan Premium: postulaciones ilimitadas.'
  if (esPlus) {
    descripcion = verificando ? 'Plan Plus' : `Plan Plus: usaste ${total} de ${LIMITE_PLUS} postulaciones.`
  }

  return (
    <section className="pagina-angosta">
      <EncabezadoPagina titulo="Nueva postulación" descripcion={descripcion} />

      <AlertaError error={error} />

      {verificando && <p className="tarjeta texto-suave">Verificando tu plan…</p>}

      {!verificando && limiteAlcanzado && (
        <div className="tarjeta vacio">
          <Lock size={32} aria-hidden="true" />
          <p>Alcanzaste el límite de {LIMITE_PLUS} postulaciones del plan Plus.</p>
          <p>Pasate a Premium desde el Resumen para agregar sin límite, o eliminá alguna postulación.</p>
          <div className="formulario__acciones">
            <Link to="/postulaciones" className="btn btn--secundario">Ver mis postulaciones</Link>
            <Link to="/dashboard" className="btn btn--primario">Ir al Resumen</Link>
          </div>
        </div>
      )}

      {!verificando && !error && !limiteAlcanzado && (
        <>
          {oferta && (
            <p className="aviso-precarga">
              <Sparkles size={16} aria-hidden="true" />
              Datos precargados desde la oferta. Elegí una categoría y revisá antes de guardar.
            </p>
          )}
          <PostulacionForm valoresIniciales={valoresIniciales} />
        </>
      )}
    </section>
  )
}

export default NuevaPostulacionPage
