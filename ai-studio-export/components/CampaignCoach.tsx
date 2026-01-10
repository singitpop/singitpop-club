

import React, { useState, useEffect } from 'react';
import { Release, View, Artist, CoachingSuggestion } from '../types';
import { getCampaignCoachingAdvice, generateSinglePromoPost } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { CoachIcon } from './icons/CoachIcon';

interface CampaignCoachProps {
    releases: Release[];
    artist: Artist;
    setView: (view: View) => void;
}

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-card border border-dark-border rounded-lg min-h-[400px]">
        <svg className="animate-spin h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-light-text mt-4">Consulting Your AI Coach...</h3>
        <p className="text-medium-text mt-1">Analyzing real-time campaign data for optimization opportunities.</p>
    </div>
);

const GeneratedContentModal = ({ content, onClose }: { content: string, onClose: () => void }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-dark-card rounded-lg p-6 w-full max-w-lg border border-dark-border" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-light-text mb-2">Generated Content</h3>
                <textarea readOnly value={content} rows={8} className="w-full bg-dark-bg p-2 rounded-md border border-dark-border" />
                <div className="flex gap-2 mt-4">
                    <button onClick={handleCopy} className="flex-1 bg-dark-border font-bold py-2 rounded-lg">{copied ? 'Copied!' : 'Copy'}</button>
                    <button onClick={onClose} className="flex-1 bg-brand-purple text-white font-bold py-2 rounded-lg">Close</button>
                </div>
            </div>
        </div>
    );
};

export const CampaignCoach = ({ releases, artist, setView }: CampaignCoachProps) => {
    const [selectedReleaseId, setSelectedReleaseId] = useState<string>(releases[0]?.id.toString() || '');
    const [suggestions, setSuggestions] = useState<CoachingSuggestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [actionState, setActionState] = useState<{ loading: boolean, content: string | null }>({ loading: false, content: null });

    const handleFetchAdvice = async () => {
        const release = releases.find(r => r.id === parseInt(selectedReleaseId));
        if (!release) return;

        setIsLoading(true);
        setError('');
        setSuggestions([]);

        try {
            // Simulate dynamic analytics data for more varied suggestions
            const mockAnalytics = {
                igEngagement: (Math.random() * 5 + 1).toFixed(1),
                igTrend: Math.random() > 0.5 ? 'up' : 'down',
                tiktokViews: Math.floor(Math.random() * 50000),
                tiktokTrend: Math.random() > 0.5 ? 'up' : 'down',
                streamVelocity: Math.floor(Math.random() * 100),
                streamTrend: Math.random() > 0.5 ? 'up' : 'down',
                ctr: (Math.random() * 2).toFixed(1),
            };
            const result = await getCampaignCoachingAdvice(release, mockAnalytics);
            setSuggestions(result);
        } catch (e: any) {
            setError(e.message || 'Failed to get coaching advice.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (selectedReleaseId) {
            handleFetchAdvice();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedReleaseId]);

    const handleAction = async (suggestion: CoachingSuggestion) => {
        if (suggestion.action.type === 'GENERATE_CAPTION') {
            const release = releases.find(r => r.id === suggestion.action.payload.releaseId);
            const platform = suggestion.action.payload.platform;
            if (release && platform) {
                setActionState({ loading: true, content: null });
                try {
                    const content = await generateSinglePromoPost(release, platform);
                    setActionState({ loading: false, content: content });
                } catch (e) {
                    console.error(e);
                    setActionState({ loading: false, content: 'Failed to generate content.' });
                }
            }
        } else {
            alert(`Action '${suggestion.action.label}' is a demo and not yet implemented.`);
        }
    };

    const categoryColors: Record<CoachingSuggestion['category'], string> = {
        'Engagement': 'border-blue-500',
        'Growth': 'border-green-500',
        'Monetization': 'border-yellow-500',
        'Content': 'border-purple-500',
    };

    return (
        <>
            {actionState.content && <GeneratedContentModal content={actionState.content} onClose={() => setActionState({ loading: false, content: null })} />}
            <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
                <button onClick={() => setView('dashboard')} className="text-medium-text hover:text-light-text">&larr; Back to Dashboard</button>
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-light-text">AI Campaign Coach</h1>
                    <p className="text-medium-text mt-1">Real-time advice to optimize your release campaign.</p>
                </div>
                
                <div className="bg-dark-card border border-dark-border rounded-lg p-4 flex flex-col sm:flex-row gap-4 items-center">
                    <div className="flex-grow w-full">
                        <label htmlFor="release-select" className="block text-sm font-medium text-medium-text mb-1">Select Campaign to Analyze</label>
                        <select id="release-select" value={selectedReleaseId} onChange={e => setSelectedReleaseId(e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3">
                            {releases.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
                        </select>
                    </div>
                    <button onClick={handleFetchAdvice} disabled={isLoading} className="w-full sm:w-auto bg-dark-border font-bold py-3 px-6 rounded-lg flex items-center justify-center disabled:opacity-50 flex-shrink-0">
                        <SparklesIcon className="w-5 h-5 mr-2" />
                        Refresh
                    </button>
                </div>

                {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg text-center">{error}</p>}
                {isLoading && <LoadingState />}

                {!isLoading && suggestions.length === 0 && !error && (
                    <div className="text-center p-12 bg-dark-card border-2 border-dashed border-dark-border rounded-lg">
                        <CoachIcon className="w-16 h-16 mx-auto text-medium-text" />
                        <h2 className="mt-4 text-xl font-bold text-light-text">All Clear!</h2>
                        <p className="mt-2 text-medium-text max-w-md mx-auto">The AI coach hasn't found any immediate issues for this campaign. Check back later or select another release.</p>
                    </div>
                )}
                
                <div className="space-y-4">
                    {suggestions.map(suggestion => (
                        <div key={suggestion.id} className={`bg-dark-card border-l-4 ${categoryColors[suggestion.category]} rounded-r-lg p-6`}>
                            <p className="text-sm font-bold text-medium-text">{suggestion.category.toUpperCase()}</p>
                            <h3 className="text-lg font-bold text-light-text mt-1">{suggestion.observation}</h3>
                            <p className="text-sm text-medium-text mt-2">{suggestion.suggestion}</p>
                            <button onClick={() => handleAction(suggestion)} disabled={actionState.loading} className="mt-4 bg-brand-purple text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center text-sm disabled:opacity-50">
                                {actionState.loading ? 'Working...' : suggestion.action.label}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};