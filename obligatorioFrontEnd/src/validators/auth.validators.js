import Joi from "joi";

// ============ LOGIN SCHEMA ============

export const loginDuenioSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.empty': 'El email es obligatorio',
            'string.email': 'El email debe ser válido',
            'any.required': 'El email es obligatorio'
        }),
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.empty': 'La contraseña es obligatoria',
            'string.min': 'La contraseña debe tener al menos {#limit} caracteres',
            'any.required': 'La contraseña es obligatoria'
        })
});

export const loginTallerSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.empty': 'El email es obligatorio',
            'string.email': 'El email debe ser válido',
            'any.required': 'El email es obligatorio'
        }),
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.empty': 'La contraseña es obligatoria',
            'string.min': 'La contraseña debe tener al menos {#limit} caracteres',
            'any.required': 'La contraseña es obligatoria'
        })
});

// ============ REGISTER SCHEMA ============

export const registerDuenioSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.empty': 'El email es obligatorio',
            'string.email': 'El email debe ser válido',
            'any.required': 'El email es obligatorio'
        }),
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.empty': 'La contraseña es obligatoria',
            'string.min': 'La contraseña debe tener al menos {#limit} caracteres',
            'any.required': 'La contraseña es obligatoria'
        }),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Las contraseñas no coinciden',
            'any.required': 'Debe confirmar la contraseña'
        }),
    nombre: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.empty': 'El nombre es obligatorio',
            'string.min': 'El nombre debe tener al menos {#limit} caracteres',
            'string.max': 'El nombre no puede tener más de {#limit} caracteres'
        })
});

export const registerTallerSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.empty': 'El email es obligatorio',
            'string.email': 'El email debe ser válido',
            'any.required': 'El email es obligatorio'
        }),
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.empty': 'La contraseña es obligatoria',
            'string.min': 'La contraseña debe tener al menos {#limit} caracteres',
            'any.required': 'La contraseña es obligatoria'
        }),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Las contraseñas no coinciden',
            'any.required': 'Debe confirmar la contraseña'
        }),
    nombreTaller: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.empty': 'El nombre del taller es obligatorio',
            'string.min': 'El nombre debe tener al menos {#limit} caracteres',
            'string.max': 'El nombre no puede tener más de {#limit} caracteres'
        }),
    telefono: Joi.string()
        .pattern(/^[0-9\-\+\(\)\s]+$/)
        .optional()
        .messages({
            'string.pattern.base': 'El teléfono no es válido'
        })
});

export const getLoginSchema = (rol) => {
    return rol === 'duenio' ? loginDuenioSchema : loginTallerSchema;
};

export const getRegisterSchema = (rol) => {
    return rol === 'duenio' ? registerDuenioSchema : registerTallerSchema;
};

