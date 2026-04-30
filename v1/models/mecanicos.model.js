import mongoose from "mongoose";

const { Schema, model } = mongoose;

const mecanicoSchema = new Schema(
    {
        
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
                },
        
    }
);

export default model('Mecanico', mecanicoSchema);