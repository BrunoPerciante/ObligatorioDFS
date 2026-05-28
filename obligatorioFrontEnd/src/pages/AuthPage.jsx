import { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const usuariosPrueba = [
  { email: 'duenio1@autotrack.com', password: '123456', rol: 'duenio', nombre: 'Juan Pérez' },
  { email: 'taller1@autotrack.com', password: 'taller123', rol: 'taller', nombre: 'Taller Rápido' }
]

export default function AuthPage() {
  const [pestanaActiva, setPestanaActiva] = useState('login'); // 'login' | 'registro'
  const [rolLogin, setRolLogin] = useState('duenio'); // 'duenio' | 'taller'
  const [rolRegistro, setRolRegistro] = useState('duenio');

  function cambiarPestana(tab) {
    setPestanaActiva(tab);
  }

  function toggleAuthMode() {
    setPestanaActiva(prev => prev === 'login' ? 'registro' : 'login');
  }

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
          <button
            className={`auth-tab ${pestanaActiva === 'login' ? 'active' : ''}`}
            onClick={() => cambiarPestana('login')}
          >
            Ingresar
          </button>
          <button
            className={`auth-tab ${pestanaActiva === 'registro' ? 'active' : ''}`}
            onClick={() => cambiarPestana('registro')}
          >
            Registrarse
          </button>
        </div>

        <LoginForm
          activo={pestanaActiva === 'login'}
          rol={rolLogin}
          setRol={setRolLogin}
          onLogin={() => { /* implementar login real aquí */ }}
        />

        <RegisterForm
          activo={pestanaActiva === 'registro'}
          rol={rolRegistro}
          setRol={setRolRegistro}
          onRegister={() => { /* implementar registro real aquí */ }}
        />

        <div className="auth-switch">
          <span id="auth-switch-text">{pestanaActiva === 'login' ? '¿No tenés cuenta?' : '¿Ya tenés cuenta?'}</span>
          <button onClick={toggleAuthMode} id="auth-switch-btn">
            {pestanaActiva === 'login' ? 'Registrarse' : 'Ingresar'}
          </button>
        </div>
      </div>
    </div>
  );
}
