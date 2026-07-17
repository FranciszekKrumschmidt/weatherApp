import { useState } from 'react';

export function Weather() {
    const [weatherDescriptionGliwice, setWeatherDescriptionGliwice] = useState("Sunny");
    const [temperatureGliwice, setTemperatureGliwice] = useState("27°C");
    const [feelsLikeGliwice, setFeelsLikeGliwice] = useState("27°C");
    const [weatherDescriptionHamburg, setWeatherDescriptionHamburg] = useState("Sunny");
    const [temperatureHamburg, setTemperatureHamburg] = useState("27°C");
    const [feelsLikeHamburg, setFeelsLikeHamburg] = useState("27°C");
    
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