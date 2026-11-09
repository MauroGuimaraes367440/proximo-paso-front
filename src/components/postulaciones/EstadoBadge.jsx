import { textoEstado } from '../../utils/estados'

// Etiqueta de color según el estado. El color lo pone el CSS: .estado--entrevista, etc.
const EstadoBadge = ({ estado }) => {
  return <span className={`estado estado--${estado}`}>{textoEstado(estado)}</span>
}

export default EstadoBadge
