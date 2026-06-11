import express from "express";
import {authenticateMiddleware} from "../middlewares/authenticate.middleware.js"
import{subirImagen} from "../controllers/uploads.controller.js";

const router = express.Router({mergeParams:true});

router.post("/",authenticateMiddleware,subirImagen);

export default router;