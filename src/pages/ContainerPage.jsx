import { Outlet } from 'react-router'
import Header from '../components/layout/Header'

const ContainerPage = () => {
  return (
    <>
      <Header />

      <main className="contenedor">
        <Outlet />
      </main>
    </>
  )
}

export default ContainerPage
