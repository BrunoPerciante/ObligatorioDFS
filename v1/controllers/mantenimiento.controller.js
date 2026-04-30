import {
  obtenerMantenimientoService,
  obtenerMantenimientoPorIdService,
  crearMantenimientoService,
  actualizarMantenimientoService,
  eliminarMantenimientoService,
} from "../services/mantenimiento.services.js";

export const obtenerMantenimiento = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const respuesta = await obtenerMantenimientoService(page, limit);
    res.status(200).json({ message: "Mantenimientos obtenidos", data: respuesta });
  } catch (error) {
    console.error('Error al obtener mantenimientos:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

export const obtenerMantenimientoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const mantenimiento = await obtenerMantenimientoPorIdService(id);
    if (!mantenimiento) return res.status(404).json({ message: 'Mantenimiento no encontrado' });
    res.status(200).json({ message: 'Mantenimiento encontrado', data: mantenimiento });
  } catch (error) {
    console.error('Error al obtener mantenimiento por id:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

export const crearMantenimiento = async (req, res) => {
  try {
    const mantenimiento = await crearMantenimientoService(req.validatedBody);
    res.status(201).json({ message: "Mantenimiento creado", data: mantenimiento });
  } catch (error) {
    console.error('Error al crear mantenimiento:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

export const actualizarMantenimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const mantenimientoActualizado = await actualizarMantenimientoService(id, req.validatedBody);
    if (!mantenimientoActualizado) return res.status(404).json({ message: 'Mantenimiento no encontrado' });
    res.status(200).json({ message: "Mantenimiento actualizado", data: mantenimientoActualizado });
  } catch (error) {
    console.error('Error al actualizar mantenimiento:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

export const eliminarMantenimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const mantenimiento = await eliminarMantenimientoService(id);
    if (!mantenimiento) return res.status(404).json({ message: 'Mantenimiento no encontrado' });
    res.status(200).json({ message: "Mantenimiento eliminado" });
  } catch (error) {
    console.error('Error al eliminar mantenimiento:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};
