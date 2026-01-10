

import React, { useState, useMemo } from 'react';
import { Artist, View, RosterForecastReport, Release } from '../types';
import { generateRosterForecastReport } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { TrendingUpIcon } from './icons/TrendingUpIcon';
import { DollarSignIcon } from './icons/DollarSignIcon';
import { TrophyIcon } from './icons/TrophyIcon';

interface RosterForecastingProps {
    artists: Artist[];
    allReleases: Release[];
    setView: (view: View) => void;
    forecast: RosterForecastReport | null;
    onUpdateForecast: (forecast: RosterForecastReport | null) => void;
}

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-card border border-dark-border rounded-lg min-h-[400px]">
        <svg className="animate-spin h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-light-text mt-4">Forecasting Roster Performance...</h3>
        <p className="text-medium-text mt-1">Our AI is analyzing historical data and market trends across your entire roster.</p>
    </div>
);

const StatCard = ({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) => (
    <div className="bg-dark-card border border-dark-border rounded-lg p-6">
        <div className="flex items-center gap-4">
            <div className="bg-dark-border p-3 rounded-full">{icon}</div>
            <div>
                <p className="text-3xl font-bold text-light-text">{value}</p>
                <p className="text-medium-text text-sm">{label}</p>
            </div>
        </div>
    </div>
);

export const RosterForecasting = ({ artists, allReleases, setView, forecast, onUpdateForecast }: RosterForecastingProps) => {
    const [forecastPeriod, setForecastPeriod] = useState<number>(6);
    const [totalBudget, setTotalBudget] = useState<string>('10000');
    const [keyEvents, setKeyEvents] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const breakoutArtist = useMemo(() => {
        if (!forecast) return null;
        return artists.find(a => a.id === forecast.breakoutArtistId);
    }, [forecast, artists]);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        onUpdateForecast(null);
        try {
            const result = await generateRosterForecastReport(
                artists,
                allReleases,
                forecastPeriod,
                parseInt(totalBudget) || 0,
                keyEvents
            );
            onUpdateForecast(result);
        } catch (err: any) {
            setError(err.message || 'Failed to generate roster forecast.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-8">
            <button onClick={() => setView('dashboard')} className="text-medium-text hover:text-light-text">&larr; Back to Dashboard</button>
            <div className="text-center">
                <h1 className="text-3xl font-bold text-light-text">Roster Forecast Report</h1>
                <p className="text-medium-text mt-1">Predict future performance across all artists to help allocate budgets and resources.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <form onSubmit={handleGenerate} className="bg-dark-card border border-dark-border rounded-lg p-6 space-y-6 sticky top-4">
                        <h3 className="text-xl font-bold text-light-text">Forecast Briefing</h3>
                        <div>
                            <label htmlFor="period" className="block text-sm font-medium text-medium-text mb-1">Forecast Period</label>
                            <select id="period" value={forecastPeriod} onChange={e => setForecastPeriod(Number(e.target.value))} className="w-full bg-dark-bg p-3 rounded-lg border border-dark-border">
                                <option value={3}>Next 3 Months</option>
                                <option value={6}>Next 6 Months</option>
                                <option value={12}>Next 12 Months</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="totalBudget" className="block text-sm font-medium text-medium-text mb-1">Total Roster Marketing Budget (USD)</label>
                            <input id="totalBudget" type="number" value={totalBudget} onChange={e => setTotalBudget(e.target.value)} min="0" step="1000" className="w-full bg-dark-bg p-3 rounded-lg border border-dark-border" placeholder="e.g., 10000" />
                        </div>
                        <div>
                            <label htmlFor="keyEvents" className="block text-sm font-medium text-medium-text mb-1">Upcoming Roster-Wide Events (Optional)</label>
                            <textarea id="keyEvents" value={keyEvents} onChange={e => setKeyEvents(e.target.value)} rows={3} className="w-full bg-dark-bg p-3 rounded-lg border border-dark-border" placeholder="e.g., Label showcase, holiday campaign, major sync placements..." />
                        </div>
                        <button type="submit" disabled={isLoading} className="w-full bg-brand-purple font-bold py-3 rounded-lg flex items-center justify-center disabled:opacity-50">
                            <SparklesIcon className="w-5 h-5 mr-2" />
                            {isLoading ? 'Generating...' : 'Generate Roster Forecast'}
                        </button>
                    </form>
                </div>
                <div className="lg:col-span-2">
                    {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4">{error}</p>}
                    {isLoading && <LoadingState />}
                    {forecast && (
                        <div className="space-y-6">
                             <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                                <h3 className="text-xl font-bold text-light-text mb-2">AI Strategy Summary</h3>
                                <p className="text-sm text-medium-text">{forecast.summary}</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <StatCard label="Total Forecasted Revenue" value={`$${(forecast.totalForecastedRevenue / 100).toLocaleString()}`} icon={<DollarSignIcon className="w-6 h-6 text-brand-purple" />} />
                                <StatCard label="Projected ROI" value={`${forecast.projectedRoi > 0 ? '+' : ''}${forecast.projectedRoi.toFixed(1)}%`} icon={<TrendingUpIcon className="w-6 h-6 text-brand-purple" />} />
                                <StatCard label="Predicted Breakout Artist" value={breakoutArtist?.name || 'N/A'} icon={<TrophyIcon className="w-6 h-6 text-brand-purple" />} />
                            </div>
                            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                                <h3 className="text-xl font-bold text-light-text mb-4">Artist Breakdown</h3>
                                <div className="space-y-4">
                                    {forecast.artistForecasts.map(af => (
                                        <div key={af.artistId} className="bg-dark-bg border border-dark-border rounded-lg p-4">
                                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                                <p className="font-bold text-lg text-light-text">{af.artistName}</p>
                                                <div className="flex gap-4 text-right">
                                                    <div>
                                                        <p className="text-xs text-medium-text">Est. Revenue</p>
                                                        <p className="font-semibold text-green-400">${(af.forecastedRevenue / 100).toLocaleString()}</p>
                                                    </div>
                                                     <div>
                                                        <p className="text-xs text-medium-text">Suggested Budget</p>
                                                        <p className="font-semibold text-yellow-400">${(af.suggestedBudget / 100).toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-2 pt-2 border-t border-dark-border/50">
                                                <p className="text-xs font-semibold text-medium-text mb-1">Key Drivers:</p>
                                                <ul className="list-disc list-inside text-xs text-medium-text space-y-1">
                                                    {af.keyDrivers.map((driver, i) => <li key={i}>{driver}</li>)}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                     {!isLoading && !forecast && (
                        <div className="bg-dark-card border-2 border-dashed border-dark-border rounded-lg p-12 text-center h-full flex flex-col justify-center">
                            <TrendingUpIcon className="w-16 h-16 text-medium-text mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-light-text">See Your Roster's Future</h3>
                            <p className="text-medium-text mt-2">Fill out the briefing and let our AI create a financial forecast to guide your label's strategy.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};