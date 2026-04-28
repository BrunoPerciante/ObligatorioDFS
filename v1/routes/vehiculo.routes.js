import express from 'express';
import { obtenerVehiculos, crearVehiculo } from '../controllers/vehiculo.controller.js';
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware.js';
import { crearVehiculoSchema } from '../validators/vehiculo.validators.js';
import { rolAuthMiddleware } from '../middlewares/rolAuth.middleware.js';

const router = express.Router({ mergeParams: true });

router.get("/", obtenerVehiculos);
router.post("/", validateBodyMiddleware(crearVehiculoSchema), crearVehiculo);


export default router;