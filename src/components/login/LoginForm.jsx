import { useId, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { toast } from 'react-toastify'
import { loginSchema } from '../../validators/auth.validators'
import { loginService } from '../../services/auth.service'
import { loguear } from '../../features/auth/auth.slice'
import { obtenerError } from '../../utils/errores'
import AlertaError from '../common/AlertaError'

const LoginForm = () => {
  const usernameId = useId()
  const passwordId = useId()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [errorApi, setErrorApi] = useState(null)

  // mode 'onChange': valida mientras se escribe, así isValid está siempre al día
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({
    resolver: joiResolver(loginSchema),
    mode: 'onChange'
  })

  const ingresar = async (data) => {
    setErrorApi(null)

    try {
      const sesion = await loginService(data)
      dispatch(loguear(sesion))
      toast.success(`¡Hola, ${sesion.usuario.username}!`)
      navigate('/dashboard')
    } catch (error) {
      setErrorApi(obtenerError(error))
    }
  }

  return (
    <>
      <form className="formulario" onSubmit={handleSubmit(ingresar)} noValidate>
        <AlertaError error={errorApi} />

        <div className="campo">
          <label htmlFor={usernameId}>Usuario</label>
          <input
            id={usernameId}
            type="text"
            autoComplete="username"
            aria-invalid={!!errors.username}
            {...register('username')}
          />
          {errors.username && <span className="campo__error">{errors.username.message}</span>}
        </div>

        <div className="campo">
          <label htmlFor={passwordId}>Contraseña</label>
          <input
            id={passwordId}
            type="password"
            autoComplete="current-password"
            aria-invalid={!!errors.password}
            {...register('password')}
          />
          {errors.password && <span className="campo__error">{errors.password.message}</span>}
        </div>

        <button type="submit" className="btn btn--primario btn--bloque" disabled={!isValid || isSubmitting}>
          {isSubmitting ? 'Ingresando…' : 'Ingresar'}
        </button>
      </form>

      <p className="formulario__pie">
        ¿No tenés cuenta? <Link to="/registro">Registrate</Link>
      </p>
    </>
  )
}

export default LoginForm
