import EncabezadoPagina from '../../components/common/EncabezadoPagina'
import EnConstruccion from '../../components/common/EnConstruccion'

const CategoriasPage = () => {
  return (
    <section>
      <EncabezadoPagina
        titulo="Categorías"
        descripcion="Administrá las categorías y sus imágenes."
      />
      <EnConstruccion />
    </section>
  )
}

export default CategoriasPage
