import express from 'express';
import { rolAuthMiddleware } from '../middlewares/rolAuth.middleware.js';

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

router.get('/', authenticateMiddleware,  obtenerDuenios);
router.get('/:id', authenticateMiddleware, rolAuthMiddleware(['duenio', 'taller']), obtenerDuenioPorId);
router.put('/:id', authenticateMiddleware, rolAuthMiddleware(['duenio']), validateBodyMiddleware(updateDuenioSchema), modificarDuenio);
router.delete('/:id', authenticateMiddleware, rolAuthMiddleware(['duenio']), eliminarDuenio);

export default router;