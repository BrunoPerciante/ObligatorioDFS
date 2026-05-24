import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const usuariosPrueba = [
  { email: 'duenio1@autotrack.com', password: '123456', rol: 'duenio', nombre: 'Juan Pérez' },
  { email: 'taller1@autotrack.com', password: 'taller123', rol: 'taller', nombre: 'Taller Rápido' }
]

export default function AuthPage() {
  return (
    <div id="page-auth" className="page active">
      <div className="auth-visual">
        <div className="auth-tagline">GESTIÓN<br/>DE <em>VEHÍCULOS</em><br/>Y TALLERES</div>
        <p className="auth-sub">Registrá mantenimientos, administrá tu flota y generá descripciones profesionales con inteligencia artificial.</p>
        <div className="auth-features">
          <div className="auth-feature">Control total de vehículos y mantenimientos</div>
          <div className="auth-feature">Descripción automática con IA (Gemini)</div>
          <div className="auth-feature">Gestión de mecánicos y talleres</div>
          <div className="auth-feature">Búsqueda de marcas y modelos (NHTSA)</div>
        </div>
      </div>

      <div className="auth-form-wrap">
        <div className="auth-logo">AUTO<span>TRACK</span></div>

        <div className="auth-tabs">
          <button className="auth-tab active" onClick="switchAuthTab('login')">Ingresar</button>
          <button className="auth-tab" onClick="switchAuthTab('registro')">Registrarse</button>
        </div>

        <LoginForm />
        <RegisterForm />

        <div className="auth-switch">
          <span id="auth-switch-text">¿No tenés cuenta?</span>
          <button onClick="toggleAuthMode()" id="auth-switch-btn">Registrarse</button>
        </div>
      </div>
    </div>
  );
}
