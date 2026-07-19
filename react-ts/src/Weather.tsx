import { useState, useEffect } from 'react';

export function Weather() {
    // variables for weather in gliwice right now
    const [weatherDescriptionGliwice, setWeatherDescriptionGliwice] = useState("--");
    const [temperatureGliwice, setTemperatureGliwice] = useState("--");
    const [feelsLikeGliwice, setFeelsLikeGliwice] = useState("--");

    // weather in Hamburg right now
    const [weatherDescriptionHamburg, setWeatherDescriptionHamburg] = useState("--");
    const [temperatureHamburg, setTemperatureHamburg] = useState("--");
    const [feelsLikeHamburg, setFeelsLikeHamburg] = useState("--");
    
    const [selectedDate, setSelectedDate] = useState("");

    // weather forecast
    const [forecastGliwice, setForecastGliwice] = useState<{ temp: String, condition: string} | null>(null);
    const [forecastHamburg, setForecastHamburg] = useState<{ temp: String, condition: string} | null>(null);
    const [forecastMessage, setForecastMessage] = useState("");

    useEffect(() => {
      const getWeatherData = async () => {
          try {
            // Fetch data from expressjs backend for weather right now
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
            console.error("error fetching realtime weather data: ",error);
          }
      };
      getWeatherData();
    }, [])
    const showForecast = async () => {
      try {
        // Fetch data from expressjs backend for weather forecast for the next 14 days
        const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${baseURL}/api/v1/weather/forecast-weather`);

        if (!response.ok) {
          throw new Error('Network response not ok');
        }

        const data = await response.json();

        // select a day for which to show the forecast (for a date selected in date selector)
        const targetDayGliwice = data.gliwice.forecast.find((day: any) => day.date === selectedDate);
        const targetDayHamburg = data.hamburg.forecast.find((day: any) => day.date === selectedDate);

        if (targetDayGliwice && targetDayHamburg){
          setForecastGliwice(targetDayGliwice);
          setForecastHamburg(targetDayHamburg);
          setForecastMessage(`Showing forecast for: ${selectedDate}`);
        }
        else {
          setForecastGliwice(targetDayGliwice);
          setForecastHamburg(targetDayHamburg);
          setForecastMessage(`No forecast avalible for ${selectedDate}`);
        }
      } catch(error) {
        console.error("error fetching weather forecast data: ",error);
      }
    };






    return (
        <div className="flex justify-center flex-col gap-4 items-center">
          <div>
            <label htmlFor="start-date" className='font-semibold'>
              Select a date
            </label>
            <input id='start-date'
                  type='date'
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className='border border-gray-300 p-2 rounded-md'
            />
            <p className='text-gray-600'>
              You picked: <span className='font-bold'>{selectedDate}</span>
            </p>
            <button id="show_forecast" onClick={showForecast}>Show weather forecast for that day</button>
          </div>
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
    
      <div className="text-xl font-bold pt-8">
            {forecastMessage}
      </div>
      {forecastGliwice && forecastHamburg && (
        <>
          <h1 className='text-xl font-bold'>Gliwice, Poland</h1>
          <section>
            <h2>{forecastGliwice.condition}</h2>
            <h2>Average Temperature: {forecastGliwice.temp}</h2>
          </section>
          <h1 className='text-xl font-bold'>Hamburg, Germany</h1>
          <section>
            <h2>{forecastHamburg.condition}</h2>
            <h2>Average Temperature: {forecastHamburg.temp}</h2>
          </section>
        </>
      )}
    </div>
    );
}