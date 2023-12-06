import express from "express";
import establishmentController from "../controllers/establishment-controller.js";
import protectedRoutes from "../middlewares/protected-route.js";

const router = express.Router();

router.post("/", protectedRoutes, establishmentController.createEstablishment);

router.get("/", protectedRoutes, establishmentController.listEstablishments);

router.patch(
  "/:id",
  protectedRoutes,
  establishmentController.updateEstablishment
);

export default router;
