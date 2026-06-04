import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/auth.slice';
import ResumenTaller from '../components/dashboard/taller/ResumenTaller';
import Mecanicos from '../components/dashboard/taller/Mecanicos';
import MantenimientosTaller from '../components/dashboard/taller/MantenimientosTaller';
import Vehiculos from '../components/dashboard/taller/Vehiculos';
import ExplorarMarcasTaller from '../components/dashboard/taller/ExplorarMarcasTaller';

export default function DashboardTaller() {
  const [seccion, setSeccion] = useState('resumen');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { usuario } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="page active">

      <nav>
        <div className="nav-logo">AUTO<span>TRACK</span></div>
        <div className="nav-links">
          <button className={seccion === 'resumen' ? 'active' : ''} onClick={() => setSeccion('resumen')}>Dashboard</button>
          <button className={seccion === 'vehiculos' ? 'active' : ''} onClick={() => setSeccion('vehiculos')}>Vehículos</button>
          <button className={seccion === 'mecanicos' ? 'active' : ''} onClick={() => setSeccion('mecanicos')}>Mecánicos</button>
          <button className={seccion === 'mantenimientos' ? 'active' : ''} onClick={() => setSeccion('mantenimientos')}>Mantenimientos</button>
          <button className={seccion === 'marcas' ? 'active' : ''} onClick={() => setSeccion('marcas')}>Marcas</button>
          <button className="btn-logout" onClick={handleLogout}>Salir</button>
        </div>
      </nav>

      <div className="dashboard-layout">

        <div className="sidebar">
          <div className="sidebar-section">
            <div className="sidebar-label">Taller</div>
            <button className={`sidebar-btn ${seccion === 'resumen' ? 'active' : ''}`} onClick={() => setSeccion('resumen')}>
              <span className="sidebar-icon">⊞</span> Resumen
            </button>
            <button className={`sidebar-btn ${seccion === 'vehiculos' ? 'active' : ''}`} onClick={() => setSeccion('vehiculos')}>
              <span className="sidebar-icon">🚗</span> Vehículos
            </button>
            <button className={`sidebar-btn ${seccion === 'mecanicos' ? 'active' : ''}`} onClick={() => setSeccion('mecanicos')}>
              <span className="sidebar-icon">👷</span> Mecánicos
            </button>
            <button className={`sidebar-btn ${seccion === 'mantenimientos' ? 'active' : ''}`} onClick={() => setSeccion('mantenimientos')}>
              <span className="sidebar-icon">🔧</span> Mantenimientos
            </button>
          </div>
          <div className="sidebar-section">
            <div className="sidebar-label">Herramientas</div>
            <button className={`sidebar-btn ${seccion === 'marcas' ? 'active' : ''}`} onClick={() => setSeccion('marcas')}>
              <span className="sidebar-icon">🔍</span> Marcas / Modelos
            </button>
          </div>
        </div>

        <div className="main-content">
          {seccion === 'resumen' && <ResumenTaller usuario={usuario} />}
          {seccion === 'vehiculos' && <Vehiculos usuario={usuario} />}
          {seccion === 'mecanicos' && <Mecanicos usuario={usuario} />}
          {seccion === 'mantenimientos' && <MantenimientosTaller usuario={usuario} />}
          {seccion === 'marcas' && <ExplorarMarcasTaller />}
        </div>

      </div>
    </div>
  );
}