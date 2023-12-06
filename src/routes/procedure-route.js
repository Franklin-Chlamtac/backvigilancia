import express from "express";

import procedureController from "../controllers/procedure-controller.js";
import protectedRoutes from "../middlewares/protected-route.js";

const router = express.Router();

router.post("/", protectedRoutes, procedureController.createProcedure);

router.get("/", protectedRoutes, procedureController.listProcedures);

router.patch("/:id", protectedRoutes, procedureController.updateProcedure);

export default router;
