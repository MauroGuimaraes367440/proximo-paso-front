import EncabezadoPagina from '../../components/common/EncabezadoPagina'
import EnConstruccion from '../../components/common/EnConstruccion'

const PostulacionesPage = () => {
  return (
    <section>
      <EncabezadoPagina
        titulo="Postulaciones"
        descripcion="Todas tus postulaciones, con filtros por estado y categoría."
      />
      <EnConstruccion />
    </section>
  )
}

export default PostulacionesPage
