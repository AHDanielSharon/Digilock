import { Router } from "express";
import { z } from "zod";
import { biometricChallenge, login, resetPassword, signup } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";

const router = Router();

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(12)
});

router.post("/signup", validateBody(authSchema.extend({ fullName: z.string().min(2) })), signup);
router.post("/login", validateBody(authSchema), login);
router.post("/password/reset", resetPassword);
router.get("/biometric/challenge", requireAuth, biometricChallenge);

export default router;
