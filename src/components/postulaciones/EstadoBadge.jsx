import { textoEstado } from '../../utils/estados'

const EstadoBadge = ({ estado }) => {
  return <span className={`estado estado--${estado}`}>{textoEstado(estado)}</span>
}

export default EstadoBadge
