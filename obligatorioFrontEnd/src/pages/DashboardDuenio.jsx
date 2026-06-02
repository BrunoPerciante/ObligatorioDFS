import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/auth.slice';
import api from '../api/api';

export default function DashboardDuenio() {
  const [seccion, setSeccion] = useState('resumen');
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculosLoading, setVehiculosLoading] = useState(false);
  const [vehiculosError, setVehiculosError] = useState(null);
  const [createError, setCreateError] = useState(null);
  const [createSuccess, setCreateSuccess] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { usuario } = useSelector(state => state.auth);

  useEffect(() => {
    const cargarVehiculos = async () => {
      setVehiculosLoading(true);
      setVehiculosError(null);

      try {
        const response = await api.get('/vehiculos');
        setVehiculos(response.data || []);
      } catch (error) {
        setVehiculosError('No se pudieron cargar los vehículos.');
      } finally {
        setVehiculosLoading(false);
      }
    };

    if (seccion === 'vehiculos' || seccion === 'resumen') {
      cargarVehiculos();
    }
  }, [seccion]);

  const handleCrearVehiculo = async (vehiculoData) => {
    if (!usuario?._id) {
      setCreateError('No se encontró el usuario autenticado.');
      return;
    }

    setCreateError(null);
    setCreateSuccess(null);

    try {
      const body = {
        ...vehiculoData,
        duenio: usuario._id,
      };
      const response = await api.post('/vehiculos', body);
      setCreateSuccess(response.data?.message || 'Vehículo creado correctamente');
      setVehiculos((prev) => [...prev, response.data.vehiculo]);
    } catch (error) {
      setCreateError(error.response?.data?.message || 'No se pudo crear el vehículo.');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="page active">

      <nav>
        <div className="nav-logo">AUTO<span>TRACK</span></div>
        <div className="nav-links">
          <button className={seccion === 'resumen' ? 'active' : ''} onClick={() => setSeccion('resumen')}>Dashboard</button>
          <button className={seccion === 'vehiculos' ? 'active' : ''} onClick={() => setSeccion('vehiculos')}>Mis Vehículos</button>
          <button className={seccion === 'mantenimientos' ? 'active' : ''} onClick={() => setSeccion('mantenimientos')}>Mantenimientos</button>
          <button className={seccion === 'marcas' ? 'active' : ''} onClick={() => setSeccion('marcas')}>Explorar Marcas</button>
          <button className="btn-logout" onClick={handleLogout}>Salir</button>
        </div>
      </nav>

      <div className="dashboard-layout">

        <div className="sidebar">
          <div className="sidebar-section">
            <div className="sidebar-label">Mi cuenta</div>
            <button className={`sidebar-btn ${seccion === 'resumen' ? 'active' : ''}`} onClick={() => setSeccion('resumen')}>
              <span className="sidebar-icon">⊞</span> Resumen
            </button>
            <button className={`sidebar-btn ${seccion === 'vehiculos' ? 'active' : ''}`} onClick={() => setSeccion('vehiculos')}>
              <span className="sidebar-icon">🚗</span> Vehículos
            </button>
            <button className={`sidebar-btn ${seccion === 'mantenimientos' ? 'active' : ''}`} onClick={() => setSeccion('mantenimientos')}>
              <span className="sidebar-icon">🔧</span> Mantenimientos
            </button>
          </div>
          <div className="sidebar-section">
            <div className="sidebar-label">Herramientas</div>
            <button className={`sidebar-btn ${seccion === 'marcas' ? 'active' : ''}`} onClick={() => setSeccion('marcas')}>
              <span className="sidebar-icon">🔍</span> Marcas / Modelos
            </button>
          </div>
        </div>

        <div className="main-content">
          {seccion === 'resumen' && <SeccionResumen usuario={usuario} vehiculos={vehiculos} />}
          {seccion === 'vehiculos' && (
            <SeccionVehiculos
              vehiculos={vehiculos}
              loading={vehiculosLoading}
              error={vehiculosError}
              onCreate={handleCrearVehiculo}
              createError={createError}
              createSuccess={createSuccess}
            />
          )}
          {seccion === 'mantenimientos' && <SeccionMantenimientos />}
          {seccion === 'marcas' && <SeccionMarcas />}
        </div>

      </div>
    </div>
  );
}

function SeccionResumen({ usuario, vehiculos }) {
  return (
    <div>
      <h2 className="section-title">Bienvenido</h2>
      <p style={{ color: 'var(--muted)', marginTop: '4px' }}>{usuario?.email}</p>
      <div className="stats-row" style={{ marginTop: '24px' }}>
        <div className="stat-box">
          <div className="stat-number">{vehiculos?.length ?? 0}</div>
          <div className="stat-label">Vehículos</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">0</div>
          <div className="stat-label">Mantenimientos</div>
        </div>
      </div>
    </div>
  );
}

function SeccionVehiculos({ vehiculos, loading, error, onCreate, createError, createSuccess }) {
  const [form, setForm] = useState({
    padron: '',
    matricula: '',
    marca: '',
    modelo: '',
    anio: '',
    kilometraje: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onCreate({
      ...form,
      anio: Number(form.anio),
      kilometraje: Number(form.kilometraje),
    });
  };

  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">Mis Vehículos</h2>
      </div>

      <div className="card card-small" style={{ marginBottom: '24px' }}>
        <h3>Agregar vehículo</h3>
        <form className="form-grid" onSubmit={handleSubmit}>
          <input name="padron" value={form.padron} onChange={handleChange} placeholder="Padrón" />
          <input name="matricula" value={form.matricula} onChange={handleChange} placeholder="Matrícula" />
          <input name="marca" value={form.marca} onChange={handleChange} placeholder="Marca" />
          <input name="modelo" value={form.modelo} onChange={handleChange} placeholder="Modelo" />
          <input name="anio" type="number" value={form.anio} onChange={handleChange} placeholder="Año" />
          <input name="kilometraje" type="number" value={form.kilometraje} onChange={handleChange} placeholder="Kilometraje" />
          <button type="submit" className="btn btn-primary btn-sm">Guardar vehículo</button>
        </form>
        {createError && <div className="empty-state" style={{ color: 'var(--danger)' }}>{createError}</div>}
        {createSuccess && <div className="empty-state" style={{ color: 'var(--success)' }}>{createSuccess}</div>}
      </div>

      {loading && <div className="empty-state">Cargando vehículos...</div>}
      {error && <div className="empty-state" style={{ color: 'var(--danger)' }}>{error}</div>}

      {!loading && !error && vehiculos?.length > 0 && (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Patente</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Año</th>
                <th>Kms</th>
              </tr>
            </thead>
            <tbody>
              {vehiculos.map((vehiculo) => (
                <tr key={vehiculo._id}>
                  <td>{vehiculo.matricula || vehiculo.padron}</td>
                  <td>{vehiculo.marca}</td>
                  <td>{vehiculo.modelo}</td>
                  <td>{vehiculo.anio}</td>
                  <td>{vehiculo.kilometraje}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && vehiculos?.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🚗</div>
          <div className="empty-text">No tenés vehículos registrados todavía</div>
        </div>
      )}
    </div>
  );
}

function SeccionMantenimientos() {
  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">Mantenimientos</h2>
      </div>
      <div className="empty-state">
        <div className="empty-icon">🔧</div>
        <div className="empty-text">No hay mantenimientos registrados</div>
      </div>
    </div>
  );
}

function SeccionMarcas() {
  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">Explorar Marcas</h2>
        <span style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Datos: NHTSA</span>
      </div>
      <div className="search-bar">
        <input type="text" className="search-input" placeholder="Buscar marca... ej: Toyota, Ford" />
        <button className="btn btn-primary">Buscar modelos</button>
      </div>
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <div className="empty-text">Ingresá una marca para ver sus modelos</div>
      </div>
    </div>
  );
}