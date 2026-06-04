import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../../api/api";
import {
  setUsuario,
  setRol,
  setLoading,
  setError,
} from "../../features/auth/auth.slice";
import { useEffect } from "react";

export default function RegisterForm({ activo = false, rol = 'duenio', registerSchema }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const defaultValues =
    rol === "duenio"
      ? {
          email: "",
          password: "",
          confirmPassword: "",
          nombre: "",
        }
      : {
          email: "",
          password: "",
          confirmPassword: "",
          nombreTaller: "",
          telefono: "",
        };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm({
    resolver: joiResolver(registerSchema),
    mode: "onChange",
    defaultValues,
  });

  // Resetear formulario cuando cambia el rol o schema
  useEffect(() => {
    reset(defaultValues);
  }, [rol, reset, registerSchema]);

  const procesarForm = async (data) => {
    try {
      dispatch(setLoading(true)); //en authslice
      dispatch(setError(null));

      const payload = { ...data };
      const response = await api.post(`/auth/registro/${rol}`, payload, {
        skipAuth: true,
      });
      const { usuario, token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
      }

      dispatch(setUsuario({ usuario, token }));
      dispatch(setRol(rol));

      toast.success("¡Cuenta creada exitosamente!");
      reset();
      navigate(rol === "duenio" ? "/duenio" : "/taller");
    } catch (error) {
      console.error("Error en registro:", error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error al crear la cuenta";
      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div id="auth-registro" className={`auth-form ${activo ? "active" : ""}`}>
      <form onSubmit={handleSubmit(procesarForm)}>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-input ${errors.email ? "input-error" : ""}`}
            placeholder="tu@email.com"
            {...register("email")}
          />
          {errors.email && (
            <span className="error" style={{ color: "red", fontSize: "12px" }}>
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Campos específicos para Dueño */}
        {rol === "duenio" && (
          <div id="reg-duenio-fields">
            <div className="form-group">
              <label className="form-label">Nombre completo</label>
              <input
                type="text"
                className={`form-input ${errors.nombre ? "input-error" : ""}`}
                placeholder="Juan García"
                {...register("nombre")}
              />
              {errors.nombre && (
                <span
                  className="error"
                  style={{ color: "red", fontSize: "12px" }}
                >
                  {errors.nombre.message}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Campos específicos para Taller */}
        {rol === "taller" && (
          <div id="reg-taller-fields">
            <div className="form-group">
              <label className="form-label">Nombre del taller</label>
              <input
                type="text"
                className={`form-input ${errors.nombreTaller ? "input-error" : ""}`}
                placeholder="Taller García"
                {...register("nombreTaller")}
              />
              {errors.nombreTaller && (
                <span
                  className="error"
                  style={{ color: "red", fontSize: "12px" }}
                >
                  {errors.nombreTaller.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Teléfono (opcional)</label>
              <input
                type="text"
                className={`form-input ${errors.telefono ? "input-error" : ""}`}
                placeholder="099123456"
                {...register("telefono")}
              />
              {errors.telefono && (
                <span
                  className="error"
                  style={{ color: "red", fontSize: "12px" }}
                >
                  {errors.telefono.message}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className={`form-input ${errors.password ? "input-error" : ""}`}
            placeholder="••••••"
            {...register("password")}
          />
          {errors.password && (
            <span className="error" style={{ color: "red", fontSize: "12px" }}>
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Confirmar contraseña</label>
          <input
            type="password"
            className={`form-input ${errors.confirmPassword ? "input-error" : ""}`}
            placeholder="••••••"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="error" style={{ color: "red", fontSize: "12px" }}>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "100%", justifyContent: "center" }}
          disabled={isLoading || !isDirty || !isValid}
        >
          {isLoading ? "Creando cuenta..." : "Crear cuenta"}
        </button>
      </form>
    </div>
  );
}
