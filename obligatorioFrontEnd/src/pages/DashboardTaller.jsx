import ResumenTaller from '../components/dashboard/taller/ResumenTaller';
import Mecanicos from '../components/dashboard/taller/Mecanicos';
import MantenimientosTaller from '../components/dashboard/taller/MantenimientosTaller';
import Categorias from '../components/dashboard/taller/Categorias';
import ExplorarMarcasTaller from '../components/dashboard/taller/ExplorarMarcasTaller';

export default function DashboardTaller() {
  return (
    <div id="page-taller" className="page">
      <nav>
        <div className="nav-logo">AUTO<span>TRACK</span></div>
        <div className="nav-links">
          <button className="active" onClick="switchTallerSection('taller-home', this)">Dashboard</button>
          <button onClick="switchTallerSection('taller-mecanicos', this)">Mecánicos</button>
          <button onClick="switchTallerSection('taller-mantenimientos', this)">Mantenimientos</button>
          <button onClick="switchTallerSection('taller-categorias', this)">Categorías</button>
          <button onClick="switchTallerSection('taller-vehiculoinfo', this)">Marcas</button>
          <button className="btn-logout" onClick="logout()">Salir</button>
        </div>
      </nav>

      <div className="dashboard-layout">
        <div className="sidebar">
          <div className="sidebar-section">
            <div className="sidebar-label">Taller</div>
            <button className="sidebar-btn active" onClick="switchSidebar('taller-home', this, 'taller')">
              <span className="sidebar-icon">⊞</span> Resumen
            </button>
            <button className="sidebar-btn" onClick="switchSidebar('taller-mecanicos', this, 'taller')">
              <span className="sidebar-icon">👷</span> Mecánicos
            </button>
            <button className="sidebar-btn" onClick="switchSidebar('taller-mantenimientos', this, 'taller')">
              <span className="sidebar-icon">🔧</span> Mantenimientos
            </button>
            <button className="sidebar-btn" onClick="switchSidebar('taller-categorias', this, 'taller')">
              <span className="sidebar-icon">🏷️</span> Categorías
            </button>
          </div>
          <div className="sidebar-section" style={{ marginTop: '8px' }}>
            <div className="sidebar-label">Herramientas</div>
            <button className="sidebar-btn" onClick="switchSidebar('taller-vehiculoinfo', this, 'taller')">
              <span className="sidebar-icon">🔍</span> Marcas / Modelos
            </button>
          </div>
        </div>

        <div className="main-content">
          <ResumenTaller />
          <Mecanicos />
          <MantenimientosTaller />
          <Categorias />
          <ExplorarMarcasTaller />
        </div>
      </div>
    </div>
  );
}
