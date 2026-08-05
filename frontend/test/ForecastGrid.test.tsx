import { describe, it, expect } from 'vitest';
import { getWeatherIcon } from '../src/ForecastGrid';

describe('getWeatherIcon', () => {
    it('should return sun icon', () => {
        const condition = 'Sunny';
        const result = getWeatherIcon(condition);
        expect(result).toBe('☀️')
    })
})