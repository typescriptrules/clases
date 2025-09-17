import cron from "node-cron";
import axios from "axios";
import { saveLog } from "../src/utils/logger.js";
import { sendEmailLogs } from "../src/utils/mailer.js";

// Funciones para consumir APIs
async function fetchBooks(user: string) {
  try {
    await axios.get("http://localhost:3002/books");
    saveLog("Books API", user);
  } catch (err) {
    console.error("❌ Error al consumir Books API", err);
  }
}

async function fetchUsers(user: string) {
  try {
    await axios.get("http://localhost:3002/users");
    saveLog("Users API", user);
  } catch (err) {
    console.error("❌ Error al consumir Users API", err);
  }
}

// Cron cada minuto
cron.schedule("* * * * *", async () => {
  console.log("⏰ Ejecutando cron job...");
  await fetchBooks("admin");
  await fetchUsers("user");
});

// Cron para enviar logs por correo cada minuto
cron.schedule("* * * * *", () => {
  console.log("📧 Enviando logs por correo...");
  sendEmailLogs();
});
