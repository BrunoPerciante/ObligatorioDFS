import AuthPage from './pages/AuthPage'
import DashboardDuenio from './pages/DashboardDuenio'
import DashboardTaller from './pages/DashboardTaller'
import ContainerPage from './pages/ContainerPage'
import ProtectedRoute from './app/guards/protectedRoute'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from "./store/store"
import './App.css'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ContainerPage />}>
            <Route index element={<AuthPage />} />

            {/* Solo dueños autenticados */}
            <Route element={<ProtectedRoute rolRequerido="duenio" />}>
              <Route path="/duenio" element={<DashboardDuenio />} />
            </Route>

            {/* Solo talleres autenticados */}
            <Route element={<ProtectedRoute rolRequerido="taller" />}>
              <Route path="/taller" element={<DashboardTaller />} />
            </Route>

          </Route>
          <Route path="*" element= {<NotFoundPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App