import {
  obtenerMecanicoPorIdService,
  obtenerMecanicosService,
  modificarMecanicoService,
  eliminarMecanicoService,
  agregarMecanicoService,
} from "../services/mecanico.services.js";

export const crearMecanico = async (req, res) => {
  try {
    const { mecanico, message } = await agregarMecanicoService(req.validatedBody);

    if (message) {
      return res.status(400).json({ message });
    }

    return res.status(201).json({ message: 'Mecanico creado correctamente', mecanico });
  } catch (error) {
    console.error('Error al crear mecanico:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const obtenerMecanicos = async (req, res) => {
  try {
    const mecanicos = await obtenerMecanicosService();
    res.json(mecanicos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener mecanicos', error: error.message });
  }
};

export const obtenerMecanicoPorId = async (req, res) => {
  try {
    const mecanico = await obtenerMecanicoPorIdService(req.params.id);
    if (!mecanico) return res.status(404).json({ message: 'Mecanico no encontrado' });
    res.json(mecanico);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener mecanico', error: error.message });
  }
};

export const modificarMecanico = async (req, res) => {
  try {
    const mecanico = await modificarMecanicoService(req.params.id, req.validatedBody);
    if (!mecanico) return res.status(404).json({ message: 'Mecanico no encontrado' });
    res.json({ message: 'Mecanico actualizado', mecanico });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar mecanico', error: error.message });
  }
};

export const eliminarMecanico = async (req, res) => {
  try {
    const mecanico = await eliminarMecanicoService(req.params.id);
    if (!mecanico) return res.status(404).json({ message: 'Mecanico no encontrado' });
    res.json({ message: 'Mecanico eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar mecanico', error: error.message });
  }
};