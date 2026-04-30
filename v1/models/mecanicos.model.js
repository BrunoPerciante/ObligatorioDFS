import mongoose from "mongoose";

const { Schema, model } = mongoose;

const mecanicoSchema = new Schema(
    {
        id: {
            type: int,
            required: true,
            trim: true,
            unique: true,
        },
        nombre: {
            type: String,
            required: true,
            trim: true,
            
        },
        apellido: {
            type: String,
            required: true,
        },
         taller: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Usuario',
                    required: true,
                },
        
    }
);

export default model('Mecanico', mecanicoSchema);