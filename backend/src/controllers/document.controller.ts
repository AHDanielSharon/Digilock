import type { Request, Response } from "express";
import { DocumentService } from "../services/document.service.js";

const service = new DocumentService();

export const createDocument = async (req: Request, res: Response): Promise<void> => {
  const ownerId = req.user!.sub;
  const metadata = service.createDocumentMetadata({
    ownerId,
    title: req.body.title,
    category: req.body.category,
    tags: req.body.tags,
    mimeType: req.body.mimeType
  });

  // Placeholder: push encrypted upload workflow to storage service.
  res.status(201).json({ message: "Document metadata created", data: metadata });
};

export const searchDocuments = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({
    query: req.query.q,
    mode: "semantic+text+tags",
    items: []
  });
};
