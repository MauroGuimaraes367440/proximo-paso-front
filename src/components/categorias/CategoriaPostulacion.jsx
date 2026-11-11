import { useEffect, useState } from 'react'
import { Tag } from 'lucide-react'
import { obtenerCategoriaService } from '../../services/categorias.service'
import { capitalizar } from '../../utils/textos'

// Muestra la categoría de una postulación con su imagen.
// La postulación solo trae { _id, nombre } de la categoría (el populate de la API),
// así que la imagen se pide aparte con GET /categorias/:id
const CategoriaPostulacion = ({ categoria }) => {
  const [imagenUrl, setImagenUrl] = useState(null)

  useEffect(() => {
    if (!categoria) return

    const cargar = async () => {
      try {
        const datos = await obtenerCategoriaService(categoria._id)
        setImagenUrl(datos.imagenUrl || null)
      } catch {
        // Si falla, no pasa nada grave: se muestra el nombre sin imagen
        setImagenUrl(null)
      }
    }
    cargar()
  }, [categoria])

  if (!categoria) {
    return <span className="texto-suave">Sin categoría</span>
  }

  return (
    <span className="categoria-mini">
      {imagenUrl ? (
        <img src={imagenUrl} alt="" className="categoria-mini__imagen" />
      ) : (
        <span className="categoria-mini__imagen categoria-mini__imagen--vacia">
          <Tag size={16} aria-hidden="true" />
        </span>
      )}
      {capitalizar(categoria.nombre)}
    </span>
  )
}

export default CategoriaPostulacion
