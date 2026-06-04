import { useState } from 'react';
import ModalCategoria from '../../modals/ModalCategoria';

export default function ResumenTaller({ usuario }) {
  const [showCategoriaModal, setShowCategoriaModal] = useState(false);

  return (
    <div id="taller-home" className="dash-section active">
      <div className="section-header">
        <div>
          <h2 className="section-title">Panel del taller</h2>
          <p style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '4px' }}>{usuario?.nombreTaller || usuario?.username}</p>
        </div>
      </div>
      <div className="stats-row">
        <div className="stat-box">
          <div className="stat-number" id="stat-mecanicos">0</div>
          <div className="stat-label">Mecánicos</div>
        </div>
        <div className="stat-box" style={{ '--accent': '#f39c12' }}>
          <div className="stat-number" id="stat-mant-taller">0</div>
          <div className="stat-label">Mantenimientos</div>
        </div>
        <div className="stat-box" style={{ '--accent': '#5ab4ff' }}>
          <div className="stat-number" id="stat-cat">3</div>
          <div className="stat-label">Categorías</div>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <div className="card-title">Acciones rápidas</div>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button className="btn btn-primary">+ Nuevo mantenimiento</button>
          <button className="btn btn-secondary">+ Agregar mecánico</button>
          <button className="btn btn-secondary" onClick={() => setShowCategoriaModal(true)}>
            🏷️ Gestionar categorías
          </button>
        </div>
      </div>

      <ModalCategoria 
        isOpen={showCategoriaModal} 
        onClose={() => setShowCategoriaModal(false)}
      />
    </div>
  );
}
