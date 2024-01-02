import express from "express";
import protectedRoutes from "../middlewares/protected-route";
import productionController from "../controllers/production-controller.js";

const router = express.Router();

router.post("/", protectedRoutes, productionController.createProduction);

router.get("/", productionController.listProductions);

router.patch("/:id", protectedRoutes, productionController.updateProduction);

export default router;
