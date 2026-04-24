import express from 'express';

import {
  obtenerDuenios,
  obtenerDuenioPorId,
  modificarDuenio,
  eliminarDuenio,
} from '../controllers/duenio.controller.js';
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware.js';
import { updateDuenioSchema } from '../validators/duenio.validators.js';
import { authenticateMiddleware } from '../middlewares/authenticate.middleware.js';

const router = express.Router({ mergeParams: true });

router.get('/', authenticateMiddleware, obtenerDuenios);
router.get('/:id', authenticateMiddleware, obtenerDuenioPorId);
router.put('/:id', authenticateMiddleware, validateBodyMiddleware(updateDuenioSchema), modificarDuenio);
router.delete('/:id', authenticateMiddleware, eliminarDuenio);

export default router;