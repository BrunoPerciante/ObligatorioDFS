export default function LoginForm({ activo = true, rol = 'duenio', setRol = () => {}, onLogin = () => {} }) {
  return (
    <div id="auth-login" className={`auth-form ${activo ? 'active' : ''}`}>
      <div className="auth-tabs" style={{ marginBottom: '20px' }}>
        <button
          className={`auth-tab ${rol === 'duenio' ? 'active' : ''}`}
          onClick={() => setRol('duenio')}
        >
          Soy Dueño
        </button>
        <button
          className={`auth-tab ${rol === 'taller' ? 'active' : ''}`}
          onClick={() => setRol('taller')}
        >
          Soy Taller
        </button>
      </div>

      <div id="login-role-badge" className="tag tag-plus" style={{ marginBottom: '16px', fontSize: '10px' }}>
        ROL: {rol === 'duenio' ? 'DUEÑO' : 'TALLER'}
      </div>

      <div className="alert alert-error" id="login-error"></div>
      <div className="alert alert-success" id="login-success"></div>

      <div className="form-group">
        <label className="form-label">Email</label>
        <input type="email" className="form-input" id="login-email" placeholder="tu@email.com" />
      </div>
      <div className="form-group">
        <label className="form-label">Contraseña</label>
        <input type="password" className="form-input" id="login-password" placeholder="••••••" />
      </div>
      <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={onLogin}>
        Ingresar al sistema
      </button>
    </div>
  );
}
