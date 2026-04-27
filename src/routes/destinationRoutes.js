import express from "express";
import * as controller from "../controllers/destinationController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticate);

router.post("/", controller.createDestination);
router.get("/", controller.getDestinations);
router.get("/:id", controller.getDestinationById);
router.put("/:id", controller.updateDestination);
router.delete("/:id", controller.deleteDestination);

export default router;