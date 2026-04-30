import Usuario from '../models/usuario.model.js';
import Mecanico from '../models/mecanicos.model.js';

export const agregarMecanicoService = async (mecanicoData) => {
  const { taller, ...data } = mecanicoData;

  const nuevoMecanico = new Mecanico({
    ...data
  });

  const mecanicoGuardado = await nuevoMecanico.save();

  await Usuario.findByIdAndUpdate(taller, {
    $push: { mecanicos: mecanicoGuardado._id },
  });

  return { mecanico: mecanicoGuardado };
};

export const obtenerMecanicosService = async () => {
  return Mecanico.find().populate('taller', 'username nombre');
};

export const obtenerMecanicoPorIdService = async (id) => {
  return Mecanico.findById(id).populate('taller', 'username nombre');
};

export const modificarMecanicoService = async (id, mecanicoData) => {
  return Mecanico.findByIdAndUpdate(id, mecanicoData, { new: true });
};

export const eliminarMecanicoService = async (id) => {
  const mecanico = await Mecanico.findByIdAndDelete(id);
  if (mecanico) {
    await Usuario.findByIdAndUpdate(mecanico.taller, {
      $pull: { mecanicos: mecanico._id },
    });
  }
  return mecanico;
};

export const validarLimiteMecanicos = async (usuarioId) => {
  try {
    const usuario = await Usuario.findById(usuarioId).populate('mecanicos');

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    if (usuario.plan === 'premium') {
      return true;
    }

    if (usuario.plan === 'plus') {
      return usuario.mecanicos.length < 4;
    }
  } catch (error) {
    console.error('Error en validarLimiteMecanicos:', error);
    throw error;
  }
};

export const obtenerCantidadMecanicos = async (usuarioId) => {
  try {
    const usuario = await Usuario.findById(usuarioId).populate('mecanicos');
    return usuario ? usuario.mecanicos.length : 0;
  } catch (error) {
    console.error('Error en obtenerCantidadMecanicos:', error);
    throw error;
  }
};