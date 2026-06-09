import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../../api/api";
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

      const payload = { email: data.email, password: data.password };
      const res = await api.post(`/auth/login/${rol}`, payload, { skipAuth: true });
      const { usuario, token } = res.data;

      if (token) localStorage.setItem('token', token);
      dispatch(setUsuario({ usuario, token }));
      dispatch(setRol(rol));

      toast.success('¡Bienvenido/a!');
      reset();
      navigate(rol === 'duenio' ? '/duenio' : '/taller');

      /* } catch (error) {
         console.error('Error en login:', error);
         const message = error.response?.data?.message || error.message || "Error al iniciar sesión";
         dispatch(setError(message));
         toast.error(message);*/
    } catch (error) {
      console.error('Error en login:', error);
      const mensajeBackend = error.response?.data?.message || '';

      const message = mensajeBackend === 'Usuario no encontrado'
        ? `Este email no está registrado como ${rol === 'duenio' ? 'Dueño' : 'Taller'}. ¿Seleccionaste el rol correcto?`
        : mensajeBackend || 'Error al iniciar sesión';

      dispatch(setError(message));
      toast.error(message);

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
