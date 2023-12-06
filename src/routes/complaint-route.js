import express from "express";
import protectedRoutes from "../middlewares/protected-route.js";
import complaintController from "../controllers/complaint-controller.js";

const router = express.Router();

router.post("/", complaintController.createComplaint);

router.get("/", complaintController.listComplaints);

router.patch(
  "/resolve/:id",

  complaintController.resolveComplaint
);

router.patch("/:id", complaintController.updateComplaint);

export default router;
