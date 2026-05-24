export default function LoginForm() {
  return (
    <div id="auth-login" className="auth-form active">
      <div className="auth-tabs" style={{ marginBottom: '20px' }}>
        <button className="auth-tab active" onClick="switchRole('duenio', this)">Soy Dueño</button>
        <button className="auth-tab" onClick="switchRole('taller', this)">Soy Taller</button>
      </div>
      <div id="login-role-badge" className="tag tag-plus" style={{ marginBottom: '16px', fontSize: '10px' }}>ROL: DUEÑO</div>

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
      <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick="doLogin()">
        Ingresar al sistema
      </button>
    </div>
  );
}
