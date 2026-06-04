import { useState, useEffect } from 'react';
import api from '../../api/api';

export default function MantenimientosTaller({ usuario, alCrearMantenimiento, recargar }) {
  const [mantenimientos, setMantenimientos] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState('todos');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarMantenimientos();
  }, [recargar, categoriaFiltro]);

  const cargarMantenimientos = async () => {
    setError('');
    setCargando(true);
    try {
      const params = new URLSearchParams({ page: '1', limit: '100' });
      if (categoriaFiltro !== 'todos') {
        params.set('categoria', categoriaFiltro);
      }
      const response = await api.get(`/mantenimientos?${params.toString()}`);
      const lista = response.data?.data?.mantenimientos || [];
      setMantenimientos(lista);
    } catch (err) {
      console.error('Error cargando mantenimientos:', err);
      setError('Error al cargar los mantenimientos.');
    } finally {
      setCargando(false);
    }
  };

  const cambiarFiltro = (filtro) => {
    setCategoriaFiltro(filtro);
  };

  return (
    <div id="taller-mantenimientos" className="dash-section">
      <div className="section-header">
        <h2 className="section-title">Mantenimientos</h2>
        <button className="btn btn-primary btn-sm" type="button" onClick={alCrearMantenimiento}>+ Nuevo mantenimiento</button>
      </div>

      <div className="filter-bar">
        <button className={`filter-btn ${categoriaFiltro === 'todos' ? 'active' : ''}`} type="button" onClick={() => cambiarFiltro('todos')}>
          Todos
        </button>
        <button className={`filter-btn ${categoriaFiltro === 'mecanica' ? 'active' : ''}`} type="button" onClick={() => cambiarFiltro('mecanica')}>
          Mecánica
        </button>
        <button className={`filter-btn ${categoriaFiltro === 'electricidad' ? 'active' : ''}`} type="button" onClick={() => cambiarFiltro('electricidad')}>
          Electricidad
        </button>
        <button className={`filter-btn ${categoriaFiltro === 'chapa y pintura' ? 'active' : ''}`} type="button" onClick={() => cambiarFiltro('chapa y pintura')}>
          Chapa y pintura
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Vehículo</th>
                <th>Servicio</th>
                <th>Descripción IA</th>
                <th>Categoría</th>
                <th>Costo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr>
                  <td colSpan="7">Cargando mantenimientos...</td>
                </tr>
              ) : mantenimientos.length === 0 ? (
                <tr>
                  <td colSpan="7">
                    <div className="empty-state" style={{ padding: '30px' }}>
                      <div className="empty-icon">🔧</div>
                      <div className="empty-text">No hay mantenimientos. Creá el primero.</div>
                    </div>
                  </td>
                </tr>
              ) : (
                mantenimientos.map((mantenimiento) => (
                  <tr key={mantenimiento._id || mantenimiento.id}>
                    <td>{mantenimiento.fecha ? new Date(mantenimiento.fecha).toLocaleDateString() : '—'}</td>
                    <td>{mantenimiento.vehiculo?.marca ? `${mantenimiento.vehiculo.marca} ${mantenimiento.vehiculo.modelo}` : mantenimiento.vehiculo?.matricula || mantenimiento.vehiculo?.padron || '—'}</td>
                    <td>{mantenimiento.servicio}</td>
                    <td>{mantenimiento.descripcion || '—'}</td>
                    <td>{mantenimiento.categoria?.nombre || mantenimiento.categoria || '—'}</td>
                    <td>{mantenimiento.costo != null ? `$${mantenimiento.costo}` : '—'}</td>
                    <td style={{ display: 'flex', gap: '8px' }}>
                      <button type="button" className="btn btn-sm btn-secondary">Ver</button>
                      <button type="button" className="btn btn-sm btn-danger">Eliminar</button>
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
