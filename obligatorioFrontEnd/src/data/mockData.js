// Datos de prueba para login y registro
export const usuariosPrueba = [
  {
    id: 1,
    email: 'duenio1@autotrack.com',
    password: '123456',
    rol: 'duenio',
    nombre: 'Juan Pérez'
  },
  {
    id: 2,
    email: 'taller1@autotrack.com',
    password: 'taller123',
    rol: 'taller',
    nombreTaller: 'Taller Rápido',
    telefono: '099123456'
  },
  {
    id: 3,
    email: 'duenio2@autotrack.com',
    password: 'duenio123',
    rol: 'duenio',
    nombre: 'María García'
  },
  {
    id: 4,
    email: 'taller2@autotrack.com',
    password: 'taller456',
    rol: 'taller',
    nombreTaller: 'Taller Central',
    telefono: '098765432'
  }
];

// Función para validar credenciales (usar para mock auth)
export const validarCredenciales = (email, password, rol) => {
  const usuario = usuariosPrueba.find(
    u => u.email === email && u.password === password && u.rol === rol
  );
  return usuario ? { ...usuario, token: 'token-' + usuario.id } : null;
};
