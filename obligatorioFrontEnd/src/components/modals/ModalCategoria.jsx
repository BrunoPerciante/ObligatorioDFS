import { useState } from 'react';
import api from '../../api/api.js';

export default function ModalCategoria({ abierto, alCerrar }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [enviando, setEnviando] = useState(false);

  if (!abierto) return null;

  const manejarEnvio = async () => {
    if (!nombre) {
      setError('Seleccioná una categoría.');
      setExito('');
      return;
    }

    setError('');
    setEnviando(true);

    try {
      await api.post('/categorias', { nombre, descripcion });
      setExito(`Categoría "${nombre}" creada correctamente.`);
      setNombre('');
      setDescripcion('');
    } catch (err) {
      const mensaje = err.response?.data?.message || 'Error al crear la categoría.';
      setError(mensaje);
    } finally {
      setEnviando(false);
    }
  };

  const manejarClickOverlay = (event) => {
    if (event.target === event.currentTarget) {
      alCerrar?.();
    }
  };

  return (
    <div id="modal-categoria" className={`modal-overlay ${abierto ? 'open' : ''}`} onClick={manejarClickOverlay}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', letterSpacing: '0.04em' }}>Nueva Categoría</h3>
          <button className="modal-close" type="button" onClick={alCerrar}>✕</button>
        </div>
        {error && <div className="alert alert-error show">{error}</div>}
        {exito && <div className="alert alert-success show">{exito}</div>}

        <div className="form-group">
          <label className="form-label">Nombre</label>
          <select
            className="form-select"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          >
            <option value="">Seleccioná una categoría</option>
            <option value="mecanica">Mecánica</option>
            <option value="electricidad">Electricidad</option>
            <option value="chapa y pintura">Chapa y pintura</option>
          </select>
          <p className="form-hint">Solo se puede crear una de cada tipo</p>
        </div>
        <div className="form-group">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-textarea"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Describí qué servicios abarca esta categoría..."
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
          disabled={enviando}
          onClick={manejarEnvio}
        >
          {enviando ? 'Creando...' : 'Crear categoría'}
        </button>
      </div>
    </div>
  );
}