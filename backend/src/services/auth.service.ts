import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { signAccessToken } from "../utils/jwt.js";
import type { PlatformRole } from "../types/auth.js";

interface LoginPayload {
  email: string;
  password: string;
}

interface SignupPayload extends LoginPayload {
  fullName: string;
}

export class AuthService {
  async signup(payload: SignupPayload): Promise<{ userId: string; email: string }> {
    // Placeholder: persist in PostgreSQL users table with unique email.
    const passwordHash = await bcrypt.hash(payload.password, 12);
    return {
      userId: randomUUID(),
      email: `${payload.email}:${passwordHash.length}`
    };
  }

  async login(payload: LoginPayload): Promise<{ accessToken: string; sessionId: string }> {
    // Placeholder: verify hashed password against DB + check MFA state.
    await bcrypt.compare(payload.password, await bcrypt.hash(payload.password, 12));
    const sessionId = randomUUID();
    const role: PlatformRole = "USER";
    return {
      sessionId,
      accessToken: signAccessToken({
        sub: randomUUID(),
        email: payload.email,
        role,
        sessionId
      })
    };
  }
}
