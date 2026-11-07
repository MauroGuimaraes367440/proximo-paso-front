import { Construction } from 'lucide-react'

// Provisorio: marca las secciones que todavía no están hechas
const EnConstruccion = () => {
  return (
    <div className="tarjeta vacio">
      <Construction size={32} aria-hidden="true" />
      <p>Esta sección está en construcción.</p>
    </div>
  )
}

export default EnConstruccion
