import Usuario from "../models/usuario.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registrarUsuarioService = async (usuarioData) => {
  const { confirmPassword, password, ...data } = usuarioData;

  const emailExists = await Usuario.findOne({ email: data.email });
  if (emailExists) return { message: "El email ya está registrado" };

  const usernameExists = await Usuario.findOne({ username: data.username });
  if (usernameExists) return { message: "El nombre de usuario ya existe" };

  const passwordHash = bcrypt.hashSync(
    password,
    Number(process.env.SALT_ROUNDS) || 10
  );

  const nuevoUsuario = new Usuario({ ...data, password: passwordHash });
  await nuevoUsuario.save();

  const token = jwt.sign(
    { id: nuevoUsuario._id, role: nuevoUsuario.role },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );

  /*return { usuario: data, token };  cambie para solucionar registrodeñoexitoso Respuesta contiene token y usuario | AssertionError: expected { username: 'duenio5610007', …(5) } to have property '_id'
*/
  const userObj = nuevoUsuario.toObject();
delete userObj.password;

return { usuario: userObj, token };
  
};

export const loginUsuarioService = async (email, password, role) => {
  const usuario = await Usuario.findOne({ email, role });

  if (!usuario) return { message: "Usuario no encontrado" };

  const passwordVerificada = bcrypt.compareSync(password, usuario.password);
  if (!passwordVerificada) return { message: "Contraseña incorrecta" };

  const token = jwt.sign(
    { id: usuario._id, role: usuario.role }, 
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );

  return { usuario: usuario, token };
};