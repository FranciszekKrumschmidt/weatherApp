import { Router, Request, Response } from 'express';
const router = Router();
const BASE_URL = 'http://api.weatherapi.com/v1';

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
  const API_KEY = process.env.WEATHER_API_KEY;
  const city = req.query.city as string;
  if (!API_KEY) {
    return res.status(500).json({ error: 'No WeatherAPI key! put it in .env file' });
  }

  if (!city) {
    return res.status(400).json({ error: 'No city specified' });
  }
  try {
    const params = new URLSearchParams(
      { 'key': API_KEY,
        'q': city },
    );
    const [cityRes] = await Promise.all([
      fetch(`${BASE_URL}/current.json?${params.toString()}`),
    ]);
        
    if (!cityRes.ok) {
      throw new Error('Falied to fetch data from WeatherAPI');
    }
        
    const cityData: WeatherResponse = await cityRes.json();
        
    res.json({
      description: cityData.current.condition.text,
      temperature: `${cityData.current.temp_c}°C`,
      feelslike: `${cityData.current.feelslike_c}°C`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch real time data' });
  }
});

export const realtimeWeatherRouter = router;