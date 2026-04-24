import express from 'express';
import { obtenerVehiculos } from '../controllers/vehiculo.controller.js';
import validateBody from '../v1/middlewares/validateBody.js';

const router = express.Router({ mergeParams: true });

router.get("/", obtenerVehiculos);

export default router;