import { Link } from 'react-router'

const NotFoundPage = () => {
  return (
    <section className="no-encontrada">
      <p className="no-encontrada__codigo">404</p>
      <h1>Página no encontrada</h1>
      <p className="texto-suave">La dirección que buscás no existe o fue movida.</p>
      <Link to="/" className="btn btn--primario">Volver al inicio</Link>
    </section>
  )
}

export default NotFoundPage
