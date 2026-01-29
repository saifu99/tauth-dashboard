import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.use(cors({
    origin: "https://mern-auth-dashboard-one.vercel.app",
    credentials: true,
  }
));
app.use(express.json());

app.get("/health", (req, res) => { //health check
  res.status(200).send("OK");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.use(errorHandler);

export default app;
