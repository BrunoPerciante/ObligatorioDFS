import express from 'express';
import obtenerMecanicos from '../controllers/mecanico.controller.js';

const router = express.Router({ mergeParams: true });

router.get("/", obtenerMecanicos);

export default router;