import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router'
import { toast } from 'react-toastify'
import { BriefcaseBusiness, SearchX } from 'lucide-react'
import EncabezadoPagina from '../../components/common/EncabezadoPagina'
import AlertaError from '../../components/common/AlertaError'
import Paginacion from '../../components/common/Paginacion'
import TablaPostulaciones from '../../components/postulaciones/TablaPostulaciones'
import FiltrosPostulaciones from '../../components/postulaciones/FiltrosPostulaciones'
import { listarPostulacionesService } from '../../services/postulaciones.service'
import { listarCategoriasService } from '../../services/categorias.service'
import { setPostulaciones } from '../../features/postulaciones/postulaciones.slice'
import { setCategorias } from '../../features/categorias/categorias.slice'
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

  // Las categorías se piden una sola vez: si ya están en Redux, no se vuelven a pedir
  useEffect(() => {
    if (categorias.length > 0) return

    const cargarCategorias = async () => {
      try {
        const datos = await listarCategoriasService()
        dispatch(setCategorias(datos))
      } catch {
        toast.error('No se pudieron cargar las categorías')
      }
    }
    cargarCategorias()
  }, [categorias.length, dispatch])

  // Se vuelve a ejecutar cada vez que cambia la página o algún filtro
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

  // Copia los parámetros actuales, cambia uno y vuelve a la página 1
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

  // Cambia la página sin perder los filtros
  const cambiarPagina = (nueva) => {
    const nuevos = new URLSearchParams(searchParams)
    nuevos.set('page', nueva)
    setSearchParams(nuevos)
  }

  // Vuelve a pedir la página actual con los mismos filtros
  const recargar = () => {
    setRecargas(recargas + 1)
  }

  // Si se borró la última fila de una página que no es la primera, se va a la anterior.
  // Si no, se recarga (así se actualizan el total y la paginación)
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
      <EncabezadoPagina titulo="Postulaciones" descripcion={descripcion} />

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
