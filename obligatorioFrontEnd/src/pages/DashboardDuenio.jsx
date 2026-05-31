import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/auth.slice';

export default function DashboardDuenio() {
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
          <button className={seccion === 'vehiculos' ? 'active' : ''} onClick={() => setSeccion('vehiculos')}>Mis Vehículos</button>
          <button className={seccion === 'mantenimientos' ? 'active' : ''} onClick={() => setSeccion('mantenimientos')}>Mantenimientos</button>
          <button className={seccion === 'marcas' ? 'active' : ''} onClick={() => setSeccion('marcas')}>Explorar Marcas</button>
          <button className="btn-logout" onClick={handleLogout}>Salir</button>
        </div>
      </nav>

      <div className="dashboard-layout">

        <div className="sidebar">
          <div className="sidebar-section">
            <div className="sidebar-label">Mi cuenta</div>
            <button className={`sidebar-btn ${seccion === 'resumen' ? 'active' : ''}`} onClick={() => setSeccion('resumen')}>
              <span className="sidebar-icon">⊞</span> Resumen
            </button>
            <button className={`sidebar-btn ${seccion === 'vehiculos' ? 'active' : ''}`} onClick={() => setSeccion('vehiculos')}>
              <span className="sidebar-icon">🚗</span> Vehículos
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
          {seccion === 'resumen' && <SeccionResumen usuario={usuario} />}
          {seccion === 'vehiculos' && <SeccionVehiculos />}
          {seccion === 'mantenimientos' && <SeccionMantenimientos />}
          {seccion === 'marcas' && <SeccionMarcas />}
        </div>

      </div>
    </div>
  );
}

function SeccionResumen({ usuario }) {
  return (
    <div>
      <h2 className="section-title">Bienvenido</h2>
      <p style={{ color: 'var(--muted)', marginTop: '4px' }}>{usuario?.email}</p>
      <div className="stats-row" style={{ marginTop: '24px' }}>
        <div className="stat-box">
          <div className="stat-number">0</div>
          <div className="stat-label">Vehículos</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">0</div>
          <div className="stat-label">Mantenimientos</div>
        </div>
      </div>
    </div>
  );
}

function SeccionVehiculos() {
  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">Mis Vehículos</h2>
        <button className="btn btn-primary btn-sm">+ Agregar vehículo</button>
      </div>
      <div className="empty-state">
        <div className="empty-icon">🚗</div>
        <div className="empty-text">No tenés vehículos registrados todavía</div>
      </div>
    </div>
  );
}

function SeccionMantenimientos() {
  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">Mantenimientos</h2>
      </div>
      <div className="empty-state">
        <div className="empty-icon">🔧</div>
        <div className="empty-text">No hay mantenimientos registrados</div>
      </div>
    </div>
  );
}

function SeccionMarcas() {
  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">Explorar Marcas</h2>
        <span style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Datos: NHTSA</span>
      </div>
      <div className="search-bar">
        <input type="text" className="search-input" placeholder="Buscar marca... ej: Toyota, Ford" />
        <button className="btn btn-primary">Buscar modelos</button>
      </div>
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <div className="empty-text">Ingresá una marca para ver sus modelos</div>
      </div>
    </div>
  );
}