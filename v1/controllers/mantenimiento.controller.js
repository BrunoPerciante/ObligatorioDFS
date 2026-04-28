import { obtenerMantenimientoService, 
    crearMantenimientoService,
    actualizarMantenimientoService,
    eliminarMantenimientoService
} from "../services/mantenimiento.services.js";

export const obtenerMantenimiento = (req, res) => {
    const { page, limit } = req.query;
    const respuesta = obtenerMantenimientoService(page, limit);
    res.status(200).json({ message: "Mantenimientos obtenidos", data: respuesta });
}

export const crearMantenimiento = async (req, res) => {
    const mantenimiento = await crearMantenimientoService(req.validatedBody);
    res.status(201).json({ message: "Mantenimiento creado", data: mantenimiento });
}

export const actualizarMantenimiento = async (req, res) => {
    const { id } = req.params;
    const mantenimientoActualizado = await actualizarMantenimientoService(id, req.validatedBody);
    res.status(200).json({ message: "Mantenimiento actualizado", data: mantenimientoActualizado });
}

export const eliminarMantenimiento = async (req, res) => {
    const { id } = req.params;
    await eliminarMantenimientoService(id);
    res.status(200).json({ message: "Mantenimiento eliminado" });
}

