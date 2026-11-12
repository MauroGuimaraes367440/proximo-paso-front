import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'

const Header = () => {
  return (
    <header className="header">
      <div className="header__contenido">
        <Link to="/" className="marca">
          <span className="marca__icono" aria-hidden="true">
            <ArrowUpRight size={20} strokeWidth={2.5} />
          </span>
          Próximo Paso
        </Link>
      </div>
    </header>
  )
}

export default Header
