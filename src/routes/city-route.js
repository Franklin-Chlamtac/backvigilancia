import express from "express";
import cityController from "../controllers/city-controller.js";
import protectedRoutes from "../middlewares/protected-route.js";

const router = express.Router();

router.post("/", cityController.createCity);

router.get("/", cityController.listCities);

router.patch("/:id", cityController.updateCity);

export default router;
