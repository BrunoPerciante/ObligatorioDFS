import AuthPage from './pages/AuthPage'
import DashboardDuenio from './pages/DashboardDuenio'
import DashboardTaller from './pages/DashboardTaller'
import ModalVehiculo from './components/modals/ModalVehiculo'
import ModalMantenimiento from './components/modals/ModalMantenimiento'
import ModalMecanico from './components/modals/ModalMecanico'
import ModalCategoria from './components/modals/ModalCategoria'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/duenio" element={<DashboardDuenio />} />
          <Route path="/taller" element={<DashboardTaller />} />
        </Routes>

      {/* MODALES 
      <ModalVehiculo />
      <ModalMantenimiento />
      <ModalMecanico />
      <ModalCategoria />
      */}
    </BrowserRouter>
  )
}

export default App

