import React, { useState, useEffect } from 'react';
import { Artist, Release, View, Track } from '../types';
import { generateCreativePrompt } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';

interface CreativePromptAssistantProps {
    artist: Artist;
    releases: Release[];
    setView: (view: View) => void;
}

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 h-full">
        <svg className="animate-spin h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-light-text mt-4">Crafting Your Prompt...</h3>
        <p className="text-medium-text mt-1">Our AI is analyzing your creative vision.</p>
    </div>
);

export const CreativePromptAssistant = ({ artist, releases, setView }: CreativePromptAssistantProps) => {
    const [selectedReleaseId, setSelectedReleaseId] = useState<string>(releases[0]?.id.toString() || '');
    const [selectedTrackId, setSelectedTrackId] = useState<string>('');
    const [mediaType, setMediaType] = useState<'Video Teaser' | 'Promo Clip' | 'VJ Loop' | 'Audio Drop'>('Video Teaser');
    const [instructions, setInstructions] = useState('');
    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const selectedRelease = releases.find(r => r.id === parseInt(selectedReleaseId));
    const tracksInRelease = selectedRelease?.tracks || [];

    useEffect(() => {
        if (tracksInRelease.length > 0) {
            setSelectedTrackId(tracksInRelease[0].id.toString());
        } else {
            setSelectedTrackId('');
        }
    }, [selectedReleaseId, tracksInRelease]);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedRelease) {
            setError('Please select a release.');
            return;
        }
        const selectedTrack = tracksInRelease.find(t => t.id === parseInt(selectedTrackId)) || null;

        setIsLoading(true);
        setError('');
        setGeneratedPrompt('');

        try {
            const prompt = await generateCreativePrompt(artist, selectedRelease, selectedTrack, mediaType, instructions);
            setGeneratedPrompt(prompt);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleCopy = () => {
        navigator.clipboard.writeText(generatedPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-4 md:p-6 max-w-6xl mx-auto">
            <button onClick={() => setView('creative-studio')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to A&R Studio</button>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-light-text">Creative Prompt Assistant</h1>
                <p className="text-medium-text mt-1">Generate expert-level prompts for any AI media generator (e.g., Midjourney, Runway, Veo).</p>
            </div>
            
            {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-center">{error}</p>}
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <form onSubmit={handleGenerate} className="bg-dark-card border border-dark-border rounded-lg p-6 space-y-4">
                    <h3 className="text-xl font-bold text-light-text">Briefing</h3>
                    <div>
                        <label htmlFor="release-select" className="block text-sm font-medium text-medium-text mb-1">Release</label>
                        <select id="release-select" value={selectedReleaseId} onChange={e => setSelectedReleaseId(e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3">
                            {releases.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
                        </select>
                    </div>

                    {tracksInRelease.length > 1 && (
                        <div>
                            <label htmlFor="track-select" className="block text-sm font-medium text-medium-text mb-1">Track (Optional)</label>
                            <select id="track-select" value={selectedTrackId} onChange={e => setSelectedTrackId(e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3">
                                {tracksInRelease.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                            </select>
                        </div>
                    )}
                    
                    <div>
                        <label htmlFor="media-type" className="block text-sm font-medium text-medium-text mb-1">Media Type</label>
                        <select id="media-type" value={mediaType} onChange={e => setMediaType(e.target.value as any)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3">
                            <option>Video Teaser</option>
                            <option>Promo Clip</option>
                            <option>VJ Loop</option>
                            <option>Audio Drop</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="instructions" className="block text-sm font-medium text-medium-text mb-1">Additional Instructions (Optional)</label>
                        <textarea 
                            id="instructions"
                            value={instructions}
                            onChange={e => setInstructions(e.target.value)}
                            rows={4}
                            className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-sm"
                            placeholder="e.g., Make it feel like Blade Runner, focus on the second verse, use a vintage film aesthetic..."
                        />
                    </div>

                    <button type="submit" disabled={isLoading} className="w-full bg-brand-purple text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-purple-dark transition-colors duration-200 flex items-center justify-center disabled:opacity-50 !mt-6">
                        <SparklesIcon className="w-5 h-5 mr-2" />
                        {isLoading ? 'Generating...' : 'Generate Super Prompt'}
                    </button>
                </form>

                <div className="bg-dark-card border border-dark-border rounded-lg p-6 flex flex-col min-h-[400px]">
                    <h3 className="text-xl font-bold text-light-text mb-4">Generated Prompt</h3>
                    {isLoading ? <LoadingState /> : (
                        <div className="flex-grow flex flex-col">
                            <textarea 
                                readOnly
                                value={generatedPrompt}
                                className="w-full flex-grow bg-dark-bg border border-dark-border rounded-lg p-3 text-sm"
                                placeholder="Your AI-generated 'super prompt' will appear here..."
                            />
                            {generatedPrompt && (
                                <button onClick={handleCopy} className="w-full mt-4 bg-dark-border font-bold py-2 px-4 rounded-lg hover:bg-dark-border/70">
                                    {copied ? 'Copied!' : 'Copy Prompt'}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};