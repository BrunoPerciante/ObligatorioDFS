import {
  obtenerVehiculosService,
  obtenerVehiculoPorIdService,
  agregarVehiculoService,
  actualizarVehiculoService,
  eliminarVehiculoService,
} from '../services/vehiculo.services.js';

export const obtenerVehiculos = async (req, res) => {
  try {
    const vehiculos = await obtenerVehiculosService();
    return res.json(vehiculos);
  } catch (error) {
    console.error('Error al obtener vehículos:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const obtenerVehiculoPorId = async (req, res) => {
  try {
    const vehiculo = await obtenerVehiculoPorIdService(req.params.id);
    if (!vehiculo) return res.status(404).json({ message: 'Vehículo no encontrado' });
    return res.json(vehiculo);
  } catch (error) {
    console.error('Error al obtener vehículo:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const crearVehiculo = async (req, res) => {
  try {
    const { vehiculo, message } = await agregarVehiculoService(req.validatedBody);

    if (message) {
      return res.status(400).json({ message });
    }

    return res.status(201).json({ message: 'Vehículo creado correctamente', vehiculo });
  } catch (error) {
    console.error('Error al crear vehículo:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const modificarVehiculo = async (req, res) => {
  try {
    const vehiculo = await actualizarVehiculoService(req.params.id, req.body);
    if (!vehiculo) return res.status(404).json({ message: 'Vehículo no encontrado' });
    return res.json({ message: 'Vehículo actualizado', vehiculo });
  } catch (error) {
    console.error('Error al actualizar vehículo:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const eliminarVehiculo = async (req, res) => {
  try {
    const vehiculo = await eliminarVehiculoService(req.params.id);
    if (!vehiculo) return res.status(404).json({ message: 'Vehículo no encontrado' });
    return res.json({ message: 'Vehículo eliminado' });
  } catch (error) {
    console.error('Error al eliminar vehículo:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};