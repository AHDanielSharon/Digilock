import { createHash, randomUUID } from "crypto";

interface CreateDocumentPayload {
  ownerId: string;
  title: string;
  category: string;
  tags: string[];
  mimeType: string;
}

export class DocumentService {
  createDocumentMetadata(payload: CreateDocumentPayload) {
    const contentFingerprint = createHash("sha256")
      .update(`${payload.ownerId}:${payload.title}:${Date.now()}`)
      .digest("hex");

    return {
      id: randomUUID(),
      ...payload,
      contentFingerprint,
      authenticityScore: 0.99,
      createdAt: new Date().toISOString()
    };
  }
}
