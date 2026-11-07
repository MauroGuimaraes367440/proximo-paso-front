import EncabezadoPagina from '../../components/common/EncabezadoPagina'
import EnConstruccion from '../../components/common/EnConstruccion'

const OfertasPage = () => {
  return (
    <section>
      <EncabezadoPagina
        titulo="Ofertas"
        descripcion="Buscá ofertas de empleo publicadas en Jooble."
      />
      <EnConstruccion />
    </section>
  )
}

export default OfertasPage
