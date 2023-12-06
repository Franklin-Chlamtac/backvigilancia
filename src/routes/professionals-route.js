import express from "express";
import professionalController from "../controllers/professional-controller.js";

const router = express.Router();

router.post("/", professionalController.createProfessional);

router.get("/", professionalController.listProfessionals);

router.patch("/:id", professionalController.updateProfessionals);

export default router;
