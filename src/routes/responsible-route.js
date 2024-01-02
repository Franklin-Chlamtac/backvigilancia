import express from "express";
import responsibleController from "../controllers/responsible-controller.js";
import protectedRoutes from "../middlewares/protected-route.js";

const router = express.Router();

router.post("/", protectedRoutes, responsibleController.createResponsible);

router.get("/", responsibleController.listResponsibles);

router.patch("/:id", protectedRoutes, responsibleController.updateResponsible);

export default router;
