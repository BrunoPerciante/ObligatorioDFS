import Joi from 'joi';

export const crearMecanicoSchema = Joi.object({
  nombre: Joi.string()
    .trim()
    .required()
    .messages({
      'string.empty': 'El nombre es obligatorio',
      'any.required': 'El nombre es obligatorio',
    }),

  apellido: Joi.string()
    .trim()
    .required()
    .messages({
      'string.empty': 'El apellido es obligatorio',
      'any.required': 'El apellido es obligatorio',
    }),

  taller: Joi.string()
    .required()
    .messages({
      'string.empty': 'El ID del taller es obligatorio',
      'any.required': 'El ID del taller es obligatorio',
    }),
});
