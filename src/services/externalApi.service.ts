import axios from "axios";

export const getWeatherService = async () => {
  try {
    const { data } = await axios.get("https://api.open-meteo.com/v1/forecast", {
      params: {
        latitude: 40.7128,    // Nueva York
        longitude: -74.006,   // coordenadas
        current_weather: true
      }
    });

    return data.current_weather;
  } catch (error) {
    console.error("Error fetching weather API:", error);
    throw new Error("Error fetching weather API");
  }
};
