import express from 'express';
import {
  obtenerTalleres,
  obtenerTallerPorId,
  modificarTaller,
  eliminarTaller,
} from '../controllers/taller.controller.js';
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware.js';
import { updateTallerSchema } from '../validators/taller.validators.js';
import { authenticateMiddleware } from '../middlewares/authenticate.middleware.js';

const router = express.Router({ mergeParams: true });

router.get('/', authenticateMiddleware, obtenerTalleres);
router.get('/:id', authenticateMiddleware, obtenerTallerPorId);
router.put('/:id', authenticateMiddleware, validateBodyMiddleware(updateTallerSchema), modificarTaller);
router.delete('/:id', authenticateMiddleware, eliminarTaller);

export default router;