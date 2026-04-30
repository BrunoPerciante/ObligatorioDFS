import express from 'express';
import {authenticateMiddleware}from"../middlewares/authenticate.middleware.js";
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

router.get('/', authenticateMiddleware, obtenerVehiculos);
router.get('/:id',authenticateMiddleware, obtenerVehiculoPorId);
router.post('/',authenticateMiddleware, validateBodyMiddleware(crearVehiculoSchema), crearVehiculo);
router.put('/:id', authenticateMiddleware,validateBodyMiddleware(crearVehiculoSchema), modificarVehiculo);
router.delete('/:id', authenticateMiddleware, eliminarVehiculo);

export default router;