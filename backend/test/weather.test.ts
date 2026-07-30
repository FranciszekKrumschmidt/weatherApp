import request from 'supertest';

import app from '../src/app';

import { initDB } from '../src/database';

// helper function to get today as a date
const getTodayString = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

describe('Weather-Endpoints', () => {
  describe('GET /api/v1/realtime-weather', () => {
    it('responds with a realtime weather for Gliwice and Hamburg', async () => {
      const res = await request(app)
        .get('/api/v1/realtime-weather')
        .expect('Content-Type', /json/)
        .expect(200);

      // check if in response body there is data for both cities
      expect(res.body).toHaveProperty('gliwice');
      expect(res.body).toHaveProperty('hamburg');
          
      // check if both cities have temperature property
      expect(res.body.gliwice).toHaveProperty('temperature');
      expect(res.body.hamburg).toHaveProperty('temperature');

      // check if both cities have description property
      expect(res.body.hamburg).toHaveProperty('description');
      expect(res.body.gliwice).toHaveProperty('description');
    });
  });
  beforeAll(async () => {
    await initDB();
  });
  describe('GET /api/v1/forecast-weather', () => {
    it('responds with a weather forecast for Gliwice and Hamburg', async () => {
      const today = getTodayString();
      const res = await request(app)
        .get('/api/v1/forecast-weather')
        .query({ date: today })
        .expect('Content-Type', /json/)
        .expect(200);

      // check if in response body there is data for both cities
      expect(res.body).toHaveProperty('gliwice');
      expect(res.body).toHaveProperty('hamburg');
          
      // check if both cities have temperature property
      expect(res.body.gliwice).toHaveProperty('temp');
      expect(res.body.hamburg).toHaveProperty('temp');

      // check if both cities have description property
      expect(res.body.hamburg).toHaveProperty('condition');
      expect(res.body.gliwice).toHaveProperty('condition');
    });
  });

});