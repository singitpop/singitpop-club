import React, { useState } from 'react';
import { Artist, TourStop, Release } from '../types';
import { generateAiSetlist, generateShowVisuals } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';

interface LivePerformanceProps {
    artist: Artist;
    tourStops: TourStop[];
    releases: Release[];
    onUpdateTourStop: (stopId: number, updates: Partial<TourStop>) => void;
}

const loadingMessages = [
    "Analyzing local streaming data...",
    "Finding your fans' favorite tracks...",
    "Crafting the perfect setlist flow...",
    "Optimizing for maximum crowd engagement..."
];

const videoLoadingMessages = [
    "Syncing beats and visuals...",
    "Generating dynamic scenes for each song...",
    "Creating seamless transitions...",
    "Rendering your full visual show...",
    "This can take a few minutes..."
];

const LoadingState = ({ messages }: { messages: string[] }) => {
    const [messageIndex, setMessageIndex] = useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex(prev => (prev + 1) % messages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [messages]);

    return (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-bg rounded-lg">
            <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <h3 className="text-lg font-semibold text-light-text mt-4">Generating...</h3>
            <p className="text-medium-text mt-1 text-sm transition-opacity duration-500">{messages[messageIndex]}</p>
        </div>
    );
};


export const LivePerformance: React.FC<LivePerformanceProps> = ({ artist, tourStops, releases, onUpdateTourStop }) => {
    const [selectedStopId, setSelectedStopId] = useState<number | ''>(tourStops[0]?.id || '');
    const [isLoadingSetlist, setIsLoadingSetlist] = useState(false);
    const [setlistError, setSetlistError] = useState('');
    
    const [setlistText, setSetlistText] = useState('');
    const [isLoadingVisuals, setIsLoadingVisuals] = useState(false);
    const [visualsError, setVisualsError] = useState('');

    const selectedStop = tourStops.find(s => s.id === selectedStopId);
    const allTracks = releases.flatMap(r => r.tracks);

    const handleGenerateSetlist = async () => {
        if (!selectedStop) {
            setSetlistError('Please select a tour stop.');
            return;
        }
        if (allTracks.length === 0) {
            setSetlistError('No tracks found for this artist to generate a setlist.');
            return;
        }

        setIsLoadingSetlist(true);
        setSetlistError('');
        try {
            const result = await generateAiSetlist(selectedStop.city, allTracks);
            onUpdateTourStop(selectedStop.id, { aiSetlist: result });
        } catch (e: any) {
            setSetlistError(e.message || 'Failed to generate setlist.');
        } finally {
            setIsLoadingSetlist(false);
        }
    };
    
    const handleGenerateVisuals = async () => {
        if (!setlistText.trim()) {
            setVisualsError('Please enter a setlist.');
            return;
        }
        if (!selectedStop) {
            setVisualsError('Please select a tour stop to associate visuals with.');
            return;
        }
        
        setIsLoadingVisuals(true);
        setVisualsError('');
        try {
            const hasKey = await window.aistudio?.hasSelectedApiKey();
            if (!hasKey) {
                await window.aistudio?.openSelectKey();
            }
            const result = await generateShowVisuals(setlistText);
            onUpdateTourStop(selectedStop.id, { aiShowVisualsUrl: result });
        } catch (e: any) {
            setVisualsError(e.message || 'Failed to generate visuals.');
        } finally {
            setIsLoadingVisuals(false);
        }
    };

    return (
        <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-light-text">Live Performance Innovations</h1>
                <p className="text-medium-text mt-1">Connect the digital and physical worlds of your music.</p>
            </div>

            {/* AI Setlist Generator */}
            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                <h2 className="text-2xl font-bold text-light-text mb-2">AI Setlist Generator</h2>
                <p className="text-medium-text text-sm mb-4">Analyze local streaming data to generate a setlist optimized for maximum crowd engagement.</p>
                
                <div className="flex flex-col sm:flex-row gap-2">
                    <select
                        value={selectedStopId}
                        onChange={e => setSelectedStopId(Number(e.target.value))}
                        className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-sm"
                        disabled={isLoadingSetlist}
                    >
                        <option value="">-- Select a Tour Stop --</option>
                        {tourStops.map(stop => (
                            <option key={stop.id} value={stop.id}>{stop.city} - {stop.venue} ({new Date(stop.date).toLocaleDateString()})</option>
                        ))}
                    </select>
                    <button onClick={handleGenerateSetlist} disabled={!selectedStopId || isLoadingSetlist} className="bg-brand-purple text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center disabled:opacity-50">
                        <SparklesIcon className="w-5 h-5 mr-2" />
                        {isLoadingSetlist ? 'Generating...' : 'Generate Setlist'}
                    </button>
                </div>
                {setlistError && <p className="text-red-400 text-sm mt-2">{setlistError}</p>}
                
                {isLoadingSetlist && <div className="mt-4"><LoadingState messages={loadingMessages} /></div>}

                {selectedStop?.aiSetlist && !isLoadingSetlist && (
                    <div className="mt-6 pt-6 border-t border-dark-border grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-bold text-lg mb-2">Generated Setlist for {selectedStop.city}</h3>
                            <ol className="list-decimal list-inside bg-dark-bg p-4 rounded-lg space-y-2 text-light-text">
                                {selectedStop.aiSetlist.setlist.map((song, i) => <li key={i}>{song}</li>)}
                            </ol>
                        </div>
                        <div className="prose prose-sm max-w-none prose-invert">
                            <h3 className="!mb-2">Rationale</h3>
                            <div dangerouslySetInnerHTML={{ __html: selectedStop.aiSetlist.rationale.replace(/\n/g, '<br />') }} />
                        </div>
                    </div>
                )}
            </div>

            {/* AI-Generated Show Visuals */}
            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                <h2 className="text-2xl font-bold text-light-text mb-2">AI-Generated Show Visuals</h2>
                <p className="text-medium-text text-sm mb-4">Input your full setlist and the AI will generate a complete, timed, beat-synced visual show for artists without a dedicated VJ.</p>

                <textarea
                    value={setlistText}
                    onChange={e => setSetlistText(e.target.value)}
                    rows={8}
                    className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-sm"
                    placeholder="Enter your setlist, one song per line..."
                    disabled={isLoadingVisuals}
                />
                 <button onClick={handleGenerateVisuals} disabled={isLoadingVisuals || !setlistText} className="w-full mt-4 bg-brand-purple text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center disabled:opacity-50">
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    {isLoadingVisuals ? 'Generating...' : 'Generate Visuals'}
                </button>
                {visualsError && <p className="text-red-400 text-sm mt-2">{visualsError}</p>}
                
                {isLoadingVisuals && <div className="mt-4"><LoadingState messages={videoLoadingMessages} /></div>}

                {selectedStop?.aiShowVisualsUrl && !isLoadingVisuals && (
                    <div className="mt-6 pt-6 border-t border-dark-border">
                         <h3 className="font-bold text-lg mb-2">Your Generated Show Visuals</h3>
                         <div className="aspect-video bg-dark-bg rounded-lg">
                            <video src={selectedStop.aiShowVisualsUrl} controls autoPlay loop className="w-full h-full rounded-lg" />
                         </div>
                    </div>
                )}
            </div>
        </div>
    );
};