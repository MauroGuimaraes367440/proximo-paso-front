import { useId } from 'react'
import { X } from 'lucide-react'
import { ESTADOS } from '../../utils/estados'
import { capitalizar } from '../../utils/textos'

const FiltrosPostulaciones = ({ estado, categoria, categorias, onCambiar, onLimpiar }) => {
  const estadoId = useId()
  const categoriaId = useId()

  const hayFiltros = estado !== '' || categoria !== ''

  return (
    <div className="filtros">
      <div className="campo">
        <label htmlFor={estadoId}>Estado</label>
        <select id={estadoId} value={estado} onChange={(e) => onCambiar('estado', e.target.value)}>
          <option value="">Todos</option>
          {ESTADOS.map(e => (
            <option key={e.valor} value={e.valor}>{e.texto}</option>
          ))}
        </select>
      </div>

      <div className="campo">
        <label htmlFor={categoriaId}>Categoría</label>
        <select id={categoriaId} value={categoria} onChange={(e) => onCambiar('categoria', e.target.value)}>
          <option value="">Todas</option>
          {categorias.map(c => (
            <option key={c._id} value={c._id}>{capitalizar(c.nombre)}</option>
          ))}
        </select>
      </div>

      {hayFiltros && (
        <button type="button" className="btn btn--secundario" onClick={onLimpiar}>
          <X size={16} aria-hidden="true" />
          Limpiar filtros
        </button>
      )}
    </div>
  )
}

export default FiltrosPostulaciones
