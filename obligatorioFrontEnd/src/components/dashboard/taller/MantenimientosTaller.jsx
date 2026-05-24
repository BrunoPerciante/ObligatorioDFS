export default function MantenimientosTaller() {
  return (
    <div id="taller-mantenimientos" className="dash-section">
      <div className="section-header">
        <h2 className="section-title">Mantenimientos</h2>
        <button className="btn btn-primary btn-sm" onClick="openModal('modal-mantenimiento')">+ Nuevo mantenimiento</button>
      </div>

      <div className="filter-bar">
        <button className="filter-btn active" onClick="filterMantenimientos('todos', this)">Todos</button>
        <button className="filter-btn" onClick="filterMantenimientos('mecanica', this)">Mecánica</button>
        <button className="filter-btn" onClick="filterMantenimientos('electricidad', this)">Electricidad</button>
        <button className="filter-btn" onClick="filterMantenimientos('chapa y pintura', this)">Chapa y pintura</button>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Vehículo</th>
                <th>Servicio</th>
                <th>Descripción IA</th>
                <th>Categoría</th>
                <th>Costo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="tabla-mant-taller">
              <tr>
                <td colSpan="7">
                  <div className="empty-state" style={{ padding: '30px' }}>
                    <div className="empty-icon">🔧</div>
                    <div className="empty-text">No hay mantenimientos. Creá el primero.</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
