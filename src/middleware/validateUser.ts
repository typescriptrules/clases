import type { NextFunction, Request, Response } from "express";

export function validateUserData(req: Request, res: Response, next: NextFunction) {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  console.log("Body type:", typeof req.body);
  
  // Check if req.body already exists
  if (!req.body) {
    return res.status(400).json({
      error: "Request body is missing. Make sure to send JSON data with Content-Type: application/json",
    });
  }

  const { name, role, email, age } = req.body;
  
  if (typeof name !== "string" || typeof role !== "string" || typeof email !== "string" || typeof age !== "string") {
    return res.status(400).json({
      error: "Invalid data: 'name', 'role', 'email' and 'age' must be strings",
      received: { name: typeof name, role: typeof role, email: typeof email, age: typeof age }
    });
  }

  if (name == null || email == null || age == null) {
    return res.status(400).json({
      error: "Missing required fields: 'name', 'email' and 'age' are required",
      received: { name:typeof name, email:typeof email, age:typeof age },
    });
  }
  
  next();
}

export function checkPermissions(req: Request, res: Response, next: NextFunction) {
  const { role } = req.body;

  if (role !== "admin") {
    return res.status(403).json({
      error: "Forbidden: only admin users can create new users",
    });
  }
  console.log("Pásale nomás wey")

  next();
}

