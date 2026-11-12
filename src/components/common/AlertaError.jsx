const AlertaError = ({ error }) => {
  if (!error) return null

  return (
    <div className="alerta alerta--error" role="alert">
      <p>{error.mensaje}</p>
      {error.detalles.length > 0 && (
        <ul>
          {error.detalles.map(detalle => <li key={detalle}>{detalle}</li>)}
        </ul>
      )}
    </div>
  )
}

export default AlertaError
