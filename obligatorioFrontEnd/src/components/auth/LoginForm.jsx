import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setUsuario, setRol, setLoading, setError } from "../../features/auth/auth.slice";

export default function LoginForm({ activo = true, rol = 'duenio', loginSchema }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.auth);

  const { register, handleSubmit, formState: { errors, isDirty, isValid }, reset } = useForm({
    resolver: joiResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const procesarForm = async (data) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      // Aquí irá la llamada a tu API de login
      // const response = await fetch('/api/v1/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...data, rol })
      // });

      // const result = await response.json();
      // dispatch(setUsuario({ usuario: result.usuario, token: result.token }));
      // dispatch(setRol(rol));

      console.log('Login datos:', { ...data, rol });
      dispatch(setUsuario({ 
        usuario: { email: data.email, rol }, 
        token: 'token-simulado' 
      }));
      dispatch(setRol(rol));

      toast.success("¡Bienvenido/a!");
      reset();
      navigate(rol === 'duenio' ? "/duenio" : "/taller");
    } catch (error) {
      console.error('Error en login:', error);
      dispatch(setError(error.message || "Error al iniciar sesión"));
      toast.error(error.message || "Error al iniciar sesión");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div id="auth-login" className={`auth-form ${activo ? 'active' : ''}`}>
      <form onSubmit={handleSubmit(procesarForm)}>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input 
            type="email" 
            className={`form-input ${errors.email ? 'input-error' : ''}`}
            placeholder="tu@email.com"
            {...register('email')}
          />
          {errors.email && <span className="error" style={{ color: 'red', fontSize: '12px' }}>{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Contraseña</label>
          <input 
            type="password" 
            className={`form-input ${errors.password ? 'input-error' : ''}`}
            placeholder="••••••"
            {...register('password')}
          />
          {errors.password && <span className="error" style={{ color: 'red', fontSize: '12px' }}>{errors.password.message}</span>}
        </div>

        <button 
          type="submit" 
          className="btn btn-primary" 
          style={{ width: '100%', justifyContent: 'center' }}
          disabled={isLoading || !isDirty || !isValid}
        >
          {isLoading ? 'Ingresando...' : 'Ingresar al sistema'}
        </button>
      </form>
    </div>
  );
}
