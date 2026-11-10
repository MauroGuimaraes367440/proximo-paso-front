import { useSelector } from 'react-redux'
import { Link } from 'react-router'
import { ImageOff, Tags } from 'lucide-react'

// El admin no tiene postulaciones: su resumen es sobre las categorías.
// Las categorías ya están en Redux (las carga AppLayout al entrar)
const ResumenAdmin = () => {
  const categorias = useSelector(state => state.categorias.lista)

  // filter devuelve un array nuevo solo con las que cumplen la condición
  const sinImagen = categorias.filter(c => !c.imagenUrl)

  return (
    <div className="resumen">
      <article className="tarjeta">
        <div className="tarjeta__cabecera">
          <h2 className="tarjeta__titulo">Categorías</h2>
          <Tags size={20} aria-hidden="true" className="texto-suave" />
        </div>
        <p className="uso__numero">{categorias.length}</p>
        <p className="texto-suave">categorías disponibles para los usuarios</p>
      </article>

      <article className="tarjeta">
        <div className="tarjeta__cabecera">
          <h2 className="tarjeta__titulo">Sin imagen</h2>
          <ImageOff size={20} aria-hidden="true" className="texto-suave" />
        </div>
        <p className="uso__numero">{sinImagen.length}</p>
        <p className="texto-suave">
          {sinImagen.length === 0 ? 'Todas las categorías tienen imagen.' : 'categorías esperando una imagen'}
        </p>
      </article>

      <Link to="/categorias" className="btn btn--primario">Gestionar categorías</Link>
    </div>
  )
}

export default ResumenAdmin
