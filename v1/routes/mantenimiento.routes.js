import express from 'express';
import {
  obtenerMantenimiento,
  obtenerMantenimientoPorId,
  crearMantenimiento,
  actualizarMantenimiento,
  eliminarMantenimiento,
} from '../controllers/mantenimiento.controller.js';
import { rolAuthMiddleware } from '../middlewares/rolAuth.middleware.js';
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware.js';
import { crearMantenimientoSchema } from '../validators/mantenimiento.validators.js';

const router = express.Router({ mergeParams: true });

router.get('/', obtenerMantenimiento);
router.get('/:id', obtenerMantenimientoPorId);
router.post('/', validateBodyMiddleware(crearMantenimientoSchema), crearMantenimiento);
router.put('/:id', rolAuthMiddleware(['taller']), validateBodyMiddleware(crearMantenimientoSchema), actualizarMantenimiento);
router.delete('/:id', rolAuthMiddleware(['taller']), eliminarMantenimiento);

export default router;