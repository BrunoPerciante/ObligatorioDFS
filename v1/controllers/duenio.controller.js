import {
  obtenerDueniosService,
  obtenerDuenioPorIdService,
  modificarDuenioService,
  eliminarDuenioService
} from '../services/duenio.services.js';
import { obtenerVehiculosPorDuenio } from '../services/vehiculo.services.js';

export const obtenerDuenios = async (req, res) => {
  try {
    const duenios = await obtenerDueniosService();
    res.json(duenios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener dueños', error: error.message });
  }
};

export const obtenerDuenioPorId = async (req, res) => {
  try {
    const duenio = await obtenerDuenioPorIdService(req.params.id);
    if (!duenio) return res.status(404).json({ message: 'Dueño no encontrado' });
    res.json(duenio);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener dueño', error: error.message });
  }
};

export const modificarDuenio = async (req, res) => {
  try {
    const duenio = await modificarDuenioService(req.params.id, req.validatedBody);
    if (!duenio) return res.status(404).json({ message: 'Dueño no encontrado' });
    res.json({ message: 'Dueño actualizado', duenio });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar dueño', error: error.message });
  }
};

export const eliminarDuenio = async (req, res) => {
  try {
    const duenio = await eliminarDuenioService(req.params.id);
    if (!duenio) return res.status(404).json({ message: 'Dueño no encontrado' });
    res.json({ message: 'Dueño eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar dueño', error: error.message });
  }
};

export const obtenerMisVehiculos = async (req, res) => {
  try {
    const duenioId = req.usuario?.id;
    if (!duenioId) return res.status(401).json({ message: 'Usuario no autenticado' });

    const vehiculos = await obtenerVehiculosPorDuenio(duenioId);
    res.json(vehiculos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener mis vehículos', error: error.message });
  }
};