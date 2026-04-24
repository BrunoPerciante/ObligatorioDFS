import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const usuarioSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['duenio', 'taller', 'usuario'],
      default: 'usuario',
    },
    nombre: {
      type: String,
      trim: true,
    },
    telefono: {
      type: String,
      trim: true,
    },
    plan: {
      type: String,
      trim: true,
    },
    nombreTaller: {
      type: String,
      trim: true,
    },
    direccion: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model('Usuario', usuarioSchema);
