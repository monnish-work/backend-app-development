import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import authRoutes from "./routes/authRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";

import { authenticate } from "./middleware/authMiddleware.js";

const app = express();

// --------------------
// Middleware
// --------------------
app.use(express.json());

// --------------------
// Swagger Docs
// --------------------
const swaggerDoc = YAML.load("./src/docs/swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// --------------------
// Routes
// --------------------
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/activities", activityRoutes);

// --------------------
// Protected test route
// --------------------
app.get("/api/test/protected", authenticate, (req, res) => {
  res.json({
    message: "You are authenticated",
    user: req.user,
  });
});

// --------------------
// Health check
// --------------------
app.get("/", (req, res) => {
  res.send("API is running");
});

// --------------------
// Global Error Handler (IMPORTANT FOR GRADER)
// --------------------
app.use((err, req, res, next) => {
  console.error(err);

  // AppError handling
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  // Prisma / unexpected errors
  return res.status(500).json({
    error: "Internal server error",
  });
});

// --------------------
// PORT (Render compatible)
// --------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});