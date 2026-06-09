/*export default function ExplorarMarcas() {
  return (
    <div id="duenio-vehiculoinfo" className="dash-section">
      <div className="section-header">
        <h2 className="section-title">Explorar Marcas</h2>
        <span style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Datos: NHTSA</span>
      </div>

      <div className="search-bar">
        <input type="text" className="search-input" id="search-marca" placeholder="Buscar marca... ej: Toyota, Ford, Chevrolet" />
        <button className="btn btn-primary" onClick="buscarModelos()">Buscar modelos</button>
        <button className="btn btn-secondary" onClick="cargarTodasMarcas()">Ver todas</button>
      </div>

      <div id="nhtsa-result">
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <div className="empty-text">Ingresá una marca para ver sus modelos o cargá todas</div>
        </div>
      </div>
    </div>
  );
}*/

import { useState } from 'react';
import api from '../../../api/api';

export default function ExplorarMarcas() {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const buscarModelos = async () => {
    if (!busqueda.trim()) return;
    setCargando(true);
    setError('');
    try {
      const response = await api.get(`/vehiculo-info/modelos/${busqueda.trim()}`);
      setResultados(response.data?.data || []);
      if (response.data?.data?.length === 0) {
        setError(`No se encontraron modelos para "${busqueda}"`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al buscar modelos');
      setResultados([]);
    } finally {
      setCargando(false);
    }
  };

  const cargarTodasMarcas = async () => {
    setCargando(true);
    setError('');
    setBusqueda('');
    try {
      const response = await api.get('/vehiculo-info/marcas');
      setResultados(response.data?.data || []);
    } catch (err) {
      setError('Error al cargar las marcas');
      setResultados([]);
    } finally {
      setCargando(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') buscarModelos();
  };

  return (
    <div className="dash-section">
      <div className="section-header">
        <h2 className="section-title">Explorar Marcas</h2>
        <span style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Datos: NHTSA
        </span>
      </div>

      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar marca... ej: Toyota, Ford, Chevrolet"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn btn-primary" onClick={buscarModelos}>Buscar modelos</button>
        <button className="btn btn-secondary" onClick={cargarTodasMarcas}>Ver todas</button>
      </div>

      {error && (
        <div className="alert alert-error show" style={{ marginBottom: '16px' }}>{error}</div>
      )}

      {cargando && (
        <div className="empty-state">
          <div className="spinner"></div>
          <p style={{ marginTop: '12px', color: 'var(--muted)' }}>Cargando...</p>
        </div>
      )}

      {!cargando && resultados.length > 0 && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">Resultados</div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)' }}>
              {resultados.length} encontrados
            </span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  {resultados[0]?.marca && <th>Marca</th>}
                </tr>
              </thead>
              <tbody>
                {resultados.map((item) => (
                  <tr key={item.id}>
                    <td className="td-mono">{item.id}</td>
                    <td>{item.nombre}</td>
                    {item.marca && <td>{item.marca}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!cargando && resultados.length === 0 && !error && (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <div className="empty-text">Ingresá una marca para ver sus modelos o cargá todas</div>
        </div>
      )}
    </div>
  );
}
