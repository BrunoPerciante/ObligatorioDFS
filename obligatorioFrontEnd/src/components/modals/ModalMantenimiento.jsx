import { useState, useEffect } from 'react';
import api from '../../api/api.js';

export default function ModalMantenimiento({ abierto, alCerrar, usuario, alCreado }) {
  const [vehiculos, setVehiculos] = useState([]);
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
    if (abierto && idTallerDelUsuario) {
      cargarVehiculos();
    }
  }, [abierto, idTallerDelUsuario]);

  const cargarVehiculos = async () => {
    setErrorVehiculos('');
    try {
      const response = await api.get('/vehiculos?page=1&limit=100');
      const todos = response.data?.data?.vehiculos || response.data?.data || [];
      const vehiculosDelTaller = todos.filter((v) => {
        if (v.mantenimientos && Array.isArray(v.mantenimientos)) {
          return v.mantenimientos.some((m) => m.taller === idTallerDelUsuario);
        }
        return false;
      });
      setVehiculos(vehiculosDelTaller);
    } catch (err) {
      setErrorVehiculos('Error al cargar vehículos');
      console.error('Error cargando vehículos:', err);
    }
  };

  const manejarEnvio = async () => {
    setError('');
    setExito('');

    if (!fecha || !servicio.trim() || !categoria || !vehiculoSeleccionado || !kilometraje || !costo) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (!idTallerDelUsuario) {
      setError('No se encontró el ID del taller. Vuelve a iniciar sesión.');
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
        {error && <div className="alert alert-error">{error}</div>}
        {exito && <div className="alert alert-success">{exito}</div>}

        <div className="ai-box">
          <div className="ai-label">Descripción automática con IA</div>
          <div className="ai-result" id="ai-preview">La descripción se generará automáticamente al crear el mantenimiento usando Gemini AI</div>
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
              <option value="mecanica">Mecánica</option>
              <option value="electricidad">Electricidad</option>
              <option value="chapa y pintura">Chapa y pintura</option>
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
            <p style={{ fontSize: '12px', color: 'var(--error)' }}>{errorVehiculos}</p>
          ) : (
            <select
              className="form-select"
              value={vehiculoSeleccionado}
              onChange={(e) => setVehiculoSeleccionado(e.target.value)}
            >
              <option value="">Seleccioná un vehículo</option>
              {vehiculos.map((v) => (
                <option key={v._id} value={v._id}>
                  {v.marca} {v.modelo} - {v.padron}
                </option>
              ))}
            </select>
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
