export default function ModalMecanico() {
  return (
    <div id="modal-mecanico" className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', letterSpacing: '0.04em' }}>Agregar Mecánico</h3>
          <button className="modal-close" onClick="closeModal('modal-mecanico')">✕</button>
        </div>
        <div className="alert alert-error" id="mec-error"></div>
        <div className="alert alert-success" id="mec-success"></div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-input" id="mec-nombre" placeholder="Carlos" />
          </div>
          <div className="form-group">
            <label className="form-label">Apellido</label>
            <input type="text" className="form-input" id="mec-apellido" placeholder="Rodríguez" />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">ID del Taller</label>
          <input type="text" className="form-input" id="mec-taller" placeholder="ObjectId del taller" />
          <p className="form-hint">Se completa automáticamente con tu taller</p>
        </div>
        <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }} onClick="crearMecanico()">
          Agregar mecánico
        </button>
      </div>
    </div>
  );
}
