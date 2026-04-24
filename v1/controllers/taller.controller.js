import Usuario from '../models/usuario.model.js';

export const obtenerTalleres = async (req, res) => {
  try {
    const talleres = await Usuario.find({ role: 'taller' }).select('-password');
    res.json(talleres);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener talleres', error: error.message });
  }
};

export const obtenerTallerPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const taller = await Usuario.findOne({ _id: id, role: 'taller' }).select('-password');
    if (!taller) {
      return res.status(404).json({ message: 'Taller no encontrado' });
    }
    res.json(taller);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener taller', error: error.message });
  }
};

export const modificarTaller = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.validatedBody;
    const taller = await Usuario.findOneAndUpdate(
      { _id: id, role: 'taller' },
      updates,
      { new: true, runValidators: true }
    ).select('-password');
    if (!taller) {
      return res.status(404).json({ message: 'Taller no encontrado' });
    }
    res.json({ message: 'Taller actualizado', taller });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar taller', error: error.message });
  }
};

export const eliminarTaller = async (req, res) => {
  try {
    const { id } = req.params;
    const taller = await Usuario.findOneAndDelete({ _id: id, role: 'taller' });
    if (!taller) {
      return res.status(404).json({ message: 'Taller no encontrado' });
    }
    res.json({ message: 'Taller eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar taller', error: error.message });
  }
};
