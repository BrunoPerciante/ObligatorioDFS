import express from "express";
import {
  getMarcas,
  getModelosPorMarca,
  getModelosPorMarcaYAnio
} from "../controllers/vehiculoInfo.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/marcas", getMarcas);
router.get("/modelos/:marca", getModelosPorMarca);
router.get("/modelos/:marca/:anio", getModelosPorMarcaYAnio);

export default router;