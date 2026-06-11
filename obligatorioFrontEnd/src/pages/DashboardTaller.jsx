import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/auth.slice";
import ResumenTaller from "../components/dashboard/taller/ResumenTaller";
import Mecanicos from "../components/dashboard/taller/Mecanicos";
import MantenimientosTaller from "../components/dashboard/taller/MantenimientosTaller";
import Vehiculos from "../components/dashboard/taller/Vehiculos";
import ExplorarMarcasTaller from "../components/dashboard/taller/ExplorarMarcasTaller";
import ModalMecanico from "../components/modals/ModalMecanico";
import ModalMantenimiento from "../components/modals/ModalMantenimiento";
import GraficoMantenimientos from "../components/dashboard/graficos/GraficoMantenimientos";
import GraficoEarningsTaller from "../components/dashboard/graficos/GraficoEarningsTaller";
// NUEVO: importamos el componente de subir imagen
import SubirImagen from "../components/dashboard/SubirImagen";

export default function DashboardTaller() {
  const [seccion, setSeccion] = useState("resumen");
  const [mostrarModalMecanico, setMostrarModalMecanico] = useState(false);
  const [mostrarModalMantenimiento, setMostrarModalMantenimiento] = useState(false);
  const [recargarMecanicos, setRecargarMecanicos] = useState(0);
  const [recargarMantenimientos, setRecargarMantenimientos] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { usuario } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const abrirModalMecanico = () => setMostrarModalMecanico(true);
  const cerrarModalMecanico = () => setMostrarModalMecanico(false);
  const abrirModalMantenimiento = () => setMostrarModalMantenimiento(true);
  const cerrarModalMantenimiento = () => setMostrarModalMantenimiento(false);
  const refrescarMecanicos = () => setRecargarMecanicos((prev) => prev + 1);
  const refrescarMantenimientos = () => setRecargarMantenimientos((prev) => prev + 1);

  return (
    <div className="page active">
      <nav>
        <div className="nav-logo">
          AUTO<span>TRACK</span>
        </div>
        <div className="nav-links">
          <button className={seccion === "resumen" ? "active" : ""} onClick={() => setSeccion("resumen")}>Dashboard</button>
          <button className={seccion === "vehiculos" ? "active" : ""} onClick={() => setSeccion("vehiculos")}>Vehículos</button>
          <button className={seccion === "mecanicos" ? "active" : ""} onClick={() => setSeccion("mecanicos")}>Mecánicos</button>
          <button className={seccion === "mantenimientos" ? "active" : ""} onClick={() => setSeccion("mantenimientos")}>Mantenimientos</button>
          <button className={seccion === "graficos" ? "active" : ""} onClick={() => setSeccion("graficos")}>Gráficos</button>
          <button className={seccion === "marcas" ? "active" : ""} onClick={() => setSeccion("marcas")}>Marcas</button>
          {/* NUEVO: botón en el nav */}
          <button className={seccion === "imagenes" ? "active" : ""} onClick={() => setSeccion("imagenes")}>Imágenes</button>
          <button className="btn-logout" onClick={handleLogout}>Salir</button>
        </div>
      </nav>

      <div className="dashboard-layout">
        <div className="sidebar">
          <div className="sidebar-section">
            <div className="sidebar-label">Taller</div>
            <button className={`sidebar-btn ${seccion === "resumen" ? "active" : ""}`} onClick={() => setSeccion("resumen")}>
              <span className="sidebar-icon">⊞</span> Resumen
            </button>
            <button className={`sidebar-btn ${seccion === "vehiculos" ? "active" : ""}`} onClick={() => setSeccion("vehiculos")}>
              <span className="sidebar-icon">🚗</span> Vehículos
            </button>
            <button className={`sidebar-btn ${seccion === "mecanicos" ? "active" : ""}`} onClick={() => setSeccion("mecanicos")}>
              <span className="sidebar-icon">👷</span> Mecánicos
            </button>
            <button className={`sidebar-btn ${seccion === "mantenimientos" ? "active" : ""}`} onClick={() => setSeccion("mantenimientos")}>
              <span className="sidebar-icon">🔧</span> Mantenimientos
            </button>
          </div>
          <div className="sidebar-section">
            <div className="sidebar-label">Herramientas</div>
            <button className={`sidebar-btn ${seccion === "graficos" ? "active" : ""}`} onClick={() => setSeccion("graficos")}>
              <span className="sidebar-icon">📊</span> Estadísticas
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
            <ResumenTaller
              usuario={usuario}
              alCrearMantenimiento={abrirModalMantenimiento}
              alAgregarMecanico={abrirModalMecanico}
            />
          )}
          {seccion === "vehiculos" && <Vehiculos usuario={usuario} />}
          {seccion === "mecanicos" && (
            <Mecanicos
              usuario={usuario}
              alAgregarMecanico={abrirModalMecanico}
              recargar={recargarMecanicos}
            />
          )}
          {seccion === "mantenimientos" && (
            <MantenimientosTaller
              usuario={usuario}
              recargar={recargarMantenimientos}
              alCrearMantenimiento={abrirModalMantenimiento}
            />
          )}
          {seccion === "graficos" && (
            <div className="dash-section">
              <div className="section-header">
                <h2 className="section-title">Estadísticas del taller</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <GraficoMantenimientos esTaller={true} />
                <GraficoEarningsTaller usuario={usuario} />
              </div>
            </div>
          )}
          {seccion === "marcas" && <ExplorarMarcasTaller />}
          {/* NUEVO: renderizamos SubirImagen cuando seccion es "imagenes" */}
          {seccion === "imagenes" && <SubirImagen />}
        </div>

        <ModalMecanico
          abierto={mostrarModalMecanico}
          alCerrar={cerrarModalMecanico}
          usuario={usuario}
          alCreado={refrescarMecanicos}
        />
        <ModalMantenimiento
          abierto={mostrarModalMantenimiento}
          alCerrar={cerrarModalMantenimiento}
          usuario={usuario}
          alCreado={refrescarMantenimientos}
        />
      </div>
    </div>
  );
}