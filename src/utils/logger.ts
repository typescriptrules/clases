import fs from "fs";

export function saveLog(api: string, user: string) {
  const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024; // MB
  const log = `[${new Date().toLocaleString()}] API: ${api}, User: ${user}, Memory: ${memoryUsage.toFixed(2)} MB\n`;

  fs.appendFileSync("logs.txt", log, "utf-8");
  console.log("✅ Log guardado:", log.trim());
}

export function readLogs(): string {
  if (!fs.existsSync("logs.txt")) return "No hay logs disponibles.";
  return fs.readFileSync("logs.txt", "utf-8");
}
