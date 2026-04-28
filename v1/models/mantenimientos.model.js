import mongoose from "mongoose";

const { Schema, model } = mongoose;

const mantenimientoSchema = new Schema(
    {
        fecha: {
            type: Date,
            required: true,
        },
        servicio: {
            type: String,
            required: true,
        },
        vehiculo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vehiculo',
            required: true,
        },
        taller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario',
            required: true,
        },
        kilometraje: {
            type: Number,
            required: true,
        },
        costo: {
            type: Number,
            required: true,
        },
    }
);

export default model('Mantenimiento', mantenimientoSchema);