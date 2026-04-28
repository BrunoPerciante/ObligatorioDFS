import Vehiculo from '../models/vehiculos.model.js';
import Usuario from '../models/usuario.model.js';
import { agregarVehiculoService, validarLimiteVehiculos } from '../services/vehiculo.services.js';


export const obtenerVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find().populate('duenio', 'username nombre');
    return res.json(vehiculos);
  } catch (error) {
    console.error('Error al obtener vehículos:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const crearVehiculo = async (req, res) => {
  try {
    const { vehiculo, message } = await agregarVehiculoService(req.validatedBody);

    if (message) {
      return res.status(400).json({ message: message });
    }

    return res.status(201).json({ message: 'Vehículo creado correctamente', vehiculo });
  } catch (error) {
    console.error('Error al crear vehículo:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}