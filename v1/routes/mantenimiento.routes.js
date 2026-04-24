import express from 'express';
import obtenerMantenimiento from '../controllers/mantenimiento.controller.js';

const router = express.Router({ mergeParams: true });

router.get("/", mantenimiento);

export default router;