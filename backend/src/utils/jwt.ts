import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import type { JwtClaims } from "../types/auth.js";

const expiry = "15m";

export const signAccessToken = (claims: JwtClaims): string => {
  return jwt.sign(claims, env.jwtSecret, {
    issuer: env.jwtIssuer,
    expiresIn: expiry
  });
};

export const verifyAccessToken = (token: string): JwtClaims => {
  return jwt.verify(token, env.jwtSecret, {
    issuer: env.jwtIssuer
  }) as JwtClaims;
};
