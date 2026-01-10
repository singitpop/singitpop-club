
import React, { useState } from 'react';
import { Release, Track, View, ShortVideoEdit } from '../types';
import { generateShortVideoEdits } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';

interface ReelSyncProps {
    release: Release;
    track: Track;
    setView: (view: View) => void;
    onUpdateTrack: (trackId: number, updatedData: Partial<Track>) => void;
}

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-bg rounded-lg h-full">
        <svg className="animate-spin h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-light-text mt-4">Generating Short Prompts...</h3>
        <p className="text-medium-text mt-1">The AI is creating ideas for viral clips.</p>
    </div>
);

const durations: Array<15 | 30 | 60> = [15, 30, 60];

export const ReelSync = ({ release, track, setView, onUpdateTrack }: ReelSyncProps) => {
    const [selectedDurations, setSelectedDurations] = useState<Array<15 | 30 | 60>>(durations);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [generatedEdits, setGeneratedEdits] = useState<ShortVideoEdit[]>(track.shortVideoEdits || []);

    const handleDurationToggle = (duration: 15 | 30 | 60) => {
        setSelectedDurations(prev =>
            prev.includes(duration) ? prev.filter(d => d !== duration) : [...prev, duration]
        );
    };

    const handleGenerate = async () => {
        // Removed check for fullLyricVideoUrl since we are generating prompts based on text/concept now.
        if (selectedDurations.length === 0) return;
        setIsLoading(true);
        setError('');
        try {
            // Passing track lyrics as the "script" source
            const results = await generateShortVideoEdits(track.lyrics, selectedDurations);
            const newEdits: ShortVideoEdit[] = results.map(r => ({
                id: Date.now() + Math.random(),
                duration: r.duration as 15 | 30 | 60,
                prompt: r.prompt,
            }));
            setGeneratedEdits(newEdits);
            onUpdateTrack(track.id, { shortVideoEdits: newEdits });
        } catch (e: any) {
            setError(e.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
            <button onClick={() => setView('release-details')} className="text-medium-text hover:text-light-text">&larr; Back to Release</button>
            <div className="text-center">
                <h2 className="text-3xl font-bold text-light-text">Shorts Prompt Generator</h2>
                <p className="text-medium-text mt-1">Generate prompts for 15s, 30s, and 60s viral clips based on <span className="text-light-text font-semibold">"{track.title}"</span>.</p>
            </div>
            
            {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg">{error}</p>}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Controls */}
                <div className="space-y-6">
                    <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-light-text mb-2">Select Durations</h3>
                        <p className="text-xs text-medium-text mb-4">Choose which length clips you want prompts for.</p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            {durations.map(d => (
                                <label key={d} className="flex-1 flex items-center gap-3 p-3 bg-dark-bg rounded-lg border-2 border-dark-bg cursor-pointer has-[:checked]:border-brand-purple has-[:checked]:bg-brand-purple/10">
                                    <input type="checkbox" checked={selectedDurations.includes(d)} onChange={() => handleDurationToggle(d)} className="h-5 w-5 rounded bg-dark-border text-brand-purple" />
                                    <span className="font-semibold">{d} seconds</span>
                                </label>
                            ))}
                        </div>
                        <button onClick={handleGenerate} disabled={isLoading || selectedDurations.length === 0} className="w-full mt-6 bg-brand-purple text-white font-bold py-3 rounded-lg flex items-center justify-center disabled:opacity-50">
                            <SparklesIcon className="w-5 h-5 mr-2" />
                            {isLoading ? 'Generating...' : 'Generate Prompts'}
                        </button>
                    </div>
                </div>

                {/* Results */}
                <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-light-text mb-4">Generated Prompts</h3>
                    {isLoading && <LoadingState />}
                    {!isLoading && generatedEdits.length === 0 && (
                        <div className="text-center text-medium-text pt-24">
                            <p>Your prompts will appear here.</p>
                        </div>
                    )}
                    {generatedEdits.length > 0 && (
                        <div className="space-y-4">
                            {generatedEdits.map(edit => (
                                <div key={edit.id} className="bg-dark-bg p-4 rounded-lg border border-dark-border">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-brand-purple text-sm">{edit.duration}s Clip</span>
                                        <button onClick={() => navigator.clipboard.writeText(edit.prompt || '')} className="text-xs text-medium-text hover:text-light-text">Copy</button>
                                    </div>
                                    <p className="font-mono text-xs text-light-text whitespace-pre-wrap">{edit.prompt}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
