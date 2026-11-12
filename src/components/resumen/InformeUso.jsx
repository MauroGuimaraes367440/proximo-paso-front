import { useSelector } from 'react-redux'
import { LIMITE_PLUS } from '../../utils/planes'

const InformeUso = () => {
  const usuario = useSelector(state => state.auth.usuario)
  const total = useSelector(state => state.resumen.total)

  const esPlus = usuario.plan === 'plus'

  const porcentaje = Math.min(Math.round((total / LIMITE_PLUS) * 100), 100)

  return (
    <article className="tarjeta">
      <div className="tarjeta__cabecera">
        <h2 className="tarjeta__titulo">Uso del plan</h2>
        <span className={`badge badge--${usuario.plan}`}>{usuario.plan}</span>
      </div>

      {esPlus ? (
        <>
          <p className="uso__numero">{porcentaje}%</p>
          <p className="texto-suave">{total} de {LIMITE_PLUS} postulaciones usadas</p>

          <div
            className="barra"
            role="progressbar"
            aria-valuenow={porcentaje}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Uso del plan Plus"
          >
            <div
              className={`barra__relleno ${porcentaje >= 100 ? 'barra__relleno--lleno' : ''}`}
              style={{ width: `${porcentaje}%` }}
            />
          </div>
        </>
      ) : (
        <>
          <p className="uso__numero">{total}</p>
          <p className="texto-suave">
            {total === 1 ? 'postulación registrada' : 'postulaciones registradas'} · sin límite
          </p>
        </>
      )}
    </article>
  )
}

export default InformeUso
