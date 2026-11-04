import { Link, Outlet } from 'react-router'

const ContainerPage = () => {
  return (
    <>
      <header>
        <Link to="/">Próximo Paso</Link>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  )
}

export default ContainerPage