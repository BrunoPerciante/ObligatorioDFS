import { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { getLoginSchema, getRegisterSchema } from '../validators/auth.validators';

export default function AuthPage() {
  const [pestanaActiva, setPestanaActiva] = useState('login'); // 'login' | 'registro'
  const [rol, setRol] = useState('duenio'); // 'duenio' | 'taller'

  function cambiarPestana(tab) {
    setPestanaActiva(tab);
  }

  function toggleAuthMode() {
    setPestanaActiva(prev => prev === 'login' ? 'registro' : 'login');
  }

  // Obtener los schemas corretos basándose en el rol y la pestaña
  const loginSchemaActual = getLoginSchema(rol);
  const registerSchemaActual = getRegisterSchema(rol);

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

        {/* SELECTOR DE ROL - UNO SOLO PARA AMBOS FORMULARIOS */}
        <div className="auth-role-tabs" style={{ marginBottom: '20px' }}>
          <button
            className={`auth-role-tab ${rol === 'duenio' ? 'active' : ''}`}
            onClick={() => setRol('duenio')}
          >
            Soy Dueño
          </button>
          <button
            className={`auth-role-tab ${rol === 'taller' ? 'active' : ''}`}
            onClick={() => setRol('taller')}
          >
            Soy Taller
          </button>
        </div>

        {/* BADGE DEL ROL ACTUAL */}
        <div className="tag tag-plus" style={{ marginBottom: '16px', fontSize: '10px' }}>
          ROL: {rol === 'duenio' ? 'DUEÑO' : 'TALLER'}
        </div>

        {/* LOGIN */}
        <LoginForm
          activo={pestanaActiva === 'login'}
          rol={rol}
          loginSchema={loginSchemaActual}
        />

        {/* REGISTRO */}
        <RegisterForm
          activo={pestanaActiva === 'registro'}
          rol={rol}
          registerSchema={registerSchemaActual}
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
