import cron from 'node-cron';
import { getRandomTrivia } from '../services/apiService.ts';
import { sendSummaryEmail } from '../services/emailService.ts';
import { getUsers } from '../utils/getUsersUtils.ts';

// Ejecutar todos los días a las 8:00 AM
cron.schedule('*/5 * * * *', async () => {
  console.log('⏰ Ejecutando tarea diaria 8:00 AM...');
  try {
    const fact = await getRandomTrivia();

    const emailBody = `
      <h2>Trivia diaria</h2>
      <p>${fact}</p>
    `;

    const users = await getUsers();

    if(users.length === 0) {
      console.log('❌ No hay usuarios para enviar el correo');
      return;
    }

    const allEmails = users.map(u => u.email).join(', ');

    await sendSummaryEmail(emailBody, allEmails);

    console.log('✅ Correo enviado con éxito');
  } catch (error) {
    console.error('❌ Error en tarea diaria:', error);
  }
});