import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const categoriaSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      enum: ['chapa y pintura', 'mecanica', 'electricidad'],
    },
    descripcion: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export default model('Categoria', categoriaSchema);
