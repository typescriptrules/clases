import "dotenv/config";
import axios from "axios";
import cron from "node-cron";
import nodemailer from "nodemailer";

// Validar variables de entorno
const validateEnv = () => {
    const required = ['EMAIL_USER', 'EMAIL_PASS', 'EMAIL_TO'];
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
        console.error('❌ Variables de entorno faltantes:', missing.join(', '));
        console.error('💡 Configura estas variables en tu archivo .env');
        process.exit(1);
    }
};

// Configuración de transporte de correo
const transporter = nodemailer.createTransporter({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Función para obtener logs de la API
const fetchLogs = async () => {
    try {
        const res = await axios.get("http://localhost:3002/logs");
        return res.data;
    } catch (err: any) {
        console.error("❌ Error obteniendo logs:", err.message);
        return [];
    }
};

// Función para generar estadísticas de logs
const generateStats = (logs: string[]) => {
    if (logs.length === 0) return null;
    
    const stats = {
        total: logs.length,
        methods: {} as Record<string, number>,
        statusCodes: {} as Record<number, number>,
        avgResponseTime: 0,
        errors: 0
    };
    
    let totalResponseTime = 0;
    
    logs.forEach(log => {
        try {
            const parsed = JSON.parse(log);
            
            // Contar métodos
            stats.methods[parsed.method] = (stats.methods[parsed.method] || 0) + 1;
            
            // Contar códigos de estado
            if (parsed.statusCode) {
                stats.statusCodes[parsed.statusCode] = (stats.statusCodes[parsed.statusCode] || 0) + 1;
                
                // Contar errores
                if (parsed.statusCode >= 400) {
                    stats.errors++;
                }
            }
            
            // Sumar tiempo de respuesta
            if (parsed.responseTime) {
                totalResponseTime += parsed.responseTime;
            }
        } catch {
            // Si no se puede parsear, contar como método desconocido
            stats.methods['unknown'] = (stats.methods['unknown'] || 0) + 1;
        }
    });
    
    stats.avgResponseTime = logs.length > 0 ? Math.round(totalResponseTime / logs.length) : 0;
    
    return stats;
};

// Función para enviar logs por correo
const sendEmail = async (logs: string[]) => {
    if (!logs || logs.length === 0) {
        console.log("📭 No hay logs para enviar");
        return;
    }

    const stats = generateStats(logs);
    const date = new Date().toLocaleString('es-ES');
    
    // Generar contenido del email
    const emailContent = `
📊 REPORTE DE LOGS - ${date}

📈 ESTADÍSTICAS:
• Total de peticiones: ${stats?.total || 0}
• Errores detectados: ${stats?.errors || 0}
• Tiempo promedio de respuesta: ${stats?.avgResponseTime || 0}ms

🔍 MÉTODOS HTTP:
${stats?.methods ? Object.entries(stats.methods).map(([method, count]) => `• ${method}: ${count}`).join('\n') : 'N/A'}

📊 CÓDIGOS DE ESTADO:
${stats?.statusCodes ? Object.entries(stats.statusCodes).map(([code, count]) => `• ${code}: ${count}`).join('\n') : 'N/A'}

📝 ÚLTIMOS LOGS:
${logs.slice(-10).map(log => {
    try {
        const parsed = JSON.parse(log);
        return `[${parsed.timestamp}] ${parsed.method} ${parsed.url} - ${parsed.statusCode} (${parsed.responseTime}ms)`;
    } catch {
        return log;
    }
}).join('\n')}

${logs.length > 10 ? `\n... y ${logs.length - 10} logs más` : ''}
    `.trim();

    try {
        await transporter.sendMail({
            from: `"Log Monitor" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            subject: `📊 Reporte de Logs - ${date}`,
            text: emailContent,
        });
        console.log("✅ Correo enviado con logs");
    } catch (err: any) {
        console.error("❌ Error enviando correo:", err.message);
    }
};

// Función principal del cronjob
const processLogs = async () => {
    console.log("🔄 Ejecutando cronjob de monitoreo...");
    const logs = await fetchLogs();
    await sendEmail(logs);
};

// Validar configuración al iniciar
validateEnv();

console.log('🚀 Iniciando servicio de monitoreo...');
console.log(`📧 Email destinatario: ${process.env.EMAIL_TO}`);
console.log(`📧 Email remitente: ${process.env.EMAIL_USER}`);

// Cronjob cada 5 minutos
cron.schedule("*/5 * * * *", processLogs, {
    scheduled: true,
    timezone: "America/Mexico_City"
});

// También ejecutar una vez al iniciar (opcional)
setTimeout(processLogs, 5000);

console.log('✅ Servicio de monitoreo iniciado correctamente');
console.log('⏰ Cronjob configurado: cada 5 minutos');
console.log('💡 Presiona Ctrl+C para detener el servicio');

// Manejo de señales para cierre graceful
process.on('SIGINT', () => {
    console.log('\n🛑 Deteniendo servicio de monitoreo...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Deteniendo servicio de monitoreo...');
    process.exit(0);
});