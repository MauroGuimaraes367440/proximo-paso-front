import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useSearchParams } from 'react-router'
import { BriefcaseBusiness, Plus, SearchX } from 'lucide-react'
import EncabezadoPagina from '../../components/common/EncabezadoPagina'
import AlertaError from '../../components/common/AlertaError'
import Paginacion from '../../components/common/Paginacion'
import TablaPostulaciones from '../../components/postulaciones/TablaPostulaciones'
import FiltrosPostulaciones from '../../components/postulaciones/FiltrosPostulaciones'
import { listarPostulacionesService } from '../../services/postulaciones.service'
import { setPostulaciones } from '../../features/postulaciones/postulaciones.slice'
import { obtenerError } from '../../utils/errores'

const POR_PAGINA = 10

const PostulacionesPage = () => {
  const dispatch = useDispatch()
  const { lista, page, totalPages, total } = useSelector(state => state.postulaciones)
  const categorias = useSelector(state => state.categorias.lista)

  // Página y filtros viven en la URL: /postulaciones?estado=enviada&page=2
  const [searchParams, setSearchParams] = useSearchParams()
  const paginaPedida = Number(searchParams.get('page')) || 1
  const estado = searchParams.get('estado') || ''
  const categoria = searchParams.get('categoria') || ''

  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  // Contador que se suma para volver a pedir la lista (ej: después de borrar)
  const [recargas, setRecargas] = useState(0)

  useEffect(() => {
    const cargar = async () => {
      setCargando(true)
      setError(null)

      // La API rechaza filtros vacíos, así que solo se mandan los que tienen valor
      const params = { page: paginaPedida, limit: POR_PAGINA }
      if (estado) params.estado = estado
      if (categoria) params.categoria = categoria

      try {
        const datos = await listarPostulacionesService(params)
        dispatch(setPostulaciones(datos))
      } catch (err) {
        setError(obtenerError(err))
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [paginaPedida, estado, categoria, recargas, dispatch])

  const cambiarFiltro = (nombre, valor) => {
    const nuevos = new URLSearchParams(searchParams)
    if (valor) {
      nuevos.set(nombre, valor)
    } else {
      nuevos.delete(nombre)
    }
    nuevos.delete('page')
    setSearchParams(nuevos)
  }

  const limpiarFiltros = () => {
    setSearchParams({})
  }

  const cambiarPagina = (nueva) => {
    const nuevos = new URLSearchParams(searchParams)
    nuevos.set('page', nueva)
    setSearchParams(nuevos)
  }

  const recargar = () => {
    setRecargas(recargas + 1)
  }

  const alEliminar = () => {
    if (lista.length === 1 && paginaPedida > 1) {
      cambiarPagina(paginaPedida - 1)
    } else {
      recargar()
    }
  }

  const hayFiltros = estado !== '' || categoria !== ''

  let descripcion = 'Todas tus postulaciones en un solo lugar.'
  if (hayFiltros) {
    descripcion = `${total} con estos filtros`
  } else if (total > 0) {
    descripcion = `${total} en total`
  }

  return (
    <section>
      <EncabezadoPagina titulo="Postulaciones" descripcion={descripcion}>
        <Link to="/postulaciones/nueva" className="btn btn--primario">
          <Plus size={18} aria-hidden="true" />
          Nueva postulación
        </Link>
      </EncabezadoPagina>

      <FiltrosPostulaciones
        estado={estado}
        categoria={categoria}
        categorias={categorias}
        onCambiar={cambiarFiltro}
        onLimpiar={limpiarFiltros}
      />

      <AlertaError error={error} />

      {cargando && <p className="tarjeta texto-suave">Cargando postulaciones…</p>}

      {!cargando && !error && lista.length === 0 && (
        hayFiltros ? (
          <div className="tarjeta vacio">
            <SearchX size={32} aria-hidden="true" />
            <p>No hay postulaciones con esos filtros.</p>
          </div>
        ) : (
          <div className="tarjeta vacio">
            <BriefcaseBusiness size={32} aria-hidden="true" />
            <p>Todavía no tenés postulaciones.</p>
            <Link to="/postulaciones/nueva" className="btn btn--primario btn--chico">Agregar la primera</Link>
          </div>
        )
      )}

      {!cargando && lista.length > 0 && (
        <>
          <TablaPostulaciones postulaciones={lista} onEliminada={alEliminar} onActualizada={recargar} />
          <Paginacion page={page} totalPages={totalPages} onCambiar={cambiarPagina} />
        </>
      )}
    </section>
  )
}

export default PostulacionesPage
