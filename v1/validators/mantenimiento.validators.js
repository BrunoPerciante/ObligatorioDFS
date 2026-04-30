import Joi from 'joi';

export const crearMantenimientoSchema = Joi.object({
    fecha: Joi.date()
        .required()
        .messages({
            'date.base': 'La fecha debe ser un formato de fecha válido',
            'any.required': 'La fecha es obligatoria',
        }),
    servicio: Joi.string()
        .trim()
        .required()
        .messages({
            'string.empty': 'El servicio es obligatorio',
            'any.required': 'El servicio es obligatorio',
        }), 
    categoria: Joi.string()
        .required()
        .messages({
            'string.pattern.base': 'El ID de la categoría debe ser un ObjectId válido',
            'any.required': 'La categoría es obligatoria',
        }),
    vehiculo: Joi.string()
        .required()
        .messages({
            'string.pattern.base': 'El ID del vehículo debe ser un ObjectId válido',
            'any.required': 'El vehículo es obligatorio',
        }),
    taller: Joi.string()
        .required()
        .messages({
            'string.pattern.base': 'El ID del taller debe ser un ObjectId válido',
            'any.required': 'El taller es obligatorio', 
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
    costo: Joi.number()
        .precision(2)
        .min(0)
        .required()
        .messages({
            'number.base': 'El costo debe ser un número',
            'number.min': 'El costo no puede ser negativo',
            'any.required': 'El costo es obligatorio',
        }),
});
