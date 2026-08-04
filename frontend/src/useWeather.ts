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

const port = import.meta.env.VITE_API_PORT || "5000"
const baseURL = `http://localhost:${port}`;
export function useWeather() {
    const [gliwiceNow, setGliwiceNow] = useState<WeatherNow | null>(null);
    const [hamburgNow, setHamburgNow] = useState<WeatherNow | null>(null);
    
    // default date set to today
    const [selectedDate, setSelectedDate] = useState<string>(getTodayString());
    
    const [isLoading, setIsLoading] = useState(false);
    const [forecastMessage, setForecastMessage] = useState("");
    
    const [forecastsGliwice, setForecastsGliwice] = useState<ForecastDay[]>([]);
    const [forecastsHamburg, setForecastsHamburg] = useState<ForecastDay[]>([]);
    const fetchForecastData = async (startDate: string) => {
        setIsLoading(true);
        setForecastMessage("Loading 7-day forecast...");
        
        try {
            const datesToFetch = getNext7Days(startDate);
            const cities = ["Gliwice", "Hamburg"];
            const citiesPromises = [];
            for (const city of cities){
                const cityPromises = datesToFetch.map(async (date) => {
                    const params = new URLSearchParams(
                        {'date': date,
                        'city': city}
                    );
                    const response = await fetch(`${baseURL}/api/v1/forecast-weather?${params.toString()}`);
                    if (response.ok) {
                        const data = await response.json();
                        return {city, date, data}
                    }
                    return {city, date, data:null};
                });
                citiesPromises.push(...cityPromises);
            }

            const resultsToCheck = await Promise.all(citiesPromises);
            const results = resultsToCheck.filter(r => r.data !== null);
            const gliwice7Days = results
                .filter(r => r.city === "Gliwice")
                .map(r => {
                    const cityData = r.data["gliwice"]; 
                    return cityData ? { date: r.date, ...cityData } : null;
                });

            const hamburg7Days = results
                .filter(r => r.city === "Hamburg")
                .map(r => {
                    const cityData = r.data["hamburg"];
                    return cityData ? { date: r.date, ...cityData } : null;
                });

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
        const cities = ['Gliwice', 'hamburg'];

        const fetchRealtime = async (city:string) => {
            try {
                const params = new URLSearchParams({ 'city': city });
                const response = await fetch(`${baseURL}/api/v1/realtime-weather?${params.toString()}`);
                if (!response.ok) throw new Error('Network response not ok');
                
                const data = await response.json();
                return (data);
            } catch(error) {
                console.error("Error fetching realtime weather:", error);
                return (null);
            }
        };

        const loadAllWeather = async () => {
            const [gliwiceData, hamburgData] = await Promise.all([
                fetchRealtime(cities[0]),
                fetchRealtime(cities[1])
            ]);
    
            setGliwiceNow(gliwiceData);
            setHamburgNow(hamburgData);
            
            fetchForecastData(getTodayString());
        };
        loadAllWeather();
        
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