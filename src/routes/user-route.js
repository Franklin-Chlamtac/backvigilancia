import express from "express";
import UserController from "../controllers/user-controller.js";
import protectedRoutes from "../middlewares/protected-route.js";
import permissionMiddleware from "../middlewares/permission-middleware.js";

const router = express.Router();

router.post("/", protectedRoutes, UserController.createUser);

router.get("/", UserController.listUsers);

router.patch("/:id", protectedRoutes, UserController.updateUser);

export default router;
