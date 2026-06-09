export default function Resumen({ usuario, vehiculos = [], onCambiarPlan }) {
  const limite = usuario?.plan === 'premium' ? Infinity : 4;
  const porcentajeUso = usuario?.plan === 'premium'
    ? 100
    : Math.min(Math.round((vehiculos.length / limite) * 100), 100);

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Bienvenido</h2>
          <p style={{ color: 'var(--muted)', marginTop: '4px', fontSize: '13px' }}>
            {usuario?.email}
          </p>
        </div>
      </div>

      <div className="stats-row" style={{ marginTop: '24px' }}>
        <div className="stat-box">
          <div className="stat-number">{vehiculos.length}</div>
          <div className="stat-label">Vehículos</div>
        </div>
        <div className="stat-box" style={{ '--accent': '#f39c12' }}>
          <div className="stat-number" style={{ textTransform: 'uppercase', fontSize: '1.8rem' }}>
            {usuario?.plan || 'plus'}
          </div>
          <div className="stat-label">Plan actual</div>
        </div>
      </div>

      {/* Informe de uso */}
      <div className="card" style={{ marginTop: '24px' }}>
        <div className="card-header">
          <div className="card-title">Uso del plan</div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)' }}>
            {usuario?.plan === 'premium' ? 'Ilimitado' : `${vehiculos.length} / ${limite} vehículos`}
          </span>
        </div>

        <div style={{ marginBottom: '8px' }}>
          <div style={{
            height: '8px',
            background: 'var(--surface2)',
            borderRadius: '4px',
            overflow: 'hidden',
            border: '1px solid var(--border)'
          }}>
            <div style={{
              height: '100%',
              width: `${porcentajeUso}%`,
              background: porcentajeUso >= 100 ? 'var(--accent)' : 'var(--success)',
              borderRadius: '4px',
              transition: 'width 0.4s ease'
            }} />
          </div>
          <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '6px' }}>
            {usuario?.plan === 'premium'
              ? 'Vehículos ilimitados'
              : porcentajeUso >= 100
                ? '⚠ Límite alcanzado — actualizá a Premium para agregar más'
                : `${porcentajeUso}% del límite usado`
            }
          </div>

          {usuario?.plan !== 'premium' && (
            <button
              className="btn btn-primary btn-sm"
              style={{ marginTop: '12px' }}
              onClick={() => onCambiarPlan('premium')}
            >
              ↑ Actualizar a Premium
            </button>
          )}
          {usuario?.plan === 'premium' && (
            <button
              className="btn btn-ghost btn-sm"
              style={{ marginTop: '12px' }}
              onClick={() => onCambiarPlan('plus')}
            >
              Bajar a Plus
            </button>
          )}

        </div>
      </div>
    </div>
  );
}