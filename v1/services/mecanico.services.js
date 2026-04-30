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