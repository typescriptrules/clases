import type { NextFunction, Request, Response } from "express";

// Middleware to validate required fields for creating a book
// Expects: { author: string, name: string, owner: string }
export function validateBookData(req: Request, res: Response, next: NextFunction) {
  if (!req.body) {
    return res.status(400).json({
      error: "Request body is missing. Make sure to send JSON data with Content-Type: application/json",
    });
  }

  const { author, name, owner } = req.body ?? {};

  // Basic presence validation
  if (author == null || name == null || owner == null) {
    return res.status(400).json({
      error: "Missing required fields: 'author', 'name' and 'owner' are required",
      received: { author, name, owner },
    });
  }

  // Type validation
  const typeErrors: Record<string, string> = {};
  if (typeof author !== "string") typeErrors.author = typeof author;
  if (typeof name !== "string") typeErrors.name = typeof name;
  if (typeof owner !== "string") typeErrors.owner = typeof owner;

  if (Object.keys(typeErrors).length > 0) {
    return res.status(400).json({
      error: "Invalid data types: 'author', 'name' and 'owner' must be strings",
      receivedTypes: typeErrors,
    });
  }

  // Optional normalization
  req.body.author = author.trim();
  req.body.name = name.trim();
  req.body.owner = owner.trim();

  next();
}
