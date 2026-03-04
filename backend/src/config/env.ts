import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 8080),
  jwtSecret: process.env.JWT_SECRET ?? "dev-secret",
  jwtIssuer: process.env.JWT_ISSUER ?? "digilock",
  dbUrl: process.env.DATABASE_URL ?? "postgres://postgres:postgres@localhost:5432/digilock",
  s3Bucket: process.env.S3_BUCKET ?? "digilock-docs",
  allowedOrigins: (process.env.ALLOWED_ORIGINS ?? "http://localhost:3000").split(",")
};
