import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt.js";
import type { JwtClaims, PlatformRole } from "../types/auth.js";

declare global {
  namespace Express {
    interface Request {
      user?: JwtClaims;
    }
  }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Missing access token" });
    return;
  }

  try {
    req.user = verifyAccessToken(header.slice(7));
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const requireRole = (...roles: PlatformRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: "Insufficient permission" });
      return;
    }
    next();
  };
};
