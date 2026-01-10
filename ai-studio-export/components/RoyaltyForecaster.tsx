import React, { useState, useMemo } from 'react';
import { Artist, Release, View, RoyaltyForecast, RoyaltyEntry } from '../types';
import { generateRoyaltyForecast } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CalculatorIcon } from './icons/CalculatorIcon';
import { DollarSignIcon } from './icons/DollarSignIcon';
import { TrendingUpIcon } from './icons/TrendingUpIcon';

interface RoyaltyForecasterProps {
    artist: Artist;
    releases: Release[];
    setView: (view: View) => void;
}

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-card border border-dark-border rounded-lg min-h-[400px]">
        <svg className="animate-spin h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-light-text mt-4">Forecasting Future Royalties...</h3>
        <p className="text-medium-text mt-1">Our AI is analyzing historical data and market trends.</p>
    </div>
);

export const RoyaltyForecaster = ({ artist, releases, setView }: RoyaltyForecasterProps) => {
    const [selectedReleaseId, setSelectedReleaseId] = useState<string>('all');
    const [forecastPeriod, setForecastPeriod] = useState<number>(3);
    const [marketingSpend, setMarketingSpend] = useState<string>('');
    const [keyEvents, setKeyEvents] = useState<string>('');
    
    const [forecast, setForecast] = useState<RoyaltyForecast | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const historicalData: RoyaltyEntry[] = useMemo(() => {
        const data: Record<string, number> = {};
        const relevantReleases = selectedReleaseId === 'all'
            ? releases
            : releases.filter(r => r.id === parseInt(selectedReleaseId));

        relevantReleases.forEach(release => {
            (release.royaltyData || []).forEach(entry => {
                data[entry.month] = (data[entry.month] || 0) + entry.earnings;
            });
        });

        return Object.entries(data)
            .map(([month, earnings]) => ({ month, earnings }))
            .sort((a, b) => a.month.localeCompare(b.month));
    }, [releases, selectedReleaseId]);

    const chartData = useMemo(() => {
        const historical = historicalData.map(d => ({ ...d, type: 'Historical' }));
        const forecasted = forecast ? forecast.forecastedMonths.map(d => ({ ...d, type: 'Forecast' })) : [];
        return [...historical, ...forecasted];
    }, [historicalData, forecast]);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (historicalData.length === 0) {
            setError('No historical royalty data available for the selected release(s) to base a forecast on.');
            return;
        }
        setIsLoading(true);
        setError('');
        setForecast(null);
        try {
            const result = await generateRoyaltyForecast(
                historicalData,
                forecastPeriod,
                parseInt(marketingSpend) || 0,
                keyEvents
            );
            setForecast(result);
        } catch (err: any) {
            setError(err.message || 'Failed to generate forecast.');
        } finally {
            setIsLoading(false);
        }
    };

    const totalForecasted = forecast ? forecast.forecastedMonths.reduce((sum, item) => sum + item.earnings, 0) : 0;
    const roi = marketingSpend && totalForecasted > 0 ? ((totalForecasted - (parseInt(marketingSpend) * 100)) / (parseInt(marketingSpend) * 100)) * 100 : 0;

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-8">
            <button onClick={() => setView('business-toolkit')} className="text-medium-text hover:text-light-text">&larr; Back to Toolkit</button>
            <div className="text-center">
                <h1 className="text-3xl font-bold text-light-text">AI Royalty Forecaster</h1>
                <p className="text-medium-text mt-1">Predict potential income based on historical data and marketing plans.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <form onSubmit={handleGenerate} className="bg-dark-card border border-dark-border rounded-lg p-6 space-y-6 sticky top-4">
                        <h3 className="text-xl font-bold text-light-text">Forecast Parameters</h3>
                        <div>
                            <label htmlFor="release" className="block text-sm font-medium text-medium-text mb-1">Release(s) to Forecast</label>
                            <select id="release" value={selectedReleaseId} onChange={e => setSelectedReleaseId(e.target.value)} className="w-full bg-dark-bg p-3 rounded-lg border border-dark-border">
                                <option value="all">All Releases</option>
                                {releases.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="period" className="block text-sm font-medium text-medium-text mb-1">Forecast Period</label>
                            <select id="period" value={forecastPeriod} onChange={e => setForecastPeriod(Number(e.target.value))} className="w-full bg-dark-bg p-3 rounded-lg border border-dark-border">
                                <option value={3}>Next 3 Months</option>
                                <option value={6}>Next 6 Months</option>
                                <option value={12}>Next 12 Months</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="marketingSpend" className="block text-sm font-medium text-medium-text mb-1">Planned Marketing Spend (USD, Optional)</label>
                            <input id="marketingSpend" type="number" value={marketingSpend} onChange={e => setMarketingSpend(e.target.value)} min="0" step="100" className="w-full bg-dark-bg p-3 rounded-lg border border-dark-border" placeholder="e.g., 500" />
                        </div>
                        <div>
                            <label htmlFor="keyEvents" className="block text-sm font-medium text-medium-text mb-1">Upcoming Key Events (Optional)</label>
                            <textarea id="keyEvents" value={keyEvents} onChange={e => setKeyEvents(e.target.value)} rows={3} className="w-full bg-dark-bg p-3 rounded-lg border border-dark-border" placeholder="e.g., Tour starting next month, major playlist placement secured..." />
                        </div>
                        <button type="submit" disabled={isLoading} className="w-full bg-brand-purple font-bold py-3 rounded-lg flex items-center justify-center disabled:opacity-50">
                            <SparklesIcon className="w-5 h-5 mr-2" />
                            {isLoading ? 'Generating...' : 'Generate Forecast'}
                        </button>
                    </form>
                </div>
                <div className="lg:col-span-2">
                    {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4">{error}</p>}
                    {isLoading && <LoadingState />}
                    {forecast && (
                        <div className="space-y-6">
                             <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                                <h3 className="text-xl font-bold text-light-text mb-4">Earnings Forecast</h3>
                                <div className="w-full h-80">
                                    <ResponsiveContainer>
                                        <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#2D2D2D" />
                                            <XAxis dataKey="month" stroke="#A0A0A0" fontSize={12} />
                                            <YAxis tickFormatter={(val) => `$${(val / 100).toLocaleString()}`} stroke="#A0A0A0" fontSize={12} />
                                            <Tooltip formatter={(value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value / 100)} contentStyle={{ backgroundColor: '#1E1E1E' }} />
                                            <Legend />
                                            <Line type="monotone" dataKey="earnings" data={chartData.filter(d => d.type === 'Historical')} name="Historical Earnings" stroke="#1DB954" strokeWidth={2} />
                                            <Line type="monotone" dataKey="earnings" data={chartData.filter(d => d.type === 'Forecast')} name="Forecasted Earnings" stroke="#8A2BE2" strokeWidth={2} strokeDasharray="5 5" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                             </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-dark-card border border-dark-border p-4 rounded-lg">
                                    <p className="text-sm text-medium-text">Estimated Earnings ({forecastPeriod} mo.)</p>
                                    <p className="text-3xl font-bold text-light-text">${(totalForecasted / 100).toLocaleString()}</p>
                                </div>
                                <div className="bg-dark-card border border-dark-border p-4 rounded-lg">
                                    <p className="text-sm text-medium-text">Potential Marketing ROI</p>
                                    <p className={`text-3xl font-bold ${roi > 0 ? 'text-green-400' : 'text-red-400'}`}>{roi > 0 ? '+' : ''}{roi.toFixed(1)}%</p>
                                </div>
                            </div>
                            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                                <h3 className="text-xl font-bold text-light-text mb-2">AI Analysis</h3>
                                <p className="text-sm text-medium-text mb-4">{forecast.summary}</p>
                                <h4 className="font-semibold text-light-text mb-2">Key Growth Drivers</h4>
                                <ul className="list-disc list-inside text-sm text-medium-text space-y-1">
                                    {forecast.keyDrivers.map((driver, i) => <li key={i}>{driver}</li>)}
                                </ul>
                            </div>
                        </div>
                    )}
                     {!isLoading && !forecast && (
                        <div className="bg-dark-card border-2 border-dashed border-dark-border rounded-lg p-12 text-center h-full flex flex-col justify-center">
                            <CalculatorIcon className="w-16 h-16 text-medium-text mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-light-text">Forecast Your Future</h3>
                            <p className="text-medium-text mt-2">Set your parameters and let our AI predict your potential royalty earnings.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
