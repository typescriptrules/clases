import cron from 'node-cron';
import {getWeatherByCity} from '../services/weather.service.ts';
import {sendWeatherEmail} from '../services/email.service.ts';
import logger from '../utils/logger.ts';
import dotenv from 'dotenv';

dotenv.config();

const CRON = process.env.CRON_SCHEDULE || '0 8 * * *';
const EMAIL_TO = process.env.EMAIL_TO || '';

export function startCronJobs() {
    cron.schedule(CRON, async () => {
        try {
            const weather = await getWeatherByCity('Medellin');
            const html = `
                            <h2>Weather report for ${weather.location}</h2>
                            <p><strong>Temperature:</strong> ${weather.temperature} °C</p>
                            <p><strong>Humidity:</strong> ${weather.humidity}%</p>
                            <p><strong>Wind speed:</strong> ${weather.windSpeed.toFixed(1)} km/h</p>
                            <img src="${weather.icon}" alt="weather icon" />
                        `;
            await sendWeatherEmail(EMAIL_TO, `Daily weather for ${weather.location}`, html, {weather});
        } catch (err: any) {
            logger.error({event: 'cron_error', error: err?.message || err});
        }
    });
}