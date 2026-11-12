import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import EncabezadoPagina from '../../components/common/EncabezadoPagina'
import AlertaError from '../../components/common/AlertaError'
import EstadoBadge from '../../components/postulaciones/EstadoBadge'
import PreparacionBoton from '../../components/preparacion/PreparacionBoton'
import PreparacionDisplay from '../../components/preparacion/PreparacionDisplay'
import CategoriaPostulacion from '../../components/categorias/CategoriaPostulacion'
import { obtenerPostulacionService } from '../../services/postulaciones.service'
import { resetPreparacion } from '../../features/preparacion/preparacion.slice'
import { obtenerError } from '../../utils/errores'
import { fechaDesdeId, formatearFecha } from '../../utils/fechas'

const DetallePostulacionPage = () => {
  // useParams lee la parte variable de la ruta: /postulaciones/:id → { id: '690d...' }
  const { id } = useParams()
  const dispatch = useDispatch()
  const hayPreparacion = useSelector(state => state.preparacion.texto) !== ''

  const [postulacion, setPostulacion] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const cargar = async () => {
      setCargando(true)
      setError(null)
      // Si se pasa de un detalle a otro, React reutiliza esta página:
      // se borra la postulación anterior para no mostrarla mientras carga (o si falla)
      setPostulacion(null)
      try {
        const datos = await obtenerPostulacionService(id)
        setPostulacion(datos)
      } catch (err) {
        setError(obtenerError(err))
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [id])

  useEffect(() => {
    return () => {
      dispatch(resetPreparacion())
    }
  }, [dispatch])

  return (
    <section>
      <Link to="/postulaciones" className="volver">
        <ArrowLeft size={16} aria-hidden="true" />
        Postulaciones
      </Link>

      {cargando && <p className="tarjeta texto-suave">Cargando postulación…</p>}

      <AlertaError error={error} />

      {!cargando && postulacion && (
        <>
          <EncabezadoPagina titulo={postulacion.puesto} descripcion={postulacion.empresa}>
            <EstadoBadge estado={postulacion.estado} />
          </EncabezadoPagina>

          <div className="detalle">
            <div className="detalle__principal">
              <article className="tarjeta">
                <h2 className="tarjeta__titulo">Descripción</h2>
                <p className="texto-largo">{postulacion.descripcion}</p>
              </article>

              <article className="tarjeta">
                <h2 className="tarjeta__titulo">Notas</h2>
                {postulacion.notas
                  ? <p className="texto-largo">{postulacion.notas}</p>
                  : <p className="texto-suave">Sin notas.</p>}
              </article>
            </div>

            <aside className="tarjeta tarjeta--con-portada">
              <CategoriaPostulacion categoria={postulacion.categoria} />
              <h2 className="tarjeta__titulo">Datos</h2>
              <dl className="datos">
                <dt>Agregada</dt>
                <dd>{formatearFecha(fechaDesdeId(postulacion._id))}</dd>
                <dt>Oferta</dt>
                <dd>
                  {postulacion.enlace ? (
                    <a href={postulacion.enlace} target="_blank" rel="noreferrer" className="enlace-externo">
                      Ver oferta <ExternalLink size={14} aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="texto-suave">Sin enlace</span>
                  )}
                </dd>
              </dl>
            </aside>
          </div>

          <article className="tarjeta preparacion">
            <div className="preparacion__encabezado">
              <div>
                <h2 className="tarjeta__titulo">Preparación para la entrevista</h2>
                <p className="texto-suave">
                  La IA arma posibles preguntas, temas para repasar y consejos a partir de esta postulación.
                </p>
              </div>
              <PreparacionBoton postulacionId={postulacion._id} yaGenerada={hayPreparacion} />
            </div>
            <PreparacionDisplay />
          </article>
        </>
      )}
    </section>
  )
}

export default DetallePostulacionPage
