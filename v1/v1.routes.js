import express from "express";

import usuariosRouter from "./routes/usuario.routes.js";
import authRouter from "./routes/auth.routes.js";

import { authenticateMiddleware } from "./middlewares/authenticate.middleware.js";
import uploadsRouter from "./routes/uploads.routes.js"

const router = express.Router({mergeParams:true});

//peticiones que llegan a /v1
//rutas de login y registro de usuarios, sin necesidad de token
router.use("/auth", authRouter);
router.use("/uploads",uploadsRouter);

//middleware para verificar de token
router.use(authenticateMiddleware);

//peticiones que llegan a /v1
router.use("/usuarios", usuariosRouter);


export default router;