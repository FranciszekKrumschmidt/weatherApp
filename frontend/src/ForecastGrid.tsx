type WeatherData = {
    condition: string;
    temp?: string | number;
    date: string;
}

type ForecastWeatherGridProps = {
    forecastsGliwice: (WeatherData | null)[];
    forecastsHamburg: (WeatherData | null)[];
}

export const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('sun') || lowerCondition.includes('clear')) return '☀️';
    if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) return '🌧️';
    if (lowerCondition.includes('cloud') || lowerCondition.includes('overcast')) return '☁️';
    if (lowerCondition.includes('snow')) return '❄️';
    if (lowerCondition.includes('thunder')) return '⛈️';
    return '🌤️';
};

export function ForecastWeatherGrid({forecastsGliwice, forecastsHamburg}:ForecastWeatherGridProps) {
    const currentCities = [
        {title: "Gliwice, PL", forecast: forecastsGliwice},
        {title: "Hamburg, DE", forecast: forecastsHamburg}
    ];
    return (
        <div className="space-y-8">
            {currentCities.map((city, index) => (
            <div key={index}>
                <h3 className="text-2xl font-bold mb-4 pl-2">{city.title}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {city.forecast && city.forecast.map((day, index) => (
                        day ? (
                            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex flex-col items-center text-center">
                                <p className="text-sm font-semibold text-slate-500 mb-2">
                                    {new Date(day.date).toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' })}
                                </p>
                                <div className="text-3xl mb-2">{getWeatherIcon(day.condition)}</div>
                                <p className="text-2xl font-bold text-slate-800">{day.temp}°C</p>
                                <p className="text-xs text-slate-500 mt-1 capitalize leading-tight">{day.condition}</p>
                            </div>
                        ) : (
                            <div key={index} className="bg-slate-100 rounded-xl p-4 flex flex-col items-center justify-center border border-dashed border-slate-300 text-slate-400 text-sm">
                                No Data
                            </div>
                        )
                    ))}
                </div>
            </div>
            ))}
        </div>
    )
}