import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./auth/auth.routes";
import notificationRoute from "./routes/notification.router";
import { notification } from "./services/notification.service";

const app: Application = express();

/**
 * Middlewares
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

/**
 * Health Check Route
 */
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully",
  });
});

/**
 * Routes
 */
app.use("/api/auth", authRoutes);
app.use("/api", notificationRoute);


/**
 * 404 Route Handler
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;