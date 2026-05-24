import AuthPage from './pages/AuthPage'
import DashboardDuenio from './pages/DashboardDuenio'
import DashboardTaller from './pages/DashboardTaller'
import ModalVehiculo from './components/modals/ModalVehiculo'
import ModalMantenimiento from './components/modals/ModalMantenimiento'
import ModalMecanico from './components/modals/ModalMecanico'
import ModalCategoria from './components/modals/ModalCategoria'
import './App.css'

function App() {
  return (
    <div>
      {/* PÁGINAS PRINCIPALES */}
      <AuthPage />
      <DashboardDuenio />
      <DashboardTaller />

      {/* MODALES */}
      <ModalVehiculo />
      <ModalMantenimiento />
      <ModalMecanico />
      <ModalCategoria />
    </div>
  )
}

export default App

