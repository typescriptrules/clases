import cron from 'node-cron';
import { getFactService } from '../services/fact.services.ts'
import { sendEmail } from '../utils/email.utils.ts';

cron.schedule('0 15 20 * * *', async () => {
    const fact = await getFactService();
    await sendEmail(
        'angiemarin0707@gmail.com',
        'Datos curiosos diarios sobre gatos ',
        `<h2>Frase del día</h2>
            <p>${fact}</p>
            <small>Enviada automáticamente todos los días</small>
         `
    );
});

