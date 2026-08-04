
type ControlsGridProps = {
    selectedDate: string;
    showForecast: () => void;
    isLoading: boolean;
    forecastMessage: string;
    setSelectedDate: (date: string) => void;
}

export function ControlsGrid({selectedDate, showForecast, isLoading, forecastMessage, setSelectedDate}:ControlsGridProps) {

    return (
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
    )
}