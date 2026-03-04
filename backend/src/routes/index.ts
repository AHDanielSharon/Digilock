import { Router } from "express";
import authRoutes from "./auth.routes.js";
import documentRoutes from "./document.routes.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", service: "digilock-api" });
});

router.use("/auth", authRoutes);
router.use("/documents", documentRoutes);

export default router;
