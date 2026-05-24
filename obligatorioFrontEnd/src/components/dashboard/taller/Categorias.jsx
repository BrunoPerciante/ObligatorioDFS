export default function Categorias() {
  return (
    <div id="taller-categorias" className="dash-section">
      <div className="section-header">
        <h2 className="section-title">Categorías</h2>
        <button className="btn btn-primary btn-sm" onClick="openModal('modal-categoria')">+ Nueva categoría</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }} id="lista-categorias">
        {/* Se cargan dinámicamente */}
        <div className="card" style={{ borderColor: '#1a2a3a' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span className="tag tag-mecanica">MECÁNICA</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button className="btn btn-ghost btn-sm">Editar</button>
              <button className="btn btn-danger btn-sm">Eliminar</button>
            </div>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '8px' }}>Frenos, transmisión, motor, suspensión</p>
        </div>
        <div className="card" style={{ borderColor: '#2a2a10' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span className="tag tag-electricidad">ELECTRICIDAD</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button className="btn btn-ghost btn-sm">Editar</button>
              <button className="btn btn-danger btn-sm">Eliminar</button>
            </div>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '8px' }}>Batería, alternador, luces, sistema eléctrico</p>
        </div>
        <div className="card" style={{ borderColor: '#1a2a1a' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span className="tag tag-chapa">CHAPA Y PINTURA</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button className="btn btn-ghost btn-sm">Editar</button>
              <button className="btn btn-danger btn-sm">Eliminar</button>
            </div>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '8px' }}>Abolladuras, pintura, carrocería, parabrisas</p>
        </div>
      </div>
    </div>
  );
}
