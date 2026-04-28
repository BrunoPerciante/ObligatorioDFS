import Usuario from '../models/usuario.model.js';
import { obtenerCantidadVehiculos } from '../services/vehiculo.services.js';

export const obtenerUsuarios = (req, res) => {
    return res.json(usuarios);
}

export const agregarUsuario = (req, res) => {
    res.json({ message: "Usuario agregado correctamente", usuario: req.validatedBody });
}

export const actualizarPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { plan: nuevoPlan } = req.validatedBody;

    // Obtener el usuario actual
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const planActual = usuario.plan;

    // Si es el mismo plan, no hacer nada
    if (planActual === nuevoPlan) {
      return res.json({
        message: 'El plan ya está establecido',
        usuario: {
          id: usuario._id,
          username: usuario.username,
          plan: usuario.plan
        }
      });
    }

    // Validar downgrade: premium → plus solo si tiene ≤4 vehículos
    if (planActual === 'premium' && nuevoPlan === 'plus') {
      const cantidadVehiculos = await obtenerCantidadVehiculos(id);
      if (cantidadVehiculos > 4) {
        return res.status(400).json({
          error: 'No se puede cambiar a plan Plus',
          message: `El usuario tiene ${cantidadVehiculos} vehículos. El plan Plus permite máximo 4 vehículos.`
        });
      }
    }

    // Actualizar el plan
    usuario.plan = nuevoPlan;
    await usuario.save();

    return res.json({
      message: `Plan actualizado de ${planActual} a ${nuevoPlan}`,
      usuario: {
        id: usuario._id,
        username: usuario.username,
        email: usuario.email,
        plan: usuario.plan
      }
    });

  } catch (error) {
    console.error('Error al actualizar plan:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};









