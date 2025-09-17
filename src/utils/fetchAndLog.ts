import axios from 'axios';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, '../../.env'),
});

const logsDir = path.resolve(__dirname, '../../logs'); // carpeta raíz


if (!existsSync(logsDir)) {
    mkdirSync(logsDir, { recursive: true });
}

function safeTimestamp() {
    return new Date().toISOString().replace(/[:.]/g, '-');
}

export async function makeAndLogRequest(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    body: any = {}
) {
    const baseUrl = process.env.API_URL || 'http://localhost:3000';
    const fullUrl = `${baseUrl}${endpoint}`;
    const timestamp = safeTimestamp();

    try {
        const response = await axios({
            method,
            url: fullUrl,
            data: body,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.FIXED_TOKEN}`,
                'X-Role': 'admin',
            },
        });

        const logData = {
            method,
            endpoint,
            status: response.status,
            timestamp,
            data: response.data,
        };

        const fileName = `log-${method}-${endpoint.replace(/\//g, '_')}-${timestamp}.json`;
        const logPath = path.resolve(logsDir, fileName);
        writeFileSync(logPath, JSON.stringify(logData, null, 2));
        console.log(`✅ Log GUARDADO en: ${logPath}`);
    } catch (error: any) {
        const logData = {
            method,
            endpoint,
            status: error.response?.status || 500,
            timestamp,
            error: error.message,
        };

        const fileName = `log-ERROR-${method}-${endpoint.replace(/\//g, '_')}-${timestamp}.json`;
        const logPath = path.resolve(logsDir, fileName);
        writeFileSync(logPath, JSON.stringify(logData, null, 2));
        console.error(`❌ ERROR haciendo ${method} a ${endpoint}: ${error.message}`);
        console.log(`⚠️ Log de ERROR GUARDADO en: ${logPath}`);
    }
}
