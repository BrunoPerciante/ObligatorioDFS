let vehiculos = [{
    id: 1,
    padron: "ABC123",
    matricula: "XYZ789",
    marca: "Toyota",
    modelo: "Corolla",
    año: 2020
},
{
    id: 2,
    padron: "DEF456",
    matricula: "UVW456",
    marca: "Honda",
    modelo: "Civic",
    año: 2019
}];

export const obtenerVehiculos = (req, res) => {
    return res.json(vehiculos);
}