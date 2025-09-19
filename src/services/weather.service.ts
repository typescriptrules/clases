import axios from 'axios';
import type {OpenWeatherResponse} from '../interfaces/openweather.interface.ts';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.WEATHER_API;
const BASE = 'https://api.openweathermap.org/data/2.5/weather';

export async function getWeatherByCity(city = 'Medellin') {
    if (!API_KEY) throw new Error('OPENWEATHER_API_KEY not defined');
    try {
        const res = await axios.get<OpenWeatherResponse>(BASE, {
            params: {q: city, appid: API_KEY, units: 'metric', lang: 'en'}
        });

        const data = res.data;
        return {
            location: data.name,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed * 3.6,
            icon: `https://openweathermap.org/img/wn/${data.weather[0]!.icon}@2x.png`,
        };
    } catch (err: any) {
        throw new Error(err?.response?.data?.message || err.message);
    }
}