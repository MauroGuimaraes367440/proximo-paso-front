import AuthPanel from '../../components/auth/AuthPanel'
import LoginForm from '../../components/login/LoginForm'

const LoginPage = () => {
  return (
    <AuthPanel titulo="Iniciar sesión" subtitulo="Ingresá para ver tus postulaciones.">
      <LoginForm />
    </AuthPanel>
  )
}

export default LoginPage
