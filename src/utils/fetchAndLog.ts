import axios from 'axios';
import { writeFileSync, existsSync, mkdirSync } from 'fs';


export async function makeAndLogRequest(method: string, url: string, body?: any) {
    const fullUrl = `http://localhost:3000${url}`;


    try {
        const response = await axios({
            method,
            url: fullUrl,
            data: body,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.FIXED_TOKEN || 'secretonpm'}`,
                'X-Role': 'admin' || 'user'
            }
            ,
        });


        const folder = './src/logs';
        if (!existsSync(folder)) {
            mkdirSync(folder);
        }


        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = `${folder}/log-${method}-${url.replace(/\//g, '_')}-${timestamp}.json`;


        writeFileSync(fileName, JSON.stringify({ status: response.status, data: response.data }, null, 2));
        console.log(`✅ [${method}] ${url} → Guardado en ${fileName}`);
    } catch (error: any) {
        console.error(`❌ Error haciendo ${method} a ${url}:`, error.message);
    }
}