const EncabezadoPagina = ({ titulo, descripcion, children }) => {
  return (
    <header className="encabezado">
      <div>
        <h1>{titulo}</h1>
        {descripcion && <p className="texto-suave">{descripcion}</p>}
      </div>
      {children && <div className="encabezado__acciones">{children}</div>}
    </header>
  )
}

export default EncabezadoPagina
