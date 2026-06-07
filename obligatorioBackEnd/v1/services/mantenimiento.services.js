import Mantenimiento from "../models/mantenimientos.model.js";
import axios from 'axios';

export const obtenerMantenimientoService = async (page, limit, categoria) => {
  limit = Number(limit) || 5;
  page = Number(page) || 1;
  const skip = (page - 1) * limit;
  const filtro = {};
  if (categoria) {
    filtro.categoria = categoria;
  }
  const totalMantenimientos = await Mantenimiento.countDocuments(filtro);
  const totalPages = Math.ceil(totalMantenimientos / limit);
  const mantenimientos = await Mantenimiento.find(filtro)
    .skip(skip)
    .limit(limit)
    .populate('vehiculo', 'padron matricula marca modelo')
    .populate('taller', 'username nombreTaller')
    .populate('categoria', 'nombre descripcion');
  return { mantenimientos, totalPages, page, limit };
};

export const obtenerMantenimientoPorIdService = async (id) => {
  return Mantenimiento.findById(id)
    .populate('vehiculo', 'padron matricula marca modelo')
    .populate('taller', 'username nombreTaller')
    .populate('categoria', 'nombre descripcion');
};

export const crearMantenimientoService = async (mantenimientoData) => {
  const API_KEY = process.env.GEMINI_25_API_KEY;
  const MODEL = 'gemini-2.5-flash';
  const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

  const prompt = `Redactá de forma profesional, clara y muy breve la descripción de un mantenimiento vehicular. El taller realizó lo siguiente: ${mantenimientoData.servicio}. Devolvé solo la descripción, sin títulos ni explicaciones extra.`;

  let descripcion = mantenimientoData.servicio; // fallback por defecto

  try {
    const response = await axios.post(ENDPOINT, {
      contents: [{ parts: [{ text: prompt }] }]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': API_KEY
      }
    });

    descripcion = response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error al generar descripción con Gemini:', error.message);
    // descripcion ya tiene el valor fallback
  }

  const nuevoMantenimiento = new Mantenimiento({
    ...mantenimientoData,
    descripcion
  });

  await nuevoMantenimiento.save();
  return nuevoMantenimiento;
};

export const actualizarMantenimientoService = async (id, mantenimientoData) => {
  const mantenimientoActualizado = await Mantenimiento.findByIdAndUpdate(id, mantenimientoData, { new: true });
  return mantenimientoActualizado;
};

export const eliminarMantenimientoService = async (id) => {
  const mantenimiento = await Mantenimiento.findByIdAndDelete(id);
  return mantenimiento;
};

