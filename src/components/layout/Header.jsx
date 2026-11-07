import { Link, NavLink, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { ArrowUpRight, LogOut } from 'lucide-react'
import { desloguear } from '../../features/auth/auth.slice'
import { borrarSesionGuardada } from '../../utils/sesion'

const etiquetaDe = (usuario) => {
  if (usuario.rol === 'admin') return 'admin'
  return usuario.plan
}

const Header = () => {
  const usuario = useSelector(state => state.auth.usuario)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cerrarSesion = () => {
    borrarSesionGuardada()
    dispatch(desloguear())
    toast.info('Cerraste sesión')
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header__contenido">
        <Link to={usuario ? '/dashboard' : '/'} className="marca">
          <span className="marca__icono" aria-hidden="true">
            <ArrowUpRight size={20} strokeWidth={2.5} />
          </span>
          Próximo Paso
        </Link>

        {usuario && (
          <>
            <nav className="header__nav">
              <NavLink to="/dashboard">Inicio</NavLink>
            </nav>

            <div className="header__usuario">
              <span className="header__nombre">{usuario.username}</span>
              <span className={`badge badge--${etiquetaDe(usuario)}`}>{etiquetaDe(usuario)}</span>
              <button type="button" className="btn btn--secundario btn--chico" onClick={cerrarSesion}>
                <LogOut size={16} aria-hidden="true" />
                Cerrar sesión
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
