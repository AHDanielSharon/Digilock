import type { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

const service = new AuthService();

export const signup = async (req: Request, res: Response): Promise<void> => {
  const data = await service.signup(req.body);
  res.status(201).json({ message: "Signup successful", data });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const data = await service.login(req.body);
  res.status(200).json({ message: "Login successful", data, mfaRequired: true });
};

export const resetPassword = async (_req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: "Password reset link issued" });
};

export const biometricChallenge = async (_req: Request, res: Response): Promise<void> => {
  res.status(200).json({ challenge: "webauthn-challenge-placeholder" });
};
