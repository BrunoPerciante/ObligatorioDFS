export default function ModalMantenimiento() {
  return (
    <div id="modal-mantenimiento" className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', letterSpacing: '0.04em' }}>Nuevo Mantenimiento</h3>
          <button className="modal-close" onClick="closeModal('modal-mantenimiento')">✕</button>
        </div>
        <div className="alert alert-error" id="mant-error"></div>
        <div className="alert alert-success" id="mant-success"></div>

        <div className="ai-box">
          <div className="ai-label">Descripción automática con IA</div>
          <div className="ai-result" id="ai-preview">La descripción se generará automáticamente al crear el mantenimiento usando Gemini AI</div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Fecha</label>
            <input type="date" className="form-input" id="mant-fecha" />
          </div>
          <div className="form-group">
            <label className="form-label">Categoría</label>
            <select className="form-select" id="mant-categoria">
              <option value="">Seleccioná una categoría</option>
              <option value="mecanica">Mecánica</option>
              <option value="electricidad">Electricidad</option>
              <option value="chapa y pintura">Chapa y pintura</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Servicio realizado</label>
          <input type="text" className="form-input" id="mant-servicio" placeholder="Cambio de aceite y filtros, revisión de frenos..." />
          <p className="form-hint">La IA generará una descripción profesional a partir de este texto</p>
        </div>

        <div className="form-group">
          <label className="form-label">ID del Vehículo</label>
          <input type="text" className="form-input" id="mant-vehiculo" placeholder="ObjectId del vehículo" />
        </div>
        <div className="form-group">
          <label className="form-label">ID del Taller</label>
          <input type="text" className="form-input" id="mant-taller" placeholder="ObjectId del taller" />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Kilometraje</label>
            <input type="number" className="form-input" id="mant-km" placeholder="46000" min="0" />
          </div>
          <div className="form-group">
            <label className="form-label">Costo ($)</label>
            <input type="number" className="form-input" id="mant-costo" placeholder="1500" min="0" step="0.01" />
          </div>
        </div>

        <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }} onClick="crearMantenimiento()">
          ◈ Crear con descripción IA
        </button>
      </div>
    </div>
  );
}
