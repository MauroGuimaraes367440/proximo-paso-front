import { useSelector } from 'react-redux'

const PreparacionDisplay = () => {
  const texto = useSelector(state => state.preparacion.texto)

  if (!texto) {
    return null
  }

  return <p className="texto-ia">{texto}</p>
}

export default PreparacionDisplay
