import express from "express";
import login from "../controllers/login-controller";
import protectedRoutes from "../middlewares/protected-route";
import getSessionController from "../controllers/get-session-controller";

const router = express.Router();

router.post("/", login.login);
router.get("/", getSessionController.handler);

export default router;
