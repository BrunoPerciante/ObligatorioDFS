import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ rolRequerido }) => {
  const { isAuthenticated, rol } = useSelector(state => state.auth);

  // Si no está autenticado -> volver al login
  if (!isAuthenticated) return <Navigate to="/" replace />;

  // Si tiene rol pero no es el correcto -> volver al login
  if (rolRequerido && rol !== rolRequerido) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoute;