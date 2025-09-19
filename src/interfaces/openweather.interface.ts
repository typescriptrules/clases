export interface OpenWeatherResponse {
    weather: { id: number; main: string; description: string; icon: string }[];
    main: { temp: number; humidity: number };
    wind: { speed: number };
    sys: { country: string; };
    name: string;
}