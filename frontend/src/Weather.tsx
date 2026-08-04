import { ControlsGrid } from './ControlsGrid';
import { ForecastWeatherGrid } from './ForecastGrid';
import { RealtimeWeatherGrid } from './RealTimeWeatherGrid';
import { useWeather } from './useWeather';

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

                <RealtimeWeatherGrid
                    gliwiceNow={gliwiceNow}
                    hamburgNow={hamburgNow}
                />
                <ControlsGrid
                    selectedDate={selectedDate}
                    showForecast={showForecast}
                    isLoading={isLoading}
                    forecastMessage={forecastMessage}
                    setSelectedDate={setSelectedDate}
                />
                <ForecastWeatherGrid
                    forecastsGliwice={forecastsGliwice}
                    forecastsHamburg={forecastsHamburg}
                />
            </div>
        </div>
    );
}