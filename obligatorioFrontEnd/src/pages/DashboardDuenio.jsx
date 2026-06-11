import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/api";
import Resumen from "../components/dashboard/duenio/Resumen";
import Vehiculos from "../components/dashboard/duenio/Vehiculos";
import Mantenimientos from "../components/dashboard/duenio/Mantenimientos";
import ExplorarMarcas from "../components/dashboard/duenio/ExplorarMarcas";
import GraficoMantenimientos from "../components/dashboard/graficos/GraficoMantenimientos";
import { logout, setUsuario } from "../features/auth/auth.slice";
// NUEVO: importamos el componente de subir imagen
import SubirImagen from "../components/dashboard/SubirImagen";

export default function DashboardDuenio() {
  const [seccion, setSeccion] = useState("resumen");
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculosLoading, setVehiculosLoading] = useState(false);
  const [vehiculosError, setVehiculosError] = useState(null);
  const [mantenimientos, setMantenimientos] = useState([]);
  const [mantenimientosLoading, setMantenimientosLoading] = useState(false);
  const [mantenimientosError, setMantenimientosError] = useState(null);
  const [createError, setCreateError] = useState(null);
  const [createSuccess, setCreateSuccess] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { usuario, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const cargarVehiculos = async () => {
      setVehiculosLoading(true);
      setVehiculosError(null);
      try {
        const response = await api.get("/duenios/misVehiculos");
        setVehiculos(response.data || []);
      } catch (error) {
        setVehiculosError("No se pudieron cargar los vehículos.");
      } finally {
        setVehiculosLoading(false);
      }
    };

    if (seccion === "vehiculos" || seccion === "resumen") {
      cargarVehiculos();
    }
  }, [seccion]);

  useEffect(() => {
    const cargarMantenimientos = async () => {
      setMantenimientosLoading(true);
      setMantenimientosError(null);
      try {
        const response = await api.get("/mantenimientos?page=1&limit=100");
        setMantenimientos(response.data?.mantenimientos || []);
      } catch (error) {
        setMantenimientosError("No se pudieron cargar los mantenimientos.");
        console.error(error);
      } finally {
        setMantenimientosLoading(false);
      }
    };

    if (seccion === "mantenimientos") {
      cargarMantenimientos();
    }
  }, [seccion]);

  const handleCrearVehiculo = async (vehiculoData) => {
    if (!usuario?._id) {
      setCreateError("No se encontró el usuario autenticado.");
      return;
    }
    setCreateError(null);
    setCreateSuccess(null);
    try {
      const body = { ...vehiculoData, duenio: usuario._id };
      const response = await api.post("/vehiculos", body);
      setCreateSuccess(response.data?.message || "Vehículo creado correctamente");
      setVehiculos((prev) => [...prev, response.data.vehiculo]);
    } catch (error) {
      setCreateError(error.response?.data?.message || "No se pudo crear el vehículo.");
    }
  };

  const handleEditarVehiculo = async (id, datos) => {
    try {
      const response = await api.put(`/vehiculos/${id}`, { ...datos });
      setVehiculos(prev => prev.map(v => v._id === id ? response.data.vehiculo : v));
      setCreateSuccess("Vehículo actualizado correctamente");
    } catch (error) {
      setCreateError(error.response?.data?.message || "No se pudo actualizar el vehículo.");
    }
  };

  const handleEliminarVehiculo = async (id) => {
    try {
      await api.delete(`/vehiculos/${id}`);
      setVehiculos(prev => prev.filter(v => v._id !== id));
    } catch (error) {
      setCreateError(error.response?.data?.message || "No se pudo eliminar el vehículo.");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleCambiarPlan = async (nuevoPlan) => {
    try {
      const response = await api.patch(`/usuarios/${usuario._id}/plan`, { plan: nuevoPlan });
      dispatch(setUsuario({ usuario: { ...usuario, plan: response.data.usuario.plan }, token }));
    } catch (error) {
      setCreateError(error.response?.data?.message || "No se pudo cambiar el plan.");
    }
  };

  return (
    <div className="page active">
      <nav>
        <div className="nav-logo">AUTO<span>TRACK</span></div>
        <div className="nav-links">
          <button className={seccion === "resumen" ? "active" : ""} onClick={() => setSeccion("resumen")}>Dashboard</button>
          <button className={seccion === "vehiculos" ? "active" : ""} onClick={() => setSeccion("vehiculos")}>Mis Vehículos</button>
          <button className={seccion === "mantenimientos" ? "active" : ""} onClick={() => setSeccion("mantenimientos")}>Mantenimientos</button>
          <button className={seccion === "graficos" ? "active" : ""} onClick={() => setSeccion("graficos")}>Gráficos</button>
          <button className={seccion === "marcas" ? "active" : ""} onClick={() => setSeccion("marcas")}>Explorar Marcas</button>
          {/* NUEVO: botón en el nav */}
          <button className={seccion === "imagenes" ? "active" : ""} onClick={() => setSeccion("imagenes")}>Imágenes</button>
          <button className="btn-logout" onClick={handleLogout}>Salir</button>
        </div>
      </nav>

      <div className="dashboard-layout">
        <div className="sidebar">
          <div className="sidebar-section">
            <div className="sidebar-label">Mi cuenta</div>
            <button className={`sidebar-btn ${seccion === "resumen" ? "active" : ""}`} onClick={() => setSeccion("resumen")}>
              <span className="sidebar-icon">⊞</span> Resumen
            </button>
            <button className={`sidebar-btn ${seccion === "vehiculos" ? "active" : ""}`} onClick={() => setSeccion("vehiculos")}>
              <span className="sidebar-icon">🚗</span> Vehículos
            </button>
            <button className={`sidebar-btn ${seccion === "mantenimientos" ? "active" : ""}`} onClick={() => setSeccion("mantenimientos")}>
              <span className="sidebar-icon">🔧</span> Mantenimientos
            </button>
          </div>
          <div className="sidebar-section">
            <div className="sidebar-label">Herramientas</div>
            <button className={`sidebar-btn ${seccion === "graficos" ? "active" : ""}`} onClick={() => setSeccion("graficos")}>
              <span className="sidebar-icon">📊</span> Gráficos
            </button>
            <button className={`sidebar-btn ${seccion === "marcas" ? "active" : ""}`} onClick={() => setSeccion("marcas")}>
              <span className="sidebar-icon">🔍</span> Marcas / Modelos
            </button>
            {/* NUEVO: botón en el sidebar */}
            <button className={`sidebar-btn ${seccion === "imagenes" ? "active" : ""}`} onClick={() => setSeccion("imagenes")}>
              <span className="sidebar-icon">📷</span> Subir imagen
            </button>
          </div>
        </div>

        <div className="main-content">
          {seccion === "resumen" && (
            <Resumen usuario={usuario} vehiculos={vehiculos} onCambiarPlan={handleCambiarPlan} />
          )}
          {seccion === "vehiculos" && (
            <Vehiculos
              vehiculos={vehiculos}
              loading={vehiculosLoading}
              error={vehiculosError}
              onCreate={handleCrearVehiculo}
              onDelete={handleEliminarVehiculo}
              createError={createError}
              createSuccess={createSuccess}
              onEdit={handleEditarVehiculo}
            />
          )}
          {seccion === "mantenimientos" && (
            <Mantenimientos
              vehiculos={vehiculos}
              mantenimientos={mantenimientos}
              loading={mantenimientosLoading}
              error={mantenimientosError}
            />
          )}
          {seccion === "graficos" && (
            <div className="dash-section">
              <div className="section-header">
                <h2 className="section-title">Estadísticas</h2>
              </div>
              <GraficoMantenimientos vehiculos={vehiculos} esTaller={false} />
            </div>
          )}
          {seccion === "marcas" && <ExplorarMarcas />}
          {/* NUEVO: renderizamos SubirImagen cuando seccion es "imagenes" */}
          {seccion === "imagenes" && <SubirImagen />}
        </div>
      </div>
    </div>
  );
}