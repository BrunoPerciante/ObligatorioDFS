import Joi from 'joi';

export const updateDuenioSchema = Joi.object({
  nombre: Joi.string().trim().messages({
    'string.empty': 'El nombre no puede estar vacío',
  }),
  telefono: Joi.string().trim().messages({
    'string.empty': 'El teléfono no puede estar vacío',
  }),
  plan: Joi.string().trim().valid('plus', 'premium').messages({
    'any.only': 'El plan debe ser plus o premium',
  }),
}).min(1).messages({
  'object.min': 'Debe proporcionar al menos un campo para actualizar',
});

