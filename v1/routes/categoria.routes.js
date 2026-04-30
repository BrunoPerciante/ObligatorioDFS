import express from 'express';
import {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  modificarCategoria,
  eliminarCategoria,
} from '../controllers/categoria.controller.js';
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware.js';
import { crearCategoriaSchema } from '../validators/categoria.validators.js';
import { authenticateMiddleware } from '../middlewares/authenticate.middleware.js';
import { rolAuthMiddleware } from '../middlewares/rolAuth.middleware.js';

const router = express.Router({ mergeParams: true });

router.get('/', authenticateMiddleware, obtenerCategorias);
router.get('/:id', authenticateMiddleware, obtenerCategoriaPorId);
router.post('/', authenticateMiddleware, rolAuthMiddleware(['taller']), validateBodyMiddleware(crearCategoriaSchema), crearCategoria);
router.put('/:id', authenticateMiddleware, rolAuthMiddleware(['taller']), validateBodyMiddleware(crearCategoriaSchema), modificarCategoria);
router.delete('/:id', authenticateMiddleware, rolAuthMiddleware(['taller']), eliminarCategoria);

export default router;
