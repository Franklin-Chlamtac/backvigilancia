import express from "express";
import occupationsController from "../controllers/occupations-controller";

const router = express.Router();

router.get("/", occupationsController.listOccupations);

export default router;
