import express from 'express';
import {obtenerMantenimiento,
        crearMantenimiento,
        actualizarMantenimiento,    
        eliminarMantenimiento
} from '../controllers/mantenimiento.controller.js';
import { rolAuthMiddleware } from '../middlewares/rolAuth.middleware.js';

const router = express.Router({ mergeParams: true });

router.get("/", obtenerMantenimiento);
router.post("/", crearMantenimiento);
router.put("/:id", rolAuthMiddleware(['taller']), actualizarMantenimiento);
router.delete("/:id", rolAuthMiddleware(['taller']), eliminarMantenimiento);

export default router;