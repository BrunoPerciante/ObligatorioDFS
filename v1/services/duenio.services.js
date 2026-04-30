import Usuario from '../models/usuario.model.js';

export const obtenerDueniosService = async () => {
  return await Usuario.find({ role: 'duenio' }).select('-password');
};

export const obtenerDuenioPorIdService = async (id) => {
  return await Usuario.findOne({ _id: id, role: 'duenio' }).select('-password');
};

export const modificarDuenioService = async (id, updates) => {
  return await Usuario.findOneAndUpdate(
    { _id: id, role: 'duenio' },
    updates,
    { new: true, runValidators: true }
  ).select('-password');
};

export const eliminarDuenioService = async (id) => {
  return await Usuario.findOneAndDelete({ _id: id, role: 'duenio' });
};