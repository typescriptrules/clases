import cron from 'node-cron';
import { makeAndLogRequest } from '../utils/fetchAndLog.js';
import { sendMonthlyEmail } from '../utils/emailSender.js';


// Todas las peticiones cada 5 minutos
cron.schedule('*/5 * * * *', async () => {
    await makeAndLogRequest('GET', '/users');
    await makeAndLogRequest('POST', '/users', {
        name: 'Nuevo Usuario',
        email: 'nuevo@example.com'
    });
    await makeAndLogRequest('PUT', '/users/2', {
        name: 'Usuario Actualizado'
    });
    await makeAndLogRequest('DELETE', '/users/2');
});


// Enviar email con logs el día 1 de cada mes a las 8 AM
cron.schedule('0 8 1 * *', async () => {
    await sendMonthlyEmail();
});


console.log('Cronjobs configurados. Escuchando tareas...');