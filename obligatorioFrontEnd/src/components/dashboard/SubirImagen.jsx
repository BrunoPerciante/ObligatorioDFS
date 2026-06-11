import { useState } from 'react';
import api from '../../api/api';

export default function SubirImagen() {
  const [archivo, setArchivo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [urlSubida, setUrlSubida] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const handleArchivoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setArchivo(file);
    setPreview(URL.createObjectURL(file));
    setUrlSubida('');
    setError('');
  };

  const handleSubir = async () => {
    if (!archivo) {
      setError('Seleccioná una imagen primero');
      return;
    }

    setCargando(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('imagen', archivo);

     const response = await api.post('/uploads', formData, {
  headers: { 'Content-Type': undefined }
});

      setUrlSubida(response.data.url);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al subir la imagen');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="dash-section">
      <div className="section-header">
        <h2 className="section-title">Subir imagen</h2>
        <span style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Cloudinary
        </span>
      </div>

      <div className="card" style={{ maxWidth: '500px' }}>
        <div className="form-group">
          <label className="form-label">Seleccioná una imagen</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleArchivoChange}
            className="form-input"
          />
        </div>

        {/* Preview de la imagen seleccionada */}
        {preview && (
          <div style={{ marginBottom: '16px' }}>
            <p className="form-label">Preview</p>
            <img
              src={preview}
              alt="preview"
              style={{ width: '100%', maxHeight: '250px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--border)' }}
            />
          </div>
        )}

        {error && (
          <div className="alert alert-error show" style={{ marginBottom: '16px' }}>
            {error}
          </div>
        )}

        <button
          className="btn btn-primary"
          onClick={handleSubir}
          disabled={!archivo || cargando}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          {cargando ? 'Subiendo...' : 'Subir imagen'}
        </button>

        {urlSubida && (
          <div style={{ marginTop: '16px' }}>
            <p className="form-label">Imagen subida exitosamente</p>
            <img
              src={urlSubida}
              alt="subida"
              style={{ width: '100%', maxHeight: '250px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--border)' }}
            />
            <p style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '8px', wordBreak: 'break-all' }}>
              URL: {urlSubida}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}