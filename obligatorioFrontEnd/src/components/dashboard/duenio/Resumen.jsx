export default function Resumen() {
  return (
    <div id="duenio-home" className="dash-section active">
      <div className="section-header">
        <div>
          <h2 className="section-title">Bienvenido <span id="duenio-username"></span></h2>
          <p style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '4px' }}>Panel de control de tu flota</p>
        </div>
      </div>
      <div className="stats-row">
        <div className="stat-box">
          <div className="stat-number" id="stat-vehiculos">0</div>
          <div className="stat-label">Vehículos</div>
        </div>
        <div className="stat-box" style={{ '--accent': '#f39c12' }}>
          <div className="stat-number" id="stat-mantenimientos">0</div>
          <div className="stat-label">Mantenimientos</div>
        </div>
        <div className="stat-box" style={{ '--accent': '#2ecc71' }}>
          <div className="stat-number" id="stat-plan">Plus</div>
          <div className="stat-label">Plan actual</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Actividad reciente</div>
        </div>
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <div className="empty-text">Tus últimos mantenimientos aparecerán acá</div>
        </div>
      </div>
    </div>
  );
}
