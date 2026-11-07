import AuthPanel from '../../components/auth/AuthPanel'
import RegisterForm from '../../components/register/RegisterForm'

const RegisterPage = () => {
  return (
    <AuthPanel titulo="Crear cuenta" subtitulo="Empezás con el plan Plus: hasta 4 postulaciones.">
      <RegisterForm />
    </AuthPanel>
  )
}

export default RegisterPage
