import Resumen from '../components/dashboard/duenio/Resumen';
import Vehiculos from '../components/dashboard/duenio/Vehiculos';
import Mantenimientos from '../components/dashboard/duenio/Mantenimientos';
import ExplorarMarcas from '../components/dashboard/duenio/ExplorarMarcas';

export default function DashboardDuenio() {
  return (
    <div id="page-duenio" className="page">
      <nav>
        <div className="nav-logo">AUTO<span>TRACK</span></div>
        <div className="nav-links">
          <button className="active" onClick="switchDashSection('duenio-home', this)">Dashboard</button>
          <button onClick="switchDashSection('duenio-vehiculos', this)">Mis Vehículos</button>
          <button onClick="switchDashSection('duenio-mantenimientos', this)">Mantenimientos</button>
          <button onClick="switchDashSection('duenio-vehiculoinfo', this)">Explorar Marcas</button>
          <button className="btn-logout" onClick="logout()">Salir</button>
        </div>
      </nav>

      <div className="dashboard-layout">
        <div className="sidebar">
          <div className="sidebar-section">
            <div className="sidebar-label">Mi cuenta</div>
            <button className="sidebar-btn active" onClick="switchSidebar('duenio-home', this, 'duenio')">
              <span className="sidebar-icon">⊞</span> Resumen
            </button>
            <button className="sidebar-btn" onClick="switchSidebar('duenio-vehiculos', this, 'duenio')">
              <span className="sidebar-icon">🚗</span> Vehículos
            </button>
            <button className="sidebar-btn" onClick="switchSidebar('duenio-mantenimientos', this, 'duenio')">
              <span className="sidebar-icon">🔧</span> Mantenimientos
            </button>
          </div>
          <div className="sidebar-section" style={{ marginTop: '8px' }}>
            <div className="sidebar-label">Herramientas</div>
            <button className="sidebar-btn" onClick="switchSidebar('duenio-vehiculoinfo', this, 'duenio')">
              <span className="sidebar-icon">🔍</span> Marcas / Modelos
            </button>
          </div>
          <div style={{ padding: '16px', marginTop: 'auto', position: 'absolute', bottom: '20px', left: '0', right: '0' }}>
            <div style={{ background: 'rgba(230,51,41,0.08)', border: '1px solid rgba(230,51,41,0.2)', borderRadius: '8px', padding: '14px' }}>
              <div style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '4px' }}>Plan activo</div>
              <div id="duenio-plan-badge" className="tag tag-plus">PLUS</div>
            </div>
          </div>
        </div>

        <div className="main-content">
          <Resumen />
          <Vehiculos />
          <Mantenimientos />
          <ExplorarMarcas />
        </div>
      </div>
    </div>
  );
}
