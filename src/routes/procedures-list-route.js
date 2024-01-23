import express from "express";
import proceduresListController from "../controllers/procedures-list-controller.js";

const router = express.Router();

router.get("/", proceduresListController.listProcedures);

export default router;
