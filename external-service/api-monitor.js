import axios from 'axios';
import cron from 'node-cron';
import fs from 'fs';
import nodemailer from 'nodemailer';

// Configuración simple
const API_URL = 'http://localhost:3002';
const LOG_FILE = './logs/api-logs.txt';
const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASS = process.env.EMAIL_PASS
const EMAIL_TO = process.env.EMAIL_TO

// Crear directorio de logs
if (!fs.existsSync('./logs')) {
    fs.mkdirSync('./logs');
}

// Función para hacer peticiones a la API
async function hacerPeticiones() {
    console.log('🔄 Haciendo peticiones a la API...');
    
    const endpoints = [
        { url: '/users', metodo: 'GET' },
        { url: '/books', metodo: 'GET' },
        { url: '/users/performance-test', metodo: 'GET' }
    ];

    for (const endpoint of endpoints) {
        try {
            const inicio = Date.now();
            const response = await axios.get(`${API_URL}${endpoint.url}`);
            const tiempo = Date.now() - inicio;
            
            const log = `${new Date().toISOString()} - ${endpoint.metodo} ${endpoint.url} - Status: ${response.status} - Tiempo: ${tiempo}ms\n`;
            
            console.log(`✅ ${endpoint.url} - ${response.status} (${tiempo}ms)`);
            fs.appendFileSync(LOG_FILE, log);
            
        } catch (error) {
            const log = `${new Date().toISOString()} - ${endpoint.metodo} ${endpoint.url} - ERROR: ${error.message}\n`;
            console.log(`❌ ${endpoint.url} - ERROR`);
            fs.appendFileSync(LOG_FILE, log);
        }
    }
}

// Función para enviar email con logs
async function enviarEmail() {
    console.log('📧 Enviando email con logs...');
    
    try {
        const transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS
            }
        });

        // Leer logs del día
        const logs = fs.readFileSync(LOG_FILE, 'utf8');
        const logsHoy = logs.split('\n').filter(line => 
            line.includes(new Date().toISOString().split('T')[0])
        ).join('\n');

        const mailOptions = {
            from: EMAIL_USER,
            to: EMAIL_TO,
            subject: `📊 Logs de API - ${new Date().toLocaleDateString()}`,
            html: `
                <h2>Logs de la API</h2>
                <p>Fecha: ${new Date().toLocaleDateString()}</p>
                <pre>${logsHoy}</pre>
            `,
            attachments: [{
                filename: `logs-${new Date().toISOString().split('T')[0]}.txt`,
                content: logsHoy
            }]
        };

        await transporter.sendMail(mailOptions);
        console.log('✅ Email enviado correctamente');
        
    } catch (error) {
        console.log('❌ Error enviando email:', error.message);
    }
}

// Configurar cron jobs
console.log('🚀 Iniciando servicio de monitoreo de API...');

// Cada 2 minutos: hacer peticiones
cron.schedule('*/2 * * * *', () => {
    hacerPeticiones();
});

// Cada día a las 8:00 AM: enviar email
cron.schedule('0 8 * * *', () => {
    enviarEmail();
});

console.log('✅ Servicio iniciado');
console.log('📅 Peticiones cada 2 minutos');
console.log('📧 Email diario a las 8:00 AM');
console.log('Presiona Ctrl+C para detener');

// Ejecutar una vez al inicio
hacerPeticiones();
