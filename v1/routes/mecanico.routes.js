import express from 'express';
import {
  obtenerMecanicos,
  crearMecanico,
  obtenerMecanicoPorId,
  modificarMecanico,
  eliminarMecanico,
} from '../controllers/mecanico.controller.js';

import { rolAuthMiddleware } from '../middlewares/rolAuth.middleware.js';
import { authenticateMiddleware } from '../middlewares/authenticate.middleware.js';
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware.js';
import { crearMecanicoSchema } from '../validators/mecanico.validators.js';

const router = express.Router({ mergeParams: true });

router.get('/', authenticateMiddleware, rolAuthMiddleware(['taller']), obtenerMecanicos);
router.post(
  '/',
  authenticateMiddleware,
  rolAuthMiddleware(['taller']),
  validateBodyMiddleware(crearMecanicoSchema),
  crearMecanico
);
router.get('/:id', authenticateMiddleware, rolAuthMiddleware(['taller']), obtenerMecanicoPorId);
router.put(
  '/:id',
  authenticateMiddleware,
  rolAuthMiddleware(['taller']),
  validateBodyMiddleware(crearMecanicoSchema),
  modificarMecanico
);
router.delete('/:id', authenticateMiddleware, rolAuthMiddleware(['taller']), eliminarMecanico);




export default router;