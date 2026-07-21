import { useWeather } from './useWeather';

// helper function that returns icons to show instead of written description 
const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('sun') || lowerCondition.includes('clear')) return '☀️';
    if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) return '🌧️';
    if (lowerCondition.includes('cloud') || lowerCondition.includes('overcast')) return '☁️';
    if (lowerCondition.includes('snow')) return '❄️';
    if (lowerCondition.includes('thunder')) return '⛈️';
    return '🌤️';
};

export function Weather() {
    // load data in useWeather.ts 
    const {
        gliwiceNow,
        hamburgNow,
        selectedDate,
        setSelectedDate,
        isLoading,
        forecastMessage,
        forecastsGliwice,
        forecastsHamburg,
        showForecast
    } = useWeather();

    return (
        <div className="min-h-screen bg-slate-100 p-6 font-sans text-slate-800">
            <div className="max-w-5xl mx-auto space-y-10">
                
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Weather Dashboard</h1>
                    <p className="text-slate-500 mt-2">Real-time conditions and forecasts</p>
                </div>

                {/* Realtime weather */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-center justify-between hover:shadow-md transition">
                        <div>
                            <h2 className="text-xl font-bold text-slate-700">Gliwice, PL</h2>
                            <p className="text-slate-500 capitalize">{gliwiceNow?.description || "--"}</p>
                            <p className="text-sm text-slate-400 mt-2">Feels like: {gliwiceNow?.feelslike || "--"}°C</p>
                        </div>
                        <div className="text-5xl font-black text-blue-600">
                            {gliwiceNow?.temperature || "--"}°
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-center justify-between hover:shadow-md transition">
                        <div>
                            <h2 className="text-xl font-bold text-slate-700">Hamburg, DE</h2>
                            <p className="text-slate-500 capitalize">{hamburgNow?.description || "--"}</p>
                            <p className="text-sm text-slate-400 mt-2">Feels like: {hamburgNow?.feelslike || "--"}°C</p>
                        </div>
                        <div className="text-5xl font-black text-blue-600">
                            {hamburgNow?.temperature || "--"}°
                        </div>
                    </div>
                </div>

                {/* Controls - date selector */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-center space-y-4">
                    <label htmlFor="start-date" className="block text-lg font-semibold text-slate-700">
                        Select start date for 7-day forecast
                    </label>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <input 
                            id="start-date"
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="border-2 border-slate-300 px-4 py-2 rounded-xl focus:outline-none focus:border-blue-500 transition"
                        />
                        <button 
                            onClick={showForecast} 
                            disabled={isLoading}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl transition shadow-sm disabled:opacity-50"
                        >
                            {isLoading ? "Fetching..." : "Show 7-Day Forecast"}
                        </button>
                    </div>
                    {forecastMessage && (
                        <p className="text-slate-600 font-medium pt-2">{forecastMessage}</p>
                    )}
                </div>

                {/* Next 7 days forecast */}
                {forecastsGliwice.length > 0 && (
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-4 pl-2">Gliwice</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                                {forecastsGliwice.map((day, index) => (
                                    day ? (
                                        <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex flex-col items-center text-center">
                                            <p className="text-sm font-semibold text-slate-500 mb-2">
                                                {new Date(day.date).toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' })}
                                            </p>
                                            <div className="text-3xl mb-2">{getWeatherIcon(day.condition)}</div>
                                            <p className="text-2xl font-bold text-slate-800">{day.temp}°</p>
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

                        <div>
                            <h3 className="text-2xl font-bold mb-4 pl-2">Hamburg</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                                {forecastsHamburg.map((day, index) => (
                                    day ? (
                                        <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex flex-col items-center text-center">
                                            <p className="text-sm font-semibold text-slate-500 mb-2">
                                                {new Date(day.date).toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' })}
                                            </p>
                                            <div className="text-3xl mb-2">{getWeatherIcon(day.condition)}</div>
                                            <p className="text-2xl font-bold text-slate-800">{day.temp}°</p>
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
                    </div>
                )}
            </div>
        </div>
    );
}