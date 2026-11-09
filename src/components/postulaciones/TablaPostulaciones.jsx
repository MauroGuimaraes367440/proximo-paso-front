import EstadoBadge from './EstadoBadge'
import { fechaDesdeId, formatearFecha } from '../../utils/fechas'
import { capitalizar } from '../../utils/textos'

// Solo muestra: recibe la lista por props y dibuja una fila por postulación.
// data-label lo usa el CSS en celular, donde cada fila se ve como tarjeta
const TablaPostulaciones = ({ postulaciones }) => {
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
          </tr>
        </thead>
        <tbody>
          {postulaciones.map(postulacion => (
            <tr key={postulacion._id}>
              <td data-label="Puesto" className="tabla__principal">{postulacion.puesto}</td>
              <td data-label="Empresa">{postulacion.empresa}</td>
              {/* Si la categoría fue borrada, populate devuelve null */}
              <td data-label="Categoría">{postulacion.categoria ? capitalizar(postulacion.categoria.nombre) : 'Sin categoría'}</td>
              <td data-label="Estado"><EstadoBadge estado={postulacion.estado} /></td>
              <td data-label="Agregada" className="texto-suave">
                {formatearFecha(fechaDesdeId(postulacion._id))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablaPostulaciones
