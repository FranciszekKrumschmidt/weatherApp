import { error } from 'console';
import { Router, Request, Response } from 'express';
const router = Router()
const BASE_URL = 'http://api.weatherapi.com/v1'

interface WeatherResponse {
    location: {
        name: string;
        country: string;
    };
    current: {
        temp_c: number;
        feelslike_c: number;
        condition: {
            text: string;
        }
    };
}

interface ForecastResponse {
    location: {
        name: string;
        country: string;
    };
    forecast: {
        forecastday: Array<{
            date: string;
            day: {
                avgtemp_c: number;
                condition: {
                    text: string;
                };
            };
        }>;
    };
}

router.get('/realtime-weather', async (req: Request, res: Response) => {
    const API_KEY = process.env.WEATHER_API_KEY
    try {
        const [gliwiceRes, hamburgRes] = await Promise.all([
            fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=Gliwice`),
            fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=Hamburg`),
        ])
        
        if (!gliwiceRes.ok || !hamburgRes.ok) {
            throw new Error('Falied to fetch data from WeatherAPI');
        }
        
        const gliwiceData: WeatherResponse = await gliwiceRes.json();
        const hamburgData: WeatherResponse = await hamburgRes.json();
        
        res.json({
            gliwice: {
                description: gliwiceData.current.condition.text,
                temperature: `${gliwiceData.current.temp_c}°C`,
                feelslike: `${gliwiceData.current.feelslike_c}°C`
            },
            hamburg: {
                description: hamburgData.current.condition.text,
                temperature: `${hamburgData.current.temp_c}°C`,
                feelslike: `${hamburgData.current.feelslike_c}°C`
            }
        })
    } catch (error){
        console.error(error);
        res.status(500).json({error: "Failed to fetch real time data"});
    }
});

router.get('/forecast-weather', async (req: Request, res: Response) => {
    const API_KEY = process.env.WEATHER_API_KEY
    try {
        const [gliwiceRes, hamburgRes] = await Promise.all([
            fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=Gliwice&days=14`),
            fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=Hamburg&days=14`),
        ])

        if (!gliwiceRes.ok || !hamburgRes.ok) {
            throw new Error('Falied to fetch data from WeatherAPI');
        }

        const gliwiceData: ForecastResponse = await gliwiceRes.json();
        const hamburgData: ForecastResponse = await hamburgRes.json();

        res.json({
            gliwice: {
                // Mapping over the array of days to get a clean list
                forecast: gliwiceData.forecast.forecastday.map(day => ({
                    date: day.date,
                    temp: `${day.day.avgtemp_c}°C`,
                    condition: day.day.condition.text
                }))
            },
            hamburg: {
                forecast: hamburgData.forecast.forecastday.map(day => ({
                    date: day.date,
                    temp: `${day.day.avgtemp_c}°C`,
                    condition: day.day.condition.text
                }))
            }
        })
    } catch (error){
        console.error(error);
        res.status(500).json({error: "Failed to fetch real time data"});
    }
});

export const weather = router;