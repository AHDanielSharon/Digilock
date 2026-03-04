export type PlatformRole = "USER" | "ADMIN" | "AUDITOR";

export interface JwtClaims {
  sub: string;
  email: string;
  role: PlatformRole;
  sessionId: string;
}
