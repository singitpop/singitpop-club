
import React, { useState } from 'react';
import { View } from '../types';
import { calculateTourLogistics } from '../services/geminiService';
import { CalculatorIcon } from './icons/CalculatorIcon';
import { MapIcon } from './icons/MapIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface TourProfitCalculatorProps {
    setView: (view: View) => void;
}

export const TourProfitCalculator = ({ setView }: TourProfitCalculatorProps) => {
    const [stops, setStops] = useState('');
    const [crewSize, setCrewSize] = useState(4);
    const [vehicleType, setVehicleType] = useState('Van');
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCalculate = async () => {
        if (!stops.trim()) {
            setError('Please enter at least two cities.');
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            const stopsList = stops.split(',').map(s => s.trim());
            const analysis = await calculateTourLogistics(stopsList, crewSize, vehicleType);
            setResult(analysis);
        } catch (e: any) {
            setError(e.message || 'Calculation failed.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-6 max-w-5xl mx-auto">
            <button onClick={() => setView('tour-planner')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Tour Planner</button>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-light-text flex items-center justify-center gap-3">
                    <CalculatorIcon className="w-8 h-8 text-brand-purple" />
                    Tour Profit Calculator
                </h1>
                <p className="text-medium-text mt-2">Estimate gas, hotels, and break-even points using real-time data.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 bg-dark-card border border-dark-border rounded-lg p-6 h-fit">
                    <h3 className="text-xl font-bold text-light-text mb-4">Trip Details</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-medium-text mb-1">Route (comma separated cities)</label>
                            <textarea 
                                value={stops}
                                onChange={(e) => setStops(e.target.value)}
                                placeholder="e.g., Los Angeles, Las Vegas, Phoenix, San Diego"
                                rows={4}
                                className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-medium-text mb-1">Crew Size (including you)</label>
                            <input 
                                type="number" 
                                value={crewSize}
                                onChange={(e) => setCrewSize(Number(e.target.value))}
                                className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text"
                                min="1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-medium-text mb-1">Vehicle</label>
                            <select 
                                value={vehicleType}
                                onChange={(e) => setVehicleType(e.target.value)}
                                className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text"
                            >
                                <option value="Sedan">Sedan</option>
                                <option value="Van">Van / Sprinter</option>
                                <option value="Bus">Tour Bus</option>
                            </select>
                        </div>
                        <button 
                            onClick={handleCalculate} 
                            disabled={isLoading} 
                            className="w-full bg-brand-purple text-white font-bold py-3 rounded-lg flex items-center justify-center disabled:opacity-50"
                        >
                            <SparklesIcon className="w-5 h-5 mr-2" />
                            {isLoading ? 'Crunching Numbers...' : 'Calculate Costs'}
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-2 bg-dark-card border border-dark-border rounded-lg p-6 flex flex-col min-h-[500px]">
                    <h3 className="text-xl font-bold text-light-text mb-4 flex items-center gap-2">
                        <MapIcon className="w-6 h-6 text-brand-purple" /> Logistics Report
                    </h3>
                    {error && <p className="text-red-400 mb-4">{error}</p>}
                    
                    {isLoading ? (
                        <div className="flex-grow flex flex-col items-center justify-center text-center p-8">
                            <div className="w-16 h-16 border-4 border-brand-purple border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-medium-text animate-pulse">Checking gas prices and hotel rates...</p>
                        </div>
                    ) : result ? (
                        <div className="prose prose-sm prose-invert max-w-none flex-grow overflow-y-auto pr-2" dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, '<br/>') }} />
                    ) : (
                        <div className="flex-grow flex flex-col items-center justify-center text-center text-medium-text p-8 border-2 border-dashed border-dark-border rounded-lg bg-dark-bg/30">
                            <CalculatorIcon className="w-16 h-16 mb-4 opacity-50" />
                            <p>Enter your route details to get a financial breakdown.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
