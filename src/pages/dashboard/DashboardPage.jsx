import { useSelector } from 'react-redux'
import EncabezadoPagina from '../../components/common/EncabezadoPagina'
import EnConstruccion from '../../components/common/EnConstruccion'

const DashboardPage = () => {
  const usuario = useSelector(state => state.auth.usuario)

  return (
    <section>
      <EncabezadoPagina
        titulo={`Hola, ${usuario.username}`}
        descripcion="Tu uso del plan, estadísticas y últimas postulaciones."
      />
      <EnConstruccion />
    </section>
  )
}

export default DashboardPage
