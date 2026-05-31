import AuthPage from './pages/AuthPage'
import DashboardDuenio from './pages/DashboardDuenio'
import DashboardTaller from './pages/DashboardTaller'
import ModalVehiculo from './components/modals/ModalVehiculo'
import ModalMantenimiento from './components/modals/ModalMantenimiento'
import ModalMecanico from './components/modals/ModalMecanico'
import ModalCategoria from './components/modals/ModalCategoria'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from "./store/store"
import './App.css'
import ContainerPage from './pages/ContainerPage'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ContainerPage />}>
            <Route index element={<AuthPage />} />
            <Route path="/duenio" element={<DashboardDuenio />} />
            <Route path="/taller" element={<DashboardTaller />} />
          </Route>
        </Routes>

        {/* MODALES 
        <ModalVehiculo />
        <ModalMantenimiento />
        <ModalMecanico />
        <ModalCategoria />
        */}
      </BrowserRouter>
    </Provider>
  )
}

export default App

