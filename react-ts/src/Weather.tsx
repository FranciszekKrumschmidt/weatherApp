import { useState, useEffect } from 'react';

export function Weather() {
    const [weatherDescriptionGliwice, setWeatherDescriptionGliwice] = useState("--");
    const [temperatureGliwice, setTemperatureGliwice] = useState("--");
    const [feelsLikeGliwice, setFeelsLikeGliwice] = useState("--");
    const [weatherDescriptionHamburg, setWeatherDescriptionHamburg] = useState("--");
    const [temperatureHamburg, setTemperatureHamburg] = useState("--");
    const [feelsLikeHamburg, setFeelsLikeHamburg] = useState("--");
    

    useEffect(() => {
      const getWeatherData = async () => {
          try {
            // Fetch data from expressjs backend
            const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${baseURL}/api/v1/weather/realtime-weather`);

            if (!response.ok) {
              throw new Error('Network response not ok');
            }

            const data = await response.json();

            setWeatherDescriptionGliwice(data.gliwice.description);
            setTemperatureGliwice(data.gliwice.temperature);
            setFeelsLikeGliwice(data.gliwice.feelslike);

            setWeatherDescriptionHamburg(data.hamburg.description);
            setTemperatureHamburg(data.hamburg.temperature);
            setFeelsLikeHamburg(data.hamburg.feelslike);
          } catch(error) {
            console.error("error fetching weather data: ",error);
          }
      };
      getWeatherData();
    }, [])




    return (
        <div className="flex justify-center flex-col gap-4 items-center">
      <div>
        Simple Weather Application
      </div>
      <h1>Weather in Gliwice, Poland:</h1>
      <section>
        <h2>{weatherDescriptionGliwice}</h2>
        <h2>Temperature: {temperatureGliwice}</h2>
        <h2>Feels like:  {feelsLikeGliwice}</h2>
      </section>
      <h1>Weather in Hamburg, Germany:</h1>
      <section>
        <h2>{weatherDescriptionHamburg}</h2>
        <h2>Temperature: {temperatureHamburg}</h2>
        <h2>Feels like:  {feelsLikeHamburg}</h2>
      </section>
    </div>
    );
}