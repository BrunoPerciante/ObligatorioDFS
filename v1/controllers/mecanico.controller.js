let mecanicos = [{
    id: 1,
    nombre: "Carlos Gomez",
    especialidad: "Motor"
},
{
    id: 2,
    nombre: "Ana Martinez",
    especialidad: "Frenos"
}];

export const obtenerMecanicos = (req, res) => {
    return res.json(mecanicos); 
}