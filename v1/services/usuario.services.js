import Usuario from '../models/usuario.model.js';
import { obtenerCantidadVehiculos } from './vehiculo.services.js';

export const actualizarPlanService = async (id, nuevoPlan) => {
  const usuario = await Usuario.findById(id);
  if (!usuario) return { message: 'Usuario no encontrado' };

  if (usuario.plan === nuevoPlan) {
    return {
      sinCambios: true,
      usuario: { id: usuario._id, username: usuario.username, plan: usuario.plan }
    };
  }

  if (usuario.plan === 'premium' && nuevoPlan === 'plus') {
    const cantidadVehiculos = await obtenerCantidadVehiculos(id);
    if (cantidadVehiculos > 4) {
      return {
        message: `No se puede cambiar a plan Plus. El usuario tiene ${cantidadVehiculos} vehículos y el plan Plus permite máximo 4.`
      };
    }
  }

  const planAnterior = usuario.plan;
  usuario.plan = nuevoPlan;
  await usuario.save();

  return {
    planAnterior,
    usuario: { id: usuario._id, username: usuario.username, email: usuario.email, plan: usuario.plan }
  };
};