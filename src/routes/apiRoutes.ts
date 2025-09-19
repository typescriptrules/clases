import { Router } from "express";
import { getData } from "../controllers/apiController";
import { testEmail } from "../controllers/apiController";

const router: Router = Router();

router.get("/data", getData);
router.get("/test-email", testEmail);

export default router;
