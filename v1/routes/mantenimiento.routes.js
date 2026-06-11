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
import { authenticateMiddleware } from '../middlewares/authenticate.middleware.js';

const router = express.Router({ mergeParams: true });

router.get('/', authenticateMiddleware, obtenerMantenimiento);
router.get('/:id', authenticateMiddleware, obtenerMantenimientoPorId);
router.post('/', authenticateMiddleware, validateBodyMiddleware(crearMantenimientoSchema), crearMantenimiento);
router.put('/:id', authenticateMiddleware, rolAuthMiddleware(['taller']), validateBodyMiddleware(crearMantenimientoSchema), actualizarMantenimiento);
router.delete('/:id', authenticateMiddleware, rolAuthMiddleware(['taller']), eliminarMantenimiento);

export default router;