import Joi from 'joi';

export const updateTallerSchema = Joi.object({
  nombreTaller: Joi.string().trim().messages({
    'string.empty': 'El nombre del taller no puede estar vacío',
  }),
  direccion: Joi.string().trim().messages({
    'string.empty': 'La dirección no puede estar vacía',
  }),
}).min(1).messages({
  'object.min': 'Debe proporcionar al menos un campo para actualizar',
});