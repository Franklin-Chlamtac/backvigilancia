import express from "express";
import cityController from "../controllers/city-controller.js";
import protectedRoutes from "../middlewares/protected-route.js";

const router = express.Router();

router.post("/", protectedRoutes, cityController.createCity);

router.get("/", protectedRoutes, cityController.listCities);

router.patch("/:id", protectedRoutes, cityController.updateCity);

export default router;
