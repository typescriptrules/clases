import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";

const cwd = process.cwd();
const envPath = path.resolve(cwd, ".env");

console.log("cwd:", cwd);
console.log(".env path:", envPath);

// 1) ¿Existe y se puede leer el .env?
try {
  const raw = fs.readFileSync(envPath, "utf8");
  console.log(">>> .env file content (raw):\n", raw);
} catch (e: any) {
  console.error("No se pudo leer .env:", e.message);
}

// 2) Intentamos cargarlo explícitamente con dotenv y activar debug
const result = dotenv.config({ path: envPath, debug: true });
console.log("dotenv.config() result:", result);

// 3) Mostramos la variable en process.env
console.log("process.env.EMAIL_USER:", process.env.EMAIL_USER ?? "<undefined>");

