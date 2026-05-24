export default function Mecanicos() {
  return (
    <div id="taller-mecanicos" className="dash-section">
      <div className="section-header">
        <h2 className="section-title">Mecánicos</h2>
        <button className="btn btn-primary btn-sm" onClick="openModal('modal-mecanico')">+ Agregar mecánico</button>
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Taller ID</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="tabla-mecanicos">
              <tr>
                <td colSpan="4">
                  <div className="empty-state" style={{ padding: '30px' }}>
                    <div className="empty-icon">👷</div>
                    <div className="empty-text">No hay mecánicos registrados</div>
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
