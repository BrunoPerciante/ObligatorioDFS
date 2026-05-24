export default function ModalCategoria() {
  return (
    <div id="modal-categoria" className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', letterSpacing: '0.04em' }}>Nueva Categoría</h3>
          <button className="modal-close" onClick="closeModal('modal-categoria')">✕</button>
        </div>
        <div className="alert alert-error" id="cat-error"></div>
        <div className="alert alert-success" id="cat-success"></div>

        <div className="form-group">
          <label className="form-label">Nombre</label>
          <select className="form-select" id="cat-nombre">
            <option value="">Seleccioná una categoría</option>
            <option value="mecanica">Mecánica</option>
            <option value="electricidad">Electricidad</option>
            <option value="chapa y pintura">Chapa y pintura</option>
          </select>
          <p className="form-hint">Solo se puede crear una de cada tipo</p>
        </div>
        <div className="form-group">
          <label className="form-label">Descripción</label>
          <textarea className="form-textarea" id="cat-descripcion" placeholder="Describí qué servicios abarca esta categoría..."></textarea>
        </div>
        <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }} onClick="crearCategoria()">
          Crear categoría
        </button>
      </div>
    </div>
  );
}
