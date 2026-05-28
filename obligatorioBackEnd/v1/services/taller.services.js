import Usuario from '../models/usuario.model.js';

export const obtenerTalleresService = async () => {
  return await Usuario.find({ role: 'taller' }).select('-password');
};

export const obtenerTallerPorIdService = async (id) => {
  return await Usuario.findOne({ _id: id, role: 'taller' }).select('-password');
};

export const modificarTallerService = async (id, updates) => {
  return await Usuario.findOneAndUpdate(
    { _id: id, role: 'taller' },
    updates,
    { new: true, runValidators: true }
  ).select('-password');
};

export const eliminarTallerService = async (id) => {
  return await Usuario.findOneAndDelete({ _id: id, role: 'taller' });
};