import express from "express";
import duenioRouter from "./routes/duenio.routes.js"; 
import usuariosRouter from "./routes/usuario.routes.js";
import vehiculoRouter from "./routes/vehiculo.routes.js";
import authRouter from "./routes/auth.routes.js";
import tallerRouter from "./routes/taller.routes.js";
import aiRouter from "./routes/ai.routes.js";
import mantenimientoRouter from "./routes/mantenimiento.routes.js";
import mecanicoRouter from "./routes/mecanico.routes.js";
import categoriaRouter from "./routes/categoria.routes.js";
import { authenticateMiddleware } from "./middlewares/authenticate.middleware.js";
import uploadsRouter from "./routes/uploads.routes.js"

const router = express.Router({mergeParams:true});

//peticiones que llegan a /v1
//rutas de login y registro de usuarios, sin necesidad de token
router.use("/auth", authRouter);
router.use("/uploads",uploadsRouter);
router.use("/ai", aiRouter);

//middleware para verificar de token
router.use(authenticateMiddleware);

//peticiones que llegan a /v1
router.use("/usuarios", usuariosRouter);
router.use("/duenios", duenioRouter);
router.use("/talleres", tallerRouter);
router.use("/vehiculos", vehiculoRouter);
router.use("/mantenimientos", mantenimientoRouter);
router.use("/mecanicos", mecanicoRouter);
router.use("/categorias", categoriaRouter);

export default router;