import cron from "node-cron";
import axios from "axios";

export const startCron = () => {
    console.log('🔄 Iniciando cronjob interno...');
    
    // Cronjob cada 10 minutos para mostrar logs en consola
    cron.schedule("*/10 * * * *", async () => {
        console.log("📊 Resumen de logs cada 10 minutos:");
        try {
            const response = await axios.get("http://localhost:3002/logs");
            const logs = response.data;
            
            if (logs.length > 0) {
                console.log(`   Total de logs: ${logs.length}`);
                
                // Mostrar estadísticas básicas
                const methods = logs.reduce((acc: any, log: string) => {
                    try {
                        const parsed = JSON.parse(log);
                        acc[parsed.method] = (acc[parsed.method] || 0) + 1;
                    } catch {
                        // Si no se puede parsear, contar como 'unknown'
                        acc['unknown'] = (acc['unknown'] || 0) + 1;
                    }
                    return acc;
                }, {});
                
                console.log(`   Métodos HTTP:`, methods);
            } else {
                console.log("   No hay logs registrados");
            }
        } catch (error: any) {
            console.error("❌ Error obteniendo logs:", error.message);
        }
    });
    
    console.log('✅ Cronjob interno iniciado (cada 10 minutos)');
};