import express from "express";
import protectedRoutes from "../middlewares/protected-route.js";
import complaintController from "../controllers/complaint-controller.js";

const router = express.Router();

router.post("/", complaintController.createComplaint);

router.get("/open", complaintController.listOpenComplaints);

router.get("/close", complaintController.listCloseComplaints);

router.patch(
  "/resolve/:id",

  complaintController.resolveComplaint
);

router.patch("/:id", complaintController.updateComplaint);

export default router;
