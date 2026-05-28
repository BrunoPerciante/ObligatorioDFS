import {
  registrarUsuarioService,
  loginUsuarioService,
} from "../services/auth.services.js";

export const registrarDuenio = async (req, res) => {
  const { usuario, token, message } = await registrarUsuarioService({
    //Preguntar al profe porque se destructura el token si es mas adelante que se crea 
    ...req.validatedBody,
    role: "duenio",
    plan: "plus"
  });
  if (message) return res.status(400).json({ message });
  res.status(201).json({ message: "Dueño registrado", usuario, token });
};

export const registrarTaller = async (req, res) => {
  const { usuario, token, message } = await registrarUsuarioService({
    ...req.validatedBody,
    role: "taller"
  });
  if (message) return res.status(400).json({ message });
  res.status(201).json({ message: "Taller registrado", usuario, token });
};

export const loginDuenio = async (req, res) => {
  const { email, password } = req.validatedBody;
  const { usuario, token, message } = await loginUsuarioService(
    email,
    password,
    "duenio"
  );
  if (message) return res.status(400).json({ message });
  res.json({ message: "Dueño logueado", usuario, token });
};

export const loginTaller = async (req, res) => {
  const { email, password } = req.validatedBody;
  const { usuario, token, message } = await loginUsuarioService(
    email,
    password,
    "taller"
  );
  if (message) return res.status(400).json({ message });
  res.json({ message: "Taller logueado", usuario, token });
};