let mantenimientos = [{ 
    id: 1,
    vehiculoId: 1,
    descripcion: "Cambio de aceite",
    fecha: "2023-01-15"
}]

export const obtenerMantenimientos = (req, res) => {
    return res.json(mantenimientos);
}