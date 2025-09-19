import axios from 'axios';
import { logger } from '../utils/logger.ts';

// coordenadas Medellín
const latMedellin = 6.2518;
const lonMedellin = -75.5636;

// coordenadas Bogotá
const latBogota = 4.60971;
const lonBogota = -74.08175;


const API_URL_MEDELLIN = `https://api.open-meteo.com/v1/forecast?latitude=${latMedellin}&longitude=${lonMedellin}&current_weather=true`;
const API_URL_BOGOTA = `https://api.open-meteo.com/v1/forecast?latitude=${latBogota}&longitude=${lonBogota}&current_weather=true`;

export async function getAllWeathers() {
    try{
        const [medellinWeather, bogotaWeather] = await Promise.all([
            axios.get(API_URL_MEDELLIN),
            axios.get(API_URL_BOGOTA)
        ]);

        logger.info("Weathers obtained correctly")

        return {
            first_city: "Medellín",
            first_city_weather: medellinWeather.data.current_weather.temperature,
            second_city_weather: "Bogotá",
            second_weather: bogotaWeather.data.current_weather.temperature
        }
    } catch(err) {
        logger.error(`Error obtaining weathers: ${(err as Error).message}`);
        return { error: "External information could not be obtained" }
    }
}

export async function getMedellinWeather() {
    try {
        const response = await axios.get(API_URL_MEDELLIN);
        logger.info("Medellin's weather obtained correctly");

        return {
            city: "Medellín",
            weather: response.data.current_weather.temperature
        };
    } catch(err) {
        logger.error(`Error obtaining Medellin's weather: ${(err as Error).message}`);
        return { error: "External information could not be obtained" };
    }
}

export async function getBogotaWeather(){
    try{
        const response = await axios.get(API_URL_BOGOTA);
        logger.info("Bogota's weather obtained correctly");

        return {
            city: "Bogotá",
            weather: response.data.current_weather.temperature
        };
    } catch(err) {
        logger.error(`Error obtaining Bogota's weather: ${(err as Error).message}`);
        return { error: "External information could not be obtained" };
    }
}