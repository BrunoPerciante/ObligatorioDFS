import { useState, useEffect } from 'react';
import api from '../../api/api.js';

export default function ModalMantenimiento({ abierto, alCerrar, usuario, alCreado }) {
  const [vehiculos, setVehiculos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [busquedaVehiculo, setBusquedaVehiculo] = useState('');
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState('');
  const [fecha, setFecha] = useState('');
  const [categoria, setCategoria] = useState('');
  const [servicio, setServicio] = useState('');
  const [kilometraje, setKilometraje] = useState('');
  const [costo, setCosto] = useState('');
  const [errorVehiculos, setErrorVehiculos] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [enviando, setEnviando] = useState(false);

  const idTallerDelUsuario = usuario?._id || '';

  useEffect(() => {
    if (abierto) {
      cargarVehiculos();
      cargarCategorias();
    }
  }, [abierto]);

  const cargarVehiculos = async () => {
    setErrorVehiculos('');
    try {
      const response = await api.get('/vehiculos');
      setVehiculos(response.data || []);
    } catch (err) {
      setErrorVehiculos('Error al cargar vehículos');
      console.error('Error cargando vehículos:', err);
    }
  };

  const cargarCategorias = async () => {
    try {
      const response = await api.get('/categorias');
      setCategorias(response.data || []);
    } catch (err) {
      console.error('Error cargando categorías:', err);
    }
  };

  const vehiculosFiltrados = vehiculos.filter(v =>
    v.padron?.toLowerCase().includes(busquedaVehiculo.toLowerCase()) ||
    v.matricula?.toLowerCase().includes(busquedaVehiculo.toLowerCase()) ||
    v.marca?.toLowerCase().includes(busquedaVehiculo.toLowerCase()) ||
    v.modelo?.toLowerCase().includes(busquedaVehiculo.toLowerCase())
  );

  const manejarEnvio = async () => {
    setError('');
    setExito('');

    if (!fecha || !servicio.trim() || !categoria || !vehiculoSeleccionado || !kilometraje || !costo) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (!idTallerDelUsuario) {
      setError('No se encontró el ID del taller. Volvé a iniciar sesión.');
      return;
    }

    const payload = {
      fecha,
      servicio: servicio.trim(),
      categoria,
      vehiculo: vehiculoSeleccionado,
      taller: idTallerDelUsuario,
      kilometraje: Number(kilometraje),
      costo: Number(costo),
    };

    try {
      setEnviando(true);
      await api.post('/mantenimientos', payload);
      setExito('Mantenimiento creado con éxito.');
      setFecha('');
      setCategoria('');
      setServicio('');
      setVehiculoSeleccionado('');
      setBusquedaVehiculo('');
      setKilometraje('');
      setCosto('');
      if (alCreado) alCreado();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear el mantenimiento.');
      console.error('Error creando mantenimiento:', err);
    } finally {
      setEnviando(false);
    }
  };

  if (!abierto) return null;

  return (
    <div id="modal-mantenimiento" className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && alCerrar?.()}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', letterSpacing: '0.04em' }}>Nuevo Mantenimiento</h3>
          <button className="modal-close" type="button" onClick={alCerrar}>✕</button>
        </div>
        {error && <div className="alert alert-error show">{error}</div>}
        {exito && <div className="alert alert-success show">{exito}</div>}

        <div className="ai-box">
          <div className="ai-label">Descripción automática con IA</div>
          <div className="ai-result">La descripción se generará automáticamente al crear el mantenimiento usando Gemini AI</div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Fecha</label>
            <input
              type="date"
              className="form-input"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Categoría</label>
            <select
              className="form-select"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Seleccioná una categoría</option>
              {categorias.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Servicio realizado</label>
          <input
            type="text"
            className="form-input"
            value={servicio}
            onChange={(e) => setServicio(e.target.value)}
            placeholder="Cambio de aceite y filtros, revisión de frenos..."
          />
          <p className="form-hint">La IA generará una descripción profesional a partir de este texto</p>
        </div>

        <div className="form-group">
          <label className="form-label">Vehículo</label>
          {errorVehiculos ? (
            <p style={{ fontSize: '12px', color: 'red' }}>{errorVehiculos}</p>
          ) : (
            <>
              <input
                type="text"
                className="form-input"
                placeholder="Buscar por padrón, matrícula, marca o modelo..."
                value={busquedaVehiculo}
                onChange={(e) => {
                  setBusquedaVehiculo(e.target.value);
                  setVehiculoSeleccionado('');
                }}
              />
              {busquedaVehiculo && (
                <select
                  className="form-select"
                  style={{ marginTop: '8px' }}
                  value={vehiculoSeleccionado}
                  onChange={(e) => setVehiculoSeleccionado(e.target.value)}
                  size={Math.min(vehiculosFiltrados.length || 1, 5)}
                >
                  <option value="">Seleccioná un vehículo</option>
                  {vehiculosFiltrados.length === 0 ? (
                    <option disabled>Sin resultados</option>
                  ) : (
                    vehiculosFiltrados.map((v) => (
                      <option key={v._id} value={v._id}>
                        {v.padron} — {v.matricula} — {v.marca} {v.modelo}
                      </option>
                    ))
                  )}
                </select>
              )}
              {vehiculoSeleccionado && (
                <p style={{ fontSize: '12px', color: 'var(--success)', marginTop: '4px' }}>
                  ✓ Vehículo seleccionado
                </p>
              )}
            </>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">ID del Taller</label>
          <input type="text" className="form-input" value={idTallerDelUsuario} readOnly />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Kilometraje</label>
            <input
              type="number"
              className="form-input"
              value={kilometraje}
              onChange={(e) => setKilometraje(e.target.value)}
              placeholder="46000"
              min="0"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Costo ($)</label>
            <input
              type="number"
              className="form-input"
              value={costo}
              onChange={(e) => setCosto(e.target.value)}
              placeholder="1500"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <button
          className="btn btn-primary"
          type="button"
          style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
          disabled={enviando}
          onClick={manejarEnvio}
        >
          {enviando ? 'Enviando...' : 'Crear mantenimiento'}
        </button>
      </div>
    </div>
  );
}