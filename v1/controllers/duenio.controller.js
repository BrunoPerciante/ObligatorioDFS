import Usuario from '../models/usuario.model.js';

export const obtenerDuenios = async (req, res) => {
  try {
    const duenios = await Usuario.find({ role: 'duenio' }).select('-password');
    res.json(duenios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener dueños', error: error.message });
  }
};

export const obtenerDuenioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const duenio = await Usuario.findOne({ _id: id, role: 'duenio' }).select('-password');
    if (!duenio) {
      return res.status(404).json({ message: 'Dueño no encontrado' });
    }
    res.json(duenio);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener dueño', error: error.message });
  }
};

export const modificarDuenio = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.validatedBody;
    const duenio = await Usuario.findOneAndUpdate(
      { _id: id, role: 'duenio' },
      updates,
      { new: true, runValidators: true }
    ).select('-password');
    if (!duenio) {
      return res.status(404).json({ message: 'Dueño no encontrado' });
    }
    res.json({ message: 'Dueño actualizado', duenio });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar dueño', error: error.message });
  }
};

export const eliminarDuenio = async (req, res) => {
  try {
    const { id } = req.params;
    const duenio = await Usuario.findOneAndDelete({ _id: id, role: 'duenio' });
    if (!duenio) {
      return res.status(404).json({ message: 'Dueño no encontrado' });
    }
    res.json({ message: 'Dueño eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar dueño', error: error.message });
  }
};

