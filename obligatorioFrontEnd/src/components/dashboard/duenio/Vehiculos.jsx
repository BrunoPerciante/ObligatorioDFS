import { useState } from 'react';

export default function Vehiculos({ vehiculos = [], loading = false, error = null, onCreate, createError, createSuccess }) {
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
    if (!onCreate) return;

    await onCreate({
      ...form,
      anio: Number(form.anio),
      kilometraje: Number(form.kilometraje),
    });
  };

  return (
    <div id="duenio-vehiculos" className="dash-section">
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
        <div className="card">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Padrón</th>
                  <th>Matrícula</th>
                  <th>Marca / Modelo</th>
                  <th>Año</th>
                  <th>Kilometraje</th>
                </tr>
              </thead>
              <tbody>
                {vehiculos.map((vehiculo) => (
                  <tr key={vehiculo._id}>
                    <td>{vehiculo.padron}</td>
                    <td>{vehiculo.matricula}</td>
                    <td>{vehiculo.marca} {vehiculo.modelo}</td>
                    <td>{vehiculo.anio}</td>
                    <td>{vehiculo.kilometraje}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!loading && !error && vehiculos?.length === 0 && (
        <div className="empty-state" style={{ padding: '30px' }}>
          <div className="empty-icon">🚗</div>
          <div className="empty-text">No tenés vehículos registrados todavía</div>
        </div>
      )}
    </div>
  );
}
