import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/auth.slice";
import api from "../api/api";
import Resumen from "../components/dashboard/duenio/Resumen";
import Vehiculos from "../components/dashboard/duenio/Vehiculos";
import Mantenimientos from "../components/dashboard/duenio/Mantenimientos";
import ExplorarMarcas from "../components/dashboard/duenio/ExplorarMarcas";
import GraficoMantenimientos from "../components/dashboard/graficos/GraficoMantenimientos";

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
  const { usuario } = useSelector((state) => state.auth);

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
      const body = {
        ...vehiculoData,
        duenio: usuario._id,
      };
      const response = await api.post("/vehiculos", body);
      setCreateSuccess(
        response.data?.message || "Vehículo creado correctamente",
      );
      setVehiculos((prev) => [...prev, response.data.vehiculo]);
    } catch (error) {
      setCreateError(
        error.response?.data?.message || "No se pudo crear el vehículo.",
      );
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="page active">
      <nav>
        <div className="nav-logo">
          AUTO<span>TRACK</span>
        </div>
        <div className="nav-links">
          <button
            className={seccion === "resumen" ? "active" : ""}
            onClick={() => setSeccion("resumen")}
          >
            Dashboard
          </button>
          <button
            className={seccion === "vehiculos" ? "active" : ""}
            onClick={() => setSeccion("vehiculos")}
          >
            Mis Vehículos
          </button>
          <button
            className={seccion === "mantenimientos" ? "active" : ""}
            onClick={() => setSeccion("mantenimientos")}
          >
            Mantenimientos
          </button>
          <button
            className={seccion === "graficos" ? "active" : ""}
            onClick={() => setSeccion("graficos")}
          >
            Gráficos
          </button>
          <button
            className={seccion === "marcas" ? "active" : ""}
            onClick={() => setSeccion("marcas")}
          >
            Explorar Marcas
          </button>
          <button className="btn-logout" onClick={handleLogout}>
            Salir
          </button>
        </div>
      </nav>

      <div className="dashboard-layout">
        <div className="sidebar">
          <div className="sidebar-section">
            <div className="sidebar-label">Mi cuenta</div>
            <button
              className={`sidebar-btn ${seccion === "resumen" ? "active" : ""}`}
              onClick={() => setSeccion("resumen")}
            >
              <span className="sidebar-icon">⊞</span> Resumen
            </button>
            <button
              className={`sidebar-btn ${seccion === "vehiculos" ? "active" : ""}`}
              onClick={() => setSeccion("vehiculos")}
            >
              <span className="sidebar-icon">🚗</span> Vehículos
            </button>
            <button
              className={`sidebar-btn ${seccion === "mantenimientos" ? "active" : ""}`}
              onClick={() => setSeccion("mantenimientos")}
            >
              <span className="sidebar-icon">🔧</span> Mantenimientos
            </button>
          </div>
          <div className="sidebar-section">
            <div className="sidebar-label">Herramientas</div>
            <button
              className={`sidebar-btn ${seccion === "graficos" ? "active" : ""}`}
              onClick={() => setSeccion("graficos")}
            >
              <span className="sidebar-icon">📊</span> Gráficos
            </button>
            <button
              className={`sidebar-btn ${seccion === "marcas" ? "active" : ""}`}
              onClick={() => setSeccion("marcas")}
            >
              <span className="sidebar-icon">🔍</span> Marcas / Modelos
            </button>
          </div>
        </div>

        <div className="main-content">
          {seccion === "resumen" && (
            <Resumen usuario={usuario} vehiculos={vehiculos} />
          )}
          {seccion === "vehiculos" && (
            <Vehiculos
              vehiculos={vehiculos}
              loading={vehiculosLoading}
              error={vehiculosError}
              onCreate={handleCrearVehiculo}
              createError={createError}
              createSuccess={createSuccess}
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
        </div>
      </div>
    </div>
  );
}
