export default function Vehiculos() {
  return (
    <div id="duenio-vehiculos" className="dash-section">
      <div className="section-header">
        <h2 className="section-title">Mis Vehículos</h2>
        <button className="btn btn-primary btn-sm" onClick="openModal('modal-vehiculo')">+ Agregar vehículo</button>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Padrón</th>
                <th>Matrícula</th>
                <th>Marca / Modelo</th>
                <th>Año</th>
                <th>Kilometraje</th>
                <th></th>
              </tr>
            </thead>
            <tbody id="tabla-vehiculos">
              <tr>
                <td colSpan="6">
                  <div className="empty-state" style={{ padding: '30px' }}>
                    <div className="empty-icon">🚗</div>
                    <div className="empty-text">No tenés vehículos registrados todavía</div>
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
