import mongoose from "mongoose";

const { Schema, model } = mongoose;

const vehiculoSchema = new Schema(
    {
        padron: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        matricula: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        marca: {
            type: String,
            required: true,
        },
        modelo: {
            type: String,
            required: true,
        },
        anio: {
            type: Number,
            required: true,
        },
        kilometraje: {
            type: Number,
            required: true,
        },
        duenio: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario',
            required: true,
        },
        
    }
);

export default model('Vehiculo', vehiculoSchema);