import { useState, useEffect } from 'react';
import api from '../../../api/api.js';
import { toast } from 'react-toastify';

export default function Mantenimientos({ 
  vehiculos = [], 
  mantenimientos = [],
  loading = false, 
  error = null,
  onCreate,
  onDelete,
  onEdit 
}) {
  const [mantenimientosLocal, setMantenimientosLocal] = useState(mantenimientos);
  const [localLoading, setLocalLoading] = useState(loading);
  const [localError, setLocalError] = useState(error);
  const [busqueda, setBusqueda] = useState('');
  const [vehiculoFilter, setVehiculoFilter] = useState('todos');

  // Cargar mantenimientos de la API (solo del dueño)
  useEffect(() => {
    const cargarMantenimientos = async () => {
      setLocalLoading(true);
      setLocalError(null);

      try {
        // Obtener todos los mantenimientos
        const response = await api.get('/mantenimientos?page=1&limit=100');
        // Backend devuelve: { message, data: { mantenimientos, totalPages, page, limit } }
        const todos = response.data?.data?.mantenimientos || [];
        
        // Filtrar solo los que pertenecen a vehículos del dueño
        const vehiculoIds = vehiculos.map(v => v._id);
        const mantenimientosDelDuenio = todos.filter(m => 
          vehiculoIds.includes(m.vehiculo?._id)
        );
        
        setMantenimientosLocal(mantenimientosDelDuenio);
      } catch (err) {
        setLocalError('No se pudieron cargar los mantenimientos');
        console.error('Error cargando mantenimientos:', err);
      } finally {
        setLocalLoading(false);
      }
    };

    if (vehiculos.length > 0) {
      cargarMantenimientos();
    }
  }, [vehiculos]);

  // Filtrar por búsqueda y vehículo (localmente)
  const mantenimientosFiltrados = mantenimientosLocal.filter(m => {
    const matchBusqueda = !busqueda || 
      m.servicio?.toLowerCase().includes(busqueda.toLowerCase()) ||
      m.vehiculo?.marca?.toLowerCase().includes(busqueda.toLowerCase()) ||
      m.vehiculo?.modelo?.toLowerCase().includes(busqueda.toLowerCase());
    
    const matchVehiculo = vehiculoFilter === 'todos' || m.vehiculo?._id === vehiculoFilter;
    
    return matchBusqueda && matchVehiculo;
  });

  const formatFecha = (fecha) => new Date(fecha).toLocaleDateString('es-UY');
  const formatCosto = (costo) => `$${costo.toLocaleString('es-UY')}`;

  return (
    <div id="duenio-mantenimientos" className="dash-section">
      <div className="section-header">
        <h2 className="section-title">
          Mantenimientos <span style={{ fontSize: '0.6em', color: 'var(--muted)' }}>({mantenimientosFiltrados.length})</span>
        </h2>
        <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Los mantenimientos son registrados por los talleres</p>
      </div>

      {/* BUSCADOR */}
      <div className="search-bar" style={{ marginBottom: '16px' }}>
        <input 
          type="text"
          className="search-input"
          placeholder="Buscar por servicio o vehículo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <select 
          className="form-select"
          value={vehiculoFilter}
          onChange={(e) => setVehiculoFilter(e.target.value)}
          style={{ width: '200px' }}
        >
          <option value="todos">Todos los vehículos</option>
          {vehiculos.map(v => (
            <option key={v._id} value={v._id}>
              {v.marca} {v.modelo} ({v.padron})
            </option>
          ))}
        </select>
      </div>

      {/* INDICADORES DE ESTADO */}
      {localLoading && (
        <div className="empty-state" style={{ padding: '30px' }}>
          <div className="spinner"></div>
          <p style={{ marginTop: '12px', color: 'var(--muted)' }}>Cargando mantenimientos...</p>
        </div>
      )}

      {localError && (
        <div className="alert alert-error" style={{ marginBottom: '16px' }}>
          {localError}
        </div>
      )}

      {/* TABLA DE MANTENIMIENTOS */}
      {!localLoading && !localError && mantenimientosFiltrados.length > 0 && (
        <div className="card">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Vehículo</th>
                  <th>Servicio</th>
                  <th>Categoría</th>
                  <th>KM</th>
                  <th>Costo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {mantenimientosFiltrados.map((m) => (
                  <tr key={m._id}>
                    <td><strong>{formatFecha(m.fecha)}</strong></td>
                    <td>
                      <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                        {m.vehiculo?.marca} {m.vehiculo?.modelo}
                      </span>
                      <br />
                      <span style={{ fontSize: '11px', color: 'var(--accent)' }}>
                        {m.vehiculo?.padron}
                      </span>
                    </td>
                    <td>
                      <span title={m.descripcion}>{m.servicio}</span>
                    </td>
                    <td>
                      <span className={`tag tag-${m.categoria?.nombre?.toLowerCase().replace(/\s+/g, '-')}`}>
                        {m.categoria?.nombre || 'Sin categoría'}
                      </span>
                    </td>
                    <td className="td-mono">{m.kilometraje?.toLocaleString() || '-'}</td>
                    <td><strong>{formatCosto(m.costo)}</strong></td>
                    <td style={{ display: 'flex', gap: '6px' }}>
                      <button 
                        className="btn btn-sm btn-secondary"
                        title="Ver descripción IA"
                        onClick={() => alert(`Descripción IA:\n\n${m.descripcion}`)}
                      >
                        👁️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ESTADO VACÍO */}
      {!localLoading && !localError && mantenimientosFiltrados.length === 0 && (
        <div className="empty-state" style={{ padding: '30px' }}>
          <div className="empty-icon">🔧</div>
          <div className="empty-text">
            {mantenimientosLocal.length === 0 
              ? 'No hay mantenimientos registrados'
              : 'No se encontraron mantenimientos con los filtros aplicados'}
          </div>
        </div>
      )}
    </div>
  );
}
