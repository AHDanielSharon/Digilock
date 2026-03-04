import { Router } from "express";
import { z } from "zod";
import { createDocument, searchDocuments } from "../controllers/document.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";

const router = Router();

router.post(
  "/",
  requireAuth,
  validateBody(
    z.object({
      title: z.string().min(2),
      category: z.enum(["ID", "CERTIFICATE", "CONTRACT", "NOTE", "OTHER"]),
      tags: z.array(z.string()).default([]),
      mimeType: z.string().min(3)
    })
  ),
  createDocument
);

router.get("/search", requireAuth, searchDocuments);

export default router;
