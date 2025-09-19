import { Router } from "express";
import { readdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import emailTestRoutes from "./emailTest.routes.ts";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PATH_ROUTER = join(__dirname, ".");


const cleanFileName = (fileName: string) => {
    return fileName.split(".").shift();
};



export async function initRoutes() {
  // aquí ya debes estar importando otras rutas (books, users, etc.)
  router.use("/api", emailTestRoutes);
}

export const router: Router = Router();

