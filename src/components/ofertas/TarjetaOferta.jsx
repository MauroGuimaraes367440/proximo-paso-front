import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { BookmarkPlus, Building2, ExternalLink, MapPin } from 'lucide-react'
import { limpiarHtml } from '../../utils/textos'

const TarjetaOferta = ({ oferta }) => {
  const navigate = useNavigate()
  const esAdmin = useSelector(state => state.auth.usuario.rol === 'admin')

  // Lleva al formulario de alta con los datos de la oferta "viajando" en el state
  // de la navegación. NuevaPostulacionPage los lee con useLocation().state
  const guardarComoPostulacion = () => {
    navigate('/postulaciones/nueva', { state: { oferta } })
  }

  return (
    <article className="tarjeta oferta">
      <h2 className="oferta__puesto">{limpiarHtml(oferta.puesto)}</h2>

      <div className="oferta__datos">
        {oferta.empresa && (
          <span><Building2 size={15} aria-hidden="true" /> {oferta.empresa}</span>
        )}
        {oferta.ubicacion && (
          <span><MapPin size={15} aria-hidden="true" /> {oferta.ubicacion}</span>
        )}
      </div>

      <p className="oferta__resumen">{limpiarHtml(oferta.descripcion)}</p>

      <div className="oferta__acciones">
        <a href={oferta.enlace} target="_blank" rel="noreferrer" className="btn btn--secundario btn--chico">
          Ver en Jooble <ExternalLink size={14} aria-hidden="true" />
        </a>
        {/* El admin no tiene postulaciones (la API le respondería 403) */}
        {!esAdmin && (
          <button type="button" className="btn btn--primario btn--chico" onClick={guardarComoPostulacion}>
            <BookmarkPlus size={16} aria-hidden="true" />
            Guardar como postulación
          </button>
        )}
      </div>
    </article>
  )
}

export default TarjetaOferta
