
let usuarios = [{
    id: 1,
    username: "Maria Lopez",
    password: "12345",
    confirmPassword: "12345",
    aceptaTerminos: true 
}];

export const obtenerUsuarios = (req, res) => {
    return res.json(usuarios);
}  

export const agregarUsuario = (req, res) => {
    res.json({ message: "Usuario agregado correctamente", usuario: req.validatedBody });
}





