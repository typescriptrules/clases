

import { Router } from "express";
import { sendTestEmail } from "../controllers/emailTest.controller.ts";

const router: Router = Router();

// POST http://localhost:3000/api/test-email
router.post("/test-email", sendTestEmail);

export default router;
