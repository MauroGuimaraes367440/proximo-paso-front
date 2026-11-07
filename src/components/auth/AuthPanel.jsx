// Estructura compartida por Login y Registro: presentación a la izquierda,
// formulario (children) a la derecha
const AuthPanel = ({ titulo, subtitulo, children }) => {
  return (
    <section className="auth">
      <div className="auth__intro">
        <h1>Tu búsqueda laboral, en orden.</h1>
        <p>
          Registrá tus postulaciones, seguí en qué estado está cada una y
          preparate para las entrevistas con ayuda de IA.
        </p>
        <ul className="auth__beneficios">
          <li>Seguimiento por estado: guardada, enviada, entrevista…</li>
          <li>Ofertas reales para guardar con un clic</li>
          <li>Preguntas de entrevista generadas para cada puesto</li>
        </ul>
      </div>

      <div className="auth__tarjeta">
        <h2>{titulo}</h2>
        <p className="auth__subtitulo">{subtitulo}</p>
        {children}
      </div>
    </section>
  )
}

export default AuthPanel
