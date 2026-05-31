import { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { getLoginSchema, getRegisterSchema } from '../validators/auth.validators';

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

  // Obtener los schemas corretos basándose en el rol y la pestaña
  const loginSchemaActual = getLoginSchema(rolLogin);
  const registerSchemaActual = getRegisterSchema(rolRegistro);

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

        {/* LOGIN */}
        <div className={`auth-role-tabs ${pestanaActiva === 'login' ? 'active' : ''}`} style={{ marginBottom: '20px' }}>
          <button
            className={`auth-role-tab ${rolLogin === 'duenio' ? 'active' : ''}`}
            onClick={() => setRolLogin('duenio')}
          >
            Soy Dueño
          </button>
          <button
            className={`auth-role-tab ${rolLogin === 'taller' ? 'active' : ''}`}
            onClick={() => setRolLogin('taller')}
          >
            Soy Taller
          </button>
        </div>

        {pestanaActiva === 'login' && (
          <div id="login-role-badge" className="tag tag-plus" style={{ marginBottom: '16px', fontSize: '10px' }}>
            ROL: {rolLogin === 'duenio' ? 'DUEÑO' : 'TALLER'}
          </div>
        )}

        <LoginForm
          activo={pestanaActiva === 'login'}
          rol={rolLogin}
          loginSchema={loginSchemaActual}
        />

        {/* REGISTRO */}
        <div className={`auth-role-tabs ${pestanaActiva === 'registro' ? 'active' : ''}`} style={{ marginBottom: '20px' }}>
          <button
            className={`auth-role-tab ${rolRegistro === 'duenio' ? 'active' : ''}`}
            onClick={() => setRolRegistro('duenio')}
          >
            Soy Dueño
          </button>
          <button
            className={`auth-role-tab ${rolRegistro === 'taller' ? 'active' : ''}`}
            onClick={() => setRolRegistro('taller')}
          >
            Soy Taller
          </button>
        </div>

        {pestanaActiva === 'registro' && (
          <div id="register-role-badge" className="tag tag-plus" style={{ marginBottom: '16px', fontSize: '10px' }}>
            ROL: {rolRegistro === 'duenio' ? 'DUEÑO' : 'TALLER'}
          </div>
        )}

        <RegisterForm
          activo={pestanaActiva === 'registro'}
          rol={rolRegistro}
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
