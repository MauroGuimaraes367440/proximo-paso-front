import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import store from './store/store'
import ContainerPage from './pages/ContainerPage'
import LoginPage from './pages/login/LoginPage'
import RegisterPage from './pages/register/RegisterPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './app/guards/ProtectedRoute'
import PublicRoute from './app/guards/PublicRoute'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ContainerPage />}>
            <Route element={<PublicRoute />}>
              <Route index element={<LoginPage />} />
              <Route path="registro" element={<RegisterPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="dashboard" element={<DashboardPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  )
}

export default App
