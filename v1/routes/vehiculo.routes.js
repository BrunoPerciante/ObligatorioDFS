import express from 'express';
import {
  obtenerVehiculos,
  obtenerVehiculoPorId,
  crearVehiculo,
  modificarVehiculo,
  eliminarVehiculo,
} from '../controllers/vehiculo.controller.js';
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware.js';
import { crearVehiculoSchema } from '../validators/vehiculo.validators.js';

const router = express.Router({ mergeParams: true });

router.get('/', obtenerVehiculos);
router.get('/:id', obtenerVehiculoPorId);
router.post('/', validateBodyMiddleware(crearVehiculoSchema), crearVehiculo);
router.put('/:id', validateBodyMiddleware(crearVehiculoSchema), modificarVehiculo);
router.delete('/:id', eliminarVehiculo);

export default router;