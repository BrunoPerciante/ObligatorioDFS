import Categoria from '../models/categoria.model.js';

export const obtenerCategoriasService = async () => {
  return await Categoria.find();
};

export const obtenerCategoriaPorIdService = async (id) => {
  return await Categoria.findById(id);
};

export const crearCategoriaService = async (categoriaData) => {
  const categoria = new Categoria(categoriaData);
  await categoria.save();
  return categoria;
};

export const modificarCategoriaService = async (id, categoriaData) => {
  return await Categoria.findByIdAndUpdate(id, categoriaData, { new: true });
};

export const eliminarCategoriaService = async (id) => {
  return await Categoria.findByIdAndDelete(id);
};
