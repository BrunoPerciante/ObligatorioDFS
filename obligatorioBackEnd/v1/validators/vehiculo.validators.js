import Joi from 'joi';

export const crearVehiculoSchema = Joi.object({
  padron: Joi.string()
    .trim()
    .required()
    .messages({
      'string.empty': 'El padrón es obligatorio',
      'any.required': 'El padrón es obligatorio',
    }),

  matricula: Joi.string()
    .trim()
    .required()
    .messages({
      'string.empty': 'La matrícula es obligatoria',
      'any.required': 'La matrícula es obligatoria',
    }),

  marca: Joi.string()
    .trim()
    .required()
    .messages({
      'string.empty': 'La marca es obligatoria',
      'any.required': 'La marca es obligatoria',
    }),

  modelo: Joi.string()
    .trim()
    .required()
    .messages({
      'string.empty': 'El modelo es obligatorio',
      'any.required': 'El modelo es obligatorio',
    }),

  anio: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear() + 1)
    .required()
    .messages({
      'number.base': 'El año debe ser un número',
      'number.min': 'El año debe ser mayor o igual a 1900',
      'number.max': `El año no puede ser mayor a ${new Date().getFullYear() + 1}`,
      'any.required': 'El año es obligatorio',
    }),

  kilometraje: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      'number.base': 'El kilometraje debe ser un número',
      'number.min': 'El kilometraje no puede ser negativo',
      'any.required': 'El kilometraje es obligatorio',
    }),

  duenio: Joi.string()
    .required()
    .messages({
      'string.pattern.base': 'El ID del dueño debe ser un ObjectId válido',
      'any.required': 'El ID del dueño es obligatorio',
    }),
});