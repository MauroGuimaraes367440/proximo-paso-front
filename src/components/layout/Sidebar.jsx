import { Link, NavLink, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { ArrowUpRight, BriefcaseBusiness, LayoutDashboard, LogOut, Search, Tags } from 'lucide-react'
import { desloguear } from '../../features/auth/auth.slice'
import { borrarSesionGuardada } from '../../utils/sesion'

const enlacesUsuario = [
  { to: '/dashboard', texto: 'Resumen', Icono: LayoutDashboard },
  { to: '/postulaciones', texto: 'Postulaciones', Icono: BriefcaseBusiness },
  { to: '/ofertas', texto: 'Ofertas', Icono: Search }
]

const enlacesAdmin = [
  { to: '/dashboard', texto: 'Resumen', Icono: LayoutDashboard },
  { to: '/categorias', texto: 'Categorías', Icono: Tags },
  { to: '/ofertas', texto: 'Ofertas', Icono: Search }
]

const etiquetaDe = (usuario) => {
  if (usuario.rol === 'admin') return 'admin'
  return usuario.plan
}

const Sidebar = () => {
  const usuario = useSelector(state => state.auth.usuario)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const enlaces = usuario.rol === 'admin' ? enlacesAdmin : enlacesUsuario

  const cerrarSesion = () => {
    borrarSesionGuardada()
    dispatch(desloguear())
    toast.info('Cerraste sesión')
    navigate('/')
  }

  return (
    <aside className="sidebar">
      <Link to="/dashboard" className="marca">
        <span className="marca__icono" aria-hidden="true">
          <ArrowUpRight size={20} strokeWidth={2.5} />
        </span>
        Próximo Paso
      </Link>

      <nav className="sidebar__nav" aria-label="Menú principal">
        {enlaces.map(({ to, texto, Icono }) => (
          <NavLink key={to} to={to} className="sidebar__enlace">
            <Icono size={18} aria-hidden="true" />
            {texto}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__usuario">
        <span className="avatar" aria-hidden="true">
          {usuario.username.charAt(0).toUpperCase()}
        </span>
        <div className="sidebar__datos">
          <span className="sidebar__nombre">{usuario.username}</span>
          <span className={`badge badge--${etiquetaDe(usuario)}`}>{etiquetaDe(usuario)}</span>
        </div>
        <button
          type="button"
          className="btn-icono btn-icono--peligro"
          onClick={cerrarSesion}
          title="Cerrar sesión"
          aria-label="Cerrar sesión"
        >
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
