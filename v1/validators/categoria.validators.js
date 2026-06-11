import Joi from 'joi';

export const crearCategoriaSchema = Joi.object({
  nombre: Joi.string()
    .trim()
    .valid('chapa y pintura', 'mecanica', 'electricidad')
    .required()
    .messages({
      'string.empty': 'El nombre de la categoría es obligatorio',
      'any.required': 'El nombre de la categoría es obligatorio',
      'any.only': 'El nombre de la categoría debe ser una de: chapa y pintura, mecanica, electricidad',
    }),
  descripcion: Joi.string()
    .trim()
    .allow('')
    .messages({
      'string.base': 'La descripción debe ser un texto',
    }),
});
