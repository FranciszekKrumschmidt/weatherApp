import { Router, Request, Response } from 'express';
import { getDB } from '../database';
const router = Router();


router.get('/', async (req: Request, res: Response) => {


  const API_KEY = process.env.WEATHER_API_KEY;
  const targetDate = req.query.date as string;
  const targetCity = req.query.city as string;
  if (!targetDate) {
    return res.status(400).json({ error:'Enter correct date' });
  }
  const db = getDB();
  const cities = [targetCity];
  const responseData: any = {};
  const today = new Date().toISOString().split('T')[0];
  try {
    
    // new method -> check for up-to-date (from today) in a database, load form api if there isn't
    for (const city of cities) {
      const row = await db.get(
        'SELECT * FROM weather_forecast WHERE city = ? AND forecast_date = ?',
        [city, targetDate],
      );
      let useCache = false;

      if (row) {
        const lastUpdatedStr = row.last_updated.split(' ')[0];
        if (targetDate < today || lastUpdatedStr === today) useCache = true;
      }
      if (useCache) {
        responseData[city.toLowerCase()] = {
          temp: row.average_temp,
          condition: row.description,
        };
      } else {
        let apiUrl = '';
        if (targetDate < today) {
          apiUrl = `http://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${city}&dt=${targetDate}`;
        } else {
          apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=14`;
        }
        const apiRes = await fetch(apiUrl);
        const apiData = await apiRes.json();

        const targetDay = apiData.forecast?.forecastday?.find((d: any) => d.date === targetDate);

        if (targetDay) {
          const temp = targetDay.day.avgtemp_c;
          const condition = targetDay.day.condition.text;

          await db.run(
            `INSERT OR REPLACE INTO weather_forecast (city, forecast_date, description, average_temp, last_updated)
                         VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`,
            [city, targetDate, condition, temp],
          );

          responseData[city.toLowerCase()] = { temp, condition };
        } else {
          responseData[city.toLowerCase()] = null;
        }
      }
    }
    res.json(responseData);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch forecast data' });
  }
});

export const forecastWeatherRouter = router;