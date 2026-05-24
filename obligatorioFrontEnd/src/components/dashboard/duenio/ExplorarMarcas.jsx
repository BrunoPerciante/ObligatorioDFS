export default function ExplorarMarcas() {
  return (
    <div id="duenio-vehiculoinfo" className="dash-section">
      <div className="section-header">
        <h2 className="section-title">Explorar Marcas</h2>
        <span style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Datos: NHTSA</span>
      </div>

      <div className="search-bar">
        <input type="text" className="search-input" id="search-marca" placeholder="Buscar marca... ej: Toyota, Ford, Chevrolet" />
        <button className="btn btn-primary" onClick="buscarModelos()">Buscar modelos</button>
        <button className="btn btn-secondary" onClick="cargarTodasMarcas()">Ver todas</button>
      </div>

      <div id="nhtsa-result">
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <div className="empty-text">Ingresá una marca para ver sus modelos o cargá todas</div>
        </div>
      </div>
    </div>
  );
}
