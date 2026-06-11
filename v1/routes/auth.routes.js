import express from "express";
import {
  registrarDuenio,
  registrarTaller,
  loginDuenio,
  loginTaller,
} from "../controllers/auth.controller.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import {
  registerDuenioSchema,
  registerTallerSchema,
  loginSchema,
} from "../validators/auth.validators.js";

const router = express.Router({ mergeParams: true });

router.post("/login/duenio", validateBodyMiddleware(loginSchema), loginDuenio);
router.post("/login/taller", validateBodyMiddleware(loginSchema), loginTaller);
router.post(
  "/registro/duenio",
  validateBodyMiddleware(registerDuenioSchema),
  registrarDuenio
);
router.post(
  "/registro/taller",
  validateBodyMiddleware(registerTallerSchema),
  registrarTaller
);

export default router;