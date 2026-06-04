import { useState, useEffect } from 'react';
import api from '../../api/api';

export default function Mecanicos({ alAgregarMecanico, recargar }) {
  const [mecanicos, setMecanicos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarMecanicos();
  }, [recargar]);

  const cargarMecanicos = async () => {
    setError('');
    setCargando(true);
    try {
      const response = await api.get('/mecanicos');
      setMecanicos(response.data || []);
    } catch (err) {
      console.error('Error cargando mecánicos:', err);
      setError('Error al cargar los mecánicos.');
    } finally {
      setCargando(false);
    }
  };

  const abrirModal = () => {
    alAgregarMecanico?.();
  };

  const manejarEdicion = (mecanico) => {
    console.log('Editar mecánico:', mecanico);
  };

  const manejarEliminacion = (mecanico) => {
    console.log('Eliminar mecánico:', mecanico);
  };

  return (
    <div id="taller-mecanicos" className="dash-section">
      <div className="section-header">
        <h2 className="section-title">Mecánicos</h2>
        <button className="btn btn-primary btn-sm" type="button" onClick={abrirModal}>+ Agregar mecánico</button>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Taller</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr>
                  <td colSpan="4">Cargando mecánicos...</td>
                </tr>
              ) : mecanicos.length === 0 ? (
                <tr>
                  <td colSpan="4">
                    <div className="empty-state" style={{ padding: '30px' }}>
                      <div className="empty-icon">👷</div>
                      <div className="empty-text">No hay mecánicos registrados</div>
                    </div>
                  </td>
                </tr>
              ) : (
                mecanicos.map((mecanico) => (
                  <tr key={mecanico._id || mecanico.id}>
                    <td>{mecanico.nombre}</td>
                    <td>{mecanico.apellido}</td>
                    <td>{mecanico.taller?.nombre || mecanico.taller?.username || mecanico.taller || '—'}</td>
                    <td style={{ display: 'flex', gap: '8px' }}>
                      <button type="button" className="btn btn-sm btn-secondary" onClick={() => manejarEdicion(mecanico)}>
                        Editar
                      </button>
                      <button type="button" className="btn btn-sm btn-danger" onClick={() => manejarEliminacion(mecanico)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
