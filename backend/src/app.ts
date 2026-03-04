import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import routes from "./routes/index.js";
import { env } from "./config/env.js";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.allowedOrigins,
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));

app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: true,
    legacyHeaders: false
  })
);

app.use("/api", routes);

export default app;
