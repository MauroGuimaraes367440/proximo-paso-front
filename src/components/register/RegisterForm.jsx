import { useId, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { toast } from 'react-toastify'
import { registroSchema } from '../../validators/auth.validators'
import { registroService, loginService } from '../../services/auth.service'
import { loguear } from '../../features/auth/auth.slice'
import { obtenerError } from '../../utils/errores'
import AlertaError from '../common/AlertaError'

const RegisterForm = () => {
  const usernameId = useId()
  const passwordId = useId()
  const repetirId = useId()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [errorApi, setErrorApi] = useState(null)

  const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({
    resolver: joiResolver(registroSchema),
    mode: 'onChange'
  })

  const registrarse = async (data) => {
    setErrorApi(null)

    // repetirPassword es solo del front: la API no lo acepta
    const credenciales = { username: data.username, password: data.password }

    try {
      await registroService(credenciales)
    } catch (error) {
      setErrorApi(obtenerError(error))
      return
    }

    // Auto-login: el registro no devuelve token, así que iniciamos sesión
    try {
      const sesion = await loginService(credenciales)
      dispatch(loguear(sesion))
      toast.success('¡Cuenta creada! Bienvenido/a a Próximo Paso')
      navigate('/dashboard')
    } catch {
      toast.info('Cuenta creada. Iniciá sesión para continuar.')
      navigate('/')
    }
  }

  return (
    <>
      <form className="formulario" onSubmit={handleSubmit(registrarse)} noValidate>
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
            autoComplete="new-password"
            aria-invalid={!!errors.password}
            // deps: al cambiar la contraseña, vuelve a validar "repetir"
            {...register('password', { deps: ['repetirPassword'] })}
          />
          {errors.password && <span className="campo__error">{errors.password.message}</span>}
        </div>

        <div className="campo">
          <label htmlFor={repetirId}>Repetir contraseña</label>
          <input
            id={repetirId}
            type="password"
            autoComplete="new-password"
            aria-invalid={!!errors.repetirPassword}
            {...register('repetirPassword')}
          />
          {errors.repetirPassword && <span className="campo__error">{errors.repetirPassword.message}</span>}
        </div>

        <button type="submit" className="btn btn--primario btn--bloque" disabled={!isValid || isSubmitting}>
          {isSubmitting ? 'Creando cuenta…' : 'Crear cuenta'}
        </button>
      </form>

      <p className="formulario__pie">
        ¿Ya tenés cuenta? <Link to="/">Iniciá sesión</Link>
      </p>
    </>
  )
}

export default RegisterForm
