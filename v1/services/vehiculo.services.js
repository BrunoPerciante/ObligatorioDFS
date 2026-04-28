import Usuario from '../models/usuario.model.js';

export const agregarVehiculoService = async (vehiculoData) => {
    const { duenio, ...data } = vehiculoData;
    
    // Validar que el usuario exista
    const usuario = await Usuario.findById(duenio);
    
    if (!usuario) {
        return { message: 'Usuario no encontrado' };
    }

    const puedeAgregar = await validarLimiteVehiculos(usuario);
    if (!puedeAgregar) {
        return res.status(400).json({ 
            message: 'Los usuarios con plan Plus pueden tener máximo 4 vehículos'
          });
        }

    const nuevoVehiculo = new Vehiculo({
        ...vehiculoData,
        duenio
    });
    
    const vehiculoGuardado = await nuevoVehiculo.save();
        
    await Usuario.findByIdAndUpdate(
        duenio,
        { $push: { vehiculos: vehiculoGuardado._id } }
    );

    return { vehiculo: vehiculoGuardado };
};

export const validarLimiteVehiculos = async (usuarioId) => {
  try {
    const usuario = await Usuario.findById(usuarioId).populate('vehiculos');

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    // Si es premium, no hay límite
    if (usuario.plan === 'premium') {
      return true;
    }

    // Si es plus, máximo 4 vehículos
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
    const usuario = await Usuario.findById(usuarioId).populate('vehiculos');
    return usuario ? usuario.vehiculos.length : 0; 
  } catch (error) {
    console.error('Error en obtenerCantidadVehiculos:', error);
    throw error;
  }
};