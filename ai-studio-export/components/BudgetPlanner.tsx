import React, { useState, useEffect } from 'react';
import { Artist, Release, View, BudgetPlan, BudgetItem } from '../types';
import { generateBudgetPlan } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface BudgetPlannerProps {
    artist: Artist;
    releases: Release[];
    setView: (view: View) => void;
    budgetPlan: BudgetPlan | null;
    onUpdateBudgetPlan: (plan: BudgetPlan | null) => void;
}

const COLORS = ['#8A2BE2', '#9333ea', '#a855f7', '#c084fc', '#d8b4fe'];

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-card border border-dark-border rounded-lg min-h-[400px]">
        <svg className="animate-spin h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-light-text mt-4">Forecasting Your Success...</h3>
        <p className="text-medium-text mt-1">Our AI is building a data-driven budget for your campaign.</p>
    </div>
);

export const BudgetPlanner = ({ artist, releases, setView, budgetPlan, onUpdateBudgetPlan }: BudgetPlannerProps) => {
    const [totalBudget, setTotalBudget] = useState(500);
    const [selectedReleaseId, setSelectedReleaseId] = useState<string>(releases[0]?.id.toString() || '');
    const [focus, setFocus] = useState('Awareness (Max Reach)');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        const release = releases.find(r => r.id === parseInt(selectedReleaseId));
        if (!release) {
            setError('Please select a valid release.');
            return;
        }
        setIsLoading(true);
        setError('');
        onUpdateBudgetPlan(null);
        try {
            const plan = await generateBudgetPlan(release, totalBudget, focus);
            onUpdateBudgetPlan(plan);
        } catch (err: any) {
            setError(err.message || 'Failed to generate budget.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-8">
            <button onClick={() => setView('business-toolkit')} className="text-medium-text hover:text-light-text">&larr; Back to Business Toolkit</button>
            <div className="text-center">
                <h1 className="text-3xl font-bold text-light-text">AI Budget Planner</h1>
                <p className="text-medium-text mt-1">Build campaign budgets and get ROI forecasts from historical data.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <form onSubmit={handleGenerate} className="bg-dark-card border border-dark-border rounded-lg p-6 space-y-6 sticky top-4">
                        <h3 className="text-xl font-bold text-light-text">Campaign Brief</h3>
                        <div>
                            <label htmlFor="totalBudget" className="block text-sm font-medium text-medium-text mb-1">Total Budget (USD)</label>
                            <input id="totalBudget" type="number" value={totalBudget} onChange={e => setTotalBudget(Number(e.target.value))} min="50" step="50" className="w-full bg-dark-bg p-3 rounded-lg border border-dark-border" />
                        </div>
                        <div>
                            <label htmlFor="release" className="block text-sm font-medium text-medium-text mb-1">Base on Release</label>
                            <select id="release" value={selectedReleaseId} onChange={e => setSelectedReleaseId(e.target.value)} className="w-full bg-dark-bg p-3 rounded-lg border border-dark-border">
                                {releases.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
                            </select>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-medium-text mb-1">Campaign Focus</label>
                            <select value={focus} onChange={e => setFocus(e.target.value)} className="w-full bg-dark-bg p-3 rounded-lg border border-dark-border">
                                <option>Awareness (Max Reach)</option>
                                <option>Engagement (Fan Interaction)</option>
                                <option>Conversion (Streams/Sales)</option>
                            </select>
                        </div>
                        <button type="submit" disabled={isLoading} className="w-full bg-brand-purple font-bold py-3 rounded-lg flex items-center justify-center disabled:opacity-50">
                            <SparklesIcon className="w-5 h-5 mr-2" />
                            {isLoading ? 'Generating...' : 'Generate Budget Plan'}
                        </button>
                    </form>
                </div>
                <div className="lg:col-span-2">
                    {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4">{error}</p>}
                    {isLoading && <LoadingState />}
                    {budgetPlan && (
                        <div className="space-y-6">
                             <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                                <h3 className="text-xl font-bold text-light-text mb-2">Strategy Summary</h3>
                                <p className="text-sm text-medium-text">{budgetPlan.summary}</p>
                            </div>
                             <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                                <h3 className="text-xl font-bold text-light-text mb-4">Budget Allocation</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                                    <div className="w-full h-64">
                                        <ResponsiveContainer>
                                            <PieChart>
                                                <Pie data={budgetPlan.items} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={80} label>
                                                    {budgetPlan.items.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip formatter={(value: number) => `$${(value / 100).toFixed(2)}`} contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #2D2D2D' }} />
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="space-y-4">
                                        {budgetPlan.items.map((item, index) => (
                                            <div key={item.category} className="flex items-center gap-3">
                                                <div style={{ backgroundColor: COLORS[index % COLORS.length] }} className="w-4 h-4 rounded-full flex-shrink-0"></div>
                                                <div>
                                                    <p className="font-semibold text-light-text">{item.category}</p>
                                                    <p className="text-sm font-bold text-medium-text">${(item.amount / 100).toFixed(2)} ({item.percentage}%)</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                             </div>
                             <div className="space-y-4">
                                {budgetPlan.items.map(item => (
                                    <div key={item.category} className="bg-dark-card border border-dark-border rounded-lg p-4">
                                        <h4 className="font-bold text-lg text-light-text">{item.category}</h4>
                                        <p className="text-sm text-medium-text mt-1">{item.description}</p>
                                        <p className="text-sm font-semibold text-brand-purple mt-2">Forecast: <span className="font-normal text-medium-text">{item.forecast}</span></p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                     {!isLoading && !budgetPlan && (
                        <div className="bg-dark-card border-2 border-dashed border-dark-border rounded-lg p-12 text-center h-full flex flex-col justify-center">
                            <h3 className="text-xl font-bold text-light-text">Your Budget Awaits</h3>
                            <p className="text-medium-text mt-2">Fill out the brief and let our AI create a professional marketing budget and forecast for your release.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};