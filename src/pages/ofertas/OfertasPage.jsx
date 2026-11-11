import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router'
import { SearchX, Telescope } from 'lucide-react'
import EncabezadoPagina from '../../components/common/EncabezadoPagina'
import AlertaError from '../../components/common/AlertaError'
import Paginacion from '../../components/common/Paginacion'
import BuscadorOfertas from '../../components/ofertas/BuscadorOfertas'
import TarjetaOferta from '../../components/ofertas/TarjetaOferta'
import { buscarOfertasService } from '../../services/ofertas.service'
import { setOfertas } from '../../features/ofertas/ofertas.slice'
import { obtenerError } from '../../utils/errores'

// Jooble devuelve 20 ofertas por página (la API no le pide otra cantidad)
const POR_PAGINA_JOOBLE = 20

const OfertasPage = () => {
  const dispatch = useDispatch()
  const { lista, page, total } = useSelector(state => state.ofertas)

  // Igual que en Postulaciones: la búsqueda vive en la URL
  // /ofertas?busqueda=react&ubicacion=montevideo&page=2
  const [searchParams, setSearchParams] = useSearchParams()
  const busqueda = searchParams.get('busqueda') || ''
  const ubicacion = searchParams.get('ubicacion') || ''
  const paginaPedida = Number(searchParams.get('page')) || 1

  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)

  const hayBusqueda = busqueda !== '' && ubicacion !== ''

  // Cada vez que cambia la búsqueda o la página en la URL, se consulta la API
  useEffect(() => {
    if (!hayBusqueda) return

    const buscar = async () => {
      setCargando(true)
      setError(null)
      try {
        const datos = await buscarOfertasService({ busqueda, ubicacion, page: paginaPedida })
        dispatch(setOfertas(datos))
      } catch (err) {
        // Ej: 503 "No se pudo consultar Jooble. Intentá nuevamente más tarde"
        setError(obtenerError(err))
      } finally {
        setCargando(false)
      }
    }
    buscar()
  }, [hayBusqueda, busqueda, ubicacion, paginaPedida, dispatch])

  // El buscador avisa con los datos ya validados; se ponen en la URL (página 1)
  const alBuscar = (datos) => {
    setSearchParams({ busqueda: datos.busqueda, ubicacion: datos.ubicacion })
  }

  const cambiarPagina = (nueva) => {
    const nuevos = new URLSearchParams(searchParams)
    nuevos.set('page', nueva)
    setSearchParams(nuevos)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const totalPaginas = Math.ceil(total / POR_PAGINA_JOOBLE)

  return (
    <section>
      <EncabezadoPagina
        titulo="Ofertas"
        descripcion="Buscá ofertas publicadas en Jooble y guardá las que te interesen como postulación."
      />

      {/* key: si la búsqueda de la URL cambia (ej: con el botón "atrás"), React crea
          el buscador de nuevo y sus inputs arrancan con los valores nuevos */}
      <BuscadorOfertas
        key={`${busqueda}|${ubicacion}`}
        busqueda={busqueda}
        ubicacion={ubicacion}
        onBuscar={alBuscar}
      />

      <AlertaError error={error} />

      {!hayBusqueda && (
        <div className="tarjeta vacio">
          <Telescope size={32} aria-hidden="true" />
          <p>Escribí un puesto y una ubicación para empezar a buscar.</p>
        </div>
      )}

      {hayBusqueda && cargando && <p className="tarjeta texto-suave">Buscando ofertas…</p>}

      {hayBusqueda && !cargando && !error && lista.length === 0 && (
        <div className="tarjeta vacio">
          <SearchX size={32} aria-hidden="true" />
          <p>No encontramos ofertas para "{busqueda}" en "{ubicacion}". Probá con otras palabras.</p>
        </div>
      )}

      {hayBusqueda && !cargando && lista.length > 0 && (
        <>
          <p className="texto-suave resultados__cantidad">
            {total.toLocaleString('es-UY')} ofertas encontradas
          </p>
          <div className="grilla-ofertas">
            {lista.map(oferta => (
              <TarjetaOferta key={oferta.idExterno} oferta={oferta} />
            ))}
          </div>
          <Paginacion page={page} totalPages={totalPaginas} onCambiar={cambiarPagina} />
        </>
      )}
    </section>
  )
}

export default OfertasPage
