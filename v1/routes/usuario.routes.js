import express from 'express';
import { actualizarPlan } from '../controllers/usuario.controller.js';
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware.js';
import { actualizarPlanSchema } from '../validators/plan.validators.js';
import { authenticateMiddleware } from '../middlewares/authenticate.middleware.js';

const router = express.Router({ mergeParams: true });

router.patch('/:id/plan', authenticateMiddleware, validateBodyMiddleware(actualizarPlanSchema), actualizarPlan);

export default router;