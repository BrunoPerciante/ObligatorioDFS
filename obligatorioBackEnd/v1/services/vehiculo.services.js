import Usuario from '../models/usuario.model.js';
import Vehiculo from '../models/vehiculos.model.js';
import Mantenimiento from '../models/mantenimientos.model.js';

export const obtenerVehiculosService = async () => {
  return Vehiculo.find().populate('duenio', 'username nombre');
};

export const obtenerVehiculosPorDuenio = async (duenioId) => {
  return Vehiculo.find({ duenio: duenioId }).populate('duenio', 'username nombre');
};

export const obtenerVehiculosPorTaller = async (tallerId) => {
  // Buscar mantenimientos realizados por el taller y obtener vehículos asociados
  const vehiculoIds = await Mantenimiento.find({ taller: tallerId }).distinct('vehiculo');
  if (!vehiculoIds || vehiculoIds.length === 0) return [];
  return Vehiculo.find({ _id: { $in: vehiculoIds } }).populate('duenio', 'username nombre');
};

export const obtenerVehiculoPorIdService = async (id) => {
  return Vehiculo.findById(id).populate('duenio', 'username nombre');
};

export const agregarVehiculoService = async (vehiculoData) => {
  const { duenio, ...data } = vehiculoData;

  const usuario = await Usuario.findById(duenio);
  if (!usuario) {
    return { message: 'Usuario no encontrado' };
  }

  const puedeAgregar = await validarLimiteVehiculos(duenio);
  if (!puedeAgregar) {
    return { message: 'Los usuarios con plan Plus pueden tener máximo 4 vehículos' };
  }

  const nuevoVehiculo = new Vehiculo({
    ...data,
    duenio,
  });

  const vehiculoGuardado = await nuevoVehiculo.save();

  await Usuario.findByIdAndUpdate(duenio, {
    $push: { vehiculos: vehiculoGuardado._id },
  });

  return { vehiculo: vehiculoGuardado };
};

export const actualizarVehiculoService = async (id, vehiculoData) => {
  return Vehiculo.findByIdAndUpdate(id, vehiculoData, { new: true });
};

export const eliminarVehiculoService = async (id) => {
  const vehiculo = await Vehiculo.findByIdAndDelete(id);
  if (vehiculo) {
    await Usuario.findByIdAndUpdate(vehiculo.duenio, {
      $pull: { vehiculos: vehiculo._id },
    });
  }
  return vehiculo;
};

export const validarLimiteVehiculos = async (usuarioId) => {
  try {
    const usuario = await Usuario.findById(usuarioId).populate('vehiculos');

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    if (usuario.plan === 'premium') {
      return true;
    }

    if (usuario.plan === 'plus') {
      return usuario.vehiculos.length < 4;
    }
  } catch (error) {
    console.error('Error en validarLimiteVehiculos:', error);
    throw error;
  }
};

export const obtenerCantidadVehiculos = async (usuarioId) => {
  try {
    return await Vehiculo.countDocuments({ duenio: usuarioId });
  } catch (error) {
    console.error('Error en obtenerCantidadVehiculos:', error);
    throw error;
  }
};