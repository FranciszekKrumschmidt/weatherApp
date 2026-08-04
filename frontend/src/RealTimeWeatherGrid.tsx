type WeatherData = {
    description?: string;
    temperature?: string | number;
    feelslike?: string   | number;
}

type RealtimeWeatherGridProps = {
    gliwiceNow: WeatherData | null;
    hamburgNow: WeatherData | null;
}

export function RealtimeWeatherGrid({gliwiceNow, hamburgNow}:RealtimeWeatherGridProps) {
    const currentCities = [
        {title: "Gliwice, PL", weather: gliwiceNow},
        {title: "Hamburg, DE", weather: hamburgNow}
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentCities.map((city, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-center justify-between hover:shadow-md transition">
                    <div>
                        <h2 className="text-xl font-bold text-slate-700">{city.title}</h2>
                        <p className="text-slate-500 capitalize">{city.weather?.description || "--"}</p>
                        <p className="text-sm text-slate-400 mt-2">Feels like: {city.weather?.feelslike || "--"}</p>
                    </div>
                    <div className="text-5xl font-black text-blue-600">
                        {city.weather?.temperature || "--"}
                    </div>
                </div>
            ))}
        </div>
    )
}