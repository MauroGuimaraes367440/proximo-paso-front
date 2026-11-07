import { useSelector } from 'react-redux'

const DashboardPage = () => {
  const usuario = useSelector(state => state.auth.usuario)

  return (
    <section>
      <h1>Hola, {usuario.username}</h1>
      <p className="texto-suave">Acá vas a ver tus postulaciones, tu uso del plan y estadísticas.</p>
    </section>
  )
}

export default DashboardPage
