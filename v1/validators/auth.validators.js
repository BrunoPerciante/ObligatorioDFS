import Joi from 'joi';

const baseRegister = Joi.object({
  username: Joi.string().trim().min(3).max(30).required().messages({
    'string.empty': 'El nombre de usuario es obligatorio',
    'string.min': 'El nombre de usuario debe tener al menos {#limit} caracteres',
    'string.max': 'El nombre de usuario no puede tener más de {#limit} caracteres',
  }),
  email: Joi.string().trim().email().required().messages({
    'string.empty': 'El email es obligatorio',
    'string.email': 'El email debe ser válido',
  }),
  password: Joi.string().trim().min(6).max(100).required().messages({
    'string.empty': 'La contraseña es obligatoria',
    'string.min': 'La contraseña debe tener al menos {#limit} caracteres',
    'string.max': 'La contraseña no puede tener más de {#limit} caracteres',
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Las contraseñas no coinciden',
  }),
});

export const registerDuenioSchema = baseRegister.keys({
  nombre: Joi.string().trim().required().messages({
    'string.empty': 'El nombre es obligatorio',
  }),
  telefono: Joi.string().trim().required().messages({
    'string.empty': 'El teléfono es obligatorio',
  }),
});

export const registerTallerSchema = baseRegister.keys({
  nombreTaller: Joi.string().trim().required().messages({
    'string.empty': 'El nombre del taller es obligatorio',
  }),
  direccion: Joi.string().trim().required().messages({
    'string.empty': 'La dirección es obligatoria',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().trim().email().required().messages({
    'string.empty': 'El email es obligatorio',
    'string.email': 'El email debe ser válido',
  }),
  password: Joi.string().trim().min(6).max(100).required().messages({
    'string.empty': 'La contraseña es obligatoria',
    'string.min': 'La contraseña debe tener al menos {#limit} caracteres',
    'string.max': 'La contraseña no puede tener más de {#limit} caracteres',
  }),
});