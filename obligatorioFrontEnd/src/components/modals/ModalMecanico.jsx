import { useState } from 'react';
import api from '../../api/api.js';

export default function ModalMecanico({ abierto, alCerrar, usuario, alCreado }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [enviando, setEnviando] = useState(false);

  if (!abierto) return null;

  const idTallerDelUsuario = usuario?._id || '';

  const manejarEnvio = async () => {
    setError('');
    setExito('');

    if (!nombre.trim() || !apellido.trim()) {
      setError('Nombre y apellido son obligatorios.');
      return;
    }

    if (!idTallerDelUsuario) {
      setError('No se encontró el ID del taller. Vuelve a iniciar sesión.');
      return;
    }

    const payload = {
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      taller: idTallerDelUsuario,
    };

    try {
      setEnviando(true);
      await api.post('/mecanicos', payload);
      setExito('Mecánico creado con éxito.');
      console.log('Mecánico creado:', payload);
      setNombre('');
      setApellido('');
      if (alCreado) alCreado();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear el mecánico.');
      console.error('Error creando mecánico:', err);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div id="modal-mecanico" className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && alCerrar?.()}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', letterSpacing: '0.04em' }}>Agregar Mecánico</h3>
          <button className="modal-close" type="button" onClick={alCerrar}>✕</button>
        </div>
        {error && <div className="alert alert-error">{error}</div>}
        {exito && <div className="alert alert-success">{exito}</div>}

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-input"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Carlos"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Apellido</label>
            <input
              type="text"
              className="form-input"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              placeholder="Rodríguez"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">ID del Taller</label>
          <input type="text" className="form-input" value={idTallerDelUsuario} readOnly />
          <p className="form-hint">Se completa automáticamente con tu taller</p>
        </div>
        <button
          className="btn btn-primary"
          type="button"
          style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
          disabled={enviando}
          onClick={manejarEnvio}
        >
          {enviando ? 'Enviando...' : 'Agregar mecánico'}
        </button>
      </div>
    </div>
  );
}
