import express from 'express';
// import { weather } from './weather';

import MessageResponse from '../interfaces/MessageResponse';
import { realtimeWeatherRouter } from './realtime-weather';
import { forecastWeatherRouter } from './forecast-weather';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

// router.use('/weather', weather);
router.use('/realtime-weather', realtimeWeatherRouter);
router.use('/forecast-weather', forecastWeatherRouter);

export default router;
