import type { Request, Response, NextFunction } from "express";

export const validateUserData = (req: Request, res: Response, next: NextFunction) => {
console.log('headers:', req.headers);
console.log('body:', req.body);
console.log('body type:', typeof req.body);

if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
}
const { name, role } = req.body;

if (typeof name !== 'string' || typeof role !== 'string') {
    return res.status(400).json({ error: "Invalid user data. 'name' and 'role' should be strings.", received: { name: typeof name, role: typeof role } });
}
    next();
};

export function checkPermission(req: Request, res: Response, next: NextFunction) {
  const { role } = req.body;

  if (role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  console.log("✅ User is admin, access granted.");
  next();
}
