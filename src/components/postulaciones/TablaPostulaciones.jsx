import FilaPostulacion from './FilaPostulacion'

// Arma la tabla y dibuja una FilaPostulacion por cada postulación.
// data-label (en cada fila) lo usa el CSS en celular, donde cada fila se ve como tarjeta
const TablaPostulaciones = ({ postulaciones, onEliminada, onActualizada }) => {
  return (
    <div className="tabla-contenedor">
      <table className="tabla">
        <thead>
          <tr>
            <th>Puesto</th>
            <th>Empresa</th>
            <th>Categoría</th>
            <th>Estado</th>
            <th>Agregada</th>
            <th><span className="solo-lectores">Acciones</span></th>
          </tr>
        </thead>
        <tbody>
          {postulaciones.map(postulacion => (
            <FilaPostulacion
              key={postulacion._id}
              postulacion={postulacion}
              onEliminada={onEliminada}
              onActualizada={onActualizada}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablaPostulaciones
