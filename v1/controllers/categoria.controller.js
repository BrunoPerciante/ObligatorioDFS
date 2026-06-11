import {
  obtenerCategoriasService,
  obtenerCategoriaPorIdService,
  crearCategoriaService,
  modificarCategoriaService,
  eliminarCategoriaService,
} from '../services/categoria.services.js';

export const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await obtenerCategoriasService();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener categorías', error: error.message });
  }
};

export const obtenerCategoriaPorId = async (req, res) => {
  try {
    const categoria = await obtenerCategoriaPorIdService(req.params.id);
    if (!categoria) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener categoría', error: error.message });
  }
};

export const crearCategoria = async (req, res) => {
  try {
    const categoria = await crearCategoriaService(req.validatedBody);
    res.status(201).json({ message: 'Categoría creada correctamente', categoria });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear categoría', error: error.message });
  }
};

export const modificarCategoria = async (req, res) => {
  try {
    const categoria = await modificarCategoriaService(req.params.id, req.validatedBody);
    if (!categoria) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.json({ message: 'Categoría actualizada', categoria });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar categoría', error: error.message });
  }
};

export const eliminarCategoria = async (req, res) => {
  try {
    const categoria = await eliminarCategoriaService(req.params.id);
    if (!categoria) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.json({ message: 'Categoría eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar categoría', error: error.message });
  }
};
