export default function RegisterForm() {
  return (
    <div id="auth-registro" className="auth-form">
      <div className="auth-tabs" style={{ marginBottom: '20px' }}>
        <button className="auth-tab active" onClick="switchRegRole('duenio', this)">Dueño</button>
        <button className="auth-tab" onClick="switchRegRole('taller', this)">Taller</button>
      </div>

      <div className="alert alert-error" id="reg-error"></div>
      <div className="alert alert-success" id="reg-success"></div>

      <div className="form-group">
        <label className="form-label">Username</label>
        <input type="text" className="form-input" id="reg-username" placeholder="juanperez" />
      </div>
      <div className="form-group">
        <label className="form-label">Email</label>
        <input type="email" className="form-input" id="reg-email" placeholder="tu@email.com" />
      </div>

      {/* Campos dueño */}
      <div id="reg-duenio-fields">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Nombre completo</label>
            <input type="text" className="form-input" id="reg-nombre" placeholder="Juan García" />
          </div>
          <div className="form-group">
            <label className="form-label">Teléfono</label>
            <input type="text" className="form-input" id="reg-telefono" placeholder="099123456" />
          </div>
        </div>
      </div>

      {/* Campos taller */}
      <div id="reg-taller-fields" style={{ display: 'none' }}>
        <div className="form-group">
          <label className="form-label">Nombre del taller</label>
          <input type="text" className="form-input" id="reg-nombretaller" placeholder="Taller García" />
        </div>
        <div className="form-group">
          <label className="form-label">Dirección</label>
          <input type="text" className="form-input" id="reg-direccion" placeholder="Av. 18 de Julio 1234" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Contraseña</label>
          <input type="password" className="form-input" id="reg-password" placeholder="••••••" />
        </div>
        <div className="form-group">
          <label className="form-label">Confirmar</label>
          <input type="password" className="form-input" id="reg-confirm" placeholder="••••••" />
        </div>
      </div>
      <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick="doRegister()">
        Crear cuenta
      </button>
    </div>
  );
}
