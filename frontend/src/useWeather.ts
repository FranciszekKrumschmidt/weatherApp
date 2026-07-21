//
// helper function for loading data from backend to frontend
//
import { useState, useEffect } from 'react';

export type WeatherNow = {
    description: string;
    temperature: number | string;
    feelslike: number | string;
};

export type ForecastDay = {
    date: string;
    temp: number | string;
    condition: string;
} | null;

const getTodayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

const getNext7Days = (startDate: string) => {
    const [year, month, day] = startDate.split('-').map(Number);
    const dates = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(year, month - 1, day + i);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        dates.push(`${yyyy}-${mm}-${dd}`);
    }
    return dates;
};

export function useWeather() {
    const [gliwiceNow, setGliwiceNow] = useState<WeatherNow | null>(null);
    const [hamburgNow, setHamburgNow] = useState<WeatherNow | null>(null);
    
    // default date set to today
    const [selectedDate, setSelectedDate] = useState<string>(getTodayString());
    
    const [isLoading, setIsLoading] = useState(false);
    const [forecastMessage, setForecastMessage] = useState("");

    const [forecastsGliwice, setForecastsGliwice] = useState<ForecastDay[]>([]);
    const [forecastsHamburg, setForecastsHamburg] = useState<ForecastDay[]>([]);
    const port = import.meta.env.VITE_API_PORT || "5000"
    const baseURL = `http://localhost:${port}`;
    const fetchForecastData = async (startDate: string) => {
        setIsLoading(true);
        setForecastMessage("Loading 7-day forecast...");
        
        try {

            const datesToFetch = getNext7Days(startDate);
            const results = [];

            for (const date of datesToFetch) {
                const response = await fetch(`${baseURL}/api/v1/forecast-weather?date=${date}`);
                if (response.ok) {
                    const data = await response.json();
                    results.push({ date, data });
                }
            }

            const gliwice7Days = results.map(r => r.data.gliwice ? { date: r.date, ...r.data.gliwice } : null);
            const hamburg7Days = results.map(r => r.data.hamburg ? { date: r.date, ...r.data.hamburg } : null);

            setForecastsGliwice(gliwice7Days);
            setForecastsHamburg(hamburg7Days);
            setForecastMessage(`7-Day Forecast starting from: ${startDate}`);
        } catch(error) {
            console.error("Error fetching weather forecast data:", error);
            setForecastMessage("Error loading forecast.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchRealtime = async () => {
            try {
                const response = await fetch(`${baseURL}/api/v1/realtime-weather`);
                if (!response.ok) throw new Error('Network response not ok');
                
                const data = await response.json();
                setGliwiceNow(data.gliwice);
                setHamburgNow(data.hamburg);
            } catch(error) {
                console.error("Error fetching realtime weather:", error);
            }
        };

        fetchRealtime();
        fetchForecastData(getTodayString());
        
    }, []);

    const showForecast = () => {
        if (!selectedDate) return;
        fetchForecastData(selectedDate);
    };

    return {
        gliwiceNow,
        hamburgNow,
        selectedDate,
        setSelectedDate,
        isLoading,
        forecastMessage,
        forecastsGliwice,
        forecastsHamburg,
        showForecast
    };
}