import Usuario from '../models/usuario.model.js';
import { obtenerCantidadVehiculos } from '../services/vehiculo.services.js';
import { actualizarPlanService } from '../services/usuario.services.js';

export const actualizarPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { plan } = req.validatedBody;

    const resultado = await actualizarPlanService(id, plan);

    if (resultado.message) return res.status(400).json({ message: resultado.message });

    if (resultado.sinCambios) return res.json({ message: 'El plan ya está establecido', usuario: resultado.usuario });

    return res.json({
      message: `Plan actualizado de ${resultado.planAnterior} a ${resultado.usuario.plan}`,
      usuario: resultado.usuario
    });
  } catch (error) {
    console.error('Error al actualizar plan:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}