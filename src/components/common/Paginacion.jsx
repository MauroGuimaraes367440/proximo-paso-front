import { ChevronLeft, ChevronRight } from 'lucide-react'

const Paginacion = ({ page, totalPages, onCambiar }) => {
  if (totalPages <= 1) return null

  return (
    <nav className="paginacion" aria-label="Paginación">
      <button
        type="button"
        className="btn btn--secundario btn--chico"
        onClick={() => onCambiar(page - 1)}
        disabled={page <= 1}
      >
        <ChevronLeft size={16} aria-hidden="true" />
        Anterior
      </button>

      <span className="texto-suave">Página {page} de {totalPages}</span>

      <button
        type="button"
        className="btn btn--secundario btn--chico"
        onClick={() => onCambiar(page + 1)}
        disabled={page >= totalPages}
      >
        Siguiente
        <ChevronRight size={16} aria-hidden="true" />
      </button>
    </nav>
  )
}

export default Paginacion
