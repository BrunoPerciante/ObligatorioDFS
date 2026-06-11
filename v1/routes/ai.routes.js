import express from "express";
import {authenticateMiddleware} from "../middlewares/authenticate.middleware.js"
import { getModels, useGemini25Flash } from "../controllers/ai.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/",authenticateMiddleware, getModels);
router.post("/", authenticateMiddleware,useGemini25Flash);

export default router;