import fs from 'fs/promises';

export async function readLogFile(): Promise<string> {
    try {
        const data = await fs.readFile("logs/app.log", "utf-8");
        return data;
    } catch (err) {
        return "No se pudo leer el archivo de logs";
    }
}