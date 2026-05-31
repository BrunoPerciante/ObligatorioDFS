import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/auth.slice';

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
          <button className={seccion === 'mecanicos' ? 'active' : ''} onClick={() => setSeccion('mecanicos')}>Mecánicos</button>
          <button className={seccion === 'mantenimientos' ? 'active' : ''} onClick={() => setSeccion('mantenimientos')}>Mantenimientos</button>
          <button className={seccion === 'categorias' ? 'active' : ''} onClick={() => setSeccion('categorias')}>Categorías</button>
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
            <button className={`sidebar-btn ${seccion === 'mecanicos' ? 'active' : ''}`} onClick={() => setSeccion('mecanicos')}>
              <span className="sidebar-icon">👷</span> Mecánicos
            </button>
            <button className={`sidebar-btn ${seccion === 'mantenimientos' ? 'active' : ''}`} onClick={() => setSeccion('mantenimientos')}>
              <span className="sidebar-icon">🔧</span> Mantenimientos
            </button>
            <button className={`sidebar-btn ${seccion === 'categorias' ? 'active' : ''}`} onClick={() => setSeccion('categorias')}>
              <span className="sidebar-icon">🏷️</span> Categorías
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
          {seccion === 'mecanicos' && <SeccionMecanicos />}
          {seccion === 'mantenimientos' && <SeccionMantenimientos />}
          {seccion === 'categorias' && <SeccionCategorias />}
          {seccion === 'marcas' && <SeccionMarcas />}
        </div>

      </div>
    </div>
  );
}

function SeccionResumen({ usuario }) {
  return (
    <div>
      <h2 className="section-title">Panel del taller</h2>
      <p style={{ color: 'var(--muted)', marginTop: '4px' }}>{usuario?.nombreTaller || usuario?.username}</p>
      <div className="stats-row" style={{ marginTop: '24px' }}>
        <div className="stat-box">
          <div className="stat-number">0</div>
          <div className="stat-label">Mecánicos</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">0</div>
          <div className="stat-label">Mantenimientos</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">3</div>
          <div className="stat-label">Categorías</div>
        </div>
      </div>
    </div>
  );
}

function SeccionMecanicos() {
  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">Mecánicos</h2>
        <button className="btn btn-primary btn-sm">+ Agregar mecánico</button>
      </div>
      <div className="empty-state">
        <div className="empty-icon">👷</div>
        <div className="empty-text">No hay mecánicos registrados</div>
      </div>
    </div>
  );
}

function SeccionMantenimientos() {
  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">Mantenimientos</h2>
        <button className="btn btn-primary btn-sm">+ Nuevo mantenimiento</button>
      </div>
      <div className="empty-state">
        <div className="empty-icon">🔧</div>
        <div className="empty-text">No hay mantenimientos. Creá el primero.</div>
      </div>
    </div>
  );
}

function SeccionCategorias() {
  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">Categorías</h2>
        <button className="btn btn-primary btn-sm">+ Nueva categoría</button>
      </div>
      <div className="empty-state">
        <div className="empty-icon">🏷️</div>
        <div className="empty-text">No hay categorías creadas todavía</div>
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