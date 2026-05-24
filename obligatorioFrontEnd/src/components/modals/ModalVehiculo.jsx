export default function ModalVehiculo() {
  return (
    <div id="modal-vehiculo" className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', letterSpacing: '0.04em' }}>Nuevo Vehículo</h3>
          <button className="modal-close" onClick="closeModal('modal-vehiculo')">✕</button>
        </div>
        <div className="alert alert-error" id="veh-error"></div>
        <div className="alert alert-success" id="veh-success"></div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Padrón</label>
            <input type="text" className="form-input" id="veh-padron" placeholder="ABC1234" />
          </div>
          <div className="form-group">
            <label className="form-label">Matrícula</label>
            <input type="text" className="form-input" id="veh-matricula" placeholder="SBB1234" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Marca</label>
            <input type="text" className="form-input" id="veh-marca" placeholder="Toyota" />
          </div>
          <div className="form-group">
            <label className="form-label">Modelo</label>
            <input type="text" className="form-input" id="veh-modelo" placeholder="Corolla" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Año</label>
            <input type="number" className="form-input" id="veh-anio" placeholder="2020" min="1900" max="2027" />
          </div>
          <div className="form-group">
            <label className="form-label">Kilometraje</label>
            <input type="number" className="form-input" id="veh-km" placeholder="50000" min="0" />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">ID del Dueño</label>
          <input type="text" className="form-input" id="veh-duenio" placeholder="ObjectId del dueño" />
          <p className="form-hint">Se completa automáticamente con tu usuario</p>
        </div>
        <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }} onClick="crearVehiculo()">
          Crear vehículo
        </button>
      </div>
    </div>
  );
}
