import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import * as tripController from "../controllers/tripController.js";

const router = express.Router();

router.post("/", authenticate, tripController.createTrip);
router.get("/", authenticate, tripController.getTrips);
router.get("/:id", authenticate, tripController.getTripById);
router.put("/:id", authenticate, tripController.updateTrip);
router.delete("/:id", authenticate, tripController.deleteTrip);

export default router;