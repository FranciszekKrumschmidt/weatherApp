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

router.get('/', async (req: Request, res: Response) => {
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

export const realtimeWeatherRouter = router;