import {
  obtenerTalleresService,
  obtenerTallerPorIdService,
  modificarTallerService,
  eliminarTallerService
} from '../services/taller.services.js';
import { obtenerVehiculosPorTaller } from '../services/vehiculo.services.js';

export const obtenerTalleres = async (req, res) => {
  try {
    const talleres = await obtenerTalleresService();
    res.json(talleres);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener talleres', error: error.message });
  }
};

export const obtenerTallerPorId = async (req, res) => {
  try {
    const taller = await obtenerTallerPorIdService(req.params.id);
    if (!taller) return res.status(404).json({ message: 'Taller no encontrado' });
    res.json(taller);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener taller', error: error.message });
  }
};

export const modificarTaller = async (req, res) => {
  try {
    const taller = await modificarTallerService(req.params.id, req.validatedBody);
    if (!taller) return res.status(404).json({ message: 'Taller no encontrado' });
    res.json({ message: 'Taller actualizado', taller });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar taller', error: error.message });
  }
};

export const eliminarTaller = async (req, res) => {
  try {
    const taller = await eliminarTallerService(req.params.id);
    if (!taller) return res.status(404).json({ message: 'Taller no encontrado' });
    res.json({ message: 'Taller eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar taller', error: error.message });
  }
};

export const obtenerMisVehiculos = async (req, res) => {
  try {
    const tallerId = req.usuario?.id;
    if (!tallerId) return res.status(401).json({ message: 'Usuario no autenticado' });

    const vehiculos = await obtenerVehiculosPorTaller(tallerId);
    res.json(vehiculos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener mis vehículos', error: error.message });
  }
};