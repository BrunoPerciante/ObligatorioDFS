import Mantenimiento from "../models/mantenimientos.model.js";

export const obtenerMantenimientoService = async (page, limit) => {
    limit = Number(limit) || 5; 
    page = Number(page) || 1;
    const skip = (page - 1) * limit;
    const totalMantenimientos = await Mantenimiento.countDocuments();
    const totalPages = Math.ceil(totalMantenimientos / limit);
    const mantenimientos = await Mantenimiento.find().skip(skip).limit(limit);
    return { mantenimientos, totalPages, page, limit };
}

export const crearMantenimientoService = async (mantenimientoData) => {
    const nuevoMantenimiento = new Mantenimiento(mantenimientoData);
    await nuevoMantenimiento.save();
    return nuevoMantenimiento;
}

export const actualizarMantenimientoService = async (id, mantenimientoData) => {
    const mantenimientoActualizado = await Mantenimiento.findByIdAndUpdate(id, mantenimientoData, { new: true });
    return mantenimientoActualizado;
}

export const eliminarMantenimientoService = async (id) => {
    await Mantenimiento.findByIdAndDelete(id);
}

