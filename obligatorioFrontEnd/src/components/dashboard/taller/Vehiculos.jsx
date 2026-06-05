import { useState, useEffect } from 'react';
import api from '../../../api/api';

export default function Vehiculos({ usuario }) {
  const [vehiculosLocal, setVehiculosLocal] = useState([]);
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [filtroMarca, setFiltroMarca] = useState('todos');

  useEffect(() => {
    const cargarVehiculos = async () => {
      setLocalLoading(true);
      setLocalError(null);
      try {
        const response = await api.get('/vehiculos');
        setVehiculosLocal(response.data || []);
      } catch (err) {
        setLocalError('No se pudieron cargar los vehículos');
        console.error('Error cargando vehículos:', err);
      } finally {
        setLocalLoading(false);
      }
    };

    cargarVehiculos();
  }, []);

  const vehiculosFiltrados = vehiculosLocal.filter(v => {
    const matchBusqueda = !busqueda ||
      v.padron?.toLowerCase().includes(busqueda.toLowerCase()) ||
      v.matricula?.toLowerCase().includes(busqueda.toLowerCase()) ||
      v.marca?.toLowerCase().includes(busqueda.toLowerCase()) ||
      v.modelo?.toLowerCase().includes(busqueda.toLowerCase());

    const matchMarca = filtroMarca === 'todos' || v.marca?.toLowerCase() === filtroMarca.toLowerCase();

    return matchBusqueda && matchMarca;
  });

  const marcasUnicas = [...new Set(vehiculosLocal.map(v => v.marca))].sort();

  return (
    <div className="dash-section">
      <div className="section-header">
        <h2 className="section-title">
          Vehículos <span style={{ fontSize: '0.6em', color: 'var(--muted)' }}>({vehiculosFiltrados.length})</span>
        </h2>
        <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Todos los vehículos registrados en el sistema</p>
      </div>

      <div className="search-bar" style={{ marginBottom: '16px' }}>
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por padrón, matrícula, marca o modelo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <select
          className="form-select"
          value={filtroMarca}
          onChange={(e) => setFiltroMarca(e.target.value)}
          style={{ width: '180px' }}
        >
          <option value="todos">Todas las marcas</option>
          {marcasUnicas.map(marca => (
            <option key={marca} value={marca}>{marca}</option>
          ))}
        </select>
      </div>

      {localLoading && (
        <div className="empty-state" style={{ padding: '30px' }}>
          <div className="spinner"></div>
          <p style={{ marginTop: '12px', color: 'var(--muted)' }}>Cargando vehículos...</p>
        </div>
      )}

      {localError && (
        <div className="alert alert-error show" style={{ marginBottom: '16px' }}>
          {localError}
        </div>
      )}

      {!localLoading && !localError && vehiculosFiltrados.length > 0 && (
        <div className="card">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Padrón</th>
                  <th>Matrícula</th>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Año</th>
                  <th>Kilometraje</th>
                  <th>Dueño</th>
                </tr>
              </thead>
              <tbody>
                {vehiculosFiltrados.map((v) => (
                  <tr key={v._id}>
                    <td><strong>{v.padron}</strong></td>
                    <td className="td-mono">{v.matricula}</td>
                    <td>{v.marca}</td>
                    <td>{v.modelo}</td>
                    <td className="td-mono">{v.anio || '-'}</td>
                    <td className="td-mono">{v.kilometraje?.toLocaleString() || '-'}</td>
                    <td>
                      <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                        {v.duenio?.username || v.duenio?.nombre || 'Sin dueño'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!localLoading && !localError && vehiculosFiltrados.length === 0 && (
        <div className="empty-state" style={{ padding: '30px' }}>
          <div className="empty-icon">🚗</div>
          <div className="empty-text">
            {vehiculosLocal.length === 0
              ? 'No hay vehículos registrados en el sistema'
              : 'No hay resultados para tu búsqueda'}
          </div>
        </div>
      )}
    </div>
  );
}