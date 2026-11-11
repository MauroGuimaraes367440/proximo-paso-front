import { useEffect, useState } from 'react'
import { Tag } from 'lucide-react'
import { obtenerCategoriaService } from '../../services/categorias.service'
import { capitalizar } from '../../utils/textos'

// Portada con la imagen de la categoría de una postulación (detalle).
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
        // Si falla, no pasa nada grave: se muestra la portada sin imagen
        setImagenUrl(null)
      }
    }
    cargar()
  }, [categoria])

  return (
    <div className="portada-categoria">
      {imagenUrl ? (
        <img src={imagenUrl} alt="" className="portada-categoria__imagen" />
      ) : (
        <div className="portada-categoria__imagen portada-categoria__imagen--vacia">
          <Tag size={32} aria-hidden="true" />
        </div>
      )}
      <span className="portada-categoria__nombre">
        {categoria ? capitalizar(categoria.nombre) : 'Sin categoría'}
      </span>
    </div>
  )
}

export default CategoriaPostulacion
