import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import * as controller from "../controllers/activityController.js";

const router = express.Router();

router.use(authenticate);

// CREATE
router.post("/", controller.createActivity);

// GET ALL
router.get("/", controller.getActivities);

// GET ONE
router.get("/:id", controller.getActivityById);

// UPDATE
router.put("/:id", controller.updateActivity);

// DELETE
router.delete("/:id", controller.deleteActivity);

export default router;