import fs from 'fs';
import path from 'path';

const logs: string[] = [];
const logFile = path.join(process.cwd(), 'logs', 'app-logs.json');

// Crear directorio de logs si no existe
const ensureLogDir = () => {
    const logDir = path.dirname(logFile);
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
};

// Cargar logs existentes al iniciar
const loadExistingLogs = () => {
    try {
        ensureLogDir();
        if (fs.existsSync(logFile)) {
            const fileContent = fs.readFileSync(logFile, 'utf8');
            const existingLogs = JSON.parse(fileContent);
            logs.push(...existingLogs);
        }
    } catch (error) {
        console.error('Error cargando logs existentes:', error);
    }
};

// Guardar logs en memoria y archivo
export const saveLog = (log: string) => {
    logs.push(log);
    
    // Guardar también en archivo
    try {
        ensureLogDir();
        fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));
    } catch (error) {
        console.error('Error guardando log en archivo:', error);
    }
};

// Obtener logs de memoria
export const getLogs = () => logs;

// Limpiar logs (útil para después de enviar por email)
export const clearLogs = () => {
    logs.length = 0;
    try {
        fs.writeFileSync(logFile, '[]');
    } catch (error) {
        console.error('Error limpiando logs:', error);
    }
};

// Obtener logs como objetos parseados
export const getParsedLogs = () => {
    return logs.map(log => {
        try {
            return JSON.parse(log);
        } catch {
            return { raw: log };
        }
    });
};

// Inicializar al cargar el módulo
loadExistingLogs();